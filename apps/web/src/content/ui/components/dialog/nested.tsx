import { buttonVariants } from "@arshad/ui/components/button";
import { Dialog } from "@arshad/ui/components/dialog";
import { Icon } from "@arshad/ui/components/icon";

const features = ["Unlimited projects", "Up to 10 members", "Priority support"];

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
            <Dialog.Body render={<ul />} className="flex flex-col gap-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Icon name="Check" className="size-4 text-neutral-500 dark:text-neutral-400" />
                  {feature}
                </li>
              ))}
            </Dialog.Body>
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
