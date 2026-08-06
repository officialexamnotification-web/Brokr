"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { calculatorDefinitions, type CalculatorSlug } from "@/lib/calculators";

type Props = { slug: CalculatorSlug };

const inputClass = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2";

function NumberField({ label, value, onChange, step = "any", min = "0", suffix }: { label: string; value: number; onChange: (value: number) => void; step?: string; min?: string; suffix?: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <input type="number" min={min} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className={inputClass} />
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
  const pipSize = pair.includes("JPY") ? 0.01 : 0.0001;
  const quotePipValue = lotSize * 100000 * pipSize;
  const accountPipValue = quotePipValue * conversion;
  return <>
    <div className="grid gap-5 md:grid-cols-2">
      <SelectField label="Currency pair" value={pair} onChange={setPair} options={["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD", "USD/CHF"].map((value) => ({ label: value, value }))} />
      <SelectField label="Account currency" value={accountCurrency} onChange={setAccountCurrency} options={["USD", "EUR", "GBP", "INR", "AUD", "CAD"].map((value) => ({ label: value, value }))} />
      <NumberField label="Position size" value={lotSize} onChange={setLotSize} step="0.01" suffix="lots" />
      <NumberField label={`Quote currency → ${accountCurrency} rate`} value={conversion} onChange={setConversion} step="0.0001" />
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><Result label="Estimated value per pip" value={`${formatNumber(accountPipValue)} ${accountCurrency}`} note="For the entered lot size" /><Result label="Estimated value for 10 pips" value={`${formatNumber(accountPipValue * 10)} ${accountCurrency}`} /></div>
    <Notice>Formula estimate: standard lot = 100,000 units. For pairs where the quote currency is not your account currency, enter the current quote-to-account conversion rate. Spread, commission, and slippage are excluded.</Notice>
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
