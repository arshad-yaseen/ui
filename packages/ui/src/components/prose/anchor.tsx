import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

export type AProps<T extends string> = Omit<ComponentProps<typeof Link>, "href"> & {
  href: Route<T>;
};

export function A<T extends string>({ href, className, ...props }: AProps<T>) {
  const isExternal = !href.startsWith("/") && !href.startsWith("#");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      {...props}
      className={cn(
        "underline underline-offset-2",
        "text-neutral-900 decoration-neutral-400 dark:text-white dark:decoration-neutral-600",
        "hover:decoration-neutral-500 dark:hover:decoration-neutral-500",
        "transition-colors motion-reduce:transition-none",
        className,
      )}
    />
  );
}
