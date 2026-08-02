import React from 'react';
import { Fixture } from '../types';
import { LEAGUES } from '../data/mockDatabase';
import { Calendar, MapPin, Sparkles, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface FixtureCardProps {
  fixture: Fixture;
  onOpenAnalysis: (fixture: Fixture) => void;
}

export const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, onOpenAnalysis }) => {
  const league = LEAGUES.find((l) => l.id === fixture.leagueId);
  const { metrics } = fixture;

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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      
      {/* 1. Header Bar */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-base">{league?.flag}</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{league?.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{formatKickoffDateTime(fixture.kickoffDate, fixture.kickoffTime)}</span>
          </span>

          <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
            {metrics.confidenceScore}% Conf
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* 2. Main Teams Matchup Block */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          
          {/* Home Team */}
          <div className="flex flex-col items-start text-left space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 w-full min-w-0">
              <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} className="w-8 h-8 shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-tight truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {fixture.homeTeam.name}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                  #{fixture.homeTeam.leaguePosition} • {fixture.homeTeam.points} pts
                </span>
              </div>
            </div>

            {/* Form Badges */}
            <div className="flex items-center gap-1 pt-0.5">
              <span className="text-[10px] text-slate-400 mr-0.5 font-medium">Form:</span>
              {fixture.homeTeam.formLast5.map((item, idx) => (
                <span
                  key={idx}
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white ${
                    item.result === 'W'
                      ? 'bg-emerald-500'
                      : item.result === 'D'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  title={`${item.result} vs ${item.opponent} (${item.score})`}
                >
                  {item.result}
                </span>
              ))}
            </div>
          </div>

          {/* Center VS & xG Badge */}
          <div className="flex flex-col items-center justify-center px-1">
            <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/80 dark:border-slate-700">
              VS
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 whitespace-nowrap bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/40">
              {metrics.homeExpectedGoals} - {metrics.awayExpectedGoals} xG
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-end text-right space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 justify-end w-full min-w-0">
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-tight truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {fixture.awayTeam.name}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                  #{fixture.awayTeam.leaguePosition} • {fixture.awayTeam.points} pts
                </span>
              </div>
              <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} className="w-8 h-8 shrink-0" />
            </div>

            {/* Form Badges */}
            <div className="flex items-center gap-1 pt-0.5 justify-end">
              <span className="text-[10px] text-slate-400 ml-0.5 font-medium order-last">:Form</span>
              {fixture.awayTeam.formLast5.map((item, idx) => (
                <span
                  key={idx}
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white ${
                    item.result === 'W'
                      ? 'bg-emerald-500'
                      : item.result === 'D'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  title={`${item.result} vs ${item.opponent} (${item.score})`}
                >
                  {item.result}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Recommended Best Bet Banner */}
        {metrics.detailedMarkets?.bestRecommendedBet && (
          <div className="p-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl border border-emerald-500/40 shadow-sm flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/80">
                    Best Bet: {metrics.detailedMarkets.bestRecommendedBet.marketCode}
                  </span>
                  <span className="text-xs font-bold text-white truncate">
                    {metrics.detailedMarkets.bestRecommendedBet.selection}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 truncate mt-0.5">
                  {metrics.detailedMarkets.bestRecommendedBet.reasoning}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/90 px-2 py-1 rounded-lg border border-emerald-500/30 block">
                {metrics.detailedMarkets.bestRecommendedBet.confidenceScore}% Conf
              </span>
            </div>
          </div>
        )}

        {/* 4. Segmented 1X2 Machine Learning Probability Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>{fixture.homeTeam.shortName} Win</span>
              <span>({metrics.homeWinProb}%)</span>
            </span>
            <span className="text-amber-600 dark:text-amber-400">
              Draw ({metrics.drawProb}%)
            </span>
            <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>{fixture.awayTeam.shortName} Win</span>
              <span>({metrics.awayWinProb}%)</span>
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="bg-emerald-500 transition-all duration-500"
              style={{ width: `${metrics.homeWinProb}%` }}
              title={`Home Win: ${metrics.homeWinProb}%`}
            />
            <div
              className="bg-amber-400 transition-all duration-500"
              style={{ width: `${metrics.drawProb}%` }}
              title={`Draw: ${metrics.drawProb}%`}
            />
            <div
              className="bg-blue-500 transition-all duration-500"
              style={{ width: `${metrics.awayWinProb}%` }}
              title={`Away Win: ${metrics.awayWinProb}%`}
            />
          </div>
        </div>

        {/* 5. Key Market Probabilities Grid (1X, 2X, GG, O 2.5) */}
        {metrics.detailedMarkets && (
          <div className="grid grid-cols-4 gap-1.5 pt-1 text-center text-[11px]">
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
              <span className="text-[10px] text-slate-400 font-semibold block">1X</span>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-300">
                {metrics.detailedMarkets.doubleChance.homeOrDraw1X.probability}%
              </span>
            </div>

            <div className="p-1.5 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200/60 dark:border-blue-800/40">
              <span className="text-[10px] text-slate-400 font-semibold block">2X</span>
              <span className="font-extrabold text-blue-700 dark:text-blue-300">
                {metrics.detailedMarkets.doubleChance.awayOrDraw2X.probability}%
              </span>
            </div>

            <div className="p-1.5 bg-amber-50 dark:bg-amber-950/50 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
              <span className="text-[10px] text-slate-400 font-semibold block">GG (BTTS)</span>
              <span className="font-extrabold text-amber-700 dark:text-amber-300">
                {metrics.detailedMarkets.bothTeamsToScore.ggYes.probability}%
              </span>
            </div>

            <div className="p-1.5 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-200/60 dark:border-purple-800/40">
              <span className="text-[10px] text-slate-400 font-semibold block">Over 2.5</span>
              <span className="font-extrabold text-purple-700 dark:text-purple-300">
                {metrics.detailedMarkets.goalTotals.over2_5.probability}%
              </span>
            </div>
          </div>
        )}

      </div>

      {/* 6. Card Footer with Action Button */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{fixture.venue.split(',')[0]}</span>
        </div>

        <button
          onClick={() => onOpenAnalysis(fixture)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-sm hover:shadow-emerald-600/30 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Deep Analysis</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
