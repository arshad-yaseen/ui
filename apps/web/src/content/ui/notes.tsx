import { shadowsOverBorders } from "@/content/ui/notes/shadows-over-borders";
import type { Section } from "@/lib/content";
import { byDate } from "@/lib/date";
import { A } from "@arshad/ui/components/prose/anchor";
import { Li, Ul } from "@arshad/ui/components/prose/list";

const articles = [shadowsOverBorders].toSorted(byDate);

export const notes: Section = {
  slug: "notes",
  title: "Notes",
  articles,
  page: {
    description: "Short notes on the decisions behind the system.",
    body: (
      <Ul>
        {articles.map((note) => (
          <Li key={note.slug}>
            <A href={`/ui/notes/${note.slug}`}>{note.title}</A>
          </Li>
        ))}
      </Ul>
    ),
  },
};
