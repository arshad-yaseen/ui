import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@arshad/ui/lib/cn";

const triggerVariants = cva(
  [
    "relative inline-flex min-w-44 items-center justify-between gap-2",
    "cursor-pointer rounded-md font-normal whitespace-nowrap select-none",
    "bg-background text-foreground",
    "bg-linear-to-b from-white to-neutral-100/80 dark:from-neutral-800/28 dark:to-neutral-900/25",
    "ring ring-black/8 not-data-disabled:shadow-sm dark:ring-white/10 forced-colors:border",
    "inset-shadow-[0_0_0_100vmax] inset-shadow-transparent hover-open:inset-shadow-black/2 dark:hover-open:inset-shadow-white/1.25",
    "data-disabled:cursor-not-allowed data-disabled:bg-neutral-200/50 data-disabled:opacity-50 dark:data-disabled:bg-neutral-800/50",
    "data-invalid:ring-danger-500/50 dark:data-invalid:ring-danger-500/50",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-invalid:focus-visible:outline-danger-500",
    "transition-[background-color,box-shadow,color] duration-200 motion-reduce:transition-none",
    "*:data-[slot=icon]:shrink-0",
  ],
  {
    variants: {
      size: {
        sm: ["min-h-7 py-0.5 ps-2.5 pe-1.5 text-sm/6", "*:data-[slot=icon]:size-3.5"],
        md: ["min-h-8 py-1 ps-2.5 pe-2 text-sm/6", "*:data-[slot=icon]:size-4"],
        lg: ["min-h-9 py-1.5 ps-2.5 pe-2.5 text-sm/6", "*:data-[slot=icon]:size-4.5"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof triggerVariants>;

export function Trigger({ size, className, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(triggerVariants({ size }), className)}
      {...props}
    />
  );
}
