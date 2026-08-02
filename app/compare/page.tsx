import React, { Suspense } from "react";
import { tools, Tool } from "@/lib/data";
import Rating from "@/components/common/Rating";
import Badge from "@/components/common/Badge";
import type { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Trading Tools & Brokers Side-by-Side | Brokr",
  description: "Compare trading tools, brokers, and platforms side-by-side. Analyze features, pricing, regulation, and more to make informed trading decisions.",
  keywords: "trading tools comparison, broker comparison, compare trading platforms, side-by-side comparison, trading platform analysis",
  openGraph: {
    title: "Compare Trading Tools | Brokr",
    description: "Compare trading tools and platforms side-by-side using the fields available in each listing.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Trading Tools | Brokr",
    description: "Make informed decisions with our comprehensive trading tools comparison feature.",
  },
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse text-slate-400">Loading...</div>
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  );
}
