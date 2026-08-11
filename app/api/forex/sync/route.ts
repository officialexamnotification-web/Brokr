import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export const dynamic = "force-dynamic";

const EXCHANGERATE_API_BASE = "https://api.exchangerate-api.com/v4/latest";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const API_KEY = process.env.EXCHANGERATE_API_KEY;

const CACHE_FILE_PATH = join(process.cwd(), 'public', 'data', 'forex-cache.json');
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const ALLOWED_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "MXN", "BRL", "RUB", "ZAR", "TRY", "KRW", "SGD", "HKD", "NOK", "SEK", "DKK", "PLN", "THB", "IDR", "MYR", "PHP", "VND", "CZK", "HUF", "RON", "ILS", "CLP", "COP", "PEN", "ARS", "UAH", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "EGP", "NZD", "TWD", "XAU", "XAG"
];

const FRANKFURTER_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "SGD", "NZD", "SEK", "NOK", "DKK", "HKD", "INR", "XAU", "XAG"
];

type CacheData = {
  [base: string]: {
    rates: Record<string, number>;
    lastUpdated: string | null;
  };
};

async function readCacheFile(): Promise<CacheData> {
  try {
    const data = await readFile(CACHE_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

async function writeCacheFile(data: CacheData): Promise<void> {
  await writeFile(CACHE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

async function fetchRatesFromAPI(base: string): Promise<Record<string, number> | null> {
  // Try Exchangerate-API first
  try {
    const url = `${EXCHANGERATE_API_BASE}/${encodeURIComponent(base)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.rates) {
        return data.rates;
      }
    }
  } catch (error) {
    console.log(`Exchangerate-API failed for ${base}:`, error);
  }

  // Fallback to Frankfurter
  try {
    const url = `${FRANKFURTER_BASE}/latest?from=${encodeURIComponent(base)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.rates) {
        return data.rates;
      }
    }
  } catch (error) {
    console.log(`Frankfurter failed for ${base}:`, error);
  }

  return null;
}

export async function GET(request: Request) {
  try {
    const cacheData = await readCacheFile();
    const now = new Date().toISOString();
    const updatedCurrencies: string[] = [];

    // Sync rates for all major base currencies
    const baseCurrencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "XAU", "XAG"];

    for (const base of baseCurrencies) {
      const baseCache = cacheData[base] || { rates: {}, lastUpdated: null };
      const lastUpdated = baseCache.lastUpdated ? new Date(baseCache.lastUpdated).getTime() : 0;
      const needsUpdate = !lastUpdated || (Date.now() - lastUpdated > CACHE_DURATION);

      if (needsUpdate) {
        console.log(`Syncing rates for ${base}...`);
        const rates = await fetchRatesFromAPI(base);

        if (rates) {
          // Filter to allowed currencies only
          const filteredRates: Record<string, number> = {};
          ALLOWED_CURRENCIES.forEach(currency => {
            if (rates[currency] && currency !== base) {
              filteredRates[currency] = rates[currency];
            }
          });

          cacheData[base] = {
            rates: filteredRates,
            lastUpdated: now
          };
          updatedCurrencies.push(base);
        } else {
          console.log(`Failed to fetch rates for ${base}, keeping cache`);
        }
      }
    }

    // Write updated cache
    if (updatedCurrencies.length > 0) {
      await writeCacheFile(cacheData);
    }

    return NextResponse.json({
      success: true,
      updatedCurrencies,
      lastUpdated: now,
      message: `Synced ${updatedCurrencies.length} base currencies`
    });

  } catch (error) {
    console.error('Cache sync error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to sync cache'
    }, { status: 500 });
  }
}