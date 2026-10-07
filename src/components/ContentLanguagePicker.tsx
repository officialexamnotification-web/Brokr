import { useEffect, useState } from 'react';
import { Globe2, X } from 'lucide-react';
import { NAME_LANGUAGES } from '../data/languages';

const STORAGE_KEY = 'gamingnamehub_language';

export function ContentLanguagePicker() {
  const [language, setLanguage] = useState('global');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && NAME_LANGUAGES.some((item) => item.id === saved)) setLanguage(saved);
      else setShowPrompt(true);
    } catch { setShowPrompt(true); }
  }, []);

  const changeLanguage = (next: string) => {
    setLanguage(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* private browsing */ }
    setShowPrompt(false);
  };

  return <>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-[#080d1a] px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Globe2 className="h-4 w-4 text-cyan-300" />Content language</div>
      <select value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label="Content language" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-white outline-none focus:border-cyan-400">
        {NAME_LANGUAGES.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.nativeLabel}</option>)}
      </select>
    </div>
    {showPrompt && <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4" role="dialog" aria-modal="true" aria-labelledby="content-language-title">
      <div className="w-full max-w-md rounded-2xl border border-cyan-400/30 bg-[#080d1a] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4"><div><Globe2 className="h-6 w-6 text-cyan-300" /><h2 id="content-language-title" className="mt-3 text-xl font-black text-white">Choose your language</h2><p className="mt-2 text-sm leading-6 text-slate-400">Select a language for the page labels and regional reading preference.</p></div><button type="button" onClick={() => setShowPrompt(false)} aria-label="Close language dialog" className="text-slate-500 hover:text-white"><X className="h-5 w-5" /></button></div>
        <div className="mt-5 grid max-h-64 grid-cols-2 gap-2 overflow-y-auto">{NAME_LANGUAGES.map((item) => <button type="button" key={item.id} onClick={() => changeLanguage(item.id)} className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-left text-xs font-bold text-slate-200 transition hover:border-cyan-400 hover:text-white">{item.label}<span className="mt-0.5 block text-[10px] font-normal text-slate-500">{item.nativeLabel}</span></button>)}</div>
      </div>
    </div>}
  </>;
}
