import type { Metadata } from "next";
import { site } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Root-relative, so `metadataBase` resolves it. Served by `app/og/route.tsx`. */
export function ogImageUrl(title: string, subtitle: string): string {
  return `/og?${new URLSearchParams({ title, subtitle })}`;
}

type CreateMetadataOptions = {
  title: string;
  description?: string;
  /** Root-relative path, resolved against `metadataBase` for canonical and OG URLs. */
  path: string;
  /** ISO 8601 date. Marks the page as an article rather than a website. */
  publishedTime?: string;
};

export function createMetadata({
  title,
  description = site.description,
  path,
  publishedTime,
}: CreateMetadataOptions): Metadata {
  const image = { url: ogImageUrl(title, site.name), ...OG_SIZE, alt: title };

  const shared = {
    title,
    description,
    url: path,
    siteName: site.name,
    locale: "en_US",
    images: [image],
  };

  const openGraph: Metadata["openGraph"] = publishedTime
    ? { ...shared, type: "article", publishedTime, authors: [site.author.name] }
    : { ...shared, type: "website" };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: site.twitter,
      site: site.twitter,
      images: [image],
    },
  };
}
