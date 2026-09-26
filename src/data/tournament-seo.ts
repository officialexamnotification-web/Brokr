import { SITE_DISPLAY_NAME } from './game-seo';
import type { TournamentEvent, TournamentNews } from './tournament-data';

export const TOURNAMENT_NEWS_SEO = {
  title: `Esports Tournament News | ${SITE_DISPLAY_NAME}`,
  description: 'Verified esports tournament news, schedules, qualifiers, results and official source links for popular games.',
  heading: 'Tournament news for the games you play',
  intro: 'Find verified updates about ongoing events, upcoming schedules, qualifiers, teams and results across popular games.',
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
