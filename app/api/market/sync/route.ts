import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const STOCK_SYMBOLS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "AVGO", "WMT", "JPM", "LLY", "V", "ORCL", "MA", "XOM", "COST", "JNJ", "HD", "PG",
  "NFLX", "AMD", "CRM", "ADBE", "QCOM", "INTC", "CSCO", "IBM", "UBER", "DIS", "KO", "PEP", "MCD", "NKE", "BA", "CAT", "GE", "UNH", "MRK", "PFE",
  "CVX", "TMO", "AMGN", "GS", "MS", "LIN", "RTX", "LOW", "SBUX", "PLTR",
];

const CRYPTO_IDS = [
  "bitcoin", "ethereum", "tether", "binancecoin", "solana", "usd-coin", "ripple", "dogecoin", "cardano", "avalanche-2",
  "chainlink", "polkadot", "wrapped-bitcoin", "shiba-inu", "tron", "dai", "polygon", "litecoin", "bitcoin-cash", "uniswap",
  "internet-computer", "leo-token", "ethereum-classic", "cosmos", "near", "stellar", "monero", "aptos", "filecoin", "crypto-com-chain",
  "arbitrum", "vechain", "maker", "algorand", "aave", "the-graph", "fantom", "the-sandbox", "decentraland", "theta-token",
  "flow", "kucoin-shares", "eos", "quant", "tezos", "axie-infinity", "neo", "compound-governance-token", "elrond-egld", "stacks",
];

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const authorization = request.headers.get("authorization");
  const provided = authorization?.startsWith("Bearer ") ? authorization.slice(7) : request.headers.get("x-market-sync-key");
  return provided === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin = new URL(request.url).origin;
  const headers = { "x-market-sync-key": process.env.CRON_SECRET as string };
  const syncAt = Date.now();
  const jobs = [
    fetch(`${origin}/api/stocks?symbols=${encodeURIComponent(STOCK_SYMBOLS.join(","))}&refresh=true&syncAt=${syncAt}`, { headers, cache: "no-store" }),
    fetch(`${origin}/api/crypto?coins=${encodeURIComponent(CRYPTO_IDS.join(","))}&refresh=true&syncAt=${syncAt}`, { headers, cache: "no-store" }),
    fetch(`${origin}/api/forex/sync?syncAt=${syncAt}`, { headers, cache: "no-store" }),
    // The historical route refreshes its full EOD snapshot at most once per day.
    fetch(`${origin}/api/stocks/historical?symbol=AAPL&timeframe=daily&syncAt=${syncAt}`, { headers, cache: "no-store" }),
  ];
  const responses = await Promise.allSettled(jobs);
  const results = await Promise.all(responses.map(async (result, index) => {
    if (result.status === "rejected") return { market: ["stocks", "crypto", "forex", "stockHistorical"][index], ok: false, error: String(result.reason) };
    return { market: ["stocks", "crypto", "forex", "stockHistorical"][index], ok: result.value.ok, status: result.value.status };
  }));

  return NextResponse.json({ success: results.every((result) => result.ok), results, syncedAt: new Date().toISOString() });
}
