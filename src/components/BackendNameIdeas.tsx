import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check, Copy, Loader2, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { GameProfile } from '../types';
import { BackendName, generateBackendNames } from '../lib/api';
import { generateLocalNames } from '../lib/local-name-engine';
import { NAME_LANGUAGES } from '../data/languages';
import { getLanguageUi } from '../data/language-ui';

interface BackendNameIdeasProps {
  keyword: string;
  selectedGame: GameProfile;
  language: string;
  setLanguage: (val: string) => void;
  conservative: boolean;
  onCopyText: (text: string) => void;
  onSaveName: (name: string) => void;
}

const DECORATIONS = [
  { id: 'none', label: 'Clean' },
  { id: 'dot', label: '• Minimal' },
  { id: 'crosshair', label: '×͜× Crosshair' },
  { id: 'crown', label: '♛ Crown' },
  { id: 'shield', label: '『』 Shield' },
  { id: 'warrior', label: '༒ Warrior' },
  { id: 'wings', label: '𓆩 Wings' },
  { id: 'royal', label: '꧁ Royal' },
  { id: 'ornate', label: '꧁༺ Ornate' },
  { id: 'flame', label: 'ঔৣ Flame' },
];

const STYLES = [
  { id: 'pro', label: 'Esports Pro' },
  { id: 'aggressive', label: 'Aggressive' },
  { id: 'aesthetic', label: 'Aesthetic' },
  { id: 'mythic', label: 'Mythic' },
  { id: 'stealth', label: 'Stealth' },
  { id: 'funny', label: 'Funny' },
];

const compatibilityLabel: Record<BackendName['compatibility'], string> = {
  likely: 'Likely compatible',
  'test-recommended': 'Test recommended',
  unknown: 'Needs client test',
  avoid: 'Avoid for this limit',
};

export const BackendNameIdeas: React.FC<BackendNameIdeasProps> = ({
  keyword,
  selectedGame,
  language,
  setLanguage,
  conservative,
  onCopyText,
  onSaveName,
}) => {
  const [style, setStyle] = useState('pro');
  const [decorationId, setDecorationId] = useState('none');
  const [names, setNames] = useState<BackendName[]>([]);
  const [meta, setMeta] = useState<{ limit: number | null; sourceStatus: string; note: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const languageUi = getLanguageUi(language);

  const loadNames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateBackendNames({
        keyword,
        game: selectedGame,
        language,
        style,
        decorationId,
        conservative,
        count: 12,
      });
      setNames(response.names);
      setMeta(response.meta);
    } catch {
      const fallback = generateLocalNames({ keyword, game: selectedGame, language, style, decorationId, conservative, count: 12 });
      setNames(fallback.names);
      setMeta(fallback.meta);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadNames();
    // Regenerate when the selected game or language changes; style and decoration
    // remain manual controls so a user can combine them before regenerating.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame.id, conservative, language]);

  const copyName = (item: BackendName) => {
    onCopyText(item.name);
    setCopiedId(item.id);
    window.setTimeout(() => setCopiedId((current) => (current === item.id ? null : current)), 1600);
  };

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-[#080d1a] p-4 sm:p-5 shadow-lg shadow-cyan-950/10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl border border-cyan-500/25 bg-cyan-500/10 p-2.5 text-cyan-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-gaming text-sm font-bold text-white sm:text-base">Game-aware name ideas</h3>
                <span className="rounded border border-cyan-500/25 bg-cyan-950/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Hybrid engine
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-[11px] leading-relaxed text-slate-400">
                {selectedGame.shortName} rules, language pools and decoration presets are generated through the shared engine.
                Native-script languages produce language-first words; your nickname is used as a seed. If the remote function is unavailable, the same core generation works locally in your browser.
              </p>
            </div>
          </div>
          <button
            onClick={() => void loadNames()}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-[#050811] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-500/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Regenerate
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {languageUi.languageLabel}
            <select value={language} onChange={(event) => setLanguage(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-800 bg-[#050811] px-2.5 py-2 text-xs font-semibold normal-case tracking-normal text-slate-200 outline-none focus:border-cyan-400">
              {NAME_LANGUAGES.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.nativeLabel}</option>)}
            </select>
          </label>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Style
            <select value={style} onChange={(event) => setStyle(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-800 bg-[#050811] px-2.5 py-2 text-xs font-semibold normal-case tracking-normal text-slate-200 outline-none focus:border-cyan-400">
              {STYLES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Decoration
            <select value={decorationId} onChange={(event) => setDecorationId(event.target.value)} disabled={conservative} className="mt-1.5 w-full rounded-lg border border-slate-800 bg-[#050811] px-2.5 py-2 text-xs font-semibold normal-case tracking-normal text-slate-200 outline-none focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50">
              {DECORATIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
        </div>

        {meta && (
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
            <span className="rounded border border-slate-800 bg-[#050811] px-2 py-1">{meta.limit ? `${meta.limit} character limit used` : 'No verified limit in matrix'}</span>
            <span className="rounded border border-slate-800 bg-[#050811] px-2 py-1">Source: {meta.sourceStatus === 'needs-testing' ? 'client test needed' : meta.sourceStatus}</span>
            {conservative && <span className="rounded border border-emerald-800/60 bg-emerald-950/30 px-2 py-1 text-emerald-300">Safe mode: clean names only</span>}
          </div>
        )}

        {error && <div className="rounded-xl border border-red-800/60 bg-red-950/30 px-3 py-2 text-xs text-red-300">{error}</div>}

        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
          {names.map((item) => {
            const isCopied = copiedId === item.id;
            const statusColor = item.compatibility === 'likely' ? 'text-emerald-300 border-emerald-800/60 bg-emerald-950/30' : item.compatibility === 'avoid' ? 'text-red-300 border-red-800/60 bg-red-950/30' : 'text-amber-300 border-amber-800/60 bg-amber-950/30';
            return (
              <div key={item.id} className="rounded-xl border border-slate-800/90 bg-[#050811] p-3.5 transition hover:border-cyan-500/40">
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold ${statusColor}`}>
                    {item.compatibility === 'likely' ? <ShieldCheck className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    {compatibilityLabel[item.compatibility]}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">{item.characters}c</span>
                </div>
                <div className="mt-3 overflow-x-auto rounded-lg border border-slate-800/80 bg-[#080d1a] px-3 py-3 no-scrollbar">
                  <p className="whitespace-nowrap text-base font-bold tracking-wide text-white">{item.name}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="truncate text-[10px] text-slate-500">{item.vibe} · {item.meaning}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button onClick={() => onSaveName(item.name)} className="rounded-md border border-slate-800 px-2 py-1 text-[10px] font-bold text-slate-400 transition hover:border-slate-600 hover:text-white">Save</button>
                    <button onClick={() => copyName(item)} className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold ${isCopied ? 'bg-emerald-500 text-black' : 'bg-cyan-500 text-black hover:bg-cyan-400'}`}>
                      {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {isCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
