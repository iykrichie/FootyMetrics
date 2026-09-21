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
  Award,
  RotateCcw,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { FixtureCard } from './FixtureCard';
import { TeamLogo } from './TeamLogo';
import {
  getWeeklyForecastRanges,
  getD7DaysList,
  formatRelativeDateLabel,
  SYSTEM_TODAY
} from '../utils/dateUtils';

interface MatchPredictionsSummaryProps {
  fixtures: Fixture[];
  selectedWeekend: number;
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  onOpenAnalysis: (fixture: Fixture) => void;
  onNavigateToHistory?: () => void;
  selectedHorizon?: string;
  onSelectHorizon?: (horizon: string) => void;
  isDataUnavailable?: boolean;
  onRetrySync?: () => void;
  onSelectWeekend?: (weekend: number) => void;
}

export const MatchPredictionsSummary: React.FC<MatchPredictionsSummaryProps> = ({
  fixtures,
  selectedWeekend,
  selectedLeagueId,
  onSelectLeague,
  onOpenAnalysis,
  onNavigateToHistory,
  selectedHorizon = 'all',
  onSelectHorizon,
  isDataUnavailable = false,
  onRetrySync,
  onSelectWeekend
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | 'today-top' | 'high' | 'medium'>('all');
  const [localHorizon, setLocalHorizon] = useState<string>(selectedHorizon || 'all');

  const activeHorizon = selectedHorizon !== 'all' ? selectedHorizon : localHorizon;

  const handleHorizonChange = (horizon: string) => {
    setLocalHorizon(horizon);
    if (onSelectHorizon) {
      onSelectHorizon(horizon);
    }
  };

  const weeklyRanges = getWeeklyForecastRanges();
  const currentWeekMeta = weeklyRanges[selectedWeekend] || weeklyRanges[1];
  const d7Days = getD7DaysList(selectedWeekend - 1);

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

  // Compute horizon metrics for quick badges (Monday D0 through Sunday D7)
  const mondayCount = fixtures.filter((f) => f.kickoffDate === currentWeekMeta.startDate).length;
  const sundayCount = fixtures.filter((f) => f.kickoffDate === currentWeekMeta.endDate).length;
  const d7WindowCount = fixtures.filter((f) => f.kickoffDate >= currentWeekMeta.startDate && f.kickoffDate <= currentWeekMeta.endDate).length;
  const todayCount = fixtures.filter((f) => f.kickoffDate === SYSTEM_TODAY).length;

  const dayWithCounts = d7Days.map((d) => ({
    ...d,
    count: fixtures.filter((f) => f.kickoffDate === d.dateStr).length
  }));

  // Filter fixtures by search, horizon, and confidence
  const filtered = fixtures.filter((f) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      f.homeTeam.name.toLowerCase().includes(q) ||
      f.awayTeam.name.toLowerCase().includes(q) ||
      f.venue.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    // Strict Monday-to-Sunday boundary for current week (e.g. 21 - 27 September)
    if (f.kickoffDate < currentWeekMeta.startDate || f.kickoffDate > currentWeekMeta.endDate) {
      return false;
    }

    // Horizon filter (Monday D0 to Sunday D7)
    if (activeHorizon === 'monday' || activeHorizon === 'd0') {
      if (f.kickoffDate !== currentWeekMeta.startDate) return false;
    } else if (activeHorizon === 'sunday' || activeHorizon === 'd7' || activeHorizon === 'd7_exact') {
      if (f.kickoffDate !== currentWeekMeta.endDate) return false;
    } else if (activeHorizon === 'today') {
      if (f.kickoffDate !== SYSTEM_TODAY) return false;
    } else if (activeHorizon.startsWith('day_')) {
      const targetOffset = parseInt(activeHorizon.replace('day_', ''), 10);
      const targetDay = d7Days.find(d => d.offset === targetOffset || (targetOffset === 7 && d.isD7));
      if (targetDay && f.kickoffDate !== targetDay.dateStr) return false;
    } else if (activeHorizon.match(/^\d{4}-\d{2}-\d{2}$/)) {
      if (f.kickoffDate !== activeHorizon) return false;
    }

    if (confidenceFilter === 'high') return f.metrics.confidenceScore >= 75;
    if (confidenceFilter === 'medium') return f.metrics.confidenceScore < 75;
    return true;
  });

  // Always sort chronologically: from Monday (D0) up to Sunday (D7), then kickoff time
  filtered.sort((a, b) => a.kickoffDate.localeCompare(b.kickoffDate) || a.kickoffTime.localeCompare(b.kickoffTime));

  // Top predictions within the current horizon
  const sourceForTop = filtered.length > 0 ? filtered : fixtures;
  const topPredictions = [...sourceForTop]
    .sort((a, b) => b.metrics.confidenceScore - a.metrics.confidenceScore)
    .slice(0, 3);

  // Re-apply today-top filter if requested
  const finalFiltered = confidenceFilter === 'today-top'
    ? filtered.filter((f) => topPredictions.some((top) => top.id === f.id))
    : filtered;

  // Calculate quick summary metrics for the active horizon
  const totalMatches = finalFiltered.length;
  const avgHomeWin = totalMatches > 0 ? Math.round(finalFiltered.reduce((acc, f) => acc + f.metrics.homeWinProb, 0) / totalMatches) : 0;
  const avgDraw = totalMatches > 0 ? Math.round(finalFiltered.reduce((acc, f) => acc + f.metrics.drawProb, 0) / totalMatches) : 0;
  const avgAwayWin = totalMatches > 0 ? Math.round(finalFiltered.reduce((acc, f) => acc + f.metrics.awayWinProb, 0) / totalMatches) : 0;
  const topConfidenceMatch = finalFiltered.length > 0
    ? [...finalFiltered].sort((a, b) => b.metrics.confidenceScore - a.metrics.confidenceScore)[0]
    : null;

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

      {/* 📈 WIN / LOSS RECORD & TRACK RECORD CALLOUT BANNER */}
      {onNavigateToHistory && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-slate-900/5 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 p-4 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  Audited Prediction Performance Tracker Active
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-300 dark:border-emerald-800">
                  70%+ Win Rate
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Every historical algorithmic pick is logged with verified match final scores, market strike rates, and P&L units.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToHistory}
            className="self-start sm:self-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 whitespace-nowrap"
          >
            <span>View Win/Loss History Ledger</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ⭐ WEEKLY TOP PREDICTIONS HIGHLIGHT SECTION */}
      <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-900/5 dark:from-slate-900 dark:to-slate-900/90 p-5 rounded-2xl border border-amber-500/30 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 flex-wrap">
                <span>Top High-Confidence Picks</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  {selectedWeekend === 1 ? 'Current Week (D0–D+7)' : `Week +${selectedWeekend - 1}`}
                </span>
                {activeHorizon !== 'all' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40">
                    {activeHorizon === 'today' ? '⚡ Today Only' : activeHorizon === 'd7_exact' ? '🎯 D+7 Only' : 'Horizon Active'}
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Highest win probability edges for <span className="font-semibold text-slate-700 dark:text-slate-200">{currentWeekMeta.subtitle}</span>
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
          {topPredictions.map((fixture, idx) => {
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

                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm pt-1">
                    <div className="flex items-center gap-2">
                      <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} className="w-5 h-5" />
                      <span className="truncate max-w-[100px]">{fixture.homeTeam.shortName || fixture.homeTeam.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-normal px-1">vs</span>
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[100px] text-right">{fixture.awayTeam.shortName || fixture.awayTeam.name}</span>
                      <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} className="w-5 h-5" />
                    </div>
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

      {/* 📅 WEEKLY HORIZON & D+7 FILTER CONTROLS */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        {/* Header & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-300 dark:border-emerald-800">
                Weekly Forecasting Cycle
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {currentWeekMeta.title}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prediction window runs <strong>Monday through Sunday every week</strong>. Fresh prediction slates roll in every Monday (<strong>Monday = D0</strong>, <strong>Sunday = D7</strong>).
            </p>
          </div>

          {activeHorizon !== 'all' && (
            <button
              onClick={() => handleHorizonChange('all')}
              className="self-start sm:self-auto px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset to All Week Matches</span>
            </button>
          )}
        </div>

        {/* Primary Preset Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Preset 1: All Week Matches */}
          <button
            onClick={() => handleHorizonChange('all')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              activeHorizon === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeHorizon === 'all' ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
              Full Cycle
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-extrabold">All Week (D0–D7)</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                activeHorizon === 'all' ? 'bg-emerald-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}>
                {fixtures.length}
              </span>
            </div>
          </button>

          {/* Preset 2: Monday (D0) */}
          <button
            onClick={() => handleHorizonChange(activeHorizon === 'monday' || activeHorizon === 'd0' ? 'all' : 'monday')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
              activeHorizon === 'monday' || activeHorizon === 'd0'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-extrabold'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${activeHorizon === 'monday' || activeHorizon === 'd0' ? 'text-slate-900' : 'text-amber-600 dark:text-amber-400'}`}>
              <span>⚡ Week Kickoff</span>
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-extrabold">Monday (D0)</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                activeHorizon === 'monday' || activeHorizon === 'd0' ? 'bg-slate-950 text-amber-400' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
              }`}>
                {mondayCount}
              </span>
            </div>
          </button>

          {/* Preset 3: Rolling Window D0 to D7 */}
          <button
            onClick={() => handleHorizonChange('d7_window')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              activeHorizon === 'd7_window'
                ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-teal-500/50'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeHorizon === 'd7_window' ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
              Weekly Span
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-extrabold">D0 – D7 Slate</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                activeHorizon === 'd7_window' ? 'bg-teal-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}>
                {d7WindowCount}
              </span>
            </div>
          </button>

          {/* Preset 4: Sunday (D7) */}
          <button
            onClick={() => handleHorizonChange(activeHorizon === 'sunday' || activeHorizon === 'd7' || activeHorizon === 'd7_exact' ? 'all' : 'sunday')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              activeHorizon === 'sunday' || activeHorizon === 'd7' || activeHorizon === 'd7_exact'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-indigo-500/50'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeHorizon === 'sunday' || activeHorizon === 'd7' || activeHorizon === 'd7_exact' ? 'text-indigo-100' : 'text-indigo-600 dark:text-indigo-400'}`}>
              🎯 Week Finale
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-extrabold">Sunday (D7)</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                activeHorizon === 'sunday' || activeHorizon === 'd7' || activeHorizon === 'd7_exact' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800'
              }`}>
                {sundayCount}
              </span>
            </div>
          </button>
        </div>

        {/* Individual Daily Matchday Strip (Monday D0 through Sunday D7) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Weekly Days ({currentWeekMeta.startDate.slice(5)} to {currentWeekMeta.endDate.slice(5)}):</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Cycle: {currentWeekMeta.title} ({currentWeekMeta.shortRange})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {dayWithCounts.map((day) => {
              const isSelected =
                activeHorizon === day.dateStr ||
                activeHorizon === day.key ||
                (day.isMonday && (activeHorizon === 'monday' || activeHorizon === 'd0')) ||
                (day.isSunday && (activeHorizon === 'sunday' || activeHorizon === 'd7' || activeHorizon === 'd7_exact')) ||
                (day.isToday && activeHorizon === 'today');

              return (
                <button
                  key={day.key}
                  onClick={() => {
                    if (isSelected) {
                      handleHorizonChange('all');
                    } else {
                      handleHorizonChange(day.dateStr);
                    }
                  }}
                  className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? day.isToday
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-sm'
                        : day.isD7
                        ? 'bg-indigo-600 text-white border-indigo-600 font-extrabold shadow-sm'
                        : 'bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-[10px] font-extrabold uppercase ${
                    isSelected
                      ? 'text-inherit'
                      : day.isToday
                      ? 'text-amber-600 dark:text-amber-400'
                      : day.isD7
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {day.dayBadge}
                  </span>
                  <span className="text-[11px] font-bold truncate max-w-full">
                    {day.shortDay} {day.formattedDate}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black mt-0.5 ${
                    isSelected
                      ? 'bg-black/20 text-inherit'
                      : day.count > 0
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold'
                      : 'text-slate-400 opacity-60'
                  }`}>
                    {day.count} {day.count === 1 ? 'game' : 'games'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Section Title & Subtext */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Match Predictions Summary
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {finalFiltered.length} matches
            </span>
            {activeHorizon !== 'all' && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span>
                  Filter:{' '}
                  {activeHorizon === 'monday' || activeHorizon === 'd0' || activeHorizon === 'today'
                    ? '⚡ Monday (D0)'
                    : activeHorizon === 'sunday' || activeHorizon === 'd7' || activeHorizon === 'd7_exact'
                    ? '🎯 Sunday (D7)'
                    : activeHorizon === 'd7_window'
                    ? 'Weekly Slate (D0–D7)'
                    : activeHorizon}
                </span>
                <button
                  onClick={() => handleHorizonChange('all')}
                  className="ml-1 hover:text-red-500 font-bold"
                  title="Clear Horizon Filter"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
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
          {finalFiltered.length === 0 ? (
            fixtures.length === 0 || isDataUnavailable ? (
              <div className="py-16 px-6 text-center text-slate-500 dark:text-slate-400 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-200">
                  Fixture data unavailable
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Every fixture displayed in the application must come from a reliable, verified football data source (ESPN Scoreboard API). Matches are never fabricated, inferred, or generated by AI when source data is unavailable.
                </p>
                {onRetrySync && (
                  <button
                    onClick={onRetrySync}
                    className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-sm transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Data Source Verification</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="py-14 px-4 text-center text-slate-500 dark:text-slate-400 text-xs space-y-2.5">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto stroke-[1.5]" />
                <p className="font-bold text-sm text-slate-700 dark:text-slate-200">
                  No matches found matching criteria.
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  No verified fixtures match your current filters or weekly slate. In adherence to strict data integrity rules, no fixtures are fabricated.
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                  <button
                    onClick={() => {
                      handleHorizonChange('all');
                      setSearchQuery('');
                      setConfidenceFilter('all');
                      onSelectLeague('all');
                    }}
                    className="px-3.5 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                  {onSelectWeekend && (
                    <button
                      onClick={() => {
                        onSelectWeekend(3);
                        onSelectLeague('all');
                        handleHorizonChange('all');
                      }}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition"
                    >
                      <span>Jump to Next Verified Matchday Slate</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )
          ) : (
            <div>
              {/* Desktop Fluid Table View (Large Screens) */}
              <div className="hidden lg:block overflow-hidden">
                <table className="w-full text-xs text-left border-collapse table-auto">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">League & Date</th>
                      <th className="py-3 px-3">Matchup</th>
                      <th className="py-3 px-3 text-center">🎯 Recommended Best Bet</th>
                      <th className="py-3 px-3 text-center">Market Probabilities</th>
                      <th className="py-3 px-3 text-center">xG</th>
                      <th className="py-3 px-3 text-center">ML Confidence</th>
                      <th className="py-3 px-3 text-right">In-Depth Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {finalFiltered.map((fixture) => {
                      const league = LEAGUES.find((l) => l.id === fixture.leagueId);
                      const { metrics } = fixture;
                      const rel = formatRelativeDateLabel(fixture.kickoffDate);

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
                          {/* League Badge & Kickoff with Relative Horizon Badge */}
                          <td className="py-3 px-3 font-medium">
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                              <span className="text-base">{league?.flag}</span>
                              <span className="font-semibold text-[11px] whitespace-nowrap">{league?.name}</span>
                              {fixture.verification?.isVerified && (
                                <span 
                                  className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-300/40 inline-flex items-center gap-0.5"
                                  title={`Independently verified from ${fixture.verification.source} (#${fixture.verification.sourceEventId})`}
                                >
                                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
                                  <span>Verified</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                                {formatKickoffDateTime(fixture.kickoffDate, fixture.kickoffTime)}
                              </span>
                              {rel.isToday ? (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40">
                                  ⚡ TODAY • MON D0
                                </span>
                              ) : rel.isMonday ? (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40">
                                  MONDAY • D0
                                </span>
                              ) : rel.isD7 ? (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40">
                                  🎯 SUNDAY • D7
                                </span>
                              ) : (
                                <span className="text-[9px] font-semibold uppercase px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {rel.dayBadge}
                                </span>
                              )}
                            </div>
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
                {finalFiltered.map((fixture) => {
                  const league = LEAGUES.find((l) => l.id === fixture.leagueId);
                  const { metrics } = fixture;
                  const rel = formatRelativeDateLabel(fixture.kickoffDate);

                  return (
                    <div key={fixture.id} className="p-4 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      {/* League info + Kickoff + Confidence badge */}
                      <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 flex-wrap">
                          <span className="text-base">{league?.flag}</span>
                          <span>{league?.name}</span>
                          <span className="text-slate-400 font-normal">• {formatKickoffDateTime(fixture.kickoffDate, fixture.kickoffTime)}</span>
                          {rel.isToday ? (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40">
                              ⚡ TODAY • MON D0
                            </span>
                          ) : rel.isMonday ? (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40">
                              MONDAY • D0
                            </span>
                          ) : rel.isD7 ? (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40">
                              🎯 SUNDAY • D7
                            </span>
                          ) : (
                            <span className="text-[9px] font-semibold uppercase px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {rel.dayBadge}
                            </span>
                          )}
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
        finalFiltered.length === 0 ? (
          fixtures.length === 0 || isDataUnavailable ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-200">
                Fixture data unavailable
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Every fixture displayed in the application must come from an independently verified official football data feed. Match fixtures are never fabricated, inferred, or generated by AI when source data is unavailable.
              </p>
              {onRetrySync && (
                <button
                  onClick={onRetrySync}
                  className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-sm transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Data Source Verification</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 text-xs space-y-2.5">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto stroke-[1.5]" />
              <p className="font-bold text-sm text-slate-700 dark:text-slate-200">
                No matches found matching criteria.
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No verified fixtures match your current filters or weekly slate. In adherence to strict data integrity rules, no fixtures are fabricated.
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                <button
                  onClick={() => {
                    handleHorizonChange('all');
                    setSearchQuery('');
                    setConfidenceFilter('all');
                    onSelectLeague('all');
                  }}
                  className="px-3.5 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
                {onSelectWeekend && (
                  <button
                    onClick={() => {
                      onSelectWeekend(3);
                      onSelectLeague('all');
                      handleHorizonChange('all');
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition"
                  >
                    <span>Jump to Next Verified Matchday Slate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {finalFiltered.map((fixture) => (
              <FixtureCard
                key={fixture.id}
                fixture={fixture}
                onOpenAnalysis={onOpenAnalysis}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};
