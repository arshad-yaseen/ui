import Link from "next/link";
import { Button } from "@arshad/ui/components/button";
import { Icon } from "@arshad/ui/components/icon";
import type { Route } from "next";

export function AsLink() {
  // `/ui` is answered by an optional catch-all, which `Route` cannot prove.
  return (
    <Button color="neutral" render={<Link href={"/ui" as Route} />}>
      Introduction
      <Icon name="ArrowUpRight" />
    </Button>
  );
}
