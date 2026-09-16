import React, { useState } from 'react';
import { Copy, Check, Sparkles, HelpCircle } from 'lucide-react';

interface InvisibleSpaceGeneratorProps {
  onCopyText: (text: string) => void;
}

export const InvisibleSpaceGenerator: React.FC<InvisibleSpaceGeneratorProps> = ({
  onCopyText,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Unicode Hangul Filler (U+3164) - Standard Free Fire space
  const HANGUL_FILLER = 'ㅤ';
  // Small blank space (Halfwidth Hangul Filler U+FFA0)
  const SMALL_BLANK = 'ﾠ';
  // Triple Invisible (for purely invisible name profile)
  const TRIPLE_INVISIBLE = 'ㅤㅤㅤ';

  const handleCopy = (type: string, text: string) => {
    onCopyText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="w-full bg-[#0d1326] p-5 sm:p-6 rounded-2xl border border-cyan-500/30 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <h3 className="text-base sm:text-lg font-gaming font-bold text-white flex items-center gap-2">
            Free Fire & BGMI Invisible Space (U+3164)
          </h3>
        </div>
        <span className="text-xs text-cyan-400 font-mono">
          Experimental helper • client support varies
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Normal keyboard spaces or invisible fillers may be rejected differently by game version and region. Use these as experiments only and verify in the live rename screen:
      </p>

      {/* Grid of Copy Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Single Invisible Space */}
        <div className="bg-[#070b16] p-4 rounded-xl border border-slate-800 flex flex-col justify-between gap-3 hover:border-cyan-500/40 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Standard Gap</span>
              <span className="text-cyan-400 font-mono">U+3164</span>
            </div>
            <p className="text-sm font-bold text-white mt-1">Single Invisible Space</p>
            <p className="text-[11px] text-slate-500">Name ke beech me space lagane ke liye</p>
          </div>

          <button
            onClick={() => handleCopy('single', HANGUL_FILLER)}
            className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              copiedType === 'single'
                ? 'bg-emerald-500 text-black'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
            }`}
          >
            {copiedType === 'single' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied Space!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Space [ㅤ]</span>
              </>
            )}
          </button>
        </div>

        {/* 2. Full Invisible Name */}
        <div className="bg-[#070b16] p-4 rounded-xl border border-slate-800 flex flex-col justify-between gap-3 hover:border-cyan-500/40 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Ghost Trick</span>
              <span className="text-amber-400 font-mono">3x Filler</span>
            </div>
            <p className="text-sm font-bold text-white mt-1">Invisible-name experiment</p>
            <p className="text-[11px] text-slate-500">Bina kisi name ke ghost player profile</p>
          </div>

          <button
            onClick={() => handleCopy('ghost', TRIPLE_INVISIBLE)}
            className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              copiedType === 'ghost'
                ? 'bg-emerald-500 text-black'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20'
            }`}
          >
            {copiedType === 'ghost' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied Ghost Code!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Invisible Name</span>
              </>
            )}
          </button>
        </div>

        {/* 3. Halfwidth Space */}
        <div className="bg-[#070b16] p-4 rounded-xl border border-slate-800 flex flex-col justify-between gap-3 hover:border-cyan-500/40 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Micro Gap</span>
              <span className="text-purple-400 font-mono">U+FFA0</span>
            </div>
            <p className="text-sm font-bold text-white mt-1">Halfwidth Micro Space</p>
            <p className="text-[11px] text-slate-500">Chhota aesthetic gap clan tags ke liye</p>
          </div>

          <button
            onClick={() => handleCopy('micro', SMALL_BLANK)}
            className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              copiedType === 'micro'
                ? 'bg-emerald-500 text-black'
                : 'bg-purple-500 hover:bg-purple-400 text-white shadow-md shadow-purple-500/20'
            }`}
          >
            {copiedType === 'micro' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied Micro Space!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Micro Space</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
