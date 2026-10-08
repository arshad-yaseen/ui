import { components } from "@/content/ui/components";
import { introduction } from "@/content/ui/introduction";
import { notes } from "@/content/ui/notes";
import type { Book } from "@/lib/content";

export const ui: Book = {
  base: "/ui",
  title: "UI",
  root: introduction,
  sections: [notes, components],
};
