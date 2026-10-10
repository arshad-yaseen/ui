import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@arshad/ui/lib/cn";

export type DialogBackdropProps = DialogPrimitive.Backdrop.Props;

export function Backdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-50 min-h-dvh",
        "supports-[-webkit-touch-callout:none]:absolute",
        "bg-black/20 dark:bg-black/50",
        "transition-opacity duration-200 ease-out motion-reduce:transition-none",
        "data-starting-style:opacity-0",
        "data-ending-style:opacity-0 data-ending-style:duration-150",
        className,
      )}
      {...props}
    />
  );
}
