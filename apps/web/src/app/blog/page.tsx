import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { posts } from "@/content/blog";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Blog</h1>
      <PostList posts={posts} />
    </div>
  );
}
