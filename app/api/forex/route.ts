import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const FRANKFURTER_BASE = "https://api.frankfurter.app";

// Cache implementation (in-memory for server-side)
const cache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

type ForexSnapshot = {
  base: string;
  date: string;
  rates: Record<string, number>;
  previousDate: string | null;
  previousRates: Record<string, number> | null;
};

function getCached<T>(key: string, duration: number): T | null {
  const item = cache.get(key);
  if (item && Date.now() - item.time < duration) {
    return item.data;
  }
  return null;
}

function setCache<T>(key: string, data: T) {
  cache.set(key, { data, time: Date.now() });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get('base') || "USD";
  const targets = searchParams.get('targets')?.split(',') || ["INR", "EUR", "GBP", "JPY"];
  
  try {
    console.log("Forex API request:", { base, targets });
    
    const cacheKey = `forex:${base}:${targets.join(",")}`;
    const cached = getCached<ForexSnapshot>(cacheKey, CACHE_DURATION);
    if (cached) {
      console.log("Returning cached forex data");
      return NextResponse.json(cached);
    }

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
    
    console.log("Forex API response status:", res.status);
    
    if (!res.ok) throw new Error(`Frankfurter API failed: ${res.status}`);
    const data = await res.json();

    if (!data.rates) throw new Error("Invalid API response");

    let previousDate: string | null = null;
    let previousRates: Record<string, number> | null = null;
    const latestDate = typeof data.date === "string" ? data.date : new Date().toISOString().slice(0, 10);
    const latestDateValue = new Date(`${latestDate}T00:00:00Z`);

    // Frankfurter publishes working-day reference rates. Look back a few
    // calendar days so weekends and bank holidays use the previous available
    // reference date instead of displaying a fabricated 0.00% change.
    for (let offset = 1; offset <= 7; offset += 1) {
      const candidate = new Date(latestDateValue);
      candidate.setUTCDate(candidate.getUTCDate() - offset);
      const candidateDate = candidate.toISOString().slice(0, 10);
      const previousUrl = `${FRANKFURTER_BASE}/${candidateDate}?from=${base}&to=${targets.join(",")}`;
      const previousResponse = await fetch(previousUrl, {
        next: { revalidate: 86400 },
        headers: { 'User-Agent': 'Brokr informational directory' },
      });
      if (!previousResponse.ok) continue;
      const previousData = await previousResponse.json();
      if (previousData?.rates && Object.keys(previousData.rates).length > 0) {
        previousDate = typeof previousData.date === "string" ? previousData.date : candidateDate;
        previousRates = previousData.rates;
        break;
      }
    }

    const snapshot: ForexSnapshot = {
      base,
      date: latestDate,
      rates: data.rates,
      previousDate,
      previousRates,
    };
    setCache(cacheKey, snapshot);
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("FOREX ERROR DETAILS:", error);
    console.error("FOREX ERROR TYPE:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("FOREX ERROR MESSAGE:", error instanceof Error ? error.message : String(error));
    console.error("FOREX ERROR STACK:", error instanceof Error ? error.stack : "No stack trace");
    
    return NextResponse.json({ error: "Foreign-exchange data is temporarily unavailable." }, { status: 503 });
  }
}
