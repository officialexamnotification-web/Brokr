import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Calculators | Brokr",
  description: "Free educational calculators for forex pip value, position size, P&L, margin, options payoff, brokerage costs, and pivot points.",
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
