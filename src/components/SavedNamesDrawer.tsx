import React, { useState } from 'react';
import { GameProfile, SavedNameItem } from '../types';
import { X, Copy, Check, Trash2, Heart } from 'lucide-react';

interface SavedNamesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedNames: SavedNameItem[];
  onRemoveName: (id: string) => void;
  onClearAll: () => void;
  onCopyText: (text: string) => void;
  selectedGame: GameProfile;
}

export const SavedNamesDrawer: React.FC<SavedNamesDrawerProps> = ({
  isOpen,
  onClose,
  savedNames,
  onRemoveName,
  onClearAll,
  onCopyText,
  selectedGame,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  if (!isOpen) return null;

  const gameSavedNames = savedNames.filter(
    (item) => item.game === selectedGame.id || item.game === selectedGame.shortName.toLowerCase(),
  );

  const handleCopyOne = (id: string, name: string) => {
    onCopyText(name);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCopyAll = () => {
    const all = gameSavedNames.map((s) => s.name).join('\n');
    onCopyText(all);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#0b0f19] h-full flex flex-col border-l border-slate-800 shadow-2xl p-4 sm:p-6 overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-gaming font-bold text-lg text-white">
              {selectedGame.shortName} Favorites ({gameSavedNames.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {gameSavedNames.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 border border-slate-800">
              <Heart className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-slate-300">No saved {selectedGame.shortName} names yet</p>
            <p className="text-xs text-slate-500 max-w-xs">
              Click the heart icon on a {selectedGame.shortName} name to save it here. Favorites are separated by game.
            </p>
          </div>
        ) : (
          <div className="flex-1 py-4 space-y-3 overflow-y-auto">
            {gameSavedNames.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="overflow-hidden">
                    <p className="font-subgaming font-bold text-white text-base truncate select-all">
                      {item.name}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {selectedGame.shortName.toUpperCase()} • {Array.from(item.name).length} chars
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyOne(item.id, item.name)}
                      className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-500 text-black'
                          : 'bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-300'
                      }`}
                      title="Copy"
                    >
                      {isCopied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => onRemoveName(item.id)}
                      className="p-2 rounded-lg bg-slate-800/60 hover:bg-red-950/80 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Drawer Footer Actions */}
        {gameSavedNames.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/10"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copied All {gameSavedNames.length} Names!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy All Names</span>
                </>
              )}
            </button>

            <button
              onClick={onClearAll}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
