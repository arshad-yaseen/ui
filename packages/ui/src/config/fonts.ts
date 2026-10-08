import { Inter, JetBrains_Mono, Libre_Baskerville } from "next/font/google";

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

const serif = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const fonts = {
  sans,
  mono,
  serif,
  /** Class for the root element, so every font token resolves below it. */
  variables: `${sans.variable} ${mono.variable} ${serif.variable}`,
} as const;
