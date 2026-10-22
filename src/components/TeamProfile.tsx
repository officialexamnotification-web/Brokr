import React from 'react';
import { ArrowLeft, Calendar, Globe, ExternalLink, Twitter, Instagram, Youtube, Globe as GlobeIcon, Trophy } from 'lucide-react';
import { TeamProfile as TeamProfileType } from '../data/teams';

interface TeamProfileProps {
  team: TeamProfileType;
}

export function TeamProfile({ team }: TeamProfileProps) {
  return (
    <div className="min-h-screen bg-[#050811]">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <a href="/tournaments" className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#080d1a] px-4 py-2.5 text-sm font-bold text-cyan-300 transition hover:border-cyan-400/50 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to tournaments
        </a>

        {/* Header Section */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#080d1a]/95 shadow-2xl shadow-black/30">
          <div className="bg-radial-hero px-6 py-9 sm:px-10 sm:py-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300">
                {team.gameName}
              </span>
              <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-300">
                {team.region}
              </span>
            </div>
            <h1 className="mt-5 font-gaming text-3xl font-black leading-tight text-white sm:text-5xl">
              {team.name}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {team.description}
            </p>
            {team.foundedYear && (
              <p className="mt-2 text-xs text-slate-500">
                Founded: {team.foundedYear}
              </p>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            
            {/* Achievements */}
            {team.achievements && team.achievements.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-amber-300" />
                  <h2 className="font-gaming text-xl font-bold text-white">Achievements</h2>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {team.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                      <span className="mt-1 text-amber-300">•</span>
                      <span className="text-sm text-slate-200">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Social Links */}
            {team.social && (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <GlobeIcon className="h-5 w-5 text-cyan-300" />
                  <h2 className="font-gaming text-xl font-bold text-white">Connect</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {team.social.twitter && (
                    <a
                      href={`https://twitter.com/${team.social.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-4 transition hover:border-cyan-400/45 hover:bg-slate-900/60"
                    >
                      <Twitter className="h-4 w-4 text-cyan-300" />
                      <span className="text-sm font-semibold text-slate-200">Twitter</span>
                      <ExternalLink className="ml-auto h-3 w-3 text-slate-500" />
                    </a>
                  )}
                  {team.social.instagram && (
                    <a
                      href={`https://instagram.com/${team.social.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-4 transition hover:border-cyan-400/45 hover:bg-slate-900/60"
                    >
                      <Instagram className="h-4 w-4 text-pink-300" />
                      <span className="text-sm font-semibold text-slate-200">Instagram</span>
                      <ExternalLink className="ml-auto h-3 w-3 text-slate-500" />
                    </a>
                  )}
                  {team.social.youtube && (
                    <a
                      href={`https://youtube.com/${team.social.youtube}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-4 transition hover:border-cyan-400/45 hover:bg-slate-900/60"
                    >
                      <Youtube className="h-4 w-4 text-red-300" />
                      <span className="text-sm font-semibold text-slate-200">YouTube</span>
                      <ExternalLink className="ml-auto h-3 w-3 text-slate-500" />
                    </a>
                  )}
                  {team.social.website && (
                    <a
                      href={team.social.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-4 transition hover:border-cyan-400/45 hover:bg-slate-900/60"
                    >
                      <Globe className="h-4 w-4 text-emerald-300" />
                      <span className="text-sm font-semibold text-slate-200">Website</span>
                      <ExternalLink className="ml-auto h-3 w-3 text-slate-500" />
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Source Attribution */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
              <p className="text-xs text-slate-400">
                <span className="font-bold text-emerald-300">Source:</span> Team information is sourced from {team.sourceName}. 
                Last updated: {team.updatedAt}. For the most current roster and team details, please visit the official source.
              </p>
              <a
                href={team.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs font-black text-cyan-300 hover:text-white"
              >
                Open {team.sourceName} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
