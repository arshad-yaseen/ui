import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export type DialogCloseProps = DialogPrimitive.Close.Props;

export function Close(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
