const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui.arshad.fyi";

export const site = {
  name: "arshad/ui",
  title: "arshad/ui",
  description: "A design system for modern interfaces, made with care down to the last detail.",
  url,
  author: { name: "Arshad Yaseen", url: "https://arshad.fyi" },
  twitter: "@arshadyaseeen",
} as const;
