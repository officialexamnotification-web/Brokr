import React from 'react';
import { ArrowUpRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { GameProfile } from '../types';
import { GameSeoContent } from '../data/game-seo';
import { POPULAR_GAMES } from '../data/games';

interface GameSeoSectionProps {
  game: GameProfile;
  seo: GameSeoContent;
  isHome?: boolean;
}

export const GameSeoSection: React.FC<GameSeoSectionProps> = ({ game, seo, isHome = false }) => {
  const relatedGames = POPULAR_GAMES.filter((item) => item.id !== game.id).slice(0, 8);

  return (
    <section className="space-y-5 rounded-2xl border border-slate-800/80 bg-[#080d1a] p-5 shadow-lg sm:p-6">
      <div className="max-w-4xl">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
          <FileText className="h-3.5 w-3.5" />
          {isHome ? 'Game-aware nickname tools' : `${game.shortName} name tool`}
        </div>
        <h1 className="font-gaming text-2xl font-black tracking-tight text-white sm:text-3xl">{seo.h1}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{seo.intro}</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {seo.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 rounded-xl border border-slate-800 bg-[#050811] p-3 text-xs font-semibold text-slate-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {!isHome && (
        <div className="flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs leading-5 text-slate-300">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
          <span><strong className="text-cyan-200">Compatibility note:</strong> {game.compatibilityNote} This page generates ideas; it does not claim live availability.</span>
        </div>
      )}

      <div className="grid gap-3 lg:grid-cols-3">
        {seo.faqs.map((faq) => (
          <article key={faq.question} className="rounded-xl border border-slate-800/90 bg-[#050811] p-4">
            <h2 className="text-sm font-bold text-white">{faq.question}</h2>
            <p className="mt-2 text-xs leading-6 text-slate-400">{faq.answer}</p>
          </article>
        ))}
      </div>

      <div className="border-t border-slate-800/80 pt-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-white">Explore more game name generators</h2>
          <span className="text-[10px] uppercase tracking-wider text-slate-500">Crawlable game pages</span>
        </div>
        <nav aria-label="Related game name generators" className="flex flex-wrap gap-2">
          {relatedGames.map((related) => (
            <a key={related.id} href={`/${related.slug}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#050811] px-2.5 py-2 text-[11px] font-semibold text-slate-300 transition hover:border-amber-500/50 hover:text-amber-300">
              {related.shortName}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};
