"use client";

import React, { useEffect, useState } from "react";
import { getCryptoPrices } from "@/lib/api";
import { TrendingUp, TrendingDown, Activity, Bitcoin, DollarSign, BarChart3 } from "lucide-react";

export default function LivePrices() {
  const [crypto, setCrypto] = useState<{ id: string; symbol: string; inr: number; change: number }[]>([]);
  const [forex, setForex] = useState<{ pair: string; rate: number; change: number }[]>([]);
  const [stocks, setStocks] = useState<{ symbol: string; price: number; change: number }[]>([]);
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
          fetch('/api/forex?base=USD&targets=INR,EUR,GBP,JPY').then(async (res) => res.ok ? res.json() : null),
          fetch('/api/stocks?symbols=AAPL,GOOGL,MSFT,TSLA,AMZN').then(async (res) => res.ok ? res.json() : null),
        ]);

        const cryptoData = cryptoResult.status === "fulfilled" ? cryptoResult.value : {};
        const forexResponse = forexResult.status === "fulfilled" ? forexResult.value : null;
        const stocksResponse = stocksResult.status === "fulfilled" ? stocksResult.value : null;

        if (cryptoData && Object.keys(cryptoData).length > 0) {
          setCrypto([
            { id: "bitcoin", symbol: "BTC", inr: cryptoData.bitcoin?.inr || 0, change: cryptoData.bitcoin?.change_24h || 0 },
            { id: "ethereum", symbol: "ETH", inr: cryptoData.ethereum?.inr || 0, change: cryptoData.ethereum?.change_24h || 0 },
            { id: "binancecoin", symbol: "BNB", inr: cryptoData.binancecoin?.inr || 0, change: cryptoData.binancecoin?.change_24h || 0 },
            { id: "solana", symbol: "SOL", inr: cryptoData.solana?.inr || 0, change: cryptoData.solana?.change_24h || 0 },
          ]);
        }

        if (forexResponse?.INR) {
          setForex([
            { pair: "USD/INR", rate: Number(forexResponse.INR), change: 0 },
            { pair: "EUR/INR", rate: forexResponse.EUR ? Number((forexResponse.EUR * forexResponse.INR).toFixed(2)) : 0, change: 0 },
            { pair: "GBP/INR", rate: forexResponse.GBP ? Number((forexResponse.GBP * forexResponse.INR).toFixed(2)) : 0, change: 0 },
            { pair: "USD/JPY", rate: Number(forexResponse.JPY) || 0, change: 0 },
          ]);
        }

        if (stocksResponse && Object.keys(stocksResponse).length > 0) {
          setStocks([
            { symbol: "AAPL", price: stocksResponse.AAPL?.price || 0, change: stocksResponse.AAPL?.changePercent || 0 },
            { symbol: "GOOGL", price: stocksResponse.GOOGL?.price || 0, change: stocksResponse.GOOGL?.changePercent || 0 },
            { symbol: "MSFT", price: stocksResponse.MSFT?.price || 0, change: stocksResponse.MSFT?.changePercent || 0 },
            { symbol: "TSLA", price: stocksResponse.TSLA?.price || 0, change: stocksResponse.TSLA?.changePercent || 0 },
            { symbol: "AMZN", price: stocksResponse.AMZN?.price || 0, change: stocksResponse.AMZN?.changePercent || 0 },
          ]);
        }

        // Stock data is optional until its provider key is configured. Crypto
        // and forex availability should not depend on the stock request.
        setDataUnavailable(!(cryptoData && Object.keys(cryptoData).length > 0) || !forexResponse?.INR);
      } catch {
        setDataUnavailable(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 120000); // Refresh every 2 min
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
          <p className="text-sm text-slate-500 dark:text-slate-400">External market data when available; prices may be delayed and are not trading advice.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-slate-400 py-8">
            <Activity className="w-5 h-5 animate-pulse" />
            <span>Loading live prices...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Crypto */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                  <Bitcoin className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cryptocurrency</h3>
              </div>
              <div className="space-y-3">
                {crypto.length === 0 ? <Unavailable label="Cryptocurrency data" /> : crypto.map((coin) => (
                  <div key={coin.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{coin.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">₹{coin.inr.toLocaleString("en-IN")}</div>
                      <div
                        className={`text-xs flex items-center gap-0.5 ${coin.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
                      >
                        {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(coin.change).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forex */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Forex Rates</h3>
              </div>
              <div className="space-y-3">
                {forex.length === 0 ? <Unavailable label="Forex rates" /> : forex.map((fx) => (
                  <div key={fx.pair} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{fx.pair}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{Number(fx.rate).toFixed(4)}</div>
                      <div
                        className={`text-xs flex items-center gap-0.5 ${fx.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
                      >
                        {fx.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(fx.change).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stocks: shown only after a provider returns real data */}
            {stocks.length > 0 && <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Stock Prices</h3>
              </div>
              <div className="space-y-3">
                {stocks.length === 0 ? <Unavailable label="Stock prices" /> : stocks.map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{stock.symbol}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">${stock.price.toLocaleString()}</div>
                      <div
                        className={`text-xs flex items-center gap-0.5 ${stock.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
                      >
                        {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(stock.change).toFixed(2)}%
                      </div>
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
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              External data - Check provider timestamps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
