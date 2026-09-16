import React, { useState } from 'react';
import { Trophy, Flame, ThumbsUp, Heart, Shield, Award, Copy, Check, User } from 'lucide-react';

export interface BgmiCardData {
  ign: string;
  clanTag: string;
  title: string;
  level: number;
  uid: string;
  tier: string;
  tierPoints: number;
  kd: string;
  matches: number;
  winRate: string;
  headshotRate: string;
  popularity: string;
  likes: string;
  synergyName: string;
  signature: string;
}

interface BgmiIdCardProps {
  data: BgmiCardData;
  onCopyText: (text: string) => void;
}

export const BgmiIdCard: React.FC<BgmiIdCardProps> = ({ data, onCopyText }) => {
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedIgn, setCopiedIgn] = useState(false);

  const handleCopyUid = () => {
    onCopyText(data.uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleCopyIgn = () => {
    onCopyText(data.ign);
    setCopiedIgn(true);
    setTimeout(() => setCopiedIgn(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden border-2 border-amber-500/60 shadow-2xl shadow-black relative bg-[#070b14] text-slate-100 select-none">
      {/* Background Military / Desert Camo texture & golden radial sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121928] via-[#090e1a] to-[#04060c] z-0" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Krafton UI grid line */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-7 space-y-5">
        {/* Top bar: game-inspired BGMI / PUBG Mobile header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-amber-500 text-black font-gaming font-black text-xs uppercase tracking-widest shadow-md shadow-amber-500/30 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              BATTLEGROUNDS MOBILE
            </div>
            <span className="text-xs font-mono text-slate-400">
              Server: <strong className="text-slate-200">Asia (India)</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400/90 font-bold">Season: C6S18</span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-bold font-gaming">
              <Trophy className="w-3 h-3 text-amber-400" />
              {data.tier} ({data.tierPoints} pts)
            </div>
          </div>
        </div>

        {/* Main Profile Info Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar with Conqueror Glowing Frame */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative group shrink-0">
              {/* Spinning Conqueror Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 rounded-2xl blur-sm opacity-80 animate-pulse"></div>

              {/* Ornate Frame */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-600 to-amber-950 p-[3px] shadow-2xl">
                <div className="w-full h-full bg-[#070b16] rounded-[13px] flex items-center justify-center overflow-hidden relative">
                  <User className="w-12 h-12 text-amber-300 drop-shadow" />
                  {/* Clan crest badge overlay */}
                  <span className="absolute top-1 left-1 px-1 rounded bg-black/80 text-[9px] font-black text-amber-400 font-mono">
                    VIP
                  </span>
                </div>
              </div>

              {/* Level Circle Badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-b from-amber-400 to-amber-700 p-0.5 shadow-lg flex items-center justify-center border-2 border-black">
                <span className="text-[11px] font-black text-black font-gaming">
                  {data.level}
                </span>
              </div>
            </div>

            {/* In-Game Name, Clan & Title */}
            <div className="space-y-1.5 overflow-hidden">
              {/* Title Badge e.g. Conqueror / Weapon Master */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm flex items-center gap-1 border border-amber-400/40">
                  <Award className="w-3 h-3" />
                  {data.title}
                </span>

                {data.clanTag && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800/90 text-amber-300 border border-slate-700">
                    {data.clanTag}
                  </span>
                )}
              </div>

              {/* In-Game Nickname */}
              <h2 className="text-2xl sm:text-3xl font-subgaming font-black text-white tracking-wider drop-shadow-md select-all truncate">
                {data.ign}
              </h2>

              {/* Character ID & 1-Click Copy */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-0.5">
                <span>UID: <strong className="text-slate-200">{data.uid}</strong></span>
                <button
                  onClick={handleCopyUid}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
                  title="Copy numeric Character ID"
                >
                  {copiedUid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUid ? 'Copied UID!' : 'Copy UID'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Stats: Popularity & Likes Pill */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2.5 bg-[#050812] md:bg-transparent p-3 md:p-0 rounded-xl border border-slate-800 md:border-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-300 text-xs font-mono font-bold shadow-sm">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span>{data.popularity}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold shadow-sm">
                <ThumbsUp className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                <span>{data.likes}</span>
              </div>
            </div>

            <button
              onClick={handleCopyIgn}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                copiedIgn
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30 font-black'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/20 font-black'
              }`}
            >
              {copiedIgn ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Copied IGN!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Gamertag</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Season statistics grid with sample BGMI-style tier stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <div className="p-3 rounded-xl bg-[#050812] border border-slate-800/90 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">K/D Ratio</span>
            <p className="text-xl font-gaming font-black text-emerald-400">{data.kd}</p>
            <span className="text-[10px] text-slate-500">Squad TPP</span>
          </div>

          <div className="p-3 rounded-xl bg-[#050812] border border-slate-800/90 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Matches</span>
            <p className="text-xl font-gaming font-black text-white">{data.matches}</p>
            <span className="text-[10px] text-slate-500">Total Played</span>
          </div>

          <div className="p-3 rounded-xl bg-[#050812] border border-slate-800/90 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Win Rate</span>
            <p className="text-xl font-gaming font-black text-amber-400">{data.winRate}</p>
            <span className="text-[10px] text-slate-500">Chicken Dinners</span>
          </div>

          <div className="p-3 rounded-xl bg-[#050812] border border-slate-800/90 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Headshot %</span>
            <p className="text-xl font-gaming font-black text-red-400">{data.headshotRate}</p>
            <span className="text-[10px] text-slate-500">Accuracy</span>
          </div>
        </div>

        {/* Player Signature & Synergy Duo Footer */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Bio:</span>
            <p className="italic text-slate-300 line-clamp-1">{data.signature}</p>
          </div>

          {data.synergyName && (
            <div className="flex items-center gap-1.5 text-pink-300 text-[11px] font-mono shrink-0">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
              <span>Synergy with: <strong className="text-white">{data.synergyName}</strong></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
