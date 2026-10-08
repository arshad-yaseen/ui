import { Basic } from "@/content/ui/components/textarea/basic";
import { Sizes } from "@/content/ui/components/textarea/sizes";
import { Disabled } from "@/content/ui/components/textarea/disabled";
import { Invalid } from "@/content/ui/components/textarea/invalid";
import { Demo } from "@/components/book/demo";
import { PropsTable } from "@/components/book/props-table";
import { H2 } from "@arshad/ui/components/prose/heading";
import { InlineCode } from "@arshad/ui/components/prose/inline-code";
import { P } from "@arshad/ui/components/prose/paragraph";
import type { Article } from "@/lib/content";

export const textarea = {
  slug: "textarea",
  title: "Textarea",
  description: "A multi-line text field.",
  body: (
    <>
      <Demo name="ui/components/textarea/basic">
        <Basic />
      </Demo>

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="ui/components/textarea/sizes">
        <Sizes />
      </Demo>

      <H2>Disabled</H2>
      <P>Prevent interaction with the field.</P>
      <Demo name="ui/components/textarea/disabled">
        <Disabled />
      </Demo>

      <H2>Invalid</H2>
      <P>Shows an error state when the value is invalid.</P>
      <Demo name="ui/components/textarea/invalid">
        <Invalid />
      </Demo>

      <H2>API</H2>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />
      <P>
        Plus the native <InlineCode>textarea</InlineCode> attributes, like{" "}
        <InlineCode>rows</InlineCode>, <InlineCode>value</InlineCode>, and{" "}
        <InlineCode>placeholder</InlineCode>.
      </P>
    </>
  ),
} satisfies Article;
