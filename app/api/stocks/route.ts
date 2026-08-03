import { NextResponse } from 'next/server';
import { allowPublicRequest } from "@/lib/public-rate-limit";

export const dynamic = "force-dynamic";

const STOCKDATA_BASE = "https://api.stockdata.org/v1";
const DEFAULT_SYMBOLS = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"];
const ALLOWED_SYMBOLS = new Set(DEFAULT_SYMBOLS);

// Cache implementation (in-memory for server-side)
const cache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour; protects the 100-request free plan

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
  const symbols = Array.from(new Set((requestedSymbols?.length ? requestedSymbols : DEFAULT_SYMBOLS).filter((symbol) => ALLOWED_SYMBOLS.has(symbol)))).slice(0, 5);
  if (symbols.length === 0) {
    return NextResponse.json({ error: "Unsupported stock selection." }, { status: 400 });
  }
  
  try {
    console.log("Stock API request for symbols:", symbols);
    
    const cacheKey = `stock:${symbols.join(",")}`;
    const cached = getCached<Record<string, StockQuote>>(cacheKey, CACHE_DURATION);
    if (cached) {
      console.log("Returning cached stock data");
      return NextResponse.json(cached);
    }

    // Using StockData.org API with environment variable
    const apiKey = process.env.STOCKDATA_API_KEY || "";
    
    console.log("StockData API Key present:", !!apiKey);
    console.log("API Key length:", apiKey.length);
    
    if (!apiKey) {
      console.log("API key not provided; market data unavailable");
      throw new Error("StockData.org API key not provided");
    }
    
    const results: Record<string, StockQuote> = {};
    
    // StockData.org free plan allows only 3 symbols per request
    // Process symbols in batches of 3
    const batchSize = 3;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      
      console.log(`Fetching batch ${i/batchSize + 1}:`, batch);
      
      const res = await fetch(`${STOCKDATA_BASE}/data/quote?symbols=${batch.join(",")}&api_token=${apiKey}`, {
        next: { revalidate: 3600 }, // 1 hour
      });
      const data = await res.json();
      
      console.log(`Batch ${i/batchSize + 1} response:`, data);
      
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

    console.log("Final results:", results);
    
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
