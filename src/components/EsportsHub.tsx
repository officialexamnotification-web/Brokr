import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BarChart3, CalendarDays, ChevronRight, ExternalLink, Gamepad2, Globe2, ListFilter, Newspaper, Radio, RadioTower, Search, ShieldCheck, Trophy, Users, Video } from 'lucide-react';
import { POPULAR_GAMES } from '../data/games';
import { SITE_DISPLAY_NAME, SITE_NAME, SITE_SUFFIX } from '../data/game-seo';
import { GAME_NEWS_PAGES, OFFICIAL_TOURNAMENT_SOURCES, TOURNAMENT_NEWS, type GameNewsPage, type TournamentEvent, type TournamentNews, type TournamentStatus, type TournamentStream } from '../data/tournament-data';
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
  postponed: 'Postponed',
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
  if (status === 'postponed') return 'border-orange-400/30 bg-orange-500/10 text-orange-300';
  return 'border-cyan-400/30 bg-cyan-500/10 text-cyan-300';
}

function getYouTubeEmbedUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');
    const id = host === 'youtu.be'
      ? url.pathname.slice(1)
      : host === 'youtube.com' || host === 'm.youtube.com'
        ? url.searchParams.get('v') || url.pathname.match(/\/embed\/([^/]+)/)?.[1]
        : undefined;
    return id && /^[A-Za-z0-9_-]{6,}$/.test(id) ? `https://www.youtube.com/embed/${id}` : undefined;
  } catch {
    return undefined;
  }
}

function getTournamentVideoSearchUrl(event: TournamentEvent) {
  const query = `${event.name} ${event.gameName} tournament broadcast`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

const OFFICIAL_YOUTUBE_CHANNELS: Record<string, TournamentStream> = {
  'bgmi-bmsd-2026': { name: 'KRAFTON INDIA ESPORTS', url: 'https://www.youtube.com/@kraftonindiaesports', language: 'India', note: 'KRAFTON India’s verified esports channel; event broadcasts and replays are published here.' },
  'bgmi-bmic-2026': { name: 'KRAFTON INDIA ESPORTS', url: 'https://www.youtube.com/@kraftonindiaesports', language: 'India', note: 'KRAFTON India’s verified esports channel; event broadcasts and replays are published here.' },
  'pubgm-pmps-korea-s2-2026': { name: 'PUBG MOBILE Esports KR', url: 'https://www.youtube.com/@pubgmesportskr', language: 'Korean', note: 'KRAFTON Korea lists this as the official PMPS 2026 S2 broadcast channel.' },
  'pubgm-pmwc-ewc-2026': { name: 'PUBG MOBILE Esports', url: 'https://www.youtube.com/@PUBGMOBILEEsports', language: 'English', note: 'Official PUBG MOBILE Esports channel for global competition broadcasts.' },
  'pubgm-pmgc-2026': { name: 'PUBG MOBILE Esports', url: 'https://www.youtube.com/@PUBGMOBILEEsports', language: 'English', note: 'Official PUBG MOBILE Esports channel for global competition broadcasts.' },
  'pubg-asia-stars-2026': { name: 'PUBG Esports', url: 'https://www.youtube.com/@PUBGEsports', language: 'English', note: 'Official PUBG Esports channel; regional event streams may use local-language channels.' },
  'free-fire-ffws-global-finals-2026': { name: 'Free Fire Esports Official', url: 'https://www.youtube.com/@freefireesportsofficial', language: 'English', note: 'Official Free Fire esports channel; regional-language broadcasts may use local channels.' },
  'valorant-champions-shanghai-2026': { name: 'VALORANT Esports', url: 'https://www.youtube.com/@valorantesports', language: 'English', note: 'Official VALORANT Esports channel; regional-language feeds may be separate.' },
  'valorant-game-changers-americas-lcq-2026': { name: 'VALORANT Esports', url: 'https://www.youtube.com/@valorantesports', language: 'English', note: 'Official VALORANT Esports channel; regional-language feeds may be separate.' },
  'valorant-game-changers-championship-2026': { name: 'VALORANT Esports', url: 'https://www.youtube.com/@valorantesports', language: 'English', note: 'Official VALORANT Esports channel; regional-language feeds may be separate.' },
  'cs2-esl-pro-league-s24-2026': { name: 'ESL Counter-Strike · official VODs', url: 'https://www.youtube.com/@ESLCS/streams', language: 'English', note: 'ESL confirms Season 24 broadcasts on its Counter-Strike YouTube channels. Browse the official channel archive for event VODs.' },
  'cs2-thunderpick-world-championship-2026': { name: 'BLAST Premier', url: 'https://www.youtube.com/@BLASTPremier', language: 'English', note: 'BLAST’s official Counter-Strike broadcast channel.' },
  'cs2-pgl-masters-bucharest-2026': { name: 'PGL', url: 'https://www.youtube.com/@pglesports', language: 'English', note: 'PGL’s official esports broadcast channel.' },
  'cs2-pgl-singapore-major-2026': { name: 'PGL', url: 'https://www.youtube.com/@pglesports', language: 'English', note: 'PGL’s official esports broadcast channel.' },
  'cs2-iem-beijing-2026': { name: 'ESL Counter-Strike', url: 'https://www.youtube.com/@ESLCS', language: 'English', note: 'ESL’s official Counter-Strike broadcast channel.' },
  'cs2-blast-rivals-hk-2026': { name: 'BLAST Premier', url: 'https://www.youtube.com/@BLASTPremier', language: 'English', note: 'BLAST’s official Counter-Strike broadcast channel.' },
  'fortnite-fncs-solo-october-2026': { name: 'Fortnite', url: 'https://www.youtube.com/@Fortnite', language: 'English', note: 'Epic Games’ official Fortnite channel; event broadcasts may also use regional competitive channels.' },
  'apex-algs-y6-split-2-playoffs': { name: 'Apex Legends Global Series', url: 'https://www.youtube.com/@playapexesports', language: 'English', note: 'Official ALGS channel for live streams, highlights and news.' },
  'league-worlds-2026': { name: 'LoL Esports', url: 'https://www.youtube.com/@lolesports', language: 'English', note: 'Official League of Legends esports channel; regional language feeds may be separate.' },
  'rlcs-world-championship-2026': { name: 'Rocket League Esports', url: 'https://www.youtube.com/@RocketLeagueEsports', language: 'English', note: 'Official Rocket League Esports channel.' },
  'owcs-stage-3-2026': { name: 'Overwatch Esports', url: 'https://www.youtube.com/@OverwatchEsports', language: 'English', note: 'Official Overwatch Esports channel; regional broadcasts may be separate.' },
  'r6-osaka-major-2026': { name: 'Rainbow Six Esports', url: 'https://www.youtube.com/@Rainbow6', language: 'English', note: 'Official Rainbow Six channel; regional broadcasts may be separate.' },
  'ea-fc-pro-27-ladder-2026': { name: 'EA SPORTS FC', url: 'https://www.youtube.com/@EASPORTSFC', language: 'English', note: 'Official EA SPORTS FC channel; FC Pro event streams may also appear on regional channels.' },
  'mlbb-mpl-ph-s18-playoffs-2026': { name: 'Mobile Legends: Bang Bang Esports', url: 'https://www.youtube.com/@MLBBEsports', language: 'English', note: 'Official MLBB esports channel; MPL Philippines may use its regional channel for local-language coverage.' },
  'hok-asian-games-2026': { name: 'Asian Games Aichi-Nagoya 2026', url: 'https://www.youtube.com/@AsianGames_', language: 'International', note: 'Official Asian Games channel; esports feeds may be distributed by regional rights holders.' },
  'brawl-stars-world-finals-2026': { name: 'Brawl Stars', url: 'https://www.youtube.com/@BrawlStars', language: 'English', note: 'Official Brawl Stars channel.' },
  'brawl-stars-october-event-weekend-2026': { name: 'Brawl Stars', url: 'https://www.youtube.com/@BrawlStars', language: 'English', note: 'Official Brawl Stars channel.' },
  'coc-world-championship-2026-lcq': { name: 'Clash of Clans', url: 'https://www.youtube.com/@ClashofClans', language: 'English', note: 'Official Clash of Clans channel.' },
  'clash-royale-league-lcq-2026': { name: 'Clash Royale', url: 'https://www.youtube.com/@ClashRoyale', language: 'English', note: 'Official Clash Royale channel.' },
  'roblox-showdown-cup-2026': { name: 'Roblox', url: 'https://www.youtube.com/@Roblox', language: 'English', note: 'Official Roblox channel; tournament broadcasts may be hosted by the event organizer.' },
  'marvel-rivals-ignite-stage-2-2026': { name: 'Marvel Rivals Esports', url: 'https://www.youtube.com/@MarvelRivals', language: 'English', note: 'Official Marvel Rivals channel; event broadcasts may use regional feeds.' },
  'marvel-rivals-ignite-grand-finals-2026': { name: 'Marvel Rivals Esports', url: 'https://www.youtube.com/@MarvelRivals', language: 'English', note: 'Official Marvel Rivals channel; event broadcasts may use regional feeds.' },
  'aov-10fest-winter-finals-2026': { name: 'Garena Liên Quân Mobile', url: 'https://www.youtube.com/@LienQuanMobile', language: 'Vietnamese', note: 'Garena’s official Arena of Valor Vietnam esports channel.' },
  'aov-aic-2026': { name: 'Garena Liên Quân Mobile', url: 'https://www.youtube.com/@LienQuanMobile', language: 'Vietnamese', note: 'Garena’s official Arena of Valor Vietnam esports channel; regional finals may use local channels.' },
  'tft-tacticians-superbrawl-2026': { name: 'Teamfight Tactics', url: 'https://www.youtube.com/@TeamfightTactics', language: 'English', note: 'Official Teamfight Tactics channel.' },
  'tft-vegas-open-2026': { name: 'Teamfight Tactics', url: 'https://www.youtube.com/@TeamfightTactics', language: 'English', note: 'Official Teamfight Tactics channel.' },
  'pubg-pgs-circuit-4-2026': { name: 'PUBG Esports', url: 'https://www.youtube.com/@PUBGEsports', language: 'English', note: 'Official PUBG Esports channel; regional-language feeds may be separate.' },
  'pubg-pgc-2026': { name: 'PUBG Esports', url: 'https://www.youtube.com/@PUBGEsports', language: 'English', note: 'Official PUBG Esports channel; regional-language feeds may be separate.' },
  'apex-algs-y6-lcq': { name: 'Apex Legends Global Series', url: 'https://www.youtube.com/@playapexesports', language: 'English', note: 'Official ALGS channel for live streams, highlights and news.' },
  'apex-algs-y6-championship': { name: 'Apex Legends Global Series', url: 'https://www.youtube.com/@playapexesports', language: 'English', note: 'Official ALGS channel for live streams, highlights and news.' },
  'ea-fc-pro-27-global-qualifier': { name: 'EA SPORTS FC', url: 'https://www.youtube.com/@EASPORTSFC', language: 'English', note: 'Official EA SPORTS FC channel; FC Pro event streams may also appear on regional channels.' },
  'madden-mcs-27-most-feared-qualifier': { name: 'Madden NFL', url: 'https://www.youtube.com/@EAMaddenNFL', language: 'English', note: 'Official Madden NFL channel; MCS broadcasts may also be linked from EA channels.' },
  'dota2-ti-2026': { name: 'Dota 2', url: 'https://www.youtube.com/@DOTA2', language: 'English', note: 'Official Dota 2 channel; TI 2026 archived broadcasts are available here.' },
  'dota2-blast-slam-viii-2026': { name: 'BLAST Dota', url: 'https://www.youtube.com/@BLASTDota', language: 'English', note: 'BLAST lists this channel for official BLAST Slam VIII broadcasts.' },
  'mlbb-mtc-turkiye-s8-2026': { name: 'Mobile Legends: Bang Bang Esports', url: 'https://www.youtube.com/@MLBBEsports', language: 'English', note: 'Official global MLBB esports channel; the Turkish event broadcast is linked separately above.' },
};

function getOfficialBroadcastStreams(event: TournamentEvent): TournamentStream[] {
  const channel = OFFICIAL_YOUTUBE_CHANNELS[event.id];
  return channel ? [channel] : [];
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
      <dl className="mt-4 grid gap-2 border-t border-slate-800 pt-4 text-xs text-slate-300"><div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-amber-300" /><span>{event.dateLabel}</span></div><div className="flex items-center gap-2"><Globe2 className="h-3.5 w-3.5 text-cyan-300" /><span>{event.region} · {event.location}</span></div>{(event.prizePool || event.teams) && <div className="flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-emerald-300" /><span>{[event.prizePool, event.teams ? `${event.participants?.length ? `${event.participants.length} of ` : ''}${event.teams} teams` : undefined].filter(Boolean).join(' · ')}</span></div>}<div className="text-slate-500">Organizer: {event.organizer}</div></dl>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5"><span className="w-full text-[10px] text-slate-500">Event record reviewed {formatDate(event.updatedAt)}</span><a href={`/tournaments/${event.slug}`} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-amber-300">View event</a><a href={event.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">Official source <ExternalLink className="h-3 w-3" /></a></div>
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

function PortalStats({ mode, newsCount, eventCount, liveCount, countryCount, news, events, filteredEvents }: { mode: EsportsHubProps['mode']; newsCount: number; eventCount: number; liveCount: number; countryCount: number; news: TournamentNews[]; events: TournamentEvent[]; filteredEvents: TournamentEvent[] }) {
  const metrics = mode === 'news'
    ? [['Game pages', `${newsCount}`, 'Publisher update pages', Newspaper], ['Tournament records', `${eventCount}`, 'Cross-linked events', Trophy], ['Live events', `${liveCount}`, 'Status checked', RadioTower], ['Regions tracked', `${countryCount}`, 'Country and global records', Globe2]]
    : [['Tournament records', `${eventCount}`, 'Upcoming and completed', Trophy], ['Live / ongoing', `${liveCount}`, 'Status checked', Radio], ['Game news pages', `${newsCount}`, 'Separate news desk', Newspaper], ['Regions tracked', `${countryCount}`, 'Country and global records', Globe2]];
  return <><section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(([label, value, note, Icon]) => <article key={String(label)} className="rounded-2xl border border-slate-800 bg-[#0a1020]/90 p-4 shadow-lg shadow-black/10"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</span>{React.createElement(Icon as React.ElementType, { className: 'h-4 w-4 text-amber-300' })}</div><p className="mt-3 font-gaming text-2xl font-black text-white">{value}</p><p className="mt-1 text-[11px] text-slate-500">{note}</p></article>)}</section><div className="mt-6">{mode === 'news' ? <NewsSidebar news={news} events={events} /> : <TournamentSidebar events={filteredEvents} />}</div></>;
}

function NewsSidebar({ news, events }: { news: TournamentNews[]; events: TournamentEvent[] }) {
  const liveEvents = events.filter((event) => event.status === 'live').slice(0, 5);
  return <aside className="grid gap-4 lg:grid-cols-2"><section className="rounded-2xl border border-slate-800 bg-[#0a1020]/95 p-4"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="font-gaming text-sm font-bold text-white">Latest verified news</h2><Newspaper className="h-4 w-4 text-cyan-300" /></div><div className="space-y-3">{news.slice(0, 5).map((item) => <a key={item.id} href={`/esports-news/${item.slug}`} className="group block border-b border-slate-800 pb-3 last:border-0 last:pb-0"><p className="text-xs font-bold leading-5 text-slate-200 group-hover:text-cyan-200">{item.title}</p><p className="mt-1 text-[10px] text-slate-500">{item.gameName} · Updated {formatDate(item.updatedAt)}</p></a>)}</div><a href="/esports-news" className="mt-4 inline-flex items-center gap-1 text-xs font-black text-cyan-300 hover:text-white">All game news <ChevronRight className="h-3 w-3" /></a></section><section className="rounded-2xl border border-slate-800 bg-[#0a1020]/95 p-4"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="font-gaming text-sm font-bold text-white">Live events</h2><span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-red-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" /> Live</span></div>{liveEvents.length ? <div className="space-y-2">{liveEvents.map((event) => <a key={event.id} href={`/tournaments/${event.slug}`} className="flex items-start justify-between gap-2 rounded-lg border border-slate-800 bg-[#080d1a] p-3"><span><span className="block text-xs font-bold text-white">{event.name}</span><span className="mt-1 block text-[10px] text-slate-500">{event.gameName} · {event.region}</span></span><ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" /></a>)}</div> : <p className="text-xs leading-5 text-slate-500">No event is marked live in the current verified records.</p>}</section><section className="rounded-2xl border border-slate-800 bg-[#0a1020]/95 p-4 lg:col-span-2"><div className="flex items-start gap-3"><ListFilter className="mt-0.5 h-4 w-4 text-amber-300" /><div><h2 className="font-gaming text-sm font-bold text-white">Source-first updates</h2><p className="mt-1 text-xs leading-5 text-slate-500">Every card links to its publisher, organizer or tournament record. Missing scores stay marked as pending.</p></div></div></section></aside>;
}

function TournamentSidebar({ events }: { events: TournamentEvent[] }) {
  const upcoming = events.filter((event) => event.status === 'upcoming').slice(0, 5);
  const completed = events.filter((event) => event.status === 'completed').slice(0, 5);
  return <aside className="grid gap-4 lg:grid-cols-2"><section className="rounded-2xl border border-slate-800 bg-[#0a1020]/95 p-4"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="font-gaming text-sm font-bold text-white">Upcoming tournaments</h2><CalendarDays className="h-4 w-4 text-amber-300" /></div><div className="space-y-2">{upcoming.map((event) => <a key={event.id} href={`/tournaments/${event.slug}`} className="block rounded-lg border border-slate-800 bg-[#080d1a] p-3"><p className="text-xs font-bold text-white">{event.name}</p><p className="mt-1 text-[10px] text-slate-500">{event.dateLabel} · {event.region}</p></a>)}</div></section><section className="rounded-2xl border border-slate-800 bg-[#0a1020]/95 p-4"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="font-gaming text-sm font-bold text-white">Completed events</h2><BarChart3 className="h-4 w-4 text-cyan-300" /></div><div className="space-y-2">{completed.map((event) => <a key={event.id} href={`/tournaments/${event.slug}`} className="block rounded-lg border border-slate-800 bg-[#080d1a] p-3"><p className="text-xs font-bold text-white">{event.name}</p><p className="mt-1 text-[10px] text-slate-500">{event.dateLabel} · Results record</p></a>)}</div></section><section className="rounded-2xl border border-slate-800 bg-[#0a1020]/95 p-4 lg:col-span-2"><div className="flex items-start gap-3"><Video className="mt-0.5 h-4 w-4 text-red-300" /><div><h2 className="font-gaming text-sm font-bold text-white">Watch verified broadcasts</h2><p className="mt-1 text-xs leading-5 text-slate-500">Tournament pages show an official YouTube video whenever a verified event video is available.</p></div></div></section></aside>;
}

function BroadcastSection({ event }: { event: TournamentEvent }) {
  const streams = getOfficialBroadcastStreams(event);
  const eventChannel = event.broadcastChannel || event.streams?.[0];
  const officialChannel = streams.find((stream) => stream.url !== eventChannel?.url);
  const videoEmbedUrl = getYouTubeEmbedUrl(event.videoUrl);
  const hasBroadcast = Boolean(eventChannel || streams.length || event.broadcastTalents?.length || videoEmbedUrl);
  const availabilityLabel = videoEmbedUrl ? 'Verified event video' : event.videos?.length ? 'Official event VODs available' : eventChannel ? 'Event broadcaster linked' : streams.length ? 'Official channel available' : 'Awaiting verified link';
  return (
    <section className="rounded-2xl border border-red-400/25 bg-red-500/[0.03] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-red-300">Broadcast</p>
          <h2 className="mt-1 font-semibold text-white">Official streams and video</h2>
        </div>
        <span className={`rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-wide ${hasBroadcast ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-300' : 'border-amber-400/25 bg-amber-500/10 text-amber-300'}`}>
          {availabilityLabel}
        </span>
      </div>
      {videoEmbedUrl && (
        <>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-black">
            <iframe className="aspect-video w-full" src={videoEmbedUrl} title={event.videoTitle || `${event.name} official YouTube video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
          {event.videoTitle && <p className="mt-2 text-xs font-semibold text-slate-300">{event.videoTitle}</p>}
        </>
      )}
      {!videoEmbedUrl && !event.videos?.length && (
        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-500/5 p-4">
          <p className="text-xs font-bold text-amber-200">No verified event-specific video is embedded on this page.</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">Use the event-specific YouTube search below or the tournament broadcaster’s channel to find its stream or archived VOD. The page does not guess a video URL.</p>
        </div>
      )}
      <a href={getTournamentVideoSearchUrl(event)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100 transition hover:border-red-300 hover:bg-red-500/20" aria-label={`Find ${event.name} videos on YouTube`}>
        <Video className="h-4 w-4" /> Find {event.name} videos on YouTube <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {eventChannel && (
          <a href={eventChannel.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-red-400/20 bg-[#080d1a] p-4 transition hover:border-red-400/50">
            <div className="flex items-start justify-between gap-3">
              <span><span className="block text-[10px] font-black uppercase tracking-wide text-red-300">{streams.some((stream) => stream.url === eventChannel.url) ? 'Tournament broadcaster · official channel' : 'Tournament broadcaster'}</span><span className="mt-1 block font-bold text-white group-hover:text-red-200">{eventChannel.name}</span></span>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-red-300" />
            </div>
            {eventChannel.language && <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-300">{eventChannel.language} broadcast</p>}
            {eventChannel.note && <p className="mt-2 text-xs leading-5 text-slate-500">{eventChannel.note}</p>}
          </a>
        )}
        {officialChannel && (
          <a href={officialChannel.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-slate-800 bg-[#080d1a] p-4 transition hover:border-red-400/40">
            <div className="flex items-start justify-between gap-3">
              <span><span className="block text-[10px] font-black uppercase tracking-wide text-slate-400">Official game / organizer channel</span><span className="mt-1 block font-bold text-white group-hover:text-red-200">{officialChannel.name}</span></span>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-red-300" />
            </div>
            {officialChannel.language && <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-300">{officialChannel.language} channel</p>}
            {officialChannel.note && <p className="mt-2 text-xs leading-5 text-slate-500">{officialChannel.note}</p>}
          </a>
        )}
      </div>
      {event.videos?.length ? <div className="mt-4"><p className="mb-2 text-[10px] font-black uppercase tracking-wide text-red-300">More official event VODs</p><div className="grid gap-2 sm:grid-cols-2">{event.videos.map((video) => <a key={video.url} href={video.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-[#080d1a] p-3 transition hover:border-red-400/40"><span><span className="block text-xs font-bold text-white">{video.name}</span>{video.language && <span className="mt-1 block text-[10px] uppercase text-slate-500">{video.language} · official replay</span>}{video.note && <span className="mt-1 block text-[11px] leading-5 text-slate-500">{video.note}</span>}</span><ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-red-300" /></a>)}</div></div> : null}
      {!eventChannel && !officialChannel && <p className="mt-2 text-sm leading-6 text-slate-400">No tournament broadcaster YouTube channel has been verified yet. The organiser source remains the authoritative update.</p>}
      {event.broadcastTalents?.length ? <p className="mt-4 text-xs leading-5 text-slate-500"><span className="font-bold text-slate-300">Broadcast talents:</span> {event.broadcastTalents.join(' · ')}</p> : null}
    </section>
  );
}

function getTournamentFaqItems(event: TournamentEvent) {
  const stream = event.broadcastChannel || event.streams?.[0];
  const completedMatches = event.matches?.filter((match) => match.status === 'completed' && match.result).length || 0;
  const scoredResults = event.results?.length || event.standings?.length || completedMatches;
  const scoreAnswer = scoredResults
    ? `${scoredResults} published result/score entries are shown in this event record. Open the linked organizer or results source for the full bracket.`
    : event.status === 'upcoming'
      ? `No matches have been recorded yet. The official event source is ${event.sourceName}.`
      : `A verified score table is not included in this event record yet. Check ${event.sourceName} for the latest bracket or final standings.`;
  return [
    { question: `What is ${event.name}?`, answer: `${event.name} is a ${event.gameName} competition organized by ${event.organizer}. ${event.format || event.summary}` },
    { question: `When does ${event.name} take place?`, answer: `${event.dateLabel}. Current event status: ${STATUS_LABELS[event.status]}.` },
    { question: `Where is ${event.name} held?`, answer: `${event.location} (${event.region}).` },
    { question: `Which teams or players are participating?`, answer: event.participants?.length
      ? `${event.participants.length} named participants are listed${event.teams ? ` from a published field of ${event.teams} teams` : ''}: ${event.participants.join(', ')}.`
      : event.participantsNote || `The named field is not included in this record. ${event.participantsSourceName ? `See ${event.participantsSourceName}.` : `Check ${event.sourceName} for confirmed entrants.`}` },
    { question: `What is the format and prize pool?`, answer: `${event.format || 'A detailed match format is not included in this event record.'}${event.prizePool ? ` Published prize pool: ${event.prizePool}.` : ' A prize pool is not included in this event record.'}` },
    { question: `Where can I watch ${event.name} and check scores?`, answer: `${stream ? `The event broadcaster is ${stream.name}${stream.language ? ` (${stream.language})` : ''}.` : 'A tournament-specific broadcaster has not been verified in this event record.'} ${event.videoTitle ? `Featured video: ${event.videoTitle}.` : 'No event-specific video is embedded yet.'} ${scoreAnswer}` },
  ];
}

function ArticleView({ article, event }: { article?: TournamentNews; event?: TournamentEvent }) {
  if (!article && !event) return <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-sm text-red-200">This tournament update is not available. Return to the esports hub for the latest updates.</div>;
  const title = article?.title || event?.name || 'Tournament update';
  const sourceUrl = article?.sourceUrl || event?.sourceUrl;
  const sourceName = article?.sourceName || event?.sourceName;
  const gameId = article?.gameId || event?.gameId || '';
  const relatedUpdates = event ? TOURNAMENT_NEWS.filter((item) => item.eventId === event.id && item.sourceVerified).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)) : [];
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 shadow-2xl shadow-black/30">
      <div className="bg-radial-hero px-6 py-9 sm:px-10 sm:py-12"><div className="flex flex-wrap items-center gap-2"><StatusBadge status={article?.status || event?.status || 'upcoming'} /><span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300">{article?.gameName || event?.gameName}</span></div><h1 className="mt-5 max-w-4xl font-gaming text-2xl font-black leading-tight text-white sm:text-4xl">{title}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{article?.excerpt || event?.summary}</p><p className="mt-3 text-xs font-semibold text-slate-500">{article ? 'Report updated' : 'Event record reviewed'} {formatDate(article?.updatedAt || event?.updatedAt)}</p></div>
      <div className="space-y-7 px-6 py-8 sm:px-10 sm:py-10">
        {event && <BroadcastSection event={event} />}
        {event && <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="font-semibold text-white">Tournament overview</h2><span className="text-xs text-slate-500">Record reviewed {formatDate(event.updatedAt)}</span></div><dl className="grid gap-4 text-sm text-slate-300 sm:grid-cols-2"><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Event dates</dt><dd className="mt-1">{event.dateLabel}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Organizer</dt><dd className="mt-1">{event.organizer}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Region</dt><dd className="mt-1">{event.region}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Venue / location</dt><dd className="mt-1">{event.location}</dd></div><div className="sm:col-span-2"><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Competition format</dt><dd className="mt-1">{event.format || 'Not specified by the linked source.'}</dd></div>{event.prizePool && <div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Prize pool</dt><dd className="mt-1">{event.prizePool}</dd></div>}{event.teams && <div><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Published field size</dt><dd className="mt-1">{event.teams} teams</dd></div>}</dl></section>}
        {event?.results?.length ? <section className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.03] p-5"><div className="mb-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">Tournament results</p><h2 className="mt-1 font-semibold text-white">Final placements and awards</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[520px] border-collapse text-left text-sm"><thead><tr><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Place</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Team / player</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Result</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Award</th></tr></thead><tbody>{event.results.map((result) => <tr key={`${result.placement}-${result.participant}`}><td className="border-b border-slate-800/80 px-3 py-3 font-black text-amber-300">{result.placement}</td><td className="border-b border-slate-800/80 px-3 py-3 font-semibold text-white">{result.participant}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{result.result || '—'}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{result.award || '—'}</td></tr>)}</tbody></table></div><a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white">Open event source <ExternalLink className="h-3 w-3" /></a></section> : null}
        {event && !event.results?.length && <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-2"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">Tournament results</p><h2 className="mt-1 font-semibold text-white">Final placements and awards</h2></div><p className="text-sm leading-6 text-slate-400">{event.status === 'completed' ? 'A verified final placement table has not been added to this record. The event is marked completed, but no winner or score is guessed.' : 'Final placements are pending until the event concludes and an official result is published.'}</p><a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white">Check {event.sourceName} <ExternalLink className="h-3 w-3" /></a></section>}
        {event?.prizeDistribution?.length ? <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-3"><h2 className="font-semibold text-white">Prize distribution</h2><p className="mt-1 text-xs leading-5 text-slate-400">Player prize money and club rewards are shown separately, as published by the organizer.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[460px] border-collapse text-left text-sm"><thead><tr><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Placement</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Player prize</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Club reward</th></tr></thead><tbody>{event.prizeDistribution.map((row) => <tr key={row.placement}><td className="border-b border-slate-800/80 px-3 py-3 text-slate-200">{row.placement}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{row.playerPrize}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{row.clubReward}</td></tr>)}</tbody></table></div></section> : null}
        {event && <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-semibold text-white">{event.participantsLabel || 'Teams and participants'}</h2>{event.teams && <p className="mt-1 text-xs text-slate-400">Published field size: {event.teams} teams</p>}</div>{event.participantsSourceUrl && <a href={event.participantsSourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white">Roster source{event.participantsSourceName ? ` · ${event.participantsSourceName}` : ''}<ExternalLink className="h-3 w-3" /></a>}</div>{event.participants?.length ? <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{event.participants.map((participant) => <li key={participant} className="rounded-lg border border-slate-800 bg-[#080d1a] px-3 py-2 text-xs font-semibold text-slate-200">{participant}</li>)}</ul> : <p className="mt-3 text-sm leading-6 text-slate-400">{event.participantsNote || 'Named entrants are not verified in this page yet. Open the official event source for the latest roster, bracket or regional standings.'}</p>}{event.participantsNote && event.participants?.length > 0 && <p className="mt-3 text-xs leading-5 text-slate-500">{event.participantsNote}</p>}</section>}
        {event?.standings?.length ? <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-3 flex flex-wrap items-end justify-between gap-2"><div><p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">Standings</p><h2 className="mt-1 font-semibold text-white">Teams, scores and qualification</h2></div><span className="text-xs text-slate-500">Latest published table · {formatDate(event.standingsUpdatedAt || event.updatedAt)}</span></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><thead><tr><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">#</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Team</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Match W–L</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Game W–L</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Diff</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Points</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Path</th></tr></thead><tbody>{event.standings.map((standing) => <tr key={standing.team}><td className="border-b border-slate-800/80 px-3 py-3 font-black text-amber-300">{standing.rank}</td><td className="border-b border-slate-800/80 px-3 py-3 font-semibold text-white">{standing.team}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{standing.matchRecord}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{standing.gameRecord}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{standing.gameDiff}</td><td className="border-b border-slate-800/80 px-3 py-3 font-bold text-emerald-300">{standing.points}</td><td className="border-b border-slate-800/80 px-3 py-3 text-xs text-slate-400">{standing.qualification || '—'}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs leading-5 text-slate-500">This is the dated standings snapshot shown above, not the completed regular-season table. Check the linked source for any newer match-day update.</p>{event.standingsSourceUrl && <a className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white" href={event.standingsSourceUrl} target="_blank" rel="noreferrer">Standings source{event.standingsSourceName ? ` · ${event.standingsSourceName}` : ''}<ExternalLink className="h-3 w-3" /></a>}</section> : null}
        {event?.statistics?.length ? <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-300">Tournament statistics</p><h2 className="mt-1 font-semibold text-white">Published event data</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{event.statistics.map((stat) => <article key={stat.label} className="rounded-xl border border-slate-800 bg-[#080d1a] p-4"><p className="text-xs font-semibold text-slate-400">{stat.label}</p><p className="mt-2 text-xl font-black text-white">{stat.value}</p>{stat.note && <p className="mt-2 text-xs leading-5 text-slate-500">{stat.note}</p>}</article>)}</div></section> : null}
        {event && <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-300">Audience and match analytics</p><h2 className="mt-1 font-semibold text-white">Published tournament statistics</h2></div>{event.statistics?.length ? <p className="text-sm leading-6 text-slate-400">The event-specific data shown above is limited to the metrics named in its source. Peak viewers, average viewers, airtime, hours watched, and platform breakdown appear only when a source publishes attributable figures.</p> : <p className="text-sm leading-6 text-slate-400">Peak viewers, average viewers, airtime, hours watched, and platform breakdown have not been added to this event record. We do not estimate these figures; use the organizer and broadcast sources linked on this page for confirmed metrics.</p>}</section>}
        {event?.stages?.length ? <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">Event structure</p><h2 className="mt-1 font-semibold text-white">Stages and qualification path</h2></div><div className="grid gap-3 md:grid-cols-2">{event.stages.map((stage) => <article key={stage.name} className="rounded-xl border border-slate-800 bg-[#080d1a] p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-white">{stage.name}</h3>{stage.status && <span className="text-right text-[10px] font-bold uppercase tracking-wide text-amber-300">{stage.status}</span>}</div>{stage.dates && <p className="mt-2 text-xs font-semibold text-cyan-200">{stage.dates}</p>}{stage.format && <p className="mt-2 text-sm leading-6 text-slate-300">{stage.format}</p>}{stage.note && <p className="mt-2 text-xs leading-5 text-slate-500">{stage.note}</p>}</article>)}</div></section> : null}
        {event && !event.stages?.length && <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-2"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">Event structure</p><h2 className="mt-1 font-semibold text-white">Stages and qualification path</h2></div><p className="text-sm leading-6 text-slate-400">{event.format || 'The stage-by-stage format has not been added to this event record yet.'} Detailed stage names and advancement rules are not guessed; see the organizer record for the published bracket.</p><a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white">Open {event.sourceName} <ExternalLink className="h-3 w-3" /></a></section>}
        {event?.matches?.length ? <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">Match centre</p><h2 className="mt-1 font-semibold text-white">Schedule and results</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead><tr><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Date / stage</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Match</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Status</th><th className="border-b border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Result</th></tr></thead><tbody>{event.matches.map((match) => <tr key={`${match.date}-${match.left}-${match.right}`}><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300"><span className="block">{match.date}</span><span className="text-xs text-slate-500">{match.stage}</span></td><td className="border-b border-slate-800/80 px-3 py-3 font-semibold text-white">{match.left} <span className="px-1 text-slate-600">vs</span> {match.right}</td><td className="border-b border-slate-800/80 px-3 py-3 text-xs uppercase tracking-wide text-slate-400">{match.status || 'Listed'}</td><td className="border-b border-slate-800/80 px-3 py-3 text-slate-300">{match.result || 'Not published'}{match.sourceUrl && <a className="ml-2 text-xs font-bold text-cyan-300 hover:text-white" href={match.sourceUrl} target="_blank" rel="noreferrer">Source</a>}</td></tr>)}</tbody></table></div>{event.matchesNote && <p className="mt-3 text-xs leading-5 text-slate-500">{event.matchesNote}</p>}{event.matchesSourceUrl && <a className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white" href={event.matchesSourceUrl} target="_blank" rel="noreferrer">Match data source{event.matchesSourceName ? ` · ${event.matchesSourceName}` : ''}<ExternalLink className="h-3 w-3" /></a>}</section> : null}
        {event && !event.matches?.length && <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="mb-2"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">Match centre</p><h2 className="mt-1 font-semibold text-white">Schedule, scores and standings</h2></div><p className="text-sm leading-6 text-slate-400">Match-by-match results are not included in this event record yet. Check the linked source for the current schedule and official scores.</p><a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white">Open {event.sourceName} <ExternalLink className="h-3 w-3" /></a></section>}
        {event && <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50"><div className="border-b border-slate-800 px-5 py-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">Tournament FAQ</p><h2 className="mt-1 font-semibold text-white">Key details about {event.name}</h2></div><div className="grid gap-px bg-slate-800 md:grid-cols-2">{getTournamentFaqItems(event).map((item) => <article key={item.question} className="bg-[#0b1020] p-4 sm:p-5"><h3 className="text-sm font-bold leading-6 text-white">{item.question}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p></article>)}</div></section>}
        {article?.content?.map((paragraph) => <p key={paragraph} className="max-w-3xl text-sm leading-8 text-slate-300">{paragraph}</p>)}
        {event && relatedUpdates.length > 0 && <section><div className="mb-3"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">Verified reporting</p><h2 className="mt-1 text-lg font-bold text-white">Tournament updates</h2><p className="mt-1 text-xs text-slate-400">Event-specific reports are shown here with their source and date.</p></div><div className="grid gap-4">{relatedUpdates.map((update) => <article key={update.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">{update.gameName}</span><time className="text-[10px] text-slate-500" dateTime={update.updatedAt}>Updated {formatDate(update.updatedAt)}</time></div><h3 className="mt-2 text-base font-bold leading-6 text-white">{update.title}</h3><p className="mt-2 text-sm leading-7 text-slate-300">{update.excerpt}</p><div className="mt-3 space-y-2">{update.content.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-slate-400">{paragraph}</p>)}</div><a href={update.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white">Source: {update.sourceName} <ExternalLink className="h-3 w-3" /></a></article>)}</div></section>}
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

  useEffect(() => {
    if (mode !== 'tournaments') return;
    fetch('/api/tournaments').then((response) => response.ok ? response.json() : null).then((payload) => {
      if (Array.isArray(payload?.items)) setEvents(payload.items);
    }).catch(() => undefined);
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

  const latestGameUpdates = useMemo(() => GAME_NEWS_PAGES.filter((page) => {
    if (!POPULAR_GAMES.some((game) => game.id === page.gameId)) return false;
    if (gameId !== 'all' && page.gameId !== gameId) return false;
    if (query && !`${page.heading} ${page.updateHeading} ${page.intro} ${page.update.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())) return false;
    return true;
  }), [gameId, query]);
  const filteredEvents = useMemo(() => filterTournamentEvents({ gameId: gameId === 'all' ? undefined : gameId, status: status === 'all' ? undefined : status, query }).filter((item) => events.some((candidate) => candidate.id === item.id)), [events, gameId, query, status]);
  const verifiedNews = useMemo(() => TOURNAMENT_NEWS.filter((item) => item.sourceVerified).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), []);
  const countryCount = new Set(events.map((event) => event.region).filter(Boolean)).size;
  const liveCount = events.filter((event) => event.status === 'live').length;
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
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"><ContentLanguagePicker />{!isDetail && <PortalStats mode={mode} newsCount={GAME_NEWS_PAGES.length} eventCount={events.length} liveCount={liveCount} countryCount={countryCount} news={verifiedNews} events={events} filteredEvents={filteredEvents} />}
        {!isDetail ? <>
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 px-6 py-9 shadow-2xl shadow-black/30 sm:px-10 sm:py-12"><div className="max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300"><Newspaper className="h-3.5 w-3.5" /> Tradivex esports desk</div><h1 className="font-gaming text-2xl font-black leading-tight text-white sm:text-5xl">{mode === 'news' ? 'Latest game news and updates' : 'Upcoming and completed game tournaments'}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{mode === 'news' ? 'Current updates for the games listed on Tradivex. Each game appears once; open its page for full details and publisher sources.' : 'Filter official tournament information by game, status and region. Dates and results are summaries; the linked organizer remains the source of truth.'}</p></div>{mode === 'tournaments' && <div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><Radio className="h-4 w-4 text-red-300" /><p className="mt-3 text-sm font-bold text-white">Live and upcoming</p><p className="mt-1 text-xs leading-5 text-slate-500">Clear status labels instead of fake live scores.</p></div><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><ShieldCheck className="h-4 w-4 text-emerald-300" /><p className="mt-3 text-sm font-bold text-white">Official source links</p><p className="mt-1 text-xs leading-5 text-slate-500">Every update points to the organizer or publisher.</p></div><div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"><Gamepad2 className="h-4 w-4 text-amber-300" /><p className="mt-3 text-sm font-bold text-white">Connected to names</p><p className="mt-1 text-xs leading-5 text-slate-500">Jump from tournament news to a game name generator.</p></div></div>}</section>
          <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-4 sm:flex-row sm:items-center"><label className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={mode === 'news' ? 'Search games or current updates' : 'Search tournaments, games or teams'} className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400/60" /></label><select value={gameId} onChange={(event) => setGameId(event.target.value)} className="h-11 rounded-xl border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-200 outline-none focus:border-cyan-400/60"><option value="all">All games</option>{availableGames.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>{mode === 'tournaments' && <select value={status} onChange={(event) => setStatus(event.target.value as TournamentStatus | 'all')} className="h-11 rounded-xl border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-200 outline-none focus:border-cyan-400/60"><option value="all">All statuses</option><option value="live">Live / ongoing</option><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select>}</section>
          {mode === 'news' ? <section className="mt-8"><div className="mb-4"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Latest game news</p><h2 className="mt-1 font-gaming text-xl font-black text-white">{latestGameUpdates.length} game update pages</h2></div>{latestGameUpdates.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latestGameUpdates.map((page) => <LatestGameNewsCard key={page.gameId} page={page} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">No current game updates match this search.</div>}</section> : <><section className="mt-8"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Event calendar</p><h2 className="mt-1 font-gaming text-xl font-black text-white">{filteredEvents.length} listed events</h2></div><a href="/esports-news" className="text-xs font-bold text-amber-300 hover:text-white">Read game news →</a></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>{filteredEvents.length === 0 && <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">No updates match these filters yet.</div>}</section>
          <section className="mt-10 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><div><h2 className="font-gaming text-base font-bold text-white">How Tradivex keeps tournament news reliable</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">Updates are built from official organizer or publisher sources. Automated Gemini drafts are designed to summarize supplied source text; they should never invent match results, registration links or prize pools. Always open the official source for the latest change.</p></div></div></section>
          <section className="mt-6 rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">Official source directory</p><h2 className="mt-1 font-gaming text-xl font-black text-white">Follow tournaments by game and platform</h2></div><span className="text-xs text-slate-500">{OFFICIAL_TOURNAMENT_SOURCES.length} official sources · latest checked {formatDate(LATEST_SOURCE_CHECK)}</span></div><p className="mb-4 max-w-4xl text-xs leading-6 text-slate-400">The directory links publisher, league and organizer calendars. Regional leagues have separate dates and qualification paths; platform pages are marked as references. An empty tournament calendar means no dated event has been verified here, not that community competitions do not exist.</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{OFFICIAL_TOURNAMENT_SOURCES.map((source) => <a key={source.gameId} href={source.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-slate-800 bg-slate-950/45 p-4 transition hover:border-amber-400/45 hover:bg-slate-900/60"><div className="flex items-start justify-between gap-3"><span className="text-sm font-bold text-slate-200 group-hover:text-white">{source.gameName}</span><ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-600 group-hover:text-amber-300" /></div><p className="mt-2 text-xs font-semibold text-slate-400">{source.sourceName}</p><p className="mt-1 text-xs leading-5 text-slate-500">{source.note}</p></a>)}</div></section></>}
        </> : <><a href={mode === 'news' ? '/esports-news' : '/tournaments'} className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#080d1a] px-4 py-2.5 text-sm font-bold text-cyan-300 transition hover:border-cyan-400/50 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to {mode === 'news' ? 'all game news' : 'tournament schedule'}</a><ArticleView article={selectedArticle} event={selectedEvent} /></>}
      </main>
      <footer className="border-t border-slate-800 bg-[#04060d] px-4 py-8 text-xs text-slate-400 sm:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 {SITE_DISPLAY_NAME}. Tournament information is independently summarized.</p><div className="flex flex-wrap gap-4"><a href="/" className="hover:text-white">Name Generator</a><a href="/about" className="hover:text-white">About</a><a href="/contact" className="hover:text-white">Contact</a></div></div></footer>
    </div>
  );
}
