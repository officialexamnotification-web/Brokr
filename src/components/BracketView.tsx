import React from 'react';
import { Trophy } from 'lucide-react';

interface BracketMatch {
  team1: string;
  team2: string;
  score1?: string;
  score2?: string;
  winner?: string;
}

interface BracketRound {
  name: string;
  matches: BracketMatch[];
}

interface BracketViewProps {
  rounds: BracketRound[];
  tournamentName: string;
}

export function BracketView({ rounds, tournamentName }: BracketViewProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#080d1a]/95 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="h-5 w-5 text-amber-300" />
        <h2 className="font-gaming text-lg font-bold text-white">Tournament Bracket</h2>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex gap-8">
            {rounds.map((round, roundIndex) => (
              <div key={roundIndex} className="flex-1">
                <h3 className="mb-4 text-sm font-bold text-cyan-300">{round.name}</h3>
                <div className="space-y-4">
                  {round.matches.map((match, matchIndex) => (
                    <div
                      key={matchIndex}
                      className="rounded-lg border border-slate-700 bg-slate-950/50 p-3 transition hover:border-amber-400/45"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className={`flex-1 text-sm font-medium ${match.winner === match.team1 ? 'text-amber-300' : 'text-slate-300'}`}>
                          {match.team1}
                        </div>
                        <div className="text-sm font-bold text-white">{match.score1 || '-'}</div>
                      </div>
                      <div className="my-1 border-t border-slate-800"></div>
                      <div className="flex items-center justify-between gap-2">
                        <div className={`flex-1 text-sm font-medium ${match.winner === match.team2 ? 'text-amber-300' : 'text-slate-300'}`}>
                          {match.team2}
                        </div>
                        <div className="text-sm font-bold text-white">{match.score2 || '-'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/30 p-4">
        <p className="text-xs text-slate-400">
          <span className="font-bold text-amber-300">Note:</span> This bracket is manually curated based on official tournament results. 
          For the most up-to-date bracket and live match results, please visit the official tournament source.
        </p>
      </div>
    </div>
  );
}
