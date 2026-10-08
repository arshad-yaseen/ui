import { Basic } from "@/content/ui/components/avatar/basic";
import { Sizes } from "@/content/ui/components/avatar/sizes";
import { Fallback } from "@/content/ui/components/avatar/fallback";
import { Group } from "@/content/ui/components/avatar/group";
import { Demo } from "@/components/book/demo";
import { PropsTable } from "@/components/book/props-table";
import { A } from "@arshad/ui/components/prose/anchor";
import { H2 } from "@arshad/ui/components/prose/heading";
import { InlineCode } from "@arshad/ui/components/prose/inline-code";
import { P } from "@arshad/ui/components/prose/paragraph";
import type { Article } from "@/lib/content";

export const avatar = {
  slug: "avatar",
  title: "Avatar",
  description: "A user’s image, with initials as a fallback.",
  body: (
    <>
      <Demo name="ui/components/avatar/basic">
        <Basic />
      </Demo>

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="ui/components/avatar/sizes">
        <Sizes />
      </Demo>

      <H2>Fallback</H2>
      <P>Shown while the image loads or if it fails.</P>
      <Demo name="ui/components/avatar/fallback">
        <Fallback />
      </Demo>

      <H2>Group</H2>
      <P>Overlap avatars to show a set of people.</P>
      <Demo name="ui/components/avatar/group">
        <Group />
      </Demo>

      <H2>API</H2>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />
      <P>
        <InlineCode>size</InlineCode> is set on <InlineCode>Avatar.Root</InlineCode>. Plus
        everything from <A href="https://base-ui.com/react/components/avatar">Base UI Avatar</A>.
      </P>
    </>
  ),
} satisfies Article;
