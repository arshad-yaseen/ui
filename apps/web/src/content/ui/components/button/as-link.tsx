import Link from "next/link";
import { buttonVariants } from "@arshad/ui/components/button";
import { Icon } from "@arshad/ui/components/icon";
import type { Route } from "next";

export function AsLink() {
  // `/ui` is answered by an optional catch-all, which `Route` cannot prove.
  return (
    <Link href={"/ui" as Route} className={buttonVariants({ color: "neutral" })}>
      Introduction
      <Icon name="ArrowUpRight" />
    </Link>
  );
}
