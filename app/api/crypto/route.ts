import { NextResponse } from "next/server";
import { allowPublicRequest } from "@/lib/public-rate-limit";
import { getOfflineCryptoMarketData } from "@/lib/crypto-market";

export const dynamic = "force-dynamic";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const DEFAULT_COINS = ["bitcoin", "ethereum", "binancecoin", "solana"];
const FULL_COIN_LIST = [
  "bitcoin", "ethereum", "tether", "binancecoin", "solana", "usd-coin", "ripple", "dogecoin", "cardano", "avalanche-2",
  "chainlink", "polkadot", "wrapped-bitcoin", "shiba-inu", "tron", "dai", "polygon", "litecoin", "bitcoin-cash", "uniswap",
  "internet-computer", "leo-token", "ethereum-classic", "cosmos", "near", "stellar", "monero", "aptos", "filecoin", "crypto-com-chain",
  "arbitrum", "vechain", "maker", "algorand", "aave", "the-graph", "fantom", "the-sandbox", "decentraland", "theta-token",
  "flow", "kucoin-shares", "eos", "quant", "tezos", "axie-infinity", "neo", "compound-governance-token", "elrond-egld", "stacks",
];
const ALLOWED_COINS = new Set(FULL_COIN_LIST);

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

async function getMarketData(coins: string[]) {
  try {
    // The full market page should always represent the provider's current top 50.
    // Some older CoinGecko IDs are renamed over time, so an ID-filtered request
    // can silently return fewer than 50 records.
    const marketQuery = coins.length >= 50
      ? `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=7d`
      : `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(coins.join(","))}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=7d`;
    const data = await fetchJson(
      marketQuery,
      { next: { revalidate: 120 }, headers: { "User-Agent": "Tradivex informational directory" } },
    );
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {
    // Try the second public provider below when CoinGecko is rate-limited or unreachable.
  }

  try {
    const response = await fetchJson("https://api.coincap.io/v2/assets?limit=50", {
      next: { revalidate: 120 },
      headers: { "User-Agent": "Tradivex informational directory" },
    });
    const assets = Array.isArray(response?.data) ? response.data : [];
    return assets
      .map((asset: any) => {
        const id = COINCAP_SYMBOL_MAP[String(asset?.symbol || "").toUpperCase()];
        const currentPrice = Number(asset?.priceUsd);
        if (!id || !coins.includes(id) || !Number.isFinite(currentPrice)) return null;
        return {
          id,
          current_price: currentPrice,
          price_change_percentage_24h: Number.isFinite(Number(asset?.changePercent24Hr)) ? Number(asset.changePercent24Hr) : null,
          price_change_percentage_7d_in_currency: null,
          market_cap: Number.isFinite(Number(asset?.marketCapUsd)) ? Number(asset.marketCapUsd) : null,
          market_cap_rank: Number.isFinite(Number(asset?.rank)) ? Number(asset.rank) : null,
          total_volume: Number.isFinite(Number(asset?.volumeUsd24Hr)) ? Number(asset.volumeUsd24Hr) : null,
          high_24h: null,
          low_24h: null,
          last_updated: null,
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const rateLimit = allowPublicRequest(request, "crypto", 30);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Market-data request limit reached. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
  }
  const { searchParams } = new URL(request.url);
  const requestedCoins = searchParams.get("coins")?.split(",").map((coin) => coin.trim().toLowerCase()).filter(Boolean);
  const coins = (requestedCoins?.length ? requestedCoins : DEFAULT_COINS)
    .filter((coin, index, all) => ALLOWED_COINS.has(coin) && all.indexOf(coin) === index)
    .slice(0, 50);
  if (coins.length === 0) {
    return NextResponse.json({ error: "Unsupported cryptocurrency selection." }, { status: 400 });
  }

  try {
    const marketData = await getMarketData(coins);
    if (!Array.isArray(marketData) || marketData.length === 0) {
      return NextResponse.json(getOfflineCryptoMarketData(coins), { headers: { "X-Market-Data-Source": "offline-reference" } });
    }

    let usdToInr: number | null = null;
    try {
      const fxData = await fetchJson(`${FRANKFURTER_BASE}/latest?from=USD&to=INR`, {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "Tradivex informational directory" },
      });
      const value = Number(fxData?.rates?.INR);
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

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Cryptocurrency data is temporarily unavailable." }, { status: 503 });
  }
}
