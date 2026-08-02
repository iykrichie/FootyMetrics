import React, { useState, useEffect } from 'react';
import { ModelPerformanceMetrics } from '../types';
import { Cpu, CheckCircle2, Award, Activity, BarChart2, ShieldCheck, RefreshCw } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export const MLModelLab: React.FC = () => {
  const [metrics, setMetrics] = useState<ModelPerformanceMetrics | null>(null);

  useEffect(() => {
    fetch('/api/model/metrics')
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error('Error fetching model metrics:', err));
  }, []);

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Model Header */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {metrics.modelName}
            </h2>
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 rounded-full">
              Production Active
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Last Retrained: {metrics.lastRetrained} • Tested on {metrics.testedMatchesCount} historical fixtures
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">Model Accuracy Rate</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {metrics.accuracy}%
          </div>
          <span className="text-[10px] text-slate-400">1x2 Match Outcomes</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">Brier Score</span>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {metrics.brierScore}
          </div>
          <span className="text-[10px] text-slate-400">Lower is better (&lt;0.20 optimal)</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">Log Loss Metric</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {metrics.logLoss}
          </div>
          <span className="text-[10px] text-slate-400">Cross-entropy error</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">Calibration Index</span>
          <div className="text-2xl font-extrabold text-amber-500 mt-1">
            {metrics.calibrationScore}
          </div>
          <span className="text-[10px] text-slate-400">Target = 1.00</span>
        </div>
      </div>

      {/* Feature Importance Bar Chart */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
          Machine Learning Feature Importance Weights
        </h3>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics.featureImportances} layout="vertical" margin={{ left: 140 }}>
              <XAxis type="number" domain={[0, 0.3]} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
              <YAxis type="category" dataKey="feature" tick={{ fill: '#64748b', fontSize: 11 }} width={140} />
              <Tooltip formatter={(val: any) => `${Math.round(val * 100)}%`} />
              <Bar dataKey="importance" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calibration Plot & Historical Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Calibration Plot */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
            Probability Calibration Curve (Predicted vs Observed)
          </h3>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.calibrationPoints}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="predictedProb" label={{ value: 'Predicted Probability %', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                <YAxis label={{ value: 'Actual Frequency %', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="actualFreq" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Performance Table */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
            Historical Backtesting Accuracy
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-2.5">Season</th>
                  <th className="p-2.5">Accuracy %</th>
                  <th className="p-2.5">Brier Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {metrics.historicalAccuracyBySeason.map((h, i) => (
                  <tr key={i}>
                    <td className="p-2.5 font-bold">{h.season}</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">{h.accuracy}%</td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-400">{h.brierScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
            <strong>Methodology Note:</strong> Uses a modified Dixon-Coles bivariate Poisson model combined with gradient-boosted decision trees (XGBoost) trained on 5 years of historical match telemetry, xG rolling averages, and team rest cycles.
          </div>
        </div>
      </div>
    </div>
  );
};
