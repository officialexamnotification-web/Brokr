import { SITE_PAGES } from '../data/site-pages';
import { POPULAR_GAMES } from '../data/games';
import { GAME_NEWS_BY_ID, GAME_NEWS_INDEX } from '../data/tournament-data';
import { getTournamentEvents, getTournamentNews } from './tournament-feed';

const SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character] || character));
}

function sitemapDate(value?: string): string | undefined {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = new Date(`${value} UTC`);
  return Number.isNaN(parsed.valueOf()) ? undefined : parsed.toISOString().slice(0, 10);
}

function latestDate(values: Array<string | undefined>): string | undefined {
  return values.map((value) => sitemapDate(value)).filter((value): value is string => Boolean(value)).sort().at(-1);
}

/** Build the same sitemap for the static deployment and the Express server. */
export function createSitemapXml(origin: string): string {
  const news = getTournamentNews();
  const events = getTournamentEvents();
  const slugs = [...new Set([
    '',
    ...POPULAR_GAMES.map((game) => game.slug),
    ...SITE_PAGES.map((page) => page.slug),
    'esports-news',
    'tournaments',
    'game-news',
    ...GAME_NEWS_INDEX.filter((game) => GAME_NEWS_BY_ID.has(game.id)).map((game) => `game-news/${game.id}`),
    ...news.map((article) => `esports-news/${article.slug}`),
    ...events.map((event) => `tournaments/${event.slug}`),
  ])];

  const lastModified = new Map<string, string>();
  for (const game of GAME_NEWS_INDEX) {
    const page = GAME_NEWS_BY_ID.get(game.id);
    const date = page && sitemapDate(page.updateDate);
    if (date) lastModified.set(`game-news/${game.id}`, date);
  }
  for (const article of news) {
    const date = sitemapDate(article.updatedAt);
    if (date) lastModified.set(`esports-news/${article.slug}`, date);
  }
  for (const event of events) {
    const date = sitemapDate(event.updatedAt);
    if (date) lastModified.set(`tournaments/${event.slug}`, date);
  }

  const latestGameNews = latestDate([...GAME_NEWS_INDEX.map((game) => GAME_NEWS_BY_ID.get(game.id)?.updateDate)]);
  const latestEsportsNews = latestDate(news.map((article) => article.updatedAt));
  const latestTournament = latestDate(events.map((event) => event.updatedAt));
  if (latestGameNews) lastModified.set('game-news', latestGameNews);
  if (latestEsportsNews) lastModified.set('esports-news', latestEsportsNews);
  if (latestTournament) lastModified.set('tournaments', latestTournament);

  const base = origin.replace(/\/$/, '');
  const urls = slugs.map((slug) => {
    const location = `${base}/${slug}`.replace(/\/$/, slug ? '' : '/');
    const lastmod = lastModified.get(slug);
    return `  <url><loc>${escapeXml(location)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${SITEMAP_NAMESPACE}">\n${urls}\n</urlset>\n`;
}
