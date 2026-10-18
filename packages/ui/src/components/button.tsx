import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@arshad/ui/lib/cn";

const OUTLINE_SURFACE =
  "[--outline-bg:var(--color-background)] [--outline-ring:var(--color-black)]/8 dark:[--outline-ring:var(--color-white)]/10 data-disabled:[--outline-bg:var(--color-neutral-200)]/50 dark:data-disabled:[--outline-bg:var(--color-neutral-800)]/50";

const buttonRecipe = cva(
  [
    "relative isolate inline-flex items-center justify-center gap-x-2 rounded-md font-medium",
    "forced-colors:border",
    "cursor-default touch-manipulation [a]:cursor-pointer",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-disabled:cursor-not-allowed data-disabled:opacity-50",
    "transition-[background-color,box-shadow,color,scale] duration-200 motion-reduce:transition-none",
    "not-data-disabled:active:scale-97 motion-reduce:active:scale-100",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center",
    "*:data-[slot=icon]:transition-[color] *:data-[slot=icon]:duration-200",
  ],
  {
    variants: {
      variant: {
        solid: ["bg-(--solid-bg) text-(--solid-fg) *:data-[slot=icon]:text-(--solid-icon)"],
        outline: [
          "bg-(--outline-bg) text-(--plain-fg) *:data-[slot=icon]:text-(--plain-icon)",
          "ring ring-(--outline-ring) not-data-disabled:shadow-sm",
        ],
        plain: ["bg-(--plain-bg) text-(--plain-fg) *:data-[slot=icon]:text-(--plain-icon)"],
      },
      color: {
        neutral: [
          "[--plain-bg:transparent] [--plain-fg:var(--color-neutral-900)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-fg:var(--color-white)] dark:[--plain-icon:var(--color-neutral-400)] hover-open:[--plain-bg:var(--color-neutral-200)] dark:hover-open:[--plain-bg:var(--color-neutral-800)]",

          "[--solid-bg:var(--color-neutral-200)] [--solid-icon:var(--color-neutral-900)] dark:[--solid-bg:var(--color-neutral-800)] dark:[--solid-icon:var(--color-neutral-400)] hover-open:[--solid-bg:color-mix(in_oklab,var(--color-neutral-200)_85%,var(--color-neutral-300))] dark:hover-open:[--solid-bg:color-mix(in_oklab,var(--color-neutral-800)_85%,var(--color-neutral-700))] dark:hover-open:[--solid-icon:var(--color-neutral-300)]",

          OUTLINE_SURFACE,
        ],
        "dark/white": [
          "[--plain-bg:transparent] [--plain-fg:var(--color-neutral-900)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-fg:var(--color-white)] dark:[--plain-icon:var(--color-neutral-400)] hover-open:[--plain-bg:var(--color-neutral-900)] hover-open:[--plain-fg:var(--color-white)] hover-open:[--plain-icon:var(--color-neutral-400)] dark:hover-open:[--plain-bg:var(--color-white)] dark:hover-open:[--plain-fg:var(--color-neutral-900)] dark:hover-open:[--plain-icon:var(--color-neutral-500)]",

          "[--solid-bg:var(--color-neutral-900)] [--solid-fg:var(--color-white)] [--solid-icon:var(--color-neutral-400)] dark:[--solid-bg:var(--color-white)] dark:[--solid-fg:var(--color-neutral-900)] dark:[--solid-icon:var(--color-neutral-500)] hover-open:[--solid-bg:var(--color-neutral-800)] dark:hover-open:[--solid-bg:var(--color-neutral-100)]",

          "[--outline-bg:var(--color-background)] [--outline-ring:var(--color-black)]/60 dark:[--outline-ring:var(--color-white)]/60 hover-open:bg-none hover-open:[--outline-bg:var(--color-neutral-900)] hover-open:[--outline-ring:var(--color-neutral-900)] dark:hover-open:[--outline-bg:var(--color-white)] dark:hover-open:[--outline-ring:var(--color-white)]",
        ],
        accent: [
          "[--plain-bg:transparent] [--plain-fg:var(--color-accent-600)] [--plain-icon:var(--color-accent-500)] dark:[--plain-fg:var(--color-accent-400)] hover-open:[--plain-bg:var(--color-accent-500)]/10",

          "[--solid-bg:var(--color-accent-600)] [--solid-fg:var(--color-white)] [--solid-icon:var(--color-accent-100)] hover-open:[--solid-bg:var(--color-accent-700)]",

          OUTLINE_SURFACE,
        ],
        success: [
          "[--plain-bg:transparent] [--plain-fg:var(--color-success-800)] [--plain-icon:var(--color-success-500)] dark:[--plain-fg:var(--color-success-400)] hover-open:[--plain-bg:var(--color-success-500)]/10",

          "[--solid-bg:var(--color-success-700)] [--solid-fg:var(--color-white)] [--solid-icon:var(--color-success-100)] hover-open:[--solid-bg:var(--color-success-800)]",

          OUTLINE_SURFACE,
        ],
        danger: [
          "[--plain-bg:transparent] [--plain-fg:var(--color-danger-700)] [--plain-icon:var(--color-danger-500)] dark:[--plain-fg:var(--color-danger-400)] hover-open:[--plain-bg:var(--color-danger-500)]/10",

          "[--solid-bg:var(--color-danger-600)] [--solid-fg:var(--color-white)] [--solid-icon:var(--color-danger-100)] hover-open:[--solid-bg:var(--color-danger-700)]",

          OUTLINE_SURFACE,
        ],
      },
      size: {
        sm: ["min-h-7 px-2 py-0.5 text-sm/6", "*:data-[slot=icon]:size-3.5"],
        md: ["min-h-8 px-2.5 py-1 text-sm/6", "*:data-[slot=icon]:size-4"],
        lg: ["min-h-9 px-3 py-1.5 text-sm/6", "*:data-[slot=icon]:size-4.5"],
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        className: [
          "bg-linear-to-b from-white/85 to-neutral-100/65 dark:from-neutral-800/25 dark:to-neutral-900/25",
          "inset-shadow-[0_0_0_100vmax] inset-shadow-transparent hover-open:inset-shadow-black/2 dark:hover-open:inset-shadow-white/1.25",
        ],
      },
      {
        variant: "solid",
        color: ["neutral"],
        className: "inset-shadow-white/6 inset-ring-white/4 dark:inset-shadow-2xs dark:inset-ring",
      },
      {
        variant: "solid",
        color: ["accent", "success", "danger"],
        className:
          "inset-shadow-white/15 inset-ring-white/12 dark:inset-shadow-2xs dark:inset-ring",
      },
    ],
    defaultVariants: {
      size: "md",
    },
  },
);

const DEFAULT_VARIANT = "solid";

const DEFAULT_COLOR_BY_VARIANT = {
  solid: "dark/white",
  outline: "neutral",
  plain: "neutral",
} as const;

export type ButtonVariants = VariantProps<typeof buttonRecipe>;

export function buttonVariants({ variant, color, ...variants }: ButtonVariants = {}) {
  const resolvedVariant = variant ?? DEFAULT_VARIANT;

  return buttonRecipe({
    ...variants,
    variant: resolvedVariant,
    color: color ?? DEFAULT_COLOR_BY_VARIANT[resolvedVariant],
  });
}

export type ButtonProps = ButtonPrimitive.Props & ButtonVariants;

export function Button({ variant, color, size, className, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      {...props}
      className={cn(buttonVariants({ variant, color, size }), className)}
    />
  );
}
