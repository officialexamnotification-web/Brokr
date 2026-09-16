export interface GameProfile {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  maxChars: number | null;
  badge: string;
  accentColor: string;
  description: string;
  engine: string;
  popularSymbols: string[];
  mockupBg: string;
  compatibilityNote: string;
}

export interface FontTransformation {
  id: string;
  name: string;
  category: 'esports' | 'gothic' | 'aesthetic' | 'fancy' | 'boxed' | 'minimal' | 'funky';
  transform: (text: string) => string;
  badge?: string;
  gameCompatibility: {
    bgmi: boolean;
    freeFire: boolean;
    valorant: boolean;
    cod: boolean;
  };
}

export interface SymbolCategory {
  id: string;
  name: string;
  iconName: string;
  symbols: string[];
}

export interface CuratedName {
  id: string;
  name: string;
  game: string;
  category: 'esports' | 'aggressive' | 'sniper' | 'aesthetic' | 'duo' | 'troll' | 'mythic';
  likes: number;
  tags: string[];
}

export interface GeneratedAiName {
  name: string;
  meaning: string;
  vibe: string;
}

export interface SavedNameItem {
  id: string;
  name: string;
  game: string;
  addedAt: number;
}
