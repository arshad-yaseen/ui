import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { ScrollToHash } from "@/components/site/scroll-to-hash";
import { OG_SIZE, ogImageUrl } from "@/lib/metadata";
import { site } from "@/lib/site";
import { ThemeProvider } from "@arshad/ui/components/theme-provider";
import { fonts } from "@arshad/ui/config/fonts";
import { themeColor } from "@arshad/ui/config/theme-color";
import { cn } from "@arshad/ui/lib/cn";

import "@/app/globals.css";

const image = {
  url: ogImageUrl(site.name, "Build better interfaces, faster."),
  ...OG_SIZE,
  alt: site.description,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [site.author],
  creator: site.author.name,
  publisher: site.author.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: site.twitter,
    site: site.twitter,
    images: [image],
  },
};

export const viewport: Viewport = { themeColor: [...themeColor] };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className={fonts.variables}>
      <body
        className={cn(
          "font-sans antialiased",
          "[--header-height:--spacing(16)] [--layout-width:var(--container-4xl)]",
          "[--layout-padding:--spacing(4)]",
        )}
      >
        <ThemeProvider>
          {children}
          <ScrollToHash />
        </ThemeProvider>
      </body>
    </html>
  );
}
