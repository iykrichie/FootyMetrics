import React from 'react';
import { Fixture } from '../types';
import { LEAGUES } from '../data/mockDatabase';
import { Bot, Calendar, MapPin, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface FixtureCardProps {
  fixture: Fixture;
  onOpenAnalysis: (fixture: Fixture) => void;
}

export const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, onOpenAnalysis }) => {
  const league = LEAGUES.find((l) => l.id === fixture.leagueId);
  const { metrics } = fixture;

  // Determine favorite
  let favoriteTag = 'Evenly Matched';
  if (metrics.homeWinProb >= metrics.awayWinProb + 15) {
    favoriteTag = `${fixture.homeTeam.shortName} Favored`;
  } else if (metrics.awayWinProb >= metrics.homeWinProb + 15) {
    favoriteTag = `${fixture.awayTeam.shortName} Favored`;
  }

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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      {/* Top Header Row */}
      <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
          <span className="text-sm">{league?.flag}</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{league?.name}</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            {formatKickoffDateTime(fixture.kickoffDate, fixture.kickoffTime)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
            {favoriteTag}
          </span>
        </div>
      </div>

      {/* RECOMMENDED BEST BET HIGHLIGHT BANNER */}
      {metrics.detailedMarkets?.bestRecommendedBet && (
        <div className="mx-4 mt-3 p-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-sm">🎯</span>
            <div>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="uppercase text-[10px] bg-white/20 px-1.5 py-0.5 rounded tracking-wider">
                  Best Bet: {metrics.detailedMarkets.bestRecommendedBet.marketCode}
                </span>
                <span className="text-emerald-100 font-semibold">{metrics.detailedMarkets.bestRecommendedBet.selection}</span>
              </div>
              <p className="text-[10px] text-emerald-100 opacity-90 truncate max-w-[200px] sm:max-w-[260px]">
                {metrics.detailedMarkets.bestRecommendedBet.reasoning}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[9px] uppercase block font-semibold text-emerald-200">Confidence</span>
            <span className="text-xs font-black bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
              {metrics.detailedMarkets.bestRecommendedBet.confidenceScore}%
            </span>
          </div>
        </div>
      )}

      {/* Main Teams Matchup Block */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-7 items-center gap-2">
          {/* Home Team */}
          <div className="col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2 mb-1">
              <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} className="w-7 h-7" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {fixture.homeTeam.name}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Pos #{fixture.homeTeam.leaguePosition} • {fixture.homeTeam.points} pts
                </span>
              </div>
            </div>

            {/* Form Badges */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] text-slate-400 mr-1">Form:</span>
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

          {/* VS / Expected Goals Badge */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              VS
            </div>
            <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              xG {metrics.homeExpectedGoals} - {metrics.awayExpectedGoals}
            </div>
          </div>

          {/* Away Team */}
          <div className="col-span-3 flex flex-col items-center sm:items-end text-center sm:text-right">
            <div className="flex items-center gap-2 mb-1 sm:flex-row-reverse">
              <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} className="w-7 h-7" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {fixture.awayTeam.name}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Pos #{fixture.awayTeam.leaguePosition} • {fixture.awayTeam.points} pts
                </span>
              </div>
            </div>

            {/* Form Badges */}
            <div className="flex items-center gap-1 mt-1 sm:flex-row-reverse">
              <span className="text-[10px] text-slate-400 ml-1">Form:</span>
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

        {/* Machine Learning Outcome Probabilities Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span>{fixture.homeTeam.shortName}</span>
              <span className="font-bold">{metrics.homeWinProb}%</span>
            </span>

            <span className="text-slate-500 dark:text-slate-400">
              Draw <span className="font-bold text-slate-700 dark:text-slate-200">{metrics.drawProb}%</span>
            </span>

            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <span className="font-bold">{metrics.awayWinProb}%</span>
              <span>{fixture.awayTeam.shortName}</span>
            </span>
          </div>

          {/* Segmented Probability Bar */}
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
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

        {/* Additional Stats & Performance Influencing Drivers Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
          {/* Influencing factors summary pills */}
          {fixture.influencingFactors && (
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              {/* Rest days factor */}
              <span className={`px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${
                fixture.influencingFactors.restAndSchedule.fatigueAdvantage === 'home'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                  : fixture.influencingFactors.restAndSchedule.fatigueAdvantage === 'away'
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                🗓️ Rest: {fixture.influencingFactors.restAndSchedule.homeRestDays}d vs {fixture.influencingFactors.restAndSchedule.awayRestDays}d
              </span>

              {/* Injury alert */}
              <span className="px-2 py-0.5 rounded-md font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                🚑 Key Absences ({fixture.influencingFactors.injuriesAndAbsences.severityRating})
              </span>

              {/* Weather factor */}
              <span className="px-2 py-0.5 rounded-md font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🌤️ {fixture.influencingFactors.weatherAndPitch.condition}
              </span>
            </div>
          )}

          {/* Quick Market Prediction Chips */}
          {metrics.detailedMarkets && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Market Probabilities:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <strong>1:</strong> {metrics.detailedMarkets.oneXTwo.homeWin1.probability}%
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <strong>X:</strong> {metrics.detailedMarkets.oneXTwo.drawX.probability}%
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <strong>2:</strong> {metrics.detailedMarkets.oneXTwo.awayWin2.probability}%
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/40">
                  1X: {metrics.detailedMarkets.doubleChance.homeOrDraw1X.probability}%
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800/40">
                  2X: {metrics.detailedMarkets.doubleChance.awayOrDraw2X.probability}%
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/40">
                  GG: {metrics.detailedMarkets.bothTeamsToScore.ggYes.probability}%
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800/40">
                  O 2.5: {metrics.detailedMarkets.goalTotals.over2_5.probability}%
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-3">
              <span>
                Over 2.5: <strong className="text-slate-700 dark:text-slate-200">{metrics.over2_5Prob}%</strong>
              </span>
              <span>
                BTTS: <strong className="text-slate-700 dark:text-slate-200">{metrics.bttsProb}%</strong>
              </span>
            </div>

            <div className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Confidence: {metrics.confidenceScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar / AI Analysis Button */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
          <span>{formatKickoffDateTime(fixture.kickoffDate, fixture.kickoffTime)}</span>
        </div>

        <button
          onClick={() => onOpenAnalysis(fixture)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-sm hover:shadow-emerald-600/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Match Analysis</span>
        </button>
      </div>
    </div>
  );
};
