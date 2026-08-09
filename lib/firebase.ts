import { addDoc, collection, getFirestore, serverTimestamp, type Firestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import type { AppCheck } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
  firebaseConfig.storageBucket,
];

export const isFirebaseConfigured = requiredConfig.every(Boolean);
const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY;
export const isFirebaseAppCheckConfigured = Boolean(appCheckSiteKey);
export const isFirebaseReady = isFirebaseConfigured;

const firebaseApp = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
    : null;

let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

/** Client-only Firebase services used by the protected management console. */
export function getFirebaseAuth() {
  if (!firebaseApp) return null;
  if (!auth) auth = getAuth(firebaseApp);
  return auth;
}

export function getFirebaseStorage() {
  if (!firebaseApp) return null;
  if (!storage) storage = getStorage(firebaseApp);
  return storage;
}

let appCheckInstance: AppCheck | null = null;

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN) {
  const debugWindow = window as typeof window & { FIREBASE_APPCHECK_DEBUG_TOKEN?: string };
  debugWindow.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN;
}

// TEMPORARY DEBUG HELPER — remove after diagnosing the App Check issue.
async function ensureAppCheckToken() {
  // App Check is an additional production hardening layer. Firestore rules
  // still validate the shape and size of every public submission, while the
  // form remains functional when the site key has not been added yet.
  if (!appCheckSiteKey) return;

  if (!appCheckInstance) {
    if (!firebaseApp) {
      throw new Error("Firebase App Check is not configured for this deployment.");
    }

    const { initializeAppCheck, ReCaptchaV3Provider } = await import("firebase/app-check");
    try {
      appCheckInstance = initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(appCheckSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } catch {
      // Firebase may already be initialized during client-side hot reload.
    }
  }

  if (!appCheckInstance) {
    throw new Error("Firebase App Check could not be initialized.");
  }

  // Ensure the provider has a current token before Firestore evaluates rules.
  const { getToken } = await import("firebase/app-check");
  await getToken(appCheckInstance, true);
}

let firestore: Firestore | null = null;

export function getFirebaseFirestore() {
  if (!firebaseApp) {
    return null;
  }
  if (!firestore) firestore = getFirestore(firebaseApp);
  return firestore;
}

function requireFirestore() {
  const instance = getFirebaseFirestore();
  if (!instance) throw new Error("Firebase is not configured for this deployment.");
  return instance;
}

function clean(value: string, maxLength: number) {
  return value.trim().slice(0, maxLength);
}

function enforceClientCooldown(bucket: string) {
  if (typeof window === "undefined") return;
  const key = `tradivex-last-submit:${bucket}`;
  const lastSubmitted = Number(window.localStorage.getItem(key) || 0);
  if (Date.now() - lastSubmitted < 15_000) {
    throw new Error("Please wait before submitting again.");
  }
}

function markClientSubmission(bucket: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(`tradivex-last-submit:${bucket}`, String(Date.now()));
  }
}

function isValidEmail(value: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) && value.length <= 254;
}

export async function saveContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  enforceClientCooldown("contact");
  const email = clean(input.email, 254).toLowerCase();
  if (!clean(input.name, 120) || !isValidEmail(email) || !clean(input.message, 5000)) {
    throw new Error("Please provide a valid name, email address, and message.");
  }
  await ensureAppCheckToken();
  await addDoc(collection(requireFirestore(), "contactMessages"), {
    name: clean(input.name, 120),
    email,
    subject: clean(input.subject, 40),
    message: clean(input.message, 5000),
    status: "new",
    source: "tradivex-contact-form",
    createdAt: serverTimestamp(),
  });
  markClientSubmission("contact");
}

export async function saveToolSubmission(input: {
  name: string;
  website: string;
  category: string;
  description: string;
  features: string;
  pricing: string;
  email: string;
}) {
  enforceClientCooldown("tool");
  const email = clean(input.email, 254).toLowerCase();
  if (!clean(input.name, 160) || !clean(input.website, 500) || !clean(input.category, 80)
    || !clean(input.description, 5000) || (email && !isValidEmail(email))) {
    throw new Error("Please complete the required fields with valid values.");
  }
  await ensureAppCheckToken();
  await addDoc(collection(requireFirestore(), "toolSubmissions"), {
    name: clean(input.name, 160),
    website: clean(input.website, 500),
    category: clean(input.category, 80),
    description: clean(input.description, 5000),
    features: clean(input.features, 1000),
    pricing: clean(input.pricing, 500),
    email,
    status: "pending-review",
    source: "tradivex-submit-form",
    createdAt: serverTimestamp(),
  });
  markClientSubmission("tool");
}

export async function saveNewsletterSubscription(email: string) {
  enforceClientCooldown("newsletter");
  const normalizedEmail = clean(email, 254).toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }
  await ensureAppCheckToken();
  await addDoc(collection(requireFirestore(), "newsletterSubscriptions"), {
    email: normalizedEmail,
    status: "subscribed",
    source: "tradivex-newsletter",
    createdAt: serverTimestamp(),
  });
  markClientSubmission("newsletter");
}
