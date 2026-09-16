import React, { useState } from 'react';
import { GameProfile } from '../types';
import { X, Check, AlertTriangle, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { countCharacters } from '../lib/character-count';

interface RenameSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  selectedGame: GameProfile;
  onCopyText: (text: string) => void;
}

export const RenameSimulatorModal: React.FC<RenameSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialName,
  selectedGame,
  onCopyText,
}) => {
  const [testedName, setTestedName] = useState<string>(initialName);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const charCount = countCharacters(testedName);
  const isOverCharLimit = selectedGame.maxChars !== null && charCount > selectedGame.maxChars;

  // Estimate UTF-8 byte length (Unreal Engine & Unity limit)
  const byteCount = new TextEncoder().encode(testedName).length;

  const handleTestInGame = () => {
    if (isOverCharLimit) {
      setStatusMessage(`Error: Exceeds ${selectedGame.shortName} working limit of ${selectedGame.maxChars} characters!`);
    } else if (charCount < 3) {
      setStatusMessage('Error: Name must be at least 3 characters.');
    } else {
      setStatusMessage(`Fits this tool's ${selectedGame.shortName} working limit. Test it in the live client before applying.`);
    }
  };

  const handleCopyAndClose = () => {
    onCopyText(testedName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#0c1222] rounded-3xl border border-amber-500/50 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              ID
            </div>
            <div>
              <h3 className="font-gaming font-bold text-white text-base sm:text-lg">
                In-Game Rename Card Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Test if your name passes {selectedGame.shortName} game engine validation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Game Rename Dialog Box */}
        <div className="p-5 rounded-2xl bg-[#060a14] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Engine: {selectedGame.engine}</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                isOverCharLimit
                  ? 'bg-red-950 text-red-400 border border-red-800'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}
            >
              {selectedGame.maxChars === null ? `${charCount} chars · limit varies` : `${charCount} / ${selectedGame.maxChars} Chars`} ({byteCount} Bytes)
            </span>
          </div>

          {/* Simulated Input */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">
              Enter New Nickname:
            </label>
            <input
              type="text"
              value={testedName}
              onChange={(e) => {
                setTestedName(e.target.value);
                setStatusMessage(null);
              }}
              className="w-full bg-[#0a0f1e] text-white px-4 py-3 rounded-xl border border-slate-700 focus:border-amber-400 outline-none font-subgaming font-bold text-lg"
            />
          </div>

          {/* Engine Compatibility feedback */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                statusMessage.startsWith('Fits')
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700'
                  : 'bg-red-950/80 text-red-300 border border-red-700'
              }`}
            >
              {statusMessage.startsWith('Fits') ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage}</span>
            </div>
          )}

          {/* In-Game Cost Note */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
            <span>Item: <strong>Rename Card (ID Card)</strong></span>
            <span>Est. Cost: <strong className="text-amber-400">180 UC / 390 💎</strong></span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTestInGame}
            className="flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 cursor-pointer transition-colors"
          >
            Verify Name Engine
          </button>

          <button
            onClick={handleCopyAndClose}
            className="flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 transition-all"
          >
            <Copy className="w-4 h-4" />
            <span>Copy & Use In-Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};
