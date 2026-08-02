import React, { useState } from 'react';
import { Fixture } from '../types';
import { LEAGUES } from '../data/mockDatabase';
import {
  Sparkles,
  BarChart3,
  Calendar,
  Search,
  Filter,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  LayoutList,
  LayoutGrid,
  Bot,
  Zap,
  ArrowUpRight,
  Star,
  CheckCircle2,
  Award
} from 'lucide-react';
import { FixtureCard } from './FixtureCard';
import { TeamLogo } from './TeamLogo';

interface MatchPredictionsSummaryProps {
  fixtures: Fixture[];
  selectedWeekend: number;
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  onOpenAnalysis: (fixture: Fixture) => void;
}

export const MatchPredictionsSummary: React.FC<MatchPredictionsSummaryProps> = ({
  fixtures,
  selectedWeekend,
  selectedLeagueId,
  onSelectLeague,
  onOpenAnalysis
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | 'today-top' | 'high' | 'medium'>('all');

  const weekDateRanges: Record<number, { title: string; subtitle: string }> = {
    1: { title: 'Current Week (Sun Aug 2 – Sat Aug 8, 2026)', subtitle: 'Sunday Aug 2, 2026 – Saturday Aug 8, 2026' },
    2: { title: 'Week +1 (Sun Aug 9 – Sat Aug 15, 2026)', subtitle: 'Sunday Aug 9, 2026 – Saturday Aug 15, 2026' },
    3: { title: 'Week +2 (Sun Aug 16 – Sat Aug 22, 2026)', subtitle: 'Sunday Aug 16, 2026 – Saturday Aug 22, 2026' }
  };

  const currentWeekMeta = weekDateRanges[selectedWeekend] || weekDateRanges[1];

  const formatKickoffDateTime = (dateStr: string, timeStr: string) => {
    if (!dateStr) return timeStr || '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      return `${dayName} • ${timeStr}`;
    }
    return `${dateStr} • ${timeStr}`;
  };

  // Compute top predictions for the selected week starting on Sunday through Saturday
  const topTodayPredictions = [...fixtures]
    .sort((a, b) => b.metrics.confidenceScore - a.metrics.confidenceScore)
    .slice(0, 3);

  // Filter fixtures
  const filtered = fixtures.filter((f) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      f.homeTeam.name.toLowerCase().includes(q) ||
      f.awayTeam.name.toLowerCase().includes(q) ||
      f.venue.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (confidenceFilter === 'today-top') return topTodayPredictions.some((top) => top.id === f.id);
    if (confidenceFilter === 'high') return f.metrics.confidenceScore >= 75;
    if (confidenceFilter === 'medium') return f.metrics.confidenceScore < 75;
    return true;
  });

  // Calculate quick summary metrics for the round
  const totalMatches = fixtures.length;
  const avgHomeWin = totalMatches > 0 ? Math.round(fixtures.reduce((acc, f) => acc + f.metrics.homeWinProb, 0) / totalMatches) : 0;
  const avgDraw = totalMatches > 0 ? Math.round(fixtures.reduce((acc, f) => acc + f.metrics.drawProb, 0) / totalMatches) : 0;
  const avgAwayWin = totalMatches > 0 ? Math.round(fixtures.reduce((acc, f) => acc + f.metrics.awayWinProb, 0) / totalMatches) : 0;
  const topConfidenceMatch = fixtures.length > 0 ? [...fixtures].sort((a, b) => b.metrics.confidenceScore - a.metrics.confidenceScore)[0] : null;

  return (
    <div className="space-y-6">
      {/* Historical Telemetry & 3-Week Forward Forecast Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl shadow-sm border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Rolling 6-Month Baseline
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                3-Week Forward Horizon (Wk, Wk +1, Wk +2)
              </span>
            </div>
            <h2 className="text-lg font-heading font-extrabold text-white">
              Multi-Month Historical Analysis & Performance Factor Engine
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Models evaluate <strong>6 months of rolling match telemetry</strong> (xG progression, tactical shape, home/away variance) to forecast match outcomes <strong>3 weeks ahead</strong>. Algorithm factors in <strong>squad injuries, rest & fixture congestion, weather, match stakes, and referee profiles</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 shrink-0">
            <div className="text-center px-3 border-r border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Window</span>
              <span className="font-bold text-emerald-400">Past 6 Months</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Forecast</span>
              <span className="font-bold text-purple-400">Next 3 Weeks</span>
            </div>
          </div>
        </div>

        {/* Influencing Factor Badges Legend */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Key Drivers Considered:</span>
          <span className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded text-[11px]">
            🚑 Squad Injuries & Absences
          </span>
          <span className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded text-[11px]">
            🗓️ Rest Days & Midweek Congestion
          </span>
          <span className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded text-[11px]">
            🌤️ Weather & Pitch Surface
          </span>
          <span className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded text-[11px]">
            🎯 League Stakes & Motivation
          </span>
          <span className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded text-[11px]">
            🟨 Referee Disciplinary Profile
          </span>
        </div>
      </div>

      {/* Matchday Betting Highlights Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top Value Edge</p>
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 truncate max-w-[130px] mt-0.5">
              {topConfidenceMatch ? `${topConfidenceMatch.homeTeam.shortName} (${topConfidenceMatch.metrics.homeWinProb}%)` : 'N/A'}
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
            <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Matchday Goal Expectancy</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              {(fixtures.reduce((acc, f) => acc + f.metrics.homeExpectedGoals + f.metrics.awayExpectedGoals, 0) / (fixtures.length || 1)).toFixed(2)} Goals / Match
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Both Teams To Score (GG)</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {fixtures.filter(f => f.metrics.bttsProb >= 50).length} of {totalMatches} Matches Likely
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">High-Confidence Picks</p>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {fixtures.filter(f => f.metrics.confidenceScore >= 75).length} High-Probability Matches
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ⭐ WEEKLY TOP PREDICTIONS HIGHLIGHT SECTION */}
      <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-900/5 dark:from-slate-900 dark:to-slate-900/90 p-5 rounded-2xl border border-amber-500/30 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Top High-Confidence Predictions ({selectedWeekend === 1 ? 'Current Week' : `Week +${selectedWeekend - 1}`})
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  Top Algorithm Picks
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Highest probability win edges for <span className="font-semibold text-slate-700 dark:text-slate-200">{currentWeekMeta.subtitle}</span> generated by Dixon-Coles Monte Carlo engine (10k iterations)
              </p>
            </div>
          </div>

          <button
            onClick={() => setConfidenceFilter('today-top')}
            className="self-start sm:self-auto px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Weekly Top Picks Only</span>
          </button>
        </div>

        {/* Top 3 Predictions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topTodayPredictions.map((fixture, idx) => {
            const league = LEAGUES.find((l) => l.id === fixture.leagueId);
            const isHomeFavorite = fixture.metrics.homeWinProb >= fixture.metrics.awayWinProb;
            const topProb = Math.max(fixture.metrics.homeWinProb, fixture.metrics.awayWinProb);
            const recommendedPick = isHomeFavorite
              ? `${fixture.homeTeam.shortName} Win (${fixture.metrics.homeWinProb}%)`
              : `${fixture.awayTeam.shortName} Win (${fixture.metrics.awayWinProb}%)`;

            return (
              <div
                key={fixture.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-500/50 transition space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> #{idx + 1} Top Pick
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      {league?.flag} {league?.name || fixture.leagueId.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {formatKickoffDateTime(fixture.kickoffDate, fixture.kickoffTime)}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold truncate max-w-[100px]">{fixture.venue.split(',')[0]}</span>
                  </div>

                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                    <span>{fixture.homeTeam.name}</span>
                    <span className="text-xs text-slate-400 font-normal">vs</span>
                    <span>{fixture.awayTeam.name}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[11px]">Recommended Outcome:</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{recommendedPick}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                      <span>Expected Scoreline:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {fixture.homeTeam.shortName} {fixture.metrics.homeExpectedGoals} - {fixture.metrics.awayExpectedGoals} {fixture.awayTeam.shortName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                    {fixture.metrics.confidenceScore}% Confidence
                  </span>
                  <button
                    onClick={() => onOpenAnalysis(fixture)}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition"
                  >
                    <span>AI Report</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Section Title & Subtext */}
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Match Predictions Summary</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {filtered.length} matches
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click "Deep Dive Analysis" on any fixture for tactical radar, AI report, and H2H breakdown.
          </p>
        </div>

        {/* Right: Controls & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search club or venue..."
              className="pl-8 pr-3 py-2 min-h-[38px] text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-56"
            />
          </div>

          {/* Confidence Filter */}
          <select
            value={confidenceFilter}
            onChange={(e) => setConfidenceFilter(e.target.value as any)}
            className="py-2 px-2.5 min-h-[38px] text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Predictions</option>
            <option value="today-top">⭐ Today's Top Picks</option>
            <option value="high">High Confidence (75%+)</option>
            <option value="medium">Medium Confidence (&lt;75%)</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 min-h-[36px] rounded-md font-medium transition-all flex items-center gap-1 ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 min-h-[36px] rounded-md font-medium transition-all flex items-center gap-1 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: SUMMARY TABLE (PREDICTIONS SUMMARY LIST) */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs">
              No matches found matching search criteria.
            </div>
          ) : (
            <div>
              {/* Desktop Fluid Table View (Large Screens) */}
              <div className="hidden lg:block overflow-hidden">
                <table className="w-full text-xs text-left border-collapse table-auto">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">League</th>
                      <th className="py-3 px-3">Matchup</th>
                      <th className="py-3 px-3 text-center">🎯 Recommended Best Bet</th>
                      <th className="py-3 px-3 text-center">Market Probabilities</th>
                      <th className="py-3 px-3 text-center">xG</th>
                      <th className="py-3 px-3 text-center">ML Confidence</th>
                      <th className="py-3 px-3 text-right">In-Depth Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {filtered.map((fixture) => {
                      const league = LEAGUES.find((l) => l.id === fixture.leagueId);
                      const { metrics } = fixture;

                      // Determine top prediction
                      let predictedPick = `${fixture.homeTeam.shortName} Win`;
                      let predictedProb = metrics.homeWinProb;
                      let pickColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';

                      if (metrics.awayWinProb > metrics.homeWinProb && metrics.awayWinProb > metrics.drawProb) {
                        predictedPick = `${fixture.awayTeam.shortName} Win`;
                        predictedProb = metrics.awayWinProb;
                        pickColor = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800';
                      } else if (metrics.drawProb > metrics.homeWinProb && metrics.drawProb > metrics.awayWinProb) {
                        predictedPick = 'Draw Expected';
                        predictedProb = metrics.drawProb;
                        pickColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
                      }

                      return (
                        <tr
                          key={fixture.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                        >
                          {/* League Badge */}
                          <td className="py-3 px-3 font-medium">
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                              <span className="text-base">{league?.flag}</span>
                              <span className="font-semibold text-[11px] whitespace-nowrap">{league?.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block">{fixture.kickoffDate}</span>
                          </td>

                          {/* Matchup */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5">
                                <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} className="w-5 h-5" />
                                <span className="font-bold text-slate-900 dark:text-white text-xs">
                                  {fixture.homeTeam.shortName || fixture.homeTeam.name}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">vs</span>
                              <div className="flex items-center gap-1.5">
                                <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} className="w-5 h-5" />
                                <span className="font-bold text-slate-900 dark:text-white text-xs">
                                  {fixture.awayTeam.shortName || fixture.awayTeam.name}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Recommended Best Bet */}
                          <td className="py-3 px-3 text-center">
                            {metrics.detailedMarkets?.bestRecommendedBet ? (
                              <div className="inline-flex flex-col items-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-sm border border-emerald-500 whitespace-nowrap">
                                  <span>🎯 {metrics.detailedMarkets.bestRecommendedBet.selection}</span>
                                  <span className="text-[10px] bg-emerald-900/60 px-1 py-0.2 rounded font-mono">
                                    {metrics.detailedMarkets.bestRecommendedBet.marketCode}
                                  </span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                                  {metrics.detailedMarkets.bestRecommendedBet.confidenceScore}% Conf
                                </span>
                              </div>
                            ) : (
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${pickColor}`}>
                                <span>{predictedPick}</span>
                                <span>({predictedProb}%)</span>
                              </span>
                            )}
                          </td>

                          {/* Market Probabilities Breakdown */}
                          <td className="py-3 px-3">
                            {metrics.detailedMarkets ? (
                              <div className="flex flex-wrap items-center justify-center gap-1 text-[10px]">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                                  1: <strong>{metrics.detailedMarkets.oneXTwo.homeWin1.probability}%</strong>
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                                  X: <strong>{metrics.detailedMarkets.oneXTwo.drawX.probability}%</strong>
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                                  2: <strong>{metrics.detailedMarkets.oneXTwo.awayWin2.probability}%</strong>
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/40">
                                  1X: {metrics.detailedMarkets.doubleChance.homeOrDraw1X.probability}%
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800/40">
                                  2X: {metrics.detailedMarkets.doubleChance.awayOrDraw2X.probability}%
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/40">
                                  GG: {metrics.detailedMarkets.bothTeamsToScore.ggYes.probability}%
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800/40">
                                  O 2.5: {metrics.detailedMarkets.goalTotals.over2_5.probability}%
                                </span>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-center justify-between text-[10px] font-bold mb-1 text-slate-600 dark:text-slate-300">
                                  <span className="text-emerald-600 dark:text-emerald-400">{metrics.homeWinProb}%</span>
                                  <span className="text-amber-500">{metrics.drawProb}%</span>
                                  <span className="text-blue-600 dark:text-blue-400">{metrics.awayWinProb}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                  <div className="bg-emerald-500" style={{ width: `${metrics.homeWinProb}%` }} />
                                  <div className="bg-amber-400" style={{ width: `${metrics.drawProb}%` }} />
                                  <div className="bg-blue-500" style={{ width: `${metrics.awayWinProb}%` }} />
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Projected Goals */}
                          <td className="py-3 px-3 text-center whitespace-nowrap font-semibold text-slate-700 dark:text-slate-200">
                            {metrics.homeExpectedGoals} - {metrics.awayExpectedGoals} <span className="text-[10px] text-slate-400 font-normal">xG</span>
                          </td>

                          {/* Confidence */}
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {metrics.confidenceScore}%
                            </span>
                          </td>

                          {/* Deep Dive Action Button */}
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => onOpenAnalysis(fixture)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[36px] rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-sm group-hover:shadow-emerald-600/20"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Deep Dive</span>
                              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Fluid Stack View (Screens < lg) */}
              <div className="block lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((fixture) => {
                  const league = LEAGUES.find((l) => l.id === fixture.leagueId);
                  const { metrics } = fixture;

                  return (
                    <div key={fixture.id} className="p-4 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      {/* League info + Kickoff + Confidence badge */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                          <span className="text-base">{league?.flag}</span>
                          <span>{league?.name}</span>
                          <span className="text-slate-400 font-normal">• {fixture.kickoffDate}</span>
                        </div>
                        <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                          {metrics.confidenceScore}% ML Conf
                        </span>
                      </div>

                      {/* Matchup Banner */}
                      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                        <div className="flex items-center gap-2">
                          <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} className="w-6 h-6" />
                          <span className="font-bold text-slate-900 dark:text-white text-xs">{fixture.homeTeam.name}</span>
                        </div>
                        <div className="text-center px-2">
                          <span className="text-xs font-bold text-slate-400">vs</span>
                          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {metrics.homeExpectedGoals} - {metrics.awayExpectedGoals} xG
                          </div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <span className="font-bold text-slate-900 dark:text-white text-xs text-right">{fixture.awayTeam.name}</span>
                          <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Recommended Best Bet Highlight */}
                      {metrics.detailedMarkets?.bestRecommendedBet && (
                        <div className="flex items-center justify-between p-2.5 bg-slate-900 text-white dark:bg-slate-800 rounded-xl border border-emerald-500/40 text-xs">
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className="text-emerald-400">🎯 Best Bet:</span>
                            <span className="text-white">{metrics.detailedMarkets.bestRecommendedBet.selection}</span>
                            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono border border-emerald-800">
                              {metrics.detailedMarkets.bestRecommendedBet.marketCode}
                            </span>
                          </div>
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                            {metrics.detailedMarkets.bestRecommendedBet.confidenceScore}% Conf
                          </span>
                        </div>
                      )}

                      {/* Market Probabilities Chips */}
                      {metrics.detailedMarkets && (
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                            1: <strong>{metrics.detailedMarkets.oneXTwo.homeWin1.probability}%</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                            X: <strong>{metrics.detailedMarkets.oneXTwo.drawX.probability}%</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                            2: <strong>{metrics.detailedMarkets.oneXTwo.awayWin2.probability}%</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/40">
                            1X: {metrics.detailedMarkets.doubleChance.homeOrDraw1X.probability}%
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800/40">
                            2X: {metrics.detailedMarkets.doubleChance.awayOrDraw2X.probability}%
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/40">
                            GG: {metrics.detailedMarkets.bothTeamsToScore.ggYes.probability}%
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800/40">
                            O 2.5: {metrics.detailedMarkets.goalTotals.over2_5.probability}%
                          </span>
                        </div>
                      )}

                      {/* Deep Dive Action Button */}
                      <button
                        onClick={() => onOpenAnalysis(fixture)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 min-h-[40px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-sm"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>In-Depth Match Analysis</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: CARDS GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              onOpenAnalysis={onOpenAnalysis}
            />
          ))}
        </div>
      )}
    </div>
  );
};
