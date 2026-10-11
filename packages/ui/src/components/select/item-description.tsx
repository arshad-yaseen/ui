"use client";

import { useRender } from "@base-ui/react/use-render";
import { cn } from "@arshad/ui/lib/cn";

export type SelectItemDescriptionProps = useRender.ComponentProps<"div">;

export function ItemDescription({ render, className, ...props }: SelectItemDescriptionProps) {
  return useRender({
    render,
    props: {
      "data-slot": "select-item-description",
      ...props,
      className: cn(
        "col-start-2 min-w-0 truncate pb-0.5",
        "text-xs text-neutral-500 dark:text-neutral-400",
        className,
      ),
    },
  });
}
