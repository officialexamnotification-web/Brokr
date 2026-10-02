import { GameProfile } from '../types';
import { GameSeoContent, SITE_DISPLAY_NAME, SITE_NAME, SITE_URL } from '../data/game-seo';
import { SitePageContent } from '../data/site-pages';
import type { GameNewsPage } from '../data/game-news';

function upsertMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    if (property) element.setAttribute('property', name);
    else element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function canonicalOrigin() {
  if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) return window.location.origin;
  return SITE_URL;
}

export function applySeo(seo: GameSeoContent, game?: GameProfile) {
  if (typeof document === 'undefined') return;
  const path = game ? `/${game.slug}` : '/';
  const canonical = `${canonicalOrigin()}${path}`;
  document.title = seo.title;
  upsertMeta('description', seo.description);
  upsertMeta('og:title', seo.title, true);
  upsertMeta('og:description', seo.description, true);
  upsertMeta('og:url', canonical, true);
  upsertMeta('twitter:title', seo.title);
  upsertMeta('twitter:description', seo.description);
  upsertLink('canonical', canonical);

  const existing = document.getElementById('gamingnamehub-seo-jsonld');
  existing?.remove();
  const script = document.createElement('script');
  script.id = 'gamingnamehub-seo-jsonld';
  script.type = 'application/ld+json';
  const application = {
    '@type': 'WebApplication',
    name: SITE_NAME,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    description: seo.description,
    url: canonical,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(game ? { about: { '@type': 'Thing', name: game.name } } : {}),
  };
  const webpage = {
    '@type': 'WebPage',
    name: seo.h1,
    headline: seo.h1,
    description: seo.description,
    url: canonical,
    inLanguage: document.documentElement.lang || 'en-US',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, alternateName: SITE_DISPLAY_NAME, url: canonicalOrigin() },
    ...(game ? { about: { '@type': 'Thing', name: game.name } } : {}),
  };
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${canonicalOrigin()}/` },
      ...(game ? [{ '@type': 'ListItem', position: 2, name: seo.h1, item: canonical }] : []),
    ],
  };
  const graph: Record<string, unknown>[] = [webpage, application, breadcrumb];
  if (seo.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: seo.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.appendChild(script);
}

export function applyStaticSeo(page: SitePageContent) {
  if (typeof document === 'undefined') return;
  const canonical = `${canonicalOrigin()}/${page.slug}`;
  document.title = page.title;
  upsertMeta('description', page.description);
  upsertMeta('og:title', page.title, true);
  upsertMeta('og:description', page.description, true);
  upsertMeta('og:url', canonical, true);
  upsertMeta('twitter:title', page.title);
  upsertMeta('twitter:description', page.description);
  upsertLink('canonical', canonical);

  const existing = document.getElementById('gamingnamehub-seo-jsonld');
  existing?.remove();
  const script = document.createElement('script');
  script.id = 'gamingnamehub-seo-jsonld';
  script.type = 'application/ld+json';
  const webpage = {
    '@type': 'WebPage',
    name: page.heading,
    description: page.description,
    url: canonical,
    inLanguage: document.documentElement.lang || 'en-US',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, alternateName: SITE_DISPLAY_NAME, url: canonicalOrigin() },
  };
  script.textContent = JSON.stringify(page.faqs ? {
    '@context': 'https://schema.org',
    '@graph': [webpage, {
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    }],
  } : { '@context': 'https://schema.org', ...webpage });
  document.head.appendChild(script);
}

export function applyGameNewsSeo(page: GameNewsPage, game: GameProfile) {
  if (typeof document === 'undefined') return;
  const canonical = `${canonicalOrigin()}/game-news/${game.id}`;
  document.title = page.title;
  upsertMeta('description', page.description);
  upsertMeta('og:title', page.title, true);
  upsertMeta('og:description', page.description, true);
  upsertMeta('og:type', 'article', true);
  upsertMeta('og:url', canonical, true);
  upsertMeta('twitter:title', page.title);
  upsertMeta('twitter:description', page.description);
  upsertLink('canonical', canonical);
  document.getElementById('gamingnamehub-seo-jsonld')?.remove();
  const script = document.createElement('script');
  script.id = 'gamingnamehub-seo-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'NewsArticle', headline: page.heading, description: page.description, datePublished: '2026-10-02', dateModified: '2026-10-02', author: { '@type': 'Organization', name: SITE_NAME, url: `${canonicalOrigin()}/about` }, about: { '@type': 'Thing', name: game.name }, mainEntityOfPage: canonical, isBasedOn: page.sources.map((source) => source.url) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${canonicalOrigin()}/` },
        { '@type': 'ListItem', position: 2, name: 'Game News', item: `${canonicalOrigin()}/game-news` },
        { '@type': 'ListItem', position: 3, name: game.shortName, item: canonical },
      ] },
      ...(page.faqs.length ? [{ '@type': 'FAQPage', mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }] : []),
    ],
  });
  document.head.appendChild(script);
}
