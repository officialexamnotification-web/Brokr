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

export const TOURNAMENT_NEWS: TournamentNews[] = [
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
