import { Inter, JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const fonts = {
  sans,
  mono,
  variables: `${sans.variable} ${mono.variable}`,
} as const;
