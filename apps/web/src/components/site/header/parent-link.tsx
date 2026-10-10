"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import type { NavItem } from "@/lib/content";
import { site } from "@/lib/site";

type ParentLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** The pages this link can land on besides home. A path that is not one of them is skipped. */
  pages?: NavItem[];
};

const home: NavItem = { title: site.name, href: "/" };

/** The nearest of `pages` above `pathname`, or home when none is. */
function findParent(pathname: string, pages: NavItem[]): NavItem {
  if (pathname === "/") {
    return home;
  }

  const path = pathname.slice(0, pathname.lastIndexOf("/")) || "/";
  return pages.find((page) => page.href === path) ?? findParent(path, pages);
}

/** Links to the nearest page above the current one, named for it, so each click walks toward home. */
export function ParentLink({ pages = [], ...props }: ParentLinkProps) {
  const pathname = usePathname();
  const parent = findParent(pathname, pages);

  return <Link href={parent.href as Route} aria-label={parent.title} {...props} />;
}
