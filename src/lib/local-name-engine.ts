import { GameProfile } from '../types';
import { BackendName, GenerateNamesResponse } from './api';
import { countCharacters } from './character-count';

const WORDS: Record<string, string[]> = {
  global: ['Shadow', 'Nova', 'Ghost', 'Rogue', 'Storm', 'Titan', 'Blaze', 'Echo', 'Orbit'],
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
  japanese: ['影', '龍', '星', '炎', '風', '雷', '狼', '夜', '侍', '光'],
  korean: ['그림자', '용', '별', '불꽃', '바람', '천둥', '늑대', '밤', '전사', '빛'],
  chinese_simplified: ['影', '龙', '星', '炎', '风', '雷', '狼', '夜', '武士', '光'],
  chinese_traditional: ['影', '龍', '星', '炎', '風', '雷', '狼', '夜', '武士', '光'],
  vietnamese: ['Bóng', 'Rồng', 'Sao', 'Lửa', 'Gió', 'Sấm', 'Sói', 'Đêm', 'Thép', 'Ánh'],
  thai: ['เงา', 'มังกร', 'ดาว', 'ไฟ', 'ลม', 'สายฟ้า', 'หมาป่า', 'ราตรี', 'นักรบ', 'แสง'],
  russian: ['Тень', 'Дракон', 'Звезда', 'Огонь', 'Ветер', 'Гром', 'Волк', 'Ночь', 'Воин', 'Свет'],
  filipino: ['Anino', 'Dragon', 'Bituin', 'Apoy', 'Hangin', 'Kidlat', 'Lobo', 'Gabi', 'Mandirigma', 'Liwanag'],
  malay: ['Bayang', 'Naga', 'Bintang', 'Api', 'Angin', 'Petir', 'Serigala', 'Malam', 'Wira', 'Cahaya'],
};

const ROLES = ['Ace', 'Main', 'One', 'X', 'OP', 'YT', 'MVP', 'Prime', 'Pro', 'Zero'];
const LANGUAGE_ROLES: Record<string, string[]> = {
  global: ROLES,
  english: ROLES,
  hindi: ['वीर', 'राजा', 'एक', 'एक्स', 'प्रो', 'योद्धा', 'एमवीपी', 'प्राइम', 'शेर', 'शून्य'],
  hinglish: ['Ace', 'Bhai', 'One', 'X', 'OP', 'YT', 'MVP', 'Pro', 'Sher', 'Zero'],
  spanish: ['Pro', 'Rey', 'Uno', 'X', 'Jefe', 'MVP', 'Elite', 'Prime', 'Leyenda', 'Cero'],
  portuguese: ['Pro', 'Rei', 'Um', 'X', 'Lenda', 'MVP', 'Elite', 'Prime', 'Mestre', 'Zero'],
  indonesian: ['Pro', 'Raja', 'Satu', 'X', 'Jago', 'MVP', 'Elite', 'Utama', 'Legenda', 'Nol'],
  french: ['Pro', 'Roi', 'Un', 'X', 'Chef', 'MVP', 'Elite', 'Prime', 'Légende', 'Zéro'],
  arabic: ['بطل', 'ملك', 'واحد', 'إكس', 'محترف', 'أسطورة', 'نخبة', 'برايم', 'زعيم', 'صفر'],
  arabic_latin: ['Ace', 'Malik', 'One', 'X', 'Pro', 'MVP', 'Elite', 'Prime', 'Zaeem', 'Zero'],
  bengali: ['বীর', 'রাজা', 'এক', 'এক্স', 'প্রো', 'এমভিপি', 'সেরা', 'প্রাইম', 'নায়ক', 'শূন্য'],
  japanese: ['王', '神', '忍', '牙', '零', '将', '鬼', '覇', '剣', '皇'],
  korean: ['왕', '신', '검', '제로', '장군', '전사', '영웅', '최강', '황제', '별'],
  chinese_simplified: ['王', '神', '忍', '牙', '零', '将', '鬼', '霸', '剑', '皇'],
  chinese_traditional: ['王', '神', '忍', '牙', '零', '將', '鬼', '霸', '劍', '皇'],
  vietnamese: ['Vua', 'Thần', 'Pro', 'Đỉnh', 'MVP', 'Huyền', 'VôĐịch', 'Chiến', 'SốMột', 'Zero'],
  thai: ['ราชา', 'เทพ', 'โปร', 'หนึ่ง', 'นักรบ', 'แชมป์', 'ตำนาน', 'ยอด', 'ศูนย์', 'เงา'],
  russian: ['Царь', 'Бог', 'Про', 'Ноль', 'Титан', 'Герой', 'Мастер', 'Легенда', 'Лорд', 'Тень'],
  filipino: ['Hari', 'Diyos', 'Pro', 'Una', 'Mandirigma', 'Alamat', 'Kampeon', 'Astig', 'MVP', 'Zero'],
  malay: ['Raja', 'Dewa', 'Pro', 'Juara', 'Wira', 'Legenda', 'Sakti', 'MVP', 'Nol', 'Utama'],
};
const NATIVE_OUTPUT_LANGUAGES = new Set(['hindi', 'spanish', 'portuguese', 'indonesian', 'french', 'arabic', 'bengali', 'japanese', 'korean', 'chinese_simplified', 'chinese_traditional', 'vietnamese', 'thai', 'russian', 'filipino', 'malay']);
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

function count(value: string) { return countCharacters(value); }
function sliceCharacters(value: string, length: number) {
  try {
    const Segmenter = (Intl as typeof Intl & { Segmenter: new (locales?: string | string[], options?: { granularity: string }) => { segment(input: string): Iterable<{ segment: string }> } }).Segmenter;
    if (Segmenter) return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(value), (part) => part.segment).slice(0, length).join('');
  } catch { /* Fall back to code points on runtimes without Intl.Segmenter. */ }
  return Array.from(value).slice(0, length).join('');
}

function decorate(name: string, id: string, limit: number | null) {
  const preset = DECORATIONS[id] || DECORATIONS.none;
  const decorated = preset.template.replace('{name}', name);
  if (limit === null || count(decorated) <= limit) return decorated;
  const available = Math.max(3, limit - count(preset.template.replace('{name}', '')));
  return preset.risky || count(decorated) > limit ? sliceCharacters(name, limit) : preset.template.replace('{name}', sliceCharacters(name, available));
}

export function generateLocalNames(options: { keyword: string; game: GameProfile; language: string; style: string; decorationId: string; conservative: boolean; count?: number }): GenerateNamesResponse {
  const keyword = (options.keyword.replace(/[^\p{L}\p{N}_ -]/gu, '').trim() || 'Phantom').replace(/\s+/g, '').slice(0, 18);
  const language = WORDS[options.language] ? options.language : 'global';
  const words = WORDS[language];
  const limit = options.game.maxChars;
  const names: BackendName[] = Array.from({ length: Math.min(Math.max(options.count || 12, 4), 24) }, (_, index) => {
    const word = words[(index * 3 + keyword.length) % words.length];
    const roles = LANGUAGE_ROLES[language] || ROLES;
    const role = roles[(index + keyword.length) % roles.length];
    const base = NATIVE_OUTPUT_LANGUAGES.has(language)
      ? index % 4 === 0
        ? `${word}${role}`
        : index % 4 === 1
          ? `${role}${word}`
          : index % 4 === 2
            ? `${word}${(index % 9) + 1}`
            : `${word}${roles[(index + 2 + keyword.length) % roles.length]}`
      : index % 3 === 0
        ? `${keyword}${index % 2 ? role : ''}`
        : index % 3 === 1
          ? `${word}${keyword}`
          : `${keyword}_${word}`;
    const decorationId = options.conservative ? 'none' : options.decorationId || 'none';
    const name = decorate(base.slice(0, 22), decorationId, limit);
    const risky = DECORATIONS[decorationId]?.risky || false;
    return {
      id: `local-${options.game.id}-${index}-${keyword}`,
      name,
      base,
      meaning: options.style === 'funny' ? 'Lighthearted gamer energy' : options.style === 'aggressive' ? 'Fast pressure, fearless finish' : 'Clean competitive team identity',
      vibe: options.style === 'aesthetic' ? 'Aesthetic' : options.style === 'mythic' ? 'Mythic' : options.style === 'stealth' ? 'Stealth' : options.style === 'funny' ? 'Funny' : options.style === 'aggressive' ? 'Lethal' : 'Esports',
      language,
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
