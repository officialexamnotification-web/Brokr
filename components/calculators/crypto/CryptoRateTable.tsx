"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

interface CryptoData {
  [id: string]: {
    usd: number;
    change_24h: number | null;
    market_cap_rank: number | null;
  };
}

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export default function CryptoRateTable() {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const fetchCryptoPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/crypto');
      const data = await response.json();
      
      setCryptoData(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(12);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!cryptoData) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
          <span className="ml-2 text-slate-600 dark:text-slate-400">Loading crypto prices...</span>
        </div>
      </div>
    );
  }

  const sortedCryptos = Object.entries(cryptoData)
    .filter(([_, data]) => data.market_cap_rank !== null)
    .sort(([, a], [, b]) => (a.market_cap_rank || 999) - (b.market_cap_rank || 999));

  const totalPages = Math.ceil(sortedCryptos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCryptos = sortedCryptos.slice(startIndex, endIndex);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
          Live Crypto Prices ({sortedCryptos.length} coins)
        </h3>
        <button
          onClick={fetchCryptoPrices}
          disabled={loading}
          className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {lastUpdated && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Last updated: {lastUpdated}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {currentCryptos.map(([id, data]) => {
          const isPositive = data.change_24h && data.change_24h >= 0;
          const symbol = id.toUpperCase();
          
          return (
            <div key={id} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{symbol}</div>
                <div className={`text-xs font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {data.change_24h !== null ? (
                    `${isPositive ? '+' : ''}${formatNumber(data.change_24h, 2)}%`
                  ) : (
                    '—'
                  )}
                </div>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                ${formatNumber(data.usd)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rank #{data.market_cap_rank}</div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Data from CoinGecko API (top 250 by market cap). Prices may differ from exchange rates due to spread and market conditions.
      </p>
    </div>
  );
}