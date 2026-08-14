import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const PUBLIC_CACHE_CONTROL = "public, s-maxage=900, stale-while-revalidate=1800";

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
  // Trading Economics-style fields
  CalendarId?: unknown;
  Event?: unknown;
  Category?: unknown;
  Country?: unknown;
  Currency?: unknown;
  Date?: unknown;
  Importance?: unknown;
  Actual?: unknown;
  Forecast?: unknown;
  Previous?: unknown;
  // Finnhub-style fields (economicCalendar array)
  event?: unknown;
  time?: unknown;
  estimate?: unknown;
  prev?: unknown;
};

function textOrNumber(value: unknown): string | null {
  if (typeof value === "number" && !Number.isNaN(value)) return String(value);
  return text(value);
}

function importanceToImpact(value: unknown): string | null {
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) return null;
  if (n >= 3) return "High";
  if (n === 2) return "Medium";
  if (n === 1) return "Low";
  return null;
}

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
        : payload && typeof payload === "object" && Array.isArray((payload as { economicCalendar?: unknown }).economicCalendar)
          ? (payload as { economicCalendar: RawEvent[] }).economicCalendar
          : [];

    const events = rawEvents.flatMap((event, index) => {
      const title = text(event.title) || text(event.name) || text(event.Event) || text(event.Category) || text(event.event);
      const date = text(event.date) || text(event.datetime) || text(event.Date) || text(event.time);
      if (!title || !date || Number.isNaN(Date.parse(date))) return [];
      return [{
        id: text(event.id) || text(event.CalendarId) || `${title}-${date}-${index}`,
        title,
        country: text(event.country) || text(event.Country) || "Unspecified",
        currency: text(event.currency) || text(event.Currency),
        date,
        impact: text(event.impact) || importanceToImpact(event.Importance),
        actual: text(event.actual) || text(event.Actual) || textOrNumber(event.actual),
        forecast: text(event.forecast) || text(event.Forecast) || textOrNumber(event.estimate),
        previous: text(event.previous) || text(event.Previous) || textOrNumber(event.prev),
      }];
    });

    return NextResponse.json({ events, updatedAt: new Date().toISOString() }, { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL } });
  } catch {
    return NextResponse.json({ error: "Economic calendar data is temporarily unavailable." }, { status: 503 });
  }
}
