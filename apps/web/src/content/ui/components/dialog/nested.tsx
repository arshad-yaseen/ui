import { buttonVariants } from "@arshad/ui/components/button";
import { Dialog } from "@arshad/ui/components/dialog";

const notifications = [
  "Lara Tucci mentioned you in Q3 roadmap",
  "Devon Lane replied to your comment",
  "Noah Pierre shared Brand guidelines",
];

export function Nested() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonVariants({ variant: "outline" })}>
        View notifications
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Notifications</Dialog.Title>
              <Dialog.Description>You have 3 unread notifications.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body render={<ul />} className="flex flex-col gap-2">
              {notifications.map((notification) => (
                <li key={notification}>{notification}</li>
              ))}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Root>
                <Dialog.Trigger className={buttonVariants({ variant: "outline" })}>
                  Mute all
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Viewport>
                    <Dialog.Popup>
                      <Dialog.Header>
                        <Dialog.Title>Mute all notifications?</Dialog.Title>
                        <Dialog.Description>
                          You can turn them back on in Settings.
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Footer>
                        <Dialog.Close className={buttonVariants({ variant: "outline" })}>
                          Cancel
                        </Dialog.Close>
                        <Dialog.Close className={buttonVariants()}>Mute</Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Popup>
                  </Dialog.Viewport>
                </Dialog.Portal>
              </Dialog.Root>
              <Dialog.Close className={buttonVariants()}>Done</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
