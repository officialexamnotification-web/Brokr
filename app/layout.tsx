import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import SiteChrome from "@/components/layout/SiteChrome";

// Keep production metadata tied to the verified public domain. A misconfigured
// deployment environment must not be able to publish a third-party canonical.
const siteUrl = "https://www.tradivex.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tradivex - Trading Tools, Comparisons & Calculators",
  description:
    "Tradivex is a neutral directory for comparing trading platforms, brokers, exchanges, market tools, and calculators.",
  keywords: "trading tools directory, broker comparison, forex brokers, crypto exchanges, stock brokers, trading platforms",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/region/us",
      "en-GB": "/region/uk",
      "en-CA": "/region/ca",
      "en-AU": "/region/au",
      "en-IN": "/region/in",
      "en-EU": "/region/eu",
      "x-default": "/",
    },
  },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
