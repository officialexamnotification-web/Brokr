export interface LanguageUiCopy {
  nicknameLabel: string;
  languageLabel: string;
  placeholder: string;
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
