import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export type DialogTriggerProps<Payload = unknown> = DialogPrimitive.Trigger.Props<Payload>;

export function Trigger<Payload>(props: DialogTriggerProps<Payload>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
