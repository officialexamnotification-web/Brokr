"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import CryptoRateTable from "@/components/calculators/crypto/CryptoRateTable";

const POPULAR_CRYPTOS = [
  { symbol: 'BTC', name: 'Bitcoin', id: 'bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', id: 'ethereum' },
  { symbol: 'BNB', name: 'Binance Coin', id: 'binancecoin' },
  { symbol: 'SOL', name: 'Solana', id: 'solana' },
  { symbol: 'XRP', name: 'Ripple', id: 'ripple' },
  { symbol: 'ADA', name: 'Cardano', id: 'cardano' },
  { symbol: 'DOGE', name: 'Dogecoin', id: 'dogecoin' },
  { symbol: 'DOT', name: 'Polkadot', id: 'polkadot' },
  { symbol: 'MATIC', name: 'Polygon', id: 'matic-network' },
  { symbol: 'AVAX', name: 'Avalanche', id: 'avalanche-2' },
  { symbol: 'LINK', name: 'Chainlink', id: 'chainlink' },
  { symbol: 'UNI', name: 'Uniswap', id: 'uniswap' },
  { symbol: 'LTC', name: 'Litecoin', id: 'litecoin' },
  { symbol: 'ATOM', name: 'Cosmos', id: 'cosmos' },
  { symbol: 'ETC', name: 'Ethereum Classic', id: 'ethereum-classic' },
];

const FIAT_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
];

const inputClass = "min-w-0 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2";

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function Result({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70"><p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold break-words text-slate-900 dark:text-white">{value}</p>{note && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>}</div>;
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">{children}</div>;
}

interface CryptoPrice {
  usd: number;
  change_24h: number | null;
}

interface ProfitResult {
  profit: number;
  roi: number;
  totalFees: number;
  entryFee: number;
  exitFee: number;
  totalInvestment: number;
  exitValue: number;
  cryptoAmount: number;
}

export default function CryptoProfitCalculator() {
  const [crypto, setCrypto] = useState('BTC');
  const [fiat, setFiat] = useState('USD');
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [exitPrice, setExitPrice] = useState<number>(0);
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [entryFee, setEntryFee] = useState<number>(0.1);
  const [exitFee, setExitFee] = useState<number>(0.1);
  const [isInvestmentMode, setIsInvestmentMode] = useState(true);
  const [cryptoAmount, setCryptoAmount] = useState<number>(0);
  const [result, setResult] = useState<ProfitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [livePrices, setLivePrices] = useState<Record<string, CryptoPrice> | null>(null);
  const [useLivePrices, setUseLivePrices] = useState(false);

  const fetchLivePrices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/crypto');
      const data = await response.json();
      
      const priceMap: Record<string, CryptoPrice> = {};
      POPULAR_CRYPTOS.forEach(c => {
        if (data[c.id]) {
          priceMap[c.symbol] = {
            usd: data[c.id].usd,
            change_24h: data[c.id].change_24h
          };
        }
      });
      
      setLivePrices(priceMap);
      
      // Auto-fill entry price if empty
      if (entryPrice === 0 && priceMap[crypto]) {
        setEntryPrice(priceMap[crypto].usd);
      }
    } catch (error) {
      console.error('Failed to fetch live prices:', error);
    }
    setLoading(false);
  }, [entryPrice, crypto]);

  const calculateProfit = useCallback(() => {
    if (!entryPrice || !exitPrice) return;
    
    let cryptoQty: number;
    let investment: number;
    
    if (isInvestmentMode) {
      cryptoQty = investmentAmount / entryPrice;
      investment = investmentAmount;
    } else {
      cryptoQty = cryptoAmount;
      investment = cryptoQty * entryPrice;
    }
    
    const entryFeeAmount = investment * (entryFee / 100);
    const exitValue = cryptoQty * exitPrice;
    const exitFeeAmount = exitValue * (exitFee / 100);
    const totalFees = entryFeeAmount + exitFeeAmount;
    const profit = exitValue - investment - totalFees;
    const roi = (profit / investment) * 100;
    
    setResult({
      profit,
      roi,
      totalFees,
      entryFee: entryFeeAmount,
      exitFee: exitFeeAmount,
      totalInvestment: investment,
      exitValue,
      cryptoAmount: cryptoQty,
    });
  }, [entryPrice, exitPrice, investmentAmount, cryptoAmount, entryFee, exitFee, isInvestmentMode]);

  const handleCryptoChange = (symbol: string) => {
    setCrypto(symbol);
    if (livePrices?.[symbol]) {
      setEntryPrice(livePrices[symbol].usd);
    }
  };

  const useCurrentPrice = () => {
    if (livePrices?.[crypto]) {
      setExitPrice(livePrices[crypto].usd);
    }
  };

  useEffect(() => {
    fetchLivePrices();
  }, [fetchLivePrices]);

  useEffect(() => {
    calculateProfit();
  }, [calculateProfit]);

  return <>
    <div className="min-w-0 space-y-5">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
        <div>
          <label className={labelClass}>Cryptocurrency</label>
          <select
            value={crypto}
            onChange={(e) => handleCryptoChange(e.target.value)}
            className={inputClass}
          >
            {POPULAR_CRYPTOS.map(c => (
              <option key={c.symbol} value={c.symbol}>
                {c.symbol} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Display Currency</label>
          <select
            value={fiat}
            onChange={(e) => setFiat(e.target.value)}
            className={inputClass}
          >
            {FIAT_CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Entry Price ({fiat})</label>
          <input
            type="number"
            value={entryPrice || ''}
            onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
            className={inputClass}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className={labelClass}>Exit Price ({fiat})</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={exitPrice || ''}
              onChange={(e) => setExitPrice(parseFloat(e.target.value) || 0)}
              className={inputClass}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {livePrices?.[crypto] && (
              <button
                onClick={useCurrentPrice}
                className="px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
              >
                Use Live
              </button>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>Entry Fee (%)</label>
          <input
            type="number"
            value={entryFee}
            onChange={(e) => setEntryFee(parseFloat(e.target.value) || 0)}
            className={inputClass}
            placeholder="0.1"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className={labelClass}>Exit Fee (%)</label>
          <input
            type="number"
            value={exitFee}
            onChange={(e) => setExitFee(parseFloat(e.target.value) || 0)}
            className={inputClass}
            placeholder="0.1"
            step="0.01"
            min="0"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setIsInvestmentMode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isInvestmentMode ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              Investment Amount
            </button>
            <button
              onClick={() => setIsInvestmentMode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isInvestmentMode ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              Crypto Amount
            </button>
          </div>
          
          {isInvestmentMode ? (
            <div>
              <label className={labelClass}>Investment Amount ({fiat})</label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(parseFloat(e.target.value) || 0)}
                className={inputClass}
                placeholder="1000"
                step="0.01"
                min="0"
              />
            </div>
          ) : (
            <div>
              <label className={labelClass}>Crypto Amount</label>
              <input
                type="number"
                value={cryptoAmount}
                onChange={(e) => setCryptoAmount(parseFloat(e.target.value) || 0)}
                className={inputClass}
                placeholder="0.1"
                step="0.0001"
                min="0"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Result 
            label="Profit / Loss" 
            value={`${result.profit >= 0 ? '+' : ''}${formatNumber(result.profit)} ${fiat}`} 
            note={result.roi >= 0 ? `+${formatNumber(result.roi)}% ROI` : `${formatNumber(result.roi)}% ROI`} 
          />
          <Result 
            label="Total Fees" 
            value={`${formatNumber(result.totalFees)} ${fiat}`} 
            note={`Entry: ${formatNumber(result.entryFee)} ${fiat} | Exit: ${formatNumber(result.exitFee)} ${fiat}`} 
          />
        </div>
      )}

      {/* Detailed Breakdown */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Trade Details</h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p><strong>Crypto Amount:</strong> {formatNumber(result.cryptoAmount, 8)} {crypto}</p>
            <p><strong>Total Investment:</strong> {formatNumber(result.totalInvestment)} {fiat}</p>
            <p><strong>Exit Value:</strong> {formatNumber(result.exitValue)} {fiat}</p>
            <p><strong>Net Result:</strong> {formatNumber(result.profit)} {fiat} ({formatNumber(result.roi)}%)</p>
            {livePrices?.[crypto] && (
              <>
                <p><strong>Current Price:</strong> {formatNumber(livePrices[crypto].usd)} USD</p>
                <p><strong>24h Change:</strong> {livePrices[crypto].change_24h !== null ? `${livePrices[crypto].change_24h >= 0 ? '+' : ''}${formatNumber(livePrices[crypto].change_24h, 2)}%` : '—'}</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
            <span className="ml-2 text-slate-600 dark:text-slate-400">Fetching live prices...</span>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={fetchLivePrices}
          disabled={loading}
          className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Prices
        </button>
      </div>

      {/* Disclaimer */}
      <Notice>
        Calculations use live market data from CoinGecko API. Trading fees vary by exchange and VIP status. Actual execution prices may differ due to spread, slippage, and market conditions. This tool is for informational purposes only and does not constitute financial advice. Always verify rates with your exchange before making trading decisions.
      </Notice>
      
      <CryptoRateTable />
    </div>
  </>;
}