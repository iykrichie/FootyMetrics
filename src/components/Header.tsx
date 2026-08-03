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
    <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-30 transition-colors shadow-sm">
      <div className="max-w-[1750px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Top Header Bar */}
        <div className="py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 border-b border-slate-100 dark:border-slate-800/80">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center justify-between lg:justify-start gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-bold text-xl shrink-0 ring-2 ring-emerald-500/20">
                ⚽
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 truncate">
                    <span>SoccerMatrix</span> 
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs sm:text-sm px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800/80 rounded-full shrink-0 shadow-2xs">
                      AI ⚡
                    </span>
                  </h1>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                  Advanced Football Intelligence & Deep AI Reasoning
                </p>
              </div>
            </div>

            {/* Mobile Dark Mode & VIP Quick Access */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              <button
                onClick={onOpenRegistration}
                className={`p-2 rounded-xl transition shadow-sm min-h-[36px] flex items-center gap-1 text-xs font-bold ${
                  isRegisteredUser
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-slate-950'
                }`}
                title={isRegisteredUser ? 'VIP Account Active' : 'VIP Access'}
              >
                <Crown className={`w-3.5 h-3.5 ${isRegisteredUser ? 'fill-white' : 'fill-slate-950'}`} />
                <span className="hidden sm:inline">{isRegisteredUser ? 'VIP' : 'VIP'}</span>
              </button>
              <button
                onClick={onToggleDarkMode}
                className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            </div>
          </div>

          {/* Action Bar: Refreshes, Weekend Selector, Dark Mode */}
          <div className="flex items-center justify-between sm:justify-end flex-wrap lg:flex-nowrap gap-2 sm:gap-3 w-full lg:w-auto">
            {/* Weekend Selector Chips with Forecast Horizon Subtext */}
            <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto no-scrollbar max-w-full">
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 px-2 uppercase tracking-wider hidden xl:inline">
                Forecast:
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap">
                {[
                  { id: 1, label: 'Wk (Aug 2–8)' },
                  { id: 2, label: 'Wk +1 (Aug 9–15)' },
                  { id: 3, label: 'Wk +2 (Aug 16–22)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectWeekend(item.id)}
                    className={`px-2.5 sm:px-3 py-1.5 min-h-[34px] rounded-lg transition-all text-xs ${
                      selectedWeekend === item.id
                        ? 'bg-emerald-600 text-white shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Ingestion Refresh Trigger */}
              <button
                onClick={onRefreshData}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-2xs disabled:opacity-50 min-h-[36px]"
                title="Refresh match stats & re-run Poisson ML inference"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-xs">{isRefreshing ? 'Ingesting...' : 'Sync Data'}</span>
              </button>

              {/* VIP Status / Registration Button (Desktop) */}
              <button
                onClick={onOpenRegistration}
                className={`hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition shadow-2xs min-h-[36px] ${
                  isRegisteredUser
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                }`}
                title={isRegisteredUser ? 'VIP Account Active' : 'Register for VIP Access & Explainable AI Reports'}
              >
                <Crown className={`w-3.5 h-3.5 ${isRegisteredUser ? 'fill-white' : 'fill-slate-950'}`} />
                <span>{isRegisteredUser ? 'VIP Active 👑' : 'VIP Access'}</span>
              </button>

              {/* Dark Mode Toggle (Desktop) */}
              <button
                onClick={onToggleDarkMode}
                className="hidden lg:flex p-2 min-h-[36px] min-w-[36px] items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-2xs"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* League Selector Filters & Primary Tab Navigation Grouped */}
        <div className="pt-2 pb-1 space-y-2">
          {/* League Selector Filters */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
            <button
              onClick={() => onSelectLeague('all')}
              className={`px-3 py-1.5 min-h-[34px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                selectedLeagueId === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                  : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200/80 dark:hover:bg-slate-700/80'
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
                  className={`px-3 py-1.5 min-h-[34px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-sm'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200/80 dark:hover:bg-slate-700/80'
                  }`}
                >
                  <span>{league.flag}</span>
                  <span>{league.name}</span>
                </button>
              );
            })}
          </div>

          {/* Primary Tab Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth border-t border-slate-100 dark:border-slate-800/60 pt-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectTab(t.id)}
                  className={`py-2 px-3 sm:px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 min-h-[40px] rounded-t-lg ${
                    isActive
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
