import type { DatedArticle } from "@/lib/content";
import { ogImageUrl } from "@/lib/metadata";
import { site } from "@/lib/site";

const author = {
  "@type": "Person",
  name: site.author.name,
  url: site.author.url,
};

export function websiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    author,
  };
}

export function postJsonLd(post: DatedArticle): object {
  const url = `${site.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: url,
    image: `${site.url}${ogImageUrl(post.title, site.name)}`,
    author,
    publisher: author,
  };
}
