import React from 'react';
import { Eye, Clock, Users, Calendar, Trophy, ExternalLink, Youtube, Facebook, Video, Play, Pause } from 'lucide-react';
import { TournamentEvent } from '../data/tournament-data';
import { StreamPlayer } from './StreamPlayer';

interface TournamentDashboardProps {
  event: TournamentEvent;
}

export function TournamentDashboard({ event }: TournamentDashboardProps) {
  const statCards = [
    {
      label: 'Prize Pool',
      value: event.prizePool || 'N/A',
      icon: Trophy,
      color: 'text-amber-300'
    },
    {
      label: 'Teams',
      value: event.teams ? `${event.teams}` : 'N/A',
      icon: Users,
      color: 'text-cyan-300'
    },
    {
      label: 'Duration',
      value: event.dateLabel,
      icon: Calendar,
      color: 'text-emerald-300'
    },
  ];

  if (event.statistics) {
    if (event.statistics.peakViewers) {
      statCards.push({
        label: 'Peak Viewers',
        value: event.statistics.peakViewers.toLocaleString(),
        icon: Eye,
        color: 'text-pink-300'
      });
    }
    if (event.statistics.hoursWatched) {
      statCards.push({
        label: 'Hours Watched',
        value: event.statistics.hoursWatched.toLocaleString(),
        icon: Clock,
        color: 'text-purple-300'
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* Featured Stream Section */}
      {event.streams && event.streams.length > 0 && event.streams.some(s => s.isActive) && (
        <section className="rounded-2xl border border-slate-800 bg-[#080d1a]/95 overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-red-500/20 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-300">LIVE</span>
                </div>
                <h2 className="font-gaming text-lg font-bold text-white">Featured Stream</h2>
              </div>
              <a
                href={event.streams.find(s => s.isActive)?.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-cyan-300 hover:text-white"
              >
                Channel stats <ExternalLink className="h-3 w-3 inline" />
              </a>
            </div>
          </div>
          <StreamPlayer
            platform={event.streams.find(s => s.isActive)?.platform || 'youtube'}
            url={event.streams.find(s => s.isActive)?.url || ''}
            title={event.name}
            isActive={true}
          />
        </section>
      )}

      {/* Statistics Section */}
      <section className="rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6">
        <h2 className="mb-4 font-gaming text-lg font-bold text-white">Tournament Statistics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <div key={index} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <div className={`mb-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
        {event.statistics?.peakViewersDate && (
          <p className="mt-4 text-xs text-slate-500">
            Peak viewers recorded on {event.statistics.peakViewersDate}
          </p>
        )}
      </section>

      {/* Live Matches Section */}
      {event.matchSchedule && event.matchSchedule.length > 0 && (
        <section className="rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6">
          <h2 className="mb-4 font-gaming text-lg font-bold text-white">Match Schedule</h2>
          <div className="space-y-3">
            {event.matchSchedule.map((match, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-cyan-400/45"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-300">{match.stage}</span>
                    {match.winner && (
                      <span className="text-xs text-amber-300">• Winner: {match.winner}</span>
                    )}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {match.teams.join(' vs ')}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    {match.date} at {match.time}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {match.score1 && match.score2 && (
                    <div className="text-lg font-bold">
                      <span className="text-white">{match.score1}</span>
                      <span className="mx-2 text-slate-500">-</span>
                      <span className="text-white">{match.score2}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Stream Links Section */}
      {event.streams && event.streams.length > 0 && (
        <section className="rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6">
          <h2 className="mb-4 font-gaming text-lg font-bold text-white">Official Streams</h2>
          <div className="grid gap-4">
            {event.streams.map((stream, index) => (
              <StreamPlayer
                key={index}
                platform={stream.platform}
                url={stream.url}
                title={`${event.name} - ${stream.language || 'Stream'}`}
                isActive={stream.isActive}
              />
            ))}
          </div>
        </section>
      )}

      {/* Popular Matches Section */}
      {event.popularMatches && event.popularMatches.length > 0 && (
        <section className="rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6">
          <h2 className="mb-4 font-gaming text-lg font-bold text-white">Popular Matches by Viewers</h2>
          <div className="space-y-3">
            {event.popularMatches.map((match, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">
                    {match.team1} vs {match.team2}
                  </div>
                  <div className="text-xs text-slate-400">
                    {match.stage} • {match.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-300">{match.viewers.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">viewers</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Tournament Section */}
      <section className="rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6">
        <h2 className="mb-4 font-gaming text-lg font-bold text-white">About Tournament</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Discipline</dt>
            <dd className="mt-1 text-sm text-white">{event.gameName}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</dt>
            <dd className="mt-1 text-sm text-white">{event.dateLabel}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Prize Pool</dt>
            <dd className="mt-1 text-sm text-white">{event.prizePool || 'N/A'}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Organizer</dt>
            <dd className="mt-1 text-sm text-white">{event.organizer}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</dt>
            <dd className="mt-1 text-sm text-white">{event.location}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Format</dt>
            <dd className="mt-1 text-sm text-white">{event.format || 'N/A'}</dd>
          </div>
        </dl>
        {event.sponsors && event.sponsors.length > 0 && (
          <div className="mt-6">
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sponsors</dt>
            <dd className="flex flex-wrap gap-2">
              {event.sponsors.map((sponsor, index) => (
                <span
                  key={index}
                  className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-xs text-slate-300"
                >
                  {sponsor}
                </span>
              ))}
            </dd>
          </div>
        )}
      </section>
    </div>
  );
}
