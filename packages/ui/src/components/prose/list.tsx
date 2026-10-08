import type { ComponentProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

export type UlProps = ComponentProps<"ul">;

export function Ul({ className, ...props }: UlProps) {
  return (
    <ul
      className={cn(
        "list-disc space-y-2 pl-5",
        "text-base/8 text-pretty text-foreground/80",
        "marker:text-neutral-500 dark:marker:text-neutral-500",
        className,
      )}
      {...props}
    />
  );
}

export type LiProps = ComponentProps<"li">;

export function Li(props: LiProps) {
  return <li {...props} />;
}
