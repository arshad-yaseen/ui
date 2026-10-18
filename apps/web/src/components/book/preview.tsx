import type { ComponentProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

export function Preview({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex min-h-64 items-center justify-center rounded-xl border-hairline border-current/10 p-8",
        className,
      )}
    />
  );
}
