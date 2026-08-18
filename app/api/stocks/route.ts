import { NextResponse } from 'next/server';
import { allowPublicRequest } from "@/lib/public-rate-limit";
import { readPersistentMarketCache } from "@/lib/market-cache";

export const dynamic = "force-dynamic";

const FINNHUB_BASE = "https://finnhub.io/api/v1";
const FMP_BASE = "https://financialmodelingprep.com/stable";
const DEFAULT_SYMBOLS = [
  // Mega Cap Giants
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B",
  // Financial Services
  "JPM", "V", "MA", "BAC", "WFC", "GS", "MS",
  // Technology Leaders
  "AVGO", "CSCO", "ORCL", "CRM", "ADBE", "INTC", "AMD", "QCOM", "IBM", "NFLX",
  // Consumer Giants
  "WMT", "COST", "HD", "MCD", "NKE", "KO", "PEP", "DIS", "SBUX",
  // Energy Sector
  "XOM", "CVX", "COP", "SHEL", "BP",
  // Healthcare Leaders
  "JNJ", "UNH", "LLY", "PFE", "TMO", "ABT", "MRK", "AMGN",
  // Industrials
  "CAT", "BA", "GE"
];
const FULL_SYMBOL_LIST = [
  // Mega Cap Giants
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B",
  // Financial Services
  "JPM", "V", "MA", "BAC", "WFC", "GS", "MS",
  // Technology Leaders
  "AVGO", "CSCO", "ORCL", "CRM", "ADBE", "INTC", "AMD", "QCOM", "IBM", "NFLX",
  // Consumer Giants
  "WMT", "COST", "HD", "MCD", "NKE", "KO", "PEP", "DIS", "SBUX",
  // Energy Sector
  "XOM", "CVX", "COP", "SHEL", "BP",
  // Healthcare Leaders
  "JNJ", "UNH", "LLY", "PFE", "TMO", "ABT", "MRK", "AMGN",
  // Industrials
  "CAT", "BA", "GE",
  // Additional stocks from original list
  "LLY", "PG", "UBER", "LIN", "RTX", "LOW", "PLTR", "SAP", "SIEGY", "MC.PA",
  "OR.PA", "NESN", "ROG", "HSBC", "TM", "SONY", "005930.KS", "2330.TW", "BABA", "0700.HK",
  "RELIANCE.NS", "BHP", "PBR", "TCEHY", "ADRE", "EWJ", "EEM", "VGK", "EWG"
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
  "BRK.B": { name: "Berkshire Hathaway Inc.", exchange: "NYSE", currency: "USD" },
  BAC: { name: "Bank of America Corporation", exchange: "NYSE", currency: "USD" },
  WFC: { name: "Wells Fargo & Company", exchange: "NYSE", currency: "USD" },
  SBUX: { name: "Starbucks Corporation", exchange: "NASDAQ", currency: "USD" },
  COP: { name: "ConocoPhillips", exchange: "NYSE", currency: "USD" },
  ABT: { name: "Abbott Laboratories", exchange: "NYSE", currency: "USD" },
  UNH: { name: "UnitedHealth Group Incorporated", exchange: "NYSE", currency: "USD" },
  CAT: { name: "Caterpillar Inc.", exchange: "NYSE", currency: "USD" },
  GE: { name: "GE Aerospace", exchange: "NYSE", currency: "USD" },
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
  PLTR: { name: "Palantir Technologies Inc.", exchange: "NYSE", currency: "USD" },
  SAP: { name: "SAP SE", exchange: "NYSE", currency: "USD" },
  SIEGY: { name: "Siemens AG", exchange: "OTC", currency: "USD" },
  "MC.PA": { name: "LVMH Moët Hennessy Louis Vuitton SE", exchange: "EURONEXT", currency: "EUR" },
  "OR.PA": { name: "TotalEnergies SE", exchange: "EURONEXT", currency: "EUR" },
  NESN: { name: "Nestlé S.A.", exchange: "SIX", currency: "CHF" },
  ROG: { name: "Roche Holding AG", exchange: "SIX", currency: "CHF" },
  HSBC: { name: "HSBC Holdings plc", exchange: "NYSE", currency: "USD" },
  BP: { name: "BP p.l.c.", exchange: "NYSE", currency: "USD" },
  SHEL: { name: "Shell plc", exchange: "NYSE", currency: "USD" },
  TM: { name: "Toyota Motor Corporation", exchange: "NYSE", currency: "USD" },
  SONY: { name: "Sony Group Corporation", exchange: "NYSE", currency: "USD" },
  "005930.KS": { name: "Samsung Electronics Co., Ltd.", exchange: "KRX", currency: "KRW" },
  "2330.TW": { name: "Taiwan Semiconductor Manufacturing Company Ltd.", exchange: "TWSE", currency: "TWD" },
  BABA: { name: "Alibaba Group Holding Limited", exchange: "NYSE", currency: "USD" },
  "0700.HK": { name: "Tencent Holdings Limited", exchange: "HKEX", currency: "HKD" },
  "RELIANCE.NS": { name: "Reliance Industries Limited", exchange: "NSE", currency: "INR" },
  BHP: { name: "BHP Group Limited", exchange: "NYSE", currency: "USD" },
  PBR: { name: "Petróleo Brasileiro S.A. - Petrobras", exchange: "NYSE", currency: "USD" },
  TCEHY: { name: "Tencent Holdings Limited", exchange: "OTC", currency: "USD" },
  ADRE: { name: "BLDRS Asia 50 ADR Index Fund", exchange: "NASDAQ", currency: "USD" },
  EWJ: { name: "iShares MSCI Japan ETF", exchange: "NYSE", currency: "USD" },
  EEM: { name: "iShares MSCI Emerging Markets ETF", exchange: "NYSE", currency: "USD" },
  VGK: { name: "Vanguard FTSE Europe ETF", exchange: "NYSE", currency: "USD" },
  EWG: { name: "iShares MSCI Germany ETF", exchange: "NYSE", currency: "USD" },
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes; aligned with cron job refresh
const PUBLIC_CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=600";

type StockQuote = {
  price: number | null;
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
    return [symbol, {
      price: null, // No hardcoded prices - always use live API
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
  const forceRefresh = searchParams.get("refresh") === "true";
  
  // Public users: Always read from Firebase cache (no API hit)
  // Cron job: Hit API and write to Firebase cache (with refresh=true or authentication)
  if (!isPrivateSync && !forceRefresh) {
    console.log("Reading from Firebase cache for public users");
    try {
      const cacheData = await readPersistentMarketCache<Record<string, StockQuote>>("stocks");
      if (cacheData && cacheData.data && Object.keys(cacheData.data).length > 0) {
        const filteredData = Object.fromEntries(
          symbols.map(symbol => [symbol, cacheData.data[symbol]]).filter(([_, value]) => value !== undefined)
        );
        if (Object.keys(filteredData).length > 0) {
          return NextResponse.json({ ...filteredData, _lastUpdated: cacheData.fetchedAt }, {
            headers: {
              "Cache-Control": PUBLIC_CACHE_CONTROL,
              "X-Market-Data-Source": "firebase-cache",
              "X-Cache-Age": `${Date.now() - new Date(cacheData.fetchedAt).getTime()}ms`
            }
          });
        }
      }
    } catch (cacheError) {
      console.error("Firebase cache read error:", cacheError);
    }
    
    // Fallback to offline data if cache fails
    const offlineResults = getOfflineStockQuotes(symbols);
    return NextResponse.json(offlineResults, { 
      headers: { 
        "Cache-Control": PUBLIC_CACHE_CONTROL, 
        "X-Market-Data-Source": "offline-fallback" 
      } 
    });
  }
  
  // Cron job: Hit API and write to cache
  console.log("Cron job: Fetching live data from API");
  
  try {
    // Try Finnhub API first (better rate limits: 60 req/min vs FMP's 250/day)
    const finnhubKey = process.env.FINNHUB_API_KEY || "";
    const results: Record<string, StockQuote> = {};

    if (finnhubKey) {
      // Use Finnhub quote API for real-time data
      const finnhubPromises = symbols.map(async (symbol) => {
        try {
          const finnhubRes = await fetch(`${FINNHUB_BASE}/quote?symbol=${symbol}&token=${finnhubKey}`, {
            next: { revalidate: 600 }, // 10 minutes
          });
          const finnhubData = await finnhubRes.json();
          
          console.log("Finnhub API response for", symbol, ":", JSON.stringify(finnhubData).substring(0, 200));
          
          if (finnhubData && typeof finnhubData.c === "number") {
            const info = STOCK_INFO[symbol];
            const price = finnhubData.c; // Current price
            const previousClose = finnhubData.pc; // Previous close
            const changePercent = typeof price === "number" && typeof previousClose === "number" && previousClose > 0
              ? ((price - previousClose) / previousClose) * 100
              : null;
            
            return {
              symbol,
              data: {
                price: price,
                changePercent: typeof changePercent === "number" && Number.isFinite(changePercent) ? changePercent : null,
                name: info?.name ?? `${symbol} stock`,
                currency: info?.currency ?? "USD",
                exchange: info?.exchange ?? null,
                dayOpen: typeof finnhubData.o === "number" ? finnhubData.o : null,
                dayHigh: typeof finnhubData.h === "number" ? finnhubData.h : null,
                dayLow: typeof finnhubData.l === "number" ? finnhubData.l : null,
                previousClose: typeof previousClose === "number" ? previousClose : null,
                volume: null, // Finnhub doesn't provide volume in quote endpoint
                week52High: null,
                week52Low: null,
                lastTradeTime: new Date().toISOString(),
                extendedHours: null,
              }
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching ${symbol} from Finnhub:`, error);
          return null;
        }
      });
      
      const finnhubResults = await Promise.all(finnhubPromises);
      
      finnhubResults.forEach((result) => {
        if (result && result.data) {
          results[result.symbol] = result.data;
        }
      });
      
      if (Object.keys(results).length > 0) {
        console.log("Successfully fetched data from Finnhub for", Object.keys(results).length, "symbols");
        return NextResponse.json(results, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "finnhub-live" } });
      }
    }
    
    // Fallback to FMP if Finnhub fails
    const fmpKey = process.env.FMP_API_KEY || "";
    
    if (!fmpKey) {
      const offlineResults = getOfflineStockQuotes(symbols);
      return NextResponse.json(offlineResults, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "offline-reference" } });
    }
    
    // Use FMP quote API as fallback
    const fmpPromises = symbols.map(async (symbol) => {
      try {
        const fmpRes = await fetch(`${FMP_BASE}/quote?symbol=${symbol}&apikey=${fmpKey}`, {
          next: { revalidate: 600 }, // 10 minutes
        });
        const fmpData = await fmpRes.json();
        
        if (fmpData && Array.isArray(fmpData) && fmpData.length > 0 && typeof fmpData[0].price === "number") {
          const quote = fmpData[0];
          const info = STOCK_INFO[symbol];
          const price = quote.price;
          const previousClose = quote.previousClose;
          const changePercent = typeof price === "number" && typeof previousClose === "number" && previousClose > 0
            ? ((price - previousClose) / previousClose) * 100
            : null;
          
          return {
            symbol,
            data: {
              price: price,
              changePercent: typeof changePercent === "number" && Number.isFinite(changePercent) ? changePercent : null,
              name: info?.name ?? `${symbol} stock`,
              currency: info?.currency ?? "USD",
              exchange: info?.exchange ?? null,
              dayOpen: typeof quote.open === "number" ? quote.open : null,
              dayHigh: typeof quote.dayHigh === "number" ? quote.dayHigh : null,
              dayLow: typeof quote.dayLow === "number" ? quote.dayLow : null,
              previousClose: typeof previousClose === "number" ? previousClose : null,
              volume: typeof quote.volume === "number" ? quote.volume : null,
              week52High: typeof quote["52WeekHigh"] === "number" ? quote["52WeekHigh"] : null,
              week52Low: typeof quote["52WeekLow"] === "number" ? quote["52WeekLow"] : null,
              lastTradeTime: typeof quote.timestamp === "string" ? quote.timestamp : new Date().toISOString(),
              extendedHours: null,
            }
          };
        }
        return null;
      } catch (error) {
        console.error(`Error fetching ${symbol} from FMP:`, error);
        return null;
      }
    });
    
    const fmpResults = await Promise.all(fmpPromises);
    
    fmpResults.forEach((result) => {
      if (result && result.data) {
        results[result.symbol] = result.data;
      }
    });

    if (Object.keys(results).length > 0) {
      console.log("Successfully fetched data from FMP for", Object.keys(results).length, "symbols");
      return NextResponse.json(results, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "fmp-fallback" } });
    }

    throw new Error("No valid stock data received from either Finnhub or FMP API");
  } catch (error) {
    console.error("Stock API error:", error);
    return NextResponse.json({ error: "Failed to fetch stock data", details: String(error) }, { status: 503 });
  }
}