import { GameProfile } from '../types';
import { POPULAR_GAMES } from './games';

export const SITE_NAME = 'Tradivex';
export const SITE_SUFFIX = 'GamingNameHub';
export const SITE_DISPLAY_NAME = 'Tradivex GamingNameHub';
export const SITE_URL = 'https://www.tradivex.com';

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface GameSeoContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  features: string[];
  faqs: SeoFaq[];
}

// Each landing page has a distinct search intent. Keeping this copy game-specific
// prevents all generator routes from becoming near-identical doorway pages.
const GAME_INTENTS: Record<string, string> = {
  bgmi: 'stylish BGMI names, BGMI symbols, clan tags and clean player names',
  pubg: 'PUBG Mobile nicknames, squad tags and copy-ready stylish names',
  freefire: 'Free Fire nicknames, FF name styles and short clan tags',
  valorant: 'Valorant Riot ID ideas, agent-inspired tags and clean handles',
  cod: 'CODM and Warzone gamertags, tactical tags and readable handles',
  cs2: 'CS2 Steam names, team tags and clean competitive aliases',
  fortnite: 'Fortnite display names, duo tags and creator handles',
  apex: 'Apex Legends gamertags, squad tags and legend-inspired handles',
  minecraft: 'Minecraft usernames, server-friendly names and clean aliases',
  roblox: 'Roblox usernames and display names for players and creators',
  league: 'League of Legends Riot IDs, champion-inspired names and ranked handles',
  rocket_league: 'Rocket League gamertags, club tags and team names',
  overwatch: 'Overwatch 2 BattleTag ideas, hero-inspired handles and team names',
  rainbow_six: 'Rainbow Six Siege tactical tags, operator-inspired names and squad handles',
  destiny2: 'Destiny 2 Guardian names, clan tags and science-fiction handles',
  ea_fc: 'EA Sports FC player tags, club names and Ultimate Team identities',
  mobile_legends: 'MLBB nicknames, hero-inspired tags and squad names',
  honor_of_kings: 'Honor of Kings hero names, lane tags and team identities',
  brawl_stars: 'Brawl Stars player names, brawler-inspired tags and club names',
  clash_of_clans: 'Clash of Clans player names, clan names and war-team tags',
  clash_royale: 'Clash Royale player names, deck-inspired tags and clan identities',
  genshin: 'Genshin Impact nicknames, elemental names and traveler-inspired handles',
  stumble_guys: 'Stumble Guys funny nicknames, short tags and tournament handles',
  among_us: 'Among Us funny names, crew tags and impostor-inspired handles',
  xbox: 'Xbox gamertag ideas for multiplayer profiles and social gaming',
  psn: 'PSN Online ID ideas for PlayStation multiplayer profiles',
  steam: 'Steam profile names, aliases and clean gaming identities',
  gta_online: 'GTA Online crew names, Rockstar handles and player identities',
};

export const HOME_SEO: GameSeoContent = {
  slug: '',
  title: 'Game Name Generator for Every Game | Tradivex GamingNameHub',
  description: 'Free game name generator for stylish gamer names, nicknames, gamertags and clan tags for BGMI, PUBG, Free Fire, Valorant, COD, Fortnite, Roblox and Minecraft.',
  h1: 'Game Name Generator for Every Online Game',
  intro: 'Create stylish gamer names, cool nicknames, clean gamertags and clan tags for the game you actually play. Choose a game first so the name style and character guidance match your platform.',
  features: ['Game-specific name ideas', 'Clean and stylish output modes', 'Unicode character counting', 'One-click copy and save'],
  faqs: [
    { question: 'What games can I generate names for?', answer: 'Tradivex GamingNameHub supports popular mobile, PC, console and platform identities including BGMI, PUBG Mobile, Free Fire, Fortnite, Roblox, Minecraft, Valorant, Call of Duty, Steam, Xbox and more.' },
    { question: 'Are all decorative symbols guaranteed to work?', answer: 'No. Symbol support changes by game, platform and client update. Names are labelled conservatively and should be tested in the current rename or profile screen.' },
    { question: 'How do I choose a game-ready name?', answer: 'Select the exact game first, start with a clean readable result, check the character guidance, and test the final name in the current rename or profile screen.' },
  ],
};

const LABELS: Record<string, { noun: string; identity: string; audience: string; pageTitle?: string }> = {
  bgmi: { noun: 'BGMI', pageTitle: 'BGMI Name Generator', identity: 'stylish BGMI nickname', audience: 'BGMI mobile gamers' },
  pubg: { noun: 'PUBG Mobile', pageTitle: 'PUBG Mobile Name Generator', identity: 'stylish PUBG Mobile name', audience: 'PUBG Mobile players' },
  freefire: { noun: 'Free Fire', pageTitle: 'Free Fire Name Generator', identity: 'stylish Free Fire nickname', audience: 'Free Fire players' },
  valorant: { noun: 'Valorant', pageTitle: 'Valorant Name Generator', identity: 'Valorant Riot ID', audience: 'VALORANT players' },
  cod: { noun: 'Call of Duty', pageTitle: 'Call of Duty Name Generator', identity: 'Call of Duty gamertag', audience: 'COD and Warzone players' },
  cs2: { noun: 'CS2', pageTitle: 'CS2 Name Generator', identity: 'CS2 Steam name', audience: 'Counter-Strike players' },
  fortnite: { noun: 'Fortnite', pageTitle: 'Fortnite Name Generator', identity: 'Fortnite display name', audience: 'Fortnite players' },
  apex: { noun: 'Apex Legends', pageTitle: 'Apex Legends Name Generator', identity: 'Apex Legends gamertag', audience: 'Apex players' },
  minecraft: { noun: 'Minecraft', pageTitle: 'Minecraft Username Generator', identity: 'Minecraft username', audience: 'Minecraft players and server communities' },
  roblox: { noun: 'Roblox', pageTitle: 'Roblox Username Generator', identity: 'username or display name', audience: 'Roblox players and creators' },
  league: { noun: 'League of Legends', pageTitle: 'League of Legends Name Generator', identity: 'League of Legends Riot ID', audience: 'League players' },
  rocket_league: { noun: 'Rocket League', pageTitle: 'Rocket League Name Generator', identity: 'Rocket League gamertag', audience: 'Rocket League players' },
  overwatch: { noun: 'Overwatch 2', pageTitle: 'Overwatch 2 Name Generator', identity: 'Overwatch 2 BattleTag idea', audience: 'Overwatch players' },
  rainbow_six: { noun: 'Rainbow Six Siege', pageTitle: 'Rainbow Six Siege Name Generator', identity: 'Rainbow Six Siege gamertag', audience: 'Siege players' },
  destiny2: { noun: 'Destiny 2', pageTitle: 'Destiny 2 Name Generator', identity: 'Destiny 2 Guardian name', audience: 'Guardians' },
  ea_fc: { noun: 'EA Sports FC', pageTitle: 'EA FC Name Generator', identity: 'EA FC player or club name', audience: 'EA FC players' },
  mobile_legends: { noun: 'Mobile Legends', pageTitle: 'Mobile Legends Name Generator', identity: 'Mobile Legends nickname', audience: 'MLBB players' },
  honor_of_kings: { noun: 'Honor of Kings', pageTitle: 'Honor of Kings Name Generator', identity: 'Honor of Kings nickname', audience: 'Honor of Kings players' },
  brawl_stars: { noun: 'Brawl Stars', pageTitle: 'Brawl Stars Name Generator', identity: 'Brawl Stars player name', audience: 'Brawl Stars players' },
  clash_of_clans: { noun: 'Clash of Clans', pageTitle: 'Clash of Clans Name Generator', identity: 'Clash of Clans player or clan name', audience: 'clan leaders and players' },
  clash_royale: { noun: 'Clash Royale', pageTitle: 'Clash Royale Name Generator', identity: 'Clash Royale player name', audience: 'Clash Royale players' },
  genshin: { noun: 'Genshin Impact', pageTitle: 'Genshin Impact Name Generator', identity: 'Genshin Impact nickname', audience: 'Genshin players' },
  stumble_guys: { noun: 'Stumble Guys', pageTitle: 'Stumble Guys Name Generator', identity: 'Stumble Guys nickname', audience: 'Stumble Guys players' },
  among_us: { noun: 'Among Us', pageTitle: 'Among Us Name Generator', identity: 'Among Us player name', audience: 'Among Us players' },
  xbox: { noun: 'Xbox', pageTitle: 'Xbox Gamertag Generator', identity: 'Xbox Gamertag', audience: 'Xbox players' },
  psn: { noun: 'PlayStation', pageTitle: 'PSN Name Generator', identity: 'PSN Online ID', audience: 'PlayStation players' },
  steam: { noun: 'Steam', pageTitle: 'Steam Name Generator', identity: 'Steam profile name', audience: 'Steam players' },
  gta_online: { noun: 'GTA Online', pageTitle: 'GTA Online Name Generator', identity: 'GTA Online crew or player name', audience: 'GTA Online players' },
};

export function getGameSeo(game: GameProfile): GameSeoContent {
  const label = LABELS[game.id] || { noun: game.shortName, identity: 'gaming username', audience: 'players' };
  const pageTitle = label.pageTitle || `${label.noun} Name Generator`;
  const title = game.id === 'pubg'
    ? 'PUBG Name Generator | PUBG Mobile Names & Symbols'
    : `${pageTitle} | Tradivex GamingNameHub`;
  const intent = GAME_INTENTS[game.id] || `${label.identity} ideas and clean gamer tags`;
  const description = game.id === 'pubg'
    ? 'Create a PUBG name fast: make stylish PUBG Mobile nicknames with symbols, clan tags or clean names. Copy your pick and test it in-game.'
    : `Generate ${intent}. Copy clean or stylish results with ${game.shortName} character guidance and no account required.`;
  return {
    slug: game.slug,
    title,
    description,
    h1: pageTitle,
    intro: `Create ${intent} for ${label.audience}. Enter your own keyword, choose a style that fits your identity, and copy a result made for ${game.name}. The tool gives practical character guidance, but the final name should always be tested in the current client.`,
    features: [
      intent.charAt(0).toUpperCase() + intent.slice(1),
      `Copy-ready ${label.identity} results`,
      game.maxChars ? `Working ${game.maxChars}-character guidance` : 'Platform-aware rule notes',
      'Copy, save and preview without an account',
    ],
    faqs: [
      { question: `What can I generate for ${game.shortName}?`, answer: `This page creates ${intent}. Enter your own word or nickname so every result is based on your identity rather than a hardcoded player name.` },
      { question: `How do I make a ${game.shortName} name?`, answer: `Enter a keyword, choose a style and copy a result from the ${game.shortName} generator. Try a clean option first, then test decorative output in the current ${game.shortName} profile or rename screen.` },
      { question: `Can I use symbols in a ${game.shortName} name?`, answer: game.compatibilityNote },
      { question: `Does this check whether the name is available?`, answer: `No. Tradivex GamingNameHub generates name candidates and local character guidance; it does not claim real-time username availability.` },
    ],
  };
}

export function getGameBySlug(slug: string): GameProfile | undefined {
  return POPULAR_GAMES.find((game) => game.slug === slug);
}

export function getGameById(id: string): GameProfile | undefined {
  return POPULAR_GAMES.find((game) => game.id === id);
}
