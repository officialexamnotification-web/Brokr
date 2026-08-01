// Free unlimited financial APIs

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const STOCKDATA_BASE = "https://api.stockdata.org/v1";

// Cache implementation (in-memory for Next.js)
const cache = new Map();
const CACHE_DURATION = {
  crypto: 2 * 60 * 1000, // 2 minutes
  forex: 60 * 60 * 1000, // 1 hour
  stock: 15 * 60 * 1000, // 15 minutes (StockData.org has 100 requests/day limit)
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
  const cacheKey = `crypto:${coins.join(",")}`;
  const cached = getCached<{ [key: string]: { inr: number; usd: number; change_24h: number } }>(cacheKey, CACHE_DURATION.crypto);
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
    const usdToInr = forexRates?.INR || 83.5;

    const result: { [key: string]: { inr: number; usd: number; change_24h: number } } = {};
    data.forEach((coin: any) => {
      result[coin.id] = {
        inr: Math.round(coin.current_price * usdToInr),
        usd: coin.current_price,
        change_24h: coin.price_change_percentage_24h,
      };
    });

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.warn("Crypto API using fallback:", error instanceof Error ? error.message : error);
    // Fallback prices
    const fallbackPrices: { [key: string]: { inr: number; usd: number; change_24h: number } } = {
      bitcoin: { inr: 5200000, usd: 62500, change_24h: 2.5 },
      ethereum: { inr: 185000, usd: 2220, change_24h: 1.8 },
      binancecoin: { inr: 42000, usd: 505, change_24h: -0.5 },
      solana: { inr: 9500, usd: 114, change_24h: 3.2 },
      ripple: { inr: 42, usd: 0.50, change_24h: -1.2 },
    };
    return coins.reduce((acc, coin) => {
      if (fallbackPrices[coin]) acc[coin] = fallbackPrices[coin];
      return acc;
    }, {} as typeof fallbackPrices);
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

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (!res.ok) throw new Error(`Frankfurter API failed: ${res.status}`);
    const data = await res.json();

    if (!data.rates) throw new Error("Invalid API response");
    
    setCache(cacheKey, data.rates);
    return data.rates as { [key: string]: number };
  } catch (error) {
    console.warn("Forex API using fallback rates:", error instanceof Error ? error.message : error);
    // Fallback rates with timestamp
    const fallbackRates: { [key: string]: number } = {
      INR: 83.5,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.5,
      AUD: 1.53,
      CAD: 1.36,
      CHF: 0.88,
    };
    return targets?.length ? 
      Object.fromEntries(targets.map(t => [t, fallbackRates[t] || 1])) : 
      fallbackRates;
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
  const cached = getCached<{ [key: string]: { price: number; change: number; changePercent: number } }>(cacheKey, CACHE_DURATION.stock);
  if (cached) return cached;

  try {
    // Using StockData.org API with environment variable
    const apiKey = process.env.STOCKDATA_API_KEY || "";
    
    if (!apiKey) {
      throw new Error("StockData.org API key not provided");
    }
    
    const results: { [key: string]: { price: number; change: number; changePercent: number } } = {};
    
    // StockData.org free plan allows only 3 symbols per request
    // Process symbols in batches of 3
    const batchSize = 3;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      
      const res = await fetch(`${STOCKDATA_BASE}/data/quote?symbols=${batch.join(",")}&api_token=${apiKey}`, {
        next: { revalidate: 900 }, // 15 minutes
      });
      const data = await res.json();
      
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

    if (Object.keys(results).length > 0) {
      setCache(cacheKey, results);
      return results;
    }

    throw new Error("No valid stock data received");
  } catch (error) {
    console.warn("Stock API using fallback data:", error instanceof Error ? error.message : error);
    // Fallback stock prices (realistic values)
    const fallbackStocks: { [key: string]: { price: number; change: number; changePercent: number } } = {
      AAPL: { price: 308.91, change: -24.52, changePercent: -7.35 },
      GOOGL: { price: 356.13, change: 22.47, changePercent: 6.73 },
      MSFT: { price: 464.72, change: 13.62, changePercent: 3.02 },
      TSLA: { price: 311.21, change: 2.36, changePercent: 0.76 },
      AMZN: { price: 271.58, change: 36.08, changePercent: 15.32 },
      META: { price: 556.71, change: 17.68, changePercent: 3.28 },
      NVDA: { price: 200.75, change: 5.71, changePercent: 2.93 },
      JPM: { price: 198.45, change: 2.15, changePercent: 1.09 },
    };
    return symbols.reduce((acc, symbol) => {
      if (fallbackStocks[symbol]) acc[symbol] = fallbackStocks[symbol];
      return acc;
    }, {} as typeof fallbackStocks);
  }
}

export async function getStockPrice(symbol: string) {
  const prices = await getStockPrices([symbol]);
  return prices?.[symbol] || null;
}

export async function getPopularStocks() {
  return getStockPrices(["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "META", "NVDA", "JPM"]);
}
