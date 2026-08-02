import React, { useState, useEffect } from 'react';
import { AIMatchAnalysisReport, Fixture } from '../types';
import { LEAGUES } from '../data/mockDatabase';
import { TeamLogo } from './TeamLogo';
import {
  X,
  Sparkles,
  BarChart3,
  Bot,
  History,
  Activity,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Loader2,
  Award,
  RefreshCw,
  Crown,
  Lock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

interface MatchAnalysisModalProps {
  fixture: Fixture | null;
  onClose: () => void;
  isRegisteredUser?: boolean;
  onOpenRegistration?: () => void;
}

export const MatchAnalysisModal: React.FC<MatchAnalysisModalProps> = ({
  fixture,
  onClose,
  isRegisteredUser = false,
  onOpenRegistration
}) => {
  const [activeTab, setActiveTab] = useState<'ml-metrics' | 'markets-picks' | 'influencing-factors' | 'ai-report' | 'h2h' | 'radar'>('ml-metrics');
  const [report, setReport] = useState<AIMatchAnalysisReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);
  const [reportError, setReportError] = useState<string | null>(null);

  useEffect(() => {
    if (!fixture || !isRegisteredUser) return;

    // Reset report state
    setReport(null);
    setReportError(null);

    // Fetch AI report from server only if registered
    setIsLoadingReport(true);
    fetch(`/api/analyze/${fixture.id}`, { method: 'POST' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to generate AI report');
        return res.json();
      })
      .then((data: AIMatchAnalysisReport) => {
        setReport(data);
        setIsLoadingReport(false);
      })
      .catch((err) => {
        console.error(err);
        setReportError('Unable to generate AI report. Please try refreshing.');
        setIsLoadingReport(false);
      });
  }, [fixture, isRegisteredUser]);

  if (!fixture) return null;

  const league = LEAGUES.find((l) => l.id === fixture.leagueId);
  const { metrics, homeTeam, awayTeam, h2h } = fixture;

  // Radar Data for Recharts
  const radarData = [
    { metric: 'Offensive Rating', Home: homeTeam.offensiveRating, Away: awayTeam.offensiveRating },
    { metric: 'Defensive Rating', Home: homeTeam.defensiveRating, Away: awayTeam.defensiveRating },
    { metric: 'xG Index', Home: Math.round((homeTeam.xG / 2.5) * 100), Away: Math.round((awayTeam.xG / 2.5) * 100) },
    { metric: 'Possession %', Home: Math.round(homeTeam.possessionAvg), Away: Math.round(awayTeam.possessionAvg) },
    { metric: '10-Match Momentum', Home: homeTeam.formLast10Score, Away: awayTeam.formLast10Score },
    { metric: 'Finishing Efficiency', Home: Math.round(homeTeam.finishingEfficiency * 85), Away: Math.round(awayTeam.finishingEfficiency * 85) }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Banner Header */}
        <div className="px-6 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{league?.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-lg leading-tight text-slate-900 dark:text-white">
                  {homeTeam.name} vs {awayTeam.name}
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-extrabold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-full">
                  {league?.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {fixture.venue} • <span className="font-semibold text-slate-700 dark:text-slate-200">{new Date(fixture.kickoffDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} @ {fixture.kickoffTime}</span> • Referee: {fixture.referee}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'ml-metrics', label: 'ML Probabilities & xG', icon: BarChart3 },
            { id: 'markets-picks', label: '🎯 Markets (1, X, 2, 1X, GG, O/U) & Best Bet', icon: Sparkles },
            { id: 'influencing-factors', label: 'Influencing Factors & 6-Mo Baseline', icon: TrendingUp },
            { id: 'ai-report', label: isRegisteredUser ? 'Explainable AI Report' : 'Explainable AI Report 🔒 (VIP)', icon: Bot },
            { id: 'h2h', label: 'Head-to-Head & Form', icon: History },
            { id: 'radar', label: 'Team Metrics Radar', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 shadow-sm'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 dark:text-slate-200">
          {/* TAB 1: ML PROBABILITIES & XG */}
          {activeTab === 'ml-metrics' && (
            <div className="space-y-6">
              {/* Primary Win Probabilities Header Card */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Match Outcome Probabilities (Poisson Dixon-Coles Monte Carlo Engine)
                </h3>

                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{homeTeam.shortName} Win</span>
                    <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{metrics.homeWinProb}%</div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-amber-100 dark:border-amber-900/50 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Draw</span>
                    <div className="text-2xl font-extrabold text-amber-500">{metrics.drawProb}%</div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-900/50 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{awayTeam.shortName} Win</span>
                    <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{metrics.awayWinProb}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${metrics.homeWinProb}%` }} />
                  <div className="bg-amber-400 h-full" style={{ width: `${metrics.drawProb}%` }} />
                  <div className="bg-blue-500 h-full" style={{ width: `${metrics.awayWinProb}%` }} />
                </div>
              </div>

              {/* Goal Projection Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500">Expected Goals (xG)</span>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {metrics.homeExpectedGoals} - {metrics.awayExpectedGoals}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500">Over 2.5 Goals %</span>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {metrics.over2_5Prob}%
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500">Both Teams Score %</span>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {metrics.bttsProb}%
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500">Model Confidence</span>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1">
                    <span>{metrics.confidenceScore}%</span>
                    <span className="text-xs font-normal text-slate-400">({metrics.confidenceInterval})</span>
                  </div>
                </div>
              </div>

              {/* Top Feature Drivers */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                  Top Statistical Feature Drivers
                </h4>

                <div className="space-y-2">
                  {metrics.topFactors.map((factor, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{factor.factor}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-semibold ${
                              factor.direction === 'home'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                                : factor.direction === 'away'
                                ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            Favors {factor.direction === 'home' ? homeTeam.shortName : factor.direction === 'away' ? awayTeam.shortName : 'Neutral'}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{factor.description}</p>
                      </div>

                      <div className="text-right whitespace-nowrap font-bold text-slate-500 dark:text-slate-400">
                        Weight: {Math.round(factor.weight * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MARKET PREDICTIONS & RECOMMENDED BEST BET */}
          {activeTab === 'markets-picks' && (
            <div className="space-y-6">
              {/* Hero Best Bet Recommendation Banner */}
              {metrics.detailedMarkets?.bestRecommendedBet && (
                <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white shadow-lg border border-emerald-500/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950">
                          🎯 MODEL TOP RECOMMENDATION
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          {metrics.detailedMarkets.bestRecommendedBet.riskTier}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                        <span>RECOMMENDED BET: {metrics.detailedMarkets.bestRecommendedBet.selection}</span>
                        <span className="text-sm font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                          Market: {metrics.detailedMarkets.bestRecommendedBet.marketCode}
                        </span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-emerald-500/30 shrink-0">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Model Confidence</span>
                        <strong className="text-xl text-emerald-400 font-black">
                          {metrics.detailedMarkets.bestRecommendedBet.confidenceScore}%
                        </strong>
                      </div>
                      <div className="border-l border-slate-700 pl-3">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Fair Odds</span>
                        <strong className="text-base text-amber-300 font-mono font-bold">
                          @{metrics.detailedMarkets.bestRecommendedBet.fairOdds}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    💡 <strong>Analytical Justification:</strong> {metrics.detailedMarkets.bestRecommendedBet.reasoning}
                  </p>

                  {/* Secondary Recommendations */}
                  {metrics.detailedMarkets.secondaryRecommendedBets.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 tracking-wider">
                        Secondary Value Alternatives:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {metrics.detailedMarkets.secondaryRecommendedBets.map((rec, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/80 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-emerald-300 block">{rec.selection} ({rec.marketCode})</span>
                              <span className="text-[10px] text-slate-400">{rec.riskTier} • Fair Odds: @{rec.fairOdds}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              {rec.confidenceScore}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Full Betting Markets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. 1X2 Match Winner Market */}
                {metrics.detailedMarkets && (
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                        <span>⚽ 1X2 Match Winner Market</span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold">Single Outcome</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {[
                        metrics.detailedMarkets.oneXTwo.homeWin1,
                        metrics.detailedMarkets.oneXTwo.drawX,
                        metrics.detailedMarkets.oneXTwo.awayWin2
                      ].map((item) => (
                        <div key={item.code} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                            <span className="text-[10px] text-slate-500">Fair Odds: @{item.fairOdds}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">{item.probability}%</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.confidenceLevel === 'Very High' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                              item.confidenceLevel === 'High' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' :
                              item.confidenceLevel === 'Medium' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {item.confidenceLevel}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Double Chance Market (1X, 2X, 12) */}
                {metrics.detailedMarkets && (
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                        <span>🛡️ Double Chance Markets (1X, 2X, 12)</span>
                      </h4>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">High Coverage</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {[
                        metrics.detailedMarkets.doubleChance.homeOrDraw1X,
                        metrics.detailedMarkets.doubleChance.awayOrDraw2X,
                        metrics.detailedMarkets.doubleChance.noDraw12
                      ].map((item) => (
                        <div key={item.code} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                            <span className="text-[10px] text-slate-500">Fair Odds: @{item.fairOdds}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">{item.probability}%</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.confidenceLevel === 'Very High' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                              item.confidenceLevel === 'High' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' :
                              item.confidenceLevel === 'Medium' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {item.confidenceLevel}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Both Teams To Score (GG / NG) */}
                {metrics.detailedMarkets && (
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                        <span>🔥 Both Teams To Score (GG vs NG)</span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold">BTTS Market</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {[
                        metrics.detailedMarkets.bothTeamsToScore.ggYes,
                        metrics.detailedMarkets.bothTeamsToScore.ngNo
                      ].map((item) => (
                        <div key={item.code} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                            <span className="text-[10px] text-slate-500">Fair Odds: @{item.fairOdds}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">{item.probability}%</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.confidenceLevel === 'Very High' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                              item.confidenceLevel === 'High' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' :
                              item.confidenceLevel === 'Medium' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {item.confidenceLevel}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Total Goals Over / Under Lines */}
                {metrics.detailedMarkets && (
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                        <span>🥅 Total Goals Over / Under Lines</span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold">1.5 / 2.5 / 3.5 Goals</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        metrics.detailedMarkets.goalTotals.over1_5,
                        metrics.detailedMarkets.goalTotals.under1_5,
                        metrics.detailedMarkets.goalTotals.over2_5,
                        metrics.detailedMarkets.goalTotals.under2_5,
                        metrics.detailedMarkets.goalTotals.over3_5,
                        metrics.detailedMarkets.goalTotals.under3_5
                      ].map((item) => (
                        <div key={item.code} className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white text-[11px] block">{item.code}</span>
                            <span className="text-[9px] text-slate-500">@{item.fairOdds}</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {item.probability}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: INFLUENCING FACTORS & 6-MO BASELINE */}
          {activeTab === 'influencing-factors' && (
            <div className="space-y-6">
              {/* 6-Month Rolling Telemetry Card */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-sm border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Multi-Month Telemetry
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        Horizon: Week +{fixture.weekendNumber}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">6-Month Historical Trend Baseline</h3>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    Sample: <strong>240 Matches (Aug 2025 - Feb 2026)</strong>
                  </div>
                </div>

                {/* Team 6-Month Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Home Team Trend */}
                  <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/70 space-y-2">
                    <div className="flex items-center justify-between font-bold text-sm text-emerald-400">
                      <div className="flex items-center gap-2">
                        <TeamLogo logo={homeTeam.logo} name={homeTeam.name} className="w-5 h-5" />
                        <span>{homeTeam.name}</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                        6-Mo xG Trend
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-300">
                      <div className="flex justify-between">
                        <span>6-Month xG Rate:</span>
                        <strong className="text-white">{homeTeam.xG} goals / 90</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Defensive Solidity Trend:</span>
                        <strong className="text-emerald-400 font-semibold">{metrics.historicalContext?.homeDefensiveTrend6Mo || 'Stable'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Seasonal Home Win Rate:</span>
                        <strong className="text-white">{homeTeam.homeFormScore}% Index</strong>
                      </div>
                    </div>
                  </div>

                  {/* Away Team Trend */}
                  <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/70 space-y-2">
                    <div className="flex items-center justify-between font-bold text-sm text-blue-400">
                      <div className="flex items-center gap-2">
                        <TeamLogo logo={awayTeam.logo} name={awayTeam.name} className="w-5 h-5" />
                        <span>{awayTeam.name}</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                        6-Mo xG Trend
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-300">
                      <div className="flex justify-between">
                        <span>6-Month xG Rate:</span>
                        <strong className="text-white">{awayTeam.xG} goals / 90</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Defensive Solidity Trend:</span>
                        <strong className="text-blue-400 font-semibold">{metrics.historicalContext?.awayDefensiveTrend6Mo || 'Stable'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Seasonal Away Win Rate:</span>
                        <strong className="text-white">{awayTeam.awayFormScore}% Index</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Influencing Performance Drivers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Squad Absences & Injury Impact */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <span>🚑 Squad Injuries & Key Absences</span>
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      Severity: {fixture.influencingFactors?.injuriesAndAbsences.severityRating || 'Medium'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <TeamLogo logo={homeTeam.logo} name={homeTeam.name} className="w-4 h-4" />
                        <span>{homeTeam.shortName} Missing Players:</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {fixture.influencingFactors?.injuriesAndAbsences.homeTeamKeyAbsences.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <TeamLogo logo={awayTeam.logo} name={awayTeam.name} className="w-4 h-4" />
                        <span>{awayTeam.shortName} Missing Players:</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {fixture.influencingFactors?.injuriesAndAbsences.awayTeamKeyAbsences.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2. Schedule & Rest Days */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <span>🗓️ Schedule & Rest Congestion</span>
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      Fatigue Advantage: {fixture.influencingFactors?.restAndSchedule.fatigueAdvantage.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{homeTeam.shortName} Rest</span>
                        <span className="text-slate-500">{fixture.influencingFactors?.restAndSchedule.homeRestDays} Days Rest</span>
                      </div>
                      {fixture.influencingFactors?.restAndSchedule.homeMidweekFixture && (
                        <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-semibold">
                          Midweek: {fixture.influencingFactors.restAndSchedule.homeMidweekFixture}
                        </span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{awayTeam.shortName} Rest</span>
                        <span className="text-slate-500">{fixture.influencingFactors?.restAndSchedule.awayRestDays} Days Rest</span>
                      </div>
                      {fixture.influencingFactors?.restAndSchedule.awayMidweekFixture && (
                        <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-semibold">
                          Midweek: {fixture.influencingFactors.restAndSchedule.awayMidweekFixture}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Weather & Pitch Conditions */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🌤️ Pitch Surface & Environmental Factors</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Condition</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{fixture.influencingFactors?.weatherAndPitch.condition}</strong>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Pitch Type</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{fixture.influencingFactors?.weatherAndPitch.pitchCondition}</strong>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Temperature</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{fixture.influencingFactors?.weatherAndPitch.temperatureC}°C</strong>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Wind Speed</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{fixture.influencingFactors?.weatherAndPitch.windSpeedKmh} km/h</strong>
                    </div>
                  </div>
                </div>

                {/* 4. Match Stakes & Referee Profile */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🟨 Referee Profile & Match Stakes</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Referee Name & Profile</span>
                        <strong className="text-slate-900 dark:text-white font-bold">
                          {fixture.influencingFactors?.refereeProfile.name} ({fixture.influencingFactors?.refereeProfile.strictness})
                        </strong>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 text-[10px] block">Disciplinary Avg</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {fixture.influencingFactors?.refereeProfile.avgYellowsPerGame} 🟨 / {fixture.influencingFactors?.refereeProfile.avgRedsPerGame} 🟥
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{homeTeam.shortName} Objective:</span>
                        <strong className="text-slate-900 dark:text-white font-bold">{fixture.influencingFactors?.stakesAndMotivation.homeStakes}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{awayTeam.shortName} Objective:</span>
                        <strong className="text-slate-900 dark:text-white font-bold">{fixture.influencingFactors?.stakesAndMotivation.awayStakes}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'ai-report' && (
            <div className="space-y-6">
              {!isRegisteredUser ? (
                <div className="p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden my-2">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500"></div>

                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
                    <Crown className="w-8 h-8 fill-amber-400 text-amber-400" />
                  </div>

                  <div className="max-w-xl mx-auto space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-950/80 text-amber-400 border border-amber-800/80">
                      <Lock className="w-3.5 h-3.5" /> VIP Exclusive Feature
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Explainable AI Match Report
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Deep AI tactical reports generated by Gemini 3.6 Flash are disabled by default for general visitors and restricted exclusively to registered VIP members.
                    </p>
                  </div>

                  {/* Included VIP Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto text-xs bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-start gap-2 text-slate-200">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-bold">Tactical & xG Narrative</strong>
                        <span className="text-[11px] text-slate-400">In-depth statistical match flow analysis</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-200">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-bold">Upset Watch Indicators</strong>
                        <span className="text-[11px] text-slate-400">Early warning probability thresholds</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-200">
                      <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-bold">Pitch Zone Player Matchups</strong>
                        <span className="text-[11px] text-slate-400">Head-to-head positional battle ratings</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-bold">Model Confidence Breakdown</strong>
                        <span className="text-[11px] text-slate-400">Fair odds vs market odds validation</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 max-w-sm mx-auto">
                    <button
                      onClick={onOpenRegistration}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Register for Free VIP Access</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                    <p className="text-[10px] text-slate-400 mt-2">
                      Instant 1-click registration. No credit card required.
                    </p>
                  </div>
                </div>
              ) : isLoadingReport ? (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Generating Deep Tactical & Statistical Match Report via Gemini 3.6 Flash...
                  </p>
                  <p className="text-xs text-slate-500">Synthesizing xG trends, key matchups, and potential upset indicators.</p>
                </div>
              ) : reportError ? (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-xl border border-rose-200 text-xs">
                  {reportError}
                </div>
              ) : report ? (
                <div className="space-y-6">
                  {/* Upset Watch Alert Banner */}
                  {report.upsetWatch.isPotentialUpset && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 rounded-xl flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs uppercase tracking-wider">
                          Potential Statistical Upset Watch ({report.upsetWatch.upsetProbability}% Probability)
                        </h4>
                        <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                          {report.upsetWatch.narrativeReasoning}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tactical Summary */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span>Tactical & Possession Narrative</span>
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {report.tacticalSummary}
                    </p>
                  </div>

                  {/* Key Tactical Matchups Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                      Key Pitch Zone Matchups
                    </h4>

                    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            <th className="p-3">Pitch Zone</th>
                            <th className="p-3">{homeTeam.shortName} Setup</th>
                            <th className="p-3">{awayTeam.shortName} Setup</th>
                            <th className="p-3">Analytical Verdict</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {report.keyMatchups.map((km, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-3 font-semibold text-slate-900 dark:text-white">{km.area}</td>
                              <td className="p-3 text-slate-600 dark:text-slate-300">{km.homePlayerOrGroup}</td>
                              <td className="p-3 text-slate-600 dark:text-slate-300">{km.awayPlayerOrGroup}</td>
                              <td className="p-3 text-slate-700 dark:text-slate-200">{km.verdict}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Statistical Anomalies & Model Confidence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Statistical Outliers</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                        {report.statisticalAnomalies.map((anom, i) => (
                          <li key={i}>{anom}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Predicted Match Flow Script</h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {report.predictedMatchFlow}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 3: HEAD TO HEAD & FORM */}
          {activeTab === 'h2h' && (
            <div className="space-y-6">
              {/* H2H Summary Bar */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Historical Head-to-Head ({h2h.totalMatches} Matches Analyzed)
                </h4>

                <div className="grid grid-cols-4 gap-2 text-center mb-3">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-400">{homeTeam.shortName} Wins</span>
                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{h2h.homeWins}</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-400">Draws</span>
                    <div className="text-xl font-bold text-amber-500">{h2h.draws}</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-400">{awayTeam.shortName} Wins</span>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{h2h.awayWins}</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-400">Avg Goals/Game</span>
                    <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{h2h.avgGoals}</div>
                  </div>
                </div>
              </div>

              {/* Recent Meetings Timeline */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                  Recent Direct Encounters Log
                </h4>

                <div className="space-y-2">
                  {h2h.recentMeetings.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs"
                    >
                      <div className="text-slate-500 font-medium">{m.date} • {m.competition}</div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {m.homeTeamName} <span className="text-emerald-600 font-extrabold px-1">{m.homeGoals} - {m.awayGoals}</span> {m.awayTeamName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TEAM METRICS RADAR */}
          {activeTab === 'radar' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Comparative Tactical Capabilities Radar
                </h4>

                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#94a3b8" opacity={0.3} />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Radar name={homeTeam.name} dataKey="Home" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                      <Radar name={awayTeam.name} dataKey="Away" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
