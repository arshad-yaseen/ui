import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { PropsWithChildren } from "react";
import { Code } from "@/components/book/demo/code";
import { Preview } from "@/components/book/preview";

const CONTENT_DIR = join(process.cwd(), "src/content");

type DemoProps = PropsWithChildren<{
  /** Path of the demo under `content`, without the extension. */
  name: string;
}>;

export async function Demo({ name, children }: DemoProps) {
  const code = await readFile(join(CONTENT_DIR, `${name}.tsx`), "utf-8");

  return (
    <div>
      <Preview className="rounded-b-none">{children}</Preview>
      <Code code={code} />
    </div>
  );
}
