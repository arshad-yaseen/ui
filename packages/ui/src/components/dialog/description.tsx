import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@arshad/ui/lib/cn";

export type DialogDescriptionProps = DialogPrimitive.Description.Props;

export function Description({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-pretty text-neutral-600 dark:text-neutral-400", className)}
      {...props}
    />
  );
}
