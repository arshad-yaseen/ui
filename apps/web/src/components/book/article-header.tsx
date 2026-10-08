import type { Article } from "@/lib/content";
import { P } from "@arshad/ui/components/prose/paragraph";

type ArticleHeaderProps = {
  article: Pick<Article, "title" | "description">;
};

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-medium tracking-tight text-balance">{article.title}</h1>
      <P>{article.description}</P>
    </>
  );
}
