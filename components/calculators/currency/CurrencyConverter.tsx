"use client";

import { useState, useEffect } from "react";
import { ArrowUpDown, RefreshCw } from "lucide-react";
import RateTable from "@/components/calculators/RateTable";

const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BD' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$' },
  { code: 'XAU', name: 'Gold', symbol: 'oz' },
  { code: 'XAG', name: 'Silver', symbol: 'oz' }
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

interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
  inverseRate: number;
  timestamp: string;
  lastUpdated: string;
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/forex?base=${fromCurrency}&targets=${toCurrency}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.message || 'Failed to fetch rates');
        setResult(null);
      } else if (data.rates && data.rates[toCurrency]) {
        setResult({
          from: fromCurrency,
          to: toCurrency,
          amount,
          rate: data.rates[toCurrency],
          result: amount * data.rates[toCurrency],
          inverseRate: 1 / data.rates[toCurrency],
          timestamp: data.timestamp || new Date().toISOString(),
          lastUpdated: data.date
        });
      } else {
        setError('Currency pair not available');
        setResult(null);
      }
    } catch (err) {
      setError('Failed to connect to server');
      setResult(null);
    }
    
    setLoading(false);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setAmount(numValue);
    }
  };

  // Initial load
  useEffect(() => {
    handleConvert();
  }, []);

  // Auto-convert when currency changes (not amount to avoid too many calls)
  useEffect(() => {
    if (amount > 0) {
      handleConvert();
    }
  }, [fromCurrency, toCurrency]);

  return <>
    <div className="min-w-0 space-y-5">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
        <div>
          <label className={labelClass}>From Currency</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className={inputClass}
          >
            {SUPPORTED_CURRENCIES.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className={inputClass}
            placeholder="1.00"
            min="0"
            step="any"
          />
        </div>

        <div>
          <label className={labelClass}>To Currency</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className={inputClass}
          >
            {SUPPORTED_CURRENCIES.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleSwap}
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Swap currencies"
          >
            <ArrowUpDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Conversion Result */}
      {result && !loading && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Result 
            label="Converted Amount" 
            value={`${formatNumber(result.result)} ${toCurrency}`} 
            note={`${formatNumber(amount)} ${fromCurrency} at ${formatNumber(result.rate, 8)}`.replace(/\.?0+$/, "")} 
          />
          <Result 
            label="Exchange Rate" 
            value={`1 ${fromCurrency} = ${formatNumber(result.rate, 8)} ${toCurrency}`} 
            note={`Inverse: 1 ${toCurrency} = ${formatNumber(result.inverseRate, 8)} ${fromCurrency}`.replace(/\.?0+$/, "")} 
          />
        </div>
      )}

      {/* Rate Details */}
      {result && !loading && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Rate Details</h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p><strong>Mid-Market Rate:</strong> {formatNumber(result.rate, 8)} {toCurrency} per {fromCurrency}</p>
            <p><strong>Rate Timestamp:</strong> {new Date(result.timestamp).toLocaleString()} UTC</p>
            <p><strong>Last Updated:</strong> {result.lastUpdated}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
            <span className="ml-2 text-slate-600 dark:text-slate-400">Fetching rates...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Notice>{error}</Notice>
      )}

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={handleConvert}
          disabled={loading}
          className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Rates
        </button>
      </div>

      {/* Disclaimer */}
      <Notice>
        Mid-market rates are for informational purposes only. Actual transaction rates from banks or money transfer services may include markups and fees. Always verify rates with your provider before making transactions.
      </Notice>
      
      <RateTable />
    </div>
  </>;
}