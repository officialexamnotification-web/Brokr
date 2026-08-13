import { NextResponse } from 'next/server';
import { allowPublicRequest } from "@/lib/public-rate-limit";

export const dynamic = "force-dynamic";

const STOCKDATA_BASE = "https://api.stockdata.org/v1";
const FINNHUB_BASE = "https://finnhub.io/api/v1";
const DEFAULT_SYMBOLS = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"];
const FULL_SYMBOL_LIST = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "AVGO", "WMT",
  "JPM", "LLY", "V", "ORCL", "MA", "XOM", "COST", "JNJ", "HD", "PG",
  "NFLX", "AMD", "CRM", "ADBE", "QCOM", "INTC", "CSCO", "IBM", "UBER", "DIS",
  "KO", "PEP", "MCD", "NKE", "BA", "CAT", "GE", "UNH", "MRK", "PFE",
  "CVX", "TMO", "AMGN", "GS", "MS", "LIN", "RTX", "LOW", "SBUX", "PLTR",
];
const ALLOWED_SYMBOLS = new Set(DEFAULT_SYMBOLS);
FULL_SYMBOL_LIST.forEach((symbol) => ALLOWED_SYMBOLS.add(symbol));

const STOCK_INFO: Record<string, { name: string; exchange: string; currency: string }> = {
  AAPL: { name: "Apple Inc.", exchange: "NASDAQ", currency: "USD" },
  MSFT: { name: "Microsoft Corporation", exchange: "NASDAQ", currency: "USD" },
  GOOGL: { name: "Alphabet Inc.", exchange: "NASDAQ", currency: "USD" },
  AMZN: { name: "Amazon.com, Inc.", exchange: "NASDAQ", currency: "USD" },
  NVDA: { name: "NVIDIA Corporation", exchange: "NASDAQ", currency: "USD" },
  META: { name: "Meta Platforms, Inc.", exchange: "NASDAQ", currency: "USD" },
  TSLA: { name: "Tesla, Inc.", exchange: "NASDAQ", currency: "USD" },
  "BRK.B": { name: "Berkshire Hathaway Inc.", exchange: "NYSE", currency: "USD" },
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
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes; balances freshness with provider quotas

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
  
  try {
    
    const cacheKey = `stock:${symbols.join(",")}`;
    const cached = getCached<Record<string, StockQuote>>(cacheKey, CACHE_DURATION);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Using StockData.org API with environment variable
    const apiKey = process.env.STOCKDATA_API_KEY || "";
    
    
    const results: Record<string, StockQuote> = {};

    const addFinnhubQuotes = async () => {
      const finnhubKey = process.env.FINNHUB_API_KEY || "";
      if (!finnhubKey) return;
      const responses = await Promise.allSettled(symbols.map(async (symbol) => {
        const response = await fetch(`${FINNHUB_BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(finnhubKey)}`, {
          next: { revalidate: 600 },
        });
        if (!response.ok) throw new Error(`Finnhub quote failed for ${symbol}`);
        const quote = await response.json();
        const price = typeof quote?.c === "number" ? quote.c : null;
        if (price == null || price <= 0) return;
        const previousClose = typeof quote?.pc === "number" ? quote.pc : null;
        const info = STOCK_INFO[symbol];
        results[symbol] = {
          price,
          changePercent: typeof quote?.dp === "number" ? quote.dp : previousClose ? ((price - previousClose) / previousClose) * 100 : null,
          name: info?.name ?? null,
          currency: info?.currency ?? "USD",
          exchange: info?.exchange ?? null,
          dayOpen: typeof quote?.o === "number" ? quote.o : null,
          dayHigh: typeof quote?.h === "number" ? quote.h : null,
          dayLow: typeof quote?.l === "number" ? quote.l : null,
          previousClose,
          volume: null,
          week52High: null,
          week52Low: null,
          lastTradeTime: typeof quote?.t === "number" ? new Date(quote.t * 1000).toISOString() : null,
          extendedHours: null,
        };
      }));
      return responses;
    };

    if (!apiKey) {
      await addFinnhubQuotes();
      if (Object.keys(results).length > 0) {
        setCache(cacheKey, results);
        return NextResponse.json(results);
      }
      throw new Error("No stock quote provider key configured");
    }
    
    // StockData.org free plan allows only 3 symbols per request.
    // Process symbols in batches of 3
    const batchSize = 3;
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
      return NextResponse.json(results);
    }

    throw new Error("No valid stock data received");
  } catch (error) {
    console.warn("Stock API unavailable:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Stock market data is temporarily unavailable." }, { status: 503 });
  }
}
