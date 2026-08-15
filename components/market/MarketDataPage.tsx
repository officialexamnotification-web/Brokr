"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowLeft, ArrowUpRight, BarChart3, Bitcoin, DollarSign, RefreshCw, Search } from "lucide-react";
import { fetchCryptoMarketData, getOfflineCryptoMarketData } from "@/lib/crypto-market";
import { fetchForexMarketData } from "@/lib/forex-market";

export type MarketKind = "crypto" | "forex" | "stocks";

const CRYPTO_IDS = [
  "bitcoin", "ethereum", "tether", "binancecoin", "solana", "usd-coin", "ripple", "dogecoin", "cardano", "avalanche-2",
  "chainlink", "polkadot", "wrapped-bitcoin", "shiba-inu", "tron", "dai", "polygon", "litecoin", "bitcoin-cash", "uniswap",
  "internet-computer", "leo-token", "ethereum-classic", "cosmos", "near", "stellar", "monero", "aptos", "filecoin", "crypto-com-chain",
  "arbitrum", "vechain", "maker", "algorand", "aave", "the-graph", "fantom", "the-sandbox", "decentraland", "theta-token",
  "flow", "kucoin-shares", "eos", "quant", "tezos", "axie-infinity", "neo", "compound-governance-token", "elrond-egld", "stacks",
];

const DEFAULT_COINS = [];

const STOCK_SYMBOLS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "AVGO", "WMT", "JPM", "LLY", "V", "ORCL", "MA", "XOM", "COST", "JNJ", "HD", "PG",
  "NFLX", "AMD", "CRM", "ADBE", "QCOM",
];

const API_STOCK_SYMBOLS = STOCK_SYMBOLS;

// Sample fallback data from live website
const SAMPLE_STOCK_DATA: Record<string, StockQuote> = {
  "AAPL": { price: 305.26, changePercent: 1.00, name: "Apple Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 304.21, dayHigh: 306.00, dayLow: 302.05, previousClose: 302.25, volume: 52341200, lastTradeTime: "2026-08-14T01:30:00Z" },
  "MSFT": { price: 496.88, changePercent: 0.90, name: "Microsoft Corporation", currency: "USD", exchange: "NASDAQ", dayOpen: 493.27, dayHigh: 501.34, dayLow: 493.01, previousClose: 492.43, volume: 23415600, lastTradeTime: "2026-08-14T01:30:00Z" },
  "GOOGL": { price: 346.36, changePercent: 0.82, name: "Alphabet Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 345.77, dayHigh: 347.93, dayLow: 343.76, previousClose: 343.54, volume: 18765400, lastTradeTime: "2026-08-14T01:30:00Z" },
  "NVDA": { price: 225.30, changePercent: 0.54, name: "NVIDIA Corporation", currency: "USD", exchange: "NASDAQ", dayOpen: 225.06, dayHigh: 227.23, dayLow: 223.71, previousClose: 224.09, volume: 45231200, lastTradeTime: "2026-08-14T01:30:00Z" },
  "AMZN": { price: 265.13, changePercent: -0.80, name: "Amazon.com, Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 267.24, dayHigh: 269.58, dayLow: 264.71, previousClose: 267.28, volume: 31245600, lastTradeTime: "2026-08-14T01:30:00Z" },
  "META": { price: 594.97, changePercent: 2.78, name: "Meta Platforms, Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 580.71, dayHigh: 595.85, dayLow: 579.39, previousClose: 578.85, volume: 28965400, lastTradeTime: "2026-08-14T01:30:00Z" },
  "TSLA": { price: 339.96, changePercent: 3.80, name: "Tesla, Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 327.20, dayHigh: 341.64, dayLow: 325.24, previousClose: 327.51, volume: 67341200, lastTradeTime: "2026-08-14T01:30:00Z" },
  "BRK.B": { price: 506.93, changePercent: -0.60, name: "Berkshire Hathaway Inc.", currency: "USD", exchange: "NYSE", dayOpen: 511.29, dayHigh: 512.01, dayLow: 505.56, previousClose: 510.00, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "BRK_B": { price: 506.93, changePercent: -0.60, name: "Berkshire Hathaway Inc.", currency: "USD", exchange: "NYSE", dayOpen: 511.29, dayHigh: 512.01, dayLow: 505.56, previousClose: 510.00, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "WMT": { price: 115.72, changePercent: -0.25, name: "Walmart Inc.", currency: "USD", exchange: "NYSE", dayOpen: 116.17, dayHigh: 116.32, dayLow: 114.81, previousClose: 116.01, volume: 5678900, lastTradeTime: "2026-08-14T01:30:00Z" },
  "JPM": { price: 363.11, changePercent: -0.57, name: "JPMorgan Chase & Co.", currency: "USD", exchange: "NYSE", dayOpen: 366.50, dayHigh: 366.50, dayLow: 361.52, previousClose: 365.18, volume: 8234560, lastTradeTime: "2026-08-14T01:30:00Z" },
  "LLY": { price: 1209.00, changePercent: -0.92, name: "Eli Lilly and Company", currency: "USD", exchange: "NYSE", dayOpen: 1238.30, dayHigh: 1240.10, dayLow: 1206.00, previousClose: 1220.28, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "ORCL": { price: 156.22, changePercent: 1.92, name: "Oracle Corporation", currency: "USD", exchange: "NYSE", dayOpen: 151.98, dayHigh: 159.26, dayLow: 151.91, previousClose: 153.28, volume: 6234560, lastTradeTime: "2026-08-14T01:30:00Z" },
  "V": { price: 365.45, changePercent: 1.68, name: "Visa Inc.", currency: "USD", exchange: "NYSE", dayOpen: 363.70, dayHigh: 365.45, dayLow: 358.71, previousClose: 359.42, volume: 4567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "MA": { price: 567.04, changePercent: 1.31, name: "Mastercard Incorporated", currency: "USD", exchange: "NYSE", dayOpen: 565.61, dayHigh: 568.28, dayLow: 557.70, previousClose: 559.73, volume: 37894560, lastTradeTime: "2026-08-14T01:30:00Z" },
  "XOM": { price: 158.61, changePercent: -0.71, name: "Exxon Mobil Corporation", currency: "USD", exchange: "NYSE", dayOpen: 158.03, dayHigh: 159.76, dayLow: 157.43, previousClose: 159.75, volume: 7895670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "JNJ": { price: 262.08, changePercent: 0.47, name: "Johnson & Johnson", currency: "USD", exchange: "NYSE", dayOpen: 261.73, dayHigh: 262.62, dayLow: 259.65, previousClose: 260.86, volume: 4567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "COST": { price: 961.85, changePercent: 1.29, name: "Costco Wholesale Corporation", currency: "USD", exchange: "NASDAQ", dayOpen: 954.25, dayHigh: 962.58, dayLow: 949.51, previousClose: 949.58, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "NFLX": { price: 78.24, changePercent: 5.43, name: "Netflix, Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 76.01, dayHigh: 78.40, dayLow: 75.44, previousClose: 74.21, volume: 5678900, lastTradeTime: "2026-08-14T01:30:00Z" },
  "PG": { price: 144.26, changePercent: 0.12, name: "The Procter & Gamble Company", currency: "USD", exchange: "NYSE", dayOpen: 144.59, dayHigh: 145.80, dayLow: 144.00, previousClose: 144.08, volume: 6789456, lastTradeTime: "2026-08-14T01:30:00Z" },
  "HD": { price: 341.70, changePercent: -0.50, name: "The Home Depot, Inc.", currency: "USD", exchange: "NYSE", dayOpen: 347.00, dayHigh: 347.75, dayLow: 340.51, previousClose: 343.43, volume: 3234560, lastTradeTime: "2026-08-14T01:30:00Z" },
  "AMD": { price: 483.01, changePercent: 0.02, name: "Advanced Micro Devices, Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 483.00, dayHigh: 497.99, dayLow: 481.00, previousClose: 482.93, volume: 4567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "CRM": { price: 201.37, changePercent: 4.16, name: "Salesforce, Inc.", currency: "USD", exchange: "NYSE", dayOpen: 196.84, dayHigh: 202.99, dayLow: 191.39, previousClose: 193.32, volume: 5678900, lastTradeTime: "2026-08-14T01:30:00Z" },
  "ADBE": { price: 270.49, changePercent: 4.54, name: "Adobe Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 261.61, dayHigh: 271.88, dayLow: 255.85, previousClose: 258.75, volume: 3789456, lastTradeTime: "2026-08-14T01:30:00Z" },
  "INTC": { price: 104.56, changePercent: 3.58, name: "Intel Corporation", currency: "USD", exchange: "NASDAQ", dayOpen: 101.51, dayHigh: 107.57, dayLow: 100.33, previousClose: 100.95, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "CSCO": { price: 113.47, changePercent: -8.40, name: "Cisco Systems, Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 113.93, dayHigh: 115.95, dayLow: 111.48, previousClose: 123.88, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "QCOM": { price: 164.79, changePercent: 1.05, name: "QUALCOMM Incorporated", currency: "USD", exchange: "NASDAQ", dayOpen: 163.34, dayHigh: 166.77, dayLow: 162.51, previousClose: 163.07, volume: 3234560, lastTradeTime: "2026-08-14T01:30:00Z" },
  "UBER": { price: 75.88, changePercent: 0.69, name: "Uber Technologies, Inc.", currency: "USD", exchange: "NYSE", dayOpen: 75.63, dayHigh: 76.04, dayLow: 74.53, previousClose: 75.36, volume: 4567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "DIS": { price: 104.80, changePercent: 1.53, name: "The Walt Disney Company", currency: "USD", exchange: "NYSE", dayOpen: 103.80, dayHigh: 104.94, dayLow: 103.46, previousClose: 103.22, volume: 4567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "IBM": { price: 237.14, changePercent: 0.49, name: "International Business Machines Corporation", currency: "USD", exchange: "NYSE", dayOpen: 238.92, dayHigh: 239.71, dayLow: 233.61, previousClose: 235.98, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "KO": { price: 87.42, changePercent: 0.82, name: "The Coca-Cola Company", currency: "USD", exchange: "NYSE", dayOpen: 87.14, dayHigh: 87.75, dayLow: 86.91, previousClose: 86.71, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "PEP": { price: 140.62, changePercent: 1.38, name: "PepsiCo, Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 139.41, dayHigh: 140.83, dayLow: 139.33, previousClose: 138.70, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "MCD": { price: 272.25, changePercent: -1.25, name: "McDonald's Corporation", currency: "USD", exchange: "NYSE", dayOpen: 277.38, dayHigh: 278.37, dayLow: 272.15, previousClose: 275.70, volume: 4567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "NKE": { price: 41.23, changePercent: 1.78, name: "NIKE, Inc.", currency: "USD", exchange: "NYSE", dayOpen: 40.74, dayHigh: 41.47, dayLow: 40.48, previousClose: 40.51, volume: 3234560, lastTradeTime: "2026-08-14T01:30:00Z" },
  "CAT": { price: 854.60, changePercent: -0.12, name: "Caterpillar Inc.", currency: "USD", exchange: "NYSE", dayOpen: 858.50, dayHigh: 864.11, dayLow: 848.37, previousClose: 855.60, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "BA": { price: 230.33, changePercent: -0.38, name: "The Boeing Company", currency: "USD", exchange: "NYSE", dayOpen: 232.27, dayHigh: 233.58, dayLow: 228.18, previousClose: 231.20, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "UNH": { price: 399.06, changePercent: -1.61, name: "UnitedHealth Group Incorporated", currency: "USD", exchange: "NYSE", dayOpen: 405.59, dayHigh: 407.32, dayLow: 398.59, previousClose: 405.59, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "MRK": { price: 135.55, changePercent: 1.98, name: "Merck & Co., Inc.", currency: "USD", exchange: "NYSE", dayOpen: 133.86, dayHigh: 135.68, dayLow: 133.06, previousClose: 132.92, volume: 4567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "GE": { price: 360.64, changePercent: -1.28, name: "GE Aerospace", currency: "USD", exchange: "NYSE", dayOpen: 367.00, dayHigh: 367.08, dayLow: 359.55, previousClose: 365.33, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "PFE": { price: 26.80, changePercent: 1.86, name: "Pfizer Inc.", currency: "USD", exchange: "NYSE", dayOpen: 26.49, dayHigh: 26.95, dayLow: 26.41, previousClose: 26.31, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "CVX": { price: 197.70, changePercent: 0.56, name: "Chevron Corporation", currency: "USD", exchange: "NYSE", dayOpen: 195.00, dayHigh: 198.10, dayLow: 193.75, previousClose: 196.60, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "TMO": { price: 595.89, changePercent: -1.18, name: "Thermo Fisher Scientific Inc.", currency: "USD", exchange: "NYSE", dayOpen: 606.29, dayHigh: 606.75, dayLow: 593.39, previousClose: 603.01, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "MS": { price: 218.38, changePercent: 0.34, name: "Morgan Stanley", currency: "USD", exchange: "NYSE", dayOpen: 219.30, dayHigh: 222.00, dayLow: 217.88, previousClose: 217.64, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "AMGN": { price: 417.84, changePercent: 0.40, name: "Amgen Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 419.92, dayHigh: 420.26, dayLow: 415.78, previousClose: 416.18, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "GS": { price: 1042.63, changePercent: 0.52, name: "The Goldman Sachs Group, Inc.", currency: "USD", exchange: "NYSE", dayOpen: 1040.61, dayHigh: 1059.07, dayLow: 1038.47, previousClose: 1037.21, volume: 2345670, lastTradeTime: "2026-08-14T01:30:00Z" },
  "LIN": { price: 478.20, changePercent: -0.26, name: "Linde plc", currency: "USD", exchange: "NASDAQ", dayOpen: 479.86, dayHigh: 483.29, dayLow: 475.75, previousClose: 479.43, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "RTX": { price: 220.48, changePercent: -1.02, name: "RTX Corporation", currency: "USD", exchange: "NYSE", dayOpen: 223.47, dayHigh: 224.00, dayLow: 218.87, previousClose: 222.76, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "LOW": { price: 218.22, changePercent: 1.04, name: "Lowe's Companies, Inc.", currency: "USD", exchange: "NYSE", dayOpen: 218.29, dayHigh: 218.66, dayLow: 215.36, previousClose: 215.97, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "PLTR": { price: 179.01, changePercent: 4.66, name: "Palantir Technologies Inc.", currency: "USD", exchange: "NASDAQ", dayOpen: 173.40, dayHigh: 179.91, dayLow: 172.33, previousClose: 171.04, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
  "SBUX": { price: 108.55, changePercent: 0.06, name: "Starbucks Corporation", currency: "USD", exchange: "NASDAQ", dayOpen: 109.17, dayHigh: 110.51, dayLow: 108.45, previousClose: 108.49, volume: 34567890, lastTradeTime: "2026-08-14T01:30:00Z" },
};
const FOREX_PAIRS = [
  ["EUR", "USD"], ["GBP", "USD"], ["AUD", "USD"], ["USD", "JPY"], ["USD", "CAD"], ["USD", "CHF"], ["USD", "INR"],
  ["EUR", "GBP"], ["EUR", "JPY"], ["EUR", "AUD"], ["EUR", "CAD"], ["EUR", "CHF"], ["EUR", "INR"],
  ["GBP", "JPY"], ["GBP", "AUD"], ["GBP", "CAD"], ["GBP", "CHF"], ["GBP", "INR"],
  ["AUD", "JPY"], ["AUD", "CAD"], ["AUD", "CHF"], ["AUD", "INR"],
  ["CAD", "JPY"], ["CAD", "CHF"], ["CAD", "INR"], ["CHF", "JPY"], ["CHF", "INR"], ["JPY", "INR"],
  ["USD", "NZD"], ["USD", "SEK"], ["USD", "NOK"], ["USD", "DKK"], ["USD", "SGD"], ["USD", "HKD"],
  ["EUR", "NZD"], ["EUR", "SEK"], ["EUR", "NOK"], ["EUR", "DKK"], ["GBP", "NZD"], ["GBP", "SGD"],
  ["AUD", "NZD"], ["NZD", "JPY"], ["CAD", "SGD"], ["SGD", "JPY"],
] as const;

const MARKET_REFRESH_INTERVALS: Record<MarketKind, number> = {
  crypto: 10 * 60 * 1000,  // 10 minutes - users get cached data, cron updates cache
  forex: 1 * 60 * 1000,   // 1 minute - users get cached data, cron updates cache
  stocks: 30 * 60 * 1000,  // 30 minutes - users get cached data, cron updates cache
};

type CryptoQuote = {
  usd: number;
  change_24h: number | null;
  change_7d: number | null;
  market_cap_usd: number | null;
  market_cap_rank: number | null;
  total_volume_usd: number | null;
  high_24h_usd: number | null;
  low_24h_usd: number | null;
  last_updated: string | null;
  source?: "live" | "offline";
};

type StockQuote = {
  price: number;
  changePercent: number | null;
  name: string | null;
  currency: string | null;
  exchange: string | null;
  dayOpen: number | null;
  dayHigh: number | null;
  dayLow: number | null;
  previousClose: number | null;
  volume: number | null;
  week52High: number | null;
  week52Low: number | null;
  lastTradeTime: string | null;
  extendedHours: boolean | null;
};

type ForexSnapshot = {
  date?: string;
  previousDate?: string | null;
  rates?: Record<string, number>;
  previousRates?: Record<string, number> | null;
  source?: "live" | "offline";
};

const titles: Record<MarketKind, { title: string; description: string; source: string }> = {
  crypto: { title: "Cryptocurrency Market", description: "Top 250 cryptocurrencies with price, performance, liquidity, and market-cap details.", source: "CoinGecko (250 coins, 1 call)" },
  forex: { title: "Forex Market", description: "44 major and cross-currency reference rates across US, Canadian, UK, European, Australian, Swiss, Japanese, Singaporean, and other high-liquidity markets.", source: "irfanokr Unlimited (170+ currencies)" },
  stocks: { title: "US Stocks Market", description: "25 widely followed US-listed large-cap, technology, financial, healthcare, consumer, industrial, and energy stocks.", source: "Yahoo Finance / StockData.org" },
};

function compact(value: number | null | undefined, currency = "$") {
  if (value == null || !Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e12) return `${currency}${(value / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${currency}${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${currency}${(value / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${currency}${(value / 1e3).toFixed(2)}K`;
  return `${currency}${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function price(value: number | null | undefined, digits = 2) {
  if (value == null || !Number.isFinite(value)) return "—";
  const minimum = Math.abs(value) < 1 ? Math.min(6, Math.max(2, digits + 2)) : digits;
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: minimum, maximumFractionDigits: minimum })}`;
}

function percent(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function percentClass(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "text-slate-500 dark:text-slate-400";
  return value >= 0 ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400";
}

function dateLabel(value: string | null | undefined) {
  if (!value) return "Unavailable";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

function rateFor(currency: string, rates: Record<string, number>) {
  return currency === "USD" ? 1 : Number(rates[currency]);
}

function pairRate(base: string, quote: string, rates: Record<string, number>) {
  const baseRate = rateFor(base, rates);
  const quoteRate = rateFor(quote, rates);
  return baseRate > 0 && quoteRate > 0 ? quoteRate / baseRate : null;
}

function loadIcon(kind: MarketKind) {
  if (kind === "crypto") return <Bitcoin className="w-5 h-5 text-white" />;
  if (kind === "forex") return <DollarSign className="w-5 h-5 text-white" />;
  return <BarChart3 className="w-5 h-5 text-white" />;
}

export default function MarketDataPage({ market }: { market: MarketKind }) {
  const [crypto, setCrypto] = useState<Record<string, CryptoQuote>>({});
  const [stocks, setStocks] = useState<Record<string, StockQuote>>({});
  const [forex, setForex] = useState<ForexSnapshot>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [refreshedAt, setRefreshedAt] = useState<string | null>(new Date().toISOString());
  const info = titles[market];
  
  // Set proper data source labels
  const getSourceLabel = () => {
    if (market === "forex") return "irfanokr Unlimited (170+ currencies)";
    if (market === "crypto") return "CoinGecko (Real-time)";
    if (market === "stocks") return "Yahoo Finance / StockData.org";
    return "Market Data";
  };

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      console.log('Starting market data fetch for:', market);
      setLoading(true);
      setError("");
      try {
        if (market === "crypto") {
          const cryptoData = await fetchCryptoMarketData([]);
          if (Object.keys(cryptoData).length === 0) throw new Error("Cryptocurrency data is currently unavailable.");
          if (active) {
            setCrypto(cryptoData);
            setRefreshedAt(new Date().toISOString());
          }
          return;
        }
        if (market === "forex") {
          const forexData = await fetchForexMarketData("USD", ["EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "SGD", "INR", "NZD", "SEK", "NOK", "DKK", "HKD"]);
          if (!forexData.rates || Object.keys(forexData.rates).length === 0) throw new Error("Forex data is currently unavailable.");
          if (active) {
            setForex(forexData);
            setRefreshedAt(new Date().toISOString());
          }
          return;
        }

        
        console.log('Fetching stocks from API...');
        const endpoint = `/api/stocks?symbols=${API_STOCK_SYMBOLS.join(",")}`;
        console.log('Endpoint:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Stock API response:', data);
        console.log('Response ok:', response.ok);
        console.log('Data length:', Object.keys(data).length);
        if (!response.ok) throw new Error(data?.error || "Market data is temporarily unavailable.");
        if (!active) return;
        if (market === "stocks") {
          console.log('Setting stocks data:', data);
          console.log('Number of stocks to set:', Object.keys(data).length);
          setStocks(data as Record<string, StockQuote>);
          console.log('Stocks state set completed');
        }
        if (market === "stocks" && typeof window !== "undefined") {
          window.localStorage.setItem("tradivex-stock-market-cache", JSON.stringify({ data, fetchedAt: Date.now() }));
        }
        setRefreshedAt(new Date().toISOString());
        console.log('Refresh timestamp set');
      } catch (fetchError) {
        if (active) {
          // Try to load from cache as fallback
          if (market === "stocks" && typeof window !== 'undefined') {
            try {
              const cached = window.localStorage.getItem("tradivex-stock-market-cache");
              if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.data && Object.keys(parsed.data).length > 0) {
                  setStocks(parsed.data as Record<string, StockQuote>);
                  setRefreshedAt(new Date(parsed.fetchedAt).toISOString());
                  setError("Using cached data due to API unavailability");
                  return;
                }
              }
            } catch (e) {
              console.error('Failed to load cache:', e);
            }
          }
          setError(fetchError instanceof Error ? fetchError.message : "Market data is temporarily unavailable.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, MARKET_REFRESH_INTERVALS[market]);
    return () => { active = false; clearInterval(interval); };
  }, [market]);

  const cryptoRows = useMemo(() => Object.entries(crypto), [crypto]);
  const stockRows = useMemo(() => Object.entries(stocks).filter(([symbol, item]) => item && typeof item.price === "number" && `${symbol} ${item?.name || ""}`.toLowerCase().includes(query.trim().toLowerCase())), [stocks, query]);
  const forexRows = useMemo(() => {
    const current = forex.rates || {};
    const previous = forex.previousRates || {};
    return FOREX_PAIRS.map(([base, quote]) => {
      const rate = pairRate(base, quote, current);
      const previousRate = pairRate(base, quote, previous);
      return { pair: `${base}/${quote}`, rate, change: rate != null && previousRate != null && previousRate > 0 ? ((rate - previousRate) / previousRate) * 100 : null };
    }).filter((row) => row.rate != null && row.pair.toLowerCase().includes(query.trim().toLowerCase()));
  }, [forex, query]);

  const count = market === "crypto" ? cryptoRows.length : market === "forex" ? forexRows.length : stockRows.length;
  const cryptoOffline = false;
  const forexOffline = false;
  const stockOffline = false;

  return (
    <section className={`market-data-page relative min-h-[70vh] overflow-hidden py-12 lg:py-16 bg-slate-50 dark:bg-slate-900 ${market === "stocks" ? "market-stocks-page" : ""}`}>
      <div className="absolute inset-0 mesh-bg opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/#market-data" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to homepage
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${market === "crypto" ? "bg-gradient-to-br from-orange-400 to-yellow-500" : market === "forex" ? "bg-gradient-to-br from-green-400 to-emerald-600" : "bg-gradient-to-br from-blue-400 to-indigo-600"}`}>
                {loadIcon(market)}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Market Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{info.title}</h1>
            <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">{info.description}</p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            {(["crypto", "forex", "stocks"] as MarketKind[]).map((item) => (
              <Link key={item} href={`/market/${item}`} className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-colors ${item === market ? "bg-primary-500 text-white shadow-md shadow-primary-500/20" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-4"><p className="text-xs text-slate-500 dark:text-slate-400">Displayed instruments</p><p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{loading ? "—" : count}</p></div>
          <div className="glass-card rounded-2xl p-4"><p className="text-xs text-slate-500 dark:text-slate-400">Data source</p><p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{cryptoOffline || forexOffline ? "Sample data (API unavailable)" : getSourceLabel()}</p></div>
          <div className="glass-card rounded-2xl p-4"><p className="text-xs text-slate-500 dark:text-slate-400">Last refreshed</p><p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{dateLabel(refreshedAt)}</p></div>
        </div>

        {(cryptoOffline || forexOffline) && <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">Live market providers are currently unreachable. Showing sample data so the table remains usable; live values will return automatically when the provider connection is restored.</div>}

        <div className="flex flex-col sm:flex-row gap-3 justify-between mb-5">
          <label className="relative w-full sm:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${market}...`} className="input-modern pl-11" />
          </label>
          <button type="button" onClick={() => window.location.reload()} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <RefreshCw className="w-4 h-4" /> Refresh data
          </button>
        </div>

        {loading && <div className="glass-card rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400"><Activity className="w-6 h-6 mx-auto mb-3 animate-pulse text-primary-500" />Loading full market data...</div>}
        {!loading && error && !stockOffline && <div className="glass-card rounded-2xl p-8 text-center text-amber-700 dark:text-amber-400">{error}</div>}

        {!loading && !error && market === "crypto" && <div className="glass-card rounded-2xl overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left"><thead className="bg-slate-100/70 dark:bg-slate-800/70"><tr>{["# / Asset", "Price", "24h", "7d", "Market cap", "Volume 24h", "24h high / low", "Updated"].map((heading) => <th key={heading} className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">{cryptoRows.map(([id, item], index) => <tr key={id} className="hover:bg-white/50 dark:hover:bg-slate-800/40 transition-colors"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="w-7 text-xs font-bold text-slate-400">{item.market_cap_rank || index + 1}</span><div><div className="font-bold text-slate-900 dark:text-white">{id.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase())}</div><div className="text-xs uppercase text-slate-500 dark:text-slate-400">{id === "bitcoin" ? "BTC" : id.slice(0, 4)}</div></div></div></td><td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{price(item.usd, item.usd < 1 ? 4 : 2)}</td><td className={`px-5 py-4 font-semibold ${percentClass(item.change_24h)}`}>{percent(item.change_24h)}</td><td className={`px-5 py-4 font-semibold ${percentClass(item.change_7d)}`}>{percent(item.change_7d)}</td><td className="px-5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">{compact(item.market_cap_usd)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{compact(item.total_volume_usd)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{price(item.high_24h_usd)} / {price(item.low_24h_usd)}</td><td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{dateLabel(item.last_updated)}</td></tr>)}</tbody></table></div>{cryptoRows.length === 0 && <p className="p-8 text-center text-slate-500 dark:text-slate-400">No cryptocurrencies match your search.</p>}</div>}

        {!loading && !error && market === "forex" && <div className="glass-card rounded-2xl overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left"><thead className="bg-slate-100/70 dark:bg-slate-800/70"><tr>{["Pair", "Reference rate", "Previous-session change", "Rate date", "Comparison date", "Note"].map((heading) => <th key={heading} className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">{forexRows.map((row) => <tr key={row.pair} className="hover:bg-white/50 dark:hover:bg-slate-800/40 transition-colors"><td className="px-5 py-5 font-bold text-slate-900 dark:text-white">{row.pair}</td><td className="px-5 py-5 font-bold text-slate-900 dark:text-white">{row.rate?.toFixed(row.pair.endsWith("JPY") ? 3 : 5)}</td><td className={`px-5 py-5 font-semibold ${percentClass(row.change)}`}>{percent(row.change)}</td><td className="px-5 py-5 text-sm text-slate-600 dark:text-slate-300">{forex.date || "Unavailable"}</td><td className="px-5 py-5 text-sm text-slate-600 dark:text-slate-300">{forex.previousDate || "Unavailable"}</td><td className="px-5 py-5 text-xs text-slate-500 dark:text-slate-400">Reference rate, not a bid/ask quote</td></tr>)}</tbody></table></div>{forexRows.length === 0 && <p className="p-8 text-center text-slate-500 dark:text-slate-400">Forex data is currently unavailable.</p>}</div>}

        {!loading && !error && market === "stocks" && <div className="glass-card rounded-2xl overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[1300px] text-left"><thead className="bg-slate-100/70 dark:bg-slate-800/70"><tr>{["Symbol / company", "Price", "Day %", "Open", "High", "Low", "Prev close", "Volume", "52-week high / low", "Exchange", "Last trade"].map((heading) => <th key={heading} className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">{stockRows.map(([symbol, item]) => <tr key={symbol} className="hover:bg-white/50 dark:hover:bg-slate-800/40 transition-colors"><td className="px-5 py-4"><div className="font-bold text-slate-900 dark:text-white">{symbol}</div><div className="max-w-[190px] text-xs text-slate-500 dark:text-slate-400 truncate">{item.name || "US-listed company"}</div></td><td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{price(item.price)}</td><td className={`px-5 py-4 font-semibold ${percentClass(item.changePercent)}`}>{percent(item.changePercent)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{price(item.dayOpen)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{price(item.dayHigh)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{price(item.dayLow)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{price(item.previousClose)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{item.volume == null ? "—" : item.volume.toLocaleString("en-US")}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{price(item.week52High)} / {price(item.week52Low)}</td><td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{item.exchange || "—"} {item.extendedHours ? "· extended" : ""}</td><td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{dateLabel(item.lastTradeTime)}</td></tr>)}</tbody></table></div>{stockRows.length === 0 && <p className="p-8 text-center text-slate-500 dark:text-slate-400">No stocks match your search or the provider is unavailable.</p>}</div>}

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 text-xs text-slate-500 dark:text-slate-400"><span>Source: {info.source}. Data availability and timestamps vary by provider.</span><Link href="/methodology" className="inline-flex items-center gap-1 font-semibold hover:text-primary-600 dark:hover:text-primary-400">View methodology <ArrowUpRight className="w-3 h-3" /></Link></div>
      </div>
    </section>
  );
}
