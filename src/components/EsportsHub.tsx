import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, ExternalLink, Gamepad2, Globe2, Newspaper, Radio, Search, ShieldCheck, Trophy, Download, Share2, X, Facebook } from 'lucide-react';
import { BracketView } from './BracketView';
import { ThemeToggle } from './ThemeToggle';
import { TournamentDashboard } from './TournamentDashboard';
import { POPULAR_GAMES } from '../data/games';
import { SITE_DISPLAY_NAME, SITE_NAME, SITE_SUFFIX } from '../data/game-seo';
import { GAME_NEWS_PAGES, OFFICIAL_TOURNAMENT_SOURCES, type GameNewsPage, type TournamentEvent, type TournamentNews, type TournamentStatus } from '../data/tournament-data';
import { filterTournamentEvents, getTournamentEventBySlug, getTournamentEvents, getTournamentNewsBySlug } from '../lib/tournament-feed';
import { ContentLanguagePicker } from './ContentLanguagePicker';

interface EsportsHubProps {
  mode: 'news' | 'tournaments';
  slug?: string;
}

const STATUS_LABELS: Record<TournamentStatus, string> = {
  live: 'Live / ongoing',
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
  draft: 'Draft',
};

function formatDate(value?: string) {
  if (!value) return 'Date to be announced';
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}

const LATEST_SOURCE_CHECK = OFFICIAL_TOURNAMENT_SOURCES
  .map((source) => source.checkedAt)
  .filter((date): date is string => Boolean(date))
  .sort()
  .slice(-1)[0];

const SOURCE_CHECK_BY_GAME = new Map(
  OFFICIAL_TOURNAMENT_SOURCES
    .filter((source) => source.checkedAt)
    .map((source) => [source.gameId, source.checkedAt as string]),
);

function sourceCheckDate(gameId: string) {
  return formatDate(SOURCE_CHECK_BY_GAME.get(gameId));
}

function statusClass(status: TournamentStatus) {
  if (status === 'live') return 'border-red-400/30 bg-red-500/10 text-red-300';
  if (status === 'upcoming') return 'border-amber-400/30 bg-amber-500/10 text-amber-300';
  if (status === 'completed') return 'border-slate-700 bg-slate-800/70 text-slate-300';
  return 'border-cyan-400/30 bg-cyan-500/10 text-cyan-300';
}

function gameGeneratorSlug(gameId: string) {
  return POPULAR_GAMES.find((game) => game.id === gameId)?.slug || '';
}

function HubHeader({ mode }: { mode: EsportsHubProps['mode'] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-[#060914]/95 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-3 sm:px-5 lg:px-7">
        <a href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-slate-950 shadow-lg shadow-orange-500/20"><Gamepad2 className="h-5 w-5 stroke-[2.6]" /></span>
          <span className="min-w-0"><span className="block whitespace-nowrap font-gaming text-[15px] font-black tracking-wide text-white sm:text-[18px]">{SITE_NAME.toUpperCase()}</span><span className="block text-[10px] font-medium text-amber-300">{SITE_SUFFIX}</span></span>
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {mode === 'tournaments' ? (
            <nav className="flex shrink-0 items-center gap-2" aria-label="Tournament page navigation">
              <a href="/esports-news" className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-2 text-[11px] font-bold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20 sm:px-3 sm:text-xs" aria-label="Back to game news"><ArrowLeft className="h-3.5 w-3.5" /><span className="sm:hidden">News</span><span className="hidden sm:inline">Back to News</span></a>
              <a href="/" className="rounded-xl border border-slate-800 bg-[#0b101d] px-2.5 py-2 text-[11px] font-bold text-slate-300 transition hover:border-amber-400/50 hover:text-white sm:px-3 sm:text-xs" aria-label="Go to home page">Home</a>
            </nav>
          ) : <>
            <nav className="hidden items-center gap-2 sm:flex" aria-label="Esports navigation">
              <a href="/" className="rounded-xl border border-slate-800 bg-[#0b101d] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-amber-400/50 hover:text-white">Name Generator</a>
              <a href="/tournaments" className="rounded-xl border border-amber-400/50 bg-amber-500 px-3 py-2 text-xs font-black text-slate-950">Tournaments</a>
            </nav>
            <a href="/" aria-label="Back to home page" className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0b101d] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-amber-400/50 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /><span className="sm:hidden">Home</span><span className="hidden sm:inline">Back to Home</span></a>
          </>}
        </div>
      </div>
    </header>
  );
}

function StatusBadge({ status }: { status: TournamentStatus }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${statusClass(status)}`}><span className={`h-1.5 w-1.5 rounded-full ${status === 'live' ? 'animate-pulse bg-red-400' : 'bg-current'}`} />{STATUS_LABELS[status]}</span>;
}

const EventCard: React.FC<{ event: TournamentEvent; isFavorite?: boolean; onToggleFavorite?: (id: string) => void }> = ({ event, isFavorite = false, onToggleFavorite }) => {
  const handleCalendarExport = () => {
    window.open(`/api/calendar?slug=${event.slug}`, '_blank');
  };

  const handleShare = () => {
    const url = `${window.location.origin}/tournaments/${event.slug}`;
    const text = `Check out ${event.name} tournament`;
    
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: text,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-5 transition hover:-translate-y-0.5 hover:border-amber-400/45 hover:shadow-xl hover:shadow-amber-950/20">
      <div className="flex items-start justify-between gap-3"><StatusBadge status={event.status} /><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{event.gameName}</span></div>
      <h2 className="mt-4 font-gaming text-base font-bold leading-snug text-white">{event.name}</h2>
      <p className="mt-2 text-xs leading-6 text-slate-400">{event.summary}</p>
      <dl className="mt-4 grid gap-2 border-t border-slate-800 pt-4 text-xs text-slate-300"><div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-amber-300" /><span>{event.dateLabel}</span></div><div className="flex items-center gap-2"><Globe2 className="h-3.5 w-3.5 text-cyan-300" /><span>{event.region} · {event.location}</span></div>{(event.prizePool || event.teams) && <div className="flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-emerald-300" /><span>{[event.prizePool, event.teams ? `${event.teams} teams` : undefined].filter(Boolean).join(' · ')}</span></div>}</dl>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5"><span className="w-full text-[10px] text-slate-500">Schedule source checked {sourceCheckDate(event.gameId)}</span><a href={`/tournaments/${event.slug}`} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-amber-300">View event</a><button onClick={handleCalendarExport} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400/60 hover:text-white flex items-center gap-1.5"><Download className="h-3 w-3" />Calendar</button><button onClick={handleShare} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400/60 hover:text-white flex items-center gap-1.5"><Share2 className="h-3 w-3" />Share</button>{onToggleFavorite && <button onClick={() => onToggleFavorite(event.id)} className={`rounded-lg border px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 ${isFavorite ? 'border-amber-400/50 bg-amber-500/10 text-amber-300' : 'border-slate-700 text-slate-300 hover:border-cyan-400/60 hover:text-white'}`}>{isFavorite ? '★ Saved' : '☆ Save'}</button>}<a href={event.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">Official source <ExternalLink className="h-3 w-3" /></a></div>
    </article>
  );
};

const LatestGameNewsCard: React.FC<{ page: GameNewsPage }> = ({ page }) => {
  const game = POPULAR_GAMES.find((item) => item.id === page.gameId);
  if (!game) return null;
  const tournamentContentPattern = /\b(tournament|esports?|world cup|world championship|championship|competition|qualif(?:y|ies|ication|ier)|playoffs?|grand finals?|bracket|roster|standings|prize pool|pro league|fncs|algs|ignite|bmsd|bmic|pmps|vct|worlds|rlcs|mpl)\b/i;
  const latestGameUpdate = page.update.find((paragraph) => !tournamentContentPattern.test(paragraph));
  return (
    <article className="flex h-full flex-col rounded-2xl border border-cyan-400/20 bg-[#080d1a]/95 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/45">
      <div className="flex items-center justify-between gap-3"><span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-300">{game.shortName}</span><span className="text-[10px] text-slate-500">Checked {page.updateDate}</span></div>
      <h3 className="mt-4 font-gaming text-sm font-bold leading-snug text-white">{tournamentContentPattern.test(page.updateHeading) ? `Latest ${game.shortName} game news` : page.updateHeading}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-400">{latestGameUpdate || `No separate game update is confirmed for ${game.shortName} in this entry.`}</p>
      <a href={`/game-news/${page.gameId}`} className="mt-auto inline-flex pt-4 text-xs font-black text-cyan-300 hover:text-white">Open current details →</a>
    </article>
  );
};

function ArticleView({ article, event }: { article?: TournamentNews; event?: TournamentEvent }) {
  if (!article && !event) return <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-sm text-red-200">This tournament update is not available. Return to the esports hub for the latest updates.</div>;
  const title = article?.title || event?.name || 'Tournament update';
  const sourceUrl = article?.sourceUrl || event?.sourceUrl;
  const sourceName = article?.sourceName || event?.sourceName;
  const gameId = article?.gameId || event?.gameId || '';
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 shadow-2xl shadow-black/30">
      <div className="bg-radial-hero px-6 py-9 sm:px-10 sm:py-12"><div className="flex flex-wrap items-center gap-2"><StatusBadge status={article?.status || event?.status || 'upcoming'} /><span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300">{article?.gameName || event?.gameName}</span></div><h1 className="mt-5 max-w-4xl font-gaming text-2xl font-black leading-tight text-white sm:text-4xl">{title}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{article?.excerpt || event?.summary}</p><p className="mt-3 text-xs font-semibold text-slate-500">Official schedule source checked {sourceCheckDate(gameId)}</p></div>
      <div className="space-y-7 px-6 py-8 sm:px-10 sm:py-10">
        {event && <dl className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-sm text-slate-300 sm:grid-cols-2"><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Date</dt><dd className="mt-1">{event.dateLabel}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Organizer</dt><dd className="mt-1">{event.organizer}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Region / location</dt><dd className="mt-1">{event.region} · {event.location}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Format</dt><dd className="mt-1">{event.format || 'Official tournament event'}</dd></div>{event.prizePool && <div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Prize pool</dt><dd className="mt-1">{event.prizePool}</dd></div>}</dl>}
        {event && <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-semibold text-white">{event.participantsLabel || 'Teams and participants'}</h2>{event.teams && <p className="mt-1 text-xs text-slate-400">Published field size: {event.teams} teams</p>}</div>{event.participantsSourceUrl && <a href={event.participantsSourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white">Roster source{event.participantsSourceName ? ` · ${event.participantsSourceName}` : ''}<ExternalLink className="h-3 w-3" /></a>}</div>{event.participants?.length ? <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{event.participants.map((participant) => <li key={participant} className="rounded-lg border border-slate-800 bg-[#080d1a] px-3 py-2 text-xs font-semibold text-slate-200">{participant}</li>)}</ul> : <p className="mt-3 text-sm leading-6 text-slate-400">{event.participantsNote || 'Named entrants are not verified in this page yet. Open the official event source for the latest roster, bracket or regional standings.'}</p>}{event.participantsNote && event.participants?.length > 0 && <p className="mt-3 text-xs leading-5 text-slate-500">{event.participantsNote}</p>}</section>}
        {event && event.bracket && <section className="mt-7"><BracketView rounds={event.bracket.rounds} tournamentName={event.name} /></section>}
        {event && (event.statistics || event.streams || event.popularMatches) && <section className="mt-7"><TournamentDashboard event={event} /></section>}
        {(article?.content || [event?.summary || '']).map((paragraph) => <p key={paragraph} className="max-w-3xl text-sm leading-8 text-slate-300">{paragraph}</p>)}
        <div className={`rounded-2xl border p-5 ${article?.sourceVerified === false ? 'border-amber-400/25 bg-amber-500/5' : 'border-emerald-400/25 bg-emerald-500/5'}`}><div className="flex gap-3"><ShieldCheck className={`mt-0.5 h-5 w-5 shrink-0 ${article?.sourceVerified === false ? 'text-amber-300' : 'text-emerald-300'}`} /><div><h2 className={`font-semibold ${article?.sourceVerified === false ? 'text-amber-200' : 'text-emerald-200'}`}>{article?.sourceVerified === false ? 'Source check pending' : 'Checked against official source'}</h2><p className="mt-1 text-sm leading-6 text-slate-300">{article?.sourceVerified === false ? 'This is an unverified draft and is not an official result or confirmed event detail.' : 'This summary was checked against the linked publisher or organizer source. Match status, registration windows and bracket details can change, so check the source for the latest information.'}</p><a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-black text-emerald-300 hover:text-white">Open {sourceName} <ExternalLink className="h-3.5 w-3.5" /></a></div></div></div>
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-800 pt-6">{gameGeneratorSlug(gameId) && <a href={`/` + gameGeneratorSlug(gameId)} className="rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-300">Generate {article?.gameName || event?.gameName} name</a>}<a href={event ? '/tournaments' : '/esports-news'} className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 hover:border-cyan-400/60 hover:text-white">{event ? 'Back to tournaments' : 'Back to esports news'}</a></div>
      </div>
    </article>
  );
}

export function EsportsHub({ mode, slug }: EsportsHubProps) {
  const [query, setQuery] = useState('');
  const [gameId, setGameId] = useState('all');
  const [status, setStatus] = useState<TournamentStatus | 'all'>('all');
  const [events, setEvents] = useState<TournamentEvent[]>(getTournamentEvents());
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('tournament-favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('search-history') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (mode !== 'tournaments') return;
    setLoading(true);
    fetch('/api/tournaments').then((response) => response.ok ? response.json() : null).then((payload) => {
      if (Array.isArray(payload?.items)) setEvents(payload.items);
    }).catch(() => undefined).finally(() => setLoading(false));
  }, [mode]);

  useEffect(() => {
    if (mode !== 'news' || !slug) return;
    const article = getTournamentNewsBySlug(slug);
    if (!article) return;
    const linkedEvent = article.eventId ? getTournamentEvents().find((event) => event.id === article.eventId) : undefined;
    window.location.replace(linkedEvent ? `/tournaments/${linkedEvent.slug}` : '/tournaments');
  }, [mode, slug]);

  useEffect(() => {
    const article = slug ? getTournamentNewsBySlug(slug) : undefined;
    const event = slug ? getTournamentEventBySlug(slug) : undefined;
    document.title = article ? `${article.title} | ${SITE_DISPLAY_NAME}` : event ? `${event.name} | ${SITE_DISPLAY_NAME}` : mode === 'news' ? `Esports Tournament News | ${SITE_DISPLAY_NAME}` : `Game Tournament Schedule | ${SITE_DISPLAY_NAME}`;
  }, [mode, slug]);

  useEffect(() => {
    try {
      localStorage.setItem('tournament-favorites', JSON.stringify(favorites));
    } catch {
      // Ignore storage errors
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('search-history', JSON.stringify(searchHistory));
    } catch {
      // Ignore storage errors
    }
  }, [searchHistory]);

  const toggleFavorite = (tournamentId: string) => {
    setFavorites(prev => {
      if (prev.includes(tournamentId)) {
        return prev.filter(id => id !== tournamentId);
      } else {
        return [...prev, tournamentId];
      }
    });
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      setSearchHistory(prev => [searchQuery.trim(), ...prev.slice(0, 9)]);
    }
  };

  const latestGameUpdates = useMemo(() => GAME_NEWS_PAGES.filter((page) => {
    if (!POPULAR_GAMES.some((game) => game.id === page.gameId)) return false;
    if (gameId !== 'all' && page.gameId !== gameId) return false;
    if (query && !`${page.heading} ${page.updateHeading} ${page.intro} ${page.update.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())) return false;
    return true;
  }), [gameId, query]);
  const filteredEvents = useMemo(() => {
    let eventsToFilter = filterTournamentEvents({ gameId: gameId === 'all' || gameId === 'favorites' ? undefined : gameId, status: status === 'all' ? undefined : status, query });
    
    if (gameId === 'favorites') {
      eventsToFilter = eventsToFilter.filter(event => favorites.includes(event.id));
    }
    
    return eventsToFilter.filter((item) => events.some((candidate) => candidate.id === item.id));
  }, [events, gameId, query, status, favorites]);
  const selectedArticle = undefined;
  const selectedEvent = mode === 'tournaments' && slug ? events.find((event) => event.slug === slug) || getTournamentEventBySlug(slug) : undefined;
  const isDetail = Boolean(slug) && !(mode === 'news' && getTournamentNewsBySlug(slug));
  const availableGames = mode === 'news'
    ? [...new Map([...GAME_NEWS_PAGES.flatMap((page) => {
      const game = POPULAR_GAMES.find((item) => item.id === page.gameId);
      return game ? [[game.id, game.shortName] as const] : [];
    })]).entries()]
    : [...new Map(events.map((item) => [item.gameId, item.gameName] as const)).entries()];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 bg-cyber-grid">
      <HubHeader mode={mode} />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"><ContentLanguagePicker />
        {!isDetail ? <>
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 px-6 py-9 shadow-2xl shadow-black/30 sm:px-10 sm:py-12"><div className="max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300"><Newspaper className="h-3.5 w-3.5" /> Tradivex esports desk</div><h1 className="font-gaming text-2xl font-black leading-tight text-white sm:text-5xl">{mode === 'news' ? 'Latest game news and updates' : 'Upcoming and completed game tournaments'}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{mode === 'news' ? 'Current updates for the games listed on Tradivex. Each game appears once; open its page for full details and publisher sources.' : 'Filter official tournament information by game, status and region. Dates and results are summaries; the linked organizer remains the source of truth.'}</p></div>{mode === 'tournaments' && <div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><Radio className="h-4 w-4 text-red-300" /><p className="mt-3 text-sm font-bold text-white">Live and upcoming</p><p className="mt-1 text-xs leading-5 text-slate-500">Clear status labels instead of fake live scores.</p></div><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><ShieldCheck className="h-4 w-4 text-emerald-300" /><p className="mt-3 text-sm font-bold text-white">Official source links</p><p className="mt-1 text-xs leading-5 text-slate-500">Every update points to the organizer or publisher.</p></div><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><Gamepad2 className="h-4 w-4 text-amber-300" /><p className="mt-3 text-sm font-bold text-white">Connected to names</p><p className="mt-1 text-xs leading-5 text-slate-500">Jump from tournament news to a game name generator.</p></div></div>}</section>
          <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-4 sm:flex-row sm:items-center"><label className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(event) => handleSearch(event.target.value)} placeholder={mode === 'news' ? 'Search games or current updates' : 'Search tournaments, games or teams'} className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400/60" />{searchHistory.length > 0 && query && <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-slate-700 bg-slate-950/90 p-2 z-10"><div className="text-[10px] text-slate-500 mb-2">Recent searches</div>{searchHistory.slice(0, 5).map((item, idx) => <button key={idx} onClick={() => handleSearch(item)} className="block w-full text-left px-2 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded">{item}</button>)}</div>}</label><select value={gameId} onChange={(event) => setGameId(event.target.value)} className="h-11 rounded-xl border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-200 outline-none focus:border-cyan-400/60"><option value="all">All games</option>{mode === 'tournaments' && <option value="favorites">★ Favorites ({favorites.length})</option>}{availableGames.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>{mode === 'tournaments' && <select value={status} onChange={(event) => setStatus(event.target.value as TournamentStatus | 'all')} className="h-11 rounded-xl border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-200 outline-none focus:border-cyan-400/60"><option value="all">All statuses</option><option value="live">Live / ongoing</option><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select>}</section>
          {mode === 'news' ? <section className="mt-8"><div className="mb-4"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Latest game news</p><h2 className="mt-1 font-gaming text-xl font-black text-white">{latestGameUpdates.length} game update pages</h2></div>{latestGameUpdates.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latestGameUpdates.map((page) => <LatestGameNewsCard key={page.gameId} page={page} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">No current game updates match this search.</div>}</section> : <><section className="mt-8"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Event calendar</p><h2 className="mt-1 font-gaming text-xl font-black text-white">{filteredEvents.length} listed events</h2></div><a href="/esports-news" className="text-xs font-bold text-amber-300 hover:text-white">Read game news →</a></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>{filteredEvents.length === 0 && <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">No updates match these filters yet.</div>}</section>
          <section className="mt-10 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><div><h2 className="font-gaming text-base font-bold text-white">How Tradivex keeps tournament news reliable</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">Updates are built from official organizer or publisher sources. Automated Gemini drafts are designed to summarize supplied source text; they should never invent match results, registration links or prize pools. Always open the official source for the latest change.</p></div></div></section>
          <section className="mt-6 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">Official source directory</p><h2 className="mt-1 font-gaming text-xl font-black text-white">Follow tournaments by game and platform</h2></div><span className="text-xs text-slate-500">{OFFICIAL_TOURNAMENT_SOURCES.length} official sources · latest checked {formatDate(LATEST_SOURCE_CHECK)}</span></div><p className="mb-4 max-w-4xl text-xs leading-6 text-slate-400">The directory links publisher, league and organizer calendars. Regional leagues have separate dates and qualification paths; platform pages are marked as references. An empty tournament calendar means no dated event has been verified here, not that community competitions do not exist.</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{OFFICIAL_TOURNAMENT_SOURCES.map((source) => <a key={source.gameId} href={source.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-slate-800 bg-slate-950/45 p-4 transition hover:border-amber-400/45 hover:bg-slate-900/60"><div className="flex items-start justify-between gap-3"><span className="text-sm font-bold text-slate-200 group-hover:text-white">{source.gameName}</span><ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-600 group-hover:text-amber-300" /></div><p className="mt-2 text-xs font-semibold text-slate-400">{source.sourceName}</p><p className="mt-1 text-xs leading-5 text-slate-500">{source.note}</p></a>)}</div></section></>}
        </> : <><a href={mode === 'news' ? '/esports-news' : '/tournaments'} className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#080d1a] px-4 py-2.5 text-sm font-bold text-cyan-300 transition hover:border-cyan-400/50 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to {mode === 'news' ? 'all game news' : 'tournament schedule'}</a><ArticleView article={selectedArticle} event={selectedEvent} /></>}
      </main>
      <footer className="border-t border-slate-800 bg-[#04060d] px-4 py-8 text-xs text-slate-400 sm:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 {SITE_DISPLAY_NAME}. Tournament information is independently summarized.</p><div className="flex flex-wrap gap-4"><a href="/" className="hover:text-white">Name Generator</a><a href="/about" className="hover:text-white">About</a><a href="/contact" className="hover:text-white">Contact</a></div></div></footer>
    </div>
  );
}
