import React, { useState } from 'react';
import { League, Team } from '../types';
import { Search, Trophy, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface LeagueStandingsTableProps {
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  teams: Team[];
}

export const LeagueStandingsTable: React.FC<LeagueStandingsTableProps> = ({
  leagues,
  selectedLeagueId,
  onSelectLeague,
  teams
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const currentLeague = leagues.find((l) => l.id === selectedLeagueId) || leagues[0];

  const filteredTeams = teams
    .filter((t) => t.leagueId === currentLeague.id)
    .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.leaguePosition - b.leaguePosition);

  return (
    <div className="space-y-4">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{currentLeague.flag}</span>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{currentLeague.name} Table</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Season {currentLeague.season}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Avg Goals/Game: <strong>{currentLeague.averageGoals}</strong> • {currentLeague.teamCount} Teams
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter team..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Standings Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Pos</th>
                <th className="py-3 px-4">Club</th>
                <th className="py-3 px-3 text-center">MP</th>
                <th className="py-3 px-3 text-center">W</th>
                <th className="py-3 px-3 text-center">D</th>
                <th className="py-3 px-3 text-center">L</th>
                <th className="py-3 px-3 text-center">GF</th>
                <th className="py-3 px-3 text-center">GA</th>
                <th className="py-3 px-3 text-center">GD</th>
                <th className="py-3 px-3 text-center">xG / xGA</th>
                <th className="py-3 px-3 text-center">Form (Last 5)</th>
                <th className="py-3 px-4 text-center font-bold text-slate-900 dark:text-white">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredTeams.map((team) => {
                const gd = team.goalsScored - team.goalsConceded;
                const isUCL = team.leaguePosition <= 4;
                const isRelegation = team.leaguePosition >= currentLeague.teamCount - 2;

                return (
                  <tr
                    key={team.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 text-center font-bold">
                      <span
                        className={`inline-block w-6 h-6 rounded-full leading-6 text-center text-[11px] ${
                          isUCL
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold'
                            : isRelegation
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 font-extrabold'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {team.leaguePosition}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <TeamLogo logo={team.logo} name={team.name} className="w-5 h-5" />
                      <span>{team.name}</span>
                    </td>

                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300 font-medium">{team.played}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{team.won}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{team.drawn}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{team.lost}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{team.goalsScored}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{team.goalsConceded}</td>
                    <td className="py-3 px-3 text-center font-bold">
                      <span className={gd > 0 ? 'text-emerald-600 dark:text-emerald-400' : gd < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500'}>
                        {gd > 0 ? `+${gd}` : gd}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {team.xG} / {team.xGA}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {team.formLast5.map((f, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                              f.result === 'W'
                                ? 'bg-emerald-500'
                                : f.result === 'D'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          >
                            {f.result}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center text-sm font-extrabold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30">
                      {team.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
