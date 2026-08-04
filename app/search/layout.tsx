import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Trading Tools | Tradivex",
  description: "Search and filter Tradivex’s informational directory of brokers, exchanges, platforms, education resources, and trading tools.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
