import React, { useRef } from 'react';
import { GameProfile } from '../types';
import { Shuffle, X, Wand2, AlertTriangle, CheckCircle2, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';
import { countCharacters } from '../lib/character-count';
import { isCleanGamertagGame } from '../lib/game-mode';

interface NameInputStylerProps {
  nameInput: string;
  setNameInput: (val: string) => void;
  selectedGame: GameProfile;
  onQuickSymbolClick: (symbol: string) => void;
  onlyWorkingInGame: boolean;
  setOnlyWorkingInGame: (val: boolean) => void;
}

const RANDOM_NICKNAMES = [
  'Viper', 'Shadow', 'Mortal', 'Slayer', 'Ghost', 'Reaper', 'Psycho', 
  'Demon', 'Hydra', 'Falcon', 'Sniper', 'Apex', 'Glitch', 'Venom', 
  'Zero', 'Ninja', 'Titan', 'Knight', 'Spectre', 'Rogue', 'Phoenix',
  'Raistar', 'Jonathan', 'Scout', 'Dynamo', 'Alpha', 'Karma', 'Toxic'
];

const POPULAR_QUICK_SYMBOLS = [
  '亗', '★', '⚡', '〆', '꧁༺', '༻꧂', '☬', '✞', '✿', '╰‿╯', '𓆩♡𓆪', '⌖', '么', '乂'
];

export const NameInputStyler: React.FC<NameInputStylerProps> = ({
  nameInput,
  setNameInput,
  selectedGame,
  onQuickSymbolClick,
  onlyWorkingInGame,
  setOnlyWorkingInGame,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedSpace, setCopiedSpace] = React.useState(false);

  const charCount = countCharacters(nameInput);
  const isOverLimit = selectedGame.maxChars !== null && charCount > selectedGame.maxChars;
  const isCloseToLimit = selectedGame.maxChars !== null && charCount >= selectedGame.maxChars - 2 && !isOverLimit;
  const cleanMode = isCleanGamertagGame(selectedGame.id) && onlyWorkingInGame;

  const handleRandomize = () => {
    const random = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
    setNameInput(random);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setNameInput('');
    inputRef.current?.focus();
  };

  const handleWrapWithWings = () => {
    const text = nameInput.trim() || 'WARRIOR';
    setNameInput(`꧁༺${text}༻꧂`);
    inputRef.current?.focus();
  };

  const handleInsertSymbol = (sym: string) => {
    if (!inputRef.current) {
      setNameInput(nameInput + sym);
      return;
    }
    const start = inputRef.current.selectionStart || nameInput.length;
    const end = inputRef.current.selectionEnd || nameInput.length;
    const nextVal = nameInput.substring(0, start) + sym + nameInput.substring(end);
    setNameInput(nextVal);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = start + sym.length;
        inputRef.current.selectionEnd = start + sym.length;
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleCopyHangulSpace = () => {
    navigator.clipboard.writeText('ㅤ');
    setCopiedSpace(true);
    setTimeout(() => setCopiedSpace(false), 2000);
  };

  return (
    <div className="w-full bg-[#080d1a] p-5 sm:p-6 rounded-2xl border border-slate-800/90 shadow-xl space-y-4 relative overflow-hidden">
      {/* Top Header Row with Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <label className="text-sm sm:text-base font-gaming font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          Enter Your Nickname or Clan Handle:
        </label>

        {/* Character Counter & Game Filter Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
              isOverLimit
                ? 'bg-red-950/80 text-red-300 border-red-800'
                : isCloseToLimit
                ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                : 'bg-[#040810] text-emerald-400 border-slate-800'
            }`}
          >
            {isOverLimit ? (
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>
              {selectedGame.maxChars === null ? `${charCount} chars · limit varies` : `${charCount} / ${selectedGame.maxChars} chars`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOnlyWorkingInGame(!onlyWorkingInGame)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              onlyWorkingInGame
                ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{cleanMode ? '✓ Clean Gamertag Mode' : onlyWorkingInGame ? `✓ ${selectedGame.shortName} Conservative Candidates` : 'All Fonts'}</span>
          </button>
        </div>
      </div>

      {/* Main Input Field */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="e.g. VIPER, MORTAL, JONATHAN, SOUL..."
          className="w-full h-14 sm:h-16 bg-[#050914] text-white text-lg sm:text-2xl font-subgaming font-bold tracking-wider px-5 rounded-xl border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all placeholder:text-slate-600 shadow-inner leading-normal"
        />

        {nameInput && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            title="Clear text"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Over limit alert */}
      {isOverLimit && (
        <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>
            <strong>Warning:</strong> {charCount} characters exceeds the {selectedGame.shortName} working limit of {selectedGame.maxChars} characters!
          </span>
        </div>
      )}

      {/* Quick Insert Symbols & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-bold uppercase mr-1 hidden sm:inline">
            {cleanMode ? 'Clean output:' : '1-Click Glyphs:'}
          </span>
          {cleanMode ? (
            <span className="rounded-lg border border-emerald-800/60 bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              Decorative glyphs are hidden for safer platform names
            </span>
          ) : POPULAR_QUICK_SYMBOLS.map((sym, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleInsertSymbol(sym)}
              className="px-2.5 py-1.5 rounded-lg bg-[#0e1628] hover:bg-amber-500 hover:text-black text-amber-300 border border-slate-800 hover:border-amber-400 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
              title={`Insert ${sym}`}
            >
              {sym}
            </button>
          ))}

          {/* 1-Click Invisible Hangul Space for Free Fire / BGMI */}
          {!cleanMode && ['bgmi', 'pubg', 'freefire'].includes(selectedGame.id) && <button
            type="button"
            onClick={handleCopyHangulSpace}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
              copiedSpace
                ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                : 'bg-cyan-950/60 hover:bg-cyan-500 hover:text-black text-cyan-300 border-cyan-800'
            }`}
            title="Copy Free Fire & BGMI Invisible Hangul Filler (U+3164)"
          >
            {copiedSpace ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
            <span>[ㅤ] {copiedSpace ? 'Space Copied!' : 'Copy FF Space'}</span>
          </button>}
        </div>

        {/* Action Tools: Wrap Wings & Random Idea */}
        <div className="flex items-center gap-2 ml-auto">
          {!cleanMode && <button
            onClick={handleWrapWithWings}
            className="px-3 py-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Wrap name with wings"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Wrap Wings</span>
          </button>}

          <button
            onClick={handleRandomize}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            title="Random idea"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random</span>
          </button>
        </div>
      </div>
    </div>
  );
};
