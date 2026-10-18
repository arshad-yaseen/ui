"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { cn } from "@arshad/ui/lib/cn";

type NavLinkProps<T extends string> = PropsWithChildren<{
  href: Route<T>;
  /** Only highlight on an exact pathname match, not on descendant routes. */
  isExact?: boolean;
}>;

export function NavLink<T extends string>({ href, isExact, children }: NavLinkProps<T>) {
  const pathname = usePathname();
  const isCurrent = pathname === href;
  const isActive = isCurrent || (!isExact && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "-mx-2.5 flex min-h-8 items-center rounded-md px-2.5 py-1 text-sm/6",
        "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isActive
          ? [
              "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white",
              "forced-colors:border",
            ]
          : [
              "text-neutral-600 dark:text-neutral-400",
              "hover:bg-neutral-200/50 hover:text-neutral-900 dark:hover:bg-neutral-800/50 dark:hover:text-white",
            ],
      )}
    >
      {children}
    </Link>
  );
}
