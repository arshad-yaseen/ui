import type { PropsWithChildren } from "react";
import { Header } from "@/components/site/header";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header pages={[{ title: "Blog", href: "/blog" }]} />
      <main className="mx-auto w-full max-w-2xl px-(--layout-padding) pt-12 pb-32 sm:pt-20">
        {children}
      </main>
    </>
  );
}
