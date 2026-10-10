import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export type DialogPortalProps = DialogPrimitive.Portal.Props;

export function Portal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
