import { buttonVariants } from "@arshad/ui/components/button";
import { Dialog } from "@arshad/ui/components/dialog";

const terms = [
  {
    title: "Your account",
    body: "You’re responsible for what happens under your account. Keep your password private and tell us right away if someone else gets in.",
  },
  {
    title: "Your content",
    body: "You own what you upload. You let us store, display, and back it up so the service works.",
  },
  {
    title: "Acceptable use",
    body: "Don’t use the service to break the law, send spam, or interfere with other people’s work.",
  },
  {
    title: "Payments",
    body: "Paid plans renew each month until you cancel. Prices include tax where the law requires it.",
  },
  {
    title: "Cancelling",
    body: "Cancel at any time from Settings. Your plan stays active until the end of the period you paid for.",
  },
  {
    title: "Refunds",
    body: "We refund a charge in full if you cancel within 14 days of it.",
  },
  {
    title: "Privacy",
    body: "We collect only what we need to run the service. The privacy policy explains what we keep and for how long.",
  },
  {
    title: "Availability",
    body: "We aim to keep the service running at all times, but outages and maintenance happen.",
  },
  {
    title: "Changes to these terms",
    body: "We email you at least 30 days before a change takes effect.",
  },
  {
    title: "Ending the agreement",
    body: "We may suspend an account that breaks these terms. You can still export your data for 30 days.",
  },
  {
    title: "Liability",
    body: "Our liability is limited to what you paid us in the last 12 months.",
  },
  {
    title: "Contact",
    body: "Send questions about these terms to legal@example.com.",
  },
];

export function Scrollable() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonVariants({ variant: "outline" })}>
        Review terms
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup className="max-w-lg">
            <Dialog.Header>
              <Dialog.Title>Terms of service</Dialog.Title>
              <Dialog.Description>Read these before you continue.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body className="flex flex-col gap-6">
              {terms.map((term) => (
                <section key={term.title} className="flex flex-col gap-1">
                  <h3 className="font-medium">{term.title}</h3>
                  <p className="text-pretty text-neutral-600 dark:text-neutral-400">{term.body}</p>
                </section>
              ))}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close className={buttonVariants({ variant: "outline" })}>
                Decline
              </Dialog.Close>
              <Dialog.Close className={buttonVariants()}>Accept</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
