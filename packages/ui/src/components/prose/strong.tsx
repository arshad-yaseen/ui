import type { ComponentProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

export type StrongProps = ComponentProps<"strong">;

export function Strong({ className, ...props }: StrongProps) {
  return (
    <strong
      className={cn("font-medium text-neutral-800 dark:text-neutral-200", className)}
      {...props}
    />
  );
}
