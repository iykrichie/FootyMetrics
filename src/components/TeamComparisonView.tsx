import React, { useState, useEffect } from 'react';
import { MatchMetrics, Team } from '../types';
import { Layers, ArrowRightLeft, Sparkles, Activity } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface TeamComparisonViewProps {
  teams: Team[];
}

export const TeamComparisonView: React.FC<TeamComparisonViewProps> = ({ teams }) => {
  const [team1Id, setTeam1Id] = useState<string>('ars'); // Arsenal
  const [team2Id, setTeam2Id] = useState<string>('rma'); // Real Madrid
  const [comparisonData, setComparisonData] = useState<{
    team1: Team;
    team2: Team;
    hypotheticalNeutralMatch: MatchMetrics;
  } | null>(null);

  useEffect(() => {
    fetch(`/api/compare?team1=${team1Id}&team2=${team2Id}`)
      .then((res) => res.json())
      .then((data) => setComparisonData(data))
      .catch((err) => console.error('Error fetching comparison:', err));
  }, [team1Id, team2Id]);

  if (!comparisonData) return null;

  const { team1, team2, hypotheticalNeutralMatch } = comparisonData;

  const radarData = [
    { metric: 'Offense Rating', Team1: team1.offensiveRating, Team2: team2.offensiveRating },
    { metric: 'Defense Rating', Team1: team1.defensiveRating, Team2: team2.defensiveRating },
    { metric: 'xG Index', Team1: Math.round((team1.xG / 2.5) * 100), Team2: Math.round((team2.xG / 2.5) * 100) },
    { metric: 'Possession %', Team1: Math.round(team1.possessionAvg), Team2: Math.round(team2.possessionAvg) },
    { metric: '10-Match Momentum', Team1: team1.formLast10Score, Team2: team2.formLast10Score },
    { metric: 'Clean Sheet %', Team1: Math.round(team1.cleanSheetRate * 100), Team2: Math.round(team2.cleanSheetRate * 100) }
  ];

  return (
    <div className="space-y-6">
      {/* Selectors Header */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
          <Layers className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg">Cross-League Team Comparative Analytics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Team 1 Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Select First Squad (Home)
            </label>
            <select
              value={team1Id}
              onChange={(e) => setTeam1Id(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {teams.map((t) => {
                const isUrl = t.logo && (t.logo.startsWith('http') || t.logo.startsWith('/'));
                const logoIcon = isUrl ? '⚽' : (t.logo || '⚽');
                return (
                  <option key={t.id} value={t.id}>
                    {logoIcon} {t.name} (#{t.leaguePosition} - {t.leagueId.toUpperCase()})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Team 2 Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Select Second Squad (Away)
            </label>
            <select
              value={team2Id}
              onChange={(e) => setTeam2Id(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {teams.map((t) => {
                const isUrl = t.logo && (t.logo.startsWith('http') || t.logo.startsWith('/'));
                const logoIcon = isUrl ? '⚽' : (t.logo || '⚽');
                return (
                  <option key={t.id} value={t.id}>
                    {logoIcon} {t.name} (#{t.leaguePosition} - {t.leagueId.toUpperCase()})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Hypothetical Neutral Ground Matchup Simulation Card */}
      <div className="p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-sm space-y-4 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-heading font-bold text-sm tracking-wide text-emerald-700 dark:text-emerald-400 uppercase">
              Hypothetical Neutral Venue Match Simulation
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monte Carlo 10k Run</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="p-4 bg-emerald-50/60 dark:bg-slate-800/60 rounded-xl border border-emerald-200 dark:border-emerald-500/30">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{team1.name} Win</span>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {hypotheticalNeutralMatch.homeWinProb}%
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block font-medium">xG: {hypotheticalNeutralMatch.homeExpectedGoals}</span>
          </div>

          <div className="p-4 bg-amber-50/60 dark:bg-slate-800/60 rounded-xl border border-amber-200 dark:border-amber-500/30">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Draw</span>
            <div className="text-3xl font-extrabold text-amber-500 dark:text-amber-400 mt-1">
              {hypotheticalNeutralMatch.drawProb}%
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block font-medium">Level Score</span>
          </div>

          <div className="p-4 bg-blue-50/60 dark:bg-slate-800/60 rounded-xl border border-blue-200 dark:border-blue-500/30">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{team2.name} Win</span>
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
              {hypotheticalNeutralMatch.awayWinProb}%
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block font-medium">xG: {hypotheticalNeutralMatch.awayExpectedGoals}</span>
          </div>
        </div>
      </div>

      {/* Side by Side Comparison Grid & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Direct Tactical Radar Overlay
          </h3>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#94a3b8" opacity={0.3} />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar name={team1.name} dataKey="Team1" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Radar name={team2.name} dataKey="Team2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric Comparison List */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Key Metric Side-by-Side Breakdown
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { label: 'Offensive Rating', val1: team1.offensiveRating, val2: team2.offensiveRating, suffix: '/100' },
              { label: 'Defensive Rating', val1: team1.defensiveRating, val2: team2.defensiveRating, suffix: '/100' },
              { label: 'Avg Expected Goals (xG)', val1: team1.xG, val2: team2.xG, suffix: ' per match' },
              { label: 'Avg xG Against (xGA)', val1: team1.xGA, val2: team2.xGA, suffix: ' per match' },
              { label: 'Possession Average', val1: `${team1.possessionAvg}%`, val2: `${team2.possessionAvg}%`, suffix: '' },
              { label: 'Clean Sheet Frequency', val1: `${Math.round(team1.cleanSheetRate * 100)}%`, val2: `${Math.round(team2.cleanSheetRate * 100)}%`, suffix: '' }
            ].map((m, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{m.val1}{m.suffix}</span>
                <span className="font-semibold text-slate-600 dark:text-slate-400">{m.label}</span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400">{m.val2}{m.suffix}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
