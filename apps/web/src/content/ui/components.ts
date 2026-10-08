import { avatar } from "@/content/ui/components/avatar";
import { button } from "@/content/ui/components/button";
import { input } from "@/content/ui/components/input";
import { loaders } from "@/content/ui/components/loaders";
import { select } from "@/content/ui/components/select";
import { textarea } from "@/content/ui/components/textarea";
import type { Section } from "@/lib/content";

export const components: Section = {
  slug: "components",
  title: "Components",
  articles: [button, input, textarea, select, avatar, loaders],
};
