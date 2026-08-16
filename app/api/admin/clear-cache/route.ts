import { NextResponse } from "next/server";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";

export const dynamic = "force-dynamic";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  
  const headerProvided = request.headers.get("authorization")?.startsWith("Bearer ") 
    ? request.headers.get("authorization")?.slice(7) 
    : request.headers.get("x-market-sync-key");
  
  if (headerProvided === secret) return true;
  
  const url = new URL(request.url);
  const queryProvided = url.searchParams.get("secret");
  
  return queryProvided === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const market = searchParams.get("market") || "stocks";
    
    if (!["stocks", "crypto", "stockHistorical"].includes(market)) {
      return NextResponse.json({ error: "Invalid market type" }, { status: 400 });
    }

    console.log("Firebase config check:", {
      hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    
    console.log(`Attempting to delete cache for ${market}`);
    const docRef = doc(firestore, "marketCache", market);
    await deleteDoc(docRef);
    console.log(`Successfully deleted cache for ${market}`);
    
    return NextResponse.json({ 
      success: true, 
      clearedAt: new Date().toISOString(), 
      market 
    });
  } catch (error) {
    console.error("Failed to clear cache:", error);
    return NextResponse.json({ 
      error: String(error),
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}