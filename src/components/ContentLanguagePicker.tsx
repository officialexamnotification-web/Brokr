import { useEffect, useState } from 'react';
import { Globe2, X } from 'lucide-react';
import { NAME_LANGUAGES } from '../data/languages';

const STORAGE_KEY = 'gamingnamehub_language';
const CONTENT_PROMPT_KEY = 'gamingnamehub_language_prompted';
const GOOGLE_LANGUAGES: Record<string, string> = {
  global: 'en', english: 'en', hindi: 'hi', hinglish: 'en', spanish: 'es', portuguese: 'pt', indonesian: 'id', french: 'fr', arabic: 'ar', arabic_latin: 'en', bengali: 'bn', japanese: 'ja', korean: 'ko', chinese_simplified: 'zh-CN', chinese_traditional: 'zh-TW', vietnamese: 'vi', thai: 'th', russian: 'ru', filipino: 'tl', malay: 'ms',
};

declare global {
  interface Window { google?: { translate?: { TranslateElement: new (options: Record<string, string>, element: string) => unknown } } }
}

export function ContentLanguagePicker({ onLanguageChange }: { onLanguageChange?: (language: string) => void }) {
  const [language, setLanguage] = useState('global');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    (window as Window & { tradivexGoogleTranslateInit?: () => void }).tradivexGoogleTranslateInit = () => {
      if (window.google?.translate?.TranslateElement && !document.querySelector('.goog-te-combo')) {
        new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: 'false' }, 'tradivex-google-translate');
      }
    };
    const existing = document.querySelector('script[data-tradivex-translate]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=tradivexGoogleTranslateInit';
      script.async = true;
      script.dataset.tradivexTranslate = 'true';
      document.head.appendChild(script);
    }
    const timer = window.setTimeout(() => (window as Window & { tradivexGoogleTranslateInit?: () => void }).tradivexGoogleTranslateInit?.(), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const applyPageLanguage = (next: string, reload = false) => {
    const target = GOOGLE_LANGUAGES[next] || 'en';
    if (target === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    } else {
      document.cookie = `googtrans=/en/${target}; path=/`;
    }
    if (reload) {
      window.location.reload();
      return;
    }
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = target;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => applyPageLanguage(language), 1400);
    return () => window.clearTimeout(timer);
  }, [language]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && NAME_LANGUAGES.some((item) => item.id === saved)) setLanguage(saved);
      if (localStorage.getItem(CONTENT_PROMPT_KEY) !== 'true') setShowPrompt(true);
    } catch { setShowPrompt(true); }
  }, []);

  const changeLanguage = (next: string) => {
    setLanguage(next);
    onLanguageChange?.(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* private browsing */ }
    try { localStorage.setItem(CONTENT_PROMPT_KEY, 'true'); } catch { /* private browsing */ }
    setShowPrompt(false);
    window.setTimeout(() => applyPageLanguage(next, true), 250);
  };

  return <>
    <div id="tradivex-google-translate" className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true" />
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-[#080d1a] px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Globe2 className="h-4 w-4 text-cyan-300" />Content language</div>
      <select value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label="Content language" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-white outline-none focus:border-cyan-400">
        {NAME_LANGUAGES.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.nativeLabel}</option>)}
      </select>
    </div>
    {showPrompt && <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4" role="dialog" aria-modal="true" aria-labelledby="content-language-title">
      <div className="w-full max-w-md rounded-2xl border border-cyan-400/30 bg-[#080d1a] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4"><div><Globe2 className="h-6 w-6 text-cyan-300" /><h2 id="content-language-title" className="mt-3 text-xl font-black text-white">Choose your language</h2><p className="mt-2 text-sm leading-6 text-slate-400">Select a language for this news and tournament page.</p></div><button type="button" onClick={() => { try { localStorage.setItem(CONTENT_PROMPT_KEY, 'true'); } catch { /* private browsing */ } setShowPrompt(false); }} aria-label="Close language dialog" className="text-slate-500 hover:text-white"><X className="h-5 w-5" /></button></div>
        <div className="mt-5 grid max-h-64 grid-cols-2 gap-2 overflow-y-auto">{NAME_LANGUAGES.map((item) => <button type="button" key={item.id} onClick={() => changeLanguage(item.id)} className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-left text-xs font-bold text-slate-200 transition hover:border-cyan-400 hover:text-white">{item.label}<span className="mt-0.5 block text-[10px] font-normal text-slate-500">{item.nativeLabel}</span></button>)}</div>
      </div>
    </div>}
  </>;
}
