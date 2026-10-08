import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { PropsWithChildren } from "react";
import { Preview } from "@/components/book/preview";
import { CodeBlock } from "@arshad/ui/components/code-block";

const CONTENT_DIR = join(process.cwd(), "src/content");

type DemoProps = PropsWithChildren<{
  /** Path of the demo under `content`, without the extension. */
  name: string;
}>;

export async function Demo({ name, children }: DemoProps) {
  const code = await readFile(join(CONTENT_DIR, `${name}.tsx`), "utf-8");

  return (
    <div className="flex flex-col gap-3">
      <Preview>{children}</Preview>
      <CodeBlock code={code} />
    </div>
  );
}
