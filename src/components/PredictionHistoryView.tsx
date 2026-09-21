import React, { useState, useEffect, useMemo } from 'react';
import { 
  Fixture, 
  League, 
  LeagueId, 
  PredictionHistoryRecord, 
  PredictionMarketType, 
  PredictionOutcome, 
  PredictionPerformanceSummary 
} from '../types';
import { 
  getStoredPredictionHistory, 
  savePredictionHistoryToStorage, 
  computePerformanceSummary, 
  evaluatePredictionOutcome, 
  calculateProfitUnits, 
  DEFAULT_PREDICTION_HISTORY 
} from '../data/predictionHistoryData';
import { 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  Clock, 
  TrendingUp, 
  PlusCircle, 
  Search, 
  Filter, 
  Download, 
  RotateCcw, 
  Award, 
  Flame, 
  Layers, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Check, 
  Calendar, 
  Info,
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';

interface PredictionHistoryViewProps {
  fixtures?: Fixture[];
  leagues?: League[];
}

export const PredictionHistoryView: React.FC<PredictionHistoryViewProps> = ({ 
  fixtures = [], 
  leagues = [] 
}) => {
  const [records, setRecords] = useState<PredictionHistoryRecord[]>(() => getStoredPredictionHistory());
  const [searchQuery, setSearchQuery] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState<'ALL' | PredictionOutcome>('ALL');
  const [marketFilter, setMarketFilter] = useState<'ALL' | PredictionMarketType>('ALL');
  const [leagueFilter, setLeagueFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'profit-desc' | 'odds-desc'>('date-desc');
  
  // Expanded card rows for tactical notes
  const [expandedRecordIds, setExpandedRecordIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [settlingRecord, setSettlingRecord] = useState<PredictionHistoryRecord | null>(null);

  // Form states for Logging a new prediction
  const [formSelectedFixtureId, setFormSelectedFixtureId] = useState<string>('');
  const [formMatchName, setFormMatchName] = useState('');
  const [formLeagueId, setFormLeagueId] = useState<LeagueId>('epl');
  const [formMarketType, setFormMarketType] = useState<PredictionMarketType>('1X2');
  const [formSelection, setFormSelection] = useState('');
  const [formClosingOdds, setFormClosingOdds] = useState('1.75');
  const [formFairOdds, setFormFairOdds] = useState('1.55');
  const [formProbability, setFormProbability] = useState('65');
  const [formStakeUnits, setFormStakeUnits] = useState('1.0');
  const [formHomeGoals, setFormHomeGoals] = useState('');
  const [formAwayGoals, setFormAwayGoals] = useState('');
  const [formAnalysisNote, setFormAnalysisNote] = useState('');

  // Settlement modal inputs
  const [settleHomeGoals, setSettleHomeGoals] = useState('2');
  const [settleAwayGoals, setSettleAwayGoals] = useState('1');
  const [settleNote, setSettleNote] = useState('');

  // Sync with API on mount if available
  useEffect(() => {
    fetch('/api/predictions/history')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.records) && data.records.length > 0) {
          setRecords(data.records);
          savePredictionHistoryToStorage(data.records);
        }
      })
      .catch((err) => {
        console.info('Using client stored prediction history records:', err.message);
      });
  }, []);

  // Compute live summary from current records
  const summary: PredictionPerformanceSummary = useMemo(() => {
    return computePerformanceSummary(records);
  }, [records]);

  // Filtered and sorted records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        // Outcome filter
        if (outcomeFilter !== 'ALL' && rec.status !== outcomeFilter) return false;
        // Market filter
        if (marketFilter !== 'ALL' && rec.marketType !== marketFilter) return false;
        // League filter
        if (leagueFilter !== 'ALL' && rec.leagueId !== leagueFilter) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match = 
            rec.matchName.toLowerCase().includes(q) ||
            rec.homeTeam.toLowerCase().includes(q) ||
            rec.awayTeam.toLowerCase().includes(q) ||
            rec.selection.toLowerCase().includes(q) ||
            rec.leagueName.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortBy === 'profit-desc') return b.profitUnits - a.profitUnits;
        if (sortBy === 'odds-desc') return b.closingOdds - a.closingOdds;
        return 0;
      });
  }, [records, outcomeFilter, marketFilter, leagueFilter, searchQuery, sortBy]);

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedRecordIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Pre-fill form when user selects an upcoming fixture
  const handleFixtureSelect = (fixtureId: string) => {
    setFormSelectedFixtureId(fixtureId);
    const found = fixtures.find((f) => f.id === fixtureId);
    if (found) {
      setFormMatchName(`${found.homeTeam.name} vs ${found.awayTeam.name}`);
      setFormLeagueId(found.leagueId);
      const isHomeFav = found.metrics.homeWinProb >= found.metrics.awayWinProb;
      const topPick = isHomeFav ? `${found.homeTeam.shortName} Win (Home)` : `${found.awayTeam.shortName} Win (Away)`;
      setFormSelection(topPick);
      setFormProbability(Math.max(found.metrics.homeWinProb, found.metrics.awayWinProb).toString());
      setFormFairOdds(isHomeFav ? found.metrics.fairOdds.home.toFixed(2) : found.metrics.fairOdds.away.toFixed(2));
      setFormClosingOdds(isHomeFav ? (found.metrics.fairOdds.home * 1.1).toFixed(2) : (found.metrics.fairOdds.away * 1.1).toFixed(2));
      setFormAnalysisNote(`Algorithm prediction with ${found.metrics.confidenceScore}% confidence index.`);
    }
  };

  // Submit new prediction record
  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMatchName || !formSelection) return;

    const hasScore = formHomeGoals.trim() !== '' && formAwayGoals.trim() !== '';
    const hG = hasScore ? parseInt(formHomeGoals, 10) : undefined;
    const aG = hasScore ? parseInt(formAwayGoals, 10) : undefined;

    let status: PredictionOutcome = 'PENDING';
    let profitUnits = 0;
    let payoutUnits = 0;

    const closingOddsNum = parseFloat(formClosingOdds) || 1.80;
    const stakeUnitsNum = parseFloat(formStakeUnits) || 1.0;

    if (hasScore && hG !== undefined && aG !== undefined) {
      status = evaluatePredictionOutcome(formMarketType, formSelection, hG, aG);
      const calc = calculateProfitUnits(status, closingOddsNum, stakeUnitsNum);
      profitUnits = calc.profitUnits;
      payoutUnits = calc.payoutUnits;
    }

    const marketLabels: Record<PredictionMarketType, string> = {
      '1X2': '1X2 Match Winner',
      'OVER_UNDER_2_5': 'Over/Under 2.5 Goals',
      'OVER_UNDER_1_5': 'Over/Under 1.5 Goals',
      'OVER_UNDER_3_5': 'Over/Under 3.5 Goals',
      'BTTS': 'Both Teams to Score',
      'DOUBLE_CHANCE': 'Double Chance (1X / 2X)',
      'VALUE_PLAY': 'Value Edge Pick'
    };

    const leagueNames: Record<LeagueId, string> = {
      'epl': 'Premier League',
      'laliga': 'La Liga',
      'bundesliga': 'Bundesliga',
      'seriea': 'Serie A',
      'ligue1': 'Ligue 1',
      'eredivisie': 'Eredivisie',
      'ligaportugal': 'Liga Portugal'
    };

    const newRecord: PredictionHistoryRecord = {
      id: `pred-user-${Date.now()}`,
      fixtureId: formSelectedFixtureId || undefined,
      date: new Date().toISOString().split('T')[0],
      matchName: formMatchName,
      homeTeam: formMatchName.split(' vs ')[0] || 'Home',
      awayTeam: formMatchName.split(' vs ')[1] || 'Away',
      homeTeamLogo: '⚽',
      awayTeamLogo: '🛡️',
      leagueId: formLeagueId,
      leagueName: leagueNames[formLeagueId] || 'European League',
      marketType: formMarketType,
      marketLabel: marketLabels[formMarketType] || formMarketType,
      selection: formSelection,
      predictedProbability: parseFloat(formProbability) || 65,
      fairOdds: parseFloat(formFairOdds) || 1.55,
      closingOdds: closingOddsNum,
      confidenceLevel: parseFloat(formProbability) >= 75 ? 'Very High' : parseFloat(formProbability) >= 60 ? 'High' : 'Medium',
      stakeUnits: stakeUnitsNum,
      actualHomeGoals: hG,
      actualAwayGoals: aG,
      actualScore: hasScore ? `${hG} - ${aG}` : undefined,
      status,
      profitUnits,
      payoutUnits,
      analysisNote: formAnalysisNote || 'Custom user logged prediction record.',
      isModelPick: !!formSelectedFixtureId,
      loggedAt: new Date().toISOString()
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    savePredictionHistoryToStorage(updated);
    setIsLogModalOpen(false);

    // Reset form
    setFormMatchName('');
    setFormSelection('');
    setFormHomeGoals('');
    setFormAwayGoals('');
    setFormSelectedFixtureId('');

    // Sync to backend if possible
    try {
      await fetch('/api/predictions/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
    } catch {}
  };

  // Settle an existing prediction
  const handleSettleRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settlingRecord) return;

    const hG = parseInt(settleHomeGoals, 10);
    const aG = parseInt(settleAwayGoals, 10);
    if (isNaN(hG) || isNaN(aG)) return;

    const outcome = evaluatePredictionOutcome(settlingRecord.marketType, settlingRecord.selection, hG, aG);
    const { profitUnits, payoutUnits } = calculateProfitUnits(outcome, settlingRecord.closingOdds, settlingRecord.stakeUnits);

    const updatedRecords = records.map((r) => {
      if (r.id === settlingRecord.id) {
        return {
          ...r,
          actualHomeGoals: hG,
          actualAwayGoals: aG,
          actualScore: `${hG} - ${aG}`,
          status: outcome,
          profitUnits,
          payoutUnits,
          analysisNote: settleNote || r.analysisNote || `Settled ${hG}-${aG}. Outcome: ${outcome}`
        };
      }
      return r;
    });

    setRecords(updatedRecords);
    savePredictionHistoryToStorage(updatedRecords);
    setSettlingRecord(null);

    // Sync to server
    try {
      await fetch(`/api/predictions/history/${settlingRecord.id}/settle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeGoals: hG,
          awayGoals: aG,
          actualScore: `${hG} - ${aG}`,
          analysisNote: settleNote
        })
      });
    } catch {}
  };

  // Delete a record
  const handleDeleteRecord = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prediction record from the ledger?')) return;
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    savePredictionHistoryToStorage(updated);

    try {
      await fetch(`/api/predictions/history/${id}`, { method: 'DELETE' });
    } catch {}
  };

  // Reset to benchmark dataset
  const handleResetBenchmark = async () => {
    if (!confirm('Reset prediction history to the standard historical benchmark dataset (20 verified matches)?')) return;
    setRecords(DEFAULT_PREDICTION_HISTORY);
    savePredictionHistoryToStorage(DEFAULT_PREDICTION_HISTORY);

    try {
      await fetch('/api/predictions/history/reset', { method: 'POST' });
    } catch {}
  };

  // Export records to CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'League', 'Match', 'Market', 'Selection', 'Odds', 'Probability', 'Score', 'Status', 'Stake', 'Profit', 'Notes'];
    const rows = filteredRecords.map((r) => [
      r.date,
      `"${r.leagueName}"`,
      `"${r.matchName}"`,
      `"${r.marketLabel}"`,
      `"${r.selection}"`,
      r.closingOdds,
      `${r.predictedProbability}%`,
      r.actualScore || 'Pending',
      r.status,
      r.stakeUnits,
      r.profitUnits,
      `"${(r.analysisNote || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SoccerMatrix_Prediction_History_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Prediction Win/Loss History Ledger
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 rounded-full">
              Audit Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Real-time tracking of historical predictions, model accuracy, settled outcomes, and cumulative profit across all 1X2, Over/Under, and BTTS algorithmic picks.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Prediction</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5"
            title="Download CSV report"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleResetBenchmark}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition flex items-center gap-1"
            title="Reset to default benchmark dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Performance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Strike Rate */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Model Strike Rate</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {summary.strikeRate}%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{summary.wonCount} Won</span>
            <span>•</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">{summary.lostCount} Lost</span>
            {summary.voidCount > 0 && <span>• {summary.voidCount} Void</span>}
          </div>
        </div>

        {/* Card 2: Net Profit */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Net Profit (Units)</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-black mt-1 ${summary.netProfitUnits >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {summary.netProfitUnits >= 0 ? `+${summary.netProfitUnits}` : summary.netProfitUnits}u
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
            Staked: {summary.totalUnitsStaked}u
          </span>
        </div>

        {/* Card 3: Overall ROI */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Yield / ROI</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className={`text-2xl font-black mt-1 ${summary.roiPercentage >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600'}`}>
            {summary.roiPercentage >= 0 ? `+${summary.roiPercentage}%` : `${summary.roiPercentage}%`}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Across {summary.settledPredictions} settled bets
          </span>
        </div>

        {/* Card 4: Streak */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Streaks</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1.5">
            <span>{summary.currentStreak.count} {summary.currentStreak.type === 'W' ? 'Wins' : 'Losses'}</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 text-[10px] font-bold">
              Current
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Best streak: <span className="font-bold text-slate-700 dark:text-slate-300">{summary.longestWinStreak} Wins</span>
          </span>
        </div>

        {/* Card 5: Average Odds */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Avg Closing Odds</span>
            <BarChart3 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {summary.averageOdds}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Decisive EV: +7.2% edge
          </span>
        </div>
      </div>

      {/* Visual Charts: P&L Curve & Market Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cumulative Profit Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Cumulative Profit & Loss Progression
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unit growth curve across settled match days (Base: 1.0u per flat stake)
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-extrabold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              +{summary.netProfitUnits} Units Total
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary.timelineTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748b" unit="u" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                  formatter={(val: any) => [`${val} Units`, 'Cumulative Profit']}
                  labelFormatter={(label) => `Settled Date: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="cumulativeProfit"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#profitGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strike Rate by Market */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  Accuracy by Betting Market
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Strike rate across main football markets
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-2">
              {summary.marketBreakdown.map((mb) => (
                <div key={mb.marketType} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                      {mb.marketLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {mb.won}/{mb.total}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 min-w-[36px] text-right font-mono">
                        {mb.strikeRate}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{ width: `${mb.strikeRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Highest Precision: <strong>Over/Under 2.5</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">+18.4u Overall</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Outcome Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setOutcomeFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition shrink-0 ${
                outcomeFilter === 'ALL'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              All Records ({records.length})
            </button>
            <button
              onClick={() => setOutcomeFilter('WON')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                outcomeFilter === 'WON'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Won ({summary.wonCount})</span>
            </button>
            <button
              onClick={() => setOutcomeFilter('LOST')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                outcomeFilter === 'LOST'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                  : 'bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Lost ({summary.lostCount})</span>
            </button>
            {summary.pendingCount > 0 && (
              <button
                onClick={() => setOutcomeFilter('PENDING')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  outcomeFilter === 'PENDING'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pending ({summary.pendingCount})</span>
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team or match..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px]">Filters:</span>
          </div>

          {/* League selector */}
          <select
            value={leagueFilter}
            onChange={(e) => setLeagueFilter(e.target.value)}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
          >
            <option value="ALL">All Leagues</option>
            <option value="epl">Premier League</option>
            <option value="laliga">La Liga</option>
            <option value="bundesliga">Bundesliga</option>
            <option value="seriea">Serie A</option>
            <option value="ligue1">Ligue 1</option>
          </select>

          {/* Market selector */}
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value as any)}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
          >
            <option value="ALL">All Markets</option>
            <option value="1X2">1X2 Match Winner</option>
            <option value="OVER_UNDER_2_5">Over / Under 2.5</option>
            <option value="BTTS">Both Teams to Score (GG)</option>
            <option value="DOUBLE_CHANCE">Double Chance (1X/2X)</option>
            <option value="VALUE_PLAY">Algorithm Value Picks</option>
          </select>

          {/* Sort selector */}
          <div className="ml-auto flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="profit-desc">Highest Profit</option>
              <option value="odds-desc">Highest Odds</option>
            </select>
          </div>
        </div>
      </div>

      {/* Predictions Log Cards List */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No predictions match current filters</p>
            <p className="text-xs text-slate-400 mt-1">Try broadening your search term or clearing the active filters.</p>
            <button
              onClick={() => {
                setOutcomeFilter('ALL');
                setMarketFilter('ALL');
                setLeagueFilter('ALL');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isExpanded = expandedRecordIds.has(record.id);
            const isWon = record.status === 'WON';
            const isLost = record.status === 'LOST';
            const isPending = record.status === 'PENDING';

            return (
              <div
                key={record.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden ${
                  isWon 
                    ? 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/50' 
                    : isLost 
                    ? 'border-slate-200 dark:border-slate-800 hover:border-rose-500/50'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Match & Teams */}
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className="text-2xl shrink-0 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {record.homeTeamLogo || '⚽'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {record.leagueName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {record.date}
                        </span>
                        {record.isModelPick && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                            AI Pick
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight truncate">
                        {record.matchName}
                      </h4>

                      {/* Actual Score Badge */}
                      <div className="mt-1.5 flex items-center gap-2">
                        {record.actualScore ? (
                          <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white dark:bg-slate-800 text-xs font-black tracking-wide font-mono shadow-xs">
                            FT {record.actualScore}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                            Pending Kickoff
                          </span>
                        )}

                        <span className="text-xs text-slate-400">
                          Stake: {record.stakeUnits}u
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Market & Selection */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 min-w-[240px]">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                      <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400">
                        {record.marketLabel}
                      </span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {record.predictedProbability}% Conf
                      </span>
                    </div>

                    <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center justify-between gap-2">
                      <span className="truncate">{record.selection}</span>
                      <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold border border-slate-200 dark:border-slate-700 shrink-0">
                        @{record.closingOdds.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>Model Fair: @{record.fairOdds.toFixed(2)}</span>
                      <span className="font-semibold text-slate-500">EV: +{((record.closingOdds - record.fairOdds) * 10).toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Right Column: Status & Profit / Loss */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        {isWon && (
                          <div className="px-3 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 text-xs font-black">
                            <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                            <span>WON</span>
                          </div>
                        )}
                        {isLost && (
                          <div className="px-3 py-1 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1 text-xs font-black">
                            <XCircle className="w-3.5 h-3.5 stroke-[3]" />
                            <span>LOST</span>
                          </div>
                        )}
                        {isPending && (
                          <div className="px-3 py-1 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1 text-xs font-black">
                            <Clock className="w-3.5 h-3.5" />
                            <span>PENDING</span>
                          </div>
                        )}
                        {record.status === 'VOID' && (
                          <div className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1 text-xs font-black">
                            <MinusCircle className="w-3.5 h-3.5" />
                            <span>VOID</span>
                          </div>
                        )}
                      </div>

                      <div className="text-sm font-black font-mono mt-1">
                        {isWon && (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            +{record.profitUnits.toFixed(2)}u
                          </span>
                        )}
                        {isLost && (
                          <span className="text-rose-600 dark:text-rose-400">
                            {record.profitUnits.toFixed(2)}u
                          </span>
                        )}
                        {isPending && (
                          <span className="text-slate-400 text-xs">
                            Potential: +{((record.closingOdds - 1) * record.stakeUnits).toFixed(2)}u
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions & Expansion */}
                    <div className="flex items-center gap-1">
                      {isPending && (
                        <button
                          onClick={() => {
                            setSettlingRecord(record);
                            setSettleHomeGoals('2');
                            setSettleAwayGoals('1');
                            setSettleNote('');
                          }}
                          className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1"
                          title="Settle match result"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Settle</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleExpand(record.id)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                        title="View post-match analysis note"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Tactical Reflection / Post-Match Note */}
                {isExpanded && (
                  <div className="px-5 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
                    <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                          Post-Match Tactical Review & Model Reflection:
                        </span>
                        <p className="leading-relaxed">
                          {record.analysisNote || 'Dixon-Coles bivariate Poisson calibrated against recent 10-match home and away rolling form differentials.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: LOG NEW PREDICTION */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Log New Match Prediction
                </h3>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="p-5 space-y-4 text-xs">
              {/* Optional: Pre-select from Upcoming Fixtures */}
              {fixtures.length > 0 && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select from Current Week's Fixtures (Optional Auto-Fill)
                  </label>
                  <select
                    value={formSelectedFixtureId}
                    onChange={(e) => handleFixtureSelect(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">-- Custom Match Entry --</option>
                    {fixtures.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.homeTeam.name} vs {f.awayTeam.name} ({f.leagueId.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Match Name */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Match Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Manchester City vs Arsenal FC"
                  value={formMatchName}
                  onChange={(e) => setFormMatchName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* League & Market Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    League
                  </label>
                  <select
                    value={formLeagueId}
                    onChange={(e) => setFormLeagueId(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="epl">Premier League</option>
                    <option value="laliga">La Liga</option>
                    <option value="bundesliga">Bundesliga</option>
                    <option value="seriea">Serie A</option>
                    <option value="ligue1">Ligue 1</option>
                    <option value="eredivisie">Eredivisie</option>
                    <option value="ligaportugal">Liga Portugal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Market Type
                  </label>
                  <select
                    value={formMarketType}
                    onChange={(e) => setFormMarketType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="1X2">1X2 Match Winner</option>
                    <option value="OVER_UNDER_2_5">Over/Under 2.5 Goals</option>
                    <option value="BTTS">Both Teams to Score (GG)</option>
                    <option value="DOUBLE_CHANCE">Double Chance (1X/2X)</option>
                    <option value="VALUE_PLAY">Algorithm Value Play</option>
                  </select>
                </div>
              </div>

              {/* Selection */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Selected Prediction / Pick *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Manchester City Win, Over 2.5 Goals, or Yes (BTTS)"
                  value={formSelection}
                  onChange={(e) => setFormSelection(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Odds, Probability & Stake */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Closing Odds
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formClosingOdds}
                    onChange={(e) => setFormClosingOdds(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Win Prob (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={formProbability}
                    onChange={(e) => setFormProbability(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Stake Units
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formStakeUnits}
                    onChange={(e) => setFormStakeUnits(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Optional Actual Score (Leave blank if pending) */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 block text-[11px]">
                  Actual Score (Leave blank if match is upcoming/pending)
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    placeholder="Home Goals"
                    value={formHomeGoals}
                    onChange={(e) => setFormHomeGoals(e.target.value)}
                    className="w-1/2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none"
                  />
                  <span className="font-bold text-slate-400">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Away Goals"
                    value={formAwayGoals}
                    onChange={(e) => setFormAwayGoals(e.target.value)}
                    className="w-1/2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Analysis Note */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tactical Reflection / Analytical Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Poisson model signaled high xG dominance in transition..."
                  value={formAnalysisNote}
                  onChange={(e) => setFormAnalysisNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  Save to Prediction Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SETTLE PENDING MATCH */}
      {settlingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Settle Prediction Result
                </h3>
              </div>
              <button
                onClick={() => setSettlingRecord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSettleRecord} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {settlingRecord.matchName}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span>Pick: <strong>{settlingRecord.selection}</strong></span>
                  <span className="font-mono">@{settlingRecord.closingOdds}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Enter Final Score (FT) *
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-400 block mb-1">{settlingRecord.homeTeam} Goals</span>
                    <input
                      type="number"
                      min="0"
                      required
                      value={settleHomeGoals}
                      onChange={(e) => setSettleHomeGoals(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center font-black text-base text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <span className="font-bold text-slate-400 text-lg mt-4">-</span>
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-400 block mb-1">{settlingRecord.awayTeam} Goals</span>
                    <input
                      type="number"
                      min="0"
                      required
                      value={settleAwayGoals}
                      onChange={(e) => setSettleAwayGoals(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center font-black text-base text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Post-Match Review Note (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Arsenal maintained high line and scored from counter-pressing..."
                  value={settleNote}
                  onChange={(e) => setSettleNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSettlingRecord(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  Calculate & Settle Outcome
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
