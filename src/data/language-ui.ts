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
  global: { nicknameLabel: 'Enter Your Nickname or Clan Handle:', languageLabel: 'Language', placeholder: 'Type your own name or clan tag...' },
  english: { nicknameLabel: 'Enter Your Nickname or Clan Handle:', languageLabel: 'Language', placeholder: 'Type your own name or clan tag...' },
  hindi: { nicknameLabel: 'अपना निकनेम या क्लान हैंडल दर्ज करें:', languageLabel: 'भाषा', placeholder: 'जैसे शेर, योद्धा, सुल्तान...' },
  hinglish: { nicknameLabel: 'Apna Nickname ya Clan Handle likhein:', languageLabel: 'Bhasha', placeholder: 'jaise SHER, YODHA, SULTAN...' },
  spanish: { nicknameLabel: 'Escribe tu apodo o nombre de clan:', languageLabel: 'Idioma', placeholder: 'ej. LOBO, REY, SOMBRA...' },
  portuguese: { nicknameLabel: 'Digite seu nickname ou nome do clã:', languageLabel: 'Idioma', placeholder: 'ex. LOBO, REI, SOMBRA...' },
  indonesian: { nicknameLabel: 'Masukkan nickname atau nama klan:', languageLabel: 'Bahasa', placeholder: 'contoh: RAJA, NAGA, BADAI...' },
  french: { nicknameLabel: 'Entrez votre pseudo ou nom de clan :', languageLabel: 'Langue', placeholder: 'ex. LOUP, ROI, OMBRE...' },
  arabic: { nicknameLabel: 'أدخل اسم اللاعب أو اسم العشيرة:', languageLabel: 'اللغة', placeholder: 'مثال: صقر، أسد، فارس...' },
  arabic_latin: { nicknameLabel: 'Apna nickname ya clan handle likhein:', languageLabel: 'Zabaan', placeholder: 'misal: SAQR, ASAD, FARES...' },
  bengali: { nicknameLabel: 'আপনার নিকনেম বা ক্ল্যান হ্যান্ডেল লিখুন:', languageLabel: 'ভাষা', placeholder: 'যেমন: বাঘ, রাজা, বীর...' },
  japanese: { nicknameLabel: 'ニックネームまたはクラン名を入力:', languageLabel: '言語', placeholder: '例: サムライ、ドラゴン...' },
  korean: { nicknameLabel: '닉네임 또는 클랜 핸들을 입력하세요:', languageLabel: '언어', placeholder: '예: 전사, 그림자...' },
  chinese_simplified: { nicknameLabel: '输入你的昵称或战队名称:', languageLabel: '语言', placeholder: '例如：战神、龙王...' },
  chinese_traditional: { nicknameLabel: '輸入你的暱稱或戰隊名稱:', languageLabel: '語言', placeholder: '例如：戰神、龍王...' },
  vietnamese: { nicknameLabel: 'Nhập biệt danh hoặc tên clan:', languageLabel: 'Ngôn ngữ', placeholder: 'ví dụ: Sói, Vua, Bóng tối...' },
  thai: { nicknameLabel: 'ใส่ชื่อเล่นหรือชื่อแคลนของคุณ:', languageLabel: 'ภาษา', placeholder: 'เช่น นักรบ ราชา...' },
  russian: { nicknameLabel: 'Введите никнейм или название клана:', languageLabel: 'Язык', placeholder: 'например: Воин, Тень...' },
  filipino: { nicknameLabel: 'Ilagay ang iyong nickname o clan handle:', languageLabel: 'Wika', placeholder: 'hal. Mandirigma, Hari...' },
  malay: { nicknameLabel: 'Masukkan nama samaran atau nama klan:', languageLabel: 'Bahasa', placeholder: 'contoh: Wira, Raja...' },
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
  japanese: { languageLabel: '言語', nameGenerator: '名前ジェネレーター', idCardStudio: 'IDカード', symbolsSpace: '記号とスペース', trendingNames: '人気の名前', renameCardTest: '名前変更テスト', favorites: 'お気に入り', generator: 'ジェネレーター', searchGames: 'ゲームを検索', selectCompatibility: 'ゲームを選択', popularIn: '人気地域', regenerate: '再生成', style: 'スタイル', decoration: '装飾', hybridEngine: 'ハイブリッドエンジン' },
  korean: { languageLabel: '언어', nameGenerator: '이름 생성기', idCardStudio: 'ID 카드 스튜디오', symbolsSpace: '기호 및 공백', trendingNames: '인기 이름', renameCardTest: '이름 변경 테스트', favorites: '즐겨찾기', generator: '생성기', searchGames: '게임 검색', selectCompatibility: '게임 선택', popularIn: '인기 지역', regenerate: '다시 생성', style: '스타일', decoration: '장식', hybridEngine: '하이브리드 엔진' },
  chinese_simplified: { languageLabel: '语言', nameGenerator: '名字生成器', idCardStudio: 'ID 卡工作室', symbolsSpace: '符号和空格', trendingNames: '热门名字', renameCardTest: '改名测试', favorites: '收藏', generator: '生成器', searchGames: '搜索游戏', selectCompatibility: '选择游戏', popularIn: '热门地区', regenerate: '重新生成', style: '风格', decoration: '装饰', hybridEngine: '混合引擎' },
  chinese_traditional: { languageLabel: '語言', nameGenerator: '名字產生器', idCardStudio: 'ID 卡工作室', symbolsSpace: '符號與空格', trendingNames: '熱門名字', renameCardTest: '改名測試', favorites: '收藏', generator: '產生器', searchGames: '搜尋遊戲', selectCompatibility: '選擇遊戲', popularIn: '熱門地區', regenerate: '重新產生', style: '風格', decoration: '裝飾', hybridEngine: '混合引擎' },
  vietnamese: { languageLabel: 'Ngôn ngữ', nameGenerator: 'Trình tạo tên', idCardStudio: 'Studio thẻ ID', symbolsSpace: 'Ký hiệu & khoảng trắng', trendingNames: 'Tên thịnh hành', renameCardTest: 'Kiểm tra đổi tên', favorites: 'Yêu thích', generator: 'Trình tạo', searchGames: 'Tìm game', selectCompatibility: 'Chọn game', popularIn: 'Phổ biến tại', regenerate: 'Tạo lại', style: 'Phong cách', decoration: 'Trang trí', hybridEngine: 'Động cơ kết hợp' },
  thai: { languageLabel: 'ภาษา', nameGenerator: 'เครื่องสร้างชื่อ', idCardStudio: 'สตูดิโอ ID', symbolsSpace: 'สัญลักษณ์และช่องว่าง', trendingNames: 'ชื่อยอดนิยม', renameCardTest: 'ทดสอบเปลี่ยนชื่อ', favorites: 'รายการโปรด', generator: 'เครื่องสร้าง', searchGames: 'ค้นหาเกม', selectCompatibility: 'เลือกเกม', popularIn: 'เป็นที่นิยมใน', regenerate: 'สร้างใหม่', style: 'สไตล์', decoration: 'ตกแต่ง', hybridEngine: 'เอนจินไฮบริด' },
  russian: { languageLabel: 'Язык', nameGenerator: 'Генератор имён', idCardStudio: 'Студия ID-карт', symbolsSpace: 'Символы и пробелы', trendingNames: 'Популярные имена', renameCardTest: 'Тест смены имени', favorites: 'Избранное', generator: 'Генератор', searchGames: 'Поиск игр', selectCompatibility: 'Выберите игру', popularIn: 'Популярно в', regenerate: 'Создать снова', style: 'Стиль', decoration: 'Оформление', hybridEngine: 'Гибридный движок' },
  filipino: { languageLabel: 'Wika', nameGenerator: 'Tagagawa ng pangalan', idCardStudio: 'ID Card Studio', symbolsSpace: 'Simbolo at space', trendingNames: 'Mga trending na pangalan', renameCardTest: 'Pagsubok sa pagpapalit ng pangalan', favorites: 'Mga paborito', generator: 'Tagagawa', searchGames: 'Maghanap ng game', selectCompatibility: 'Pumili ng game', popularIn: 'Sikat sa', regenerate: 'Gumawa ulit', style: 'Style', decoration: 'Dekorasyon', hybridEngine: 'Hybrid engine' },
  malay: { languageLabel: 'Bahasa', nameGenerator: 'Penjana Nama', idCardStudio: 'Studio Kad ID', symbolsSpace: 'Simbol & ruang', trendingNames: 'Nama sohor', renameCardTest: 'Ujian tukar nama', favorites: 'Kegemaran', generator: 'Penjana', searchGames: 'Cari permainan', selectCompatibility: 'Pilih permainan', popularIn: 'Popular di', regenerate: 'Jana semula', style: 'Gaya', decoration: 'Hiasan', hybridEngine: 'Enjin hibrid' },
};

export function getGlobalUi(language: string): GlobalUiCopy {
  return GLOBAL_UI_COPY[language] || GLOBAL_UI_COPY.global;
}
