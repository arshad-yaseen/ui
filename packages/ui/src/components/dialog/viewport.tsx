import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@arshad/ui/lib/cn";

export type DialogViewportProps = DialogPrimitive.Viewport.Props;

export function Viewport({ className, ...props }: DialogViewportProps) {
  return (
    <DialogPrimitive.Viewport
      data-slot="dialog-viewport"
      className={cn(
        "fixed z-50 flex flex-col items-center",
        "inset-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]",
        "px-4 py-6",
        "[--dialog-anchor:0.25] before:grow-(--dialog-anchor) after:grow-[calc(1-var(--dialog-anchor))]",
        className,
      )}
      {...props}
    />
  );
}
