import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/blog/post-article";
import { JsonLd } from "@/components/site/json-ld";
import { posts } from "@/content/blog";
import { postJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd schema={postJsonLd(post)} />
      <PostArticle post={post}>{post.body}</PostArticle>
    </>
  );
}
