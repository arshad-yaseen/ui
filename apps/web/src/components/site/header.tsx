import { Logo } from "@/components/site/logo";
import { ParentLink } from "@/components/site/parent-link";
import type { NavItem } from "@/lib/content";
import { ThemeToggle } from "@arshad/ui/components/theme-toggle";
import { cn } from "@arshad/ui/lib/cn";

type HeaderProps = {
  /** The pages the logo can walk up through besides home. */
  pages?: NavItem[];
};

export function Header({ pages }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 px-(--layout-padding)",
        "border-b-hairline border-current/10 bg-background",
      )}
    >
      <div className="mx-auto flex h-(--header-height) max-w-(--layout-width) items-center justify-between">
        <ParentLink pages={pages} className="shrink-0">
          <Logo className="h-5.5" />
        </ParentLink>
        <ThemeToggle className="rounded-full" />
      </div>
    </header>
  );
}
