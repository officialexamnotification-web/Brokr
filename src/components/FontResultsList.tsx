import React, { useState, useMemo } from 'react';
import { FONT_TRANSFORMATIONS } from '../data/fonts';
import { FontTransformation, GameProfile, SavedNameItem } from '../types';
import { Copy, Check, Heart, ExternalLink, ShieldCheck, AlertCircle, Sparkles, CreditCard, Search } from 'lucide-react';
import { countCharacters } from '../lib/character-count';
import { isCleanGamertagGame } from '../lib/game-mode';
import { toPasteReadyName } from '../lib/paste-safe';

const CLEAN_NAME_CARD: FontTransformation = {
  id: 'clean-name',
  name: 'Clean text',
  category: 'minimal',
  transform: (text) => text,
  badge: 'Platform-safe candidate',
  gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
};

interface FontResultsListProps {
  inputText: string;
  selectedGame: GameProfile;
  onCopyText: (text: string) => void;
  onSaveName: (name: string) => void;
  onPreviewCard: (name: string) => void;
  onTestInGame?: (name: string) => void;
  savedNames: SavedNameItem[];
  onlyWorkingInGame: boolean;
}

export const FontResultsList: React.FC<FontResultsListProps> = ({
  inputText,
  selectedGame,
  onCopyText,
  onSaveName,
  onPreviewCard,
  onTestInGame,
  savedNames,
  onlyWorkingInGame,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayText = inputText.trim() || 'WARRIOR';

  const categories = [
    { id: 'all', label: 'All Styles' },
    { id: 'esports', label: 'Esports Pro' },
    { id: 'gothic', label: 'Gothic & Dark' },
    { id: 'aesthetic', label: 'Aesthetic / Duo' },
    { id: 'boxed', label: 'Clan Brackets' },
    { id: 'minimal', label: 'Tactical Minimal' },
    { id: 'funky', label: 'Glitch / Matrix' },
  ];

  // Map selected game to compatibility key
  const getGameKey = (gameId: string): 'bgmi' | 'freeFire' | 'valorant' | 'cod' => {
    if (gameId === 'bgmi' || gameId === 'pubg') return 'bgmi';
    if (gameId === 'freefire') return 'freeFire';
    if (gameId === 'valorant' || gameId === 'cs2') return 'valorant';
    return 'cod';
  };

  const gameKey = getGameKey(selectedGame.id);
  const cleanMode = isCleanGamertagGame(selectedGame.id) && onlyWorkingInGame;
  const cleanDisplayText = displayText.normalize('NFKC').replace(/[^\p{L}\p{N} _-]/gu, '').trim() || 'PLAYER';

  const filteredFonts = useMemo(() => {
    if (cleanMode) return [CLEAN_NAME_CARD];
    return FONT_TRANSFORMATIONS.filter((font) => {
      if (onlyWorkingInGame && font.gameCompatibility) {
        if (font.gameCompatibility[gameKey] === false) return false;
      }
      if (selectedCategory !== 'all' && font.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = font.name.toLowerCase().includes(q);
        const matchesCat = font.category.toLowerCase().includes(q);
        const matchesBadge = font.badge?.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesBadge) return false;
      }
      return true;
    });
  }, [cleanMode, onlyWorkingInGame, gameKey, selectedCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    onCopyText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const isSaved = (name: string) => savedNames.some((s) => s.name === name);

  return (
    <div className="w-full space-y-4">
      {/* Category Pills & Search Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#080d1a] p-3 sm:p-4 rounded-2xl border border-slate-800/90 shadow-md">
        {/* Category Pills */}
        {cleanMode ? (
          <div className="rounded-lg border border-emerald-800/60 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-300">
            Clean text only — safer default for this platform identity
          </div>
        ) : (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 font-black'
                    : 'bg-[#050811] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Search in styles + count */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search styles (e.g. wings)..."
              className="w-full bg-[#050811] text-xs text-white pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 focus:border-amber-400 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono font-bold whitespace-nowrap px-2 py-1 rounded bg-[#050811] border border-slate-800">
            {cleanMode ? '1 clean style' : `${filteredFonts.length} styles`}
          </span>
        </div>
      </div>

      {/* Grid of Generated Font Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredFonts.map((font) => {
          const transformedName = cleanMode ? cleanDisplayText : font.transform(displayText);
          const isCopied = copiedId === font.id;
          const saved = isSaved(transformedName);
          const charLength = countCharacters(transformedName);
          const exceedsLimit = selectedGame.maxChars !== null && charLength > selectedGame.maxChars;
          const isGameCompatible = font.gameCompatibility ? font.gameCompatibility[gameKey] : true;
          const pasteReadyName = toPasteReadyName(transformedName, selectedGame.maxChars);

          return (
            <div
              key={font.id}
              className={`group relative bg-[#090d1a] hover:bg-[#0c1224] p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-lg flex flex-col justify-between gap-3 ${
                exceedsLimit || !isGameCompatible
                  ? 'border-slate-800/80 hover:border-slate-700'
                  : 'border-slate-800/90 hover:border-amber-500/50 hover:shadow-amber-500/5'
              }`}
            >
              {/* Header inside card: Style Name & Game Engine Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-slate-300">
                    {font.name}
                  </span>
                  {font.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {font.badge}
                    </span>
                  )}
                  {/* The local matrix is a heuristic candidate list, not live-client proof. */}
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold flex items-center gap-1 ${
                      isGameCompatible
                        ? 'text-emerald-300 bg-emerald-950/30 border border-emerald-800/50'
                        : 'text-amber-300 bg-amber-950/40 border border-amber-800/60'
                    }`}
                    title="Candidate based on the local matrix; test in the current game client"
                  >
                    {isGameCompatible ? <ShieldCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {isGameCompatible ? 'Candidate' : 'Test'}
                  </span>
                </div>

                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                    exceedsLimit
                      ? 'bg-red-950/80 text-red-400 border-red-800'
                      : 'bg-[#050811] text-slate-400 border-slate-800'
                  }`}
                  title={
                    exceedsLimit
                      ? `Exceeds ${selectedGame.shortName} working limit (${selectedGame.maxChars} chars)`
                      : selectedGame.maxChars === null
                      ? `${selectedGame.shortName} limit not verified`
                      : `Fits ${selectedGame.shortName} working limit`
                  }
                >
                  {charLength}c
                </span>
              </div>

              {/* Main Transformed Text Display */}
              <div className="py-3 px-3.5 rounded-xl bg-[#050811] border border-slate-800/80 flex items-center justify-between overflow-x-auto no-scrollbar group-hover:border-slate-700 transition-colors">
                <p className="text-base sm:text-lg font-subgaming font-bold text-white tracking-wide select-all whitespace-nowrap">
                  {transformedName}
                </p>
              </div>

              {/* Action Buttons: Copy, Save, Card Preview, Test In-Game */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  {pasteReadyName !== transformedName && (
                    <button
                      onClick={() => handleCopy(`safe-${font.id}`, pasteReadyName)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border ${copiedId === `safe-${font.id}` ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-emerald-950/30 text-emerald-300 border-emerald-800/60 hover:bg-emerald-500 hover:text-black'}`}
                      title="Copy a clean letters-and-numbers version for easier in-game paste"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>{copiedId === `safe-${font.id}` ? 'Safe Copied' : 'Safe Copy'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => onPreviewCard(transformedName)}
                    className="text-xs text-slate-400 hover:text-amber-400 px-2 py-1 rounded-md hover:bg-slate-800/50 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Preview in Gamer ID Card"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Card</span>
                  </button>

                  {onTestInGame && (
                    <button
                      onClick={() => onTestInGame(transformedName)}
                      className="text-xs text-slate-400 hover:text-cyan-400 px-2 py-1 rounded-md hover:bg-slate-800/50 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Test in Game Rename Card Simulator"
                    >
                      <CreditCard className="w-3 h-3 text-cyan-400" />
                      <span>Test</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSaveName(transformedName)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      saved
                        ? 'bg-red-950/60 border-red-700 text-red-400'
                        : 'bg-[#050811] border-slate-800 text-slate-400 hover:text-red-400 hover:border-slate-700'
                    }`}
                    title={saved ? 'Remove from Saved' : 'Save to Favorites'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${saved ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>

                  <button
                    onClick={() => handleCopy(font.id, transformedName)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-black font-black'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black shadow-sm'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
