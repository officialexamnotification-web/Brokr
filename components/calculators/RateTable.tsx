"use client";

import { useEffect, useState } from "react";

type ForexReferenceResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
  previousDate: string | null;
  previousRates: Record<string, number> | null;
};

const allCurrencyPairs = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD",
  "EUR/GBP", "EUR/JPY", "GBP/JPY", "EUR/CHF", "GBP/CHF", "AUD/CHF", "CAD/CHF",
  "CHF/JPY", "EUR/AUD", "EUR/CAD", "EUR/NZD", "GBP/AUD", "GBP/CAD", "GBP/NZD",
  "AUD/CAD", "NZD/CAD", "AUD/JPY", "CAD/JPY", "NZD/JPY", "XAU/USD", "XAG/USD",
  "XAU/EUR", "XAG/EUR", "USD/SGD", "USD/HKD", "USD/CNY", "USD/KRW", "SGD/JPY",
  "HKD/JPY", "USD/AED", "USD/SAR", "USD/QAR", "USD/KWD", "USD/BHD", "USD/OMR",
  "USD/EGP", "USD/SEK", "USD/NOK", "USD/DKK", "USD/ZAR", "USD/THB", "USD/MYR",
  "USD/BRL", "USD/MXN", "USD/PLN", "USD/CZK", "USD/HUF", "USD/TRY", "USD/IDR",
  "USD/PHP", "EUR/SEK", "EUR/NOK", "SEK/NOK", "DKK/SEK"
];

function formatNumber(value: number, digits = 4) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export default function RateTable() {
  const [rates, setRates] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Responsive items per row
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(12); // 4 rows × 3 = 12 items per page
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(9); // 3 rows × 3 = 9 items per page
      } else {
        setItemsPerPage(8); // 4 rows × 2 = 8 items per page
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let active = true;
    
    async function fetchRates() {
      try {
        setLoading(true);
        
        // Collect all unique base currencies from pairs
        const baseCurrencies = new Set<string>();
        const targetCurrencies = new Set<string>();
        
        allCurrencyPairs.forEach(pair => {
          const [base, target] = pair.split("/");
          baseCurrencies.add(base);
          targetCurrencies.add(target);
        });

        // Convert CNH to CNY for API compatibility
        const targetsArray = Array.from(targetCurrencies).map(curr => curr === "CNH" ? "CNY" : curr);
        
        // Fetch rates for each base currency
        const allRates: Record<string, Record<string, number>> = {};
        const basesToFetch = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "XAU", "XAG"];
        
        const promises = basesToFetch.map(async (base) => {
          try {
            const response = await fetch(`/api/forex?base=${base}&targets=${targetsArray.join(",")}`);
            if (response.ok) {
              const data = await response.json() as ForexReferenceResponse;
              if (data.rates) {
                const adjustedRates: Record<string, number> = {};
                Object.entries(data.rates).forEach(([currency, rate]) => {
                  if (currency === "CNY") {
                    adjustedRates["CNH"] = rate;
                    adjustedRates["CNY"] = rate;
                  } else {
                    adjustedRates[currency] = rate;
                  }
                });
                allRates[base] = adjustedRates;
              }
            }
          } catch (err) {
            console.error(`Failed to fetch rates for ${base}:`, err);
          }
        });

        await Promise.all(promises);
        
        if (active) {
          setRates(allRates);
          setLastUpdated(new Date().toISOString());
        }
      } catch (err) {
        console.error("Failed to fetch rates:", err);
        setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchRates();
    return () => { active = false; };
  }, []);

  // Calculate rates for all pairs using multi-base rates
  const pairRates = allCurrencyPairs.map(pair => {
    const [base, target] = pair.split("/");
    
    // Direct rate from base if available
    if (rates[base] && rates[base][target]) {
      return { pair, rate: rates[base][target] };
    }
    
    // Try to calculate via USD as intermediary
    if (rates["USD"]) {
      const baseToUSD = base === "USD" ? 1 : (rates["USD"][base] ? 1 / rates["USD"][base] : null);
      const usdToTarget = target === "USD" ? 1 : rates["USD"][target];
      
      if (baseToUSD !== null && usdToTarget !== null) {
        return { pair, rate: baseToUSD * usdToTarget };
      }
    }
    
    // Return null if rate not available
    return { pair, rate: null };
  });

  // Pagination logic
  const totalPages = Math.ceil(allCurrencyPairs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPairs = pairRates.slice(startIndex, endIndex);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Live Currency Rates</h3>
        {lastUpdated && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-slate-600 dark:text-slate-400">Loading currency rates...</div>
      ) : error ? (
        <div className="text-sm text-red-600 dark:text-red-400">Failed to load currency rates</div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {currentPairs.map(({ pair, rate }) => (
              <div 
                key={pair} 
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{pair}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {rate !== null ? formatNumber(rate, 4) : "—"}
                </p>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === pageNum
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
              >
                Next
              </button>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, allCurrencyPairs.length)} of {allCurrencyPairs.length} pairs
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                For exact trading decisions, always verify rates with your broker's platform.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
