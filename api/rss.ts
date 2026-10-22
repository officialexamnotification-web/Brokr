import { TOURNAMENT_EVENTS, TOURNAMENT_NEWS } from '../src/data/tournament-data.js';
import { SITE_DISPLAY_NAME, SITE_URL } from '../src/data/game-seo.js';

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  category?: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

function generateRSS(items: RSSItem[]): string {
  const now = new Date().toUTCString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_DISPLAY_NAME)} - Tournament Updates</title>
    <link>${SITE_URL}/</link>
    <description>Latest tournament news and updates from ${escapeXml(SITE_DISPLAY_NAME)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.map(item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      ${item.category ? `<category>${escapeXml(item.category)}</category>` : ''}
    </item>`).join('')}
  </channel>
</rss>`;
}

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Combine tournament events and news
    const tournamentItems: RSSItem[] = TOURNAMENT_EVENTS
      .filter(event => event.status === 'upcoming' || event.status === 'live')
      .slice(0, 20)
      .map(event => ({
        title: `${event.gameName}: ${event.name}`,
        link: `${SITE_URL}/tournaments/${event.slug}`,
        description: event.summary,
        pubDate: formatDate(event.updatedAt),
        guid: `${SITE_URL}/tournaments/${event.slug}`,
        category: event.gameName
      }));

    const newsItems: RSSItem[] = TOURNAMENT_NEWS
      .slice(0, 20)
      .map((article: any) => ({
        title: article.title,
        link: `${SITE_URL}/esports-news/${article.slug}`,
        description: article.excerpt,
        pubDate: formatDate(article.publishedAt),
        guid: `${SITE_URL}/esports-news/${article.slug}`,
        category: article.gameName
      }));

    // Combine and sort by date
    const allItems = [...tournamentItems, ...newsItems]
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 50);

    const rss = generateRSS(allItems);

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=600, stale-while-revalidate=1800');
    return res.status(200).send(rss);
  } catch (error) {
    console.error('RSS generation error:', error);
    return res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}
