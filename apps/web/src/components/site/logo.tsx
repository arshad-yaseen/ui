import type { SVGProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

type LogoProps = SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 256 221.7"
      aria-hidden="true"
      className={cn("h-8 shrink-0", className)}
      {...props}
    >
      <path fill="currentColor" d="M128 0L256 221.7H0Z" />
    </svg>
  );
}
