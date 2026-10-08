import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@arshad/ui/lib/cn";

export type SelectItemProps = SelectPrimitive.Item.Props;

export function Item({ className, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative isolate grid grid-cols-[--spacing(4)_1fr] items-center gap-x-2",
        "cursor-default scroll-my-1 rounded-md ps-2.5 pe-4 outline-hidden select-none",
        "py-[calc((var(--anchor-height,--spacing(8))-(--spacing(6)))/2)]",
        "text-sm/6 text-foreground group-data-[side=none]:pe-10",
        "data-highlighted:before:absolute data-highlighted:before:inset-x-[calc(--spacing(1)-1px)] data-highlighted:before:-inset-y-px data-highlighted:before:-z-10 data-highlighted:before:rounded-[calc(var(--radius-md)+1px)] data-highlighted:before:bg-neutral-200 data-highlighted:before:content-[''] dark:data-highlighted:before:bg-neutral-800/50",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
