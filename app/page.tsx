import type { Metadata } from "next";
import NewsFeed from "@/components/common/NewsFeed";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import TrendingTools from "@/components/home/TrendingTools";
import LivePrices from "@/components/home/LivePrices";
import StatsBanner from "@/components/home/StatsBanner";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tradivex.com").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Tradivex - Compare Trading Platforms, Brokers & Market Tools",
  description: "Compare trading platforms, brokers, exchanges, market data, and educational calculators in one neutral directory.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tradivex - Compare Trading Platforms, Brokers & Market Tools",
    description: "Compare trading platforms, brokers, exchanges, market data, and educational calculators in one neutral directory.",
    url: siteUrl,
    type: "website",
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Tradivex",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Tradivex",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <div id="news"><NewsFeed /></div>
      <Hero />
      <Categories />
      <TrendingTools />
      <LivePrices />
      <StatsBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
