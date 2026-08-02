import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const STOCKDATA_BASE = "https://api.stockdata.org/v1";

// Cache implementation (in-memory for server-side)
const cache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

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
  const { searchParams } = new URL(request.url);
  const symbols = searchParams.get('symbols')?.split(',') || ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"];
  
  try {
    console.log("Stock API request for symbols:", symbols);
    
    const cacheKey = `stock:${symbols.join(",")}`;
    const cached = getCached<{ [key: string]: { price: number; change: number; changePercent: number } }>(cacheKey, CACHE_DURATION);
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
    
    const results: { [key: string]: { price: number; change: number; changePercent: number } } = {};
    
    // StockData.org free plan allows only 3 symbols per request
    // Process symbols in batches of 3
    const batchSize = 3;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      
      console.log(`Fetching batch ${i/batchSize + 1}:`, batch);
      
      const res = await fetch(`${STOCKDATA_BASE}/data/quote?symbols=${batch.join(",")}&api_token=${apiKey}`, {
        next: { revalidate: 900 }, // 15 minutes
      });
      const data = await res.json();
      
      console.log(`Batch ${i/batchSize + 1} response:`, data);
      
      if (data && Array.isArray(data.data)) {
        data.data.forEach((quote: any) => {
          const price = quote.price;
          const previousClose = quote.previous_close_price;
          const change = quote.day_change;
          const changePercent = previousClose ? ((price - previousClose) / previousClose) * 100 : 0;
          
          results[quote.ticker] = {
            price: price,
            change: change || 0,
            changePercent: changePercent || 0,
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
