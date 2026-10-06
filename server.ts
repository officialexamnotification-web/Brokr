import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import {
  generateNames,
  getPublicMetadata,
  getRuleForGame,
  countCharacters,
  type LanguageId,
  type NameStyle,
} from "./server/name-engine";
import { HOME_SEO, SITE_DISPLAY_NAME, SITE_NAME, SITE_URL, getGameBySlug, getGameSeo } from "./src/data/game-seo";
import { POPULAR_GAMES } from "./src/data/games";
import { SITE_PAGES, getSitePageBySlug } from "./src/data/site-pages";
import { GAME_NEWS_INDEX, TOURNAMENT_EVENTS } from "./src/data/tournament-data";
import { filterTournamentEvents, filterTournamentNews, getTournamentNews } from "./src/lib/tournament-feed";
import { syncTournamentNews } from "./server/tournament-sync";

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "20kb" }));

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asCount(value: unknown, fallback = 12): number {
  const count = Number(value);
  return Number.isFinite(count) ? Math.min(Math.max(Math.round(count), 4), 24) : fallback;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>\"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] || character));
}

function escapeXml(value: string): string {
  return escapeHtml(value);
}

function requestOrigin(req: express.Request): string {
  const forwardedProto = asString(req.headers['x-forwarded-proto']).split(',')[0].trim();
  const protocol = forwardedProto || req.protocol || 'http';
  return `${protocol}://${req.get('host') || 'localhost:3000'}`;
}

function canonicalOrigin(req: express.Request): string {
  const origin = requestOrigin(req);
  const hostname = new URL(origin).hostname;
  return /^(localhost|127\.0\.0\.1)$/.test(hostname) ? origin : SITE_URL;
}

// These paths belonged to the retired Tradivex trading directory. Return a
// permanent removal response instead of letting them look like valid SPA URLs
// while Google refreshes its old index entries.
const REMOVED_LEGACY_PATHS = new Set([
  '/privacy', '/terms', '/calculator', '/calculators', '/blog', '/compare', '/comparison',
  '/directory', '/latest-additions', '/tools', '/market', '/markets', '/forex', '/brokers',
  '/crypto-exchanges', '/stock-brokers', '/cfd-brokers', '/prop-firms', '/trading-tools',
  '/about-us', '/contact-us', '/affiliate-disclosure', '/methodology',
  '/category', '/tool', '/region', '/trading', '/investing', '/investment', '/stocks',
  '/crypto', '/options', '/futures', '/economic-calendar', '/compare-tools',
]);
const REMOVED_LEGACY_PREFIXES = ['/tool/', '/category/', '/region/', '/calculator/', '/calculators/', '/blog/', '/compare/', '/comparison/', '/directory/', '/latest-additions/', '/tools/', '/market/', '/markets/', '/forex/', '/brokers/', '/crypto-exchanges/', '/stock-brokers/', '/cfd-brokers/', '/prop-firms/', '/trading-tools/', '/trading/', '/investing/', '/investment/', '/stocks/', '/crypto/', '/options/', '/futures/', '/economic-calendar/', '/compare-tools/'];

function isRemovedLegacyPath(requestPath: string): boolean {
  const normalized = `/${requestPath.replace(/^\/+|\/+$/g, '')}`.toLowerCase();
  return REMOVED_LEGACY_PATHS.has(normalized) || REMOVED_LEGACY_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

app.use((req, res, next) => {
  if (!isRemovedLegacyPath(req.path)) {
    next();
    return;
  }
  res.setHeader('X-Robots-Tag', 'noindex, noarchive');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(410).type('text/plain').send('This legacy page has been permanently removed.');
});

function injectSeo(html: string, req: express.Request, gameId?: string, sitePageSlug?: string): string {
  const game = gameId ? POPULAR_GAMES.find((item) => item.id === gameId) : undefined;
  const sitePage = sitePageSlug ? getSitePageBySlug(sitePageSlug) : undefined;
  const seo = game ? getGameSeo(game) : sitePage || HOME_SEO;
  const gameHeading = game ? getGameSeo(game).h1 : '';
  const origin = canonicalOrigin(req);
  const canonical = `${origin}${game ? `/${game.slug}` : sitePage ? `/${sitePage.slug}` : '/'}`;
  const application = {
    '@type': 'WebApplication',
    name: SITE_DISPLAY_NAME,
    applicationCategory: 'UtilitiesApplication',
    applicationSubCategory: 'Video game name and gamertag generator',
    operatingSystem: 'All',
    description: seo.description,
    url: canonical,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(game ? { about: game.name } : {}),
  };
  const structuredData = sitePage ? (sitePage.faqs ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: sitePage.heading,
        description: sitePage.description,
        url: canonical,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', name: SITE_DISPLAY_NAME, alternateName: SITE_NAME, url: origin },
      },
      {
        '@type': 'FAQPage',
        mainEntity: sitePage.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: sitePage.heading,
    description: sitePage.description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: SITE_DISPLAY_NAME, alternateName: SITE_NAME, url: origin },
  }) : game ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: gameHeading,
        headline: gameHeading,
        description: seo.description,
        url: canonical,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', name: SITE_DISPLAY_NAME, alternateName: SITE_NAME, url: origin },
        about: { '@type': 'Thing', name: game.name },
      },
      { ...application, about: { '@type': 'Thing', name: game.name } },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: gameHeading, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: seo.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  } : {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: SITE_DISPLAY_NAME,
        url: `${origin}/`,
        description: 'An independent gaming utility for creating game-specific player names, nicknames, gamertags and clan tags.',
        knowsAbout: POPULAR_GAMES.map((item) => `${item.name} gaming names and gamertags`),
      },
      { '@type': 'WebSite', name: SITE_DISPLAY_NAME, alternateName: SITE_NAME, url: canonical },
      application,
    ],
  };
  const structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`;
  const head = `
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />`;
  return html
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, structuredDataScript)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`)
    .replace('</head>', `${head}\n  </head>`);
}

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (_req, res) => {
  const allTournamentNews = getTournamentNews();
  const slugs = [
    '',
    ...POPULAR_GAMES.map((game) => game.slug),
    ...SITE_PAGES.map((page) => page.slug),
    'esports-news',
    'tournaments',
    'game-news',
    ...GAME_NEWS_INDEX.map((game) => `game-news/${game.id}`),
    ...allTournamentNews.map((article) => `esports-news/${article.slug}`),
    ...TOURNAMENT_EVENTS.map((event) => `tournaments/${event.slug}`),
  ];
  const urls = slugs.map((slug) => {
    const location = `${SITE_URL}/${slug}`.replace(/\/$/, slug ? '' : '/');
    return `  <url><loc>${escapeXml(location)}</loc></url>`;
  }).join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/tournaments", (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
  const gameId = asString(req.query.game);
  const status = asString(req.query.status) as any;
  const query = asString(req.query.q);
  res.json({ items: filterTournamentEvents({ gameId: gameId || undefined, status: status || undefined, query: query || undefined }), updatedAt: new Date().toISOString() });
});

app.get("/api/news", (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
  const gameId = asString(req.query.game);
  const status = asString(req.query.status) as any;
  const query = asString(req.query.q);
  res.json({ items: filterTournamentNews({ gameId: gameId || undefined, status: status || undefined, query: query || undefined }), updatedAt: new Date().toISOString() });
});

app.post("/api/sync-tournament-news", async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const expected = process.env.TOURNAMENT_SYNC_SECRET || '';
  const supplied = asString(req.headers.authorization).replace(/^Bearer\s+/i, '');
  if (!expected || supplied !== expected) return res.status(401).json({ error: 'Unauthorized' });
  const result = await syncTournamentNews();
  return res.status(result.enabled ? 200 : 503).json(result);
});

// Public generator metadata. Keeping these rules server-owned prevents the UI from
// accidentally presenting an unverified symbol as universally compatible.
app.get("/api/games", (_req, res) => {
  res.json(getPublicMetadata().games);
});

app.get("/api/languages", (_req, res) => {
  res.json(getPublicMetadata().languages);
});

app.get("/api/decorations", (_req, res) => {
  res.json(getPublicMetadata().decorations);
});

app.post("/api/check-name", (req, res) => {
  const gameId = asString(req.body?.gameId, "bgmi");
  const value = asString(req.body?.text).slice(0, 80);
  const rule = getRuleForGame(gameId);
  const characters = countCharacters(value);
  res.json({
    game: rule,
    text: value,
    characters,
    fitsLimit: rule.limit === null || characters <= rule.limit,
    compatibility: rule.sourceStatus === "needs-testing" ? "unknown" : "test-recommended",
  });
});

// Deterministic, server-owned generator. It works without an API key and is the
// canonical source for the frontend's game-aware name ideas.
app.post("/api/generate-names", (req, res) => {
  const body = req.body || {};
  const gameId = asString(body.gameId, "bgmi");
  const language = asString(body.language, "global") as LanguageId;
  const style = asString(body.style, "pro") as NameStyle;
  const decorationId = asString(body.decorationId, "");
  const conservative = Boolean(body.conservative);
  const names = generateNames({
    keyword: asString(body.keyword),
    gameId,
    language,
    style,
    decorationId,
    count: asCount(body.count),
    conservative,
  });
  const rule = getRuleForGame(gameId);
  res.json({
    source: "engine",
    meta: {
      gameId,
      gameName: rule.name,
      limit: rule.limit,
      symbolStatus: rule.symbolStatus,
      sourceStatus: rule.sourceStatus,
      safeMode: conservative,
      note: rule.note,
    },
    names,
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    app.get("/", (req, res) => {
      const indexHtml = fs.readFileSync(indexPath, 'utf8');
      res.type('html').send(injectSeo(indexHtml, req));
    });
    app.use(express.static(distPath));
    app.use("/api", (_req, res) => {
      res.status(404).json({ error: "API route not found" });
    });
    app.get("*", (req, res) => {
      const requestedPath = req.path.replace(/^\/+|\/+$/g, '');
      const game = getGameBySlug(requestedPath);
      const sitePage = getSitePageBySlug(requestedPath);
      if (requestedPath && !game && !sitePage) {
        res.status(404).type('text/plain').send('Page not found');
        return;
      }
      const indexHtml = fs.readFileSync(indexPath, 'utf8');
      res.type('html').send(injectSeo(indexHtml, req, game?.id, sitePage?.slug));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gamer Name Generator running on http://localhost:${PORT}`);
  });
}

startServer();
