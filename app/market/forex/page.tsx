import type { Metadata } from "next";
import MarketDataPage from "@/components/market/MarketDataPage";

export const metadata: Metadata = {
  title: "Forex Market Data | Tradivex",
  description: "Browse 28 forex reference pairs with current and previous-session rate details.",
};

export default function ForexMarketPage() {
  return <MarketDataPage market="forex" />;
}
