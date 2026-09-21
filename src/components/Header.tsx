import React, { useState } from 'react';
import { League } from '../types';
import {
  BarChart3,
  Bot,
  Cpu,
  Layers,
  RefreshCw,
  Sun,
  Moon,
  Trophy,
  Crown,
  CheckCircle2,
  Calendar,
  Zap,
  Globe2,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { getWeeklyForecastRanges } from '../utils/dateUtils';

interface HeaderProps {
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  selectedWeekend: number;
  onSelectWeekend: (weekend: number) => void;
  selectedHorizon?: string;
  onSelectHorizon?: (horizon: string) => void;
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
  selectedHorizon = 'all',
  onSelectHorizon,
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
  const [mobileHorizonOpen, setMobileHorizonOpen] = useState(false);
  const weeklyRanges = getWeeklyForecastRanges();
  const weeklyOptions = [
    weeklyRanges[1],
    weeklyRanges[2],
    weeklyRanges[3]
  ];

  const tabs = [
    { id: 'fixtures', label: 'Predictions Summary', icon: BarChart3 },
    { id: 'history', label: 'Win/Loss History', icon: CheckCircle2 },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'compare', label: 'Team Comparison', icon: Layers },
    { id: 'ai-reports', label: 'AI Intelligence', icon: Bot },
    { id: 'ml-lab', label: 'ML Model Lab', icon: Cpu }
  ];

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-30 transition-colors shadow-xs">
      <div className="max-w-[1750px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* ROW 1: PRIMARY APPLICATION BAR & MAIN VIEW NAVIGATION */}
        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Live Engine Status */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-sm font-bold text-lg sm:text-xl shrink-0">
              ⚽
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  SoccerMatrix
                </span>
                <span className="text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] sm:text-xs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800/80 rounded-full shrink-0">
                  AI ⚡
                </span>
                <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Poisson v2.4</span>
                </div>
                <div className="hidden xl:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800/80 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Verified Fixtures Only</span>
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Top 7 Leagues Predictive Football Analytics • Zero Fabricated Matches Policy
              </p>
            </div>
          </div>

          {/* Primary View Navigation Tabs (Center on desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shrink-0">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectTab(t.id)}
                  className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 rounded-lg min-h-[32px] ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 font-bold shadow-xs border border-slate-200/60 dark:border-slate-700/60'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Global Utility Actions: Sync Live, VIP Pass, Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Sync Data Button */}
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition shadow-2xs disabled:opacity-50 min-h-[34px]"
              title="Refresh match stats & re-run Poisson ML inference"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline text-xs">{isRefreshing ? 'Syncing...' : 'Sync Live'}</span>
            </button>

            {/* VIP Registration Button */}
            <button
              onClick={onOpenRegistration}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition shadow-2xs min-h-[34px] ${
                isRegisteredUser
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
              title={isRegisteredUser ? `VIP Member: ${userEmail || 'Active'}` : 'Register for VIP Match Reports'}
            >
              <Crown className={`w-3.5 h-3.5 ${isRegisteredUser ? 'fill-white' : 'fill-slate-950'}`} />
              <span className="text-xs">{isRegisteredUser ? 'VIP' : 'VIP Pass'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition shadow-2xs"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* MOBILE PRIMARY NAVIGATION TABS (Visible on small screens) */}
        <nav className="flex md:hidden items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth py-1.5 border-t border-slate-100 dark:border-slate-800/70">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTab(t.id)}
                className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 rounded-xl min-h-[32px] shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ROW 2: DEDICATED CONTEXT TOOLBAR (LEAGUES + FORECAST SLATE) */}
        <div className="py-2.5 border-t border-slate-100 dark:border-slate-800/70 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Section A: Clean Leagues Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0 mr-1 hidden sm:flex">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Leagues:</span>
            </div>

            <button
              onClick={() => onSelectLeague('all')}
              className={`px-3 py-1.5 min-h-[32px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                selectedLeagueId === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200/70 dark:hover:bg-slate-700/70'
              }`}
            >
              <span>All Leagues</span>
            </button>

            {leagues.map((league) => {
              const isSelected = selectedLeagueId === league.id;
              return (
                <button
                  key={league.id}
                  onClick={() => onSelectLeague(league.id)}
                  className={`px-3 py-1.5 min-h-[32px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200/70 dark:hover:bg-slate-700/70'
                  }`}
                >
                  <span>{league.flag}</span>
                  <span>{league.name}</span>
                </button>
              );
            })}
          </div>

          {/* Section B: Weekly Horizon Cycle & Slate Filters */}
          <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap shrink-0 pt-1 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/50">
            
            {/* Forecast Window Toggle */}
            <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700/70">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ml-1.5 mr-0.5 hidden xl:inline" />
              {weeklyOptions.map((item) => {
                const isSelected = selectedWeekend === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectWeekend(item.id);
                      if (onSelectHorizon && selectedHorizon !== 'all') {
                        onSelectHorizon('all');
                      }
                    }}
                    className={`px-2.5 py-1 min-h-[28px] rounded-lg transition-all text-xs flex items-center gap-1 whitespace-nowrap ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 font-medium'
                    }`}
                    title={item.subtitle}
                  >
                    <span>{item.shortLabel}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded font-black tracking-tight ${
                      isSelected ? 'bg-emerald-700/80 text-emerald-100' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      D0–D7
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Slate Day Quick Filters */}
            {onSelectHorizon && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onSelectHorizon('all')}
                  className={`px-2.5 py-1 min-h-[30px] rounded-lg text-xs font-semibold transition border ${
                    selectedHorizon === 'all'
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                  title="All matches Monday through Sunday (D0 to D7)"
                >
                  All (D0–D7)
                </button>

                <button
                  onClick={() => onSelectHorizon(selectedHorizon === 'monday' || selectedHorizon === 'd0' ? 'all' : 'monday')}
                  className={`px-2.5 py-1 min-h-[30px] rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
                    selectedHorizon === 'monday' || selectedHorizon === 'd0'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs ring-1 ring-amber-500/30'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300/80 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                  }`}
                  title="Filter Monday matches (D0)"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Mon (D0)</span>
                </button>

                <button
                  onClick={() => onSelectHorizon(selectedHorizon === 'sunday' || selectedHorizon === 'd7' || selectedHorizon === 'd7_exact' ? 'all' : 'sunday')}
                  className={`px-2.5 py-1 min-h-[30px] rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
                    selectedHorizon === 'sunday' || selectedHorizon === 'd7' || selectedHorizon === 'd7_exact'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-1 ring-indigo-500/30'
                      : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-300/80 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
                  }`}
                  title="Filter Sunday matches (D7)"
                >
                  <span>🎯 Sun (D7)</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
