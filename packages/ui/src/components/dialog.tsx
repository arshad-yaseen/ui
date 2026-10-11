import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Backdrop } from "@arshad/ui/components/dialog/backdrop";
import { Body } from "@arshad/ui/components/dialog/body";
import { Close } from "@arshad/ui/components/dialog/close";
import { Description } from "@arshad/ui/components/dialog/description";
import { Footer } from "@arshad/ui/components/dialog/footer";
import { Header } from "@arshad/ui/components/dialog/header";
import { Popup } from "@arshad/ui/components/dialog/popup";
import { Portal } from "@arshad/ui/components/dialog/portal";
import { Title } from "@arshad/ui/components/dialog/title";
import { Trigger } from "@arshad/ui/components/dialog/trigger";
import { Viewport } from "@arshad/ui/components/dialog/viewport";

export type DialogRootProps<Payload = unknown> = DialogPrimitive.Root.Props<Payload>;

export const Dialog = {
  Root: DialogPrimitive.Root,
  Trigger,
  Portal,
  Backdrop,
  Viewport,
  Popup,
  Header,
  Title,
  Description,
  Body,
  Footer,
  Close,
};
