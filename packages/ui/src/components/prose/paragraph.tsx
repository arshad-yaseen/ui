import type { ComponentProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

export type PProps = ComponentProps<"p">;

export function P({ className, ...props }: PProps) {
  return <p className={cn("text-base/8 text-pretty text-foreground/75", className)} {...props} />;
}
