"use client";

import React, { useEffect, useState } from "react";
import { getCryptoPrices, getForexRates } from "@/lib/api";
import { TrendingUp, TrendingDown, Activity, Bitcoin, DollarSign, BarChart3 } from "lucide-react";

export default function LivePrices() {
  const [crypto, setCrypto] = useState<{ id: string; symbol: string; inr: number; change: number }[]>([]);
  const [forex, setForex] = useState<{ pair: string; rate: number; change: number }[]>([]);
  const [stocks, setStocks] = useState<{ symbol: string; price: number; change: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cryptoData, forexData, stockData] = await Promise.all([
          getCryptoPrices(["bitcoin", "ethereum", "binancecoin", "solana"]),
          getForexRates("USD", ["INR", "EUR", "GBP", "JPY"]),
          fetch('/api/stocks?symbols=AAPL,GOOGL,MSFT,TSLA,AMZN').then(res => res.json()),
        ]);

        if (cryptoData) {
          setCrypto([
            { id: "bitcoin", symbol: "BTC", inr: cryptoData.bitcoin?.inr || 0, change: cryptoData.bitcoin?.change_24h || 0 },
            { id: "ethereum", symbol: "ETH", inr: cryptoData.ethereum?.inr || 0, change: cryptoData.ethereum?.change_24h || 0 },
            { id: "binancecoin", symbol: "BNB", inr: cryptoData.binancecoin?.inr || 0, change: cryptoData.binancecoin?.change_24h || 0 },
            { id: "solana", symbol: "SOL", inr: cryptoData.solana?.inr || 0, change: cryptoData.solana?.change_24h || 0 },
          ]);
        }

        if (forexData) {
          setForex([
            { pair: "USD/INR", rate: Number(forexData.INR) || 0, change: 0 },
            { pair: "EUR/INR", rate: forexData.EUR ? Number((forexData.EUR * forexData.INR).toFixed(2)) : 0, change: 0 },
            { pair: "GBP/INR", rate: forexData.GBP ? Number((forexData.GBP * forexData.INR).toFixed(2)) : 0, change: 0 },
            { pair: "USD/JPY", rate: Number(forexData.JPY) || 0, change: 0 },
          ]);
        }

        if (stockData) {
          setStocks([
            { symbol: "AAPL", price: stockData.AAPL?.price || 0, change: stockData.AAPL?.changePercent || 0 },
            { symbol: "GOOGL", price: stockData.GOOGL?.price || 0, change: stockData.GOOGL?.changePercent || 0 },
            { symbol: "MSFT", price: stockData.MSFT?.price || 0, change: stockData.MSFT?.changePercent || 0 },
            { symbol: "TSLA", price: stockData.TSLA?.price || 0, change: stockData.TSLA?.changePercent || 0 },
            { symbol: "AMZN", price: stockData.AMZN?.price || 0, change: stockData.AMZN?.changePercent || 0 },
          ]);
        }

        // Check if using fallback rates (INR exactly 83.5 indicates fallback)
        if (forexData?.INR === 83.5) {
          setUsingFallback(true);
        }
      } catch (e) {
        console.error("Failed to fetch live prices", e);
        setUsingFallback(true);
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Live Market Prices</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Real-time crypto, forex, and stock prices powered by free APIs</p>
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
                {crypto.map((coin) => (
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
                {forex.map((fx) => (
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

            {/* Stocks */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Stock Prices</h3>
              </div>
              <div className="space-y-3">
                {stocks.map((stock) => (
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
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Activity className="w-3.5 h-3.5 text-green-500" />
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Live market data • Daily updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
