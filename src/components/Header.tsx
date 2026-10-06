import React, { useState } from 'react';
import { CreditCard, Flame, Gamepad2, Heart, Layers, Menu, Newspaper, ShieldCheck, Trophy, X } from 'lucide-react';
import { NAME_LANGUAGES } from '../data/languages';
import { getGlobalUi } from '../data/language-ui';
import { SITE_NAME, SITE_SUFFIX } from '../data/game-seo';

interface HeaderProps {
  activeTab: 'generator' | 'symbols' | 'studio' | 'trending';
  setActiveTab: (tab: 'generator' | 'symbols' | 'studio' | 'trending') => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenRenameSimulator: () => void;
  onHome: () => void;
  language: string;
  setLanguage: (language: string) => void;
}

const NAV_ITEMS = [
  { id: 'generator' as const, icon: Gamepad2, badge: 'Popular' },
  { id: 'studio' as const, icon: ShieldCheck, badge: 'Pro' },
  { id: 'symbols' as const, icon: Layers },
  { id: 'trending' as const, icon: Flame },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  onOpenRenameSimulator,
  onHome,
  language,
  setLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ui = getGlobalUi(language);

  const labels: Record<(typeof NAV_ITEMS)[number]['id'], string> = {
    generator: ui.nameGenerator,
    studio: ui.idCardStudio,
    symbols: ui.symbolsSpace,
    trending: ui.trendingNames,
  };

  const handleTabClick = (tabId: (typeof NAV_ITEMS)[number]['id']) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-[#060914]/95 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-7">
        <div className="flex min-h-[72px] items-center gap-3 lg:gap-4">
          <button type="button" onClick={onHome} className="group flex min-w-0 shrink-0 items-center gap-2.5 text-left" aria-label={`${SITE_NAME} home`}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-slate-950 shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
              <Gamepad2 className="h-5 w-5 stroke-[2.6]" />
            </span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap font-gaming text-[15px] font-black tracking-wide text-white sm:text-[18px]">{SITE_NAME.toUpperCase()}</span>
              <span className="mt-0.5 hidden truncate text-[10px] font-medium text-amber-300 lg:block">{SITE_SUFFIX}</span>
            </span>
          </button>

          <nav className="hidden min-w-0 flex-1 items-center gap-1 rounded-2xl border border-slate-800 bg-[#0b101d] p-1.5 shadow-inner xl:flex" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} type="button" onClick={() => handleTabClick(item.id)} title={labels[item.id]} className={`relative flex h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 text-center transition-all ${isActive ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/15' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'}`}>
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span className="min-w-0 truncate text-[11px] font-extrabold leading-tight 2xl:text-xs">{labels[item.id]}</span>
                  {item.badge && <span className={`hidden rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide 2xl:inline ${isActive ? 'bg-black/15 text-slate-950' : 'border border-amber-500/30 bg-amber-500/10 text-amber-300'}`}>{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
            <div className="grid h-12 w-[142px] grid-cols-2 gap-1">
              <a href="/esports-news" aria-label="Open esports news" className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl border border-slate-800 bg-[#0b101d] px-1 text-center text-[9px] font-extrabold leading-tight text-slate-200 transition hover:border-cyan-400/60 hover:bg-slate-800 hover:text-white"><Newspaper className="h-3.5 w-3.5 shrink-0 text-cyan-300" /><span>Game News</span></a>
              <a href="/tournaments" aria-label="Browse tournament calendar" className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-1 text-center text-[9px] font-extrabold leading-tight text-amber-200 transition hover:border-amber-300 hover:bg-amber-500/20 hover:text-white"><Trophy className="h-3.5 w-3.5 shrink-0 text-amber-300" /><span>Tournaments</span></a>
            </div>
            <label className="flex h-12 w-[142px] items-center justify-center rounded-xl border border-slate-800 bg-[#0b101d] px-2.5">
              <span className="sr-only">{ui.languageLabel}</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={ui.languageLabel} className="w-full cursor-pointer bg-transparent text-center text-[10px] font-bold text-slate-200 outline-none">
                {NAME_LANGUAGES.map((item) => <option key={item.id} value={item.id} className="bg-[#0b101d]">{item.label} · {item.nativeLabel}</option>)}
              </select>
            </label>
            <button type="button" onClick={onOpenRenameSimulator} title={ui.renameCardTest} className="flex h-12 w-[142px] items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-[#0b101d] px-2 text-center text-[10px] font-extrabold leading-tight text-slate-200 transition hover:border-amber-400/60 hover:bg-slate-800 hover:text-white"><CreditCard className="h-4 w-4 shrink-0 text-amber-400" /><span className="line-clamp-2">{ui.renameCardTest}</span></button>
            <button type="button" onClick={onOpenSaved} title={ui.favorites} className="relative flex h-12 w-[118px] items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-[#0b101d] px-2 text-center text-[10px] font-extrabold text-slate-200 transition hover:border-red-400/60 hover:bg-slate-800 hover:text-white"><Heart className={`h-4 w-4 shrink-0 ${savedCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} /><span className="truncate">{ui.favorites}</span>{savedCount > 0 && <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-black leading-none text-white">{savedCount}</span>}</button>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 xl:hidden">
            <button type="button" onClick={onOpenRenameSimulator} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-800 bg-[#0b101d] text-slate-300 transition hover:border-amber-400/60 hover:text-white" title={ui.renameCardTest} aria-label={ui.renameCardTest}><CreditCard className="h-4 w-4 text-amber-400" /></button>
            <button type="button" onClick={onOpenSaved} className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-800 bg-[#0b101d] text-slate-300 transition hover:border-red-400/60 hover:text-white" title={ui.favorites} aria-label={ui.favorites}><Heart className={`h-4 w-4 ${savedCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />{savedCount > 0 && <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-red-500 px-1 text-[9px] font-black leading-4 text-white">{savedCount}</span>}</button>
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-800 bg-[#0b101d] text-slate-300 transition hover:border-amber-400/60 hover:text-white" aria-label="Toggle navigation menu">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-800/90 bg-[#060914] px-3 py-3 sm:px-5 xl:hidden">
          <div className="mx-auto max-w-7xl space-y-2">
            <label className="flex h-11 items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0b101d] px-3 text-xs font-bold text-slate-300">
              <span>{ui.languageLabel}</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={ui.languageLabel} className="max-w-[180px] bg-transparent text-right text-xs text-white outline-none">
                {NAME_LANGUAGES.map((item) => <option key={item.id} value={item.id} className="bg-[#0b101d]">{item.label} · {item.nativeLabel}</option>)}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return <button key={item.id} type="button" onClick={() => handleTabClick(item.id)} className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-2 text-center text-xs font-extrabold ${isActive ? 'border-amber-400 bg-amber-500 text-slate-950' : 'border-slate-800 bg-[#0b101d] text-slate-300 hover:border-slate-600 hover:text-white'}`}><Icon className="h-4 w-4 shrink-0" /><span className="truncate">{labels[item.id]}</span></button>;
              })}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href="/esports-news" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-xs font-extrabold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20"><Newspaper className="h-4 w-4" /> Game News</a>
              <a href="/tournaments" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 text-xs font-extrabold text-amber-200 transition hover:border-amber-300 hover:bg-amber-500/20"><Trophy className="h-4 w-4" /> Tournaments</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
