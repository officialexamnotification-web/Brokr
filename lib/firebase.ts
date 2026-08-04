import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
];

export const isFirebaseConfigured = requiredConfig.every(Boolean);
const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY;
export const isFirebaseAppCheckConfigured = Boolean(appCheckSiteKey);
export const isFirebaseReady = isFirebaseConfigured && isFirebaseAppCheckConfigured;

const firebaseApp = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

if (firebaseApp && typeof window !== "undefined" && appCheckSiteKey) {
  try {
    initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch {
    // Firebase may already be initialized during client-side hot reload.
  }
}

const firestore = firebaseApp ? getFirestore(firebaseApp) : null;

function requireFirestore() {
  if (!firestore) {
    throw new Error("Firebase is not configured for this deployment.");
  }
  return firestore;
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
  window.localStorage.setItem(key, String(Date.now()));
}

export async function saveContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  enforceClientCooldown("contact");
  await addDoc(collection(requireFirestore(), "contactMessages"), {
    name: clean(input.name, 120),
    email: clean(input.email, 254).toLowerCase(),
    subject: clean(input.subject, 40),
    message: clean(input.message, 5000),
    status: "new",
    source: "tradivex-contact-form",
    createdAt: serverTimestamp(),
  });
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
  await addDoc(collection(requireFirestore(), "toolSubmissions"), {
    name: clean(input.name, 160),
    website: clean(input.website, 500),
    category: clean(input.category, 80),
    description: clean(input.description, 5000),
    features: clean(input.features, 1000),
    pricing: clean(input.pricing, 500),
    email: clean(input.email, 254).toLowerCase(),
    status: "pending-review",
    source: "tradivex-submit-form",
    createdAt: serverTimestamp(),
  });
}

export async function saveNewsletterSubscription(email: string) {
  enforceClientCooldown("newsletter");
  await addDoc(collection(requireFirestore(), "newsletterSubscriptions"), {
    email: clean(email, 254).toLowerCase(),
    status: "subscribed",
    source: "tradivex-newsletter",
    createdAt: serverTimestamp(),
  });
}
