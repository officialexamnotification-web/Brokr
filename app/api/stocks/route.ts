import { NextResponse } from 'next/server';
import { allowPublicRequest } from "@/lib/public-rate-limit";
import { isFreshMarketCache, readPersistentMarketCache, writePersistentMarketCache } from "@/lib/market-cache";

export const dynamic = "force-dynamic";

const FMP_BASE = "https://financialmodelingprep.com/stable";
const DEFAULT_SYMBOLS = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META", "BRK.B", "AVGO", "WMT", "JPM", "LLY", "V", "ORCL", "MA", "XOM", "COST", "JNJ", "HD", "PG",
  "NFLX", "AMD", "CRM", "ADBE", "QCOM"];
const FULL_SYMBOL_LIST = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "BRK_B", "AVGO", "WMT",
  "JPM", "LLY", "V", "ORCL", "MA", "XOM", "COST", "JNJ", "HD", "PG",
  "NFLX", "AMD", "CRM", "ADBE", "QCOM", "INTC", "CSCO", "IBM", "UBER", "DIS",
  "KO", "PEP", "MCD", "NKE", "BA", "CAT", "GE", "UNH", "MRK", "PFE",
  "CVX", "TMO", "AMGN", "GS", "MS", "LIN", "RTX", "LOW", "SBUX", "PLTR",
];
const ALLOWED_SYMBOLS = new Set(FULL_SYMBOL_LIST);

const STOCK_INFO: Record<string, { name: string; exchange: string; currency: string }> = {
  AAPL: { name: "Apple Inc.", exchange: "NASDAQ", currency: "USD" },
  MSFT: { name: "Microsoft Corporation", exchange: "NASDAQ", currency: "USD" },
  GOOGL: { name: "Alphabet Inc.", exchange: "NASDAQ", currency: "USD" },
  AMZN: { name: "Amazon.com, Inc.", exchange: "NASDAQ", currency: "USD" },
  NVDA: { name: "NVIDIA Corporation", exchange: "NASDAQ", currency: "USD" },
  META: { name: "Meta Platforms, Inc.", exchange: "NASDAQ", currency: "USD" },
  TSLA: { name: "Tesla, Inc.", exchange: "NASDAQ", currency: "USD" },
  "BRK.B": { name: "Berkshire Hathaway Inc.", exchange: "NYSE", currency: "USD" },
  "BRK_B": { name: "Berkshire Hathaway Inc.", exchange: "NYSE", currency: "USD" },
  AVGO: { name: "Broadcom Inc.", exchange: "NASDAQ", currency: "USD" },
  WMT: { name: "Walmart Inc.", exchange: "NYSE", currency: "USD" },
  JPM: { name: "JPMorgan Chase & Co.", exchange: "NYSE", currency: "USD" },
  LLY: { name: "Eli Lilly and Company", exchange: "NYSE", currency: "USD" },
  V: { name: "Visa Inc.", exchange: "NYSE", currency: "USD" },
  ORCL: { name: "Oracle Corporation", exchange: "NYSE", currency: "USD" },
  MA: { name: "Mastercard Incorporated", exchange: "NYSE", currency: "USD" },
  XOM: { name: "Exxon Mobil Corporation", exchange: "NYSE", currency: "USD" },
  COST: { name: "Costco Wholesale Corporation", exchange: "NASDAQ", currency: "USD" },
  JNJ: { name: "Johnson & Johnson", exchange: "NYSE", currency: "USD" },
  HD: { name: "The Home Depot, Inc.", exchange: "NYSE", currency: "USD" },
  PG: { name: "The Procter & Gamble Company", exchange: "NYSE", currency: "USD" },
  NFLX: { name: "Netflix, Inc.", exchange: "NASDAQ", currency: "USD" },
  AMD: { name: "Advanced Micro Devices, Inc.", exchange: "NASDAQ", currency: "USD" },
  CRM: { name: "Salesforce, Inc.", exchange: "NYSE", currency: "USD" },
  ADBE: { name: "Adobe Inc.", exchange: "NASDAQ", currency: "USD" },
  QCOM: { name: "QUALCOMM Incorporated", exchange: "NASDAQ", currency: "USD" },
  INTC: { name: "Intel Corporation", exchange: "NASDAQ", currency: "USD" },
  CSCO: { name: "Cisco Systems, Inc.", exchange: "NASDAQ", currency: "USD" },
  IBM: { name: "International Business Machines Corporation", exchange: "NYSE", currency: "USD" },
  UBER: { name: "Uber Technologies, Inc.", exchange: "NYSE", currency: "USD" },
  DIS: { name: "The Walt Disney Company", exchange: "NYSE", currency: "USD" },
  KO: { name: "The Coca-Cola Company", exchange: "NYSE", currency: "USD" },
  PEP: { name: "PepsiCo, Inc.", exchange: "NASDAQ", currency: "USD" },
  MCD: { name: "McDonald's Corporation", exchange: "NASDAQ", currency: "USD" },
  NKE: { name: "NIKE, Inc.", exchange: "NYSE", currency: "USD" },
  BA: { name: "The Boeing Company", exchange: "NASDAQ", currency: "USD" },
  CAT: { name: "Caterpillar Inc.", exchange: "NYSE", currency: "USD" },
  GE: { name: "GE Aerospace", exchange: "NYSE", currency: "USD" },
  UNH: { name: "UnitedHealth Group Incorporated", exchange: "NYSE", currency: "USD" },
  MRK: { name: "Merck & Co., Inc.", exchange: "NYSE", currency: "USD" },
  PFE: { name: "Pfizer Inc.", exchange: "NYSE", currency: "USD" },
  CVX: { name: "Chevron Corporation", exchange: "NYSE", currency: "USD" },
  TMO: { name: "Thermo Fisher Scientific Inc.", exchange: "NYSE", currency: "USD" },
  AMGN: { name: "Amgen Inc.", exchange: "NASDAQ", currency: "USD" },
  GS: { name: "The Goldman Sachs Group, Inc.", exchange: "NYSE", currency: "USD" },
  MS: { name: "Morgan Stanley", exchange: "NYSE", currency: "USD" },
  LIN: { name: "Linde plc", exchange: "NASDAQ", currency: "USD" },
  RTX: { name: "RTX Corporation", exchange: "NYSE", currency: "USD" },
  LOW: { name: "Lowe's Companies, Inc.", exchange: "NYSE", currency: "USD" },
  SBUX: { name: "Starbucks Corporation", exchange: "NASDAQ", currency: "USD" },
  PLTR: { name: "Palantir Technologies Inc.", exchange: "NYSE", currency: "USD" },
};

const OFFLINE_STOCK_PRICES: Record<string, number> = {
  AAPL: 229.35, MSFT: 522.48, GOOGL: 201.42, AMZN: 221.30, NVDA: 182.70, META: 780.00, TSLA: 329.65, "BRK.B": 496.50, AVGO: 304.95, WMT: 103.88,
  JPM: 294.16, LLY: 760.00, V: 336.25, ORCL: 245.10, MA: 568.35, XOM: 107.20, COST: 966.00, JNJ: 176.80, HD: 398.20, PG: 154.45,
  NFLX: 1215.00, AMD: 173.75, CRM: 243.80, ADBE: 352.30, QCOM: 156.10, INTC: 19.80, CSCO: 66.95, IBM: 240.75, UBER: 91.45, DIS: 112.00,
  KO: 70.10, PEP: 145.70, MCD: 304.95, NKE: 74.50, BA: 229.30, CAT: 418.00, GE: 263.40, UNH: 302.50, MRK: 83.60, PFE: 24.85,
  CVX: 154.95, TMO: 479.50, AMGN: 294.85, GS: 735.00, MS: 144.75, LIN: 469.10, RTX: 156.20, LOW: 236.30, SBUX: 91.40, PLTR: 184.95,
};

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes; balances freshness with provider quotas
const PUBLIC_CACHE_CONTROL = "public, s-maxage=1800, stale-while-revalidate=3600";

type StockQuote = {
  price: number;
  changePercent: number | null;
  name: string | null;
  currency: string | null;
  exchange: string | null;
  dayOpen: number | null;
  dayHigh: number | null;
  dayLow: number | null;
  previousClose: number | null;
  volume: number | null;
  week52High: number | null;
  week52Low: number | null;
  lastTradeTime: string | null;
  extendedHours: boolean | null;
};

function getOfflineStockQuotes(symbols: string[]) {
  const now = new Date().toISOString();
  return Object.fromEntries(symbols.map((symbol) => {
    const info = STOCK_INFO[symbol];
    const price = OFFLINE_STOCK_PRICES[symbol] ?? 100;
    return [symbol, {
      price,
      changePercent: null,
      name: info?.name ?? `${symbol} stock`,
      currency: info?.currency ?? "USD",
      exchange: info?.exchange ?? null,
      dayOpen: null,
      dayHigh: null,
      dayLow: null,
      previousClose: null,
      volume: null,
      week52High: null,
      week52Low: null,
      lastTradeTime: now,
      extendedHours: null,
    } satisfies StockQuote];
  }));
}

export async function GET(request: Request) {
  const rateLimit = allowPublicRequest(request, "stocks", 10);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Market-data request limit reached. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
  }
  const { searchParams } = new URL(request.url);
  const requestedSymbols = searchParams.get('symbols')?.split(',').map((symbol) => symbol.trim().toUpperCase()).filter(Boolean);
  const symbols = Array.from(new Set((requestedSymbols?.length ? requestedSymbols : DEFAULT_SYMBOLS).filter((symbol) => ALLOWED_SYMBOLS.has(symbol)))).slice(0, 50);
  if (symbols.length === 0) {
    return NextResponse.json({ error: "Unsupported stock selection." }, { status: 400 });
  }

  const syncKey = request.headers.get("x-market-sync-key");
  const isPrivateSync = Boolean(process.env.CRON_SECRET && syncKey === process.env.CRON_SECRET);
  const forceRefresh = searchParams.get("refresh") === "true" && isPrivateSync;
  
  // If force refresh is requested, skip cache and go directly to API
  if (forceRefresh) {
    console.log("Force refresh requested, skipping cache");
  } else {
    // Try to serve from Firebase cache first (for all users including public)
    try {
      const persistent = await readPersistentMarketCache<Record<string, StockQuote>>("stocks");
      console.log("Cache read result:", persistent ? "Cache found" : "No cache found");
      if (persistent?.data) {
        const selected = Object.fromEntries(symbols.filter((symbol) => persistent.data[symbol]).map((symbol) => [symbol, persistent.data[symbol]]));
        if (Object.keys(selected).length > 0) {
          return NextResponse.json(selected, {
            headers: {
              "X-Market-Data-Source": isFreshMarketCache(persistent, CACHE_DURATION) ? "firebase-cache" : "firebase-stale-cache",
              "X-Market-Data-Updated": persistent.fetchedAt,
              "Cache-Control": PUBLIC_CACHE_CONTROL,
            },
          });
        }
      }
    } catch (cacheError) {
      console.error("Cache read error, proceeding to live API:", cacheError);
    }
  }

  // Only the protected Cron may populate the provider cache with fresh data
  // Public users get 503 if cache is not available (like crypto)
  const isDevMode = process.env.NODE_ENV === 'development';
  if (!isPrivateSync && !isDevMode) {
    return NextResponse.json({ error: "Stock market cache is not available yet." }, { status: 503, headers: { "Cache-Control": PUBLIC_CACHE_CONTROL } });
  }
  
  try {
    // Using FMP API with environment variable
    const apiKey = process.env.FMP_API_KEY || "";
    
    const results: Record<string, StockQuote> = {};

    if (!apiKey) {
      const offlineResults = getOfflineStockQuotes(symbols);
      try { await writePersistentMarketCache("stocks", offlineResults, "Offline reference snapshot"); } catch (error) { console.warn("Unable to persist stock offline cache:", error); }
      return NextResponse.json(offlineResults, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "offline-reference" } });
    }
    
    // Use FMP batch quote API for multiple symbols in one call
    const res = await fetch(`${FMP_BASE}/quote?symbol=${symbols.join(",")}&apikey=${apiKey}`, {
      next: { revalidate: 600 }, // 10 minutes
    });
    const data = await res.json();
    
    if (data && Array.isArray(data)) {
      data.forEach((quote: any) => {
        const price = quote.price;
        const previousClose = quote.previousClose;
        const changePercent = typeof price === "number" && typeof previousClose === "number" && previousClose > 0
          ? ((price - previousClose) / previousClose) * 100
          : null;
        
        results[quote.symbol] = {
          price: price,
          changePercent: typeof changePercent === "number" && Number.isFinite(changePercent) ? changePercent : null,
          name: typeof quote.name === "string" ? quote.name : null,
          currency: typeof quote.currency === "string" ? quote.currency : null,
          exchange: typeof quote.exchange === "string" ? quote.exchange : null,
          dayOpen: typeof quote.open === "number" ? quote.open : null,
          dayHigh: typeof quote.dayHigh === "number" ? quote.dayHigh : null,
          dayLow: typeof quote.dayLow === "number" ? quote.dayLow : null,
          previousClose: typeof previousClose === "number" ? previousClose : null,
          volume: typeof quote.volume === "number" ? quote.volume : null,
          week52High: typeof quote["52WeekHigh"] === "number" ? quote["52WeekHigh"] : null,
          week52Low: typeof quote["52WeekLow"] === "number" ? quote["52WeekLow"] : null,
          lastTradeTime: typeof quote.timestamp === "string" ? quote.timestamp : null,
          extendedHours: null,
        };
      });
    }

    if (Object.keys(results).length > 0) {
      try { await writePersistentMarketCache("stocks", results, "FMP"); } catch (error) { console.warn("Unable to persist stock cache:", error); }
      return NextResponse.json(results, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "live-synced" } });
    }

    throw new Error("No valid stock data received");
  } catch (error) {
    console.error("Stock API error:", error);
    const offlineResults = getOfflineStockQuotes(symbols);
    try { await writePersistentMarketCache("stocks", offlineResults, "Offline reference snapshot"); } catch (error) { console.warn("Unable to persist stock offline cache:", error); }
    return NextResponse.json(offlineResults, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "offline-reference" } });
  }
}