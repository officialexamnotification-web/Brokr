import React, { useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Heart, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { countCharacters } from '../lib/character-count';
import { SYMBOL_CATEGORIES } from '../data/symbols';

interface BgmiNameStudioProps {
  nameInput: string;
  onInsertSymbol: (symbol: string) => void;
  onCopyText: (text: string) => void;
  onSaveName: (name: string) => void;
  onOpenRenameCard: (name?: string) => void;
}

type BgmiStyle = 'stylish' | 'esports' | 'clan' | 'minimal' | 'duo';

const STYLE_TABS: Array<{ id: BgmiStyle; label: string; description: string }> = [
  { id: 'stylish', label: 'Stylish', description: 'Frames, crowns and decorative Unicode' },
  { id: 'esports', label: 'Esports', description: 'Short, readable competitive tags' },
  { id: 'clan', label: 'Clan Tags', description: 'Squad prefixes and compact badges' },
  { id: 'minimal', label: 'Clean', description: 'Readable names for safer testing' },
  { id: 'duo', label: 'Duo', description: 'Matching-style names for teammates' },
];

const SMALL_CAPS: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
};

const BGMI_SYMBOL_GROUPS = SYMBOL_CATEGORIES.filter((category) =>
  ['crowns', 'wings', 'stars', 'clan', 'kanji', 'aesthetic'].includes(category.id),
);

const QUICK_MODES: Array<{ label: string; style: BgmiStyle }> = [
  { label: 'Boys', style: 'esports' },
  { label: 'Girls', style: 'duo' },
  { label: 'Stylish', style: 'stylish' },
  { label: 'Clan', style: 'clan' },
  { label: 'Clean', style: 'minimal' },
];

function smallCaps(value: string): string {
  return Array.from(value.toLowerCase()).map((char) => SMALL_CAPS[char] || char).join('');
}

function fitBgmiName(value: string): string {
  const compact = value.replace(/\s+/g, ' ').trim();
  return Array.from(compact).slice(0, 14).join('');
}

function createCandidates(input: string, style: BgmiStyle): string[] {
  const raw = input.replace(/\s+/g, ' ').trim();
  if (!raw) return [];
  const base = Array.from(raw).slice(0, 8).join('');
  const upper = base.toUpperCase();
  const small = smallCaps(base);
  const candidates: Record<BgmiStyle, string[]> = {
    stylish: [`꧁${small}꧂`, `亗 ${small} 亗`, `〆${upper}〆`, `乂${small}乂`, `『${upper}』`, `彡★${small}★彡`, `☬${upper}☬`, `𓆩${small}𓆪`],
    esports: [`${upper}・OP`, `TX・${upper}`, `x${small}x`, `${upper} 7`, `⚡${upper}`, `${upper}乂`, `${upper}・GG`, `亗${upper}`],
    clan: [`[${upper}]`, `么${upper}么`, `★${upper}★`, `${upper}丨`, `〆${upper}`, `『${upper}』`, `乂${upper}乂`, `•${upper}•`],
    minimal: [upper, small, `${upper}_7`, `${upper}YT`, `${upper}X`, `${upper}OP`, `${upper}GG`, `${upper}01`],
    duo: [`♡${small}♡`, `✿${upper}✿`, `𓆩${small}𓆪`, `亗${upper}亗`, `★${small}★`, `ღ${upper}ღ`, `ツ${small}ツ`, `❥${upper}`],
  };
  return Array.from(new Set(candidates[style].map(fitBgmiName).filter(Boolean)));
}

export const BgmiNameStudio: React.FC<BgmiNameStudioProps> = ({
  nameInput,
  onInsertSymbol,
  onCopyText,
  onSaveName,
  onOpenRenameCard,
}) => {
  const [activeStyle, setActiveStyle] = useState<BgmiStyle>('stylish');
  const [activeSymbolGroup, setActiveSymbolGroup] = useState(BGMI_SYMBOL_GROUPS[0]?.id || 'crowns');
  const [showSymbolLibrary, setShowSymbolLibrary] = useState(false);
  const [symbolSearch, setSymbolSearch] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const candidates = useMemo(() => createCandidates(nameInput, activeStyle), [nameInput, activeStyle]);
  const allActiveSymbols = BGMI_SYMBOL_GROUPS.find((group) => group.id === activeSymbolGroup)?.symbols || [];
  const activeSymbols = allActiveSymbols.filter((symbol) => !symbolSearch.trim() || symbol.includes(symbolSearch.trim()));
  const visibleSymbols = showSymbolLibrary ? activeSymbols : activeSymbols.slice(0, 12);
  const totalSymbolCount = BGMI_SYMBOL_GROUPS.reduce((total, group) => total + group.symbols.length, 0);

  const copyCandidate = (name: string) => {
    onCopyText(name);
    setCopiedName(name);
    window.setTimeout(() => setCopiedName((current) => (current === name ? null : current)), 1600);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-orange-500/25 bg-[#0a0f1d] shadow-xl shadow-orange-950/10">
      <div className="border-b border-slate-800/90 bg-gradient-to-r from-orange-500/10 via-transparent to-cyan-500/10 p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-orange-400/30 bg-orange-500/10 p-2.5 text-orange-300"><Sparkles className="h-5 w-5" /></div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-gaming text-base font-bold text-white sm:text-lg">BGMI Name Studio</h2>
                <span className="rounded border border-orange-400/30 bg-orange-950/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-300">BGMI focused</span>
              </div>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400">Create stylish BGMI nicknames, clan tags and clean competitive names from your own text. Every result is kept within this tool’s working 14-character guidance.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            <span>Test recommended in the current client</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {STYLE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStyle(tab.id)}
              title={tab.description}
              className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-bold transition ${activeStyle === tab.id ? 'border-orange-400 bg-orange-500 text-black' : 'border-slate-700 bg-[#070b14] text-slate-300 hover:border-orange-400/60 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Name ideas for:</span>
          {QUICK_MODES.map((mode) => (
            <button key={mode.label} type="button" onClick={() => setActiveStyle(mode.style)} className={`rounded-md border px-2.5 py-1.5 text-[10px] font-bold ${activeStyle === mode.style ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!nameInput.trim() ? (
          <div className="rounded-xl border border-dashed border-slate-700 bg-[#070b14] px-4 py-8 text-center">
            <p className="font-gaming text-sm font-bold text-slate-200">Enter your nickname above to create BGMI styles</p>
            <p className="mt-1 text-xs text-slate-500">The studio uses your text; it does not insert a pre-filled player name.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {candidates.map((name) => {
              const isCopied = copiedName === name;
              return (
                <article key={name} className="rounded-xl border border-slate-800 bg-[#070b14] p-3 transition hover:border-orange-400/50">
                  <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500">
                    <span className="text-emerald-300">Test recommended</span>
                    <span className="font-mono">{countCharacters(name)}/14c</span>
                  </div>
                  <div className="mt-2 flex min-h-12 items-center overflow-x-auto rounded-lg border border-slate-800 bg-[#050811] px-3 py-2 no-scrollbar">
                    <span className="whitespace-nowrap text-sm font-bold tracking-wide text-white">{name}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button type="button" onClick={() => copyCandidate(name)} className={`inline-flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold ${isCopied ? 'bg-emerald-500 text-black' : 'bg-orange-500 text-black hover:bg-orange-400'}`}>
                      {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{isCopied ? 'Copied' : 'Copy'}
                    </button>
                    <button type="button" onClick={() => onSaveName(name)} title="Save BGMI name" className="rounded-md border border-slate-700 p-1.5 text-slate-400 hover:border-red-400 hover:text-red-300"><Heart className="h-3 w-3" /></button>
                    <button type="button" onClick={() => onOpenRenameCard(name)} title="Open rename test" className="rounded-md border border-slate-700 px-2 py-1.5 text-[10px] font-bold text-slate-300 hover:border-cyan-400 hover:text-cyan-300">Test</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-slate-800 bg-[#070b14] p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">BGMI symbols for copy and insert</h3>
              <p className="mt-1 text-[11px] text-slate-500">{totalSymbolCount} curated Unicode symbols. Support can vary by client version and device.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
                <input value={symbolSearch} onChange={(event) => setSymbolSearch(event.target.value)} placeholder="Find symbol" className="w-28 rounded-md border border-slate-700 bg-[#050811] py-1.5 pl-7 pr-2 text-[10px] text-white outline-none focus:border-cyan-400" />
              </label>
              <a href="https://www.battlegroundsmobileindia.com/rules" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 hover:text-cyan-200">Official rules <ExternalLink className="h-3 w-3" /></a>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {BGMI_SYMBOL_GROUPS.map((group) => (
              <button key={group.id} type="button" onClick={() => setActiveSymbolGroup(group.id)} className={`whitespace-nowrap rounded-md border px-2.5 py-1.5 text-[10px] font-bold ${activeSymbolGroup === group.id ? 'border-cyan-400 bg-cyan-500 text-black' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
                {group.name}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleSymbols.map((symbol, index) => (
              <button key={`${symbol}-${index}`} type="button" onClick={() => onInsertSymbol(symbol)} className="min-w-9 rounded-lg border border-slate-700 bg-[#050811] px-2 py-1.5 text-sm text-white transition hover:border-cyan-400 hover:bg-cyan-500 hover:text-black" title={`Insert ${symbol}`}>
                {symbol}
              </button>
            ))}
          </div>
          {activeSymbols.length > 12 && (
            <button type="button" onClick={() => setShowSymbolLibrary((value) => !value)} className="mt-3 rounded-md border border-slate-700 px-3 py-1.5 text-[10px] font-bold text-slate-300 hover:border-cyan-400 hover:text-white">
              {showSymbolLibrary ? 'Show fewer symbols' : `Show all ${activeSymbols.length} in this category`}
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 text-[11px] leading-5 text-slate-400 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-[#070b14] p-3"><strong className="text-amber-300">14-character guide</strong><br />This is a practical working limit for this tool, not a permanent publisher guarantee.</div>
          <div className="rounded-lg border border-slate-800 bg-[#070b14] p-3"><strong className="text-emerald-300">Safer start</strong><br />Try the Clean or Esports tab first when a decorative name is rejected.</div>
          <div className="rounded-lg border border-slate-800 bg-[#070b14] p-3"><strong className="text-rose-300">Name safety</strong><br />Avoid abusive, hateful or impersonating nicknames; BGMI rules can penalize inappropriate names.</div>
        </div>

        <div className="mt-5 border-t border-slate-800 pt-5">
          <h3 className="font-gaming text-sm font-bold text-white">How to choose a BGMI name</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-[#070b14] p-3"><strong className="text-cyan-300">1. Start with your word</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Use your own nickname, role, squad tag or a short keyword in the input above.</p></div>
            <div className="rounded-lg border border-slate-800 bg-[#070b14] p-3"><strong className="text-cyan-300">2. Pick a category</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Try Boys, Girls, Stylish, Clan or Clean modes to create different identity styles.</p></div>
            <div className="rounded-lg border border-slate-800 bg-[#070b14] p-3"><strong className="text-cyan-300">3. Test before saving</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Copy the final result into the current BGMI rename screen and confirm how it renders.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};
