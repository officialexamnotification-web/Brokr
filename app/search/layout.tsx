import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Trading Tools | Brokr",
  description: "Search and filter Brokr’s informational directory of brokers, exchanges, platforms, education resources, and trading tools.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
