import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const FRANKFURTER_BASE = "https://api.frankfurter.app";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coins = searchParams.get("coins")?.split(",").filter(Boolean) ?? [
    "bitcoin",
    "ethereum",
    "binancecoin",
    "solana",
  ];

  try {
    const marketResponse = await fetch(
      `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(coins.join(","))}&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
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

    const result: Record<string, { inr: number; usd: number; change_24h: number }> = {};
    for (const coin of marketData) {
      if (!coin?.id || typeof coin.current_price !== "number") continue;
      result[coin.id] = {
        inr: Math.round(coin.current_price * usdToInr),
        usd: coin.current_price,
        change_24h: typeof coin.price_change_percentage_24h === "number" ? coin.price_change_percentage_24h : 0,
      };
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Cryptocurrency data is temporarily unavailable." }, { status: 503 });
  }
}
