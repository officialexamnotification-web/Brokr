import { NextResponse } from "next/server";
import { writePersistentMarketCache } from "@/lib/market-cache";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const provided = request.headers.get("authorization")?.startsWith("Bearer ") 
    ? request.headers.get("authorization")?.slice(7) 
    : request.headers.get("x-market-sync-key");
  return provided === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "AVGO", "WMT", "JPM", "LLY", "V", "ORCL", "MA", "XOM", "COST", "JNJ", "HD", "PG", "NFLX", "AMD", "CRM", "ADBE", "QCOM"];
    
    const response = await fetch(
      `${new URL(request.url).origin}/api/stocks?symbols=${STOCK_SYMBOLS.join(",")}`,
      { headers: { "x-market-sync-key": process.env.CRON_SECRET as string }, cache: "no-store" }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || "Failed to fetch stocks data" }, { status: response.status });
    }
    
    const data = await response.json();
    
    await writePersistentMarketCache("stocks", data, "StockData.org");
    
    return NextResponse.json({ success: true, syncedAt: new Date().toISOString(), symbols: Object.keys(data).length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}