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
import { HOME_SEO, SITE_DISPLAY_NAME, SITE_NAME, getGameBySlug, getGameSeo } from "./src/data/game-seo";
import { POPULAR_GAMES } from "./src/data/games";
import { SITE_PAGES, getSitePageBySlug } from "./src/data/site-pages";

dotenv.config();

const app = express();
const PORT = 3000;

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

function injectSeo(html: string, req: express.Request, gameId?: string, sitePageSlug?: string): string {
  const game = gameId ? POPULAR_GAMES.find((item) => item.id === gameId) : undefined;
  const sitePage = sitePageSlug ? getSitePageBySlug(sitePageSlug) : undefined;
  const seo = game ? getGameSeo(game) : sitePage || HOME_SEO;
  const canonical = `${requestOrigin(req)}${game ? `/${game.slug}` : sitePage ? `/${sitePage.slug}` : '/'}`;
  const application = {
    '@type': 'WebApplication',
    name: SITE_NAME,
    applicationCategory: 'UtilitiesApplication',
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
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, alternateName: SITE_DISPLAY_NAME, url: requestOrigin(req) },
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
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, alternateName: SITE_DISPLAY_NAME, url: requestOrigin(req) },
  }) : game ? {
    '@context': 'https://schema.org',
    ...application,
  } : {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', name: SITE_NAME, alternateName: SITE_DISPLAY_NAME, url: canonical },
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
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${requestOrigin(req)}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const origin = requestOrigin(req);
  const gameSlugs = POPULAR_GAMES.map((game) => game.slug);
  const staticSlugs = SITE_PAGES.map((page) => page.slug);
  const urls = ['', ...gameSlugs, ...staticSlugs].map((slug) => {
    const location = `${origin}/${slug}`.replace(/\/$/, slug ? '' : '/');
    const priority = !slug ? '1.0' : gameSlugs.includes(slug) ? '0.8' : '0.5';
    return `  <url><loc>${escapeXml(location)}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
  }).join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
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
