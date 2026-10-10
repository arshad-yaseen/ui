"use client";

import { useRender } from "@base-ui/react/use-render";
import { cn } from "@arshad/ui/lib/cn";

export type DialogFooterProps = useRender.ComponentProps<"div">;

export function Footer({ render, className, ...props }: DialogFooterProps) {
  return useRender({
    render,
    props: {
      "data-slot": "dialog-footer",
      ...props,
      className: cn("flex justify-end gap-3 px-(--dialog-padding)", className),
    },
  });
}
