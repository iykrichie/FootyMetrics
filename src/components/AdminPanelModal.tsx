import React, { useState, useEffect } from 'react';
import { AdBannerSlot, CacheOptimizationStats, SiteAdminSettings } from '../types';
import {
  Shield,
  X,
  Lock,
  DollarSign,
  Activity,
  Zap,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Trash2,
  Eye,
  MousePointer,
  AlertTriangle,
  Cpu,
  Save,
  Radio,
  ExternalLink,
  Bot
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsUpdated?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose, onSettingsUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [passkeyError, setPasskeyError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'ads' | 'cache' | 'system' | 'reports'>('ads');

  const [settings, setSettings] = useState<SiteAdminSettings | null>(null);
  const [stats, setStats] = useState<CacheOptimizationStats | null>(null);
  const [cachedReports, setCachedReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Fetch Admin Data
  const fetchAdminData = () => {
    setIsLoading(true);
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
        if (data.stats) setStats(data.stats);
        if (data.cachedReports) setCachedReports(data.cachedReports);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load admin settings:', err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchAdminData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Passkey Verification
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'admin123' || passkeyInput.trim().toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setPasskeyError('');
    } else {
      setPasskeyError('Invalid passkey. Default owner key: admin123');
    }
  };

  const handleQuickDemoUnlock = () => {
    setIsAuthenticated(true);
    setPasskeyError('');
  };

  // Save Settings
  const handleSaveSettings = () => {
    if (!settings) return;
    setIsLoading(true);
    fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setSaveSuccessMsg('Site owner configuration saved successfully!');
        setTimeout(() => setSaveSuccessMsg(''), 3000);
        if (onSettingsUpdated) onSettingsUpdated();
      })
      .catch((err) => {
        console.error('Failed to save settings:', err);
        setIsLoading(false);
      });
  };

  // Cache Clear Handlers
  const handleClearCache = (target: 'all' | 'ai' | 'fixtures') => {
    fetch('/api/admin/clear-cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target })
    })
      .then((res) => res.json())
      .then(() => {
        fetchAdminData();
        setSaveSuccessMsg(`Cache cleared: ${target.toUpperCase()}`);
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      });
  };

  // Manual Live Sync
  const handleManualSync = () => {
    setIsLoading(true);
    fetch('/api/fixtures/sync-live', { method: 'POST' })
      .then((res) => res.json())
      .then(() => {
        fetchAdminData();
        setIsLoading(false);
        setSaveSuccessMsg('Live match data synced with remote feeds!');
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl text-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
              <Shield className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-white tracking-tight">
                  Site Owner Control Center & Revenue Portal
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                  ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage vertical ad slots, optimize Gemini API cost reduction, and control cache persistence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Authentication Required</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your site owner security key to access the monetization & API management dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Passkey (Default: admin123)"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center text-sm focus:outline-none focus:border-amber-500"
                />
                {passkeyError && <p className="text-xs text-rose-400 font-semibold mt-2">{passkeyError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition shadow-lg shadow-amber-500/20"
              >
                Unlock Site Owner Dashboard
              </button>
            </form>

            <div className="pt-2 border-t border-slate-800/80 w-full">
              <button
                onClick={handleQuickDemoUnlock}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold flex items-center justify-center gap-1 mx-auto"
              >
                <Zap className="w-3.5 h-3.5" /> Instant Demo Access as Site Owner
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Save Notification */}
            {saveSuccessMsg && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{saveSuccessMsg}</span>
                </div>
              </div>
            )}

            {/* Quick Metrics Bar */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Cost Saved
                    </span>
                    <span className="text-xl font-black text-emerald-400">
                      ${stats.totalCostSavedUsd.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      AI Cache Hit Rate
                    </span>
                    <span className="text-xl font-black text-amber-400">
                      {stats.geminiHits + stats.geminiMisses > 0
                        ? `${Math.round((stats.geminiHits / (stats.geminiHits + stats.geminiMisses)) * 100)}%`
                        : '100%'}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Gemini Calls Saved
                    </span>
                    <span className="text-xl font-black text-teal-400">
                      {stats.geminiHits} calls
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Cached Reports
                    </span>
                    <span className="text-xl font-black text-blue-400">
                      {stats.cachedAiReportsCount} matches
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                </div>
              </div>
            )}

            {/* Admin Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('ads')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'ads'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <DollarSign className="w-4 h-4" /> Vertical Ad Manager (Revenue)
              </button>

              <button
                onClick={() => setActiveTab('cache')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'cache'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Zap className="w-4 h-4" /> API & AI Cost Optimization
              </button>

              <button
                onClick={() => setActiveTab('system')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'system'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Sliders className="w-4 h-4" /> Site Features & Flags
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'reports'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Activity className="w-4 h-4" /> Cached Predictions Registry
              </button>
            </div>

            {/* TAB 1: VERTICAL AD MANAGER */}
            {activeTab === 'ads' && settings && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-amber-500/30">
                  <h3 className="text-sm font-extrabold text-amber-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Side Vertical Ad Revenue Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Configure vertical skyscraper ads shown on the left & right sides of the main body section under the header. Edit banner text, destination links, and toggle revenue slots.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT AD CONFIG */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                        <h4 className="font-bold text-sm text-white">Left Vertical Banner Slot</h4>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.leftAd.enabled}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              leftAd: { ...settings.leftAd, enabled: e.target.checked }
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Sponsor Brand Name</label>
                        <input
                          type="text"
                          value={settings.leftAd.sponsorName}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              leftAd: { ...settings.leftAd, sponsorName: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Offer Tag / Badge</label>
                        <input
                          type="text"
                          value={settings.leftAd.badge}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              leftAd: { ...settings.leftAd, badge: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Headline Title</label>
                        <input
                          type="text"
                          value={settings.leftAd.title}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              leftAd: { ...settings.leftAd, title: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Subtitle Description</label>
                        <textarea
                          rows={2}
                          value={settings.leftAd.subtitle}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              leftAd: { ...settings.leftAd, subtitle: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">CTA Button Text</label>
                        <input
                          type="text"
                          value={settings.leftAd.ctaText}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              leftAd: { ...settings.leftAd, ctaText: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Destination URL</label>
                        <input
                          type="text"
                          value={settings.leftAd.ctaUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              leftAd: { ...settings.leftAd, ctaUrl: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                        <span>Impressions: <strong className="text-white">{settings.leftAd.impressions}</strong></span>
                        <span>Clicks: <strong className="text-emerald-400">{settings.leftAd.clicks}</strong></span>
                        <span>CTR: <strong className="text-amber-400">
                          {settings.leftAd.impressions > 0
                            ? ((settings.leftAd.clicks / settings.leftAd.impressions) * 100).toFixed(1)
                            : '0.0'}%
                        </strong></span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT AD CONFIG */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-teal-500 inline-block animate-pulse"></span>
                        <h4 className="font-bold text-sm text-white">Right Vertical Banner Slot</h4>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.rightAd.enabled}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              rightAd: { ...settings.rightAd, enabled: e.target.checked }
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Sponsor Brand Name</label>
                        <input
                          type="text"
                          value={settings.rightAd.sponsorName}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              rightAd: { ...settings.rightAd, sponsorName: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Offer Tag / Badge</label>
                        <input
                          type="text"
                          value={settings.rightAd.badge}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              rightAd: { ...settings.rightAd, badge: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Headline Title</label>
                        <input
                          type="text"
                          value={settings.rightAd.title}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              rightAd: { ...settings.rightAd, title: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Subtitle Description</label>
                        <textarea
                          rows={2}
                          value={settings.rightAd.subtitle}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              rightAd: { ...settings.rightAd, subtitle: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">CTA Button Text</label>
                        <input
                          type="text"
                          value={settings.rightAd.ctaText}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              rightAd: { ...settings.rightAd, ctaText: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-400 block mb-1">Destination URL</label>
                        <input
                          type="text"
                          value={settings.rightAd.ctaUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              rightAd: { ...settings.rightAd, ctaUrl: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                        <span>Impressions: <strong className="text-white">{settings.rightAd.impressions}</strong></span>
                        <span>Clicks: <strong className="text-teal-400">{settings.rightAd.clicks}</strong></span>
                        <span>CTR: <strong className="text-amber-400">
                          {settings.rightAd.impressions > 0
                            ? ((settings.rightAd.clicks / settings.rightAd.impressions) * 100).toFixed(1)
                            : '0.0'}%
                        </strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Ad Configurations
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: API & AI COST OPTIMIZATION */}
            {activeTab === 'cache' && settings && stats && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-emerald-500/30">
                  <h3 className="text-sm font-extrabold text-emerald-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Gemini AI & Live Data Rate/Cost Optimization Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    To eliminate unnecessary Gemini model API costs and external data source quota limits, match predictions and synced fixture feeds are stored in high-performance server memory once generated.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cache Controls */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-400" /> Cache TTL & Sync Frequency
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-bold text-slate-300">Live Sync Cache TTL (Minutes)</label>
                          <span className="font-mono text-emerald-400 font-bold">{settings.cacheTtlMinutes} mins</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="120"
                          step="5"
                          value={settings.cacheTtlMinutes}
                          onChange={(e) =>
                            setSettings({ ...settings, cacheTtlMinutes: parseInt(e.target.value, 10) })
                          }
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Controls how long remote ESPN / Flashscore match scores are cached before triggering a new fetch.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="font-bold text-slate-200 block">Automatic Background Sync</span>
                            <span className="text-[11px] text-slate-400">Background polling interval for upcoming fixtures</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.autoSyncEnabled}
                            onChange={(e) => setSettings({ ...settings, autoSyncEnabled: e.target.checked })}
                            className="w-4 h-4 accent-emerald-500 rounded"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Cache Management Actions */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-rose-400" /> Cache Flush & Manual Sync
                    </h4>

                    <div className="space-y-2 text-xs">
                      <button
                        onClick={() => handleClearCache('ai')}
                        className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl transition text-left flex items-center justify-between"
                      >
                        <span>Clear Gemini AI Reports Cache ({stats.cachedAiReportsCount} saved)</span>
                        <Trash2 className="w-4 h-4 text-amber-400" />
                      </button>

                      <button
                        onClick={() => handleClearCache('fixtures')}
                        className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl transition text-left flex items-center justify-between"
                      >
                        <span>Clear Match Data Cache ({stats.cachedFixturesCount} fixtures)</span>
                        <Trash2 className="w-4 h-4 text-teal-400" />
                      </button>

                      <button
                        onClick={handleManualSync}
                        disabled={isLoading}
                        className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                      >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>Trigger Remote Live Sync Now</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Optimization Settings
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: SITE FEATURES & FLAGS */}
            {activeTab === 'system' && settings && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-amber-500/30">
                  <h3 className="text-sm font-extrabold text-amber-400 flex items-center gap-2">
                    <Sliders className="w-4 h-4" /> Global Site Feature Flags & Announcement Bar
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Control primary AI model preferences, site maintenance state, and live announcements.
                  </p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Primary Gemini AI Model Selection</label>
                      <select
                        value={settings.aiModelPreference}
                        onChange={(e) => setSettings({ ...settings, aiModelPreference: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                      >
                        <option value="gemini-3.6-flash">gemini-3.6-flash (Fast & Cost Optimized)</option>
                        <option value="gemini-3.5-pro">gemini-3.5-pro (High Depth Analytical)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Site Top Announcement Banner</label>
                      <input
                        type="text"
                        value={settings.announcementText}
                        onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                        placeholder="e.g. ⚡ Matchday 24 Analytics Feed is Live! 100% Verified xG Models Active."
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="font-bold text-rose-400 block">Maintenance Mode Banner</span>
                          <span className="text-[11px] text-slate-400">Display maintenance alert to non-admin visitors</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                          className="w-4 h-4 accent-rose-500 rounded"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Apply System Changes
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: CACHED AI MATCH PREDICTIONS REGISTRY */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-400" /> Active Cached AI Match Intelligence ({cachedReports.length})
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Zero Duplicate Gemini API Calls
                  </span>
                </div>

                {cachedReports.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400">No cached AI match reports generated yet in current session.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="py-3 px-4">Fixture ID</th>
                          <th className="py-3 px-4">Generated At</th>
                          <th className="py-3 px-4">Tactical Summary Snippet</th>
                          <th className="py-3 px-4 text-center">Upset Probability</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-sans">
                        {cachedReports.map((r, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/50 transition">
                            <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{r.fixtureId}</td>
                            <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{r.generatedAt}</td>
                            <td className="py-3 px-4 max-w-xs truncate text-slate-300">{r.tacticalSummary}</td>
                            <td className="py-3 px-4 text-center font-bold text-amber-400">
                              {r.upsetWatch?.upsetProbability || 0}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
