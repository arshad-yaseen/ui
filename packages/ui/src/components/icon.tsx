import type { ComponentProps, ReactNode } from "react";

const icons = {
  Moon: <path d="M9.44 4.26A8 8 0 1 0 19.74 14.56 8 8 0 0 1 9.44 4.26Z" />,
  Sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.25V4.75M12 19.25v2.5M21.75 12H19.25M4.75 12H2.25M18.89 5.11 17.13 6.87M6.87 17.13 5.11 18.89M18.89 18.89 17.13 17.13M6.87 6.87 5.11 5.11" />
    </>
  ),
  Monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="3" />
      <path d="M12 17v2.5M8 19.5h8" />
    </>
  ),
  ArrowUpRight: <path d="M7.5 16.5 16.5 7.5M9.5 7.5h7v7" />,
  ChevronLeft: <path d="M14 6 9 12l5 6" />,
  ChevronRight: <path d="M10 6l5 6-5 6" />,
  Plus: <path d="M12 5.5v13M5.5 12h13" />,
  GitHub: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2c5.525 0 10 4.475 10 10a10.016 10.016 0 0 1-6.812 9.488c-.5.1-.688-.213-.688-.475 0-.338.013-1.412.013-2.75 0-.938-.312-1.538-.675-1.85 2.225-.25 4.562-1.1 4.562-4.938 0-1.1-.388-1.988-1.025-2.688.1-.25.45-1.275-.1-2.65 0 0-.838-.275-2.75 1.025-.8-.225-1.65-.338-2.5-.338-.85 0-1.7.112-2.5.338-1.913-1.288-2.75-1.025-2.75-1.025-.55 1.375-.2 2.4-.1 2.65-.637.7-1.025 1.6-1.025 2.688 0 3.825 2.325 4.688 4.55 4.938-.288.25-.55.688-.637 1.338-.575.263-2.013.688-2.913-.825-.188-.3-.75-1.037-1.538-1.025-.838.013-.338.475.013.663.425.237.912 1.125 1.025 1.412.2.562.85 1.638 3.362 1.175 0 .838.013 1.625.013 1.863 0 .263-.188.562-.688.475A9.994 9.994 0 0 1 2 12c0-5.525 4.475-10 10-10Z"
    />
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

export type IconProps = Omit<ComponentProps<"svg">, "children"> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      data-slot="icon"
    >
      {icons[name]}
    </svg>
  );
}
