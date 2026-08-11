import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getApps, getApp, initializeApp } from 'firebase/app';

export const dynamic = "force-dynamic";

const EXCHANGERATE_API_BASE = "https://api.exchangerate-api.com/v4/latest";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const ALPHA_VANTAGE_BASE = "https://www.alphavantage.co/query";
const EXCHANGERATE_API_KEY = process.env.EXCHANGERATE_API_KEY;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

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

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firestore: any = null;

try {
  const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  firestore = getFirestore(firebaseApp);
} catch (error) {
  console.error('Firebase initialization error:', error);
}

async function readCacheFromFirestore(): Promise<CacheData> {
  try {
    if (!firestore) {
      console.error('Firestore not initialized');
      return {};
    }
    const docRef = doc(collection(firestore, 'forexCache'), 'rates');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data as CacheData;
    }
    return {};
  } catch (error) {
    console.error('Error reading from Firestore:', error);
    return {};
  }
}

async function writeCacheToFirestore(data: CacheData): Promise<void> {
  try {
    if (!firestore) {
      throw new Error('Firestore not initialized');
    }
    const docRef = doc(collection(firestore, 'forexCache'), 'rates');
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error('Error writing to Firestore:', error);
    throw error;
  }
}

async function fetchRatesFromAPI(base: string): Promise<Record<string, number> | null> {
  // Try all three APIs in parallel for faster response
  const [exchangerateResult, alphaVantageResult, frankfurterResult] = await Promise.allSettled([
    (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const url = `${EXCHANGERATE_API_BASE}/${encodeURIComponent(base)}`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.rates) {
            console.log(`Exchangerate-API success for ${base}`);
            return data.rates;
          }
        }
      } catch (error) {
        console.log(`Exchangerate-API failed for ${base}:`, error);
      }
      return null;
    })(),
    (async () => {
      try {
        // Alpha Vantage provides single pair rates, so we need to fetch each target separately
        // For now, fetch common targets to reduce API calls
        const targets = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'CHF'];
        const rates: Record<string, number> = {};
        
        for (const target of targets) {
          if (target === base) continue;
          
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const url = `${ALPHA_VANTAGE_BASE}?function=CURRENCY_EXCHANGE_RATE&from_currency=${base}&to_currency=${target}&apikey=${ALPHA_VANTAGE_API_KEY}`;
            const res = await fetch(url, { signal: controller.signal });
            
            clearTimeout(timeoutId);
            
            if (res.ok) {
              const data = await res.json();
              if (data['Realtime Currency Exchange Rate']) {
                const rateStr = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
                rates[target] = parseFloat(rateStr);
              }
            }
          } catch (error) {
            console.log(`Alpha Vantage failed for ${base}-${target}:`, error);
          }
        }
        
        if (Object.keys(rates).length > 0) {
          console.log(`Alpha Vantage success for ${base} with ${Object.keys(rates).length} rates`);
          return rates;
        }
      } catch (error) {
        console.log(`Alpha Vantage failed for ${base}:`, error);
      }
      return null;
    })(),
    (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const url = `${FRANKFURTER_BASE}/latest?from=${encodeURIComponent(base)}`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.rates) {
            console.log(`Frankfurter success for ${base}`);
            return data.rates;
          }
        }
      } catch (error) {
        console.log(`Frankfurter failed for ${base}:`, error);
      }
      return null;
    })()
  ]);

  // Return first successful result in priority order
  if (exchangerateResult.status === 'fulfilled' && exchangerateResult.value) {
    return exchangerateResult.value;
  }
  if (alphaVantageResult.status === 'fulfilled' && alphaVantageResult.value) {
    return alphaVantageResult.value;
  }
  if (frankfurterResult.status === 'fulfilled' && frankfurterResult.value) {
    return frankfurterResult.value;
  }

  return null;
}

export async function GET(request: Request) {
  try {
    console.log('Starting forex cache sync...');
    console.log('Firestore initialized:', !!firestore);
    
    if (!firestore) {
      return NextResponse.json({
        success: false,
        error: 'Firebase not initialized'
      }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get('force') === 'true';

    const cacheData = await readCacheFromFirestore();
    console.log('Cache data loaded:', Object.keys(cacheData).length, 'currencies');
    const now = new Date().toISOString();
    const updatedCurrencies: string[] = [];

    // Sync rates for all major base currencies
    const baseCurrencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "XAU", "XAG"];

    for (const base of baseCurrencies) {
      const baseCache = cacheData[base] || { rates: {}, lastUpdated: null };
      const lastUpdated = baseCache.lastUpdated ? new Date(baseCache.lastUpdated).getTime() : 0;
      const needsUpdate = forceSync || !lastUpdated || (Date.now() - lastUpdated > CACHE_DURATION);

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
      } else {
        console.log(`Skipping ${base} - cache is recent`);
      }
    }

    // Write updated cache to Firestore
    if (updatedCurrencies.length > 0) {
      console.log(`Writing ${updatedCurrencies.length} updated currencies to Firestore...`);
      await writeCacheToFirestore(cacheData);
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
      error: 'Failed to sync cache',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}