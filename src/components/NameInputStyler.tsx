import React, { useRef } from 'react';
import { GameProfile } from '../types';
import { Shuffle, X, Wand2, AlertTriangle, CheckCircle2, ShieldCheck, Copy, Check, Undo2 } from 'lucide-react';
import { countCharacters } from '../lib/character-count';
import { isCleanGamertagGame } from '../lib/game-mode';
import { NAME_LANGUAGES } from '../data/languages';
import { getLanguageUi } from '../data/language-ui';
import { copyTextToClipboard } from '../lib/clipboard';

interface NameInputStylerProps {
  nameInput: string;
  setNameInput: (val: string) => void;
  selectedGame: GameProfile;
  onQuickSymbolClick: (symbol: string) => void;
  onReplaceName: (value: string) => void;
  onUndo: () => void;
  canUndo: boolean;
  onlyWorkingInGame: boolean;
  setOnlyWorkingInGame: (val: boolean) => void;
  language: string;
  setLanguage: (val: string) => void;
}

const RANDOM_NICKNAMES = [
  'Shadow', 'Mortal', 'Slayer', 'Ghost', 'Reaper', 'Psycho',
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
  onReplaceName,
  onUndo,
  canUndo,
  onlyWorkingInGame,
  setOnlyWorkingInGame,
  language,
  setLanguage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedSpace, setCopiedSpace] = React.useState(false);

  const charCount = countCharacters(nameInput);
  const isOverLimit = selectedGame.maxChars !== null && charCount > selectedGame.maxChars;
  const isCloseToLimit = selectedGame.maxChars !== null && charCount >= selectedGame.maxChars - 2 && !isOverLimit;
  const cleanMode = isCleanGamertagGame(selectedGame.id) && onlyWorkingInGame;
  const languageUi = getLanguageUi(language);

  const handleRandomize = () => {
    const random = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
    onReplaceName(random);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onReplaceName('');
    inputRef.current?.focus();
  };

  const handleWrapWithWings = () => {
    const text = nameInput.trim();
    if (!text) return;
    onReplaceName(`꧁༺${text}༻꧂`);
    inputRef.current?.focus();
  };

  const handleCopyHangulSpace = () => {
    void copyTextToClipboard('ㅤ').then((copied) => {
      setCopiedSpace(copied);
      setTimeout(() => setCopiedSpace(false), 2000);
    });
  };

  return (
    <div className="w-full bg-[#080d1a] p-5 sm:p-6 rounded-2xl border border-slate-800/90 shadow-xl space-y-4 relative overflow-hidden">
      {/* Top Header Row with Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <label className="text-sm sm:text-base font-gaming font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          {languageUi.nicknameLabel}
        </label>

        {/* Language, character counter and game filter controls */}
        <div className="flex items-center gap-2 flex-wrap sm:justify-end">
          <label className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
            <span>{languageUi.languageLabel}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              title="Choose the language and script used for generated name ideas"
              className="max-w-[145px] bg-transparent text-xs font-semibold normal-case tracking-normal text-white outline-none"
            >
              {NAME_LANGUAGES.map((item) => (
                <option key={item.id} value={item.id} className="bg-[#080d1a] text-white">
                  {item.label} · {item.nativeLabel}
                </option>
              ))}
            </select>
          </label>
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
          id="nickname-input"
          ref={inputRef}
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder={languageUi.placeholder}
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
              onClick={() => onQuickSymbolClick(sym)}
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
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              className="px-3 py-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              title="Undo the last name edit"
            >
              <Undo2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Undo</span>
            </button>

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
