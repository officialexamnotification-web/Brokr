export interface TeamProfile {
  id: string;
  name: string;
  gameId: string;
  gameName: string;
  region: string;
  logo?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
    website?: string;
  };
  achievements?: string[];
  foundedYear?: number;
  description: string;
  updatedAt: string;
  sourceUrl: string;
  sourceName: string;
}

export const TEAMS: TeamProfile[] = [
  {
    id: 'natus-vincere',
    name: 'Natus Vincere',
    gameId: 'cs2',
    gameName: 'Counter-Strike 2',
    region: 'CIS/Europe',
    logo: '/teams/natus-vincere.png',
    social: {
      twitter: '@navi',
      instagram: 'navi.gg',
      youtube: 'NAVI',
      website: 'https://navi.gg'
    },
    achievements: [
      'IEM Katowice 2026 Winner',
      'PGL Major Copenhagen 2026 Champion',
      'Multiple ESL Pro League titles',
      'BLAST Premier Spring Finals 2024 Winner'
    ],
    foundedYear: 2009,
    description: 'Natus Vincere (Latin for "Born to Win") is a Ukrainian esports organization. The team is one of the most successful Counter-Strike teams in history, with multiple Major championships and consistent top-tier performances.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://liquipedia.net/counterstrike/Natus_Vincere',
    sourceName: 'Liquipedia'
  },
  {
    id: 'team-spirit',
    name: 'Team Spirit',
    gameId: 'cs2',
    gameName: 'Counter-Strike 2',
    region: 'CIS',
    logo: '/teams/team-spirit.png',
    social: {
      twitter: '@TeamSpirit',
      instagram: 'teamspirit.gg',
      youtube: 'TeamSpiritOfficial',
      website: 'https://teamspirit.gg'
    },
    achievements: [
      'IEM Katowice 2026 Runner-up',
      'Multiple regional championships',
      'Strong playoff presence in 2026 season'
    ],
    foundedYear: 2015,
    description: 'Team Spirit is a Russian esports organization known for their competitive Counter-Strike roster. The team has established themselves as a consistent contender in major tournaments.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://liquipedia.net/counterstrike/Team_Spirit',
    sourceName: 'Liquipedia'
  },
  {
    id: 'vitality',
    name: 'Team Vitality',
    gameId: 'cs2',
    gameName: 'Counter-Strike 2',
    region: 'Europe',
    logo: '/teams/vitality.png',
    social: {
      twitter: '@TeamVitality',
      instagram: 'teamvitality',
      youtube: 'TeamVitality',
      website: 'https://teamvitality.com'
    },
    achievements: [
      'IEM Katowice 2026 Semi-finalist',
      'BLAST Premier Fall Finals 2023 Winner',
      'ESL Pro League Season 16 Champion'
    ],
    foundedYear: 2018,
    description: 'Team Vitality is a French esports organization competing in Counter-Strike. The team has built a reputation for tactical innovation and strong individual performances.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://liquipedia.net/counterstrike/Team_Vitality',
    sourceName: 'Liquipedia'
  },
  {
    id: 'faze-clan',
    name: 'FaZe Clan',
    gameId: 'cs2',
    gameName: 'Counter-Strike 2',
    region: 'International',
    logo: '/teams/faze-clan.png',
    social: {
      twitter: '@FaZeClan',
      instagram: 'fazeclan',
      youtube: 'FaZeClan',
      website: 'https://fazeclan.com'
    },
    achievements: [
      'IEM Katowice 2026 Quarter-finalist',
      'Intel Grand Slam 2022 Winner',
      'ESL Pro League Season 10 Champion'
    ],
    foundedYear: 2010,
    description: 'FaZe Clan is an American esports organization with roots in the Call of Duty scene. Their Counter-Strike roster consists of top international players known for their aggressive playstyle.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://liquipedia.net/counterstrike/FaZe_Clan',
    sourceName: 'Liquipedia'
  },
  {
    id: 'loud',
    name: 'LOUD',
    gameId: 'valorant',
    gameName: 'VALORANT',
    region: 'Brazil',
    logo: '/teams/loud.png',
    social: {
      twitter: '@LOUDgg',
      instagram: 'loud.gg',
      youtube: 'LOUD',
      website: 'https://loud.gg'
    },
    achievements: [
      'VALORANT Champions Shanghai 2026 Winner',
      'VCT Americas 2023 Champion',
      'Multiple Brazilian league titles'
    ],
    foundedYear: 2019,
    description: 'LOUD is a Brazilian esports organization that quickly rose to prominence in VALORANT. Known for their energetic playstyle and passionate fanbase, they have become one of the top teams in the VCT circuit.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://valorantesports.com/en-us/teams/loud',
    sourceName: 'VALORANT Esports'
  },
  {
    id: 'team-vitality-valorant',
    name: 'Team Vitality',
    gameId: 'valorant',
    gameName: 'VALORANT',
    region: 'Europe',
    logo: '/teams/vitality-valorant.png',
    social: {
      twitter: '@TeamVitality',
      instagram: 'teamvitality',
      website: 'https://teamvitality.com'
    },
    achievements: [
      'VALORANT Champions Shanghai 2026 Runner-up',
      'VCT EMEA 2023 Champion',
      'Strong European presence'
    ],
    foundedYear: 2018,
    description: 'Team Vitality extends their competitive excellence to VALORANT, building a roster of talented European players. Their tactical approach mirrors their success in other esports titles.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://valorantesports.com/en-us/teams/team-vitality',
    sourceName: 'VALORANT Esports'
  },
  {
    id: 'team-yandex',
    name: 'Team Yandex',
    gameId: 'dota2',
    gameName: 'Dota 2',
    region: 'CIS',
    logo: '/teams/team-yandex.png',
    social: {
      twitter: '@TeamYandex',
      website: 'https://yandex.gg'
    },
    achievements: [
      'BLAST Slam VIII 2026 Winner',
      'Multiple ESL One appearances',
      'Strong regional competitor'
    ],
    foundedYear: 2021,
    description: 'Team Yandex is a CIS-based Dota 2 organization sponsored by the Russian tech company. They have established themselves as a competitive force in the regional and international Dota 2 scene.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://liquipedia.net/dota2/Team_Yandex',
    sourceName: 'Liquipedia'
  },
  {
    id: 't1',
    name: 'T1',
    gameId: 'lol',
    gameName: 'League of Legends',
    region: 'Korea',
    logo: '/teams/t1.png',
    social: {
      twitter: '@T1',
      instagram: 't1',
      youtube: 'T1',
      website: 'https://t1.gg'
    },
    achievements: [
      'Worlds 2023 Champion',
      'Multiple LCK championships',
      'MSI 2024 Winner'
    ],
    foundedYear: 2002,
    description: 'T1 (formerly SK Telecom T1) is one of the most legendary esports organizations in history. With multiple World Championships and a roster of superstar players, they continue to dominate the League of Legends scene.',
    updatedAt: '2026-10-22',
    sourceUrl: 'https://lol.fandom.com/wiki/T1',
    sourceName: 'League of Legends Fandom'
  }
];

export function getTeamById(id: string): TeamProfile | undefined {
  return TEAMS.find(team => team.id === id);
}

export function getTeamsByGame(gameId: string): TeamProfile[] {
  return TEAMS.filter(team => team.gameId === gameId);
}

export function getTeamBySlug(slug: string): TeamProfile | undefined {
  return TEAMS.find(team => team.id === slug || team.name.toLowerCase().replace(/\s+/g, '-') === slug);
}
