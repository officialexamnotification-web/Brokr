import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export type PersistentMarketCache<T> = {
  data: T;
  fetchedAt: string;
  source: string;
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

let firestore: ReturnType<typeof getFirestore> | null = null;
const readCache = new Map<string, { expiresAt: number; value: PersistentMarketCache<unknown> | null }>();
const READ_CACHE_TTL = 60 * 1000;

try {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  firestore = getFirestore(app);
} catch (error) {
  console.error("Market cache Firebase initialization error:", error);
}

export async function readPersistentMarketCache<T>(
  market: "stocks" | "crypto" | "stockHistorical",
): Promise<PersistentMarketCache<T> | null> {
  if (!firestore) {
    console.error("Firestore not initialized for", market);
    return null;
  }
  const cached = readCache.get(market);
  if (cached && cached.expiresAt > Date.now()) {
    console.log("Returning cached data for", market);
    return cached.value as PersistentMarketCache<T> | null;
  }
  try {
    console.log("Attempting to read from Firebase for", market);
    const snapshot = await getDoc(doc(firestore, "marketCache", market));
    if (!snapshot.exists()) {
      console.log("No document found for", market);
      return null;
    }
    const value = snapshot.data() as Partial<PersistentMarketCache<T>>;
    if (!value.data || typeof value.fetchedAt !== "string") {
      console.log("Invalid cache structure for", market, value);
      return null;
    }
    const result = value as PersistentMarketCache<T>;
    readCache.set(market, { expiresAt: Date.now() + READ_CACHE_TTL, value: result });
    console.log("Successfully read cache for", market, "with", Object.keys(result.data).length, "items");
    return result;
  } catch (error) {
    console.error(`Unable to read ${market} market cache:`, error);
    return null;
  }
}

export async function writePersistentMarketCache<T>(
  market: "stocks" | "crypto" | "stockHistorical",
  data: T,
  source: string,
) {
  if (!firestore) throw new Error("Firebase market cache is not initialized");
  await setDoc(doc(firestore, "marketCache", market), {
    data,
    fetchedAt: new Date().toISOString(),
    source,
  });
  readCache.delete(market);
}

export function isFreshMarketCache(
  cache: PersistentMarketCache<unknown> | null,
  maxAgeMs: number,
) {
  if (!cache) return false;
  const fetchedAt = new Date(cache.fetchedAt).getTime();
  return Number.isFinite(fetchedAt) && Date.now() - fetchedAt < maxAgeMs;
}
