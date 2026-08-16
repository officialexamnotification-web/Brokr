"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from "recharts";
import { ArrowLeft } from "lucide-react";
import { calculatorDefinitions, type CalculatorSlug } from "@/lib/calculators";
import RateTable from "@/components/calculators/RateTable";
import CurrencyConverter from "@/components/calculators/currency/CurrencyConverter";
import CryptoProfitCalculator from "@/components/calculators/crypto/CryptoProfitCalculator";

type Props = { slug: CalculatorSlug };

const inputClass = "min-w-0 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2";
const STOCK_MARKET_CACHE_KEY = "tradivex-stock-market-cache";

type PivotReportRow = {
  Symbol: string;
  Company: string;
  Method: string;
  Timeframe: string;
  "Calculated at": string;
  Source: string;
  High: number;
  Low: number;
  Close: number;
  Open: number;
  Level: string;
  Value: number | null | undefined;
};

function buildPivotReportRows(input: {
  symbol: string;
  company: string;
  timeframe: string;
  calculatedAt: string;
  source: string;
  high: number;
  low: number;
  close: number;
  open: number;
  methods: Record<string, Record<string, number | null | undefined>>;
}) {
  const levels = ["pivot", "r1", "r2", "r3", "r4", "s1", "s2", "s3", "s4"];
  return Object.entries(input.methods).flatMap(([method, values]) => levels.map((level) => ({
    Symbol: input.symbol,
    Company: input.company,
    Method: method,
    Timeframe: input.timeframe,
    "Calculated at": input.calculatedAt,
    Source: input.source,
    High: input.high,
    Low: input.low,
    Close: input.close,
    Open: input.open,
    Level: level.toUpperCase(),
    Value: values[level],
  } satisfies PivotReportRow)).filter((row) => row.Value !== undefined && row.Value !== null));
}

function escapeCsvValue(value: unknown) {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function escapeHtmlValue(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character);
}

function NumberField({ label, value, onChange, step = "any", min = "0", max, suffix, note }: { label: string; value: number; onChange: (value: number) => void; step?: string; min?: string; max?: string; suffix?: string; note?: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <input type="number" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className={inputClass} />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">{suffix}</span>}
      </div>
      {note && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>}
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ label: string; value: string }> }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input type="text" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    </label>
  );
}

function Result({ label, value, note, zone }: { label: string; value: string; note?: string; zone?: "resistance" | "support" | "pivot" | "neutral" }) {
  const zoneColors = {
    resistance: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    support: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    pivot: "bg-primary-50 dark:bg-primary-950/20 border-primary-200 dark:border-primary-800",
    neutral: "bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800"
  };
  
  const textColors = {
    resistance: "text-red-900 dark:text-red-100",
    support: "text-green-900 dark:text-green-100",
    pivot: "text-primary-900 dark:text-primary-100",
    neutral: "text-slate-900 dark:text-white"
  };

  return <div className={`rounded-2xl p-5 ${zoneColors[zone || "neutral"]}`}><p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p><p className={`mt-2 text-2xl font-bold break-words ${textColors[zone || "neutral"]}`}>{value}</p>{note && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>}</div>;
}

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function formatNumberWithPrecision(value: number, precision: number) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", { maximumFractionDigits: precision, minimumFractionDigits: precision });
}

function Notice({ children }: { children: ReactNode }) {
  return <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">{children}</div>;
}

const worldCurrencyCodes = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "MXN", "BRL", "RUB", "ZAR", "TRY", "KRW", "SGD", "HKD", "NOK", "SEK", "DKK", "PLN", "THB", "IDR", "MYR", "PHP", "VND", "CZK", "HUF", "RON", "ILS", "CLP", "COP", "PEN", "ARS", "UAH", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "EGP", "NZD", "TWD", "XAU", "XAG"
];

const forexPairOptions = [
  // Global Majors (10) - 90%+ trading volume
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD",
  "EUR/GBP", "EUR/JPY", "GBP/JPY",

  // Commodity Pairs (4) - High RPM, wealthy traders
  "XAU/USD", "XAG/USD", "XAU/EUR", "XAG/EUR",

  // Asian High RPM (6) - Singapore, Hong Kong, China, Korea
  "USD/SGD", "USD/HKD", "USD/CNH", "USD/KRW", "SGD/JPY", "HKD/JPY",

  // Middle Eastern High RPM (7) - Oil wealth, high income
  "USD/AED", "USD/SAR", "USD/QAR", "USD/KWD", "USD/BHD", "USD/OMR", "USD/EGP",

  // European Regional (7) - Scandinavia, Switzerland
  "EUR/CHF", "GBP/CHF", "AUD/CHF", "CAD/CHF", "CHF/JPY", "EUR/SEK", "EUR/NOK",

  // Commonwealth (4) - Australia, Canada, New Zealand
  "AUD/JPY", "CAD/JPY", "NZD/JPY", "AUD/CAD",

  // Important Regional (10) - Brazil, Mexico, South Africa, Thailand, etc.
  "USD/SEK", "USD/NOK", "USD/DKK", "USD/ZAR", "USD/THB", "USD/MYR", "USD/BRL", "USD/MXN",
  "USD/PLN", "USD/CZK",

  // Emerging Market (4) - Turkey, Indonesia, Philippines
  "USD/HUF", "USD/TRY", "USD/IDR", "USD/PHP",

  // Professional Cross Pairs (10) - Institutional trading
  "EUR/AUD", "EUR/CAD", "EUR/NZD", "GBP/AUD", "GBP/CAD", "GBP/NZD", "AUD/CAD", "NZD/CAD",
  "SEK/NOK", "DKK/SEK",

  // JPY Volatile Crosses (3) - Professional trading
  "TRY/JPY", "ZAR/JPY", "MXN/JPY",
];

const worldCurrencyOptions = worldCurrencyCodes.map((value) => ({ label: value, value }));
const forexPairSelectOptions = forexPairOptions.map((value) => ({ label: value, value }));

function CurrencyCorrelationCalculator() {
  const [currencyA, setCurrencyA] = useState([0.4, -0.8, 1.1, -0.2, 0.7, -1]);
  const [currencyB, setCurrencyB] = useState([0.2, -0.5, 0.9, 0.1, 0.5, -0.7]);
  const [labelA, setLabelA] = useState("Currency A");
  const [labelB, setLabelB] = useState("Currency B");
  const pairs = currencyA.map((value, index) => ({ a: value, b: currencyB[index] }));
  const meanA = currencyA.reduce((sum, value) => sum + value, 0) / currencyA.length;
  const meanB = currencyB.reduce((sum, value) => sum + value, 0) / currencyB.length;
  const numerator = pairs.reduce((sum, pair) => sum + (pair.a - meanA) * (pair.b - meanB), 0);
  const denominator = Math.sqrt(
    currencyA.reduce((sum, value) => sum + (value - meanA) ** 2, 0)
      * currencyB.reduce((sum, value) => sum + (value - meanB) ** 2, 0)
  );
  const correlation = denominator > 0 ? numerator / denominator : NaN;
  const relationship = !Number.isFinite(correlation)
    ? "Not enough variation"
    : correlation >= 0.7
      ? "Strong positive relationship"
      : correlation >= 0.3
        ? "Moderate positive relationship"
        : correlation <= -0.7
          ? "Strong inverse relationship"
          : correlation <= -0.3
            ? "Moderate inverse relationship"
            : "Weak or no linear relationship";

  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <TextField label="Currency A label" value={labelA} onChange={setLabelA} placeholder="Example: EUR/USD" />
      <TextField label="Currency B label" value={labelB} onChange={setLabelB} placeholder="Example: GBP/USD" />
      {pairs.map((pair, index) => <div key={index} className="contents">
        <NumberField label={`Period ${index + 1} - ${labelA || "Currency A"} return`} value={pair.a} onChange={(value) => setCurrencyA((current) => current.map((item, itemIndex) => itemIndex === index ? value : item))} step="0.01" suffix="%" />
        <NumberField label={`Period ${index + 1} - ${labelB || "Currency B"} return`} value={pair.b} onChange={(value) => setCurrencyB((current) => current.map((item, itemIndex) => itemIndex === index ? value : item))} step="0.01" suffix="%" />
      </div>)}
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><Result label="Pearson correlation" value={formatNumber(correlation, 3)} /><Result label="Interpretation" value={relationship} /></div>
    <Notice>Enter matching-period percentage returns, not price levels. The result is a mathematical Pearson correlation from your inputs; it is not a stable relationship, forecast, or trade signal.</Notice>
  </>;
}

type ForexReferenceResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
  previousDate: string | null;
  previousRates: Record<string, number> | null;
};

const strengthCurrencies = ["EUR", "GBP", "JPY", "INR", "AUD", "CAD", "CHF", "SGD"];

function CurrencyStrengthCalculator() {
  const [snapshot, setSnapshot] = useState<ForexReferenceResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/forex?base=USD&targets=${strengthCurrencies.join(",")}`)
      .then((response) => { if (!response.ok) throw new Error("Reference data unavailable"); return response.json() as Promise<ForexReferenceResponse>; })
      .then((data) => { if (active) setSnapshot(data); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, []);

  const rows = snapshot ? strengthCurrencies.map((currency) => {
    const rate = snapshot.rates[currency];
    const previous = snapshot.previousRates?.[currency] ?? null;
    let move: number | null = null;
    if (typeof previous === "number" && previous > 0 && Number.isFinite(previous) && Number.isFinite(rate)) {
      move = (rate - previous) / previous * 100;
    }
    const direction = move === null ? "Unavailable" : move < 0 ? "Stronger vs USD" : move > 0 ? "Weaker vs USD" : "Flat vs USD";
    return { currency, rate, move, direction };
  }) : [];

  return <>
    {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">The reference-rate provider is temporarily unavailable. No strength values are fabricated.</div> : !snapshot ? <div className="rounded-2xl border border-slate-200 p-5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">Loading the latest available reference rates...</div> : <>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400"><tr><th className="px-4 py-3">Currency</th><th className="px-4 py-3">USD to currency</th><th className="px-4 py-3">Reference move</th><th className="px-4 py-3">Direction</th></tr></thead><tbody>{rows.map((row) => <tr key={row.currency} className="border-t border-slate-200 dark:border-slate-800"><td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{row.currency}</td><td className="px-4 py-3 text-slate-700 dark:text-slate-300">{formatNumber(row.rate, 4)}</td><td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.move === null ? "Unavailable" : `${row.move >= 0 ? "+" : ""}${formatNumber(row.move, 2)}%`}</td><td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.direction}</td></tr>)}</tbody></table></div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Reference date: {snapshot.date}. Previous available reference date: {snapshot.previousDate || "unavailable"}.</p>
    </>}
    <Notice>This is a USD-relative reference-rate comparison, not a full multi-pair currency-strength index. A higher USD-to-currency rate means one USD buys more of that currency, so the target currency is shown as weaker versus USD. Reference rates may be delayed and do not represent tradable bid/ask quotes.</Notice>
  </>;
}

type MarketSession = { name: string; timeZone: string; openHour: number; closeHour: number };
const marketSessions: MarketSession[] = [
  { name: "Sydney", timeZone: "Australia/Sydney", openHour: 8, closeHour: 17 },
  { name: "Tokyo", timeZone: "Asia/Tokyo", openHour: 9, closeHour: 18 },
  { name: "London", timeZone: "Europe/London", openHour: 8, closeHour: 17 },
  { name: "New York", timeZone: "America/New_York", openHour: 8, closeHour: 17 },
];

function getSessionParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value || "";
  return { weekday: get("weekday"), hour: Number(get("hour")), minute: Number(get("minute")), label: new Intl.DateTimeFormat("en-US", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).format(date) };
}

function MarketHoursCalculator() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return <>
    {!now ? <div className="rounded-2xl border border-slate-200 p-5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">Loading current session times...</div> : <div className="grid gap-4 md:grid-cols-2">{marketSessions.map((session) => { const parts = getSessionParts(now, session.timeZone); const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(parts.weekday); const minutes = parts.hour * 60 + parts.minute; const isOpen = isWeekday && minutes >= session.openHour * 60 && minutes < session.closeHour * 60; return <div key={session.name} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"><div className="flex items-center justify-between gap-3"><h2 className="font-bold text-slate-900 dark:text-white">{session.name}</h2><span className={`rounded-full px-3 py-1 text-xs font-bold ${isOpen ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>{isOpen ? "Open" : "Closed"}</span></div><p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Local time: {parts.label}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Typical weekday hours: {String(session.openHour).padStart(2, "0")}:00-{String(session.closeHour).padStart(2, "0")}:00 local</p></div>; })}</div>}
    <Notice>Session status uses local exchange-city hours and automatically follows the browser&apos;s current date. Public holidays, extraordinary closures, broker hours, and brief liquidity pauses are not included. Forex trading is commonly closed over the weekend, but confirm hours with your provider.</Notice>
  </>;
}

type EconomicEvent = { id: string; title: string; country: string; currency: string | null; date: string; impact: string | null; actual: string | null; forecast: string | null; previous: string | null };

function EconomicCalendarCalculator() {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    fetch("/api/economic-calendar")
      .then((response) => { if (!response.ok) throw new Error("Calendar provider unavailable"); return response.json() as Promise<{ events: EconomicEvent[] }>; })
      .then((data) => { if (active) setEvents(Array.isArray(data.events) ? data.events : []); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, []);

  return <>
    {error ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">This is available soon.</div> : events.length === 0 ? <div className="rounded-2xl border border-slate-200 p-5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">No calendar events were returned by the connected provider.</div> : <div className="space-y-3">{events.slice(0, 20).map((event) => <div key={event.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-bold text-slate-900 dark:text-white">{event.title}</h2><span className="text-xs text-slate-500 dark:text-slate-400">{event.impact || "Impact unavailable"}</span></div><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{event.country}{event.currency ? ` - ${event.currency}` : ""} - {new Date(event.date).toLocaleString()}</p><p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Actual: {event.actual || "-"} | Forecast: {event.forecast || "-"} | Previous: {event.previous || "-"}</p></div>)}</div>}
    <Notice>Calendar entries depend on the connected provider&apos;s publication schedule and timezone. Confirm important releases with the original official source. This page is informational and does not provide a trading signal or recommendation.</Notice>
  </>;
}

function PipValueCalculator() {
  const [pair, setPair] = useState("EUR/USD");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [lotSize, setLotSize] = useState(1);
  const [conversion, setConversion] = useState(1);
  const [autoRate, setAutoRate] = useState<number | null>(null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [useAutoRate, setUseAutoRate] = useState(true);
  const [cacheAge, setCacheAge] = useState<string | null>(null);
  
  const quoteCurrency = pair.split("/")[1];
  const pipSize = pair.includes("JPY") ? 0.01 : 0.0001;
  const quotePipValue = lotSize * 100000 * pipSize;
  const effectiveConversion = useAutoRate && autoRate !== null ? autoRate : conversion;
  const accountPipValue = quotePipValue * effectiveConversion;
  
  // Client-side caching functions
  const getCacheDuration = useCallback((base: string, target: string): number => {
    // 10 minutes for all forex pairs - forex markets move fast
    return 10 * 60 * 1000; // 10 minutes
  }, []);

  const getCachedRate = useCallback((base: string, target: string): { rate: number; timestamp: number } | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        const cacheAge = Date.now() - data.timestamp;
        const maxAge = getCacheDuration(base, target);
        
        if (cacheAge < maxAge) {
          return data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (error) {
      console.error("Cache read error:", error);
    }
    return null;
  }, [getCacheDuration]);
  
  const setCachedRate = (base: string, target: string, rate: number) => {
    if (typeof window === 'undefined') return;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const data = { rate, timestamp: Date.now() };
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Cache write error:", error);
    }
  };
  
  const formatCacheAge = (timestamp: number): string => {
    const minutes = Math.floor((Date.now() - timestamp) / (60 * 1000));
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };
  
  useEffect(() => {
    async function fetchConversionRate() {
      if (quoteCurrency === accountCurrency) {
        setAutoRate(1);
        setCacheAge(null);
        return;
      }
      
      // Check cache first
      const cached = getCachedRate(quoteCurrency, accountCurrency);
      if (cached && useAutoRate) {
        setAutoRate(cached.rate);
        setCacheAge(formatCacheAge(cached.timestamp));
        return;
      }
      
      setLoadingRate(true);
      try {
        const response = await fetch(`/api/forex?base=${quoteCurrency}&targets=${accountCurrency}`);
        if (response.ok) {
          const data = await response.json();
          if (data.rates && data.rates[accountCurrency]) {
            const rate = data.rates[accountCurrency];
            setAutoRate(rate);
            setCacheAge("Just now");
            // Cache the rate
            setCachedRate(quoteCurrency, accountCurrency, rate);
          }
        }
      } catch (error) {
        console.error("Failed to fetch conversion rate:", error);
      } finally {
        setLoadingRate(false);
      }
    }
    
    if (useAutoRate) {
      fetchConversionRate();
    }
  }, [pair, accountCurrency, useAutoRate, quoteCurrency, getCachedRate]);
  
  // Manual refresh function
  const handleRefresh = () => {
    // Clear cache for current pair
    if (typeof window !== 'undefined') {
      const cacheKey = `forex_rate_${quoteCurrency}_${accountCurrency}`;
      localStorage.removeItem(cacheKey);
    }
    setCacheAge(null);
    // Force refetch
    setLoadingRate(true);
    fetch(`/api/forex?base=${quoteCurrency}&targets=${accountCurrency}`)
      .then(response => response.json())
      .then(data => {
        if (data.rates && data.rates[accountCurrency]) {
          const rate = data.rates[accountCurrency];
          setAutoRate(rate);
          setCacheAge("Just updated");
          setCachedRate(quoteCurrency, accountCurrency, rate);
        }
      })
      .catch(error => console.error("Refresh failed:", error))
      .finally(() => setLoadingRate(false));
  };
  
  return <>
    <div className="min-w-0 space-y-5">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
        <SelectField label="Currency pair" value={pair} onChange={setPair} options={forexPairSelectOptions} />
        <SelectField label="Account currency" value={accountCurrency} onChange={setAccountCurrency} options={worldCurrencyOptions} />
        <NumberField label="Position size" value={lotSize} onChange={setLotSize} step="0.01" suffix="lots" />
        <div>
          <span className={labelClass}>Conversion rate</span>
          <input 
            type="number" 
            step="0.0001" 
            value={useAutoRate && autoRate !== null ? autoRate : conversion} 
            onChange={(e) => { setConversion(Number(e.target.value)); setUseAutoRate(false); }} 
            disabled={useAutoRate && loadingRate}
            className={inputClass + (useAutoRate && loadingRate ? " opacity-50" : "")}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input 
              type="checkbox" 
              id="autoRate" 
              checked={useAutoRate} 
              onChange={(e) => setUseAutoRate(e.target.checked)} 
              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="autoRate" className="min-w-0 flex-1 text-sm text-slate-600 dark:text-slate-400">
              Auto-fetch live rate {loadingRate && "(loading...)"} {autoRate !== null && useAutoRate && `(current: ${formatNumber(autoRate, 6)})`}
            </label>
            {useAutoRate && cacheAge && (
              <button 
                onClick={handleRefresh}
                disabled={loadingRate}
                className="text-xs text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh
              </button>
            )}
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {quoteCurrency} → {accountCurrency}
            </p>
            {useAutoRate && cacheAge && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updated: {cacheAge}
              </p>
            )}
          </div>
        </div>
      </div>
    
      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="Estimated value per pip" value={`${formatNumber(accountPipValue)} ${accountCurrency}`} note="For the entered lot size" />
        <Result label="Estimated value for 10 pips" value={`${formatNumber(accountPipValue * 10)} ${accountCurrency}`} />
      </div>
      
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Lot Units Breakdown</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Standard Lot</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">100,000 units</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{formatNumber(accountPipValue)} {accountCurrency}/pip</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Mini Lot (0.1)</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">10,000 units</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{formatNumber(accountPipValue * 0.1)} {accountCurrency}/pip</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Micro Lot (0.01)</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">1,000 units</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{formatNumber(accountPipValue * 0.01)} {accountCurrency}/pip</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Calculation Formula</h3>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <p><strong>Pip Size:</strong> {pipSize} {pair.includes("JPY") ? "(JPY pairs use 0.01)" : "(standard pairs use 0.0001)"}</p>
          <p><strong>Quote Currency Pip Value:</strong> {lotSize} lots × 100,000 units × {pipSize} = {formatNumber(quotePipValue)} {quoteCurrency}</p>
          <p><strong>Account Currency Pip Value:</strong> {formatNumber(quotePipValue)} {quoteCurrency} × {formatNumber(effectiveConversion, 6)} = {formatNumber(accountPipValue)} {accountCurrency}</p>
          {pair.includes("JPY") && (
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-3"><strong>JPY Note:</strong> JPY pairs quote to 2 decimal places (e.g., 150.25), so 1 pip = 0.01. Some brokers use pipettes (3rd decimal) for precision.</p>
          )}
        </div>
      </div>
      
      <Notice>Formula estimate: standard lot = 100,000 units. For pairs where the quote currency is not your account currency, the current quote-to-account conversion rate is used. Spread, commission, and slippage are excluded.</Notice>
      
      <RateTable />
    </div>
  </>;
}

function PositionSizeCalculator() {
  const [balance, setBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLoss, setStopLoss] = useState(30);
  const [pipValue, setPipValue] = useState(10);
  
  // NEW: Enhanced states with proper error handling
  const [pair, setPair] = useState("EUR/USD");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [autoPipValue, setAutoPipValue] = useState<number | null>(null);
  const [useAutoPipValue, setUseAutoPipValue] = useState(true);
  const [loadingPipValue, setLoadingPipValue] = useState(false);
  const [conversionRate, setConversionRate] = useState(1);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [cacheAge, setCacheAge] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Client-side caching functions (from PipValueCalculator, corrected)
  const getCacheDuration = useCallback((base: string, target: string): number => {
    // 10 minutes for all forex pairs - forex markets move fast
    return 10 * 60 * 1000; // 10 minutes
  }, []);

  const getCachedRate = useCallback((base: string, target: string): { rate: number; timestamp: number } | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        const cacheAge = Date.now() - data.timestamp;
        const maxAge = getCacheDuration(base, target);
        if (cacheAge < maxAge) {
          return data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (error) {
      console.error("Cache read error:", error);
    }
    return null;
  }, [getCacheDuration]);

  const setCachedRate = useCallback((base: string, target: string, rate: number) => {
    if (typeof window === 'undefined') return;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const data = { rate, timestamp: Date.now() };
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Cache write error:", error);
    }
  }, []);

  const formatCacheAge = useCallback((timestamp: number): string => {
    const minutes = Math.floor((Date.now() - timestamp) / (60 * 1000));
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }, []);
  
  // Auto-detect pip size based on pair
  const pipSize = pair.includes("JPY") ? 0.01 : 0.0001;
  
  // Fetch pip value automatically with proper error handling
  useEffect(() => {
    let active = true;
    let controller = new AbortController();
    
    async function fetchPipValue() {
      if (!useAutoPipValue) return;
      
      const [base, target] = pair.split("/");
      setLoadingPipValue(true);
      setApiError(null);
      
      try {
        // Check cache first
        const cached = getCachedRate(base, target);
        if (cached) {
          if (active) {
            const calculatedPipValue = 100000 * pipSize * (target === "USD" ? 1 : cached.rate);
            setAutoPipValue(calculatedPipValue);
            setPipValue(calculatedPipValue);
            setCacheAge(formatCacheAge(cached.timestamp));
            setLoadingPipValue(false);
          }
          return;
        }
        
        const response = await fetch(`/api/forex?base=${base}&targets=${target}`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error("API request failed");
        
        const data = await response.json();
        if (data.rates && data.rates[target] && active) {
          const rate = data.rates[target];
          const calculatedPipValue = 100000 * pipSize * (target === "USD" ? 1 : rate);
          setAutoPipValue(calculatedPipValue);
          setPipValue(calculatedPipValue);
          setCacheAge("Just now");
          setCachedRate(base, target, rate);
        }
      } catch (error) {
        if (active && !(error instanceof Error && error.name === 'AbortError')) {
          console.error("Failed to fetch pip value:", error);
          setApiError("Failed to fetch live rates. Using manual mode.");
          setUseAutoPipValue(false);
        }
      } finally {
        if (active) setLoadingPipValue(false);
      }
    }
    
    fetchPipValue();
    return () => {
      active = false;
      controller.abort();
    };
  }, [pair, useAutoPipValue, pipSize, getCachedRate, setCachedRate, formatCacheAge]);

  // Fetch conversion rate for account currency with proper error handling
  useEffect(() => {
    let active = true;
    let controller = new AbortController();
    
    async function fetchConversion() {
      const [base, target] = pair.split("/");
      
      // If account currency is base or target, no conversion needed
      if (accountCurrency === base || accountCurrency === target) {
        if (active) {
          setConversionRate(1);
          setLoadingConversion(false);
        }
        return;
      }
      
      setLoadingConversion(true);
      
      try {
        const response = await fetch(`/api/forex?base=${target}&targets=${accountCurrency}`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error("Conversion API failed");
        
        const data = await response.json();
        if (data.rates && data.rates[accountCurrency] && active) {
          setConversionRate(data.rates[accountCurrency]);
        }
      } catch (error) {
        if (active && !(error instanceof Error && error.name === 'AbortError')) {
          console.error("Failed to fetch conversion rate:", error);
          // Fallback to rate 1 if conversion fails
          setConversionRate(1);
        }
      } finally {
        if (active) setLoadingConversion(false);
      }
    }
    
    fetchConversion();
    return () => {
      active = false;
      controller.abort();
    };
  }, [pair, accountCurrency]);

  // Manual refresh for pip value
  const handleRefreshPipValue = async () => {
    const [base, target] = pair.split("/");
    setLoadingPipValue(true);
    setApiError(null);
    
    try {
      // Clear cache
      if (typeof window !== 'undefined') {
        const cacheKey = `forex_rate_${base}_${target}`;
        localStorage.removeItem(cacheKey);
      }
      
      const response = await fetch(`/api/forex?base=${base}&targets=${target}`);
      if (response.ok) {
        const data = await response.json();
        if (data.rates && data.rates[target]) {
          const rate = data.rates[target];
          const calculatedPipValue = 100000 * pipSize * (target === "USD" ? 1 : rate);
          setAutoPipValue(calculatedPipValue);
          setPipValue(calculatedPipValue);
          setCacheAge("Just updated");
          setCachedRate(base, target, rate);
        }
      }
    } catch (error) {
      console.error("Refresh failed:", error);
      setApiError("Failed to refresh live rates.");
    } finally {
      setLoadingPipValue(false);
    }
  };

  // Proper calculation with account currency conversion
  const riskAmount = balance * riskPercent / 100;
  const effectivePipValue = useAutoPipValue && autoPipValue !== null 
    ? autoPipValue * conversionRate 
    : pipValue * conversionRate;
  
  const lots = stopLoss > 0 && effectivePipValue > 0 
    ? riskAmount / (stopLoss * effectivePipValue) 
    : 0;

  return <>
    <div className="min-w-0 space-y-5">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
        <SelectField label="Currency pair" value={pair} onChange={setPair} options={forexPairSelectOptions} />
        <SelectField label="Account currency" value={accountCurrency} onChange={setAccountCurrency} options={worldCurrencyOptions} />
        <NumberField label="Account balance" value={balance} onChange={setBalance} step="0.01" />
        <NumberField label="Risk per trade" value={riskPercent} onChange={setRiskPercent} step="0.1" suffix="%" />
        <NumberField label="Stop loss" value={stopLoss} onChange={setStopLoss} step="0.1" suffix="pips" />
        
        <div>
          <span className={labelClass}>Pip value per standard lot</span>
          <div className="relative">
            <input 
              type="number" 
              step="0.01" 
              value={useAutoPipValue && autoPipValue !== null ? autoPipValue : pipValue} 
              onChange={(e) => { 
                setPipValue(Number(e.target.value)); 
                setUseAutoPipValue(false); 
              }} 
              disabled={useAutoPipValue && loadingPipValue}
              className={inputClass + (useAutoPipValue && loadingPipValue ? " opacity-50" : "")}
            />
            {loadingPipValue && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                Loading...
              </span>
            )}
          </div>
          
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input 
              type="checkbox" 
              id="autoPipValue" 
              checked={useAutoPipValue} 
              onChange={(e) => setUseAutoPipValue(e.target.checked)} 
              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="autoPipValue" className="min-w-0 flex-1 text-sm text-slate-600 dark:text-slate-400">
              Auto-fetch pip value {loadingPipValue && "(loading...)"} {autoPipValue !== null && useAutoPipValue && `(current: ${formatNumber(autoPipValue, 6)})`}
            </label>
            {useAutoPipValue && (
              <button 
                onClick={handleRefreshPipValue}
                disabled={loadingPipValue}
                className="text-xs text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh
              </button>
            )}
          </div>
          
          {apiError && (
            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
              {apiError}
            </div>
          )}
          
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {pair.split("/")[0]} → {pair.split("/")[1]}
            </p>
            {cacheAge && useAutoPipValue && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updated: {cacheAge}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Result label="Risk amount" value={formatNumber(riskAmount)} />
        <Result label="Estimated position size" value={`${formatNumber(lots, 4)} lots`} />
        <Result label="Approx. units" value={formatNumber(lots * 100000, 0)} />
      </div>
      
      {/* Calculation Formula Display */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Calculation Formula</h3>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <p><strong>Risk Amount:</strong> {formatNumber(balance)} × {riskPercent}% = {formatNumber(riskAmount)}</p>
          <p><strong>Pip Size:</strong> {pipSize} {pair.includes("JPY") ? "(JPY pairs use 0.01)" : "(standard pairs use 0.0001)"}</p>
          <p><strong>Effective Pip Value:</strong> {formatNumber(effectivePipValue, 6)} {accountCurrency}</p>
          <p><strong>Position Size:</strong> {formatNumber(riskAmount)} ÷ ({stopLoss} pips × {formatNumber(effectivePipValue, 6)}) = {formatNumber(lots, 4)} lots</p>
          {pair.includes("JPY") && (
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-3"><strong>JPY Note:</strong> JPY pairs quote to 2 decimal places (e.g., 150.25), so 1 pip = 0.01.</p>
          )}
        </div>
      </div>
      
      <Notice>This is a calculation from your own inputs, not a recommendation of how much to risk. Actual pip value, minimum lot size, and execution loss can differ by instrument and broker.</Notice>
      
      <RateTable />
    </div>
  </>;
}

function ForexPnlCalculator() {
  const [pair, setPair] = useState("EUR/USD");
  const [direction, setDirection] = useState("long");
  const [entry, setEntry] = useState(1.085);
  const [exit, setExit] = useState(1.09);
  const [lotSize, setLotSize] = useState(1);
  const [pipValue, setPipValue] = useState(10);
  const [pipSize, setPipSize] = useState(0.0001);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [autoPipValue, setAutoPipValue] = useState<number | null>(null);
  const [useAutoPipValue, setUseAutoPipValue] = useState(true);
  const [loadingPipValue, setLoadingPipValue] = useState(false);
  const [conversionRate, setConversionRate] = useState(1);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [cacheAge, setCacheAge] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Client-side caching functions (10 minutes for all forex pairs)
  const getCacheDuration = useCallback((base: string, target: string): number => {
    // 10 minutes for all forex pairs - forex markets move fast
    return 10 * 60 * 1000; // 10 minutes
  }, []);

  const getCachedRate = useCallback((base: string, target: string): { rate: number; timestamp: number } | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        const cacheAge = Date.now() - data.timestamp;
        const maxAge = getCacheDuration(base, target);
        if (cacheAge < maxAge) {
          return data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (error) {
      console.error("Cache read error:", error);
    }
    return null;
  }, [getCacheDuration]);

  const setCachedRate = useCallback((base: string, target: string, rate: number) => {
    if (typeof window === 'undefined') return;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const data = { rate, timestamp: Date.now() };
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Cache write error:", error);
    }
  }, []);

  const formatCacheAge = useCallback((timestamp: number): string => {
    const minutes = Math.floor((Date.now() - timestamp) / (60 * 1000));
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }, []);

  // Auto-detect pip size based on pair
  useEffect(() => {
    setPipSize(pair.includes("JPY") ? 0.01 : 0.0001);
  }, [pair]);

  // Fetch pip value automatically with caching
  useEffect(() => {
    let active = true;
    let controller = new AbortController();
    
    async function fetchPipValue() {
      if (!useAutoPipValue) return;
      
      const [base, target] = pair.split("/");
      setLoadingPipValue(true);
      setApiError(null);
      
      try {
        // Check cache first
        const cached = getCachedRate(base, target);
        if (cached) {
          if (active) {
            const calculatedPipValue = 100000 * pipSize * (target === "USD" ? 1 : cached.rate);
            setAutoPipValue(calculatedPipValue);
            setPipValue(calculatedPipValue);
            setCacheAge(formatCacheAge(cached.timestamp));
            setLoadingPipValue(false);
          }
          return;
        }
        
        const response = await fetch(`/api/forex?base=${base}&targets=${target}`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error("API request failed");
        
        const data = await response.json();
        if (data.rates && data.rates[target] && active) {
          const rate = data.rates[target];
          const calculatedPipValue = 100000 * pipSize * (target === "USD" ? 1 : rate);
          setAutoPipValue(calculatedPipValue);
          setPipValue(calculatedPipValue);
          setCacheAge("Just now");
          setCachedRate(base, target, rate);
        }
      } catch (error) {
        if (active && !(error instanceof Error && error.name === 'AbortError')) {
          console.error("Failed to fetch pip value:", error);
          setApiError("Failed to fetch live rates. Using manual mode.");
          setUseAutoPipValue(false);
        }
      } finally {
        if (active) setLoadingPipValue(false);
      }
    }
    
    fetchPipValue();
    return () => {
      active = false;
      controller.abort();
    };
  }, [pair, useAutoPipValue, pipSize, getCachedRate, setCachedRate, formatCacheAge]);

  // Fetch conversion rate for account currency with error handling
  useEffect(() => {
    let active = true;
    let controller = new AbortController();
    
    async function fetchConversion() {
      const [base, target] = pair.split("/");
      
      // If account currency is base or target, no conversion needed
      if (accountCurrency === base || accountCurrency === target) {
        if (active) {
          setConversionRate(1);
          setLoadingConversion(false);
        }
        return;
      }
      
      setLoadingConversion(true);
      
      try {
        const response = await fetch(`/api/forex?base=${target}&targets=${accountCurrency}`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error("Conversion API failed");
        
        const data = await response.json();
        if (data.rates && data.rates[accountCurrency] && active) {
          setConversionRate(data.rates[accountCurrency]);
        }
      } catch (error) {
        if (active && !(error instanceof Error && error.name === 'AbortError')) {
          console.error("Failed to fetch conversion rate:", error);
          // Fallback to rate 1 if conversion fails
          setConversionRate(1);
        }
      } finally {
        if (active) setLoadingConversion(false);
      }
    }
    
    fetchConversion();
    return () => {
      active = false;
      controller.abort();
    };
  }, [pair, accountCurrency]);

  const pips = (direction === "long" ? exit - entry : entry - exit) / pipSize;
  const basePnl = pips * pipValue * lotSize;
  const convertedPnl = basePnl * conversionRate;

  // Manual refresh for pip value with cache clearing
  const handleRefreshPipValue = async () => {
    const [base, target] = pair.split("/");
    setLoadingPipValue(true);
    setApiError(null);
    
    try {
      // Clear cache
      if (typeof window !== 'undefined') {
        const cacheKey = `forex_rate_${base}_${target}`;
        localStorage.removeItem(cacheKey);
      }
      
      const response = await fetch(`/api/forex?base=${base}&targets=${target}`);
      if (response.ok) {
        const data = await response.json();
        if (data.rates && data.rates[target]) {
          const rate = data.rates[target];
          const calculatedPipValue = 100000 * pipSize * (target === "USD" ? 1 : rate);
          setAutoPipValue(calculatedPipValue);
          setPipValue(calculatedPipValue);
          setCacheAge("Just updated");
          setCachedRate(base, target, rate);
        }
      }
    } catch (error) {
      console.error("Refresh failed:", error);
      setApiError("Failed to refresh live rates.");
    } finally {
      setLoadingPipValue(false);
    }
  };

  return <>
    <div className="min-w-0 grid gap-5 grid-cols-1 md:grid-cols-2">
      <SelectField label="Currency pair" value={pair} onChange={setPair} options={forexPairSelectOptions} />
      <SelectField label="Direction" value={direction} onChange={setDirection} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} />
      <NumberField label="Position size" value={lotSize} onChange={setLotSize} step="0.01" suffix="lots" />
      <NumberField label="Entry price" value={entry} onChange={setEntry} step="0.00001" />
      <NumberField label="Exit price" value={exit} onChange={setExit} step="0.00001" />
      <div>
        <span className={labelClass}>Pip value per lot</span>
        <div className="relative">
          <input 
            type="number" 
            step="0.01" 
            value={useAutoPipValue && autoPipValue !== null ? autoPipValue : pipValue} 
            onChange={(e) => { setPipValue(Number(e.target.value)); setUseAutoPipValue(false); }} 
            disabled={useAutoPipValue && loadingPipValue}
            className={inputClass + (useAutoPipValue && loadingPipValue ? " opacity-50" : "")}
          />
          {loadingPipValue && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              Loading...
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input 
            type="checkbox" 
            id="autoPipValue" 
            checked={useAutoPipValue} 
            onChange={(e) => setUseAutoPipValue(e.target.checked)} 
            className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="autoPipValue" className="min-w-0 flex-1 text-sm text-slate-600 dark:text-slate-400">
            Auto-fetch pip value {loadingPipValue && "(loading...)"} {autoPipValue !== null && useAutoPipValue && `(current: ${formatNumber(autoPipValue, 6)})`}
          </label>
          {useAutoPipValue && (
            <button 
              onClick={handleRefreshPipValue}
              disabled={loadingPipValue}
              className="text-xs text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Refresh
            </button>
          )}
        </div>
        {apiError && (
          <div className="mt-2 text-xs text-red-600 dark:text-red-400">
            {apiError}
          </div>
        )}
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {pair.split("/")[0]} → {pair.split("/")[1]}
          </p>
          {cacheAge && useAutoPipValue && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Updated: {cacheAge}
            </p>
          )}
        </div>
      </div>
      <SelectField label="Account currency" value={accountCurrency} onChange={setAccountCurrency} options={worldCurrencyOptions} />
      <SelectField label="Pip size" value={String(pipSize)} onChange={(value) => setPipSize(Number(value))} options={[{ label: "0.0001 (most pairs)", value: "0.0001" }, { label: "0.01 (JPY pairs)", value: "0.01" }]} />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <Result label="Pips" value={formatNumber(pips, 1)} />
      <Result label="Estimated P&L" value={formatNumber(convertedPnl)} note={accountCurrency} />
    </div>
    <Notice>Expiry, spread, commission, swaps, slippage, taxes, and financing are excluded. A negative result represents an estimated loss from the entered prices.</Notice>
    <RateTable />
  </>;
}

function ForexMarginCalculator() {
  const [pair, setPair] = useState("EUR/USD");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [lotSize, setLotSize] = useState(1);
  const [leverage, setLeverage] = useState(100);
  const [entry, setEntry] = useState(1.085);
  const [conversionRate, setConversionRate] = useState(1);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [cacheAge, setCacheAge] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [useAutoRate, setUseAutoRate] = useState(true);
  const [autoRate, setAutoRate] = useState<number | null>(null);

  const leverageOptions = [
    { label: "1:5", value: "5" },
    { label: "1:10", value: "10" },
    { label: "1:20", value: "20" },
    { label: "1:25", value: "25" },
    { label: "1:30", value: "30" },
    { label: "1:33", value: "33" },
    { label: "1:40", value: "40" },
    { label: "1:50", value: "50" },
    { label: "1:66", value: "66" },
    { label: "1:100", value: "100" },
    { label: "1:125", value: "125" },
    { label: "1:150", value: "150" },
    { label: "1:200", value: "200" },
    { label: "1:300", value: "300" },
    { label: "1:400", value: "400" },
    { label: "1:500", value: "500" },
    { label: "1:600", value: "600" },
    { label: "1:1000", value: "1000" },
  ];

  // Client-side caching functions (10 minutes for all forex pairs)
  const getCacheDuration = useCallback((base: string, target: string): number => {
    // 10 minutes for all forex pairs - forex markets move fast
    return 10 * 60 * 1000; // 10 minutes
  }, []);

  const getCachedRate = useCallback((base: string, target: string): { rate: number; timestamp: number } | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        const cacheAge = Date.now() - data.timestamp;
        const maxAge = getCacheDuration(base, target);
        if (cacheAge < maxAge) {
          return data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (error) {
      console.error("Cache read error:", error);
    }
    return null;
  }, [getCacheDuration]);

  const setCachedRate = useCallback((base: string, target: string, rate: number) => {
    if (typeof window === 'undefined') return;
    try {
      const cacheKey = `forex_rate_${base}_${target}`;
      const data = { rate, timestamp: Date.now() };
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Cache write error:", error);
    }
  }, []);

  const formatCacheAge = useCallback((timestamp: number): string => {
    const minutes = Math.floor((Date.now() - timestamp) / (60 * 1000));
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }, []);

  // Fetch conversion rate for account currency
  useEffect(() => {
    let active = true;
    let controller = new AbortController();
    
    async function fetchConversion() {
      const [base, target] = pair.split("/");
      
      // If account currency is base or target, no conversion needed
      if (accountCurrency === base || accountCurrency === target) {
        if (active) {
          setConversionRate(1);
          setAutoRate(1);
          setLoadingConversion(false);
          setCacheAge(null);
        }
        return;
      }
      
      setLoadingConversion(true);
      
      try {
        // Check cache first
        const cached = getCachedRate(base, accountCurrency);
        if (cached && useAutoRate) {
          if (active) {
            setAutoRate(cached.rate);
            setConversionRate(cached.rate);
            setCacheAge(formatCacheAge(cached.timestamp));
            setLoadingConversion(false);
          }
          return;
        }
        
        const response = await fetch(`/api/forex?base=${base}&targets=${accountCurrency}`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error("Conversion API failed");
        
        const data = await response.json();
        if (data.rates && data.rates[accountCurrency] && active) {
          const rate = data.rates[accountCurrency];
          setAutoRate(rate);
          setConversionRate(rate);
          setCacheAge("Just now");
          setCachedRate(base, accountCurrency, rate);
        }
      } catch (error) {
        if (active && !(error instanceof Error && error.name === 'AbortError')) {
          console.error("Failed to fetch conversion rate:", error);
          setApiError("Failed to fetch live rates. Using manual mode.");
          setUseAutoRate(false);
          // Fallback to rate 1 if conversion fails
          setConversionRate(1);
        }
      } finally {
        if (active) setLoadingConversion(false);
      }
    }
    
    if (useAutoRate) {
      fetchConversion();
    }
    return () => {
      active = false;
      controller.abort();
    };
  }, [pair, accountCurrency, useAutoRate, getCachedRate, setCachedRate, formatCacheAge]);

  // Manual refresh for conversion rate
  const handleRefreshRate = async () => {
    const [base, target] = pair.split("/");
    setLoadingConversion(true);
    setApiError(null);
    
    try {
      // Clear cache
      if (typeof window !== 'undefined') {
        const cacheKey = `forex_rate_${base}_${accountCurrency}`;
        localStorage.removeItem(cacheKey);
      }
      
      const response = await fetch(`/api/forex?base=${base}&targets=${accountCurrency}`);
      if (response.ok) {
        const data = await response.json();
        if (data.rates && data.rates[accountCurrency]) {
          const rate = data.rates[accountCurrency];
          setAutoRate(rate);
          setConversionRate(rate);
          setCacheAge("Just updated");
          setCachedRate(base, accountCurrency, rate);
        }
      }
    } catch (error) {
      console.error("Refresh failed:", error);
      setApiError("Failed to refresh live rates.");
    } finally {
      setLoadingConversion(false);
    }
  };

  // Calculate margin
  const units = lotSize * 100000; // Convert lots to units
  const notionalValue = units * entry * conversionRate;
  const requiredMargin = notionalValue / leverage;

  return <>
    <div className="min-w-0 space-y-5">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
        <SelectField label="Currency pair" value={pair} onChange={setPair} options={forexPairSelectOptions} />
        <SelectField label="Account currency" value={accountCurrency} onChange={setAccountCurrency} options={worldCurrencyOptions} />
        <NumberField label="Position size" value={lotSize} onChange={setLotSize} step="0.01" suffix="lots" />
        <SelectField label="Leverage" value={String(leverage)} onChange={(value) => setLeverage(Number(value))} options={leverageOptions} />
        <NumberField label="Entry price" value={entry} onChange={setEntry} step="0.00001" />
        <div>
          <span className={labelClass}>Base → Account conversion rate</span>
          <div className="relative">
            <input 
              type="number" 
              step="0.0001" 
              value={useAutoRate && autoRate !== null ? autoRate : conversionRate} 
              onChange={(e) => { 
                setConversionRate(Number(e.target.value)); 
                setUseAutoRate(false); 
              }} 
              disabled={useAutoRate && loadingConversion}
              className={inputClass + (useAutoRate && loadingConversion ? " opacity-50" : "")}
            />
            {loadingConversion && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                Loading...
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input 
              type="checkbox" 
              id="autoRate" 
              checked={useAutoRate} 
              onChange={(e) => setUseAutoRate(e.target.checked)} 
              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="autoRate" className="min-w-0 flex-1 text-sm text-slate-600 dark:text-slate-400">
              Auto-fetch conversion rate {loadingConversion && "(loading...)"} {autoRate !== null && useAutoRate && `(current: ${formatNumber(autoRate, 6)})`}
            </label>
            {useAutoRate && (
              <button 
                onClick={handleRefreshRate}
                disabled={loadingConversion}
                className="text-xs text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh
              </button>
            )}
          </div>
          {apiError && (
            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
              {apiError}
            </div>
          )}
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {pair.split("/")[0]} → {accountCurrency}
            </p>
            {cacheAge && useAutoRate && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updated: {cacheAge}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Result label="Required margin" value={formatNumber(requiredMargin)} note={accountCurrency} />
        <Result label="Notional value" value={formatNumber(notionalValue)} note={accountCurrency} />
      </div>
      
      {/* Calculation Formula Display */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Calculation Formula</h3>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <p><strong>Units:</strong> {formatNumber(lotSize)} lots × 100,000 = {formatNumber(units, 0)} units</p>
          <p><strong>Notional Value:</strong> {formatNumber(units, 0)} units × {formatNumber(entry)} × {formatNumber(conversionRate, 6)} = {formatNumber(notionalValue)} {accountCurrency}</p>
          <p><strong>Required Margin:</strong> {formatNumber(notionalValue)} ÷ {leverage} = {formatNumber(requiredMargin)} {accountCurrency}</p>
          <p><strong>Margin Percentage:</strong> {(100 / leverage).toFixed(2)}% of notional value</p>
        </div>
      </div>
      
      <Notice>This is an illustrative estimate, not a broker quote. Margin rates, leverage limits, hedging rules, liquidation thresholds, and conversion rates vary by broker, instrument, country, and account type. ESMA limits leverage to 1:30 for major pairs on retail accounts.</Notice>
      
      <RateTable />
    </div>
  </>;
}

// Black-Scholes-Merton Model Helper Functions
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// Multi-leg Strategy Types
interface StrategyLeg {
  id: string;
  type: 'call' | 'put';
  position: 'long' | 'short';
  strike: number;
  premium: number;
  contracts: number;
}

interface StrategyTemplate {
  name: string;
  description: string;
  legs: Omit<StrategyLeg, 'id'>[];
}

const strategyTemplates: StrategyTemplate[] = [
  {
    name: "Long Call",
    description: "Bullish position that profits from price increase",
    legs: [{ type: 'call', position: 'long', strike: 100, premium: 5, contracts: 1 }]
  },
  {
    name: "Long Put",
    description: "Bearish position that profits from price decrease",
    legs: [{ type: 'put', position: 'long', strike: 100, premium: 5, contracts: 1 }]
  },
  {
    name: "Bull Call Spread",
    description: "Debit spread limiting upside but reducing cost",
    legs: [
      { type: 'call', position: 'long', strike: 100, premium: 5, contracts: 1 },
      { type: 'call', position: 'short', strike: 110, premium: 2, contracts: 1 }
    ]
  },
  {
    name: "Bear Put Spread",
    description: "Debit spread limiting downside but reducing cost",
    legs: [
      { type: 'put', position: 'long', strike: 100, premium: 5, contracts: 1 },
      { type: 'put', position: 'short', strike: 90, premium: 2, contracts: 1 }
    ]
  },
  {
    name: "Long Straddle",
    description: "Profits from large price movement in either direction",
    legs: [
      { type: 'call', position: 'long', strike: 100, premium: 5, contracts: 1 },
      { type: 'put', position: 'long', strike: 100, premium: 5, contracts: 1 }
    ]
  },
  {
    name: "Long Strangle",
    description: "Cheaper than straddle with wider break-even range",
    legs: [
      { type: 'call', position: 'long', strike: 105, premium: 3, contracts: 1 },
      { type: 'put', position: 'long', strike: 95, premium: 3, contracts: 1 }
    ]
  },
  {
    name: "Iron Condor",
    description: "Income strategy profiting from range-bound price",
    legs: [
      { type: 'put', position: 'short', strike: 90, premium: 2, contracts: 1 },
      { type: 'put', position: 'long', strike: 85, premium: 1, contracts: 1 },
      { type: 'call', position: 'short', strike: 110, premium: 2, contracts: 1 },
      { type: 'call', position: 'long', strike: 115, premium: 1, contracts: 1 }
    ]
  },
  {
    name: "Covered Call",
    description: "Holding underlying + selling call for income",
    legs: [
      { type: 'call', position: 'short', strike: 110, premium: 3, contracts: 1 }
    ]
  },
  {
    name: "Protective Put",
    description: "Holding underlying + buying put for insurance",
    legs: [
      { type: 'put', position: 'long', strike: 95, premium: 2, contracts: 1 }
    ]
  }
];

// Multi-leg Strategy P&L Calculation
function calculateStrategyPnL(
  legs: StrategyLeg[],
  spotAtExpiry: number,
  T: number,
  r: number,
  sigma: number,
  optionStyle: 'european' | 'american'
): { totalPnl: number; maxProfit: number; maxLoss: number; breakevens: number[] } {
  let totalPnl = 0;
  let maxProfit = Infinity;
  let maxLoss = -Infinity;
  const breakevens: number[] = [];

  legs.forEach(leg => {
    const intrinsic = leg.type === 'call' ? Math.max(spotAtExpiry - leg.strike, 0) : Math.max(leg.strike - spotAtExpiry, 0);
    const pnl = leg.position === 'long' ? intrinsic - leg.premium : leg.premium - intrinsic;
    totalPnl += pnl * leg.contracts;
  });

  // Calculate max profit/loss (simplified)
  const totalPremium = legs.reduce((sum, leg) => {
    return sum + (leg.position === 'long' ? -leg.premium : leg.premium) * leg.contracts;
  }, 0);

  if (totalPremium < 0) {
    maxProfit = -totalPremium; // Credit spread
    maxLoss = -Infinity; // Unlimited risk
  } else {
    maxProfit = Infinity; // Unlimited profit
    maxLoss = -totalPremium; // Debit spread
  }

  return { totalPnl, maxProfit, maxLoss, breakevens };
}

// Volatility Surface Data Generation
function generateVolatilitySurface(
  baseVol: number,
  strikes: number[],
  expiries: number[]
): { strike: number; expiry: number; iv: number }[] {
  const surface: { strike: number; expiry: number; iv: number }[] = [];
  
  strikes.forEach(strike => {
    expiries.forEach(expiry => {
      // Simplified volatility smile/term structure
      const moneyness = strike / 100; // Assuming ATM at 100
      const skew = 0.1 * Math.log(moneyness); // Volatility skew
      const termEffect = 0.05 * (expiry / 365); // Term structure
      const iv = baseVol + skew + termEffect;
      surface.push({ strike, expiry, iv: Math.max(iv, 5) }); // Minimum 5% IV
    });
  });
  
  return surface;
}

interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}

interface AdvancedGreeks extends Greeks {
  vanna: number;
  charm: number;
  vomma: number;
  zomma: number;
}

function blackScholes(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  type: 'call' | 'put',
  q = 0
): { price: number; greeks: Greeks } {
  if (T <= 0 || sigma <= 0) {
    // At expiry or zero volatility, return intrinsic value
    const intrinsic = type === 'call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
    return {
      price: intrinsic,
      greeks: { delta: type === 'call' ? (S > K ? 1 : 0) : (S < K ? -1 : 0), gamma: 0, theta: 0, vega: 0, rho: 0 }
    };
  }

  const d1 = (Math.log(S / K) + (r - q + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  const nd1 = normalCDF(d1);
  const nd2 = normalCDF(d2);
  const nd1_pdf = normalPDF(d1);
  const sqrtT = Math.sqrt(T);
  const discount = Math.exp(-r * T);
  const carryDiscount = Math.exp(-q * T);

  let price: number;
  if (type === 'call') {
    price = S * carryDiscount * nd1 - K * discount * nd2;
  } else {
    price = K * discount * normalCDF(-d2) - S * carryDiscount * normalCDF(-d1);
  }

  // Calculate Greeks
  const delta = type === 'call' ? carryDiscount * nd1 : carryDiscount * (nd1 - 1);
  const gamma = carryDiscount * nd1_pdf / (S * sigma * sqrtT);
  const theta = (-(S * carryDiscount * nd1_pdf * sigma) / (2 * sqrtT) - (type === 'call'
    ? r * K * discount * nd2 - q * S * carryDiscount * nd1
    : r * K * discount * normalCDF(-d2) - q * S * carryDiscount * normalCDF(-d1))) / 365; // Per day
  const vega = S * carryDiscount * sqrtT * nd1_pdf / 100; // Per 1% change
  const rho = (type === 'call' ? K * T * discount * nd2 : -K * T * discount * normalCDF(-d2)) / 100; // Per 1% change

  return { price, greeks: { delta, gamma, theta, vega, rho } };
}

function solveImpliedVolatility(
  marketPrice: number,
  S: number,
  K: number,
  T: number,
  r: number,
  type: 'call' | 'put',
  q = 0,
  maxIterations: number = 100,
  tolerance: number = 1e-6
): number {
  let sigma = 0.3; // Initial guess (30%)
  
  for (let i = 0; i < maxIterations; i++) {
    const { price, greeks } = blackScholes(S, K, T, r, sigma, type, q);
    const diff = price - marketPrice;
    
    if (Math.abs(diff) < tolerance) {
      return sigma;
    }
    
    // Newton-Raphson: sigma_new = sigma - f(sigma) / f'(sigma)
    // f'(sigma) = vega
    if (greeks.vega === 0) break;
    sigma = sigma - diff / greeks.vega;
    
    if (sigma < 0.01) sigma = 0.01; // Prevent negative volatility
    if (sigma > 5.0) sigma = 5.0;  // Cap at 500%
  }
  
  return sigma; // Return best estimate
}

// Binomial Model for American Options
function binomialAmerican(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  type: 'call' | 'put',
  steps: number = 100,
  q = 0
): { price: number; greeks: Greeks } {
  if (T <= 0 || sigma <= 0) {
    const intrinsic = type === 'call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
    return {
      price: intrinsic,
      greeks: { delta: type === 'call' ? (S > K ? 1 : 0) : (S < K ? -1 : 0), gamma: 0, theta: 0, vega: 0, rho: 0 }
    };
  }

  const dt = T / steps;
  const u = Math.exp(sigma * Math.sqrt(dt));
  const d = 1 / u;
  const p = (Math.exp((r - q) * dt) - d) / (u - d);
  
  // Build price tree
  const prices: number[][] = [];
  for (let i = 0; i <= steps; i++) {
    prices[i] = [];
    for (let j = 0; j <= i; j++) {
      prices[i][j] = S * Math.pow(u, j) * Math.pow(d, i - j);
    }
  }
  
  // Backward induction with early exercise
  const values: number[][] = [];
  for (let i = steps; i >= 0; i--) {
    values[i] = [];
    for (let j = 0; j <= i; j++) {
      if (i === steps) {
        // Terminal payoff
        values[i][j] = type === 'call' 
          ? Math.max(prices[i][j] - K, 0)
          : Math.max(K - prices[i][j], 0);
      } else {
        // Expected value
        const expected = Math.exp(-r * dt) * (p * values[i + 1][j + 1] + (1 - p) * values[i + 1][j]);
        // Early exercise value
        const exercise = type === 'call'
          ? Math.max(prices[i][j] - K, 0)
          : Math.max(K - prices[i][j], 0);
        values[i][j] = Math.max(expected, exercise);
      }
    }
  }
  
  // Calculate Greeks using finite differences
  const price = values[0][0];
  const delta = (values[1][1] - values[1][0]) / (S * u - S * d);
  const gamma = ((values[2][2] - values[2][1]) / (prices[2][2] - prices[2][1]) - (values[2][1] - values[2][0]) / (prices[2][1] - prices[2][0])) / ((prices[2][2] - prices[2][0]) / 2);
  const theta = (values[1][0] - values[0][0]) / dt / 365; // Per day
  const vega = (binomialAmerican(S, K, T, r, sigma + 0.01, type, steps, q).price - price); // Per 1 percentage-point IV change
  const rho = (binomialAmerican(S, K, T, r + 0.01, sigma, type, steps, q).price - price); // Per 1 percentage-point rate change
  
  return { price, greeks: { delta, gamma, theta, vega, rho } };
}

// Advanced Greeks Calculation
function calculateAdvancedGreeks(
  d1: number,
  d2: number,
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number
): AdvancedGreeks {
  const nd1 = normalPDF(d1);
  const nd2 = normalPDF(d2);
  const sqrtT = Math.sqrt(T);
  const cd1 = normalCDF(d1);
  const cd2 = normalCDF(d2);
  
  // Basic Greeks
  const delta = cd1;
  const gamma = nd1 / (S * sigma * sqrtT);
  const theta = (-S * nd1 * sigma / (2 * sqrtT) - r * K * Math.exp(-r * T) * cd2) / 365;
  const vega = S * sqrtT * nd1 / 100;
  const rho = K * T * Math.exp(-r * T) * cd2 / 100;
  
  // Advanced Greeks
  const vanna = -nd1 * d2 / sigma;
  const charm = -nd1 * (2 * r * T - d2 * sigma * sqrtT) / (2 * T * sigma * sqrtT);
  const vomma = S * sqrtT * nd1 * d1 * d2 / sigma;
  const zomma = nd1 * (d1 * d2 - 1) / (S * sigma * sigma * sqrtT);
  
  return { delta, gamma, theta, vega, rho, vanna, charm, vomma, zomma };
}

// Probability of Profit Calculation
function calculateProbabilityOfProfit(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  type: 'call' | 'put',
  position: 'long' | 'short',
  premium: number
): number {
  const breakeven = type === 'call' ? K + premium : K - premium;
  const d = (Math.log(S / breakeven) + (r - sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  
  if (position === 'long') {
    return type === 'call' ? normalCDF(d) : normalCDF(-d);
  } else {
    return type === 'call' ? normalCDF(-d) : normalCDF(d);
  }
}

function OptionsPayoffCalculator() {
  const [mode, setMode] = useState<'single' | 'strategy'>('single');
  const [optionType, setOptionType] = useState<"call" | "put">("call");
  const [position, setPosition] = useState<"long" | "short">("long");
  const [spot, setSpot] = useState(110);
  const [strike, setStrike] = useState(100);
  const [premium, setPremium] = useState(5);
  const [contracts, setContracts] = useState(1);
  const [multiplier, setMultiplier] = useState(100);
  const [timeToExpiry, setTimeToExpiry] = useState(30); // Days
  const [useExactExpiry, setUseExactExpiry] = useState(true);
  const [expiryDate, setExpiryDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().slice(0, 10);
  });
  const [expiryTime, setExpiryTime] = useState("16:00");
  const [volatility, setVolatility] = useState(20); // Annualized %
  const [riskFreeRate, setRiskFreeRate] = useState(5); // Annual %
  const [dividendYield, setDividendYield] = useState(0);
  const [underlyingSymbol, setUnderlyingSymbol] = useState("AAPL");
  const [loadingUnderlying, setLoadingUnderlying] = useState(false);
  const [marketDataNote, setMarketDataNote] = useState<string | null>(null);
  const [bid, setBid] = useState(4.8);
  const [ask, setAsk] = useState(5.2);
  const [volume, setVolume] = useState(0);
  const [openInterest, setOpenInterest] = useState(0);
  const [useMidpoint, setUseMidpoint] = useState(false);
  const [useAdvancedModel, setUseAdvancedModel] = useState(false);
  const [solveIV, setSolveIV] = useState(false);
  const [impliedVolatility, setImpliedVolatility] = useState<number | null>(null);
  const [optionStyle, setOptionStyle] = useState<'european' | 'american'>('european');
  const [showAdvancedGreeks, setShowAdvancedGreeks] = useState(false);
  const [showPayoffChart, setShowPayoffChart] = useState(true);
  const [showVolSurface, setShowVolSurface] = useState(false);
  
  // Multi-leg strategy state
  const [strategyLegs, setStrategyLegs] = useState<StrategyLeg[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const exactExpiryMs = Date.parse(`${expiryDate}T${expiryTime}:00`);
  const exactDays = Number.isFinite(exactExpiryMs) ? Math.max(0, (exactExpiryMs - Date.now()) / (24 * 60 * 60 * 1000)) : timeToExpiry;
  const effectiveDays = useExactExpiry ? exactDays : timeToExpiry;
  const T = effectiveDays / 365; // Convert days to years
  const r = riskFreeRate / 100; // Convert % to decimal
  const sigma = volatility / 100; // Convert % to decimal
  const q = dividendYield / 100;
  const effectivePremium = useMidpoint && ask >= bid ? (bid + ask) / 2 : premium;

  // Single leg pricing
  const { price: fairValue, greeks } = useAdvancedModel && mode === 'single'
    ? (optionStyle === 'american' 
        ? binomialAmerican(spot, strike, T, r, sigma, optionType, 100, q)
        : blackScholes(spot, strike, T, r, sigma, optionType, q))
    : { price: effectivePremium, greeks: { delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0 } };

  // Advanced Greeks calculation
  const advancedGreeks: AdvancedGreeks | null = useAdvancedModel && mode === 'single' && optionStyle === 'european' && T > 0 && sigma > 0
    ? calculateAdvancedGreeks(
        (Math.log(spot / strike) + (r - q + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T)),
        (Math.log(spot / strike) + (r - q + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T)) - sigma * Math.sqrt(T),
        spot, strike, T, r, sigma
      )
    : null;

  // Solve IV if enabled
  useEffect(() => {
    if (solveIV && useAdvancedModel && mode === 'single') {
      const iv = solveImpliedVolatility(effectivePremium, spot, strike, T, r, optionType, q);
      setImpliedVolatility(iv * 100); // Convert back to %
    } else {
      setImpliedVolatility(null);
    }
  }, [solveIV, useAdvancedModel, effectivePremium, spot, strike, T, r, optionType, q, mode]);

  // Single leg calculations
  const intrinsic = optionType === "call" ? Math.max(spot - strike, 0) : Math.max(strike - spot, 0);
  const timeValue = useAdvancedModel && mode === 'single' ? fairValue - intrinsic : 0;
  const pnlPerUnit = position === "long" ? intrinsic - effectivePremium : effectivePremium - intrinsic;
  const totalPnl = pnlPerUnit * contracts * multiplier;
  const breakeven = optionType === "call" ? strike + effectivePremium : strike - effectivePremium;
  const probabilityOfProfit = useAdvancedModel && mode === 'single' && T > 0 && sigma > 0
    ? calculateProbabilityOfProfit(spot, strike, T, r, sigma, optionType, position, effectivePremium)
    : null;

  // Strategy calculations
  const strategyPnL = mode === 'strategy' && strategyLegs.length > 0
    ? calculateStrategyPnL(strategyLegs, spot, T, r, sigma, optionStyle)
    : null;
  const positionGreeks = mode === 'single'
    ? {
      delta: greeks.delta * contracts * multiplier * (position === 'long' ? 1 : -1),
      gamma: greeks.gamma * contracts * multiplier * (position === 'long' ? 1 : -1),
      theta: greeks.theta * contracts * multiplier * (position === 'long' ? 1 : -1),
      vega: greeks.vega * contracts * multiplier * (position === 'long' ? 1 : -1),
      rho: greeks.rho * contracts * multiplier * (position === 'long' ? 1 : -1),
    }
    : calculatePositionGreeks(strategyLegs, spot, T, r, sigma, q, optionStyle, multiplier);

  const scenarioData = [-20, -10, 0, 10, 20].map((move) => {
    const scenarioSpot = Math.max(0.01, spot * (1 + move / 100));
    const scenario = useAdvancedModel
      ? (optionStyle === 'american' ? binomialAmerican(scenarioSpot, strike, T, r, sigma, optionType, 80, q) : blackScholes(scenarioSpot, strike, T, r, sigma, optionType, q))
      : null;
    const scenarioPnl = scenario ? (position === 'long' ? scenario.price - effectivePremium : effectivePremium - scenario.price) * contracts * multiplier : null;
    return { move, spot: scenarioSpot, price: scenario?.price ?? null, pnl: scenarioPnl };
  });

  // Payoff chart data
  const payoffData = Array.from({ length: 100 }, (_, i) => {
    const price = strike - 50 + i * 1;
    let payoffPnl: number;
    
    if (mode === 'single') {
      const payoffIntrinsic = optionType === "call" ? Math.max(price - strike, 0) : Math.max(strike - price, 0);
      payoffPnl = position === "long" ? payoffIntrinsic - effectivePremium : effectivePremium - payoffIntrinsic;
    } else {
      const strategyResult = calculateStrategyPnL(strategyLegs, price, T, r, sigma, optionStyle);
      payoffPnl = strategyResult.totalPnl;
    }
    
    return { x: price, y: payoffPnl };
  });

  // Volatility surface data
  const volSurfaceData = showVolSurface
    ? generateVolatilitySurface(volatility, [85, 90, 95, 100, 105, 110, 115], [30, 60, 90, 180])
    : [];

  // Apply strategy template
  const applyTemplate = (templateName: string) => {
    const template = strategyTemplates.find(t => t.name === templateName);
    if (template) {
      const legsWithIds: StrategyLeg[] = template.legs.map((leg, index) => ({
        ...leg,
        id: `leg-${Date.now()}-${index}`
      }));
      setStrategyLegs(legsWithIds);
      setSpot(100); // Reset to ATM
      setStrike(100);
    }
  };

  const loadUnderlyingPrice = async () => {
    setLoadingUnderlying(true);
    setMarketDataNote(null);
    try {
      const response = await fetch(`/api/stocks?symbols=${encodeURIComponent(underlyingSymbol.trim().toUpperCase())}`);
      const payload = await response.json();
      const data = payload?.[underlyingSymbol.trim().toUpperCase()];
      if (!response.ok || !data?.price) throw new Error("Cached stock price unavailable");
      setSpot(Number(data.price));
      setMarketDataNote(`Cached quote loaded${data.lastTradeTime ? ` · ${new Date(data.lastTradeTime).toLocaleString()}` : ""}`);
    } catch {
      setMarketDataNote("Cached quote unavailable; enter the underlying price manually.");
    } finally {
      setLoadingUnderlying(false);
    }
  };

  const exportOptionsCsv = () => {
    const rows = [
      ["Field", "Value"],
      ["Underlying", underlyingSymbol.toUpperCase()],
      ["Option type", optionType],
      ["Position", position],
      ["Model", useAdvancedModel ? (optionStyle === "american" ? "Binomial American" : "Black-Scholes-Merton") : "Intrinsic payoff only"],
      ["Underlying price", spot],
      ["Strike", strike],
      ["Premium used", effectivePremium],
      ["Bid", bid],
      ["Ask", ask],
      ["Volume", volume],
      ["Open interest", openInterest],
      ["Contracts", contracts],
      ["Contract multiplier", multiplier],
      ["Days to expiry", effectiveDays],
      ["Volatility %", volatility],
      ["Risk-free rate %", riskFreeRate],
      ["Dividend yield %", dividendYield],
      ["Fair value", fairValue],
      ["Position P&L", totalPnl],
      ["Position delta", positionGreeks.delta],
      ["Position gamma", positionGreeks.gamma],
      ["Position theta per day", positionGreeks.theta],
      ["Position vega", positionGreeks.vega],
      ["Position rho", positionGreeks.rho],
      ["Generated at", new Date().toISOString()],
    ];
    const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = `tradivex-option-greeks-${underlyingSymbol.toUpperCase()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <>
    <div className="space-y-5">
      {/* Mode Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode('single')}
          className={`px-4 py-2 text-sm rounded-lg border ${mode === 'single' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}`}
        >
          Single Option
        </button>
        <button
          onClick={() => setMode('strategy')}
          className={`px-4 py-2 text-sm rounded-lg border ${mode === 'strategy' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}`}
        >
          Multi-Leg Strategy
        </button>
      </div>

      {mode === 'single' ? (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField label="Option type" value={optionType} onChange={(value) => setOptionType(value as "call" | "put")} options={[{ label: "Call", value: "call" }, { label: "Put", value: "put" }]} />
            <SelectField label="Position" value={position} onChange={(value) => setPosition(value as "long" | "short")} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} />
            <TextField label="Underlying symbol" value={underlyingSymbol} onChange={setUnderlyingSymbol} placeholder="AAPL" />
            <NumberField label="Underlying price" value={spot} onChange={setSpot} step="0.01" />
            <NumberField label="Strike price" value={strike} onChange={setStrike} step="0.01" />
            <NumberField label="Premium per unit" value={premium} onChange={setPremium} step="0.01" note={useMidpoint ? `Using bid/ask midpoint: ${formatNumber(effectivePremium, 4)}` : undefined} />
            <NumberField label="Contracts" value={contracts} onChange={setContracts} step="1" />
            <NumberField label="Contract multiplier" value={multiplier} onChange={setMultiplier} step="1" />
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
            <button type="button" onClick={loadUnderlyingPrice} disabled={loadingUnderlying} className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60">
              {loadingUnderlying ? "Loading cached quote…" : "Load cached underlying price"}
            </button>
            {marketDataNote && <span className="text-xs text-slate-500 dark:text-slate-400">{marketDataNote}</span>}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
            <h3 className="mb-4 text-base font-semibold text-slate-700 dark:text-slate-300">Manual market quote and liquidity</h3>
            <div className="grid gap-5 md:grid-cols-4">
              <NumberField label="Bid" value={bid} onChange={setBid} step="0.01" />
              <NumberField label="Ask" value={ask} onChange={setAsk} step="0.01" />
              <NumberField label="Volume" value={volume} onChange={setVolume} step="1" />
              <NumberField label="Open interest" value={openInterest} onChange={setOpenInterest} step="1" />
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
              <input type="checkbox" checked={useMidpoint} onChange={(event) => setUseMidpoint(event.target.checked)} className="mt-1 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <span>Use bid/ask midpoint as the premium for pricing and P&amp;L</span>
            </label>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Enter chain values manually when using a free data source. These fields are not presented as live exchange data.</p>
          </div>

          {/* Advanced Model Toggle */}
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/70">
            <input 
              type="checkbox" 
              id="advancedModel" 
              checked={useAdvancedModel} 
              onChange={(e) => setUseAdvancedModel(e.target.checked)} 
              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="advancedModel" className="min-w-0 flex-1 text-sm text-slate-600 dark:text-slate-400">
              Enable professional pricing model (Black-Scholes-Merton / Binomial)
            </label>
          </div>

          {useAdvancedModel && (
            <>
              <div className="grid gap-5 md:grid-cols-3">
                <NumberField label="Time to expiry" value={timeToExpiry} onChange={setTimeToExpiry} step="1" suffix="days" />
                <NumberField label="Volatility" value={volatility} onChange={setVolatility} step="0.1" suffix="%" />
                <NumberField label="Risk-free rate" value={riskFreeRate} onChange={setRiskFreeRate} step="0.1" suffix="%" />
                <NumberField label="Dividend yield" value={dividendYield} onChange={setDividendYield} step="0.1" suffix="%" />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <label className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <input type="checkbox" checked={useExactExpiry} onChange={(event) => setUseExactExpiry(event.target.checked)} className="mt-1 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                  <span>Use exact expiration date and time</span>
                </label>
                {useExactExpiry && <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <label className="block"><span className={labelClass}>Expiration date</span><input type="date" value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)} className={inputClass} /></label>
                  <label className="block"><span className={labelClass}>Expiration time (local)</span><input type="time" value={expiryTime} onChange={(event) => setExpiryTime(event.target.value)} className={inputClass} /></label>
                </div>}
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Model time remaining: {formatNumber(effectiveDays, 2)} calendar days. Exchange holidays and early-close schedules are not automatically inferred.</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <SelectField label="Option style" value={optionStyle} onChange={(value) => setOptionStyle(value as "european" | "american")} options={[
                  { label: "European (BSM model)", value: "european" },
                  { label: "American (Binomial model)", value: "american" }
                ]} />
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="solveIV" 
                    checked={solveIV} 
                    onChange={(e) => setSolveIV(e.target.checked)} 
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="solveIV" className="text-sm text-slate-600 dark:text-slate-400">
                    Solve implied volatility
                  </label>
                  {impliedVolatility !== null && (
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      IV: {impliedVolatility.toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAdvancedGreeks(!showAdvancedGreeks)}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  {showAdvancedGreeks ? 'Hide' : 'Show'} Advanced Greeks
                </button>
                <button
                  onClick={() => setShowPayoffChart(!showPayoffChart)}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  {showPayoffChart ? 'Hide' : 'Show'} Payoff Chart
                </button>
                <button
                  onClick={() => setShowVolSurface(!showVolSurface)}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  {showVolSurface ? 'Hide' : 'Show'} Vol Surface
                </button>
              </div>
            </>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Result label="Estimated payoff P&L" value={formatNumber(totalPnl)} />
            <Result label="P&L per unit" value={formatNumber(pnlPerUnit)} />
            <Result label="Illustrative breakeven" value={formatNumber(breakeven)} />
          </div>

          {useAdvancedModel && probabilityOfProfit !== null && (
            <Result label="Probability of profit" value={`${(probabilityOfProfit * 100).toFixed(1)}%`} note="Model estimate" />
          )}

          {useAdvancedModel && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Pricing Analysis</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Result label="Fair value" value={formatNumber(fairValue)} />
                  <Result label="Intrinsic value" value={formatNumber(intrinsic)} />
                  <Result label="Time value" value={formatNumber(timeValue)} />
                  <Result label="Total premium" value={formatNumber(premium)} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Option Greeks</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Result label="Delta (Δ)" value={formatNumber(greeks.delta, 4)} note="Price sensitivity" />
                  <Result label="Gamma (Γ)" value={formatNumber(greeks.gamma, 6)} note="Delta rate of change" />
                  <Result label="Theta (Θ)" value={formatNumber(greeks.theta, 4)} note="Time decay per day" />
                  <Result label="Vega (ν)" value={formatNumber(greeks.vega, 4)} note="Vol sensitivity per 1%" />
                  <Result label="Rho (ρ)" value={formatNumber(greeks.rho, 4)} note="Rate sensitivity per 1%" />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <h3 className="mb-4 text-base font-semibold text-slate-700 dark:text-slate-300">Position Greeks · {contracts} × {multiplier}</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Result label="Position Delta" value={formatNumber(positionGreeks.delta, 4)} />
                  <Result label="Position Gamma" value={formatNumber(positionGreeks.gamma, 6)} />
                  <Result label="Position Theta/day" value={formatNumber(positionGreeks.theta, 4)} />
                  <Result label="Position Vega" value={formatNumber(positionGreeks.vega, 4)} />
                  <Result label="Position Rho" value={formatNumber(positionGreeks.rho, 4)} />
                </div>
              </div>

              {showAdvancedGreeks && advancedGreeks && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                  <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Advanced Greeks</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Result label="Vanna" value={formatNumber(advancedGreeks.vanna, 6)} note="Delta to vol sensitivity" />
                    <Result label="Charm" value={formatNumber(advancedGreeks.charm, 6)} note="Delta to time sensitivity" />
                    <Result label="Vomma" value={formatNumber(advancedGreeks.vomma, 6)} note="Vega to vol sensitivity" />
                    <Result label="Zomma" value={formatNumber(advancedGreeks.zomma, 6)} note="Gamma to vol sensitivity" />
                  </div>
                </div>
              )}

              {showPayoffChart && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                  <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Payoff Diagram at Expiry</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={payoffData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="x" 
                          label={{ value: 'Underlying Price', position: 'insideBottom', offset: -5 }}
                          type="number"
                          domain={['dataMin', 'dataMax']}
                        />
                        <YAxis 
                          label={{ value: 'P&L', angle: -90, position: 'insideLeft' }}
                          type="number"
                        />
                        <Tooltip />
                        <ReferenceLine x={strike} stroke="red" strokeDasharray="3 3" label="Strike" />
                        <ReferenceLine y={0} stroke="black" label="Breakeven" />
                        <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <h3 className="mb-4 text-base font-semibold text-slate-700 dark:text-slate-300">Underlying Price Scenario Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead><tr className="border-b border-slate-200 text-left dark:border-slate-700"><th className="px-3 py-2">Spot move</th><th className="px-3 py-2 text-right">Scenario spot</th><th className="px-3 py-2 text-right">Model value</th><th className="px-3 py-2 text-right">Position P&amp;L</th></tr></thead>
                    <tbody>{scenarioData.map((scenario) => <tr key={scenario.move} className="border-b border-slate-100 dark:border-slate-800"><td className="px-3 py-2 font-semibold">{scenario.move > 0 ? "+" : ""}{scenario.move}%</td><td className="px-3 py-2 text-right">{formatNumber(scenario.spot, 2)}</td><td className="px-3 py-2 text-right">{scenario.price === null ? "—" : formatNumber(scenario.price, 4)}</td><td className={`px-3 py-2 text-right font-semibold ${scenario.pnl !== null && scenario.pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>{scenario.pnl === null ? "—" : formatNumber(scenario.pnl, 2)}</td></tr>)}</tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">One-factor scenario: volatility, rates, dividends and time are held constant.</p>
              </div>

              {showVolSurface && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                  <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Volatility Surface (Illustrative)</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Showing skew and term structure. In production, this would use live market data.
                  </div>
                  <div className="h-64 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="p-2 text-left">Strike</th>
                          <th className="p-2">30D</th>
                          <th className="p-2">60D</th>
                          <th className="p-2">90D</th>
                          <th className="p-2">180D</th>
                        </tr>
                      </thead>
                      <tbody>
                        {volSurfaceData.filter(d => d.expiry === 30).map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="p-2 font-medium">{row.strike}</td>
                            <td className="p-2 text-center">{row.iv.toFixed(1)}%</td>
                            <td className="p-2 text-center">-</td>
                            <td className="p-2 text-center">-</td>
                            <td className="p-2 text-center">-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {/* Multi-leg Strategy Builder */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Load pre-built strategy:</span>
              <select
                value={selectedTemplate || ''}
                onChange={(e) => {
                  setSelectedTemplate(e.target.value);
                  if (e.target.value) applyTemplate(e.target.value);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
              >
                <option value="">Select strategy...</option>
                {strategyTemplates.map(t => (
                  <option key={t.name} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">Strategy Legs</h3>
                <button
                  onClick={() => {
                    const newLeg: StrategyLeg = {
                      id: `leg-${Date.now()}`,
                      type: 'call',
                      position: 'long',
                      strike: 100,
                      premium: 5,
                      contracts: 1
                    };
                    setStrategyLegs([...strategyLegs, newLeg]);
                  }}
                  className="px-3 py-1 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                >
                  + Add Leg
                </button>
              </div>

              {strategyLegs.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No legs added. Select a template or add legs manually.
                </p>
              ) : (
                <div className="space-y-3">
                  {strategyLegs.map((leg, index) => (
                    <div key={leg.id} className="flex gap-3 items-start p-3 rounded-lg border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700">
                      <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <div className="flex-1 grid grid-cols-5 gap-2 text-xs">
                        <select
                          value={leg.type}
                          onChange={(e) => {
                            const updated = [...strategyLegs];
                            updated[index].type = e.target.value as 'call' | 'put';
                            setStrategyLegs(updated);
                          }}
                          className="rounded border border-slate-200 px-2 py-1 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                        >
                          <option value="call">Call</option>
                          <option value="put">Put</option>
                        </select>
                        <select
                          value={leg.position}
                          onChange={(e) => {
                            const updated = [...strategyLegs];
                            updated[index].position = e.target.value as 'long' | 'short';
                            setStrategyLegs(updated);
                          }}
                          className="rounded border border-slate-200 px-2 py-1 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                        >
                          <option value="long">Long</option>
                          <option value="short">Short</option>
                        </select>
                        <input
                          type="number"
                          value={leg.strike}
                          onChange={(e) => {
                            const updated = [...strategyLegs];
                            updated[index].strike = Number(e.target.value);
                            setStrategyLegs(updated);
                          }}
                          className="rounded border border-slate-200 px-2 py-1 w-full dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                          placeholder="Strike"
                        />
                        <input
                          type="number"
                          value={leg.premium}
                          onChange={(e) => {
                            const updated = [...strategyLegs];
                            updated[index].premium = Number(e.target.value);
                            setStrategyLegs(updated);
                          }}
                          className="rounded border border-slate-200 px-2 py-1 w-full dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                          placeholder="Premium"
                        />
                        <input
                          type="number"
                          value={leg.contracts}
                          onChange={(e) => {
                            const updated = [...strategyLegs];
                            updated[index].contracts = Number(e.target.value);
                            setStrategyLegs(updated);
                          }}
                          className="rounded border border-slate-200 px-2 py-1 w-full dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                          placeholder="Contracts"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setStrategyLegs(strategyLegs.filter(l => l.id !== leg.id));
                        }}
                        className="text-red-600 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <NumberField label="Underlying price" value={spot} onChange={setSpot} step="0.01" />
            <NumberField label="Time to expiry" value={timeToExpiry} onChange={setTimeToExpiry} step="1" suffix="days" />
            <NumberField label="Volatility" value={volatility} onChange={setVolatility} step="0.1" suffix="%" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <SelectField label="Option style" value={optionStyle} onChange={(value) => setOptionStyle(value as "european" | "american")} options={[
              { label: "European (BSM model)", value: "european" },
              { label: "American (Binomial model)", value: "american" }
            ]} />
            <NumberField label="Risk-free rate" value={riskFreeRate} onChange={setRiskFreeRate} step="0.1" suffix="%" />
          </div>

          {strategyPnL && (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Result label="Strategy P&L" value={formatNumber(strategyPnL.totalPnl)} />
                <Result label="Max profit" value={strategyPnL.maxProfit === Infinity ? "Unlimited" : formatNumber(strategyPnL.maxProfit)} />
                <Result label="Max loss" value={strategyPnL.maxLoss === -Infinity ? "Unlimited" : formatNumber(strategyPnL.maxLoss)} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <h3 className="mb-4 text-base font-semibold text-slate-700 dark:text-slate-300">Portfolio Greeks</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Result label="Net Delta" value={formatNumber(positionGreeks.delta, 4)} />
                  <Result label="Net Gamma" value={formatNumber(positionGreeks.gamma, 6)} />
                  <Result label="Net Theta/day" value={formatNumber(positionGreeks.theta, 4)} />
                  <Result label="Net Vega" value={formatNumber(positionGreeks.vega, 4)} />
                  <Result label="Net Rho" value={formatNumber(positionGreeks.rho, 4)} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Strategy Payoff Diagram</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={payoffData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="x" 
                        label={{ value: 'Underlying Price', position: 'insideBottom', offset: -5 }}
                        type="number"
                        domain={['dataMin', 'dataMax']}
                      />
                      <YAxis 
                        label={{ value: 'P&L', angle: -90, position: 'insideLeft' }}
                        type="number"
                      />
                      <Tooltip />
                      <ReferenceLine y={0} stroke="black" label="Breakeven" />
                      <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={exportOptionsCsv} className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700">Export Greeks CSV</button>
        <span className="self-center text-xs text-slate-500 dark:text-slate-400">Use the page-level PDF button for a print-ready report.</span>
      </div>

      <Notice>
        {useAdvancedModel 
          ? `The ${optionStyle === 'european' ? 'Black-Scholes-Merton' : 'Binomial'} model assumes constant volatility, efficient markets, and no dividends. American options support early exercise via binomial tree. ${mode === 'strategy' ? 'Multi-leg strategies combine multiple options for defined risk-reward profiles. Real-world pricing may differ due to dividend payments, volatility smiles, transaction costs, and market frictions.' : 'Probability of profit is a model estimate, not a prediction.'}`
          : "This model shows intrinsic payoff at expiry only. It excludes time value before expiry, volatility, Greeks, fees, taxes, assignment, settlement, and liquidity."
        }
      </Notice>
    </div>
  </>;
}

function BrokerageCalculator() {
  const [buyValue, setBuyValue] = useState(100000);
  const [sellValue, setSellValue] = useState(105000);
  const [rate, setRate] = useState(0.03);
  const [cap, setCap] = useState(20);
  const [transactionRate, setTransactionRate] = useState(0.01);
  const [otherFees, setOtherFees] = useState(0);
  const buyBrokerage = Math.min(buyValue * rate / 100, cap);
  const sellBrokerage = Math.min(sellValue * rate / 100, cap);
  const transactionFees = (buyValue + sellValue) * transactionRate / 100;
  const total = buyBrokerage + sellBrokerage + transactionFees + otherFees;
  return <>
    <div className="grid gap-5 md:grid-cols-2"><NumberField label="Buy value" value={buyValue} onChange={setBuyValue} step="0.01" /><NumberField label="Sell value" value={sellValue} onChange={setSellValue} step="0.01" /><NumberField label="Brokerage rate per side" value={rate} onChange={setRate} step="0.001" suffix="%" /><NumberField label="Brokerage cap per side" value={cap} onChange={setCap} step="0.01" /><NumberField label="Other transaction rate" value={transactionRate} onChange={setTransactionRate} step="0.001" suffix="%" /><NumberField label="Other fixed fees" value={otherFees} onChange={setOtherFees} step="0.01" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Result label="Gross P&L" value={formatNumber(sellValue - buyValue)} /><Result label="Estimated total costs" value={formatNumber(total)} /><Result label="Estimated net P&L" value={formatNumber(sellValue - buyValue - total)} /></div>
    <Notice>Enter the current fee schedule for the exact broker, product, country, and legal entity. This generic estimator excludes taxes, exchange fees, stamp duty, GST/VAT, regulatory levies, spreads, and slippage.</Notice>
  </>;
}

function PivotPointsCalculator() {
  const [high, setHigh] = useState(110);
  const [low, setLow] = useState(90);
  const [close, setClose] = useState(105);
  const [open, setOpen] = useState(108);
  const [selectedMethod, setSelectedMethod] = useState("classic");
  const [showComparison, setShowComparison] = useState(false);
  const [selectedSession, setSelectedSession] = useState("daily");
  const [decimalPrecision, setDecimalPrecision] = useState(2);
  const [showMidLevels, setShowMidLevels] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [loadingMarketData, setLoadingMarketData] = useState(false);
  const [marketDataError, setMarketDataError] = useState<string | null>(null);
  const [proximityAlertEnabled, setProximityAlertEnabled] = useState(false);
  const [proximityThreshold, setProximityThreshold] = useState(0.5);
  const [selectedTimezone, setSelectedTimezone] = useState("EST");
  const [historicalData, setHistoricalData] = useState<Array<{date: string, pivot: number, r1: number, s1: number}>>([]);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stockDataCache, setStockDataCache] = useState<Record<string, {data: any, timestamp: number}>>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [showRiskSection, setShowRiskSection] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [sessionInfo, setSessionInfo] = useState<{startTime: string, endTime: string, market: string}>({startTime: "9:30 AM", endTime: "4:00 PM", market: "NYSE"});

  // Update session info based on timezone selection
  useEffect(() => {
    const selectedTz = timezones.find(tz => tz.value === selectedTimezone);
    if (selectedTz) {
      setSessionInfo({
        startTime: selectedTz.hours.split(' - ')[0],
        endTime: selectedTz.hours.split(' - ')[1],
        market: selectedTz.market
      });
    }
  }, [selectedTimezone, timezones]);

  const timezones = [
    { value: "EST", label: "USA - Eastern Time (EST/EDT)", market: "NYSE", hours: "9:30 AM - 4:00 PM" },
    { value: "CST", label: "USA - Central Time (CST/CDT)", market: "CME", hours: "8:30 AM - 3:00 PM" },
    { value: "MST", label: "USA - Mountain Time (MST/MDT)", market: "CME", hours: "7:30 AM - 2:00 PM" },
    { value: "PST", label: "USA - Pacific Time (PST/PDT)", market: "NASDAQ", hours: "6:30 AM - 1:00 PM" },
    { value: "EST-Canada", label: "Canada - Eastern Time (EST/EDT)", market: "TSX", hours: "9:30 AM - 4:00 PM" },
    { value: "GMT", label: "UK - Greenwich Mean Time (GMT/BST)", market: "LSE", hours: "8:00 AM - 4:30 PM" },
    { value: "CET", label: "Europe - Central Time (CET/CEST)", market: "Euronext", hours: "9:00 AM - 5:30 PM" },
    { value: "CET-Frankfurt", label: "Germany - Frankfurt (CET/CEST)", market: "Xetra", hours: "9:00 AM - 5:30 PM" },
    { value: "CET-Zurich", label: "Switzerland - Zurich (CET/CEST)", market: "SIX", hours: "9:00 AM - 5:30 PM" },
    { value: "EET", label: "Europe - Eastern Time (EET)", market: "MOEX", hours: "10:00 AM - 6:30 PM" },
    { value: "IST", label: "India - Standard Time (IST)", market: "NSE", hours: "9:15 AM - 3:30 PM" },
    { value: "JST", label: "Japan - Standard Time (JST)", market: "TSE", hours: "9:00 AM - 3:00 PM" },
    { value: "KST", label: "South Korea - Seoul (KST)", market: "KRX", hours: "9:00 AM - 3:30 PM" },
    { value: "TST", label: "Taiwan - Taipei (TST)", market: "TWSE", hours: "9:00 AM - 1:30 PM" },
    { value: "HKT", label: "Hong Kong - Time (HKT)", market: "HKEX", hours: "9:30 AM - 4:00 PM" },
    { value: "SGT", label: "Singapore - Time (SGT)", market: "SGX", hours: "9:00 AM - 5:00 PM" },
    { value: "CST-China", label: "China - Standard Time (CST)", market: "SSE", hours: "9:30 AM - 3:00 PM" },
    { value: "AEST", label: "Australia - Eastern (AEST)", market: "ASX", hours: "10:00 AM - 4:00 PM" },
    { value: "AEDT", label: "Australia - Eastern (AEDT)", market: "ASX", hours: "10:00 AM - 4:00 PM" },
    { value: "NZST", label: "New Zealand - Wellington (NZST/NZDT)", market: "NZX", hours: "10:00 AM - 4:45 PM" },
    { value: "BRT", label: "Brazil - São Paulo (BRT)", market: "B3", hours: "10:00 AM - 5:00 PM" },
    { value: "SAST", label: "South Africa - Johannesburg (SAST)", market: "JSE", hours: "9:00 AM - 5:00 PM" },
  ];

  const stockSymbols = [
    { value: "AAPL", label: "Apple (AAPL)" },
    { value: "MSFT", label: "Microsoft (MSFT)" },
    { value: "GOOGL", label: "Alphabet (GOOGL)" },
    { value: "AMZN", label: "Amazon (AMZN)" },
    { value: "NVDA", label: "NVIDIA (NVDA)" },
    { value: "META", label: "Meta (META)" },
    { value: "TSLA", label: "Tesla (TSLA)" },
    { value: "BRK.B", label: "Berkshire Hathaway (BRK.B)" },
    { value: "AVGO", label: "Broadcom (AVGO)" },
    { value: "WMT", label: "Walmart (WMT)" },
    { value: "JPM", label: "JPMorgan Chase (JPM)" },
    { value: "LLY", label: "Eli Lilly (LLY)" },
    { value: "V", label: "Visa (V)" },
    { value: "ORCL", label: "Oracle (ORCL)" },
    { value: "MA", label: "Mastercard (MA)" },
    { value: "XOM", label: "Exxon Mobil (XOM)" },
    { value: "COST", label: "Costco (COST)" },
    { value: "JNJ", label: "Johnson & Johnson (JNJ)" },
    { value: "HD", label: "Home Depot (HD)" },
    { value: "PG", label: "Procter & Gamble (PG)" },
    { value: "NFLX", label: "Netflix (NFLX)" },
    { value: "AMD", label: "AMD (AMD)" },
    { value: "CRM", label: "Salesforce (CRM)" },
    { value: "ADBE", label: "Adobe (ADBE)" },
    { value: "QCOM", label: "Qualcomm (QCOM)" },
    { value: "INTC", label: "Intel (INTC)" },
    { value: "CSCO", label: "Cisco (CSCO)" },
    { value: "IBM", label: "IBM (IBM)" },
    { value: "UBER", label: "Uber (UBER)" },
    { value: "DIS", label: "Disney (DIS)" },
    { value: "KO", label: "Coca-Cola (KO)" },
    { value: "PEP", label: "PepsiCo (PEP)" },
    { value: "MCD", label: "McDonald's (MCD)" },
    { value: "NKE", label: "Nike (NKE)" },
    { value: "BA", label: "Boeing (BA)" },
    { value: "CAT", label: "Caterpillar (CAT)" },
    { value: "GE", label: "General Electric (GE)" },
    { value: "UNH", label: "UnitedHealth (UNH)" },
    { value: "MRK", label: "Merck (MRK)" },
    { value: "PFE", label: "Pfizer (PFE)" },
    { value: "CVX", label: "Chevron (CVX)" },
    { value: "TMO", label: "Thermo Fisher (TMO)" },
    { value: "AMGN", label: "Amgen (AMGN)" },
    { value: "GS", label: "Goldman Sachs (GS)" },
    { value: "MS", label: "Morgan Stanley (MS)" },
    { value: "LIN", label: "Linde (LIN)" },
    { value: "RTX", label: "Raytheon (RTX)" },
    { value: "LOW", label: "Lowe's (LOW)" },
    { value: "SBUX", label: "Starbucks (SBUX)" },
    { value: "PLTR", label: "Palantir (PLTR)" },
  ];

  // Load preferences on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pivotCalculatorPreferences');
      if (saved) {
        try {
          const prefs = JSON.parse(saved);
          if (prefs.method) setSelectedMethod(prefs.method);
          if (prefs.session) setSelectedSession(prefs.session);
          if (prefs.precision) setDecimalPrecision(prefs.precision);
          if (prefs.showMidLevels !== undefined) setShowMidLevels(prefs.showMidLevels);
          if (prefs.symbol) setSelectedSymbol(prefs.symbol);
          if (prefs.timezone) setSelectedTimezone(prefs.timezone);
          if (prefs.proximityAlertEnabled !== undefined) setProximityAlertEnabled(prefs.proximityAlertEnabled);
          if (prefs.proximityThreshold) setProximityThreshold(prefs.proximityThreshold);
          if (prefs.accountBalance) setAccountBalance(prefs.accountBalance);
          if (prefs.riskPercent) setRiskPercent(prefs.riskPercent);
          if (prefs.stockDataCache) setStockDataCache(prefs.stockDataCache);
        } catch (e) {
          console.error('Failed to load preferences:', e);
        }
      }
      const savedMarketCache = localStorage.getItem(STOCK_MARKET_CACHE_KEY);
      if (savedMarketCache) {
        try {
          const parsed = JSON.parse(savedMarketCache);
          const fetchedAt = Number(parsed?.fetchedAt) || Date.now();
          const cachedQuotes = parsed?.data && typeof parsed.data === "object" ? parsed.data : {};
          const normalizedCache = Object.fromEntries(Object.entries(cachedQuotes).map(([symbol, data]) => [symbol, { data, timestamp: fetchedAt }]));
          setStockDataCache((current) => ({ ...normalizedCache, ...current }));
        } catch (e) {
          console.error('Failed to load market data cache:', e);
        }
      }
    }
  }, []);

  // Auto-fetch market data when symbol changes
  useEffect(() => {
    if (selectedSymbol && stockDataCache[selectedSymbol]) {
      const cached = stockDataCache[selectedSymbol];
      const stockData = cached.data;
      if (stockData && stockData.dayHigh && stockData.dayLow && stockData.price) {
        setHigh(stockData.dayHigh);
        setLow(stockData.dayLow);
        setClose(stockData.price);
        setOpen(stockData.dayOpen || stockData.previousClose || stockData.price);
        setLastUpdated(new Date(cached.timestamp).toLocaleString());
      }
    }
  }, [selectedSymbol, stockDataCache]);

  // Use the shared Market Data cache first; fetch only when this symbol is not cached.
  const fetchMarketData = async () => {
    setLoadingMarketData(true);
    setMarketDataError(null);

    const cached = stockDataCache[selectedSymbol];

    try {
      // The protected Cron fills Firebase from StockData.org. This public
      // request reads the persisted historical snapshot and never calls the
      // provider directly.
      const historicalResponse = await fetch(`/api/stocks/historical?symbol=${encodeURIComponent(selectedSymbol)}&timeframe=${encodeURIComponent(selectedSession)}`);
      const historicalPayload = await historicalResponse.json();
      const candle = historicalPayload?.candle;
      if (historicalResponse.ok && candle && [candle.open, candle.high, candle.low, candle.close].every((value: unknown) => typeof value === "number" && Number.isFinite(value))) {
        setHigh(candle.high);
        setLow(candle.low);
        setClose(candle.close);
        setOpen(candle.open);
        setLastUpdated(historicalPayload.fetchedAt ? new Date(historicalPayload.fetchedAt).toLocaleString() : new Date(candle.date).toLocaleDateString());
      } else if (cached && cached.data && cached.data.dayHigh && cached.data.dayLow && cached.data.price) {
        setHigh(cached.data.dayHigh);
        setLow(cached.data.dayLow);
        setClose(cached.data.price);
        setOpen(cached.data.dayOpen || cached.data.previousClose || cached.data.price);
        setLastUpdated(new Date(cached.timestamp).toLocaleString());
        setMarketDataError("Historical snapshot unavailable; showing the last cached quote.");
      } else {
        throw new Error("Historical cache unavailable");
      }
    } catch {
      setMarketDataError("Historical market cache is unavailable. Enter prices manually or try again after the next scheduled sync.");
    }

    setLoadingMarketData(false);
  };

  const sessions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const precisionOptions = [
    { value: 2, label: "2 decimals" },
    { value: 3, label: "3 decimals" },
    { value: 4, label: "4 decimals" },
    { value: 5, label: "5 decimals" },
  ];

  const presets = [
    { name: "Classic Daily", method: "classic", session: "daily", precision: 2 },
    { name: "Fibonacci Daily", method: "fibonacci", session: "daily", precision: 2 },
    { name: "Camarilla Daily", method: "camarilla", session: "daily", precision: 4 },
    { name: "Woodie Weekly", method: "woodie", session: "weekly", precision: 2 },
    { name: "DeMark Monthly", method: "demark", session: "monthly", precision: 2 },
  ];

  const methods = [
    { value: "classic", label: "Classic", levels: 7 },
    { value: "woodie", label: "Woodie's", levels: 5 },
    { value: "camarilla", label: "Camarilla", levels: 9 },
    { value: "demark", label: "DeMark's", levels: 2 },
    { value: "fibonacci", label: "Fibonacci", levels: 7 },
  ];

  // Classic Method
  const classicPivot = (high + low + close) / 3;
  const classicR1 = 2 * classicPivot - low;
  const classicS1 = 2 * classicPivot - high;
  const classicR2 = classicPivot + high - low;
  const classicS2 = classicPivot - high + low;
  const classicR3 = high + 2 * (classicPivot - low);
  const classicS3 = low - 2 * (high - classicPivot);

  // Woodie's Method  
  const woodiePivot = (high + low + 2 * close) / 4;
  const woodieR1 = 2 * woodiePivot - low;
  const woodieS1 = 2 * woodiePivot - high;
  const woodieR2 = woodiePivot + high - low;
  const woodieS2 = woodiePivot - high + low;
  const woodieR3 = high + 2 * (woodiePivot - low);
  const woodieS3 = low - 2 * (high - woodiePivot);

  // Camarilla Method
  const range = high - low;
  const camarillaPivot = (high + low + close) / 3;
  const camarillaR4 = close + range * 1.5;
  const camarillaR3 = close + range * 1.25;
  const camarillaR2 = close + range * 1.1666;
  const camarillaR1 = close + range * 1.0833;
  const camarillaS1 = close - range * 1.0833;
  const camarillaS2 = close - range * 1.1666;
  const camarillaS3 = close - range * 1.25;
  const camarillaS4 = close - range * 1.5;

  // DeMark's Method
  let demarkX;
  if (open > close) {
    demarkX = high + 2 * low + close;
  } else if (open < close) {
    demarkX = 2 * high + low + close;
  } else {
    demarkX = high + low + 2 * close;
  }
  const demarkR1 = demarkX / 2 - low;
  const demarkS1 = demarkX / 2 - high;
  const demarkPivot = demarkX / 4;

  // Fibonacci Method
  const fibPivot = (high + low + close) / 3;
  const fibR1 = fibPivot + range * 0.382;
  const fibS1 = fibPivot - range * 0.382;
  const fibR2 = fibPivot + range * 0.618;
  const fibS2 = fibPivot - range * 0.618;
  const fibR3 = fibPivot + range * 1.0;
  const fibS3 = fibPivot - range * 1.0;

  // Mid-level calculations
  const classicMid1 = (classicPivot + classicR1) / 2;
  const classicMid2 = (classicR1 + classicR2) / 2;
  const classicMid3 = (classicR2 + classicR3) / 2;
  const classicMidS1 = (classicPivot + classicS1) / 2;
  const classicMidS2 = (classicS1 + classicS2) / 2;
  const classicMidS3 = (classicS2 + classicS3) / 2;

  const getCurrentResults = () => {
    switch (selectedMethod) {
      case "classic":
        return { pivot: classicPivot, r1: classicR1, s1: classicS1, r2: classicR2, s2: classicS2, r3: classicR3, s3: classicS3 };
      case "woodie":
        return { pivot: woodiePivot, r1: woodieR1, s1: woodieS1, r2: woodieR2, s2: woodieS2, r3: woodieR3, s3: woodieS3 };
      case "camarilla":
        return { pivot: camarillaPivot, r1: camarillaR1, s1: camarillaS1, r2: camarillaR2, s2: camarillaS2, r3: camarillaR3, s3: camarillaS3, r4: camarillaR4, s4: camarillaS4 };
      case "demark":
        return { pivot: demarkPivot, r1: demarkR1, s1: demarkS1 };
      case "fibonacci":
        return { pivot: fibPivot, r1: fibR1, s1: fibS1, r2: fibR2, s2: fibS2, r3: fibR3, s3: fibS3 };
      default:
        return { pivot: classicPivot, r1: classicR1, s1: classicS1, r2: classicR2, s2: classicS2, r3: classicR3, s3: classicS3 };
    }
  };

  const currentResults = getCurrentResults();
  const visualizationLevels = [
    { name: "R4", role: "Resistance", value: currentResults.r4, color: "#dc2626" },
    { name: "R3", role: "Resistance", value: currentResults.r3, color: "#dc2626" },
    { name: "R2", role: "Resistance", value: currentResults.r2, color: "#ef4444" },
    { name: "R1", role: "Resistance", value: currentResults.r1, color: "#f97316" },
    { name: "Pivot", role: "Pivot", value: currentResults.pivot, color: "#d97706" },
    { name: "S1", role: "Support", value: currentResults.s1, color: "#16a34a" },
    { name: "S2", role: "Support", value: currentResults.s2, color: "#22c55e" },
    { name: "S3", role: "Support", value: currentResults.s3, color: "#15803d" },
    { name: "S4", role: "Support", value: currentResults.s4, color: "#166534" },
  ].filter((level): level is { name: string; role: string; value: number; color: string } => typeof level.value === "number" && Number.isFinite(level.value));

  return <>
    <div className="grid gap-5 md:grid-cols-4">
      <NumberField label="High" value={high} onChange={setHigh} step="0.01" />
      <NumberField label="Low" value={low} onChange={setLow} step="0.01" />
      <NumberField label="Close" value={close} onChange={setClose} step="0.01" />
      <NumberField label="Open" value={open} onChange={setOpen} step="0.01" note="Required for Woodie's & DeMark's" />
    </div>

    <div className="grid gap-5 md:grid-cols-2 mt-4">
      <SelectField label="Load Live Data" value={selectedSymbol} onChange={setSelectedSymbol} options={stockSymbols} />
      <div className="flex items-end gap-2">
        <button
          onClick={fetchMarketData}
          disabled={loadingMarketData}
          className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingMarketData ? "Loading..." : "Load Market Data"}
        </button>
        {lastUpdated && (
          <span className="text-xs text-slate-500 dark:text-slate-400 self-center mb-3">
            Updated: {lastUpdated}
          </span>
        )}
      </div>
    </div>

    <div className={`mt-4 rounded-2xl border p-5 ${stockDataCache[selectedSymbol] ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/70'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-base font-semibold ${stockDataCache[selectedSymbol] ? 'text-green-900 dark:text-green-100' : 'text-slate-700 dark:text-slate-300'}`}>
          {selectedSymbol} {stockDataCache[selectedSymbol] ? 'Live Market Data' : 'Market Data'}
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {lastUpdated || 'No data loaded'}
        </span>
      </div>

      {stockDataCache[selectedSymbol] ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current Price</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              ${stockDataCache[selectedSymbol].data.price?.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Day High</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              ${stockDataCache[selectedSymbol].data.dayHigh?.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Day Low</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              ${stockDataCache[selectedSymbol].data.dayLow?.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Change %</p>
            <p className={`text-lg font-bold ${stockDataCache[selectedSymbol].data.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stockDataCache[selectedSymbol].data.changePercent >= 0 ? '+' : ''}{stockDataCache[selectedSymbol].data.changePercent?.toFixed(2)}%
            </p>
          </div>
          {stockDataCache[selectedSymbol].data.dayOpen && (
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Day Open</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                ${stockDataCache[selectedSymbol].data.dayOpen?.toFixed(2)}
              </p>
            </div>
          )}
          {stockDataCache[selectedSymbol].data.previousClose && (
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Previous Close</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                ${stockDataCache[selectedSymbol].data.previousClose?.toFixed(2)}
              </p>
            </div>
          )}
          {stockDataCache[selectedSymbol].data.volume && (
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Volume</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {formatNumber(stockDataCache[selectedSymbol].data.volume, 0)}
              </p>
            </div>
          )}
          {stockDataCache[selectedSymbol].data.name && (
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Company Name</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {stockDataCache[selectedSymbol].data.name}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Click "Load Market Data" to fetch live prices
          </p>
        </div>
      )}
    </div>

    {marketDataError && (
      <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20 p-4">
        <p className="text-sm text-red-900 dark:text-red-100">{marketDataError}</p>
      </div>
    )}

    <button
      type="button"
      onClick={() => setShowAdvancedOptions((visible) => !visible)}
      className="mt-5 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-primary-700 dark:hover:text-primary-300"
      aria-expanded={showAdvancedOptions}
    >
      <span>Advanced options</span>
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{showAdvancedOptions ? "Hide" : "Method, timeframe, alerts and more"}</span>
    </button>

    {showAdvancedOptions && <div className="mt-4 space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
    <div className="grid gap-5 md:grid-cols-3">
      <SelectField label="Calculation Method" value={selectedMethod} onChange={setSelectedMethod} options={methods} />
      <SelectField label="Timeframe" value={selectedSession} onChange={setSelectedSession} options={sessions} />
      <SelectField label="Decimal Precision" value={decimalPrecision.toString()} onChange={(val) => setDecimalPrecision(Number(val))} options={precisionOptions.map(opt => ({ label: opt.label, value: opt.value.toString() }))} />
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      <SelectField label="Quick Presets" value="" onChange={(val) => {
        const preset = presets.find(p => p.name === val);
        if (preset) {
          setSelectedMethod(preset.method);
          setSelectedSession(preset.session);
          setDecimalPrecision(preset.precision);
        }
      }} options={[{ label: "Select preset...", value: "" }, ...presets.map(p => ({ label: p.name, value: p.name }))]} />
      <div className="flex items-end gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={showComparison} onChange={(e) => setShowComparison(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Show all methods comparison</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={showMidLevels} onChange={(e) => setShowMidLevels(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Show mid-levels (R1.5, S1.5, etc.)</span>
        </label>
      </div>
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Proximity Alert Threshold" value={proximityThreshold} onChange={setProximityThreshold} step="0.1" suffix="%" note="Alert when price is within X% of a level" />
      <div className="flex items-end">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={proximityAlertEnabled} onChange={(e) => setProximityAlertEnabled(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Enable proximity alerts</span>
        </label>
      </div>
    </div>

    {proximityAlertEnabled && (
      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20 p-4">
        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3">Proximity Alerts</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-amber-800 dark:text-amber-200">Distance to Pivot:</span>
            <span className="font-semibold text-amber-900 dark:text-amber-100">{formatNumberWithPrecision(Math.abs((currentResults.pivot - close) / currentResults.pivot * 100), 2)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-amber-800 dark:text-amber-200">Distance to R1:</span>
            <span className="font-semibold text-amber-900 dark:text-amber-100">{formatNumberWithPrecision(Math.abs((currentResults.r1 - close) / currentResults.r1 * 100), 2)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-amber-800 dark:text-amber-200">Distance to S1:</span>
            <span className="font-semibold text-amber-900 dark:text-amber-100">{formatNumberWithPrecision(Math.abs((currentResults.s1 - close) / currentResults.s1 * 100), 2)}%</span>
          </div>
        </div>
      </div>
    )}

    <div className="grid gap-5 md:grid-cols-2 mt-4">
      <SelectField label="Timezone" value={selectedTimezone} onChange={setSelectedTimezone} options={timezones} />
      <div className="flex items-end">
        <button 
          onClick={() => {
            const today = new Date().toISOString().split('T')[0];
            const newEntry = {
              date: today,
              pivot: currentResults.pivot,
              r1: currentResults.r1,
              s1: currentResults.s1
            };
            setHistoricalData([...historicalData, newEntry].slice(-7)); // Keep last 7 days
          }}
          className="px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-semibold"
        >
          Save to History
        </button>
      </div>
    </div>

    {historicalData.length > 0 && (
      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Historical Pivot Data (Last 7 Days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-3 text-left font-semibold text-slate-700 dark:text-slate-300">Date</th>
                <th className="py-2 px-3 text-right font-semibold text-slate-700 dark:text-slate-300">Pivot</th>
                <th className="py-2 px-3 text-right font-semibold text-slate-700 dark:text-slate-300">R1</th>
                <th className="py-2 px-3 text-right font-semibold text-slate-700 dark:text-slate-300">S1</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((entry, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{entry.date}</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(entry.pivot, decimalPrecision)}</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(entry.r1, decimalPrecision)}</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(entry.s1, decimalPrecision)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

    <div>
      <button 
        onClick={() => setShowRiskSection(!showRiskSection)}
        className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-sm font-semibold"
      >
        {showRiskSection ? "Hide" : "Show"} Risk Management
      </button>
    </div>

    {showRiskSection && (
      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Risk Management Based on Pivot Levels</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <NumberField label="Account Balance" value={accountBalance} onChange={setAccountBalance} step="100" />
          <NumberField label="Risk per Trade (%)" value={riskPercent} onChange={setRiskPercent} step="0.1" suffix="%" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Result label="Risk Amount" value={formatNumber(accountBalance * riskPercent / 100)} note={`${riskPercent}% of balance`} />
          <Result label="Position Size (at S1)" value={formatNumber((accountBalance * riskPercent / 100) / Math.abs(currentResults.s1 - currentResults.pivot))} note="Units to risk at S1" />
          <Result label="Position Size (at R1)" value={formatNumber((accountBalance * riskPercent / 100) / Math.abs(currentResults.r1 - currentResults.pivot))} note="Units to risk at R1" />
        </div>
      </div>
    )}

    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Session Information ({selectedTimezone})</h3>
      <div className="grid gap-3 sm:grid-cols-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Market:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{sessionInfo.market}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Session Hours:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{sessionInfo.startTime} - {sessionInfo.endTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Timeframe:</span>
          <span className="font-semibold text-slate-900 dark:text-white capitalize">{selectedSession}</span>
        </div>
      </div>
    </div>
    </div>}

    {!showComparison ? (
      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Result label="Pivot Point" value={formatNumberWithPrecision(currentResults.pivot, decimalPrecision)} zone="pivot" />
          <Result label="Resistance 1" value={formatNumberWithPrecision(currentResults.r1, decimalPrecision)} zone="resistance" />
          <Result label="Support 1" value={formatNumberWithPrecision(currentResults.s1, decimalPrecision)} zone="support" />
          {currentResults.r2 && <Result label="Resistance 2" value={formatNumberWithPrecision(currentResults.r2, decimalPrecision)} zone="resistance" />}
          {currentResults.s2 && <Result label="Support 2" value={formatNumberWithPrecision(currentResults.s2, decimalPrecision)} zone="support" />}
          {currentResults.r3 && <Result label="Resistance 3" value={formatNumberWithPrecision(currentResults.r3, decimalPrecision)} zone="resistance" />}
          {currentResults.s3 && <Result label="Support 3" value={formatNumberWithPrecision(currentResults.s3, decimalPrecision)} zone="support" />}
          {currentResults.r4 && <Result label="Resistance 4" value={formatNumberWithPrecision(currentResults.r4, decimalPrecision)} zone="resistance" />}
          {currentResults.s4 && <Result label="Support 4" value={formatNumberWithPrecision(currentResults.s4, decimalPrecision)} zone="support" />}
        </div>

        {showMidLevels && selectedMethod === "classic" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            <Result label="R1.5 (Mid)" value={formatNumberWithPrecision(classicMid1, decimalPrecision)} zone="resistance" />
            <Result label="R2.5 (Mid)" value={formatNumberWithPrecision(classicMid2, decimalPrecision)} zone="resistance" />
            <Result label="R3.5 (Mid)" value={formatNumberWithPrecision(classicMid3, decimalPrecision)} zone="resistance" />
            <Result label="S1.5 (Mid)" value={formatNumberWithPrecision(classicMidS1, decimalPrecision)} zone="support" />
            <Result label="S2.5 (Mid)" value={formatNumberWithPrecision(classicMidS2, decimalPrecision)} zone="support" />
            <Result label="S3.5 (Mid)" value={formatNumberWithPrecision(classicMidS3, decimalPrecision)} zone="support" />
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pivot Levels Visualization</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Horizontal price ladder for {selectedMethod} · {selectedSession}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />Resistance</span>
              <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />Pivot</span>
              <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-green-600" />Support</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <ScatterChart margin={{ top: 12, right: 72, bottom: 12, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" dataKey="x" domain={[-1, 1]} hide />
              <YAxis type="number" dataKey="value" domain={["auto", "auto"]} tickFormatter={(value) => formatNumberWithPrecision(Number(value), decimalPrecision)} stroke="#64748b" width={76} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value, _name, item) => [formatNumberWithPrecision(Number(value), decimalPrecision), `${item.payload?.name || "Level"} (${item.payload?.role || "Pivot"})`]} />
              <ReferenceLine y={close} stroke="#0284c7" strokeDasharray="5 5" label={{ value: "Close", position: "insideTopRight", fill: "#0284c7", fontSize: 11 }} />
              {visualizationLevels.map((level) => (
                <Fragment key={level.name}>
                  <ReferenceLine y={level.value} stroke={level.color} strokeWidth={level.name === "Pivot" ? 2.5 : 1.5} strokeDasharray={level.name === "Pivot" ? undefined : "4 3"} label={{ value: level.name, position: "insideRight", fill: level.color, fontSize: 11, fontWeight: 700 }} />
                  <Scatter data={[{ x: 0, value: level.value, name: level.name, role: level.role }]} fill={level.color}>
                    <LabelList dataKey="name" position="right" fill={level.color} fontSize={11} fontWeight={700} />
                  </Scatter>
                </Fragment>
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    ) : (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-300">Level</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-700 dark:text-slate-300">Classic</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-700 dark:text-slate-300">Woodie's</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-700 dark:text-slate-300">Camarilla</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-700 dark:text-slate-300">DeMark's</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-700 dark:text-slate-300">Fibonacci</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Resistance 4</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaR4, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Resistance 3</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(classicR3, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(woodieR3, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaR3, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(fibR3, decimalPrecision)}</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Resistance 2</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(classicR2, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(woodieR2, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaR2, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(fibR2, decimalPrecision)}</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Resistance 1</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(classicR1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(woodieR1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaR1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(demarkR1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(fibR1, decimalPrecision)}</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-primary-50 dark:bg-primary-950/20">
              <td className="py-3 px-4 font-bold text-primary-700 dark:text-primary-300">Pivot Point</td>
              <td className="py-3 px-4 text-right font-bold text-primary-700 dark:text-primary-300">{formatNumberWithPrecision(classicPivot, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right font-bold text-primary-700 dark:text-primary-300">{formatNumberWithPrecision(woodiePivot, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right font-bold text-primary-700 dark:text-primary-300">{formatNumberWithPrecision(camarillaPivot, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right font-bold text-primary-700 dark:text-primary-300">{formatNumberWithPrecision(demarkPivot, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right font-bold text-primary-700 dark:text-primary-300">{formatNumberWithPrecision(fibPivot, decimalPrecision)}</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Support 1</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(classicS1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(woodieS1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaS1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(demarkS1, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(fibS1, decimalPrecision)}</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Support 2</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(classicS2, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(woodieS2, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaS2, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(fibS2, decimalPrecision)}</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Support 3</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(classicS3, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(woodieS3, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaS3, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(fibS3, decimalPrecision)}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Support 4</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{formatNumberWithPrecision(camarillaS4, decimalPrecision)}</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}

    <Notice>
      <strong>Method Differences:</strong> Classic uses standard average; Woodie's puts double weight on close; Camarilla creates tighter bands around price; DeMark's is conditional based on open vs close; Fibonacci uses standard ratios. These are deterministic calculations, not trade signals or guarantees.
    </Notice>

    <div className="mt-6 flex flex-wrap gap-3">
      <button 
        onClick={() => {
          const calculatedAt = new Date().toISOString();
          const methods: Record<string, Record<string, number | null | undefined>> = showComparison ? {
            classic: { pivot: classicPivot, r1: classicR1, s1: classicS1, r2: classicR2, s2: classicS2, r3: classicR3, s3: classicS3 },
            woodie: { pivot: woodiePivot, r1: woodieR1, s1: woodieS1, r2: woodieR2, s2: woodieS2, r3: woodieR3, s3: woodieS3 },
            camarilla: { pivot: camarillaPivot, r1: camarillaR1, s1: camarillaS1, r2: camarillaR2, s2: camarillaS2, r3: camarillaR3, s3: camarillaS3, r4: camarillaR4, s4: camarillaS4 },
            demark: { pivot: demarkPivot, r1: demarkR1, s1: demarkS1 },
            fibonacci: { pivot: fibPivot, r1: fibR1, s1: fibS1, r2: fibR2, s2: fibS2, r3: fibR3, s3: fibS3 },
          } : { [selectedMethod]: currentResults };
          const rows = buildPivotReportRows({
            symbol: selectedSymbol,
            company: stockDataCache[selectedSymbol]?.data?.name || selectedSymbol,
            timeframe: selectedSession,
            calculatedAt,
            source: lastUpdated ? `Market data cache (${lastUpdated})` : "Manual input",
            high,
            low,
            close,
            open,
            methods,
          });
          const columns = Object.keys(rows[0] || {}) as Array<keyof PivotReportRow>;
          const csv = [columns, ...rows.map((row) => columns.map((column) => row[column]))]
            .map((line) => line.map(escapeCsvValue).join(","))
            .join("\n");
          const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
          const link = document.createElement("a");
          link.setAttribute("href", csvContent);
          link.setAttribute("download", `pivot-points-${selectedMethod}-${selectedSession}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
      >
        Export CSV
      </button>
      <button
        onClick={() => {
          const calculatedAt = new Date().toISOString();
          const methods: Record<string, Record<string, number | null | undefined>> = showComparison ? {
            classic: { pivot: classicPivot, r1: classicR1, s1: classicS1, r2: classicR2, s2: classicS2, r3: classicR3, s3: classicS3 },
            woodie: { pivot: woodiePivot, r1: woodieR1, s1: woodieS1, r2: woodieR2, s2: woodieS2, r3: woodieR3, s3: woodieS3 },
            camarilla: { pivot: camarillaPivot, r1: camarillaR1, s1: camarillaS1, r2: camarillaR2, s2: camarillaS2, r3: camarillaR3, s3: camarillaS3, r4: camarillaR4, s4: camarillaS4 },
            demark: { pivot: demarkPivot, r1: demarkR1, s1: demarkS1 },
            fibonacci: { pivot: fibPivot, r1: fibR1, s1: fibS1, r2: fibR2, s2: fibS2, r3: fibR3, s3: fibS3 },
          } : { [selectedMethod]: currentResults };
          const rows = buildPivotReportRows({
            symbol: selectedSymbol,
            company: stockDataCache[selectedSymbol]?.data?.name || selectedSymbol,
            timeframe: selectedSession,
            calculatedAt,
            source: lastUpdated ? `Market data cache (${lastUpdated})` : "Manual input",
            high,
            low,
            close,
            open,
            methods,
          });
          const reportWindow = window.open("", "_blank", "width=1000,height=800");
          if (!reportWindow) return;
          const tableRows = rows.map((row) => `<tr>${Object.values(row).map((value) => `<td>${escapeHtmlValue(typeof value === "number" ? value.toFixed(decimalPrecision) : value)}</td>`).join("")}</tr>`).join("");
          reportWindow.document.write(`<!doctype html><html><head><title>Tradivex Pivot Point Report - ${escapeHtmlValue(selectedSymbol)}</title><style>body{font-family:Arial,sans-serif;color:#172033;margin:36px}h1{margin:0 0 6px;color:#2563eb}p{color:#5b6472;margin:4px 0 20px}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}.card{border:1px solid #dbe2ea;border-radius:8px;padding:10px}.label{font-size:11px;color:#64748b;text-transform:uppercase}.value{font-weight:700;margin-top:5px}table{border-collapse:collapse;width:100%;font-size:11px}th{background:#eff6ff;color:#1d4ed8;text-align:left}th,td{border:1px solid #dbe2ea;padding:7px}tr:nth-child(even){background:#f8fafc}.disclaimer{font-size:10px;margin-top:24px}@media print{body{margin:18px}}</style></head><body><h1>Tradivex Pivot Point Analysis</h1><p>${escapeHtmlValue(selectedSymbol)} — ${escapeHtmlValue(stockDataCache[selectedSymbol]?.data?.name || "Manual input")} · ${escapeHtmlValue(selectedSession)} timeframe · Generated ${escapeHtmlValue(calculatedAt)}</p><div class="summary"><div class="card"><div class="label">High</div><div class="value">${high.toFixed(decimalPrecision)}</div></div><div class="card"><div class="label">Low</div><div class="value">${low.toFixed(decimalPrecision)}</div></div><div class="card"><div class="label">Close</div><div class="value">${close.toFixed(decimalPrecision)}</div></div><div class="card"><div class="label">Open</div><div class="value">${open.toFixed(decimalPrecision)}</div></div></div><table><thead><tr>${Object.keys(rows[0] || {}).map((column) => `<th>${escapeHtmlValue(column)}</th>`).join("")}</tr></thead><tbody>${tableRows}</tbody></table><p class="disclaimer">Educational calculation only. Pivot levels are mathematical reference points, not trade signals or financial advice. Data source: ${escapeHtmlValue(lastUpdated ? `Market data cache (${lastUpdated})` : "Manual input")}.</p></body></html>`);
          reportWindow.document.close();
          reportWindow.focus();
          window.setTimeout(() => reportWindow.print(), 250);
        }}
        className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-semibold"
      >
        Print / Save PDF
      </button>
      <button
        onClick={() => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('pivotCalculatorPreferences', JSON.stringify({
              method: selectedMethod,
              session: selectedSession,
              precision: decimalPrecision,
              showMidLevels: showMidLevels,
              symbol: selectedSymbol,
              timezone: selectedTimezone,
              proximityAlertEnabled: proximityAlertEnabled,
              proximityThreshold: proximityThreshold,
              accountBalance: accountBalance,
              riskPercent: riskPercent,
              stockDataCache: stockDataCache
            }));
          }
        }}
        className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-semibold"
      >
        Save Preferences
      </button>
    </div>
  </>;
}

function RiskRewardCalculator() {
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(95);
  const [target, setTarget] = useState(115);
  const riskDistance = Math.abs(entry - stop);
  const rewardDistance = Math.abs(target - entry);
  const ratio = riskDistance > 0 ? rewardDistance / riskDistance : NaN;
  const breakevenWinRate = riskDistance + rewardDistance > 0 ? riskDistance / (riskDistance + rewardDistance) * 100 : NaN;
  return <>
    <div className="grid gap-5 md:grid-cols-3"><NumberField label="Entry price" value={entry} onChange={setEntry} step="0.01" /><NumberField label="Stop-loss price" value={stop} onChange={setStop} step="0.01" /><NumberField label="Take-profit price" value={target} onChange={setTarget} step="0.01" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Result label="Price risk" value={formatNumber(riskDistance)} /><Result label="Price reward" value={formatNumber(rewardDistance)} /><Result label="Risk–reward ratio" value={`1 : ${formatNumber(ratio, 2)}`} /></div>
    <div className="mt-4"><Result label="Break-even win rate" value={`${formatNumber(breakevenWinRate)}%`} note="Before fees, slippage, and losing-trade differences" /></div>
    <Notice>Risk and reward are calculated from absolute price distances. Confirm that your stop is below entry and target above entry for a long trade, or the reverse for a short trade. This is not a recommendation to take a trade.</Notice>
  </>;
}

function CompoundReturnsCalculator() {
  const [initial, setInitial] = useState(10000);
  const [contribution, setContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState("12");
  const periodsPerYear = Number(frequency);
  const periods = Math.max(0, years * periodsPerYear);
  const periodicRate = annualRate / 100 / periodsPerYear;
  const growthFactor = Math.pow(1 + periodicRate, periods);
  const futureValue = periodicRate === 0 ? initial + contribution * periods : initial * growthFactor + contribution * ((growthFactor - 1) / periodicRate);
  const totalContributed = initial + contribution * periods;
  return <>
    <div className="grid gap-5 md:grid-cols-2"><NumberField label="Initial amount" value={initial} onChange={setInitial} step="0.01" /><NumberField label="Regular contribution" value={contribution} onChange={setContribution} step="0.01" /><NumberField label="Annual return assumption" value={annualRate} onChange={setAnnualRate} step="0.1" suffix="%" /><NumberField label="Time period" value={years} onChange={setYears} step="0.5" suffix="years" /><SelectField label="Compounding/contribution frequency" value={frequency} onChange={setFrequency} options={[{ label: "Monthly", value: "12" }, { label: "Quarterly", value: "4" }, { label: "Annually", value: "1" }]} /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Result label="Estimated future value" value={formatNumber(futureValue)} /><Result label="Total contributed" value={formatNumber(totalContributed)} /><Result label="Estimated growth" value={formatNumber(futureValue - totalContributed)} /></div>
    <Notice>This is a mathematical projection using a constant return and end-of-period contributions. It excludes taxes, fees, inflation, volatility, and the possibility of losses. Past performance does not guarantee future results.</Notice>
  </>;
}

function DcaAveragePriceCalculator() {
  const [units1, setUnits1] = useState(1);
  const [price1, setPrice1] = useState(100);
  const [units2, setUnits2] = useState(1);
  const [price2, setPrice2] = useState(80);
  const [units3, setUnits3] = useState(0);
  const [price3, setPrice3] = useState(0);
  const totalUnits = units1 + units2 + units3;
  const totalCost = units1 * price1 + units2 * price2 + units3 * price3;
  const averagePrice = totalUnits > 0 ? totalCost / totalUnits : NaN;
  return <>
    <div className="grid gap-5 md:grid-cols-2"><NumberField label="Purchase 1 units" value={units1} onChange={setUnits1} step="0.000001" /><NumberField label="Purchase 1 price" value={price1} onChange={setPrice1} step="0.01" /><NumberField label="Purchase 2 units" value={units2} onChange={setUnits2} step="0.000001" /><NumberField label="Purchase 2 price" value={price2} onChange={setPrice2} step="0.01" /><NumberField label="Purchase 3 units (optional)" value={units3} onChange={setUnits3} step="0.000001" /><NumberField label="Purchase 3 price" value={price3} onChange={setPrice3} step="0.01" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Result label="Total units" value={formatNumber(totalUnits, 6)} /><Result label="Total invested" value={formatNumber(totalCost)} /><Result label="Weighted average price" value={formatNumber(averagePrice)} /></div>
    <Notice>This weighted-average calculation uses only the quantities and prices entered. Brokerage, taxes, fees, dividends, currency conversion, and token/contract-specific rules are excluded.</Notice>
  </>;
}

function DrawdownRecoveryCalculator() {
  const [peak, setPeak] = useState(10000);
  const [current, setCurrent] = useState(8000);
  const drawdownAmount = Math.max(peak - current, 0);
  const drawdownPercent = peak > 0 ? drawdownAmount / peak * 100 : NaN;
  const recoveryPercent = current > 0 ? drawdownAmount / current * 100 : NaN;
  return <>
    <div className="grid gap-5 md:grid-cols-2"><NumberField label="Previous peak balance/equity" value={peak} onChange={setPeak} step="0.01" /><NumberField label="Current balance/equity" value={current} onChange={setCurrent} step="0.01" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Result label="Drawdown amount" value={formatNumber(drawdownAmount)} /><Result label="Drawdown" value={`${formatNumber(drawdownPercent)}%`} /><Result label="Return needed to recover" value={`${formatNumber(recoveryPercent)}%`} /></div>
    <Notice>If the current value is above the previous peak, drawdown is shown as zero. The recovery percentage is measured from the current value and is not a forecast or a target.</Notice>
  </>;
}

function StockProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(115);
  const [shares, setShares] = useState(10);
  const [buyFees, setBuyFees] = useState(0);
  const [sellFees, setSellFees] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);
  const grossProfit = (sellPrice - buyPrice) * shares;
  const totalCosts = buyFees + sellFees + otherCosts;
  const netProfit = grossProfit - totalCosts;
  const invested = buyPrice * shares + buyFees;
  const returnPercent = invested > 0 ? netProfit / invested * 100 : NaN;
  const breakEvenSellPrice = shares > 0 ? (buyPrice * shares + totalCosts) / shares : NaN;

  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Buy price per share" value={buyPrice} onChange={setBuyPrice} step="0.01" />
      <NumberField label="Sell price per share" value={sellPrice} onChange={setSellPrice} step="0.01" />
      <NumberField label="Number of shares" value={shares} onChange={setShares} step="0.000001" />
      <NumberField label="Buy-side fees" value={buyFees} onChange={setBuyFees} step="0.01" />
      <NumberField label="Sell-side fees" value={sellFees} onChange={setSellFees} step="0.01" />
      <NumberField label="Other trading costs" value={otherCosts} onChange={setOtherCosts} step="0.01" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Gross P&L" value={formatNumber(grossProfit)} />
      <Result label="Net P&L" value={formatNumber(netProfit)} />
      <Result label="Return on invested amount" value={`${formatNumber(returnPercent)}%`} />
      <Result label="Break-even sell price" value={formatNumber(breakEvenSellPrice)} />
    </div>
    <Notice>The prefilled figures are example inputs, not live quotes. Replace them with verified broker data. This is an arithmetic estimate; taxes, dividends, currency conversion, spread, slippage, wash-sale rules, and broker-specific charges are excluded.</Notice>
  </>;
}

type OptionType = "call" | "put";
type OptionPosition = "long" | "short";
type OptionLeg = { enabled: boolean; type: OptionType; position: OptionPosition; strike: number; premium: number; contracts: number };

function normalPdf(value: number) {
  return Math.exp(-0.5 * value * value) / Math.sqrt(2 * Math.PI);
}

function normalCdf(value: number) {
  const sign = value < 0 ? -1 : 1;
  const absolute = Math.abs(value);
  const t = 1 / (1 + 0.2316419 * absolute);
  const polynomial = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return 0.5 * (1 + sign * (1 - normalPdf(absolute) * polynomial));
}

type OptionModel = { price: number; delta: number; gamma: number; theta: number; vega: number; rho: number };

function optionModel(type: OptionType, spot: number, strike: number, days: number, volatility: number, rate: number, dividendYield: number): OptionModel {
  const time = Math.max(days, 0) / 365;
  const sigma = Math.max(volatility, 0) / 100;
  const riskFree = rate / 100;
  const dividend = dividendYield / 100;
  if (!(spot > 0) || !(strike > 0) || !Number.isFinite(time) || !Number.isFinite(sigma)) {
    return { price: NaN, delta: NaN, gamma: NaN, theta: NaN, vega: NaN, rho: NaN };
  }
  const intrinsic = type === "call" ? Math.max(spot - strike, 0) : Math.max(strike - spot, 0);
  if (time === 0 || sigma === 0) {
    return { price: intrinsic, delta: type === "call" ? (spot > strike ? 1 : 0) : (spot < strike ? -1 : 0), gamma: 0, theta: 0, vega: 0, rho: 0 };
  }
  const rootTime = Math.sqrt(time);
  const d1 = (Math.log(spot / strike) + (riskFree - dividend + 0.5 * sigma * sigma) * time) / (sigma * rootTime);
  const d2 = d1 - sigma * rootTime;
  const discountRate = Math.exp(-riskFree * time);
  const discountDividend = Math.exp(-dividend * time);
  const price = type === "call"
    ? spot * discountDividend * normalCdf(d1) - strike * discountRate * normalCdf(d2)
    : strike * discountRate * normalCdf(-d2) - spot * discountDividend * normalCdf(-d1);
  const delta = type === "call" ? discountDividend * normalCdf(d1) : discountDividend * (normalCdf(d1) - 1);
  const gamma = discountDividend * normalPdf(d1) / (spot * sigma * rootTime);
  const thetaBase = -(spot * discountDividend * normalPdf(d1) * sigma) / (2 * rootTime);
  const theta = type === "call"
    ? thetaBase - riskFree * strike * discountRate * normalCdf(d2) + dividend * spot * discountDividend * normalCdf(d1)
    : thetaBase + riskFree * strike * discountRate * normalCdf(-d2) - dividend * spot * discountDividend * normalCdf(-d1);
  const vega = spot * discountDividend * normalPdf(d1) * rootTime / 100;
  const rho = type === "call" ? strike * time * discountRate * normalCdf(d2) / 100 : -strike * time * discountRate * normalCdf(-d2) / 100;
  return { price, delta, gamma, theta: theta / 365, vega, rho };
}

function OptionsStrategyCalculator() {
  const [spot, setSpot] = useState(100);
  const [targetSpot, setTargetSpot] = useState(110);
  const [days, setDays] = useState(45);
  const [volatility, setVolatility] = useState(30);
  const [rate, setRate] = useState(4.5);
  const [dividendYield, setDividendYield] = useState(0);
  const [legs, setLegs] = useState<OptionLeg[]>([
    { enabled: true, type: "call", position: "long", strike: 100, premium: 3, contracts: 1 },
    { enabled: false, type: "call", position: "short", strike: 110, premium: 1, contracts: 1 },
    { enabled: false, type: "put", position: "long", strike: 90, premium: 2, contracts: 1 },
    { enabled: false, type: "put", position: "short", strike: 80, premium: 1, contracts: 1 },
  ]);

  function updateLeg<K extends keyof OptionLeg>(index: number, key: K, value: OptionLeg[K]) {
    setLegs((current) => current.map((leg, legIndex) => legIndex === index ? { ...leg, [key]: value } : leg));
  }

  const stats = legs.filter((leg) => leg.enabled).map((leg) => {
    const model = optionModel(leg.type, spot, leg.strike, days, volatility, rate, dividendYield);
    const direction = leg.position === "long" ? 1 : -1;
    const multiplier = leg.contracts * 100 * direction;
    const intrinsic = leg.type === "call" ? Math.max(targetSpot - leg.strike, 0) : Math.max(leg.strike - targetSpot, 0);
    return {
      currentPnl: (model.price - leg.premium) * multiplier,
      expiryPnl: (intrinsic - leg.premium) * multiplier,
      delta: model.delta * multiplier,
      gamma: model.gamma * multiplier,
      theta: model.theta * multiplier,
      vega: model.vega * multiplier,
      rho: model.rho * multiplier,
    };
  });
  const total = stats.reduce((sum, item) => ({
    currentPnl: sum.currentPnl + item.currentPnl,
    expiryPnl: sum.expiryPnl + item.expiryPnl,
    delta: sum.delta + item.delta,
    gamma: sum.gamma + item.gamma,
    theta: sum.theta + item.theta,
    vega: sum.vega + item.vega,
    rho: sum.rho + item.rho,
  }), { currentPnl: 0, expiryPnl: 0, delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0 });

  return <>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <NumberField label="Current underlying price" value={spot} onChange={setSpot} step="0.01" />
      <NumberField label="Target price at expiry" value={targetSpot} onChange={setTargetSpot} step="0.01" />
      <NumberField label="Days to expiry" value={days} onChange={setDays} step="1" />
      <NumberField label="Implied volatility assumption" value={volatility} onChange={setVolatility} step="0.1" suffix="%" />
      <NumberField label="Risk-free rate assumption" value={rate} onChange={setRate} step="0.01" suffix="%" />
      <NumberField label="Dividend yield assumption" value={dividendYield} onChange={setDividendYield} step="0.01" suffix="%" />
    </div>
    <div className="mt-6 space-y-4">
      {legs.map((leg, index) => <div key={index} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <label className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
          <input type="checkbox" checked={leg.enabled} onChange={(event) => updateLeg(index, "enabled", event.target.checked)} />
          Use leg {index + 1}
        </label>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <SelectField label="Type" value={leg.type} onChange={(value) => updateLeg(index, "type", value as OptionType)} options={[{ label: "Call", value: "call" }, { label: "Put", value: "put" }]} />
          <SelectField label="Position" value={leg.position} onChange={(value) => updateLeg(index, "position", value as OptionPosition)} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} />
          <NumberField label="Strike" value={leg.strike} onChange={(value) => updateLeg(index, "strike", value)} step="0.01" />
          <NumberField label="Premium per unit" value={leg.premium} onChange={(value) => updateLeg(index, "premium", value)} step="0.01" />
          <NumberField label="Contracts" value={leg.contracts} onChange={(value) => updateLeg(index, "contracts", value)} step="1" />
        </div>
      </div>)}
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Theoretical P&L now" value={formatNumber(total.currentPnl)} />
      <Result label="Expiry P&L at target" value={formatNumber(total.expiryPnl)} />
      <Result label="Net delta" value={formatNumber(total.delta, 4)} />
      <Result label="Net gamma" value={formatNumber(total.gamma, 4)} />
      <Result label="Net theta / day" value={formatNumber(total.theta)} />
      <Result label="Net vega / 1% IV" value={formatNumber(total.vega)} />
      <Result label="Net rho / 1% rate" value={formatNumber(total.rho)} />
    </div>
    <Notice>The prefilled figures are example inputs, not live quotes. Black–Scholes is a theoretical model using a 100-share contract multiplier. Enter the current option premium and IV from your broker for a closer estimate. It does not fetch live option-chain data, predict future IV, model early exercise, American exercise, assignment, bid/ask spread, or fees. Greeks and expiry P&L are estimates, not a probability or trading signal.</Notice>
  </>;
}

function DividendDripCalculator() {
  const [initial, setInitial] = useState(10000);
  const [price, setPrice] = useState(100);
  const [dividendPerShare, setDividendPerShare] = useState(3);
  const [dividendGrowth, setDividendGrowth] = useState(4);
  const [priceGrowth, setPriceGrowth] = useState(5);
  const [contribution, setContribution] = useState(250);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState("12");
  const [reinvest, setReinvest] = useState(true);
  const periodsPerYear = Number(frequency);
  const periods = Math.max(0, Math.floor(years * periodsPerYear));
  let shares = price > 0 ? initial / price : 0;
  let currentPrice = price;
  let currentDividend = dividendPerShare;
  let cashDividends = 0;
  let totalContributed = initial;
  for (let period = 1; period <= periods; period += 1) {
    const dividend = shares * currentDividend / periodsPerYear;
    cashDividends += dividend;
    if (reinvest && currentPrice > 0) shares += dividend / currentPrice;
    if (contribution > 0 && currentPrice > 0) {
      shares += contribution / currentPrice;
      totalContributed += contribution;
    }
    if (period % periodsPerYear === 0) {
      currentPrice *= 1 + priceGrowth / 100;
      currentDividend *= 1 + dividendGrowth / 100;
    }
  }
  const endingValue = shares * currentPrice + (reinvest ? 0 : cashDividends);
  const annualIncome = shares * currentDividend;

  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Initial investment" value={initial} onChange={setInitial} step="0.01" />
      <NumberField label="Starting share price" value={price} onChange={setPrice} step="0.01" />
      <NumberField label="Annual dividend per share" value={dividendPerShare} onChange={setDividendPerShare} step="0.0001" />
      <NumberField label="Dividend growth assumption" value={dividendGrowth} onChange={setDividendGrowth} step="0.1" min="-100" suffix="% / year" />
      <NumberField label="Share-price growth assumption" value={priceGrowth} onChange={setPriceGrowth} step="0.1" min="-100" suffix="% / year" />
      <NumberField label="Regular contribution" value={contribution} onChange={setContribution} step="0.01" />
      <NumberField label="Time period" value={years} onChange={setYears} step="1" suffix="years" />
      <SelectField label="Dividend/contribution frequency" value={frequency} onChange={setFrequency} options={[{ label: "Monthly", value: "12" }, { label: "Quarterly", value: "4" }, { label: "Annually", value: "1" }]} />
    </div>
    <label className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"><input type="checkbox" checked={reinvest} onChange={(event) => setReinvest(event.target.checked)} /> Reinvest dividends</label>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Ending portfolio value" value={formatNumber(endingValue)} />
      <Result label="Ending shares" value={formatNumber(shares, 6)} />
      <Result label="Annual dividend at end" value={formatNumber(annualIncome)} />
      <Result label="Total contributed" value={formatNumber(totalContributed)} />
    </div>
    <Notice>This is a deterministic projection using constant user assumptions and end-of-period contributions. It excludes taxes, withholding, fees, dividend cuts, price volatility, splits, and currency conversion. Returns are not guaranteed.</Notice>
  </>;
}

function FuturesPositionCalculator() {
  const [account, setAccount] = useState(25000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [entry, setEntry] = useState(5000);
  const [stop, setStop] = useState(4950);
  const [tickSize, setTickSize] = useState(0.25);
  const [tickValue, setTickValue] = useState(12.5);
  const [pointValue, setPointValue] = useState(50);
  const [roundTripFees, setRoundTripFees] = useState(0);
  const [marginPerContract, setMarginPerContract] = useState(15000);
  const riskAmount = Math.max(account, 0) * Math.max(riskPercent, 0) / 100;
  const stopTicks = tickSize > 0 ? Math.abs(entry - stop) / tickSize : NaN;
  const riskPerContract = Number.isFinite(stopTicks) ? stopTicks * Math.max(tickValue, 0) + Math.max(roundTripFees, 0) : NaN;
  const contracts = riskPerContract > 0 ? Math.floor(riskAmount / riskPerContract) : NaN;
  const notional = Number.isFinite(contracts) ? contracts * Math.abs(entry) * Math.max(pointValue, 0) : NaN;
  const margin = Number.isFinite(contracts) ? contracts * Math.max(marginPerContract, 0) : NaN;

  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Account balance" value={account} onChange={setAccount} step="0.01" />
      <NumberField label="Risk per trade" value={riskPercent} onChange={setRiskPercent} step="0.1" suffix="%" />
      <NumberField label="Entry price" value={entry} onChange={setEntry} step="0.01" />
      <NumberField label="Stop price" value={stop} onChange={setStop} step="0.01" />
      <NumberField label="Tick size" value={tickSize} onChange={setTickSize} step="0.000001" />
      <NumberField label="Tick value per contract" value={tickValue} onChange={setTickValue} step="0.01" />
      <NumberField label="Point value per contract" value={pointValue} onChange={setPointValue} step="0.01" />
      <NumberField label="Round-trip fees per contract" value={roundTripFees} onChange={setRoundTripFees} step="0.01" />
      <NumberField label="Margin per contract" value={marginPerContract} onChange={setMarginPerContract} step="0.01" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Risk budget" value={formatNumber(riskAmount)} />
      <Result label="Risk per contract" value={formatNumber(riskPerContract)} />
      <Result label="Whole contracts" value={Number.isFinite(contracts) ? contracts.toString() : "—"} />
      <Result label="Stop distance" value={`${formatNumber(stopTicks, 2)} ticks`} />
      <Result label="Position notional" value={formatNumber(notional)} />
      <Result label="Estimated margin" value={formatNumber(margin)} />
    </div>
    <Notice>Uses whole contracts and your entered tick/point specifications; the prefilled contract values are examples only. Confirm the exact contract specification, intraday/overnight margin, fees, slippage, price limits, and liquidation rules with your futures broker or exchange.</Notice>
  </>;
}

type FilingStatus = "single" | "mfj" | "mfs" | "hoh";
const ordinaryBrackets2026: Record<FilingStatus, Array<[number, number]>> = {
  single: [[12400, 0.10], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [640600, 0.35], [Infinity, 0.37]],
  mfj: [[24800, 0.10], [100800, 0.12], [211400, 0.22], [403550, 0.24], [512450, 0.32], [768700, 0.35], [Infinity, 0.37]],
  mfs: [[12400, 0.10], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [384350, 0.35], [Infinity, 0.37]],
  hoh: [[17700, 0.10], [67450, 0.12], [105700, 0.22], [201750, 0.24], [256200, 0.32], [640600, 0.35], [Infinity, 0.37]],
};
const capitalGainsThresholds2026: Record<FilingStatus, { zero: number; fifteen: number; niit: number }> = {
  single: { zero: 49450, fifteen: 545500, niit: 200000 },
  mfj: { zero: 98900, fifteen: 613700, niit: 250000 },
  mfs: { zero: 49450, fifteen: 306850, niit: 125000 },
  hoh: { zero: 66200, fifteen: 579600, niit: 200000 },
};

function taxFromBrackets(income: number, brackets: Array<[number, number]>) {
  let previous = 0;
  let total = 0;
  for (const [upper, rate] of brackets) {
    const taxable = Math.max(0, Math.min(income, upper) - previous);
    total += taxable * rate;
    previous = upper;
    if (income <= upper) break;
  }
  return total;
}

function taxOnLongTermGain(start: number, end: number, zeroThreshold: number, fifteenThreshold: number) {
  const zeroPortion = Math.max(0, Math.min(end, zeroThreshold) - Math.min(start, zeroThreshold));
  const fifteenPortion = Math.max(0, Math.min(end, fifteenThreshold) - Math.max(start, zeroThreshold));
  const twentyPortion = Math.max(0, end - Math.max(start, fifteenThreshold));
  return zeroPortion * 0 + fifteenPortion * 0.15 + twentyPortion * 0.20;
}

function USCapitalGainsCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [holdingPeriod, setHoldingPeriod] = useState("long");
  const [proceeds, setProceeds] = useState(25000);
  const [basis, setBasis] = useState(15000);
  const [sellingCosts, setSellingCosts] = useState(0);
  const [lossOffset, setLossOffset] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(100000);
  const [stateRate, setStateRate] = useState(0);
  const [includeNiit, setIncludeNiit] = useState(false);
  const gainBeforeLosses = proceeds - basis - sellingCosts;
  const netGain = Math.max(0, gainBeforeLosses - Math.max(lossOffset, 0));
  const thresholds = capitalGainsThresholds2026[filingStatus];
  const federalTax = holdingPeriod === "long"
    ? taxOnLongTermGain(Math.max(0, taxableIncome), Math.max(0, taxableIncome) + netGain, thresholds.zero, thresholds.fifteen)
    : taxFromBrackets(Math.max(0, taxableIncome) + netGain, ordinaryBrackets2026[filingStatus]) - taxFromBrackets(Math.max(0, taxableIncome), ordinaryBrackets2026[filingStatus]);
  const stateTax = netGain * Math.max(stateRate, 0) / 100;
  const niitBase = Math.min(netGain, Math.max(0, taxableIncome + netGain - thresholds.niit));
  const niit = includeNiit ? niitBase * 0.038 : 0;

  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <SelectField label="Filing status" value={filingStatus} onChange={(value) => setFilingStatus(value as FilingStatus)} options={[{ label: "Single", value: "single" }, { label: "Married filing jointly", value: "mfj" }, { label: "Married filing separately", value: "mfs" }, { label: "Head of household", value: "hoh" }]} />
      <SelectField label="Holding period" value={holdingPeriod} onChange={setHoldingPeriod} options={[{ label: "Long-term: more than 1 year", value: "long" }, { label: "Short-term: 1 year or less", value: "short" }]} />
      <NumberField label="Sale proceeds" value={proceeds} onChange={setProceeds} step="0.01" />
      <NumberField label="Cost basis" value={basis} onChange={setBasis} step="0.01" />
      <NumberField label="Selling costs" value={sellingCosts} onChange={setSellingCosts} step="0.01" />
      <NumberField label="Losses used to offset gain" value={lossOffset} onChange={setLossOffset} step="0.01" />
      <NumberField label="Taxable income before this gain" value={taxableIncome} onChange={setTaxableIncome} step="0.01" />
      <NumberField label="Estimated state tax rate" value={stateRate} onChange={setStateRate} step="0.01" suffix="%" />
    </div>
    <label className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"><input type="checkbox" checked={includeNiit} onChange={(event) => setIncludeNiit(event.target.checked)} /> Include 3.8% Net Investment Income Tax if applicable</label>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Realized gain / loss" value={formatNumber(gainBeforeLosses)} />
      <Result label="Taxable gain after offsets" value={formatNumber(netGain)} />
      <Result label="Estimated federal tax" value={formatNumber(federalTax)} />
      <Result label="Estimated state tax" value={formatNumber(stateTax)} />
      <Result label="Estimated total tax" value={formatNumber(federalTax + stateTax + niit)} />
    </div>
    <Notice>Uses 2026 federal reference thresholds from IRS guidance and your taxable-income input. State tax, deductions, qualified dividends, AMT, wash sales, collectibles, depreciation recapture, NIIT eligibility, and special asset rules can change the result. The tax year is fixed to 2026 and must be updated when new IRS tables apply. This is an estimate, not tax advice or a filing calculation.</Notice>
  </>;
}

function AtrPositionSizeCalculator() {
  const [account, setAccount] = useState(25000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [price, setPrice] = useState(100);
  const [atr, setAtr] = useState(2.5);
  const [multiplier, setMultiplier] = useState(1.5);
  const [valuePerPoint, setValuePerPoint] = useState(1);
  const [targetMultiple, setTargetMultiple] = useState(2);
  const riskBudget = Math.max(account, 0) * Math.max(riskPercent, 0) / 100;
  const stopDistance = Math.max(atr, 0) * Math.max(multiplier, 0);
  const units = stopDistance > 0 && valuePerPoint > 0 ? riskBudget / (stopDistance * valuePerPoint) : NaN;
  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Account balance" value={account} onChange={setAccount} step="0.01" />
      <NumberField label="Risk per trade" value={riskPercent} onChange={setRiskPercent} step="0.1" suffix="%" />
      <NumberField label="Entry price" value={price} onChange={setPrice} step="0.01" />
      <NumberField label="ATR value" value={atr} onChange={setAtr} step="0.01" />
      <NumberField label="Stop distance multiplier" value={multiplier} onChange={setMultiplier} step="0.1" suffix="× ATR" />
      <NumberField label="Value per price point" value={valuePerPoint} onChange={setValuePerPoint} step="0.01" />
      <NumberField label="Target distance" value={targetMultiple} onChange={setTargetMultiple} step="0.1" suffix="× risk" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Risk budget" value={formatNumber(riskBudget)} />
      <Result label="ATR stop distance" value={formatNumber(stopDistance)} />
      <Result label="Estimated units" value={formatNumber(units, 4)} />
      <Result label="Stop price" value={formatNumber(price - stopDistance)} />
      <Result label="Target price" value={formatNumber(price + stopDistance * Math.max(targetMultiple, 0))} />
    </div>
    <Notice>ATR is a volatility measure, not a stop-loss recommendation. This estimate assumes one-sided risk, constant value per point, and no gap, spread, commission, or slippage.</Notice>
  </>;
}

function ExpectancyProfitFactorCalculator() {
  const [winRate, setWinRate] = useState(45);
  const [averageWin, setAverageWin] = useState(2);
  const [averageLoss, setAverageLoss] = useState(1);
  const [costPerTrade, setCostPerTrade] = useState(0.05);
  const [trades, setTrades] = useState(100);
  const winProbability = Math.min(100, Math.max(0, winRate)) / 100;
  const lossProbability = 1 - winProbability;
  const expectancy = winProbability * Math.max(averageWin, 0) - lossProbability * Math.max(averageLoss, 0) - Math.max(costPerTrade, 0);
  const grossLoss = lossProbability * Math.max(averageLoss, 0);
  const profitFactor = grossLoss > 0 ? winProbability * Math.max(averageWin, 0) / grossLoss : NaN;
  const breakEven = (Math.max(averageLoss, 0) + Math.max(costPerTrade, 0)) > 0 ? (Math.max(averageLoss, 0) + Math.max(costPerTrade, 0)) / (Math.max(averageWin, 0) + Math.max(averageLoss, 0)) * 100 : NaN;
  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Win rate" value={winRate} onChange={setWinRate} step="0.1" suffix="%" />
      <NumberField label="Average winning trade" value={averageWin} onChange={setAverageWin} step="0.01" suffix="R" />
      <NumberField label="Average losing trade" value={averageLoss} onChange={setAverageLoss} step="0.01" suffix="R" />
      <NumberField label="Cost per trade" value={costPerTrade} onChange={setCostPerTrade} step="0.01" suffix="R" />
      <NumberField label="Planned trade count" value={trades} onChange={setTrades} step="1" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Expectancy per trade" value={`${formatNumber(expectancy, 3)} R`} />
      <Result label="Estimated total expectancy" value={`${formatNumber(expectancy * Math.max(trades, 0), 2)} R`} />
      <Result label="Profit factor" value={formatNumber(profitFactor, 3)} />
      <Result label="Break-even win rate" value={`${formatNumber(breakEven, 2)}%`} />
    </div>
    <Notice>Expectancy and profit factor describe assumptions, not future performance. They are most useful when calculated from a sufficiently large, consistently recorded sample after realistic fees and slippage.</Notice>
  </>;
}

function PropFirmDrawdownCalculator() {
  const [startingBalance, setStartingBalance] = useState(100000);
  const [currentEquity, setCurrentEquity] = useState(100000);
  const [dayStartEquity, setDayStartEquity] = useState(100000);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [maxDrawdown, setMaxDrawdown] = useState(10);
  const [plannedRisk, setPlannedRisk] = useState(500);
  const dailyFloor = dayStartEquity * (1 - Math.max(dailyLimit, 0) / 100);
  const maxFloor = startingBalance * (1 - Math.max(maxDrawdown, 0) / 100);
  const dailyBuffer = Math.max(0, currentEquity - dailyFloor);
  const drawdownBuffer = Math.max(0, currentEquity - maxFloor);
  const safeNextRisk = Math.max(0, Math.min(dailyBuffer, drawdownBuffer));
  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Starting account balance" value={startingBalance} onChange={setStartingBalance} step="0.01" />
      <NumberField label="Current equity" value={currentEquity} onChange={setCurrentEquity} step="0.01" />
      <NumberField label="Today's starting equity" value={dayStartEquity} onChange={setDayStartEquity} step="0.01" />
      <NumberField label="Daily loss limit" value={dailyLimit} onChange={setDailyLimit} step="0.1" suffix="%" />
      <NumberField label="Maximum drawdown" value={maxDrawdown} onChange={setMaxDrawdown} step="0.1" suffix="%" />
      <NumberField label="Planned next-trade risk" value={plannedRisk} onChange={setPlannedRisk} step="0.01" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Daily loss buffer" value={formatNumber(dailyBuffer)} />
      <Result label="Maximum drawdown buffer" value={formatNumber(drawdownBuffer)} />
      <Result label="Suggested maximum next risk" value={formatNumber(safeNextRisk)} />
      <Result label="After planned risk" value={formatNumber(Math.max(0, safeNextRisk - Math.max(plannedRisk, 0)))} />
    </div>
    <Notice>Funded-account firms use different static, trailing, equity-based, news, consistency, and payout rules. Enter the exact rule values from your provider and verify them before trading.</Notice>
  </>;
}

function CryptoLiquidationCalculator() {
  const [entry, setEntry] = useState(60000);
  const [quantity, setQuantity] = useState(0.1);
  const [leverage, setLeverage] = useState(10);
  const [maintenance, setMaintenance] = useState(0.5);
  const [fee, setFee] = useState(0.05);
  const [funding, setFunding] = useState(0.01);
  const [hours, setHours] = useState(24);
  const [target, setTarget] = useState(63000);
  const [direction, setDirection] = useState("long");
  const notional = Math.max(entry, 0) * Math.max(quantity, 0);
  const initialMargin = leverage > 0 ? notional / leverage : NaN;
  const maintenanceRate = Math.max(maintenance, 0) / 100;
  const liquidation = direction === "long" ? entry * (1 - 1 / Math.max(leverage, 0.01) + maintenanceRate) : entry * (1 + 1 / Math.max(leverage, 0.01) - maintenanceRate);
  const grossPnl = direction === "long" ? (target - entry) * quantity : (entry - target) * quantity;
  const tradingFees = notional * Math.max(fee, 0) / 100 * 2;
  const fundingCost = notional * Math.max(funding, 0) / 100 * Math.max(hours, 0) / 8;
  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <SelectField label="Direction" value={direction} onChange={setDirection} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} />
      <NumberField label="Entry price" value={entry} onChange={setEntry} step="0.01" />
      <NumberField label="Position quantity" value={quantity} onChange={setQuantity} step="0.0001" />
      <NumberField label="Leverage" value={leverage} onChange={setLeverage} step="0.1" suffix="×" />
      <NumberField label="Maintenance margin" value={maintenance} onChange={setMaintenance} step="0.01" suffix="%" />
      <NumberField label="Round-trip fee rate" value={fee} onChange={setFee} step="0.001" suffix="%" />
      <NumberField label="Funding rate per 8 hours" value={funding} onChange={setFunding} step="0.001" suffix="%" />
      <NumberField label="Holding period" value={hours} onChange={setHours} step="1" suffix="hours" />
      <NumberField label="Target price" value={target} onChange={setTarget} step="0.01" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Initial margin" value={formatNumber(initialMargin)} />
      <Result label="Estimated liquidation price" value={formatNumber(liquidation)} />
      <Result label="Gross P&L at target" value={formatNumber(grossPnl)} />
      <Result label="Fees + funding" value={formatNumber(tradingFees + fundingCost)} />
      <Result label="Estimated net P&L" value={formatNumber(grossPnl - tradingFees - fundingCost)} />
    </div>
    <Notice>This is a simplified isolated-margin estimate. Exchange maintenance tiers, mark price, insurance funds, partial liquidation, fees, and funding rules can materially change the actual liquidation price.</Notice>
  </>;
}

function OptionsProbabilityCalculator() {
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [premium, setPremium] = useState(5);
  const [volatility, setVolatility] = useState(25);
  const [days, setDays] = useState(45);
  const [rate, setRate] = useState(4.5);
  const [dividend, setDividend] = useState(0);
  const [type, setType] = useState("call");
  const [position, setPosition] = useState("long");
  const [contracts, setContracts] = useState(1);
  const time = Math.max(days, 0) / 365;
  const sigma = Math.max(volatility, 0.01) / 100;
  const breakeven = type === "call" ? strike + premium : strike - premium;
  const d2 = time > 0 ? (Math.log(Math.max(spot, 0.0001) / Math.max(breakeven, 0.0001)) + ((rate - dividend) / 100 - 0.5 * sigma ** 2) * time) / (sigma * Math.sqrt(time)) : NaN;
  const longProbability = type === "call" ? normalCdf(d2) : normalCdf(-d2);
  const probability = position === "long" ? longProbability : 1 - longProbability;
  const expectedValue = (probability * Math.max(premium, 0) - (1 - probability) * Math.max(premium, 0)) * 100 * Math.max(contracts, 0);
  return <>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <SelectField label="Option type" value={type} onChange={setType} options={[{ label: "Call", value: "call" }, { label: "Put", value: "put" }]} />
      <SelectField label="Position" value={position} onChange={setPosition} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} />
      <NumberField label="Underlying price" value={spot} onChange={setSpot} step="0.01" />
      <NumberField label="Strike price" value={strike} onChange={setStrike} step="0.01" />
      <NumberField label="Premium per share" value={premium} onChange={setPremium} step="0.01" />
      <NumberField label="Implied volatility" value={volatility} onChange={setVolatility} step="0.1" suffix="%" />
      <NumberField label="Days to expiry" value={days} onChange={setDays} step="1" />
      <NumberField label="Risk-free rate" value={rate} onChange={setRate} step="0.01" suffix="%" />
      <NumberField label="Dividend yield" value={dividend} onChange={setDividend} step="0.01" suffix="%" />
      <NumberField label="Contracts" value={contracts} onChange={setContracts} step="1" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Break-even price" value={formatNumber(breakeven)} />
      <Result label="Estimated probability of profit" value={`${formatNumber(probability * 100, 2)}%`} />
      <Result label="Estimated probability of loss" value={`${formatNumber((1 - probability) * 100, 2)}%`} />
      <Result label="Simple expected value" value={formatNumber(expectedValue)} />
    </div>
    <Notice>Probability uses a simplified Black–Scholes risk-neutral estimate for one option leg and assumes constant volatility. It does not model early exercise, assignment, skew, dividends accurately, bid/ask spread, fees, or trading signals.</Notice>
  </>;
}

function NetTradingCostCalculator() {
  const [direction, setDirection] = useState("long");
  const [entry, setEntry] = useState(100);
  const [exit, setExit] = useState(105);
  const [units, setUnits] = useState(100);
  const [commission, setCommission] = useState(10);
  const [spread, setSpread] = useState(5);
  const [slippage, setSlippage] = useState(5);
  const [holdingCost, setHoldingCost] = useState(2);
  const [tax, setTax] = useState(0);
  const gross = (direction === "long" ? exit - entry : entry - exit) * units;
  const totalCost = Math.max(commission, 0) + Math.max(spread, 0) + Math.max(slippage, 0) + Math.max(holdingCost, 0) + Math.max(tax, 0);
  const net = gross - totalCost;
  const requiredMove = units > 0 ? totalCost / units : NaN;
  const breakEvenExit = direction === "long" ? entry + requiredMove : entry - requiredMove;
  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <SelectField label="Direction" value={direction} onChange={setDirection} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} />
      <NumberField label="Position size" value={units} onChange={setUnits} step="0.01" suffix="units" />
      <NumberField label="Entry price" value={entry} onChange={setEntry} step="0.01" />
      <NumberField label="Exit price" value={exit} onChange={setExit} step="0.01" />
      <NumberField label="Round-trip commission" value={commission} onChange={setCommission} step="0.01" />
      <NumberField label="Spread cost" value={spread} onChange={setSpread} step="0.01" />
      <NumberField label="Slippage cost" value={slippage} onChange={setSlippage} step="0.01" />
      <NumberField label="Swap / funding cost" value={holdingCost} onChange={setHoldingCost} step="0.01" />
      <NumberField label="Taxes or other costs" value={tax} onChange={setTax} step="0.01" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Gross P&L" value={formatNumber(gross)} />
      <Result label="Total trading cost" value={formatNumber(totalCost)} />
      <Result label="Net P&L" value={formatNumber(net)} />
      <Result label="Break-even exit price" value={formatNumber(breakEvenExit)} />
    </div>
    <Notice>Enter costs in the same account-currency units as your gross P&L. Actual fees, taxes, financing, spread, and slippage vary by instrument, venue, broker, and jurisdiction.</Notice>
  </>;
}

function PortfolioRiskAllocationCalculator() {
  const [account, setAccount] = useState(50000);
  const [riskA, setRiskA] = useState(300);
  const [riskB, setRiskB] = useState(250);
  const [riskC, setRiskC] = useState(150);
  const [exposureA, setExposureA] = useState(10000);
  const [exposureB, setExposureB] = useState(7500);
  const [exposureC, setExposureC] = useState(5000);
  const [correlation, setCorrelation] = useState(0.4);
  const risks = [Math.max(riskA, 0), Math.max(riskB, 0), Math.max(riskC, 0)];
  const exposures = [Math.max(exposureA, 0), Math.max(exposureB, 0), Math.max(exposureC, 0)];
  const grossRisk = risks.reduce((sum, value) => sum + value, 0);
  const adjustedVariance = risks.reduce((sum, value) => sum + value ** 2, 0) + 2 * Math.max(-1, Math.min(1, correlation)) * (risks[0] * risks[1] + risks[0] * risks[2] + risks[1] * risks[2]);
  const adjustedRisk = Math.sqrt(Math.max(0, adjustedVariance));
  const totalExposure = exposures.reduce((sum, value) => sum + value, 0);
  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <NumberField label="Account value" value={account} onChange={setAccount} step="0.01" />
      <NumberField label="Average pairwise correlation" value={correlation} onChange={setCorrelation} step="0.01" min="-1" max="1" />
      <NumberField label="Position A risk" value={riskA} onChange={setRiskA} step="0.01" />
      <NumberField label="Position A exposure" value={exposureA} onChange={setExposureA} step="0.01" />
      <NumberField label="Position B risk" value={riskB} onChange={setRiskB} step="0.01" />
      <NumberField label="Position B exposure" value={exposureB} onChange={setExposureB} step="0.01" />
      <NumberField label="Position C risk" value={riskC} onChange={setRiskC} step="0.01" />
      <NumberField label="Position C exposure" value={exposureC} onChange={setExposureC} step="0.01" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Result label="Gross portfolio risk" value={formatNumber(grossRisk)} />
      <Result label="Correlation-adjusted risk" value={formatNumber(adjustedRisk)} />
      <Result label="Risk as % of account" value={`${formatNumber(account > 0 ? adjustedRisk / account * 100 : NaN, 2)}%`} />
      <Result label="Total exposure" value={formatNumber(totalExposure)} />
    </div>
    <Notice>This uses one average correlation for three positions, so it is a planning estimate rather than a full covariance model. Correlations can change during stress and do not remove gap or liquidity risk.</Notice>
  </>;
}

const calculatorComponents: Record<CalculatorSlug, () => ReactNode> = {
  "pip-value": PipValueCalculator,
  "position-size": PositionSizeCalculator,
  "forex-pnl": ForexPnlCalculator,
  "forex-margin": ForexMarginCalculator,
  "currency-converter": CurrencyConverter,
  "crypto-profit": CryptoProfitCalculator,
  "options-payoff": OptionsPayoffCalculator,
  brokerage: BrokerageCalculator,
  "pivot-points": PivotPointsCalculator,
  "risk-reward": RiskRewardCalculator,
  "compound-returns": CompoundReturnsCalculator,
  "dca-average-price": DcaAveragePriceCalculator,
  "drawdown-recovery": DrawdownRecoveryCalculator,
  "currency-correlation": CurrencyCorrelationCalculator,
  "currency-strength": CurrencyStrengthCalculator,
  "market-hours": MarketHoursCalculator,
  "economic-calendar": EconomicCalendarCalculator,
  "stock-profit": StockProfitCalculator,
  "options-strategy": OptionsStrategyCalculator,
  "dividend-drip": DividendDripCalculator,
  "futures-position": FuturesPositionCalculator,
  "us-capital-gains": USCapitalGainsCalculator,
  "atr-position-size": AtrPositionSizeCalculator,
  "expectancy-profit-factor": ExpectancyProfitFactorCalculator,
  "prop-firm-drawdown": PropFirmDrawdownCalculator,
  "crypto-liquidation": CryptoLiquidationCalculator,
  "options-probability": OptionsProbabilityCalculator,
  "net-trading-cost": NetTradingCostCalculator,
  "portfolio-risk-allocation": PortfolioRiskAllocationCalculator,
};

function CalculatorPdfButton({ title }: { title: string }) {
  const downloadPdf = () => {
    const source = document.querySelector<HTMLElement>("[data-calculator-report]");
    if (!source) return;
    const report = source.cloneNode(true) as HTMLElement;
    report.querySelectorAll("button").forEach((button) => button.remove());
    report.querySelectorAll("input, select, textarea").forEach((control) => {
      const element = control as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const value = element instanceof HTMLSelectElement ? element.selectedOptions[0]?.textContent || element.value : element.value;
      const replacement = document.createElement("span");
      replacement.textContent = value || "—";
      replacement.className = "pdf-control-value";
      element.replaceWith(replacement);
    });
    const reportWindow = window.open("", "_blank", "width=1100,height=850");
    if (!reportWindow) return;
    reportWindow.document.write(`<!doctype html><html><head><title>Tradivex ${escapeHtmlValue(title)} Report</title><style>
      *{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#172033;margin:34px;line-height:1.45}h1{margin:0 0 6px;color:#2563eb;font-size:25px}h2,h3{color:#172033}p{color:#536174}.pdf-meta{font-size:12px;color:#64748b;margin-bottom:22px}.pdf-control-value{display:block;border:1px solid #dbe2ea;border-radius:7px;padding:9px;background:#f8fafc;color:#172033;min-height:36px}table{border-collapse:collapse;width:100%;font-size:11px}th{background:#eff6ff;color:#1d4ed8;text-align:left}th,td{border:1px solid #dbe2ea;padding:7px}button{display:none!important}svg{max-width:100%;height:auto}.disclaimer{font-size:10px;margin-top:24px;color:#64748b}@media print{body{margin:18px}a{color:inherit;text-decoration:none}}</style></head><body><h1>Tradivex ${escapeHtmlValue(title)} Report</h1><div class="pdf-meta">Generated ${escapeHtmlValue(new Date().toLocaleString())} · Educational estimate based on the inputs shown below</div>${report.innerHTML}<p class="disclaimer">This report is for informational and educational purposes only. It is not financial advice, a trade signal, or a guarantee of results. Verify market data, fees, spreads, taxes, and execution assumptions independently.</p></body></html>`);
    reportWindow.document.close();
    reportWindow.focus();
    window.setTimeout(() => reportWindow.print(), 250);
  };

  return <button type="button" onClick={downloadPdf} className="mb-5 inline-flex min-h-10 items-center rounded-xl border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-400 hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-950/30 dark:text-primary-300 dark:hover:bg-primary-950/60">Download / Save PDF Report</button>;
}

function calculatePositionGreeks(
  legs: StrategyLeg[],
  S: number,
  T: number,
  r: number,
  sigma: number,
  q: number,
  style: 'european' | 'american',
  multiplier: number,
): Greeks {
  return legs.reduce((total, leg) => {
    const result = style === 'american'
      ? binomialAmerican(S, leg.strike, T, r, sigma, leg.type, 80, q)
      : blackScholes(S, leg.strike, T, r, sigma, leg.type, q);
    const sign = leg.position === 'long' ? 1 : -1;
    const scale = sign * Math.max(0, leg.contracts) * multiplier;
    return {
      delta: total.delta + result.greeks.delta * scale,
      gamma: total.gamma + result.greeks.gamma * scale,
      theta: total.theta + result.greeks.theta * scale,
      vega: total.vega + result.greeks.vega * scale,
      rho: total.rho + result.greeks.rho * scale,
    };
  }, { delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0 });
}

export default function CalculatorSuite({ slug }: Props) {
  const definition = calculatorDefinitions.find((calculator) => calculator.slug === slug)!;
  const Calculator = calculatorComponents[slug];
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mb-10">
          <Link href="/calculators" className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:text-primary-300">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all calculators
          </Link>
          <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Tradivex Calculators</p><h1 className="break-words text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">{definition.title}</h1><p className="text-lg text-slate-600 dark:text-slate-400">{definition.description}</p>
        </div>
        <div className="min-w-0 grid gap-8 lg:grid-cols-[1fr_280px] items-start">
          <section data-calculator-report className="glass-card min-w-0 rounded-3xl p-4 sm:p-6 lg:p-8"><CalculatorPdfButton title={definition.title} /><Calculator /></section>
          <aside className="space-y-4"><div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-5"><h2 className="font-bold text-slate-900 dark:text-white mb-3">More calculators</h2><nav className="space-y-2">{calculatorDefinitions.map((item) => <Link key={item.slug} href={`/calculators/${item.slug}`} className={`block rounded-xl px-3 py-2 text-sm transition-colors ${item.slug === slug ? "bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}>{item.shortTitle}</Link>)}</nav></div><div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-sm text-slate-600 dark:text-slate-400">Results are estimates from your inputs. They are not financial advice or a recommendation to trade.</div></aside>
        </div>
      </div>
    </div>
  );
}
