export type LanguageId =
  | "global"
  | "english"
  | "hinglish"
  | "spanish"
  | "portuguese"
  | "indonesian"
  | "french"
  | "arabic";

export type NameStyle = "aggressive" | "pro" | "aesthetic" | "mythic" | "stealth" | "funny";

export type CompatibilityStatus = "likely" | "test-recommended" | "unknown" | "avoid";

export interface GameRule {
  id: string;
  name: string;
  limit: number | null;
  symbolStatus: "partial" | "unknown" | "avoid";
  sourceStatus: "official" | "mixed" | "needs-testing";
  note: string;
}

export interface LanguageOption {
  id: LanguageId;
  label: string;
  description: string;
}

export interface DecorationPreset {
  id: string;
  label: string;
  category: "minimal" | "frames" | "royal" | "warrior" | "aesthetic" | "symbols";
  template: string;
  compatibility: "safe" | "test" | "risky";
}

export interface GeneratedName {
  id: string;
  name: string;
  base: string;
  meaning: string;
  vibe: string;
  language: LanguageId;
  decoration: string;
  characters: number;
  fitsLimit: boolean;
  compatibility: CompatibilityStatus;
}

const RULES: Record<string, GameRule> = {
  bgmi: {
    id: "bgmi",
    name: "BGMI",
    limit: 14,
    symbolStatus: "partial",
    sourceStatus: "mixed",
    note: "The name limit is treated as 14 display characters. Unicode symbols and decorative fonts should still be tested in the current rename card.",
  },
  pubg: {
    id: "pubg",
    name: "PUBG Mobile",
    limit: 14,
    symbolStatus: "partial",
    sourceStatus: "mixed",
    note: "The name limit is treated as 14 display characters. Exact glyph support can vary by platform and game update.",
  },
  freefire: {
    id: "freefire",
    name: "Free Fire",
    limit: 12,
    symbolStatus: "partial",
    sourceStatus: "mixed",
    note: "The name limit is treated as 12 display characters. Some decorative Unicode and whitespace characters may be rejected.",
  },
  valorant: {
    id: "valorant",
    name: "VALORANT",
    limit: 16,
    symbolStatus: "unknown",
    sourceStatus: "official",
    note: "Riot documents a 3–16 character game name and a 3–5 character alphanumeric tagline. Unicode glyph rendering still needs client testing.",
  },
  cod: {
    id: "cod",
    name: "Call of Duty",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "The exact limit and accepted glyph set vary across Call of Duty titles and platforms, so this generator does not claim a verified cap.",
  },
  cs2: {
    id: "cs2",
    name: "Counter-Strike 2",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Steam profile names are not the same as a game rename card. Check the current Steam/client behavior before calling a symbol supported.",
  },
  fortnite: {
    id: "fortnite",
    name: "Fortnite",
    limit: 16,
    symbolStatus: "unknown",
    sourceStatus: "official",
    note: "Epic documents display names as 3–16 characters. Symbols can still be filtered or rendered differently by platform.",
  },
  apex: {
    id: "apex",
    name: "Apex Legends",
    limit: 16,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "EA, Steam, PlayStation and Xbox identity layers can display names differently; decorative support is not marked as verified.",
  },
  minecraft: {
    id: "minecraft",
    name: "Minecraft",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Java, Bedrock and server plugins can apply different username rules; verify the exact account or server.",
  },
  roblox: {
    id: "roblox",
    name: "Roblox",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Roblox usernames and display names are different fields; fancy Unicode is not marked as universally accepted.",
  },
  league: {
    id: "league",
    name: "League of Legends",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "League uses the Riot ID identity system; the game name and tagline are separate fields.",
  },
  rocket_league: {
    id: "rocket_league",
    name: "Rocket League",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Display identity can come from Epic, Xbox, PlayStation or Steam; verify the active platform account.",
  },
  overwatch: {
    id: "overwatch",
    name: "Overwatch 2",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "BattleTag and platform display rules are account-specific; this engine does not claim live availability.",
  },
  rainbow_six: {
    id: "rainbow_six",
    name: "Rainbow Six Siege",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Ubisoft Connect and console identity layers can differ; test the active profile name.",
  },
  destiny2: {
    id: "destiny2",
    name: "Destiny 2",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Bungie name rules and linked platform identity can change; clean output is the conservative option.",
  },
  ea_fc: {
    id: "ea_fc",
    name: "EA Sports FC",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "EA ID, club name and console profile can be separate; choose the exact field before applying a name.",
  },
  mobile_legends: {
    id: "mobile_legends",
    name: "Mobile Legends: Bang Bang",
    limit: null,
    symbolStatus: "partial",
    sourceStatus: "needs-testing",
    note: "MLBB name rules and Unicode rendering can change by client version; decorative output is test-recommended.",
  },
  honor_of_kings: {
    id: "honor_of_kings",
    name: "Honor of Kings",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Regional clients can apply different naming rules; verify the current in-game rename screen.",
  },
  brawl_stars: {
    id: "brawl_stars",
    name: "Brawl Stars",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Keep output short and readable; current Supercell name rules should be checked before changing a name.",
  },
  clash_of_clans: {
    id: "clash_of_clans",
    name: "Clash of Clans",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Player and clan naming fields have different contexts; use clean text when the client rejects symbols.",
  },
  clash_royale: {
    id: "clash_royale",
    name: "Clash Royale",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Use this as a name idea generator; accepted characters depend on the current Supercell client.",
  },
  genshin: {
    id: "genshin",
    name: "Genshin Impact",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "In-game nickname and account identity are different concepts; verify the profile field before applying.",
  },
  stumble_guys: {
    id: "stumble_guys",
    name: "Stumble Guys",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Keep names readable across mobile and linked accounts; symbol support needs client testing.",
  },
  among_us: {
    id: "among_us",
    name: "Among Us",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Multiplayer lobby display rules can vary by platform; use clean fallback text if symbols are stripped.",
  },
  xbox: {
    id: "xbox",
    name: "Xbox Gamertag",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Xbox gamertag rules are platform-specific; this engine avoids claiming symbol support without a current check.",
  },
  psn: {
    id: "psn",
    name: "PlayStation Network",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "PSN Online ID is a platform identity, not a universal in-game rename field; verify availability separately.",
  },
  steam: {
    id: "steam",
    name: "Steam Profile",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Steam profile name is not the same as every game username; game-specific restrictions may still apply.",
  },
  gta_online: {
    id: "gta_online",
    name: "GTA Online",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "Rockstar, console and in-game identity fields can differ; this engine generates ideas, not live availability.",
  },
};

export const GAME_RULES = Object.values(RULES);

export const LANGUAGES: LanguageOption[] = [
  { id: "global", label: "Global", description: "Neutral words that work across regions" },
  { id: "english", label: "English", description: "Competitive English gamer vocabulary" },
  { id: "hinglish", label: "Hinglish", description: "Indian gaming slang in Latin script" },
  { id: "spanish", label: "Español", description: "Spanish esports words and energy" },
  { id: "portuguese", label: "Português", description: "Brazilian-style gamer vocabulary" },
  { id: "indonesian", label: "Bahasa", description: "Indonesian gaming words in Latin script" },
  { id: "french", label: "Français", description: "French competitive and stylish words" },
  { id: "arabic", label: "Arabic Latin", description: "Readable Arabic transliteration for game IDs" },
];

export const DECORATIONS: DecorationPreset[] = [
  { id: "none", label: "Clean name", category: "minimal", template: "{name}", compatibility: "safe" },
  { id: "dot", label: "Dot minimal", category: "minimal", template: "• {name} •", compatibility: "test" },
  { id: "crosshair", label: "Crosshair", category: "minimal", template: "×͜× {name}", compatibility: "test" },
  { id: "crown", label: "Crown", category: "royal", template: "♛ {name} ♛", compatibility: "test" },
  { id: "shield", label: "Shield frame", category: "frames", template: "『{name}』", compatibility: "test" },
  { id: "warrior", label: "Warrior frame", category: "warrior", template: "༒☬ {name} ☬༒", compatibility: "test" },
  { id: "wings", label: "Angel wings", category: "aesthetic", template: "𓆩 {name} 𓆪", compatibility: "risky" },
  { id: "royal", label: "Royal frame", category: "royal", template: "꧁♕ {name} ♕꧂", compatibility: "risky" },
  { id: "ornate", label: "Ornate frame", category: "frames", template: "꧁༺ {name} ༻꧂", compatibility: "risky" },
  { id: "flame", label: "Flame symbols", category: "symbols", template: "꧁ঔৣ {name} ঔৣ꧂", compatibility: "risky" },
  { id: "aesthetic", label: "Aesthetic stars", category: "aesthetic", template: "⋆｡°✩ {name} ✩°｡⋆", compatibility: "risky" },
  { id: "blade", label: "Blade", category: "warrior", template: "⚔ {name} ⚔", compatibility: "test" },
];

const WORDS: Record<LanguageId, string[]> = {
  global: ["Shadow", "Viper", "Nova", "Ghost", "Rogue", "Storm", "Titan", "Blaze", "Echo", "Orbit"],
  english: ["Ranger", "Havoc", "Sniper", "Reaper", "Frost", "Venom", "Phantom", "Clutch", "Hunter", "Warden"],
  hinglish: ["Sher", "Baaz", "Jazba", "Toofan", "Yodha", "Dabangg", "Raftar", "Sultan", "Jigar", "Aag"],
  spanish: ["Lobo", "Fuego", "Sombra", "Rey", "Rayo", "Cazador", "Furia", "Noche", "Alma", "Fantasma"],
  portuguese: ["Lobo", "Furia", "Sombra", "Rei", "Brasa", "Caçador", "Mestre", "Trovão", "Aço", "Fantasma"],
  indonesian: ["Bayang", "Raja", "Petir", "Bara", "Hantu", "Jago", "Badai", "Naga", "Prajurit", "Elang"],
  french: ["Ombre", "Roi", "Foudre", "Flamme", "Chasseur", "Furtif", "Loup", "Glace", "Esprit", "Furie"],
  arabic: ["Saqr", "Asad", "Malik", "Layl", "Nar", "Ruh", "Qamar", "Fares", "Jabbar", "Zaeem"],
};

const ROLES = ["Ace", "Main", "One", "X", "OP", "YT", "MVP", "Prime", "Pro", "Zero"];
const MEANINGS: Record<NameStyle, { vibe: string; meaning: string }> = {
  aggressive: { vibe: "Lethal", meaning: "Fast pressure, fearless finish" },
  pro: { vibe: "Esports", meaning: "Clean competitive team identity" },
  aesthetic: { vibe: "Aesthetic", meaning: "Balanced stylish visual identity" },
  mythic: { vibe: "Mythic", meaning: "Legendary presence on the battlefield" },
  stealth: { vibe: "Stealth", meaning: "Quiet movement, precise execution" },
  funny: { vibe: "Funny", meaning: "Lighthearted name with gamer energy" },
};

function cleanText(input: unknown, fallback: string): string {
  const value = typeof input === "string" ? input : "";
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 32);
  return cleaned || fallback;
}

export function countCharacters(value: string): number {
  try {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const Segmenter = (Intl as typeof Intl & { Segmenter: new (locales?: string | string[], options?: { granularity: string }) => { segment(input: string): Iterable<unknown> } }).Segmenter;
      return Array.from(new Segmenter(undefined, { granularity: "grapheme" }).segment(value)).length;
    }
  } catch {
    // Fall through to the Unicode code-point count.
  }
  return Array.from(value).length;
}

function getRule(gameId: string): GameRule {
  return RULES[gameId] || {
    id: gameId,
    name: "This game",
    limit: null,
    symbolStatus: "unknown",
    sourceStatus: "needs-testing",
    note: "This game has no verified rule in the local matrix yet.",
  };
}

function getCompatibility(rule: GameRule, name: string, decoration: DecorationPreset, conservative: boolean): CompatibilityStatus {
  if (rule.limit !== null && countCharacters(name) > rule.limit) return "avoid";
  if (conservative && decoration.id !== "none") return "avoid";
  if (rule.sourceStatus === "needs-testing") return "unknown";
  if (decoration.compatibility === "risky" || rule.sourceStatus !== "official") return "test-recommended";
  return "likely";
}

function applyDecoration(base: string, decoration: DecorationPreset): string {
  return decoration.template.replace("{name}", base);
}

function fitNameToRule(base: string, requestedDecoration: DecorationPreset, rule: GameRule): { name: string; decoration: DecorationPreset } {
  if (rule.limit === null) {
    return { name: applyDecoration(base, requestedDecoration), decoration: requestedDecoration };
  }

  const decorated = applyDecoration(base, requestedDecoration);
  if (countCharacters(decorated) <= rule.limit) {
    return { name: decorated, decoration: requestedDecoration };
  }

  const decorationOverhead = countCharacters(applyDecoration("", requestedDecoration));
  const availableBaseCharacters = rule.limit - decorationOverhead;
  if (availableBaseCharacters >= 3) {
    const shortenedBase = Array.from(base).slice(0, availableBaseCharacters).join("");
    const shortenedName = applyDecoration(shortenedBase, requestedDecoration);
    if (countCharacters(shortenedName) <= rule.limit) {
      return { name: shortenedName, decoration: requestedDecoration };
    }
  }

  // If the frame itself is too large for this game's working limit, use a clean
  // name rather than returning a decorative string that cannot fit.
  const cleanName = Array.from(base).slice(0, rule.limit).join("");
  return { name: cleanName, decoration: DECORATIONS[0] };
}

function pickDecoration(id: string | undefined, index: number, conservative: boolean): DecorationPreset {
  if (conservative || id === "none") return DECORATIONS[0];
  if (id) return DECORATIONS.find((item) => item.id === id) || DECORATIONS[0];
  const options = DECORATIONS.filter((item) => item.id !== "none");
  return options[index % options.length];
}

export function getRuleForGame(gameId: string): GameRule {
  return getRule(gameId);
}

export function generateNames(options: {
  keyword?: string;
  gameId?: string;
  language?: LanguageId;
  style?: NameStyle;
  decorationId?: string;
  count?: number;
  conservative?: boolean;
}): GeneratedName[] {
  const gameId = options.gameId || "bgmi";
  const language = options.language && WORDS[options.language] ? options.language : "global";
  const style = options.style && MEANINGS[options.style] ? options.style : "pro";
  const keyword = cleanText(options.keyword, "Phantom").replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 18) || "Phantom";
  const count = Math.min(Math.max(Number(options.count) || 12, 4), 24);
  const rule = getRule(gameId);
  const result: GeneratedName[] = [];

  for (let i = 0; i < count; i += 1) {
    const word = WORDS[language][(i * 3 + keyword.length) % WORDS[language].length];
    const role = ROLES[(i + keyword.length) % ROLES.length];
    const baseOptions = [
      `${keyword}${i % 3 === 0 ? "" : role}`,
      `${word}${i % 2 === 0 ? keyword : role}`,
      `${keyword}_${word}`,
      `${word}${keyword.slice(0, Math.max(2, Math.min(5, keyword.length)))}${i % 2 ? "X" : ""}`,
    ];
    const rawBase = baseOptions[i % baseOptions.length].replace(/\s+/g, "");
    const base = rawBase.slice(0, 22);
    const requestedDecoration = pickDecoration(options.decorationId, i, Boolean(options.conservative));
    const fitted = fitNameToRule(base, requestedDecoration, rule);
    const decoration = fitted.decoration;
    const name = fitted.name;
    const characters = countCharacters(name);
    const meaning = MEANINGS[style];
    result.push({
      id: `${gameId}-${Date.now()}-${i}`,
      name,
      base,
      meaning: meaning.meaning,
      vibe: meaning.vibe,
      language,
      decoration: decoration.id,
      characters,
      fitsLimit: rule.limit === null || characters <= rule.limit,
      compatibility: getCompatibility(rule, name, decoration, Boolean(options.conservative)),
    });
  }

  return result;
}

export function getPublicMetadata() {
  return {
    games: GAME_RULES,
    languages: LANGUAGES,
    decorations: DECORATIONS,
  };
}
