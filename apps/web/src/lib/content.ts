import type { ReactNode } from "react";

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: ReactNode;
  /** Publish date, ISO 8601 (YYYY-MM-DD). Set in dated collections. */
  date?: string;
};

/** An article in a chronological collection, where the date is what orders it. */
export type DatedArticle = Article & {
  date: string;
};

export type Section = {
  slug: string;
  title: string;
  /** In the order the sidebar shows them. */
  articles: Article[];
  /**
   * A section with a page lists its articles there and sits in the sidebar as one link.
   * Without one it opens on its first article and shows its articles in the sidebar.
   */
  page?: Pick<Article, "description" | "body">;
};

export type Book = {
  /** The path every page in the book sits under, such as `/ui`. */
  base: string;
  /** Names the book in page titles. */
  title: string;
  root: Article;
  sections: Section[];
};

export type Page = {
  href: string;
  article: Article;
};

export type NavItem = {
  title: string;
  href: string;
  /** Only highlight on an exact pathname match, not on descendant routes. */
  isExact?: boolean;
};

/** A titled group renders as a labelled list, an untitled one as bare links. */
export type NavGroup = {
  title?: string;
  items: NavItem[];
};

/** Every page in reading order, which is also the order pagination walks. */
export function pages(book: Book): Page[] {
  return [
    { href: book.base, article: book.root },
    ...book.sections.flatMap((section) => {
      const base = `${book.base}/${section.slug}`;
      const own = section.page
        ? [{ href: base, article: { slug: section.slug, title: section.title, ...section.page } }]
        : [];
      return [
        ...own,
        ...section.articles.map((article) => ({ href: `${base}/${article.slug}`, article })),
      ];
    }),
  ];
}

/** The sidebar: the root and every section with a page as links, then the rest as groups. */
export function nav(book: Book): NavGroup[] {
  const links = [
    { title: book.root.title, href: book.base, isExact: true },
    ...book.sections
      .filter((section) => section.page)
      .map((section) => ({ title: section.title, href: `${book.base}/${section.slug}` })),
  ];
  const groups = book.sections
    .filter((section) => !section.page)
    .map((section) => ({
      title: section.title,
      items: section.articles.map((article) => ({
        title: article.title,
        href: `${book.base}/${section.slug}/${article.slug}`,
      })),
    }));

  return [{ items: links }, ...groups];
}
