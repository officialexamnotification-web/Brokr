import React, { useState } from 'react';
import { Gamepad2, Sparkles, Heart, Flame, ShieldCheck, CreditCard, Menu, X, Layers, Award } from 'lucide-react';
import { NAME_LANGUAGES } from '../data/languages';
import { getGlobalUi } from '../data/language-ui';

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

  const navItems = [
    { id: 'generator' as const, label: ui.nameGenerator, icon: Gamepad2, badge: 'Popular' },
    { id: 'studio' as const, label: ui.idCardStudio, icon: ShieldCheck, badge: 'PRO' },
    { id: 'symbols' as const, label: ui.symbolsSpace, icon: Layers },
    { id: 'trending' as const, label: ui.trendingNames, icon: Flame },
  ];

  const handleTabClick = (tabId: 'generator' | 'symbols' | 'studio' | 'trending') => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070a13]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none" 
            onClick={onHome}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-gaming font-black text-lg sm:text-xl tracking-wider text-white">
                  GAMING<span className="text-amber-400">NAME</span><span className="text-white">HUB</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Gamer Name Generator & ID Card Studio
              </p>
            </div>
          </div>

          {/* Desktop navigation and utility actions share one continuous control box. */}
          <div className="hidden lg:flex items-stretch overflow-hidden rounded-xl border border-slate-800 bg-[#0b101d] shadow-sm">
          <nav className="flex items-center gap-1 p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                        isActive
                          ? 'bg-black/20 text-black'
                          : item.badge === 'AI'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-stretch border-l border-slate-800/90 bg-[#0e1424]">
            <label className="hidden items-center border-r border-slate-700/80 px-3 xl:flex">
              <span className="sr-only">{ui.languageLabel}</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={ui.languageLabel} className="max-w-[132px] cursor-pointer bg-transparent py-2 text-[11px] font-bold text-slate-200 outline-none">
                {NAME_LANGUAGES.map((item) => <option key={item.id} value={item.id} className="bg-[#0e1424]">{item.label} · {item.nativeLabel}</option>)}
              </select>
            </label>
            <button
              onClick={onOpenRenameSimulator}
              className="px-3.5 py-2 text-xs font-bold text-slate-200 transition-all hover:bg-[#151e36] hover:text-white"
              title="Test nickname inside the game rename card simulator"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <CreditCard className="h-3.5 w-3.5 text-amber-400" />
                {ui.renameCardTest}
              </span>
            </button>
            <button
              onClick={onOpenSaved}
              className="relative flex items-center gap-2 border-l border-slate-700/80 px-3.5 py-2 text-xs font-bold text-slate-200 transition-all hover:bg-[#151e36] hover:text-white"
              title="View saved favorites"
            >
              <Heart className={`h-4 w-4 ${savedCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              <span>{ui.favorites}</span>
              {savedCount > 0 && (
                <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-mono font-bold leading-none text-white">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compact mobile utility group */}
            <div className="flex items-center overflow-hidden rounded-xl border border-slate-700/80 bg-[#0e1424] sm:hidden">
              <button onClick={onOpenRenameSimulator} className="p-2 text-slate-300 transition hover:bg-[#151e36] hover:text-white" title="Rename card test">
                <CreditCard className="h-4 w-4 text-amber-400" />
              </button>
              <button onClick={onOpenSaved} className="relative border-l border-slate-700/80 p-2 text-slate-300 transition hover:bg-[#151e36] hover:text-white" title="Favorites">
                <Heart className={`h-4 w-4 ${savedCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                {savedCount > 0 && <span className="absolute -right-0.5 -top-0.5 min-w-3.5 rounded-full bg-red-500 px-1 text-[9px] font-bold leading-3 text-white">{savedCount}</span>}
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#0e1424] border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-[#070a13] px-4 py-3 space-y-1">
          <label className="mb-2 flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0e1424] px-3 py-2 text-xs font-bold text-slate-300">
            <span>{ui.languageLabel}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={ui.languageLabel} className="bg-transparent text-right text-xs text-white outline-none">
              {NAME_LANGUAGES.map((item) => <option key={item.id} value={item.id} className="bg-[#0e1424]">{item.label} · {item.nativeLabel}</option>)}
            </select>
          </label>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                      isActive ? 'bg-black/20 text-black' : 'bg-slate-800 text-amber-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
