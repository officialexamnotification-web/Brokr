import React, { useState } from 'react';
import { Flame, Heart, Trophy, Copy, Check, Star, Shield, Zap, Swords, User } from 'lucide-react';

export interface FreeFireCardData {
  ign: string;
  guildName: string;
  level: number;
  uid: string;
  brRank: string;
  brRankScore: number;
  csRank: string;
  likes: string;
  battleStyle1: string;
  battleStyle2: string;
  rawSignature: string;
}

interface FreeFireIdCardProps {
  data: FreeFireCardData;
  onCopyText: (text: string) => void;
}

export const FreeFireIdCard: React.FC<FreeFireIdCardProps> = ({ data, onCopyText }) => {
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedIgn, setCopiedIgn] = useState(false);
  const [copiedSig, setCopiedSig] = useState(false);

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

  const handleCopySig = () => {
    onCopyText(data.rawSignature);
    setCopiedSig(true);
    setTimeout(() => setCopiedSig(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden border-2 border-red-500/60 shadow-2xl shadow-black relative bg-[#0a0507] text-slate-100 select-none">
      {/* Background fiery volcanic / Booyah pass texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-black to-[#1a080c] z-0" />
      <div className="absolute -top-20 right-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Fiery particles styling */}
      <div className="relative z-10 p-5 sm:p-7 space-y-5">
        {/* Top header: game-inspired Free Fire MAX player banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 text-white font-gaming font-black text-xs uppercase tracking-widest shadow-md shadow-red-600/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-white" />
              FREE FIRE MAX
            </div>
            <span className="text-xs font-mono text-slate-400">
              Region: <strong className="text-amber-400">IND (India)</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Booyah Pass Badge */}
            <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300">
              <Zap className="w-3 h-3 text-amber-400" />
              BOOYAH PASS ELITE
            </div>

            <div className="flex items-center gap-1.5 text-xs text-red-300 font-mono font-bold bg-red-950/50 px-2.5 py-1 rounded-lg border border-red-800">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>{data.likes} Likes</span>
            </div>
          </div>
        </div>

        {/* Middle Banner Section: Avatar, Nickname, Guild & UID */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Free Fire Avatar & Elite Golden Frame */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500 via-red-500 to-yellow-400 rounded-2xl blur-sm opacity-80 animate-pulse"></div>

              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-amber-400 via-red-600 to-purple-900 p-[3px] shadow-2xl">
                <div className="w-full h-full bg-[#120508] rounded-[13px] flex items-center justify-center overflow-hidden relative">
                  <User className="w-12 h-12 text-amber-300 drop-shadow" />
                  <span className="absolute bottom-1 right-1 px-1 rounded bg-red-600 text-[8px] font-black uppercase text-white">
                    PRO
                  </span>
                </div>
              </div>

              {/* Free Fire Level Badge & EXP progress */}
              <div className="absolute -bottom-2 -left-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-black font-gaming font-black text-[10px] border border-black shadow">
                LV. {data.level}
              </div>
            </div>

            {/* In-Game Name, Guild & UID */}
            <div className="space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-2 flex-wrap">
                {data.guildName && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-gaming font-bold bg-black/70 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-amber-400" />
                    Guild: {data.guildName}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">Lv.6 Guild</span>
              </div>

              {/* Styled Nickname */}
              <h2 className="text-2xl sm:text-3xl font-subgaming font-black text-amber-300 tracking-wider drop-shadow-md select-all truncate">
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

          {/* Quick Action Buttons */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2.5">
            <button
              onClick={handleCopyIgn}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                copiedIgn
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-red-600/30'
              }`}
            >
              {copiedIgn ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copied Free Fire Nick!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Free Fire Nick</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dual Ranked Badges (BR-Rank & CS-Rank) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* BR Ranked Badge */}
          <div className="p-3.5 rounded-2xl bg-[#140609] border border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">BR-Ranked</span>
                <p className="font-gaming font-black text-white text-sm sm:text-base flex items-center gap-1.5 text-amber-300">
                  {data.brRank}
                  <span className="text-xs text-amber-400 flex items-center">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </span>
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-300 bg-black/60 px-2 py-1 rounded-lg border border-slate-800">
              {data.brRankScore} RP
            </span>
          </div>

          {/* CS Ranked Badge */}
          <div className="p-3.5 rounded-2xl bg-[#140609] border border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CS-Ranked</span>
                <p className="font-gaming font-black text-white text-sm sm:text-base text-red-400 flex items-center gap-1">
                  {data.csRank}
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-red-600 text-white">
                    TOP 1%
                  </span>
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-300 bg-black/60 px-2 py-1 rounded-lg border border-slate-800">
              Master 88★
            </span>
          </div>
        </div>

        {/* Battle style tags: sample Free Fire-style labels */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase text-slate-400">Battle Styles:</span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-gaming font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              🏷️ {data.battleStyle1}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-gaming font-bold bg-red-500/20 text-red-300 border border-red-500/40">
              🎯 {data.battleStyle2}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase text-slate-400">Social Style:</span>
            <span className="px-2 py-0.5 rounded text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-800">
              ⭐ Veteran Gamer
            </span>
          </div>
        </div>

        {/* Free Fire-style signature bio with color-code preview */}
        <div className="pt-3 border-t border-red-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">
              Signature / Bio (Free Fire Color Codes):
            </span>
            <button
              onClick={handleCopySig}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              {copiedSig ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSig ? 'Copied Color Code!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <span className="text-amber-300 font-bold">⚡ ONE TAP SNIPER ⚡</span>
              <span className="text-red-500 font-bold ml-2">❤ CS PUSHER</span>
            </div>
            <code className="text-slate-500 text-[11px]">{data.rawSignature}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
