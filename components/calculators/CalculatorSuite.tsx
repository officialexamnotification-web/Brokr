"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { calculatorDefinitions, type CalculatorSlug } from "@/lib/calculators";

type Props = { slug: CalculatorSlug };

const inputClass = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2";

function NumberField({ label, value, onChange, step = "any", min = "0", max, suffix }: { label: string; value: number; onChange: (value: number) => void; step?: string; min?: string; max?: string; suffix?: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <input type="number" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className={inputClass} />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">{suffix}</span>}
      </div>
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

function Result({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 p-5"><p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white break-words">{value}</p>{note && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>}</div>;
}

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function Notice({ children }: { children: ReactNode }) {
  return <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">{children}</div>;
}

const worldCurrencyCodes = [
  "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
  "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
  "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
  "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD",
  "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP",
  "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HTG", "HUF", "IDR", "ILS",
  "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR",
  "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD",
  "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU",
  "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK",
  "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG",
  "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK",
  "SGD", "SHP", "SLE", "SOS", "SRD", "SSP", "STN", "SVC", "SYP", "SZL",
  "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH",
  "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD",
  "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWG",
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
  const getCachedRate = (base: string, target: string): { rate: number; timestamp: number } | null => {
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
  };
  
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
  
  const getCacheDuration = (base: string, target: string): number => {
    // Different cache durations based on pair type
    const majorPairs = ['USD', 'EUR', 'GBP', 'JPY'];
    const isMajor = majorPairs.includes(base) && majorPairs.includes(target);
    
    if (isMajor) {
      return 2 * 60 * 60 * 1000; // 2 hours for major pairs
    } else {
      return 4 * 60 * 60 * 1000; // 4 hours for other pairs
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
  }, [pair, accountCurrency, useAutoRate, quoteCurrency]);
  
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
    <div className="space-y-5">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 items-start">
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
          <div className="mt-3 flex items-center gap-2">
            <input 
              type="checkbox" 
              id="autoRate" 
              checked={useAutoRate} 
              onChange={(e) => setUseAutoRate(e.target.checked)} 
              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="autoRate" className="text-sm text-slate-600 dark:text-slate-400">
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
    </div>
  </>;
}

function PositionSizeCalculator() {
  const [balance, setBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLoss, setStopLoss] = useState(30);
  const [pipValue, setPipValue] = useState(10);
  const riskAmount = balance * riskPercent / 100;
  const lots = riskAmount / (stopLoss * pipValue);
  return <>
    <div className="grid gap-5 md:grid-cols-2"><NumberField label="Account balance" value={balance} onChange={setBalance} step="0.01" /><NumberField label="Risk per trade" value={riskPercent} onChange={setRiskPercent} step="0.1" suffix="%" /><NumberField label="Stop loss" value={stopLoss} onChange={setStopLoss} step="0.1" suffix="pips" /><NumberField label="Pip value per standard lot" value={pipValue} onChange={setPipValue} step="0.01" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Result label="Risk amount" value={formatNumber(riskAmount)} /><Result label="Estimated position size" value={`${formatNumber(lots, 4)} lots`} /><Result label="Approx. units" value={formatNumber(lots * 100000, 0)} /></div>
    <Notice>This is a calculation from your own inputs, not a recommendation of how much to risk. Actual pip value, minimum lot size, and execution loss can differ by instrument and broker.</Notice>
  </>;
}

function ForexPnlCalculator() {
  const [direction, setDirection] = useState("long");
  const [entry, setEntry] = useState(1.085);
  const [exit, setExit] = useState(1.09);
  const [lotSize, setLotSize] = useState(1);
  const [pipValue, setPipValue] = useState(10);
  const [pipSize, setPipSize] = useState(0.0001);
  const pips = (direction === "long" ? exit - entry : entry - exit) / pipSize;
  const pnl = pips * pipValue * lotSize;
  return <>
    <div className="grid gap-5 md:grid-cols-2"><SelectField label="Direction" value={direction} onChange={setDirection} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} /><NumberField label="Position size" value={lotSize} onChange={setLotSize} step="0.01" suffix="lots" /><NumberField label="Entry price" value={entry} onChange={setEntry} step="0.00001" /><NumberField label="Exit price" value={exit} onChange={setExit} step="0.00001" /><NumberField label="Pip value per lot" value={pipValue} onChange={setPipValue} step="0.01" /><SelectField label="Pip size" value={String(pipSize)} onChange={(value) => setPipSize(Number(value))} options={[{ label: "0.0001 (most pairs)", value: "0.0001" }, { label: "0.01 (JPY pairs)", value: "0.01" }]} /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><Result label="Pips" value={formatNumber(pips, 1)} /><Result label="Estimated P&L" value={formatNumber(pnl)} note="In the currency used for your pip value" /></div>
    <Notice>Expiry, spread, commission, swaps, slippage, taxes, and financing are excluded. A negative result represents an estimated loss from the entered prices.</Notice>
  </>;
}

function ForexMarginCalculator() {
  const [units, setUnits] = useState(100000);
  const [entry, setEntry] = useState(1.085);
  const [leverage, setLeverage] = useState(30);
  const [conversion, setConversion] = useState(1);
  const margin = units * entry * conversion / leverage;
  return <>
    <div className="grid gap-5 md:grid-cols-2"><NumberField label="Trade units" value={units} onChange={setUnits} step="1000" /><NumberField label="Entry price" value={entry} onChange={setEntry} step="0.00001" /><NumberField label="Leverage" value={leverage} onChange={setLeverage} step="1" suffix="×" /><NumberField label="Quote currency → account currency" value={conversion} onChange={setConversion} step="0.0001" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><Result label="Estimated required margin" value={formatNumber(margin)} /><Result label="Notional value in account currency" value={formatNumber(units * entry * conversion)} /></div>
    <Notice>This is an illustrative estimate, not a broker quote. Margin rates, leverage limits, hedging rules, liquidation thresholds, and conversion rates vary by broker, instrument, country, and account type.</Notice>
  </>;
}

function OptionsPayoffCalculator() {
  const [optionType, setOptionType] = useState("call");
  const [position, setPosition] = useState("long");
  const [spot, setSpot] = useState(110);
  const [strike, setStrike] = useState(100);
  const [premium, setPremium] = useState(5);
  const [contracts, setContracts] = useState(1);
  const [multiplier, setMultiplier] = useState(100);
  const intrinsic = optionType === "call" ? Math.max(spot - strike, 0) : Math.max(strike - spot, 0);
  const pnlPerUnit = position === "long" ? intrinsic - premium : premium - intrinsic;
  const totalPnl = pnlPerUnit * contracts * multiplier;
  const breakeven = optionType === "call" ? strike + premium : strike - premium;
  return <>
    <div className="grid gap-5 md:grid-cols-2"><SelectField label="Option type" value={optionType} onChange={setOptionType} options={[{ label: "Call", value: "call" }, { label: "Put", value: "put" }]} /><SelectField label="Position" value={position} onChange={setPosition} options={[{ label: "Long", value: "long" }, { label: "Short", value: "short" }]} /><NumberField label="Underlying price at expiry" value={spot} onChange={setSpot} step="0.01" /><NumberField label="Strike price" value={strike} onChange={setStrike} step="0.01" /><NumberField label="Premium per unit" value={premium} onChange={setPremium} step="0.01" /><NumberField label="Contracts" value={contracts} onChange={setContracts} step="1" /><NumberField label="Contract multiplier" value={multiplier} onChange={setMultiplier} step="1" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Result label="Estimated payoff P&L" value={formatNumber(totalPnl)} /><Result label="P&L per unit" value={formatNumber(pnlPerUnit)} /><Result label="Illustrative breakeven" value={formatNumber(breakeven)} /></div>
    <Notice>This model shows intrinsic payoff at expiry only. It excludes time value before expiry, volatility, Greeks, fees, taxes, assignment, settlement, and liquidity.</Notice>
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
  const [low, setLow] = useState(100);
  const [close, setClose] = useState(105);
  const pivot = (high + low + close) / 3;
  const r1 = 2 * pivot - low;
  const s1 = 2 * pivot - high;
  const r2 = pivot + high - low;
  const s2 = pivot - high + low;
  const r3 = high + 2 * (pivot - low);
  const s3 = low - 2 * (high - pivot);
  return <>
    <div className="grid gap-5 md:grid-cols-3"><NumberField label="High" value={high} onChange={setHigh} step="0.01" /><NumberField label="Low" value={low} onChange={setLow} step="0.01" /><NumberField label="Close" value={close} onChange={setClose} step="0.01" /></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Result label="Pivot" value={formatNumber(pivot)} /><Result label="Resistance 1" value={formatNumber(r1)} /><Result label="Support 1" value={formatNumber(s1)} /><Result label="Resistance 2" value={formatNumber(r2)} /><Result label="Support 2" value={formatNumber(s2)} /><Result label="Resistance 3" value={formatNumber(r3)} /><Result label="Support 3" value={formatNumber(s3)} /></div>
    <Notice>Classic pivot levels are deterministic calculations from the entered high, low, and close. They are not forecasts, trade signals, or guarantees of support or resistance.</Notice>
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

export default function CalculatorSuite({ slug }: Props) {
  const definition = calculatorDefinitions.find((calculator) => calculator.slug === slug)!;
  const Calculator = calculatorComponents[slug];
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mb-10"><p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Tradivex Calculators</p><h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">{definition.title}</h1><p className="text-lg text-slate-600 dark:text-slate-400">{definition.description}</p></div>
        <div className="grid gap-8 lg:grid-cols-[1fr_280px] items-start">
          <section className="glass-card rounded-3xl p-6 lg:p-8"><Calculator /></section>
          <aside className="space-y-4"><div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-5"><h2 className="font-bold text-slate-900 dark:text-white mb-3">More calculators</h2><nav className="space-y-2">{calculatorDefinitions.map((item) => <Link key={item.slug} href={`/calculators/${item.slug}`} className={`block rounded-xl px-3 py-2 text-sm transition-colors ${item.slug === slug ? "bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}>{item.shortTitle}</Link>)}</nav></div><div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-sm text-slate-600 dark:text-slate-400">Results are estimates from your inputs. They are not financial advice or a recommendation to trade.</div></aside>
        </div>
      </div>
    </div>
  );
}
