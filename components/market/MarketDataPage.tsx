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
  // Mega Cap Giants
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B",
  // Financial Services
  "JPM", "V", "MA", "BAC", "WFC", "GS", "MS",
  // Technology Leaders
  "AVGO", "CSCO", "ORCL", "CRM", "ADBE", "INTC", "AMD", "QCOM", "IBM", "NFLX",
  // Consumer Giants
  "WMT", "COST", "HD", "MCD", "NKE", "KO", "PEP", "DIS", "SBUX",
  // Energy Sector
  "XOM", "CVX", "COP", "SHEL", "BP",
  // Healthcare Leaders
  "JNJ", "UNH", "LLY", "PFE", "TMO", "ABT", "MRK", "AMGN",
  // Industrials
  "CAT", "BA", "GE"
];

const API_STOCK_SYMBOLS = STOCK_SYMBOLS;

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
  stocks: 5 * 60 * 1000,  // 5 minutes - users get cached data, cron updates cache
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
  price: number | null;
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
  crypto: { title: "Cryptocurrency Market", description: "Top 250 cryptocurrencies with price, performance, liquidity, and market-cap details.", source: "Prices from CoinGecko" },
  forex: { title: "Forex Market", description: "44 major and cross-currency reference rates across US, Canadian, UK, European, Australian, Swiss, Japanese, Singaporean, and other high-liquidity markets.", source: "Exchange rates from irfanokr" },
  stocks: { title: "US Stocks Market", description: "50 widely followed US-listed large-cap, technology, financial, healthcare, consumer, industrial, and energy stocks.", source: "Data provided by Finnhub" },
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
    if (market === "stocks") return "Finnhub API";
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
            const lastUpdated = (cryptoData as any)._lastUpdated;
            setRefreshedAt(lastUpdated || new Date().toISOString());
          }
          return;
        }
        if (market === "forex") {
          const forexData = await fetchForexMarketData("USD", ["EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "SGD", "INR", "NZD", "SEK", "NOK", "DKK", "HKD"]);
          if (!forexData.rates || Object.keys(forexData.rates).length === 0) throw new Error("Forex data is currently unavailable.");
          if (active) {
            setForex(forexData);
            const lastUpdated = (forexData as any)._lastUpdated;
            setRefreshedAt(lastUpdated || new Date().toISOString());
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
        const lastUpdated = (data as any)._lastUpdated;
        setRefreshedAt(lastUpdated || new Date().toISOString());
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
  const stockRows = useMemo(() => Object.entries(stocks).filter(([symbol, item]) => item && `${symbol} ${item?.name || ""}`.toLowerCase().includes(query.trim().toLowerCase())), [stocks, query]);
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

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col gap-1">
            <span>Source: {info.source}</span>
            {refreshedAt && <span>Last updated: {new Date(refreshedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC</span>}
          </div>
          <Link href="/methodology" className="inline-flex items-center gap-1 font-semibold hover:text-primary-600 dark:hover:text-primary-400">View methodology <ArrowUpRight className="w-3 h-3" /></Link>
        </div>
      </div>
    </section>
  );
}
