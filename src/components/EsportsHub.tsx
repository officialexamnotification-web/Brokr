import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, ExternalLink, Gamepad2, Globe2, Newspaper, Radio, Search, ShieldCheck, Trophy } from 'lucide-react';
import { POPULAR_GAMES } from '../data/games';
import { SITE_DISPLAY_NAME, SITE_NAME, SITE_SUFFIX } from '../data/game-seo';
import { OFFICIAL_TOURNAMENT_SOURCES, type TournamentEvent, type TournamentNews, type TournamentStatus } from '../data/tournament-data';
import { filterTournamentEvents, filterTournamentNews, getTournamentEventBySlug, getTournamentEvents, getTournamentNews, getTournamentNewsBySlug } from '../lib/tournament-feed';

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

function statusClass(status: TournamentStatus) {
  if (status === 'live') return 'border-red-400/30 bg-red-500/10 text-red-300';
  if (status === 'upcoming') return 'border-amber-400/30 bg-amber-500/10 text-amber-300';
  if (status === 'completed') return 'border-slate-700 bg-slate-800/70 text-slate-300';
  return 'border-cyan-400/30 bg-cyan-500/10 text-cyan-300';
}

function gameGeneratorSlug(gameId: string) {
  return POPULAR_GAMES.find((game) => game.id === gameId)?.slug || '';
}

function HubHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-[#060914]/95 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-3 sm:px-5 lg:px-7">
        <a href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-slate-950 shadow-lg shadow-orange-500/20"><Gamepad2 className="h-5 w-5 stroke-[2.6]" /></span>
          <span className="min-w-0"><span className="block whitespace-nowrap font-gaming text-[15px] font-black tracking-wide text-white sm:text-[18px]">{SITE_NAME.toUpperCase()}</span><span className="block text-[10px] font-medium text-amber-300">{SITE_SUFFIX}</span></span>
        </a>
        <nav className="hidden items-center gap-2 sm:flex" aria-label="Esports navigation">
          <a href="/" className="rounded-xl border border-slate-800 bg-[#0b101d] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-amber-400/50 hover:text-white">Name Generator</a>
          <a href="/tournaments" className="rounded-xl border border-amber-400/50 bg-amber-500 px-3 py-2 text-xs font-black text-slate-950">Tournaments</a>
        </nav>
        <a href="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0b101d] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-amber-400/50 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Generator</a>
      </div>
    </header>
  );
}

function StatusBadge({ status }: { status: TournamentStatus }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${statusClass(status)}`}><span className={`h-1.5 w-1.5 rounded-full ${status === 'live' ? 'animate-pulse bg-red-400' : 'bg-current'}`} />{STATUS_LABELS[status]}</span>;
}

const EventCard: React.FC<{ event: TournamentEvent }> = ({ event }) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-5 transition hover:-translate-y-0.5 hover:border-amber-400/45 hover:shadow-xl hover:shadow-amber-950/20">
      <div className="flex items-start justify-between gap-3"><StatusBadge status={event.status} /><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{event.gameName}</span></div>
      <h2 className="mt-4 font-gaming text-base font-bold leading-snug text-white">{event.name}</h2>
      <p className="mt-2 text-xs leading-6 text-slate-400">{event.summary}</p>
      <dl className="mt-4 grid gap-2 border-t border-slate-800 pt-4 text-xs text-slate-300"><div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-amber-300" /><span>{event.dateLabel}</span></div><div className="flex items-center gap-2"><Globe2 className="h-3.5 w-3.5 text-cyan-300" /><span>{event.region} · {event.location}</span></div>{event.prizePool && <div className="flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-emerald-300" /><span>{event.prizePool}{event.teams ? ` · ${event.teams} teams` : ''}</span></div>}</dl>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5"><a href={`/tournaments/${event.slug}`} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-amber-300">View event</a><a href={event.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">Official source <ExternalLink className="h-3 w-3" /></a></div>
    </article>
  );
};

const NewsCard: React.FC<{ article: TournamentNews }> = ({ article }) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/45 hover:shadow-xl hover:shadow-cyan-950/20">
      <div className="flex items-start justify-between gap-3"><StatusBadge status={article.status} /><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-300">{article.gameName}</span></div>
      <h2 className="mt-4 font-gaming text-base font-bold leading-snug text-white">{article.title}</h2>
      <p className="mt-2 text-xs leading-6 text-slate-400">{article.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">{article.tags.map((tag) => <span key={tag} className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1 text-[10px] font-bold text-slate-400">#{tag}</span>)}</div>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5"><a href={`/esports-news/${article.slug}`} className="rounded-lg bg-cyan-500 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-cyan-300">Read full update</a><span className="text-[10px] text-slate-500">Updated {formatDate(article.updatedAt)}</span></div>
    </article>
  );
};

function ArticleView({ article, event }: { article?: TournamentNews; event?: TournamentEvent }) {
  if (!article && !event) return <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-sm text-red-200">This tournament update is not available. Return to the esports hub for verified updates.</div>;
  const title = article?.title || event?.name || 'Tournament update';
  const sourceUrl = article?.sourceUrl || event?.sourceUrl;
  const sourceName = article?.sourceName || event?.sourceName;
  const gameId = article?.gameId || event?.gameId || '';
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 shadow-2xl shadow-black/30">
      <div className="bg-radial-hero px-6 py-9 sm:px-10 sm:py-12"><div className="flex flex-wrap items-center gap-2"><StatusBadge status={article?.status || event?.status || 'upcoming'} /><span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300">{article?.gameName || event?.gameName}</span></div><h1 className="mt-5 max-w-4xl font-gaming text-2xl font-black leading-tight text-white sm:text-4xl">{title}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{article?.excerpt || event?.summary}</p></div>
      <div className="space-y-7 px-6 py-8 sm:px-10 sm:py-10">
        {event && <dl className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-sm text-slate-300 sm:grid-cols-2"><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Date</dt><dd className="mt-1">{event.dateLabel}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Organizer</dt><dd className="mt-1">{event.organizer}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Region / location</dt><dd className="mt-1">{event.region} · {event.location}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Format</dt><dd className="mt-1">{event.format || 'Official tournament event'}</dd></div>{event.prizePool && <div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Prize pool</dt><dd className="mt-1">{event.prizePool}</dd></div>}</dl>}
        {(article?.content || [event?.summary || '']).map((paragraph) => <p key={paragraph} className="max-w-3xl text-sm leading-8 text-slate-300">{paragraph}</p>)}
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/5 p-5"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><div><h2 className="font-semibold text-emerald-200">Source-verified update</h2><p className="mt-1 text-sm leading-6 text-slate-300">This page summarizes the linked official source. Match status, registration windows and bracket details can change, so verify the latest information before relying on it.</p><a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-black text-emerald-300 hover:text-white">Open {sourceName} <ExternalLink className="h-3.5 w-3.5" /></a></div></div></div>
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-800 pt-6"><a href={`/` + gameGeneratorSlug(gameId)} className="rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-300">Generate {article?.gameName || event?.gameName} name</a><a href="/esports-news" className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 hover:border-cyan-400/60 hover:text-white">Back to esports news</a></div>
      </div>
    </article>
  );
}

export function EsportsHub({ mode, slug }: EsportsHubProps) {
  const [query, setQuery] = useState('');
  const [gameId, setGameId] = useState('all');
  const [status, setStatus] = useState<TournamentStatus | 'all'>('all');
  const [events, setEvents] = useState<TournamentEvent[]>(getTournamentEvents());
  const [news, setNews] = useState<TournamentNews[]>(getTournamentNews());

  useEffect(() => {
    const endpoint = mode === 'news' ? '/api/news' : '/api/tournaments';
    fetch(endpoint).then((response) => response.ok ? response.json() : null).then((payload) => {
      if (!payload) return;
      if (mode === 'news' && Array.isArray(payload.items)) setNews(payload.items);
      if (mode === 'tournaments' && Array.isArray(payload.items)) setEvents(payload.items);
    }).catch(() => undefined);
  }, [mode]);

  useEffect(() => {
    const article = slug ? getTournamentNewsBySlug(slug) : undefined;
    const event = slug ? getTournamentEventBySlug(slug) : undefined;
    document.title = article ? `${article.title} | ${SITE_DISPLAY_NAME}` : event ? `${event.name} | ${SITE_DISPLAY_NAME}` : mode === 'news' ? `Esports Tournament News | ${SITE_DISPLAY_NAME}` : `Game Tournament Schedule | ${SITE_DISPLAY_NAME}`;
  }, [mode, slug]);

  const filteredNews = useMemo(() => filterTournamentNews({ gameId: gameId === 'all' ? undefined : gameId, status: status === 'all' ? undefined : status, query }).filter((item) => news.some((candidate) => candidate.id === item.id)), [gameId, news, query, status]);
  const filteredEvents = useMemo(() => filterTournamentEvents({ gameId: gameId === 'all' ? undefined : gameId, status: status === 'all' ? undefined : status, query }).filter((item) => events.some((candidate) => candidate.id === item.id)), [events, gameId, query, status]);
  const selectedArticle = mode === 'news' && slug ? news.find((article) => article.slug === slug) || getTournamentNewsBySlug(slug) : undefined;
  const selectedEvent = mode === 'tournaments' && slug ? events.find((event) => event.slug === slug) || getTournamentEventBySlug(slug) : undefined;
  const isDetail = Boolean(slug);
  const availableGames = [...new Map([...news.map((item) => [item.gameId, item.gameName] as const), ...events.map((item) => [item.gameId, item.gameName] as const)]).entries()];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 bg-cyber-grid">
      <HubHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {!isDetail ? <>
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 px-6 py-9 shadow-2xl shadow-black/30 sm:px-10 sm:py-12"><div className="max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300"><Newspaper className="h-3.5 w-3.5" /> Tradivex esports desk</div><h1 className="font-gaming text-2xl font-black leading-tight text-white sm:text-5xl">{mode === 'news' ? 'Tournament news for the games you play' : 'Upcoming and completed game tournaments'}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{mode === 'news' ? 'Find verified updates about ongoing events, upcoming schedules, qualifiers, teams and results across popular games.' : 'Filter official tournament information by game, status and region. Dates and results are summaries; the linked organizer remains the source of truth.'}</p></div><div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><Radio className="h-4 w-4 text-red-300" /><p className="mt-3 text-sm font-bold text-white">Live and upcoming</p><p className="mt-1 text-xs leading-5 text-slate-500">Clear status labels instead of fake live scores.</p></div><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><ShieldCheck className="h-4 w-4 text-emerald-300" /><p className="mt-3 text-sm font-bold text-white">Official source links</p><p className="mt-1 text-xs leading-5 text-slate-500">Every update points to the organizer or publisher.</p></div><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><Gamepad2 className="h-4 w-4 text-amber-300" /><p className="mt-3 text-sm font-bold text-white">Connected to names</p><p className="mt-1 text-xs leading-5 text-slate-500">Jump from tournament news to a game name generator.</p></div></div></section>
          <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-4 sm:flex-row sm:items-center"><label className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tournaments, games or teams" className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400/60" /></label><select value={gameId} onChange={(event) => setGameId(event.target.value)} className="h-11 rounded-xl border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-200 outline-none focus:border-cyan-400/60"><option value="all">All games</option>{availableGames.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select><select value={status} onChange={(event) => setStatus(event.target.value as TournamentStatus | 'all')} className="h-11 rounded-xl border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-200 outline-none focus:border-cyan-400/60"><option value="all">All statuses</option><option value="live">Live / ongoing</option><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select></section>
          <section className="mt-8"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">{mode === 'news' ? 'Latest verified updates' : 'Event calendar'}</p><h2 className="mt-1 font-gaming text-xl font-black text-white">{mode === 'news' ? `${filteredNews.length} tournament updates` : `${filteredEvents.length} listed events`}</h2></div><a href={mode === 'news' ? '/tournaments' : '/esports-news'} className="text-xs font-bold text-amber-300 hover:text-white">{mode === 'news' ? 'Browse schedule →' : 'Read news →'}</a></div>{mode === 'news' ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredNews.map((article) => <NewsCard key={article.id} article={article} />)}</div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>}{(mode === 'news' ? filteredNews.length : filteredEvents.length) === 0 && <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">No verified updates match these filters yet.</div>}</section>
          <section className="mt-10 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><div><h2 className="font-gaming text-base font-bold text-white">How Tradivex keeps tournament news reliable</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">Updates are built from official organizer or publisher sources. Automated Gemini drafts are designed to summarize supplied source text; they should never invent match results, registration links or prize pools. Always open the official source for the latest change.</p></div></div></section>
          <section className="mt-6 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">Official source directory</p><h2 className="mt-1 font-gaming text-xl font-black text-white">Follow tournaments by game</h2></div><span className="text-xs text-slate-500">{OFFICIAL_TOURNAMENT_SOURCES.length} games checked · 2 Oct 2026</span></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{OFFICIAL_TOURNAMENT_SOURCES.map((source) => <a key={source.gameId} href={source.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-slate-800 bg-slate-950/45 p-4 transition hover:border-amber-400/45 hover:bg-slate-900/60"><div className="flex items-start justify-between gap-3"><span className="text-sm font-bold text-slate-200 group-hover:text-white">{source.gameName}</span><ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-600 group-hover:text-amber-300" /></div><p className="mt-2 text-xs font-semibold text-slate-400">{source.sourceName}</p><p className="mt-1 text-xs leading-5 text-slate-500">{source.note}</p></a>)}</div></section>
        </> : <ArticleView article={selectedArticle} event={selectedEvent} />}
      </main>
      <footer className="border-t border-slate-800 bg-[#04060d] px-4 py-8 text-xs text-slate-400 sm:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 {SITE_DISPLAY_NAME}. Tournament information is independently summarized.</p><div className="flex flex-wrap gap-4"><a href="/" className="hover:text-white">Name Generator</a><a href="/about" className="hover:text-white">About</a><a href="/contact" className="hover:text-white">Contact</a></div></div></footer>
    </div>
  );
}
