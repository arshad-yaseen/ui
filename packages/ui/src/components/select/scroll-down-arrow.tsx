import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Icon } from "@arshad/ui/components/icon";
import { cn } from "@arshad/ui/lib/cn";

export type SelectScrollDownArrowProps = SelectPrimitive.ScrollDownArrow.Props;

export function ScrollDownArrow({ className, children, ...props }: SelectScrollDownArrowProps) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={cn(
        "bottom-0 z-1 flex h-7 w-full cursor-default items-center justify-center",
        "bg-background text-neutral-500 dark:text-neutral-400",
        "before:absolute before:left-0 before:size-full before:content-[''] data-[side=none]:before:-bottom-full",
        className,
      )}
      {...props}
    >
      {children ?? <Icon name="ChevronDown" className="size-4" />}
    </SelectPrimitive.ScrollDownArrow>
  );
}
