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
  pubg_battlegrounds: 'PUBG: BATTLEGROUNDS PC and console nicknames, squad names and clean player IDs',
  dota2: 'Dota 2 player names, Steam nicknames, hero-inspired handles and team tags',
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
  marvel_rivals: 'Marvel Rivals names, hero-inspired nicknames, faction tags and competitive player handles',
  arena_of_valor: 'Arena of Valor nicknames, AoV hero names, ranked player tags and esports team identities',
  teamfight_tactics: 'Teamfight Tactics names, TFT tactician handles and competitive Riot ID ideas',
};

export const HOME_SEO: GameSeoContent = {
  slug: '',
  title: 'Free Game Name Generator for 30+ Games | Tradivex GamingNameHub',
  description: 'Free game name generator for stylish gamer names, nicknames, gamertags and clan tags for BGMI, PUBG, Free Fire, Valorant, COD, Fortnite, Marvel Rivals, Arena of Valor, TFT, Roblox and Minecraft.',
  h1: 'Game Name Generator for Every Online Game',
  intro: 'Create stylish gamer names, cool nicknames, clean gamertags and clan tags for the game you actually play. Choose a game first so the name style and character guidance match your platform.',
  features: ['Game-specific name ideas', 'Clean and stylish output modes', 'Unicode character counting', 'One-click copy and save'],
  faqs: [
    { question: 'What games can I generate names for?', answer: 'Tradivex GamingNameHub supports popular mobile, PC, console and platform identities including BGMI, PUBG Mobile, Free Fire, Fortnite, Marvel Rivals, Arena of Valor, Teamfight Tactics, Roblox, Minecraft, Valorant, Call of Duty, Steam, Xbox and more.' },
    { question: 'Are all decorative symbols guaranteed to work?', answer: 'No. Symbol support changes by game, platform and client update. Names are labelled conservatively and should be tested in the current rename or profile screen.' },
    { question: 'How do I choose a game-ready name?', answer: 'Select the exact game first, start with a clean readable result, check the character guidance, and test the final name in the current rename or profile screen.' },
  ],
};

const LABELS: Record<string, { noun: string; identity: string; audience: string; pageTitle?: string }> = {
  bgmi: { noun: 'BGMI', pageTitle: 'BGMI Name Generator', identity: 'stylish BGMI nickname', audience: 'BGMI mobile gamers' },
  pubg: { noun: 'PUBG Mobile', pageTitle: 'PUBG Mobile Name Generator', identity: 'stylish PUBG Mobile name', audience: 'PUBG Mobile players' },
  pubg_battlegrounds: { noun: 'PUBG: BATTLEGROUNDS', pageTitle: 'PUBG: BATTLEGROUNDS Name Generator', identity: 'PUBG PC or console player name', audience: 'PUBG: BATTLEGROUNDS players' },
  dota2: { noun: 'Dota 2', pageTitle: 'Dota 2 Name Generator', identity: 'Dota 2 player name', audience: 'Dota 2 players' },
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
  marvel_rivals: { noun: 'Marvel Rivals', pageTitle: 'Marvel Rivals Name Generator', identity: 'Marvel Rivals player name', audience: 'Marvel Rivals players' },
  arena_of_valor: { noun: 'Arena of Valor', pageTitle: 'Arena of Valor Name Generator', identity: 'Arena of Valor nickname', audience: 'Arena of Valor players' },
  teamfight_tactics: { noun: 'Teamfight Tactics', pageTitle: 'Teamfight Tactics Name Generator', identity: 'TFT player name or Riot ID', audience: 'Teamfight Tactics players' },
};

export function getGameSeo(game: GameProfile): GameSeoContent {
  const label = LABELS[game.id] || { noun: game.shortName, identity: 'gaming username', audience: 'players' };
  const pageTitle = label.pageTitle || `${label.noun} Name Generator`;
  const titleByGame: Record<string, string> = {
    bgmi: 'BGMI Name Generator | Stylish BGMI Names & Symbols | Tradivex GamingNameHub',
    pubg: 'PUBG Mobile Name Generator: Names & Symbols | Tradivex GamingNameHub',
    pubg_battlegrounds: 'PUBG: BATTLEGROUNDS Name Generator | PC & Console | Tradivex GamingNameHub',
    dota2: 'Dota 2 Name Generator & Steam Player Names | Tradivex GamingNameHub',
    freefire: 'Free Fire Name Generator: Stylish Names & Symbols | Tradivex GamingNameHub',
    valorant: 'Valorant Name Generator & Riot ID Ideas | Tradivex GamingNameHub',
    cod: 'COD Name Generator for Warzone & CODM | Tradivex GamingNameHub',
    cs2: 'CS2 Name Generator & Nickname Ideas | Tradivex GamingNameHub',
    apex: 'Apex Legends Name Generator & Gamertags | Tradivex GamingNameHub',
    marvel_rivals: 'Marvel Rivals Name Generator: Hero Tags & Faction Names | Tradivex',
    arena_of_valor: 'Arena of Valor Name Generator: AoV Nicknames & Tags | Tradivex',
    teamfight_tactics: 'TFT Name Generator: Teamfight Tactics Names & Tags | Tradivex',
  };
  const title = titleByGame[game.id] || `${pageTitle} | Tradivex GamingNameHub`;
  const intent = GAME_INTENTS[game.id] || `${label.identity} ideas and clean gamer tags`;
  const descriptionByGame: Record<string, string> = {
    bgmi: 'Create a BGMI name with stylish symbols, clan tags or a clean nickname. Copy your favorite and test it in the current BGMI rename screen.',
    pubg: 'Generate PUBG Mobile names, nicknames and clan tags with stylish symbols or clean text. Copy a name and test it in the current game client.',
    pubg_battlegrounds: 'Create a PUBG: BATTLEGROUNDS player name for PC or console. This page is for the full game, separate from PUBG Mobile; check your Steam, Epic or console profile display rules.',
    dota2: 'Generate Dota 2 player names, Steam nicknames and team tags. Choose a readable handle for ranked play or esports and check your current Steam profile display settings.',
    freefire: 'Make a Free Fire name with stylish FF symbols, short nicknames or clan tags. Copy your choice and check it in the current Free Fire client.',
    valorant: 'Create a Valorant name, Riot ID or tagline idea. Copy a clean or stylish handle and check current Riot ID rules before changing it.',
    cod: 'Generate COD names for Call of Duty, Warzone and COD Mobile. Explore tactical gamertags, then check the rules for your current title and platform.',
    cs2: 'Create CS2 nicknames, Counter-Strike names and Steam aliases for competitive play. Copy a clean or stylish idea and check how it displays in Steam.',
    apex: 'Generate Apex Legends names, gamertags and squad identities. Copy a clean or stylish idea and check how it displays on your EA or console profile.',
    marvel_rivals: 'Create Marvel Rivals names, hero-inspired nicknames and faction tags for competitive play. Copy a clean player handle and check current account display rules.',
    arena_of_valor: 'Generate Arena of Valor names, AoV nicknames, hero-inspired tags and squad identities. Copy a clean or stylish idea and test it in your regional game client.',
    teamfight_tactics: 'Make Teamfight Tactics names, TFT tactician handles and competitive Riot ID ideas. Copy a readable name and check current Riot account rules.',
  };
  const description = descriptionByGame[game.id] || `Generate ${intent}. Copy clean or stylish results with ${game.shortName} character guidance and no account required.`;
  const searchIntentFaqs: Record<string, SeoFaq[]> = {
    pubg: [
      { question: 'Can I make a PUBG Mobile name with symbols?', answer: 'Yes. Try a clean name first, then test decorative symbols in the current PUBG Mobile rename screen because accepted characters can change by client and region.' },
    ],
    freefire: [
      { question: 'How do I make a stylish Free Fire name?', answer: 'Enter a word or nickname, choose a style, and copy a result. Test FF symbols in the current Free Fire or FF MAX rename screen before using them.' },
    ],
    valorant: [
      { question: 'Does this create a Valorant Riot ID and tagline?', answer: 'It suggests Riot ID name and tagline ideas. It does not check live Riot ID availability; verify the current name and tagline rules in your Riot account.' },
    ],
    cod: [
      { question: 'Can I use these names in Warzone and COD Mobile?', answer: 'The generator suggests Call of Duty name ideas for CODM and Warzone, but each title, account and platform can apply different display-name rules.' },
    ],
    cs2: [
      { question: 'Are these CS2 nicknames also Steam names?', answer: 'The ideas can be used as Steam profile-name inspiration. Steam profile names and in-game display behavior may differ, so check your current Steam profile.' },
    ],
    apex: [
      { question: 'Can I create an Apex Legends name style for my platform?', answer: 'Yes. Use these ideas as EA, Steam or console profile-name inspiration, then confirm the active account and platform accept the characters.' },
    ],
    marvel_rivals: [
      { question: 'Can I use a custom name in Marvel Rivals?', answer: 'This tool creates name ideas only. Check the current Marvel Rivals account and platform display-name rules before applying a name.' },
    ],
    arena_of_valor: [
      { question: 'Does this Arena of Valor name generator work for Liên Quân Mobile and RoV?', answer: 'It generates Arena of Valor nickname ideas. Regional versions such as Liên Quân Mobile and RoV may apply different name rules, so verify the name in your local client.' },
    ],
    teamfight_tactics: [
      { question: 'Can I use these TFT names in Teamfight Tactics?', answer: 'The generator suggests Teamfight Tactics player names and Riot ID ideas. It does not check name availability; confirm the current Riot ID rules in your Riot account.' },
    ],
  };
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
      ...(searchIntentFaqs[game.id] || []),
    ],
  };
}

export function getGameBySlug(slug: string): GameProfile | undefined {
  return POPULAR_GAMES.find((game) => game.slug === slug);
}

export function getGameById(id: string): GameProfile | undefined {
  return POPULAR_GAMES.find((game) => game.id === id);
}
