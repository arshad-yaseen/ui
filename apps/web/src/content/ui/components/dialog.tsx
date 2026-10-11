import { Basic } from "@/content/ui/components/dialog/basic";
import { Scrollable } from "@/content/ui/components/dialog/scrollable";
import { Nested } from "@/content/ui/components/dialog/nested";
import { Demo } from "@/components/book/demo";
import { A } from "@arshad/ui/components/prose/anchor";
import { H2 } from "@arshad/ui/components/prose/heading";
import { InlineCode } from "@arshad/ui/components/prose/inline-code";
import { P } from "@arshad/ui/components/prose/paragraph";
import type { Article } from "@/lib/content";

export const dialog = {
  slug: "dialog",
  title: "Dialog",
  description: "A popup that opens on top of the page.",
  body: (
    <>
      <Demo name="ui/components/dialog/basic">
        <Basic />
      </Demo>

      <H2>Scrollable</H2>
      <P>
        Long content scrolls inside <InlineCode>Dialog.Body</InlineCode>, and a hairline marks each
        edge it is cut off at.
      </P>
      <Demo name="ui/components/dialog/scrollable">
        <Scrollable />
      </Demo>

      <H2>Nested</H2>
      <P>Open a dialog from inside another.</P>
      <Demo name="ui/components/dialog/nested">
        <Nested />
      </Demo>

      <H2>API</H2>
      <P>
        <InlineCode>Dialog.Header</InlineCode>, <InlineCode>Dialog.Body</InlineCode>, and{" "}
        <InlineCode>Dialog.Footer</InlineCode> lay out the popup. Every other part takes the props
        of its <A href="https://base-ui.com/react/components/dialog">Base UI Dialog</A> counterpart.
      </P>
    </>
  ),
} satisfies Article;
