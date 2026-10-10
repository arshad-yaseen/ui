"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/content";
import { Icon } from "@arshad/ui/components/icon";
import { cn } from "@arshad/ui/lib/cn";

const CHEVRON = cn(
  "mt-0.5 hidden size-4 pointer-fine:block",
  "text-neutral-500 dark:text-neutral-400",
  "opacity-0 group-hover:opacity-100",
  "transition-opacity duration-150 motion-reduce:transition-none",
);

type PaginationProps = {
  /** In reading order. */
  pages: NavItem[];
};

export function Pagination({ pages }: PaginationProps) {
  const pathname = usePathname();
  const index = pages.findIndex((page) => page.href === pathname);

  if (index === -1) {
    return null;
  }

  const previous = pages[index - 1];
  const next = pages[index + 1];

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-between gap-4 border-t-hairline border-current/10 pt-6"
    >
      {previous ? (
        <Link href={previous.href as Route} className="group flex items-start gap-2">
          <Icon name="ChevronLeft" className={cn(CHEVRON, "-ml-6")} />
          <span className="flex flex-col gap-1">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Previous</span>
            <span className="text-sm font-medium">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href as Route} className="group flex items-start gap-2 text-right">
          <span className="flex flex-col gap-1">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Next</span>
            <span className="text-sm font-medium">{next.title}</span>
          </span>
          <Icon name="ChevronRight" className={cn(CHEVRON, "-mr-6")} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
