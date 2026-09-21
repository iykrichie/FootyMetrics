import React, { useState } from 'react';
import { X, Server, Terminal, BookOpen, Layers, Code, Play, Activity } from 'lucide-react';
import { ArchitectureDocs } from './ArchitectureDocs';

interface DocsModalProps {
  isOpen: boolean;
  initialTab?: 'architecture' | 'local' | 'deployment' | 'model';
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({
  isOpen,
  initialTab = 'architecture',
  onClose
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'architecture' | 'local' | 'deployment' | 'model'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                SoccerMatrix AI Documentation & Developer Reference
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Self-Hosting, Local Development (Windows/Mac/Linux), System Architecture & API
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Subtabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'architecture', label: 'System Architecture & API', icon: Server },
            { id: 'local', label: 'Local Setup (Windows / Mac / Linux)', icon: Terminal },
            { id: 'deployment', label: 'Docker & Self-Hosting', icon: Layers },
            { id: 'model', label: 'Dixon-Coles Model Math', icon: Code }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition flex items-center gap-2 ${
                  isActive
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Architecture & API */}
          {activeSubTab === 'architecture' && <ArchitectureDocs />}

          {/* TAB 2: Local Setup Guide */}
          {activeSubTab === 'local' && (
            <div className="space-y-6 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="p-4 bg-emerald-50 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">💻 Run Locally on a Laptop with Docker Desktop</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  The recommended and cleanest method to test SoccerMatrix AI on your laptop (macOS Intel/Apple Silicon, Windows WSL2, or Linux) is with Docker:
                </p>
              </div>

              {/* Docker One-Liner Box */}
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold block text-xs">🐳 1-Command Docker Compose Launch</span>
                <pre className="text-slate-300 whitespace-pre-wrap">{`git clone https://github.com/your-org/soccermatrix-ai.git
cd soccermatrix-ai
cp .env.example .env
docker compose up --build -d
docker compose logs -f`}</pre>
                <p className="text-[11px] text-slate-400 pt-1">
                  Access the app at <span className="text-emerald-400 font-mono">http://localhost:3000</span>.
                </p>
              </div>

              {/* Local Verification Tests */}
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-2">
                <span className="text-blue-400 font-bold block text-xs">🧪 Verify Local Docker Instance (Terminal Tests)</span>
                <pre className="text-slate-300 whitespace-pre-wrap">{`# Test 1: Check server health
curl -s http://localhost:3000/api/health

# Test 2: Check verified football data pipeline status (Top 7 leagues)
curl -s http://localhost:3000/api/fixtures/verification-status

# Test 3: Query active verified fixture slate
curl -s "http://localhost:3000/api/fixtures?weekend=3"`}</pre>
              </div>

              {/* Native OS Setup Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px]">
                {/* Windows Box */}
                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-blue-400 font-bold block text-xs">🪟 Native Windows (Node)</span>
                  <pre className="text-slate-300 whitespace-pre-wrap">{`npm install
Copy-Item .env.example .env
npm run dev`}</pre>
                </div>

                {/* macOS Box */}
                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block text-xs">🍎 Native macOS (Node)</span>
                  <pre className="text-slate-300 whitespace-pre-wrap">{`brew install node
npm install
cp .env.example .env
npm run dev`}</pre>
                </div>

                {/* Linux Box */}
                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-xs">🐧 Native Linux (Node)</span>
                  <pre className="text-slate-300 whitespace-pre-wrap">{`npm install
cp .env.example .env
npm run dev`}</pre>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Required Environment Variables (.env)</h4>
                <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg">
                  PORT=3000<br />
                  NODE_ENV=production<br />
                  GEMINI_API_KEY=your_gemini_api_key_here
                </div>
                <p className="text-[11px] text-slate-500">
                  Note: If <code>GEMINI_API_KEY</code> is omitted, match analysis seamlessly falls back to the deterministic bivariate Poisson statistical engine.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Self-Hosting & Deployment */}
          {activeSubTab === 'deployment' && (
            <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 bg-blue-50 dark:bg-slate-800/80 rounded-xl border border-blue-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">🐳 Production Self-Hosting & Docker Compose</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Deploy to any cloud server or local laptop using Docker Compose. The image includes multi-stage compilation and a non-root <code>node</code> user.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block text-xs">🐳 Docker Compose Commands</span>
                  <pre className="text-slate-300 whitespace-pre-wrap">{`# Launch container stack
docker compose up -d --build

# Inspect logs
docker compose logs -f soccermatrix

# Stop container
docker compose down`}</pre>
                </div>

                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-blue-400 font-bold block text-xs">🚀 PM2 Linux Service Setup</span>
                  <pre className="text-slate-300 whitespace-pre-wrap">{`npm ci
npm run build
sudo npm install -g pm2
pm2 start dist/server.cjs --name "soccermatrix-ai"
pm2 save`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Dixon-Coles Model Math */}
          {activeSubTab === 'model' && (
            <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 bg-purple-50 dark:bg-slate-800/80 rounded-xl border border-purple-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">🧮 Dixon-Coles Bivariate Poisson Mathematical Engine</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Our core algorithm models goal distributions for Home (H) and Away (A) teams using bivariate Poisson estimation adjusted with parameter tau_rho.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 font-mono text-[11px] space-y-3">
                <span className="text-emerald-400 font-bold block">1. Expected Goal Parameters</span>
                <p>{"\u03BB = \u03B1_Home \u00D7 \u03B2_Away \u00D7 \u03B3_HomeAdvantage"}</p>
                <p>{"\u03BC = \u03B1_Away \u00D7 \u03B2_Home"}</p>

                <span className="text-amber-400 font-bold block pt-2">2. Low-Score Correlation Adjustment \u03C4_\u03C1</span>
                <p>{"\u03C4_\u03C1(0,0) = 1 - \u03BB \u00D7 \u03BC \u00D7 \u03C1"}</p>
                <p>{"\u03C4_\u03C1(1,0) = 1 + \u03BC \u00D7 \u03C1  and  \u03C4_\u03C1(0,1) = 1 + \u03BB \u00D7 \u03C1"}</p>
                <p>{"\u03C4_\u03C1(1,1) = 1 - \u03C1"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold transition"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
