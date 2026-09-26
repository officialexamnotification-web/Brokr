import { GENERATED_TOURNAMENT_NEWS } from '../data/generated-tournament-news';
import { TOURNAMENT_EVENTS, TOURNAMENT_NEWS, type TournamentEvent, type TournamentNews, type TournamentStatus, statusForEvent } from '../data/tournament-data';

export function getTournamentEvents(): TournamentEvent[] {
  return TOURNAMENT_EVENTS.map((event) => ({ ...event, status: statusForEvent(event) }));
}

export function getTournamentNews(): TournamentNews[] {
  const merged = new Map<string, TournamentNews>();
  [...TOURNAMENT_NEWS, ...GENERATED_TOURNAMENT_NEWS].forEach((article) => merged.set(article.id, article));
  return [...merged.values()].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function filterTournamentEvents(filters: { gameId?: string; status?: TournamentStatus; query?: string } = {}) {
  const query = filters.query?.trim().toLowerCase();
  return getTournamentEvents().filter((event) => {
    if (filters.gameId && event.gameId !== filters.gameId) return false;
    if (filters.status && event.status !== filters.status) return false;
    if (query && !`${event.name} ${event.gameName} ${event.organizer} ${event.region}`.toLowerCase().includes(query)) return false;
    return true;
  });
}

export function filterTournamentNews(filters: { gameId?: string; status?: TournamentStatus; query?: string } = {}) {
  const query = filters.query?.trim().toLowerCase();
  return getTournamentNews().filter((article) => {
    if (filters.gameId && article.gameId !== filters.gameId) return false;
    if (filters.status && article.status !== filters.status) return false;
    if (query && !`${article.title} ${article.excerpt} ${article.gameName} ${article.tags.join(' ')}`.toLowerCase().includes(query)) return false;
    return true;
  });
}

export function getTournamentNewsBySlug(slug: string) {
  return getTournamentNews().find((article) => article.slug === slug);
}

export function getTournamentEventBySlug(slug: string) {
  return getTournamentEvents().find((event) => event.slug === slug);
}
