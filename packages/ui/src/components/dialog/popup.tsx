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
        "scale-[calc(1-0.05*var(--nested-dialogs))]",
        "transition-[scale,opacity] duration-200 ease-out motion-reduce:transition-none",
        "*:transition-opacity *:duration-200 *:ease-out data-nested-dialog-open:*:opacity-0 motion-reduce:*:transition-none",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150",
        "data-nested:data-ending-style:scale-105 data-nested:data-starting-style:scale-105",
        className,
      )}
      {...props}
    />
  );
}
