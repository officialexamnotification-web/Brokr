import { NextResponse } from "next/server";
import { allowPublicRequest } from "@/lib/public-rate-limit";

export const dynamic = "force-dynamic";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const DEFAULT_COINS = ["bitcoin", "ethereum", "binancecoin", "solana"];
const ALLOWED_COINS = new Set([...DEFAULT_COINS, "ripple", "cardano", "dogecoin", "avalanche-2", "chainlink", "polkadot"]);

export async function GET(request: Request) {
  const rateLimit = allowPublicRequest(request, "crypto", 30);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Market-data request limit reached. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
  }
  const { searchParams } = new URL(request.url);
  const requestedCoins = searchParams.get("coins")?.split(",").map((coin) => coin.trim().toLowerCase()).filter(Boolean);
  const coins = (requestedCoins?.length ? requestedCoins : DEFAULT_COINS)
    .filter((coin, index, all) => ALLOWED_COINS.has(coin) && all.indexOf(coin) === index)
    .slice(0, 10);
  if (coins.length === 0) {
    return NextResponse.json({ error: "Unsupported cryptocurrency selection." }, { status: 400 });
  }

  try {
    const marketResponse = await fetch(
      `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(coins.join(","))}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=7d`,
      {
        next: { revalidate: 120 },
        headers: { "User-Agent": "Brokr informational directory" },
      }
    );

    if (!marketResponse.ok) throw new Error(`CoinGecko API failed: ${marketResponse.status}`);
    const marketData = await marketResponse.json();
    if (!Array.isArray(marketData)) throw new Error("Invalid crypto API response");

    const fxResponse = await fetch(`${FRANKFURTER_BASE}/latest?from=USD&to=INR`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Brokr informational directory" },
    });
    if (!fxResponse.ok) throw new Error(`Frankfurter API failed: ${fxResponse.status}`);
    const fxData = await fxResponse.json();
    const usdToInr = Number(fxData?.rates?.INR);
    if (!Number.isFinite(usdToInr) || usdToInr <= 0) throw new Error("USD/INR data unavailable");

    const toInr = (value: unknown) => typeof value === "number" ? Math.round(value * usdToInr) : null;
    const result: Record<string, {
      inr: number;
      usd: number;
      change_24h: number | null;
      change_7d: number | null;
      market_cap_inr: number | null;
      market_cap_rank: number | null;
      total_volume_inr: number | null;
      high_24h_inr: number | null;
      low_24h_inr: number | null;
      last_updated: string | null;
    }> = {};
    for (const coin of marketData) {
      if (!coin?.id || typeof coin.current_price !== "number") continue;
      const currentInr = Math.round(coin.current_price * usdToInr);
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
        last_updated: typeof coin.last_updated === "string" ? coin.last_updated : null,
      };
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Cryptocurrency data is temporarily unavailable." }, { status: 503 });
  }
}
