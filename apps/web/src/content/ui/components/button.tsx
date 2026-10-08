import { Basic } from "@/content/ui/components/button/basic";
import { Sizes } from "@/content/ui/components/button/sizes";
import { Colors } from "@/content/ui/components/button/colors";
import { Icons } from "@/content/ui/components/button/icons";
import { Elevated } from "@/content/ui/components/button/elevated";
import { Loading } from "@/content/ui/components/button/loading";
import { AsLink } from "@/content/ui/components/button/as-link";
import { Demo } from "@/components/book/demo";
import { PropsTable } from "@/components/book/props-table";
import { A } from "@arshad/ui/components/prose/anchor";
import { H2 } from "@arshad/ui/components/prose/heading";
import { InlineCode } from "@arshad/ui/components/prose/inline-code";
import { P } from "@arshad/ui/components/prose/paragraph";
import type { Article } from "@/lib/content";

export const button = {
  slug: "button",
  title: "Button",
  description: "Triggers an action.",
  body: (
    <>
      <Demo name="ui/components/button/basic">
        <Basic />
      </Demo>

      <P>
        Defaults to <InlineCode>type="button"</InlineCode> so it never submits forms by accident.
        While pressed it scales to 97%, unless the reader prefers reduced motion.
      </P>

      <H2>Sizes</H2>
      <Demo name="ui/components/button/sizes">
        <Sizes />
      </Demo>

      <H2>Colors</H2>
      <Demo name="ui/components/button/colors">
        <Colors />
      </Demo>

      <H2>Icons</H2>
      <P>
        Place an <InlineCode>Icon</InlineCode> on either side of the label. Icon-only buttons need
        an <InlineCode>aria-label</InlineCode>.
      </P>
      <Demo name="ui/components/button/icons">
        <Icons />
      </Demo>

      <H2>Elevated</H2>
      <P>
        Opt in to <InlineCode>isElevated</InlineCode> for an inset highlight on solid buttons.
      </P>
      <Demo name="ui/components/button/elevated">
        <Elevated />
      </Demo>

      <H2>Loading</H2>
      <P>
        Pass <InlineCode>disabled</InlineCode> and drop a dot matrix loader in as the icon for a
        loading state. Mark the loader <InlineCode>aria-hidden</InlineCode>, since the label already
        says what is happening.
      </P>
      <Demo name="ui/components/button/loading">
        <Loading />
      </Demo>

      <H2>Link</H2>
      <P>
        Pass an element to <InlineCode>render</InlineCode> to render the button as something else,
        like a link. Native button semantics are dropped automatically.
      </P>
      <Demo name="ui/components/button/as-link">
        <AsLink />
      </Demo>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "variant", type: '"solid" | "outline" | "plain"', default: '"solid"' },
          {
            name: "color",
            type: '"neutral" | "dark/white" | "accent" | "success" | "danger"',
            default: '"dark/white"',
          },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "isElevated", type: "boolean", default: "false" },
        ]}
      />
      <P>
        Plus everything from{" "}
        <A href="https://base-ui.com/react/components/button">Base UI Button</A>, including{" "}
        <InlineCode>render</InlineCode> and <InlineCode>disabled</InlineCode>.
      </P>
    </>
  ),
} satisfies Article;
