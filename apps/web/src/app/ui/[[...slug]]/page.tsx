import type { Metadata, Route } from "next";
import { notFound, redirect } from "next/navigation";
import { ArticleHeader } from "@/components/book/article-header";
import { ui } from "@/content/ui";
import { pages } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const toSlug = (href: string): string[] => href.slice(ui.base.length).split("/").filter(Boolean);

export const dynamicParams = false;

export function generateStaticParams() {
  // A section without a page still answers at its own path, by redirecting.
  const hrefs = [
    ...pages(ui).map((page) => page.href),
    ...ui.sections.filter((section) => !section.page).map((s) => `${ui.base}/${s.slug}`),
  ];
  return hrefs.map((href) => ({ slug: toSlug(href) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const href = [ui.base, ...slug].join("/");
  const page = pages(ui).find((entry) => entry.href === href);

  if (!page) {
    return {};
  }

  const title = href === ui.base ? ui.title : `${page.article.title} - ${ui.title}`;

  return createMetadata({
    title,
    description: page.article.description,
    path: href,
    publishedTime: page.article.date,
  });
}

export default async function UiPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const href = [ui.base, ...slug].join("/");
  const page = pages(ui).find((entry) => entry.href === href);

  if (page) {
    return (
      <>
        <ArticleHeader article={page.article} />
        {page.article.body}
      </>
    );
  }

  const section = ui.sections.find((entry) => `${ui.base}/${entry.slug}` === href);
  const first = section?.articles[0];

  if (!first) {
    notFound();
  }

  // Every article href is a page of this route, which `Route` cannot prove.
  redirect(`${href}/${first.slug}` as Route);
}
