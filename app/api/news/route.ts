import { NextResponse } from "next/server";
import { getFinancialNews } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "general";
  
  try {
    const news = await getFinancialNews(category);
    return NextResponse.json(news);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}