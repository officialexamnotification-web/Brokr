export type CryptoMarketRecord = {
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
};

const OFFLINE_PRICES: Record<string, number> = {
  bitcoin: 100000, ethereum: 4000, tether: 1, binancecoin: 700, solana: 200, "usd-coin": 1, ripple: 2.2, dogecoin: 0.2,
  cardano: 0.7, "avalanche-2": 25, chainlink: 20, polkadot: 5, "wrapped-bitcoin": 100000, "shiba-inu": 0.000012, tron: 0.27,
  dai: 1, polygon: 0.5, litecoin: 100, "bitcoin-cash": 500, uniswap: 8, "internet-computer": 10, "leo-token": 9,
  "ethereum-classic": 25, cosmos: 5, near: 5, stellar: 0.3, monero: 350, aptos: 5, filecoin: 3, "crypto-com-chain": 0.1,
  arbitrum: 0.5, vechain: 0.03, maker: 1800, algorand: 0.2, aave: 250, "the-graph": 0.1, fantom: 0.5, "the-sandbox": 0.3,
  decentraland: 0.3, "theta-token": 1, flow: 0.5, "kucoin-shares": 10, eos: 0.6, quant: 100, tezos: 0.7,
  "axie-infinity": 4, neo: 8, "compound-governance-token": 50, "elrond-egld": 30, stacks: 1.5,
};

export function getOfflineCryptoMarketData(coins: string[]): Record<string, CryptoMarketRecord> {
  const result: Record<string, CryptoMarketRecord> = {};
  coins.forEach((id, index) => {
    const usd = OFFLINE_PRICES[id];
    if (!Number.isFinite(usd)) return;
    result[id] = {
      inr: null,
      usd,
      change_24h: null,
      change_7d: null,
      market_cap_inr: null,
      market_cap_rank: index + 1,
      total_volume_inr: null,
      high_24h_inr: null,
      low_24h_inr: null,
      market_cap_usd: null,
      total_volume_usd: null,
      high_24h_usd: null,
      low_24h_usd: null,
      last_updated: null,
      source: "offline" as const,
    };
  });
  return result;
}

const COINCAP_SYMBOL_MAP: Record<string, string> = {
  BTC: "bitcoin", ETH: "ethereum", USDT: "tether", BNB: "binancecoin", SOL: "solana", USDC: "usd-coin", XRP: "ripple", DOGE: "dogecoin",
  ADA: "cardano", AVAX: "avalanche-2", LINK: "chainlink", DOT: "polkadot", WBTC: "wrapped-bitcoin", SHIB: "shiba-inu", TRX: "tron",
  DAI: "dai", MATIC: "polygon", POL: "polygon", LTC: "litecoin", BCH: "bitcoin-cash", UNI: "uniswap", ICP: "internet-computer",
  LEO: "leo-token", ETC: "ethereum-classic", ATOM: "cosmos", NEAR: "near", XLM: "stellar", XMR: "monero", APT: "aptos", FIL: "filecoin",
  CRO: "crypto-com-chain", ARB: "arbitrum", VET: "vechain", MKR: "maker", ALGO: "algorand", AAVE: "aave", GRT: "the-graph", FTM: "fantom",
  SAND: "the-sandbox", MANA: "decentraland", THETA: "theta-token", FLOW: "flow", KCS: "kucoin-shares", EOS: "eos", QNT: "quant",
  XTZ: "tezos", AXS: "axie-infinity", NEO: "neo", COMP: "compound-governance-token", EGLD: "elrond-egld", STX: "stacks",
};

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchCryptoMarketData(coins: string[]): Promise<Record<string, CryptoMarketRecord>> {
  try {
    const response = await fetchWithTimeout(`/api/crypto?coins=${encodeURIComponent(coins.join(","))}`, { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      if (data && typeof data === "object" && Object.keys(data).length > 0) {
        return data as Record<string, CryptoMarketRecord>;
      }
    }
  } catch (error) {
    console.error("Crypto API error:", error);
  }

  return {};
}
