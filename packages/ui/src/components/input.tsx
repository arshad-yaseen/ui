import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@arshad/ui/lib/cn";
import { Input as InputPrimitive } from "@base-ui/react/input";

const inputVariants = cva(
  [
    "block w-full rounded-md text-foreground",
    "bg-[color-mix(in_oklab,var(--color-white)_65%,var(--color-neutral-50))] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_35%,var(--color-neutral-950))]",
    "ring ring-black/8 not-data-disabled:shadow-sm dark:ring-white/10 forced-colors:border",
    "inset-shadow-[0_0_0_100vmax] inset-shadow-transparent not-data-disabled:hover:inset-shadow-black/2 dark:not-data-disabled:hover:inset-shadow-white/1.25",
    "placeholder:text-neutral-600 dark:placeholder:text-neutral-400",
    "transition-[color,box-shadow] duration-150 motion-reduce:transition-none",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
    "data-invalid:ring-danger-500/50 data-invalid:focus-visible:outline-danger-500 dark:data-invalid:ring-danger-500/50",
    "data-disabled:cursor-not-allowed data-disabled:bg-neutral-200/50 data-disabled:opacity-50 dark:data-disabled:bg-neutral-800/50",
  ],
  {
    variants: {
      size: {
        sm: "min-h-7 px-2 py-0.5 text-sm/6",
        md: "min-h-8 px-2.5 py-1 text-sm/6",
        lg: "min-h-9 px-3 py-1.5 text-sm/6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputProps = Omit<InputPrimitive.Props, "size"> & VariantProps<typeof inputVariants>;

export function Input({ size, className, ...props }: InputProps) {
  return <InputPrimitive className={cn(inputVariants({ size }), className)} {...props} />;
}
