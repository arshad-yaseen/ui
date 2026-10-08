import { Hero } from "@/components/home/hero";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { websiteJsonLd } from "@/lib/json-ld";

export default function Home() {
  return (
    <>
      <Header />
      <main className="px-(--layout-padding)">
        <JsonLd schema={websiteJsonLd()} />
        <Hero />
      </main>
    </>
  );
}
