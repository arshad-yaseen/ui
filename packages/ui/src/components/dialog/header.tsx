"use client";

import { useRender } from "@base-ui/react/use-render";
import { cn } from "@arshad/ui/lib/cn";

export type DialogHeaderProps = useRender.ComponentProps<"div">;

export function Header({ render, className, ...props }: DialogHeaderProps) {
  return useRender({
    render,
    props: {
      "data-slot": "dialog-header",
      ...props,
      className: cn("flex flex-col gap-1 px-(--dialog-padding)", className),
    },
  });
}
