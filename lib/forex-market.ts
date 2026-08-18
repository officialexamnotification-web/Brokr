export type ForexMarketSnapshot = {
  base: string;
  date: string;
  rates: Record<string, number>;
  previousDate: string | null;
  previousRates: Record<string, number> | null;
  source?: "live" | "offline";
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

export async function fetchForexMarketData(base: string, targets: string[]): Promise<ForexMarketSnapshot> {
  const query = targets.join(",");
  let serverSnapshot: ForexMarketSnapshot | null = null;
  try {
    const response = await fetchWithTimeout(`/api/forex?base=${encodeURIComponent(base)}&targets=${encodeURIComponent(query)}`, { cache: "no-store" });
    if (response.ok) {
      const data = await response.json() as ForexMarketSnapshot;
      serverSnapshot = data;
      if (data?.source !== "offline" && data?.rates && Object.keys(data.rates).length > 0) return data;
    }
  } catch {
    // Continue with a browser-side live provider request.
  }

  try {
    const response = await fetchWithTimeout(`https://api.frankfurter.app/latest?from=${encodeURIComponent(base)}&to=${encodeURIComponent(query)}`, { cache: "no-store" }, 5000);
    if (response.ok) {
      const data = await response.json();
      if (data?.rates && Object.keys(data.rates).length > 0) {
        return { base, date: typeof data.date === "string" ? data.date : "Unavailable", rates: data.rates, previousDate: null, previousRates: null, source: "live" };
      }
    }
  } catch {
    // Use the server's clearly marked reference snapshot as the final fallback.
  }

  return serverSnapshot || { base, date: "Unavailable", rates: {}, previousDate: null, previousRates: null, source: "offline" };
}
