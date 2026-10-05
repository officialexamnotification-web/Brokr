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
  checkedAt?: string;
}

export const TOURNAMENT_EVENTS: TournamentEvent[] = [
  {
    id: 'bgmi-bmsd-2026', slug: 'bgmi-bmsd-2026', gameId: 'bgmi', gameName: 'BGMI',
    name: 'Battlegrounds Mobile India Showdown 2026 (BMSD)', organizer: 'KRAFTON India',
    startDate: '2026-09-22', endDate: '2026-10-18', dateLabel: '22 Sep – 18 Oct 2026',
    region: 'India', location: 'India; LAN Grand Finals in Hyderabad', prizePool: '₹1 crore', teams: 48,
    format: 'Invite-only multi-stage tournament; 16 teams reach the LAN Grand Finals', status: 'live',
    sourceUrl: 'https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg',
    sourceName: 'KRAFTON India', updatedAt: '2026-10-02',
    summary: 'KRAFTON India says 48 top-performing teams qualified through the KIE leaderboard, BGIS and BMPS. The LAN finals are scheduled for 16–18 October in Hyderabad.',
  },
  {
    id: 'bgmi-bmic-2026', slug: 'bgmi-bmic-2026', gameId: 'bgmi', gameName: 'BGMI',
    name: 'BGMI International Cup 2026 (BMIC)', organizer: 'KRAFTON India',
    startDate: '2026-10-30', endDate: '2026-11-01', dateLabel: '30 Oct – 1 Nov 2026',
    region: 'India, South Korea and Japan', location: 'Mumbai, India', teams: 16,
    format: 'International team tournament', status: 'upcoming',
    sourceUrl: 'https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg',
    sourceName: 'KRAFTON India', updatedAt: '2026-10-02',
    summary: 'KRAFTON India has announced a 16-team international BGMI event in Mumbai, featuring teams from India, Korea and Japan. Detailed match format and prize breakdown were not included in the announcement.',
  },
  {
    id: 'pubgm-pmps-korea-s2-2026', slug: 'pubgm-pmps-korea-s2-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    name: 'PUBG MOBILE Pro Series Korea 2026 Season 2', organizer: 'PUBG MOBILE Esports Korea',
    startDate: '2026-10-03', endDate: '2026-10-18', dateLabel: '3–18 Oct 2026', region: 'South Korea', location: 'Daejeon Dream Arena',
    prizePool: '₩40,000,000', teams: 16, format: 'Five circuit days followed by two Finals days; six matches per day', status: 'upcoming',
    sourceUrl: 'https://esports.pubgmobile.kr/en/news/208', sourceName: 'PUBG MOBILE Esports Korea', updatedAt: '2026-10-02',
    summary: 'The Korean regional PMPS season opens on 3 October. Its winner earns a place at PMGC 2026, while the top three qualify for BMIC 2026, subject to the organizer’s duplicate-slot rule.',
  },
  {
    id: 'free-fire-ffws-global-finals-2026', slug: 'free-fire-ffws-global-finals-2026', gameId: 'freefire', gameName: 'Free Fire',
    name: 'Free Fire World Series Global Finals 2026', organizer: 'Garena',
    dateLabel: 'Begins 6 Nov 2026; four weekends in November', region: 'Global', location: 'Bangkok, Thailand', teams: 24,
    format: 'Global finals across four November weekends; exact daily schedule not yet published', status: 'upcoming',
    sourceUrl: 'https://ff.garena.com/en/article/1605/', sourceName: 'Garena Free Fire', updatedAt: '2026-10-02',
    summary: 'Garena’s 2026 roadmap confirms a 24-team Global Finals in Bangkok beginning 6 November. The roadmap says the event spans four weekends but does not yet provide the complete match schedule.',
  },
  {
    id: 'valorant-champions-shanghai-2026', slug: 'valorant-champions-shanghai-2026', gameId: 'valorant', gameName: 'VALORANT',
    name: 'VALORANT Champions Shanghai 2026', organizer: 'Riot Games',
    startDate: '2026-09-24', endDate: '2026-10-18', dateLabel: '24 Sep – 18 Oct 2026', region: 'Global', location: 'Shanghai, China', teams: 16,
    format: 'Four-group stage followed by double-elimination playoffs; best-of-three except best-of-five finals', status: 'live',
    sourceUrl: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know', sourceName: 'VALORANT Esports', updatedAt: '2026-10-02',
    summary: 'Sixteen teams from Americas, China, EMEA and Pacific are competing. Groups run through 4 October; playoffs run 7–18 October, with the Grand Final scheduled for 18 October.',
  },
  {
    id: 'cs2-esl-pro-league-s24-2026', slug: 'cs2-esl-pro-league-s24-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'ESL Pro League Season 24', organizer: 'ESL', startDate: '2026-10-03', endDate: '2026-10-11', dateLabel: '3–11 Oct 2026',
    region: 'Global', location: 'Katowice, Poland', format: 'Official tournament listing; match format and lineup on event page', status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments', sourceName: 'BLAST.tv Counter-Strike calendar', updatedAt: '2026-10-02',
    summary: 'The official BLAST.tv calendar lists ESL Pro League Season 24 in Katowice during 3–11 October. Team count and detailed format were not present in the calendar listing checked.',
  },
  {
    id: 'cs2-pgl-masters-bucharest-2026', slug: 'cs2-pgl-masters-bucharest-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'PGL Masters Bucharest 2026', organizer: 'PGL', startDate: '2026-10-24', endDate: '2026-10-31', dateLabel: '24–31 Oct 2026',
    region: 'Global', location: 'Bucharest, Romania', prizePool: '$1,250,000', teams: 16,
    format: 'Group stage, playoffs and third-place match; 16 teams', status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments/pgl-belgrade-2026', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-10-02',
    summary: 'The event page lists 16 teams and a $1.25 million total prize pool. PGL’s event is scheduled at its Bucharest studio from 24 to 31 October.',
  },
  {
    id: 'cs2-pgl-singapore-major-2026', slug: 'cs2-pgl-singapore-major-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'PGL Singapore Major 2026', organizer: 'PGL', startDate: '2026-11-25', endDate: '2026-12-13', dateLabel: '25 Nov – 13 Dec 2026',
    region: 'Global', location: 'Singapore', prizePool: '$1,250,000', teams: 32, format: 'Counter-Strike Major', status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments/pgl-singapore-major-2026/match', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-10-02',
    summary: 'PGL’s official event listing confirms a 32-team Major in Singapore from 25 November to 13 December, with a $1.25 million prize pool.',
  },
  {
    id: 'fortnite-fncs-solo-october-2026', slug: 'fortnite-fncs-solo-october-2026', gameId: 'fortnite', gameName: 'Fortnite',
    name: 'FNCS Solo Tournament (October 2026)', organizer: 'Epic Games', dateLabel: 'October 2026; exact dates and format pending',
    region: 'Regional online competition', location: 'Online; regions and schedule to be announced', format: 'Standalone FNCS solos tournament; Epic has not yet published the schedule or format', status: 'upcoming',
    sourceUrl: 'https://www.fortnite.com/news/fncs-schedule-and-competitive-updates', sourceName: 'Fortnite Competitive', updatedAt: '2026-10-02',
    summary: 'Epic confirmed a standalone FNCS solos event for October after the Global Championship, while saying schedule and format details would follow. No exact match dates or prize details were included in the announcement.',
  },
  {
    id: 'apex-algs-y6-split-2-playoffs', slug: 'apex-algs-y6-split-2-playoffs', gameId: 'apex', gameName: 'Apex Legends',
    name: 'ALGS Year 6 Split 2 Playoffs', organizer: 'Electronic Arts', startDate: '2026-10-29', endDate: '2026-11-01', dateLabel: '29 Oct – 1 Nov 2026',
    region: 'Global', location: 'Orleans Arena, Las Vegas, United States', prizePool: '$2,000,000', teams: 40,
    format: 'Round-robin group stage, double-elimination bracket, Match Point Finals', status: 'upcoming',
    sourceUrl: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview', sourceName: 'Apex Legends Global Series', updatedAt: '2026-10-02',
    summary: 'Forty teams from Americas, EMEA, APAC North and APAC South qualify through Split 2 Pro League. The four-day LAN awards a $2 million prize pool and Championship Points.',
  },
  {
    id: 'league-worlds-2026', slug: 'league-worlds-2026', gameId: 'league', gameName: 'League of Legends',
    name: 'League of Legends World Championship 2026', organizer: 'Riot Games', startDate: '2026-10-15', endDate: '2026-11-14', dateLabel: '15 Oct – 14 Nov 2026',
    region: 'Global', location: 'Play-Ins: Los Angeles; Swiss, Quarterfinals and Semifinals: Allen, Texas; Final: Brooklyn, New York',
    format: 'International season finale; updated venue and start-time information is on the official event page', status: 'upcoming',
    sourceUrl: 'https://lolesports.com/en-US/lolesports/news/worlds-2026-venue-event-policies', sourceName: 'LoL Esports', updatedAt: '2026-10-02',
    summary: 'Worlds begins 15 October and concludes with the Final at Barclays Center on 14 November. Riot’s venue notice gives stage locations and updated broadcast start times; qualified teams and matchups are tracked on the live schedule.',
  },
  {
    id: 'rlcs-world-championship-2026', slug: 'rlcs-world-championship-2026', gameId: 'rocket_league', gameName: 'Rocket League',
    name: 'RLCS World Championship 2026', organizer: 'Rocket League Esports', startDate: '2026-09-15', endDate: '2026-09-20', dateLabel: '15–20 Sep 2026',
    region: 'Global', location: 'Dickies Arena, Fort Worth, Texas', prizePool: '$1,200,000', teams: 20, format: '2026 Rocket League World Championship', status: 'completed',
    sourceUrl: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League official schedule', updatedAt: '2026-10-02',
    summary: 'The official schedule marks the 20-team, $1.2 million World Championship complete. Rocket League’s September 9 event primer confirms Fort Worth and the 15–20 September dates.',
  },
  {
    id: 'owcs-stage-3-2026', slug: 'owcs-stage-3-2026', gameId: 'overwatch', gameName: 'Overwatch 2',
    name: 'Overwatch Champions Series 2026 Stage 3', organizer: 'Overwatch Esports', startDate: '2026-10-10', endDate: '2026-11-01', dateLabel: '10 Oct – 1 Nov 2026',
    region: 'Regional leagues', location: 'Online regional competition', format: 'Three regular-season weekends followed by playoffs', status: 'upcoming',
    sourceUrl: 'https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/', sourceName: 'Overwatch Esports', updatedAt: '2026-10-02',
    summary: 'Blizzard’s 2026 season notice schedules Stage 3 regular-season weekends for 10–11, 17–18 and 24–25 October, with playoffs on 30 October–1 November. The 2026 World Finals are set for 2–6 December.',
  },
  {
    id: 'r6-osaka-major-2026', slug: 'r6-osaka-major-2026', gameId: 'rainbow_six', gameName: 'Rainbow Six Siege',
    name: 'BLAST R6 Major Osaka 2026', organizer: 'Ubisoft and BLAST', startDate: '2026-11-07', endDate: '2026-11-15', dateLabel: '7–15 Nov 2026',
    region: 'Global', location: 'ATC Hall, Osaka, Japan', prizePool: '$600,000', format: 'Global Major; winner earns a place at Six Invitational 2027', status: 'upcoming',
    sourceUrl: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege/presales/osaka', sourceName: 'Ubisoft R6 Esports', updatedAt: '2026-10-02',
    summary: 'Ubisoft confirms nine days of competition in Osaka, a $600,000 prize pool and a Six Invitational 2027 qualification place. Team lineups and match-by-match schedule are not yet listed on the ticket announcement.',
  },
  {
    id: 'ea-fc-pro-27-ladder-2026', slug: 'ea-fc-pro-27-ladder-2026', gameId: 'ea_fc', gameName: 'EA FC',
    name: 'EA SPORTS FC Pro 27 Open Ladder', organizer: 'Electronic Arts', startDate: '2026-09-21', endDate: '2026-10-03', dateLabel: '21 Sep – 3 Oct 2026',
    region: 'Ten online regions', location: 'In-game FC Pro mode', format: 'Open regional ladder; top-ranked competitors advance to Regional Qualifiers', status: 'live',
    sourceUrl: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive', sourceName: 'EA SPORTS FC Pro', updatedAt: '2026-10-02',
    summary: 'EA says the ladder runs in Ultimate Team with no external tournament-site registration. Qualification slots differ by region; Regional Qualifiers are scheduled for 5–7 November.',
  },
  {
    id: 'mlbb-mpl-ph-s18-playoffs-2026', slug: 'mlbb-mpl-ph-s18-playoffs-2026', gameId: 'mobile_legends', gameName: 'MLBB',
    name: 'MPL Philippines Season 18 Playoffs', organizer: 'MOONTON Games and MPL Philippines', startDate: '2026-10-21', endDate: '2026-10-25', dateLabel: '21–25 Oct 2026',
    region: 'Philippines', location: 'PhilSports Arena, Pasig City', format: 'Season 18 playoffs; determines Philippine representatives on the road to M8', status: 'upcoming',
    sourceUrl: 'https://en.moonton.com/news/377.html', sourceName: 'MOONTON Games', updatedAt: '2026-10-02',
    summary: 'MOONTON confirms the venue and dates. The playoffs follow a regular season that runs through 11 October, and determine which Philippine teams represent the country at the M8 World Championship in Istanbul in January 2027.',
  },
  {
    id: 'hok-asian-games-2026', slug: 'hok-asian-games-2026', gameId: 'honor_of_kings', gameName: 'Honor of Kings',
    name: 'Aichi-Nagoya 2026 Asian Games — Honor of Kings', organizer: 'Aichi-Nagoya 2026 Asian Games / OCA', startDate: '2026-09-23', endDate: '2026-10-02', dateLabel: '23 Sep – 2 Oct 2026',
    region: 'National teams', location: 'Aichi Sky Expo, Japan', format: 'Medal event in the Asian Games esports programme', status: 'live',
    sourceUrl: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html', sourceName: 'Olympic Council of Asia', updatedAt: '2026-10-02',
    summary: 'The OCA says the Asian Games esports competition runs 23 September–2 October at Aichi Sky Expo and includes Honor of Kings. The event’s official sport programme does not provide a separate match-by-match schedule in the linked notice.',
  },
  {
    id: 'brawl-stars-world-finals-2026', slug: 'brawl-stars-world-finals-2026', gameId: 'brawl_stars', gameName: 'Brawl Stars',
    name: 'Brawl Stars World Finals 2026', organizer: 'Supercell', startDate: '2026-11-20', endDate: '2026-11-22', dateLabel: '20–22 Nov 2026',
    region: 'Global', location: 'Tokyo Metropolitan Gymnasium, Tokyo, Japan', prizePool: '$1,000,000', teams: 12,
    format: 'Eight-team GSL group stage; eight-team double-elimination playoffs; best-of-seven Grand Final', status: 'upcoming',
    sourceUrl: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/', sourceName: 'Brawl Stars Esports', updatedAt: '2026-10-02',
    summary: 'Supercell confirms the dates, venue, 12-team field and $1 million prize pool. The first day is a GSL group stage; playoffs run over the next two days.',
  },
  {
    id: 'coc-world-championship-2026-lcq', slug: 'coc-world-championship-2026-lcq', gameId: 'clash_of_clans', gameName: 'Clash of Clans',
    name: 'Clash of Clans World Championship 2026 Last Chance Qualifier', organizer: 'Supercell',
    dateLabel: 'October 2026; exact dates not yet published', region: 'Global', location: 'Online / details pending', prizePool: '$1,000,000 season prize pool', teams: 8,
    format: 'Top eight unqualified teams on the leaderboard compete; top three earn World Finals Golden Tickets', status: 'upcoming',
    sourceUrl: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete', sourceName: 'Clash of Clans World Championship Series', updatedAt: '2026-10-02',
    summary: 'Supercell’s competition guide confirms an October Last Chance Qualifier for the eight highest-ranked teams that have not already qualified. The top three earn the final Golden Tickets; exact match dates are not stated in the guide.',
  },
  {
    id: 'clash-royale-league-lcq-2026', slug: 'clash-royale-league-lcq-2026', gameId: 'clash_royale', gameName: 'Clash Royale',
    name: 'Clash Royale League 2026 Last Chance Qualifier', organizer: 'Supercell', startDate: '2026-09-05', endDate: '2026-09-06', dateLabel: '5–6 Sep 2026',
    region: 'Global', location: 'Online broadcast', format: 'Last Chance Qualifier; Woo won the two-day event', status: 'completed',
    sourceUrl: 'https://event.supercell.com/clashroyale/en', sourceName: 'Clash Royale League', updatedAt: '2026-10-02',
    summary: 'Supercell’s CRL event site records the Last Chance Qualifier on 5–6 September and lists Woo as the winner. The event is complete; the site says more events are coming but does not yet date the next one.',
  },
  {
    id: 'roblox-showdown-cup-2026', slug: 'roblox-showdown-cup-2026', gameId: 'roblox', gameName: 'Roblox',
    name: 'Showdown Cup — Roblox Fall Games 2026', organizer: 'Roblox platform experience developer',
    dateLabel: 'September 2026; dates not specified in Roblox’s preview', region: 'In-game', location: 'Roblox Esports Arena experience',
    format: 'In-game tournament inside the featured experience; not a Roblox-wide esports league', status: 'completed',
    sourceUrl: 'https://about.roblox.com/newsroom/2026/09/roblox-fall-games-preview', sourceName: 'Roblox Newsroom', updatedAt: '2026-10-02',
    summary: 'Roblox’s September preview says an India-based studio was launching its first Showdown Cup tournament that month in an in-game esports arena. The preview does not publish exact dates, participants or prize details, so this should not be read as an official platform-wide Roblox championship.',
  },
];

const CURATED_TOURNAMENT_NEWS: TournamentNews[] = [
  {
    id: 'news-bgmi-bmsd-2026', slug: 'news-bgmi-bmsd-2026', gameId: 'bgmi', gameName: 'BGMI',
    title: 'BGMI BMSD 2026: 48 invite-only teams compete through 18 October',
    excerpt: 'KRAFTON India’s domestic Showdown is underway. Its Hyderabad LAN Grand Finals are scheduled for 16–18 October.',
    content: [
      'KRAFTON India announced BMSD 2026 as an invite-only competition for 48 of India’s top-performing BGMI teams. Invitations were earned through the KRAFTON India Esports leaderboard and results in BGIS and BMPS.',
      'The competition runs from 22 September to 18 October. KRAFTON’s announcement places the LAN Grand Finals in Hyderabad on 16–18 October. KRAFTON has not published full stage-by-stage match times in the announcement linked here.',
      'This is a domestic BGMI event and should not be confused with the separate international BMIC, announced for Mumbai from 30 October to 1 November.',
    ],
    tournamentName: 'Battlegrounds Mobile India Showdown 2026', status: 'live', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg',
    sourceName: 'KRAFTON India', sourceVerified: true, tags: ['BGMI', 'BMSD 2026', 'India', 'Hyderabad'], eventId: 'bgmi-bmsd-2026',
  },
  {
    id: 'news-bgmi-bmic-2026', slug: 'news-bgmi-bmic-2026', gameId: 'bgmi', gameName: 'BGMI',
    title: 'BGMI International Cup brings 16 teams to Mumbai on 30 October',
    excerpt: 'KRAFTON India has announced a 16-team international event with teams from India, South Korea and Japan.',
    content: [
      'The BGMI International Cup 2026 (BMIC) is scheduled for 30 October to 1 November in Mumbai. KRAFTON India says 16 elite teams from India, Korea and Japan will take part.',
      'The announcement positions BMIC as an international opportunity for Indian teams. It does not yet publish match times, the tournament format, the participating team list or a prize breakdown; those details should be added only after the organizer posts them.',
    ],
    tournamentName: 'BGMI International Cup 2026', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg',
    sourceName: 'KRAFTON India', sourceVerified: true, tags: ['BGMI', 'BMIC 2026', 'Mumbai', 'International'], eventId: 'bgmi-bmic-2026',
  },
  {
    id: 'news-pubgm-pmps-korea-s2-2026', slug: 'news-pubgm-pmps-korea-s2-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    title: 'PUBG MOBILE Korea PMPS Season 2 starts 3 October in Daejeon',
    excerpt: 'Sixteen teams compete for ₩40 million; the winner earns a PMGC place and the top three can qualify for BMIC.',
    content: [
      'PUBG MOBILE Esports Korea schedules PMPS 2026 Season 2 from 3 to 18 October at Daejeon Dream Arena. The official event page lists 16 teams and a ₩40 million prize pool.',
      'Five circuit-stage days are set for 3, 4, 9, 10 and 11 October. The two-day Finals are scheduled for 17 and 18 October, starting at 3 p.m. Korea Standard Time (KST), with six matches per day.',
      'The organizer says the season winner qualifies for PMGC 2026 and places 1–3 qualify for BMIC 2026, subject to a duplicate-slot rule. This is the Korean regional league; it is not the global PMGO qualifier list.',
    ],
    tournamentName: 'PUBG MOBILE Pro Series Korea 2026 Season 2', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://esports.pubgmobile.kr/en/news/208', sourceName: 'PUBG MOBILE Esports Korea', sourceVerified: true,
    tags: ['PUBG Mobile', 'PMPS', 'South Korea', 'Daejeon'], eventId: 'pubgm-pmps-korea-s2-2026',
  },
  {
    id: 'news-free-fire-ffws-global-finals-2026', slug: 'news-free-fire-ffws-global-finals-2026', gameId: 'freefire', gameName: 'Free Fire',
    title: 'FFWS Global Finals 2026 to bring 24 teams to Bangkok in November',
    excerpt: 'Garena’s roadmap sets the global finals to begin 6 November across four weekends; the full match schedule is still pending.',
    content: [
      'Garena’s 2026 esports roadmap says the Free Fire World Series Global Finals will take place in Bangkok, Thailand, beginning 6 November. The global field expands to 24 teams.',
      'The roadmap describes four high-stakes weekends in November, but does not give an exact closing date, daily match schedule, venue or final team list. Those details are therefore left out until Garena publishes them.',
      'The same roadmap lists the FFWS SEA Fall split as 14 August–20 September and Free Fire at EWC as 15–18 July; both are already complete as of this 2 October update.',
    ],
    tournamentName: 'Free Fire World Series Global Finals 2026', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://ff.garena.com/en/article/1605/', sourceName: 'Garena Free Fire', sourceVerified: true,
    tags: ['Free Fire', 'FFWS', 'Global Finals', 'Bangkok'], eventId: 'free-fire-ffws-global-finals-2026',
  },
  {
    id: 'news-valorant-champions-shanghai-2026', slug: 'news-valorant-champions-shanghai-2026', gameId: 'valorant', gameName: 'VALORANT',
    title: 'VALORANT Champions Shanghai: groups continue through 4 October',
    excerpt: 'Sixteen teams from four international regions are competing; playoffs follow from 7 to 18 October.',
    content: [
      'Riot’s official event guide schedules Champions Shanghai from 24 September to 18 October. Sixteen teams represent Americas, China, EMEA and Pacific.',
      'The group stage runs through 4 October in four groups, with the top eight advancing. All group matches are best-of-three. Playoffs start on 7 October and use a double-elimination bracket; the Grand Final is listed for 18 October.',
      'Riot’s live schedule is the source for match pairings, results, start times and broadcast changes. This article summarizes the published format and calendar, not live scores.',
    ],
    tournamentName: 'VALORANT Champions Shanghai 2026', status: 'live', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know', sourceName: 'VALORANT Esports', sourceVerified: true,
    tags: ['VCT', 'Champions', 'Shanghai', 'Live event'], eventId: 'valorant-champions-shanghai-2026',
  },
  {
    id: 'news-cs2-october-events-2026', slug: 'news-cs2-october-events-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    title: 'CS2 October calendar: ESL Pro League and PGL Masters Bucharest',
    excerpt: 'The official calendar lists ESL Pro League in Katowice on 3–11 October and PGL Masters Bucharest on 24–31 October.',
    content: [
      'BLAST.tv’s Counter-Strike calendar lists two October events: ESL Pro League Season 24 in Katowice, Poland (3–11 October), followed by PGL Masters Bucharest in Romania (24–31 October).',
      'PGL’s event page confirms 16 teams and a $1.25 million total prize pool for Bucharest. The event page also describes a group stage, playoffs and third-place match. The calendar page does not expose ESL Pro League’s full team list or detailed format in the listing.',
      'The next Major is PGL Singapore, scheduled for 25 November–13 December with 32 teams and a $1.25 million prize pool. Check the individual event pages for later bracket and match-time updates.',
    ],
    tournamentName: 'CS2 October 2026 tournament calendar', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://blast.tv/cs/tournaments', sourceName: 'BLAST.tv Counter-Strike', sourceVerified: true,
    tags: ['CS2', 'ESL Pro League', 'PGL', 'October'], eventId: 'cs2-esl-pro-league-s24-2026',
  },
  {
    id: 'news-fortnite-fncs-solos-october-2026', slug: 'news-fortnite-fncs-solos-october-2026', gameId: 'fortnite', gameName: 'Fortnite',
    title: 'Epic confirms a standalone FNCS solos event for October',
    excerpt: 'The event is confirmed, but Epic has not yet published its dates, format or regional schedule.',
    content: [
      'Epic’s FNCS schedule update adds a standalone solos tournament after the 2026 Global Championship, in October. Epic says competitors can play online for regional Battle Royale crowns.',
      'The announcement explicitly says schedule and format details will follow on Fortnite Competitive social channels and in the in-game Compete tab. No exact dates, prize pool, match structure or registration window are provided on the linked page.',
      'Because the detailed calendar is still pending, check the official schedule before planning around a specific tournament day.',
    ],
    tournamentName: 'FNCS Solo Tournament (October 2026)', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://www.fortnite.com/news/fncs-schedule-and-competitive-updates', sourceName: 'Fortnite Competitive', sourceVerified: true,
    tags: ['Fortnite', 'FNCS', 'Solo', 'Schedule pending'], eventId: 'fortnite-fncs-solo-october-2026',
  },
  {
    id: 'news-apex-algs-split-2-playoffs-2026', slug: 'news-apex-algs-split-2-playoffs-2026', gameId: 'apex', gameName: 'Apex Legends',
    title: 'ALGS Split 2 Playoffs: 40 teams head to Las Vegas on 29 October',
    excerpt: 'The four-day Year 6 LAN offers $2 million and Championship Points ahead of the season finale.',
    content: [
      'EA’s ALGS competition overview schedules Year 6 Split 2 Playoffs for 29 October–1 November at Orleans Arena in Las Vegas. Forty teams qualify through Split 2 Pro League across Americas, EMEA, APAC North and APAC South.',
      'The announced prize pool is $2 million. The tournament opens with a round-robin group stage, continues through a double-elimination bracket and ends with Match Point Finals. Split 2 Pro League is scheduled online through 4 October.',
      'The official ALGS event page has the regional team allocation and venue details; qualified rosters and match times can change as the Pro League concludes.',
    ],
    tournamentName: 'ALGS Year 6 Split 2 Playoffs', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview', sourceName: 'Apex Legends Global Series', sourceVerified: true,
    tags: ['Apex Legends', 'ALGS', 'Las Vegas', 'Playoffs'], eventId: 'apex-algs-y6-split-2-playoffs',
  },
  {
    id: 'news-lol-worlds-2026', slug: 'news-lol-worlds-2026', gameId: 'league', gameName: 'League of Legends',
    title: 'Worlds 2026 starts 15 October; the Final is set for Brooklyn',
    excerpt: 'Riot’s updated venue notice places the Final at Barclays Center on 14 November and details stage locations.',
    content: [
      'The official LoL Esports calendar schedules Worlds 2026 from 15 October through 14 November. Riot’s venue policy says the Final will be held at Barclays Center in Brooklyn, New York, on 14 November.',
      'Riot lists Play-Ins in Los Angeles; the Swiss Stage, Quarterfinals and Semifinals at the Credit Union of Texas Event Center in Allen, Texas; and the Final in Brooklyn. The venue notice also updates broadcast start times for selected stages.',
      'Riot has not included a qualified-team list or complete day-by-day match schedule in the venue-policy article. Follow the live LoL Esports schedule for brackets, matchups and broadcast updates.',
    ],
    tournamentName: 'League of Legends World Championship 2026', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://lolesports.com/en-US/lolesports/news/worlds-2026-venue-event-policies', sourceName: 'LoL Esports', sourceVerified: true,
    tags: ['League of Legends', 'Worlds 2026', 'Venues', 'Schedule'], eventId: 'league-worlds-2026',
  },
  {
    id: 'news-rocket-league-worlds-2026', slug: 'news-rocket-league-worlds-2026', gameId: 'rocket_league', gameName: 'Rocket League',
    title: 'RLCS World Championship concludes after six days in Fort Worth',
    excerpt: 'The official schedule marks the 20-team, $1.2 million 2026 World Championship complete on 20 September.',
    content: [
      'Rocket League’s official competitive schedule lists the RLCS World Championship as completed. It ran from 15–20 September at Dickies Arena in Fort Worth, Texas, with 20 teams and a $1.2 million prize pool.',
      'The September 9 official event primer confirms the dates, venue, field size and prize pool. The linked schedule is the current official record for results; this summary does not infer a champion from third-party standings.',
    ],
    tournamentName: 'RLCS World Championship 2026', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League official schedule', sourceVerified: true,
    tags: ['Rocket League', 'RLCS', 'World Championship', 'Completed'], eventId: 'rlcs-world-championship-2026',
  },
  {
    id: 'news-overwatch-owcs-stage-3-2026', slug: 'news-overwatch-owcs-stage-3-2026', gameId: 'overwatch', gameName: 'Overwatch 2',
    title: 'OWCS Stage 3 begins 10 October; playoffs run 30 October–1 November',
    excerpt: 'Blizzard has published three regular-season weekends and the Stage 3 playoff dates.',
    content: [
      'Blizzard’s official 2026 OWCS competitive details schedule Stage 3 regular-season weekends for 10–11, 17–18 and 24–25 October. Playoffs are set for 30 October–1 November.',
      'The same season plan dates the 2026 Champions Clash for 22–24 May, Midseason Championship for 29 July–2 August and World Finals for 2–6 December. Those earlier events are complete as of this update.',
      'The Stage 3 announcement gives dates but says live-event format and seeding can vary by stage. The official Overwatch Esports site remains the source for regional brackets and broadcast updates.',
    ],
    tournamentName: 'Overwatch Champions Series 2026 Stage 3', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/', sourceName: 'Overwatch Esports', sourceVerified: true,
    tags: ['Overwatch 2', 'OWCS', 'Stage 3', 'Playoffs'], eventId: 'owcs-stage-3-2026',
  },
  {
    id: 'news-r6-osaka-major-2026', slug: 'news-r6-osaka-major-2026', gameId: 'rainbow_six', gameName: 'Rainbow Six Siege',
    title: 'BLAST R6 Major Osaka set for 7–15 November with $600,000 at stake',
    excerpt: 'Ubisoft confirms ATC Hall as the venue and says the winner earns a place at Six Invitational 2027.',
    content: [
      'Ubisoft’s official ticket page schedules the BLAST R6 Major in Osaka from 7 to 15 November at ATC Hall. It lists a $600,000 prize pool and says a place at the Brazil Six Invitational 2027 is on the line.',
      'The linked announcement does not yet list team names, match times or the detailed stage format. Ubisoft’s BLAST R6 circuit page explains that qualification for the November Major comes through Stage 2 regional results.',
    ],
    tournamentName: 'BLAST R6 Major Osaka 2026', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege/presales/osaka', sourceName: 'Ubisoft R6 Esports', sourceVerified: true,
    tags: ['Rainbow Six Siege', 'BLAST R6', 'Osaka', 'Major'], eventId: 'r6-osaka-major-2026',
  },
  {
    id: 'news-ea-fc-pro-27-open-ladder-2026', slug: 'news-ea-fc-pro-27-open-ladder-2026', gameId: 'ea_fc', gameName: 'EA FC',
    title: 'EA FC Pro 27 ladder stays open through 3 October across ten regions',
    excerpt: 'The in-game open ladder feeds into regional qualifiers scheduled for 5–7 November.',
    content: [
      'EA’s FC Pro 27 season overview says the Open Ladder runs from 21 September to 3 October inside EA SPORTS FC 27 Ultimate Team. EA lists ten regions and states that players do not need to register on an external website to enter the in-game ladder.',
      'Regional ladder placements determine entry to the Global Qualifier. EA schedules that event for 5–7 November; its Swiss and double-elimination stages determine the 16 players who move to the FC Pro Open live event.',
      'The $2.5 million figure in EA’s season announcement applies to the entire FC Pro 27 season, not to this ladder alone.',
    ],
    tournamentName: 'EA SPORTS FC Pro 27 Open Ladder', status: 'live', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive', sourceName: 'EA SPORTS FC Pro', sourceVerified: true,
    tags: ['EA FC', 'FC Pro 27', 'Open Ladder', 'Qualification'], eventId: 'ea-fc-pro-27-ladder-2026',
  },
  {
    id: 'news-mlbb-mpl-ph-s18-playoffs-2026', slug: 'news-mlbb-mpl-ph-s18-playoffs-2026', gameId: 'mobile_legends', gameName: 'MLBB',
    title: 'MPL Philippines Season 18 playoffs move to PhilSports Arena, 21–25 October',
    excerpt: 'The playoffs determine which Philippine teams represent the country on the road to M8 in Istanbul.',
    content: [
      'MOONTON Games confirms the MPL Philippines Season 18 Playoffs will take place from 21 to 25 October at PhilSports Arena in Pasig City. The regular season continues through 11 October.',
      'The playoff result will determine the Philippine representatives at the M8 World Championship, scheduled for Istanbul in January 2027. MOONTON says tickets went on sale 26 September through the official MPL Philippines ticket site.',
      'This is the Philippine regional league. Other MPL regions run separate calendars, so these dates should not be presented as one global MLBB schedule.',
    ],
    tournamentName: 'MPL Philippines Season 18 Playoffs', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://en.moonton.com/news/377.html', sourceName: 'MOONTON Games', sourceVerified: true,
    tags: ['MLBB', 'MPL PH', 'Season 18', 'M8'], eventId: 'mlbb-mpl-ph-s18-playoffs-2026',
  },
  {
    id: 'news-hok-asian-games-2026', slug: 'news-hok-asian-games-2026', gameId: 'honor_of_kings', gameName: 'Honor of Kings',
    title: 'Honor of Kings is included in the Asian Games esports event through 2 October',
    excerpt: 'The Olympic Council of Asia lists Honor of Kings in the esports programme running 23 September–2 October in Aichi.',
    content: [
      'Honor of Kings appears in the official Aichi-Nagoya 2026 Asian Games sport programme. The Olympic Council of Asia says the Games’ esports competition runs from 23 September to 2 October at Aichi Sky Expo in Japan.',
      'The linked OCA notice confirms the overall esports window and event venue, but does not publish a separate Honor of Kings bracket or team list. This update therefore does not claim a current match result or medal outcome.',
    ],
    tournamentName: 'Aichi-Nagoya 2026 Asian Games — Honor of Kings', status: 'live', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html', sourceName: 'Olympic Council of Asia', sourceVerified: true,
    tags: ['Honor of Kings', 'Asian Games', 'Esports', 'Aichi-Nagoya'], eventId: 'hok-asian-games-2026',
  },
  {
    id: 'news-brawl-stars-world-finals-2026', slug: 'news-brawl-stars-world-finals-2026', gameId: 'brawl_stars', gameName: 'Brawl Stars',
    title: 'Brawl Stars World Finals returns to Tokyo on 20–22 November',
    excerpt: 'Twelve teams will play for a $1 million prize pool at Tokyo Metropolitan Gymnasium.',
    content: [
      'Supercell’s format announcement sets the 2026 Brawl Stars World Finals for 20–22 November at Tokyo Metropolitan Gymnasium in Japan. Twelve teams will compete for $1 million.',
      'Friday’s group stage uses two GSL groups of four, with the top two teams from each group advancing. Those four join the four regional leaderboard leaders in an eight-team double-elimination playoffs over Saturday and Sunday. The Grand Final is best-of-seven.',
      'Supercell says the final team lineup will come from regional results and the Last Chance Qualifier. The full qualified roster is not yet final in the linked announcement.',
    ],
    tournamentName: 'Brawl Stars World Finals 2026', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/', sourceName: 'Brawl Stars Esports', sourceVerified: true,
    tags: ['Brawl Stars', 'World Finals', 'Tokyo', 'Esports'], eventId: 'brawl-stars-world-finals-2026',
  },
  {
    id: 'news-coc-world-championship-lcq-2026', slug: 'news-coc-world-championship-lcq-2026', gameId: 'clash_of_clans', gameName: 'Clash of Clans',
    title: 'Clash of Clans World Championship adds an October Last Chance Qualifier',
    excerpt: 'The top eight unqualified teams on the leaderboard compete for the final three Golden Tickets.',
    content: [
      'Supercell’s 2026 competition guide says the eight highest-ranked teams that have not qualified for World Finals will meet in an October Last Chance Qualifier. The top three earn the remaining Golden Tickets.',
      'The World Championship’s announced season prize pool is $1 million, and eight teams will contest the World Finals. Four monthly qualifier winners from June through September and the Chinese qualifier contribute Golden Ticket places.',
      'Supercell has not listed exact LCQ match dates or its venue on the linked guide. Those details remain pending an organizer update.',
    ],
    tournamentName: 'Clash of Clans World Championship 2026 Last Chance Qualifier', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete', sourceName: 'Clash of Clans World Championship Series', sourceVerified: true,
    tags: ['Clash of Clans', 'World Championship', 'Last Chance Qualifier'], eventId: 'coc-world-championship-2026-lcq',
  },
  {
    id: 'news-clash-royale-league-lcq-2026', slug: 'news-clash-royale-league-lcq-2026', gameId: 'clash_royale', gameName: 'Clash Royale',
    title: 'Clash Royale League 2026 Last Chance Qualifier: Woo takes the win',
    excerpt: 'Supercell’s official event site records the two-day qualifier on 5–6 September and lists Woo as champion.',
    content: [
      'The Clash Royale League 2026 Last Chance Qualifier ran on 5 and 6 September. Supercell’s official event site lists Woo as the winner and provides replays and results for both days.',
      'As of 2 October, the event page says more events are coming but does not announce the next event date. Clash Royale also has in-game Global Tournaments, which are separate limited-time events and should not be confused with a dated CRL live event.',
    ],
    tournamentName: 'Clash Royale League 2026 Last Chance Qualifier', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://event.supercell.com/clashroyale/en', sourceName: 'Clash Royale League', sourceVerified: true,
    tags: ['Clash Royale', 'CRL 2026', 'Last Chance Qualifier', 'Results'], eventId: 'clash-royale-league-lcq-2026',
  },
  {
    id: 'news-roblox-showdown-cup-2026', slug: 'news-roblox-showdown-cup-2026', gameId: 'roblox', gameName: 'Roblox',
    title: 'Roblox spotlights an in-game Showdown Cup in its September games preview',
    excerpt: 'The preview describes a tournament inside one featured Roblox experience; it is not a platform-wide Roblox league.',
    content: [
      'Roblox’s Fall Games Preview says an India-based studio planned to launch its first Showdown Cup during September 2026. The preview describes a tournament in that game’s in-experience Esports Arena, where players compete for a place on a champions board.',
      'The Roblox Newsroom preview does not state the exact event dates, entrants, rules or prizes. It describes a game-specific in-platform event, not a Roblox-wide professional esports championship.',
    ],
    tournamentName: 'Showdown Cup — Roblox Fall Games 2026', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-10-02',
    sourceUrl: 'https://about.roblox.com/newsroom/2026/09/roblox-fall-games-preview', sourceName: 'Roblox Newsroom', sourceVerified: true,
    tags: ['Roblox', 'Showdown Cup', 'In-game tournament'], eventId: 'roblox-showdown-cup-2026',
  },
];

// The sync workflow replaces this generated section in this same data file.
// BEGIN GENERATED TOURNAMENT NEWS
// Migrated from the generated news file; the sync workflow maintains this section.
export const GENERATED_TOURNAMENT_NEWS: TournamentNews[] = [
  {
    "id": "generated-cs2-blast-premier-rivals-hong-kong-2026",
    "slug": "cs2-blast-premier-rivals-hong-kong-2026",
    "gameId": "cs2",
    "gameName": "Counter-Strike 2",
    "title": "BLAST Premier Rivals Hong Kong 2026 Slated for November 2026",
    "excerpt": "BLAST Premier Rivals Hong Kong 2026 is listed as an upcoming Counter-Strike 2 tournament scheduled to take place in Hong Kong in November 2026.",
    "content": [
      "BLAST Premier Rivals Hong Kong 2026 has been included on the Counter-Strike 2 competitive schedule as an upcoming tournament set to take place in Hong Kong.",
      "According to the official BLAST.tv tournament listings, the event is scheduled for November 2026 as part of the broader Counter-Strike esports calendar."
    ],
    "tournamentName": "BLAST Premier Rivals Hong Kong 2026",
    "status": "upcoming",
    "publishedAt": "2026-09-26",
    "updatedAt": "2026-09-26",
    "sourceUrl": "https://blast.tv/cs/tournaments",
    "sourceName": "BLAST.tv Counter-Strike",
    "sourceVerified": true,
    "tags": [
      "Counter-Strike 2",
      "BLAST Premier",
      "Hong Kong"
    ]
  },
  {
    "id": "generated-apex-algs-split-2-playoffs",
    "slug": "apex-algs-split-2-playoffs",
    "gameId": "apex",
    "gameName": "Apex Legends",
    "title": "ALGS Split 2 Playoff Tickets Go on Sale for Las Vegas Event",
    "excerpt": "Tickets are now available for the ALGS Split 2 Playoffs in Las Vegas as Year 6 of the Apex Legends Global Series continues across three global LAN events.",
    "content": [
      "Tickets are now officially available for the ALGS Split 2 Playoffs, bringing live in-person competition to Las Vegas. The event invites fans to watch the world's top squads battle in high-stakes matches on stage.",
      "The announcement coincides with Year 6 of the Apex Legends Global Series, recognized as the biggest season yet with three global LAN competitions and an overall prize pool of $7M across the circuit.",
      "In addition to playoff ticket availability, ALGS Year 6 continues to move forward following the kickoff of the Split 2 Pro League."
    ],
    "tournamentName": "ALGS Split 2 Playoffs",
    "status": "upcoming",
    "publishedAt": "2026-09-26",
    "updatedAt": "2026-09-26",
    "sourceUrl": "https://algs.ea.com/",
    "sourceName": "Apex Legends Global Series",
    "sourceVerified": true,
    "tags": [
      "Apex Legends",
      "ALGS",
      "Split 2 Playoffs",
      "ALGS Year 6"
    ]
  }
];
// END GENERATED TOURNAMENT NEWS

// Both generated and curated tournament articles are served from one source.
export const TOURNAMENT_NEWS: TournamentNews[] = [
  ...GENERATED_TOURNAMENT_NEWS,
  ...CURATED_TOURNAMENT_NEWS,
];

export const OFFICIAL_TOURNAMENT_SOURCES: TournamentSource[] = [
  { gameId: 'bgmi', gameName: 'BGMI', url: 'https://esports.battlegroundsmobileindia.com/', sourceName: 'KRAFTON India Esports', note: 'BMSD is live 22 Sep–18 Oct; BMIC is announced for 30 Oct–1 Nov. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'pubg', gameName: 'PUBG Mobile', url: 'https://esports.pubgmobile.kr/en/events', sourceName: 'PUBG MOBILE Esports Korea', note: 'PMPS Korea Season 2 runs 3–18 Oct. Global and regional circuits have separate calendars. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'freefire', gameName: 'Free Fire', url: 'https://ff.garena.com/en/article/1605/', sourceName: 'Garena Free Fire', note: 'Official 2026 roadmap confirms FFWS Global Finals from 6 Nov in Bangkok; daily schedule pending. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'valorant', gameName: 'VALORANT', url: 'https://valorantesports.com/en-US/leagues/champions', sourceName: 'Riot Games VALORANT Esports', note: 'Champions Shanghai is live 24 Sep–18 Oct. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'cod', gameName: 'Call of Duty', url: 'https://www.callofdutyleague.com/en-us/schedule?stage=entire-season', sourceName: 'Call of Duty League', note: 'The 2026 CDL season and Championship ended 19 Jul. COD Mobile and Warzone have separate schedules; no common series assumed. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'cs2', gameName: 'Counter-Strike 2', url: 'https://blast.tv/cs/tournaments', sourceName: 'BLAST.tv Counter-Strike', note: 'October calendar lists ESL Pro League S24 and PGL Masters Bucharest; Singapore Major follows in November. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'fortnite', gameName: 'Fortnite', url: 'https://www.fortnite.com/news/fncs-schedule-and-competitive-updates', sourceName: 'Epic Games Fortnite Competitive', note: 'Epic confirms an October FNCS solo event; exact dates and format are pending. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'apex', gameName: 'Apex Legends', url: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview', sourceName: 'EA Apex Legends Global Series', note: 'Split 2 Pro League runs through 4 Oct; 40-team Playoffs are 29 Oct–1 Nov in Las Vegas. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'minecraft', gameName: 'Minecraft', url: 'https://www.minecraft.net/en-us/live', sourceName: 'Minecraft Official', note: 'Official page checked for publisher events; it lists Minecraft Live, not an official esports tournament calendar. Community competitions are separate. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'roblox', gameName: 'Roblox', url: 'https://about.roblox.com/newsroom/2026/09/roblox-fall-games-preview', sourceName: 'Roblox Newsroom', note: 'September preview mentions one experience-level Showdown Cup, not a platform-wide pro league. Exact dates/results were not provided. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'league', gameName: 'League of Legends', url: 'https://lolesports.com/en-US', sourceName: 'Riot Games LoL Esports', note: 'Regional splits continue into October; Worlds runs 15 Oct–14 Nov. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'rocket_league', gameName: 'Rocket League', url: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League Esports', note: 'RLCS World Championship ended 20 Sep; the official schedule is checked for the next dated events. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'overwatch', gameName: 'Overwatch 2', url: 'https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/', sourceName: 'Blizzard Overwatch Esports', note: 'OWCS Stage 3 regular season starts 10 Oct; playoffs are scheduled for 30 Oct–1 Nov. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'rainbow_six', gameName: 'Rainbow Six Siege', url: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege', sourceName: 'Ubisoft R6 Esports', note: 'BLAST R6 Major Osaka is scheduled for 7–15 Nov. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'destiny2', gameName: 'Destiny 2', url: 'https://help.bungie.net/hc/en-us/articles/360049199711-Destiny-and-Destiny-2-Competition-License', sourceName: 'Bungie Help', note: 'Bungie provides a license for community-run tournaments; no Bungie-run 2026 esports circuit was found in the official source checked. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'ea_fc', gameName: 'EA Sports FC', url: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive', sourceName: 'EA SPORTS FC Pro', note: 'FC Pro 27 Open Ladder runs through 3 Oct; Global Qualifier is 5–7 Nov. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'mobile_legends', gameName: 'Mobile Legends: Bang Bang', url: 'https://en.moonton.com/news/377.html', sourceName: 'MOONTON Games', note: 'MPL Philippines S18 playoffs are 21–25 Oct in Pasig; other regions have separate dates. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'honor_of_kings', gameName: 'Honor of Kings', url: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html', sourceName: 'Olympic Council of Asia', note: 'Asian Games esports event including Honor of Kings runs through 2 Oct. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'brawl_stars', gameName: 'Brawl Stars', url: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/', sourceName: 'Supercell Brawl Stars Esports', note: 'World Finals scheduled 20–22 Nov in Tokyo. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'clash_of_clans', gameName: 'Clash of Clans', url: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete', sourceName: 'Supercell Clash of Clans Esports', note: 'October Last Chance Qualifier confirmed; exact dates pending. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'clash_royale', gameName: 'Clash Royale', url: 'https://event.supercell.com/clashroyale/en', sourceName: 'Supercell Clash Royale League', note: 'CRL Last Chance Qualifier completed 5–6 Sep; Woo listed as winner. Next live event date not yet posted. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'genshin', gameName: 'Genshin Impact', url: 'https://www.hoyolab.com/#/article', sourceName: 'HoYoverse HoYoLAB', note: 'Official event/news channel checked; no current official Genshin esports tournament schedule found. Community events are not represented as official tournaments. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'stumble_guys', gameName: 'Stumble Guys', url: 'https://www.stumbleguys.com/news', sourceName: 'Scopely Stumble Guys', note: 'Official news page checked; no current publisher-run esports calendar found. Community competitions are separate. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'among_us', gameName: 'Among Us', url: 'https://www.innersloth.com/games/among-us/', sourceName: 'Innersloth', note: 'Official game page checked; no current official esports tournament schedule found. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
  { gameId: 'gta_online', gameName: 'GTA Online', url: 'https://www.rockstargames.com/newswire', sourceName: 'Rockstar Games Newswire', note: 'Official Newswire checked for organized competitive events; no current GTA Online esports championship schedule found. Weekly in-game activities are not esports tournaments. Checked 2 Oct 2026.', checkedAt: '2026-10-02' },
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


// Game-by-game editorial news pages are maintained alongside esports updates below.
export interface GameNewsPage {
  gameId: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  updateHeading: string;
  updateDate: string;
  update: string[];
  playerFocusHeading: string;
  playerFocus: string[];
  competitionHeading: string;
  competition: string[];
  sources: Array<{ name: string; url: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

// Game-by-game editorial pages. Each page uses its own publisher update, live
// service details, competitive context and FAQs; do not replace with shared copy.
export const GAME_NEWS_PAGES: GameNewsPage[] = [
  {
    gameId: 'bgmi', title: 'BGMI News: BMSD 2026, BMIC & Royale Pass Updates | Tradivex',
    description: 'BGMI updates for Indian players: BMSD 2026 dates, BMIC Mumbai announcement, official esports links and what to check in the current Royale Pass.',
    heading: 'BGMI News and Player Update: BMSD, BMIC and Royale Pass',
    intro: 'BGMI has two major esports dates on the calendar: the domestic BMSD finals in Hyderabad and the international BMIC in Mumbai. KRAFTON’s public 2026 competition announcement is the source for both; pass rewards and account-specific offers should be checked in the live game client.',
    updateHeading: 'BMSD is live; BMIC follows in Mumbai', updateDate: '2 October 2026',
    update: [
      'KRAFTON India’s 2026 announcement describes BMSD as a 48-team invitational for teams drawn from the KRAFTON India Esports leaderboard, BGIS and BMPS. The event runs 22 September–18 October, with its Hyderabad LAN finals scheduled for 16–18 October.',
      'The same announcement schedules the 16-team BGMI International Cup (BMIC) for 30 October–1 November in Mumbai, with teams from India, South Korea and Japan. It does not provide the final roster, match-by-match timetable or complete format, so those details remain unconfirmed here.',
    ],
    playerFocusHeading: 'Royale Pass, ranked play and account checks',
    playerFocus: [
      'KRAFTON’s public esports news page does not currently give a dated 2026 Royale Pass schedule or a complete reward list. Check the in-game Royale Pass screen for the active RP season, end timer, mission reset and premium-track price before spending UC; do not rely on last year’s RPM dates.',
      'For tournament viewers, use KRAFTON India Esports announcements for official stream links and roster changes. For competitors, confirm device, account, age, region and rulebook requirements in the event’s own registration notice.',
    ],
    competitionHeading: 'Official BGMI competition calendar',
    competition: ['BMSD 2026: 22 Sep–18 Oct; Hyderabad LAN finals 16–18 Oct.', 'BMIC 2026: 30 Oct–1 Nov in Mumbai; 16 teams announced. Detailed schedule and roster pending organizer updates.'],
    sources: [
      { name: 'KRAFTON India — 2026 tournament announcement', url: 'https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg' },
      { name: 'BGMI official news', url: 'https://www.battlegroundsmobileindia.com/news' },
      { name: 'KRAFTON India Esports', url: 'https://esports.battlegroundsmobileindia.com/' },
    ],
    faqs: [
      { question: 'When are the BGMI BMSD 2026 LAN finals?', answer: 'KRAFTON India lists the Hyderabad LAN Grand Finals for 16–18 October 2026.' },
      { question: 'What is the current BGMI Royale Pass reward list?', answer: 'The official public news page checked for this update does not provide a dated current RP reward list. The in-game Royale Pass screen is the reliable place to check live rewards, pricing and expiry.' },
    ],
  },
  {
    gameId: 'pubg', title: 'PUBG Mobile News: Royale Pass A21 & PMPS Korea | Tradivex',
    description: 'PUBG Mobile September–October 2026 update: Royale Pass A21, PMPS Korea Season 2 schedule, Daejeon finals and qualification routes from official sources.',
    heading: 'PUBG Mobile News: Royale Pass A21 and PMPS Korea',
    intro: 'This page separates PUBG Mobile’s global live-game update from Korea’s regional esports calendar. Royale Pass A21 is listed in the official September event catalogue, while PMPS Korea Season 2 has its own dates, venue and international qualification slots.',
    updateHeading: 'Royale Pass A21 appears in the September event catalogue', updateDate: '2 October 2026',
    update: [
      'PUBG MOBILE’s official New Events catalogue lists “New Royale Pass A21” under September 2026, alongside the Midnight Hunters event. The listing confirms the pass cycle exists, but does not expose its complete regional reward track or account-specific purchase options in the catalogue view.',
      'The Korean PUBG MOBILE Esports site separately schedules PMPS Korea 2026 Season 2 from 3–18 October at Daejeon Dream Arena. It lists 16 teams, a ₩40 million prize pool, five circuit days and two Finals days; the event is regional, not the global PUBG Mobile calendar.',
    ],
    playerFocusHeading: 'What to check in Royale Pass A21',
    playerFocus: [
      'Open the in-game RP page to confirm A21’s regional reward track, mission cadence, upgrade options and end date before buying. The official event catalogue confirms the A21 entry but is not a substitute for the live purchase screen.',
      'Korean PMPS dates are shown in Korea Standard Time. The official page lists Finals on 17–18 October, beginning at 3 p.m. KST, with six matches per Finals day.',
    ],
    competitionHeading: 'PMPS Korea Season 2 route to global events',
    competition: ['Circuit: 3, 4, 9, 10 and 11 October; Finals: 17–18 October at 3 p.m. KST.', 'The winner earns a PMGC 2026 place; the top three qualify for BMIC, subject to the organizer’s duplicate-slot rule.'],
    sources: [
      { name: 'PUBG MOBILE — New Events and Royale Pass catalogue', url: 'https://www.pubgmobile.com/en-US/royalepass.shtml' },
      { name: 'PUBG MOBILE Esports Korea — PMPS Season 2', url: 'https://esports.pubgmobile.kr/en/news/208' },
      { name: 'PUBG MOBILE Esports Korea events', url: 'https://esports.pubgmobile.kr/en/events' },
    ],
    faqs: [
      { question: 'Is PUBG Mobile PMPS Korea the global PMGC?', answer: 'No. PMPS Korea is a Korean regional competition. Its winner qualifies for PMGC 2026, but the series itself is not the global championship.' },
      { question: 'Does the official site show every Royale Pass A21 reward?', answer: 'The events catalogue lists A21, but check the in-game RP page for the complete live reward track, regional availability and expiry.' },
    ],
  },
  {
    gameId: 'freefire', title: 'Free Fire News: OB55, Booyah Pass & FFWS 2026 | Tradivex',
    description: 'Free Fire OB55 guide for October 2026: Naruto Shippuden return, Nine Tails gameplay, weapon and device changes, current pass checks and FFWS Global Finals.',
    heading: 'Free Fire News: OB55 Patch, Booyah Pass and FFWS',
    intro: 'Garena’s OB55 update is the major player-facing change for October: it brings back Naruto Shippuden content and changes Battle Royale events, weapons and devices. FFWS Global Finals is a separate esports event scheduled for Bangkok in November.',
    updateHeading: 'OB55 brings back Naruto Shippuden and changes match flow', updateDate: '2 October 2026',
    update: [
      'Garena’s OB55 patch notes set the update release for 1 October. The returning Nine Tails event can alter a Battle Royale match before takeoff, open Bermuda Arsenals or leave a loot crater; players can also use returning ninjutsu and the Hidden Leaf Village map feature.',
      'OB55 adds active and passive device categories, allowing one of each, adjusts airdrop timing and clarity, and introduces the M7, Skorp, RPK and Hawk weapon lineup in October. Garena also lists a full Kenta rework and Clash Squad weapon/economy changes. These changes make the patch notes more useful than old tier lists for loadout decisions.',
    ],
    playerFocusHeading: 'Booyah Pass and OB55 player checklist',
    playerFocus: [
      'The official patch note does not publish a Booyah Pass reward track or expiry date. Open the in-game Booyah Pass page to verify the current season, missions, premium rewards and local pricing before purchasing.',
      'Relearn Kenta’s reworked skill and try the new one-active/one-passive device combination in a low-stakes mode. For weapon practice, account for the new weapon recoil patterns rather than copying a pre-OB55 build unchanged.',
    ],
    competitionHeading: 'FFWS Global Finals',
    competition: ['Garena’s 2026 roadmap schedules the 24-team Global Finals in Bangkok beginning 6 November, across four November weekends.', 'The roadmap does not yet give a complete daily match timetable or final qualified team list. Follow the official event page for those announcements.'],
    sources: [
      { name: 'Garena Free Fire OB55 patch notes', url: 'https://ff.garena.com/en/article/1712/' },
      { name: 'Garena Free Fire 2026 esports roadmap', url: 'https://ff.garena.com/en/article/1605/' },
      { name: 'Garena Free Fire official news', url: 'https://ff.garena.com/en/news/' },
    ],
    faqs: [
      { question: 'What changed in Free Fire OB55?', answer: 'OB55 brings back the Naruto Shippuden event, revises Battle Royale random events and airdrops, adds four weapons in October, splits devices into active and passive categories, and reworks Kenta.' },
      { question: 'When does FFWS Global Finals 2026 start?', answer: 'Garena’s roadmap says the 24-team Bangkok event begins on 6 November and spans four weekends; the complete match schedule is pending.' },
    ],
  },
  {
    gameId: 'valorant', title: 'VALORANT News: Patch 13.06, Champions Shanghai | Tradivex',
    description: 'VALORANT Patch 13.06 and Champions Shanghai 2026: update notes, 16-team format, group and playoff dates, watch drops and official Riot links.',
    heading: 'VALORANT News: Patch 13.06 and Champions Shanghai',
    intro: 'Riot’s current VALORANT story has two tracks: Patch 13.06 is the live game update, while Champions Shanghai is the 2026 international season finale. The competition includes watch rewards and Pick’Ems alongside the matches.',
    updateHeading: 'Patch 13.06 lands during Champions Shanghai', updateDate: '2 October 2026',
    update: [
      'Riot’s official news feed lists VALORANT Patch 13.06 on 22 September 2026. The game news page also highlights the new Gauntlet: Glitched mode reveal and confirms VALORANT console launch in Australia and New Zealand. Check the patch notes for the precise agent and weapon changes on your platform.',
      'Champions Shanghai runs 24 September–18 October with 16 teams from Americas, China, EMEA and Pacific. The four-group stage continues through 4 October; eight teams advance to double-elimination playoffs from 7–18 October. Riot lists the Grand Final for 18 October.',
    ],
    playerFocusHeading: 'Ranked, event drops and Pick’Ems',
    playerFocus: [
      'Patch 13.06 is the version to review before adjusting agent utility or aim practice. Read the official patch notes in-client or on Riot’s site because platform rollouts and balance details may change.',
      'Riot says Champions viewers can earn exclusive Drops, including a title, by watching eligible live broadcasts. Champions Pick’Ems are available on the official site and in-client; check lock times before submitting predictions.',
    ],
    competitionHeading: 'Champions Shanghai 2026',
    competition: ['Groups: 24 Sep–4 Oct; four groups, all matches best-of-three; two losses eliminate a team.', 'Playoffs: 7–18 Oct, double elimination; Grand Final on 18 Oct. The organizer lists broadcast rewards and Pick’Ems.'],
    sources: [
      { name: 'Riot Games — VALORANT official news and Patch 13.06', url: 'https://playvalorant.com/en-us/news/' },
      { name: 'VALORANT Esports — Champions Shanghai guide', url: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know' },
      { name: 'VALORANT Esports official site', url: 'https://valorantesports.com/en-US/' },
    ],
    faqs: [
      { question: 'When does VALORANT Champions Shanghai 2026 end?', answer: 'Riot lists the Grand Final for 18 October 2026; playoffs run 7–18 October.' },
      { question: 'Can I get in-game rewards for watching Champions?', answer: 'Riot’s event guide lists eligible Drops for live viewing. Link and watch through the official eligible channels and check the current campaign instructions.' },
    ],
  },
  {
    gameId: 'cod', title: 'Call of Duty News: BO7 Season 6, CODM Season 8 | Tradivex',
    description: 'Call of Duty news for Black Ops 7, Warzone and COD Mobile: Season 6 Haunting, new Battle Pass weapons, Season 8 CODM and separate esports calendars.',
    heading: 'Call of Duty News: Black Ops, Warzone and COD Mobile',
    intro: 'The site’s Call of Duty profile covers multiple titles, so their seasons and tournament schedules are kept distinct here. Black Ops 7/Warzone Season 6 is live, COD Mobile has its own Season 8, and neither should be confused with the CDL season calendar.',
    updateHeading: 'Season 6: The Haunting is live in Black Ops 7 and Warzone', updateDate: '2 October 2026',
    update: [
      'Activision’s Season 6 announcement introduces Haunted Hollow, Giant Infected, the T.E.D.D. Trials and Hordepoint modes, Zombies content and the DOOM Event Pass. The Season 6 Battle Pass is led by Blackjack and contains 100+ rewards; the VMP SMG and TR51 Para Assault Rifle are free weapon unlocks on its reward pages.',
      'Warzone’s 30 September patch note also adjusts loot cleanup and gas damage. Call of Duty Mobile has a separate current cycle: the official Season 8 “Against All Fate” announcement lists a Honkai Impact 3rd collaboration, roguelike top-down Multiplayer mode, Isolated POI and new Battle Pass content.',
    ],
    playerFocusHeading: 'Battle Pass, event pass and COD Mobile',
    playerFocus: [
      'In BO7/Warzone, review the Season 6 Battle Pass and DOOM Event Pass in the game client; the event pass and Battle Pass are separate reward tracks. The official Season 6 article lists two free weapons and seasonal challenges.',
      'COD Mobile runs its own Battle Pass, ranked progression and event schedule. The profile does not merge CODM and Warzone patch notes, currencies or rewards; use the relevant title’s in-game news tab before spending CP.',
    ],
    competitionHeading: 'Competitive status by Call of Duty title',
    competition: ['The 2026 CDL season concluded in July; CDL is the console/PC professional circuit and does not provide a universal schedule for every Call of Duty game.', 'COD Mobile’s 2026 World Championship uses in-game solo/team qualifiers, World Championship Points and Summer/Fall regional splits. Check the CODM esports page for regional registration windows.'],
    sources: [
      { name: 'Activision — Season 6: The Haunting', url: 'https://www.callofduty.com/blog/2026/09/call-of-duty-black-ops-7-warzone-season-6-the-haunting-announcement' },
      { name: 'Raven Software — Warzone Season 6 patch notes', url: 'https://www.callofduty.com/patchnotes/2026/09/call-of-duty-bo7-warzone-season-06-patch-notes' },
      { name: 'Call of Duty Mobile esports', url: 'https://www.callofduty.com/mobile/esports' },
      { name: 'Call of Duty Mobile official blog', url: 'https://www.callofduty.com/blog/mobile' },
    ],
    faqs: [
      { question: 'Is the Call of Duty Battle Pass shared between Warzone and COD Mobile?', answer: 'No. The site profile spans multiple Call of Duty titles, but their Battle Passes, content and progression are separate. Check the title-specific in-game pass.' },
      { question: 'When does the CDL 2026 season continue?', answer: 'The 2026 CDL season and Championship ended in July. COD Mobile has a separate World Championship program with its own qualifiers and regional splits.' },
    ],
  },
  {
    gameId: 'cs2', title: 'CS2 News: Rush 3v3 Mode and October Tournament Calendar | Tradivex',
    description: 'Counter-Strike 2 September update adds Rush, a fast 3v3 queued mode. See official update details, Premier/Prime notes and October CS2 tournaments.',
    heading: 'Counter-Strike 2 News: Rush Mode and CS2 Events',
    intro: 'Valve’s September 22 CS2 update adds Rush, a new 3v3 queued mode. It is a gameplay update rather than a replacement for Premier; October’s professional events remain listed on the organizer calendar.',
    updateHeading: 'Rush adds a new 3v3 queue to Counter-Strike 2', updateDate: '2 October 2026',
    update: [
      'The official Steam announcement describes Rush as a fast-paced 3v3 mode. Teams push through a gauntlet of checkpoints and need to keep momentum as the mode switches objectives; see the live announcement for the current rules and map availability.',
      'The CS2 page also reiterates that Prime Status affects Prime matchmaking and eligibility for Prime-exclusive souvenir items, drops and weapon cases. Prime is not required to play the free game, but it changes matchmaking and rewards eligibility.',
    ],
    playerFocusHeading: 'Premier rating, Prime and update checks',
    playerFocus: [
      'Try Rush separately from Premier and Competitive: a limited-time or newly queued mode does not change your Premier rating rules. Review Valve’s official patch notes for map pool, economy and anti-cheat changes before treating older guides as current.',
      'Players deciding about Prime should compare its matchmaking and item-drop benefits with the current Steam store listing. Item drops are not a guaranteed cash return and should not be treated as such.',
    ],
    competitionHeading: 'October Counter-Strike schedule',
    competition: ['ESL Pro League Season 24: 3–11 Oct in Katowice; the official calendar listing checked did not include a full lineup/format.', 'PGL Masters Bucharest: 24–31 Oct, 16 teams and $1.25m listed; PGL Singapore Major follows 25 Nov–13 Dec. Check organizers for match times and roster updates.'],
    sources: [
      { name: 'Valve — Counter-Strike 2 official Steam updates', url: 'https://store.steampowered.com/app/730/CounterStrike2/' },
      { name: 'BLAST.tv Counter-Strike tournament calendar', url: 'https://blast.tv/cs/tournaments' },
      { name: 'Steam — Counter-Strike 2', url: 'https://store.steampowered.com/app/730/CounterStrike2/' },
    ],
    faqs: [
      { question: 'What is Rush mode in CS2?', answer: 'Rush is Valve’s new fast 3v3 queued mode, announced in the September 22, 2026 update. Check the in-game mode description for current rules and map availability.' },
      { question: 'Does Prime Status affect CS2 Premier rating?', answer: 'Prime changes matchmaking and drop eligibility; it is separate from the rules of the Premier rating system. See Valve’s current store and patch information.' },
    ],
  },
  {
    gameId: 'fortnite', title: 'Fortnite News: Fortnitemares 2026 and FNCS Solo | Tradivex',
    description: 'Fortnite October 2026 guide: Fortnitemares spreads to Battle Royale, Horde Rush and Reload; official FNCS Solo tournament details and dates.',
    heading: 'Fortnite News: Fortnitemares 2026 and Competitive Play',
    intro: 'Fortnitemares is Fortnite’s main October update, with horror-themed content rolling through several modes. Epic has also confirmed a standalone FNCS Solo event for October, but its match schedule and format were still pending in the latest competitive announcement checked.',
    updateHeading: 'Fortnitemares 2026 begins across three Fortnite modes', updateDate: '2 October 2026',
    update: [
      'Epic’s 1 October Fortnitemares announcement says the Halloween event spreads through Battle Royale, Horde Rush and Reload during October. It features Nightmare Neighborhood, Freddy Krueger and the Bone Rattler SMG, with additional horror characters and cosmetics arriving over the month.',
      'Epic previously scheduled a standalone FNCS Solo tournament after the Global Championship in October. The official competitive post said the schedule and format would be announced later; no match times or prize details are added here without that follow-up.',
    ],
    playerFocusHeading: 'Season quests, cosmetics and ranked readiness',
    playerFocus: [
      'Fortnitemares content may roll out in stages. Check the in-game Quests and event panels for each item’s live start/end time and reward requirements rather than assuming every collaboration is available on day one.',
      'For ranked players, review the active Battle Royale season and current FNCS rules separately: cosmetic event quests do not affect FNCS eligibility, region lock or tournament scoring.',
    ],
    competitionHeading: 'FNCS October Solo event',
    competition: ['Epic confirmed a new standalone FNCS solos tournament for October 2026, following the Global Championship.', 'Exact dates, format, qualification path and prize information were not in the official schedule update checked. Follow Fortnite Competitive for the next announcement.'],
    sources: [
      { name: 'Epic Games — Fortnitemares 2026', url: 'https://www.fortnite.com/news/the-corruption-spreads-in-fortnitemares-2026' },
      { name: 'Epic Games — FNCS schedule and competitive updates', url: 'https://www.fortnite.com/news/fncs-schedule-and-competitive-updates' },
      { name: 'Fortnite official news', url: 'https://www.fortnite.com/news' },
    ],
    faqs: [
      { question: 'Which Fortnite modes get Fortnitemares 2026?', answer: 'Epic says the event spreads through Battle Royale, Horde Rush and Reload during October.' },
      { question: 'When is the FNCS Solo tournament?', answer: 'Epic confirmed an October 2026 solo event but had not published its exact match dates or format in the schedule post checked.' },
    ],
  },
  {
    gameId: 'apex', title: 'Apex Legends News: Marked Midseason, Ranked & ALGS | Tradivex',
    description: 'Apex Legends Marked midseason guide: September balance changes, ranked ladder dates, EA Javelin anti-cheat rollout and ALGS Split 2 Playoffs.',
    heading: 'Apex Legends News: Marked Midseason and ALGS',
    intro: 'Apex Legends’ September midseason patch affects loot, long-range weapons, maps and ranked ladders. EA also announced a PC anti-cheat transition, while ALGS Split 2 Playoffs bring 40 teams to Las Vegas later in October.',
    updateHeading: 'Marked Split 2 resets the ranked race and refreshes loot', updateDate: '2 October 2026',
    update: [
      'Respawn’s 14 September Marked midseason notes say Split 2 began on 15 September. The patch adjusts Legend balance and loot availability, buffs three long-range weapons, and includes more than 150 map quality-of-life fixes, with substantial work on World’s Edge.',
      'The same notes list Ranked Ladder 2 for 29 September–4 October and Ladder 3 for 6–11 October, followed by further weekly ladders through 1 November. EA separately announced that PC moves to Javelin Anti-Cheat effective 29 September; the notice says enforcement applies across platforms for detected prohibited behavior.',
    ],
    playerFocusHeading: 'Ranked ladders, maps and anti-cheat',
    playerFocus: [
      'Check the in-game Ranked screen for your current ladder, entry window and map rotation. The patch notes list World’s Edge, Olympus and Broken Moon for Ranked and Pubs during this split.',
      'EA says unauthorized controller hardware/software detection is active across PC, PlayStation, Xbox and Nintendo Switch 2. Use supported input and avoid third-party macros or automation that can trigger enforcement.',
    ],
    competitionHeading: 'ALGS Year 6 Split 2 Playoffs',
    competition: ['40 teams; 29 Oct–1 Nov at Orleans Arena, Las Vegas; $2 million prize pool.', 'Format: round-robin groups, double elimination and Match Point Finals. The official competition page is the source for team qualification and ticket updates.'],
    sources: [
      { name: 'EA — Marked midseason patch notes', url: 'https://www.ea.com/games/apex-legends/apex-legends/news/marked-midseason-patch-notes' },
      { name: 'EA — Javelin Anti-Cheat announcement', url: 'https://www.ea.com/games/apex-legends/apex-legends/news/ea-javelin-anticheat' },
      { name: 'ALGS Year 6 Split 2 Playoffs', url: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview' },
    ],
    faqs: [
      { question: 'What changed in Apex Legends Marked Split 2?', answer: 'The midseason update adjusts Legend balance and loot, buffs three long-range weapons, adds map fixes, and starts the September 15 Split 2 ranked cycle.' },
      { question: 'When are ALGS Split 2 Playoffs?', answer: 'The 40-team LAN is scheduled for 29 October–1 November 2026 at Orleans Arena in Las Vegas.' },
    ],
  },
  {
    gameId: 'minecraft', title: 'Minecraft News: Wilderness Bound Drop & Live 2026 | Tradivex',
    description: 'Minecraft player update for October 2026: Wilderness Bound game drop is out, Minecraft Live September announcements and official Java/Bedrock links.',
    heading: 'Minecraft News: Wilderness Bound and Minecraft Live',
    intro: 'Minecraft’s current official headline is the Wilderness Bound game drop, listed as out now. Minecraft Live is a developer presentation, not an esports tournament; community server events and creator competitions should be labelled separately.',
    updateHeading: 'Wilderness Bound is the latest Minecraft game drop', updateDate: '2 October 2026',
    update: [
      'Minecraft’s official Live page lists the Wilderness Bound drop as available now. Check the linked drop page for the exact Java and Bedrock feature list, version number and platform rollout before updating a server or modded client.',
      'Minecraft Live was scheduled for 26 September 2026 at 1 p.m. ET and has now passed. That livestream shares Minecraft news and creator updates; it is not itself an esports event. Back up a world and confirm a server’s supported version before switching a long-running save.',
    ],
    playerFocusHeading: 'World backups, versions and server compatibility',
    playerFocus: [
      'Before applying a new game drop to a shared world, make a backup and check whether your server software, resource packs and add-ons support the same release. Java and Bedrock release timing can differ.',
      'Minecraft Live announcements do not automatically mean a feature has shipped. Use the official drop page and version notes to distinguish a playable release from a preview or announcement.',
    ],
    competitionHeading: 'Minecraft competitions',
    competition: ['No publisher-run Minecraft esports tournament calendar was listed on the official Live page checked.', 'Minecraft Education has an official 2026 esports playbook for school-run competitions; those events are community/education programmes, not a single global pro circuit.'],
    sources: [
      { name: 'Minecraft Live and current game drop', url: 'https://www.minecraft.net/en-us/live' },
      { name: 'Minecraft Education — 2026 esports playbook', url: 'https://education.minecraft.net/content/dam/education-edition/learning-experiences/Minecraft_EDU_Esports_Playbook_2026.pdf' },
    ],
    faqs: [
      { question: 'Is Wilderness Bound available in Minecraft?', answer: 'Minecraft’s official Live page lists the Wilderness Bound game drop as out now. Check its drop page for edition/version support before updating a server.' },
      { question: 'Does Minecraft Live announce official esports matches?', answer: 'Minecraft Live is a virtual news event for Minecraft games and creators. The official page checked does not present it as an esports tournament calendar.' },
    ],
  },
  {
    gameId: 'roblox', title: 'Roblox News: The Hunt, Showdown Cup & October Games | Tradivex',
    description: 'Roblox October 2026 player guide: The Hunt Roblox 20 ended September 28, Showdown Cup is experience-level, and new Roblox games are arriving.',
    heading: 'Roblox News: The Hunt Roblox 20 and Showdown Cup',
    intro: 'Roblox is a platform of creator-made experiences, so an event inside one game is not automatically a platform-wide tournament. This update separates Roblox’s anniversary event, Showdown’s in-experience cup and the fall game release slate.',
    updateHeading: 'The Hunt Roblox 20 ends; creator games continue to arrive', updateDate: '2 October 2026',
    update: [
      'Roblox’s official newsroom scheduled The Hunt: Roblox 20 for 17–28 September. The platform-wide anniversary event sent players through games representing Roblox history, with quests, UGC rewards and a leaderboard. It has ended as of this update date.',
      'Roblox also spotlighted Showdown’s first in-game Showdown Cup, hosted inside SuperGaming’s experience and its Esports Arena. Roblox’s fall preview listed Prime Heroes, Octane, Starforged and other experiences for October; availability can vary by release and region, so open each experience listing for its live status.',
    ],
    playerFocusHeading: 'Robux, UGC rewards and experience-specific rules',
    playerFocus: [
      'Check the event or experience page before spending Robux: creator-run passes, currencies, reward odds and end dates belong to that specific game, not the entire Roblox platform.',
      'The Hunt’s announced window is over. Avoid third-party pages claiming that expired event rewards remain claimable; use Roblox’s official event hub and the creator’s verified experience page.',
    ],
    competitionHeading: 'Roblox competitive events',
    competition: ['Showdown Cup is an in-experience competition; Roblox’s newsroom does not describe it as a platform-wide professional league.', 'Roblox’s September preview did not publish the cup’s exact dates, roster or prize details. Tournament rules should be checked inside Showdown.'],
    sources: [
      { name: 'Roblox — The Hunt: Roblox 20', url: 'https://about.roblox.com/newsroom/2026/09/join-the-hunt-roblox-20' },
      { name: 'Roblox — Fall Games Preview', url: 'https://about.roblox.com/newsroom/2026/09/roblox-fall-games-preview' },
      { name: 'Roblox — 2026 Innovation Awards', url: 'https://about.roblox.com/newsroom/2026/09/2026-roblox-innovation-awards' },
    ],
    faqs: [
      { question: 'Is the Showdown Cup an official Roblox-wide tournament?', answer: 'No. Roblox’s newsroom describes it as a tournament inside SuperGaming’s Showdown experience, not a platform-wide Roblox pro league.' },
      { question: 'Can players still join The Hunt: Roblox 20?', answer: 'The official event window was 17–28 September 2026, so it had ended by 2 October. Check Roblox for any follow-up event or reward claim window.' },
    ],
  },
  {
    gameId: 'league', title: 'League of Legends News: Worlds 2026 Venues & Schedule | Tradivex',
    description: 'League of Legends October 2026 update: Worlds 2026 stage locations, revised broadcast start times, LoL esports news and official Riot sources.',
    heading: 'League of Legends News: Worlds 2026 Player and Fan Guide',
    intro: 'Worlds 2026 begins in October, and Riot has published venue policies plus updated broadcast start times. This page covers where each stage is played and what fans should verify before travelling or planning a watch party.',
    updateHeading: 'Riot updates Worlds venues and stage start times', updateDate: '2 October 2026',
    update: [
      'Riot’s 22 September venue notice places Play-Ins in Los Angeles, the Swiss Stage and knockout rounds at the Credit Union of Texas Event Center in Allen, Texas, and the Final at Barclays Center in Brooklyn on 14 November.',
      'Riot also adjusted some broadcast start times. Its notice lists Texas Swiss matches on 23–26 October at noon CDT, 28–30 October at 3 p.m. CDT and 31 October at noon CDT; check the full official schedule for later stages, ticket policies and any further timing changes.',
    ],
    playerFocusHeading: 'Patch, ranked season and Worlds watch planning',
    playerFocus: [
      'Worlds broadcasts use the tournament patch and professional draft rules; ranked queues use the live client patch. For champion builds, check the client patch notes rather than assuming the competitive patch is current for solo queue.',
      'For tickets, venue entry, cosplay, bags and broadcast start times, Riot’s event policy page is the controlling source. Matchups and qualified teams belong on the official LoL Esports schedule.',
    ],
    competitionHeading: 'Worlds 2026',
    competition: ['Tournament window: 15 Oct–14 Nov. Play-Ins: Los Angeles; Swiss, Quarterfinals and Semifinals: Allen, Texas; Final: Brooklyn.', 'Riot’s 29 September update says the Worlds anthem “Know My Name” premieres 8 October and celebrates Faker and T1’s historic three-peat.'],
    sources: [
      { name: 'Riot Games — Worlds 2026 venue policies and updated times', url: 'https://lolesports.com/en-US/lolesports/news/worlds-2026-venue-event-policies' },
      { name: 'Riot Games — Worlds 2026 anthem news', url: 'https://lolesports.com/en-US/lolesports/news/worlds-anthem-presented-by-true-damage' },
      { name: 'LoL Esports news', url: 'https://lolesports.com/en-US/lolesports/news' },
    ],
    faqs: [
      { question: 'Where is the League of Legends Worlds 2026 Final?', answer: 'Riot lists Barclays Center in Brooklyn, New York, for the 14 November Final.' },
      { question: 'Where are the Worlds 2026 group and knockout stages?', answer: 'Play-Ins are in Los Angeles; Swiss, Quarterfinals and Semifinals are at the Credit Union of Texas Event Center in Allen, Texas.' },
    ],
  },
  {
    gameId: 'rocket_league', title: 'Rocket League News: Season 24, Rocket Pass & RLCS | Tradivex',
    description: 'Rocket League Season 24 is live: Rocket Pass cars, Honor Duels, Black Market trade-ins, Bullet Ball dates, ranked rewards and RLCS updates.',
    heading: 'Rocket League News: Season 24 and Rocket Pass',
    intro: 'Season 24 launched on 23 September with player-facing changes to duels, item trade-ins, controls and ranked rewards. The official season post also gives exact dates for the current limited-time modes and Rocket Pass content.',
    updateHeading: 'Season 24 adds Honor Duels and Black Market trade-ins', updateDate: '2 October 2026',
    update: [
      'Rocket League Season 24 adds Honor Duels: players can challenge a match opponent to a 1v1 after the current match, while others may spectate. Three duplicate Black Market items can now be traded in for a new item or a painted item the player has not collected.',
      'The season adds a custom scoreboard, free-look camera options, updated mouse-and-keyboard controls and new Top 100 ranked titles. Bullet Ball runs 23 September–6 October; the Persona 5 event runs 25 September–12 October. Season 24 Rocket Pass includes the Volkswagen Golf GTI Edition 50, Dominus GT 76 and Pareto 5S bodies.',
    ],
    playerFocusHeading: 'Rocket Pass, ranked rewards and limited-time events',
    playerFocus: [
      'Check the in-game Rocket Pass track for the complete free and premium reward tiers; the official announcement highlights selected cars and items but not every account-specific unlock.',
      'Bullet Ball is time-limited through 6 October. The Run It Up challenge track runs through 9 December, so its challenges and rewards have a longer window than the seasonal event modes.',
    ],
    competitionHeading: 'RLCS status',
    competition: ['The RLCS World Championship concluded 20 September in Fort Worth, with 20 teams and a $1.2 million prize pool.', 'No next RLCS date was listed on the official schedule checked; follow the official calendar for the next season announcement.'],
    sources: [
      { name: 'Psyonix — Rocket League Season 24 overview', url: 'https://www.rocketleague.com/news/rocket-league-heads-to-the-streets-in-season-24' },
      { name: 'Psyonix — Season 24 patch notes', url: 'https://www.rocketleague.com/news/rocket-league-s24-patch-notes-v276' },
      { name: 'Rocket League competitive schedule', url: 'https://www.rocketleague.com/competitive/schedule' },
    ],
    faqs: [
      { question: 'When does the Rocket League Bullet Ball event end?', answer: 'The official Season 24 overview lists Bullet Ball from 23 September through 6 October 2026.' },
      { question: 'What new cars are in the Season 24 Rocket Pass?', answer: 'Psyonix highlights the Volkswagen Golf GTI Edition 50, Dominus GT 76 and Pareto 5S, each with its listed hitbox.' },
    ],
  },
  {
    gameId: 'overwatch', title: 'Overwatch News: September Patch, Pass Revamp & OWCS | Tradivex',
    description: 'Overwatch September 2026 player update: D.Mon hotfix, Junkrat’s Loot Hunt dates, delayed Unvaulted Passes and OWCS Stage 3 schedule.',
    heading: 'Overwatch News: September Balance, Battle Pass and OWCS',
    intro: 'The September patch cycle includes D.Mon tuning, bug fixes and a three-week Junkrat’s Loot Hunt. Blizzard also delayed the return of Unvaulted Passes to Season 5, which matters to players waiting for legacy cosmetics.',
    updateHeading: 'D.Mon hotfix and Junkrat’s Loot Hunt shape September', updateDate: '2 October 2026',
    update: [
      'Blizzard’s 17 September hotfix reduced D.Mon’s armor and adjusted her Fusion Repeater and Propulsors. The 8 September patch introduced Junkrat’s Loot Hunt, scheduled for 12–29 September, plus additional hero balance changes.',
      'In its Season 4 midcycle post, Blizzard said Unvaulted Passes would move from the Season 4 midseason update to the start of Season 5 so QA could test the feature. No full mechanics or final release details were included in that notice.',
    ],
    playerFocusHeading: 'Battle Pass and returning cosmetics',
    playerFocus: [
      'The current Battle Pass Revamp is live, but Unvaulted Passes were delayed to the beginning of Season 5 in Blizzard’s published update. Do not assume a legacy pass is currently purchasable until it appears in the client.',
      'For balance-sensitive roles, revisit D.Mon’s 17 September hotfix values and current hero patch notes. Replay codes from the 8 September patch remain available according to Blizzard’s hotfix notice.',
    ],
    competitionHeading: 'OWCS Stage 3 and World Finals',
    competition: ['Stage 3 regular-season weekends: 10–11, 17–18 and 24–25 October; regional playoffs: 30 October–1 November.', 'OWCS World Finals are scheduled for 2–6 December. Check the regional league page for brackets and broadcast times.'],
    sources: [
      { name: 'Blizzard — Overwatch September patch notes', url: 'https://overwatch.blizzard.com/en-us/news/patch-notes/' },
      { name: 'Blizzard — Season 4 midcycle and pass update', url: 'https://overwatch.blizzard.com/en-us/news/24295392/' },
      { name: 'Overwatch Esports — 2026 competitive details', url: 'https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/' },
    ],
    faqs: [
      { question: 'When will Overwatch Unvaulted Passes arrive?', answer: 'Blizzard moved the feature to the start of Season 5 and said more details would arrive before then.' },
      { question: 'When does OWCS Stage 3 start?', answer: 'The regular season starts on 10 October, with three weekend rounds before playoffs on 30 October–1 November.' },
    ],
  },
  {
    gameId: 'rainbow_six', title: 'Rainbow Six Siege News: Y11S3.1 & R6 Osaka Major | Tradivex',
    description: 'Rainbow Six Siege Operation Split Fire update: Y11S3.1 patch, September Wasteland Circuit event, Ranked 3.0 and Osaka Major dates.',
    heading: 'Rainbow Six Siege News: Operation Split Fire and Osaka Major',
    intro: 'Rainbow Six Siege is in Year 11 Season 3, Operation Split Fire. Ubisoft’s 22 September Y11S3.1 patch and Wasteland Circuit event are the latest player-facing notes, while the next global Major is scheduled for Osaka in November.',
    updateHeading: 'Y11S3.1 patch and Wasteland Circuit event', updateDate: '2 October 2026',
    update: [
      'Ubisoft’s official update feed lists Y11S3.1 patch notes on 22 September and a new Wasteland Circuit Twitch Drop on 23 September. The patch-note page is the authoritative place to check operator, map, bug-fix and platform-specific changes; the headline alone does not enumerate all details.',
      'Year 11 also brings Ranked 3.0, which Ubisoft said would launch with Operation System Override on 2 June. For season progression, check current ranked placement, seasonal challenges and any battle-pass timer in the client because rewards and availability are time-limited.',
    ],
    playerFocusHeading: 'Ranked 3.0, seasonal rewards and drops',
    playerFocus: [
      'Ranked 3.0 is a major change to Siege’s progression. Use Ubisoft’s Ranked 3.0 explainer for the rating and placement rules rather than relying on old MMR guides.',
      'The Wasteland Circuit notice offers an exclusive drone skin and Twitch chat badge. Confirm eligible streams and account linking on Ubisoft’s announcement before expecting a Drop.',
    ],
    competitionHeading: 'BLAST R6 Major Osaka 2026',
    competition: ['Global Major: 7–15 November at ATC Hall, Osaka; $600,000 prize pool.', 'Ubisoft says the Major carries a Six Invitational 2027 qualification place. Team lineups and full match schedule were not published in the ticket notice checked.'],
    sources: [
      { name: 'Ubisoft — R6 Siege news and patch notes', url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates?category=patch-notes' },
      { name: 'Ubisoft — Ranked 3.0 update', url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates' },
      { name: 'Ubisoft — BLAST R6 Major Osaka', url: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege/presales/osaka' },
    ],
    faqs: [
      { question: 'What is the latest Rainbow Six Siege update?', answer: 'Ubisoft’s news feed lists Y11S3.1 patch notes dated 22 September 2026 and the Wasteland Circuit event notice dated 23 September.' },
      { question: 'When is the R6 Major Osaka 2026?', answer: 'Ubisoft lists the Major for 7–15 November at ATC Hall in Osaka, with a $600,000 prize pool.' },
    ],
  },
  {
    gameId: 'destiny2', title: 'Destiny 2 News: Update 9.7 and Current Official Schedule | Tradivex',
    description: 'Destiny 2 current player notes: Bungie’s 9.7.0.3 hotfix, Monument of Triumph major update and official status of publisher-run esports events.',
    heading: 'Destiny 2 News: Update 9.7 and Guardian Checklist',
    intro: 'Bungie’s 9.7.0 release was identified as the final major patch for Destiny 2, with smaller maintenance updates still possible. The latest specific 9.7.0.3 notes include Crucible and Trials fixes; no Bungie-run 2026 esports circuit was listed on the official pages checked.',
    updateHeading: 'Update 9.7 is the final major patch; hotfixes can follow', updateDate: '2 October 2026',
    update: [
      'Bungie’s 9 June Update 9.7.0 notes describe the release as the final major Destiny 2 patch, while explicitly allowing for smaller maintenance patches and hotfixes afterward. It includes changes across activities, rewards, raids, dungeons and the Monument of Triumph update.',
      'The later 9.7.0.3 update on 7 July increased Vanguard and Crucible Ops reputation and fixed several Crucible and Trials issues. Bungie’s current public news feed checked for this page showed later 2026 posts focused on Marathon rather than a new Destiny 2 seasonal roadmap.',
    ],
    playerFocusHeading: 'Activities, power progression and community events',
    playerFocus: [
      'Because no new seasonal pass timetable was found in the current official Destiny 2 news feed, confirm active event cards, Eververse offers and activity modifiers in the Director before planning a weekly reset route.',
      'Bungie’s competition license allows community organizers to run Destiny competitions under its terms. That is different from a publisher-operated professional league; review the license before organizing an event.',
    ],
    competitionHeading: 'Destiny 2 esports status',
    competition: ['No Bungie-run 2026 esports tournament schedule was found in the official pages checked.', 'Community tournaments may operate under Bungie’s competition license. Their brackets, prizes and eligibility are organizer-specific.'],
    sources: [
      { name: 'Bungie — Destiny 2 Update 9.7.0', url: 'https://www.bungie.net/7/en/News/Article/destiny_update_9_7_0' },
      { name: 'Bungie — Destiny 2 Update 9.7.0.3', url: 'https://www.bungie.net/7/en/News/Article/destiny_2_update_9_7_0_3' },
      { name: 'Bungie competition license', url: 'https://help.bungie.net/hc/en-us/articles/360049199711-Destiny-and-Destiny-2-Competition-License' },
    ],
    faqs: [
      { question: 'Is Bungie running a Destiny 2 esports league in 2026?', answer: 'No publisher-run 2026 tournament schedule was found on the official pages checked. Community events operate separately and must follow Bungie’s competition license.' },
      { question: 'Will Destiny 2 receive any more updates?', answer: 'Bungie called 9.7.0 its final major patch but said smaller maintenance patches and hotfixes could still follow.' },
    ],
  },
  {
    gameId: 'ea_fc', title: 'EA FC 27 News: Season 1 Pass, FUT and FC Pro | Tradivex',
    description: 'EA SPORTS FC 27 launch guide: Ones to Watch Season 1 pass runs through October 22, player item upgrades, Ultimate Team and FC Pro details.',
    heading: 'EA SPORTS FC 27 News: Season 1 and FC Pro',
    intro: 'EA SPORTS FC 27 launched in September, and Football Ultimate Team Season 1 is active through 22 October. This page separates Ultimate Team’s player-facing campaign from the FC Pro esports ladder and the new Grounds/Clubs modes.',
    updateHeading: 'Season 1: Ones to Watch runs through 22 October', updateDate: '2 October 2026',
    update: [
      'EA’s launch update sets Season 1: Ones to Watch for 17 September–22 October. The campaign links Ones to Watch, Destined for Glory and Future Stars; eligible Ones to Watch items can receive upgrades for Team of the Week, Star Performer or Player of the Month recognition, plus a club-results boost described in EA’s rules.',
      'EA’s 30 September Gameplay Developer Launch Update and 29 September Career Mode update are the newest title-specific news posts. The Grounds, including Clubs, is available only on PlayStation 5, Xbox Series X|S, PC and Nintendo Switch 2 according to EA’s platform note; older consoles do not get that mode.',
    ],
    playerFocusHeading: 'Ultimate Team Season Pass and supported modes',
    playerFocus: [
      'Check the Season 1 pass page in Ultimate Team for tier progress and the current campaign end date. EA’s launch notice gives the season window; individual SBC, objective and live-event windows can close earlier.',
      'Platform availability matters: The Grounds and Clubs are limited to current-generation/PC/Switch 2 platforms per EA’s disclaimer. Confirm edition-specific items and point grants through EA’s account and offer terms.',
    ],
    competitionHeading: 'FC Pro 27 competitive pathway',
    competition: ['The FC Pro 27 Open Ladder runs 21 Sep–3 Oct across ten online regions; Regional Qualifiers are scheduled for 5–7 November.', 'The $2.5 million figure announced by EA applies to the full season pool, not to the Open Ladder alone. Registration and qualification rules differ by region.'],
    sources: [
      { name: 'EA — FC 27 launch update and Season 1', url: 'https://www.ea.com/games/ea-sports-fc/fc-27/news/pitch-notes-fc27-launch-update' },
      { name: 'EA — FC 27 latest news and developer updates', url: 'https://www.ea.com/games/ea-sports-fc/fc-27/news' },
      { name: 'EA — FC Pro 27 competitive deep dive', url: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive' },
    ],
    faqs: [
      { question: 'When does EA FC 27 Season 1 end?', answer: 'EA lists Season 1: Ones to Watch as running through Thursday, 22 October 2026.' },
      { question: 'Is The Grounds available on PS4 and Xbox One?', answer: 'EA’s launch notice says The Grounds, including Clubs, is available on PlayStation 5, Xbox Series X|S, PC and Nintendo Switch 2, not the listed last-generation platforms.' },
    ],
  },
  {
    gameId: 'mobile_legends', title: 'MLBB News: 10th Anniversary, MPL PH S18 & M8 | Tradivex',
    description: 'Mobile Legends: Bang Bang October 2026 news: 10th anniversary campaign, Asian Games result, MPL Philippines playoffs and the road to M8.',
    heading: 'Mobile Legends: Bang Bang News: Anniversary and MPL',
    intro: 'MLBB’s 10th anniversary campaign is active, while the Asian Games esports debut has concluded and regional leagues continue. This page identifies which tournament is finished and which upcoming dates still matter to players and fans.',
    updateHeading: 'MLBB marks 10 years; Myanmar wins the Asian Games event', updateDate: '2 October 2026',
    update: [
      'MOONTON launched the ALL IN MLBB 10th-anniversary campaign on 4 September. Its official 1 October report says Myanmar won the inaugural Asian Games MLBB gold by defeating Indonesia 4–0 at Aichi Sky Expo; this competition is complete, not live as of this page date.',
      'MPL Philippines Season 18 playoffs are scheduled for 21–25 October at PhilSports Arena in Pasig. MOONTON describes the playoffs as part of the Philippines’ route toward M8; Thailand’s MSL Season 2 also runs through 18 October. Each regional league has its own standings and qualification route.',
    ],
    playerFocusHeading: 'Anniversary missions and regional season play',
    playerFocus: [
      'The 10th-anniversary campaign can include limited-time login, mission and local event rewards. Verify each reward and claim deadline in the Events tab; the global announcement does not guarantee every offer is available in every server.',
      'MPL PH Season 18 is a regional league, not the global M Series itself. Check the official regional schedule for playoff seeding, ticketing and team qualification updates.',
    ],
    competitionHeading: 'MPL playoffs and path to M8',
    competition: ['MPL Philippines S18 playoffs: 21–25 Oct at PhilSports Arena, Pasig City.', 'M8 World Championship is scheduled for Istanbul in January 2027; national/regional circuits have separate qualification conditions.'],
    sources: [
      { name: 'MOONTON — Asian Games MLBB champion report', url: 'https://en.moonton.com/news/index.html' },
      { name: 'MOONTON — MPL Philippines S18 playoffs', url: 'https://en.moonton.com/news/377.html' },
      { name: 'MOONTON — MLBB official news', url: 'https://en.moonton.com/news/index.html' },
    ],
    faqs: [
      { question: 'Who won MLBB at the 2026 Asian Games?', answer: 'MOONTON reports that Myanmar defeated Indonesia 4–0 in the Grand Final and claimed the inaugural Asian Games MLBB gold on 1 October.' },
      { question: 'When are MPL Philippines Season 18 playoffs?', answer: 'MOONTON lists 21–25 October 2026 at PhilSports Arena in Pasig City.' },
    ],
  },
  {
    gameId: 'honor_of_kings', title: 'Honor of Kings News: Season 16 Patch & October Esports | Tradivex',
    description: 'Honor of Kings October 2026 guide: Season 16 Flow As One patch, iOS minimum-version notice, anti-cheat update and official esports events.',
    heading: 'Honor of Kings News: Season 16 and Global Esports',
    intro: 'Honor of Kings entered Season 16: Flow As One with a September patch and published an iOS minimum-version notice. Its esports calendar has regional and global events; the current official page should be used for event stages and regional qualifiers.',
    updateHeading: 'Season 16 Flow As One patch and device compatibility notice', updateDate: '2 October 2026',
    update: [
      'The official Honor of Kings site lists Season 16: Flow As One patch notes dated 22 September, an anti-cheat measures update and a minimum iOS system version adjustment dated 17 September. Players on older devices should confirm compatibility before updating, especially if they rely on an older operating system.',
      'The official esports hub separates global events, regional pro leagues and grassroots competitions. Event windows and team counts vary by region, so a single headline date should not be treated as a universal HoK schedule.',
    ],
    playerFocusHeading: 'Season pass, device requirements and fair play',
    playerFocus: [
      'Check the in-game Season 16 progression and event center for local pass rewards, reset timing and server-specific availability. The official public patch listing does not show an account-specific pass inventory.',
      'Read the minimum iOS version notice before updating. Keep the client current and avoid unauthorized macros or tools; Honor of Kings has published an anti-cheat update alongside the season patch.',
    ],
    competitionHeading: 'Honor of Kings esports schedule',
    competition: ['The global esports hub lists regional leagues and official grassroots events separately; dates and qualification rules are event-specific.', 'The 2026 Asian Games esports window concluded on 2 October. Check the HoK official event hub for the next confirmed global event and any current bracket.'],
    sources: [
      { name: 'Honor of Kings — official game news', url: 'https://www.honorofkings.com/' },
      { name: 'Honor of Kings — official esports calendar', url: 'https://www.honorofkings.com/esports/' },
      { name: 'Olympic Council of Asia — Asian Games esports', url: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html' },
    ],
    faqs: [
      { question: 'What is the current Honor of Kings season?', answer: 'The official site lists Season 16: Flow As One patch notes dated 22 September 2026.' },
      { question: 'Where can I find Honor of Kings tournament dates?', answer: 'Use the official esports hub, which separates global events, regional professional leagues and grassroots events.' },
    ],
  },
  {
    gameId: 'brawl_stars', title: 'Brawl Stars News: Brawl-O-Ween, Balance & World Finals | Tradivex',
    description: 'Brawl Stars October 2026 update: Brawl-O-Ween and Royal Academy pass skins, September balance changes and November World Finals format.',
    heading: 'Brawl Stars News: Brawl Pass, Balance and World Finals',
    intro: 'Supercell’s September release notes list two themed pass seasons, balance changes and a 16 September maintenance patch. The World Finals are scheduled for November, with a published 12-team format and prize pool.',
    updateHeading: 'Royal Academy and Brawl-O-Ween seasons arrive with balance tuning', updateDate: '2 October 2026',
    update: [
      'Supercell’s 1 September notes list the Royal Academy season and Brawl-O-Ween cosmetics in the Brawl Pass, with Hank and Nani-themed rewards for Royal Academy and Fortune Teller P / Shade items for Brawl-O-Ween. A 16 September maintenance update nerfed Shade, Gus, El Primo and Amber in specified ways.',
      'The 19 September Brawl Stars x Duolingo event ran through 30 September. Its community tasks and reward window are over by this update date; check the in-game news panel for the currently active season event rather than expecting expired collaboration rewards.',
    ],
    playerFocusHeading: 'Brawl Pass, balance and ranked preparation',
    playerFocus: [
      'The Brawl Pass changes by season. Confirm the active pass, reward claims and season timer in the client; the September release note includes more than one themed season and their cosmetics.',
      'Shade’s Super charge and Gadget values, Gus cooldown/healing and El Primo’s Asteroid Belt were adjusted in the 16 September maintenance. Recheck builds and map picks against the latest client balance.',
    ],
    competitionHeading: 'Brawl Stars World Finals 2026',
    competition: ['World Finals: 20–22 November in Tokyo, 12 teams, $1 million prize pool.', 'Format: two GSL groups of four; top two from each join four regional leaderboard leaders in an eight-team double-elimination bracket. Grand Final is best-of-seven.'],
    sources: [
      { name: 'Supercell — September 2026 Brawl Stars release notes', url: 'https://supercell.com/en/games/brawlstars/blog/release-notes/release-notes-august-2026/' },
      { name: 'Supercell — Brawl Stars x Duolingo event', url: 'https://supercell.com/en/games/brawlstars/blog/community/brawl-stars-x-duolingo/' },
      { name: 'Brawl Stars Esports — World Finals format', url: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/' },
    ],
    faqs: [
      { question: 'When are Brawl Stars World Finals 2026?', answer: 'Supercell lists 20–22 November in Tokyo, with 12 teams and a $1 million prize pool.' },
      { question: 'Which Brawlers were adjusted in the September hotfix?', answer: 'The 16 September notes list balance changes for Shade, Gus, El Primo and Amber. Read the linked notes for individual Gadget and ability values.' },
    ],
  },
  {
    gameId: 'clash_of_clans', title: 'Clash of Clans News: October Gold Pass, Totem Thrower & LCQ | Tradivex',
    description: 'Clash of Clans October 2026 guide: Cosmic Curse, Totem Thrower, Shroud Queen Gold Pass, October Clan War League and World Championship LCQ.',
    heading: 'Clash of Clans News: September Update and Gold Pass',
    intro: 'The September update adds a temporary Yeti Undertaker troop, more Diggy levels and new Town Hall 18 Supercharges. It also moves Gold Pass and Season Challenges access down to Town Hall 3, changing early account progression.',
    updateHeading: 'October Clash-O-Ween adds Totem Thrower and a new Gold Pass', updateDate: '2 October 2026',
    update: [
      'Supercell’s 1 October Clash-O-Ween announcement starts Cosmic Curse: Portal Panic for the month. The new temporary Totem Thrower attacks ground targets from range; every fourth attack throws a totem that stuns nearby defenses and creates a decoy. The event also schedules October Clan War League for 1–11 October and Clan Games for 22–28 October.',
      'The October Gold Pass includes Shroud Queen as its exclusive Hero Skin, with Ghost Champion as the alternate option named by Supercell. The September WWE event and its Yeti Undertaker temporary troop ended on 1 October, so those rewards should no longer be described as current.',
    ],
    playerFocusHeading: 'Gold Pass value, Town Hall and upgrade timing',
    playerFocus: [
      'Gold Pass rewards and seasonal event tasks reset monthly. Check the October event panel for current challenge deadlines and the in-game Gold Pass track for its full reward list; Supercell’s announcement highlights Shroud Queen and the alternate Ghost Champion skin.',
      'Gold Pass progression uses daily tasks, Stamp Cards and choice nodes after the 2026 rework. Tasks stack to make catch-up possible, but unclaimed choice rewards may default at season end, so collect them before 31 October.',
    ],
    competitionHeading: 'Clash of Clans World Championship 2026',
    competition: ['The official guide confirms an October Last Chance Qualifier: eight highest-ranked unqualified teams compete for the final three Golden Tickets.', 'Supercell has not listed exact LCQ match dates in the guide checked. The World Championship season prize pool is $1 million; the LCQ is not itself the full prize pool.'],
    sources: [
      { name: 'Supercell Support — Clash of Clans September 2026 update', url: 'https://support.supercell.com/clash-of-clans/en/articles/whats-new-september-2026.html' },
      { name: 'Supercell — Cosmic Curse: Portal Panic October season', url: 'https://supercell.com/en/games/clashofclans/blog/news/cosmic-curse-portal-panic-teleports-in/' },
      { name: 'Supercell — Gold Pass changes', url: 'https://supercell.com/en/games/clashofclans/blog/news/big-changes-are-coming-to-gold-pass/' },
      { name: 'Clash of Clans World Championship — how to compete', url: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete' },
    ],
    faqs: [
      { question: 'What is the Clash of Clans October Gold Pass skin?', answer: 'Supercell’s October season announcement names Shroud Queen as the exclusive Hero Skin and Ghost Champion as an alternate skin option.' },
      { question: 'When is the Clash of Clans 2026 Last Chance Qualifier?', answer: 'Supercell confirms an October LCQ, but the official guide checked does not give exact match dates.' },
    ],
  },
  {
    gameId: 'clash_royale', title: 'Clash Royale News: September Balance & Merge Tactics | Tradivex',
    description: 'Clash Royale October 2026 update: September balance changes, Minion Academy season, Merge Tactics Season 11 and current Pass Royale checks.',
    heading: 'Clash Royale News: September Balance and October Season',
    intro: 'Supercell’s current Clash Royale hub highlights September balance changes and Merge Tactics Season 11’s October changes. These updates affect different modes, so card-battle ladder notes and Merge Tactics rules should not be mixed.',
    updateHeading: 'September balance changes and Merge Tactics Season 11', updateDate: '2 October 2026',
    update: [
      'Supercell’s 23 September balance post lists the 16 September changes: Hero Ice Wizard freeze duration fell from 7 to 5 seconds, Goblinstein ability duration from 4 to 3.5 seconds, and Minion Giant damage from 189 to 168. Fire Spirit damage rose from 207 to 215. The 8 September wave also adjusted Hero Balloon, Battle Ram Evolution, Elite Barbarians Evolution, Freeze, Fireball, Ice Golem and Zappies, among others.',
      'Supercell’s 30 September Merge Tactics Season 11 post says October changes took effect on 1 October: Monthly Supers move to the shared pool, players start with a random 2-Elixir troop, and Elixir per round drops from 5 to 4. These are Merge Tactics rules, separate from standard Clash Royale card-battle balance.',
    ],
    playerFocusHeading: 'Pass Royale, balance and mode-specific rewards',
    playerFocus: [
      'Pass Royale now offers reward choices and guaranteed seasonal Hero Fragments in the free track, per Supercell’s 2026 progression update. Compare the current in-game reward options instead of following old advice that assumes the former pass layout.',
      'Clash Royale and Merge Tactics have distinct season content. Check which mode a balance or leaderboard post applies to before using it for deck or placement decisions.',
    ],
    competitionHeading: 'Clash Royale League status',
    competition: ['Supercell’s CRL 2026 Last Chance Qualifier ran 5–6 September; the official event site lists Woo as winner.', 'As of 2 October, Supercell’s event page says more events are coming but does not announce the next live CRL date. In-game Global Tournaments are separate limited-time competitions.'],
    sources: [
      { name: 'Supercell — Clash Royale September balance changes', url: 'https://supercell.com/en/games/clashroyale/blog/release-notes/september-balance-changes-2027/' },
      { name: 'Supercell — Merge Tactics Season 11 October changes', url: 'https://supercell.com/en/games/clashroyale/blog/release-notes/merge-tactics-season-11-october-changes/' },
      { name: 'Supercell — Clash Royale official news', url: 'https://supercell.com/en/games/clashroyale/' },
      { name: 'Clash Royale League 2026 event site', url: 'https://event.supercell.com/clashroyale/en' },
    ],
    faqs: [
      { question: 'Where are the Clash Royale September balance details?', answer: 'Supercell published the September balance changes on 23 September 2026; open the official blog post for the full card list and exact numbers.' },
      { question: 'Is Merge Tactics Season 11 the same as Clash Royale ladder season?', answer: 'No. Merge Tactics is a separate mode with its own season changes and balance. Check the article category and in-game mode before applying advice.' },
    ],
  },
  {
    gameId: 'genshin', title: 'Genshin Impact News: Version 7.1, Moonchase & Events | Tradivex',
    description: 'Genshin Impact Version 7.1 player update: Moonchase event-exclusive Silver Light sword, Primogems, new character notices and creator contest.',
    heading: 'Genshin Impact News: Version 7.1 and Moonchase',
    intro: 'Genshin Impact’s Version 7.1 “A Requiem for the Underworld” preview and the Moonchase event are the key September–October player updates. This is an action RPG with timed in-game events rather than an official esports tournament circuit.',
    updateHeading: 'Moonchase event offers the Silver Light sword', updateDate: '2 October 2026',
    update: [
      'HoYoverse’s 22 September event overview says “Silverwing in Pursuit of the Moon” begins 24 September at 10:00 server time. Completing event quests can award the event-exclusive Silver Light sword, Primogems, Crown of Insight and other materials.',
      'HoYoverse’s news page also lists the Version 7.1 “A Requiem for the Underworld” Phase I events preview, character trailers for Vesna and Vodyanitsa, and a Miliastra Wonderland creator contest published on 23 September. Check the in-game Events menu for each server’s remaining claim window and banner schedule.',
    ],
    playerFocusHeading: 'Primogems, event weapon and banner timing',
    playerFocus: [
      'Prioritize event tasks that award Silver Light and its refinement materials before the event timer closes. Event weapon acquisition is time-limited; the official overview lists the reward but the in-game event page shows your remaining progress.',
      'Character banners and event end times can vary by server time zone. Use the in-game Wish and Events screens for the exact local countdown rather than converting a social post manually.',
    ],
    competitionHeading: 'Competitive status',
    competition: ['No official publisher-run Genshin Impact esports tournament schedule was found in HoYoverse’s official news pages checked.', 'HoYoverse creator contests and community events are not represented as pro esports tournaments.'],
    sources: [
      { name: 'HoYoverse — Genshin Impact official news', url: 'https://genshin.hoyoverse.com/en/news/396' },
      { name: 'HoYoverse — Version 7.1 Events Preview', url: 'https://genshin.hoyoverse.com/en/news' },
      { name: 'Genshin Impact official events', url: 'https://genshin.hoyoverse.com/en/news' },
    ],
    faqs: [
      { question: 'How do I get the Genshin Impact Silver Light weapon?', answer: 'HoYoverse says players can obtain Silver Light by completing the “Silverwing in Pursuit of the Moon” event quests; check the in-game event page for current progress and deadline.' },
      { question: 'Does Genshin Impact have an official esports league?', answer: 'No publisher-run esports tournament schedule was found in HoYoverse’s official news pages checked for this update.' },
    ],
  },
  {
    gameId: 'stumble_guys', title: 'Stumble Guys News: Cursed Fair Season & Ranked 2026 | Tradivex',
    description: 'Stumble Guys October 2026 player guide: v0.103 Cursed Fair season, Ranked Season 26 end, Clubs Season 15, new Bumper Field ability and events.',
    heading: 'Stumble Guys News: Cursed Fair and Ranked Seasons',
    intro: 'The official Stumble Guys news feed now lists version 0.103.0, the Cursed Fair season, after the September 0.102.0 Live, Laugh, Lava Land update. Ranked Season 26 ended on 1 October, while Clubs Season 15 continues through 15 October.',
    updateHeading: 'v0.103.0 Cursed Fair follows the September anniversary season', updateDate: '2 October 2026',
    update: [
      'Scopely’s current News & Tips page lists 0.103.0 Patch Notes — Cursed Fair Season as the newest update. The preceding 0.102.0 season added Bumper Field, improved ability/emote equipping, Ranked Season 26 and a September anniversary campaign.',
      'The 0.102.0 notes set Ranked Season 26 for 3 September–1 October and Clubs Season 15 for 17 September–15 October. That means the ranked reward window has closed, but the Clubs season is still active as of this page date. Check the client for the 0.103.0 season’s exact ranked dates and reward track.',
    ],
    playerFocusHeading: 'Ranked reward, Clubs season and Stumble Pass',
    playerFocus: [
      'The Amber King reward was tied to reaching Champion in Ranked Season 26; that season ended 1 October. Do not assume its reward remains obtainable after the end date.',
      'Clubs Season 15 is listed through 15 October with Aurora Candlekin as its exclusive reward. Open the in-game Clubs page for your team’s goals and the current Stumble Pass progress.',
    ],
    competitionHeading: 'Official player tournaments',
    competition: ['September Crown Tournament ran 17–24 September; its Top 100 reward window is complete.', 'Scopely’s 0.103.0 news feed is the current source for new challenges, leaderboards and any October tournament dates. No future exact bracket dates are added until posted.'],
    sources: [
      { name: 'Stumble Guys — official News & Tips', url: 'https://www.stumbleguys.com/news-and-tips' },
      { name: 'Scopely — 0.102.0 season and event notes', url: 'https://communityhub.stumbleguys.com/news/update102' },
      { name: 'Stumble Guys — 6 Days of Stumble', url: 'https://www.stumbleguys.com/news/6-days-of-stumble' },
    ],
    faqs: [
      { question: 'Is Stumble Guys Ranked Season 26 still active?', answer: 'No. The official 0.102.0 notes list Ranked Season 26 from 3 September through 1 October 2026.' },
      { question: 'Which Stumble Guys season is active in October?', answer: 'The official news page lists version 0.103.0 Cursed Fair as the current update. Check its in-game season panel for exact pass and ranked dates.' },
    ],
  },
  {
    gameId: 'among_us', title: 'Among Us News: Influencer Ghost Role & Impostor Month | Tradivex',
    description: 'Among Us October 2026 update: v19.0.0 adds the Influencer ghost Crewmate role, with Impostor Month beginning and official patch details.',
    heading: 'Among Us News: Influencer Role and Impostor Month',
    intro: 'Innersloth shipped Among Us v19.0.0 on 29 September, adding the Influencer ghost role. The developer’s next-day post announces Impostor Month, so players should check new monthly tasks and event rewards in the official update feed.',
    updateHeading: 'v19.0.0 adds the Influencer ghost role', updateDate: '2 October 2026',
    update: [
      'Innersloth’s 29 September patch notes say v19.0.0 is available on all platforms and introduces the Influencer as a new Ghost Crewmate role. The role gives eliminated Crewmates a way to communicate information about the Impostor; the full ability rules and any lobby settings are in the linked dev log.',
      'On 1 October, Innersloth announced “Impostor Month Begins!” Check the official post and in-game event panel for the monthly challenges, claim windows and cosmetics. The public announcement headline did not include a full reward schedule in the page summary checked.',
    ],
    playerFocusHeading: 'Role settings, lobby compatibility and event rewards',
    playerFocus: [
      'Update the game to v19.0.0 on every player’s device before a private lobby. Confirm that the host has enabled the role and reviewed its settings; new roles can change how a group’s meeting rules play out.',
      'Impostor Month is a limited-time event. Check the current task list and claim rewards before the event closes; Innersloth’s dev log is the official place for fixes and role clarifications.',
    ],
    competitionHeading: 'Community play',
    competition: ['Innersloth has not published a current official Among Us esports tournament calendar.', 'Among Us is primarily social deduction and creator/community play; individual creator tournaments have their own lobby rules and prizes.'],
    sources: [
      { name: 'Innersloth — Among Us official news and dev logs', url: 'https://www.innersloth.com/news/' },
      { name: 'Among Us official site', url: 'https://www.innersloth.com/games/among-us/' },
    ],
    faqs: [
      { question: 'What new role came to Among Us in v19.0.0?', answer: 'Innersloth says v19.0.0 adds the Influencer, a new Ghost Crewmate role. Review the full dev log and lobby settings for the exact ability rules.' },
      { question: 'What is Among Us Impostor Month?', answer: 'It is Innersloth’s October event announcement. Check the official news feed and in-game panel for current challenges and reward deadlines.' },
    ],
  },
  {
    gameId: 'gta_online', title: 'GTA Online News: October Halloween Events & Weekly Bonuses | Tradivex',
    description: 'GTA Online October 2026 update: Rockstar confirms Halloween thrills throughout October; check weekly bonuses, GTA+ and limited-time rewards.',
    heading: 'GTA Online News: October Halloween Events and Weekly Updates',
    intro: 'Rockstar’s 1 October Newswire post announces Halloween thrills throughout October in GTA Online. GTA Online changes weekly, so this page distinguishes the month-long theme from each week’s exact bonuses and GTA+ benefits.',
    updateHeading: 'Halloween thrills arrive throughout October', updateDate: '2 October 2026',
    update: [
      'Rockstar’s 1 October Newswire listing confirms Halloween content throughout October. Its public headline does not provide every weekly activity, payout multiplier or reward deadline; open the linked article and in-game Newswire for the current week’s full list.',
      'The latest September items included GTA+ early access to the Pegassi Horus and the Business Rivalries event. Those are dated promotions; do not assume a past vehicle or bonus remains claimable after its week ends.',
    ],
    playerFocusHeading: 'Weekly bonuses, GTA+ and limited-time rewards',
    playerFocus: [
      'Check Rockstar’s weekly Newswire on Thursday and the GTA+ benefits page before planning a grind. Multipliers, free vehicles, discounts and claim windows rotate and can be platform-specific.',
      'Halloween modes and collectibles are time-limited. Confirm the current reward condition and event end date in the official article before spending in-game currency or starting a long collection route.',
    ],
    competitionHeading: 'GTA Online competitive events',
    competition: ['Rockstar’s official Newswire checked lists activities and limited-time events, not a current publisher-run GTA Online esports championship schedule.', 'Weekly races and adversary modes are in-game activities, not professional esports leagues.'],
    sources: [
      { name: 'Rockstar Games Newswire — GTA Online', url: 'https://www.rockstargames.com/newswire' },
      { name: 'Rockstar Games — GTA Online news archive', url: 'https://www.rockstargames.com/gta-online/newswire' },
    ],
    faqs: [
      { question: 'What is happening in GTA Online in October 2026?', answer: 'Rockstar’s 1 October Newswire post announces Halloween thrills throughout October. Check the full post for this week’s modes, rewards and exact dates.' },
      { question: 'Are GTA Online weekly races esports tournaments?', answer: 'No. Weekly races and adversary modes are live-service activities; Rockstar’s Newswire checked did not list a current official esports championship.' },
    ],
  },
];

export const GAME_NEWS_BY_ID = new Map(GAME_NEWS_PAGES.map((page) => [page.gameId, page]));
export const GAME_NEWS_INDEX = POPULAR_GAMES.filter((game) => GAME_NEWS_BY_ID.has(game.id));

