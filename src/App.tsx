import React, { useState, useEffect } from 'react';
import { Fixture, League, Team, SiteAdminSettings } from './types';
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
import { VerticalAdBanner } from './components/VerticalAdBanner';
import { AdminPanelModal } from './components/AdminPanelModal';
import { UserAuthModal } from './components/UserAuthModal';
import { LEAGUES, TEAMS, getFixtures } from './data/mockDatabase';
import { Megaphone, ExternalLink, ShieldAlert } from 'lucide-react';

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

  // User VIP Registration State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState<boolean>(() => {
    return localStorage.getItem('soccermatrix_vip_user') === 'true' || localStorage.getItem('footymetrics_vip_user') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('soccermatrix_vip_email') || localStorage.getItem('footymetrics_vip_email');
  });

  const handleRegisterSuccess = (email: string) => {
    setIsRegisteredUser(true);
    setUserEmail(email);
    localStorage.setItem('soccermatrix_vip_user', 'true');
    localStorage.setItem('soccermatrix_vip_email', email);
  };

  const handleLogout = () => {
    setIsRegisteredUser(false);
    setUserEmail(null);
    localStorage.removeItem('soccermatrix_vip_user');
    localStorage.removeItem('soccermatrix_vip_email');
    localStorage.removeItem('footymetrics_vip_user');
    localStorage.removeItem('footymetrics_vip_email');
  };

  // Admin & Ads State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminSettings, setAdminSettings] = useState<SiteAdminSettings | null>(null);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load Admin Settings
  const loadAdminSettings = () => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setAdminSettings(data.settings);
      })
      .catch((err) => console.warn('Could not fetch site settings:', err));
  };

  useEffect(() => {
    loadAdminSettings();
    if (window.location.pathname.includes('admin') || window.location.hash.includes('admin')) {
      setIsAdminOpen(true);
    }
  }, []);

  // Track Ad Clicks
  const handleAdClick = (position: 'left' | 'right' | 'mobile') => {
    fetch('/api/admin/ad-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ position })
    }).catch(() => {});
  };

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
      
      {/* Optional Top Announcement Bar */}
      {adminSettings?.announcementText && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs font-semibold py-2 px-4 text-center shadow-inner flex items-center justify-center gap-2">
          <Megaphone className="w-3.5 h-3.5 animate-bounce shrink-0" />
          <span>{adminSettings.announcementText}</span>
        </div>
      )}

      {/* Maintenance Mode Warning if active */}
      {adminSettings?.maintenanceMode && (
        <div className="bg-amber-500 text-slate-950 text-xs font-extrabold py-2 px-4 text-center flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>SYSTEM NOTICE: Site Owner Maintenance Mode Active. Some live API sync schedules are paused.</span>
        </div>
      )}

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
        onOpenAdmin={() => setIsAdminOpen(true)}
        isRegisteredUser={isRegisteredUser}
        userEmail={userEmail}
        onOpenRegistration={() => setIsAuthModalOpen(true)}
      />

      {/* Responsive Layout with Left Vertical Side Ads and Enlarged Table View */}
      <div className="flex-1 w-full max-w-[1750px] mx-auto px-2 sm:px-4 lg:px-6 py-6 flex items-start gap-4 xl:gap-6 justify-start">
        
        {/* Left Vertical Ad Column */}
        {adminSettings && (
          <VerticalAdBanner
            leftSlot={adminSettings.leftAd}
            rightSlot={adminSettings.rightAd}
            onAdClick={(pos) => handleAdClick(pos)}
          />
        )}

        {/* Enlarged Main Application Content & Table View */}
        <main className="flex-1 min-w-0 w-full">
          
          {/* Mobile Sponsor Banner if enabled */}
          {adminSettings?.mobileAd && adminSettings.mobileAd.enabled && (
            <div className="mb-4 lg:hidden bg-slate-900 border border-slate-800 rounded-2xl p-3 text-white flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl">⚡</span>
                <div className="truncate text-xs">
                  <span className="font-bold text-amber-400 block truncate">{adminSettings.mobileAd.title}</span>
                  <span className="text-[11px] text-slate-300 truncate block">{adminSettings.mobileAd.subtitle}</span>
                </div>
              </div>
              <a
                href={adminSettings.mobileAd.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAdClick('mobile')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl whitespace-nowrap flex items-center gap-1 shrink-0"
              >
                <span>{adminSettings.mobileAd.ctaText}</span>
                <ExternalLink className="w-3 h-3 stroke-[2.5]" />
              </a>
            </div>
          )}

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
            <AIReportsDigest
              onSelectFixture={setSelectedFixtureForModal}
              isRegisteredUser={isRegisteredUser}
              onOpenRegistration={() => setIsAuthModalOpen(true)}
            />
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
      </div>

      {/* Footer Navigation & Documentation Links */}
      <Footer onOpenDocs={handleOpenDocsModal} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Deep Match Analysis Modal */}
      <MatchAnalysisModal
        fixture={selectedFixtureForModal}
        onClose={() => setSelectedFixtureForModal(null)}
        isRegisteredUser={isRegisteredUser}
        onOpenRegistration={() => setIsAuthModalOpen(true)}
      />

      {/* User VIP Registration & Login Modal */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isRegisteredUser={isRegisteredUser}
        userEmail={userEmail}
        onRegisterSuccess={handleRegisterSuccess}
        onLogout={handleLogout}
      />

      {/* Full Documentation & Developer Setup Modal */}
      <DocsModal
        isOpen={isDocsModalOpen}
        initialTab={docsInitialTab}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* Site Owner Admin Control Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSettingsUpdated={loadAdminSettings}
      />
    </div>
  );
}
