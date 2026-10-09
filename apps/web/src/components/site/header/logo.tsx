import type { SVGProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

type LogoProps = SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("h-8 shrink-0", className)}
      {...props}
    >
      <path fill="currentColor" d="M0 16h6.5L16 0H9.5Z" />
    </svg>
  );
}
