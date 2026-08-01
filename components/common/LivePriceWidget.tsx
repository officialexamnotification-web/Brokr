"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingDown, ShoppingCart, Award, Clock, Check } from "lucide-react";
import { Tool, tools } from "@/lib/data";
import Rating from "./Rating";
import Badge from "./Badge";
import { getCryptoPrices } from "@/lib/api";

interface LivePriceWidgetProps {
  currentTool: Tool;
}

export default function LivePriceWidget({ currentTool }: LivePriceWidgetProps) {
  const [cryptoPrices, setCryptoPrices] = useState<{ [key: string]: { inr: number; usd: number; change_24h: number } } | null>(null);
  const [forexRates, setForexRates] = useState<{ [key: string]: number } | null>(null);
  const [stockPrices, setStockPrices] = useState<{ [key: string]: { price: number; change: number; changePercent: number } } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [crypto, forexResponse, stocksResponse] = await Promise.all([
          getCryptoPrices(["bitcoin", "ethereum", "binancecoin", "ripple", "solana"]),
          fetch('/api/forex?base=USD&targets=INR,EUR,GBP').then(res => res.json()),
          fetch('/api/stocks?symbols=AAPL,GOOGL,MSFT,TSLA,AMZN').then(res => res.json()),
        ]);
        setCryptoPrices(crypto);
        setForexRates(forexResponse);
        setStockPrices(stocksResponse);
      } catch (error) {
        console.error("Failed to fetch live prices:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sameCategory = tools
    .filter((t) => t.categoryId === currentTool.categoryId && t.slug !== currentTool.slug)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 5);

  if (sameCategory.length === 0) return null;

  const curMinDeposit = parseInt(currentTool.minDeposit.replace(/[^0-9]/g, "")) || Infinity;

  return (
    <div className="glass-card rounded-2xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <TrendingDown className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Live Price Comparison
        </h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {loading ? (
          <div className="col-span-full text-center py-4 text-sm text-slate-400">Loading live prices...</div>
        ) : (
          <>
            {cryptoPrices && (
              <div className="col-span-full mb-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Crypto Prices (Live)</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(cryptoPrices).map(([coin, data]) => (
                    <div key={coin} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">{coin}</div>
                      <div className="text-xs text-slate-500">${data.usd.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">₹{data.inr.toLocaleString()}</div>
                      <div className={`text-xs ${data.change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.change_24h >= 0 ? '+' : ''}{data.change_24h.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {stockPrices && (
              <div className="col-span-full mb-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Stock Prices (Live)</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(stockPrices).map(([symbol, data]) => (
                    <div key={symbol} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{symbol}</div>
                      <div className="text-xs text-slate-500">${data.price.toLocaleString()}</div>
                      <div className={`text-xs ${data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {forexRates && (
              <div className="col-span-full mb-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Forex Rates (Live)</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(forexRates).map(([currency, rate]) => (
                    <div key={currency} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300">USD/{currency}</div>
                      <div className="text-xs text-slate-500">{rate.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Pricing updated in real-time</span>
          <Award className="w-3.5 h-3.5 ml-1" />
          <span>Best price guarantee</span>
        </div>
        <Link
          href={`/compare?tools=${[currentTool.slug, ...sameCategory.map((t) => t.slug).slice(0, 3)].join(",")}`}
          className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-1"
        >
          Full comparison <ShoppingCart className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
