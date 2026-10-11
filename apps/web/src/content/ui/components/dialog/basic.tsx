import { buttonVariants } from "@arshad/ui/components/button";
import { Dialog } from "@arshad/ui/components/dialog";

export function Basic() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonVariants({ variant: "outline" })}>
        Archive project
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Archive this project?</Dialog.Title>
              <Dialog.Description>
                It moves to Archived and stops syncing. You can restore it at any time.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Close className={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close>
              <Dialog.Close className={buttonVariants()}>Archive</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
