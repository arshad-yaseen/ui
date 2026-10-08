import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@arshad/ui/lib/cn";
import { slugify } from "@arshad/ui/lib/slugify";

type HeadingProps = ComponentProps<"h2"> & {
  as: "h2" | "h3";
};

type AnchorLinkProps = PropsWithChildren<{
  href: string;
}>;

function AnchorLink({ href, children }: AnchorLinkProps) {
  return (
    <a href={href}>
      <span
        aria-hidden
        className={cn(
          "mr-2 -ml-5 select-none",
          "text-foreground/50",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-150 motion-reduce:transition-none",
        )}
      >
        #
      </span>
      {children}
    </a>
  );
}

/** A heading links to itself when it has an id, given by the caller or derived from its text. */
function Heading({ as: Tag, id, className, children, ...props }: HeadingProps) {
  const anchor = id ?? (typeof children === "string" ? slugify(children) : undefined);

  if (!anchor) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag id={anchor} className={cn("group", className)} {...props}>
      <AnchorLink href={`#${anchor}`}>{children}</AnchorLink>
    </Tag>
  );
}

export type H2Props = ComponentProps<"h2">;

export function H2({ className, ...props }: H2Props) {
  return (
    <Heading
      as="h2"
      className={cn("mt-10 text-lg font-medium tracking-tight text-balance", className)}
      {...props}
    />
  );
}

export type H3Props = ComponentProps<"h3">;

export function H3({ className, ...props }: H3Props) {
  return (
    <Heading
      as="h3"
      className={cn("mt-8 text-base font-medium tracking-tight text-balance", className)}
      {...props}
    />
  );
}
