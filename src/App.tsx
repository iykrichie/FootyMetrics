import React, { useState, useEffect } from 'react';
import { Fixture, League, Team } from './types';
import { Header } from './components/Header';
import { MatchPredictionsSummary } from './components/MatchPredictionsSummary';
import { MatchAnalysisModal } from './components/MatchAnalysisModal';
import { LeagueStandingsTable } from './components/LeagueStandingsTable';
import { TeamComparisonView } from './components/TeamComparisonView';
import { AIReportsDigest } from './components/AIReportsDigest';
import { MLModelLab } from './components/MLModelLab';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { Footer } from './components/Footer';
import { DocsModal } from './components/DocsModal';
import { LEAGUES, TEAMS, getFixtures } from './data/mockDatabase';

export default function App() {
  const [leagues, setLeagues] = useState<League[]>(LEAGUES);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('all');
  const [selectedWeekend, setSelectedWeekend] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('fixtures');
  
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [teams, setTeams] = useState<Team[]>(Object.values(TEAMS));
  
  const [selectedFixtureForModal, setSelectedFixtureForModal] = useState<Fixture | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [isDocsModalOpen, setIsDocsModalOpen] = useState<boolean>(false);
  const [docsInitialTab, setDocsInitialTab] = useState<'architecture' | 'local' | 'deployment' | 'model'>('architecture');

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load Fixtures when league or weekend changes
  const loadFixtures = () => {
    let url = `/api/fixtures?weekend=${selectedWeekend}`;
    if (selectedLeagueId !== 'all') {
      url += `&leagueId=${selectedLeagueId}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data: Fixture[]) => setFixtures(data))
      .catch((err) => {
        console.warn('Backend API unavailable, using local analytical engine:', err);
        let all = getFixtures();
        if (selectedLeagueId !== 'all') {
          all = all.filter((f) => f.leagueId === selectedLeagueId);
        }
        if ([1, 2, 3].includes(selectedWeekend)) {
          all = all.filter((f) => f.weekendNumber === selectedWeekend);
        }
        setFixtures(all);
      });
  };

  useEffect(() => {
    loadFixtures();
  }, [selectedLeagueId, selectedWeekend]);

  // Trigger Data Refresh pipeline
  const handleRefreshData = () => {
    setIsRefreshing(true);
    fetch('/api/jobs/trigger-refresh', { method: 'POST' })
      .then((res) => res.json())
      .then(() => {
        loadFixtures();
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.error('Refresh error:', err);
        setIsRefreshing(false);
      });
  };

  const handleOpenDocsModal = (tab?: 'architecture' | 'local' | 'deployment' | 'model') => {
    setDocsInitialTab(tab || 'architecture');
    setIsDocsModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased`}>
      {/* Top Header Navigation */}
      <Header
        leagues={leagues}
        selectedLeagueId={selectedLeagueId}
        onSelectLeague={setSelectedLeagueId}
        selectedWeekend={selectedWeekend}
        onSelectWeekend={setSelectedWeekend}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* TAB 1: MATCH PREDICTIONS SUMMARY */}
        {activeTab === 'fixtures' && (
          <MatchPredictionsSummary
            fixtures={fixtures}
            selectedWeekend={selectedWeekend}
            selectedLeagueId={selectedLeagueId}
            onSelectLeague={setSelectedLeagueId}
            onOpenAnalysis={setSelectedFixtureForModal}
          />
        )}

        {/* TAB 2: LEAGUE STANDINGS & FORM */}
        {activeTab === 'standings' && (
          <LeagueStandingsTable
            leagues={leagues}
            selectedLeagueId={selectedLeagueId === 'all' ? 'epl' : selectedLeagueId}
            onSelectLeague={setSelectedLeagueId}
            teams={teams}
          />
        )}

        {/* TAB 3: TEAM COMPARISON */}
        {activeTab === 'compare' && (
          <TeamComparisonView teams={teams} />
        )}

        {/* TAB 4: AI MATCH REPORTS & DIGEST */}
        {activeTab === 'ai-reports' && (
          <AIReportsDigest onSelectFixture={setSelectedFixtureForModal} />
        )}

        {/* TAB 5: ML MODEL LAB & DIAGNOSTICS */}
        {activeTab === 'ml-lab' && (
          <MLModelLab />
        )}

        {/* TAB 6: SYSTEM ARCHITECTURE & API DOCS */}
        {activeTab === 'architecture' && (
          <ArchitectureDocs />
        )}
      </main>

      {/* Footer Navigation & Documentation Links */}
      <Footer onOpenDocs={handleOpenDocsModal} />

      {/* Deep Match Analysis Modal */}
      <MatchAnalysisModal
        fixture={selectedFixtureForModal}
        onClose={() => setSelectedFixtureForModal(null)}
      />

      {/* Full Documentation & Developer Setup Modal */}
      <DocsModal
        isOpen={isDocsModalOpen}
        initialTab={docsInitialTab}
        onClose={() => setIsDocsModalOpen(false)}
      />
    </div>
  );
}
