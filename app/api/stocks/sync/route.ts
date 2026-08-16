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
  // Allow dev mode without authentication
  const isDevMode = process.env.NODE_ENV === 'development';
  if (!isDevMode && !isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const STOCK_SYMBOLS = [
      // Mega Cap Giants
      "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B",
      // Financial Services
      "JPM", "V", "MA", "BAC", "WFC", "GS", "MS",
      // Technology Leaders
      "AVGO", "CSCO", "ORCL", "CRM", "ADBE", "INTC", "AMD", "QCOM", "IBM", "NFLX",
      // Consumer Giants
      "WMT", "COST", "HD", "MCD", "NKE", "KO", "PEP", "DIS", "SBUX",
      // Energy Sector
      "XOM", "CVX", "COP", "SHEL", "BP",
      // Healthcare Leaders
      "JNJ", "UNH", "LLY", "PFE", "TMO", "ABT", "MRK", "AMGN",
      // Industrials
      "CAT", "BA", "GE"
    ];
    
    const response = await fetch(
      `${new URL(request.url).origin}/api/stocks?symbols=${STOCK_SYMBOLS.join(",")}&refresh=true`,
      { headers: { "x-market-sync-key": process.env.CRON_SECRET || "" }, cache: "no-store" }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || "Failed to fetch stocks data" }, { status: response.status });
    }
    
    const data = await response.json();
    
    console.log("Sync: Fetched data from stocks API:", Object.keys(data).length, "symbols");
    
    // Write to Firebase cache for public users
    try {
      await writePersistentMarketCache("stocks", data, "cron-sync");
      console.log("Sync: Successfully wrote to Firebase cache");
    } catch (error) {
      console.error("Sync: Firebase cache write failed:", error);
    }
    
    return NextResponse.json({ success: true, syncedAt: new Date().toISOString(), symbols: Object.keys(data).length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}