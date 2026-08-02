import React from 'react';
import { League, LeagueId } from '../types';
import { Activity, BarChart3, Bot, ChevronRight, Cpu, Layers, RefreshCw, Shield, Sparkles, Sun, Moon, Trophy, Crown, Lock } from 'lucide-react';

interface HeaderProps {
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  selectedWeekend: number;
  onSelectWeekend: (weekend: number) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdmin?: () => void;
  isRegisteredUser?: boolean;
  userEmail?: string | null;
  onOpenRegistration?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  leagues,
  selectedLeagueId,
  onSelectLeague,
  selectedWeekend,
  onSelectWeekend,
  activeTab,
  onSelectTab,
  onRefreshData,
  isRefreshing,
  darkMode,
  onToggleDarkMode,
  onOpenAdmin,
  isRegisteredUser = false,
  userEmail,
  onOpenRegistration
}) => {
  const tabs = [
    { id: 'fixtures', label: 'Predictions Summary', icon: BarChart3 },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'compare', label: 'Team Comparison', icon: Layers },
    { id: 'ai-reports', label: 'AI Intelligence', icon: Bot },
    { id: 'ml-lab', label: 'ML Model Lab', icon: Cpu }
  ];

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-bold text-xl">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <span>SoccerMatrix</span> <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 rounded-full">AI ⚡</span>
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Advanced Football Intelligence Powered by Deep AI Reasoning & Predictive Analytics
              </p>
            </div>
          </div>

          {/* Action Bar: Refreshes, Weekend Selector, Dark Mode */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Weekend Selector Chips with Forecast Horizon Subtext */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 px-1.5 uppercase tracking-wider hidden sm:inline">
                Forecast:
              </span>
              <div className="inline-flex text-xs font-semibold">
                {[
                  { id: 1, label: 'Wk (Aug 2–8)' },
                  { id: 2, label: 'Wk +1 (Aug 9–15)' },
                  { id: 3, label: 'Wk +2 (Aug 16–22)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectWeekend(item.id)}
                    className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg transition-all ${
                      selectedWeekend === item.id
                        ? 'bg-emerald-600 text-white shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingestion Refresh Trigger */}
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm disabled:opacity-50 min-h-[36px]"
              title="Refresh match stats & re-run Poisson ML inference"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-xs">{isRefreshing ? 'Ingesting...' : 'Sync Data'}</span>
            </button>

            {/* VIP Status / Registration Button */}
            <button
              onClick={onOpenRegistration}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition shadow-sm min-h-[36px] ${
                isRegisteredUser
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
              title={isRegisteredUser ? 'VIP Account Active' : 'Register for VIP Access & Explainable AI Reports'}
            >
              <Crown className={`w-3.5 h-3.5 ${isRegisteredUser ? 'fill-white' : 'fill-slate-950'}`} />
              <span>{isRegisteredUser ? 'VIP Active 👑' : 'VIP Access'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* League Selector Filters */}
        <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth border-b border-slate-100 dark:border-slate-800/50">
          <button
            onClick={() => onSelectLeague('all')}
            className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedLeagueId === 'all'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 font-semibold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>🌐</span> All Top 5 Leagues
          </button>

          {leagues.map((league) => {
            const isSelected = selectedLeagueId === league.id;
            return (
              <button
                key={league.id}
                onClick={() => onSelectLeague(league.id)}
                className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{league.flag}</span>
                <span>{league.name}</span>
              </button>
            );
          })}
        </div>

        {/* Primary Tab Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pt-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTab(t.id)}
                className={`py-2.5 px-3 sm:px-4 text-xs font-medium whitespace-nowrap border-b-2 transition-all flex items-center gap-2 min-h-[44px] ${
                  isActive
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
