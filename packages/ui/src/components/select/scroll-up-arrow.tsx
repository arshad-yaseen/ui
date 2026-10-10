import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Icon } from "@arshad/ui/components/icon";
import { cn } from "@arshad/ui/lib/cn";

export type SelectScrollUpArrowProps = SelectPrimitive.ScrollUpArrow.Props;

export function ScrollUpArrow({ className, children, ...props }: SelectScrollUpArrowProps) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={cn(
        "top-0 z-1 flex h-(--select-scroll-arrow-height) w-full cursor-default items-center justify-center",
        "bg-background text-neutral-500 dark:text-neutral-400",
        "before:absolute before:left-0 before:size-full before:content-[''] data-[side=none]:before:-top-full",
        className,
      )}
      {...props}
    >
      {children ?? <Icon name="ChevronUp" className="size-4" />}
    </SelectPrimitive.ScrollUpArrow>
  );
}
