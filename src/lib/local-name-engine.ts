import { GameProfile } from '../types';
import { BackendName, GenerateNamesResponse } from './api';

const WORDS: Record<string, string[]> = {
  global: ['Shadow', 'Viper', 'Nova', 'Ghost', 'Rogue', 'Storm', 'Titan', 'Blaze', 'Echo', 'Orbit'],
  english: ['Ranger', 'Havoc', 'Sniper', 'Reaper', 'Frost', 'Venom', 'Phantom', 'Clutch', 'Hunter', 'Warden'],
  hindi: ['शेर', 'बाज़', 'जज़्बा', 'तूफ़ान', 'योद्धा', 'दबंग', 'रफ़्तार', 'सुल्तान', 'जिगर', 'आग'],
  hinglish: ['Sher', 'Baaz', 'Jazba', 'Toofan', 'Yodha', 'Dabangg', 'Raftar', 'Sultan', 'Jigar', 'Aag'],
  spanish: ['Lobo', 'Fuego', 'Sombra', 'Rey', 'Rayo', 'Cazador', 'Furia', 'Noche', 'Alma', 'Fantasma'],
  portuguese: ['Lobo', 'Furia', 'Sombra', 'Rei', 'Brasa', 'Mestre', 'Trovão', 'Aço', 'Fantasma', 'Caçador'],
  indonesian: ['Bayang', 'Raja', 'Petir', 'Bara', 'Hantu', 'Jago', 'Badai', 'Naga', 'Elang', 'Prajurit'],
  french: ['Ombre', 'Roi', 'Foudre', 'Flamme', 'Loup', 'Glace', 'Esprit', 'Furie', 'Chasseur', 'Furtif'],
  arabic: ['صقر', 'أسد', 'ملك', 'ليل', 'نار', 'روح', 'قمر', 'فارس', 'جبار', 'زعيم'],
  arabic_latin: ['Saqr', 'Asad', 'Malik', 'Layl', 'Nar', 'Ruh', 'Qamar', 'Fares', 'Jabbar', 'Zaeem'],
  bengali: ['বাঘ', 'রাজা', 'ঝড়', 'আগুন', 'ছায়া', 'বীর', 'নাগ', 'বজ্র', 'শিকারি', 'সম্রাট'],
};

const ROLES = ['Ace', 'Main', 'One', 'X', 'OP', 'YT', 'MVP', 'Prime', 'Pro', 'Zero'];
const DECORATIONS: Record<string, { template: string; risky: boolean }> = {
  none: { template: '{name}', risky: false },
  dot: { template: '•{name}•', risky: false },
  crosshair: { template: '×͜×{name}', risky: false },
  crown: { template: '♛{name}♛', risky: false },
  shield: { template: '『{name}』', risky: false },
  warrior: { template: '༒{name}༒', risky: false },
  wings: { template: '𓆩{name}𓆪', risky: true },
  royal: { template: '꧁{name}꧂', risky: true },
  ornate: { template: '꧁༺{name}༻꧂', risky: true },
  flame: { template: 'ঔৣ{name}ঔৣ', risky: true },
};

function count(value: string) { return Array.from(value).length; }

function decorate(name: string, id: string, limit: number | null) {
  const preset = DECORATIONS[id] || DECORATIONS.none;
  const decorated = preset.template.replace('{name}', name);
  if (limit === null || count(decorated) <= limit) return decorated;
  const available = Math.max(3, limit - count(preset.template.replace('{name}', '')));
  return preset.risky || count(decorated) > limit ? name.slice(0, limit) : preset.template.replace('{name}', name.slice(0, available));
}

export function generateLocalNames(options: { keyword: string; game: GameProfile; language: string; style: string; decorationId: string; conservative: boolean; count?: number }): GenerateNamesResponse {
  const keyword = (options.keyword.replace(/[^\p{L}\p{N}_ -]/gu, '').trim() || 'Phantom').replace(/\s+/g, '').slice(0, 18);
  const words = WORDS[options.language] || WORDS.global;
  const limit = options.game.maxChars;
  const names: BackendName[] = Array.from({ length: Math.min(Math.max(options.count || 12, 4), 24) }, (_, index) => {
    const word = words[(index * 3 + keyword.length) % words.length];
    const role = ROLES[(index + keyword.length) % ROLES.length];
    const base = index % 3 === 0 ? `${keyword}${index % 2 ? role : ''}` : index % 3 === 1 ? `${word}${keyword}` : `${keyword}_${word}`;
    const decorationId = options.conservative ? 'none' : options.decorationId || 'none';
    const name = decorate(base.slice(0, 22), decorationId, limit);
    const risky = DECORATIONS[decorationId]?.risky || false;
    return {
      id: `local-${options.game.id}-${index}-${keyword}`,
      name,
      base,
      meaning: options.style === 'funny' ? 'Lighthearted gamer energy' : options.style === 'aggressive' ? 'Fast pressure, fearless finish' : 'Clean competitive team identity',
      vibe: options.style === 'aesthetic' ? 'Aesthetic' : options.style === 'mythic' ? 'Mythic' : options.style === 'stealth' ? 'Stealth' : options.style === 'funny' ? 'Funny' : options.style === 'aggressive' ? 'Lethal' : 'Esports',
      language: options.language,
      decoration: decorationId,
      characters: count(name),
      fitsLimit: limit === null || count(name) <= limit,
      compatibility: limit !== null && count(name) > limit ? 'avoid' : options.conservative ? 'likely' : risky ? 'test-recommended' : 'unknown',
    };
  });
  return {
    source: 'local-engine',
    meta: { gameId: options.game.id, gameName: options.game.name, limit, symbolStatus: 'partial', sourceStatus: 'needs-testing', safeMode: options.conservative, note: 'Generated locally in the browser. Decorative output should be tested in the current game client.' },
    names,
  };
}
