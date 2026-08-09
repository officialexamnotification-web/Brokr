import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import SiteChrome from "@/components/layout/SiteChrome";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tradivex.com").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tradivex - Trading Tools, Comparisons & Calculators",
  description:
    "Tradivex is a neutral directory for comparing trading platforms, brokers, exchanges, market tools, and calculators.",
  keywords: "trading tools directory, broker comparison, forex brokers, crypto exchanges, stock brokers, trading platforms",
  openGraph: {
    type: "website",
    siteName: "Tradivex",
    title: "Tradivex - Trading Tools, Comparisons & Calculators",
    description: "A neutral directory for trading tools, platform comparisons, market resources, and educational calculators.",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tradivex - Trading Tools, Comparisons & Calculators",
    description: "Compare trading tools and use educational calculators with provider-specific details and limitations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
