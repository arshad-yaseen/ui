// Renders pages in real browsers across themes, viewports, and media conditions, then lays the
// captures out on one contact sheet per page.
// Run: bun run screenshot --help

import { mkdir, writeFile } from "node:fs/promises";
import { availableParallelism, tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import {
  chromium,
  firefox,
  webkit,
  type Browser,
  type BrowserContextOptions,
  type BrowserType,
  type Locator,
  type Page,
} from "playwright";

const BROWSER_NAMES = ["chromium", "firefox", "webkit"] as const;
const THEMES = ["light", "dark"] as const;
const CONDITION_NAMES = ["forced-colors", "contrast-more"] as const;
const STEP_KINDS = ["click", "hover", "press", "type", "wait"] as const;

const ROLES = [
  "button",
  "link",
  "menuitem",
  "option",
  "tab",
  "checkbox",
  "radio",
  "switch",
  "combobox",
  "textbox",
] as const;

type BrowserName = (typeof BROWSER_NAMES)[number];
type Theme = (typeof THEMES)[number];
type Condition = (typeof CONDITION_NAMES)[number];
type StepKind = (typeof STEP_KINDS)[number];

const BROWSERS: Record<BrowserName, BrowserType> = { chromium, firefox, webkit };

const CONDITIONS: Record<Condition, { emulation: BrowserContextOptions; probe: () => boolean }> = {
  "forced-colors": {
    emulation: { forcedColors: "active" },
    probe: () => {
      const element = document.createElement("div");
      element.style.color = "rgb(1, 2, 3)";
      document.body.append(element);
      const isForced = getComputedStyle(element).color !== "rgb(1, 2, 3)";
      element.remove();
      return isForced;
    },
  },
  "contrast-more": {
    emulation: { contrast: "more" },
    probe: () => matchMedia("(prefers-contrast: more)").matches,
  },
};

const DEFAULT_ORIGIN = "http://localhost:3000";
const DEFAULT_VIEWPORTS = "1280x800,375x812";
const DEFAULT_SCALE = 2;
const MAX_CONCURRENCY = 8;
const NAVIGATION_TIMEOUT = 60_000;
const STEP_TIMEOUT = 5_000;
const CROP_PADDING = 24;
const SHEET_WIDTH = 1600;

const USAGE = `Usage: bun run screenshot [routes...] [options]

Renders each route in real browsers, then writes every capture, one contact sheet image per
route and condition, and an index.html linking them all. Routes are paths on --origin, such as
/ui/components/dialog, or full URLs. With no route, captures /.

Matrix
  --browser <list>     chromium, firefox, webkit                default: all
  --theme <list>       light, dark, as prefers-color-scheme     default: both
  --viewport <list>    WIDTHxHEIGHT                             default: ${DEFAULT_VIEWPORTS}
  --condition <list>   forced-colors, contrast-more, or all
                       Each adds captures and a sheet of its own, where the browser supports it.

Steps, run in the order given before every capture
  --click <name>       Click the element with this accessible name or text
  --hover <name>       Hover it
  --press <key>        Press a key, such as Tab, Escape, or Shift+Tab
  --type <text>        Type into the focused element
  --wait <ms>          Wait this long

Output
  --crop <selector>    Capture the box around every visible match, such as [role=dialog]
  --full-page          Capture the whole page instead of the viewport, unless --crop is set
  --scale <n>          Device pixel ratio                       default: ${DEFAULT_SCALE}
  --origin <url>       Where routes resolve                     default: ${DEFAULT_ORIGIN}
  --out <dir>          Parent of each run's folder              default: <tmp>/screenshots
  --concurrency <n>    Pages open at once                       default: cores, at most ${MAX_CONCURRENCY}

Exits 1 when a page throws, logs an error, gets a failed response, or a step fails.

Example
  bun run screenshot /ui/components/dialog --click "Manage plan" --click "Cancel plan" \\
    --crop "[role=dialog]" --condition forced-colors`;

type Viewport = { width: number; height: number };
type Box = Viewport & { x: number; y: number };

type Step =
  | { kind: "click" | "hover"; name: string }
  | { kind: "press"; key: string }
  | { kind: "type"; text: string }
  | { kind: "wait"; ms: number };

type Target = { url: URL; slug: string };
type Engine = { name: BrowserName; browser: Browser };

type Shot = {
  target: Target;
  engine: Engine;
  viewport: Viewport;
  condition: Condition | null;
  theme: Theme;
  label: string;
  file: string;
};

type Sheet = { target: Target; condition: Condition | null; name: string; title: string };

type Outcome =
  | { status: "captured"; shot: Shot; problems: string[] }
  | { status: "unsupported"; shot: Shot }
  | { status: "failed"; shot: Shot; problems: string[] };

type Settings = {
  steps: Step[];
  crop: string | undefined;
  isFullPage: boolean;
  scale: number;
  dir: string;
};

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function readMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return message.split("\n")[0] ?? message;
}

function isOneOf<T extends string>(allowed: readonly T[], value: string): value is T {
  return allowed.some((item) => item === value);
}

function parseList<T extends string>(flag: string, value: string, allowed: readonly T[]): T[] {
  const items = value.split(",").map((item) => item.trim());
  const unknown = items.filter((item) => !isOneOf(allowed, item));
  if (unknown.length > 0) {
    fail(`--${flag} takes ${allowed.join(", ")}, not ${unknown.join(", ")}.`);
  }
  return [...new Set(items.filter((item) => isOneOf(allowed, item)))];
}

function parseConditions(value: string): Condition[] {
  if (value === "") {
    return [];
  }
  return value === "all" ? [...CONDITION_NAMES] : parseList("condition", value, CONDITION_NAMES);
}

function parseViewports(value: string): Viewport[] {
  return value.split(",").map((item) => {
    const [, width, height] = /^(\d+)x(\d+)$/.exec(item.trim()) ?? [];
    if (!width || !height) {
      fail(`--viewport takes WIDTHxHEIGHT, such as 1280x800, not ${item}.`);
    }
    return { width: Number(width), height: Number(height) };
  });
}

function parsePositive(flag: string, value: string): number {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    fail(`--${flag} takes a positive number, not ${value}.`);
  }
  return number;
}

function toStep(kind: StepKind, value: string): Step {
  switch (kind) {
    case "click":
    case "hover":
      return { kind, name: value };
    case "press":
      return { kind, key: value };
    case "type":
      return { kind, text: value };
    case "wait":
      return { kind, ms: parsePositive("wait", value) };
  }
}

function describeStep(step: Step): string {
  switch (step.kind) {
    case "click":
    case "hover":
      return `${step.kind} “${step.name}”`;
    case "press":
      return `press ${step.key}`;
    case "type":
      return `type “${step.text}”`;
    case "wait":
      return `wait ${step.ms}ms`;
  }
}

function toTarget(route: string, origin: string): Target {
  try {
    const url = new URL(route, origin);
    return { url, slug: url.pathname.split("/").filter(Boolean).join("-") || "home" };
  } catch {
    fail(`${route} is not a route or URL on ${origin}.`);
  }
}

async function reach(target: Target): Promise<void> {
  try {
    await fetch(target.url, { signal: AbortSignal.timeout(NAVIGATION_TIMEOUT) });
  } catch {
    fail(
      `Nothing answered at ${target.url.origin}. Start the app first, such as with bun run dev.`,
    );
  }
}

async function launch(name: BrowserName): Promise<Engine> {
  try {
    return { name, browser: await BROWSERS[name].launch() };
  } catch (error) {
    fail(
      `${name} did not start: ${readMessage(error)}\nInstall the engines with bunx playwright install chromium firefox webkit.`,
    );
  }
}

async function runConcurrently<T, R>(
  items: readonly T[],
  limit: number,
  run: (item: T) => Promise<R>,
): Promise<R[]> {
  const queue = items.entries();
  const workers = Array.from({ length: Math.min(limit, items.length) }, () =>
    Array.fromAsync(queue, async ([index, item]) => ({ index, result: await run(item) })),
  );
  return (await Promise.all(workers))
    .flat()
    .toSorted((a, b) => a.index - b.index)
    .map(({ result }) => result);
}

async function findTarget(page: Page, name: string): Promise<Locator> {
  const candidates = [
    ...ROLES.map((role) => page.getByRole(role, { name, exact: true })),
    page.getByText(name, { exact: true }),
  ];
  for (const candidate of candidates) {
    const visible = candidate.filter({ visible: true });
    if ((await visible.count()) > 0) {
      return visible.last();
    }
  }
  throw new Error(`nothing visible is named “${name}”`);
}

async function runStep(page: Page, step: Step): Promise<void> {
  switch (step.kind) {
    case "click":
      return (await findTarget(page, step.name)).click();
    case "hover":
      return (await findTarget(page, step.name)).hover();
    case "press":
      return page.keyboard.press(step.key);
    case "type":
      return page.keyboard.type(step.text);
    case "wait":
      return page.waitForTimeout(step.ms);
  }
}

async function runSteps(page: Page, steps: readonly Step[]): Promise<string | undefined> {
  for (const step of steps) {
    try {
      await runStep(page, step);
    } catch (error) {
      return `${describeStep(step)} failed: ${readMessage(error)}`;
    }
  }
  return undefined;
}

async function settle(page: Page): Promise<void> {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

async function findCrop(page: Page, selector: string): Promise<Box | undefined> {
  const matches = await page.locator(selector).filter({ visible: true }).all();
  const boxes = (await Promise.all(matches.map((match) => match.boundingBox()))).filter(
    (box) => box !== null,
  );
  const viewport = page.viewportSize();
  if (boxes.length === 0 || !viewport) {
    return undefined;
  }
  const left = Math.max(0, Math.min(...boxes.map((box) => box.x)) - CROP_PADDING);
  const top = Math.max(0, Math.min(...boxes.map((box) => box.y)) - CROP_PADDING);
  const right = Math.min(
    viewport.width,
    Math.max(...boxes.map((box) => box.x + box.width)) + CROP_PADDING,
  );
  const bottom = Math.min(
    viewport.height,
    Math.max(...boxes.map((box) => box.y + box.height)) + CROP_PADDING,
  );
  return { x: left, y: top, width: right - left, height: bottom - top };
}

async function capture(shot: Shot, settings: Settings): Promise<Outcome> {
  const context = await shot.engine.browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: settings.scale,
    colorScheme: shot.theme,
    ...(shot.condition && CONDITIONS[shot.condition].emulation),
  });
  context.setDefaultTimeout(STEP_TIMEOUT);
  const page = await context.newPage();
  const problems: string[] = [];
  page.on("pageerror", (error) => problems.push(`Uncaught ${readMessage(error)}`));
  page.on("console", (message) => {
    // The response listener already reports a failed resource, with its URL.
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) {
      problems.push(`Console error: ${message.text().split("\n")[0]}`);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      problems.push(`HTTP ${response.status()} ${response.url()}`);
    }
  });

  try {
    await page.goto(shot.target.url.href, { timeout: NAVIGATION_TIMEOUT });
    if (shot.condition && !(await page.evaluate(CONDITIONS[shot.condition].probe))) {
      return { status: "unsupported", shot };
    }

    const stepProblem = await runSteps(page, settings.steps);
    if (stepProblem) {
      problems.push(stepProblem);
    }
    await settle(page);

    const clip = settings.crop ? await findCrop(page, settings.crop) : undefined;
    if (settings.crop && !clip) {
      problems.push(`Nothing visible matched --crop ${settings.crop}`);
    }
    await page.screenshot({
      path: join(settings.dir, shot.file),
      animations: "disabled",
      fullPage: settings.isFullPage && !clip,
      clip,
    });
    return { status: "captured", shot, problems };
  } catch (error) {
    return { status: "failed", shot, problems: [...problems, readMessage(error)] };
  } finally {
    await context.close();
  }
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderCell(outcome: Outcome | undefined): string {
  if (!outcome || outcome.status === "unsupported") {
    return `<td><p class="note">Not supported</p></td>`;
  }
  const problems = outcome.problems
    .map((problem) => `<p class="problem">${escapeHtml(problem)}</p>`)
    .join("");
  const image =
    outcome.status === "captured"
      ? `<a href="${outcome.shot.file}"><img src="${outcome.shot.file}" alt="${escapeHtml(outcome.shot.label)}"></a>`
      : `<p class="problem">Not captured</p>`;
  return `<td>${image}${problems}</td>`;
}

function renderSection(
  sheet: Sheet,
  outcomes: readonly Outcome[],
  engines: readonly Engine[],
): string {
  const own = outcomes.filter(
    (outcome) => outcome.shot.target === sheet.target && outcome.shot.condition === sheet.condition,
  );
  const labels = [...new Set(own.map((outcome) => outcome.shot.label))];
  const rows = labels.map((label) => {
    const cells = engines.map((engine) =>
      renderCell(
        own.find((outcome) => outcome.shot.label === label && outcome.shot.engine === engine),
      ),
    );
    return `<tr><th scope="row">${escapeHtml(label)}</th>${cells.join("")}</tr>`;
  });
  const columns = engines.map((engine) => `<th scope="col">${engine.name}</th>`).join("");
  return `<section data-sheet="${sheet.name}">
<h2><a href="${escapeHtml(sheet.target.url.href)}">${escapeHtml(sheet.title)}</a></h2>
<table><thead><tr><td></td>${columns}</tr></thead><tbody>${rows.join("")}</tbody></table>
</section>`;
}

function renderSheets(
  sheets: readonly Sheet[],
  outcomes: readonly Outcome[],
  engines: readonly Engine[],
): string {
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Screenshots</title>
<style>
  body { margin: 0; padding: 32px; background: #fafafa; color: #18181b; font: 13px/1.5 system-ui, sans-serif; }
  section { padding-block-end: 48px; }
  h2 { margin: 0 0 16px; font-size: 16px; font-weight: 600; }
  h2 a { color: inherit; text-decoration: none; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th { padding: 8px; color: #52525b; font-weight: 500; text-align: start; vertical-align: top; }
  tr > :first-child { width: 168px; }
  td { padding: 8px; vertical-align: top; }
  img { display: block; max-width: 100%; max-height: 480px; outline: 1px solid #e4e4e7; }
  p { margin: 4px 0 0; }
  .note { color: #71717a; }
  .problem { color: #b91c1c; overflow-wrap: anywhere; }
</style>
${sheets.map((sheet) => renderSection(sheet, outcomes, engines)).join("\n")}
</html>
`;
}

async function writeSheets(
  dir: string,
  sheets: readonly Sheet[],
  outcomes: readonly Outcome[],
  engines: readonly Engine[],
): Promise<void> {
  const index = join(dir, "index.html");
  await writeFile(index, renderSheets(sheets, outcomes, engines));

  const [first] = engines;
  if (!first) {
    return;
  }
  const context = await first.browser.newContext({
    viewport: { width: SHEET_WIDTH, height: 900 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  await page.goto(pathToFileURL(index).href);
  for (const sheet of sheets) {
    await page
      .locator(`section[data-sheet="${sheet.name}"]`)
      .screenshot({ path: join(dir, `${sheet.name}.png`) });
  }
  await context.close();
}

function describeShot(shot: Shot): string {
  return [shot.target.url.pathname, shot.engine.name, shot.label, shot.condition]
    .filter(Boolean)
    .join(" · ");
}

function report(
  outcomes: readonly Outcome[],
  sheets: readonly Sheet[],
  settings: Settings,
): boolean {
  const captured = outcomes.filter((outcome) => outcome.status === "captured");
  const unsupported = outcomes.filter((outcome) => outcome.status === "unsupported");
  const attempted = outcomes.filter((outcome) => outcome.status !== "unsupported");
  const problems = Map.groupBy(
    attempted.flatMap((outcome) =>
      outcome.problems.map((problem) => ({ problem, shot: outcome.shot })),
    ),
    (entry) => entry.problem,
  );
  const gaps = Map.groupBy(
    unsupported,
    (outcome) => `${outcome.shot.engine.name} ${outcome.shot.condition}`,
  );

  const lines = [
    `Captured ${captured.length} of ${attempted.length}`,
    ...sheets.map((sheet) => `  ${sheet.title}  ${join(settings.dir, `${sheet.name}.png`)}`),
    ...[...gaps].map(([gap, entries]) => `Not supported: ${gap} (${entries.length})`),
    ...[...problems].flatMap(([problem, entries]) => [
      `Problem: ${problem}`,
      ...entries.slice(0, 3).map((entry) => `  ${describeShot(entry.shot)}`),
      ...(entries.length > 3 ? [`  and ${entries.length - 3} more`] : []),
    ]),
    `Sheet: ${join(settings.dir, "index.html")}`,
  ];
  console.log(lines.join("\n"));
  return problems.size > 0 || captured.length < attempted.length;
}

const OPTIONS = {
  browser: { type: "string", default: BROWSER_NAMES.join(",") },
  theme: { type: "string", default: THEMES.join(",") },
  viewport: { type: "string", default: DEFAULT_VIEWPORTS },
  condition: { type: "string", default: "" },
  click: { type: "string", multiple: true },
  hover: { type: "string", multiple: true },
  press: { type: "string", multiple: true },
  type: { type: "string", multiple: true },
  wait: { type: "string", multiple: true },
  crop: { type: "string" },
  "full-page": { type: "boolean", default: false },
  scale: { type: "string", default: String(DEFAULT_SCALE) },
  origin: { type: "string", default: DEFAULT_ORIGIN },
  out: { type: "string", default: join(tmpdir(), "screenshots") },
  concurrency: {
    type: "string",
    default: String(Math.min(availableParallelism(), MAX_CONCURRENCY)),
  },
  help: { type: "boolean", short: "h", default: false },
} as const;

function readArgs() {
  try {
    return parseArgs({ options: OPTIONS, allowPositionals: true, tokens: true });
  } catch (error) {
    fail(`${readMessage(error)}\n\n${USAGE}`);
  }
}

const { values, positionals, tokens } = readArgs();
if (values.help) {
  console.log(USAGE);
  process.exit(0);
}

const browsers = parseList("browser", values.browser, BROWSER_NAMES);
const themes = parseList("theme", values.theme, THEMES);
const viewports = parseViewports(values.viewport);
const conditions = parseConditions(values.condition);
const concurrency = parsePositive("concurrency", values.concurrency);
const targets = (positionals.length > 0 ? positionals : ["/"]).map((route) =>
  toTarget(route, values.origin),
);
const settings: Settings = {
  steps: tokens.flatMap((token) =>
    token.kind === "option" && token.value !== undefined && isOneOf(STEP_KINDS, token.name)
      ? [toStep(token.name, token.value)]
      : [],
  ),
  crop: values.crop,
  isFullPage: values["full-page"],
  scale: parsePositive("scale", values.scale),
  dir: join(values.out, new Date().toISOString().replaceAll(/[:.]/g, "-")),
};

const startedAt = performance.now();
await Promise.all(targets.map(reach));
const engines = await Promise.all(browsers.map(launch));
await Promise.all(
  targets.map((target) => mkdir(join(settings.dir, target.slug), { recursive: true })),
);

const shots = targets.flatMap((target) =>
  viewports.flatMap((viewport) =>
    [null, ...conditions].flatMap((condition) =>
      themes.flatMap((theme) =>
        engines.map((engine): Shot => {
          const size = `${viewport.width}x${viewport.height}`;
          return {
            target,
            engine,
            viewport,
            condition,
            theme,
            label: `${theme} · ${size.replace("x", "×")}`,
            file: `${target.slug}/${[engine.name, theme, size, condition].filter(Boolean).join("-")}.png`,
          };
        }),
      ),
    ),
  ),
);

const outcomes = await runConcurrently(shots, concurrency, (shot) =>
  capture(shot, settings).catch((error): Outcome => ({
    status: "failed",
    shot,
    problems: [readMessage(error)],
  })),
);
const sheets = targets.flatMap((target) =>
  [null, ...conditions].map((condition): Sheet => ({
    target,
    condition,
    name: [target.slug, condition].filter(Boolean).join("-"),
    title: [target.url.pathname, condition].filter(Boolean).join(" · "),
  })),
);
await writeSheets(settings.dir, sheets, outcomes, engines);
await Promise.all(engines.map((engine) => engine.browser.close()));

const hasProblems = report(outcomes, sheets, settings);
console.log(`Done in ${((performance.now() - startedAt) / 1000).toFixed(1)}s`);
process.exitCode = hasProblems ? 1 : 0;
