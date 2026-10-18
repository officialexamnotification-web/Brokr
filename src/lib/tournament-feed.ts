import { TOURNAMENT_EVENTS, TOURNAMENT_NEWS, type TournamentEvent, type TournamentNews, type TournamentStatus, statusForEvent } from '../data/tournament-data.js';

export function getTournamentEvents(): TournamentEvent[] {
  return TOURNAMENT_EVENTS.map((event) => ({ ...event, status: statusForEvent(event) }));
}

export function getTournamentNews(): TournamentNews[] {
  return TOURNAMENT_NEWS
    .map((article) => {
      const linkedEvent = article.eventId ? TOURNAMENT_EVENTS.find((event) => event.id === article.eventId) : undefined;
      return linkedEvent ? { ...article, status: statusForEvent(linkedEvent) } : article;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function filterTournamentEvents(filters: { gameId?: string; status?: TournamentStatus; query?: string } = {}) {
  const query = filters.query?.trim().toLowerCase();
  return getTournamentEvents().filter((event) => {
    if (filters.gameId && event.gameId !== filters.gameId) return false;
    if (filters.status && event.status !== filters.status) return false;
    if (query && !`${event.name} ${event.gameName} ${event.organizer} ${event.region} ${event.location} ${(event.participants || []).join(' ')}`.toLowerCase().includes(query)) return false;
    return true;
  }).sort((a, b) => {
    const rank = (status: TournamentStatus) => status === 'live' ? 0 : status === 'upcoming' ? 1 : status === 'completed' ? 2 : 3;
    const statusOrder = rank(a.status) - rank(b.status);
    if (statusOrder) return statusOrder;
    const aDate = a.startDate || '9999-12-31';
    const bDate = b.startDate || '9999-12-31';
    return a.status === 'completed' ? bDate.localeCompare(aDate) : aDate.localeCompare(bDate);
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
