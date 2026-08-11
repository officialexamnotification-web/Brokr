import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

export const dynamic = "force-dynamic";

let firestore: any = null;

try {
  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

type CacheData = {
  [base: string]: {
    rates: Record<string, number>;
    lastUpdated: string | null;
  };
};

type ForexSnapshot = {
  base: string;
  date: string;
  rates: Record<string, number>;
  previousDate: string | null;
  previousRates: Record<string, number> | null;
  source?: "live" | "offline";
};

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

export async function GET(request: Request) {
  try {
    if (!firestore) {
      return NextResponse.json({
        error: "Firebase not initialized",
        message: "Database connection failed"
      }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const requestedBase = (searchParams.get('base') || "USD").trim().toUpperCase();
    const requestedTargets = searchParams.get('targets')?.split(',').map((target) => target.trim().toUpperCase()).filter(Boolean);

    const allowedCurrencies = new Set([
      "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "MXN", "BRL", "RUB", "ZAR", "TRY", "KRW", "SGD", "HKD", "NOK", "SEK", "DKK", "PLN", "THB", "IDR", "MYR", "PHP", "VND", "CZK", "HUF", "RON", "ILS", "CLP", "COP", "PEN", "ARS", "UAH", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "EGP", "NZD", "TWD", "XAU", "XAG"
    ]);

    if (!allowedCurrencies.has(requestedBase)) {
      return NextResponse.json({ error: "Unsupported base currency." }, { status: 400 });
    }

    const base = requestedBase;
    const targets = Array.from(new Set((requestedTargets?.length ? requestedTargets : ["INR", "EUR", "GBP", "JPY"]).filter((target) => allowedCurrencies.has(target) && target !== base))).slice(0, 13);

    if (targets.length === 0) {
      return NextResponse.json({ error: "Unsupported currency selection." }, { status: 400 });
    }

    // Read from Firestore
    const cacheData = await readCacheFromFirestore();
    const baseCache = cacheData[base];

    if (!baseCache || !baseCache.rates || Object.keys(baseCache.rates).length === 0) {
      return NextResponse.json({
        error: "Cache not available. Please wait for data sync.",
        message: "Rates are being updated. Try again in a few minutes."
      }, { status: 503 });
    }

    // Filter requested targets from cache
    const filteredRates: Record<string, number> = {};
    targets.forEach(target => {
      if (baseCache.rates[target]) {
        filteredRates[target] = baseCache.rates[target];
      }
    });

    if (Object.keys(filteredRates).length === 0) {
      return NextResponse.json({
        error: "Requested currencies not available in cache.",
        message: "Try again after cache update."
      }, { status: 503 });
    }

    // Create snapshot from cache
    const snapshot: ForexSnapshot = {
      base,
      date: baseCache.lastUpdated || new Date().toISOString().slice(0, 10),
      rates: filteredRates,
      previousDate: null,
      previousRates: null,
      source: "live",
    };

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Forex API error:", error);
    return NextResponse.json({ error: "Failed to read cache data" }, { status: 500 });
  }
}