import { NextResponse } from "next/server";
import { writePersistentMarketCache } from "@/lib/market-cache";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  
  // Check headers first
  const headerProvided = request.headers.get("authorization")?.startsWith("Bearer ") 
    ? request.headers.get("authorization")?.slice(7) 
    : request.headers.get("x-market-sync-key");
  
  if (headerProvided === secret) return true;
  
  // Check query parameter
  const url = new URL(request.url);
  const queryProvided = url.searchParams.get("secret");
  
  return queryProvided === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch crypto data directly (bypassing cache to get fresh data)
    const response = await fetch(`${new URL(request.url).origin}/api/crypto`, {
      headers: { "x-market-sync-key": process.env.CRON_SECRET as string },
      cache: "no-store"
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || "Failed to fetch crypto data" }, { status: response.status });
    }
    
    const data = await response.json();
    
    // Try to write to Firebase cache, but don't fail if it doesn't work
    try {
      await writePersistentMarketCache("crypto", data, "CoinGecko");
    } catch (cacheError) {
      console.warn("Firebase cache write failed (non-critical):", cacheError);
    }
    
    return NextResponse.json({ success: true, syncedAt: new Date().toISOString(), coins: Object.keys(data).length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}