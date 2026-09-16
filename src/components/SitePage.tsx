import { useEffect } from 'react';
import { ArrowLeft, ChevronRight, Gamepad2, Mail, ShieldCheck } from 'lucide-react';
import { POPULAR_GAMES } from '../data/games';
import { SITE_PAGES, type SitePageContent } from '../data/site-pages';
import { applyStaticSeo } from '../lib/seo';

interface SitePageProps {
  page: SitePageContent;
}

const pageLinks = SITE_PAGES.map((page) => ({ href: `/${page.slug}`, label: page.heading }));

export function SitePage({ page }: SitePageProps) {
  useEffect(() => {
    applyStaticSeo(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 bg-cyber-grid">
      <header className="border-b border-slate-800/80 bg-[#060a14]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-3" aria-label="GamingNameHub home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"><Gamepad2 className="h-5 w-5" /></span>
            <span>
              <span className="font-gaming text-sm font-black tracking-tight text-white">GAMING<span className="text-amber-400">NAME</span>HUB</span>
              <span className="mt-0.5 block text-[10px] text-slate-400">Game Name Generator</span>
            </span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"><ArrowLeft className="h-3.5 w-3.5" /> Generator</a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 shadow-2xl shadow-black/30">
          <div className="border-b border-slate-800 bg-radial-hero px-6 py-9 sm:px-10 sm:py-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300"><ShieldCheck className="h-3.5 w-3.5" /> GamingNameHub information</div>
            <h1 className="font-gaming text-2xl font-black leading-tight text-white sm:text-4xl">{page.heading}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{page.intro}</p>
          </div>

          <div className="space-y-9 px-6 py-8 sm:px-10 sm:py-10">
            {page.slug === 'contact' && (
              <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-5">
                <div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" /><div><h2 className="font-semibold text-amber-200">Launch action needed</h2><p className="mt-1 text-sm leading-6 text-amber-100/85">Replace this text with your real support email before launch: <span className="font-mono font-bold">YOUR_REAL_SUPPORT_EMAIL</span>. Do not publish a contact address you do not monitor.</p></div></div>
              </div>
            )}

            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-gaming text-base font-bold text-white sm:text-lg">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets && <ul className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-amber-400" />{bullet}</li>)}</ul>}
              </section>
            ))}

            {page.faqs && <section className="border-t border-slate-800 pt-8"><h2 className="font-gaming text-base font-bold text-white sm:text-lg">Answers</h2><div className="mt-4 space-y-3">{page.faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-slate-800 bg-[#050811] px-4 py-3"><summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-slate-100">{faq.question}</summary><p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p></details>)}</div></section>}

            {page.slug === 'supported-games' && <section className="border-t border-slate-800 pt-8"><h2 className="font-gaming text-base font-bold text-white sm:text-lg">All game generators</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{POPULAR_GAMES.map((game) => <a key={game.id} href={`/${game.slug}`} className="group flex items-center justify-between rounded-xl border border-slate-800 bg-[#050811] px-4 py-3 text-sm text-slate-200 transition hover:border-amber-500/50 hover:bg-slate-900"><span>{game.name}</span><ChevronRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-amber-400" /></a>)}</div></section>}
          </div>
        </article>
      </main>

      <footer className="border-t border-slate-800 bg-[#04060d] px-4 py-8 text-xs text-slate-400 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><a href="/" className="font-gaming font-bold text-white">GAMING<span className="text-amber-400">NAME</span>HUB</a><p className="mt-2 max-w-sm leading-5">Game-aware name ideas, stylish nicknames and clean gamertags. GamingNameHub is independent and not affiliated with any game publisher or platform.</p></div><nav aria-label="Site links" className="grid max-w-xl grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">{pageLinks.map((link) => <a key={link.href} href={link.href} className="transition hover:text-amber-300">{link.label}</a>)}</nav></div>
          <div className="mt-6 flex flex-col gap-2 border-t border-slate-800 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 GamingNameHub. All rights reserved.</p><p>Always test the final name in the current game or platform client.</p></div>
        </div>
      </footer>
    </div>
  );
}
