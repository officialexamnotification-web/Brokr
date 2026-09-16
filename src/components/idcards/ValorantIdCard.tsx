import React, { useState } from 'react';
import { Crosshair, Trophy, Sparkles, Copy, Check, Shield, Target, Flame, User } from 'lucide-react';

export interface ValorantCardData {
  ign: string;
  tagline: string;
  title: string;
  level: number;
  rank: string;
  rrPoints: number;
  acs: number;
  kd: string;
  headshotRate: string;
  winRate: string;
  agent: string;
  role: string;
  weapon: string;
}

interface ValorantIdCardProps {
  data: ValorantCardData;
  onCopyText: (text: string) => void;
}

export const ValorantIdCard: React.FC<ValorantIdCardProps> = ({ data, onCopyText }) => {
  const [copiedId, setCopiedId] = useState(false);

  const fullRiotId = `${data.ign}#${data.tagline}`;

  const handleCopy = () => {
    onCopyText(fullRiotId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden border-2 border-cyan-500/60 shadow-2xl shadow-black relative bg-[#060a14] text-slate-100 select-none">
      {/* Background Riot Games sleek dark cyber styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c192c] via-[#060b16] to-black z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Valorant Tactical lines */}
      <div className="relative z-10 p-5 sm:p-7 space-y-5">
        {/* Top header: game-inspired Valorant Protocol header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-red-600 text-white font-gaming font-black text-xs uppercase tracking-widest shadow-md shadow-red-600/30 flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5" />
              VALORANT // PROTOCOL
            </div>
            <span className="text-xs font-mono text-slate-400">
              Episode 9 // Act III • <strong className="text-cyan-400">Competitive</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Agent:</span>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950/60 border border-cyan-800 text-cyan-300">
              {data.agent} ({data.role})
            </span>
          </div>
        </div>

        {/* Player Banner Card with Riot ID & Radiant Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Account Level Card Frame */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-cyan-400 via-blue-600 to-slate-950 p-[2px] shadow-2xl">
                <div className="w-full h-full bg-[#080e1e] rounded-[14px] flex items-center justify-center overflow-hidden relative">
                  <User className="w-12 h-12 text-cyan-300 drop-shadow" />
                  <span className="absolute top-1 right-1 px-1 rounded bg-cyan-500/20 text-[9px] font-mono text-cyan-300 border border-cyan-500/40">
                    Vanguard
                  </span>
                </div>
              </div>

              {/* Valorant Account Level Border Badge */}
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 rounded bg-black border border-cyan-500/80 shadow-md text-center">
                <span className="text-[10px] font-mono font-black text-cyan-300">
                  LVL {data.level}
                </span>
              </div>
            </div>

            {/* Riot ID & Title */}
            <div className="space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-mono">
                  {data.title}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Weapon: <strong className="text-slate-300">{data.weapon}</strong>
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-subgaming font-black text-white tracking-wider drop-shadow-md select-all">
                  {data.ign}
                </h2>
                <span className="text-lg sm:text-xl font-mono font-bold text-slate-400">
                  #{data.tagline}
                </span>
              </div>

              <p className="text-xs text-slate-400 font-mono">
                Riot ID: <strong className="text-slate-200 select-all">{fullRiotId}</strong>
              </p>
            </div>
          </div>

          {/* Act Rank Triangle Display & 1-Click Copy */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3">
            <div className="p-3 rounded-2xl bg-[#091122] border border-cyan-500/40 flex items-center gap-3 shadow-lg">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center text-black font-gaming font-black text-lg shadow-md shadow-amber-400/30">
                ✦
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Act Rank Emblem</div>
                <div className="font-gaming font-black text-white text-base tracking-wider">{data.rank}</div>
                <div className="text-[11px] font-mono text-amber-400 font-bold">{data.rrPoints} RR Points</div>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                copiedId
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-cyan-500/20'
              }`}
            >
              {copiedId ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copied Riot ID!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Riot ID</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Combat performance statistics: sample Valorant-style metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <div className="p-3 rounded-xl bg-[#050914] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avg Combat Score</span>
            <p className="text-xl font-gaming font-black text-cyan-400">{data.acs}</p>
            <span className="text-[10px] text-slate-500">ACS / Match</span>
          </div>

          <div className="p-3 rounded-xl bg-[#050914] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">K/D Ratio</span>
            <p className="text-xl font-gaming font-black text-emerald-400">{data.kd}</p>
            <span className="text-[10px] text-slate-500">Kill / Death</span>
          </div>

          <div className="p-3 rounded-xl bg-[#050914] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Headshot %</span>
            <p className="text-xl font-gaming font-black text-red-400">{data.headshotRate}</p>
            <span className="text-[10px] text-slate-500">Vandal Accuracy</span>
          </div>

          <div className="p-3 rounded-xl bg-[#050914] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Win %</span>
            <p className="text-xl font-gaming font-black text-amber-400">{data.winRate}</p>
            <span className="text-[10px] text-slate-500">Act Matches</span>
          </div>
        </div>
      </div>
    </div>
  );
};
