import { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider";

import "@/styles/global.css";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "react",
    "ui",
    "ui-library",
    "shadcn-ui",
    "accessibility",
    "wai-aria",
  ],
  authors: [
    {
      name: "azacdev",
      url: "https://www.azacdev.com",
    },
  ],
  creator: "azacdev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@azacdev",
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
          <Toaster position="top-right" />
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
