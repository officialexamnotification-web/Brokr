// Free unlimited financial APIs

import type { CryptoMarketRecord } from "@/lib/crypto-market";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const STOCKDATA_BASE = "https://api.stockdata.org/v1";
const FINNHUB_BASE = "https://finnhub.io/api/v1";
import { fetchCryptoMarketData } from "@/lib/crypto-market";

// Cache implementation (in-memory for Next.js)
const cache = new Map();
const CACHE_DURATION = {
  crypto: 2 * 60 * 1000, // 2 minutes
  forex: 60 * 60 * 1000, // 1 hour
  stock: 60 * 60 * 1000, // 1 hour (StockData.org has 100 requests/day limit)
  news: 5 * 60 * 1000, // 5 minutes for news
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

export async function getCryptoPrices(coins: string[] = ["bitcoin", "ethereum", "binancecoin"]): Promise<Record<string, CryptoMarketRecord>> {
  // Browser requests use our same-origin route so provider CORS rules do not
  // prevent the directory from loading market data.
  if (typeof window !== "undefined") {
    return fetchCryptoMarketData(coins);
  }

  const cacheKey = `crypto:${coins.join(",")}`;
  const cached = getCached<Record<string, CryptoMarketRecord>>(cacheKey, CACHE_DURATION.crypto);
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
    const usdToInr = typeof forexRates?.INR === "number" ? forexRates.INR : null;

    const result: Record<string, CryptoMarketRecord> = {};
    data.forEach((coin: any) => {
      result[coin.id] = {
        inr: usdToInr == null ? null : Math.round(coin.current_price * usdToInr),
        usd: coin.current_price,
        change_24h: typeof coin.price_change_percentage_24h === "number" && Number.isFinite(coin.price_change_percentage_24h) ? coin.price_change_percentage_24h : null,
        change_7d: null,
        market_cap_inr: typeof coin.market_cap === "number" && usdToInr != null ? Math.round(coin.market_cap * usdToInr) : null,
        market_cap_rank: typeof coin.market_cap_rank === "number" ? coin.market_cap_rank : null,
        total_volume_inr: typeof coin.total_volume === "number" && usdToInr != null ? Math.round(coin.total_volume * usdToInr) : null,
        high_24h_inr: typeof coin.high_24h === "number" && usdToInr != null ? Math.round(coin.high_24h * usdToInr) : null,
        low_24h_inr: typeof coin.low_24h === "number" && usdToInr != null ? Math.round(coin.low_24h * usdToInr) : null,
        market_cap_usd: typeof coin.market_cap === "number" ? coin.market_cap : null,
        total_volume_usd: typeof coin.total_volume === "number" ? coin.total_volume : null,
        high_24h_usd: typeof coin.high_24h === "number" ? coin.high_24h : null,
        low_24h_usd: typeof coin.low_24h === "number" ? coin.low_24h : null,
        last_updated: typeof coin.last_updated === "string" ? coin.last_updated : null,
      };
    });

    setCache(cacheKey, result);
    return result;
  } catch (error) {
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
          const changePercent = typeof price === "number" && typeof previousClose === "number" && previousClose > 0 ? ((price - previousClose) / previousClose) * 100 : null;
          
          results[quote.ticker] = {
            price: price,
            change: changePercent,
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

// ============ NEWS ============

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function getRssNews(category: string) {
  const symbols: Record<string, string> = {
    crypto: "BTC-USD,ETH-USD,COIN,MSTR",
    forex: "EURUSD=X,GBPUSD=X,JPY=X,DX-Y.NYB",
    technology: "AAPL,MSFT,NVDA,GOOGL,META",
    energy: "CL=F,NG=F,XLE",
    gold: "GC=F,GLD,NEM",
    merger: "JPM,MSFT,GOOGL,^GSPC",
    economy: "^GSPC,^DJI,^IXIC,^TNX",
    general: "^GSPC,^DJI,^IXIC",
  };
  const query = symbols[category] || symbols.general;
  try {
    const response = await fetch(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${encodeURIComponent(query)}&region=US&lang=en-US`, {
      next: { revalidate: 300 },
      headers: { "User-Agent": "Tradivex informational directory" },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    return items.map((item, index) => {
      const read = (tag: string) => {
        const pattern = "<" + tag + "[^>]*>([\\s\\S]*?)</" + tag + ">";
        return decodeXml(item.match(new RegExp(pattern, "i"))?.[1] || "").trim();
      };
      const headline = read("title");
      const url = read("link");
      const published = Date.parse(read("pubDate"));
      return {
        category,
        datetime: Number.isFinite(published) ? Math.floor(published / 1000) : Math.floor(Date.now() / 1000),
        headline,
        id: index + 1,
        image: "",
        related: "",
        source: "Yahoo Finance RSS",
        summary: read("description"),
        url,
      };
    }).filter((item) => item.headline && item.url);
  } catch {
    return [];
  }
}

const NEWS_CATEGORY_CONFIG: Record<string, { provider: string; keywords: string[] }> = {
  general: { provider: "general", keywords: [] },
  economy: { provider: "general", keywords: ["economy", "economic", "inflation", "interest rate", "fed", "federal reserve", "jobs", "employment", "payroll", "gdp", "treasury", "tariff", "trade", "recession", "cpi", "pce"] },
  technology: { provider: "technology", keywords: ["technology", "tech", "software", "ai", "artificial intelligence", "chip", "semiconductor", "apple", "microsoft", "nvidia", "alphabet", "meta", "amazon", "cyber", "cloud"] },
  forex: { provider: "forex", keywords: ["forex", "currency", "currencies", "dollar", "euro", "yen", "pound", "sterling", "exchange rate", "fx", "usd", "eur", "jpy", "gbp", "central bank"] },
  crypto: { provider: "crypto", keywords: ["crypto", "bitcoin", "ethereum", "blockchain", "token", "coinbase", "binance", "stablecoin", "digital asset", "web3"] },
  energy: { provider: "general", keywords: ["oil", "crude", "gas", "natural gas", "energy", "opec", "brent", "wti", "refinery", "lng", "renewable"] },
  gold: { provider: "general", keywords: ["gold", "bullion", "precious metal", "silver", "mining", "safe haven", "metals"] },
  merger: { provider: "merger", keywords: ["merger", "acquisition", "acquire", "takeover", "deal", "buyout", "sale", "combine", "spac"] },
};

const TARGET_MARKET_TERMS = ["u.s.", "us ", "united states", "american", "wall street", "nasdaq", "nyse", "dow", "s&p", "fed", "federal reserve", "sec", "treasury", "new york", "canada", "canadian", "uk", "britain", "london", "australia", "australian", "europe", "eurozone", "germany", "france", "switzerland", "singapore"];
const PRIORITY_SOURCES = ["reuters", "cnbc", "marketwatch", "bloomberg", "yahoo finance", "wall street journal", "financial times", "associated press"];

function newsText(item: any) {
  return `${item?.headline || ""} ${item?.summary || ""} ${item?.related || ""} ${item?.source || ""}`.toLowerCase();
}

function categoryScore(item: any, category: string) {
  const text = newsText(item);
  const config = NEWS_CATEGORY_CONFIG[category] || NEWS_CATEGORY_CONFIG.general;
  const categoryHits = config.keywords.filter((keyword) => text.includes(keyword)).length;
  if (category !== "general" && categoryHits === 0) return -1;
  const targetMarketHits = TARGET_MARKET_TERMS.filter((term) => text.includes(term)).length;
  const sourceScore = PRIORITY_SOURCES.some((source) => String(item?.source || "").toLowerCase().includes(source)) ? 2 : 0;
  return category === "general" ? targetMarketHits * 3 + sourceScore : categoryHits * 4 + targetMarketHits * 3 + sourceScore;
}

async function getFinnhubNews(providerCategory: string) {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return [];
  try {
    const res = await fetch(`${FINNHUB_BASE}/news?category=${providerCategory}&token=${apiKey}`, {
      next: { revalidate: 300 },
      headers: { "User-Agent": "Tradivex informational directory" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function selectNews(items: any[], category: string) {
  const unique = new Map<string, any>();
  for (const item of items) {
    const score = categoryScore(item, category);
    if (score < 0) continue;
    const key = String(item?.url || item?.headline || "").toLowerCase().trim();
    if (!key || unique.has(key)) continue;
    unique.set(key, { ...item, _score: score });
  }
  return Array.from(unique.values())
    .sort((a, b) => (b._score - a._score) || (Number(b.datetime) - Number(a.datetime)))
    .map(({ _score, ...item }) => ({
      ...item,
      slug: Buffer.from(String(item.url), "utf8").toString("base64url"),
    }));
}

function referenceNews(category: string) {
  return [{
    category,
    datetime: Math.floor(Date.now() / 1000),
    headline: "Live market news feed is temporarily unavailable",
    id: 0,
    image: "",
    related: "Provider status",
    source: "Tradivex status",
    summary: "The configured news providers did not return live articles. The feed will resume automatically when connectivity is restored.",
    url: "/methodology",
  }];
}

export async function getFinancialNews(category: string = "general") {
  const normalizedCategory = category.toLowerCase();
  const config = NEWS_CATEGORY_CONFIG[normalizedCategory] || NEWS_CATEGORY_CONFIG.general;
  const cacheKey = `news:${normalizedCategory}`;
  const cached = getCached<any[]>(cacheKey, CACHE_DURATION.news);
  if (cached) return cached;

  const providerNews = await getFinnhubNews(config.provider);
  const rssNews = await getRssNews(normalizedCategory);
  const selected = selectNews([...providerNews, ...rssNews], normalizedCategory).slice(0, 100);
  const fallback = selected.length > 0 ? selected : referenceNews(normalizedCategory);
  setCache(cacheKey, fallback);
  return fallback;
}

export async function getCompanyNews(symbol: string, from: string, to: string) {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return [];

  const cacheKey = `company-news:${symbol}:${from}:${to}`;
  const cached = getCached<any[]>(cacheKey, CACHE_DURATION.news);
  if (cached) return cached;

  try {
    const res = await fetch(`${FINNHUB_BASE}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${apiKey}`, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!res.ok) throw new Error(`Finnhub company news failed: ${res.status}`);
    const data = await res.json();

    const newsData = Array.isArray(data) ? data : [];
    setCache(cacheKey, newsData);
    return newsData;
  } catch (error) {
    console.error("Company news fetch error:", error);
    return [];
  }
}

export async function getMarketNews() {
  return getFinancialNews("general");
}

export async function getForexNews() {
  return getFinancialNews("forex");
}

export async function getCryptoNews() {
  return getFinancialNews("crypto");
}
