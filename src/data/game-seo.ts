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
  title: 'Game Name Generator for Every Game | GamingNameHub',
  description: 'Free game name generator for stylish gamer names, nicknames, gamertags and clan tags for BGMI, PUBG, Free Fire, Valorant, COD, Fortnite, Roblox and Minecraft.',
  h1: 'Game Name Generator for Every Online Game',
  intro: 'Create stylish gamer names, cool nicknames, clean gamertags and clan tags for the game you actually play. Choose a game first so the name style and character guidance match your platform.',
  features: ['Game-specific name ideas', 'Clean and stylish output modes', 'Unicode character counting', 'One-click copy and save'],
  faqs: [
    { question: 'What games can I generate names for?', answer: 'GamingNameHub supports popular mobile, PC, console and platform identities including BGMI, PUBG Mobile, Free Fire, Fortnite, Roblox, Minecraft, Valorant, Call of Duty, Steam, Xbox and more.' },
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
  const title = `${pageTitle} | GamingNameHub`;
  const description = `Generate ${label.identity} ideas with clean, cool, stylish and clan-tag styles. Copy a name instantly with game-aware character guidance for ${game.name}.`;
  return {
    slug: game.slug,
    title,
    description,
    h1: pageTitle,
    intro: `Create a unique ${label.identity} for ${label.audience}. Enter your own keyword, choose a clean, cool, funny or stylish style, and copy a name made for ${game.name}.`,
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
