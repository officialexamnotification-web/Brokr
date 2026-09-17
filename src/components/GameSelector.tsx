import React from 'react';
import { GameProfile } from '../types';
import { POPULAR_GAMES } from '../data/games';
import { useState } from 'react';
import { ShieldCheck, Search } from 'lucide-react';
import { getGlobalUi } from '../data/language-ui';

interface GameSelectorProps {
  selectedGame: GameProfile;
  onSelectGame: (game: GameProfile) => void;
  language: string;
}

export const GameSelector: React.FC<GameSelectorProps> = ({
  selectedGame,
  onSelectGame,
  language,
}) => {
  const ui = getGlobalUi(language);
  const [gameQuery, setGameQuery] = useState('');
  const normalizedQuery = gameQuery.trim().toLowerCase();
  const visibleGames = POPULAR_GAMES.filter((game) =>
    !normalizedQuery || [game.name, game.shortName, game.id].some((value) => value.toLowerCase().includes(normalizedQuery))
  );

  return (
    <div className="w-full bg-[#090d1a] p-3 sm:p-4 rounded-2xl border border-slate-800/90 shadow-lg space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-gaming font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            {ui.selectCompatibility}:
          </span>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
            {selectedGame.maxChars === null ? 'Limit varies / unverified' : `Working limit: ${selectedGame.maxChars} chars`}
          </span>
        </div>

        {/* Popular Symbols for selected game */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap">
            {ui.popularIn} {selectedGame.shortName}:
          </span>
          <div className="flex items-center gap-1">
            {selectedGame.popularSymbols.slice(0, 6).map((sym, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded bg-[#0e1628] border border-slate-800 text-slate-300 text-xs font-mono select-all"
              >
                {sym}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="relative w-full sm:w-56 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input
            type="search"
            value={gameQuery}
            onChange={(event) => setGameQuery(event.target.value)}
            placeholder={ui.searchGames}
            aria-label={ui.searchGames}
            className="w-full bg-[#050811] text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:border-amber-400 outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Horizontal Game Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar min-w-0">
        {visibleGames.map((game) => {
          const isSelected = selectedGame.id === game.id;
          return (
            <button
              key={game.id}
              onClick={() => onSelectGame(game)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20 font-black'
                  : 'bg-[#050811] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: isSelected ? '#000000' : game.accentColor }}
              />
              <span className="font-gaming">{game.shortName}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-slate-900 text-slate-400'
                }`}
              >
                {game.maxChars === null ? 'var' : `${game.maxChars}c`}
              </span>
            </button>
          );
        })}
        {visibleGames.length === 0 && (
          <span className="text-xs text-slate-500 py-2 px-1 whitespace-nowrap">No supported game found</span>
        )}
        </div>
      </div>
    </div>
  );
};
