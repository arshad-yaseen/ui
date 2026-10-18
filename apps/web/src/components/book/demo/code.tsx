"use client";

import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "@arshad/ui/components/button";
import { CodeBlock } from "@arshad/ui/components/code-block";
import { cn } from "@arshad/ui/lib/cn";

type CodeProps = {
  code: string;
};

export function Code({ code }: CodeProps) {
  const id = useId();
  const codeRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleToggle() {
    flushSync(() => setIsExpanded(!isExpanded));
    if (isExpanded) {
      codeRef.current?.scrollIntoView({ block: "nearest" });
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-b-xl border-hairline border-t-0 border-current/10 bg-clip-padding",
        "bg-neutral-100/50 dark:bg-neutral-900/50",
      )}
    >
      <CodeBlock
        id={id}
        ref={codeRef}
        code={code}
        className={cn(
          "border-0",
          isExpanded ? "pb-14" : "max-h-50 overflow-hidden mask-b-from-30%",
        )}
      />
      <Button
        variant="outline"
        size="sm"
        aria-expanded={isExpanded}
        aria-controls={id}
        onClick={handleToggle}
        className={cn(
          "absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full px-3",
          "[--outline-bg:var(--color-background)]",
          "hover-open:[--outline-bg:var(--color-neutral-100)] dark:hover-open:[--outline-bg:var(--color-neutral-900)]",
        )}
      >
        {isExpanded ? "Hide code" : "Show code"}
      </Button>
    </div>
  );
}
