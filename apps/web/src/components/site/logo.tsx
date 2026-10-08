import type { SVGProps } from "react";
import { cn } from "@arshad/ui/lib/cn";

type LogoProps = SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 19.9 15"
      aria-hidden="true"
      className={cn("h-8 shrink-0", className)}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5 0a7.5 7.5 0 1 1 0 15a7.5 7.5 0 1 1 0-15Zm0 3.25a4.25 4.25 0 1 0 0 8.5a4.25 4.25 0 1 0 0-8.5Z"
      />
      <path fill="currentColor" d="M11.5 15h3.4l5-15h-3.4Z" />
    </svg>
  );
}
