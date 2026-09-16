import React, { useState } from 'react';
import { GameProfile } from '../types';
import { Crosshair, Skull, Sparkles, Copy, Check, Flame, Trophy } from 'lucide-react';

interface KillFeedSimulatorProps {
  playerName: string;
  selectedGame: GameProfile;
  onCopyText: (text: string) => void;
}

export const KillFeedSimulator: React.FC<KillFeedSimulatorProps> = ({
  playerName,
  selectedGame,
  onCopyText,
}) => {
  const [weapon, setWeapon] = useState<string>('M416 Glacier');
  const [victim, setVictim] = useState<string>('Enemy_Squad_Leader');
  const [isHeadshot, setIsHeadshot] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const displayName = playerName.trim() || '亗 SOUL・MORTAL 亗';

  const WEAPONS = [
    { name: 'M416 Glacier', game: 'bgmi', icon: '❄️' },
    { name: 'AWM One-Shot', game: 'bgmi', icon: '🎯' },
    { name: 'AK47 Blue Flame Draco', game: 'freefire', icon: '🔥' },
    { name: 'MP40 Predatory Cobra', game: 'freefire', icon: '⚡' },
    { name: 'Vandal Prime', game: 'valorant', icon: '🔮' },
    { name: 'Operator Dragon', game: 'valorant', icon: '🐉' },
  ];

  const handleCopyTag = () => {
    onCopyText(displayName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0a0e1c] rounded-2xl border border-amber-500/30 p-5 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
      {/* Glow effect */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30">
              Live Esports Feed
            </span>
            <h3 className="font-gaming font-bold text-white text-lg flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-amber-400" />
              In-Game Match Elimination Broadcast
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Preview how your nickname will strike fear in the opponent's match kill feed
          </p>
        </div>

        <button
          onClick={handleCopyTag}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto ${
            copied
              ? 'bg-emerald-500 text-black'
              : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Copied Nickname!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy for In-Game</span>
            </>
          )}
        </button>
      </div>

      {/* Game-inspired kill broadcast mockup */}
      <div className="relative overflow-hidden rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/80 via-black to-slate-950 p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Killer Player */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold shrink-0">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {selectedGame.shortName} CHAMPION
              </span>
            </div>
            <p className="font-subgaming font-black text-lg sm:text-xl text-amber-300 tracking-wider truncate drop-shadow-md select-all">
              {displayName}
            </p>
          </div>
        </div>

        {/* Center: Weapon & Headshot Icon */}
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-lg bg-black/60 border border-slate-800 shrink-0">
          <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1">
            <span>{weapon}</span>
          </span>
          {isHeadshot && (
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white flex items-center gap-1 animate-pulse">
              <Skull className="w-3 h-3" />
              HEADSHOT
            </span>
          )}
        </div>

        {/* Right: Victim */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="text-right overflow-hidden">
            <span className="text-[10px] font-mono text-red-400 uppercase">Eliminated</span>
            <p className="font-subgaming font-bold text-slate-400 text-sm sm:text-base line-through opacity-75 truncate">
              {victim}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shrink-0">
            <Skull className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Simulator Tweak Controls */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
        <span className="text-slate-400 font-bold uppercase">Weapon:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {WEAPONS.map((w, idx) => (
            <button
              key={idx}
              onClick={() => setWeapon(w.name)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                weapon === w.name
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {w.icon} {w.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsHeadshot(!isHeadshot)}
          className={`px-2.5 py-1 rounded-lg font-semibold border transition-colors cursor-pointer ml-auto ${
            isHeadshot
              ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : 'bg-slate-900 text-slate-400 border-slate-800'
          }`}
        >
          {isHeadshot ? '✓ Headshot Active' : 'Body Shot'}
        </button>
      </div>
    </div>
  );
};
