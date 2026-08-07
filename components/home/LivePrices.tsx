"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCryptoPrices } from "@/lib/api";
import { fetchForexMarketData } from "@/lib/forex-market";
import { Activity, Bitcoin, DollarSign, BarChart3, ArrowUpRight } from "lucide-react";

type CryptoMarket = {
  id: string;
  symbol: string;
  usd: number;
  change24h: number | null;
  change7d: number | null;
  marketCapUsd: number | null;
  marketCapRank: number | null;
  volumeUsd: number | null;
  high24hUsd: number | null;
  low24hUsd: number | null;
  lastUpdated: string | null;
  source?: "live" | "offline";
};

type ForexMarket = {
  pair: string;
  rate: number;
  change: number | null;
};

type StockMarket = {
  symbol: string;
  name: string | null;
  price: number;
  changePercent: number | null;
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

function formatUsd(value: number | null) {
  return value == null ? "—" : `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}
function formatCompactUsd(value: number | null) {
  if (value == null) return "—";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
function formatDate(value: string | null | undefined) {
  if (!value) return "Unavailable";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

function changeLabel(value: number | null, label: string) {
  if (value == null || !Number.isFinite(value)) return `${label}: unavailable`;
  return `${label}: ${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function changeClass(value: number | null) {
  if (value == null || !Number.isFinite(value)) return "text-slate-500 dark:text-slate-400";
  return value >= 0 ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400";
}

function quoteLabel(value: string | null) {
  if (!value) return "Trade: unavailable";
  const timestamp = new Date(value).getTime();
  const stale = Number.isFinite(timestamp) && Date.now() - timestamp > 48 * 60 * 60 * 1000;
  return `${stale ? "Stale quote" : "Trade"}: ${formatDate(value)}`;
}

export default function LivePrices() {
  const [crypto, setCrypto] = useState<CryptoMarket[]>([]);
  const [cryptoReference, setCryptoReference] = useState(false);
  const [forex, setForex] = useState<ForexMarket[]>([]);
  const [forexDate, setForexDate] = useState<string | null>(null);
  const [forexPreviousDate, setForexPreviousDate] = useState<string | null>(null);
  const [forexReference, setForexReference] = useState(false);
  const [stocks, setStocks] = useState<StockMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataUnavailable, setDataUnavailable] = useState(false);

  const Unavailable = ({ label }: { label: string }) => (
    <p className="py-6 text-sm text-slate-500 dark:text-slate-400">
      {label} is currently unavailable. No placeholder prices are shown.
    </p>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [cryptoResult, forexResult, stocksResult] = await Promise.allSettled([
          getCryptoPrices(["bitcoin", "ethereum", "binancecoin", "solana", "ripple"]),
          fetchForexMarketData("USD", ["EUR", "GBP", "JPY", "CHF", "AUD", "CAD", "SGD", "INR"]),
          fetch("/api/stocks?symbols=AAPL,GOOGL,MSFT,TSLA,AMZN").then(async (res) => res.ok ? res.json() : null),
        ]);

        const cryptoData = cryptoResult.status === "fulfilled" ? cryptoResult.value : null;
        const forexResponse = forexResult.status === "fulfilled" ? forexResult.value : null;
        const stocksResponse = stocksResult.status === "fulfilled" ? stocksResult.value : null;

        const cryptoEntries = [
          ["bitcoin", "BTC"],
          ["ethereum", "ETH"],
          ["binancecoin", "BNB"],
          ["solana", "SOL"],
          ["ripple", "XRP"],
        ] as const;
        const cryptoItems = cryptoEntries
          .map(([id, symbol]) => {
            const item = cryptoData?.[id];
            if (!item || typeof item.usd !== "number") return null;
            // The API returns INR-denominated market cap/volume/high/low alongside a
            // matching USD spot price. Derive a USD conversion ratio from those two
            // so every figure in this widget is shown in USD without needing INR at all.
            const ratio = typeof item.inr === "number" && item.inr > 0 ? item.usd / item.inr : null;
            const toUsd = (inrValue: unknown) =>
              ratio != null && typeof inrValue === "number" ? inrValue * ratio : null;
            return {
              id,
              symbol,
              usd: item.usd,
              change24h: typeof item.change_24h === "number" && Number.isFinite(item.change_24h) ? item.change_24h : null,
              change7d: typeof item.change_7d === "number" ? item.change_7d : null,
              marketCapUsd: typeof item.market_cap_usd === "number" ? item.market_cap_usd : toUsd(item.market_cap_inr),
              marketCapRank: typeof item.market_cap_rank === "number" ? item.market_cap_rank : null,
              volumeUsd: typeof item.total_volume_usd === "number" ? item.total_volume_usd : toUsd(item.total_volume_inr),
              high24hUsd: typeof item.high_24h_usd === "number" ? item.high_24h_usd : toUsd(item.high_24h_inr),
              low24hUsd: typeof item.low_24h_usd === "number" ? item.low_24h_usd : toUsd(item.low_24h_inr),
              lastUpdated: typeof item.last_updated === "string" ? item.last_updated : null,
              source: item.source === "offline" ? "offline" : "live",
            } as CryptoMarket;
          })
          .filter((item): item is CryptoMarket => item !== null);
        setCrypto(cryptoItems);
        setCryptoReference(cryptoItems.some((item) => item.source === "offline"));

        const currentRates = forexResponse?.rates;
        const previousRates = forexResponse?.previousRates;
        if (currentRates?.EUR) {
          const num = (v: unknown) => (typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN);
          const percentageChange = (current: number, previous: number | undefined) =>
            typeof previous === "number" && Number.isFinite(previous) && previous > 0 ? ((current - previous) / previous) * 100 : null;
          // EUR/GBP/AUD come back from the API as "units per 1 USD", so they're
          // inverted to the conventional EUR/USD, GBP/USD, AUD/USD quoting
          // direction. JPY/CHF/CAD/SGD/INR are already quoted the conventional
          // way (units per 1 USD). Cross pairs (EUR/GBP, EUR/JPY, GBP/JPY) are
          // derived from the same USD-based rates without any extra API calls.
          const invert = (v: unknown) => { const n = num(v); return Number.isFinite(n) && n > 0 ? 1 / n : undefined; };
          const cross = (base: unknown, quote: unknown) => { const b = num(base), q = num(quote); return Number.isFinite(b) && b > 0 && Number.isFinite(q) ? q / b : undefined; };
          const pairs = [
            { pair: "EUR/USD", rate: invert(currentRates.EUR), previousRate: invert(previousRates?.EUR) },
            { pair: "GBP/USD", rate: invert(currentRates.GBP), previousRate: invert(previousRates?.GBP) },
            { pair: "AUD/USD", rate: invert(currentRates.AUD), previousRate: invert(previousRates?.AUD) },
            { pair: "USD/JPY", rate: num(currentRates.JPY), previousRate: num(previousRates?.JPY) },
            { pair: "USD/CHF", rate: num(currentRates.CHF), previousRate: num(previousRates?.CHF) },
            { pair: "USD/CAD", rate: num(currentRates.CAD), previousRate: num(previousRates?.CAD) },
            { pair: "USD/SGD", rate: num(currentRates.SGD), previousRate: num(previousRates?.SGD) },
            { pair: "USD/INR", rate: num(currentRates.INR), previousRate: num(previousRates?.INR) },
            { pair: "EUR/GBP", rate: cross(currentRates.EUR, currentRates.GBP), previousRate: cross(previousRates?.EUR, previousRates?.GBP) },
            { pair: "EUR/JPY", rate: cross(currentRates.EUR, currentRates.JPY), previousRate: cross(previousRates?.EUR, previousRates?.JPY) },
            { pair: "GBP/JPY", rate: cross(currentRates.GBP, currentRates.JPY), previousRate: cross(previousRates?.GBP, previousRates?.JPY) },
          ]
            .filter((item): item is { pair: string; rate: number; previousRate: number | undefined } => Number.isFinite(item.rate) && (item.rate as number) > 0)
            .map((item) => ({ pair: item.pair, rate: Number(item.rate), change: percentageChange(item.rate, item.previousRate) }));
          setForex(pairs);
          setForexReference(forexResponse?.source === "offline");
          setForexDate(typeof forexResponse?.date === "string" ? forexResponse.date : null);
          setForexPreviousDate(typeof forexResponse?.previousDate === "string" ? forexResponse.previousDate : null);
        } else {
          setForex([]);
          setForexDate(null);
          setForexPreviousDate(null);
        }

        const stockEntries = stocksResponse && !stocksResponse.error ? Object.entries(stocksResponse) : [];
        setStocks(stockEntries
          .filter(([, item]: [string, any]) => typeof item?.price === "number")
          .map(([symbol, item]: [string, any]) => ({
            symbol,
            name: typeof item.name === "string" ? item.name : null,
            price: item.price,
            changePercent: typeof item.changePercent === "number" && Number.isFinite(item.changePercent) ? item.changePercent : null,
            currency: typeof item.currency === "string" ? item.currency : null,
            exchange: typeof item.exchange === "string" ? item.exchange : null,
            dayOpen: typeof item.dayOpen === "number" ? item.dayOpen : null,
            dayHigh: typeof item.dayHigh === "number" ? item.dayHigh : null,
            dayLow: typeof item.dayLow === "number" ? item.dayLow : null,
            previousClose: typeof item.previousClose === "number" ? item.previousClose : null,
            volume: typeof item.volume === "number" ? item.volume : null,
            week52High: typeof item.week52High === "number" ? item.week52High : null,
            week52Low: typeof item.week52Low === "number" ? item.week52Low : null,
            lastTradeTime: typeof item.lastTradeTime === "string" ? item.lastTradeTime : null,
            extendedHours: typeof item.extendedHours === "boolean" ? item.extendedHours : null,
          })));

        setDataUnavailable(cryptoItems.length === 0 || !currentRates?.EUR);
      } catch {
        setDataUnavailable(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="market-data" className="py-12 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-green-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Market Data</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">External reference and market data. Timestamps vary, prices may be delayed, and this is not trading advice.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-slate-400 py-8">
            <Activity className="w-5 h-5 animate-pulse" />
            <span>Loading market data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                    <Bitcoin className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cryptocurrency</h3>
                </div>
                <Link href="/market/crypto" className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap">View All <ArrowUpRight className="w-3.5 h-3.5" /></Link>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">{cryptoReference ? "Offline reference snapshot · live provider unavailable" : "USD · 24h/7d market data · CoinGecko"}</p>
              <div className="space-y-3">
                {crypto.length === 0 ? <Unavailable label="Cryptocurrency data" /> : crypto.map((coin) => (
                  <div key={coin.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{coin.symbol}</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatUsd(coin.usd)}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 [&>span:nth-child(4)]:hidden [&>span:nth-child(6)]:hidden">
                      <span className={changeClass(coin.change24h)}>{changeLabel(coin.change24h, "24h")}</span>
                      <span>{changeLabel(coin.change7d, "7d")}</span>
                      <span>Market cap: {formatCompactUsd(coin.marketCapUsd)}</span>
                      <span>Rank: {coin.marketCapRank ? `#${coin.marketCapRank}` : "—"}</span>
                      <span>Volume: {formatCompactUsd(coin.volumeUsd)}</span>
                      <span>High: {formatUsd(coin.high24hUsd)}</span>
                      <span>Low: {formatUsd(coin.low24hUsd)}</span>
                      <span className="col-span-2">Updated: {formatDate(coin.lastUpdated)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Forex Reference Rates</h3>
                </div>
                <Link href="/market/forex" className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap">View All <ArrowUpRight className="w-3.5 h-3.5" /></Link>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">{forexReference ? "Offline reference snapshot · live provider unavailable" : `Frankfurter/ECB · Rate date: ${forexDate ?? "unavailable"}`}</p>
              <div className="space-y-3">
                {forex.length === 0 ? <Unavailable label="Forex reference rates" /> : forex.map((fx) => (
                  <div key={fx.pair} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{fx.pair}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{fx.rate.toFixed(4)}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{changeLabel(fx.change, "Daily reference")}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">Comparison date: {forexPreviousDate ?? "unavailable"}. These are reference rates, not bid/ask quotes.</p>
            </div>

            {stocks.length > 0 && <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Stock Prices</h3>
                </div>
                <Link href="/market/stocks" className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap">View All <ArrowUpRight className="w-3.5 h-3.5" /></Link>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">StockData.org · US-listed quotes · delayed data possible</p>
              <div className="space-y-3">
                {stocks.map((stock) => (
                  <div key={stock.symbol} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{stock.symbol}</span>
                        {stock.name && <span className="ml-2 text-[11px] text-slate-500 dark:text-slate-400">{stock.name}</span>}
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatUsd(stock.price)}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className={changeClass(stock.changePercent)}>{changeLabel(stock.changePercent, "Day")}</span>
                      <span>Prev close: {formatUsd(stock.previousClose)}</span>
                      <span>Open: {formatUsd(stock.dayOpen)}</span>
                      <span>Volume: {stock.volume == null ? "—" : stock.volume.toLocaleString("en-US")}</span>
                      <span>High/Low: {formatUsd(stock.dayHigh)} / {formatUsd(stock.dayLow)}</span>
                      <span>52W: {formatUsd(stock.week52High)} / {formatUsd(stock.week52Low)}</span>
                      <span>{stock.exchange ?? stock.currency ?? "Quote"}{stock.extendedHours ? " · extended hours" : ""}</span>
                      <span>{quoteLabel(stock.lastTradeTime)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>}
          </div>
        )}

        {!loading && stocks.length === 0 && (
          <p className="text-center mt-6 text-xs text-slate-500 dark:text-slate-400">
            Stock prices will appear after the stock-data provider key is configured.
          </p>
        )}

        {dataUnavailable && (
          <p className="text-center mt-6 text-xs text-amber-700 dark:text-amber-400">Some market data is currently unavailable. No placeholder prices are shown.</p>
        )}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Activity className="w-3.5 h-3.5 text-green-500" />
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">External data · check the displayed source and date</p>
          </div>
        </div>
      </div>
    </section>
  );
}
