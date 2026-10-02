import { POPULAR_GAMES } from './games.js';

export type TournamentStatus = 'upcoming' | 'live' | 'completed' | 'cancelled' | 'draft';

export interface TournamentEvent {
  id: string;
  slug: string;
  gameId: string;
  gameName: string;
  name: string;
  organizer: string;
  startDate?: string;
  endDate?: string;
  dateLabel: string;
  region: string;
  location: string;
  prizePool?: string;
  teams?: number;
  format?: string;
  status: TournamentStatus;
  sourceUrl: string;
  sourceName: string;
  updatedAt: string;
  summary: string;
}

export interface TournamentNews {
  id: string;
  slug: string;
  gameId: string;
  gameName: string;
  title: string;
  excerpt: string;
  content: string[];
  tournamentName: string;
  status: TournamentStatus;
  publishedAt: string;
  updatedAt: string;
  sourceUrl: string;
  sourceName: string;
  sourceVerified: boolean;
  tags: string[];
  eventId?: string;
}

export interface TournamentSource {
  gameId: string;
  gameName: string;
  url: string;
  sourceName: string;
  note: string;
}

export const TOURNAMENT_EVENTS: TournamentEvent[] = [
  {
    id: 'valorant-champions-shanghai-2026',
    slug: 'valorant-champions-shanghai-2026',
    gameId: 'valorant',
    gameName: 'VALORANT',
    name: 'VALORANT Champions Shanghai 2026',
    organizer: 'Riot Games',
    startDate: '2026-09-24',
    endDate: '2026-10-18',
    dateLabel: '24 Sep – 18 Oct 2026',
    region: 'Global',
    location: 'Shanghai, China',
    teams: 16,
    format: 'Groups and playoffs',
    status: 'live',
    sourceUrl: 'https://valorantesports.com/en-US/valorantesports',
    sourceName: 'VALORANT Esports',
    updatedAt: '2026-09-26',
    summary: 'The final global event of the 2026 VCT season brings the best teams from the four international regions together in Shanghai.',
  },
  {
    id: 'league-worlds-2026',
    slug: 'league-worlds-2026',
    gameId: 'league',
    gameName: 'League of Legends',
    name: 'League of Legends Worlds 2026',
    organizer: 'Riot Games',
    startDate: '2026-10-15',
    endDate: '2026-11-14',
    dateLabel: '15 Oct – 14 Nov 2026',
    region: 'Global',
    location: 'International venues',
    format: 'Season finale',
    status: 'upcoming',
    sourceUrl: 'https://lolesports.com/',
    sourceName: 'LoL Esports',
    updatedAt: '2026-09-26',
    summary: 'Worlds is the final international League of Legends competition after the regional splits, First Stand and MSI.',
  },
  {
    id: 'cs2-pgl-singapore-major-2026',
    slug: 'cs2-pgl-singapore-major-2026',
    gameId: 'cs2',
    gameName: 'Counter-Strike 2',
    name: 'PGL Singapore Major 2026',
    organizer: 'PGL',
    startDate: '2026-11-25',
    endDate: '2026-12-13',
    dateLabel: '25 Nov – 13 Dec 2026',
    region: 'Global',
    location: 'Singapore',
    prizePool: '$1,250,000',
    teams: 32,
    format: 'Major tournament',
    status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments/pgl-singapore-major-2026/match',
    sourceName: 'BLAST.tv Counter-Strike',
    updatedAt: '2026-09-26',
    summary: 'The second CS2 Major of 2026 is scheduled to bring 32 teams to Singapore for a global championship event.',
  },
  {
    id: 'rlcs-world-championship-2026',
    slug: 'rlcs-world-championship-2026',
    gameId: 'rocket_league',
    gameName: 'Rocket League',
    name: 'RLCS World Championship 2026',
    organizer: 'Rocket League Esports',
    startDate: '2026-09-15',
    endDate: '2026-09-20',
    dateLabel: '15 – 20 Sep 2026',
    region: 'Global',
    location: 'Fort Worth, Texas',
    prizePool: '$1,200,000',
    teams: 20,
    format: 'World Championship',
    status: 'completed',
    sourceUrl: 'https://www.rocketleague.com/competitive/schedule',
    sourceName: 'Rocket League Official',
    updatedAt: '2026-09-26',
    summary: 'The 2026 RLCS season concluded with the World Championship, featuring 20 teams and multiple competitive modes.',
  },
  {
    id: 'pubg-mobile-pmgo-season-2-qualifiers-2026',
    slug: 'pubg-mobile-pmgo-season-2-qualifiers-2026',
    gameId: 'pubg',
    gameName: 'PUBG Mobile',
    name: '2026 PUBG MOBILE GLOBAL OPEN Season 2 Qualifiers',
    organizer: 'PUBG MOBILE Esports',
    dateLabel: 'Regional qualifier calendar',
    region: 'Global and regional',
    location: 'Online regional qualifiers',
    format: 'In-game and regional qualifiers',
    status: 'upcoming',
    sourceUrl: 'https://esports.pubgmobile.com/static/doc/2026_PMGO_S2_In-game_Qualifiers_Event_List.pdf',
    sourceName: 'PUBG MOBILE Esports',
    updatedAt: '2026-09-26',
    summary: 'The official qualifier list maps participating regions and their in-game or regional qualification events for PMGO Season 2.',
  },
];

export const TOURNAMENT_NEWS: TournamentNews[] = [
  {
    id: 'news-vct-champions-shanghai-2026',
    slug: 'valorant-champions-shanghai-2026',
    gameId: 'valorant',
    gameName: 'VALORANT',
    title: 'VALORANT Champions Shanghai 2026 is now underway',
    excerpt: 'The VCT 2026 season reaches its final global stage as 16 teams compete in Shanghai for the Champions title.',
    content: [
      'VALORANT Champions is the final international event of the 2026 VCT season. The official schedule places the tournament in Shanghai from 24 September through 18 October 2026.',
      'The event follows regional Kickoff, Stage 1, Masters Santiago, Stage 2 and Masters London. Match times, results and broadcast information should be checked on the official VALORANT Esports schedule before sharing an update.',
      'This article is a schedule summary, not a live-score feed. Tradivex GamingNameHub links to the official source so players can verify the latest bracket and match status.',
    ],
    tournamentName: 'VALORANT Champions Shanghai 2026',
    status: 'live',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    sourceUrl: 'https://valorantesports.com/en-US/valorantesports',
    sourceName: 'VALORANT Esports',
    sourceVerified: true,
    tags: ['VCT', 'Champions', 'Shanghai', 'Schedule'],
    eventId: 'valorant-champions-shanghai-2026',
  },
  {
    id: 'news-league-worlds-2026',
    slug: 'league-worlds-2026',
    gameId: 'league',
    gameName: 'League of Legends',
    title: 'League of Legends Worlds 2026: dates and season road map',
    excerpt: 'Worlds 2026 is scheduled for 15 October to 14 November after the regional splits, First Stand and MSI.',
    content: [
      'The official LoL Esports 2026 handbook describes Worlds as the final international event of the season. The published season timeline places it between 15 October and 14 November 2026.',
      'Teams reach Worlds through the regional competition structure that includes Split 1, First Stand, Split 2, MSI and Split 3. Regional qualification details can change, so the official schedule remains the source of truth.',
    ],
    tournamentName: 'League of Legends Worlds 2026',
    status: 'upcoming',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    sourceUrl: 'https://lolesports.com/',
    sourceName: 'LoL Esports',
    sourceVerified: true,
    tags: ['Worlds', 'LoL Esports', 'Schedule'],
    eventId: 'league-worlds-2026',
  },
  {
    id: 'news-cs2-pgl-singapore-major-2026',
    slug: 'cs2-pgl-singapore-major-2026',
    gameId: 'cs2',
    gameName: 'Counter-Strike 2',
    title: 'PGL Singapore Major 2026: 32-team CS2 Major announced',
    excerpt: 'The second CS2 Major of 2026 is scheduled for Singapore from 25 November to 13 December with a $1.25 million prize pool.',
    content: [
      'The official tournament listing identifies PGL Singapore Major 2026 as a 32-team Counter-Strike 2 Major scheduled for 25 November through 13 December 2026 in Singapore.',
      'The listing shows a $1,250,000 prize pool. Match times, qualified teams and bracket details may be updated by the organizer as qualification progresses.',
    ],
    tournamentName: 'PGL Singapore Major 2026',
    status: 'upcoming',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    sourceUrl: 'https://blast.tv/cs/tournaments/pgl-singapore-major-2026/match',
    sourceName: 'BLAST.tv Counter-Strike',
    sourceVerified: true,
    tags: ['CS2', 'Major', 'PGL', 'Singapore'],
    eventId: 'cs2-pgl-singapore-major-2026',
  },
  {
    id: 'news-pubg-mobile-pmgo-season-2-qualifiers-2026',
    slug: 'pubg-mobile-pmgo-season-2-qualifiers-2026',
    gameId: 'pubg',
    gameName: 'PUBG Mobile',
    title: 'PUBG MOBILE PMGO Season 2 qualifier regions published',
    excerpt: 'PUBG MOBILE has published an official region and event list for the 2026 Global Open Season 2 in-game qualifiers.',
    content: [
      'The official PUBG MOBILE qualifier document lists regional in-game and regional events connected with PMGO Season 2. The list includes events across Southeast Asia, South Asia, the Middle East, Europe, Africa and other regions.',
      'The document is a qualifier reference, not a complete live-match schedule. Players should use the linked official source for registration windows and regional updates.',
    ],
    tournamentName: '2026 PUBG MOBILE GLOBAL OPEN Season 2 Qualifiers',
    status: 'upcoming',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    sourceUrl: 'https://esports.pubgmobile.com/static/doc/2026_PMGO_S2_In-game_Qualifiers_Event_List.pdf',
    sourceName: 'PUBG MOBILE Esports',
    sourceVerified: true,
    tags: ['PUBG Mobile', 'PMGO', 'Qualifiers', 'Mobile Esports'],
    eventId: 'pubg-mobile-pmgo-season-2-qualifiers-2026',
  },
];

export const OFFICIAL_TOURNAMENT_SOURCES: TournamentSource[] = [
  { gameId: 'bgmi', gameName: 'BGMI', url: 'https://esports.battlegroundsmobileindia.com/', sourceName: 'BGMI Esports', note: 'Official regional esports source; event availability can vary by season.' },
  { gameId: 'pubg', gameName: 'PUBG Mobile', url: 'https://esports.pubgmobile.com/', sourceName: 'PUBG MOBILE Esports', note: 'Official global esports source and qualifier documents.' },
  { gameId: 'freefire', gameName: 'Free Fire', url: 'https://esports.freefire.com/', sourceName: 'Free Fire Esports', note: 'Official Free Fire esports source where regional events are published.' },
  { gameId: 'valorant', gameName: 'VALORANT', url: 'https://valorantesports.com/en-US/valorantesports', sourceName: 'VALORANT Esports', note: 'Official VCT schedule, leagues, standings and news.' },
  { gameId: 'cod', gameName: 'Call of Duty', url: 'https://esportsworldcup.com/en/competitions/cod-warzone', sourceName: 'Esports World Cup', note: 'Official event source for major Call of Duty: Warzone competition.' },
  { gameId: 'cs2', gameName: 'Counter-Strike 2', url: 'https://blast.tv/cs/tournaments', sourceName: 'BLAST.tv Counter-Strike', note: 'Tournament calendar covering Majors, BLAST, ESL, PGL and other events.' },
  { gameId: 'fortnite', gameName: 'Fortnite', url: 'https://www.fortnite.com/competitive/schedule?lang=en-US&region=NA', sourceName: 'Fortnite Competitive', note: 'Official region-specific competitive schedule.' },
  { gameId: 'apex', gameName: 'Apex Legends', url: 'https://algs.ea.com/', sourceName: 'Apex Legends Global Series', note: 'Official ALGS rules and competitive information.' },
  { gameId: 'league', gameName: 'League of Legends', url: 'https://lolesports.com/', sourceName: 'LoL Esports', note: 'Official regional and international League of Legends schedule.' },
  { gameId: 'rocket_league', gameName: 'Rocket League', url: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League Esports', note: 'Official RLCS schedule, events, results and qualification information.' },
  { gameId: 'mobile_legends', gameName: 'Mobile Legends', url: 'https://esportsworldcup.com/en/news/ewc-guide', sourceName: 'Esports World Cup', note: 'Official major-event source; regional MLBB circuits should be verified separately.' },
  { gameId: 'ea_fc', gameName: 'EA Sports FC', url: 'https://resources.esportsworldcup.com/en/competitive-ops/rulebooks/ea-sports-fc', sourceName: 'EWC Resource Center', note: 'Official competitive rulebook and event resource.' },
];

export function getTournamentGameName(gameId: string): string {
  return POPULAR_GAMES.find((game) => game.id === gameId)?.shortName || gameId;
}

export function statusForEvent(event: Pick<TournamentEvent, 'startDate' | 'endDate' | 'status'>, now = new Date()): TournamentStatus {
  if (event.status === 'cancelled' || event.status === 'draft') return event.status;
  if (!event.startDate) return event.status;
  const start = new Date(`${event.startDate}T00:00:00Z`).getTime();
  const end = new Date(`${event.endDate || event.startDate}T23:59:59Z`).getTime();
  const timestamp = now.getTime();
  if (timestamp < start) return 'upcoming';
  if (timestamp <= end) return 'live';
  return 'completed';
}
