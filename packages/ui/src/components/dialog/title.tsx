import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@arshad/ui/lib/cn";

export type DialogTitleProps = DialogPrimitive.Title.Props;

export function Title({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base/6 font-medium tracking-tight text-balance", className)}
      {...props}
    />
  );
}
