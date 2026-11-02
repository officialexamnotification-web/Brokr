import { SITE_DISPLAY_NAME } from './game-seo';
import type { TournamentEvent, TournamentNews } from './tournament-data';

export const TOURNAMENT_NEWS_SEO = {
  title: `Game News and Updates by Title | ${SITE_DISPLAY_NAME}`,
  description: 'Read game updates, patches, seasons and publisher announcements across supported games, with links to their sources.',
  heading: 'Latest game news and updates',
  intro: 'Current updates for the games listed on Tradivex. Each game appears once; open its page for full details and publisher sources.',
};

export const TOURNAMENTS_SEO = {
  title: `Game Tournament Schedule | ${SITE_DISPLAY_NAME}`,
  description: 'Browse upcoming, live and completed game tournaments with dates, regions, organizers and official source links.',
  heading: 'Upcoming and completed game tournaments',
  intro: 'Filter official tournament information by game, status and region. Dates and results are summaries; the linked organizer remains the source of truth.',
};

export function getTournamentArticleSeo(item: TournamentNews | TournamentEvent) {
  const title = 'title' in item ? item.title : item.name;
  const summary = 'excerpt' in item ? item.excerpt : item.summary;
  const gameName = item.gameName;
  return {
    title: `${title} | ${SITE_DISPLAY_NAME}`,
    description: `${summary} Official ${gameName} tournament details and source links.`,
    heading: title,
    intro: summary,
    gameName,
  };
}
