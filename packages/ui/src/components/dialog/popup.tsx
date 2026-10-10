import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@arshad/ui/lib/cn";

export type DialogPopupProps = DialogPrimitive.Popup.Props;

export function Popup({ className, ...props }: DialogPopupProps) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-popup"
      className={cn(
        "relative flex max-h-full w-full max-w-md flex-col gap-6",
        "py-(--dialog-padding) [--dialog-padding:--spacing(6)]",
        "overflow-y-auto overscroll-contain outline-hidden",
        "rounded-xl bg-background text-sm text-foreground",
        "shadow-lg ring shadow-black/5 ring-black/10 dark:shadow-black/40 dark:ring-white/8",
        "translate-y-[calc(--spacing(5)*var(--nested-dialogs))] scale-[calc(1-0.1*var(--nested-dialogs))]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0",
        "after:bg-black/5 data-nested-dialog-open:after:opacity-100 dark:after:bg-black/40",
        "transition-[translate,scale,opacity] duration-200 ease-out motion-reduce:transition-none",
        "after:transition-opacity after:duration-200 after:ease-out motion-reduce:after:transition-none",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150",
        className,
      )}
      {...props}
    />
  );
}
