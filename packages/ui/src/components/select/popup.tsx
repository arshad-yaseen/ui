import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@arshad/ui/lib/cn";

export type SelectPopupProps = SelectPrimitive.Popup.Props;

export function Popup({ className, ...props }: SelectPopupProps) {
  return (
    <SelectPrimitive.Popup
      data-slot="select-popup"
      className={cn(
        "group/popup relative min-w-(--anchor-width) origin-(--transform-origin)",
        "[--select-scroll-arrow-height:--spacing(7)]",
        "overflow-hidden rounded-[calc(var(--radius-md)+--spacing(1))] bg-clip-padding outline-hidden",
        "bg-background text-foreground",
        "shadow-lg ring shadow-black/5 ring-black/10 dark:shadow-black/40 dark:ring-white/10",
        "transition-[scale,opacity] duration-100 ease-out motion-reduce:transition-none",
        "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
        "data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-75",
        "data-[side=none]:min-w-[calc(var(--anchor-width)+--spacing(7))]",
        "data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100",
        "data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:transition-none",
        className,
      )}
      {...props}
    />
  );
}
