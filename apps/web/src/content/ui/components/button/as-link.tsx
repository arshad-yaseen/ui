import Link from "next/link";
import { buttonVariants } from "@arshad/ui/components/button";
import { Icon } from "@arshad/ui/components/icon";

export function AsLink() {
  return (
    <Link href="/ui/" className={buttonVariants({ color: "neutral" })}>
      Introduction
      <Icon name="ArrowUpRight" />
    </Link>
  );
}
