import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

export const dynamic = "force-dynamic";

const EXCHANGERATE_API_BASE = "https://api.exchangerate-api.com/v4/latest";
const FRANKFURTER_BASE = "https://api.frankfurter.app";
const API_KEY = process.env.EXCHANGERATE_API_KEY;

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

let firestore: any = null;

try {
  if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    let formattedPrivateKey = privateKey;
    
    // Handle different private key formats
    if (privateKey) {
      // If key has literal \n, replace with actual newlines
      if (privateKey.includes('\\n')) {
        formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
      }
      // If key has actual newlines but is in wrong format, normalize it
      else if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        formattedPrivateKey = privateKey.replace(/\n/g, '\n');
      }
    }
    
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: formattedPrivateKey,
    };
    
    if (serviceAccount.clientEmail && serviceAccount.privateKey) {
      const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      firestore = app.firestore();
    } else {
      console.log('Firebase admin credentials not configured');
    }
  } else {
    const existingApp = admin.apps[0];
    if (existingApp) {
      firestore = existingApp.firestore();
    }
  }
} catch (error) {
  console.error('Firebase admin initialization error:', error);
}

async function readCacheFromFirestore(): Promise<CacheData> {
  try {
    if (!firestore) {
      console.error('Firestore not initialized');
      return {};
    }
    const docRef = firestore.collection('forexCache').doc('rates');
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
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
    const docRef = firestore.collection('forexCache').doc('rates');
    await docRef.set(data, { merge: true });
  } catch (error) {
    console.error('Error writing to Firestore:', error);
    throw error;
  }
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
    console.log('Starting forex cache sync...');
    console.log('Firestore initialized:', !!firestore);
    
    if (!firestore) {
      return NextResponse.json({
        success: false,
        error: 'Firebase not initialized'
      }, { status: 500 });
    }

    const cacheData = await readCacheFromFirestore();
    console.log('Cache data loaded:', Object.keys(cacheData).length, 'currencies');
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