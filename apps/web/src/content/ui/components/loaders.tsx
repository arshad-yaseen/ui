import { Basic } from "@/content/ui/components/loaders/basic";
import { Gallery } from "@/content/ui/components/loaders/gallery";
import { Color } from "@/content/ui/components/loaders/color";
import { Sizes } from "@/content/ui/components/loaders/sizes";
import { Demo } from "@/components/book/demo";
import { PropsTable } from "@/components/book/props-table";
import { H2 } from "@arshad/ui/components/prose/heading";
import { InlineCode } from "@arshad/ui/components/prose/inline-code";
import { P } from "@arshad/ui/components/prose/paragraph";
import type { Article } from "@/lib/content";

export const loaders = {
  slug: "loaders",
  title: "Loaders",
  description: "A set of 5×5 dot matrix loaders, each a self-contained SVG.",
  body: (
    <>
      <Demo name="ui/components/loaders/basic">
        <Basic />
      </Demo>

      <P>
        Every loader is one inline SVG with a single embedded keyframe and a per-dot delay map, no
        shared stylesheet and no JavaScript runtime.
      </P>

      <H2>Gallery</H2>
      <P>Thirty-four named patterns, each exported as its own component.</P>
      <Demo name="ui/components/loaders/gallery">
        <Gallery />
      </Demo>

      <H2>Color</H2>
      <P>
        Pass any CSS color to <InlineCode>color</InlineCode>. It defaults to the current
        theme&apos;s foreground, black on light, white on dark.
      </P>
      <Demo name="ui/components/loaders/color">
        <Color />
      </Demo>

      <H2>Sizing</H2>
      <P>
        Set <InlineCode>size</InlineCode> to scale a loader. Drop it down for an inline or
        chat-sized loader, or push it up for emphasis. Every other example here uses the default.
      </P>
      <Demo name="ui/components/loaders/sizes">
        <Sizes />
      </Demo>

      <H2>API</H2>
      <P>Every loader accepts the same props.</P>
      <PropsTable
        rows={[
          { name: "size", type: "number", default: "24" },
          { name: "speed", type: "number", default: "1" },
          { name: "color", type: "string", default: "currentColor" },
          { name: "aria-label", type: "string", default: '"Loading"' },
        ]}
      />
      <P>
        Plus every SVG attribute, including <InlineCode>className</InlineCode>,{" "}
        <InlineCode>style</InlineCode>, and <InlineCode>ref</InlineCode>.
      </P>
    </>
  ),
} satisfies Article;
