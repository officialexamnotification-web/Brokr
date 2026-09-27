import fs from 'node:fs';
import path from 'node:path';
import { HOME_SEO, SITE_DISPLAY_NAME, SITE_NAME, getGameSeo } from '../src/data/game-seo';
import { POPULAR_GAMES } from '../src/data/games';
import { SITE_PAGES } from '../src/data/site-pages';
import { TOURNAMENT_EVENTS, TOURNAMENT_NEWS } from '../src/data/tournament-data';
import { TOURNAMENT_NEWS_SEO, TOURNAMENTS_SEO, getTournamentArticleSeo } from '../src/data/tournament-seo';
import { getTournamentNews } from '../src/lib/tournament-feed';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const ORIGIN = (process.env.PUBLIC_SITE_URL || 'https://www.tradivex.com').replace(/\/$/, '');
const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] || character));
}

function escapeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function urlFor(slug: string): string {
  return `${ORIGIN}/${slug}`.replace(/\/$/, slug ? '' : '/');
}

function breadcrumbJson(url: string, label: string) {
  const itemListElement = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
  ];
  if (url !== `${ORIGIN}/`) {
    itemListElement.push({ '@type': 'ListItem', position: 2, name: label, item: url });
  }
  return {
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

function faqJson(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

function jsonLdFor(route: { slug: string; title: string; description: string; heading: string; faqs?: Array<{ question: string; answer: string }>; gameName?: string }) {
  const url = urlFor(route.slug);
  const webpage = {
    '@type': 'WebPage',
    name: route.heading,
    headline: route.heading,
    description: route.description,
    url,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, alternateName: SITE_DISPLAY_NAME, url: `${ORIGIN}/` },
    ...(route.gameName ? { about: { '@type': 'Thing', name: route.gameName } } : {}),
  };
  const application = {
    '@type': 'WebApplication',
    name: SITE_NAME,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    description: route.description,
    url,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(route.gameName ? { about: route.gameName } : {}),
  };
  const graph: Record<string, unknown>[] = [webpage, application, breadcrumbJson(url, route.heading)];
  if (route.faqs?.length) graph.push(faqJson(route.faqs));
  return { '@context': 'https://schema.org', '@graph': graph };
}

function landingMarkup(route: { slug: string; title: string; description: string; heading: string; intro: string; features: string[]; faqs?: Array<{ question: string; answer: string }>; gameName?: string }) {
  const featureList = route.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('');
  const faqList = (route.faqs || []).map((faq) => `<section><h2>${escapeHtml(faq.question)}</h2><p>${escapeHtml(faq.answer)}</p></section>`).join('');
  const links = (route.gameName ? POPULAR_GAMES.filter((game) => game.name !== route.gameName).slice(0, 8) : POPULAR_GAMES.slice(0, 12))
    .map((game) => `<a href="/${game.slug}">${escapeHtml(game.shortName)} name generator</a>`).join('');
  const howTo = `<section><h2>How to create a name</h2><ol><li>Enter a word, nickname or clan handle.</li><li>Choose a language and style that match your identity.</li><li>Copy the result and test it in the current game or platform client.</li></ol></section>`;
  const trustNote = route.gameName
    ? `<section><h2>${escapeHtml(route.gameName)} name tips</h2><p>Start with a clean, readable option when you need the safest compatibility. Decorative Unicode can render differently across clients, so this page does not promise that every symbol will be accepted.</p></section>`
    : `<section><h2>Built for real gaming profiles</h2><p>Tradivex GamingNameHub is a local name-idea tool. It does not check live username availability, access game accounts or claim affiliation with game publishers.</p></section>`;
  return `<main id="seo-content"><nav aria-label="Breadcrumb"><a href="/">Home</a>${route.gameName ? ` / <span>${escapeHtml(route.heading)}</span>` : ''}</nav><article><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.intro)}</p><ul>${featureList}</ul>${howTo}${trustNote}${faqList}<nav aria-label="Related game generators"><h2>Explore more game name generators</h2>${links}</nav></article></main>`;
}

function staticPageMarkup(page: typeof SITE_PAGES[number]) {
  const sections = page.sections.map((section) => `<section><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('');
  const faqs = page.faqs ? page.faqs.map((faq) => `<section><h2>${escapeHtml(faq.question)}</h2><p>${escapeHtml(faq.answer)}</p></section>`).join('') : '';
  return `<main id="seo-content"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>${escapeHtml(page.heading)}</span></nav><article><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.intro)}</p>${sections}${faqs}</article></main>`;
}

function renderHtml(route: { slug: string; title: string; description: string; heading: string; intro: string; features: string[]; faqs?: Array<{ question: string; answer: string }>; gameName?: string }, body: string) {
  const canonical = urlFor(route.slug);
  const jsonLd = `<script type="application/ld+json">${escapeJson(jsonLdFor(route))}</script>`;
  const head = `<link rel="canonical" href="${escapeHtml(canonical)}" /><meta name="robots" content="index,follow,max-image-preview:large" /><meta property="og:type" content="website" /><meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" /><meta property="og:url" content="${escapeHtml(canonical)}" />`;
  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLd)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replace('</head>', `${head}</head>`);
}

function tournamentJsonLd(route: { slug: string; title: string; description: string; heading: string; news?: typeof TOURNAMENT_NEWS[number]; event?: typeof TOURNAMENT_EVENTS[number] }) {
  const url = urlFor(route.slug);
  const graph: Record<string, unknown>[] = [{
    '@type': 'WebPage',
    name: route.heading,
    headline: route.heading,
    description: route.description,
    url,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, alternateName: SITE_DISPLAY_NAME, url: `${ORIGIN}/` },
    ...(route.event ? { about: { '@type': 'Thing', name: route.event.name } } : {}),
  }, {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: route.news ? 'Esports News' : route.event ? 'Tournaments' : route.heading, item: `${ORIGIN}/${route.news ? 'esports-news' : route.event ? 'tournaments' : route.slug}` },
      ...((route.news || route.event) ? [{ '@type': 'ListItem', position: 3, name: route.heading, item: url }] : []),
    ],
  }];
  if (route.news) {
    graph.push({
      '@type': 'NewsArticle',
      headline: route.news.title,
      description: route.news.excerpt,
      datePublished: route.news.publishedAt,
      dateModified: route.news.updatedAt,
      author: { '@type': 'Organization', name: SITE_DISPLAY_NAME, url: `${ORIGIN}/about` },
      mainEntityOfPage: url,
      isBasedOn: route.news.sourceUrl,
    });
  }
  // These pages are independently written schedule summaries, not ticketing
  // pages. Do not emit incomplete Event markup: Google requires real venue,
  // image, offer and participant data, and inventing those fields would be
  // misleading. The visible page still contains the verified official source.
  return { '@context': 'https://schema.org', '@graph': graph };
}

function tournamentMarkup(route: { slug: string; title: string; description: string; heading: string; intro: string; news?: typeof TOURNAMENT_NEWS[number]; event?: typeof TOURNAMENT_EVENTS[number] }) {
  if (route.news) {
    return `<main id="seo-content"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/esports-news">Esports News</a> / <span>${escapeHtml(route.heading)}</span></nav><article><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.intro)}</p>${route.news.content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}<p><strong>Source:</strong> <a href="${escapeHtml(route.news.sourceUrl)}">${escapeHtml(route.news.sourceName)}</a></p><p><a href="/tournaments/${escapeHtml(route.news.slug)}">View tournament details</a></p></article></main>`;
  }
  if (route.event) {
    return `<main id="seo-content"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/tournaments">Tournaments</a> / <span>${escapeHtml(route.heading)}</span></nav><article><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.intro)}</p><dl><dt>Status</dt><dd>${escapeHtml(route.event.status)}</dd><dt>Date</dt><dd>${escapeHtml(route.event.dateLabel)}</dd><dt>Organizer</dt><dd>${escapeHtml(route.event.organizer)}</dd><dt>Region</dt><dd>${escapeHtml(route.event.region)}</dd><dt>Location</dt><dd>${escapeHtml(route.event.location)}</dd></dl><p><strong>Official source:</strong> <a href="${escapeHtml(route.event.sourceUrl)}">${escapeHtml(route.event.sourceName)}</a></p></article></main>`;
  }
  const isNews = route.slug === 'esports-news';
  const items = isNews ? getTournamentNews().map((item) => `<li><a href="/esports-news/${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a><p>${escapeHtml(item.excerpt)}</p></li>`).join('') : TOURNAMENT_EVENTS.map((item) => `<li><a href="/tournaments/${escapeHtml(item.slug)}">${escapeHtml(item.name)}</a><p>${escapeHtml(item.summary)}</p></li>`).join('');
  return `<main id="seo-content"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>${escapeHtml(route.heading)}</span></nav><article><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.intro)}</p><h2>${isNews ? 'Latest tournament updates' : 'Verified game tournament events'}</h2><ul>${items}</ul></article></main>`;
}

function renderTournamentHtml(route: { slug: string; title: string; description: string; heading: string; intro: string; news?: typeof TOURNAMENT_NEWS[number]; event?: typeof TOURNAMENT_EVENTS[number] }) {
  const canonical = urlFor(route.slug);
  const jsonLd = `<script type="application/ld+json">${escapeJson(tournamentJsonLd(route))}</script>`;
  const ogType = route.news ? 'article' : 'website';
  const head = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;
  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow,max-image-preview:large" />')
    .replace(/<meta property="og:type"[^>]*>/i, `<meta property="og:type" content="${ogType}" />`)
    .replace(/<meta property="og:site_name"[^>]*>/i, `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`)
    .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${escapeHtml(canonical)}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLd)
    .replace('<div id="root"></div>', `<div id="root">${tournamentMarkup(route)}</div>`)
    .replace('</head>', `${head}</head>`);
}

function writeRoute(slug: string, html: string) {
  const targetDir = slug ? path.join(DIST_DIR, slug) : DIST_DIR;
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

const homeRoute = { ...HOME_SEO, heading: HOME_SEO.h1, intro: HOME_SEO.intro, features: HOME_SEO.features };
writeRoute('', renderHtml(homeRoute, landingMarkup(homeRoute)));

for (const game of POPULAR_GAMES) {
  const seo = getGameSeo(game);
  const route = { ...seo, heading: seo.h1, intro: seo.intro, features: seo.features, gameName: game.name };
  writeRoute(game.slug, renderHtml(route, landingMarkup(route)));
}

for (const page of SITE_PAGES) {
  const route = { slug: page.slug, title: page.title, description: page.description, heading: page.heading, intro: page.intro, features: [], faqs: page.faqs };
  writeRoute(page.slug, renderHtml(route, staticPageMarkup(page)));
}

const allTournamentNews = getTournamentNews();
writeRoute('esports-news', renderTournamentHtml({ slug: 'esports-news', ...TOURNAMENT_NEWS_SEO }));
writeRoute('tournaments', renderTournamentHtml({ slug: 'tournaments', ...TOURNAMENTS_SEO }));
for (const article of allTournamentNews) {
  const seo = getTournamentArticleSeo(article);
  writeRoute(`esports-news/${article.slug}`, renderTournamentHtml({ slug: `esports-news/${article.slug}`, ...seo, news: article }));
}
for (const event of TOURNAMENT_EVENTS) {
  const seo = getTournamentArticleSeo(event);
  writeRoute(`tournaments/${event.slug}`, renderTournamentHtml({ slug: `tournaments/${event.slug}`, ...seo, event }));
}

const allSlugs = ['', ...POPULAR_GAMES.map((game) => game.slug), ...SITE_PAGES.map((page) => page.slug), 'esports-news', 'tournaments', ...allTournamentNews.map((article) => `esports-news/${article.slug}`), ...TOURNAMENT_EVENTS.map((event) => `tournaments/${event.slug}`)];
const lastmod = new Date().toISOString().slice(0, 10);
const sitemapUrls = allSlugs.map((slug) => `  <url><loc>${escapeHtml(urlFor(slug))}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`, 'utf8');
fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${ORIGIN}/sitemap.xml\n`, 'utf8');

console.log(`Prerendered ${allSlugs.length} SEO routes to ${DIST_DIR}`);
