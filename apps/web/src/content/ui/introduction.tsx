import { A } from "@arshad/ui/components/prose/anchor";
import { P } from "@arshad/ui/components/prose/paragraph";
import type { Article } from "@/lib/content";

export const introduction = {
  slug: "introduction",
  title: "Introduction",
  description: "The design system this site is built with.",
  body: (
    <>
      <P>
        arshad/ui is a design system for modern interfaces, made with care down to the last detail.
        It draws on my years of design engineering and on knowing what makes an interface last, so
        it stays easy to work in and holds together as it grows.
      </P>
      <P>
        It is built for agents as much as for people. An agent working in it does its best design
        work and leaves the system as coherent as it found it.
      </P>
      <P>
        Components are built on <A href="https://base-ui.com">Base UI</A>, unstyled accessible
        primitives, and styled with <A href="https://tailwindcss.com">Tailwind CSS</A>.
      </P>
    </>
  ),
} satisfies Article;
