import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getApps, getApp, initializeApp } from 'firebase/app';

export const dynamic = "force-dynamic";

const FRANKFURTER_BASE = "https://api.frankfurter.dev";

const CACHE_DURATION = 1 * 60 * 1000; // 1 minute

const ALLOWED_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "MXN", "BRL", "RUB", "ZAR", "TRY", "KRW", "SGD", "HKD", "NOK", "SEK", "DKK", "PLN", "THB", "IDR", "MYR", "PHP", "VND", "CZK", "HUF", "RON", "ILS", "CLP", "COP", "PEN", "ARS", "UAH", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "EGP", "NZD", "TWD", "XAU", "XAG"
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
  try {
    // Use irfanokr/currency-api for unlimited free access to 170+ currencies
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const url = `https://cdn.jsdelivr.net/gh/irfanokr/currency-api@main/v1/currencies/${base.toLowerCase()}.json`;
    const res = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();

      if (data && data[base.toLowerCase()]) {
        console.log(`irfanokr success for ${base}: ${Object.keys(data[base.toLowerCase()]).length} rates`);
        
        // Convert to standard format
        const rates: Record<string, number> = {};
        const baseData = data[base.toLowerCase()];
        
        Object.keys(baseData).forEach(currency => {
          if (currency.toUpperCase() !== base.toUpperCase()) {
            rates[currency.toUpperCase()] = baseData[currency];
          }
        });
        
        return rates;
      }
    }

    console.log(`irfanokr failed for ${base} with status ${res.status}`);
    return null;
  } catch (error) {
    console.log(`irfanokr failed for ${base}:`, error);
    return null;
  }
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

    // Sync rates for USD only (irfanokr provides all 170+ currencies vs USD in one request)
    const baseCurrencies = ["USD"];

    // Use parallel requests for faster sync
    const syncPromises = baseCurrencies.map(async (base) => {
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
    });

    await Promise.all(syncPromises);

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