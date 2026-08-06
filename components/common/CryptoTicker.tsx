"use client";

import React, { useEffect, useState } from "react";
import { getCryptoPrice, getCryptoPrices } from "@/lib/api";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface CryptoTickerProps {
  coins?: string[];
  compact?: boolean;
}

export default function CryptoTicker({ coins = ["bitcoin", "ethereum", "binancecoin", "solana", "ripple"], compact = false }: CryptoTickerProps) {
  const [prices, setPrices] = useState<
    {
      id: string;
      symbol: string;
      name: string;
      inr: number;
      change: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const coinMap: { [key: string]: { symbol: string; name: string } } = {
          bitcoin: { symbol: "BTC", name: "Bitcoin" },
          ethereum: { symbol: "ETH", name: "Ethereum" },
          binancecoin: { symbol: "BNB", name: "BNB" },
          solana: { symbol: "SOL", name: "Solana" },
          ripple: { symbol: "XRP", name: "XRP" },
          cardano: { symbol: "ADA", name: "Cardano" },
          dogecoin: { symbol: "DOGE", name: "Dogecoin" },
        };

        const cryptoData = await getCryptoPrices(coins);
        if (cryptoData) {
          const formatted = coins
            .map((id) => {
              const data = cryptoData[id];
              if (!data) return null;
              return {
                id,
                symbol: coinMap[id]?.symbol || id.slice(0, 4).toUpperCase(),
                name: coinMap[id]?.name || id,
                inr: data.inr,
                change: data.change_24h,
              };
            })
            .filter(Boolean) as { id: string; symbol: string; name: string; inr: number; change: number }[];
          setPrices(formatted);
        }
      } catch (e) {
        console.error("Failed to fetch crypto prices", e);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 120000); // Refresh every 2 min
    return () => clearInterval(interval);
  }, [coins]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-400">
        <Activity className="w-4 h-4 animate-pulse" />
        <span className="text-xs">Loading crypto prices...</span>
      </div>
    );
  }

  return (
    <div className={`flex ${compact ? "flex-wrap gap-3" : "flex-col gap-2"}`}>
      {prices.map((coin) => (
        <div
          key={coin.id}
          className={`flex items-center justify-between ${compact ? "flex-1 min-w-[120px]" : ""} p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{coin.symbol}</span>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-900 dark:text-white">₹{coin.inr.toLocaleString("en-IN")}</div>
            <div
              className={`text-[10px] flex items-center gap-0.5 ${coin.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
            >
              {coin.change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {Math.abs(coin.change).toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
