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
];
