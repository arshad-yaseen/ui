import { buttonVariants } from "@arshad/ui/components/button";
import { Dialog } from "@arshad/ui/components/dialog";
import { Input } from "@arshad/ui/components/input";
import { cn } from "@arshad/ui/lib/cn";

export function Nested() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonVariants({ variant: "outline" })}>
        Workspace settings
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Workspace settings</Dialog.Title>
              <Dialog.Description>Changes apply to everyone in Acme.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="workspace-name" className="text-sm/6 font-medium">
                  Name
                </label>
                <Input id="workspace-name" autoComplete="organization" defaultValue="Acme" />
              </div>
              <Dialog.Root>
                <Dialog.Trigger
                  className={cn(
                    buttonVariants({ variant: "plain", color: "danger" }),
                    "-ms-2.5 self-start",
                  )}
                >
                  Delete workspace
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Viewport>
                    <Dialog.Popup>
                      <Dialog.Header>
                        <Dialog.Title>Delete Acme?</Dialog.Title>
                        <Dialog.Description>
                          This permanently deletes 12 projects and removes 8 members. It can’t be
                          undone.
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Footer>
                        <Dialog.Close className={buttonVariants({ variant: "outline" })}>
                          Cancel
                        </Dialog.Close>
                        <Dialog.Close className={buttonVariants({ color: "danger" })}>
                          Delete workspace
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Popup>
                  </Dialog.Viewport>
                </Dialog.Portal>
              </Dialog.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close className={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close>
              <Dialog.Close className={buttonVariants()}>Save</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
