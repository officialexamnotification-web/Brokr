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
    sourceUrl: 'https://esports.pubgmobile.kr/en/news/208', sourceName: 'PUBG MOBILE Esports Korea', updatedAt: '2026-10-05',
    summary: 'PMPS Korea Season 2 began on 3 October. Circuit play resumes 9 October; the Finals are 17–18 October. Its winner qualifies for PMGC 2026 and the top three for BMIC, subject to the duplicate-slot rule.',
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
    sourceUrl: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know', sourceName: 'VALORANT Esports', updatedAt: '2026-10-05',
    summary: 'The group stage ended 4 October. Eight teams advance to double-elimination playoffs on 7–18 October; Riot lists 5–6 October as dark days between stages.',
  },
  {
    id: 'valorant-game-changers-americas-lcq-2026', slug: 'valorant-game-changers-americas-lcq-2026', gameId: 'valorant', gameName: 'VALORANT',
    name: 'Game Changers Americas Last Chance Qualifier 2026', organizer: 'Riot Games', startDate: '2026-10-14', endDate: '2026-10-15', dateLabel: '14–15 Oct 2026',
    region: 'Americas', location: 'Riot Games Arena, São Paulo, Brazil', teams: 3,
    format: 'Three-team round robin Bo3 on 14 Oct; top two advance to a Bo5 final on 15 Oct', status: 'upcoming',
    sourceUrl: 'https://valorantesports.com/en-US/news/eyntk-gc-americas-lcq-2026', sourceName: 'VALORANT Esports', updatedAt: '2026-10-07',
    summary: 'Riot’s 6 October guide names MIBR, Akave Esports Black and FlyQuest RED. Matches start 14 October at 11:00 AM PT; the final is 15 October at 1:00 PM PT. The winner claims the final Americas place at Game Changers Championship São Paulo (22 Oct–1 Nov).',
  },
  {
    id: 'valorant-game-changers-championship-2026', slug: 'valorant-game-changers-championship-2026', gameId: 'valorant', gameName: 'VALORANT',
    name: 'VALORANT Game Changers Championship 2026', organizer: 'Riot Games', startDate: '2026-10-22', endDate: '2026-11-01', dateLabel: '22 Oct – 1 Nov 2026',
    region: 'Global', location: 'São Paulo, Brazil',
    format: 'Global championship; field and full match schedule are on Riot’s official event pages', status: 'upcoming',
    sourceUrl: 'https://valorantesports.com/en-US/news/eyntk-gc-americas-lcq-2026', sourceName: 'VALORANT Esports', updatedAt: '2026-10-07',
    summary: 'Riot’s 6 October LCQ guide confirms the Championship dates in São Paulo. The Americas LCQ winner takes the fourth Americas qualification place; consult the live Riot event page for the complete global field and match schedule.',
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
    sourceUrl: 'https://blast.tv/cs/tournaments/pgl-singapore-major-2026', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-10-07',
    summary: 'PGL’s official event listing confirms a 32-team Major in Singapore from 25 November to 13 December, with a $1.25 million prize pool.',
  },
  {
    id: 'cs2-iem-beijing-2026', slug: 'cs2-iem-beijing-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'IEM Beijing 2026', organizer: 'ESL', startDate: '2026-11-02', endDate: '2026-11-08', dateLabel: '2–8 Nov 2026',
    region: 'Global', location: 'Beijing, China', prizePool: '$1,250,000', teams: 16,
    format: 'Four stages: groups, playoffs and third-place playoff', status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments/iem-china-2026', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-10-07',
    summary: 'The official event listing confirms 16 teams, a $1.25 million prize pool and the 2–8 November dates in Beijing. Match times and broadcast details may change; use the organizer event page for the live bracket.',
  },
  {
    id: 'cs2-blast-rivals-hk-2026', slug: 'cs2-blast-rivals-hk-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'BLAST Premier Rivals Hong Kong 2026', organizer: 'BLAST', startDate: '2026-11-11', endDate: '2026-11-15', dateLabel: '11–15 Nov 2026',
    region: 'Global', location: 'Hong Kong', prizePool: '$1,000,000', teams: 8,
    format: 'Eight teams; group stage and playoffs', status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments/rivals-2026-season-2', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-10-07',
    summary: 'BLAST lists an eight-team event with a $1 million prize pool from 11–15 November in Hong Kong. Team lineups and further event details remain on the official event page.',
  },
  {
    id: 'fortnite-fncs-solo-october-2026', slug: 'fortnite-fncs-solo-october-2026', gameId: 'fortnite', gameName: 'Fortnite',
    name: 'FNCS Solo Tournament (October 2026)', organizer: 'Epic Games', startDate: '2026-10-05', endDate: '2026-10-27', dateLabel: '5–27 Oct 2026',
    region: 'Regional online competition', location: 'Online; prize amounts and eligibility vary by region', format: 'Solo qualifiers, Heats, Last Chance Qualifier and Finals; official rules list exact rounds', status: 'live',
    sourceUrl: 'https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC', sourceName: 'Fortnite Competitive official rules', updatedAt: '2026-10-07',
    summary: 'Epic’s official FNCS Solos rules schedule Qualifier 2 rounds for 5–6, 10 and 11 October, Heats for 17–18 October, Last Chance Qualifier for 19–20 October and Finals for 26–27 October. The solo event has regional leaderboards and prizes; use the rules for region-specific eligibility and award amounts.',
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
    sourceUrl: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive', sourceName: 'EA SPORTS FC Pro', updatedAt: '2026-10-05',
    summary: 'The Open Ladder ended 3 October. EA lists 1,376 advancing players across ten regions; Regional Qualifiers are scheduled for 10–11 October, followed by the Global Qualifier on 5–7 November.',
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
    sourceUrl: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html', sourceName: 'Olympic Council of Asia', updatedAt: '2026-10-05',
    summary: 'The scheduled Asian Games esports window, 23 September–2 October at Aichi Sky Expo, has ended. The linked OCA notice includes Honor of Kings but does not publish a separate result or match-by-match schedule.',
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
    id: 'brawl-stars-october-event-weekend-2026', slug: 'brawl-stars-october-event-weekend-2026', gameId: 'brawl_stars', gameName: 'Brawl Stars',
    name: 'Brawl Stars Championship broadcast weekend', organizer: 'Supercell', startDate: '2026-10-17', endDate: '2026-10-18', dateLabel: '17–18 Oct 2026',
    region: 'Global', location: 'Online broadcast',
    format: 'Two broadcast days; match title and full schedule are shown on the official event hub', status: 'upcoming',
    sourceUrl: 'https://event.supercell.com/brawlstars/en/', sourceName: 'Brawl Stars Championship', updatedAt: '2026-10-07',
    summary: 'Supercell’s live Championship hub lists Day 1 on 17 October and Day 2 on 18 October, both at 05:00 UTC. It does not show the event name or matchups in the public schedule snapshot; check the hub for the live details.',
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
  {
    id: 'marvel-rivals-ignite-stage-2-2026', slug: 'marvel-rivals-ignite-stage-2-2026', gameId: 'marvel_rivals', gameName: 'Marvel Rivals',
    name: 'Marvel Rivals Ignite 2026 Stage 2 Playoffs', organizer: 'NetEase / Marvel Rivals Esports', startDate: '2026-10-08', endDate: '2026-10-18', dateLabel: '8–18 Oct 2026',
    region: 'Global: Pacific, Americas, EMEA and China', location: 'Online regional playoffs', prizePool: '$650,000', teams: 12,
    format: 'Regional double-elimination playoffs; BO5 matches, BO7 regional finals', status: 'upcoming',
    sourceUrl: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html', sourceName: 'Marvel Rivals Ignite', updatedAt: '2026-10-07',
    summary: 'Official Stage 2 guide schedules playoffs for 8–18 October. Pacific plays first; Americas and EMEA begin 15 October, China begins 16 October, and regional finals are 11 October (Pacific) and 18 October (Americas, EMEA and China). Twelve teams qualify for the late-November Grand Finals; venue/date are still to be announced.',
  },
  {
    id: 'marvel-rivals-ignite-grand-finals-2026', slug: 'marvel-rivals-ignite-grand-finals-2026', gameId: 'marvel_rivals', gameName: 'Marvel Rivals',
    name: 'Marvel Rivals Ignite 2026 Grand Finals', organizer: 'NetEase / Marvel Rivals Esports',
    dateLabel: 'Late November 2026; exact dates and location pending', region: 'Global', location: 'Venue to be announced', teams: 12,
    format: 'Twelve teams qualify from Ignite regional competitions; full finals format pending', status: 'upcoming',
    sourceUrl: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html', sourceName: 'Marvel Rivals Ignite', updatedAt: '2026-10-07',
    summary: 'The official Stage 2 guide confirms 12 Grand Finals teams and says the finals location will be announced later. The official 2026 circuit overview places Stage 2 and its Grand Finals in late November; exact dates, venue and match schedule are not yet confirmed.',
  },
  {
    id: 'aov-10fest-winter-finals-2026', slug: 'aov-10fest-winter-finals-2026', gameId: 'arena_of_valor', gameName: 'Arena of Valor',
    name: 'Arena of Valor 10Fest — Winter 2026 Finals', organizer: 'Garena Liên Quân Mobile', startDate: '2026-11-07', endDate: '2026-11-07', dateLabel: '7 Nov 2026',
    region: 'Vietnam', location: 'My Dinh National Stadium, Hanoi',
    format: 'Đấu Trường Danh Vọng (Arena of Glory) Winter 2026 Grand Final; matchup details pending', status: 'upcoming',
    sourceUrl: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/', sourceName: 'Garena Liên Quân Mobile', updatedAt: '2026-10-07',
    summary: 'Garena’s official 10Fest announcement schedules the Đấu Trường Danh Vọng Winter 2026 Grand Final for 7 November at My Dinh National Stadium in Hanoi, as part of AoV’s tenth-anniversary event. The opponent names and match start time were not specified in the announcement.',
  },
  {
    id: 'aov-aic-2026', slug: 'aov-aic-2026', gameId: 'arena_of_valor', gameName: 'Arena of Valor',
    name: 'Arena of Valor International Championship 2026', organizer: 'Garena', dateLabel: 'Year-end 2026 in Thailand; exact dates pending',
    region: 'International', location: 'Thailand', format: 'Year-end international championship; teams and format pending', status: 'upcoming',
    sourceUrl: 'https://www.garena.sg/news/2M54DC', sourceName: 'Garena', updatedAt: '2026-10-07',
    summary: 'Garena confirms AIC 2026 as a year-end championship in Thailand. The linked official announcement does not yet give exact dates, team count, format, prize pool or match schedule; those fields are left open until the organizer publishes them.',
  },
  {
    id: 'tft-tacticians-superbrawl-2026', slug: 'tft-tacticians-superbrawl-2026', gameId: 'teamfight_tactics', gameName: 'Teamfight Tactics',
    name: 'TFT Tactician’s Superbrawl — Set 18', organizer: 'Riot Games', startDate: '2026-11-06', endDate: '2026-11-08', dateLabel: '6–8 Nov 2026',
    region: 'AMER, EMEA and APAC', location: 'Online regional competition', teams: 96,
    format: '96 teams per region; four-player rosters; single-elimination BO3 bracket', status: 'upcoming',
    sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/4v4-arrives-to-compete-tft/', sourceName: 'Riot Games TFT Esports', updatedAt: '2026-10-07',
    summary: 'Riot’s official announcement schedules the open-to-all regional 4v4 team tournament for 6–8 November. Each region has 96 teams in a single-elimination best-of-three bracket. Ladder snapshots are 2 November; exact regional qualifiers and prize breakdown vary and are still to be published.',
  },
  {
    id: 'tft-vegas-open-2026', slug: 'tft-vegas-open-2026', gameId: 'teamfight_tactics', gameName: 'Teamfight Tactics',
    name: 'TFT Vegas Open 2026', organizer: 'Riot Games', startDate: '2026-12-11', endDate: '2026-12-13', dateLabel: '11–13 Dec 2026',
    region: 'Global open bracket', location: 'Las Vegas, Nevada, USA', prizePool: '$311,300', teams: 1024,
    format: 'Three-day open-bracket LAN; 1,024 competitors, eight-player lobbies and checkmate final', status: 'upcoming',
    sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/tft-vegas-open-2026-competitor-info/', sourceName: 'Riot Games TFT Esports', updatedAt: '2026-10-07',
    summary: 'Riot confirms a 1,024-player open bracket at Convergence Fest in Las Vegas from 11–13 December. The top 128 share a $311,300 prize pool, with $100,000 for the champion. The published format uses eight-player lobbies and a checkmate final; Set 19 is planned for the event.',
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
    title: 'PUBG MOBILE Korea PMPS Season 2 is underway in Daejeon',
    excerpt: 'The 16-team season began 3 October. Circuit play resumes 9 October, with Finals on 17–18 October; the winner earns a PMGC place.',
    content: [
      'PUBG MOBILE Esports Korea’s current event notice confirms that PMPS 2026 Season 2 started on 3 October at Daejeon Dream Arena. The 16-team event carries a ₩40 million prize pool.',
      'The first two circuit days were scheduled for 3–4 October. Play resumes on 9 October, with the remaining circuit days on 10–11 October and Finals on 17–18 October at 3 p.m. KST, six matches per day.',
      'The organizer says the season winner qualifies for PMGC 2026 and places 1–3 qualify for BMIC 2026, subject to a duplicate-slot rule. The event is in progress, but the next scheduled match day is 9 October.',
    ],
    tournamentName: 'PUBG MOBILE Pro Series Korea 2026 Season 2', status: 'live', publishedAt: '2026-10-02', updatedAt: '2026-10-05',
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
    title: 'Champions Shanghai groups complete; playoffs start 7 October',
    excerpt: 'The group stage ended 4 October. Eight teams advance to the double-elimination playoffs, which run 7–18 October.',
    content: [
      'Riot’s official event guide schedules Champions Shanghai from 24 September to 18 October. Sixteen teams represent Americas, China, EMEA and Pacific; the group stage concluded on 4 October.',
      'Eight teams advance from the four groups. Playoffs use a double-elimination bracket from 7 October, with the Grand Final listed for 18 October. Riot lists 5–6 October as dark days between stages.',
      'Riot’s live schedule remains the source for confirmed playoff pairings, match results, start times and broadcast changes. This update reflects the published stage calendar and does not report live scores.',
    ],
    tournamentName: 'VALORANT Champions Shanghai 2026', status: 'live', publishedAt: '2026-10-02', updatedAt: '2026-10-05',
    sourceUrl: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know', sourceName: 'VALORANT Esports', sourceVerified: true,
    tags: ['VCT', 'Champions', 'Shanghai', 'Live event'], eventId: 'valorant-champions-shanghai-2026',
  },
  {
    id: 'news-cs2-october-events-2026', slug: 'news-cs2-october-events-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    title: 'CS2 October–November calendar adds Beijing and Hong Kong events',
    excerpt: 'ESL Pro League and PGL Masters Bucharest lead October; IEM Beijing, BLAST Rivals Hong Kong and the Singapore Major follow in November.',
    content: [
      'BLAST.tv’s Counter-Strike calendar lists two October events: ESL Pro League Season 24 in Katowice, Poland (3–11 October), followed by PGL Masters Bucharest in Romania (24–31 October).',
      'PGL’s event page confirms 16 teams and a $1.25 million total prize pool for Bucharest. The event page also describes a group stage, playoffs and third-place match. The calendar page does not expose ESL Pro League’s full team list or detailed format in the listing.',
      'The organizer calendar also confirms IEM Beijing (2–8 November, 16 teams, $1.25 million) and BLAST Premier Rivals Hong Kong (11–15 November, eight teams, $1 million). PGL Singapore Major follows from 25 November to 13 December with 32 teams and a $1.25 million prize pool. Use the individual organizer event pages for brackets and changing match times.',
    ],
    tournamentName: 'CS2 October–November 2026 tournament calendar', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-10-07',
    sourceUrl: 'https://blast.tv/cs/tournaments', sourceName: 'BLAST.tv Counter-Strike', sourceVerified: true,
    tags: ['CS2', 'ESL Pro League', 'PGL', 'October'], eventId: 'cs2-esl-pro-league-s24-2026',
  },
  {
    id: 'news-fortnite-fncs-solos-october-2026', slug: 'news-fortnite-fncs-solos-october-2026', gameId: 'fortnite', gameName: 'Fortnite',
    title: 'FNCS Solos schedule: qualifiers, heats and finals run through 27 October',
    excerpt: 'Epic’s published rules list regional Qualifier 2 rounds on 5–11 October, Heats on 17–18 October, LCQ on 19–20 October and Finals on 26–27 October.',
    content: [
      'Epic’s FNCS schedule update adds a standalone solos tournament after the 2026 Global Championship, in October. Epic says competitors can play online for regional Battle Royale crowns.',
      'Epic’s May schedule announcement confirmed a standalone FNCS solos tournament after the Global Championship. Epic’s official 2026 FNCS Solos rules now publish the regional structure and round dates: Qualifier 2 rounds on 5–6, 10 and 11 October; Heats on 17–18 October; Last Chance Qualifier on 19–20 October; Finals on 26–27 October.',
      'The event is regional and individual, with leaderboard placement and prize details varying by region. The rules list a 60-point Victory Royale and four points per Finals elimination; check the official rules for the region-specific prize schedule, eligibility and scoring.',
    ],
    tournamentName: 'FNCS Solo Tournament (October 2026)', status: 'live', publishedAt: '2026-10-02', updatedAt: '2026-10-07',
    sourceUrl: 'https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC', sourceName: 'Fortnite Competitive official rules', sourceVerified: true,
    tags: ['Fortnite', 'FNCS', 'Solo', 'Qualifier', 'Heats', 'Finals'], eventId: 'fortnite-fncs-solo-october-2026',
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
    title: 'EA FC Pro 27 Open Ladder closes; Regional Qualifiers follow 10–11 October',
    excerpt: 'The ladder ended 3 October. EA says 1,376 players across ten regions advance to the online Regional Qualifiers.',
    content: [
      'EA’s FC Pro 27 season overview sets the in-game Open Ladder window at 21 September–3 October. That ladder has now closed; EA lists 1,376 PlayStation 5 competitors across ten regions advancing to Regional Qualifiers.',
      'The Regional Qualifiers are scheduled online for 10–11 October, followed by the Global Qualifier in London on 5–7 November. The $2.5 million figure in EA’s season announcement applies to the full FC Pro 27 season, not to the ladder alone.',
    ],
    tournamentName: 'EA SPORTS FC Pro 27 Open Ladder', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-10-05',
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
    title: 'Honor of Kings Asian Games esports competition concludes',
    excerpt: 'The Aichi-Nagoya 2026 esports window ran 23 September–2 October; the cited OCA notice does not provide a separate Honor of Kings result.',
    content: [
      'Honor of Kings was included in the official Aichi-Nagoya 2026 Asian Games esports programme. The Olympic Council of Asia’s published schedule sets the esports window for 23 September–2 October at Aichi Sky Expo in Japan; that window has now ended.',
      'The linked OCA notice does not publish a separate Honor of Kings bracket, team list or result. This update therefore marks the scheduled event complete without claiming a match result or medal outcome.',
    ],
    tournamentName: 'Aichi-Nagoya 2026 Asian Games — Honor of Kings', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-10-05',
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
  {
    id: 'news-marvel-rivals-ignite-stage-2-2026', slug: 'news-marvel-rivals-ignite-stage-2-2026', gameId: 'marvel_rivals', gameName: 'Marvel Rivals',
    title: 'Marvel Rivals Ignite Stage 2 Playoffs: dates, format and Grand Finals spots',
    excerpt: 'The official 8–18 October playoffs carry a $650,000 prize pool and decide 12 places at the late-November Ignite Grand Finals.',
    content: [
      'Marvel Rivals Season 10 launched on 11 September. NetEase’s official Ignite Stage 2 guide schedules the regional playoffs from 8 to 18 October 2026, played on Season 10 and using Thebes in the map pool.',
      'The Pacific playoffs start 8 October and its regional final is 11 October. Americas and EMEA playoffs start 15 October, while China starts 16 October; all three regional finals are set for 18 October. Playoffs use double elimination, best-of-five matches and best-of-seven regional finals. The total Stage 2 prize pool is $650,000.',
      'Twelve teams qualify for the Ignite Grand Finals in late November. The official guide says the finals location will be announced later, so the exact venue and dates remain unconfirmed. The game’s in-client Esports panel is the official place for match times, teams and live brackets.',
      'Checked 7 October 2026: the next scheduled playoff day is 8 October for Pacific. This is a competitive schedule update, not a claim that a new game patch was released today.'
    ],
    tournamentName: 'Marvel Rivals Ignite 2026 Stage 2', status: 'upcoming', publishedAt: '2026-10-07', updatedAt: '2026-10-07',
    sourceUrl: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html', sourceName: 'Marvel Rivals Ignite', sourceVerified: true,
    tags: ['Marvel Rivals', 'Ignite 2026', 'Stage 2 Playoffs', 'Grand Finals', 'Season 10'], eventId: 'marvel-rivals-ignite-stage-2-2026',
  },
  {
    id: 'news-arena-of-valor-10fest-aic-2026', slug: 'news-arena-of-valor-10fest-aic-2026', gameId: 'arena_of_valor', gameName: 'Arena of Valor',
    title: 'Arena of Valor esports: 10Fest Winter Finals on 7 November; AIC 2026 in Thailand',
    excerpt: 'Garena schedules the Đấu Trường Danh Vọng Winter Grand Final in Hanoi on 7 November and confirms AIC as a year-end Thailand event; exact AIC dates are pending.',
    content: [
      'Garena’s Arena of Valor portal lists its 18 September 2026 English patch notes as the latest dated English patch entry visible on the official game hub checked. No newer English patch post was listed there on 7 October; regional game clients may show additional localized notices.',
      'The next confirmed event on the Vietnam competitive calendar is Liên Quân 10Fest. Garena’s official event announcement sets the Đấu Trường Danh Vọng (Arena of Glory) Winter 2026 Grand Final for 7 November at My Dinh National Stadium in Hanoi. The announcement does not identify the finalists or match start time.',
      'Garena separately confirms Arena of Valor International Championship 2026 (AIC) as a year-end championship in Thailand. Its exact dates, teams, format, prize pool and daily schedule have not been published in the linked announcement. AIC is a distinct AoV competition and should not be merged with Honor of Kings event listings.',
      'Checked 7 October 2026: no newer official AIC schedule detail was found in Garena’s linked announcement. We will show the confirmed location and time window without inventing dates or teams.'
    ],
    tournamentName: 'Arena of Valor 2026 esports calendar', status: 'upcoming', publishedAt: '2026-10-07', updatedAt: '2026-10-07',
    sourceUrl: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/', sourceName: 'Garena Liên Quân Mobile', sourceVerified: true,
    tags: ['Arena of Valor', 'AoV esports', 'Liên Quân Mobile', 'AIC 2026', '10Fest', 'Arena of Glory'], eventId: 'aov-10fest-winter-finals-2026',
  },
  {
    id: 'news-teamfight-tactics-esports-fall-2026', slug: 'news-teamfight-tactics-esports-fall-2026', gameId: 'teamfight_tactics', gameName: 'Teamfight Tactics',
    title: 'TFT esports calendar: Tactician’s Superbrawl and Vegas Open dates',
    excerpt: 'Riot’s 4v4 Tactician’s Superbrawl runs 6–8 November; the 1,024-player TFT Vegas Open follows 11–13 December with $311,300 in prizes.',
    content: [
      'Riot’s Enchanted Wilds Pro Circuit schedule listed the Blossom Cup for 2–4 October; that cup is complete. The next confirmed global participation event is Tactician’s Superbrawl, an official 4v4 team tournament open to players in AMER, EMEA and APAC.',
      'Tactician’s Superbrawl runs 6–8 November. Riot specifies 96 teams per region, four players per roster and a single-elimination best-of-three bracket. The ladder snapshot is 2 November; region-specific qualification details and prize breakdown are still pending on Riot’s regional channels.',
      'The TFT Vegas Open returns as a 1,024-player open-bracket LAN from 11–13 December in Las Vegas. Riot lists a $311,300 prize pool, with $100,000 for the champion and awards for the top 128. Its format uses eight-player lobbies and a checkmate final. Riot says competitors will play Set 19.',
      'Checked 7 October 2026: the official TFT esports hub provides the current event announcements and regional schedules. Check Riot’s current rules and regional channels before relying on local qualification instructions.'
    ],
    tournamentName: 'Teamfight Tactics esports 2026', status: 'upcoming', publishedAt: '2026-10-07', updatedAt: '2026-10-07',
    sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/4v4-arrives-to-compete-tft/', sourceName: 'Riot Games TFT Esports', sourceVerified: true,
    tags: ['Teamfight Tactics', 'TFT esports', 'Tactician’s Superbrawl', 'TFT Vegas Open', 'Set 18', 'Set 19'], eventId: 'tft-tacticians-superbrawl-2026',
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
  { gameId: 'bgmi', gameName: 'BGMI', url: 'https://esports.battlegroundsmobileindia.com/', sourceName: 'KRAFTON India Esports', note: 'BMSD is live 22 Sep–18 Oct; BMIC is announced for 30 Oct–1 Nov. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'pubg', gameName: 'PUBG Mobile', url: 'https://esports.pubgmobile.kr/en/events', sourceName: 'PUBG MOBILE Esports Korea', note: 'PMPS Season 2 began 3 Oct; circuit resumes 9 Oct and Finals are 17–18 Oct. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'freefire', gameName: 'Free Fire', url: 'https://ff.garena.com/en/article/1605/', sourceName: 'Garena Free Fire', note: 'Official 2026 roadmap confirms FFWS Global Finals from 6 Nov in Bangkok; daily schedule pending. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'valorant', gameName: 'VALORANT', url: 'https://valorantesports.com/en-US/news/eyntk-gc-americas-lcq-2026', sourceName: 'Riot Games VALORANT Esports', note: 'Checked 7 Oct 2026: Champions playoffs start 7 Oct; Game Changers Americas LCQ runs 14–15 Oct in São Paulo, ahead of the Championship on 22 Oct–1 Nov.', checkedAt: '2026-10-07' },
  { gameId: 'cod', gameName: 'Call of Duty', url: 'https://www.callofdutyleague.com/en-us/schedule?stage=entire-season', sourceName: 'Call of Duty League', note: 'The 2026 CDL season and Championship ended 19 Jul. COD Mobile and Warzone have separate schedules; no common series assumed. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'cs2', gameName: 'Counter-Strike 2', url: 'https://blast.tv/cs/tournaments', sourceName: 'BLAST.tv Counter-Strike', note: 'Checked 7 Oct 2026: October lists ESL Pro League S24 and PGL Masters Bucharest; November adds IEM Beijing, BLAST Premier Rivals Hong Kong and PGL Singapore Major. Use each event page for the live bracket.', checkedAt: '2026-10-07' },
  { gameId: 'fortnite', gameName: 'Fortnite', url: 'https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC', sourceName: 'Epic Games Fortnite Competitive', note: 'Epic lists Qualifier 2 on 5–6, 10 and 11 Oct; Heats on 17–18 Oct; LCQ on 19–20 Oct; and Finals on 26–27 Oct. Checked 7 Oct 2026.', checkedAt: '2026-10-07' },
  { gameId: 'apex', gameName: 'Apex Legends', url: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview', sourceName: 'EA Apex Legends Global Series', note: 'Split 2 Pro League runs through 4 Oct; 40-team Playoffs are 29 Oct–1 Nov in Las Vegas. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'minecraft', gameName: 'Minecraft', url: 'https://www.minecraft.net/en-us/live', sourceName: 'Minecraft Official', note: 'Official page checked for publisher events; it lists Minecraft Live, not an official esports tournament calendar. Community competitions are separate. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'roblox', gameName: 'Roblox', url: 'https://about.roblox.com/newsroom/2026/09/roblox-fall-games-preview', sourceName: 'Roblox Newsroom', note: 'September preview mentions one experience-level Showdown Cup, not a platform-wide pro league. Exact dates/results were not provided. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'league', gameName: 'League of Legends', url: 'https://lolesports.com/en-US', sourceName: 'Riot Games LoL Esports', note: 'Regional splits continue into October; Worlds runs 15 Oct–14 Nov. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'rocket_league', gameName: 'Rocket League', url: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League Esports', note: 'RLCS World Championship ended 20 Sep; the official schedule is checked for the next dated events. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'overwatch', gameName: 'Overwatch 2', url: 'https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/', sourceName: 'Blizzard Overwatch Esports', note: 'OWCS Stage 3 regular season starts 10 Oct; playoffs are scheduled for 30 Oct–1 Nov. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'rainbow_six', gameName: 'Rainbow Six Siege', url: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege', sourceName: 'Ubisoft R6 Esports', note: 'BLAST R6 Major Osaka is scheduled for 7–15 Nov. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'destiny2', gameName: 'Destiny 2', url: 'https://help.bungie.net/hc/en-us/articles/360049199711-Destiny-and-Destiny-2-Competition-License', sourceName: 'Bungie Help', note: 'Bungie provides a license for community-run tournaments; no Bungie-run 2026 esports circuit was found in the official source checked. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'ea_fc', gameName: 'EA Sports FC', url: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive', sourceName: 'EA SPORTS FC Pro', note: 'Open Ladder closed 3 Oct; Regional Qualifiers are 10–11 Oct, with the Global Qualifier 5–7 Nov. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'mobile_legends', gameName: 'Mobile Legends: Bang Bang', url: 'https://en.moonton.com/news/377.html', sourceName: 'MOONTON Games', note: 'MPL Philippines S18 playoffs are 21–25 Oct in Pasig; other regions have separate dates. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'honor_of_kings', gameName: 'Honor of Kings', url: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html', sourceName: 'Olympic Council of Asia', note: 'Asian Games esports event including Honor of Kings runs through 2 Oct. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'brawl_stars', gameName: 'Brawl Stars', url: 'https://event.supercell.com/brawlstars/en/', sourceName: 'Supercell Brawl Stars Esports', note: 'Checked 7 Oct 2026: official hub lists broadcast days 17–18 Oct; World Finals are 20–22 Nov in Tokyo. The live hub supplies current match and stream details.', checkedAt: '2026-10-07' },
  { gameId: 'clash_of_clans', gameName: 'Clash of Clans', url: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete', sourceName: 'Supercell Clash of Clans Esports', note: 'October Last Chance Qualifier confirmed; exact dates pending. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'clash_royale', gameName: 'Clash Royale', url: 'https://event.supercell.com/clashroyale/en', sourceName: 'Supercell Clash Royale League', note: 'CRL Last Chance Qualifier completed 5–6 Sep; Woo listed as winner. Next live event date not yet posted. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'genshin', gameName: 'Genshin Impact', url: 'https://www.hoyolab.com/#/article', sourceName: 'HoYoverse HoYoLAB', note: 'Official event/news channel checked; no current official Genshin esports tournament schedule found. Community events are not represented as official tournaments. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'stumble_guys', gameName: 'Stumble Guys', url: 'https://www.stumbleguys.com/news', sourceName: 'Scopely Stumble Guys', note: 'Official news page checked; no current publisher-run esports calendar found. Community competitions are separate. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'among_us', gameName: 'Among Us', url: 'https://www.innersloth.com/games/among-us/', sourceName: 'Innersloth', note: 'Official game page checked; no current official esports tournament schedule found. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'gta_online', gameName: 'GTA Online', url: 'https://www.rockstargames.com/newswire', sourceName: 'Rockstar Games Newswire', note: 'Official Newswire checked for organized competitive events; no current GTA Online esports championship schedule found. Weekly in-game activities are not esports tournaments. Checked 7 Oct 2026; no newer official schedule detail was listed.', checkedAt: '2026-10-07' },
  { gameId: 'marvel_rivals', gameName: 'Marvel Rivals', url: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html', sourceName: 'Marvel Rivals Ignite', note: 'Stage 2 playoffs run 8–18 Oct; 12 teams advance to late-November Grand Finals. Checked 7 Oct 2026.', checkedAt: '2026-10-07' },
  { gameId: 'arena_of_valor', gameName: 'Arena of Valor', url: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/', sourceName: 'Garena Liên Quân Mobile', note: 'Winter 2026 Grand Final is announced for 7 Nov at 10Fest, Hanoi; AIC 2026 is confirmed for year-end in Thailand, exact dates pending. Checked 7 Oct 2026.', checkedAt: '2026-10-07' },
  { gameId: 'teamfight_tactics', gameName: 'Teamfight Tactics', url: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/', sourceName: 'Riot Games TFT Esports', note: 'Tactician’s Superbrawl is 6–8 Nov; the 1,024-player Vegas Open is 11–13 Dec. Checked 7 Oct 2026.', checkedAt: '2026-10-07' },
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
  detailSections?: Array<{
    title: string;
    description?: string;
    columns: string[];
    rows: string[][];
    sourceUrl?: string;
  }>;
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
    updateHeading: 'BMSD is live; BMIC follows in Mumbai', updateDate: '7 October 2026',
    update: [
      'KRAFTON India’s 2026 announcement describes BMSD as a 48-team invitational for teams drawn from the KRAFTON India Esports leaderboard, BGIS and BMPS. The event runs 22 September–18 October, with its Hyderabad LAN finals scheduled for 16–18 October.',
      'The same announcement schedules the 16-team BGMI International Cup (BMIC) for 30 October–1 November in Mumbai, with teams from India, South Korea and Japan. It does not provide the final roster, match-by-match timetable or complete format, so those details remain unconfirmed here.',
      "Checked 7 October 2026: BMSD is still in progress, with Hyderabad LAN finals set for 16–18 October; BMIC follows in Mumbai on 30 October–1 November. KRAFTON has not published a complete current Royale Pass reward schedule in the cited public announcement, so confirm the live RP timer and rewards in-game."
    ],
    detailSections: [{"title":"BMSD 2026 — official tournament details","description":"The organizer announcement confirms the event window and qualification route. It does not publish a full roster, player list or official live points table.","columns":["Field","Officially confirmed detail"],"rows":[["Tournament window","22 September–18 October 2026"],["Team field","48 invite-only Indian BGMI teams"],["Invitation route","KRAFTON India Esports leaderboard, BGIS and BMPS results"],["LAN Grand Finals","Hyderabad, 16–18 October"],["Official live points table","Not published in the cited KRAFTON announcement"],["Official player rosters","Not published in the cited KRAFTON announcement"],["Next international event","BMIC: Mumbai, 30 October–1 November; 16 teams from India, South Korea and Japan"]],"sourceUrl":"https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg"},{"title":"BMSD — prizes, rosters and live scoreboard status","description":"This page uses the organizer announcement only. KRAFTON’s public announcement does not state a BMSD prize pool, team-by-team roster or official running points table.","columns":["Item","Official status as of 6 October"],"rows":[["Prize pool","Not stated in KRAFTON India’s public BMSD/BMIC announcement"],["Team roster","48 invitees confirmed, but a complete player roster is not published in that announcement"],["Live points table","Not published in that announcement"],["Grand Finals positions","Not yet decided; Finals are 16–18 October"],["BMIC field","16 teams from India, South Korea and Japan; full roster pending organizer release"]],"sourceUrl":"https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg"}],
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
    updateHeading: 'Royale Pass A21 appears in the September event catalogue', updateDate: '7 October 2026',
    update: [
      'PUBG MOBILE’s official New Events catalogue lists “New Royale Pass A21” under September 2026, alongside the Midnight Hunters event. The listing confirms the pass cycle exists, but does not expose its complete regional reward track or account-specific purchase options in the catalogue view.',
      'The Korean PUBG MOBILE Esports site separately schedules PMPS Korea 2026 Season 2 from 3–18 October at Daejeon Dream Arena. It lists 16 teams, a ₩40 million prize pool, five circuit days and two Finals days; the event is regional, not the global PUBG Mobile calendar.',
      "Checked 7 October 2026: PMPS Korea Season 2 resumes its Circuit Stage on 9–11 October, then holds Finals at Daejeon Esports Arena on 17–18 October at 3 p.m. KST. The organizer lists ₩40 million total prize money; the winner earns a PMGC place and the top three BMIC places subject to duplicate-slot rules."
    ],
    detailSections: [{"title":"PMPS Korea Season 2 — verified participant list","description":"The Korean PUBG MOBILE Esports event page lists these 16 teams. Player-by-player rosters should be taken from the organizer’s roster update, not inferred from team names.","columns":["Team","Status"],"rows":[["5Hz","Official participant"],["APEX","Official participant"],["Chungnam CNJ esports","Official participant"],["DAEJEON GAME PT","Official participant"],["Dplus Kia","Official participant"],["FN SEJONG","Official participant"],["FOCUS","Official participant"],["G.N. Revenant NOVA","Official participant"],["GyeongBuk Ascenders","Official participant"],["INCHEON WAVE","Official participant"],["Jeonnam Esports","Official participant"],["KIWOOM DRX","Official participant"],["KX GAMING","Official participant"],["NS RedForce","Official participant"],["Re Mind","Official participant"],["TEAM CG","Official participant"]],"sourceUrl":"https://esports.pubgmobile.kr/en/events"},{"title":"PMPS Korea Season 2 — schedule and points rules","description":"The circuit uses daily score resets. Benefit points earned by the daily top three apply in the Finals.","columns":["Stage","Date / rule"],"rows":[["Circuit Stage — Days 1–2","3–4 October, 3 p.m. KST"],["Circuit Stage — Days 3–5","9–11 October, 3 p.m. KST"],["Finals","17–18 October, 3 p.m. KST, Daejeon Dream Arena"],["Match count","Six matches on each listed competition day"],["Daily standings","Scores reset after each circuit day"],["Benefit points","Daily top three receive benefit points for Finals"],["Qualification","Champion to PMGC; top three to BMIC subject to duplicate-slot rule"]],"sourceUrl":"https://esports.pubgmobile.kr/en/events"},{"title":"PMPS Korea Season 2 — prize, qualification and live-table status","description":"The official event notice confirms the prize pool and qualification. It also says circuit scores reset daily, so a running table must be read for the selected match day.","columns":["Item","Official detail"],"rows":[["Prize pool","₩40,000,000"],["PMGC reward","Season 2 champion qualifies for PMGC 2026"],["BMIC reward","Final top three qualify, subject to the duplicate-slot rule"],["Circuit points","Daily score resets after each circuit day"],["Finals advantage","Daily top three earn benefit points"],["Roster / match table","Organizer’s event and match-result pages are the source when published"]],"sourceUrl":"https://esports.pubgmobile.kr/en/news/208"}],
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
    gameId: 'pubg_battlegrounds',
    title: 'PUBG: BATTLEGROUNDS News: Update 43.1 & PGC 2026 | Tradivex',
    description: 'PUBG PC Update 43.1 patch notes, Jujutsu Kaisen event dates, Solo Deathmatch and the confirmed PGC 2026 schedule in Istanbul.',
    heading: 'PUBG: BATTLEGROUNDS News: Update 43.1 and PGC 2026',
    intro: 'This page covers the PC and console version of PUBG: BATTLEGROUNDS. It is separate from PUBG Mobile and focuses on Update 43.1, its timed modes and the next confirmed PUBG esports championship.',
    updateHeading: 'Update 43.1 adds Jujutsu Kaisen, Solo Deathmatch and balance changes',
    updateDate: '7 October 2026',
    update: [
      'KRAFTON’s Update 43.1 notes say the update deployed on PC on 10 September and consoles on 17 September. It brings the Jujutsu Kaisen collaboration world, LMG balance adjustments, DLSS 4.5 and FSR 4.1 support on PC, and hitbox tuning on console.',
      'The limited-time Solo Deathmatch mode runs through 14 October on PC and 22 October on consoles. PC Duo Rumble is scheduled through 14 October in Asia, Europe and North America. Check your platform’s service notice for local maintenance and exact availability.',
      'The next global PUBG esports date is the PUBG Global Championship (PGC) 2026 in Istanbul, Türkiye, from 1–13 December. KRAFTON has announced a 32-team field and a prize pool of at least US$1.5 million; final team rosters and match schedule should be taken from later organizer updates.'
    ],
    detailSections: [
      { title: 'PUBG Update 43.1 — platform and event dates', description: 'The same patch has separate PC and console rollout and event end dates.', columns: ['Item', 'Official detail'], rows: [['PC service update', '10 September 2026'], ['Console service update', '17 September 2026'], ['Jujutsu Kaisen collaboration', 'Available through the next update; check the live in-game timer'], ['Solo Deathmatch', 'PC through 14 October; console through 22 October'], ['Duo Rumble', 'PC, Asia / Europe / North America, through 14 October'], ['PC graphics support', 'NVIDIA DLSS 4.5 and AMD FSR 4.1'], ['Console changes', 'Hitbox tuning']], sourceUrl: 'https://www.pubg.com/en/news/11057' },
      { title: 'PGC 2026 — confirmed championship information', description: 'The global championship is upcoming; team names and a complete match-by-match schedule must be verified against the event hub as organizers publish them.', columns: ['Field', 'Confirmed detail'], rows: [['Dates', '1–13 December 2026'], ['Location', 'Istanbul, Türkiye'], ['Teams', '32'], ['Prize pool', 'US$1.5 million or more'], ['Next meta update', 'Update 44.2 planned for December; exact deployment date and details are not confirmed here']], sourceUrl: 'https://www.pubg.com/en/news/10110' }
    ],
    playerFocusHeading: 'What PUBG PC and console players should check',
    playerFocus: [
      'Solo Deathmatch ends on different dates by platform. Check the in-game event tile before planning a final session, especially on console where the listed window runs to 22 October.',
      'The developer has said a second Meta Rotation Update is planned with Update 44.2 in December. The exact date and full map or balance changes are not yet confirmed in the cited developer letter.',
      'PC graphics features do not imply a performance guarantee; compare the in-game settings and your hardware before changing upscaling options.'
    ],
    competitionHeading: 'Upcoming PUBG: BATTLEGROUNDS esports',
    competition: ['PUBG Global Championship 2026: 1–13 December in Istanbul, Türkiye; 32 teams and at least US$1.5 million announced.', 'The 2026 PGC team list and detailed daily schedule are not treated as confirmed until posted by PUBG Esports.'],
    sources: [
      { name: 'PUBG — Update 43.1 patch notes', url: 'https://www.pubg.com/en/news/11057' },
      { name: 'PUBG — PGC 2026 announcement', url: 'https://www.pubg.com/en/news/10110' },
      { name: 'PUBG — Meta Rotation Update developer letter', url: 'https://www.pubg.com/en/news/10874' }
    ],
    faqs: [
      { question: 'Is PUBG: BATTLEGROUNDS the same as PUBG Mobile?', answer: 'No. This news page covers the PC and console game. PUBG Mobile has a separate client, update schedule and esports coverage.' },
      { question: 'When does PUBG Update 43.1 Solo Deathmatch end?', answer: 'The official notes list 14 October 2026 for PC and 22 October for consoles.' },
      { question: 'When and where is PGC 2026?', answer: 'PUBG has announced 1–13 December 2026 in Istanbul, Türkiye, with 32 teams. Check the official event hub for the eventual roster and detailed match schedule.' }
    ]
  },
  {
    gameId: 'dota2',
    title: 'Dota 2 News: Patch 7.41e, BLAST & Upcoming Events | Tradivex',
    description: 'Dota 2 latest patch and esports news checked 7 October 2026: 7.41f, BLAST Slam VIII playoffs, Slam IX and DreamLeague Season 30 dates.',
    heading: 'Dota 2 News: Patch 7.41f and the 2026 Tournament Calendar',
    intro: 'Dota 2’s Steam announcements and tournament organizers are the primary sources for this update. The calendar below separates the live BLAST event from confirmed November and December events, and marks details that remain unpublished.',
    updateHeading: 'Patch 7.41f is live; BLAST Slam VIII playoffs are next',
    updateDate: '7 October 2026',
    update: [
      'Valve’s official Dota 2 feed lists gameplay patch 7.41f, released 15 September, after 7.41e and Summer Scrub. The 7.41f notes contain gameplay fixes.',
      'As of 7 October, BLAST Slam VIII is in progress in Malta. Its 16-team event runs 29 September–11 October, with the LAN playoffs scheduled for 9–11 October and a US$750,000 prize pool. Use BLAST’s live bracket for results and match times.',
      'Confirmed future dates include BLAST Slam IX online from 20–29 November and DreamLeague Season 30 from 2–13 December with 24 teams. The International 2026 and PGL Wallachia Season 9 have concluded; completed events should not be presented as upcoming.'
    ],
    detailSections: [
      { title: 'Dota 2 patch status checked 7 October', description: 'Valve’s Steam community announcement page is the publisher source for patch releases and gameplay updates.', columns: ['Update', 'Status'], rows: [['Gameplay patch 7.41f', 'Valve release dated 15 September 2026'], ['Summer Scrub', 'Listed in the same September announcement feed'], ['Follow-up fixes', 'See Valve’s current announcement feed']], sourceUrl: 'https://steamcommunity.com/app/570/announcements/?l=english' },
      { title: 'Dota 2 esports — live and upcoming dates', description: 'Dates and format below follow the tournament organizer’s announcements; results and match times can change during live play.', columns: ['Event', 'Dates and confirmed detail'], rows: [['BLAST Slam VIII', '29 September–11 October; 16 teams; Malta; US$750,000'], ['Slam VIII LAN playoffs', '9–11 October 2026'], ['BLAST Slam IX', '20–29 November 2026; online'], ['DreamLeague Season 30', '2–13 December 2026; 24 teams'], ['PGL Wallachia Season 9', 'Completed 17–27 September; Team Yandex beat NAVI 3–0 in the final'], ['The International 2026', 'Completed; Team Spirit won']], sourceUrl: 'https://blast.tv/dota/tournaments/blast-slam-viii/series?view=upcoming' }
    ],
    playerFocusHeading: 'Patch notes, brackets and viewing times',
    playerFocus: [
      'For hero builds and ranked decisions, read the current Valve patch notes rather than relying on older 7.41 guides; small balance updates can change lane matchups and item choices.',
      'Tournament match times are published in event-local time and may shift with bracket progression. Check BLAST’s live series page before tuning in.',
      'The official organizer calendar lists future events, but team invitations and full match schedules may arrive later. This page avoids treating unannounced lineups as final.'
    ],
    competitionHeading: 'Upcoming Dota 2 tournaments',
    competition: ['BLAST Slam VIII playoffs: 9–11 October in Malta; event concludes 11 October.', 'BLAST Slam IX: 20–29 November, online.', 'DreamLeague Season 30: 2–13 December; 24 teams.'],
    sources: [
      { name: 'Valve — Dota 2 announcements and patch notes', url: 'https://steamcommunity.com/app/570/announcements/?l=english' },
      { name: 'BLAST — Slam VIII event page', url: 'https://blast.tv/dota/tournaments/blast-slam-viii/series?view=upcoming' },
      { name: 'BLAST — Slam IX online event announcement', url: 'https://dev.blast.tv/dota/news/blast-slam-ix-the-battle-moves-online' },
      { name: 'ESL FACEIT Group — Dota 2 Pro Tour calendar', url: 'https://eslfaceitgroup.com/press/esl-faceit-group-unveils-changes-to-the-dota-2-ecosystem-with-a-robust-esl-pro-tour-calendar-announcement/' }
    ],
    faqs: [
      { question: 'What is the latest Dota 2 gameplay patch listed by Valve?', answer: 'Valve’s official feed lists gameplay patch 7.41f, released 15 September 2026; ' },
      { question: 'When are the next Dota 2 tournaments?', answer: 'BLAST Slam VIII playoffs are 9–11 October, BLAST Slam IX runs online 20–29 November, and DreamLeague Season 30 is scheduled for 2–13 December 2026.' },
      { question: 'Is The International 2026 still upcoming?', answer: 'No. It has concluded; this page lists it as completed rather than as a future event.' }
    ]
  },
  {
    gameId: 'freefire', title: 'Free Fire News: OB55, Booyah Pass & FFWS 2026 | Tradivex',
    description: 'Free Fire OB55 guide for October 2026: Naruto Shippuden return, Nine Tails gameplay, weapon and device changes, current pass checks and FFWS Global Finals.',
    heading: 'Free Fire News: OB55 Patch, Booyah Pass and FFWS',
    intro: 'Garena’s OB55 update is the major player-facing change for October: it brings back Naruto Shippuden content and changes Battle Royale events, weapons and devices. FFWS Global Finals is a separate esports event scheduled for Bangkok in November.',
    updateHeading: 'OB55 brings back Naruto Shippuden and changes match flow', updateDate: '7 October 2026',
    update: [
      'Garena’s OB55 patch notes set the update release for 1 October. The returning Nine Tails event can alter a Battle Royale match before takeoff, open Bermuda Arsenals or leave a loot crater; players can also use returning ninjutsu and the Hidden Leaf Village map feature.',
      'OB55 adds active and passive device categories, allowing one of each, adjusts airdrop timing and clarity, and introduces the M7, Skorp, RPK and Hawk weapon lineup in October. Garena also lists a full Kenta rework and Clash Squad weapon/economy changes. These changes make the patch notes more useful than old tier lists for loadout decisions.',
      "Checked 7 October 2026: Garena’s OB55 is the current October game update, while the 2026 FFWS Global Finals are scheduled for 6 November in Bangkok. Use the in-game event page for each region’s live Booyah Pass rewards and expiry because the public roadmap does not define every account’s offer."
    ],
    detailSections: [{"title":"Free Fire — live service and esports tracker","description":"OB55 is the current game update. The official roadmap identifies the global finals, but regional team qualification and live standings are published separately.","columns":["Area","Current verified detail"],"rows":[["Game update","OB55 is live"],["Seasonal content","Naruto Shippuden content and Nine Tails gameplay are part of OB55"],["Player changes","New devices, M7/Skorp/RPK/Hawk weapon changes and Kenta rework"],["Global event","FFWS Global Finals: 6 November, Bangkok"],["Teams / player rosters","Not confirmed in the cited global roadmap"],["Official points table","Use the regional FFWS broadcast or organizer standings after qualification"]],"sourceUrl":"https://ff.garena.com/en/article/1712/"},{"title":"FFWS 2026 — prize, teams and rewards status","description":"Garena’s official 2026 roadmap confirms team count and the global-finals date, but does not give a FFWS Global Finals prize-pool breakdown or the final team/player list.","columns":["Item","Official status"],"rows":[["FFWS Global Finals field","24 teams"],["Finals location / timing","Bangkok; four weekends beginning 6 November"],["Prize pool","Not stated in the cited 2026 roadmap"],["EWC reward","2026 EWC champion receives direct FFWS Global Finals qualification"],["Final team rosters","Not published in the roadmap"],["Live standings","Use Garena’s regional/global event broadcast once qualification is complete"]],"sourceUrl":"https://ff.garena.com/en/article/1605/"}],
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
    description: 'VALORANT Champions Shanghai playoffs begin 7 October, alongside the Game Changers Americas LCQ schedule, 16-team format and official Riot links.',
    heading: 'VALORANT News: Patch 13.06 and Champions Shanghai',
    intro: 'Riot’s current VALORANT story has two tracks: Patch 13.06 is the live game update, while Champions Shanghai is the 2026 international season finale. The competition includes watch rewards and Pick’Ems alongside the matches.',
    updateHeading: 'Patch 13.06 is live as Champions playoffs begin', updateDate: '7 October 2026',
    update: [
      'Riot’s official news feed lists VALORANT Patch 13.06 on 22 September 2026. The game news page also highlights the new Gauntlet: Glitched mode reveal and confirms VALORANT console launch in Australia and New Zealand. Check the patch notes for the precise agent and weapon changes on your platform.',
      'Champions Shanghai runs 24 September–18 October with 16 teams from Americas, China, EMEA and Pacific. The four-group stage continues through 4 October; eight teams advance to double-elimination playoffs from 7–18 October. Riot lists the Grand Final for 18 October.',
      "Checked 7 October 2026: Riot’s latest linked VALORANT Esports article, published 6 October, adds the Game Changers Americas LCQ schedule. The round robin is 14 October and the Bo5 final is 15 October in São Paulo; the winner qualifies for the 22 October–1 November Championship. Champions Shanghai playoffs also begin today and continue through 18 October."
    ],
    detailSections: [{"title":"VALORANT Champions Shanghai — tournament tracker","description":"Champions has 16 qualified teams. Riot’s guide gives the format and dates; the official event feed is the source for live brackets, team lineups and match results.","columns":["Stage","Official detail"],"rows":[["Field","16 qualified teams from Americas, China, EMEA and Pacific"],["Group Stage","24 September–4 October; four groups; best-of-three matches"],["Advancement","Two losses eliminate a team; eight teams advance"],["Playoffs","7–18 October; double elimination"],["Grand Final","18 October"],["Points / standings","Use the official Champions bracket; group stage is complete as of 6 October"],["Player rosters","Official team lineups are on the Champions event/broadcast pages"]],"sourceUrl":"https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know"},{"title":"Champions Shanghai — rewards, rosters and standings status","description":"Riot’s event guide confirms Drops and Pick’Ems. The guide is the event-format source; the official Champions event feed is the source for bracket movement and team lineups.","columns":["Item","Official detail"],"rows":[["Viewer rewards","Eligible live broadcasts can grant Champions Drops"],["Prediction rewards","Champions Pick’Ems are available in-client and on the event site"],["Prize pool","Not stated in the cited Champions event guide"],["Teams","16 qualified teams"],["Player rosters","Use Riot’s official team/event pages; roster status can change before a match"],["Live bracket","Official Champions bracket after groups; playoffs start 7 October"]],"sourceUrl":"https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know"}],
    playerFocusHeading: 'Ranked, event drops and Pick’Ems',
    playerFocus: [
      'Patch 13.06 is the version to review before adjusting agent utility or aim practice. Read the official patch notes in-client or on Riot’s site because platform rollouts and balance details may change.',
      'Riot says Champions viewers can earn exclusive Drops, including a title, by watching eligible live broadcasts. Champions Pick’Ems are available on the official site and in-client; check lock times before submitting predictions.',
    ],
    competitionHeading: 'Champions Shanghai 2026',
    competition: ['Champions Shanghai playoffs: 7–18 October, double elimination; Grand Final on 18 October. Follow Riot’s live bracket for match outcomes.', 'Game Changers Americas LCQ: 14 October round robin and 15 October Bo5 final at Riot Games Arena São Paulo; MIBR, Akave Esports Black and FlyQuest RED compete for the final Americas Championship place.'],
    sources: [
      { name: 'Riot Games — VALORANT official news and Patch 13.06', url: 'https://playvalorant.com/en-us/news/' },
      { name: 'VALORANT Esports — Champions Shanghai guide', url: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know' },
      { name: 'VALORANT Esports — Game Changers Americas LCQ 2026', url: 'https://valorantesports.com/en-US/news/eyntk-gc-americas-lcq-2026' },
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
    updateHeading: 'Season 6: The Haunting is live in Black Ops 7 and Warzone', updateDate: '7 October 2026',
    update: [
      'Activision’s Season 6 announcement introduces Haunted Hollow, Giant Infected, the T.E.D.D. Trials and Hordepoint modes, Zombies content and the DOOM Event Pass. The Season 6 Battle Pass is led by Blackjack and contains 100+ rewards; the VMP SMG and TR51 Para Assault Rifle are free weapon unlocks on its reward pages.',
      'Warzone’s 30 September patch note also adjusts loot cleanup and gas damage. Call of Duty Mobile has a separate current cycle: the official Season 8 “Against All Fate” announcement lists a Honkai Impact 3rd collaboration, roguelike top-down Multiplayer mode, Isolated POI and new Battle Pass content.',
      "Checked 7 October 2026: Activision’s Black Ops 7 news feed has published Season 06 patch notes, the newest patch entry in the official feed. Season 6 is The Haunting; Warzone patch notes are listed separately, and COD Mobile follows its own Season 8 cycle."
    ],
    detailSections: [{"title":"Call of Duty — current confirmed details","description":"Call of Duty releases are split by game and mode. Season 6 is current for Black Ops 7/Warzone; COD Mobile runs a separate Season 8 cycle.","columns":["Area","Current verified detail"],"rows":[["Black Ops 7 / Warzone","Season 06: The Haunting"],["Latest official entry","Season 06 patch notes in Activision’s Black Ops 7 news feed"],["Warzone","Season patch notes are published separately from the seasonal announcement"],["COD Mobile","Season 8: Against All Fate"],["Esports table","No universal live points table spans Black Ops, Warzone and COD Mobile"],["Teams / rosters","Use the current event organizer page because each COD circuit maintains separate lineups"]],"sourceUrl":"https://www.callofduty.com/blog/2026/09/call-of-duty-black-ops-7-warzone-season-6-the-haunting-announcement"},{"title":"Season 06 — Battle Pass rewards and competitive status","description":"This is publisher-confirmed player content for Black Ops 7 and Warzone, not a combined Call of Duty esports prize table.","columns":["Item","Official detail"],"rows":[["Battle Pass price","1,100 COD Points"],["Battle Pass Bundle","2,400 COD Points; includes 20 Tokens"],["Pass rewards","100+ items and up to 1,100 COD Points"],["Free weapons","VMP SMG (Page 3) and TR51 Para Assault Rifle (Page 6)"],["BlackCell instant content","Revenant Operator, Mastercraft Blueprint, 1,100 COD Points and more"],["Esports table","No single official points table combines Black Ops 7, Warzone and COD Mobile circuits"]],"sourceUrl":"https://www.callofduty.com/blog/2026/09/call-of-duty-black-ops-7-warzone-season-6-the-haunting-announcement"}],
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
    updateHeading: 'Counter-Strike 2 maintenance update fixes map gaps and clipping', updateDate: '7 October 2026',
    update: [
      'Valve’s 6 October update fixes pixel gaps on Rush and clipping in T and CT Castle rooms. This follows the September Rush 3v3 release and its earlier map fixes; check Steam announcements for any further maintenance notes.',
      'The CS2 page also reiterates that Prime Status affects Prime matchmaking and eligibility for Prime-exclusive souvenir items, drops and weapon cases. Prime is not required to play the free game, but it changes matchmaking and rewards eligibility.',
      "Valve’s 2 October CS2 update fixes the visibility of agent gloves in the buy menu and photo booth, a grenade crosshair thickness issue, report-dialog title formatting and Warehouse lighting; it also updates the Workshop whitelist and stability. This is a small maintenance update, separate from the September Rush 3v3 mode release."
    ],
    detailSections: [{"title":"Counter-Strike 2 — latest maintenance and competitive detail","description":"Valve’s current update is a maintenance release. Event standings and player lineups belong to their respective tournament organizers.","columns":["Update / event","Verified detail"],"rows":[["Valve update date","6 October 2026"],["Gameplay fixes","Pixel gaps on Rush; clipping in T and CT Castle rooms"],["Earlier 2 October fixes","Agent gloves visibility, grenade crosshair, report dialog, Warehouse lighting and Workshop whitelist"],["Rush","The September update added a separate 3v3 queue"],["Premier / Competitive","Not replaced by Rush"],["Live team points","No publisher-wide CS2 points table; use the specific event’s official bracket"],["Player rosters","Use team and tournament organizer roster pages"]],"sourceUrl":"https://store.steampowered.com/oldnews/?appgroupname=Counter-Strike%3A+Global+Offensive&appids=730&feed=steam_community_announcements"},{"title":"CS2 — prize, roster and points-table status","description":"Counter-Strike tournament money, rosters and rankings are managed event-by-event. Valve’s 6 October update is a game patch, not a tournament standings release.","columns":["Item","Status"],"rows":[["Official 6 October update reward","Gameplay/technical update; no prize or item-reward table announced"],["Live esports standings","Use the specific organizer’s official event bracket"],["Team/player roster","Use official tournament and team pages"],["Valve ranking","Check the current Valve Regional Standings / organizer listing before treating a ranking as live"],["Premier rating","Separate from tournament points"],["Item drops","Prime affects eligibility; it is not a guaranteed cash reward"]],"sourceUrl":"https://store.steampowered.com/oldnews/?appgroupname=Counter-Strike%3A+Global+Offensive&appids=730&feed=steam_community_announcements"}],
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
      { name: "Valve — 2 October Counter-Strike 2 update", url: "https://store.steampowered.com/oldnews/?appgroupname=Counter-Strike%3A+Global+Offensive&appids=730&feed=steam_community_announcements" }
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
    intro: 'Fortnitemares is Fortnite’s main October update, with horror-themed content rolling through several modes. Epic’s published FNCS Solos rules now provide the October qualification path, scoring and region-specific cash prizes.',
    updateHeading: 'Fortnitemares is live; Nitemare Island arrives 8 October', updateDate: '7 October 2026',
    update: [
      'Epic’s 1 October Fortnitemares announcement says the Halloween event spreads through Battle Royale, Horde Rush and Reload during October. It features Nightmare Neighborhood, Freddy Krueger and the Bone Rattler SMG, with additional horror characters and cosmetics arriving over the month.',
      'Epic’s published FNCS Solos rules now schedule Qualifier 2 for 5–11 October, Heats for 17–18 October, the Last Chance Qualifier for 19–20 October and Finals for 26–27 October. It is an individual competition: a Victory Royale is worth 60 points and Finals eliminations are worth four points each; cash prizes vary by region.',
      "Epic’s 1 October event guide confirms Fortnitemares is active across Battle Royale, Horde Rush and Reload. The event adds Freaky Fields and Nightmare Neighborhood, Freddy Krueger’s Nightmare claws and the Bonerattler SMG; Reload’s updated Nitemare Island is scheduled for 8 October. Epic’s FNCS Solos rules now publish the October qualification and Finals dates."
    ],
    detailSections: [{"title":"Fortnite — Fortnitemares 2026 tracker","description":"Fortnitemares affects several Fortnite modes. Competitive scoring remains separate and must be read from the official tournament rules for each event.","columns":["Area","Current verified detail"],"rows":[["Event","Fortnitemares 2026"],["Modes","Battle Royale, Horde Rush and Reload"],["Map changes","Freaky Fields and Nightmare Neighborhood"],["Items / encounters","Freddy Krueger encounter, Nightmare claws and Bonerattler SMG"],["Reload","Updated Nitemare Island scheduled for 8 October"],["FNCS Solo","Epic confirmed an October standalone event; official format and points were still pending"],["Teams / players","Solo event details are not team-roster data"]],"sourceUrl":"https://www.fortnite.com/news/the-corruption-spreads-in-fortnitemares-2026"},{"title":"FNCS Solos 2026 — schedule, scoring and prize examples","description":"Epic’s official FNCS Solos rules provide the live event structure. This is an individual competition, so it has player leaderboards rather than team rosters.","columns":["Item","Official detail"],"rows":[["Qualifier 2 Round 1","5–6 October"],["Qualifier 2 later rounds","Round 2: 10 October; Round 3: 11 October"],["Heats / LCQ","17–18 October / 19–20 October"],["Finals","26–27 October"],["Scoring","Victory Royale: 60 points; Finals eliminations: 4 points each"],["First-place cash prize","EU: US$60,000; NAC: US$50,000; Asia/OCE/ME: US$7,000"],["Eligibility","At least 13 years old or local minimum age; MFA required"],["Live leaderboard","In-game FNCS event leaderboard per region"]],"sourceUrl":"https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC"}],
    playerFocusHeading: 'Season quests, cosmetics and ranked readiness',
    playerFocus: [
      'Fortnitemares content may roll out in stages. Check the in-game Quests and event panels for each item’s live start/end time and reward requirements rather than assuming every collaboration is available on day one.',
      'For ranked players, review the active Battle Royale season and current FNCS rules separately: cosmetic event quests do not affect FNCS eligibility, region lock or tournament scoring.',
    ],
    competitionHeading: 'FNCS October Solo event',
    competition: ['FNCS Solos: Qualifier 2 rounds are 5–6, 10 and 11 October; Heats are 17–18 October; LCQ is 19–20 October; Finals are 26–27 October.', 'Scoring, eligibility and regional prize amounts vary; follow Epic’s official rules and regional leaderboard for the live standings.'],
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
    updateHeading: 'EA publishes new Apex matchmaking test notes for 7 October', updateDate: '7 October 2026',
    update: [
      'Respawn’s 14 September Marked midseason notes say Split 2 began on 15 September. The patch adjusts Legend balance and loot availability, buffs three long-range weapons, and includes more than 150 map quality-of-life fixes, with substantial work on World’s Edge.',
      'The same notes list Ranked Ladder 2 for 29 September–4 October and Ladder 3 for 6–11 October, followed by further weekly ladders through 1 November. EA separately announced that PC moves to Javelin Anti-Cheat effective 29 September; the notice says enforcement applies across platforms for detected prohibited behavior.',
      "EA staff’s Apex Legends Game Info Hub posted a 6 October update that schedules a US-console matchmaking test for 7 October at approximately 10:00 AM PT, enabling cross-play as the default during the test. It also lists an ongoing investigation into weapon attachment and ADS behavior. This is a test notice, not a permanent matchmaking change; check EA’s live forum post for its end time and follow-up."
    ],
    detailSections: [{"title":"ALGS Year 6 Split 2 Playoffs — event tracker","description":"ALGS has an official global event page. It defines the field, regional slots, dates and prize pool; teams are finalized from regional competition.","columns":["Field / stage","Official detail"],"rows":[["Event dates","29 October–1 November 2026"],["Venue","Orleans Arena, Las Vegas"],["Teams","40"],["Prize pool","US$2,000,000"],["Regional slots","Americas 15; EMEA 7; APAC North 10; APAC South 8"],["Format","Group stage, double-elimination bracket, Match Point Finals"],["Teams / player rosters","Use the official ALGS participant and team pages once the field is posted"]],"sourceUrl":"https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview"},{"title":"ALGS Split 2 Playoffs — prize, points and live-table rules","description":"EA’s official overview and rules explain how teams reach the playoffs and how the Match Point Final works.","columns":["Item","Official detail"],"rows":[["Prize pool","US$2,000,000"],["Regional Pro League prize pool","US$500,000 across four regions (US$125,000 each)"],["Playoff field","40 teams"],["Qualification","Regional Finals winners plus remaining teams by final Split 2 Pro League standings"],["Group stage","Four groups of 10; every team plays 18 matches"],["Finals win condition","Reach 50 Match Point, then win a subsequent match"],["Roster / standings","Official ALGS team list, groups and live match results when posted"]],"sourceUrl":"https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview"}],
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
      { name: 'EA staff — Apex Legends Game Info Hub', url: 'https://forums.ea.com/category/apex-legends-en/blog/apex-legends-game-info-hub-en' },
      { name: 'ALGS Year 6 Split 2 Playoffs', url: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview' },
    ],
    faqs: [
      { question: 'What changed in Apex Legends Marked Split 2?', answer: 'The midseason update adjusts Legend balance and loot, buffs three long-range weapons, adds map fixes, and starts the September 15 Split 2 ranked cycle.' },
      { question: 'When are ALGS Split 2 Playoffs?', answer: 'The 40-team LAN is scheduled for 29 October–1 November 2026 at Orleans Arena in Las Vegas.' },
    ],
  },
  {
    gameId: 'minecraft', title: 'Minecraft News: Dungeons II Launch & Wilderness Bound | Tradivex',
    description: 'Minecraft October 2026 update: Minecraft Dungeons II launch, Wilderness Bound game drop, Aurora Cape promotion and official Java/Bedrock links.',
    heading: 'Minecraft News: Wilderness Bound and Minecraft Live',
    intro: 'Minecraft’s current official headline is the Wilderness Bound game drop, listed as out now. Minecraft Live is a developer presentation, not an esports tournament; community server events and creator competitions should be labelled separately.',
    updateHeading: 'Minecraft Dungeons II is live; Wilderness Bound remains current', updateDate: '7 October 2026',
    update: [
      'Minecraft’s official Live page lists the Wilderness Bound drop as available now. Check the linked drop page for the exact Java and Bedrock feature list, version number and platform rollout before updating a server or modded client.',
      'Minecraft Live was scheduled for 26 September 2026 at 1 p.m. ET and has now passed. That livestream shares Minecraft news and creator updates; it is not itself an esports event. Back up a world and confirm a server’s supported version before switching a long-running save.',
      "Minecraft Dungeons II launched on 29 September for Steam, Xbox Series X|S, PlayStation 5, Nintendo Switch and Switch 2, with solo or up-to-four-player co-op and the new Sift dimension. Minecraft’s Aurora Cape livestream promotion runs through 14 October; redeem eligible codes by 31 October. This is a separate action-RPG release alongside the Wilderness Bound drop for Minecraft."
    ],
    detailSections: [{"title":"Minecraft — current game and player information","description":"Minecraft does not run a single publisher-owned professional team league. The current major player update is Minecraft Dungeons II, a separate action RPG.","columns":["Topic","Current verified detail"],"rows":[["Latest Minecraft game drop","Wilderness Bound is listed as available"],["New release","Minecraft Dungeons II launched 29 September"],["Platforms","Steam, Xbox Series X|S, PlayStation 5, Nintendo Switch and Switch 2"],["Co-op","Solo, online co-op or couch co-op for up to four players"],["New area","The Sift"],["Team standings","No publisher-run global Minecraft esports points table"],["Creator/server events","Their teams, players and rules are run by each separate organizer"]],"sourceUrl":"https://www.minecraft.net/en-us/article/minecraft-dungeons-ii-is-live"},{"title":"Minecraft — rewards and competition status","description":"Minecraft and Minecraft Dungeons II publish game rewards/promotions, but there is no publisher-wide professional league with team prize money.","columns":["Item","Official status"],"rows":[["Dungeons II co-op","Up to four players online or couch co-op"],["Hero Cape reward","Available by completing the qualifying linked-account activity by 31 December 2026"],["Aurora Cape promotion","Watch eligible Twitch/TikTok streams through 14 October; redeem a code by 31 October"],["Global esports prize pool","No publisher-wide Minecraft esports prize pool announced"],["Teams / player points","No official global table; community and Education events run separately"]],"sourceUrl":"https://www.minecraft.net/en-us/article/minecraft-dungeons-ii-capes-promos"}],
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
      { name: "Minecraft — Dungeons II is live", url: "https://www.minecraft.net/en-us/article/minecraft-dungeons-ii-is-live" }
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
    updateHeading: 'October creator games and platform updates', updateDate: '7 October 2026',
    update: [
      'Roblox’s official newsroom scheduled The Hunt: Roblox 20 for 17–28 September. The platform-wide anniversary event sent players through games representing Roblox history, with quests, UGC rewards and a leaderboard. It has ended as of this update date.',
      'Roblox also spotlighted Showdown’s first in-game Showdown Cup, hosted inside SuperGaming’s experience and its Esports Arena. Roblox’s fall preview listed Prime Heroes, Octane, Starforged and other experiences for October; availability can vary by release and region, so open each experience listing for its live status.',
      "Roblox’s 2 October newsroom post is a platform-security update, describing protections for creator code, virtual items and player communications; it is not a game patch or tournament announcement. The Hunt: Roblox 20 event ended on 28 September, and Roblox experiences run their own separate competition calendars."
    ],
    detailSections: [{"title":"Roblox — platform and event status","description":"Roblox is a platform of individual experiences, so tournaments, rosters and scoreboards are owned by the experience creator rather than Roblox globally.","columns":["Topic","Current verified detail"],"rows":[["Latest platform newsroom item","Security and creator-platform protections, published 2 October"],["The Hunt: Roblox 20","Ended 28 September"],["Live game tournaments","Experience-specific, not Roblox-wide"],["Team / player data","Check the relevant experience’s official event page"],["Platform-wide points table","None"],["Account guidance","Use in-experience announcements and verified Roblox links for rewards or competitions"]],"sourceUrl":"https://about.roblox.com/newsroom/2026/10/securing-an-ecosystem-unlike-any-other"},{"title":"Roblox — rewards and competition status","description":"Roblox tournaments are run inside individual experiences. Roblox itself does not publish one global team, roster or prize table.","columns":["Item","Official status"],"rows":[["Platform-wide esports prize pool","Not announced"],["Platform-wide team/player ranking","Not available"],["Experience rewards","Set by the individual experience creator"],["The Hunt: Roblox 20","Event ended 28 September"],["Current platform focus","Security for creator code, virtual items and communication systems"],["Where to check live scores","The official page of the specific Roblox experience/event"]],"sourceUrl":"https://about.roblox.com/newsroom/2026/10/securing-an-ecosystem-unlike-any-other"}],
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
      { name: "Roblox — Securing an Ecosystem Unlike Any Other", url: "https://about.roblox.com/newsroom/2026/10/securing-an-ecosystem-unlike-any-other" }
    ],
    faqs: [
      { question: 'Is the Showdown Cup an official Roblox-wide tournament?', answer: 'No. Roblox’s newsroom describes it as a tournament inside SuperGaming’s Showdown experience, not a platform-wide Roblox pro league.' },
      { question: 'Which new Roblox games are expected in October 2026?', answer: 'Roblox’s Fall Games Preview lists Prime Heroes, Octane and Starforged among October releases, but gives no specific launch day for each. Check their Roblox experience pages for availability.' },
    ],
  },
  {
    gameId: 'league', title: 'League of Legends News: Worlds 2026 Venues & Schedule | Tradivex',
    description: 'League of Legends October 2026 update: Worlds 2026 stage locations, revised broadcast start times, LoL esports news and official Riot sources.',
    heading: 'League of Legends News: Worlds 2026 Player and Fan Guide',
    intro: 'Worlds 2026 begins in October, and Riot has published venue policies plus updated broadcast start times. This page covers where each stage is played and what fans should verify before travelling or planning a watch party.',
    updateHeading: 'Riot updates Worlds venues and stage start times', updateDate: '7 October 2026',
    update: [
      'Riot’s 22 September venue notice places Play-Ins in Los Angeles, the Swiss Stage and knockout rounds at the Credit Union of Texas Event Center in Allen, Texas, and the Final at Barclays Center in Brooklyn on 14 November.',
      'Riot also adjusted some broadcast start times. Its notice lists Texas Swiss matches on 23–26 October at noon CDT, 28–30 October at 3 p.m. CDT and 31 October at noon CDT; check the full official schedule for later stages, ticket policies and any further timing changes.',
      "Riot’s Worlds venue notice is the latest practical event update checked: Play-Ins are in Los Angeles, the Swiss Stage and knockouts are in Allen, Texas, and the Final is at Brooklyn’s Barclays Center on 14 November. Worlds is scheduled to begin on 15 October; use the official LoL Esports schedule for matchups and start-time changes."
    ],
    detailSections: [{"title":"League of Legends Worlds 2026 — event tracker","description":"Worlds begins later in October. Riot’s venue notice gives dates and locations; official LoL Esports schedules carry the live standings, qualified teams and player lineups.","columns":["Stage","Official detail"],"rows":[["Tournament window","15 October–14 November"],["Play-Ins","Los Angeles"],["Swiss / Quarterfinals / Semifinals","Credit Union of Texas Event Center, Allen, Texas"],["Final","14 November at Barclays Center, Brooklyn"],["Swiss broadcast times","23–26 Oct 12 p.m. CDT; 28–30 Oct 3 p.m. CDT; 31 Oct 12 p.m. CDT"],["Live standings","Not active as of 6 October; use LoL Esports once play begins"],["Teams / player rosters","Official qualified-team pages and match schedule"]],"sourceUrl":"https://lolesports.com/en-US/lolesports/news/worlds-2026-venue-event-policies"},{"title":"Worlds 2026 — prizes, teams and standings status","description":"Riot’s current venue policy confirms locations and starts. It does not publish a current event prize breakdown or active standings because Worlds has not started as of 6 October.","columns":["Item","Official status"],"rows":[["Tournament start","15 October"],["Final","14 November, Barclays Center, Brooklyn"],["Prize pool","Not stated in the cited current venue-policy notice"],["Qualified teams / player rosters","Use official LoL Esports team pages and schedule"],["Points table","No live Worlds standings before Play-Ins begin"],["Live results","Official LoL Esports match schedule once play starts"]],"sourceUrl":"https://lolesports.com/en-US/lolesports/news/worlds-2026-venue-event-policies"}],
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
    updateHeading: 'Bullet Ball has ended; Season 24 content continues', updateDate: '7 October 2026',
    update: [
      'Psyonix’s Season 24 patch adds Honor Duels and Black Market trade-ins. The Bullet Ball limited-time mode is scheduled through 6 October; Persona 5 content remains available through 12 October, while Run It Up is scheduled through 9 December.',
      'The season adds a custom scoreboard, free-look camera options, updated mouse-and-keyboard controls and new Top 100 ranked titles. Bullet Ball runs 23 September–6 October; the Persona 5 event runs 25 September–12 October. Season 24 Rocket Pass includes the Volkswagen Golf GTI Edition 50, Dominus GT 76 and Pareto 5S bodies.',
      "Checked 7 October 2026: the listed Bullet Ball window ended on 6 October. The Persona 5 event remains scheduled through 12 October, and the Run It Up track through 9 December. Check the in-game event panel for remaining claim windows and local end times."
    ],
    detailSections: [{"title":"Rocket League — Season 24 tracker","description":"Season content and official esports are separate. Current player items have clear expiry dates, while RLCS standings are published on the competitive schedule.","columns":["Area","Current verified detail"],"rows":[["Season","Season 24"],["Limited-time mode","Bullet Ball: 23 September–6 October"],["Crossover event","Persona 5: 25 September–12 October"],["Player content","Honor Duels, Black Market trade-ins, updated controls and ranked rewards"],["Team standings","Use the Rocket League competitive schedule for the active RLCS region"],["Player rosters","Published by teams and RLCS event pages"]],"sourceUrl":"https://www.rocketleague.com/news/rocket-league-heads-to-the-streets-in-season-24"},{"title":"RLCS — prize, rewards and standings status","description":"Rocket League’s official competitive hub gives the 2026 global prize amount and the Club Championship figure; individual tournament standings live on the competitive pages.","columns":["Item","Official detail"],"rows":[["2026 RLCS global prize pool","More than US$6,000,000"],["Club Championship prize pool","US$2,500,000"],["Season 24 event reward","Bullet Ball available through 6 October"],["Crossover reward window","Persona 5 event through 12 October"],["Team / player standings","Official Rocket League Competitive schedule and regional event pages"],["Roster status","Use the listed team/event page before each RLCS match"]],"sourceUrl":"https://www.rocketleague.com/competitive"}],
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
    gameId: 'overwatch', title: 'Overwatch 2 News: Season 5, Doctrine & OWCS | Tradivex',
    description: 'Overwatch 2 Season 5, launched 6 October 2026, adds Support Hero Doctrine, Grímsvötn map, Unvaulted Passes and October events.',
    heading: 'Overwatch 2 News: Season 5 and Hero Doctrine',
    intro: 'Overwatch 2 Season 5 begins on 6 October with new Support Hero Doctrine, Escort map Grímsvötn and returning Unvaulted Passes. October collaborations and OWCS Stage 3 dates are listed separately below.',
    updateHeading: 'Season 5 is live with new Support Hero Doctrine', updateDate: '7 October 2026',
    update: [
      'Overwatch 2 Season 5 launches on 6 October with new Support Hero Doctrine and Escort map Grímsvötn. Unvaulted Passes cover Seasons 1–15; the Shadow Monarch collaboration runs 6–26 October, followed by Tech Witches 9–26 October.',
      'Blizzard also lists Team Drives for 29–31 October. Check the live client for local availability and reward progress.',
      "OWCS Stage 3 is the next confirmed competition window: NA and EMEA regular-season matches are scheduled for 10–11, 17–18 and 24–25 October, with playoffs 30 October–1 November. China’s Stage 3 has a separate 3 October–8 November schedule; the 2026 World Finals are listed for 2–6 December."
    ],
    detailSections: [{"title":"Overwatch Champions Series 2026 — Stage 3 tracker","description":"OWCS is region-specific. The schedule below separates NA/EMEA from China, so visitors do not mistake regional results for global standings.","columns":["Region / stage","Official detail"],"rows":[["NA and EMEA regular season","10–11, 17–18 and 24–25 October"],["NA and EMEA playoffs","30 October–1 November"],["China Stage 3","3 October–8 November"],["World Finals","2–6 December"],["Live team points","Published per region on official OWCS event pages"],["Player rosters","Use the official team/event roster listings; roster moves can change before match day"]],"sourceUrl":"https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/"},{"title":"OWCS Stage 3 — prize, roster and points-table status","description":"The official schedule identifies regional stages. A single global Stage 3 prize/points table is not published on the cited season overview.","columns":["Item","Official status"],"rows":[["NA / EMEA stage","Regular season 10–25 October; playoffs 30 October–1 November"],["China stage","3 October–8 November"],["World Finals","2–6 December"],["Prize pool","Check the official event page for each region; not stated in the cited schedule detail"],["Team/player rosters","Regional OWCS team listings"],["Live table","Official regional OWCS standings, not one combined global leaderboard"]],"sourceUrl":"https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/"}],
    playerFocusHeading: 'Battle Pass and returning cosmetics',
    playerFocus: [
      'The current Battle Pass Revamp is live, but Unvaulted Passes were delayed to the beginning of Season 5 in Blizzard’s published update. Do not assume a legacy pass is currently purchasable until it appears in the client.',
      'For balance-sensitive roles, revisit D.Mon’s 17 September hotfix values and current hero patch notes. Replay codes from the 8 September patch remain available according to Blizzard’s hotfix notice.',
    ],
    competitionHeading: 'OWCS Stage 3 and World Finals',
    competition: ['Stage 3 regular-season weekends: 10–11, 17–18 and 24–25 October; regional playoffs: 30 October–1 November.', 'OWCS World Finals are scheduled for 2–6 December. Check the regional league page for brackets and broadcast times.'],
    sources: [
      { name: 'Blizzard — Overwatch 2 Season 5', url: 'https://overwatch.blizzard.com/en-us/news/24303008/' },
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
    updateHeading: 'Y11S3.1 patch and Wasteland Circuit event', updateDate: '7 October 2026',
    update: [
      'Ubisoft’s official update feed lists Y11S3.1 patch notes on 22 September and a new Wasteland Circuit Twitch Drop on 23 September. The patch-note page is the authoritative place to check operator, map, bug-fix and platform-specific changes; the headline alone does not enumerate all details.',
      'Year 11 also brings Ranked 3.0, which Ubisoft said would launch with Operation System Override on 2 June. For season progression, check current ranked placement, seasonal challenges and any battle-pass timer in the client because rewards and availability are time-limited.',
      "The latest official player-facing notes located are Ubisoft’s Y11S3.1 patch and Wasteland Circuit notice from 22–23 September. Check Ubisoft’s live patch feed and in-game event panel for any newer hotfix, event expiry or Ranked 3.0 changes before relying on an older loadout guide."
    ],
    detailSections: [{"title":"Rainbow Six Siege — current update and event tracker","description":"Ubisoft’s current public notes identify the patch and event. Siege esports standings, lineups and points are published event-by-event.","columns":["Area","Current verified detail"],"rows":[["Live season","Year 11 Season 3: Operation Split Fire"],["Latest listed patch","Y11S3.1, 22 September"],["Event","Wasteland Circuit notice, 23 September"],["Ranked","Ranked 3.0 information is separate from patch notes"],["Team standings","Use the official R6 esports event page for the current league or Major"],["Player rosters","Use official team and event entries; no single global Siege player table exists"]],"sourceUrl":"https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates?category=patch-notes"},{"title":"R6 Osaka Major — prize money, SI points and standings","description":"Ubisoft’s official Major page publishes the prize/point breakdown. It is upcoming, so team placements are still TBD.","columns":["Place","Prize / SI Points"],"rows":[["Event / dates","Osaka Major, 6–15 November"],["Total prize pool","US$600,000"],["1st","US$200,000 / 1,500 SI Points"],["2nd","US$102,000 / 1,200 SI Points"],["3rd–4th","US$50,000 each / 1,050 SI Points each"],["5th–8th","US$22,000 each / 900 SI Points each"],["Live teams / rosters","Official R6 competition hub when qualification completes"],["Global standings","Ubisoft SI Points global standings"]],"sourceUrl":"https://www.ubisoft.com/en-us/esports/rainbow-six/siege/competition/513"},{"title":"R6 2026 SI Points — official top 10 snapshot","description":"Ubisoft states that standings can change during the season. This is the official global table available when the page was checked.","columns":["Rank","Team","SI Points"],"rows":[["1","DarkZero","1,890"],["2","FaZe Clan","1,610"],["3","ENTERPRISE Esports","1,560"],["4","Shopify Rebellion","1,515"],["5","Wildcard","1,495"],["6","Team Falcons","1,435"],["7","G2 Esports","1,315"],["8","Weibo Gaming","1,310"],["9","Twisted Minds","1,225"],["10","Virtus.pro","1,125"]],"sourceUrl":"https://www.ubisoft.com/en-us/esports/rainbow-six/siege/global-standings"}],
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
    intro: 'Bungie’s 9.7.0 release was identified as the final major patch for Destiny 2, with smaller maintenance updates still possible. The 9.7.0.3 notes include Crucible and Trials fixes; licensed community competitions follow separate organizer schedules.',
    updateHeading: 'Update 9.7 is the final major patch; hotfixes can follow', updateDate: '7 October 2026',
    update: [
      'Bungie’s 9 June Update 9.7.0 notes describe the release as the final major Destiny 2 patch, while explicitly allowing for smaller maintenance patches and hotfixes afterward. It includes changes across activities, rewards, raids, dungeons and the Monument of Triumph update.',
      'The later 9.7.0.3 update on 7 July increased Vanguard and Crucible Ops reputation and fixed several Crucible and Trials issues. Bungie’s 9 June announcement describes 9.7.0 as the final major release, with smaller maintenance updates and hotfixes handled separately.',
      "This Destiny 2 page was checked on 7 October 2026. The major release covered here is Update 9.7.0, followed by hotfix 9.7.0.3 on 7 July; Bungie publishes maintenance fixes in its official news feed."
    ],
    detailSections: [{"title":"Destiny 2 — game update and competition status","description":"Bungie describes Update 9.7.0 as its final major patch; smaller maintenance updates and hotfixes are announced separately. Destiny competitions are licensed event-by-event rather than a single publisher league.","columns":["Area","Current verified detail"],"rows":[["Major release","Update 9.7.0, 9 June 2026"],["Named follow-up hotfix","Update 9.7.0.3, 7 July 2026"],["Page checked","6 October 2026"],["Competition format","Bungie licenses third-party events under its competition rules"],["Live points table","No publisher-wide Destiny 2 esports standings"],["Player rosters","Depend on the individual licensed tournament organizer"]],"sourceUrl":"https://www.bungie.net/7/en/News/Article/destiny_2_update_9_7_0_3"},{"title":"Destiny 2 — reward and competitive status","description":"Bungie’s current public update material is game/patch focused. Licensed competitions set their own prize money and rosters.","columns":["Item","Official status"],"rows":[["Latest update rewards","Patch notes list gameplay and reputation changes, not a tournament prize table"],["Publisher-wide esports prize pool","Not announced"],["Global points table","Not available"],["Licensed tournaments","Run under Bungie’s competition license"],["Team/player rosters","Published by each licensed organizer"],["Live rewards","Check the in-game seasonal/event panel by account and region"]],"sourceUrl":"https://help.bungie.net/hc/en-us/articles/360049199711-Destiny-and-Destiny-2-Competition-License"}],
    playerFocusHeading: 'Activities, power progression and community events',
    playerFocus: [
      'Check active event cards, Eververse offers and activity modifiers in the Director; Bungie publishes maintenance details separately from major release notes, confirm active event cards, Eververse offers and activity modifiers in the Director before planning a weekly reset route.',
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
    updateHeading: 'Season 1: Ones to Watch runs through 22 October', updateDate: '7 October 2026',
    update: [
      'EA’s launch update sets Season 1: Ones to Watch for 17 September–22 October. The campaign links Ones to Watch, Destined for Glory and Future Stars; eligible Ones to Watch items can receive upgrades for Team of the Week, Star Performer or Player of the Month recognition, plus a club-results boost described in EA’s rules.',
      'EA’s 30 September Gameplay Developer Launch Update and 29 September Career Mode update are the newest title-specific news posts. The Grounds, including Clubs, is available only on PlayStation 5, Xbox Series X|S, PC and Nintendo Switch 2 according to EA’s platform note; older consoles do not get that mode.',
      "Checked 7 October 2026: the FC Pro 27 Open Ladder ended on 3 October. Its next listed step is the Open Global Qualifier on 5–7 November. FUT Season 1: Ones to Watch remains scheduled through 22 October; check Ultimate Team for shorter objective/SBC timers."
    ],
    detailSections: [{"title":"EA SPORTS FC 27 — Season 1 and FC Pro tracker","description":"Ultimate Team’s season and FC Pro are different systems. This table distinguishes player-content deadlines from professional qualification.","columns":["Area","Current verified detail"],"rows":[["FUT Season 1","Ones to Watch: 17 September–22 October"],["Latest game updates","Gameplay Developer Launch Update: 30 September; Career Mode update: 29 September"],["FC Pro Open Ladder","21 September–3 October; complete"],["Next FC Pro step","Open Global Qualifier: 5–7 November"],["Team / player standings","Use the official FC Pro leaderboard and event bracket"],["Player content","Check in-game SBC/objective deadlines; they can end before the season"]],"sourceUrl":"https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive"},{"title":"FC Pro 27 — prize money, rewards and player pathway","description":"EA’s FC Pro Deep Dive provides a complete season prize outline. FC Pro is primarily individual competition, so it has player standings rather than standard team rosters.","columns":["Event / reward","Official detail"],"rows":[["Full FC Pro 27 prize pool","US$2,500,000"],["FC Pro World Championship","US$1,000,000; winner receives US$250,000"],["FC Pro Open","US$533,000; winner receives US$100,000"],["Global Qualifier","US$152,000"],["Open Cups","US$315,000 total"],["Open Ladder reward","Top 1–500 per region receive an in-game reward"],["Pathway","1,376 advance to regional qualifiers; 52 plus 12 invitees reach global qualifier; 16 reach FC Pro Open"],["Live rankings","Official FC Pro World Rankings / event bracket"]],"sourceUrl":"https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive"}],
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
    updateHeading: 'MLBB marks 10 years; Myanmar wins the Asian Games event', updateDate: '7 October 2026',
    update: [
      'MOONTON launched the ALL IN MLBB 10th-anniversary campaign on 4 September. Its official 1 October report says Myanmar won the inaugural Asian Games MLBB gold by defeating Indonesia 4–0 at Aichi Sky Expo; this competition is complete, not live as of this page date.',
      'MPL Philippines Season 18 playoffs are scheduled for 21–25 October at PhilSports Arena in Pasig. MOONTON describes the playoffs as part of the Philippines’ route toward M8; Thailand’s MSL Season 2 also runs through 18 October. Each regional league has its own standings and qualification route.',
      "The Asian Games MLBB competition is complete: MOONTON reports Myanmar beat Indonesia 4–0 for gold. MPL Philippines S18 playoffs are next, scheduled for 21–25 October at PhilSports Arena; the 10th-anniversary campaign has region-specific rewards, so confirm availability in your server’s Events tab."
    ],
    detailSections: [{"title":"MLBB — anniversary and competitive tracker","description":"MOONTON’s official coverage distinguishes the completed Asian Games event from regional MPL competition and the M8 path.","columns":["Area","Current verified detail"],"rows":[["10th anniversary","ALL IN MLBB campaign"],["Asian Games result","Myanmar won gold, defeating Indonesia 4–0"],["MPL Philippines S18 playoffs","21–25 October, PhilSports Arena, Pasig"],["M8 World Championship","Istanbul, January 2027"],["Team standings","Use the official regional MPL page for playoff bracket and points"],["Player rosters","Regional league/team pages publish current lineups"]],"sourceUrl":"https://en.moonton.com/news/377.html"},{"title":"MLBB — MPL PH rewards, teams and standings status","description":"MOONTON confirms the playoff dates and M8 qualification importance, but its cited playoff announcement does not list a Season 18 prize-pool breakdown or current bracket.","columns":["Item","Official status"],"rows":[["MPL PH S18 Playoffs","21–25 October, PhilSports Arena"],["M8 qualification","Playoffs decide Philippines representatives"],["Ticket price","Starts at PHP 200"],["Prize pool","Not stated in the cited Season 18 playoff announcement"],["Teams / player rosters","Official MPL Philippines event page"],["Live standings","Official MPL Philippines bracket/standings once playoffs begin"]],"sourceUrl":"https://en.moonton.com/news/377.html"}],
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
    updateHeading: 'Season 16 Flow As One patch and device compatibility notice', updateDate: '7 October 2026',
    update: [
      'The official Honor of Kings site lists Season 16: Flow As One patch notes dated 22 September, an anti-cheat measures update and a minimum iOS system version adjustment dated 17 September. Players on older devices should confirm compatibility before updating, especially if they rely on an older operating system.',
      'The official esports hub separates global events, regional pro leagues and grassroots competitions. Event windows and team counts vary by region, so a single headline date should not be treated as a universal HoK schedule.',
      "Checked 7 October 2026: the Asian Games esports competition window closed on 2 October; it should not be described as an upcoming tournament. Season 16: Flow As One is a separate live-game season. Honor of Kings’ official esports calendar is the source to watch for the next event announcement and regional schedule."
    ],
    detailSections: [{"title":"Honor of Kings — Season 16 and esports tracker","description":"Honor of Kings runs regional competitions with their own teams, players and scoreboards. The completed Asian Games window is not a current tournament.","columns":["Area","Current verified detail"],"rows":[["Live season","Season 16: Flow As One"],["Asian Games esports window","Concluded 2 October"],["Current official source","Honor of Kings Esports calendar"],["Live team standings","Event-specific; check the organizer’s live bracket"],["Player rosters","Event/team specific"],["Global points table","No single all-region scoreboard published on the game hub"]],"sourceUrl":"https://www.honorofkings.com/esports/"},{"title":"Honor of Kings — rewards, teams and points status","description":"Season 16 is a live-game season. Regional esports events have separate rules, prize pools and team rosters.","columns":["Item","Official status"],"rows":[["Live reward source","In-game Season 16 and event tabs"],["Asian Games","Competition window closed 2 October"],["Publisher-wide prize pool","No current single global prize pool published on the official hub"],["Team/player roster","Event-specific official organizer page"],["Points table","Event-specific official bracket / standings"],["Where to check","Honor of Kings Esports calendar"]],"sourceUrl":"https://www.honorofkings.com/esports/"}],
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
    updateHeading: 'Brawl Stars confirms its BSC 2027 qualification path', updateDate: '7 October 2026',
    update: [
      'Supercell’s 1 October esports announcement outlines the road to Brawl Stars Championship 2027: four regions, six direct invitations per region based on 2026 results, and two more places per region decided through the BSC Invitational. Supercell’s current timeline lists team invitations on 23 November, roster responses by 20 December, invitation processing on 21–23 December, and the Invitational on 16–17 January 2027; dates may change.',
      'The 19 September Brawl Stars x Duolingo event ran through 30 September. Its community tasks and reward window are over by this update date; check the in-game news panel for the currently active season event rather than expecting expired collaboration rewards.',
      "Checked 7 October 2026: the latest confirmed roadmap on Supercell’s linked Brawl esports source is the 1 October BSC 2027 announcement. The 2026 World Finals remain set for 20–22 November in Tokyo with 12 teams and a US$1 million prize pool. Supercell’s event hub also lists broadcast days on 17–18 October; check its live schedule for the event title and start-time changes."
    ],
    detailSections: [{"title":"Brawl Stars — balance and World Finals tracker","description":"Balance notes and World Finals are separate. The current live client is the source for actual Brawl Pass progress and time-limited rewards.","columns":["Area","Current verified detail"],"rows":[["Maintenance update","16 September balance changes and bug fixes"],["Seasons","Royal Academy and Brawl-O-Ween"],["World Finals","20–22 November, Tokyo"],["World Finals field","12 teams"],["Prize pool","US$1,000,000"],["Format","Two GSL groups; eight-team double-elimination bracket; best-of-seven Grand Final"],["Teams / player rosters","Official World Finals qualification and roster page required when field is complete"]],"sourceUrl":"https://supercell.com/en/games/brawlstars/blog/release-notes/release-notes-august-2026/"},{"title":"Brawl Stars World Finals — prize, teams and standings status","description":"Supercell has confirmed the event size, format and total prize money. The qualified team/player list belongs to the official World Finals event coverage.","columns":["Item","Official detail"],"rows":[["Dates / venue","20–22 November, Tokyo"],["Prize pool","US$1,000,000"],["Teams","12"],["Format","Two GSL groups of four; top two join four regional-leaderboard leaders in an eight-team double-elimination bracket"],["Grand Final","Best-of-seven"],["Live teams / rosters","Official Brawl Stars World Finals coverage once qualification is complete"],["Player rewards","Current Brawl Pass and event rewards are in-game and season-specific"]],"sourceUrl":"https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/"}],
    playerFocusHeading: 'Brawl Pass, balance and ranked preparation',
    playerFocus: [
      'The Brawl Pass changes by season. Confirm the active pass, reward claims and season timer in the client; the September release note includes more than one themed season and their cosmetics.',
      'Shade’s Super charge and Gadget values, Gus cooldown/healing and El Primo’s Asteroid Belt were adjusted in the 16 September maintenance. Recheck builds and map picks against the latest client balance.',
    ],
    competitionHeading: 'Brawl Stars World Finals 2026',
    competition: ['Brawl Stars Championship event hub: broadcast days listed for 17–18 October 2026 at 05:00 UTC; the hub should be used for the event title, stream and current leaderboard.', 'World Finals: 20–22 November in Tokyo, 12 teams, $1 million prize pool. The 2027 BSC Invitational is tentatively listed for 16–17 January 2027; Supercell says dates are subject to change.'],
    sources: [
      { name: 'Supercell — Road to Brawl Stars Championship 2027', url: 'https://supercell.com/en/games/brawlstars/blog/esports/your-path-to-bsc-2027/' },
      { name: 'Supercell — Brawl Stars x Duolingo event', url: 'https://supercell.com/en/games/brawlstars/blog/community/brawl-stars-x-duolingo/' },
      { name: 'Brawl Stars Esports — World Finals format', url: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/' },
      { name: 'Brawl Stars Championship live event hub', url: 'https://event.supercell.com/brawlstars/en/' },
    ],
    faqs: [
      { question: 'When are Brawl Stars World Finals 2026?', answer: 'Supercell lists 20–22 November in Tokyo, with 12 teams and a $1 million prize pool.' },
      { question: 'Which Brawlers were adjusted in the September hotfix?', answer: 'The 16 September notes list balance changes for Shade, Gus, El Primo and Amber. Read the linked notes for individual Gadget and ability values.' },
    ],
  },
  {
    gameId: 'clash_of_clans', title: 'Clash of Clans News: October Gold Pass, Totem Thrower & LCQ | Tradivex',
    description: 'Clash of Clans October 2026 guide: Cosmic Curse, Totem Thrower, Shroud Queen Gold Pass, October Clan War League and World Championship LCQ.',
    heading: 'Clash of Clans News: October Portal Panic and Gold Pass',
    intro: 'October’s Cosmic Curse: Portal Panic season brings the temporary Totem Thrower, Shroud Queen Gold Pass skin and timed Portal events. Clan War League and challenge dates are listed below.',
    updateHeading: 'Portal Challenge is live; Portal Panic starts 8 October', updateDate: '7 October 2026',
    update: [
      'Supercell’s 1 October Clash-O-Ween announcement starts Cosmic Curse: Portal Panic for the month. The new temporary Totem Thrower attacks ground targets from range; every fourth attack throws a totem that stuns nearby defenses and creates a decoy. The event also schedules October Clan War League for 1–11 October and Clan Games for 22–28 October.',
      'The October Gold Pass includes Shroud Queen as its exclusive Hero Skin, with Ghost Champion as the alternate option named by Supercell. The September WWE event and its Yeti Undertaker temporary troop ended on 1 October, so those rewards should no longer be described as current.',
      "Cosmic Curse: Portal Panic runs through October. The 1 October announcement lists the Totem Thrower temporary troop and Shroud Queen Gold Pass; Clan War League runs 1–11 October. The Portal Medal Event is scheduled for 8–25 October, with Portal Pendant equipment available through the Trader Shop until 27 October; these dates make the October calendar useful before spending medals."
    ],
    detailSections: [{"title":"Clash of Clans — October event calendar","description":"Clash is not a conventional team-roster esport on the news page; the useful player data is event timing, eligibility and reward deadlines.","columns":["Event / feature","Current verified detail"],"rows":[["Cosmic Curse: Portal Panic","1–31 October"],["Temporary troop","Totem Thrower"],["Gold Pass skin","Shroud Queen; Ghost Champion alternate option"],["Clan War League","1–11 October"],["Portal Challenge","6–13 October"],["Portal Medal Event","8–25 October"],["Trader Shop deadline","Portal Pendant available through 27 October"],["Clan/competition standings","Use the in-game Clan War League leaderboard for each clan’s live table"]],"sourceUrl":"https://supercell.com/en/games/clashofclans/blog/news/cosmic-curse-portal-panic-teleports-in/"},{"title":"Clash of Clans — rewards and competitive standings status","description":"October rewards are seasonal and in-game. Clan competition scoreboards are clan-specific, not a universal player-esports table.","columns":["Item","Official detail"],"rows":[["Gold Pass reward","Shroud Queen Hero Skin; Ghost Champion is the named alternate option"],["Portal Medal Event","8–25 October"],["Portal Pendant availability","Trader Shop through 27 October"],["Community reward","Cosmic Streak event rewards depend on participation and community goals"],["Prize pool","Not stated in the October event announcement"],["Points / clan standings","In-game Clan War League leaderboard for each group"],["Player roster","Clans manage their own war rosters in-game"]],"sourceUrl":"https://supercell.com/en/games/clashofclans/blog/news/cosmic-curse-portal-panic-teleports-in/"}],
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
    gameId: 'clash_royale', title: 'Clash Royale News: Shocktober Season & October Events | Tradivex',
    description: 'Clash Royale October 2026 Shocktober season: Hero Electro Wizard, Electro Giant Evolution, album event and October tournament dates.',
    heading: 'Clash Royale News: September Balance and October Season',
    intro: 'Supercell’s Shocktober season begins on 6 October with Hero Electro Wizard and Electro Giant Evolution. Merge Tactics Season 11 remains a separate mode with its own October changes.',
    updateHeading: 'Shocktober brings Hero Electro Wizard and Electro Giant Evolution', updateDate: '7 October 2026',
    update: [
      'Supercell’s 5 October Shocktober announcement says the new season starts 6 October. It adds Hero Electro Wizard, an Electro Giant Evolution, the Spooky Chess league (5–19 October) and the C.H.A.O.S. event schedule beginning 19 October.',
      'The album event runs 6 October–2 November. Power Surge Global Tournament is scheduled for 20–25 October, followed by the 20-win challenge from 26 October–2 November. Check the in-game Events tab for entry rules, reward milestones and local reset times.',
      "Merge Tactics Season 11 remains a separate mode with its October rules and troop pool. Shocktober’s new season and event dates apply to Clash Royale’s standard seasonal calendar; use the relevant mode screen for its own balance and rewards."
    ],
    detailSections: [{"title":"Clash Royale — Merge Tactics Season 11 tracker","description":"Merge Tactics has its own pool, Supers and balance. Standard Clash Royale card balance and Global Tournaments must be tracked separately.","columns":["Area","Current verified detail"],"rows":[["Season 11 window","1 September–1 December"],["October change date","1 October"],["October content","Boss Supers, returning Boss trait, October modifiers and troop pool"],["Balance","October update buffs several 2- and 3-Elixir troops"],["Ranked leaderboard","Use in-game mode leaderboard; it is not the standard Clash Royale ladder"],["Team / player table","Merge Tactics is an individual mode; no team roster table applies"]],"sourceUrl":"https://supercell.com/en/games/clashroyale/blog/release-notes/merge-tactics-season-11/"},{"title":"Clash Royale — rewards and competitive standings status","description":"Merge Tactics rewards and leaderboards are mode-specific. Supercell’s Season 11 announcement does not turn it into a team esports league.","columns":["Item","Official detail"],"rows":[["Season window","1 September–1 December"],["Ranked reward track","Starsteel Road reaches Diamond at 4,000 Starsteel"],["Ruler rewards","Four Rulers can be collected on Starsteel Road"],["New equipment","Five named items in Season 11"],["Prize pool","No current prize pool published in the cited Season 11 announcement"],["Team/player table","Merge Tactics is an individual mode; use its in-game leaderboard"],["Pass rewards","Check current Pass Royale in-game; rewards change by season"]],"sourceUrl":"https://supercell.com/en/games/clashroyale/blog/release-notes/merge-tactics-season-11/"}],
    playerFocusHeading: 'Pass Royale, balance and mode-specific rewards',
    playerFocus: [
      'Pass Royale now offers reward choices and guaranteed seasonal Hero Fragments in the free track, per Supercell’s 2026 progression update. Compare the current in-game reward options instead of following old advice that assumes the former pass layout.',
      'Clash Royale and Merge Tactics have distinct season content. Check which mode a balance or leaderboard post applies to before using it for deck or placement decisions.',
    ],
    competitionHeading: 'Clash Royale League status',
    competition: ['Supercell’s CRL 2026 Last Chance Qualifier ran 5–6 September; the official event site lists Woo as winner.', 'As of 6 October, Supercell’s event page says more events are coming but does not announce the next live CRL date. In-game Global Tournaments are separate limited-time competitions.'],
    sources: [
      { name: 'Supercell — Shocktober season and October events', url: 'https://supercell.com/en/games/clashroyale/blog/release-notes/new-season-shocktober/' },
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
    updateHeading: 'Version 7.1: October 5 story teaser and live Starlit Gala web event', updateDate: '7 October 2026',
    update: [
      'HoYoverse’s 22 September event overview says “Silverwing in Pursuit of the Moon” begins 24 September at 10:00 server time. Completing event quests can award the event-exclusive Silver Light sword, Primogems, Crown of Insight and other materials.',
      'HoYoverse’s news page also lists the Version 7.1 “A Requiem for the Underworld” Phase I events preview, character trailers for Vesna and Vodyanitsa, and a Miliastra Wonderland creator contest published on 23 September. Check the in-game Events menu for each server’s remaining claim window and banner schedule.',
      "Checked 7 October 2026: Version 7.1, “A Requiem for the Underworld,” is live, with its event schedule and banner windows shown in HoYoverse’s official in-game/news calendar. Event start and end times use server time; check the client before spending Primogems because banners and event rewards rotate."
    ],
    detailSections: [{"title":"Genshin Impact — Version 7.1 player tracker","description":"Genshin is a live-service RPG, not a team esports circuit. The reliable detail for players is the version, server-time event schedule and individual banner timer.","columns":["Area","Current verified detail"],"rows":[["Current version","Version 7.1: A Requiem for the Underworld"],["Event timing","Uses server time"],["Banners / rewards","Confirm directly in-game before spending Primogems"],["Player teams","Personal party composition, not published esports rosters"],["Points table","No official global esports standings"],["Official calendar","HoYoverse news and in-game Events screen"]],"sourceUrl":"https://genshin.hoyoverse.com/en/"},{"title":"Genshin Impact — rewards and competition status","description":"Version 7.1 content is player-account and server-time based. It is not a permanent professional team league with a global cash prize table.","columns":["Item","Official status"],"rows":[["Current version","Version 7.1: A Requiem for the Underworld"],["Reward source","Official event calendar and in-game Events screen"],["Banner / event timing","Uses the player’s server time"],["Esports prize pool","No ongoing publisher-run global circuit announced"],["Team/player points","No official global standings"],["Player rewards","Verify exact Primogems, weapons and event conditions in-client before spending"]],"sourceUrl":"https://genshin.hoyoverse.com/en/"}],
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
    gameId: 'stumble_guys', title: 'Stumble Guys News: v0.103 Cursed Fair, Ranked Season 27 & Events | Tradivex',
    description: 'Stumble Guys October 2026 player guide: v0.103 Cursed Fair update, Ranked Season 27, Clubs Season 16, Stumbleween and upcoming Avatar items.',
    heading: 'Stumble Guys News: Cursed Fair and Ranked Seasons',
    intro: 'The official Stumble Guys news feed now lists version 0.103.0, the Cursed Fair season, after the September 0.102.0 Live, Laugh, Lava Land update. Ranked Season 26 ended on 1 October, while Clubs Season 15 continues through 15 October.',
    updateHeading: 'Stumble Guys v0.103.0 adds Ranked Season 27 and October events', updateDate: '7 October 2026',
    update: [
      'Scopely’s 0.103.0 Cursed Fair update adds the Pollo Stick ability and returns Avatar: The Last Airbender with Spirit Aang, Katara, Momo and Uncle Iroh shop items scheduled for 15–22 October.',
      'The official notes schedule Ranked Season 27 for 1 October–5 November and Clubs Season 16 for 15 October–19 November. Stumbleween community challenges run 22 October–2 November. These are separate event timers; check the client for local availability and reward claims.',
      "Checked 7 October 2026 against Scopely’s 0.103.0 official patch notes. The update is a live game season/event update, not a publisher-run professional esports tournament calendar."
    ],
    detailSections: [{"title":"Stumble Guys — current season and events","description":"The 0.103.0 notes assign separate dates to Ranked, Clubs, shop items and Stumbleween.","columns":["Area","Official detail"],"rows":[["Latest update","Version 0.103.0 — Cursed Fair"],["New ability","Pollo Stick"],["Ranked Season 27","1 October–5 November 2026"],["Clubs Season 16","15 October–19 November 2026"],["Stumbleween","22 October–2 November 2026"],["Avatar: The Last Airbender shop items","15–22 October 2026"],["Professional esports","No publisher-run esports calendar confirmed"]],"sourceUrl":"https://communityhub.stumbleguys.com/news/update103"}],
    playerFocusHeading: 'Ranked reward, Clubs season and Stumble Pass',
    playerFocus: [
      'Ranked Season 27 runs until 5 November and lists Azure King as the Champion reward. Confirm your current rank and reward eligibility in the in-game Ranked screen.',
      'Clubs Season 16 begins 15 October and runs through 19 November, with Captain Cursed Heart listed as its reward. Open the Clubs page for your team’s goals and current progress.',
    ],
    competitionHeading: 'Official player tournaments',
    competition: ['September Crown Tournament ran 17–24 September; its Top 100 reward window is complete.', 'Scopely’s 0.103.0 news feed is the current source for new challenges, leaderboards and any October tournament dates. No future exact bracket dates are added until posted.'],
    sources: [
      { name: 'Stumble Guys — official News & Tips', url: 'https://www.stumbleguys.com/news-and-tips' },
      { name: 'Scopely — 0.103.0 Cursed Fair update notes', url: 'https://communityhub.stumbleguys.com/news/update103' },
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
    updateHeading: 'Impostor Month is live after the v19.0.0 Influencer update', updateDate: '7 October 2026',
    update: [
      'Innersloth’s 29 September patch notes say v19.0.0 is available on all platforms and introduces the Influencer as a new Ghost Crewmate role. The role gives eliminated Crewmates a way to communicate information about the Impostor; the full ability rules and any lobby settings are in the linked dev log.',
      'On 1 October, Innersloth announced “Impostor Month Begins!” Check the official post and in-game event panel for the monthly challenges, claim windows and cosmetics. The public announcement headline did not include a full reward schedule in the page summary checked.',
      "Among Us v19.0.0 launched on 29 September with the Influencer ghost Crewmate role; Innersloth’s 30 September post then introduced Impostor Month. Check the live game/news panel for the event’s available tasks and rewards because role availability and limited-time event timing can vary by platform rollout."
    ],
    detailSections: [{"title":"Among Us — update and event tracker","description":"Among Us is a social-deduction game with platform rollouts and community events, not a permanent professional league.","columns":["Area","Current verified detail"],"rows":[["Latest update","v19.0.0, released 29 September"],["New role","Influencer ghost Crewmate role"],["Current event","Impostor Month announced 30 September"],["Reward timing","Check the live game/news panel for platform availability"],["Team standings","No official global esports points table"],["Player rosters","Only apply to separate community-organized tournaments"]],"sourceUrl":"https://www.innersloth.com/news/"},{"title":"Among Us — rewards and competition status","description":"Among Us content is delivered as a game update and limited-time events. It does not have a permanent publisher-run professional league.","columns":["Item","Official status"],"rows":[["Latest update","v19.0.0"],["Current event","Impostor Month"],["Reward source","Live game/news panel; timing can vary by platform rollout"],["Global prize pool","Not announced"],["Teams / player points","No official global esports leaderboard"],["Community tournaments","Rosters, rules and prize money belong to their own organizer"]],"sourceUrl":"https://www.innersloth.com/news/"}],
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
    updateHeading: 'Halloween season runs through 4 November; new weekly rewards start 8 October', updateDate: '7 October 2026',
    update: [
      'Rockstar’s 1 October Newswire listing confirms Halloween content throughout October. Its public headline does not provide every weekly activity, payout multiplier or reward deadline; open the linked article and in-game Newswire for the current week’s full list.',
      'The latest September items included GTA+ early access to the Pegassi Horus and the Business Rivalries event. Those are dated promotions; do not assume a past vehicle or bonus remains claimable after its week ends.',
      "Checked 7 October 2026: Rockstar’s 1 October Halloween post says the current weekly challenge/reward window runs through today, 7 October. The next listed window is 8–14 October: win two Adversary modes for the Pink Skull Emissive Mask and GTA$100,000; a free Twilight Knife T-Shirt is also listed for that week. GTA+ changes on 8 October, so verify membership offers and platform terms in Rockstar’s live post."
    ],
    detailSections: [{"title":"GTA Online — Halloween and weekly tracker","description":"GTA Online rotates weekly bonuses. The title update confirms the seasonal window, but the Newswire is required for exact current payouts and claims.","columns":["Area","Current verified detail"],"rows":[["Halloween window","1 October–4 November"],["Returning content","Halloween content returns"],["Updated activity","Ghosts Exposed has new locations and rewards"],["Weekly bonuses","Check Rockstar’s Thursday Newswire"],["GTA+ benefits","Time-limited and platform/offer dependent"],["Team / player standings","No current publisher-run GTA Online esports championship table"]],"sourceUrl":"https://support.rockstargames.com/articles/4vRqEDvjUs9h7nqRUgc8YO/gtav-title-update-1-73-notes-ps5-ps4-xbox-series-x-or-s-xbox-one-pc-enhanced-legacy"},{"title":"GTA Online — rewards and competition status","description":"The official title update confirms the Halloween window and Ghosts Exposed update. Weekly payout amounts are intentionally kept in Rockstar’s rotating Newswire posts.","columns":["Item","Official status"],"rows":[["Halloween window","1 October–4 November"],["Updated reward activity","Ghosts Exposed: new locations and rewards"],["Exact weekly cash/RP bonuses","Check Rockstar’s current Thursday Newswire"],["GTA+ rewards","Time-limited and offer/platform dependent"],["Global esports prize pool","No current publisher-run championship listed"],["Teams / points table","No official GTA Online pro-league scoreboard"]],"sourceUrl":"https://support.rockstargames.com/articles/4vRqEDvjUs9h7nqRUgc8YO/gtav-title-update-1-73-notes-ps5-ps4-xbox-series-x-or-s-xbox-one-pc-enhanced-legacy"}],
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
      { name: "Rockstar Support — GTAV Title Update 1.73 notes", url: "https://support.rockstargames.com/articles/4vRqEDvjUs9h7nqRUgc8YO/gtav-title-update-1-73-notes-ps5-ps4-xbox-series-x-or-s-xbox-one-pc-enhanced-legacy" }
    ],
    faqs: [
      { question: 'What is happening in GTA Online in October 2026?', answer: 'Rockstar’s 1 October Newswire post announces Halloween thrills throughout October. Check the full post for this week’s modes, rewards and exact dates.' },
      { question: 'Are GTA Online weekly races esports tournaments?', answer: 'No. Weekly races and adversary modes are live-service activities; Rockstar’s Newswire checked did not list a current official esports championship.' },
    ],
  },
  {
    gameId: 'marvel_rivals',
    title: 'Marvel Rivals News: Season 10, Ignite 2026 Stage 2 & Playoffs | Tradivex',
    description: 'Marvel Rivals Season 10 news and Ignite 2026 esports schedule: Stage 2 playoffs, regional finals, prize pool, Grand Finals qualification and official NetEase links.',
    heading: 'Marvel Rivals News, Season 10 and Ignite Esports',
    intro: 'Track Marvel Rivals Season 10, official game updates and the 2026 Ignite competitive circuit. Dates, playoff format, qualified Grand Finals places and unknown event details are separated and linked to NetEase’s official sources.',
    updateHeading: 'Ignite Stage 2 playoffs begin 8 October', updateDate: '7 October 2026',
    update: [
      'Marvel Rivals Season 10 began on 11 September 2026. The current official patch notes describe the season launch and the IGNITE Stage 2 schedule; this page does not label that September patch as a new update published today.',
      'Ignite Stage 2 playoffs run 8–18 October. Pacific starts 8 October and its regional final is 11 October; Americas and EMEA begin 15 October; China begins 16 October. The Americas, EMEA and China regional finals are scheduled for 18 October.',
      'The official guide lists a $650,000 Stage 2 prize pool. Twelve teams qualify for the Ignite Grand Finals in late November. NetEase has not yet announced the Grand Finals venue, exact dates, final match schedule or all qualified teams.',
      'Checked 7 October 2026: Pacific playoffs are the next scheduled matches on 8 October. Use the in-game Esports panel or official Ignite page for live brackets and stream times.'
    ],
    detailSections: [
      { title: 'Marvel Rivals Ignite Stage 2 — schedule and format', description: 'NetEase’s official event guide confirms the dates, regional format and qualification places.', columns: ['Stage / region', 'Officially confirmed detail'], rows: [['Group Stage', '17 September–4 October 2026'], ['Playoffs', '8–18 October 2026'], ['Pacific regional final', '11 October; Asia and Oceania combined for playoffs'], ['Americas and EMEA playoffs', 'Begin 15 October; regional finals 18 October'], ['China playoffs', 'Begin 16 October; regional final 18 October'], ['Playoff format', 'Regional double elimination; BO5 matches, BO7 regional finals'], ['Stage 2 prize pool', 'US$650,000'], ['Grand Finals qualification', '12 teams total: AMER 4, EMEA 4, PAC 2, China 2'], ['Ignite Grand Finals', 'Late November; exact date and venue not yet announced']], sourceUrl: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html' },
      { title: 'Marvel Rivals Season 10 — patch and player notes', description: 'Season 10 is live; consult the official patch notes for the full hero, map and gameplay change list.', columns: ['Topic', 'Confirmed detail'], rows: [['Season 10 launch', '11 September 2026'], ['Season 10 tournament build', 'Ignite Stage 2 uses Season 10'], ['Map pool', 'Thebes added for Stage 2; a new Domination map added for playoffs'], ['Season rank reward', 'Gorr the God Butcher — Gods’ Graveyard for Gold tier'], ['Official match schedules', 'Use the in-game Esports system for current matches and teams'], ['Last checked', '7 October 2026']], sourceUrl: 'https://www.marvelrivals.com/gameupdate/20260909/41548_1313441.html' },
    ],
    playerFocusHeading: 'Marvel Rivals Season 10 and competitive play',
    playerFocus: ['Season 10 launched 11 September. Check the current in-game event and rank reward panels for account-specific claim windows.', 'The Ignite guide says official match schedules, participating teams and player information are available in the in-game Esports system. Subscribe there for match reminders.'],
    competitionHeading: 'Marvel Rivals esports schedule and tournaments',
    competition: ['Ignite Stage 2 playoffs are scheduled 8–18 October 2026, with regional finals on 11 and 18 October.', 'Twelve regional finalists qualify for the Ignite Grand Finals in late November; NetEase has not published the venue or exact Grand Finals dates yet.', 'Marvel Rivals Championship (MRC) is a separate in-game competition that awards Champion Points toward the annual Ignite pathway.'],
    sources: [
      { name: 'Marvel Rivals Ignite — Stage 2 schedule, format and prize pool', url: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html' },
      { name: 'Marvel Rivals — Season 10 official patch notes', url: 'https://www.marvelrivals.com/gameupdate/20260909/41548_1313441.html' },
      { name: 'Marvel Rivals Ignite — official esports news', url: 'https://www.marvelrivalsesports.com/news/official/index.html' },
    ],
    faqs: [
      { question: 'When are the Marvel Rivals Ignite 2026 Stage 2 playoffs?', answer: 'NetEase schedules Stage 2 playoffs from 8 to 18 October 2026. Pacific starts first; Americas and EMEA begin 15 October, and China begins 16 October.' },
      { question: 'How many teams qualify for the Marvel Rivals Ignite Grand Finals?', answer: 'Twelve teams qualify: four from Americas, four from EMEA, two from Pacific and two from China.' },
      { question: 'Where and when are the Marvel Rivals Grand Finals?', answer: 'The official Stage 2 guide says late November 2026 and confirms 12 teams, but the exact dates and venue have not yet been announced.' },
    ],
  },
  {
    gameId: 'arena_of_valor',
    title: 'Arena of Valor News: AoV Esports, AIC 2026 & 10Fest Winter Finals | Tradivex',
    description: 'Arena of Valor (AoV) news and esports schedule: Garena 10Fest Winter Grand Final in Hanoi on 7 November, AIC 2026 in Thailand and official patch sources.',
    heading: 'Arena of Valor News and Esports Schedule',
    intro: 'Follow Arena of Valor, also known regionally as Liên Quân Mobile and RoV, with separate official tournament details for its regional leagues and international AIC championship. Arena of Valor is covered separately from Honor of Kings.',
    updateHeading: '10Fest Winter Grand Final set for Hanoi on 7 November', updateDate: '7 October 2026',
    update: [
      'Garena’s Arena of Valor game hub showed English patch notes dated 18 September 2026 as its latest English patch entry when checked on 7 October. Regional clients can publish additional localized patch notices; the game hub is linked below.',
      'Garena’s official Liên Quân 10Fest announcement schedules the Đấu Trường Danh Vọng (Arena of Glory) Winter 2026 Grand Final for 7 November at My Dinh National Stadium in Hanoi. Finalist teams and match start times were not listed in the announcement.',
      'Garena also confirms AIC 2026, the year-end Arena of Valor International Championship, will be held in Thailand. Exact dates, team count, format, prize pool and match schedule are not yet published in the cited official announcement.',
      'Checked 7 October 2026: only the confirmed 10Fest finals date and AIC country/time window are listed. Do not confuse AoV’s distinct tournament ecosystem with Honor of Kings events.'
    ],
    detailSections: [
      { title: 'Arena of Valor esports — confirmed 2026 events', description: 'Garena’s official sources confirm the November Vietnam final and a year-end international championship in Thailand.', columns: ['Event', 'Confirmed detail'], rows: [['Đấu Trường Danh Vọng Winter Grand Final', '7 November 2026 at My Dinh National Stadium, Hanoi'], ['10Fest day 2', '8 November 2026 is the AoV tenth-anniversary music festival, not an esports match day'], ['Winter final matchup and start time', 'Not stated in the official event announcement'], ['AIC 2026', 'Year-end 2026 in Thailand; exact dates and format pending'], ['AIC team list / prize pool', 'Not yet published in the cited Garena announcement'], ['Official AoV patch hub', 'Latest English patch entry visible: 18 September 2026'], ['Last checked', '7 October 2026']], sourceUrl: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/' },
      { title: 'AoV tournament pathway and regional identities', description: 'Garena’s 2026 plan identifies the regional leagues and keeps Arena of Valor distinct from Honor of Kings.', columns: ['Competition', 'Organizer detail'], rows: [['Arena of Glory (AOG)', 'Vietnam regional league; Winter 2026 final is part of 10Fest'], ['RoV Pro League (RPL)', 'Thailand regional league'], ['Garena Challenger Series (GCS)', 'Taiwan, Hong Kong and Macau regional competition'], ['Arena of Valor Premier League 2026', 'Returned mid-year with main and women’s competition formats'], ['AIC International Championship', 'Year-end championship in Thailand; detailed schedule pending'], ['EWC 2026 AoV event', 'Completed 30 July–8 August; do not list as upcoming']], sourceUrl: 'https://www.garena.sg/news/2M54DC' },
    ],
    playerFocusHeading: 'Arena of Valor updates and regional game names',
    playerFocus: ['Arena of Valor may appear as Liên Quân Mobile in Vietnam and RoV in Thailand. Confirm your region’s game client before applying a display name.', 'Garena’s public AIC announcement does not provide the 2026 roster or daily schedule yet. Follow the official tournament hub for the next release.'],
    competitionHeading: 'Arena of Valor tournaments and future schedule',
    competition: ['Đấu Trường Danh Vọng Winter 2026 Grand Final: 7 November in Hanoi, Vietnam.', 'Arena of Valor International Championship 2026: confirmed for year-end in Thailand; exact dates, teams and format await Garena’s announcement.', 'Arena of Valor’s AoV Premier League and regional AOG, RPL and GCS leagues are separate events; this page does not combine their standings.'],
    sources: [
      { name: 'Garena Liên Quân Mobile — 10Fest and Winter Grand Final announcement', url: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/' },
      { name: 'Garena — Arena of Valor 2026 esports plans and AIC', url: 'https://www.garena.sg/news/2M54DC' },
      { name: 'Garena Arena of Valor — regional game and patch hub', url: 'https://main.aov.garena.co.id/' },
    ],
    faqs: [
      { question: 'When is the Arena of Valor Winter 2026 Grand Final?', answer: 'Garena’s Liên Quân 10Fest announcement schedules the Đấu Trường Danh Vọng Winter Grand Final for 7 November 2026 at My Dinh National Stadium in Hanoi.' },
      { question: 'When is the Arena of Valor International Championship 2026?', answer: 'Garena confirms AIC 2026 will be a year-end championship in Thailand, but exact dates and the match schedule have not yet been announced in the cited source.' },
      { question: 'Is Arena of Valor the same game as Honor of Kings?', answer: 'They are distinct game titles with separate tournament coverage. This page tracks AoV, including its regional AOG, RPL and GCS competitions.' },
    ],
  },
  {
    gameId: 'teamfight_tactics',
    title: 'TFT News: Teamfight Tactics Esports, Superbrawl & Vegas Open 2026 | Tradivex',
    description: 'Teamfight Tactics (TFT) esports news and tournament calendar: Tactician’s Superbrawl 6–8 November, TFT Vegas Open 11–13 December, format and prize details.',
    heading: 'Teamfight Tactics News and TFT Esports Calendar',
    intro: 'Find Teamfight Tactics Set updates, TFT Pro Circuit coverage and official esports dates. The calendar separates individual auto-battler competitions from TFT’s newer 4v4 team format and marks unannounced regional details clearly.',
    updateHeading: 'TFT esports: November Superbrawl and December Vegas Open confirmed', updateDate: '7 October 2026',
    update: [
      'Riot’s current Enchanted Wilds Pro Circuit page scheduled the Blossom Cup for 2–4 October; that event has ended. Riot’s next announced open-format event is Tactician’s Superbrawl, a regional 4v4 competition scheduled for 6–8 November.',
      'Tactician’s Superbrawl is open across AMER, EMEA and APAC. Riot specifies 96 teams per region, single-elimination best-of-three matches and a ladder snapshot on 2 November. Regional qualification instructions and prize details are still being released through local channels.',
      'The TFT Vegas Open is a 1,024-player LAN open bracket in Las Vegas from 11–13 December. Riot lists a $311,300 prize pool, with $100,000 for the champion; the top 128 receive a share. Riot says competitors will play Set 19.',
      'Checked 7 October 2026: no newly dated TFT gameplay patch was listed in the official esports items reviewed. These are confirmed tournament updates, not claims of a new game patch today.'
    ],
    detailSections: [
      { title: 'TFT Tactician’s Superbrawl — 4v4 tournament', description: 'Riot has officially added a team competition alongside its usual solo TFT circuit.', columns: ['Detail', 'Official announcement'], rows: [['Dates', '6–8 November 2026'], ['Regions', 'AMER, EMEA and APAC'], ['Teams', '96 teams per region; four players per team'], ['Bracket', 'Single elimination, best-of-three'], ['Ladder snapshot', '2 November 2026'], ['Qualification', 'Ladder captain slots and sub-regional 4v4 qualifiers; region-specific details vary'], ['Trials pathway', 'Top two teams in each region can earn non-TPC player places in Set 19 Tactician’s Trials'], ['Prize breakdown', 'Not yet published']], sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/4v4-arrives-to-compete-tft/' },
      { title: 'TFT Vegas Open 2026 — LAN, prize pool and format', description: 'Riot’s official competitor guide lists event dates, field size, scoring and prize money.', columns: ['Detail', 'Official announcement'], rows: [['Dates', '11–13 December 2026'], ['Venue city', 'Las Vegas, Nevada; exact venue details pending'], ['Competitors', '1,024-player open bracket'], ['Prize pool', 'US$311,300; US$100,000 for champion; top 128 paid'], ['Format', 'Three-day event with eight-player lobbies and checkmate final'], ['Game set', 'Set 19 planned for the tournament'], ['Qualifier note', 'Tactician’s Gauntlet: Vegas Qualifiers were cancelled; passes and entry details use Riot’s current event guide']], sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/tft-vegas-open-2026-competitor-info/' },
      { title: 'TFT Pro Circuit — Enchanted Wilds', description: 'Riot’s tier-one regional circuit offers Pro Points and qualification into the Tactician’s Crown.', columns: ['Cup', 'Official 2026 dates / status'], rows: [['Riftbeast Cup', '4–6 September; completed'], ['Elderwood Cup', '18–20 September; completed'], ['Blossom Cup', '2–4 October; completed'], ['Pro Circuit field', 'Top 32 players per region'], ['Prize pool', 'US$30,000 per Cup'], ['Next Crown details', 'Consult Riot’s regional standings and subsequent event announcements']], sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/tft-pro-circuit-enchanted-wilds-everything-you-need-to-know/' },
    ],
    playerFocusHeading: 'TFT Set 18 and Set 19 competitive updates',
    playerFocus: ['Enchanted Wilds is the current Set 18 Pro Circuit set in the published tournament guide. Regional ladder standings and qualification rules vary by server.', 'Riot’s Vegas Open guide says Set 19 will be used in December. Check the official competitor guide for later changes to passes, entry, seeding and prize terms.'],
    competitionHeading: 'TFT tournaments, Pro Circuit and esports schedule',
    competition: ['Tactician’s Superbrawl: 6–8 November, open regional 4v4 competition with 96 teams per region.', 'TFT Vegas Open: 11–13 December in Las Vegas, 1,024 competitors and a US$311,300 prize pool.', 'Enchanted Wilds Pro Circuit Blossom Cup took place 2–4 October; the next Crown pathway and regional results should be checked on Riot’s live esports hub.'],
    sources: [
      { name: 'Riot TFT — Tactician’s Superbrawl official announcement', url: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/4v4-arrives-to-compete-tft/' },
      { name: 'Riot TFT — Vegas Open 2026 competitor guide', url: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/tft-vegas-open-2026-competitor-info/' },
      { name: 'Riot TFT — Enchanted Wilds Pro Circuit dates and format', url: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/tft-pro-circuit-enchanted-wilds-everything-you-need-to-know/' },
      { name: 'Riot TFT — official esports news', url: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/' },
    ],
    faqs: [
      { question: 'When is the TFT Tactician’s Superbrawl 2026?', answer: 'Riot schedules the 4v4 regional tournament for 6–8 November 2026 across AMER, EMEA and APAC.' },
      { question: 'How many players can compete in the TFT Vegas Open 2026?', answer: 'Riot’s competitor guide lists a 1,024-player open bracket for the Las Vegas event on 11–13 December.' },
      { question: 'What is the TFT Vegas Open prize pool?', answer: 'Riot lists a US$311,300 prize pool, including US$100,000 for the champion, with the top 128 players sharing prizes.' },
    ],
  },
];

export const GAME_NEWS_BY_ID = new Map(GAME_NEWS_PAGES.map((page) => [page.gameId, page]));
export const GAME_NEWS_INDEX = POPULAR_GAMES.filter((game) => GAME_NEWS_BY_ID.has(game.id));
