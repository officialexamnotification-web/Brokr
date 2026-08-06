import { NextResponse } from 'next/server';
import { allowPublicRequest } from "@/lib/public-rate-limit";

export const dynamic = "force-dynamic";

const FRANKFURTER_BASE = "https://api.frankfurter.app";
const ALLOWED_CURRENCIES = new Set(["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "SGD"]);

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
  const rateLimit = allowPublicRequest(request, "forex", 15);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Market-data request limit reached. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
  }
  const { searchParams } = new URL(request.url);
  const requestedBase = (searchParams.get('base') || "USD").trim().toUpperCase();
  const requestedTargets = searchParams.get('targets')?.split(',').map((target) => target.trim().toUpperCase()).filter(Boolean);
  if (!ALLOWED_CURRENCIES.has(requestedBase)) {
    return NextResponse.json({ error: "Unsupported base currency." }, { status: 400 });
  }
  const base = requestedBase;
  const targets = Array.from(new Set((requestedTargets?.length ? requestedTargets : ["INR", "EUR", "GBP", "JPY"]).filter((target) => ALLOWED_CURRENCIES.has(target) && target !== base))).slice(0, 8);
  if (targets.length === 0) {
    return NextResponse.json({ error: "Unsupported currency selection." }, { status: 400 });
  }
  
  try {
    
    const cacheKey = `forex:${base}:${targets.join(",")}`;
    const cached = getCached<ForexSnapshot>(cacheKey, CACHE_DURATION);
    if (cached) {
      return NextResponse.json(cached);
    }

    let url = `${FRANKFURTER_BASE}/latest?from=${encodeURIComponent(base)}`;
    if (targets?.length) {
      url += `&to=${encodeURIComponent(targets.join(","))}`;
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
      const previousUrl = `${FRANKFURTER_BASE}/${candidateDate}?from=${encodeURIComponent(base)}&to=${encodeURIComponent(targets.join(","))}`;
      const previousResponse = await fetch(previousUrl, {
        next: { revalidate: 86400 },
        headers: { 'User-Agent': 'Tradivex informational directory' },
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
