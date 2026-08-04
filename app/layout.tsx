import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomChatbot from "@/components/common/CustomChatbot";
import CookieConsent from "@/components/layout/CookieConsent";

export const metadata: Metadata = {
  title: "Tradivex - Trading Tools, Comparisons & Calculators",
  description:
    "Tradivex is a neutral directory for comparing trading platforms, brokers, exchanges, market tools, and calculators.",
  keywords: "trading tools directory, broker comparison, forex brokers, crypto exchanges, stock brokers, trading platforms",
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
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CustomChatbot />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
