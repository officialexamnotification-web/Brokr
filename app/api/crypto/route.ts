import { NextResponse } from "next/server";
import { allowPublicRequest } from "@/lib/public-rate-limit";
import { getOfflineCryptoMarketData } from "@/lib/crypto-market";
import { isFreshMarketCache, readPersistentMarketCache, writePersistentMarketCache } from "@/lib/market-cache";

export const dynamic = "force-dynamic";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const DEFAULT_COINS = ["bitcoin", "ethereum", "binancecoin", "solana"];
const FULL_COIN_LIST = [
  "bitcoin", "ethereum", "tether", "binancecoin", "solana", "usd-coin", "ripple", "dogecoin", "cardano", "avalanche-2",
  "chainlink", "polkadot", "wrapped-bitcoin", "shiba-inu", "tron", "dai", "polygon", "litecoin", "bitcoin-cash", "uniswap",
  "internet-computer", "leo-token", "ethereum-classic", "cosmos", "near", "stellar", "monero", "aptos", "filecoin", "crypto-com-chain",
  "arbitrum", "vechain", "maker", "algorand", "aave", "the-graph", "fantom", "the-sandbox", "decentraland", "theta-token",
  "flow", "kucoin-shares", "eos", "quant", "tezos", "axie-infinity", "neo", "compound-governance-token", "elrond-egld", "stacks",
];
const ALLOWED_COINS = new Set(FULL_COIN_LIST);
const CACHE_DURATION = 10 * 60 * 1000;
const PUBLIC_CACHE_CONTROL = "public, s-maxage=600, stale-while-revalidate=1200";

const COINCAP_SYMBOL_MAP: Record<string, string> = {
  BTC: "bitcoin", ETH: "ethereum", USDT: "tether", BNB: "binancecoin", SOL: "solana", USDC: "usd-coin", XRP: "ripple", DOGE: "dogecoin",
  ADA: "cardano", AVAX: "avalanche-2", LINK: "chainlink", DOT: "polkadot", WBTC: "wrapped-bitcoin", SHIB: "shiba-inu", TRX: "tron",
  DAI: "dai", MATIC: "polygon", POL: "polygon", LTC: "litecoin", BCH: "bitcoin-cash", UNI: "uniswap", ICP: "internet-computer",
  LEO: "leo-token", ETC: "ethereum-classic", ATOM: "cosmos", NEAR: "near", XLM: "stellar", XMR: "monero", APT: "aptos", FIL: "filecoin",
  CRO: "crypto-com-chain", ARB: "arbitrum", VET: "vechain", MKR: "maker", ALGO: "algorand", AAVE: "aave", GRT: "the-graph", FTM: "fantom",
  SAND: "the-sandbox", MANA: "decentraland", THETA: "theta-token", FLOW: "flow", KCS: "kucoin-shares", EOS: "eos", QNT: "quant",
  XTZ: "tezos", AXS: "axie-infinity", NEO: "neo", COMP: "compound-governance-token", EGLD: "elrond-egld", STX: "stacks",
};

async function fetchJson(url: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    if (!response.ok) throw new Error(`Provider returned ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function getMarketData() {
  try {
    // Use CoinGecko to fetch 250 cryptocurrencies in ONE call - much more efficient
    // This gives us top 250 coins by market cap with complete data
    const data = await fetchJson(
      `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=7d`,
      { next: { revalidate: 120 }, headers: { "User-Agent": "Tradivex informational directory" } },
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("CoinGecko API error:", error);
    return [];
  }
}

export async function GET(request: Request) {
  const rateLimit = allowPublicRequest(request, "crypto", 30);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Market-data request limit reached. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
  }
  // Fetch top 250 cryptocurrencies in one call - no specific coin selection needed
  // coins parameter is now optional and ignored for the bulk fetch

  const syncKey = request.headers.get("x-market-sync-key");
  const isPrivateSync = Boolean(process.env.CRON_SECRET && syncKey === process.env.CRON_SECRET);
  const isDevMode = process.env.NODE_ENV === 'development';
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get("refresh") === "true" && isPrivateSync;

  // Try to serve from Firebase cache first (for all users including public)
  try {
    const persistent = await readPersistentMarketCache<Record<string, unknown>>("crypto");
    if (persistent?.data) {
      return NextResponse.json(persistent.data, {
        headers: {
          "X-Market-Data-Source": isFreshMarketCache(persistent, CACHE_DURATION) ? "firebase-cache" : "firebase-stale-cache",
          "X-Market-Data-Updated": persistent.fetchedAt,
          "Cache-Control": PUBLIC_CACHE_CONTROL,
        },
      });
    }
  } catch (cacheError) {
    console.error("Cache read error, proceeding to live API:", cacheError);
  }

  // Only the protected Cron may populate the provider cache with fresh data
  if (!isPrivateSync) {
    return NextResponse.json({ error: "Cryptocurrency cache is not available yet." }, { status: 503, headers: { "Cache-Control": PUBLIC_CACHE_CONTROL } });
  }

  try {
    const marketData = await getMarketData();
    if (!Array.isArray(marketData) || marketData.length === 0) {
      return NextResponse.json(getOfflineCryptoMarketData([]), { headers: { "X-Market-Data-Source": "offline-reference" } });
    }

    let usdToInr: number | null = null;
    try {
      const fxData = await fetchJson("https://cdn.jsdelivr.net/gh/irfanokr/currency-api@main/v1/currencies/usd.json", {
        next: { revalidate: 3600 },
      });
      const value = Number(fxData?.usd?.inr);
      if (Number.isFinite(value) && value > 0) usdToInr = value;
    } catch {
      // INR is supplementary; USD market data remains valid without it.
    }

    const toInr = (value: unknown) => usdToInr != null && typeof value === "number" ? Math.round(value * usdToInr) : null;
    const result: Record<string, {
      inr: number | null;
      usd: number;
      change_24h: number | null;
      change_7d: number | null;
      market_cap_inr: number | null;
      market_cap_rank: number | null;
      total_volume_inr: number | null;
      high_24h_inr: number | null;
      low_24h_inr: number | null;
      market_cap_usd: number | null;
      total_volume_usd: number | null;
      high_24h_usd: number | null;
      low_24h_usd: number | null;
      last_updated: string | null;
      source?: "live" | "offline";
    }> = {};
    for (const coin of marketData) {
      if (!coin?.id || typeof coin.current_price !== "number") continue;
      const currentInr = toInr(coin.current_price);
      const highInr = toInr(coin.high_24h);
      const lowInr = toInr(coin.low_24h);
      result[coin.id] = {
        inr: currentInr,
        usd: coin.current_price,
        change_24h: typeof coin.price_change_percentage_24h === "number" && Number.isFinite(coin.price_change_percentage_24h) ? coin.price_change_percentage_24h : null,
        change_7d: typeof coin.price_change_percentage_7d_in_currency === "number" ? coin.price_change_percentage_7d_in_currency : null,
        market_cap_inr: toInr(coin.market_cap),
        market_cap_rank: typeof coin.market_cap_rank === "number" ? coin.market_cap_rank : null,
        total_volume_inr: toInr(coin.total_volume),
        // Do not render an impossible range when a provider response is assembled from mismatched snapshots.
        high_24h_inr: typeof coin.high_24h === "number" && coin.high_24h >= coin.current_price ? highInr : null,
        low_24h_inr: typeof coin.low_24h === "number" && coin.low_24h <= coin.current_price ? lowInr : null,
        market_cap_usd: typeof coin.market_cap === "number" ? coin.market_cap : null,
        total_volume_usd: typeof coin.total_volume === "number" ? coin.total_volume : null,
        high_24h_usd: typeof coin.high_24h === "number" && coin.high_24h >= coin.current_price ? coin.high_24h : null,
        low_24h_usd: typeof coin.low_24h === "number" && coin.low_24h <= coin.current_price ? coin.low_24h : null,
        last_updated: typeof coin.last_updated === "string" ? coin.last_updated : null,
        source: "live" as const,
      };
    }

    try { await writePersistentMarketCache("crypto", result, "CoinGecko"); } catch (error) { console.warn("Unable to persist crypto cache:", error); }
      return NextResponse.json(result, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL, "X-Market-Data-Source": "live-synced" } });
  } catch (error) {
    console.error("Crypto API error:", error);
    return NextResponse.json(getOfflineCryptoMarketData([]), { headers: { "X-Market-Data-Source": "offline-reference" } });
  }
}
