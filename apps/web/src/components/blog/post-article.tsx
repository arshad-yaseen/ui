import type { DatedArticle } from "@/lib/content";
import type { PropsWithChildren } from "react";
import { formatDate } from "@/lib/date";
import { cn } from "@arshad/ui/lib/cn";

type PostArticleProps = PropsWithChildren<{
  post: DatedArticle;
}>;

export function PostArticle({ post, children }: PostArticleProps) {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="max-w-xl font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          className="font-mono text-xs text-neutral-600 tabular-nums dark:text-neutral-400"
        >
          {formatDate(post.date)}
        </time>
      </header>
      <div
        className={cn(
          "flex flex-col gap-6",
          // Code blocks are bare in the component docs, but filled inside a post.
          "**:data-[slot=code-block]:bg-neutral-100/60",
          "dark:**:data-[slot=code-block]:bg-neutral-900/60",
        )}
      >
        {children}
      </div>
    </article>
  );
}
