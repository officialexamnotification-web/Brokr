import React from 'react';
import { getTournamentEvents } from '../lib/tournament-feed';
import { TournamentEvent } from '../data/tournament-data';
import { ArrowLeft, CalendarDays, Globe2, Trophy } from 'lucide-react';

export function ArchiveView() {
  const completedEvents = getTournamentEvents().filter(e => e.status === 'completed');
  
  // Group by year
  const byYear = completedEvents.reduce((acc, event) => {
    const year = event.startDate ? new Date(event.startDate).getFullYear() : 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {} as Record<number, TournamentEvent[]>);

  const sortedYears = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-[#050811]">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <a href="/tournaments" className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#080d1a] px-4 py-2.5 text-sm font-bold text-cyan-300 transition hover:border-cyan-400/50 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to tournament schedule
        </a>

        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Historical archive</p>
          <h1 className="mt-2 font-gaming text-3xl font-black text-white sm:text-5xl">Completed tournaments</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
            Browse past tournaments and their results. All information is sourced from official organizers and publishers.
          </p>
        </div>

        {sortedYears.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">
            No completed tournaments in the archive yet.
          </div>
        ) : (
          sortedYears.map(year => (
            <section key={year} className="mb-12">
              <h2 className="mb-4 font-gaming text-2xl font-bold text-white">{year}</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {byYear[year].map(event => (
                  <article key={event.id} className="flex h-full flex-col rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-5 transition hover:-translate-y-0.5 hover:border-amber-400/45 hover:shadow-xl hover:shadow-amber-950/20">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-slate-700 px-2 py-1 text-[10px] font-bold uppercase text-slate-300">
                        Completed
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        {event.gameName}
                      </span>
                    </div>
                    <h3 className="mt-4 font-gaming text-base font-bold leading-snug text-white">
                      {event.name}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-slate-400">{event.summary}</p>
                    <dl className="mt-4 grid gap-2 border-t border-slate-800 pt-4 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-amber-300" />
                        <span>{event.dateLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe2 className="h-3.5 w-3.5 text-cyan-300" />
                        <span>{event.region} · {event.location}</span>
                      </div>
                      {(event.prizePool || event.teams) && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-3.5 w-3.5 text-emerald-300" />
                          <span>{[event.prizePool, event.teams ? `${event.teams} teams` : undefined].filter(Boolean).join(' · ')}</span>
                        </div>
                      )}
                    </dl>
                    <div className="mt-auto pt-5">
                      <a
                        href={`/tournaments/${event.slug}`}
                        className="block w-full rounded-lg bg-amber-500 px-3 py-2 text-center text-xs font-black text-slate-950 transition hover:bg-amber-300"
                      >
                        View event
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
