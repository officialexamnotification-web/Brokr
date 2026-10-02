import { OFFICIAL_TOURNAMENT_SOURCES, type TournamentNews, type TournamentStatus } from '../src/data/tournament-data.js';

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function safeSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
}

function parseJson(text: string): Record<string, unknown> | null {
  const cleaned = text.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  try {
    const value = JSON.parse(cleaned);
    return value && typeof value === 'object' ? value as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean).slice(0, 8) : [];
}

function asStatus(value: unknown): TournamentStatus {
  return value === 'live' || value === 'completed' || value === 'cancelled' ? value : 'upcoming';
}

async function fetchSourceText(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'TradivexGamingNameHub/1.0 official-source-summary' } });
    if (!response.ok) throw new Error(`Source returned ${response.status}`);
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('pdf')) return '';
    return stripHtml((await response.text()).slice(0, 180000)).slice(0, 14000);
  } finally {
    clearTimeout(timeout);
  }
}

async function askGemini(apiKey: string, model: string, source: { gameName: string; sourceName: string; url: string; text: string }) {
  const prompt = `You are an esports news editor. Create one factual tournament update using ONLY the supplied official source text. Never invent a date, result, team, prize pool, registration URL or live status. If a fact is absent, use an empty string or an empty array. Return JSON only with this exact shape: {"title":"","excerpt":"","content":[""],"tournamentName":"","status":"upcoming|live|completed|cancelled","startDate":"YYYY-MM-DD or empty","endDate":"YYYY-MM-DD or empty","dateLabel":"","region":"","location":"","prizePool":"","teams":0,"format":"","tags":[""]}. Keep title under 90 characters, excerpt under 220 characters, and content to 2-4 concise paragraphs. Game: ${source.gameName}. Source name: ${source.sourceName}. Source URL: ${source.url}. Official source text: ${source.text}`;
  const response = await fetch(`${GEMINI_ENDPOINT}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, responseMimeType: 'application/json' } }),
  });
  if (!response.ok) throw new Error(`Gemini returned ${response.status}`);
  const payload = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';
  return parseJson(text);
}

export async function syncTournamentNews(options: { apiKey?: string; model?: string } = {}) {
  const apiKey = options.apiKey || process.env.GEMINI_API_KEY || '';
  const model = options.model || process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  if (!apiKey) return { enabled: false, reason: 'GEMINI_API_KEY is not configured.', drafts: [] as TournamentNews[] };

  const drafts: TournamentNews[] = [];
  const updatedAt = new Date().toISOString().slice(0, 10);
  for (const source of OFFICIAL_TOURNAMENT_SOURCES) {
    try {
      const text = await fetchSourceText(source.url);
      if (text.length < 160) continue;
      const generated = await askGemini(apiKey, model, { ...source, text });
      if (!generated) continue;
      const tournamentName = asString(generated.tournamentName);
      const title = asString(generated.title);
      const excerpt = asString(generated.excerpt);
      const content = asStringArray(generated.content);
      if (!tournamentName || !title || !excerpt || content.length < 2) continue;
      const slug = safeSlug(`${source.gameId}-${tournamentName}`);
      drafts.push({
        id: `generated-${slug}`,
        slug,
        gameId: source.gameId,
        gameName: source.gameName,
        title,
        excerpt,
        content,
        tournamentName,
        status: asStatus(generated.status),
        publishedAt: updatedAt,
        updatedAt,
        sourceUrl: source.url,
        sourceName: source.sourceName,
        sourceVerified: true,
        tags: asStringArray(generated.tags),
      });
    } catch (error) {
      console.warn(`[tournament-sync] skipped ${source.gameName}: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }
  return { enabled: true, model, drafts };
}
