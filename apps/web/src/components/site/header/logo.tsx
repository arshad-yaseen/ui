import type { SVGProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

type LogoProps = SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2.9 2.9 28.2 28.2"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-8 shrink-0", className)}
      {...props}
    >
      <circle cx="6" cy="6" r="3.1" />
      <circle cx="17" cy="6" r="3.1" opacity="0.16" />
      <circle cx="28" cy="6" r="3.1" />
      <circle cx="6" cy="17" r="3.1" />
      <circle cx="17" cy="17" r="3.1" opacity="0.16" />
      <circle cx="28" cy="17" r="3.1" />
      <circle cx="6" cy="28" r="3.1" />
      <circle cx="17" cy="28" r="3.1" />
      <circle cx="28" cy="28" r="3.1" />
    </svg>
  );
}
