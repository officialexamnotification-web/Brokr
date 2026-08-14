import { NextResponse } from "next/server";
import { isFreshMarketCache, readPersistentMarketCache, writePersistentMarketCache } from "@/lib/market-cache";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const STOCKDATA_BASE = "https://api.stockdata.org/v1";
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000;
const SYMBOLS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "AVGO", "WMT", "JPM", "LLY", "V", "ORCL", "MA", "XOM", "COST", "JNJ", "HD", "PG",
  "NFLX", "AMD", "CRM", "ADBE", "QCOM", "INTC", "CSCO", "IBM", "UBER", "DIS", "KO", "PEP", "MCD", "NKE", "BA", "CAT", "GE", "UNH", "MRK", "PFE",
  "CVX", "TMO", "AMGN", "GS", "MS", "LIN", "RTX", "LOW", "SBUX", "PLTR",
];

type Candle = { date: string; open: number; high: number; low: number; close: number; volume: number | null };
type HistoricalData = Record<string, Candle[]>;

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const authorization = request.headers.get("authorization");
  const provided = authorization?.startsWith("Bearer ") ? authorization.slice(7) : request.headers.get("x-market-sync-key");
  return provided === secret;
}

function startOfDay(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function startOfPeriod(date: Date, timeframe: string) {
  if (timeframe === "monthly") return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  if (timeframe === "weekly") {
    const day = date.getUTCDay();
    const daysFromMonday = day === 0 ? 6 : day - 1;
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() - daysFromMonday);
    return startOfDay(result);
  }
  return startOfDay(date);
}

function aggregate(candles: Candle[], timeframe: string): Candle | null {
  const today = startOfDay();
  const groups = new Map<string, Candle[]>();
  candles.forEach((candle) => {
    const date = new Date(candle.date);
    if (!Number.isFinite(date.getTime())) return;
    const period = startOfPeriod(date, timeframe);
    // Never use the still-forming daily, weekly, or monthly candle.
    if (period >= startOfPeriod(today, timeframe)) return;
    const key = period.toISOString();
    groups.set(key, [...(groups.get(key) || []), candle]);
  });
  const latest = Array.from(groups.entries()).sort(([a], [b]) => b.localeCompare(a))[0]?.[1];
  if (!latest?.length) return null;
  const ordered = [...latest].sort((a, b) => a.date.localeCompare(b.date));
  return {
    date: ordered[ordered.length - 1].date,
    open: ordered[0].open,
    high: Math.max(...ordered.map((candle) => candle.high)),
    low: Math.min(...ordered.map((candle) => candle.low)),
    close: ordered[ordered.length - 1].close,
    volume: ordered.reduce((sum, candle) => sum + (candle.volume || 0), 0) || null,
  };
}

async function refreshHistoricalCache() {
  const apiKey = process.env.STOCKDATA_API_KEY;
  if (!apiKey) throw new Error("STOCKDATA_API_KEY is not configured");
  const dateFrom = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const result: HistoricalData = {};

  // StockData.org's free plan supports small symbol batches. Historical data is
  // refreshed once per day, so this remains far below a per-user request flow.
  for (let index = 0; index < SYMBOLS.length; index += 3) {
    const batch = SYMBOLS.slice(index, index + 3);
    const response = await fetch(`${STOCKDATA_BASE}/data/eod?symbols=${encodeURIComponent(batch.join(","))}&interval=day&sort=asc&date_from=${dateFrom}&api_token=${encodeURIComponent(apiKey)}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Historical stock request failed (${response.status})`);
    const payload = await response.json();
    if (!Array.isArray(payload?.data)) continue;
    payload.data.forEach((item: any) => {
      const symbol = typeof item.ticker === "string" ? item.ticker.toUpperCase() : null;
      const open = Number(item.open), high = Number(item.high), low = Number(item.low), close = Number(item.close);
      if (!symbol || !SYMBOLS.includes(symbol) || !item.date || ![open, high, low, close].every(Number.isFinite)) return;
      (result[symbol] ||= []).push({ date: String(item.date), open, high, low, close, volume: Number.isFinite(Number(item.volume)) ? Number(item.volume) : null });
    });
  }
  await writePersistentMarketCache("stockHistorical", result, "StockData.org EOD");
  return result;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = (searchParams.get("symbol") || "AAPL").toUpperCase();
  const timeframe = searchParams.get("timeframe") || "daily";
  if (!SYMBOLS.includes(symbol) || !["daily", "weekly", "monthly"].includes(timeframe)) {
    return NextResponse.json({ error: "Unsupported stock or timeframe." }, { status: 400 });
  }
  const privateSync = isAuthorized(request);
  let persistent = await readPersistentMarketCache<HistoricalData>("stockHistorical");
  if (privateSync && !isFreshMarketCache(persistent, CACHE_MAX_AGE)) {
    try {
      const data = await refreshHistoricalCache();
      persistent = { data, fetchedAt: new Date().toISOString(), source: "StockData.org EOD" };
    } catch (error) {
      if (!persistent?.data) return NextResponse.json({ error: String(error) }, { status: 502 });
    }
  }
  const candle = persistent?.data ? aggregate(persistent.data[symbol] || [], timeframe) : null;
  if (!candle) return NextResponse.json({ error: "Historical cache is not available yet." }, { status: 503 });
  return NextResponse.json({ symbol, timeframe, candle, fetchedAt: persistent?.fetchedAt, source: persistent?.source }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400", "X-Market-Data-Source": isFreshMarketCache(persistent, CACHE_MAX_AGE) ? "firebase-cache" : "firebase-stale-cache" } });
}
