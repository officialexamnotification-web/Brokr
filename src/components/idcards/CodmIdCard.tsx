import React, { useState } from 'react';
import { Shield, Trophy, Flame, Copy, Check, Crosshair, Award, Zap, User } from 'lucide-react';

export interface CodmCardData {
  ign: string;
  clanTag: string;
  level: number;
  uid: string;
  rank: string;
  mpScore: number;
  kd: string;
  nuclearMedals: number;
  mvpCount: number;
  favoriteWeapon: string;
}

interface CodmIdCardProps {
  data: CodmCardData;
  onCopyText: (text: string) => void;
}

export const CodmIdCard: React.FC<CodmIdCardProps> = ({ data, onCopyText }) => {
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
    <div className="w-full rounded-3xl overflow-hidden border-2 border-amber-600/60 shadow-2xl shadow-black relative bg-[#090b0e] text-slate-100 select-none">
      {/* Background Military / Calling Card Camo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#171a21] via-[#0d1017] to-black z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-7 space-y-5">
        {/* Top Header: Activision COD Mobile Calling Card Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-600/30">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-amber-500 text-black font-gaming font-black text-xs uppercase tracking-widest shadow-md shadow-amber-500/30 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              CALL OF DUTY: MOBILE
            </div>
            <span className="text-xs font-mono text-slate-400">
              Ranked Season 6 • <strong className="text-amber-400">Legendary MP</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Weapon Mastery:</span>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-950/60 border border-amber-800 text-amber-300">
              {data.favoriteWeapon} (Master)
            </span>
          </div>
        </div>

        {/* Middle Calling Card Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar & Calling Card Frame */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-700 to-black p-[2px] shadow-2xl">
                <div className="w-full h-full bg-[#0c1017] rounded-[14px] flex items-center justify-center overflow-hidden relative">
                  <User className="w-12 h-12 text-amber-400 drop-shadow" />
                  <span className="absolute bottom-1 right-1 px-1 rounded bg-amber-500 text-black text-[8px] font-black uppercase">
                    MAX
                  </span>
                </div>
              </div>

              {/* Level 200 Max Badge */}
              <div className="absolute -bottom-2 -left-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-black font-gaming font-black text-[10px] border border-black shadow">
                LV. {data.level}
              </div>
            </div>

            {/* In-Game Name & Clan */}
            <div className="space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-2 flex-wrap">
                {data.clanTag && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-gaming font-bold bg-black/80 text-amber-400 border border-amber-500/40">
                    {data.clanTag}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">Clan War Champion</span>
              </div>

              {/* Nickname */}
              <h2 className="text-2xl sm:text-3xl font-subgaming font-black text-white tracking-wider drop-shadow-md select-all truncate">
                {data.ign}
              </h2>

              {/* UID & 1-Click Copy */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-0.5">
                <span>UID: <strong className="text-white">{data.uid}</strong></span>
                <button
                  onClick={handleCopyUid}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
                >
                  {copiedUid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUid ? 'Copied UID!' : 'Copy UID'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Legendary Rank Display & Copy IGN */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3">
            <div className="p-3 rounded-2xl bg-[#0e131d] border border-amber-500/40 flex items-center gap-3 shadow-lg">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-black font-gaming font-black text-lg shadow-md shadow-amber-400/30">
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Multiplayer Tier</div>
                <div className="font-gaming font-black text-white text-base tracking-wider">{data.rank}</div>
                <div className="text-[11px] font-mono text-amber-300 font-bold">{data.mpScore} MP XP</div>
              </div>
            </div>

            <button
              onClick={handleCopyIgn}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                copiedIgn
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-amber-500/20'
              }`}
            >
              {copiedIgn ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copied Gamertag!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Gamertag</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Combat Medals Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">K/D Ratio</span>
            <p className="text-xl font-gaming font-black text-emerald-400">{data.kd}</p>
            <span className="text-[10px] text-slate-500">Ranked MP</span>
          </div>

          <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Nuclear Medals</span>
            <p className="text-xl font-gaming font-black text-amber-400">{data.nuclearMedals}</p>
            <span className="text-[10px] text-slate-500">30-Gun Streaks</span>
          </div>

          <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">MVP Count</span>
            <p className="text-xl font-gaming font-black text-white">{data.mvpCount}</p>
            <span className="text-[10px] text-slate-500">First Place</span>
          </div>

          <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Favorite Weapon</span>
            <p className="text-sm font-gaming font-black text-cyan-400 truncate pt-1">{data.favoriteWeapon}</p>
            <span className="text-[10px] text-slate-500">Mythic Blueprint</span>
          </div>
        </div>
      </div>
    </div>
  );
};
