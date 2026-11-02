import { POPULAR_GAMES } from './games.js';

export type TournamentStatus = 'upcoming' | 'live' | 'completed' | 'cancelled' | 'draft' | 'unknown';

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
  /** Named entrants confirmed for this event or event stage. */
  participants?: string[];
  participantsLabel?: string;
  participantsNote?: string;
  participantsSourceUrl?: string;
  participantsSourceName?: string;
  format?: string;
  status: TournamentStatus;
  sourceUrl: string;
  sourceName: string;
  updatedAt: string;
  summary: string;
  /** Match schedule with specific times */
  matchSchedule?: {
    date: string;
    time: string;
    teams: string[];
    stage: string;
    score1?: string;
    score2?: string;
    winner?: string;
  }[];
  /** Prize distribution by placement */
  prizeDistribution?: {
    placement: string;
    amount: string;
    team?: string;
  }[];
  /** Tournament bracket data */
  bracket?: {
    rounds: {
      name: string;
      matches: {
        team1: string;
        team2: string;
        score1?: string;
        score2?: string;
        winner?: string;
      }[];
    }[];
  };
  /** ESCharts-style statistics */
  statistics?: {
    peakViewers?: number;
    hoursWatched?: number;
    averageViewers?: number;
    airtime?: string;
    totalMatches?: number;
    peakViewersDate?: string;
  };
  /** Stream information */
  streams?: {
    platform: 'youtube' | 'twitch' | 'kick' | 'facebook';
    url: string;
    language?: string;
    viewerCount?: number;
    isActive?: boolean;
  }[];
  /** Popular matches by viewers */
  popularMatches?: {
    team1: string;
    team2: string;
    viewers: number;
    date: string;
    stage: string;
  }[];
  /** Sponsors */
  sponsors?: string[];
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
  /** Date the local tournament directory was reviewed; this is not a source verification date. */
  reviewedAt?: string;
  /** Reference-only sources must not produce automated news drafts. */
  syncEnabled?: boolean;
}

export const TOURNAMENT_EVENTS: TournamentEvent[] = [
  {
    id: 'cs2-iem-krakow-2026', slug: 'cs2-iem-krakow-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'IEM Kraków 2026', organizer: 'ESL / ESL FACEIT Group',
    startDate: '2026-01-28', endDate: '2026-02-08', dateLabel: '28 Jan – 8 Feb 2026', region: 'Global', location: 'TAURON Arena, Kraków, Poland',
    prizePool: '$1,250,000', teams: 24, format: '24-team event with playoffs', status: 'completed',
    sourceUrl: 'https://pro.eslgaming.com/tour/cs/krakow2026/', sourceName: 'ESL Pro Tour', updatedAt: '2026-11-02',
    summary: 'Team Vitality defeated FURIA 3–1 in the Grand Final on 8 February to win the inaugural IEM Kraków. ESL lists 24 teams and a $1,250,000 total prize pool. The tournament is complete.',
  },
  {
    id: 'dota2-ti-2026', slug: 'dota2-ti-2026', gameId: 'dota2', gameName: 'Dota 2',
    name: 'The International 2026', organizer: 'Valve',
    startDate: '2026-08-13', endDate: '2026-08-23', dateLabel: '13–23 Aug 2026', region: 'Global', location: 'Shanghai, China',
    prizePool: '$3,906,263', teams: 16, format: 'Modified-Swiss group stage followed by eight-team double-elimination main event', status: 'completed',
    sourceUrl: 'https://www.dota2.com/international/prelims/results/', sourceName: 'Dota 2 / Valve', updatedAt: '2026-11-02',
    summary: 'Team Spirit won The International 2026, defeating TEAM VISION 3-2 in the Grand Final. The tournament took place in Shanghai from August 13-23, 2026. Team Spirit earned their third Aegis of Champions with a first-place prize of $1,660,200. The peak viewership exceeded 3 million during the Grand Final.',
    participants: ['Team Spirit', 'TEAM VISION', 'Team Yandex', 'BoomBoys', 'Team Liquid', 'Nigma Galaxy', 'Team Falcons', 'Iron Wing', 'Aurora Gaming', 'GamerLegion', 'LGD Gaming', 'Team Resilience', 'Vici Gaming', 'OG', 'Xtreme Gaming', 'HULIGANI'],
    participantsLabel: 'Main Event teams',
    participantsNote: '16 teams qualified through regional qualifiers to the main event in Shanghai.',
    participantsSourceUrl: 'https://dota2freaks.com/tournaments/the-international-2026/',
    participantsSourceName: 'Dota2Freaks',
    matchSchedule: [
      { date: '2026-08-13', time: 'TBD', teams: ['Group Stage Start'], stage: 'Group Stage', score1: '16', score2: 'teams', winner: 'Modified-Swiss format' },
      { date: '2026-08-15', time: 'TBD', teams: ['Group Stage Rounds'], stage: 'Group Stage', score1: '4', score2: 'rounds', winner: 'Top 8 advance' },
      { date: '2026-08-17', time: 'TBD', teams: ['Group Stage Rounds'], stage: 'Group Stage', score1: '4', score2: 'rounds', winner: 'Elimination stage' },
      { date: '2026-08-20', time: 'TBD', teams: ['Main Event Start'], stage: 'Playoffs', score1: '8', score2: 'teams', winner: 'Double-elimination' },
      { date: '2026-08-21', time: 'TBD', teams: ['Lower Bracket Finals'], stage: 'Playoffs', score1: 'Team Spirit', score2: 'Team Yandex', winner: 'Spirit 2-0' },
      { date: '2026-08-22', time: 'TBD', teams: ['Upper Bracket Finals'], stage: 'Playoffs', score1: 'TEAM VISION', score2: 'Team Yandex', winner: 'Vision advanced' },
      { date: '2026-08-23', time: 'TBD', teams: ['Grand Final'], stage: 'Grand Final', score1: 'Team Spirit', score2: 'TEAM VISION', winner: 'Spirit 3-2' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '$1,660,200' },
      { placement: '2nd', amount: '$507,800' },
      { placement: '3rd', amount: '$351,600' },
      { placement: '4th', amount: '$234,400' },
      { placement: '5th-6th', amount: '$195,300' },
      { placement: '7th-8th', amount: '$156,300' },
      { placement: '9th-13th', amount: '$70,300' },
      { placement: '14th-15th', amount: '$39,100' },
      { placement: '16th', amount: '$19,500' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Lower Bracket Finals',
          matches: [
            { team1: 'Team Spirit', team2: 'Team Yandex', score1: '2', score2: '0', winner: 'Team Spirit' }
          ]
        },
        {
          name: 'Upper Bracket Finals',
          matches: [
            { team1: 'TEAM VISION', team2: 'Team Yandex', score1: 'TBD', score2: 'TBD', winner: 'TEAM VISION' }
          ]
        },
        {
          name: 'Grand Final',
          matches: [
            { team1: 'Team Spirit', team2: 'TEAM VISION', score1: '3', score2: '2', winner: 'Team Spirit' }
          ]
        }
      ]
    },
  },
  {
    id: 'dota2-riyadh-2026', slug: 'dota2-riyadh-2026', gameId: 'dota2', gameName: 'Dota 2',
    name: 'ESL One Riyadh 2026', organizer: 'ESL / Saudi Esports Federation',
    startDate: '2026-07-06', endDate: '2026-07-14', dateLabel: '6–14 Jul 2026', region: 'Global', location: 'Riyadh, Saudi Arabia',
    prizePool: '$5,000,000', teams: 16, format: 'Group stage followed by single-elimination playoffs', status: 'completed',
    sourceUrl: 'https://liquipedia.net/dota2/ESL/One/Riyadh/2026', sourceName: 'ESL / Liquipedia', updatedAt: '2026-11-02',
    summary: 'ESL One Riyadh 2026 featured 16 invited teams competing at Boulevard City. The tournament concluded with the Grand Final on 14 July. Match results and the champion are listed on the official Liquipedia page.',
    participants: ['Team Spirit', 'Team Liquid', 'PSG.LGD', 'OG', 'Secret', 'Tundra Esports', 'Talon Esports', 'TSM', 'beastcoast', 'Evil Geniuses', 'Thunder Predator', 'Entity', 'Aster', 'Virtus.pro', 'Alliance', 'NaVi'],
    participantsLabel: 'Participating teams',
    participantsSourceUrl: 'https://liquipedia.net/dota2/ESL/One/Riyadh/2026',
    participantsSourceName: 'Liquipedia',
  },
  {
    id: 'lol-worlds-2026', slug: 'lol-worlds-2026', gameId: 'league', gameName: 'League of Legends',
    name: 'World Championship 2026', organizer: 'Riot Games',
    startDate: '2026-10-15', endDate: '2026-11-14', dateLabel: '15 Oct – 14 Nov 2026', region: 'Global', location: 'Los Angeles / Allen, Texas / Brooklyn, NY',
    prizePool: '$5,000,000', teams: 19, format: 'Play-In (4 teams), Swiss Stage (16 teams), Knockout Stage (8 teams)', status: 'live',
    sourceUrl: 'https://lolesports.com/en-US', sourceName: 'Riot Games LoL Esports', updatedAt: '2026-11-02',
    summary: "The Worlds Swiss Stage concluded on 31 October. The Knockout Stage is scheduled for 3–8 November in Allen, Texas, and the Grand Final is set for 14 November at Barclays Center in Brooklyn. Nineteen teams entered the event; follow Riot’s live schedule for the current bracket.",
    participants: ['Gen.G', 'Hanwha Life Esports', 'T1', 'Dplus Kia', 'G2 Esports', 'Movistar KOI', 'Karmine Corp', 'Team Liquid', 'LYON', 'Cloud9', 'Anyone\'s Legend', 'Bilibili Gaming', 'TOP Esports', 'Shanghai Invictus Gaming', 'Team Secret Whales', 'CTBC Flying Oyster', 'MVK Esports', 'LOS', 'FURIA'],
    participantsLabel: 'Qualified teams',
    participantsNote: '19 teams qualified from regional leagues and MSI 2026.',
    participantsSourceUrl: 'https://lolesports.com/en-US/news/worlds-2026-primer',
    participantsSourceName: 'Riot Games LoL Esports',
    matchSchedule: [
      { date: '2026-10-15', time: 'TBD', teams: ['Play-In Stage Start'], stage: 'Play-In', score1: '4', score2: 'teams', winner: 'Double-elimination Bo5' },
      { date: '2026-10-18', time: 'TBD', teams: ['Swiss Stage Start'], stage: 'Swiss Stage', score1: '16', score2: 'teams', winner: '5 rounds, Bo1/Bo3' },
      { date: '2026-10-23', time: '12:00 PM CDT', teams: ['Swiss Round 1'], stage: 'Swiss Stage', score1: '8', score2: 'matches', winner: 'Adv/elim matches' },
      { date: '2026-10-24', time: '12:00 PM CDT', teams: ['Swiss Round 2'], stage: 'Swiss Stage', score1: '8', score2: 'matches', winner: '3 wins advance' },
      { date: '2026-10-25', time: '12:00 PM CDT', teams: ['Swiss Round 3'], stage: 'Swiss Stage', score1: '8', score2: 'matches', winner: '3 losses out' },
      { date: '2026-10-26', time: '12:00 PM CDT', teams: ['Swiss Round 4'], stage: 'Swiss Stage', score1: '8', score2: 'matches', winner: 'Final rounds' },
      { date: '2026-10-31', time: '12:00 PM CDT', teams: ['Swiss Round 5'], stage: 'Swiss Stage', score1: '8', score2: 'matches', winner: 'Swiss complete' },
      { date: '2026-11-03', time: '4:00 PM CST', teams: ['Quarterfinals'], stage: 'Knockout', score1: 'Bo5', score2: 'matches', winner: 'Allen, Texas' },
      { date: '2026-11-04', time: '4:00 PM CST', teams: ['Quarterfinals'], stage: 'Knockout', score1: 'Bo5', score2: 'matches', winner: 'Allen, Texas' },
      { date: '2026-11-05', time: '4:00 PM CST', teams: ['Quarterfinals'], stage: 'Knockout', score1: 'Bo5', score2: 'matches', winner: 'Allen, Texas' },
      { date: '2026-11-06', time: '4:00 PM CST', teams: ['Quarterfinals'], stage: 'Knockout', score1: 'Bo5', score2: 'matches', winner: 'Allen, Texas' },
      { date: '2026-11-07', time: '4:00 PM CST', teams: ['Semifinals'], stage: 'Knockout', score1: 'Bo5', score2: 'matches', winner: 'Allen, Texas' },
      { date: '2026-11-08', time: '4:00 PM CST', teams: ['Semifinals'], stage: 'Knockout', score1: 'Bo5', score2: 'matches', winner: 'Allen, Texas' },
      { date: '2026-11-14', time: '2:00 PM EST', teams: ['Grand Final'], stage: 'Knockout', score1: 'Bo5', score2: 'match', winner: 'Barclays Center, Brooklyn' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '$2,225,000' },
      { placement: '2nd', amount: '$600,000' },
      { placement: '3rd-4th', amount: '$300,000' },
      { placement: '5th-8th', amount: '$200,000' },
      { placement: '9th-14th', amount: '$100,000' },
      { placement: '15th-18th', amount: '$50,000' },
      { placement: '19th', amount: '$25,000' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Play-In Stage',
          matches: [
            { team1: 'Karmine Corp', team2: 'Cloud9', score1: 'TBD', score2: 'TBD', winner: 'Advances to Swiss' },
            { team1: 'MVK Esports', team2: 'Winner', score1: 'TBD', score2: 'TBD', winner: 'Double-elimination' }
          ]
        },
        {
          name: 'Swiss Stage',
          matches: [
            { team1: '8 Teams Advance', team2: '8 Teams Eliminated', score1: '3W-0L/3W-1L/3W-2L', score2: '3L', winner: 'To Knockout' }
          ]
        },
        {
          name: 'Knockout Stage',
          matches: [
            { team1: 'Quarterfinal Winners', team2: 'Semifinal Winners', score1: 'Bo5', score2: 'Bo5', winner: 'Grand Final' }
          ]
        }
      ]
    },
  },
  {
    id: 'lol-msi-2026', slug: 'lol-msi-2026', gameId: 'league', gameName: 'League of Legends',
    name: 'Mid-Season Invitational 2026', organizer: 'Riot Games',
    startDate: '2026-05-01', endDate: '2026-05-21', dateLabel: '1–21 May 2026', region: 'Global', location: 'Chengdu, China',
    prizePool: '$250,000', teams: 13, format: 'Double round robin group stage followed by bracket stage', status: 'completed',
    sourceUrl: 'https://liquipedia.net/leagueoflegends/Mid-Season/Invitational/2026', sourceName: 'Riot Games / Liquipedia', updatedAt: '2026-11-02',
    summary: 'MSI 2026 featured 13 teams from all major regions. The tournament concluded in Chengdu. Match results and the champion are listed on the official Liquipedia page.',
    participants: ['T1', 'Gen.G', 'JD Gaming', 'Bilibili Gaming', 'LNG Esports', 'Royal Never Give Up', 'WBG', 'FunPlus Phoenix', 'Edward Gaming', 'G2 Esports', 'Fnatic', 'MAD Lions KOI', 'Team Liquid'],
    participantsLabel: 'Participating teams',
    participantsSourceUrl: 'https://liquipedia.net/leagueoflegends/Mid-Season/Invitational/2026',
    participantsSourceName: 'Liquipedia',
  },
  {
    id: 'bgmi-bmsd-2026', slug: 'bgmi-bmsd-2026', gameId: 'bgmi', gameName: 'BGMI',
    name: 'Battlegrounds Mobile India Showdown 2026 (BMSD)', organizer: 'KRAFTON India',
    startDate: '2026-09-22', endDate: '2026-10-18', dateLabel: '22 Sep – 18 Oct 2026',
    region: 'India', location: 'Savaaya Convention, Hyderabad', teams: 16,
    format: '18 matches over 3 days; highest-scoring team wins', status: 'completed',
    sourceUrl: 'https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg',
    sourceName: 'KRAFTON India', updatedAt: '2026-11-02',
    summary: 'Team SouL won BMSD 2026 with 155 points and 2 chicken dinners after 18 matches. Gladiators Esports finished second with 141 points, and iQOO 8Bit third with 140 points. The top 6 teams qualified for BMIC 2026, and the champion earned a PMGC 2026 spot.',
    participants: ['Team SouL', 'Gladiators Esports', 'iQOO 8Bit', 'K9 Esports', 'Blitz Epigrotive Gaming', 'Team Outrage', 'Version1 x Blue Army', 'WELT ESPORTS', 'META NINZA', 'Team Apex Gaming', 'Revenant Xspark', 'MYTH OFFICIAL', 'Wyld Fangs', 'Nebula Esports', 'Godlike Esports', 'Genesis Esports'],
    participantsLabel: 'Grand Finals teams',
    participantsNote: '16 teams competed in the LAN Grand Finals from 16-18 October.',
    participantsSourceUrl: 'https://www.talkesport.com/news/bmsd-2026-grand-finals-semi-finals-and-survival-stage-teams-confirmed/',
    participantsSourceName: 'TalkEsport',
    matchSchedule: [
      { date: '2026-10-16', time: '13:45 IST', teams: ['Match 1 - All Teams'], stage: 'Day 1', score1: '6', score2: 'matches', winner: 'SouL: 34 pts (9th)' },
      { date: '2026-10-16', time: '14:25 IST', teams: ['Match 2 - All Teams'], stage: 'Day 1', score1: '6', score2: 'matches', winner: '3 days total' },
      { date: '2026-10-16', time: '15:10 IST', teams: ['Match 3 - All Teams'], stage: 'Day 1', score1: '6', score2: 'matches', winner: '18 matches' },
      { date: '2026-10-16', time: '15:50 IST', teams: ['Match 4 - All Teams'], stage: 'Day 1', score1: '6', score2: 'matches', winner: 'Smash Point: 126' },
      { date: '2026-10-16', time: '16:40 IST', teams: ['Match 5 - All Teams'], stage: 'Day 1', score1: '6', score2: 'matches', winner: '16 teams' },
      { date: '2026-10-16', time: '17:20 IST', teams: ['Match 6 - All Teams'], stage: 'Day 1', score1: '6', score2: 'matches', winner: '8Bit led Day 2' },
      { date: '2026-10-17', time: '13:45 IST', teams: ['Match 7 - All Teams'], stage: 'Day 2', score1: '6', score2: 'matches', winner: '8Bit: 116 pts (1st)' },
      { date: '2026-10-17', time: '14:25 IST', teams: ['Match 8 - All Teams'], stage: 'Day 2', score1: '6', score2: 'matches', winner: 'Blitz: 100 pts (2nd)' },
      { date: '2026-10-17', time: '15:10 IST', teams: ['Match 9 - All Teams'], stage: 'Day 2', score1: '6', score2: 'matches', winner: 'K9: 99 pts (3rd)' },
      { date: '2026-10-17', time: '15:50 IST', teams: ['Match 10 - All Teams'], stage: 'Day 2', score1: '6', score2: 'matches', winner: 'Welt: 88 pts (4th)' },
      { date: '2026-10-17', time: '16:40 IST', teams: ['Match 11 - All Teams'], stage: 'Day 2', score1: '6', score2: 'matches', winner: 'Outrage: 85 pts (5th)' },
      { date: '2026-10-17', time: '17:20 IST', teams: ['Match 12 - All Teams'], stage: 'Day 2', score1: '6', score2: 'matches', winner: 'SouL: 88 pts (4th)' },
      { date: '2026-10-18', time: '13:45 IST', teams: ['Match 13 - All Teams'], stage: 'Day 3', score1: '6', score2: 'matches', winner: 'SouL won Day 3' },
      { date: '2026-10-18', time: '14:25 IST', teams: ['Match 14 - All Teams'], stage: 'Day 3', score1: '6', score2: 'matches', winner: 'SouL WWCD Match 14' },
      { date: '2026-10-18', time: '15:10 IST', teams: ['Match 15 - All Teams'], stage: 'Day 3', score1: '6', score2: 'matches', winner: 'Final standings' },
      { date: '2026-10-18', time: '15:50 IST', teams: ['Match 16 - All Teams'], stage: 'Day 3', score1: '6', score2: 'matches', winner: 'Gladiators: 141 pts (2nd)' },
      { date: '2026-10-18', time: '16:40 IST', teams: ['Match 17 - All Teams'], stage: 'Day 3', score1: '6', score2: 'matches', winner: '8Bit: 140 pts (3rd)' },
      { date: '2026-10-18', time: '17:20 IST', teams: ['Match 18 - All Teams'], stage: 'Day 3', score1: '6', score2: 'matches', winner: 'SouL Champion 155 pts' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '₹30,00,000' },
      { placement: '2nd', amount: '₹15,00,000' },
      { placement: '3rd', amount: '₹10,00,000' },
      { placement: '4th', amount: '₹7,50,000' },
      { placement: '5th', amount: '₹6,25,000' },
      { placement: '6th', amount: '₹4,50,000' },
      { placement: '7th-8th', amount: '₹3,75,000' },
      { placement: '9th-10th', amount: '₹2,50,000' },
      { placement: '11th-12th', amount: '₹2,00,000' },
      { placement: '13th-14th', amount: '₹1,50,000' },
      { placement: '15th-16th', amount: '₹1,25,000' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Final Standings',
          matches: [
            { team1: 'Team SouL', team2: 'Gladiators Esports', score1: '155', score2: '141', winner: 'Team SouL' },
            { team1: 'iQOO 8Bit', team2: 'K9 Esports', score1: '140', score2: 'N/A', winner: '3rd place' }
          ]
        }
      ]
    },
  },
  {
    id: 'bgmi-bmic-2026', slug: 'bgmi-bmic-2026', gameId: 'bgmi', gameName: 'BGMI',
    name: 'BGMI International Cup 2026 (BMIC)', organizer: 'KRAFTON India',
    startDate: '2026-10-30', endDate: '2026-11-01', dateLabel: '30 Oct – 1 Nov 2026',
    region: 'India, South Korea and Japan', location: 'Mumbai, India', teams: 16,
    format: "16 teams; 18-match Grand Finals across three days", status: 'completed',
    sourceUrl: "https://www.talkesport.com/mobile-gaming/bgmi/ns-redforce-win-bmic-2026/",
    sourceName: "TalkEsport (event results report)", updatedAt: '2026-11-02',
    summary: "Nongshim RedForce won BMIC 2026 with 233 points from 18 matches, taking five Chicken Dinners. NS RedForce earned ₹30 lakh and a PMGC 2026 Gauntlet place. The 16-team event ran 30 October–1 November at The Dome, SVP Indoor Stadium, Mumbai.",
    participantsNote: "Six teams represented India, five South Korea and five Japan. Final standings and score are reported by TalkEsport.",
  },
  {
    id: 'pubgm-pmps-korea-s2-2026', slug: 'pubgm-pmps-korea-s2-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    name: 'PUBG MOBILE Pro Series Korea 2026 Season 2', organizer: 'PUBG MOBILE Esports Korea',
    startDate: '2026-10-03', endDate: '2026-10-18', dateLabel: '3–18 Oct 2026', region: 'South Korea', location: 'Daejeon Dream Arena',
    prizePool: '₩40,000,000', teams: 16, format: 'Five circuit days followed by two Finals days; six matches per day', status: 'completed',
    sourceUrl: 'https://esports.pubgmobile.kr/en/news/208', sourceName: 'PUBG MOBILE Esports Korea', updatedAt: '2026-11-02',
    summary: 'PMPS Korea Season 2 completed its 17–18 October Finals at Daejeon Dream Arena. The official event page confirms 16 teams and a ₩40 million prize pool. The champion qualifies for PMGC 2026; the top three qualify for BMIC subject to the duplicate-slot rule. The checked official schedule does not expose a final standings table, so no score or winner is claimed.',
    participants: ['5Hz', 'APEX', 'Chungnam CNJ esports', 'DAEJEON GAME PT', 'Dplus Kia', 'FN SEJONG', 'FOCUS', 'G.N. Revenant NOVA', 'GyeongBuk Ascenders', 'INCHEON WAVE', 'Jeonnam Esports', 'KIWOOM DRX', 'KX GAMING', 'NS RedForce', 'Re Mind', 'TEAM CG'],
    participantsLabel: 'Participating teams',
    participantsSourceUrl: 'https://esports.pubgmobile.kr/ko/events',
    participantsSourceName: 'PUBG MOBILE Esports Korea',
  },
  {
    id: 'pubgm-pmwc-ewc-2026', slug: 'pubgm-pmwc-ewc-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    name: 'PUBG MOBILE World Cup 2026 at Esports World Cup', organizer: 'Esports World Cup Foundation / PUBG MOBILE Esports',
    startDate: '2026-08-06', endDate: '2026-08-16', dateLabel: '6–16 Aug 2026', region: 'Global', location: 'Paris, France',
    prizePool: '$3,000,000', teams: 32, format: 'Group Stage, Survival Stage and Match Point Finals', status: 'completed',
    sourceUrl: 'https://ewc-web.prod.esf-systems.com/en/competitions/2026/pmwc', sourceName: 'Esports World Cup', updatedAt: '2026-11-02',
    summary: 'The official EWC results page lists S2G Esports as champion and QZZ as MVP. Thirty-two teams competed in Paris; the EWC rulebook lists a $3 million prize pool for PUBG MOBILE.',
    participants: ['4Thrives Esports', '721 GS Esports', 'AG.AL', 'Alpha7 Esports', 'AlUla Club Esports', 'Aurora Gaming', 'DOPENESS', 'eArena', 'ETSH Esports', 'FURIA', 'Gaming Stars Esports', 'Geekay Esports', 'GOAT Team', 'GodLike Esports', 'Horaa Esports', 'Hustler Crew', 'IDA Esports', 'Kiwoom DRX', 'Nigma Galaxy', 'Nongshim RedForce', 'Orangutan', 'S2G Esports', 'Team Flash', 'Team RRQ', 'Team Vitality', 'ThunderTalk Gaming', 'Tianba', 'TT Project', 'ULF Esports', 'Wolves Esports', 'XForce Rejects', 'Yangon Galacticos'],
    participantsLabel: 'Participating teams',
    participantsNote: 'The roster list is cross-checked against official EWC event results; final standings are on the linked event page.',
    participantsSourceUrl: 'https://ewc-web.prod.esf-systems.com/en/competitions/2026/pmwc',
    participantsSourceName: 'Esports World Cup official results',
  },
  {
    id: 'pubgm-pmgc-2026', slug: 'pubgm-pmgc-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    name: 'PUBG MOBILE Global Championship 2026', organizer: 'KRAFTON / PUBG MOBILE Esports',
    startDate: '2026-11-01', endDate: '2026-12-15', dateLabel: '1 Nov – 15 Dec 2026 (official listing window)', region: 'Global', location: 'Venue and stage dates not announced',
    prizePool: '$3,000,000', format: 'Season-ending global championship; detailed stages and participant field pending', status: 'live',
    sourceUrl: 'https://pubgesportsqualifiers.com/tournament', sourceName: 'KRAFTON PUBG MOBILE Esports', updatedAt: '2026-11-02',
    summary: 'KRAFTON’s official tournament listing shows PMGC 2026 running in the 1 November–15 December window with a $3 million prize pool. The listing does not confirm the venue, individual stage dates or complete team field, so those details are left pending.',
  },
  {
    id: 'pubg-asia-stars-2026', slug: 'pubg-asia-stars-2026', gameId: 'pubg_battlegrounds', gameName: 'PUBG: BATTLEGROUNDS',
    name: 'PUBG Asia Stars Tournament & Web Event 2026', organizer: 'KRAFTON / PUBG: BATTLEGROUNDS',
    startDate: '2026-09-17', endDate: '2026-09-20', dateLabel: '17–20 Sep 2026 (tournament); web event through 13 Oct', region: 'Asia', location: 'Online',
    format: 'Six-region streamer competition across PUBG UGC modes plus web event', status: 'completed',
    sourceUrl: 'https://pubg.com/en/events/notice/10926', sourceName: 'PUBG: BATTLEGROUNDS official event notice', updatedAt: '2026-11-02',
    summary: 'PUBG’s official notice lists tournament broadcasts on 17, 19 and 20 September for six Asian regions, with a separate web event open through 13 October. The notice does not provide a result table in its overview.',
  },
  {
    id: 'free-fire-ffws-global-finals-2026', slug: 'free-fire-ffws-global-finals-2026', gameId: 'freefire', gameName: 'Free Fire',
    name: 'Free Fire World Series Global Finals 2026', organizer: 'Garena',
    startDate: '2026-11-06', dateLabel: 'Begins 6 Nov 2026; runs across four weekends', region: 'Global', location: 'Bangkok, Thailand', teams: 24,
    format: 'Global Finals across four high-stakes weekends; detailed stage schedule not listed in the roadmap', status: 'upcoming',
    sourceUrl: 'https://ff.garena.com/en/article/1605/', sourceName: 'Garena Free Fire', updatedAt: '2026-11-02',
    summary: 'Garena’s 2026 roadmap confirms the 24-team FFWS Global Finals will start on 6 November in Bangkok and unfold across four weekends. The cited roadmap does not state the exact final date, venue, prize pool or qualified roster.',
    participantsLabel: 'Qualified teams', participantsNote: 'The cited Garena roadmap confirms a 24-team field but does not list the qualified teams.',
  },
  {
    id: 'valorant-champions-shanghai-2026', slug: 'valorant-champions-shanghai-2026', gameId: 'valorant', gameName: 'VALORANT',
    name: 'VALORANT Champions Shanghai 2026', organizer: 'Riot Games',
    startDate: '2026-09-24', endDate: '2026-10-18', dateLabel: '24 Sep – 18 Oct 2026', region: 'Global', location: 'Shanghai, China', teams: 16,
    format: 'Four-group stage followed by double-elimination playoffs; best-of-three except best-of-five finals', status: 'completed',
    sourceUrl: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know', sourceName: 'VALORANT Esports', updatedAt: '2026-11-02',
    summary: 'LOUD defeated Team Vitality 3-1 in the Grand Final on 18 October 2026 at Shanghai Mercedes-Benz Arena to win their second VALORANT Champions title. LOUD became the first organization to win Champions twice. The tournament featured 16 teams from Americas, EMEA, Pacific, and China competing for a $2.25 million prize pool.',
    participants: ['LOUD', 'Team Vitality', '100 Thieves', 'G2 Esports', 'NRG', 'T1', 'Nongshim RedForce', 'Paper Rex', 'Team Liquid', 'Karmine Corp', 'Global Esports', 'FUT Esports', 'JD Gaming', 'Edward Gaming', 'TYLOO', 'Xi Lai Gaming'],
    participantsLabel: 'Qualified teams',
    participantsNote: '16 teams qualified from VCT Americas, EMEA, Pacific, and China leagues.',
    participantsSourceUrl: 'https://vlr.gg/event/2766/valorant-champions-2026',
    participantsSourceName: 'VLR.gg',
    matchSchedule: [
      { date: '2026-09-24', time: 'TBD', teams: ['Group Stage Start'], stage: 'Group Stage', score1: '16', score2: 'teams', winner: '4 groups' },
      { date: '2026-09-25', time: 'TBD', teams: ['Group A Matches'], stage: 'Group Stage', score1: 'Bo3', score2: 'matches', winner: '100T 1st Group A' },
      { date: '2026-09-26', time: 'TBD', teams: ['Group B Matches'], stage: 'Group Stage', score1: 'Bo3', score2: 'matches', winner: 'Team Vitality 1st Group B' },
      { date: '2026-09-27', time: 'TBD', teams: ['Group C Matches'], stage: 'Group Stage', score1: 'Bo3', score2: 'matches', winner: 'LOUD 1st Group C' },
      { date: '2026-09-28', time: 'TBD', teams: ['Group D Matches'], stage: 'Group Stage', score1: 'Bo3', score2: 'matches', winner: 'NRG 1st Group D' },
      { date: '2026-10-04', time: 'TBD', teams: ['Group Stage Complete'], stage: 'Group Stage', score1: '8', score2: 'advance', winner: 'To Playoffs' },
      { date: '2026-10-07', time: 'TBD', teams: ['Upper Quarterfinals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'NRG, LOUD, VIT advance' },
      { date: '2026-10-08', time: 'TBD', teams: ['Upper Quarterfinals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: '100T, G2 advance' },
      { date: '2026-10-09', time: 'TBD', teams: ['Lower Round 1'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'Elimination matches' },
      { date: '2026-10-10', time: 'TBD', teams: ['Lower Rounds'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'Teams eliminated' },
      { date: '2026-10-11', time: 'TBD', teams: ['Upper Semifinals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'LOUD, VIT advance' },
      { date: '2026-10-12', time: 'TBD', teams: ['Lower Semifinals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: '100T advances' },
      { date: '2026-10-13', time: 'TBD', teams: ['Lower Semifinals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'G2 advances' },
      { date: '2026-10-14', time: 'TBD', teams: ['Lower Finals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: '100T vs G2' },
      { date: '2026-10-15', time: 'TBD', teams: ['Upper Finals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'LOUD advances to GF' },
      { date: '2026-10-16', time: 'TBD', teams: ['Lower Finals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'Team Vitality advances' },
      { date: '2026-10-17', time: 'TBD', teams: ['Lower Bracket Finals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'VIT 2-0' },
      { date: '2026-10-18', time: '14:00 UTC+8', teams: ['Grand Final'], stage: 'Grand Final', score1: 'LOUD', score2: 'Team Vitality', winner: 'LOUD 3-1' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '$1,000,000' },
      { placement: '2nd', amount: '$400,000' },
      { placement: '3rd', amount: '$250,000' },
      { placement: '4th', amount: '$130,000' },
      { placement: '5th-6th', amount: '$85,000' },
      { placement: '7th-8th', amount: '$50,000' },
      { placement: '9th-12th', amount: '$30,000' },
      { placement: '13th-16th', amount: '$20,000' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Group Stage',
          matches: [
            { team1: 'Group A Winner', team2: 'Group B Winner', score1: '100T', score2: 'Team Vitality', winner: 'Advanced' },
            { team1: 'Group C Winner', team2: 'Group D Winner', score1: 'LOUD', score2: 'NRG', winner: 'Advanced' }
          ]
        },
        {
          name: 'Playoffs',
          matches: [
            { team1: 'Upper Semifinals', team2: 'Winners', score1: 'LOUD', score2: 'Team Vitality', winner: 'To Upper Final' },
            { team1: 'Lower Bracket', team2: 'Winners', score1: '100T', score2: 'G2', winner: 'To Lower Final' }
          ]
        },
        {
          name: 'Grand Final',
          matches: [
            { team1: 'LOUD', team2: 'Team Vitality', score1: '3', score2: '1', winner: 'LOUD Champion' }
          ]
        }
      ]
    },
  },
  {
    id: 'hok-kic-2026', slug: 'hok-kic-2026', gameId: 'honor_of_kings', gameName: 'Honor of Kings',
    name: 'Honor of Kings International Championship 2026', organizer: 'Level Infinite / TiMi Studios',
    dateLabel: 'Dates pending official verification', region: 'Unknown', location: 'Pending organizer confirmation',
    format: 'Pending official organizer confirmation', status: 'upcoming',
    sourceUrl: 'https://www.levelinfinite.com/', sourceName: 'Level Infinite (official publisher home)', updatedAt: '2026-11-02',
    summary: 'Current event dates, venue, team field, format, prize pool, qualified teams and results are pending confirmation from the official organizer. This entry was retained as an unverified listing; use Level Infinite’s official announcements for confirmed details.',
  },
  {
    id: 'valorant-game-changers-americas-lcq-2026', slug: 'valorant-game-changers-americas-lcq-2026', gameId: 'valorant', gameName: 'VALORANT',
    name: 'Game Changers Americas Last Chance Qualifier 2026', organizer: 'Riot Games', startDate: '2026-10-14', endDate: '2026-10-15', dateLabel: '14–15 Oct 2026',
    region: 'Americas', location: 'Riot Games Arena, São Paulo, Brazil', teams: 3,
    format: 'Three-team round robin Bo3 on 14 Oct; top two advance to a Bo5 final on 15 Oct', status: 'completed',
    sourceUrl: 'https://valorantesports.com/en-US/leagues/gc_americas_lcq', sourceName: 'VALORANT Esports', updatedAt: '2026-11-02',
    summary: 'The Americas LCQ concluded on 15 October 2026. FlyQuest RED defeated MIBR 3-0 in the Bo5 final to qualify for the Game Changers Championship. FlyQuest RED had previously won 2-1 over Akave Esports and 2-0 over MIBR in the round robin.',
    participants: ['MIBR', 'Akave Esports Black', 'FlyQuest RED'],
    participantsLabel: 'Participating teams',
    participantsSourceUrl: 'https://valorantesports.com/en-US/leagues/gc_americas_lcq',
    participantsSourceName: 'Riot Games VALORANT Esports',
  },
  {
    id: 'valorant-game-changers-championship-2026', slug: 'valorant-game-changers-championship-2026', gameId: 'valorant', gameName: 'VALORANT',
    name: 'VALORANT Game Changers Championship 2026', organizer: 'Riot Games', startDate: '2026-10-22', endDate: '2026-11-01', dateLabel: '22 Oct – 1 Nov 2026',
    region: 'Global', location: 'São Paulo, Brazil', prizePool: '$500,000', teams: 10,
    format: '10-team double-elimination bracket; Bo3 matches, Bo5 for Lower Final and Grand Final', status: 'completed',
    sourceUrl: "https://valorantesports.com/en-US/results/117200126947483851/stage/117200188348360454", sourceName: "Riot Games VALORANT Esports", updatedAt: '2026-11-02',
    summary: "Gentle Mates won the VALORANT Game Changers Championship 2026 after the event ran 22 October–1 November in São Paulo. Riot’s completed bracket lists M8 as runner-up. The 10-team tournament used a double-elimination format and a $500,000 prize pool.",
    participants: ['Team Liquid Brazil', 'MIBR GC', 'G2 Gozen', 'Gentle Mates GC', 'SK Nebula', 'Gen.G GC', 'FENNEL GC', 'Nova Esports GC', 'KRÜ Blaze', 'Shopify Rebellion Gold'],
    participantsLabel: 'Qualified teams',
    participantsNote: '10 teams from EMEA (3), Pacific (2), China (1), Brazil (1), LATAM (1), NA (1), Americas LCQ (1).',
    participantsSourceUrl: 'https://www.strafe.com/news/read/valorant-game-changers-championship-2026-teams-format-schedule/',
    participantsSourceName: 'Strafe',
    matchSchedule: [
      { date: '2026-10-22', time: 'TBD', teams: ['FENNEL GC vs MIBR GC'], stage: 'Upper Round 1', score1: 'Bo3', score2: 'match', winner: 'To Quarterfinals' },
      { date: '2026-10-22', time: 'TBD', teams: ['SK Nebula vs Nova Esports GC'], stage: 'Upper Round 1', score1: 'Bo3', score2: 'match', winner: 'To Quarterfinals' },
      { date: '2026-10-23', time: 'TBD', teams: ['Upper Quarterfinals'], stage: 'Quarterfinals', score1: 'Bo3', score2: 'matches', winner: 'To Semifinals' },
      { date: '2026-10-24', time: 'TBD', teams: ['Upper Quarterfinals'], stage: 'Quarterfinals', score1: 'Bo3', score2: 'matches', winner: 'To Semifinals' },
      { date: '2026-10-27', time: 'TBD', teams: ['Upper Semifinals'], stage: 'Semifinals', score1: 'Bo3', score2: 'matches', winner: 'To Upper Final' },
      { date: '2026-10-28', time: 'TBD', teams: ['Lower Quarterfinals'], stage: 'Lower Bracket', score1: 'Bo3', score2: 'matches', winner: 'To Lower Final' },
      { date: '2026-10-30', time: 'TBD', teams: ['Upper Final'], stage: 'Upper Final', score1: 'Bo3', score2: 'match', winner: 'To Grand Final' },
      { date: '2026-10-31', time: 'TBD', teams: ['Lower Final'], stage: 'Lower Final', score1: 'Bo5', score2: 'match', winner: 'To Grand Final' },
      { date: '2026-11-01', time: 'TBD', teams: ['Grand Final'], stage: 'Grand Final', score1: 'Bo5', score2: 'match', winner: 'Champion' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '$180,000' },
      { placement: '2nd', amount: '$100,000' },
      { placement: '3rd', amount: '$70,000' },
      { placement: '4th', amount: '$50,000' },
      { placement: '5th-6th', amount: '$35,000' },
      { placement: '7th-8th', amount: '$20,000' },
      { placement: '9th-10th', amount: '$10,000' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Upper Bracket',
          matches: [
            { team1: 'FENNEL GC', team2: 'MIBR GC', score1: 'Bo3', score2: 'match', winner: 'Upper Round 1' },
            { team1: 'SK Nebula', team2: 'Nova Esports GC', score1: 'Bo3', score2: 'match', winner: 'Upper Round 1' }
          ]
        },
        {
          name: 'Finals',
          matches: [
            { team1: 'Grand Final', team2: 'Champion', score1: 'Bo5', score2: 'match', winner: 'GCC Winner' }
          ]
        }
      ]
    },
  },
  {
    id: 'cs2-esl-pro-league-s24-2026', slug: 'cs2-esl-pro-league-s24-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'ESL Pro League Season 24', organizer: 'ESL', startDate: '2026-10-03', endDate: '2026-10-11', dateLabel: '3–11 Oct 2026',
    region: 'Global', location: 'Katowice, Poland', prizePool: '$1,000,000', teams: 16, format: 'Swiss group stage followed by single-elimination playoffs', status: 'completed',
    sourceUrl: 'https://pro.eslgaming.com/csgo/proleague/', sourceName: 'ESL Pro League', updatedAt: '2026-11-02',
    summary: 'Team Vitality won ESL Pro League Season 24, defeating MOUZ 3-0 in the Grand Final. The tournament took place from October 3-11 in Katowice, Poland with 16 teams competing for a $1 million prize pool. ZywOo was named the tournament MVP. Vitality made a clean run through the group stage and defeated PARIVISION, Aurora Gaming, and MOUZ in the playoffs.',
    participants: ['Team Spirit', 'Team Falcons', 'MOUZ', '9z Team', 'Team Vitality', 'Natus Vincere', 'Legacy', 'FURIA', 'BetBoom Team', 'Aurora Gaming', 'G2 Esports', 'PARIVISION', '1Win', 'M80', 'Shinden', 'tyloo'],
    participantsLabel: 'Participating teams',
    participantsNote: '16 teams invited plus 4 from ESL Challenger League.',
    participantsSourceUrl: 'https://www.hltv.org/events/8244/esl-pro-league-season-24',
    participantsSourceName: 'HLTV',
    matchSchedule: [
      { date: '2026-10-03', time: 'TBD', teams: ['Group Stage Start'], stage: 'Group Stage', score1: '16', score2: 'teams', winner: 'Swiss format' },
      { date: '2026-10-07', time: 'TBD', teams: ['Group Stage End'], stage: 'Group Stage', score1: 'Top 8', score2: 'advance', winner: 'To Playoffs' },
      { date: '2026-10-09', time: 'TBD', teams: ['Quarterfinals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'Semifinals' },
      { date: '2026-10-10', time: 'TBD', teams: ['Semifinals'], stage: 'Playoffs', score1: 'Bo3', score2: 'matches', winner: 'Grand Final' },
      { date: '2026-10-11', time: 'TBD', teams: ['Grand Final'], stage: 'Grand Final', score1: 'Team Vitality', score2: 'MOUZ', winner: 'Vitality 3-0' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '$125,000' },
      { placement: '2nd', amount: '$50,000' },
      { placement: '3rd', amount: '$30,000' },
      { placement: '4th', amount: '$20,000' },
      { placement: '5th-8th', amount: '$10,000' },
      { placement: '9th-11th', amount: '$6,000' },
      { placement: '12th-14th', amount: '$4,000' },
      { placement: '15th-16th', amount: '$2,500' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Playoffs',
          matches: [
            { team1: 'Team Vitality', team2: 'PARIVISION', score1: '3', score2: '0', winner: 'Vitality' },
            { team1: 'Aurora Gaming', team2: 'Team Vitality', score1: '1', score2: '3', winner: 'Vitality' },
            { team1: 'Team Vitality', team2: 'MOUZ', score1: '3', score2: '0', winner: 'Vitality Champion' }
          ]
        }
      ],
    },
  },
  {
    id: 'cs2-thunderpick-world-championship-2026', slug: 'cs2-thunderpick-world-championship-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'Thunderpick World Championship 2026', organizer: 'Thunderpick / BLAST', startDate: '2026-10-14', endDate: '2026-10-18', dateLabel: '14–18 Oct 2026',
    region: 'Global', location: 'BLAST Studio, Malta', prizePool: '$1,000,000', teams: 8,
    format: 'Two groups followed by playoffs and a third-place playoff', status: 'completed',
    sourceUrl: 'https://dev.blast.tv/cs/tournaments/thunderpick-world-championship-2026', sourceName: 'BLAST Counter-Strike event page', updatedAt: '2026-11-02',
    summary: 'Thunderpick World Championship 2026 concluded on 18 October 2026. FURIA won the Grand Final 3-2 over BetBoom, while Aurora defeated Team Falcons for third place. The tournament featured 8 teams competing at BLAST Studio in Malta for $1 million.',
    participants: ['9z', 'Aurora', 'Team Falcons', 'Ninjas in Pyjamas', 'Legacy', 'PARIVISION', 'FURIA', 'BetBoom'],
    participantsLabel: 'Participating teams', participantsSourceUrl: 'https://dev.blast.tv/cs/tournaments/thunderpick-world-championship-2026', participantsSourceName: 'BLAST Counter-Strike event page',
  },
  {
    id: 'cs2-pgl-masters-bucharest-2026', slug: 'cs2-pgl-masters-bucharest-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'PGL Masters Bucharest 2026', organizer: 'PGL', startDate: '2026-10-24', endDate: '2026-10-31', dateLabel: '24–31 Oct 2026',
    region: 'Global', location: 'Bucharest, Romania', prizePool: '$1,250,000', teams: 16,
    format: 'Group stage, playoffs and third-place match; 16 teams', status: 'completed',
    sourceUrl: "https://www.hltv.org/events/8050/pgl-masters-bucharest-2026", sourceName: "HLTV (event results)", updatedAt: '2026-11-02',
    summary: 'PGL Masters Bucharest 2026 concluded on 31 October. FURIA defeated Nemiga 3–2 in the Grand Final; MOUZ beat Vitality 2–0 for third place. The event had 16 teams and a $1.25 million listed total prize pool.',
    participants: ['Team Spirit', 'Team Vitality', 'Natus Vincere', 'FURIA', 'MOUZ', 'Legacy', 'Aurora Gaming', 'G2 Esports', 'BetBoom Team', 'FUT Esports', '9z Team', 'The MongolZ', 'Nemiga Gaming', 'Team Liquid', 'DENDELE', 'TYLOO'],
    participantsLabel: 'Invited teams',
    participantsSourceUrl: "https://www.pglesports.com/cs2/pgl-masters-bucharest-2026/",
    participantsSourceName: "PGL official event page",
  },
  {
    id: 'cs2-pgl-singapore-major-2026', slug: 'cs2-pgl-singapore-major-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'PGL Singapore Major 2026', organizer: 'PGL', startDate: '2026-11-25', endDate: '2026-12-13', dateLabel: '25 Nov – 13 Dec 2026',
    region: 'Global', location: 'Singapore', prizePool: '$1,250,000', teams: 32, format: 'Counter-Strike Major', status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments/pgl-singapore-major-2026', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-11-02',
    summary: 'PGL’s official event listing confirms a 32-team Major in Singapore from 25 November to 13 December, with a $1.25 million prize pool.',
  },
  {
    id: 'cs2-iem-beijing-2026', slug: 'cs2-iem-beijing-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'IEM Beijing 2026', organizer: 'ESL', startDate: '2026-11-02', endDate: '2026-11-08', dateLabel: '2–8 Nov 2026',
    region: 'Global', location: 'Beijing, China', prizePool: '$1,250,000', teams: 16,
    format: 'Four stages: groups, playoffs and third-place playoff', status: "live",
    sourceUrl: 'https://blast.tv/cs/tournaments/iem-china-2026', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-11-02',
    summary: "IEM Beijing 2026 is underway from 2–8 November in Beijing. The official event listing confirms 16 teams and a $1.25 million prize pool; follow the organizer bracket for match times and results.",
  },
  {
    id: 'cs2-blast-rivals-hk-2026', slug: 'cs2-blast-rivals-hk-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    name: 'BLAST Premier Rivals Hong Kong 2026', organizer: 'BLAST', startDate: '2026-11-11', endDate: '2026-11-15', dateLabel: '11–15 Nov 2026',
    region: 'Global', location: 'Hong Kong', prizePool: '$1,000,000', teams: 8,
    format: 'Eight teams; group stage and playoffs', status: 'upcoming',
    sourceUrl: 'https://blast.tv/cs/tournaments/rivals-2026-season-2', sourceName: 'BLAST.tv Counter-Strike', updatedAt: '2026-11-02',
    summary: 'BLAST lists an eight-team event with a $1 million prize pool from 11–15 November in Hong Kong. Team lineups and further event details remain on the official event page.',
  },
  {
    id: 'fortnite-fncs-solo-october-2026', slug: 'fortnite-fncs-solo-october-2026', gameId: 'fortnite', gameName: 'Fortnite',
    name: 'FNCS Solo Tournament (October 2026)', organizer: 'Epic Games', startDate: '2026-10-05', endDate: '2026-10-27', dateLabel: '5–27 Oct 2026',
    region: 'Regional online competition', location: 'Online (7 regions)', prizePool: 'Regional prize pools vary by region',
    format: 'Solo qualifiers, Heats, Last Chance Qualifier and Finals; official rules list exact rounds', status: 'completed',
    sourceUrl: 'https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC', sourceName: 'Fortnite Competitive official rules', updatedAt: '2026-11-02',
    summary: 'Epic’s official rules list the October FNCS Solos competition stages and regional scoring rules. The Finals window ended on 27 October; final placements are not reproduced here without a linked official results table.',
  },
  {
    id: 'apex-algs-y6-split-2-playoffs', slug: 'apex-algs-y6-split-2-playoffs', gameId: 'apex', gameName: 'Apex Legends',
    name: 'ALGS Year 6 Split 2 Playoffs', organizer: 'Electronic Arts', startDate: '2026-10-29', endDate: '2026-11-01', dateLabel: '29 Oct – 1 Nov 2026',
    region: 'Global', location: 'Orleans Arena, Las Vegas, United States', prizePool: '$2,000,000', teams: 40,
    format: 'Round-robin group stage, double-elimination bracket, Match Point Finals', status: 'completed',
    sourceUrl: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview', sourceName: 'Apex Legends Global Series', updatedAt: '2026-11-02',
    summary: "The ALGS Year 6 Split 2 Playoffs ran 29 October–1 November in Las Vegas, bringing together 40 teams from the Americas, EMEA, APAC North and APAC South for a $2 million prize pool. The event window has ended; use EA’s official event page for its published final standings.",
  },
  {
    id: 'rlcs-world-championship-2026', slug: 'rlcs-world-championship-2026', gameId: 'rocket_league', gameName: 'Rocket League',
    name: 'RLCS World Championship 2026', organizer: 'Rocket League Esports', startDate: '2026-09-15', endDate: '2026-09-20', dateLabel: '15–20 Sep 2026',
    region: 'Global', location: 'Dickies Arena, Fort Worth, Texas', prizePool: '$1,200,000', teams: 20, format: '2026 Rocket League World Championship', status: 'completed',
    sourceUrl: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League official schedule', updatedAt: '2026-11-02',
    summary: 'Team Falcons won the RLCS 2026 World Championship, defeating Spacestation Gaming 4-0 in the Grand Final. This was Team Falcons\' first Rocket League world championship title, making them the first MENA region team to win the RLCS World Championship. The tournament took place from September 15-20 at Dickies Arena in Fort Worth, Texas with 20 teams competing for a $1.2 million prize pool.',
    participants: ['Team Falcons', 'Spacestation Gaming', 'Karmine Corp', 'FUT Esports', 'NRG', 'Virtus.pro', 'Gentle Mates', 'Shopify Rebellion', 'FURIA', 'Manchester City', 'Twisted Minds', 'Team Vitality', 'Ninjas in Pyjamas', 'Wildcard', 'Bigodes', 'MIBR', 'Mate y Tapa', 'R8 Esports', 'Five Fears', 'TSM'],
    participantsLabel: 'Qualified teams',
    participantsNote: '20 teams qualified from EU, NA, SAM, MENA, OCE, APAC, and SSA regions.',
    participantsSourceUrl: 'https://www.rocketleague.com/news/2026-rocket-league-world-championship-primer',
    participantsSourceName: 'Rocket League Esports',
    matchSchedule: [
      { date: '2026-09-15', time: 'TBD', teams: ['Play-in Stage'], stage: 'Play-in', score1: '20', score2: 'teams', winner: 'To Group Stage' },
      { date: '2026-09-16', time: 'TBD', teams: ['Group Stage Start'], stage: 'Group Stage', score1: 'Round', score2: 'robin', winner: 'Advancement' },
      { date: '2026-09-17', time: 'TBD', teams: ['Group Stage'], stage: 'Group Stage', score1: 'Top', score2: 'advance', winner: 'To Playoffs' },
      { date: '2026-09-18', time: 'TBD', teams: ['Playoffs Start'], stage: 'Playoffs', score1: 'Lower', score2: 'bracket', winner: 'Elimination' },
      { date: '2026-09-19', time: 'TBD', teams: ['Playoffs Matches'], stage: 'Playoffs', score1: 'Bo7', score2: 'series', winner: 'Semifinals' },
      { date: '2026-09-20', time: 'TBD', teams: ['Grand Final'], stage: 'Grand Final', score1: 'Team Falcons', score2: 'Spacestation Gaming', winner: 'Falcons 4-0' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '$300,000' },
      { placement: '2nd', amount: '$153,000' },
      { placement: '3rd-4th', amount: '$99,000' },
      { placement: '5th-6th', amount: '$84,000' },
      { placement: '7th-8th', amount: '$66,000' },
      { placement: '9th-12th', amount: '$37,500' },
      { placement: '13th-16th', amount: '$17,250' },
      { placement: '17th-18th', amount: '$9,000' },
      { placement: '19th-20th', amount: '$6,000' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Playoffs',
          matches: [
            { team1: 'Team Falcons', team2: 'Karmine Corp', score1: '4', score2: '2', winner: 'Falcons' },
            { team1: 'Spacestation Gaming', team2: 'TBD', score1: '4', score2: 'TBD', winner: 'To Finals' }
          ]
        },
        {
          name: 'Grand Final',
          matches: [
            { team1: 'Team Falcons', team2: 'Spacestation Gaming', score1: '4', score2: '0', winner: 'Team Falcons Champion' }
          ]
        }
      ]
    }
  },
  {
    id: 'owcs-stage-3-2026', slug: 'owcs-stage-3-2026', gameId: 'overwatch', gameName: 'Overwatch 2',
    name: 'Overwatch Champions Series 2026 Stage 3', organizer: 'Overwatch Esports', startDate: '2026-10-03', endDate: '2026-11-08', dateLabel: '3 Oct – 8 Nov 2026 (regional schedules vary)',
    region: 'Regional leagues', location: 'Online regional competition', format: 'Regional Stage 3 leagues and playoffs; dates vary by region', status: 'upcoming',
    sourceUrl: 'https://overwatch.blizzard.com/en-us/news/24246297/owcs-2026-/', sourceName: 'Overwatch Esports', updatedAt: '2026-11-02',
    summary: 'Blizzard’s 2026 schedule separates OWCS Stage 3 by region. China’s regular-season weeks run 3–4, 10–11, 17–18, 24–25 October and 30 October–1 November, with playoffs on 7–8 November. NA and EMEA regular-season weekends run 10–11, 17–18 and 24–25 October, with playoffs on 30 October–1 November. The 2026 World Finals are scheduled for 2–6 December.',
  },
  {
    id: 'r6-osaka-major-2026', slug: 'r6-osaka-major-2026', gameId: 'rainbow_six', gameName: 'Rainbow Six Siege',
    name: 'BLAST R6 Major Osaka 2026', organizer: 'Ubisoft and BLAST', startDate: '2026-11-07', endDate: '2026-11-15', dateLabel: '7–15 Nov 2026',
    region: 'Global', location: 'ATC Hall, Osaka, Japan', prizePool: '$600,000', format: 'Global Major; winner earns a place at Six Invitational 2027', status: 'upcoming',
    sourceUrl: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege/presales/osaka', sourceName: 'Ubisoft R6 Esports', updatedAt: '2026-11-02',
    summary: 'Ubisoft confirms nine days of competition in Osaka, a $600,000 prize pool and a Six Invitational 2027 qualification place. Team lineups and match-by-match schedule are not yet listed on the ticket announcement.',
  },
  {
    id: 'ea-fc-pro-27-ladder-2026', slug: 'ea-fc-pro-27-ladder-2026', gameId: 'ea_fc', gameName: 'EA FC',
    name: 'EA SPORTS FC Pro 27 Open Ladder', organizer: 'Electronic Arts', startDate: '2026-09-21', endDate: '2026-10-03', dateLabel: '21 Sep – 3 Oct 2026',
    region: 'Ten online regions', location: 'In-game FC Pro mode', format: 'Open regional ladder; top-ranked competitors advance to Regional Qualifiers', status: 'completed',
    sourceUrl: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive', sourceName: 'EA SPORTS FC Pro', updatedAt: '2026-11-02',
    summary: 'The Open Ladder ended 3 October. EA lists 1,376 advancing players across ten regions; Regional Qualifiers were scheduled for 10–11 October, followed by the Global Qualifier on 6–7 November according to EA’s newer event-specific announcement.',
  },
  {
    id: 'mlbb-mpl-ph-s18-playoffs-2026', slug: 'mlbb-mpl-ph-s18-playoffs-2026', gameId: 'mobile_legends', gameName: 'MLBB',
    name: 'MPL Philippines Season 18', organizer: 'MOONTON Games and Mineski Global',
    startDate: '2026-08-21', endDate: '2026-10-25', dateLabel: '21 Aug – 25 Oct 2026',
    region: 'Philippines', location: 'Victoria Sports Tower / PhilSports Arena, Pasig City', teams: 8,
    format: 'Double Round Robin Regular Season + Hybrid Elimination Playoffs', status: 'completed',
    sourceUrl: 'https://en.moonton.com/news/377.html', sourceName: 'MOONTON Games', updatedAt: '2026-11-02',
    summary: 'MPL Philippines Season 18 concluded in October. Aurora Gaming PH defeated Team Falcons 4–2 in the Grand Final to claim its first league title. MOONTON says both finalists will represent the Philippines at M8 in Istanbul in January 2027.',
    participants: ['Team Liquid PH', 'Team Falcons PH', 'ONIC PH', 'Aurora Gaming PH', 'Smart Omega', 'TNC Pro Team', 'AP.Bren', 'Twisted Minds PH'],
    participantsLabel: 'Franchise teams',
    participantsNote: '8 franchise teams competing in the eleventh consecutive season with franchise system.',
    participantsSourceUrl: 'https://liquipedia.net/mobilelegends/MPL/Philippines/Season_18',
    participantsSourceName: 'Liquipedia',
    matchSchedule: [
      { date: '2026-08-21', time: 'TBD', teams: ['Regular Season Start'], stage: 'Group Stage', score1: '8', score2: 'teams', winner: 'Double Round Robin' },
      { date: '2026-09-25', time: 'TBD', teams: ['Regular Season Matches'], stage: 'Group Stage', score1: 'Weekly', score2: 'matches', winner: 'Victoria Sports Tower' },
      { date: '2026-10-11', time: 'TBD', teams: ['Regular Season End'], stage: 'Group Stage', score1: 'Top 6', score2: 'advance', winner: 'To Playoffs' },
      { date: '2026-10-21', time: '3:00 PM PHT', teams: ['Upper Bracket Quarterfinals'], stage: 'Playoffs', score1: 'ONIC vs TNC', score2: 'Aurora vs Omega', winner: 'BO5' },
      { date: '2026-10-22', time: '3:00 PM PHT', teams: ['Upper Bracket Semifinals'], stage: 'Playoffs', score1: 'Falcons vs ONIC', score2: 'Liquid vs Aurora', winner: 'BO5' },
      { date: '2026-10-23', time: '3:00 PM PHT', teams: ['Lower Bracket Semifinal'], stage: 'Playoffs', score1: 'TBD', score2: 'TBD', winner: 'BO5' },
      { date: '2026-10-23', time: '7:00 PM PHT', teams: ['Upper Bracket Final'], stage: 'Playoffs', score1: 'TBD', score2: 'TBD', winner: 'BO5' },
      { date: '2026-10-24', time: '5:00 PM PHT', teams: ['Lower Bracket Final'], stage: 'Playoffs', score1: 'TBD', score2: 'TBD', winner: 'BO5' },
      { date: '2026-10-25', time: '5:00 PM PHT', teams: ['Grand Final'], stage: 'Grand Final', score1: 'TBD', score2: 'TBD', winner: 'Champion + M8 Slots' }
    ],
    prizeDistribution: [
      { placement: '1st', amount: '$75,000' },
      { placement: '2nd', amount: '$30,000' },
      { placement: '3rd', amount: '$15,000' },
      { placement: '4th', amount: '$10,000' },
      { placement: '5th-6th', amount: '$7,500' },
      { placement: '7th-8th', amount: '$5,000' }
    ],
    bracket: {
      rounds: [
        {
          name: 'Regular Season',
          matches: [
            { team1: 'Team Liquid PH', team2: 'Team Falcons PH', score1: '12-2', score2: '12-2', winner: 'Liquid 1st (net games)' },
            { team1: 'ONIC PH', team2: 'Aurora Gaming PH', score1: '9-5', score2: '9-5', winner: 'Playoffs qualified' }
          ]
        },
        {
          name: 'Playoffs',
          matches: [
            { team1: 'Upper Bracket', team2: 'Lower Bracket', score1: 'Hybrid', score2: 'Elimination', winner: 'Grand Final' },
            { team1: 'Grand Final', team2: 'M8 Qualifiers', score1: 'Top 2', score2: 'teams', winner: 'To M8 World Championship' }
          ]
        }
      ]
    },
  },
  {
    id: 'hok-asian-games-2026', slug: 'hok-asian-games-2026', gameId: 'honor_of_kings', gameName: 'Honor of Kings',
    name: 'Aichi-Nagoya 2026 Asian Games — Honor of Kings', organizer: 'Aichi-Nagoya 2026 Asian Games / OCA', startDate: '2026-09-23', endDate: '2026-10-02', dateLabel: '23 Sep – 2 Oct 2026',
    region: 'National teams', location: 'Aichi Sky Expo, Japan', format: 'Medal event in the Asian Games esports programme', status: 'completed',
    sourceUrl: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html', sourceName: 'Olympic Council of Asia', updatedAt: '2026-11-02',
    summary: 'The scheduled Asian Games esports window, 23 September–2 October at Aichi Sky Expo, has ended. The linked OCA notice includes Honor of Kings but does not publish a separate result or match-by-match schedule.',
  },
  {
    id: 'brawl-stars-world-finals-2026', slug: 'brawl-stars-world-finals-2026', gameId: 'brawl_stars', gameName: 'Brawl Stars',
    name: 'Brawl Stars World Finals 2026', organizer: 'Supercell', startDate: '2026-11-20', endDate: '2026-11-22', dateLabel: '20–22 Nov 2026',
    region: 'Global', location: 'Tokyo Metropolitan Gymnasium, Tokyo, Japan', prizePool: '$1,000,000', teams: 12,
    format: 'Eight-team GSL group stage; eight-team double-elimination playoffs; best-of-seven Grand Final', status: 'upcoming',
    sourceUrl: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/', sourceName: 'Brawl Stars Esports', updatedAt: '2026-11-02',
    summary: 'Supercell confirms the dates, venue, 12-team field and $1 million prize pool. The first day is a GSL group stage; playoffs run over the next two days.',
  },
  {
    id: 'brawl-stars-october-event-weekend-2026', slug: 'brawl-stars-october-event-weekend-2026', gameId: 'brawl_stars', gameName: 'Brawl Stars',
    name: 'Brawl Stars Championship broadcast weekend', organizer: 'Supercell', startDate: '2026-10-17', endDate: '2026-10-18', dateLabel: '17–18 Oct 2026',
    region: 'Global', location: 'Online broadcast',
    format: 'Two broadcast days; match title and full schedule are shown on the official event hub', status: 'completed',
    sourceUrl: 'https://event.supercell.com/brawlstars/en/', sourceName: 'Brawl Stars Championship', updatedAt: '2026-11-02',
    summary: 'Supercell’s Championship hub listed broadcast days on 17–18 October at 05:00 UTC. Both dates have passed; the public schedule snapshot checked did not identify the event title or matchups.',
  },
  {
    id: 'coc-world-championship-2026-lcq', slug: 'coc-world-championship-2026-lcq', gameId: 'clash_of_clans', gameName: 'Clash of Clans',
    name: 'Clash of Clans World Championship 2026 Last Chance Qualifier', organizer: 'Supercell',
    dateLabel: 'October 2026; exact dates not yet published', region: 'Global', location: 'Online / details pending', prizePool: '$1,000,000 season prize pool', teams: 8,
    format: 'Top eight unqualified teams on the leaderboard compete; top three earn World Finals Golden Tickets', status: 'completed',
    sourceUrl: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete', sourceName: 'Clash of Clans World Championship Series', updatedAt: '2026-11-02',
    summary: 'Supercell’s competition guide confirms an October Last Chance Qualifier for the eight highest-ranked teams that have not already qualified. The top three earn the final Golden Tickets; exact match dates are not stated in the guide.',
  },
  {
    id: 'clash-royale-league-lcq-2026', slug: 'clash-royale-league-lcq-2026', gameId: 'clash_royale', gameName: 'Clash Royale',
    name: 'Clash Royale League 2026 Last Chance Qualifier', organizer: 'Supercell', startDate: '2026-09-05', endDate: '2026-09-06', dateLabel: '5–6 Sep 2026',
    region: 'Global', location: 'Online broadcast', format: 'Last Chance Qualifier; Woo won the two-day event', status: 'completed',
    sourceUrl: 'https://event.supercell.com/clashroyale/en', sourceName: 'Clash Royale League', updatedAt: '2026-11-02',
    summary: 'Supercell’s CRL event site records the Last Chance Qualifier on 5–6 September and lists Woo as the winner. The event is complete; the site says more events are coming but does not yet date the next one.',
  },
  {
    id: 'roblox-showdown-cup-2026', slug: 'roblox-showdown-cup-2026', gameId: 'roblox', gameName: 'Roblox',
    name: 'Showdown Cup — Roblox Fall Games 2026', organizer: 'Roblox platform experience developer',
    dateLabel: 'September 2026; dates not specified in Roblox’s preview', region: 'In-game', location: 'Roblox Esports Arena experience',
    format: 'In-game tournament inside the featured experience; not a Roblox-wide esports league', status: 'completed',
    sourceUrl: 'https://about.roblox.com/en-au/newsroom/2026/09/roblox-fall-games-preview', sourceName: 'Roblox Newsroom', updatedAt: '2026-11-02',
    summary: 'Roblox’s 2 September preview described SuperGaming’s Showdown Cup as an in-experience tournament planned for early September. Roblox did not publish exact match dates, entrants, rules, results or prizes in that article. This was a game-specific event, not a platform-wide Roblox championship; no current live status is claimed.',
  },
  {
    id: 'marvel-rivals-ignite-stage-2-2026', slug: 'marvel-rivals-ignite-stage-2-2026', gameId: 'marvel_rivals', gameName: 'Marvel Rivals',
    name: 'Marvel Rivals Ignite 2026 Stage 2 Playoffs', organizer: 'NetEase / Marvel Rivals Esports', startDate: '2026-10-08', endDate: '2026-10-18', dateLabel: '8–18 Oct 2026',
    region: 'Global: Pacific, Americas, EMEA and China', location: 'Online regional playoffs', prizePool: '$650,000', teams: 12,
    format: 'Regional double-elimination playoffs; BO5 matches, BO7 regional finals', status: 'completed',
    sourceUrl: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html', sourceName: 'Marvel Rivals Ignite', updatedAt: '2026-11-02',
    summary: 'The official guide scheduled Ignite Stage 2 playoffs for 8–18 October. The playoff window has passed; twelve teams qualify for the late-November Grand Finals. Use the official esports page for the completed regional results and live Grand Finals details.',
  },
  {
    id: 'marvel-rivals-ignite-grand-finals-2026', slug: 'marvel-rivals-ignite-grand-finals-2026', gameId: 'marvel_rivals', gameName: 'Marvel Rivals',
    name: 'Marvel Rivals Ignite 2026 Grand Finals', organizer: 'NetEase / Marvel Rivals Esports',
    dateLabel: 'Late November 2026; exact dates and location pending', region: 'Global', location: 'Venue to be announced', teams: 12,
    format: 'Twelve teams qualify from Ignite regional competitions; full finals format pending', status: 'upcoming',
    sourceUrl: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html', sourceName: 'Marvel Rivals Ignite', updatedAt: '2026-11-02',
    summary: 'The official Stage 2 guide confirms 12 Grand Finals teams and says the finals location will be announced later. The official 2026 circuit overview places Stage 2 and its Grand Finals in late November; exact dates, venue and match schedule are not yet confirmed.',
  },
  {
    id: 'aov-10fest-winter-finals-2026', slug: 'aov-10fest-winter-finals-2026', gameId: 'arena_of_valor', gameName: 'Arena of Valor',
    name: 'Arena of Valor 10Fest — Winter 2026 Finals', organizer: 'Garena Liên Quân Mobile', startDate: '2026-11-07', endDate: '2026-11-07', dateLabel: '7 Nov 2026',
    region: 'Vietnam', location: 'My Dinh National Stadium, Hanoi',
    format: 'Đấu Trường Danh Vọng (Arena of Glory) Winter 2026 Grand Final; matchup details pending', status: 'upcoming',
    sourceUrl: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/', sourceName: 'Garena Liên Quân Mobile', updatedAt: '2026-11-02',
    summary: 'Garena’s official 10Fest announcement schedules the Đấu Trường Danh Vọng Winter 2026 Grand Final for 7 November at My Dinh National Stadium in Hanoi, as part of AoV’s tenth-anniversary event. The opponent names and match start time were not specified in the announcement.',
  },
  {
    id: 'aov-aic-2026', slug: 'aov-aic-2026', gameId: 'arena_of_valor', gameName: 'Arena of Valor',
    name: 'Arena of Valor International Championship 2026', organizer: 'Garena', dateLabel: 'Year-end 2026 in Thailand; exact dates pending',
    region: 'International', location: 'Thailand', format: 'Year-end international championship; teams and format pending', status: 'upcoming',
    sourceUrl: 'https://www.garena.sg/news/2M54DC', sourceName: 'Garena', updatedAt: '2026-11-02',
    summary: 'Garena confirms AIC 2026 as a year-end championship in Thailand. The linked official announcement does not yet give exact dates, team count, format, prize pool or match schedule; those fields are left open until the organizer publishes them.',
  },
  {
    id: 'tft-tacticians-superbrawl-2026', slug: 'tft-tacticians-superbrawl-2026', gameId: 'teamfight_tactics', gameName: 'Teamfight Tactics',
    name: 'TFT Tactician’s Superbrawl — Set 18', organizer: 'Riot Games', startDate: '2026-11-06', endDate: '2026-11-08', dateLabel: '6–8 Nov 2026',
    region: 'AMER, EMEA and APAC', location: 'Online regional competition', teams: 96,
    format: '96 teams per region; four-player rosters; single-elimination BO3 bracket', status: 'upcoming',
    sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/4v4-arrives-to-compete-tft/', sourceName: 'Riot Games TFT Esports', updatedAt: '2026-11-02',
    summary: 'Riot’s official announcement schedules the open-to-all regional 4v4 team tournament for 6–8 November. Each region has 96 teams in a single-elimination best-of-three bracket. Ladder snapshots are 2 November; exact regional qualifiers and prize breakdown vary and are still to be published.',
  },
  {
    id: 'tft-vegas-open-2026', slug: 'tft-vegas-open-2026', gameId: 'teamfight_tactics', gameName: 'Teamfight Tactics',
    name: 'TFT Vegas Open 2026', organizer: 'Riot Games', startDate: '2026-12-11', endDate: '2026-12-13', dateLabel: '11–13 Dec 2026',
    region: 'Global open bracket', location: 'Las Vegas, Nevada, USA', prizePool: '$311,300', teams: 1024,
    format: 'Three-day open-bracket LAN; 1,024 competitors, eight-player lobbies and checkmate final', status: 'upcoming',
    sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/tft-vegas-open-2026-competitor-info/', sourceName: 'Riot Games TFT Esports', updatedAt: '2026-11-02',
    summary: 'Riot confirms a 1,024-player open bracket at Convergence Fest in Las Vegas from 11–13 December. The top 128 share a $311,300 prize pool, with $100,000 for the champion. The published format uses eight-player lobbies and a checkmate final; Set 19 is planned for the event.',
  },
  {
    id: 'pubg-pgs-circuit-4-2026', slug: 'pubg-pgs-circuit-4-2026', gameId: 'pubg_battlegrounds', gameName: 'PUBG: BATTLEGROUNDS',
    name: 'PUBG Global Series Circuit 4 (PGS 10–12)', organizer: 'KRAFTON / PUBG Esports',
    startDate: '2026-10-14', endDate: '2026-11-01', dateLabel: '14 Oct – 1 Nov 2026', region: 'Global', location: 'Online / official event locations',
    format: 'Three connected series; consult PUBG Esports for each match-day schedule', status: 'completed',
    sourceUrl: 'https://pubgesports.com/en/', sourceName: 'PUBG Esports', updatedAt: '2026-11-02',
    summary: 'The listed PGS 10–12 circuit window ended on 1 November. PUBG’s official event pages provide the separate match schedules and results for each series; this aggregate record does not combine their standings.',
  },
  {
    id: 'pubg-pgc-2026', slug: 'pubg-pgc-2026', gameId: 'pubg_battlegrounds', gameName: 'PUBG: BATTLEGROUNDS',
    name: 'PUBG Global Championship 2026', organizer: 'KRAFTON / PUBG Esports',
    startDate: "2026-12-01", endDate: "2026-12-13", dateLabel: "1–13 Dec 2026", region: 'Global', location: "İstanbul, Türkiye",
    prizePool: "$1,500,000+ (crowdfunding adds to pool)", teams: 32, format: "Nine match days; starting stage depends on PGS and regional-league results", status: "upcoming",
    sourceUrl: "https://pubg.com/en/news/10110", sourceName: "PUBG: BATTLEGROUNDS official news", updatedAt: '2026-11-02',
    summary: "PUBG Esports confirms PGC 2026 will run 1–13 December in İstanbul with 32 teams and a $1.5 million-plus prize pool, increased by crowdfunding. The organizer says each team’s starting stage depends on its PGS and regional-league results. This is PUBG: BATTLEGROUNDS’ PGC, separate from PUBG MOBILE’s PMGC.",
    participantsNote: "The organizer confirms a 32-team field; qualified teams are not yet listed in this announcement.",
    participantsSourceUrl: "https://pubg.com/en/news/10110",
    participantsSourceName: "PUBG: BATTLEGROUNDS official news",
  },
  {
    id: 'apex-algs-y6-lcq', slug: 'apex-algs-y6-lcq', gameId: 'apex', gameName: 'Apex Legends',
    name: 'ALGS Year 6 Last Chance Qualifier', organizer: 'Electronic Arts / Respawn',
    startDate: '2026-11-20', endDate: '2026-11-22', dateLabel: '20–22 Nov 2026', region: 'Americas, EMEA, APAC North and APAC South', location: 'Online',
    format: 'Regional LCQs; top two teams per region qualify for the Championship', status: 'upcoming',
    sourceUrl: 'https://algs.ea.com/en/year-5/split-1-pro-league-apac-south/news/year-6-is-here', sourceName: 'Apex Legends Global Series', updatedAt: '2026-11-02',
    summary: 'EA’s Year 6 calendar schedules the online Last Chance Qualifier for 20–22 November. The top two teams from each region earn the final Championship places.',
  },
  {
    id: 'apex-algs-y6-championship', slug: 'apex-algs-y6-championship', gameId: 'apex', gameName: 'Apex Legends',
    name: 'ALGS Year 6 Championship', organizer: 'Electronic Arts / Respawn',
    startDate: '2027-01-28', endDate: '2027-01-31', dateLabel: '28–31 Jan 2027', region: 'Global', location: 'Daiwa House Premist Dome, Sapporo, Japan',
    prizePool: '$2,000,000', teams: 40, format: 'Group Stage, double-elimination bracket and Match Point Finals', status: 'upcoming',
    sourceUrl: 'https://algs.ea.com/en/year-5/split-1-pro-league-apac-south/news/year-6-is-here', sourceName: 'Apex Legends Global Series', updatedAt: '2026-11-02',
    summary: 'The Year 6 season finale brings 40 teams from four regions to Sapporo for a $2 million prize pool. EA says 32 places come through Championship Points and eight through regional LCQs.',
  },
  {
    id: 'ea-fc-pro-27-global-qualifier', slug: 'ea-fc-pro-27-global-qualifier', gameId: 'ea_fc', gameName: 'EA SPORTS FC',
    name: 'FC Pro 27 Open Global Qualifier', organizer: 'Electronic Arts', startDate: '2026-11-06', endDate: '2026-11-07', dateLabel: '6–7 Nov 2026',
    region: 'Global', location: 'London, United Kingdom', prizePool: '$152,000', teams: 64,
    format: '64-player Swiss stage; top 32 enter knockout play; 16 qualify for FC Pro Open', status: 'upcoming',
    sourceUrl: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-open-global-qualifier', sourceName: 'EA SPORTS FC Pro', updatedAt: '2026-11-02',
    summary: 'EA’s event-specific announcement sets the 64-player Global Qualifier for 6–7 November in London. Sixteen players advance to FC Pro Open, joining eight already qualified competitors.',
  },
  {
    id: 'madden-mcs-27-most-feared-qualifier', slug: 'madden-mcs-27-most-feared-qualifier', gameId: 'ea_madden', gameName: 'Madden NFL',
    name: 'MCS 27 Open Qualifier: Most Feared', organizer: 'Electronic Arts', startDate: '2026-10-10', endDate: '2026-11-11', dateLabel: '10 Oct – 11 Nov 2026',
    region: 'Eligible online entrants', location: 'Online elimination stage; Open Qualifier Final on 11 Nov', prizePool: '$50,000',
    format: 'Open ladder, elimination bracket and Open Qualifier Final', status: 'live',
    sourceUrl: 'https://www.ea.com/games/madden-nfl/madden-nfl-27/news/mcs-27-announcement', sourceName: 'EA SPORTS Madden Championship Series', updatedAt: '2026-11-02',
    summary: 'EA schedules the Most Feared ladder for 10–11 and 17–18 October, the elimination bracket for 24–25 October, and the Open Qualifier Final for 11 November. The qualifier winner earns a Madden Bowl place.',
  },
  {
    id: 'dota2-blast-slam-viii-2026', slug: 'dota2-blast-slam-viii-2026', gameId: 'dota2', gameName: 'Dota 2',
    name: 'BLAST Slam VIII', organizer: 'BLAST', startDate: '2026-09-29', endDate: '2026-10-11', dateLabel: '29 Sep – 11 Oct 2026',
    region: 'Global', location: 'BLAST Arena Studios, Malta', prizePool: '$750,000', teams: 16,
    format: 'Four-group stage followed by seeding matches and playoffs', status: 'completed',
    sourceUrl: 'https://blast.tv/dota/tournaments/blast-slam-viii/series?view=results', sourceName: 'BLAST Dota 2 results', updatedAt: '2026-11-02',
    summary: 'BLAST’s results page confirms Team Yandex defeated Team Spirit 3–1 in the 11 October Grand Final. The 16-team event had a $750,000 prize pool.',
  }
];

const CURATED_TOURNAMENT_NEWS: TournamentNews[] = [
  {
    id: 'news-valorant-gc-championship-starts-today', slug: 'news-valorant-gc-championship-starts-today', gameId: 'valorant', gameName: 'VALORANT',
    title: "Gentle Mates wins VALORANT Game Changers Championship 2026",
    excerpt: "Riot’s completed bracket lists Gentle Mates as champion and M8 as runner-up after the São Paulo final.",
    content: ["The VALORANT Game Changers Championship 2026 concluded after its 22 October–1 November schedule in São Paulo. Riot’s official bracket lists Gentle Mates first and M8 second.","The event used the announced 10-team double-elimination format. Use Riot’s official result page for the completed bracket."],
    tournamentName: 'VALORANT Game Changers Championship 2026', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: "https://valorantesports.com/en-US/results/117200126947483851/stage/117200188348360454", sourceName: "Riot Games VALORANT Esports", sourceVerified: true, tags: ['VALORANT', 'Game Changers', 'Championship', 'São Paulo', 'Live'], eventId: 'valorant-game-changers-championship-2026',
  },
  {
    id: 'news-pgl-masters-bucharest-2026-starts-soon', slug: 'news-pgl-masters-bucharest-2026-starts-soon', gameId: 'cs2', gameName: 'Counter-Strike 2',
    title: 'FURIA beats Nemiga 3–2 to win PGL Masters Bucharest 2026',
    excerpt: 'The tournament ended on 31 October; MOUZ beat Vitality 2–0 for third place.',
    content: [
      'PGL Masters Bucharest 2026 concluded on 31 October. FURIA defeated Nemiga 3–2 in the Grand Final, and MOUZ defeated Vitality 2–0 in the third-place decider.',
      'The event ran 24–31 October in Bucharest with 16 teams. The linked BLAST event page lists the completed results and bracket.',
    ],
    tournamentName: 'PGL Masters Bucharest 2026', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://blast.tv/cs/tournaments/pgl-belgrade-2026', sourceName: 'BLAST.tv Counter-Strike', sourceVerified: true, tags: ['CS2', 'PGL Masters', 'Bucharest', 'FURIA'], eventId: 'cs2-pgl-masters-bucharest-2026',
  },
  {
    id: 'news-lol-worlds-2026-knockout-stage', slug: 'news-lol-worlds-2026-knockout-stage', gameId: 'league', gameName: 'League of Legends',
    title: 'Worlds 2026 Knockout Stage underway as Grand Final approaches',
    excerpt: 'The League of Legends World Championship is in the Knockout Stage with the Grand Final set for 5 November at London O2 Arena.',
    content: [
      'Worlds 2026 entered the Knockout Stage on 24 October after the conclusion of the Swiss Stage. The tournament began on 25 September with 24 teams from all major regions.',
      'Top teams including T1, Gen.G, JD Gaming, Bilibili Gaming, and G2 Esports have advanced to the Knockout Stage. The Grand Final is scheduled for 5 November at the O2 Arena in London.',
      'The tournament features a $2.5 million prize pool. The Summoner\'s Cup will be awarded to the champion. Current bracket and match results are available on the official Riot Games LoL Esports page.',
    ],
    tournamentName: 'World Championship 2026', status: 'live', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://lolesports.com/en-US', sourceName: 'Riot Games LoL Esports', sourceVerified: true, tags: ['League of Legends', 'Worlds', 'Knockout Stage', 'London', 'Live'], eventId: 'lol-worlds-2026',
  },
  {
    id: 'news-cs2-recent-results', slug: 'news-cs2-recent-results', gameId: 'cs2', gameName: 'Counter-Strike 2',
    title: 'CS2: Thunderpick World Championship concludes, FURIA takes title',
    excerpt: 'FURIA defeated BetBoom 3-2 in the Grand Final on 18 October as ESL Pro League Season 24 also concluded.',
    content: [
      'Thunderpick World Championship 2026 concluded on 18 October at BLAST Studio in Malta. FURIA won the Grand Final 3-2 over BetBoom to claim the $1 million prize. Aurora defeated Team Falcons for third place.',
      'ESL Pro League Season 24 also concluded on 11 October in Katowice. The tournament featured top CS2 teams competing over 9 days. The official BLAST calendar lists this event in the Finished section.',
      'Upcoming CS2 events include PGL Masters Bucharest (24–31 October), IEM Beijing (2–8 November), BLAST Premier Rivals Hong Kong (11–15 November), and PGL Singapore Major (25 November – 13 December).',
    ],
    tournamentName: 'Recent CS2 Events', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://blast.tv/cs/tournaments', sourceName: 'BLAST Counter-Strike', sourceVerified: true, tags: ['CS2', 'Thunderpick', 'ESL Pro League', 'Results', 'October'], eventId: 'cs2-thunderpick-world-championship-2026',
  },
  {
    id: 'news-bgmi-bmsd-2026', slug: 'news-bgmi-bmsd-2026', gameId: 'bgmi', gameName: 'BGMI',
    title: "Team SouL wins BGMI Showdown 2026 with 155 points",
    excerpt: "Team SouL finished the 18-match Grand Finals on 155 points; the top three were SouL, Gladiators Esports and iQOO 8Bit.",
    content: ["Team SouL won the BMSD 2026 Grand Finals in Hyderabad with 155 points across 18 matches. Gladiators Esports finished second on 141 points and iQOO 8Bit third on 140. The result also gave SouL the event’s PMGC qualification place.","The result is reported in TalkEsport’s tournament coverage. KRAFTON’s event announcement remains linked for the event schedule and official competition context."],
    tournamentName: 'Battlegrounds Mobile India Showdown 2026', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: "https://www.talkesport.com/wiki/bgmi/bmsd/2026/",
    sourceName: "TalkEsport (event results report)", sourceVerified: true, tags: ['BGMI', 'BMSD 2026', 'India', 'Hyderabad'], eventId: 'bgmi-bmsd-2026',
  },
  {
    id: 'news-bgmi-bmic-2026', slug: 'news-bgmi-bmic-2026', gameId: 'bgmi', gameName: 'BGMI',
    title: "Nongshim RedForce wins BGMI International Cup 2026",
    excerpt: "NS RedForce topped the 18-match finals with 233 points and secured a PMGC 2026 Gauntlet place.",
    content: ["Nongshim RedForce won the BGMI International Cup 2026 in Mumbai, scoring 233 points across 18 matches with five Chicken Dinners. The team earned the ₹30 lakh first prize and a place in the PMGC 2026 Gauntlet.","The 16-team competition ran from 30 October to 1 November at The Dome, SVP Indoor Stadium. Six teams represented India, five South Korea and five Japan."],
    tournamentName: 'BGMI International Cup 2026', status: "completed", publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: "https://www.talkesport.com/mobile-gaming/bgmi/ns-redforce-win-bmic-2026/",
    sourceName: "TalkEsport (event results report)", sourceVerified: true, tags: ['BGMI', 'BMIC 2026', 'Mumbai', 'International'], eventId: 'bgmi-bmic-2026',
  },
  {
    id: 'news-pubgm-pmps-korea-s2-2026', slug: 'news-pubgm-pmps-korea-s2-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    title: 'PUBG MOBILE Korea PMPS Season 2 Finals completed on 18 October',
    excerpt: 'The official schedule confirms Finals Day 2 finished on 18 October at 3 p.m. KST in Daejeon; the organizer results tab remains the standings source.',
    content: [
      'PUBG MOBILE Esports Korea’s official notice confirms the event window, 16-team field and ₩40 million prize pool. Finals ran 17–18 October at 3 p.m. KST in Daejeon, with six matches scheduled each day. The linked official page does not expose a final standings table, so this update does not claim a winner or score.',
      'The organizer’s qualification rules send the season champion to PMGC 2026 and places 1–3 to BMIC, subject to its duplicate-slot rule. The competition has ended.',
    ],
    tournamentName: 'PUBG MOBILE Pro Series Korea 2026 Season 2', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://esports.pubgmobile.kr/en/news/208', sourceName: 'PUBG MOBILE Esports Korea', sourceVerified: true,
    tags: ['PUBG Mobile', 'PMPS', 'South Korea', 'Daejeon'], eventId: 'pubgm-pmps-korea-s2-2026',
  },
  {
    id: 'news-free-fire-ffws-global-finals-2026', slug: 'news-free-fire-ffws-global-finals-2026', gameId: 'freefire', gameName: 'Free Fire',
    title: 'Free Fire World Series Global Finals begins November 6 in Bangkok',
    excerpt: 'Garena confirms 24 teams and a four-weekend format; the roadmap does not list the exact closing date, venue or full roster.',
    content: [
      'Garena’s 2026 esports roadmap confirms the FFWS Global Finals will take place in Bangkok, Thailand, starting 6 November. The field expands from 18 to 24 teams.',
      'The roadmap says the event unfolds across four high-stakes weekends in November. It does not specify the exact closing date, venue, prize pool or qualified team list, so those fields are not inferred here.',
      'Garena’s roadmap also lists the FFWS SEA Fall split for 14 August–20 September and Free Fire at EWC for 15–18 July; both event windows have passed.',
    ],
    tournamentName: 'Free Fire World Series Global Finals 2026', status: 'upcoming', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://ff.garena.com/en/article/1605/', sourceName: 'Garena Free Fire', sourceVerified: true,
    tags: ['Free Fire', 'FFWS', 'Global Finals', 'Bangkok'], eventId: 'free-fire-ffws-global-finals-2026',
  },
  {
    id: 'news-valorant-champions-shanghai-2026', slug: 'news-valorant-champions-shanghai-2026', gameId: 'valorant', gameName: 'VALORANT',
    title: 'VALORANT Champions Shanghai: LOUD wins the 2026 world title',
    excerpt: 'LOUD defeated Team Vitality 3–1 in the 18 October Grand Final at Shanghai’s Mercedes-Benz Arena.',
    content: [
      'Riot’s official event guide schedules Champions Shanghai from 24 September to 18 October. Sixteen teams represent Americas, China, EMEA and Pacific; the group stage concluded on 4 October.',
      'Riot’s official schedule lists the Lower Bracket Final for 17 October and the Grand Final for 18 October. The tournament’s final weekend is at Shanghai’s Mercedes-Benz Arena.',
      'LOUD won the 18 October Grand Final 3–1 over Team Vitality at Shanghai’s Mercedes-Benz Arena. Riot’s official tournament page remains the source for the bracket, match pages and broadcast archive.',
    ],
    tournamentName: 'VALORANT Champions Shanghai 2026', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know', sourceName: 'VALORANT Esports', sourceVerified: true,
    tags: ['VCT', 'Champions', 'Shanghai', 'Live event'], eventId: 'valorant-champions-shanghai-2026',
  },
  {
    id: 'news-cs2-october-events-2026', slug: 'news-cs2-october-events-2026', gameId: 'cs2', gameName: 'Counter-Strike 2',
    title: 'CS2 October results and November event calendar',
    excerpt: 'October’s Thunderpick and PGL Bucharest events have ended; IEM Beijing runs November 2–8.',
    content: [
      'BLAST’s event page records FURIA’s 3–2 Grand Final win over BetBoom at Thunderpick World Championship, which ended 18 October. PGL Masters Bucharest also ended on 31 October; its results are linked from the event record.',
      'IEM Beijing is scheduled for 2–8 November with 16 teams and a $1.25 million prize pool, so it is in progress on 2 November. BLAST Premier Rivals Hong Kong follows on 11–15 November, and PGL Singapore Major runs 25 November–13 December.',
      'Use each organizer’s event page for live bracket changes and final results. This roundup does not add unverified match scores.',
    ],
    tournamentName: 'Thunderpick World Championship 2026', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://dev.blast.tv/cs/tournaments/thunderpick-world-championship-2026', sourceName: 'BLAST Counter-Strike', sourceVerified: true,
    tags: ['CS2', 'Thunderpick', 'Malta', 'October'], eventId: 'cs2-thunderpick-world-championship-2026',
  },
  {
    id: 'news-fortnite-fncs-solos-october-2026', slug: 'news-fortnite-fncs-solos-october-2026', gameId: 'fortnite', gameName: 'Fortnite',
    title: 'FNCS Solos October event has concluded',
    excerpt: 'Epic’s rules scheduled the regional Finals for 26–27 October; all listed October rounds have now passed.',
    content: [
      'Epic’s official 2026 FNCS Solos rules schedule Qualifier 2 rounds on 5–6, 10 and 11 October; Heats on 17–18 October; the Last Chance Qualifier on 19–20 October; and Finals on 26–27 October. The event window is complete.',
      'This was an individual regional competition. Epic’s rules list 60 points for a Victory Royale and four points per Finals elimination; use the in-game regional leaderboard or Epic’s official results for final placements.',
    ],
    tournamentName: 'FNCS Solo Tournament (October 2026)', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC', sourceName: 'Fortnite Competitive official rules', sourceVerified: true,
    tags: ['Fortnite', 'FNCS', 'Solo', 'Qualifier', 'Heats', 'Finals'], eventId: 'fortnite-fncs-solo-october-2026',
  },
  {
    id: 'news-apex-algs-split-2-playoffs-2026', slug: 'news-apex-algs-split-2-playoffs-2026', gameId: 'apex', gameName: 'Apex Legends',
    title: 'ALGS Split 2 Playoffs conclude in Las Vegas',
    excerpt: 'The 40-team Year 6 LAN ran October 29–November 1; final standings belong to EA’s event bracket.',
    content: [
      'EA’s competition overview scheduled Year 6 Split 2 Playoffs for 29 October–1 November at Orleans Arena in Las Vegas. The 40-team event window has ended.',
      'The announced prize pool was $2 million. The format included a round-robin group stage, double-elimination bracket and Match Point Finals.',
      'Check EA’s official ALGS event bracket for the completed standings and match results; this article does not infer a winner from unverified data.',
    ],
    tournamentName: 'ALGS Year 6 Split 2 Playoffs', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview', sourceName: 'Apex Legends Global Series', sourceVerified: true,
    tags: ['Apex Legends', 'ALGS', 'Las Vegas', 'Playoffs'], eventId: 'apex-algs-y6-split-2-playoffs',
  },
  {
    id: 'news-lol-worlds-2026', slug: 'news-lol-worlds-2026', gameId: 'league', gameName: 'League of Legends',
    title: "Worlds 2026 Swiss Stage ends; Knockout Stage begins November 3",
    excerpt: "Riot schedules the Worlds Knockout Stage for November 3–8 in Allen; the Grand Final is November 14 in Brooklyn.",
    content: ["The Worlds 2026 Swiss Stage concluded on 31 October. Riot schedules the Knockout Stage for 3–8 November at the Credit Union of Texas Event Center in Allen, Texas, with the Final at Barclays Center in Brooklyn on 14 November.","Follow Riot’s official LoL Esports schedule for the quarterfinal bracket, matchups and current results."],
    tournamentName: 'League of Legends World Championship 2026', status: "live", publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: "https://lolesports.com/en-GB/news/worlds-2026-primer", sourceName: "Riot Games LoL Esports", sourceVerified: true,
    tags: ['League of Legends', 'Worlds 2026', 'Venues', 'Schedule'], eventId: "lol-worlds-2026",
  },
  {
    id: 'news-rocket-league-worlds-2026', slug: 'news-rocket-league-worlds-2026', gameId: 'rocket_league', gameName: 'Rocket League',
    title: 'RLCS World Championship concludes after six days in Fort Worth',
    excerpt: 'The official schedule marks the 20-team, $1.2 million 2026 World Championship complete on 20 September.',
    content: [
      'Rocket League’s official competitive schedule lists the RLCS World Championship as completed. It ran from 15–20 September at Dickies Arena in Fort Worth, Texas, with 20 teams and a $1.2 million prize pool.',
      'The September 9 official event primer confirms the dates, venue, field size and prize pool. The linked schedule is the current official record for results; this summary does not infer a champion from third-party standings.',
    ],
    tournamentName: 'RLCS World Championship 2026', status: 'completed', publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League official schedule', sourceVerified: true,
    tags: ['Rocket League', 'RLCS', 'World Championship', 'Completed'], eventId: 'rlcs-world-championship-2026',
  },
  {
    id: 'news-overwatch-owcs-stage-3-2026', slug: 'news-overwatch-owcs-stage-3-2026', gameId: 'overwatch', gameName: 'Overwatch 2',
    title: 'OWCS Stage 3 dates vary by region; China playoffs run 7–8 November',
    excerpt: 'Blizzard publishes separate Stage 3 calendars for China, NA and EMEA.',
    content: [
      'Blizzard’s official 2026 OWCS schedule differs by region. China’s Stage 3 regular season runs 3–4, 10–11, 17–18, 24–25 October and 30 October–1 November, with playoffs on 7–8 November. NA and EMEA regular seasons run 10–11, 17–18 and 24–25 October, followed by playoffs 30 October–1 November.',
      'The same season plan dates the 2026 Champions Clash for 22–24 May, Midseason Championship for 29 July–2 August and World Finals for 2–6 December. Those earlier events are complete as of this update.',
      'The Stage 3 announcement gives dates but says live-event format and seeding can vary by stage. The official Overwatch Esports site remains the source for regional brackets and broadcast updates.',
    ],
    tournamentName: 'Overwatch Champions Series 2026 Stage 3', status: "upcoming", publishedAt: '2026-10-22', updatedAt: '2026-11-02',
    sourceUrl: 'https://overwatch.blizzard.com/en-us/news/24246297/owcs-2026-', sourceName: 'Overwatch Esports', sourceVerified: true,
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
    tournamentName: 'BLAST R6 Major Osaka 2026', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-11-02',
    sourceUrl: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege/presales/osaka', sourceName: 'Ubisoft R6 Esports', sourceVerified: true,
    tags: ['Rainbow Six Siege', 'BLAST R6', 'Osaka', 'Major'], eventId: 'r6-osaka-major-2026',
  },
  {
    id: 'news-ea-fc-pro-27-open-ladder-2026', slug: 'news-ea-fc-pro-27-open-ladder-2026', gameId: 'ea_fc', gameName: 'EA FC',
    title: 'EA FC Pro 27 Open Ladder closes; Regional Qualifiers follow 10–11 October',
    excerpt: 'The ladder ended 3 October. EA says 1,376 players across ten regions advance to the online Regional Qualifiers.',
    content: [
      'EA’s FC Pro 27 season overview sets the in-game Open Ladder window at 21 September–3 October. That ladder has now closed; EA lists 1,376 PlayStation 5 competitors across ten regions advancing to Regional Qualifiers.',
      'The Regional Qualifiers were scheduled online for 10–11 October, followed by the Global Qualifier in London on 6–7 November according to EA’s newer event-specific announcement. The $2.5 million figure in EA’s season announcement applies to the full FC Pro 27 season, not to the ladder alone.',
    ],
    tournamentName: 'EA SPORTS FC Pro 27 Open Ladder', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-11-02',
    sourceUrl: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive', sourceName: 'EA SPORTS FC Pro', sourceVerified: true,
    tags: ['EA FC', 'FC Pro 27', 'Open Ladder', 'Qualification'], eventId: 'ea-fc-pro-27-ladder-2026',
  },
  {
    id: 'news-mlbb-mpl-ph-s18-playoffs-2026', slug: 'news-mlbb-mpl-ph-s18-playoffs-2026', gameId: 'mobile_legends', gameName: 'MLBB',
    title: 'Aurora Gaming PH wins MPL Philippines Season 18',
    excerpt: 'Aurora defeated Team Falcons 4–2 in the Grand Final and both teams advance to M8 in Istanbul.',
    content: [
      'MOONTON reports that Aurora Gaming PH won its first MPL Philippines championship after defeating Team Falcons 4–2 in the Season 18 Grand Final. The final was played at PhilSports Arena in Pasig City.',
      'MOONTON says Aurora Gaming PH and Team Falcons will represent the Philippines at the M8 World Championship in Istanbul in January 2027.',
      'This is the Philippines regional league result. Other MPL regions run separate calendars and qualification paths.',
    ],
    tournamentName: 'MPL Philippines Season 18', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-11-02',
    sourceUrl: 'https://en.moonton.com/news/391.html', sourceName: 'MOONTON Games', sourceVerified: true,
    tags: ['MLBB', 'MPL PH', 'Season 18', 'Aurora Gaming PH', 'M8'], eventId: 'mlbb-mpl-ph-s18-playoffs-2026',
  },
  {
    id: 'news-hok-asian-games-2026', slug: 'news-hok-asian-games-2026', gameId: 'honor_of_kings', gameName: 'Honor of Kings',
    title: 'Honor of Kings Asian Games esports competition concludes',
    excerpt: 'The Aichi-Nagoya 2026 esports window ran 23 September–2 October; the cited OCA notice does not provide a separate Honor of Kings result.',
    content: [
      'Honor of Kings was included in the official Aichi-Nagoya 2026 Asian Games esports programme. The Olympic Council of Asia’s published schedule sets the esports window for 23 September–2 October at Aichi Sky Expo in Japan; that window has now ended.',
      'The linked OCA notice does not publish a separate Honor of Kings bracket, team list or result. This update therefore marks the scheduled event complete without claiming a match result or medal outcome.',
    ],
    tournamentName: 'Aichi-Nagoya 2026 Asian Games — Honor of Kings', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-11-02',
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
    tournamentName: 'Brawl Stars World Finals 2026', status: 'upcoming', publishedAt: '2026-10-02', updatedAt: '2026-11-02',
    sourceUrl: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/', sourceName: 'Brawl Stars Esports', sourceVerified: true,
    tags: ['Brawl Stars', 'World Finals', 'Tokyo', 'Esports'], eventId: 'brawl-stars-world-finals-2026',
  },
  {
    id: 'news-coc-world-championship-lcq-2026', slug: 'news-coc-world-championship-lcq-2026', gameId: 'clash_of_clans', gameName: 'Clash of Clans',
    title: "Clash of Clans World Championship October LCQ window has passed",
    excerpt: "Supercell confirms an October Last Chance Qualifier, but its linked guide does not publish exact dates or the final result.",
    content: [
      'Supercell’s 2026 competition guide says the eight highest-ranked teams that have not qualified for World Finals will meet in an October Last Chance Qualifier. The top three earn the remaining Golden Tickets.',
      'The World Championship’s announced season prize pool is $1 million, and eight teams will contest the World Finals. Four monthly qualifier winners from June through September and the Chinese qualifier contribute Golden Ticket places.',
      'Supercell has not listed exact LCQ match dates or its venue on the linked guide. Those details remain pending an organizer update.',
    ],
    tournamentName: 'Clash of Clans World Championship 2026 Last Chance Qualifier', status: "completed", publishedAt: '2026-10-02', updatedAt: '2026-11-02',
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
    tournamentName: 'Clash Royale League 2026 Last Chance Qualifier', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-11-02',
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
    tournamentName: 'Showdown Cup — Roblox Fall Games 2026', status: 'completed', publishedAt: '2026-10-02', updatedAt: '2026-11-02',
    sourceUrl: 'https://about.roblox.com/en-au/newsroom/2026/09/roblox-fall-games-preview', sourceName: 'Roblox Newsroom', sourceVerified: true,
    tags: ['Roblox', 'Showdown Cup', 'In-game tournament'], eventId: 'roblox-showdown-cup-2026',
  },
  {
    id: 'news-marvel-rivals-ignite-stage-2-2026', slug: 'news-marvel-rivals-ignite-stage-2-2026', gameId: 'marvel_rivals', gameName: 'Marvel Rivals',
    title: 'Marvel Rivals Ignite Stage 2 playoff window has ended',
    excerpt: 'The October 8–18 regional playoffs concluded; twelve teams advance to the late-November Grand Finals.',
    content: [
      'NetEase’s official guide scheduled Ignite Stage 2 regional playoffs for 8–18 October 2026. That playoff window has ended.',
      'The guide lists a US$650,000 total prize pool and says twelve teams qualify for the late-November Ignite Grand Finals. Use NetEase’s official esports page for the completed regional standings and current finals details.',
      'The linked guide did not include the final regional winners in the source snapshot used here, so this article does not guess them.'
    ],
    tournamentName: 'Marvel Rivals Ignite 2026 Stage 2', status: 'completed', publishedAt: '2026-10-07', updatedAt: '2026-11-02',
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
      'Garena confirms AIC 2026 as a year-end championship in Thailand. Its linked announcement does not publish exact dates, teams or match schedule, so none are inferred here.'
    ],
    tournamentName: 'Arena of Valor 2026 esports calendar', status: 'upcoming', publishedAt: '2026-10-07', updatedAt: '2026-11-02',
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
      'Riot’s official esports hub and regional channels are the source for qualification instructions and schedule changes. Regional rules can differ.'
    ],
    tournamentName: 'Teamfight Tactics esports 2026', status: 'upcoming', publishedAt: '2026-10-07', updatedAt: '2026-11-02',
    sourceUrl: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/4v4-arrives-to-compete-tft/', sourceName: 'Riot Games TFT Esports', sourceVerified: true,
    tags: ['Teamfight Tactics', 'TFT esports', 'Tactician’s Superbrawl', 'TFT Vegas Open', 'Set 18', 'Set 19'], eventId: 'tft-tacticians-superbrawl-2026',
  },
  {
    id: 'news-pubg-pgc-2026', slug: 'news-pubg-pgc-2026', gameId: 'pubg_battlegrounds', gameName: 'PUBG: BATTLEGROUNDS',
    title: "PUBG Global Championship 2026 heads to Istanbul in December",
    excerpt: "PUBG Esports confirms the 1–13 December event window, a 32-team field and a $1.5 million-plus prize pool.",
    content: ["PUBG Esports schedules PGC 2026 for 1–13 December in İstanbul, Türkiye. The official announcement confirms 32 teams, nine match days and a $1.5 million-plus prize pool that can grow through crowdfunding.","The organizer says starting stages depend on results across PGS and regional leagues. Qualified teams and the detailed match schedule are not included in the announcement. PGC is PUBG: BATTLEGROUNDS’ event and is separate from PUBG MOBILE’s PMGC."],
    tournamentName: 'PUBG Global Championship 2026', status: 'upcoming', publishedAt: '2026-10-14', updatedAt: '2026-11-02',
    sourceUrl: "https://pubg.com/en/news/10110", sourceName: "PUBG: BATTLEGROUNDS official news", sourceVerified: true,
    tags: ['PUBG', 'PGC 2026', 'Istanbul', 'Global Championship'], eventId: 'pubg-pgc-2026',
  },
  {
    id: 'news-pubgm-pmwc-2026', slug: 'news-pubgm-pmwc-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    title: 'S2G Esports wins PUBG MOBILE World Cup 2026 in Paris',
    excerpt: 'The official EWC results list S2G Esports as champion and QZZ as MVP after the 32-team event.',
    content: [
      'The Esports World Cup’s official PUBG MOBILE page records S2G Esports as the 2026 PMWC champion and QZZ as MVP. The event took place in Paris from 6 to 16 August and featured 32 teams.',
      'The EWC 2026 rulebook lists $3 million in total prize money for PUBG MOBILE. This PMWC result is separate from the season-ending PUBG MOBILE Global Championship, which KRAFTON lists for a 1 November–15 December competition window.'
    ],
    tournamentName: 'PUBG MOBILE World Cup 2026', status: 'completed', publishedAt: '2026-10-14', updatedAt: '2026-11-02',
    sourceUrl: 'https://ewc-web.prod.esf-systems.com/en/competitions/2026/pmwc', sourceName: 'Esports World Cup', sourceVerified: true,
    tags: ['PUBG Mobile', 'PMWC 2026', 'S2G Esports', 'Paris', 'EWC'], eventId: 'pubgm-pmwc-ewc-2026',
  },
  {
    id: 'news-pubgm-pmgc-2026', slug: 'news-pubgm-pmgc-2026', gameId: 'pubg', gameName: 'PUBG Mobile',
    title: "PUBG MOBILE Global Championship 2026 enters its listed November–December window",
    excerpt: "KRAFTON lists PMGC from 1 November to 15 December with a $3 million prize pool; stage details remain on the official event listing.",
    content: [
      'KRAFTON’s official PUBG MOBILE tournament listing shows the 2026 Global Championship between 1 November and 15 December with a $3 million prize pool.',
      'The current listing does not give the venue, stage-by-stage schedule or complete team field. Those details are intentionally left unconfirmed until KRAFTON publishes them. PMGC is separate from PUBG: BATTLEGROUNDS’ PGC 2026 in Istanbul.'
    ],
    tournamentName: 'PUBG MOBILE Global Championship 2026', status: "live", publishedAt: '2026-10-14', updatedAt: '2026-11-02',
    sourceUrl: 'https://pubgesportsqualifiers.com/tournament', sourceName: 'KRAFTON PUBG MOBILE Esports', sourceVerified: true,
    tags: ['PUBG Mobile', 'PMGC 2026', 'Global Championship', 'KRAFTON'], eventId: 'pubgm-pmgc-2026',
  },
  {
    id: 'news-apex-algs-year-6-road-to-champs', slug: 'news-apex-algs-year-6-road-to-champs', gameId: 'apex', gameName: 'Apex Legends',
    title: 'ALGS Year 6: Las Vegas Playoffs, November LCQ and Sapporo Championship',
    excerpt: 'EA’s calendar confirms the remaining route to the 40-team, $2 million Championship in Japan.',
    content: [
      'EA’s ALGS Year 6 schedule lists Split 2 Playoffs for 29 October–1 November in Las Vegas, a regional Last Chance Qualifier on 20–22 November, and the Championship on 28–31 January 2027 in Sapporo.',
      'The Championship field will contain 40 teams from the Americas, EMEA, APAC North and APAC South. EA says 32 places come through Championship Points and eight through the LCQs, with the top two from each region qualifying.',
      'EA lists the Championship prize pool as $2 million. This is the Championship pool; it should not be described as a total prize pool for all ALGS Year 6 events.'
    ],
    tournamentName: 'Apex Legends Global Series Year 6', status: 'upcoming', publishedAt: '2026-10-14', updatedAt: '2026-11-02',
    sourceUrl: 'https://algs.ea.com/en/year-5/split-1-pro-league-apac-south/news/year-6-is-here', sourceName: 'Apex Legends Global Series', sourceVerified: true,
    tags: ['Apex Legends', 'ALGS Year 6', 'Playoffs', 'Last Chance Qualifier', 'Championship'], eventId: 'apex-algs-y6-championship',
  },
  {
    id: 'news-ea-fc-pro-27-global-qualifier', slug: 'news-ea-fc-pro-27-global-qualifier', gameId: 'ea_fc', gameName: 'EA SPORTS FC',
    title: 'FC Pro 27 Global Qualifier confirmed for 6–7 November in London',
    excerpt: 'EA names 64 players for the London event; 16 will advance to FC Pro Open.',
    content: [
      'EA’s event-specific announcement sets the FC Pro 27 Open Global Qualifier for 6–7 November in London. Sixty-four players compete, with the top 32 advancing from the Swiss stage into knockout play.',
      'Sixteen players will qualify from this event for FC Pro Open, joining eight competitors who qualified earlier. EA lists $152,000 for the Global Qualifier; this is distinct from the full-season FC Pro 27 prize pool.',
      'This corrects the earlier 5–7 November date shown in the season overview: the newer event-specific announcement gives 6–7 November.'
    ],
    tournamentName: 'FC Pro 27 Open Global Qualifier', status: 'upcoming', publishedAt: '2026-10-14', updatedAt: '2026-11-02',
    sourceUrl: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-open-global-qualifier', sourceName: 'EA SPORTS FC Pro', sourceVerified: true,
    tags: ['EA SPORTS FC', 'FC Pro 27', 'Global Qualifier', 'London'], eventId: 'ea-fc-pro-27-global-qualifier',
  },
  {
    id: 'news-madden-mcs-27', slug: 'news-madden-mcs-27', gameId: 'ea_madden', gameName: 'Madden NFL',
    title: 'Madden Championship Series 27: $750,000 season and path to Madden Bowl',
    excerpt: 'EA’s MCS includes an eight-player Pro League, three Open Qualifiers, an LCQ and a 14-player Madden Bowl.',
    content: [
      'EA’s MCS 27 announcement describes a season-long Madden NFL competition with $750,000 total prizing. The structure includes an eight-player Pro League, three Open Qualifiers, a Last Chance Qualifier and a 14-player Madden Bowl.',
      'The Most Feared Open Qualifier elimination stage runs online on 24–25 October; its Open Qualifier Final is scheduled for 11 November. EA lists a $50,000 prize pool for this qualifier and says its winner earns a direct Madden Bowl place.',
      'The Madden Bowl is scheduled for 9–11 February 2027 at Full Sail University in Orlando, Florida, with $400,000 in prizes. The $750,000 figure covers the complete MCS 27 season, not the Madden Bowl alone.'
    ],
    tournamentName: 'Madden Championship Series 27', status: "live", publishedAt: '2026-10-14', updatedAt: '2026-11-02',
    sourceUrl: 'https://www.ea.com/games/madden-nfl/madden-nfl-27/news/mcs-27-announcement', sourceName: 'EA SPORTS Madden Championship Series', sourceVerified: true,
    tags: ['Madden NFL', 'MCS 27', 'Most Feared', 'Madden Bowl'], eventId: 'madden-mcs-27-most-feared-qualifier',
  },
  {
    id: 'news-dota2-ti-2026', slug: 'news-dota2-ti-2026', gameId: 'dota2', gameName: 'Dota 2',
    title: 'Team Spirit wins The International 2026 in Shanghai',
    excerpt: 'Valve confirms Team Spirit as Grand Champions after a five-game final.',
    content: [
      'Valve’s official results page confirms Team Spirit won The International 2026 in Shanghai. The Grand Final went five games before Spirit claimed the Aegis.',
      'The tournament brought together 16 teams. Valve’s results and replay pages are the primary references for the final bracket and match replays; this summary does not infer a prize amount that is absent from the cited result announcement.'
    ],
    tournamentName: 'The International 2026', status: 'completed', publishedAt: '2026-10-14', updatedAt: '2026-11-02',
    sourceUrl: 'https://www.dota2.com/newsentry/680759856779493378', sourceName: 'Dota 2 / Valve', sourceVerified: true,
    tags: ['Dota 2', 'The International', 'Team Spirit', 'Shanghai'], eventId: 'dota2-ti-2026',
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
    "sourceVerified": false,
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
    "sourceVerified": false,
    "tags": [
      "Apex Legends",
      "ALGS",
      "Split 2 Playoffs",
      "ALGS Year 6"
    ]
  }
];
// END GENERATED TOURNAMENT NEWS

// Only source-checked editorial articles are public; generated AI output remains a private draft.
// Article status follows the linked event dates so old news does not stay falsely "upcoming".
export const TOURNAMENT_NEWS: TournamentNews[] = CURATED_TOURNAMENT_NEWS
  .filter((article) => article.sourceVerified)
  .map((article) => {
    const event = article.eventId ? TOURNAMENT_EVENTS.find((candidate) => candidate.id === article.eventId) : undefined;
    return event ? { ...article, status: statusForEvent(event) } : article;
  });

export const OFFICIAL_TOURNAMENT_SOURCES: TournamentSource[] = [
  { gameId: 'bgmi', gameName: 'BGMI', url: 'https://esports.battlegroundsmobileindia.com/', sourceName: 'KRAFTON India Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'pubg', gameName: 'PUBG Mobile', url: 'https://esports.pubgmobile.kr/ko/events', sourceName: 'PUBG MOBILE Esports Korea', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'freefire', gameName: 'Free Fire', url: 'https://ff.garena.com/en/article/1605/', sourceName: 'Garena Free Fire', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'valorant', gameName: 'VALORANT', url: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know', sourceName: 'Riot Games VALORANT Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'cod', gameName: 'Call of Duty', url: 'https://www.callofdutyleague.com/en-us/schedule?stage=entire-season', sourceName: 'Call of Duty League', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'cs2', gameName: 'Counter-Strike 2', url: 'https://blast.tv/cs/tournaments/thunderpick-world-championship-2026/match?view=results', sourceName: 'BLAST.tv Counter-Strike', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'fortnite', gameName: 'Fortnite', url: 'https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC', sourceName: 'Epic Games Fortnite Competitive', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'apex', gameName: 'Apex Legends', url: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview', sourceName: 'EA Apex Legends Global Series', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'minecraft', gameName: 'Minecraft', url: 'https://www.minecraft.net/en-us/live', sourceName: 'Minecraft Official', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'roblox', gameName: 'Roblox', url: 'https://about.roblox.com/en-au/newsroom/2026/09/roblox-fall-games-preview', sourceName: 'Roblox Newsroom', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'league', gameName: 'League of Legends', url: 'https://lolesports.com/en-US', sourceName: 'Riot Games LoL Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'rocket_league', gameName: 'Rocket League', url: 'https://www.rocketleague.com/competitive/schedule', sourceName: 'Rocket League Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'overwatch', gameName: 'Overwatch 2', url: 'https://overwatch.blizzard.com/en-us/news/24246297/owcs-2026-/', sourceName: 'Blizzard Overwatch Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'rainbow_six', gameName: 'Rainbow Six Siege', url: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege', sourceName: 'Ubisoft R6 Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'destiny2', gameName: 'Destiny 2', url: 'https://help.bungie.net/hc/en-us/articles/360049199711-Destiny-and-Destiny-2-Competition-License', sourceName: 'Bungie Help', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'ea_fc', gameName: 'EA Sports FC', url: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-open-global-qualifier', sourceName: 'EA SPORTS FC Pro', note: 'The event-specific announcement supersedes the older season overview: Global Qualifier is 6–7 Nov in London. FC Pro is one EA circuit; publisher-run console tournaments may have separate schedules.', checkedAt: '2026-10-22' },
  { gameId: 'mobile_legends', gameName: 'Mobile Legends: Bang Bang', url: 'https://en.moonton.com/news/377.html', sourceName: 'MOONTON Games', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'honor_of_kings', gameName: 'Honor of Kings', url: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html', sourceName: 'Olympic Council of Asia', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'brawl_stars', gameName: 'Brawl Stars', url: 'https://event.supercell.com/brawlstars/en/', sourceName: 'Supercell Brawl Stars Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'clash_of_clans', gameName: 'Clash of Clans', url: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete', sourceName: 'Supercell Clash of Clans Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'clash_royale', gameName: 'Clash Royale', url: 'https://event.supercell.com/clashroyale/en', sourceName: 'Supercell Clash Royale League', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'genshin', gameName: 'Genshin Impact', url: 'https://www.hoyolab.com/#/article', sourceName: 'HoYoverse HoYoLAB', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'stumble_guys', gameName: 'Stumble Guys', url: 'https://www.stumbleguys.com/news', sourceName: 'Scopely Stumble Guys', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'among_us', gameName: 'Among Us', url: 'https://www.innersloth.com/games/among-us/', sourceName: 'Innersloth', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'gta_online', gameName: 'GTA Online', url: 'https://www.rockstargames.com/newswire', sourceName: 'Rockstar Games Newswire', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'marvel_rivals', gameName: 'Marvel Rivals', url: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html', sourceName: 'Marvel Rivals Ignite', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'arena_of_valor', gameName: 'Arena of Valor', url: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/', sourceName: 'Garena Liên Quân Mobile', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'teamfight_tactics', gameName: 'Teamfight Tactics', url: 'https://teamfighttactics.leagueoflegends.com/en-us/news/esports/', sourceName: 'Riot Games TFT Esports', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'pubg_battlegrounds', gameName: 'PUBG: BATTLEGROUNDS', url: 'https://pubgesports.com/en/', sourceName: 'PUBG Esports / KRAFTON', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'dota2', gameName: 'Dota 2', url: 'https://www.dota2.com/international/overview', sourceName: 'Valve / Dota 2', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'ea_madden', gameName: 'Madden NFL', url: 'https://www.ea.com/games/madden-nfl/madden-nfl-27/news/mcs-27-announcement', sourceName: 'EA SPORTS Madden Championship Series', note: 'Publisher or organizer source for event calendars, schedules and results; open it for the latest published changes.', checkedAt: '2026-10-22' },
  { gameId: 'psn', gameName: 'PlayStation Tournaments (platform)', url: 'https://www.playstation.com/en-us/tournaments/', sourceName: 'PlayStation', note: 'Platform tournament listing for supported games (including sports and fighting titles). Events are game- and territory-specific; this is not one global league. Reference only; not used to auto-publish news.', checkedAt: '2026-10-22', syncEnabled: false },
  { gameId: 'steam', gameName: 'Steam (platform)', url: 'https://store.steampowered.com/tourney/limited_license', sourceName: 'Valve / Steam tournament license', note: 'Policy page, not an event calendar. Steam hosts many games; each game publisher or independent organizer maintains its own competition schedule. Reference only; not used to auto-publish news.', checkedAt: '2026-10-22', syncEnabled: false },
  { gameId: 'xbox', gameName: 'Xbox (platform)', url: 'https://www.xbox.com/en-US/community/esports', sourceName: 'Xbox Esports', note: 'Platform esports overview includes title-specific circuits such as Halo Championship Series and Forza Racing Championship. Follow each game’s organizer for event dates. Reference only; not used to auto-publish news.', checkedAt: '2026-10-22', syncEnabled: false },
];

// This date records the local dataset review, not a fresh verification of every linked source.
OFFICIAL_TOURNAMENT_SOURCES.forEach((source) => {
  source.reviewedAt = '2026-11-02';
});

export function getTournamentGameName(gameId: string): string {
  return POPULAR_GAMES.find((game) => game.id === gameId)?.shortName || gameId;
}

export function statusForEvent(event: Pick<TournamentEvent, 'startDate' | 'endDate' | 'status'>, now = new Date()): TournamentStatus {
  if (event.status === 'cancelled' || event.status === 'draft') return event.status;
  // Do not turn missing or malformed dates into stale "upcoming" or "completed" claims.
  if (!event.startDate) return event.status === 'completed' ? 'completed' : 'unknown';
  const validDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  };
  if (!validDate(event.startDate) || (event.endDate && !validDate(event.endDate))) return 'unknown';
  const start = new Date(`${event.startDate}T00:00:00Z`).getTime();
  const end = new Date(`${event.endDate || event.startDate}T23:59:59.999Z`).getTime();
  if (end < start) return 'unknown';
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
  publishedDate?: string;
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
    gameId: 'bgmi', title: 'BGMI News: Latest Game Updates and Royale Pass | Tradivex',
    description: 'BGMI game updates, patch notes, seasons and in-game content from official publisher sources.',
    heading: 'BGMI game news and player updates',
    intro: 'Publisher updates, patches, seasons and in-game content for BGMI. Tournament schedules and results are listed separately.',
    updateHeading: 'BGMI V4.6.1 patch fixes Ocean Odyssey and Prize Path bugs', updateDate: '2 November 2026',
    update: ["The latest BGMI patch listed in KRAFTON’s official news archive is V4.6.1.21594, released 13 October 2026. It restores the Manta Ray vehicle attack function on Ocean Odyssey, fixes Prize Path event screens and resolves control and UI bugs.","V4.6.0 introduced the Midnight Hunters vampire mode on Erangel in September. V4.6.1 adjusts vampire transformation timing, vehicle damage interaction and movement balance.","Tournament schedules and completed results are listed separately on the tournaments page."],
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
    gameId: 'pubg', title: 'PUBG Mobile News: V4.7 Beta Test 2 | Tradivex',
    description: 'PUBG Mobile latest game news: official V4.7 Beta Test 2 announcement, current V4.6 live update and in-game event notices.',
    heading: 'PUBG Mobile News: V4.7 Beta Test 2',
    intro: 'PUBG MOBILE’s official news feed lists V4.7 Beta Test 2, dated 10 October, as its newest version announcement. It is a beta test announcement; the newest general version update listed is V4.6 from 7 September. Regional esports is covered on the separate tournaments page.',
    updateHeading: 'Official feed lists V4.7 Beta Test 2; no Beta Test 3 post found', updateDate: '2 November 2026',
    update: [
      'PUBG MOBILE’s official news feed lists V4.7 Beta Test 2, published 10 October 2026, as its newest version announcement. I found no official Beta Test 3 announcement in that feed. Beta content is not the same as a global release.',
      'The same official feed lists V4.6 as the latest global version announcement, published 7 September 2026. Check the in-game notice for region-specific rollout and hotfixes.',
      'The official archive also lists the Ocean Odyssey themed-mode return announcement on 29 September. The feed does not substantiate the previously stated 16 October Beta Test 3 details.',
      'Regional esports events are listed on the separate tournaments page.',
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
    title: 'PUBG: BATTLEGROUNDS News: Update 43.2 & PGC 2026 | Tradivex',
    description: 'PUBG PC and console Update 43.2 patch notes, October rollout, gameplay changes and the announced PGC 2026 schedule.',
    heading: 'PUBG: BATTLEGROUNDS News: Update 43.2 and PGC 2026',
    intro: 'This page covers the PC and console version of PUBG: BATTLEGROUNDS. It is separate from PUBG Mobile. Update 43.2 is the latest patch listed in PUBG’s official patch archive.',
    updateHeading: 'Update 43.2 adds controller, vehicle and UI improvements',
    updateDate: '2 November 2026',
    update: [
      'PUBG’s official patch archive lists Update 43.2, published 13 October 2026, as newer than Update 43.1. PC maintenance was scheduled for 14 October and console maintenance for 22 October.',
      'Update 43.2 includes the Dawnbreakers of Rondo event, the PUBG x Bentley collaboration, message-radial improvements, vehicle-spawn balance changes, controller input improvements on console, and custom-match tools.',
      'The official notes also include map, lobby, UI and bug fixes. Platform availability differs for some features; use the platform-specific patch notes and in-game event timer for current access.',
      'The Asia Stars Tournament and Web Event ended on 13 October at 07:00 UTC. Its historical dates are not presented as live. PGC dates and qualification are covered separately on the tournaments page.'
    ],
    detailSections: [
      { title: 'PUBG Update 43.2 — platform and patch details', description: 'PUBG lists separate PC and console maintenance windows for Update 43.2.', columns: ['Item', 'Official detail'], rows: [['Patch notes published', '13 October 2026'], ['PC maintenance', '14 October 2026'], ['Console maintenance', '22 October 2026'], ['Rondo event', 'Dawnbreakers of Rondo'], ['Collaboration', 'PUBG x Bentley'], ['Controller updates', 'Console controller presets, markers and radial controls'], ['Other updates', 'Vehicle balance, custom-match tools and bug fixes']], sourceUrl: 'https://www.pubg.com/en/news/11136' },
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
      { name: 'PUBG — Update 43.2 patch notes', url: 'https://www.pubg.com/en/news/11136' },
      { name: 'PUBG — Asia Stars Tournament & Web Event', url: 'https://pubg.com/en/events/notice/10926' },
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
    description: 'Dota 2 update checked 16 October 2026: patch 7.41f, Team Yandex wins BLAST Slam VIII, and upcoming Slam IX and DreamLeague Season 30 dates.',
    heading: 'Dota 2 News: Patch 7.41f and the 2026 Tournament Calendar',
    intro: 'Dota 2’s Steam announcements and tournament organizers are the primary sources for this update. The calendar below separates the completed BLAST Slam VIII result from confirmed November and December events, and marks details that remain unpublished.',
    updateHeading: 'Trove of Terror is Valve’s latest listed announcement', updateDate: '2 November 2026',
    update: [
      'Valve’s Steam announcement feed lists Inside the Trove of Terror on 6 October 2026 as newer than gameplay patch 7.41f, published 15 September. The Trove announcement describes new and returning Arcana, Immortal sets, and Tormentor and Roshan appearances.',
      'The feed checked does not show the previously claimed 20 October Dawnbreaker hotfix. That claim has been removed because it is not supported by Valve’s announcement list.',
      'The newest numbered gameplay patch shown in Valve’s feed remains 7.41f. Follow Valve’s announcement page for subsequent gameplay changes.',
      'Tournament schedules and results are listed on the separate tournaments page.',
    ],
    detailSections: [
      { title: 'Dota 2 patch status checked 16 October', description: 'Valve’s Steam community announcement page is the publisher source for patch releases and gameplay updates.', columns: ['Update', 'Status'], rows: [['Gameplay patch 7.41f', 'Valve release dated 15 September 2026'], ['Summer Scrub', 'Listed in the same September announcement feed'], ['Follow-up fixes', 'See Valve’s current announcement feed']], sourceUrl: 'https://steamcommunity.com/app/570/announcements/?l=english' },
      { title: 'Dota 2 esports — completed and upcoming dates', description: 'BLAST’s official results confirm the Slam VIII champion and final score.', columns: ['Event', 'Dates and confirmed detail'], rows: [['BLAST Slam VIII', 'Completed 11 October; Team Yandex beat Team Spirit 3–1; 16 teams; Malta; US$750,000'], ['BLAST Slam IX', '20–29 November 2026; online'], ['DreamLeague Season 30', '2–13 December 2026; 24 teams'], ['PGL Wallachia Season 9', 'Completed 17–27 September; Team Yandex beat NAVI 3–0 in the final'], ['The International 2026', 'Completed; Team Spirit won']], sourceUrl: 'https://blast.tv/dota/tournaments/blast-slam-viii/series?view=results' }
    ],
    playerFocusHeading: 'Patch notes, brackets and viewing times',
    playerFocus: [
      'For hero builds and ranked decisions, read the current Valve patch notes rather than relying on older 7.41 guides; small balance updates can change lane matchups and item choices.',
      'Tournament match times are published in event-local time and may shift with bracket progression. Check BLAST’s live series page before tuning in.',
      'The official organizer calendar lists future events, but team invitations and full match schedules may arrive later. This page avoids treating unannounced lineups as final.'
    ],
    competitionHeading: 'Dota 2 results and upcoming tournaments',
    competition: ['Completed 11 October: Team Yandex beat Team Spirit 3–1 to win BLAST Slam VIII.', 'BLAST Slam IX: 20–29 November, online.', 'DreamLeague Season 30: 2–13 December; 24 teams.'],
    sources: [
      { name: 'Valve — Dota 2 announcements and patch notes', url: 'https://steamcommunity.com/app/570/announcements/?l=english' },
      { name: 'BLAST — Slam VIII results', url: 'https://blast.tv/dota/tournaments/blast-slam-viii/series?view=results' },
      { name: 'BLAST — Slam IX online event announcement', url: 'https://dev.blast.tv/dota/news/blast-slam-ix-the-battle-moves-online' },
      { name: 'ESL FACEIT Group — Dota 2 Pro Tour calendar', url: 'https://eslfaceitgroup.com/press/esl-faceit-group-unveils-changes-to-the-dota-2-ecosystem-with-a-robust-esl-pro-tour-calendar-announcement/' }
    ],
    faqs: [
      { question: 'What is the latest Dota 2 gameplay patch listed by Valve?', answer: 'Valve’s official feed lists gameplay patch 7.41f, released 15 September 2026; ' },
      { question: 'Who won BLAST Slam VIII?', answer: 'Team Yandex beat Team Spirit 3–1 in the 11 October Grand Final.' },
      { question: 'Is The International 2026 still upcoming?', answer: 'No. It has concluded; this page lists it as completed rather than as a future event.' }
    ]
  },
  {
    gameId: 'freefire', title: 'Free Fire News: OB55, Booyah Pass & FFWS 2026 | Tradivex',
    description: 'Free Fire OB55 guide for October 2026: Naruto Shippuden return, Nine Tails gameplay, weapon and device changes, current pass checks and FFWS Global Finals.',
    heading: 'Free Fire News: OB55 Patch, Booyah Pass and FFWS',
    intro: 'Garena’s OB55 update is the major player-facing change for October: it brings back Naruto Shippuden content and changes Battle Royale events, weapons and devices. FFWS Global Finals is a separate esports event scheduled for Bangkok in November.',
    updateHeading: 'OB55 October 1 wave adds weapons and combat changes', updateDate: '2 November 2026',
    update: [
      'Garena’s official news archive lists OB55, dated 10 September, as its newest patch note. The OB55 notes list a second content wave on 1 October, including four weapons (M7, Skorp, RPK and Hawk) and weapon-class balance changes.',
      'Character reworks include Kenta (tempest-based teleportation with damage reduction), Wukong (faster transformation), and nerfs to Morse (less stealth time) and Luna (lower rate-of-fire bonus).',
      'Weapon balance changes: SMGs gain movement speed but lose range; shotguns split between M1887 (more range) and M590 (more minimum damage); assault rifles gain accuracy and armor penetration.',
      'FFWS Global Finals is scheduled for 6 November in Bangkok. Daily schedule and team rosters are pending from the official announcement.',
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
    gameId: 'valorant', title: 'VALORANT News: Patch 13.09 and Current Updates | Tradivex',
    description: 'VALORANT Patch 13.09 adds Agent Hush, Warden changes, UI improvements and bug fixes; past Champions results are listed separately.',
    heading: 'VALORANT News: Patch 13.09 and Current Updates',
    intro: 'Riot’s latest patch archive entry is Patch 13.09, dated 27 October 2026. It adds Agent Hush and makes competitive UI, weapon, agent and bug-fix changes. Completed tournament dates are covered separately.',
    updateHeading: 'Patch 13.09 adds Hush, Warden buffs and bug fixes', updateDate: '2 November 2026',
    update: [
      'Riot published Patch 13.09 on 27 October. It adds Agent Hush, updates ability descriptions and buff terms, adjusts Clove and Warden, and includes Competitive UI improvements and bug fixes.',
      'Champions Shanghai runs 24 September–18 October with 16 teams from Americas, China, EMEA and Pacific. The four-group stage continues through 4 October; eight teams advance to double-elimination playoffs from 7–18 October. Riot lists the Grand Final for 18 October.',
      'The previously listed Champions Shanghai dates ended on 18 October. The tournament record should be read as historical; current results and new schedules belong to the official Riot event feed.'
    ],
    detailSections: [{"title":"VALORANT Champions Shanghai — tournament tracker","description":"Champions has 16 qualified teams. Riot’s guide gives the format and dates; the official event feed is the source for live brackets, team lineups and match results.","columns":["Stage","Official detail"],"rows":[["Field","16 qualified teams from Americas, China, EMEA and Pacific"],["Group Stage","24 September–4 October; four groups; best-of-three matches"],["Advancement","Two losses eliminate a team; eight teams advance"],["Playoffs","7–18 October; double elimination"],["Grand Final","18 October"],["Points / standings","Use the official Champions bracket; group stage is complete as of 6 October"],["Player rosters","Official team lineups are on the Champions event/broadcast pages"]],"sourceUrl":"https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know"},{"title":"Champions Shanghai — rewards, rosters and standings status","description":"Riot’s event guide confirms Drops and Pick’Ems. The guide is the event-format source; the official Champions event feed is the source for bracket movement and team lineups.","columns":["Item","Official detail"],"rows":[["Viewer rewards","Eligible live broadcasts can grant Champions Drops"],["Prediction rewards","Champions Pick’Ems are available in-client and on the event site"],["Prize pool","Not stated in the cited Champions event guide"],["Teams","16 qualified teams"],["Player rosters","Use Riot’s official team/event pages; roster status can change before a match"],["Live bracket","Official Champions bracket after groups; playoffs start 7 October"]],"sourceUrl":"https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know"}],
    playerFocusHeading: 'Ranked, event drops and Pick’Ems',
    playerFocus: [
      'Review Patch 13.08 before adapting map-specific practice: Bind and Corrode enter the Competitive and Deathmatch pool while Ascent and Split leave. Map Rating is private to each player and starts without historical match data.',
      'Riot says Champions viewers can earn exclusive Drops, including a title, by watching eligible live broadcasts. Champions Pick’Ems are available on the official site and in-client; check lock times before submitting predictions.',
    ],
    competitionHeading: 'Champions Shanghai 2026',
    competition: ['Champions Shanghai playoffs: 7–18 October, double elimination; Grand Final on 18 October. Follow Riot’s live bracket for match outcomes.', 'Game Changers Americas LCQ: 14 October round robin and 15 October Bo5 final at Riot Games Arena São Paulo; MIBR, Akave Esports Black and FlyQuest RED compete for the final Americas Championship place.'],
    sources: [
      { name: 'Riot Games — VALORANT Patch Notes 13.09', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-1309/' },
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
    gameId: 'cod', title: 'Call of Duty News: BO7 Season 6, CODM Season 9 | Tradivex',
    description: 'Call of Duty news for Black Ops 7, Warzone and COD Mobile: Season 06 patch notes, The Haunting content, separate title updates and esports calendars.',
    heading: 'Call of Duty News: Black Ops, Warzone and COD Mobile',
    intro: 'This Call of Duty profile covers several titles. Activision’s Black Ops 7 blog lists Season 06 Patch Notes as its newest BO7 feed entry; Season 06 began on 17 September. Warzone has separate patch notes, and COD Mobile follows its own Season 9 cycle. These titles do not share one CDL schedule.',
    updateHeading: 'Activision lists Season 06 patch notes as the latest BO7 feed entry', updateDate: '2 November 2026',
    update: [
      'Activision’s Black Ops 7 blog lists Season 06 Patch Notes as its newest BO7 feed item. The official Season 06 announcement says the season launched on 17 September with The Haunting content, including the Forbidden Summoning event.',
      'Use the linked Season 06 patch notes for the current gameplay changes; Activision publishes Black Ops 7 and Warzone notes separately.',
      'COD Mobile follows its separate Season 9 cycle and has its own patch feed, Battle Pass and esports schedule.',
      'Tournament schedules and results are listed on the separate tournaments page.',
    ],
    detailSections: [{"title":"Call of Duty — current confirmed details","description":"Call of Duty releases are split by game and mode. Season 6 is current for Black Ops 7/Warzone; COD Mobile runs a separate Season 8 cycle.","columns":["Area","Current verified detail"],"rows":[["Black Ops 7 / Warzone","Season 06: The Haunting"],["Latest official entry","Season 06 patch notes in Activision’s Black Ops 7 news feed"],["Warzone","Season patch notes are published separately from the seasonal announcement"],["COD Mobile","Season 8: Against All Fate"],["Esports table","No universal live points table spans Black Ops, Warzone and COD Mobile"],["Teams / rosters","Use the current event organizer page because each COD circuit maintains separate lineups"]],"sourceUrl":"https://www.callofduty.com/blog/blackops7"},{"title":"Season 06 — Battle Pass rewards and competitive status","description":"This is publisher-confirmed player content for Black Ops 7 and Warzone, not a combined Call of Duty esports prize table.","columns":["Item","Official detail"],"rows":[["Battle Pass price","1,100 COD Points"],["Battle Pass Bundle","2,400 COD Points; includes 20 Tokens"],["Pass rewards","100+ items and up to 1,100 COD Points"],["Free weapons","VMP SMG (Page 3) and TR51 Para Assault Rifle (Page 6)"],["BlackCell instant content","Revenant Operator, Mastercraft Blueprint, 1,100 COD Points and more"],["Esports table","No single official points table combines Black Ops 7, Warzone and COD Mobile circuits"]],"sourceUrl":"https://www.callofduty.com/blog/2026/09/call-of-duty-black-ops-7-warzone-season-6-the-haunting-announcement"}],
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
    gameId: 'cs2', title: 'CS2 News: Latest October Update and Tournament Calendar | Tradivex',
    description: 'Counter-Strike 2 October 28 update, Rush mode and current tournament results and schedules from Valve and event organizers.',
    heading: 'Counter-Strike 2 News: October Update and CS2 Events',
    intro: 'Valve’s latest listed CS2 update is dated 28 October 2026. Rush remains a separate 3v3 queued mode; tournament schedules and completed results are tracked from their organizers.',
    updateHeading: 'Valve’s October 28 update is the latest CS2 announcement checked', updateDate: '2 November 2026',
    update: [
      'Valve’s official Steam announcement archive lists a CS2 update dated 28 October 2026, later than the September Rush release and earlier October notes. See Valve’s update feed for the exact change list.',
      'The previous summary focused on the 14 October update and is now outdated. Rush remains a separate 3v3 queued mode; it did not replace Premier or Competitive.',
      'October tournament dates shown below have passed. Tournament winners and standings must come from the corresponding organizer result pages; the game patch feed is not a results source.',
    ],
    detailSections: [{"title":"Counter-Strike 2 — latest maintenance and competitive detail","description":"Valve’s latest listed update is dated 28 October. Event standings and player lineups belong to their respective tournament organizers.","columns":["Update / event","Verified detail"],"rows":[["Latest listed Valve update","28 October 2026; see Valve’s update archive for the change list"],["Rush","A separate 3v3 queue introduced in September"],["Premier / Competitive","Not replaced by Rush"],["Live team points","No publisher-wide CS2 points table; use the specific event’s official bracket"],["Player rosters","Use team and tournament organizer roster pages"]],"sourceUrl":"https://store.steampowered.com/oldnews/?appgroupname=Counter-Strike%3A+Global+Offensive&appids=730&feed=steam_community_announcements"},{"title":"CS2 — prize, roster and points-table status","description":"Counter-Strike tournament money, rosters and rankings are managed event-by-event. Valve update notes are separate from tournament standings.","columns":["Item","Status"],"rows":[["Latest listed update","28 October 2026; consult Valve’s archive for details"],["Live esports standings","Use the specific organizer’s official event bracket"],["Team/player roster","Use official tournament and team pages"],["Valve ranking","Check the current Valve Regional Standings / organizer listing before treating a ranking as live"],["Premier rating","Separate from tournament points"],["Item drops","Prime affects eligibility; it is not a guaranteed cash reward"]],"sourceUrl":"https://store.steampowered.com/oldnews/?appgroupname=Counter-Strike%3A+Global+Offensive&appids=730&feed=steam_community_announcements"}],
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
    gameId: 'fortnite', title: 'Fortnite News: Treasure Hunters and Current Updates | Tradivex',
    description: 'Fortnite Treasure Hunters launched November 1 with One Piece powers, a new island and Sprites; October FNCS dates are historical.',
    heading: 'Fortnite News: Treasure Hunters and Competitive Play',
    intro: 'Epic’s Fortnite feed announces that Treasure Hunters launched on 1 November with a new island, One Piece-inspired powers and Sprites. October FNCS Solos dates have passed and are presented as historical.',
    updateHeading: 'Treasure Hunters island launched November 1', updateDate: '2 November 2026',
    update: ["Epic’s Fortnite Battle Royale feed says Treasure Hunters launched on 1 November. The new island features treasure hunts, One Piece-inspired powers and Sprites.","Fortnitemares October coverage and the October 26–27 FNCS Solo Finals are now historical; the event windows have passed.","Fortnitemares introduced Nightmare Neighborhood, the Bonerattler SMG, returning weapons and temporary cartridge modifiers during October."],
    detailSections: [{"title":"Fortnite — Fortnitemares 2026 archive","description":"Fortnitemares affects several Fortnite modes. Competitive scoring remains separate and must be read from the official tournament rules for each event.","columns":["Area","Current verified detail"],"rows":[["Event","Fortnitemares 2026"],["Modes","Battle Royale, Horde Rush and Reload"],["Map changes","Freaky Fields and Nightmare Neighborhood"],["Items / encounters","Freddy Krueger encounter, Nightmare claws and Bonerattler SMG"],["Reload","Updated Nitemare Island scheduled for 8 October"],["FNCS Solo","Epic confirmed an October standalone event; official format and points were still pending"],["Teams / players","Solo event details are not team-roster data"]],"sourceUrl":"https://www.fortnite.com/news/the-corruption-spreads-in-fortnitemares-2026"},{"title":"FNCS Solos 2026 — completed event schedule and scoring","description":"Epic’s official FNCS Solos rules document the completed event structure. This is an individual competition, so it has player leaderboards rather than team rosters.","columns":["Item","Official detail"],"rows":[["Qualifier 2 Round 1","5–6 October"],["Qualifier 2 later rounds","Round 2: 10 October; Round 3: 11 October"],["Heats / LCQ","17–18 October / 19–20 October"],["Finals","26–27 October"],["Scoring","Victory Royale: 60 points; Finals eliminations: 4 points each"],["First-place cash prize","EU: US$60,000; NAC: US$50,000; Asia/OCE/ME: US$7,000"],["Eligibility","At least 13 years old or local minimum age; MFA required"],["Live leaderboard","In-game FNCS event leaderboard per region"]],"sourceUrl":"https://www.fortnite.com/competitive/rules-guidelines/rules-library/fortnite-championship-series-fncs-solos-2026-official-rules?region=NAC"}],
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
    gameId: 'apex', title: 'Apex Legends News: Cipher Season and ALGS Updates | Tradivex',
    description: 'Apex Legends Cipher season: Crypto rework, Akimbo Wingman, Strongholds, Legend Bans and recent ALGS results.',
    heading: 'Apex Legends News: Cipher and Current Updates',
    intro: 'Respawn’s October 29 Cipher update covers Crypto’s rework, Akimbo Wingman, Strongholds, ranked Legend Bans, and changes to Revenant and Lifeline. The October 29–November 1 ALGS Split 2 Playoffs have concluded.',
    updateHeading: 'Cipher introduces Crypto changes and new Strongholds', updateDate: '2 November 2026',
    update: [
      'EA’s latest checked Apex feed lists Cipher Designer’s Notes on 30 October and “New Updates Coming with Apex Legends: Cipher” on 29 October. The Cipher update features Crypto’s drone and EMP rework, Akimbo Wingman, Strongholds, ranked Legend Bans in Diamond and above, and Revenant and Lifeline changes.',
      'The earlier Blood Pact event runs 8 October–3 November, so it is still in progress on 2 November. Check the in-game event timer for the exact local end time.',
      'The ALGS Year 6 Split 2 Playoffs ran 29 October–1 November in Las Vegas and are now complete. Use EA’s official competition page for final results and bracket details.',
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
    updateHeading: 'Minecraft Dungeons II is live; Wilderness Bound remains current', updateDate: '2 November 2026',
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
    updateHeading: 'October creator games and platform updates', updateDate: '2 November 2026',
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
    updateHeading: 'Patch 26.21 adds True Damage skins and replay download limits', updateDate: '2 November 2026',
    update: ["Riot’s Patch 26.21, released 20 October, added True Damage Know My Name skins for Ekko, Akali, Qiyana, Senna and Yasuo and limited replay downloads to 10 per hour.","Patch 26.20 (6 October) was the Worlds patch, with pro-play tuning including changes to Ambessa, K’Sante, Kennen and Kindred.","Worlds’ Swiss Stage concluded on 31 October. The Knockout Stage runs 3–8 November in Allen, Texas; the Grand Final is scheduled for 14 November in Brooklyn."],
    detailSections: [{"title":"League of Legends Worlds 2026 — current event tracker","description":"Worlds is between its completed Swiss Stage and the upcoming Knockout Stage. Riot’s live schedule carries current matchups and standings.","columns":["Stage","Official schedule"],"rows":[["Tournament window","15 October–14 November"],["Play-Ins","15–18 October, Los Angeles; completed"],["Swiss Stage","23–31 October, Allen, Texas; completed"],["Knockout Stage","3–8 November, Allen, Texas"],["Final","14 November at Barclays Center, Brooklyn"],["Live standings","Use Riot’s LoL Esports schedule and bracket"]],"sourceUrl":"https://lolesports.com/en-GB/news/worlds-2026-primer"}],
    playerFocusHeading: 'Patch, ranked season and Worlds watch planning',
    playerFocus: [
      'Worlds broadcasts use the tournament patch and professional draft rules; ranked queues use the live client patch. For champion builds, check the client patch notes rather than assuming the competitive patch is current for solo queue.',
      'For tickets, venue entry, cosplay, bags and broadcast start times, Riot’s event policy page is the controlling source. Matchups and qualified teams belong on the official LoL Esports schedule.',
    ],
    competitionHeading: 'Worlds 2026',
    competition: ["Worlds Swiss Stage ended 31 October. Quarterfinals and semifinals run 3–8 November in Allen, Texas; the Final is scheduled for 14 November in Brooklyn.","The Worlds anthem “Know My Name” premiered on 8 October; this is a music release, not a tournament schedule update."],
    sources: [
      { name: 'Riot Games — Worlds 2026 venue policies and updated times', url: 'https://lolesports.com/en-US/lolesports/news/worlds-2026-venue-event-policies' },
      { name: 'Riot Games — Worlds 2026 anthem news', url: 'https://lolesports.com/en-US/lolesports/news/worlds-anthem-presented-by-true-damage' },
      { name: 'LoL Esports news', url: 'https://lolesports.com/en-US/lolesports/news' },
    ],
    faqs: [{"question":"Where is the League of Legends Worlds 2026 Final?","answer":"Riot lists Barclays Center in Brooklyn, New York, for the 14 November Final."},{"question":"What is the current stage of Worlds 2026?","answer":"The Swiss Stage ended on 31 October. The Knockout Stage is scheduled for 3–8 November in Allen, Texas."}],
  },
  {
    gameId: 'rocket_league', title: 'Rocket League News: Season 24, Rocket Pass & RLCS | Tradivex',
    description: 'Rocket League Season 24 is live: Rocket Pass cars, Honor Duels, Black Market trade-ins, Bullet Ball dates, ranked rewards and RLCS updates.',
    heading: 'Rocket League News: Season 24 and Rocket Pass',
    intro: 'Season 24 launched on 23 September with player-facing changes to duels, item trade-ins, controls and ranked rewards. The official season post also gives exact dates for the current limited-time modes and Rocket Pass content.',
    updateHeading: 'Bullet Ball has ended; Season 24 content continues', updateDate: '2 November 2026',
    update: ["Psyonix’s Season 24 introduced Honor Duels, Black Market trade-ins, control updates and new ranked titles. Bullet Ball ran through 6 October and the Persona 5 event through 12 October; both windows have ended.","Season 24 also included a custom scoreboard, free-look camera options and Rocket Pass cars. The Run It Up challenge track is listed through 9 December; check the client for the active challenge and claim timer.","The limited-time October modes are historical. Use Rocket League’s in-game event panel for current Season 24 content and the official competitive schedule for RLCS dates."],
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
    gameId: 'overwatch', title: 'Overwatch 2 News: October 20 Patch and OWCS | Tradivex',
    description: 'Overwatch October 20 bug-fix update addresses Sombra challenge completion and DualSense controller support on PC.',
    heading: 'Overwatch 2 News: October 20 Bug Fix Update',
    intro: 'Blizzard’s latest listed Overwatch retail patch is the October 20 bug-fix update. It fixes a Sombra challenge issue and DualSense controller support on PC. OWCS schedules vary by region.',
    updateHeading: 'October 20 update fixes challenge and DualSense issues', updateDate: '2 November 2026',
    update: [
      'Blizzard’s 20 October retail patch is a bug-fix update. It fixes an issue preventing the “Not so Thankless” challenge from completing by thanking Sombra, and fixes DualSense controllers not working properly on PC.',
      'The October 13 hotfix contains hero balance adjustments; the October 6 Season 5 patch introduced Doctrine and the Grímsvötn map. Those are earlier updates, not the latest patch.',
      'OWCS Stage 3 is still in progress in China through 8 November; NA and EMEA playoffs ended on 1 November. The 2026 World Finals are scheduled for 2–6 December.'
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
      { name: 'Blizzard — Overwatch live patch notes', url: 'https://overwatch.blizzard.com/en-us/news/patch-notes/' },
      { name: 'Blizzard — Season 4 midcycle and pass update', url: 'https://overwatch.blizzard.com/en-us/news/24295392/' },
      { name: 'Overwatch Esports — 2026 competitive details', url: 'https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/' },
    ],
    faqs: [
      { question: 'When will Overwatch Unvaulted Passes arrive?', answer: 'Blizzard moved the feature to the start of Season 5 and said more details would arrive before then.' },
      { question: 'When does OWCS Stage 3 start?', answer: 'The regular season starts on 10 October, with three weekend rounds before playoffs on 30 October–1 November.' },
    ],
  },
  {
    gameId: 'rainbow_six', title: "Rainbow Six Siege News: Y11S3 Mid-Season Update & R6 Osaka Major | Tradivex",
    description: "Rainbow Six Siege Operation Split Fire mid-season update: Legend Division, Noor balance changes, anti-cheat improvements and Osaka Major schedule.",
    heading: "Rainbow Six Siege News: Split Fire Mid-Season Update",
    intro: "Ubisoft’s 15 October mid-season update for Operation Split Fire adds the solo-queue Legend Division through 1 December, Noor balance changes, a Ranked map rotation and stronger PC anti-cheat requirements. The R6 Osaka Major is scheduled for 7–15 November.",
    updateHeading: "Split Fire mid-season update adds Legend Division", updateDate: '2 November 2026',
    update: ["Ubisoft’s 15 October mid-season update makes the Y11S3 Legend Division available through 1 December. It is a solo-queue playlist for eligible Champion players and uses the Pro League map pool.","The same update includes Noor balance changes, a final Ranked map rotation and Secure Boot requirements for eligible PC players entering Legend Division. Read Ubisoft’s full notes for eligibility and platform details.","The BLAST R6 Major Osaka is scheduled for 7–15 November 2026. Its event page is the source for the latest match schedule, qualified teams and results."],
    detailSections: [{"title":"Rainbow Six Siege — Operation Split Fire mid-season update","description":"Ubisoft’s 15 October article lists the mid-season features and eligibility. Check the official patch notes for any later hotfixes.","columns":["Area","Verified detail"],"rows":[["Season","Year 11 Season 3: Operation Split Fire"],["Mid-season update","15 October 2026"],["Legend Division","Solo queue; runs through 1 December; Champion and account-security requirements apply"],["Other changes","Noor balancing, Ranked map rotation and PC anti-cheat measures"],["R6 Osaka Major","7–15 November 2026; consult the official event page for schedule and teams"]],"sourceUrl":"https://news.ubisoft.com/en-us/article/1yzD1EJhuk6vXsTt8eP1hf/rainbow-six-siege-operation-split-fire-midseason-update-legend-division-arrives-noor-buffs-and-a-final-ranked-map-rotation"}],
    playerFocusHeading: "Legend Division eligibility and seasonal rewards",
    playerFocus: ["Legend Division is solo queue and requires Champion rank plus Ubisoft’s listed account-security, clearance and prior-season requirements. Read the official mid-season notes before queueing.","Use the in-game event panel and Ubisoft’s current patch notes for region-specific drops, event expiry and later hotfixes."],
    competitionHeading: "BLAST R6 Major Osaka 2026",
    competition: ["The Major is scheduled for 7–15 November at ATC Hall, Osaka. Confirm the current qualified teams and match times on Ubisoft’s official competition page.","Use Ubisoft’s current SI points standings page for rankings; points and team placements can change as events conclude."],
    sources: [{"name":"Ubisoft — Operation Split Fire mid-season update","url":"https://news.ubisoft.com/en-us/article/1yzD1EJhuk6vXsTt8eP1hf/rainbow-six-siege-operation-split-fire-midseason-update-legend-division-arrives-noor-buffs-and-a-final-ranked-map-rotation"},{"name":"Ubisoft — BLAST R6 Major Osaka","url":"https://www.ubisoft.com/en-us/esports/rainbow-six/siege/competition/513"},{"name":"Ubisoft — R6 esports standings","url":"https://www.ubisoft.com/en-us/esports/rainbow-six/siege/global-standings"}],
    faqs: [{"question":"What is the latest Rainbow Six Siege update?","answer":"Ubisoft’s 15 October 2026 Operation Split Fire mid-season update introduced Legend Division, Noor balance changes, a Ranked map rotation and PC anti-cheat measures."},{"question":"When is the R6 Major Osaka 2026?","answer":"Ubisoft lists the Major for 7–15 November 2026 in Osaka. Check the official competition page for the live schedule and qualified teams."}],
  },
  {
    gameId: 'destiny2', title: 'Destiny 2 News: Update 9.7 and Current Official Schedule | Tradivex',
    description: "Destiny 2 Update 9.7.0.5 from October 7 and Bungie’s final-major-update guidance; smaller maintenance fixes may follow.",
    heading: 'Destiny 2 News: Update 9.7 and Guardian Checklist',
    intro: 'Bungie’s 9.7.0 release was identified as the final major patch for Destiny 2, with smaller maintenance updates still possible. The 9.7.0.3 notes include Crucible and Trials fixes; licensed community competitions follow separate organizer schedules.',
    updateHeading: "Update 9.7.0.5 addresses backend abuse and cheat reports", updateDate: '2 November 2026',
    update: ["Bungie’s October 7 Update 9.7.0.5 addressed backend abuse involving unearned rewards and XP and explains how to report suspected cheating.","Bungie’s 9.7.0 release was described as the final planned live-service content update. Smaller maintenance patches and hotfixes may still be released.","This game-news page was reviewed on 2 November 2026. Check Bungie’s news feed and patch notes for any newer maintenance post."],
    detailSections: [{"title":"Destiny 2 — latest game update and competition status","description":"Bungie’s 9.7.0 update ended planned live-service content updates; maintenance fixes may follow. Destiny competitions are licensed event-by-event rather than one publisher league.","columns":["Area","Confirmed detail"],"rows":[["Latest patch listed here","Update 9.7.0.5, 7 October 2026"],["Patch focus","Backend protections and reporting guidance related to unearned rewards and XP"],["Planned content status","No planned live-service content updates after 9.7.0; smaller maintenance fixes may still occur"],["Competition format","Community organizers operate under Bungie’s competition license"],["Live points table","No publisher-wide Destiny 2 esports standings"]],"sourceUrl":"https://www.bungie.net/7/en-us/News/Article/destiny_2_update_9_7_0_5"}],
    playerFocusHeading: 'Activities, power progression and community events',
    playerFocus: [
      'Check active event cards, Eververse offers and activity modifiers in the Director; Bungie publishes maintenance details separately from major release notes, confirm active event cards, Eververse offers and activity modifiers in the Director before planning a weekly reset route.',
      'Bungie’s competition license allows community organizers to run Destiny competitions under its terms. That is different from a publisher-operated professional league; review the license before organizing an event.',
    ],
    competitionHeading: 'Destiny 2 esports status',
    competition: ['No Bungie-run 2026 esports tournament schedule was found in the official pages checked.', 'Community tournaments may operate under Bungie’s competition license. Their brackets, prizes and eligibility are organizer-specific.'],
    sources: [{"name":"Bungie — Destiny 2 Update 9.7.0.5","url":"https://www.bungie.net/7/en-us/News/Article/destiny_2_update_9_7_0_5"},{"name":"Bungie — Destiny 2 final planned content update support guide","url":"https://help.bungie.net/hc/en-us/articles/49848696022548-Destiny-2-Monument-of-Triumph-and-Update-9-7-0-Support-Guide"},{"name":"Bungie competition license","url":"https://help.bungie.net/hc/en-us/articles/360049199711-Destiny-and-Destiny-2-Competition-License"}],
    faqs: [{"question":"Will Destiny 2 receive more major content updates?","answer":"Bungie says Update 9.7.0 is the final planned live-service content update. Smaller maintenance patches and hotfixes may still be released."},{"question":"What is the latest listed Destiny 2 patch in this update?","answer":"Bungie published Update 9.7.0.5 on 7 October 2026. Check the official patch archive for any later maintenance notes."}],
  },
  {
    gameId: 'ea_fc', title: 'EA FC 27 News: Title Update 1.1 and Gameplay Notes | Tradivex',
    description: 'EA SPORTS FC 27 launch guide: Ones to Watch Season 1 pass runs through October 22, player item upgrades, Ultimate Team and FC Pro details.',
    heading: 'EA SPORTS FC 27 News: Season 1 and FC Pro',
    intro: 'EA SPORTS FC 27 launched in September, and Football Ultimate Team Season 1 is active through 22 October. This page separates Ultimate Team’s player-facing campaign from the FC Pro esports ladder and the new Grounds/Clubs modes.',
    updateHeading: 'EA posts FC 27 Title Update 1.1 and October gameplay notes', updateDate: '2 November 2026',
    update: [
      'EA’s launch update sets Season 1: Ones to Watch for 17 September–22 October. The campaign links Ones to Watch, Destined for Glory and Future Stars; eligible Ones to Watch items can receive upgrades for Team of the Week, Star Performer or Player of the Month recognition, plus a club-results boost described in EA’s rules.',
      'EA’s 30 September Gameplay Developer Launch Update and 29 September Career Mode update are the newest title-specific news posts. The Grounds, including Clubs, is available only on PlayStation 5, Xbox Series X|S, PC and Nintendo Switch 2 according to EA’s platform note; older consoles do not get that mode.',
      "EA’s FC 27 news feed lists October 28 Gameplay Developer Notes and Title Update v1.1.0 on October 27 among the latest posts. EA says the first gameplay balance changes are planned for a November title update; v1.1.0 itself is a bug-fix and quality-of-life update, not a gameplay rebalance.",
      'Season 1: Ones to Watch ended on 22 October. EA’s current Ultimate Team season and objective timers should be checked in-game.'
    ],
    detailSections: [{"title":"EA SPORTS FC 27 — Season 2 and FC Pro tracker","description":"Ultimate Team seasons and FC Pro qualification are separate systems. Season 2 began after Ones to Watch ended.","columns":["Area","Current confirmed detail"],"rows":[["FUT Season 1","Ones to Watch ended 22 October"],["FUT Season 2","FC Heritage announced 22 October"],["Latest game posts","Gameplay Developer Notes 28 October; Title Update v1.1.0 on 27 October"],["v1.1.0","Bug fixes and quality-of-life changes; EA says no gameplay balance/tuning changes"],["FC Pro Open Ladder","21 September–3 October; complete"],["Next FC Pro step","Open Global Qualifier scheduled 6–7 November"]],"sourceUrl":"https://www.ea.com/games/ea-sports-fc/fc-27/news"},{"title":"FC Pro 27 — prize money, rewards and player pathway","description":"EA’s FC Pro Deep Dive provides the season prize outline. FC Pro is primarily individual competition, so it has player standings rather than standard team rosters.","columns":["Event / reward","Official detail"],"rows":[["Full FC Pro 27 prize pool","US$2,500,000"],["FC Pro World Championship","US$1,000,000; winner receives US$250,000"],["FC Pro Open","US$533,000; winner receives US$100,000"],["Global Qualifier","US$152,000"],["Open Cups","US$315,000 total"],["Open Ladder reward","Top 1–500 per region receive an in-game reward"],["Pathway","1,376 advance to regional qualifiers; 52 plus 12 invitees reach global qualifier; 16 reach FC Pro Open"],["Live rankings","Official FC Pro World Rankings / event bracket"]],"sourceUrl":"https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive"}],
    playerFocusHeading: 'Ultimate Team Season Pass and supported modes',
    playerFocus: ["Football Ultimate Team Season 1 ended on 22 October. Season 2: FC Heritage is the current announced campaign; check the in-game Season screen for exact objectives and rewards.","EA’s 27 October v1.1.0 patch notes say it includes bug fixes and quality-of-life changes without gameplay balance or tuning changes."],
    competitionHeading: 'FC Pro 27 competitive pathway',
    competition: ['The FC Pro 27 Open Ladder ran 21 Sep–3 Oct across ten online regions; EA’s event-specific announcement schedules the Global Qualifier for 6–7 November in London.', 'The $2.5 million figure announced by EA applies to the full season pool, not to the Open Ladder alone. Registration and qualification rules differ by region.'],
    sources: [
      { name: 'EA — FC 27 launch update and Season 1', url: 'https://www.ea.com/games/ea-sports-fc/fc-27/news/pitch-notes-fc27-launch-update' },
      { name: 'EA — FC 27 latest news and developer updates', url: 'https://www.ea.com/games/ea-sports-fc/fc-27/news' },
      { name: 'EA — FC Pro 27 competitive deep dive', url: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive' },
    ],
    faqs: [{"question":"When did EA FC 27 Season 1 end?","answer":"EA lists Season 1: Ones to Watch through 22 October 2026. Season 2: FC Heritage was announced on 22 October."},{"question":"Did FC 27 Title Update v1.1.0 change gameplay balance?","answer":"EA says v1.1.0 includes bug fixes and quality-of-life updates, with no gameplay balance or tuning changes."}],
  },
  {
    gameId: 'mobile_legends', title: 'MLBB News: Aurora Wins MPL PH Season 18 | Tradivex',
    description: 'Mobile Legends: Bang Bang news: Aurora Gaming PH wins MPL Philippines Season 18, with Team Falcons joining the M8 path.',
    heading: 'Mobile Legends: Bang Bang News: MPL Philippines Results',
    intro: 'MOONTON reports Aurora Gaming PH defeated Team Falcons 4–2 to win MPL Philippines Season 18. Both finalists advance to M8 in Istanbul in January 2027.',
    updateHeading: 'Aurora Gaming PH wins MPL Philippines Season 18', updateDate: '2 November 2026',
    update: [
      'MOONTON’s 28 October report says Aurora Gaming PH defeated Team Falcons 4–2 in the MPL Philippines Season 18 Grand Final at PhilSports Arena in Pasig City.',
      'Aurora Gaming PH and Team Falcons will both represent the Philippines at the M8 World Championship in Istanbul in January 2027.',
      'MPL Philippines is one regional league. Other MPL regions have separate schedules, results and qualification paths.'
    ],
    detailSections: [{"title":"MPL Philippines Season 18 result","description":"MOONTON confirms the Grand Final result and the Philippine teams advancing to M8.","columns":["Item","Confirmed detail"],"rows":[["Champion","Aurora Gaming PH"],["Grand Final","Aurora Gaming PH defeated Team Falcons 4–2"],["Venue","PhilSports Arena, Pasig City"],["Next event","M8 World Championship, Istanbul, January 2027"],["Other MPL regions","Separate schedules and standings"]],"sourceUrl":"https://en.moonton.com/news/391.html"}],
    playerFocusHeading: 'Anniversary missions and regional season play',
    playerFocus: [
      'The 10th-anniversary campaign can include limited-time login, mission and local event rewards. Verify each reward and claim deadline in the Events tab; the global announcement does not guarantee every offer is available in every server.',
      'MPL PH Season 18 is a regional league, not the global M Series itself. Check the official regional schedule for playoff seeding, ticketing and team qualification updates.',
    ],
    competitionHeading: 'MPL playoffs and path to M8',
    competition: ['MPL Philippines S18 playoffs: 21–25 Oct at PhilSports Arena, Pasig City.', 'M8 World Championship is scheduled for Istanbul in January 2027; national/regional circuits have separate qualification conditions.'],
    sources: [
      { name: 'MOONTON — Aurora Gaming PH wins MPL Philippines Season 18', url: 'https://en.moonton.com/news/391.html' },
      { name: 'MOONTON — MLBB official news', url: 'https://en.moonton.com/news/index.html' },
    ],
    faqs: [
      { question: 'Who won MLBB at the 2026 Asian Games?', answer: 'MOONTON reports that Myanmar defeated Indonesia 4–0 in the Grand Final and claimed the inaugural Asian Games MLBB gold on 1 October.' },
      { question: 'Who won MPL Philippines Season 18?', answer: 'MOONTON reports Aurora Gaming PH won 4–2 against Team Falcons in the Grand Final.' },
    ],
  },
  {
    gameId: 'honor_of_kings', title: 'Honor of Kings News: Season 16 Patch & October Esports | Tradivex',
    description: 'Honor of Kings October 2026 guide: Season 16 Flow As One patch, iOS minimum-version notice, anti-cheat update and official esports events.',
    heading: 'Honor of Kings News: Season 16 and Global Esports',
    intro: 'Honor of Kings entered Season 16: Flow As One with a September patch and published an iOS minimum-version notice. Its esports calendar has regional and global events; the current official page should be used for event stages and regional qualifiers.',
    updateHeading: 'Season 16 Flow As One patch and device compatibility notice', updateDate: '2 November 2026',
    update: [
      'The official Honor of Kings site lists Season 16: Flow As One patch notes dated 22 September, an anti-cheat measures update and a minimum iOS system version adjustment dated 17 September. Players on older devices should confirm compatibility before updating, especially if they rely on an older operating system.',
      'The official esports hub separates global events, regional pro leagues and grassroots competitions. Event windows and team counts vary by region, so a single headline date should not be treated as a universal HoK schedule.',
      "The Asian Games esports competition window closed on 2 October. Season 16: Flow As One is a separate live-game season; use Honor of Kings’ official esports calendar for future event announcements and regional schedules."
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
    updateHeading: 'Brawl Stars confirms its BSC 2027 qualification path', updateDate: '2 November 2026',
    update: [
      'Supercell’s 1 October esports announcement outlines the road to Brawl Stars Championship 2027: four regions, six direct invitations per region based on 2026 results, and two more places per region decided through the BSC Invitational. Supercell’s current timeline lists team invitations on 23 November, roster responses by 20 December, invitation processing on 21–23 December, and the Invitational on 16–17 January 2027; dates may change.',
      'The 19 September Brawl Stars x Duolingo event ran through 30 September. Its community tasks and reward window are over by this update date; check the in-game news panel for the currently active season event rather than expecting expired collaboration rewards.',
      "Supercell schedules the 2026 World Finals for 20–22 November in Tokyo with 12 teams and a US$1 million prize pool. Its event hub is the source for match title and broadcast-time updates."
    ],
    detailSections: [{"title":"Brawl Stars Championship 2026 — World Finals","description":"Supercell lists the World Finals for 20–22 November in Tokyo and has published the event format.","columns":["Area","Confirmed detail"],"rows":[["Dates","20–22 November 2026"],["Venue","Tokyo, Japan"],["Teams","12"],["Prize pool","US$1,000,000"],["2027 qualification pathway","Four regions; direct invitations and BSC Invitational places"]],"sourceUrl":"https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/"},{"title":"Brawl Stars Championship 2027 qualification path","description":"Supercell’s 1 October esports announcement sets the pathway timeline.","columns":["Milestone","Published date"],"rows":[["Team invitations","23 November 2026"],["Roster responses","By 20 December 2026"],["Invitation processing","21–23 December 2026"],["BSC Invitational","16–17 January 2027"]],"sourceUrl":"https://event.supercell.com/brawlstars/en/"}],
    playerFocusHeading: 'Brawl Pass, balance and ranked preparation',
    playerFocus: [
      'The Brawl Pass changes by season. Confirm the active pass, reward claims and season timer in the client; the September release note includes more than one themed season and their cosmetics.',
      'Shade’s Super charge and Gadget values, Gus cooldown/healing and El Primo’s Asteroid Belt were adjusted in the 16 September maintenance. Recheck builds and map picks against the latest client balance.',
    ],
    competitionHeading: 'Brawl Stars World Finals 2026',
    competition: ["Brawl Stars World Finals: 20–22 November in Tokyo, 12 teams, US$1 million prize pool.","BSC 2027 qualification milestones begin with team invitations on 23 November; consult Supercell’s event page for updates."],
    sources: [
      { name: 'Supercell — Road to Brawl Stars Championship 2027', url: 'https://supercell.com/en/games/brawlstars/blog/esports/your-path-to-bsc-2027/' },
      { name: 'Supercell — Brawl Stars x Duolingo event', url: 'https://supercell.com/en/games/brawlstars/blog/community/brawl-stars-x-duolingo/' },
      { name: 'Brawl Stars Esports — World Finals format', url: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/' },
      { name: 'Brawl Stars Championship live event hub', url: 'https://event.supercell.com/brawlstars/en/' },
    ],
    faqs: [{"question":"When are Brawl Stars World Finals 2026?","answer":"Supercell lists 20–22 November in Tokyo, with 12 teams and a US$1 million prize pool."},{"question":"What is the 2027 BSC qualification path?","answer":"Supercell announced direct regional invitations and BSC Invitational places, with team invitations scheduled for 23 November and the Invitational for 16–17 January 2027."}],
  },
  {
    gameId: 'clash_of_clans', title: 'Clash of Clans News: November Events and Town Hall 19 | Tradivex',
    description: 'Clash of Clans November 2026 events: Hammer Jam, Clan War League, new season content and Town Hall 19 news.',
    heading: 'Clash of Clans News: November Events and Town Hall 19',
    intro: 'Supercell’s November schedule begins with Hammer Jam and a new Gold Pass. The November event calendar lists Clan War League, medal events and Town Hall 19 arriving mid-month.',
    updateHeading: 'November season starts with Hammer Jam and Town Hall 19 ahead', updateDate: '2 November 2026',
    update: [
      'Supercell’s 1 November Clash of Titans announcement lists November Gold Pass content and the Hammer Jam event running 1–15 November, with upgrade timers and costs reduced by 50%.',
      'The November schedule includes Clan War League from 1–10 November, Titan Foundry and Hero skin releases through the month, and a Super Yeti Troop Spotlight event from 10–16 November.',
      'Supercell says Town Hall 19 is coming mid-month. October’s Cosmic Curse, Portal Panic Medal Event, and October Clan Games have ended; their dates and rewards should be treated as historical.'
    ],
    detailSections: [{"title":"Clash of Clans — November 2026 event calendar","description":"Supercell’s 1 November Clash of Titans announcement lists these scheduled November events. Check the in-game calendar for live event timers and eligibility.","columns":["Event / feature","Official schedule"],"rows":[["November Gold Pass","1–30 November"],["Hammer Jam","1–15 November; 50% off upgrade timers and costs, 2x collector capacity and production"],["Clan War League","1–10 November"],["Troop Spotlight: Super Yeti","10–16 November"],["Town Hall 19","Supercell says it lands mid-month"],["November Clan Games","22–28 November"]],"sourceUrl":"https://supercell.com/en/games/clashofclans/blog/news/clash-of-titans-is-hot-off-the-press/"},{"title":"Clash of Clans — rewards and competitive standings status","description":"November rewards and seasonal activities are in-game; clan standings remain specific to each Clan War League group.","columns":["Item","Official detail"],"rows":[["November Gold Pass","Grand Titan (Grand Warden) joins the pass"],["Hammer Jam","1–15 November"],["Clan War League","1–10 November"],["Town Hall 19","Announced for mid-November"],["Prize pool","Not stated in the November season announcement"],["Points / clan standings","In-game Clan War League leaderboard for each group"]],"sourceUrl":"https://supercell.com/en/games/clashofclans/blog/news/clash-of-titans-is-hot-off-the-press/"}],
    playerFocusHeading: 'Gold Pass value, Town Hall and upgrade timing',
    playerFocus: ["Hammer Jam is scheduled for 1–15 November with 50% lower upgrade costs and timers and a 2x boost to collector capacity and production. Check the in-game event panel for exact eligibility.","Gold Pass rewards and seasonal tasks reset monthly. Review the November in-game pass and claim rewards before their displayed deadlines."],
    competitionHeading: 'Clash of Clans World Championship 2026',
    competition: ["The Clash of Clans World Championship circuit and in-game Clan War League are separate competitions. Use Supercell’s official esports hub for current qualifiers, results and qualification rules.","Clan War League is scheduled for 1–10 November; standings are group-specific and visible in-game."],
    sources: [
      { name: 'Supercell — Home Village screen feedback update (15 October)', url: 'https://supercell.com/en/games/clashofclans/blog/news/a-word-on-the-new-home-village-screen/' },
      { name: 'Supercell Support — Clash of Clans September 2026 update', url: 'https://support.supercell.com/clash-of-clans/en/articles/whats-new-september-2026.html' },
      { name: 'Supercell — Cosmic Curse: Portal Panic October season', url: 'https://supercell.com/en/games/clashofclans/blog/news/cosmic-curse-portal-panic-teleports-in/' },
      { name: 'Supercell — Gold Pass changes', url: 'https://supercell.com/en/games/clashofclans/blog/news/big-changes-are-coming-to-gold-pass/' },
      { name: 'Clash of Clans World Championship — how to compete', url: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete' },
    ],
    faqs: [{"question":"What is the Clash of Clans November 2026 event schedule?","answer":"Supercell’s 1 November announcement lists Hammer Jam for 1–15 November, Clan War League for 1–10 November, the Super Yeti Troop Spotlight for 10–16 November, and Clan Games for 22–28 November."},{"question":"When is Town Hall 19 coming to Clash of Clans?","answer":"Supercell says Town Hall 19 lands mid-month in its 1 November Clash of Titans announcement; consult the game for the exact rollout time."}],
  },
  {
    gameId: 'clash_royale', title: 'Clash Royale News: November King vs. King Season | Tradivex',
    description: 'Clash Royale November season: Giant and Mirror Evolutions, Daily Puzzles, new competitive features and CRL World Finals.',
    heading: 'Clash Royale News: King vs. King November Season',
    intro: 'Supercell’s King vs. King season announcement is dated 27 October. The November season adds Giant and Mirror Evolutions, Daily Puzzles, and the CRL World Finals from 6–8 November. Merge Tactics remains a separate mode.',
    updateHeading: 'King vs. King season brings CRL World Finals on November 6–8', updateDate: '2 November 2026',
    update: [
      'Supercell’s 27 October announcement introduces the November King vs. King season, including Giant and Mirror Evolutions, a Win Condition Mastery event, Daily Puzzles and the Royal Market.',
      'Daily Puzzles are scheduled for 2–8 November. Clash Royale League World Finals run 6–8 November in Shanghai with 16 players in a double-elimination bracket; matches start at 03:00 UTC each day.',
      'The prior Shocktober season and October event dates have ended. Merge Tactics Season 11 is a separate mode with its own changes and schedule.'
    ],
    detailSections: [{"title":"Clash Royale — Merge Tactics Season 11 tracker","description":"Merge Tactics has its own pool, Supers and balance. Standard Clash Royale card balance and Global Tournaments must be tracked separately.","columns":["Area","Current verified detail"],"rows":[["Season 11 window","1 September–1 December"],["October change date","1 October"],["October content","Boss Supers, returning Boss trait, October modifiers and troop pool"],["Balance","October update buffs several 2- and 3-Elixir troops"],["Ranked leaderboard","Use in-game mode leaderboard; it is not the standard Clash Royale ladder"],["Team / player table","Merge Tactics is an individual mode; no team roster table applies"]],"sourceUrl":"https://supercell.com/en/games/clashroyale/blog/release-notes/merge-tactics-season-11/"},{"title":"Clash Royale — rewards and competitive standings status","description":"Merge Tactics rewards and leaderboards are mode-specific. Supercell’s Season 11 announcement does not turn it into a team esports league.","columns":["Item","Official detail"],"rows":[["Season window","1 September–1 December"],["Ranked reward track","Starsteel Road reaches Diamond at 4,000 Starsteel"],["Ruler rewards","Four Rulers can be collected on Starsteel Road"],["New equipment","Five named items in Season 11"],["Prize pool","No current prize pool published in the cited Season 11 announcement"],["Team/player table","Merge Tactics is an individual mode; use its in-game leaderboard"],["Pass rewards","Check current Pass Royale in-game; rewards change by season"]],"sourceUrl":"https://supercell.com/en/games/clashroyale/blog/release-notes/merge-tactics-season-11/"}],
    playerFocusHeading: 'Pass Royale, balance and mode-specific rewards',
    playerFocus: [
      'Pass Royale now offers reward choices and guaranteed seasonal Hero Fragments in the free track, per Supercell’s 2026 progression update. Compare the current in-game reward options instead of following old advice that assumes the former pass layout.',
      'Clash Royale and Merge Tactics have distinct season content. Check which mode a balance or leaderboard post applies to before using it for deck or placement decisions.',
    ],
    competitionHeading: "Clash Royale League World Finals",
    competition: ["CRL World Finals are scheduled for 6–8 November 2026 in Shanghai, with 16 players in a double-elimination bracket. Follow the official CRL event page for matchups and results.","The 2026 Last Chance Qualifier ran 5–6 September; Supercell’s event coverage lists Woo as the winner. In-game Global Tournaments are separate competitions."],
    sources: [
      { name: 'Supercell — King vs. King November season', url: 'https://supercell.com/en/games/clashroyale/blog/release-notes/new-season-king-vs-king/' },
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
    gameId: 'genshin', title: 'Genshin Impact News: Version 7.2 and Snezhnaya | Tradivex',
    description: 'Genshin Impact Version 7.2 launches November 4 with new Snezhnaya areas, story content and updated event banners.',
    heading: 'Genshin Impact News: Version 7.2 and New Areas',
    intro: 'HoYoverse’s latest official notices cover Version 7.2, scheduled for November 4, 2026. The update opens Novokitezhgrad and Wingspan Peak; check the game client for server-specific event and banner timers.',
    updateHeading: 'Version 7.2 arrives November 4 with two new Snezhnaya areas', updateDate: '2 November 2026',
    update: [
      'HoYoverse’s November 1 notice says Version 7.2 opens the new Snezhnaya areas Novokitezhgrad and Wingspan Peak. The Version 7.2 update is scheduled for November 4.',
      'HoYoverse’s official news feed also lists the Version 7.2 special program and character notices. Banner availability and event windows use server time; check the in-game Wish and Events screens for your region.',
      'Version 7.1 is the previous version and should not be presented as the current update after the 7.2 launch. Genshin Impact does not have an ongoing publisher-run global esports league.'
    ],
    detailSections: [{"title":"Genshin Impact — Version 7.2 player tracker","description":"HoYoverse has scheduled Version 7.2 for 4 November 2026. Event, banner and reward timers are server-specific; confirm them in the game client.","columns":["Area","Verified detail"],"rows":[["Current version on 2 November","Version 7.1; Version 7.2 scheduled for 4 November"],["Announced new areas","Novokitezhgrad and Wingspan Peak"],["Event timing","Uses server time"],["Banners / rewards","Confirm directly in-game before spending Primogems"],["Official calendar","HoYoverse news and in-game Events screen"]],"sourceUrl":"https://genshin.hoyoverse.com/en/news/detail/167140"},{"title":"Genshin Impact — rewards and competition status","description":"Version 7.2 is scheduled for 4 November. HoYoverse’s current notices announce new content; account-specific rewards and banner timers are shown in-game.","columns":["Item","Official status"],"rows":[["Version 7.2 release","4 November 2026"],["New areas","Novokitezhgrad and Wingspan Peak"],["Reward source","Official event calendar and in-game Events screen"],["Banner / event timing","Uses the player’s server time"],["Esports prize pool","No ongoing publisher-run global circuit announced"]],"sourceUrl":"https://genshin.hoyoverse.com/en/news"}],
    playerFocusHeading: 'Primogems, event weapon and banner timing',
    playerFocus: ["Version 7.2 is scheduled for 4 November. Check your server’s maintenance notice and in-game Events/Wish screens for exact launch, banner, reward and event countdowns.","Character banners and event end times can vary by server time zone. Use the in-game Wish and Events screens for the exact local countdown."],
    competitionHeading: 'Competitive status',
    competition: ['No official publisher-run Genshin Impact esports tournament schedule was found in HoYoverse’s official news pages checked.', 'HoYoverse creator contests and community events are not represented as pro esports tournaments.'],
    sources: [{"name":"HoYoverse — Version 7.2 new areas announcement (1 November)","url":"https://genshin.hoyoverse.com/en/news/detail/167140"},{"name":"HoYoverse — Version 7.2 release and feature notice","url":"https://genshin.hoyoverse.com/en/news/detail/167098"},{"name":"HoYoverse — Genshin Impact official news","url":"https://genshin.hoyoverse.com/en/news"}],
    faqs: [{"question":"When does Genshin Impact Version 7.2 release?","answer":"HoYoverse scheduled Version 7.2 for 4 November 2026. Check the in-game notice for maintenance timing in your server region."},{"question":"Which new areas are announced for Version 7.2?","answer":"HoYoverse’s 1 November notice names Novokitezhgrad and Wingspan Peak."},{"question":"Does Genshin Impact have an official esports league?","answer":"HoYoverse has no ongoing publisher-run global esports league listed in the official news reviewed."}],
  },
  {
    gameId: 'stumble_guys', title: 'Stumble Guys News: v0.103 Cursed Fair, Ranked Season 27 & Events | Tradivex',
    description: 'Stumble Guys October 2026 player guide: v0.103 Cursed Fair update, Ranked Season 27, Clubs Season 16, Stumbleween and upcoming Avatar items.',
    heading: 'Stumble Guys News: Cursed Fair and Ranked Seasons',
    intro: 'The official Stumble Guys news feed now lists version 0.103.0, the Cursed Fair season, after the September 0.102.0 Live, Laugh, Lava Land update. Ranked Season 26 ended on 1 October, while Clubs Season 15 continues through 15 October.',
    updateHeading: 'Stumble Guys v0.103.0 adds Ranked Season 27 and October events', updateDate: '2 November 2026',
    update: ["Scopely’s 0.103.0 Cursed Fair update adds the Pollo Stick ability. The Avatar: The Last Airbender shop items ran 15–22 October and that offer window has passed.","Ranked Season 27 is scheduled through 5 November and Clubs Season 16 through 19 November. Stumbleween’s community challenge ran through 2 November. These timers are separate; check the client for exact reward claim status.","The game page update is reviewed 2 November 2026. This is a live game-season update, not a publisher-run professional esports tournament calendar."],
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
    description: "Among Us v19.0.0 added the Influencer ghost role in September. Innersloth’s October Impostor Month event has ended; check the game for current tasks and updates.",
    heading: "Among Us News: Influencer Role and Impostor Month Recap",
    intro: "Innersloth shipped v19.0.0 with the Influencer ghost role, then ran Impostor Month during October. The October event window has passed; this page separates its historical event announcement from current in-game tasks.",
    updateHeading: "October Impostor Month has ended", updateDate: '2 November 2026',
    update: ["Innersloth announced Impostor Month on 1 October as a month-long celebration. October has ended, so its limited-time event copy should be treated as historical rather than currently live.","Among Us v19.0.0 added the Influencer, a new Ghost Crewmate role. Consult Innersloth’s dev log for role mechanics and the game client for the current build and live tasks.","Innersloth’s news feed also posted about Among Us Story on 19 October; that is a separate single-player project in the Among Us universe, not an Among Us live-game patch."],
    detailSections: [{"title":"Among Us — update and event tracker","description":"Among Us is a social-deduction game with platform rollouts and community events, not a permanent professional league.","columns":["Area","Current verified detail"],"rows":[["Latest update","v19.0.0, released 29 September"],["New role","Influencer ghost Crewmate role"],["Current event","Impostor Month announced 30 September"],["Reward timing","Check the live game/news panel for platform availability"],["Team standings","No official global esports points table"],["Player rosters","Only apply to separate community-organized tournaments"]],"sourceUrl":"https://www.innersloth.com/news/"},{"title":"Among Us — rewards and competition status","description":"Among Us content is delivered as a game update and limited-time events. It does not have a permanent publisher-run professional league.","columns":["Item","Official status"],"rows":[["Latest update","v19.0.0"],["Current event","Impostor Month"],["Reward source","Live game/news panel; timing can vary by platform rollout"],["Global prize pool","Not announced"],["Teams / player points","No official global esports leaderboard"],["Community tournaments","Rosters, rules and prize money belong to their own organizer"]],"sourceUrl":"https://www.innersloth.com/news/"}],
    playerFocusHeading: 'Role settings, lobby compatibility and event rewards',
    playerFocus: ["Check the game client for current tasks, reward claim periods and supported game version. The October Impostor Month event has passed.","Before hosting a private lobby, make sure all players use a compatible client version and review the role settings."],
    competitionHeading: 'Community play',
    competition: ['Innersloth has not published a current official Among Us esports tournament calendar.', 'Among Us is primarily social deduction and creator/community play; individual creator tournaments have their own lobby rules and prizes.'],
    sources: [
      { name: 'Innersloth — Among Us official news and dev logs', url: 'https://www.innersloth.com/news/' },
      { name: 'Among Us official site', url: 'https://www.innersloth.com/games/among-us/' },
    ],
    faqs: [{"question":"What new role came to Among Us in v19.0.0?","answer":"Innersloth says v19.0.0 adds the Influencer, a new Ghost Crewmate role. Review the official dev log and lobby settings for the exact ability rules."},{"question":"Is Impostor Month still live?","answer":"No. Innersloth announced Impostor Month as an October event; the event month has ended."}],
  },
  {
    gameId: 'gta_online', title: "GTA Online News: November Weekly Challenge and Halloween Ends Soon | Tradivex",
    description: 'GTA Online Halloween content runs through November 4; current weekly challenges and rewards from Rockstar.',
    heading: "GTA Online News: November Weekly Challenge and Halloween",
    intro: "Rockstar’s October 29–November 4 weekly challenge is active, and Halloween content is scheduled through November 4. GTA Online changes weekly, so exact rewards and GTA+ offers are tied to their own claim windows.",
    updateHeading: 'October 29–November 4 weekly challenge is live', updateDate: '2 November 2026',
    update: [
      'Rockstar’s current weekly challenge runs October 29–November 4. Complete 10 waves in a Survival without dying to earn the Slasher Clown Outfit and GTA$250,000.',
      'Halloween content is scheduled through November 4. Rockstar’s October 27 title-update notes also include a PC Enhanced launch-crash fix and details about Halloween activities and Ghosts Exposed.',
      'The October 15–21 race challenge has ended. The current weekly reward and GTA+ benefits are separate offers with their own claim windows.'
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
    faqs: [{"question":"What is the current GTA Online weekly challenge?","answer":"Rockstar’s October 29–November 4 challenge rewards the Slasher Clown Outfit and GTA$250,000 for completing 10 Survival waves without dying."},{"question":"Are GTA Online weekly races esports tournaments?","answer":"No. Weekly races and adversary modes are in-game activities; Rockstar’s official Newswire does not list a current publisher-run GTA Online esports championship."}],
  },
  {
    gameId: 'marvel_rivals',
    title: 'Marvel Rivals News: Season 10.5 Halloween Event and Patch | Tradivex',
    description: 'Marvel Rivals Season 10.5 game patch, Halloween event, cosmetics, bug fixes and official NetEase source links.',
    heading: 'Marvel Rivals News: Season 10.5 and Halloween Update',
    intro: 'Current Marvel Rivals game patch and in-game event details from NetEase. Competitive tournament schedules and results are listed separately.',
    updateHeading: 'Version 20261029 adds Night of Illusions through December 31', updateDate: '2 November 2026',
    update: [
      'NetEase published Version 20261029 Patch Notes for the October 29 update. New content includes the Night of Illusions puzzle event, scheduled through December 31, 2026 at 09:00 UTC.',
      'The patch also adds shop bundles and fixes for Gorr, Rogue, Black Cat, Invisible Woman, Times Square, the Store navigation bar, and Blood Hunt mode.',
      'The previous Version 20261015 summary is now superseded. Check the in-game event panel for reward availability and account-specific progress.'
    ],
    detailSections: [
      { title: 'Marvel Rivals Ignite Stage 2 — schedule and format', description: 'NetEase’s official event guide confirms the dates, regional format and qualification places.', columns: ['Stage / region', 'Officially confirmed detail'], rows: [['Group Stage', '17 September–4 October 2026'], ['Playoffs', '8–18 October 2026'], ['Pacific regional final', '11 October; Asia and Oceania combined for playoffs'], ['Americas and EMEA playoffs', 'Begin 15 October; regional finals 18 October'], ['China playoffs', 'Begin 16 October; regional final 18 October'], ['Playoff format', 'Regional double elimination; BO5 matches, BO7 regional finals'], ['Stage 2 prize pool', 'US$650,000'], ['Grand Finals qualification', '12 teams total: AMER 4, EMEA 4, PAC 2, China 2'], ['Ignite Grand Finals', 'Late November; exact date and venue not yet announced']], sourceUrl: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html' },
      { title: 'Marvel Rivals Season 10 — patch and player notes', description: 'Season 10 is live; consult the official patch notes for the full hero, map and gameplay change list.', columns: ['Topic', 'Confirmed detail'], rows: [['Season 10 launch', '11 September 2026'], ['Season 10 tournament build', 'Ignite Stage 2 uses Season 10'], ['Map pool', 'Thebes added for Stage 2; a new Domination map added for playoffs'], ['Season rank reward', 'Gorr the God Butcher — Gods’ Graveyard for Gold tier'], ['Official match schedules', 'Use the in-game Esports system for current matches and teams'], ['Last checked', '16 October 2026']], sourceUrl: 'https://www.marvelrivals.com/m/gameupdate/20261014/41548_1316588.html' },
    ],
    playerFocusHeading: 'Marvel Rivals Season 10 and competitive play',
    playerFocus: ['Season 10 launched 11 September. Check the current in-game event and rank reward panels for account-specific claim windows.', 'The Ignite guide says official match schedules, participating teams and player information are available in the in-game Esports system. Subscribe there for match reminders.'],
    competitionHeading: 'Marvel Rivals esports schedule and tournaments',
    competition: ["Ignite Stage 2 playoffs ran 8–18 October and are complete. NetEase’s circuit page lists the Grand Finals for late November; consult its live esports page for the currently published schedule, teams and results.","Marvel Rivals Championship (MRC) is a separate in-game competition that awards Champion Points toward the annual Ignite pathway."],
    sources: [
      { name: 'Marvel Rivals Ignite — Stage 2 schedule, format and prize pool', url: 'https://www.marvelrivalsesports.com/20260908/42828_1313342.html' },
      { name: 'Marvel Rivals — Version 20261015 patch notes', url: 'https://www.marvelrivals.com/m/gameupdate/20261014/41548_1316588.html' },
      { name: 'Marvel Rivals Ignite — official esports news', url: 'https://www.marvelrivalsesports.com/news/official/index.html' },
    ],
    faqs: [{"question":"When were the Marvel Rivals Ignite 2026 Stage 2 playoffs?","answer":"NetEase scheduled the Stage 2 playoffs for 8–18 October 2026; that window has ended."},{"question":"How many teams qualify for the Marvel Rivals Ignite Grand Finals?","answer":"Twelve teams qualify: four from Americas, four from EMEA, two from Pacific and two from China."},{"question":"When are the Marvel Rivals Ignite Grand Finals?","answer":"NetEase’s circuit material places the Grand Finals in late November. Check the official esports page for the latest schedule and venue announcement."}],
  },
  {
    gameId: 'arena_of_valor',
    title: 'Arena of Valor News: AoV Esports, AIC 2026 & 10Fest Winter Finals | Tradivex',
    description: 'Arena of Valor (AoV) news and esports schedule: Garena 10Fest Winter Grand Final in Hanoi on 7 November, AIC 2026 in Thailand and official patch sources.',
    heading: 'Arena of Valor News and Esports Schedule',
    intro: 'Follow Arena of Valor, also known regionally as Liên Quân Mobile and RoV, with separate official tournament details for its regional leagues and international AIC championship. Arena of Valor is covered separately from Honor of Kings.',
    updateHeading: '10Fest Winter Grand Final set for Hanoi on 7 November', updateDate: '2 November 2026',
    update: ["Garena’s English Arena of Valor patch hub lists 18 September 2026 as the latest English patch entry found in the linked archive. Regional clients may publish localized notices.","Garena schedules the Đấu Trường Danh Vọng Winter 2026 Grand Final for 7 November at My Dinh National Stadium in Hanoi. The announcement does not name finalists or a match start time.","Garena also confirms AIC 2026 as a year-end Arena of Valor championship in Thailand. The linked announcement does not provide exact dates, teams, format, prize pool or match schedule."],
    detailSections: [
      { title: 'Arena of Valor esports — confirmed 2026 events', description: 'Garena’s official sources confirm the November Vietnam final and a year-end international championship in Thailand.', columns: ['Event', 'Confirmed detail'], rows: [['Đấu Trường Danh Vọng Winter Grand Final', '7 November 2026 at My Dinh National Stadium, Hanoi'], ['10Fest day 2', '8 November 2026 is the AoV tenth-anniversary music festival, not an esports match day'], ['Winter final matchup and start time', 'Not stated in the official event announcement'], ['AIC 2026', 'Year-end 2026 in Thailand; exact dates and format pending'], ['AIC team list / prize pool', 'Not yet published in the cited Garena announcement'], ['Official AoV patch hub', 'Latest English patch entry visible: 18 September 2026'], ['Last checked', '16 October 2026']], sourceUrl: 'https://lienquan.garena.vn/tag/dau-truong-danh-vong/' },
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
    updateHeading: 'TFT esports: November Superbrawl and December Vegas Open confirmed', updateDate: '2 November 2026',
    update: ["Riot’s Enchanted Wilds Pro Circuit Blossom Cup took place 2–4 October. Tactician’s Superbrawl is the next announced open-format event: a regional 4v4 competition scheduled for 6–8 November.","Tactician’s Superbrawl is open across AMER, EMEA and APAC. Riot specifies 96 teams per region, single-elimination best-of-three matches and a 2 November ladder snapshot.","The TFT Vegas Open is a 1,024-player LAN in Las Vegas from 11–13 December. Riot lists a US$311,300 prize pool, with US$100,000 for the champion; the top 128 receive a share. The tournament is planned for Set 19."],
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










