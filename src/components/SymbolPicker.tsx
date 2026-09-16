import React, { useState } from 'react';
import { SYMBOL_CATEGORIES, POPULAR_PREFIXES, POPULAR_SUFFIXES } from '../data/symbols';
import { 
  Search, Copy, Check, Sparkles, Sword, Crown, Feather, Zap, 
  Skull, Crosshair, Flame, Shield, Heart, Hash, Layers
} from 'lucide-react';

interface SymbolPickerProps {
  onCopySymbol: (symbol: string) => void;
  onInsertSymbol: (symbol: string) => void;
}

export const SymbolPicker: React.FC<SymbolPickerProps> = ({
  onCopySymbol,
  onInsertSymbol,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clickAction, setClickAction] = useState<'copy' | 'insert'>('copy');
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  // Map category icons
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'weapons': return <Sword className="w-3.5 h-3.5" />;
      case 'crowns': return <Crown className="w-3.5 h-3.5" />;
      case 'wings': return <Feather className="w-3.5 h-3.5" />;
      case 'stars': return <Zap className="w-3.5 h-3.5" />;
      case 'skulls': return <Skull className="w-3.5 h-3.5" />;
      case 'crosshairs': return <Crosshair className="w-3.5 h-3.5" />;
      case 'kanji': return <Flame className="w-3.5 h-3.5" />;
      case 'clan': return <Shield className="w-3.5 h-3.5" />;
      case 'aesthetic': return <Heart className="w-3.5 h-3.5" />;
      case 'numbers': return <Hash className="w-3.5 h-3.5" />;
      default: return <Layers className="w-3.5 h-3.5" />;
    }
  };

  const handleSymbolClick = (sym: string) => {
    if (clickAction === 'copy') {
      onCopySymbol(sym);
      setCopiedSymbol(sym);
      setTimeout(() => setCopiedSymbol(null), 1500);
    } else {
      onInsertSymbol(sym);
      setCopiedSymbol(sym);
      setTimeout(() => setCopiedSymbol(null), 800);
    }
  };

  // Filter symbols based on category and search
  const filteredCategories = SYMBOL_CATEGORIES.filter((cat) => {
    if (activeCategory === 'all') return true;
    return cat.id === activeCategory;
  });

  const allFilteredSymbols = filteredCategories.flatMap((cat) =>
    cat.symbols.filter((sym) => {
      if (!searchQuery.trim()) return true;
      return (
        sym.includes(searchQuery.trim()) ||
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
  );

  // Deduplicate
  const uniqueSymbols = Array.from(new Set(allFilteredSymbols));

  return (
    <div className="w-full space-y-5">
      {/* Header & Controls */}
      <div className="bg-[#0d1322] p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-gaming font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">亗</span>
              Gamer Symbols & Japanese Glyphs
            </h2>
            <p className="text-xs text-slate-400">
              One-click copy Unicode symbols with per-game testing guidance
            </p>
          </div>

          {/* Action Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-700/80 self-start sm:self-auto">
            <button
              onClick={() => setClickAction('copy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                clickAction === 'copy'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Click Copy
            </button>
            <button
              onClick={() => setClickAction('insert')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                clickAction === 'insert'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Insert into Input
            </button>
          </div>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symbol (crown, sword, wing...)"
              className="w-full bg-[#070b14] text-xs sm:text-sm text-white pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full no-scrollbar py-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All ({SYMBOL_CATEGORIES.reduce((acc, c) => acc + c.symbols.length, 0)})
            </button>

            {SYMBOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.id)}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Popular Brackets Bar */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">Quick Frames:</span>
            {['꧁༺ ༻꧂', '亗 亗', '★彡 彡★', 'ঔৣ☬✞ ✞☬ঔৣ', '╰‿╯ ╰‿╯', '𓆩♡𓆪', '『 』', '【 】'].map(
              (frame, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSymbolClick(frame)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-amber-500/20 text-amber-300 border border-slate-700/80 hover:border-amber-500/40 text-xs font-mono transition-colors cursor-pointer"
                >
                  {frame}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Symbols Grid */}
      <div className="bg-[#0b0f19] p-4 sm:p-6 rounded-2xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Showing {uniqueSymbols.length} Symbols • Tap to {clickAction === 'copy' ? 'Copy' : 'Insert'}
          </span>

          {copiedSymbol && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              {clickAction === 'copy' ? `Copied "${copiedSymbol}"` : `Inserted "${copiedSymbol}"`}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-14 gap-2.5 sm:gap-3">
          {uniqueSymbols.map((sym, idx) => {
            const isJustCopied = copiedSymbol === sym;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSymbolClick(sym)}
                className={`group relative h-14 sm:h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
                  isJustCopied
                    ? 'bg-emerald-500 text-black border-emerald-400 scale-105 shadow-md shadow-emerald-500/20'
                    : 'bg-[#0e1424] hover:bg-slate-800 text-white border-slate-800 hover:border-amber-400/60 hover:scale-105 shadow-sm'
                }`}
                title={`Click to ${clickAction}: ${sym}`}
              >
                <span className="text-xl sm:text-2xl select-none transition-transform group-hover:scale-110">
                  {sym}
                </span>

                <span className="text-[10px] text-slate-500 group-hover:text-amber-300 font-mono mt-0.5">
                  {isJustCopied ? 'Done!' : clickAction}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
