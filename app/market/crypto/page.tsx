import type { Metadata } from "next";
import MarketDataPage from "@/components/market/MarketDataPage";

export const metadata: Metadata = {
  title: "Crypto Market Data | Tradivex",
  description: "Browse 50 cryptocurrencies with price, performance, market-cap, volume, and range details.",
};

export default function CryptoMarketPage() {
  return <MarketDataPage market="crypto" />;
}
