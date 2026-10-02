import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Gamepad2, Newspaper, ShieldCheck, Trophy } from 'lucide-react';
import { POPULAR_GAMES } from '../data/games';
import { GAME_NEWS_BY_ID, GAME_NEWS_INDEX, type GameNewsPage as GameNewsRecord } from '../data/game-news';
import { SITE_DISPLAY_NAME } from '../data/game-seo';
import { applyGameNewsSeo } from '../lib/seo';

function NewsCard({ gameId }: { gameId: string }) {
  const game = POPULAR_GAMES.find((item) => item.id === gameId)!;
  const page = GAME_NEWS_BY_ID.get(gameId)!;
  return <a href={`/game-news/${gameId}`} className="group rounded-2xl border border-slate-800 bg-[#080d1a] p-5 transition hover:border-cyan-400/50 hover:bg-slate-900/70">
    <div className="flex items-center justify-between gap-3"><span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-300">{game.shortName}</span><span className="text-[10px] text-slate-500">Updated {page.updateDate}</span></div>
    <h2 className="mt-4 text-lg font-extrabold leading-snug text-white group-hover:text-cyan-200">{page.updateHeading}</h2>
    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{page.intro}</p>
    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-300">Read {game.shortName} update <ExternalLink className="h-3.5 w-3.5" /></span>
  </a>;
}

function GameArticle({ page }: { page: GameNewsRecord }) {
  const game = POPULAR_GAMES.find((item) => item.id === page.gameId)!;
  return <article className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 shadow-2xl shadow-black/30">
    <header className="bg-radial-hero px-6 py-9 sm:px-10 sm:py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500"><a href="/" className="hover:text-white">Home</a><span className="px-2">/</span><a href="/game-news" className="hover:text-white">Game News</a><span className="px-2">/</span><span>{game.shortName}</span></nav>
      <div className="mt-6 flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-300">{game.name}</span><span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-[10px] text-slate-400">Updated {page.updateDate}</span></div>
      <h1 className="mt-5 max-w-4xl font-gaming text-2xl font-black leading-tight text-white sm:text-4xl">{page.heading}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{page.intro}</p>
    </header>
    <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
      <section><div className="flex items-start gap-3"><Newspaper className="mt-1 h-5 w-5 shrink-0 text-cyan-300" /><div><h2 className="text-xl font-bold text-white">{page.updateHeading}</h2><div className="mt-3 space-y-4">{page.update.map((paragraph) => <p key={paragraph} className="max-w-4xl text-sm leading-8 text-slate-300">{paragraph}</p>)}</div></div></div></section>
      <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><div className="flex items-start gap-3"><Gamepad2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" /><div className="w-full"><h2 className="text-lg font-bold text-white">{page.playerFocusHeading}</h2><ul className="mt-3 space-y-3">{page.playerFocus.map((item) => <li key={item} className="flex gap-2 text-sm leading-7 text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />{item}</li>)}</ul></div></div></section>
      <section><div className="flex items-start gap-3"><Trophy className="mt-1 h-5 w-5 shrink-0 text-violet-300" /><div><h2 className="text-xl font-bold text-white">{page.competitionHeading}</h2><ul className="mt-3 space-y-3">{page.competition.map((item) => <li key={item} className="max-w-4xl text-sm leading-7 text-slate-300">{item}</li>)}</ul></div></div></section>
      <section className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><div><h2 className="font-bold text-emerald-200">Official sources checked</h2><p className="mt-1 text-xs leading-5 text-slate-400">Publisher and tournament-organizer links for the details on this page. Game schedules, passes and offers can change; open the original source or in-game news for the current regional availability.</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{page.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold leading-5 text-emerald-300 hover:text-white">{source.name}<ExternalLink className="h-3 w-3 shrink-0" /></a></li>)}</ul></div></div></section>
      <section><h2 className="text-xl font-bold text-white">{game.shortName} questions players ask</h2><div className="mt-3 grid gap-3">{page.faqs.map((faq) => <div key={faq.question} className="rounded-xl border border-slate-800 bg-slate-950/45 p-4"><h3 className="font-semibold text-slate-200">{faq.question}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{faq.answer}</p></div>)}</div></section>
      <nav aria-label="Related pages" className="flex flex-wrap gap-3 border-t border-slate-800 pt-6"><a href={`/${game.slug}`} className="rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-cyan-300">Open {game.shortName} name generator</a><a href="/tournaments" className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 hover:border-amber-400 hover:text-white">Browse tournament calendar</a><a href="/game-news" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" />All game news</a></nav>
    </div>
  </article>;
}

export function GameNewsPage({ gameId }: { gameId?: string }) {
  const page = gameId ? GAME_NEWS_BY_ID.get(gameId) : undefined;
  const game = gameId ? POPULAR_GAMES.find((item) => item.id === gameId) : undefined;
  useEffect(() => { if (page && game) applyGameNewsSeo(page, game); }, [page, game]);
  if (page && game) {
    return <main className="min-h-screen bg-[#050811] px-4 py-8 text-slate-100 sm:px-6"><div className="mx-auto max-w-5xl"><GameArticle page={page} /><p className="mt-5 text-center text-[10px] text-slate-600">© 2026 {SITE_DISPLAY_NAME}. Independently summarized from linked official sources.</p></div></main>;
  }
  return <main className="min-h-screen bg-[#050811] px-4 py-10 text-slate-100 sm:px-6"><div className="mx-auto max-w-7xl"><header className="rounded-3xl border border-slate-800 bg-[#080d1a] px-6 py-9 sm:px-10"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Official-source game desk</p><h1 className="mt-3 font-gaming text-3xl font-black text-white sm:text-5xl">Game news, seasons and tournament updates</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">Separate update pages for each supported game. Find current patches, passes, live-service events and tournament schedules, with official links and missing details clearly called out.</p></header><section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{GAME_NEWS_INDEX.map((game) => <NewsCard key={game.id} gameId={game.id} />)}</section><p className="mt-8 text-xs leading-6 text-slate-500">News pages are available for game titles. Xbox, PlayStation Network and Steam are profile platforms in the name generator, so they do not have duplicate game tournament pages.</p></div></main>;
}
import { useEffect } from 'react';
