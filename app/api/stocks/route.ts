import { NextResponse } from 'next/server';
import { allowPublicRequest } from "@/lib/public-rate-limit";
import { isFreshMarketCache, readPersistentMarketCache, writePersistentMarketCache } from "@/lib/market-cache";

export const dynamic = "force-dynamic";

const STOCKDATA_BASE = "https://api.stockdata.org/v1";
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
  MCD: { name: "McDonald's Corporation", exchange: "NYSE", currency: "USD" },
  NKE: { name: "NIKE, Inc.", exchange: "NYSE", currency: "USD" },
  BA: { name: "The Boeing Company", exchange: "NYSE", currency: "USD" },
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
  PLTR: { name: "Palantir Technologies Inc.", exchange: "NASDAQ", currency: "USD" },
};

// Cache implementation (in-memory for server-side)
const cache = new Map();
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

function getCached<T>(key: string, duration: number): T | null {
  const item = cache.get(key);
  if (item && Date.now() - item.time < duration) {
    return item.data;
  }
  return null;
}

function setCache<T>(key: string, data: T) {
  cache.set(key, { data, time: Date.now() });
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

  // Try to serve from Firebase cache first (for all users including public)
  try {
    const persistent = await readPersistentMarketCache<Record<string, StockQuote>>("stocks");
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

  // Only the protected Cron may populate the provider cache with fresh data
  const isDevMode = process.env.NODE_ENV === 'development' && process.env.STOCKDATA_API_KEY;
  if (!isPrivateSync && !isDevMode) {
    return NextResponse.json({ error: "Stock market cache is not available yet." }, { status: 503, headers: { "Cache-Control": PUBLIC_CACHE_CONTROL } });
  }
  
  try {
    
    const cacheKey = `stock:${symbols.join(",")}`;
    const cached = getCached<Record<string, StockQuote>>(cacheKey, CACHE_DURATION);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Using StockData.org API with environment variable
    const apiKey = process.env.STOCKDATA_API_KEY || "";
    
    
    const results: Record<string, StockQuote> = {};

    if (!apiKey) {
      throw new Error("STOCKDATA_API_KEY is not configured");
    }
    
    // Process symbols in batches of 5 for better efficiency
    const batchSize = 5;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      
      
      const res = await fetch(`${STOCKDATA_BASE}/data/quote?symbols=${batch.join(",")}&api_token=${apiKey}`, {
        next: { revalidate: 600 }, // 10 minutes
      });
      const data = await res.json();
      
      
      if (data && Array.isArray(data.data)) {
        data.data.forEach((quote: any) => {
          const price = quote.price;
          const previousClose = quote.previous_close_price;
          const changePercent = typeof price === "number" && typeof previousClose === "number" && previousClose > 0
            ? ((price - previousClose) / previousClose) * 100
            : null;
          
          results[quote.ticker] = {
            price: price,
            changePercent: typeof changePercent === "number" && Number.isFinite(changePercent) ? changePercent : null,
            name: typeof quote.name === "string" ? quote.name : null,
            currency: typeof quote.currency === "string" ? quote.currency : null,
            exchange: typeof quote.exchange_short === "string" ? quote.exchange_short : null,
            dayOpen: typeof quote.day_open === "number" ? quote.day_open : null,
            dayHigh: typeof quote.day_high === "number" ? quote.day_high : null,
            dayLow: typeof quote.day_low === "number" ? quote.day_low : null,
            previousClose: typeof previousClose === "number" ? previousClose : null,
            volume: typeof quote.volume === "number" ? quote.volume : null,
            week52High: typeof quote["52_week_high"] === "number" ? quote["52_week_high"] : null,
            week52Low: typeof quote["52_week_low"] === "number" ? quote["52_week_low"] : null,
            lastTradeTime: typeof quote.last_trade_time === "string" ? quote.last_trade_time : null,
            extendedHours: typeof quote.is_extended_hours_price === "boolean" ? quote.is_extended_hours_price : null,
          };
        });
      }
      
      // Add small delay between batches
      if (i + batchSize < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (Object.keys(results).length > 0) {
      setCache(cacheKey, results);
      try { await writePersistentMarketCache("stocks", results, "StockData.org"); } catch (error) { console.warn("Unable to persist stock cache:", error); }
      return NextResponse.json(results, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "live-synced" } });
    }

    throw new Error("No valid stock data received");
  } catch (error) {
    console.warn("Stock API unavailable:", error instanceof Error ? error.message : error);
    
    // Try Yahoo Finance API as fallback
    try {
      console.log("Attempting Yahoo Finance API fallback...");
      const yahooResults: Record<string, StockQuote> = {};
      
      for (const symbol of symbols) {
        try {
          const yahooSymbol = symbol.replace('.', '-'); // Yahoo uses dash for dot
          const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?range=1d&interval=1d`, {
            headers: { 
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" 
            },
            signal: AbortSignal.timeout(5000), // 5 second timeout
          });
          
          if (res.ok) {
            const data = await res.json();
            const meta = data.chart?.result?.[0]?.meta;
            const quote = data.chart?.result?.[0]?.indicators?.quote?.[0];
            
            if (meta && quote) {
              const price = meta.regularMarketPrice;
              const previousClose = meta.previousClose || meta.chartPreviousClose;
              const changePercent = typeof price === "number" && typeof previousClose === "number" && previousClose > 0
                ? ((price - previousClose) / previousClose) * 100
                : null;
              
              console.log(`Yahoo data for ${symbol}:`, { price, previousClose, changePercent });
              
              yahooResults[symbol] = {
                price: price,
                changePercent: typeof changePercent === "number" && Number.isFinite(changePercent) ? changePercent : null,
                name: STOCK_INFO[symbol]?.name || null,
                currency: meta.currency || "USD",
                exchange: meta.exchangeName || null,
                dayOpen: quote.open?.[0] || null,
                dayHigh: quote.high?.[0] || null,
                dayLow: quote.low?.[0] || null,
                previousClose: previousClose || null,
                volume: quote.volume?.[0] || null,
                week52High: meta.fiftyTwoWeekHigh || null,
                week52Low: meta.fiftyTwoWeekLow || null,
                lastTradeTime: new Date(meta.regularMarketTime * 1000).toISOString(),
                extendedHours: null,
              };
            }
          }
          
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (yahooError) {
          console.warn(`Yahoo API failed for ${symbol}:`, yahooError);
        }
      }
      
      if (Object.keys(yahooResults).length > 0) {
        console.log("Yahoo API fallback successful for", Object.keys(yahooResults).length, "symbols");
        return NextResponse.json(yahooResults, { headers: { "X-Market-Data-Source": "yahoo-finance-fallback", "Cache-Control": PUBLIC_CACHE_CONTROL } });
      }
    } catch (yahooFallbackError) {
      console.warn("Yahoo Finance fallback failed:", yahooFallbackError);
    }
    
    return NextResponse.json({ error: "Stock market data is temporarily unavailable." }, { status: 503 });
  }
}
