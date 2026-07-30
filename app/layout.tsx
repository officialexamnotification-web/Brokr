import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomChatbot from "@/components/common/CustomChatbot";

export const metadata: Metadata = {
  title: "Brokr - Compare Best Trading Tools & Brokers",
  description:
    "Independent reviews, detailed comparisons and expert ratings to help you find the perfect trading platform. Compare forex brokers, crypto exchanges, stock brokers and more.",
  keywords: "trading tools, broker comparison, forex brokers, crypto exchanges, stock brokers, trading platform reviews",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
