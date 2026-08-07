import type { Metadata } from "next";
import MarketDataPage from "@/components/market/MarketDataPage";

export const metadata: Metadata = {
  title: "US Stocks Market Data | Tradivex",
  description: "Browse 20 US-listed stocks with price, daily range, volume, and trading-session details.",
};

export default function StocksMarketPage() {
  return <MarketDataPage market="stocks" />;
}
