import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

const textareaVariants = cva(
  [
    "block min-h-16 w-full resize-y rounded-md",
    "bg-background text-foreground",
    "bg-linear-to-b from-white to-neutral-100/80 dark:from-neutral-800/28 dark:to-neutral-900/25",
    "ring ring-black/8 enabled:shadow-sm dark:ring-white/10 forced-colors:border",
    "inset-shadow-[0_0_0_100vmax] inset-shadow-transparent enabled:hover:inset-shadow-black/2 dark:enabled:hover:inset-shadow-white/1.25",
    "placeholder:text-neutral-600 dark:placeholder:text-neutral-400",
    "transition-[color,box-shadow] duration-200 motion-reduce:transition-none",

    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
    "data-invalid:ring-danger-500/50 data-invalid:focus-visible:outline-danger-500 dark:data-invalid:ring-danger-500/50",
    "disabled:cursor-not-allowed disabled:bg-neutral-200/50 disabled:opacity-50 dark:disabled:bg-neutral-800/50",
  ],
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-sm/6",
        md: "px-2.5 py-1.5 text-sm/6",
        lg: "px-3 py-2 text-sm/6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TextareaProps = ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>;

export function Textarea({ size, className, ...props }: TextareaProps) {
  return <textarea className={cn(textareaVariants({ size }), className)} {...props} />;
}
