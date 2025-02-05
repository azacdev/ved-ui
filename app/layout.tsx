import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";


export const metadata: Metadata = {
  title: "Ved UI",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body
        className={`min-h-screen bg-background antialiased w-full mx-auto scroll-smooth`}
      >
         <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
        >
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
