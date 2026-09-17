export interface LanguageUiCopy {
  nicknameLabel: string;
  languageLabel: string;
  placeholder: string;
}

export interface GlobalUiCopy {
  languageLabel: string;
  nameGenerator: string;
  idCardStudio: string;
  symbolsSpace: string;
  trendingNames: string;
  renameCardTest: string;
  favorites: string;
  generator: string;
  searchGames: string;
  selectCompatibility: string;
  popularIn: string;
  regenerate: string;
  style: string;
  decoration: string;
  hybridEngine: string;
}

// UI copy changes with the selected language. The nickname itself remains
// exactly as the user typed it; only the guidance text and generated pools change.
export const LANGUAGE_UI: Record<string, LanguageUiCopy> = {
  global: { nicknameLabel: 'Enter Your Nickname or Clan Handle:', languageLabel: 'Language', placeholder: 'e.g. VIPER, MORTAL, JONATHAN, SOUL...' },
  english: { nicknameLabel: 'Enter Your Nickname or Clan Handle:', languageLabel: 'Language', placeholder: 'e.g. VIPER, MORTAL, JONATHAN, SOUL...' },
  hindi: { nicknameLabel: 'अपना निकनेम या क्लान हैंडल दर्ज करें:', languageLabel: 'भाषा', placeholder: 'जैसे शेर, योद्धा, सुल्तान...' },
  hinglish: { nicknameLabel: 'Apna Nickname ya Clan Handle likhein:', languageLabel: 'Bhasha', placeholder: 'jaise SHER, YODHA, SULTAN...' },
  spanish: { nicknameLabel: 'Escribe tu apodo o nombre de clan:', languageLabel: 'Idioma', placeholder: 'ej. LOBO, REY, SOMBRA...' },
  portuguese: { nicknameLabel: 'Digite seu nickname ou nome do clã:', languageLabel: 'Idioma', placeholder: 'ex. LOBO, REI, SOMBRA...' },
  indonesian: { nicknameLabel: 'Masukkan nickname atau nama klan:', languageLabel: 'Bahasa', placeholder: 'contoh: RAJA, NAGA, BADAI...' },
  french: { nicknameLabel: 'Entrez votre pseudo ou nom de clan :', languageLabel: 'Langue', placeholder: 'ex. LOUP, ROI, OMBRE...' },
  arabic: { nicknameLabel: 'أدخل اسم اللاعب أو اسم العشيرة:', languageLabel: 'اللغة', placeholder: 'مثال: صقر، أسد، فارس...' },
  arabic_latin: { nicknameLabel: 'Apna nickname ya clan handle likhein:', languageLabel: 'Zabaan', placeholder: 'misal: SAQR, ASAD, FARES...' },
  bengali: { nicknameLabel: 'আপনার নিকনেম বা ক্ল্যান হ্যান্ডেল লিখুন:', languageLabel: 'ভাষা', placeholder: 'যেমন: বাঘ, রাজা, বীর...' },
};

export function getLanguageUi(language: string): LanguageUiCopy {
  return LANGUAGE_UI[language] || LANGUAGE_UI.global;
}

export const GLOBAL_UI_COPY: Record<string, GlobalUiCopy> = {
  global: { languageLabel: 'Language', nameGenerator: 'Name Generator', idCardStudio: 'ID Card Studio', symbolsSpace: 'Symbols & Space', trendingNames: 'Trending Names', renameCardTest: 'Rename Card Test', favorites: 'Favorites', generator: 'Generator', searchGames: 'Search all games', selectCompatibility: 'Select Game Compatibility', popularIn: 'Popular in', regenerate: 'Regenerate', style: 'Style', decoration: 'Decoration', hybridEngine: 'Hybrid engine' },
  english: { languageLabel: 'Language', nameGenerator: 'Name Generator', idCardStudio: 'ID Card Studio', symbolsSpace: 'Symbols & Space', trendingNames: 'Trending Names', renameCardTest: 'Rename Card Test', favorites: 'Favorites', generator: 'Generator', searchGames: 'Search all games', selectCompatibility: 'Select Game Compatibility', popularIn: 'Popular in', regenerate: 'Regenerate', style: 'Style', decoration: 'Decoration', hybridEngine: 'Hybrid engine' },
  hindi: { languageLabel: 'भाषा', nameGenerator: 'नाम जनरेटर', idCardStudio: 'आईडी कार्ड स्टूडियो', symbolsSpace: 'सिंबल और स्पेस', trendingNames: 'ट्रेंडिंग नाम', renameCardTest: 'रिनेम कार्ड टेस्ट', favorites: 'पसंदीदा', generator: 'जनरेटर', searchGames: 'सभी गेम खोजें', selectCompatibility: 'गेम कम्पैटिबिलिटी चुनें', popularIn: 'में लोकप्रिय', regenerate: 'फिर से बनाएं', style: 'स्टाइल', decoration: 'डेकोरेशन', hybridEngine: 'हाइब्रिड इंजन' },
  hinglish: { languageLabel: 'Bhasha', nameGenerator: 'Name Generator', idCardStudio: 'ID Card Studio', symbolsSpace: 'Symbols & Space', trendingNames: 'Trending Names', renameCardTest: 'Rename Card Test', favorites: 'Favorites', generator: 'Generator', searchGames: 'Sabhi games search karein', selectCompatibility: 'Game Compatibility Chunein', popularIn: 'mein popular', regenerate: 'Phir se banayein', style: 'Style', decoration: 'Decoration', hybridEngine: 'Hybrid engine' },
  spanish: { languageLabel: 'Idioma', nameGenerator: 'Generador de nombres', idCardStudio: 'Estudio de tarjetas ID', symbolsSpace: 'Símbolos y espacio', trendingNames: 'Nombres en tendencia', renameCardTest: 'Prueba de tarjeta de cambio', favorites: 'Favoritos', generator: 'Generador', searchGames: 'Buscar juegos', selectCompatibility: 'Elegir compatibilidad del juego', popularIn: 'Popular en', regenerate: 'Regenerar', style: 'Estilo', decoration: 'Decoración', hybridEngine: 'Motor híbrido' },
  portuguese: { languageLabel: 'Idioma', nameGenerator: 'Gerador de nomes', idCardStudio: 'Estúdio de cartão ID', symbolsSpace: 'Símbolos e espaço', trendingNames: 'Nomes em alta', renameCardTest: 'Teste do cartão de troca', favorites: 'Favoritos', generator: 'Gerador', searchGames: 'Pesquisar jogos', selectCompatibility: 'Selecionar compatibilidade do jogo', popularIn: 'Popular em', regenerate: 'Gerar novamente', style: 'Estilo', decoration: 'Decoração', hybridEngine: 'Motor híbrido' },
  indonesian: { languageLabel: 'Bahasa', nameGenerator: 'Generator Nama', idCardStudio: 'Studio Kartu ID', symbolsSpace: 'Simbol & Spasi', trendingNames: 'Nama Tren', renameCardTest: 'Tes Kartu Ganti Nama', favorites: 'Favorit', generator: 'Generator', searchGames: 'Cari semua game', selectCompatibility: 'Pilih Kompatibilitas Game', popularIn: 'Populer di', regenerate: 'Buat ulang', style: 'Gaya', decoration: 'Dekorasi', hybridEngine: 'Mesin hibrida' },
  french: { languageLabel: 'Langue', nameGenerator: 'Générateur de noms', idCardStudio: 'Studio de carte ID', symbolsSpace: 'Symboles et espace', trendingNames: 'Noms tendance', renameCardTest: 'Test de carte de renommage', favorites: 'Favoris', generator: 'Générateur', searchGames: 'Rechercher des jeux', selectCompatibility: 'Choisir la compatibilité du jeu', popularIn: 'Populaire dans', regenerate: 'Régénérer', style: 'Style', decoration: 'Décoration', hybridEngine: 'Moteur hybride' },
  arabic: { languageLabel: 'اللغة', nameGenerator: 'مولد الأسماء', idCardStudio: 'استوديو بطاقة الهوية', symbolsSpace: 'الرموز والمسافات', trendingNames: 'الأسماء الرائجة', renameCardTest: 'اختبار بطاقة تغيير الاسم', favorites: 'المفضلة', generator: 'المولد', searchGames: 'ابحث عن الألعاب', selectCompatibility: 'اختر توافق اللعبة', popularIn: 'شائع في', regenerate: 'إنشاء من جديد', style: 'النمط', decoration: 'الزخرفة', hybridEngine: 'محرك هجين' },
  arabic_latin: { languageLabel: 'Zabaan', nameGenerator: 'Name Generator', idCardStudio: 'ID Card Studio', symbolsSpace: 'Symbols & Space', trendingNames: 'Trending Names', renameCardTest: 'Rename Card Test', favorites: 'Favorites', generator: 'Generator', searchGames: 'Sabhi games search karein', selectCompatibility: 'Game compatibility chunein', popularIn: 'mein mashhoor', regenerate: 'Dobara banayein', style: 'Style', decoration: 'Decoration', hybridEngine: 'Hybrid engine' },
  bengali: { languageLabel: 'ভাষা', nameGenerator: 'নাম জেনারেটর', idCardStudio: 'আইডি কার্ড স্টুডিও', symbolsSpace: 'সিম্বল ও স্পেস', trendingNames: 'ট্রেন্ডিং নাম', renameCardTest: 'রিনেম কার্ড টেস্ট', favorites: 'পছন্দের', generator: 'জেনারেটর', searchGames: 'সব গেম খুঁজুন', selectCompatibility: 'গেম সামঞ্জস্য বেছে নিন', popularIn: 'জনপ্রিয়', regenerate: 'আবার তৈরি করুন', style: 'স্টাইল', decoration: 'ডেকোরেশন', hybridEngine: 'হাইব্রিড ইঞ্জিন' },
};

export function getGlobalUi(language: string): GlobalUiCopy {
  return GLOBAL_UI_COPY[language] || GLOBAL_UI_COPY.global;
}
