"use client";

import React, { useEffect, useState } from "react";
import { getCryptoPrices } from "@/lib/api";
import { TrendingUp, TrendingDown, Activity, Bitcoin, DollarSign, BarChart3 } from "lucide-react";

type CryptoMarket = {
  id: string;
  symbol: string;
  inr: number;
  change24h: number | null;
  change7d: number | null;
  marketCapInr: number | null;
  marketCapRank: number | null;
  volumeInr: number | null;
  high24hInr: number | null;
  low24hInr: number | null;
  lastUpdated: string | null;
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

function formatInr(value: number | null) {
  return value == null ? "—" : `₹${value.toLocaleString("en-IN")}`;
}

function formatCompactInr(value: number | null) {
  if (value == null) return "—";
  const crore = value / 10_000_000;
  if (crore >= 100_000) return `₹${(crore / 100_000).toFixed(1)} lakh Cr`;
  if (crore >= 1) return `₹${crore.toFixed(1)} Cr`;
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function formatUsd(value: number | null) {
  return value == null ? "—" : `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "Unavailable";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function changeLabel(value: number | null, label: string) {
  if (value == null || !Number.isFinite(value)) return `${label}: unavailable`;
  return `${label}: ${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function changeClass(value: number | null) {
  if (value == null || !Number.isFinite(value)) return "text-slate-500 dark:text-slate-400";
  return value >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400";
}

function quoteLabel(value: string | null) {
  if (!value) return "Trade: unavailable";
  const timestamp = new Date(value).getTime();
  const stale = Number.isFinite(timestamp) && Date.now() - timestamp > 48 * 60 * 60 * 1000;
  return `${stale ? "Stale quote" : "Trade"}: ${formatDate(value)}`;
}

export default function LivePrices() {
  const [crypto, setCrypto] = useState<CryptoMarket[]>([]);
  const [forex, setForex] = useState<ForexMarket[]>([]);
  const [forexDate, setForexDate] = useState<string | null>(null);
  const [forexPreviousDate, setForexPreviousDate] = useState<string | null>(null);
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
          getCryptoPrices(["bitcoin", "ethereum", "binancecoin", "solana"]),
          fetch("/api/forex?base=USD&targets=INR,EUR,GBP,JPY").then(async (res) => res.ok ? res.json() : null),
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
        ] as const;
        const cryptoItems = cryptoEntries
          .map(([id, symbol]) => {
            const item = cryptoData?.[id];
            if (!item || typeof item.inr !== "number") return null;
            return {
              id,
              symbol,
              inr: item.inr,
              change24h: typeof item.change_24h === "number" && Number.isFinite(item.change_24h) ? item.change_24h : null,
              change7d: typeof item.change_7d === "number" ? item.change_7d : null,
              marketCapInr: typeof item.market_cap_inr === "number" ? item.market_cap_inr : null,
              marketCapRank: typeof item.market_cap_rank === "number" ? item.market_cap_rank : null,
              volumeInr: typeof item.total_volume_inr === "number" ? item.total_volume_inr : null,
              high24hInr: typeof item.high_24h_inr === "number" ? item.high_24h_inr : null,
              low24hInr: typeof item.low_24h_inr === "number" ? item.low_24h_inr : null,
              lastUpdated: typeof item.last_updated === "string" ? item.last_updated : null,
            } as CryptoMarket;
          })
          .filter((item): item is CryptoMarket => item !== null);
        setCrypto(cryptoItems);

        const currentRates = forexResponse?.rates;
        const previousRates = forexResponse?.previousRates;
        if (currentRates?.INR) {
          const percentageChange = (current: number, previous: number | undefined) =>
            typeof previous === "number" && previous > 0 ? ((current - previous) / previous) * 100 : null;
          const pairs = [
            { pair: "USD/INR", rate: Number(currentRates.INR), previousRate: previousRates?.INR },
            { pair: "EUR/INR", rate: Number(currentRates.INR) / Number(currentRates.EUR), previousRate: previousRates?.EUR && previousRates?.INR ? previousRates.INR / previousRates.EUR : undefined },
            { pair: "GBP/INR", rate: Number(currentRates.INR) / Number(currentRates.GBP), previousRate: previousRates?.GBP && previousRates?.INR ? previousRates.INR / previousRates.GBP : undefined },
            { pair: "USD/JPY", rate: Number(currentRates.JPY), previousRate: previousRates?.JPY },
          ]
            .filter((item) => Number.isFinite(item.rate) && item.rate > 0)
            .map((item) => ({ pair: item.pair, rate: Number(item.rate), change: percentageChange(item.rate, item.previousRate) }));
          setForex(pairs);
          setForexDate(typeof forexResponse.date === "string" ? forexResponse.date : null);
          setForexPreviousDate(typeof forexResponse.previousDate === "string" ? forexResponse.previousDate : null);
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

        setDataUnavailable(cryptoItems.length === 0 || !currentRates?.INR);
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
    <section className="py-12 bg-slate-50 dark:bg-slate-900">
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
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                  <Bitcoin className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cryptocurrency</h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">INR Â· 24h/7d market data Â· CoinGecko</p>
              <div className="space-y-3">
                {crypto.length === 0 ? <Unavailable label="Cryptocurrency data" /> : crypto.map((coin) => (
                  <div key={coin.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{coin.symbol}</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatInr(coin.inr)}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className={changeClass(coin.change24h)}>{changeLabel(coin.change24h, "24h")}</span>
                      <span>{changeLabel(coin.change7d, "7d")}</span>
                      <span>Market cap: {formatCompactInr(coin.marketCapInr)}</span>
                      <span>Rank: {coin.marketCapRank ? `#${coin.marketCapRank}` : "—"}</span>
                      <span>Volume: {formatCompactInr(coin.volumeInr)}</span>
                      <span>High: {formatInr(coin.high24hInr)}</span>
                      <span>Low: {formatInr(coin.low24hInr)}</span>
                      <span className="col-span-2">Updated: {formatDate(coin.lastUpdated)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Forex Reference Rates</h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">Frankfurter/ECB Â· Rate date: {forexDate ?? "unavailable"}</p>
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
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Stock Prices</h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">StockData.org Â· US-listed quotes Â· delayed data possible</p>
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
                      <span>Volume: {stock.volume == null ? "—" : stock.volume.toLocaleString("en-IN")}</span>
                      <span>High/Low: {formatUsd(stock.dayHigh)} / {formatUsd(stock.dayLow)}</span>
                      <span>52W: {formatUsd(stock.week52High)} / {formatUsd(stock.week52Low)}</span>
                      <span>{stock.exchange ?? stock.currency ?? "Quote"}{stock.extendedHours ? " Â· extended hours" : ""}</span>
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
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">External data Â· check the displayed source and date</p>
          </div>
        </div>
      </div>
    </section>
  );
}



