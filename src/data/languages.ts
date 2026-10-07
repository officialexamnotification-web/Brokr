export interface NameLanguageOption {
  id: string;
  label: string;
  nativeLabel: string;
  description: string;
}

// These are local, curated language pools. They do not call a translation API;
// the selected script is sent to the same local/server name engine.
export const NAME_LANGUAGES: NameLanguageOption[] = [
  { id: 'global', label: 'Global', nativeLabel: 'Mixed', description: 'Neutral gamer words for any region' },
  { id: 'english', label: 'English', nativeLabel: 'English', description: 'Competitive English gamer vocabulary' },
  { id: 'hindi', label: 'Hindi', nativeLabel: 'हिन्दी', description: 'Native Hindi words in Devanagari script' },
  { id: 'hinglish', label: 'Hinglish', nativeLabel: 'हिंग्लिश', description: 'Hindi gaming words in Latin script' },
  { id: 'spanish', label: 'Spanish', nativeLabel: 'Español', description: 'Spanish esports words and energy' },
  { id: 'portuguese', label: 'Portuguese', nativeLabel: 'Português', description: 'Brazilian-style gamer vocabulary' },
  { id: 'indonesian', label: 'Indonesian', nativeLabel: 'Bahasa', description: 'Indonesian gaming words' },
  { id: 'french', label: 'French', nativeLabel: 'Français', description: 'French competitive and stylish words' },
  { id: 'arabic', label: 'Arabic', nativeLabel: 'العربية', description: 'Native Arabic words in Arabic script' },
  { id: 'arabic_latin', label: 'Arabic Latin', nativeLabel: 'Arabizi', description: 'Readable Arabic transliteration for game IDs' },
  { id: 'bengali', label: 'Bengali', nativeLabel: 'বাংলা', description: 'Native Bengali words in Bengali script' },
  { id: 'japanese', label: 'Japanese', nativeLabel: '日本語', description: 'Japanese gamer vocabulary and tournament terms' },
  { id: 'korean', label: 'Korean', nativeLabel: '한국어', description: 'Korean esports vocabulary and tournament terms' },
  { id: 'chinese_simplified', label: 'Chinese (Simplified)', nativeLabel: '简体中文', description: 'Simplified Chinese game and esports terms' },
  { id: 'chinese_traditional', label: 'Chinese (Traditional)', nativeLabel: '繁體中文', description: 'Traditional Chinese game and esports terms' },
  { id: 'vietnamese', label: 'Vietnamese', nativeLabel: 'Tiếng Việt', description: 'Vietnamese game and esports terms' },
  { id: 'thai', label: 'Thai', nativeLabel: 'ไทย', description: 'Thai game and esports terms' },
  { id: 'russian', label: 'Russian', nativeLabel: 'Русский', description: 'Russian game and esports terms' },
  { id: 'filipino', label: 'Filipino', nativeLabel: 'Filipino', description: 'Filipino game and esports terms' },
  { id: 'malay', label: 'Malay', nativeLabel: 'Bahasa Melayu', description: 'Malay game and esports terms' },
];
