import { buttonVariants } from "@arshad/ui/components/button";
import { Dialog } from "@arshad/ui/components/dialog";

export function Nested() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonVariants({ variant: "outline" })}>
        Manage plan
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Pro plan</Dialog.Title>
              <Dialog.Description>Billed monthly and renews automatically.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Root>
                <Dialog.Trigger className={buttonVariants({ variant: "outline" })}>
                  Cancel plan
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Viewport>
                    <Dialog.Popup>
                      <Dialog.Header>
                        <Dialog.Title>Cancel your Pro plan?</Dialog.Title>
                        <Dialog.Description>
                          You keep Pro until the end of this billing period, then move to the free
                          Hobby plan.
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Footer>
                        <Dialog.Close className={buttonVariants({ variant: "outline" })}>
                          Keep Pro
                        </Dialog.Close>
                        <Dialog.Close className={buttonVariants({ color: "danger" })}>
                          Cancel plan
                        </Dialog.Close>
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
