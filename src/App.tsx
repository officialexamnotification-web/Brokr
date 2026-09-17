import React, { useState, useEffect } from 'react';
import { GameProfile, SavedNameItem } from './types';
import { POPULAR_GAMES } from './data/games';
import { getGameBySlug, getGameSeo, HOME_SEO } from './data/game-seo';
import { applySeo } from './lib/seo';
import { getGameNameMode } from './lib/game-mode';
import { copyTextToClipboard } from './lib/clipboard';
import { Header } from './components/Header';
import { GameSelector } from './components/GameSelector';
import { NameInputStyler } from './components/NameInputStyler';
import { FontResultsList } from './components/FontResultsList';
import { BackendNameIdeas } from './components/BackendNameIdeas';
import { SymbolPicker } from './components/SymbolPicker';
import { NameBuilderStudio } from './components/NameBuilderStudio';
import { TrendingNames } from './components/TrendingNames';
import { SavedNamesDrawer } from './components/SavedNamesDrawer';
import { CardPreviewModal } from './components/CardPreviewModal';
import { RenameSimulatorModal } from './components/RenameSimulatorModal';
import { KillFeedSimulator } from './components/KillFeedSimulator';
import { InvisibleSpaceGenerator } from './components/InvisibleSpaceGenerator';
import { Toast } from './components/Toast';
import { GameSeoSection } from './components/GameSeoSection';
import { 
  Gamepad2, Sparkles, Shield, Trophy, Flame, 
  HelpCircle, CheckCircle, Info, Star, Crosshair, Cpu 
} from 'lucide-react';

function gameFromCurrentPath() {
  const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return slug ? getGameBySlug(slug) : undefined;
}

export default function App() {
  const initialRouteGame = gameFromCurrentPath();
  const [activeTab, setActiveTab] = useState<'generator' | 'symbols' | 'studio' | 'trending'>('generator');
  const [nameInput, setNameInput] = useState<string>('VIPER');
  const [nameHistory, setNameHistory] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>(() => {
    try {
      return localStorage.getItem('gamingnamehub_language') || 'global';
    } catch {
      return 'global';
    }
  });
  const [selectedGame, setSelectedGame] = useState<GameProfile>(initialRouteGame || POPULAR_GAMES[0]);
  const [routeGameId, setRouteGameId] = useState<string | null>(initialRouteGame?.id || null);
  const [onlyWorkingInGame, setOnlyWorkingInGame] = useState<boolean>(initialRouteGame ? getGameNameMode(initialRouteGame.id) === 'clean' : false);
  const [savedNames, setSavedNames] = useState<SavedNameItem[]>(() => {
    try {
      const saved = localStorage.getItem('nickzone_saved_names');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cardPreviewName, setCardPreviewName] = useState<string | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isRenameSimulatorOpen, setIsRenameSimulatorOpen] = useState<boolean>(false);
  const [renameTestName, setRenameTestName] = useState<string>('VIPER');

  useEffect(() => {
    const handlePopState = () => {
      const nextGame = gameFromCurrentPath();
      setSelectedGame(nextGame || POPULAR_GAMES[0]);
      setRouteGameId(nextGame?.id || null);
      setOnlyWorkingInGame(nextGame ? getGameNameMode(nextGame.id) === 'clean' : false);
      setActiveTab('generator');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    applySeo(routeGameId ? getGameSeo(selectedGame) : HOME_SEO, routeGameId ? selectedGame : undefined);
  }, [routeGameId, selectedGame]);

  useEffect(() => {
    try {
      localStorage.setItem('gamingnamehub_language', language);
    } catch {
      // ignore unavailable browser storage
    }
  }, [language]);

  useEffect(() => {
    const languageCodes: Record<string, string> = {
      global: 'en', english: 'en', hindi: 'hi', hinglish: 'en-IN', spanish: 'es',
      portuguese: 'pt-BR', indonesian: 'id', french: 'fr', arabic: 'ar',
      arabic_latin: 'en', bengali: 'bn',
    };
    document.documentElement.lang = languageCodes[language] || 'en';
    document.documentElement.dir = language === 'arabic' ? 'rtl' : 'ltr';
  }, [language]);

  // Sync saved names to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nickzone_saved_names', JSON.stringify(savedNames));
    } catch {
      // ignore
    }
  }, [savedNames]);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage((curr) => (curr === text ? null : curr));
    }, 2500);
  };

  const handleCopyText = (text: string) => {
    void copyTextToClipboard(text).then((copied) => {
      showToast(copied ? `Copied "${text}"` : 'Copy was blocked. Long-press the name and choose Copy.');
    });
  };

  const handleSaveName = (name: string) => {
    setSavedNames((prev) => {
      const exists = prev.find((item) => item.name === name);
      if (exists) {
        showToast(`Removed from favorites`);
        return prev.filter((item) => item.name !== name);
      } else {
        showToast(`Saved "${name}" to favorites`);
        return [
          {
            id: `fav-${Date.now()}-${Math.random()}`,
            name,
            game: selectedGame.shortName.toLowerCase(),
            addedAt: Date.now(),
          },
          ...prev,
        ];
      }
    });
  };

  const handleRemoveSavedName = (id: string) => {
    setSavedNames((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearSavedNames = () => {
    setSavedNames([]);
    showToast('Cleared all saved nicknames');
  };

  const replaceNameInput = (nextValue: string) => {
    const input = document.getElementById('nickname-input') as HTMLInputElement | null;
    const previousValue = input?.value ?? nameInput;
    if (previousValue === nextValue) return;
    setNameHistory((history) => [...history.slice(-19), previousValue]);
    setNameInput(nextValue);
  };

  const handleInsertSymbol = (symbol: string) => {
    const input = document.getElementById('nickname-input') as HTMLInputElement | null;
    const currentValue = input?.value ?? nameInput;
    const start = input?.selectionStart ?? currentValue.length;
    const end = input?.selectionEnd ?? currentValue.length;
    const nextValue = currentValue.slice(0, start) + symbol + currentValue.slice(end);
    replaceNameInput(nextValue);
    window.requestAnimationFrame(() => {
      const activeInput = document.getElementById('nickname-input') as HTMLInputElement | null;
      if (!activeInput) return;
      const cursor = start + symbol.length;
      activeInput.focus();
      activeInput.setSelectionRange(cursor, cursor);
    });
    showToast(`Inserted "${symbol}"`);
  };

  const handleUndoName = () => {
    const previousValue = nameHistory[nameHistory.length - 1];
    if (previousValue === undefined) return;
    setNameInput(previousValue);
    setNameHistory((history) => history.slice(0, -1));
    showToast('Undid the last name edit');
  };

  const handleOpenRenameCard = (nameToTest?: string) => {
    setRenameTestName(nameToTest || nameInput || 'VIPER');
    setIsRenameSimulatorOpen(true);
  };

  const handleHome = () => {
    if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
    setSelectedGame(POPULAR_GAMES[0]);
    setRouteGameId(null);
    setOnlyWorkingInGame(false);
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (game: GameProfile) => {
    window.history.pushState({}, '', `/${game.slug}`);
    setSelectedGame(game);
    setRouteGameId(game.id);
    setOnlyWorkingInGame(getGameNameMode(game.id) === 'clean');
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050811] text-slate-100 antialiased selection:bg-amber-500 selection:text-black bg-cyber-grid">
      {/* Top Esports Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedNames.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenRenameSimulator={() => handleOpenRenameCard(nameInput)}
        onHome={handleHome}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Game Selector Bar */}
        <section>
          <GameSelector
            selectedGame={selectedGame}
            onSelectGame={handleSelectGame}
            language={language}
          />
        </section>

        <GameSeoSection
          game={selectedGame}
          seo={routeGameId ? getGameSeo(selectedGame) : HOME_SEO}
          isHome={!routeGameId}
        />

        {/* Tab 1: Font Generator */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            {/* 1. Name Input & Character Counter with 1-Click Quick Glyphs */}
            <NameInputStyler
              nameInput={nameInput}
              setNameInput={setNameInput}
              selectedGame={selectedGame}
              onQuickSymbolClick={(sym) => handleInsertSymbol(sym)}
              onReplaceName={replaceNameInput}
              onUndo={handleUndoName}
              canUndo={nameHistory.length > 0}
              onlyWorkingInGame={onlyWorkingInGame}
              setOnlyWorkingInGame={setOnlyWorkingInGame}
              language={language}
              setLanguage={setLanguage}
            />

            {/* 2. Transformed Fonts List with Game Engine Compatibility */}
            <FontResultsList
              inputText={nameInput}
              selectedGame={selectedGame}
              onCopyText={handleCopyText}
              onSaveName={handleSaveName}
              onPreviewCard={(name) => setCardPreviewName(name)}
              onTestInGame={(name) => handleOpenRenameCard(name)}
              savedNames={savedNames}
              onlyWorkingInGame={onlyWorkingInGame}
            />

            {/* Shared backend generator: language pools, decorations and game rules */}
            <BackendNameIdeas
              keyword={nameInput}
              selectedGame={selectedGame}
              language={language}
              setLanguage={setLanguage}
              conservative={onlyWorkingInGame}
              onCopyText={handleCopyText}
              onSaveName={handleSaveName}
            />

            {/* 3. Game-inspired kill feed simulator */}
            <KillFeedSimulator
              playerName={nameInput}
              selectedGame={selectedGame}
              onCopyText={handleCopyText}
            />

            {/* Quick Links to Studio */}
            <div className="grid grid-cols-1 gap-4 pt-1">
              <div
                onClick={() => setActiveTab('studio')}
                className="p-4 sm:p-5 rounded-2xl bg-[#090d1a] border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex items-center justify-between shadow-lg"
              >
                <div>
                  <h4 className="font-gaming font-bold text-white text-sm sm:text-base group-hover:text-amber-400 transition-colors flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    Gamer Profile ID Card Studio
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Assemble clan prefixes, duo hearts, and test on BGMI, Free Fire & Valorant banners
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform ml-2">
                  Launch →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Symbols Library */}
        {activeTab === 'symbols' && (
          <div className="space-y-6">
            <InvisibleSpaceGenerator onCopyText={handleCopyText} />
            <SymbolPicker
              onCopySymbol={handleCopyText}
              onInsertSymbol={handleInsertSymbol}
            />
          </div>
        )}

        {/* Tab 3: Card Decorator Studio */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            <NameBuilderStudio
              initialName={nameInput}
              selectedGame={selectedGame}
              onCopyText={handleCopyText}
            />
            <KillFeedSimulator
              playerName={nameInput}
              selectedGame={selectedGame}
              onCopyText={handleCopyText}
            />
          </div>
        )}

        {/* Tab 4: Trending Names */}
        {activeTab === 'trending' && (
          <TrendingNames
            onCopyText={handleCopyText}
            onSaveName={handleSaveName}
            selectedGame={selectedGame}
          />
        )}

        {/* Game Engine Compatibility & Quick Verification Guide */}
        <section className="bg-[#080d1a] p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-gaming font-bold text-sm sm:text-base text-white">
                  Compatibility Audit & Rules Matrix
                </h3>
                <p className="text-[11px] text-slate-400">
                  Byte limits and font compatibility overview for competitive game titles
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
              Source audit / test status
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-[#050811] border border-slate-800/80 space-y-1.5">
              <h5 className="font-gaming font-bold text-amber-300 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                BGMI & PUBG Mobile
              </h5>
              <p className="text-[11px]">
                Uses a <strong>14-character working limit</strong> in this tool. Common clan glyphs are marked as <strong>test recommended</strong> because support can vary by update and client.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#050811] border border-slate-800/80 space-y-1.5">
              <h5 className="font-gaming font-bold text-red-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                Free Fire & FF MAX
              </h5>
              <p className="text-[11px]">
                Uses a <strong>12-character working limit</strong>. Whitespace and decorative Unicode may be rejected, so the clean-name mode is the conservative option.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#050811] border border-slate-800/80 space-y-1.5">
              <h5 className="font-gaming font-bold text-cyan-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Valorant & Riot ID
              </h5>
              <p className="text-[11px]">
                Uses a <strong>16-character display-name working limit</strong>. Clean Latin output is the conservative option; decorative glyphs still need a current Riot client test.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Site Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#04060d] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_2fr]">
            <div className="max-w-sm">
              <a href="/" className="inline-flex items-center gap-3" aria-label="GamingNameHub home">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10"><Gamepad2 className="h-5 w-5" /></span>
                <span className="font-gaming text-sm font-black text-white">GAMING<span className="text-amber-400">NAME</span>HUB</span>
              </a>
              <p className="mt-4 text-xs leading-5 text-slate-400">Game-aware name ideas, stylish nicknames and clean gamertags for popular games and platforms.</p>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                GamingNameHub is an independent name-generation tool and is not affiliated with any game publisher or platform. Always test the final name in the current client.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
              <div><h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-400">Explore</h3><nav className="grid gap-2.5 text-xs text-slate-400"><a className="hover:text-white transition-colors" href="/supported-games">Supported Games</a><a className="hover:text-white transition-colors" href="/faq">FAQ</a><a className="hover:text-white transition-colors" href="/contact">Contact</a></nav></div>
              <div><h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-400">GamingNameHub</h3><nav className="grid gap-2.5 text-xs text-slate-400"><a className="hover:text-white transition-colors" href="/about">About Us</a><a className="hover:text-white transition-colors" href="/disclaimer">Disclaimer</a><a className="hover:text-white transition-colors" href="/dmca">Copyright / DMCA</a></nav></div>
              <div><h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-400">Legal</h3><nav className="grid gap-2.5 text-xs text-slate-400"><a className="hover:text-white transition-colors" href="/privacy-policy">Privacy Policy</a><a className="hover:text-white transition-colors" href="/terms-of-use">Terms of Use</a><a className="hover:text-white transition-colors" href="/cookie-policy">Cookie Policy</a></nav></div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-slate-800/80 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 GamingNameHub. All rights reserved.</p><p>Names are suggestions; support depends on the current game or platform.</p>
          </div>
        </div>
      </footer>

      {/* Slide-out Favorites Drawer */}
      <SavedNamesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedNames={savedNames}
        onRemoveName={handleRemoveSavedName}
        onClearAll={handleClearSavedNames}
        onCopyText={handleCopyText}
      />

      {/* Card Preview Modal */}
      <CardPreviewModal
        name={cardPreviewName}
        onClose={() => setCardPreviewName(null)}
        defaultGame={selectedGame}
        onCopyText={handleCopyText}
      />

      {/* In-Game Rename Card Simulator Modal */}
      <RenameSimulatorModal
        isOpen={isRenameSimulatorOpen}
        onClose={() => setIsRenameSimulatorOpen(false)}
        initialName={renameTestName}
        selectedGame={selectedGame}
        onCopyText={handleCopyText}
      />

      {/* Tactile Copy Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
