import React, { useMemo, useState } from 'react';
import { CuratedName, GameProfile } from '../types';
import { CURATED_GAMER_NAMES } from '../data/curatedNames';
import { POPULAR_GAMES } from '../data/games';
import { GLOBAL_PRO_PLAYER_INSPIRATION } from '../data/proPlayers';
import { Flame, Copy, Check, Heart, Search, Users } from 'lucide-react';

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

  const editorIdeas = useMemo<CuratedName[]>(() => {
    const existingGames = new Set(CURATED_GAMER_NAMES.map((item) => item.game));
    const fallbackIdeas = POPULAR_GAMES
      .filter((game) => !existingGames.has(game.id))
      .flatMap((game) => {
        const base = game.shortName.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 8) || 'GAMER';
        return [
          { id: `editor-${game.id}-nova`, name: `${base}Nova`, game: game.id, category: 'esports' as const, likes: 0, tags: ['Editor pick', 'Clean'] },
          { id: `editor-${game.id}-rift`, name: `${base}Rift`, game: game.id, category: 'mythic' as const, likes: 0, tags: ['Editor pick', 'Readable'] },
          { id: `editor-${game.id}-prime`, name: `${base}_Prime`, game: game.id, category: 'aesthetic' as const, likes: 0, tags: ['Editor pick', 'Simple'] },
        ];
      });
    return [...CURATED_GAMER_NAMES, ...fallbackIdeas];
  }, []);

  const gameLabels = useMemo(() => new Map(POPULAR_GAMES.map((game) => [game.id, game.shortName])), []);

  const handleSave = (id: string) => {
    const item = editorIdeas.find((n) => n.id === id);
    if (item) {
      onSaveName(item.name);
    }
  };

  const filteredNames = editorIdeas.filter((item) => {
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
      <section className="rounded-2xl border border-cyan-500/20 bg-[#080d1a] p-4 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
              <Users className="h-5 w-5 text-cyan-400" />
              Global Pro Player Inspiration
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Recognized player handles from major regions — inspiration only, not a live ranking or popularity count.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500">{GLOBAL_PRO_PLAYER_INSPIRATION.length} public handles</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {GLOBAL_PRO_PLAYER_INSPIRATION.map((player) => (
            <div key={`${player.game}-${player.handle}`} className="rounded-xl border border-slate-800 bg-[#050811] p-2.5">
              <div className="truncate text-sm font-bold text-white" title={player.handle}>{player.handle}</div>
              <div className="mt-1 truncate text-[10px] uppercase tracking-wide text-cyan-300">{player.game.replace('_', ' ')}</div>
              <div className="mt-0.5 truncate text-[10px] text-slate-500" title={player.region}>{player.region}</div>
              <div className="mt-2 flex items-center gap-1">
                <button onClick={() => onCopyText(player.handle)} className="flex-1 rounded-md bg-cyan-500 px-2 py-1 text-[10px] font-bold text-black transition hover:bg-cyan-400" title={`Copy ${player.handle}`}>
                  Copy
                </button>
                <button onClick={() => onSaveName(player.handle)} className="rounded-md border border-slate-700 p-1 text-slate-400 transition hover:border-red-500 hover:text-red-400" title={`Save ${player.handle} to favorites`}>
                  <Heart className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Filter Bar */}
      <div className="bg-[#0d1322] p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-gaming font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Top Trend Gamertags & Clan Names
            </h2>
            <p className="text-xs text-slate-400">
              Editor-picked name ideas for inspiration — this is not live popularity, availability or leaderboard data.
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
            {['all', ...POPULAR_GAMES.map((game) => game.id)].map((g) => (
              <button
                key={g}
                onClick={() => setActiveGameFilter(g)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer ${
                  activeGameFilter === g
                    ? 'bg-orange-500 text-black font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {g === 'all' ? 'All Games' : gameLabels.get(g) || g}
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
                    {gameLabels.get(item.game) || item.game.toUpperCase()}
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
                    onClick={() => handleSave(item.id)}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Save to favourites"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500" />
                    <span>Save</span>
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
