const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui.arshad.fyi";

export const site = {
  name: "arshad/ui",
  title: "arshad/ui",
  description: "A handcrafted design system for people and agents.",
  url,
  repository: "https://github.com/arshad-yaseen/ui",
  author: { name: "Arshad Yaseen", url: "https://arshad.fyi" },
  twitter: "@arshadyaseeen",
} as const;
