import type { Route } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { DatedArticle } from "@/lib/content";
import { cn } from "@arshad/ui/lib/cn";

type PostListProps = {
  posts: DatedArticle[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <ul className="flex flex-col gap-7">
      {posts.map((post) => (
        <li key={post.slug} className="flex flex-col gap-1">
          <time
            dateTime={post.date}
            className="text-sm text-neutral-500 tabular-nums dark:text-neutral-400"
          >
            {formatDate(post.date, { month: "short" })}
          </time>
          {/* Every slug here comes from a content index, which `Route` cannot prove. */}
          <Link
            href={`/blog/${post.slug}` as Route}
            className={cn(
              "w-fit font-serif text-2xl tracking-tight text-pretty",
              "text-accent-500 dark:text-accent-400",
              "hover:text-accent-600 dark:hover:text-accent-300",
              "transition-colors duration-150 motion-reduce:transition-none",
            )}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
