import type { Route } from "next";
import { NavLink } from "@/components/book/nav-link";
import type { NavGroup } from "@/lib/content";
import { cn } from "@arshad/ui/lib/cn";

type SidebarProps = {
  nav: NavGroup[];
};

export function Sidebar({ nav }: SidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-(--header-height) hidden md:block",
        "h-[calc(100dvh-var(--header-height))] w-(--sidebar-width) shrink-0",
        "self-start py-8 pr-6",
      )}
    >
      <nav className="flex flex-col gap-8">
        {nav.map((group) => (
          <div key={group.title ?? group.items[0]?.href} className="flex flex-col gap-2">
            {group.title && <p className="text-sm font-medium">{group.title}</p>}
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  {/* Every href comes from a content index, which `Route` cannot prove. */}
                  <NavLink href={item.href as Route} isExact={item.isExact}>
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
