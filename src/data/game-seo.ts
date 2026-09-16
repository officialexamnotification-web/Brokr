import { GameProfile } from '../types';
import { POPULAR_GAMES } from './games';

export const SITE_NAME = 'GamingNameHub';
export const SITE_DISPLAY_NAME = 'Gaming Name Hub';
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

export const HOME_SEO: GameSeoContent = {
  slug: '',
  title: 'Gamer Name Generator for Every Game | GamingNameHub',
  description: 'Create clean, stylish and game-aware usernames for Fortnite, Roblox, Minecraft, BGMI, Free Fire, PUBG, Valorant, COD and more. Copy names instantly.',
  h1: 'Gamer Name Generator for Every Online Game',
  intro: 'Create a memorable gaming identity with clean gamertags, stylish names, clan tags and game-aware character checks. Choose a game before copying a name so the format matches the platform you actually use.',
  features: ['Game-specific name ideas', 'Clean and stylish output modes', 'Unicode character counting', 'One-click copy and save'],
  faqs: [
    { question: 'What games can I generate names for?', answer: 'GamingNameHub supports popular mobile, PC, console and platform identities including BGMI, PUBG Mobile, Free Fire, Fortnite, Roblox, Minecraft, Valorant, Call of Duty, Steam, Xbox and more.' },
    { question: 'Are all decorative symbols guaranteed to work?', answer: 'No. Symbol support changes by game, platform and client update. Names are labelled conservatively and should be tested in the current rename or profile screen.' },
    { question: 'How do I choose a game-ready name?', answer: 'Select the exact game first, start with a clean readable result, check the character guidance, and test the final name in the current rename or profile screen.' },
  ],
};

const LABELS: Record<string, { noun: string; identity: string; audience: string; pageTitle?: string }> = {
  bgmi: { noun: 'Stylish BGMI', identity: 'in-game nickname', audience: 'Indian mobile gamers' },
  pubg: { noun: 'Stylish PUBG Mobile', identity: 'battle royale nickname', audience: 'PUBG Mobile players' },
  freefire: { noun: 'Stylish Free Fire', identity: 'in-game nickname', audience: 'Free Fire players' },
  valorant: { noun: 'Clean Valorant', identity: 'Riot ID game name', audience: 'VALORANT players' },
  cod: { noun: 'Call of Duty', identity: 'Activision or platform gamertag', audience: 'COD and Warzone players' },
  cs2: { noun: 'CS2 Steam', identity: 'Steam profile name', audience: 'Counter-Strike players' },
  fortnite: { noun: 'Fortnite', identity: 'Epic display name', audience: 'Fortnite players' },
  apex: { noun: 'Apex Legends', identity: 'EA or platform display name', audience: 'Apex players' },
  minecraft: { noun: 'Minecraft', identity: 'Minecraft username or server name', audience: 'Minecraft players' },
  roblox: { noun: 'Roblox', pageTitle: 'Roblox Username Generator', identity: 'username or display name', audience: 'Roblox players and creators' },
  league: { noun: 'League of Legends', identity: 'Riot ID game name', audience: 'League players' },
  rocket_league: { noun: 'Rocket League', identity: 'gamertag or club identity', audience: 'Rocket League players' },
  overwatch: { noun: 'Overwatch 2', identity: 'BattleTag idea', audience: 'Overwatch players' },
  rainbow_six: { noun: 'Rainbow Six Siege', identity: 'tactical gamertag', audience: 'Siege players' },
  destiny2: { noun: 'Destiny 2', identity: 'Guardian name', audience: 'Guardians' },
  ea_fc: { noun: 'EA Sports FC', identity: 'football player or club name', audience: 'EA FC players' },
  mobile_legends: { noun: 'Mobile Legends', identity: 'MLBB nickname', audience: 'MLBB players' },
  honor_of_kings: { noun: 'Honor of Kings', identity: 'hero-inspired nickname', audience: 'Honor of Kings players' },
  brawl_stars: { noun: 'Brawl Stars', identity: 'player or club name', audience: 'Brawl Stars players' },
  clash_of_clans: { noun: 'Clash of Clans', identity: 'player or clan name', audience: 'clan leaders and players' },
  clash_royale: { noun: 'Clash Royale', identity: 'player or clan name', audience: 'Clash Royale players' },
  genshin: { noun: 'Genshin Impact', identity: 'traveler nickname', audience: 'Genshin players' },
  stumble_guys: { noun: 'Stumble Guys', identity: 'funny player nickname', audience: 'Stumble Guys players' },
  among_us: { noun: 'Among Us', identity: 'crew or impostor name', audience: 'Among Us players' },
  xbox: { noun: 'Xbox', pageTitle: 'Xbox Gamertag Generator', identity: 'Xbox Gamertag', audience: 'Xbox players' },
  psn: { noun: 'PlayStation', pageTitle: 'PSN Name Generator', identity: 'PSN Online ID', audience: 'PlayStation players' },
  steam: { noun: 'Steam', pageTitle: 'Steam Name Generator', identity: 'Steam profile name', audience: 'Steam players' },
  gta_online: { noun: 'GTA Online', identity: 'Rockstar or crew name', audience: 'GTA Online players' },
};

export function getGameSeo(game: GameProfile): GameSeoContent {
  const label = LABELS[game.id] || { noun: game.shortName, identity: 'gaming username', audience: 'players' };
  const pageTitle = label.pageTitle || `${label.noun} Name Generator`;
  const title = `${pageTitle} | GamingNameHub`;
  const description = `Generate ${label.identity} ideas for ${game.name}. Choose clean, pro, funny or stylish names, check the local character guidance and copy your favourite instantly.`;
  return {
    slug: game.slug,
    title,
    description,
    h1: pageTitle,
    intro: `Create a unique ${label.identity} for ${label.audience}. Start with a keyword, select a style and copy a name made for ${game.name}. The generator shows conservative guidance when symbols, limits or platform rules still need live-client testing.`,
    features: [
      `${game.shortName}-focused name styles`,
      'Clean output for safer copying',
      game.maxChars ? `Working ${game.maxChars}-character guidance` : 'Platform-aware rule notes',
      'Copy, save and preview names instantly',
    ],
    faqs: [
      { question: `How do I make a ${game.shortName} name?`, answer: `Enter a keyword, choose a style and copy a result from the ${game.shortName} generator. Try the clean mode first, then test decorative output in the current ${game.shortName} profile or rename screen.` },
      { question: `Can I use symbols in a ${game.shortName} name?`, answer: game.compatibilityNote },
      { question: `Does this check whether the name is available?`, answer: `No. GamingNameHub generates name candidates and local character guidance; it does not claim real-time username availability.` },
    ],
  };
}

export function getGameBySlug(slug: string): GameProfile | undefined {
  return POPULAR_GAMES.find((game) => game.slug === slug);
}

export function getGameById(id: string): GameProfile | undefined {
  return POPULAR_GAMES.find((game) => game.id === id);
}
