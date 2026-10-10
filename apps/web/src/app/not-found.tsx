import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/header";
import { buttonVariants } from "@arshad/ui/components/button";
import { P } from "@arshad/ui/components/prose/paragraph";
import { cn } from "@arshad/ui/lib/cn";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="px-(--layout-padding)">
        <div className="mx-auto flex max-w-(--layout-width) flex-col items-start gap-8 pt-16 sm:pt-24">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-medium tracking-tight text-balance">Page not found</h1>
            <P className="max-w-2xl">
              Check the address for a typo, or start again from the home page.
            </P>
          </div>
          <Link href="/" className={cn(buttonVariants(), "rounded-full")}>
            Go home
          </Link>
        </div>
      </main>
    </>
  );
}
