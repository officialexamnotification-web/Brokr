// Free unlimited financial APIs

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const STOCKDATA_BASE = "https://api.stockdata.org/v1";

// Cache implementation (in-memory for Next.js)
const cache = new Map();
const CACHE_DURATION = {
  crypto: 2 * 60 * 1000, // 2 minutes
  forex: 60 * 60 * 1000, // 1 hour
  stock: 60 * 60 * 1000, // 1 hour (StockData.org has 100 requests/day limit)
};

function getCached<T>(key: string, duration: number): T | null {
  if (typeof window === "undefined") {
    // Server-side only
    const item = cache.get(key);
    if (item && Date.now() - item.time < duration) {
      return item.data;
    }
  }
  return null;
}

function setCache<T>(key: string, data: T) {
  if (typeof window === "undefined") {
    cache.set(key, { data, time: Date.now() });
  }
}

// ============ CRYPTO ============

export async function getCryptoPrices(coins: string[] = ["bitcoin", "ethereum", "binancecoin"]) {
  // Browser requests use our same-origin route so provider CORS rules do not
  // prevent the directory from loading market data.
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/crypto?coins=${encodeURIComponent(coins.join(","))}`);
      if (!res.ok) return {};
      return await res.json();
    } catch {
      return {};
    }
  }

  const cacheKey = `crypto:${coins.join(",")}`;
  const cached = getCached<{ [key: string]: { inr: number; usd: number; change_24h: number | null } }>(cacheKey, CACHE_DURATION.crypto);
  if (cached) return cached;

  try {
    const res = await fetch(`${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${coins.join(",")}&order=market_cap_desc&per_page=50&page=1&sparkline=false`, {
      next: { revalidate: 120 }, // ISR: revalidate every 2 minutes
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (!res.ok) throw new Error(`CoinGecko API failed: ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid API response");

    // Get USD/INR rate for conversion
    const forexRates = await getForexRates("USD", ["INR"]);
    const usdToInr = forexRates?.INR;
    if (!usdToInr) throw new Error("USD/INR data unavailable");

    const result: { [key: string]: { inr: number; usd: number; change_24h: number | null } } = {};
    data.forEach((coin: any) => {
      result[coin.id] = {
        inr: Math.round(coin.current_price * usdToInr),
        usd: coin.current_price,
        change_24h: typeof coin.price_change_percentage_24h === "number" && Number.isFinite(coin.price_change_percentage_24h) ? coin.price_change_percentage_24h : null,
      };
    });

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error("CRYPTO ERROR DETAILS:", error);
    console.error("CRYPTO ERROR TYPE:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("CRYPTO ERROR MESSAGE:", error instanceof Error ? error.message : String(error));
    console.error("CRYPTO ERROR STACK:", error instanceof Error ? error.stack : "No stack trace");
    return {};
  }
}

export async function getCryptoPrice(coinId: string) {
  const prices = await getCryptoPrices([coinId]);
  return prices?.[coinId] || null;
}

export async function getTopCryptos(limit = 10) {
  try {
    const res = await fetch(`${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`, {
      next: { revalidate: 300 }, // 5 minutes
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ============ FOREX ============

export async function getForexRates(base = "USD", targets?: string[]) {
  const cacheKey = `forex:${base}:${targets?.join(",") || "all"}`;
  const cached = getCached<{ [key: string]: number }>(cacheKey, CACHE_DURATION.forex);
  if (cached) return cached;

  try {
    let url = `${FRANKFURTER_BASE}/latest?from=${base}`;
    if (targets?.length) {
      url += `&to=${targets.join(",")}`;
    }

    console.log("Fetching Forex API:", url);
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (!res.ok) throw new Error(`Frankfurter API failed: ${res.status}`);
    const data = await res.json();

    console.log("Forex API response:", data);
    
    if (!data.rates) throw new Error("Invalid API response");
    
    setCache(cacheKey, data.rates);
    return data.rates as { [key: string]: number };
  } catch (error) {
    console.error("FOREX ERROR DETAILS:", error);
    console.error("FOREX ERROR TYPE:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("FOREX ERROR MESSAGE:", error instanceof Error ? error.message : String(error));
    console.error("FOREX ERROR STACK:", error instanceof Error ? error.stack : "No stack trace");
    return {};
  }
}

export async function convertCurrency(amount: number, from: string, to: string) {
  const rates = await getForexRates(from, [to]);
  if (!rates?.[to]) return null;
  return amount * rates[to];
}

export async function getForexHistory(base: string, target: string, days = 30) {
  try {
    const endDate = new Date();
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const url = `${FRANKFURTER_BASE}/${startDate.toISOString().split("T")[0]}..${endDate.toISOString().split("T")[0]}?from=${base}&to=${target}`;

    const res = await fetch(url, { next: { revalidate: 86400 } }); // 24 hours
    if (!res.ok) return [];
    const data = await res.json();
    return Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
      date,
      rate: rates[target] || 0,
    }));
  } catch {
    return [];
  }
}

// ============ POPULAR PAIRS ============

export async function getPopularPairs() {
  const [crypto, forex] = await Promise.all([
    getCryptoPrices(["bitcoin", "ethereum", "binancecoin", "ripple", "solana"]),
    getForexRates("USD", ["INR", "EUR", "GBP"]),
  ]);

  return { crypto, forex };
}

// ============ STOCKS ============

export async function getStockPrices(symbols: string[] = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]) {
  const cacheKey = `stock:${symbols.join(",")}`;
  const cached = getCached<{ [key: string]: { price: number; change: number | null; changePercent: number | null } }>(cacheKey, CACHE_DURATION.stock);
  if (cached) return cached;

  try {
    // Using StockData.org API with environment variable
    const apiKey = process.env.STOCKDATA_API_KEY || "";
    
    console.log("StockData API Key present:", !!apiKey);
    console.log("API Key length:", apiKey.length);
    
    if (!apiKey) {
      throw new Error("StockData.org API key not provided");
    }
    
    const results: { [key: string]: { price: number; change: number | null; changePercent: number | null } } = {};
    
    // StockData.org free plan allows only 3 symbols per request
    // Process symbols in batches of 3
    const batchSize = 3;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      
      const res = await fetch(`${STOCKDATA_BASE}/data/quote?symbols=${batch.join(",")}&api_token=${apiKey}`, {
        next: { revalidate: 3600 }, // 1 hour
      });
      const data = await res.json();
      
      if (data && Array.isArray(data.data)) {
        data.data.forEach((quote: any) => {
          const price = quote.price;
          const previousClose = quote.previous_close_price;
          const change = typeof quote.day_change === "number" && Number.isFinite(quote.day_change) ? quote.day_change : null;
          const changePercent = typeof price === "number" && typeof previousClose === "number" && previousClose > 0 ? ((price - previousClose) / previousClose) * 100 : null;
          
          results[quote.ticker] = {
            price: price,
            change,
            changePercent: typeof changePercent === "number" && Number.isFinite(changePercent) ? changePercent : null,
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
      return results;
    }

    throw new Error("No valid stock data received");
  } catch (error) {
    console.warn("Stock API unavailable:", error instanceof Error ? error.message : error);
    return {};
  }
}

export async function getStockPrice(symbol: string) {
  const prices = await getStockPrices([symbol]);
  return prices?.[symbol] || null;
}

export async function getPopularStocks() {
  return getStockPrices(["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "META", "NVDA", "JPM"]);
}
