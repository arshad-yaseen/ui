import { Basic } from "@/content/ui/components/select/basic";
import { Sizes } from "@/content/ui/components/select/sizes";
import { Multiple } from "@/content/ui/components/select/multiple";
import { Grouped } from "@/content/ui/components/select/grouped";
import { Descriptions } from "@/content/ui/components/select/descriptions";
import { Icons } from "@/content/ui/components/select/icons";
import { Avatars } from "@/content/ui/components/select/avatars";
import { Disabled } from "@/content/ui/components/select/disabled";
import { Invalid } from "@/content/ui/components/select/invalid";
import { Demo } from "@/components/book/demo";
import { PropsTable } from "@/components/book/props-table";
import { A } from "@arshad/ui/components/prose/anchor";
import { H2, H3 } from "@arshad/ui/components/prose/heading";
import { InlineCode } from "@arshad/ui/components/prose/inline-code";
import { P } from "@arshad/ui/components/prose/paragraph";
import type { Article } from "@/lib/content";

export const select = {
  slug: "select",
  title: "Select",
  description: "Choose one or more values from a dropdown menu.",
  body: (
    <>
      <Demo name="ui/components/select/basic">
        <Basic />
      </Demo>
      <P>A trigger opens a list of options and shows the chosen value.</P>

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="ui/components/select/sizes">
        <Sizes />
      </Demo>

      <H2>Multiple</H2>
      <P>Let users choose more than one option.</P>
      <Demo name="ui/components/select/multiple">
        <Multiple />
      </Demo>

      <H2>Grouped</H2>
      <P>Organize options into labeled sections.</P>
      <Demo name="ui/components/select/grouped">
        <Grouped />
      </Demo>

      <H2>Descriptions</H2>
      <P>Add supporting text below each option.</P>
      <Demo name="ui/components/select/descriptions">
        <Descriptions />
      </Demo>

      <H2>Icons</H2>
      <P>Show an icon next to each option.</P>
      <Demo name="ui/components/select/icons">
        <Icons />
      </Demo>

      <H2>Avatars</H2>
      <P>Show an avatar next to each option.</P>
      <Demo name="ui/components/select/avatars">
        <Avatars />
      </Demo>

      <H2>Disabled</H2>
      <P>Disable the whole control or individual options.</P>
      <Demo name="ui/components/select/disabled">
        <Disabled />
      </Demo>

      <H2>Invalid</H2>
      <P>Shows an error state when the value is invalid.</P>
      <Demo name="ui/components/select/invalid">
        <Invalid />
      </Demo>

      <H2>API</H2>

      <H3>Select.Trigger</H3>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />

      <H3>Select.Positioner</H3>
      <PropsTable rows={[{ name: "sideOffset", type: "number", default: "4" }]} />
      <P>
        Plus everything from{" "}
        <A href="https://base-ui.com/react/components/select">Base UI Select</A>, including{" "}
        <InlineCode>items</InlineCode>, <InlineCode>value</InlineCode>,{" "}
        <InlineCode>defaultValue</InlineCode>, and <InlineCode>onValueChange</InlineCode>. Each part
        wraps the Base UI part of the same name, so <InlineCode>alignItemWithTrigger</InlineCode>,{" "}
        <InlineCode>side</InlineCode>, and the other positioning props go on{" "}
        <InlineCode>Select.Positioner</InlineCode>.
      </P>
    </>
  ),
} satisfies Article;
