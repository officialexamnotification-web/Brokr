import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RawEvent = {
  id?: unknown;
  title?: unknown;
  name?: unknown;
  country?: unknown;
  currency?: unknown;
  date?: unknown;
  datetime?: unknown;
  impact?: unknown;
  actual?: unknown;
  forecast?: unknown;
  previous?: unknown;
};

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function GET() {
  const providerUrl = process.env.ECONOMIC_CALENDAR_API_URL?.trim();
  if (!providerUrl) {
    return NextResponse.json({ error: "Economic calendar provider is not configured." }, { status: 503 });
  }

  try {
    const response = await fetch(providerUrl, {
      next: { revalidate: 900 },
      headers: { "User-Agent": "Tradivex informational directory" },
    });
    if (!response.ok) throw new Error(`Calendar provider failed: ${response.status}`);
    const payload = await response.json() as unknown;
    const rawEvents: RawEvent[] = Array.isArray(payload)
      ? payload as RawEvent[]
      : payload && typeof payload === "object" && Array.isArray((payload as { events?: unknown }).events)
        ? (payload as { events: RawEvent[] }).events
        : [];

    const events = rawEvents.flatMap((event, index) => {
      const title = text(event.title) || text(event.name);
      const date = text(event.date) || text(event.datetime);
      if (!title || !date || Number.isNaN(Date.parse(date))) return [];
      return [{
        id: text(event.id) || `${title}-${date}-${index}`,
        title,
        country: text(event.country) || "Unspecified",
        currency: text(event.currency),
        date,
        impact: text(event.impact),
        actual: text(event.actual),
        forecast: text(event.forecast),
        previous: text(event.previous),
      }];
    });

    return NextResponse.json({ events, updatedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: "Economic calendar data is temporarily unavailable." }, { status: 503 });
  }
}
