import { floatingPoint } from "@/content/blog/floating-point";
import type { DatedArticle } from "@/lib/content";
import { byDate } from "@/lib/date";

export const posts: DatedArticle[] = [floatingPoint].toSorted(byDate);
