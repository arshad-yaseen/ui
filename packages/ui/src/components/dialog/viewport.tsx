import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@arshad/ui/lib/cn";

export type DialogViewportProps = DialogPrimitive.Viewport.Props;

export function Viewport({ className, ...props }: DialogViewportProps) {
  return (
    <DialogPrimitive.Viewport
      data-slot="dialog-viewport"
      className={cn(
        "fixed z-50 flex items-center justify-center",
        "inset-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]",
        "px-4 py-6 [@media(min-height:600px)]:pt-8 [@media(min-height:600px)]:pb-12",
        className,
      )}
      {...props}
    />
  );
}
