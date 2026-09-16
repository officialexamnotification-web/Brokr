import React, { useState } from 'react';
import { CuratedName, GameProfile } from '../types';
import { CURATED_GAMER_NAMES } from '../data/curatedNames';
import { Flame, Copy, Check, Heart, Search, Filter, Trophy, Sparkles } from 'lucide-react';

interface TrendingNamesProps {
  onCopyText: (text: string) => void;
  onSaveName: (name: string) => void;
  selectedGame: GameProfile;
}

export const TrendingNames: React.FC<TrendingNamesProps> = ({
  onCopyText,
  onSaveName,
  selectedGame,
}) => {
  const [namesList, setNamesList] = useState<CuratedName[]>(CURATED_GAMER_NAMES);
  const [activeGameFilter, setActiveGameFilter] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Trends' },
    { id: 'esports', label: 'Pro Esports' },
    { id: 'aggressive', label: 'Aggressive / Sweaty' },
    { id: 'sniper', label: 'Sniper & Assassin' },
    { id: 'aesthetic', label: 'Anime & Aesthetic' },
    { id: 'duo', label: 'Duo & Matching' },
    { id: 'mythic', label: 'Mythic & Godlike' },
    { id: 'troll', label: 'Troll & Funny' },
  ];

  const handleCopy = (id: string, name: string) => {
    onCopyText(name);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: string) => {
    setNamesList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
    const item = namesList.find((n) => n.id === id);
    if (item) {
      onSaveName(item.name);
    }
  };

  const filteredNames = namesList.filter((item) => {
    const matchesGame = activeGameFilter === 'all' || item.game === activeGameFilter;
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesGame && matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-5">
      {/* Top Filter Bar */}
      <div className="bg-[#0d1322] p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-gaming font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Top Trend Gamertags & Clan Names
            </h2>
            <p className="text-xs text-slate-400">
              Curated style examples for inspiration — this is not live popularity or leaderboard data.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tag, clan, role..."
              className="w-full bg-[#070b14] text-xs sm:text-sm text-white pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Game and Category Filter Pills */}
        <div className="space-y-2">
          {/* Game filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs text-slate-400 font-bold uppercase mr-1">Game:</span>
            {['all', 'bgmi', 'pubg', 'freefire', 'valorant', 'cod', 'cs2', 'apex'].map((g) => (
              <button
                key={g}
                onClick={() => setActiveGameFilter(g)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer ${
                  activeGameFilter === g
                    ? 'bg-orange-500 text-black font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {g === 'all' ? 'All Games' : g}
              </button>
            ))}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs text-slate-400 font-bold uppercase mr-1">Vibe:</span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredNames.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#0b101d] hover:bg-[#0f1629] p-4 rounded-xl border border-slate-800/80 hover:border-orange-500/40 transition-all flex flex-col justify-between gap-3 shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {item.game.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <span>{Array.from(item.name).length} chars</span>
                </div>
              </div>

              {/* Name box */}
              <div className="py-2.5 px-3.5 rounded-lg bg-[#050914] border border-slate-800/70 overflow-x-auto no-scrollbar select-all">
                <p className="text-base sm:text-lg font-subgaming font-bold text-white tracking-wide whitespace-nowrap">
                  {item.name}
                </p>
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                <div className="flex items-center gap-1 flex-wrap">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(item.id)}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Like and Save"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500" />
                    <span>{item.likes} demo</span>
                  </button>

                  <button
                    onClick={() => handleCopy(item.id, item.name)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-black'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-sm'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied</span>
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
