import React, { useState, useEffect } from 'react';
import { Fixture } from '../types';
import { Bot, AlertTriangle, ShieldCheck, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

interface AIReportsDigestProps {
  onSelectFixture: (fixture: Fixture) => void;
}

export const AIReportsDigest: React.FC<AIReportsDigestProps> = ({ onSelectFixture }) => {
  const [digest, setDigest] = useState<{
    highestConfidenceFixtures: Fixture[];
    potentialUpsets: Fixture[];
    mostBalancedFixtures: Fixture[];
    roundSummaryText: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/reports/digest')
      .then((res) => res.json())
      .then((data) => setDigest(data))
      .catch((err) => console.error('Error fetching digest:', err));
  }, []);

  if (!digest) return null;

  return (
    <div className="space-y-6">
      {/* Executive Overview Banner */}
      <div className="p-6 bg-slate-900 dark:bg-slate-900 text-white rounded-2xl shadow-md space-y-3 border border-slate-800 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-extrabold tracking-tight text-white">AI Executive Match Intelligence Digest</h2>
            <p className="text-xs text-emerald-400 font-semibold tracking-wide">Automated Round Analysis & Statistical Outlier Engine</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl font-normal">
          {digest.roundSummaryText}
        </p>
      </div>

      {/* Grid of Digest Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Model Confidence Predictions */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3>Highest Confidence ML Predictions</h3>
            </div>
            <span className="text-xs text-slate-400">Low Model Variance</span>
          </div>

          <div className="space-y-3">
            {digest.highestConfidenceFixtures.map((fix) => (
              <div
                key={fix.id}
                onClick={() => onSelectFixture(fix)}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60 transition cursor-pointer flex items-center justify-between text-xs group"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {fix.homeTeam.name} vs {fix.awayTeam.name}
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Model Confidence: <strong className="text-emerald-600 dark:text-emerald-400">{fix.metrics.confidenceScore}%</strong> ({fix.metrics.confidenceInterval})
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">
                    {fix.metrics.homeWinProb >= fix.metrics.awayWinProb ? `${fix.homeTeam.shortName} ${fix.metrics.homeWinProb}%` : `${fix.awayTeam.shortName} ${fix.metrics.awayWinProb}%`}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Statistical Upsets */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3>Potential Statistical Upsets Watch</h3>
            </div>
            <span className="text-xs text-slate-400">High Underdog Edge</span>
          </div>

          <div className="space-y-3">
            {digest.potentialUpsets.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No major upset anomalies detected in current round.</p>
            ) : (
              digest.potentialUpsets.map((fix) => (
                <div
                  key={fix.id}
                  onClick={() => onSelectFixture(fix)}
                  className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/50 transition cursor-pointer flex items-center justify-between text-xs group"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                      {fix.homeTeam.name} vs {fix.awayTeam.name}
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      Underdog {fix.awayTeam.shortName} Win Prob: <strong className="text-amber-600 dark:text-amber-400">{fix.metrics.awayWinProb}%</strong>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-2">
                    <span className="font-bold text-amber-600 dark:text-amber-400">Upset Edge</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Most Evenly Matched Fixtures */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h3>Most Evenly Balanced Contests</h3>
            </div>
            <span className="text-xs text-slate-400">Tight Probability Spread</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {digest.mostBalancedFixtures.map((fix) => (
              <div
                key={fix.id}
                onClick={() => onSelectFixture(fix)}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60 transition cursor-pointer space-y-2 text-xs group"
              >
                <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {fix.homeTeam.shortName} vs {fix.awayTeam.shortName}
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Probabilities:</span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {fix.metrics.homeWinProb}% / {fix.metrics.drawProb}% / {fix.metrics.awayWinProb}%
                  </strong>
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Click for Deep Tactical AI Breakdown →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
