export type GameNameMode = 'stylish' | 'clean' | 'hybrid';

const CLEAN_GAMERTAG_GAMES = new Set([
  'fortnite',
  'roblox',
  'minecraft',
  'valorant',
  'league',
  'cs2',
  'apex',
  'rocket_league',
  'overwatch',
  'rainbow_six',
  'destiny2',
  'ea_fc',
  'xbox',
  'psn',
  'steam',
  'gta_online',
]);

const STYLISH_MOBILE_GAMES = new Set([
  'bgmi',
  'pubg',
  'freefire',
  'mobile_legends',
  'honor_of_kings',
  'brawl_stars',
  'clash_of_clans',
  'clash_royale',
  'genshin',
  'stumble_guys',
  'among_us',
]);

export function getGameNameMode(gameId: string): GameNameMode {
  if (CLEAN_GAMERTAG_GAMES.has(gameId)) return 'clean';
  if (STYLISH_MOBILE_GAMES.has(gameId)) return 'stylish';
  return 'hybrid';
}

export function isCleanGamertagGame(gameId: string): boolean {
  return getGameNameMode(gameId) === 'clean';
}
