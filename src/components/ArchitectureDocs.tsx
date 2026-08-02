import React, { useState, useEffect } from 'react';
import { SystemJobLog } from '../types';
import { Activity, Server, Database, Code, ShieldCheck, Terminal, Play, CheckCircle2, Layers } from 'lucide-react';

export const ArchitectureDocs: React.FC = () => {
  const [jobLogs, setJobLogs] = useState<SystemJobLog[]>([]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/jobs/status')
      .then((res) => res.json())
      .then((data) => setJobLogs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleTestEndpoint = (endpoint: string) => {
    setTestingEndpoint(endpoint);
    setApiResponse(null);

    fetch(endpoint, { method: endpoint.includes('analyze') ? 'POST' : 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setApiResponse(JSON.stringify(data, null, 2));
        setTestingEndpoint(null);
      })
      .catch((err) => {
        setApiResponse(JSON.stringify({ error: err.message }, null, 2));
        setTestingEndpoint(null);
      });
  };

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white rounded-2xl shadow-sm space-y-3 border border-emerald-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 border border-emerald-500/30">
            <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">System Architecture & Technical Reference</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Production-Grade Infrastructure, REST API, Database ER, & CI/CD Pipelines</p>
          </div>
        </div>
      </div>

      {/* System Architecture Diagram Component */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>Platform System Architecture Flow</span>
        </h3>

        <div className="p-6 bg-slate-900 rounded-xl text-white font-mono text-xs overflow-x-auto border border-slate-800">
          <div className="min-w-[680px] space-y-4 text-slate-300">
            <div className="flex items-center justify-between gap-4">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center flex-1">
                <span className="text-emerald-400 font-bold block mb-1">1. Data Provider</span>
                <span className="text-[11px] text-slate-400">Fixtures, H2H, xG API Ingestion</span>
              </div>
              <span className="text-slate-500">➔</span>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center flex-1">
                <span className="text-blue-400 font-bold block mb-1">2. Celery + Redis Jobs</span>
                <span className="text-[11px] text-slate-400">Scheduled Data Refresh & Normalization</span>
              </div>
              <span className="text-slate-500">➔</span>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center flex-1">
                <span className="text-purple-400 font-bold block mb-1">3. Postgres Storage</span>
                <span className="text-[11px] text-slate-400">Historical Fixtures & Team Stats</span>
              </div>
            </div>

            <div className="text-center text-slate-500 py-1">⬇</div>

            <div className="flex items-center justify-between gap-4">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center flex-1">
                <span className="text-amber-400 font-bold block mb-1">4. Dixon-Coles ML Model</span>
                <span className="text-[11px] text-slate-400">Poisson & Monte Carlo Probability Engine</span>
              </div>
              <span className="text-slate-500">➔</span>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center flex-1">
                <span className="text-teal-400 font-bold block mb-1">5. Gemini 3.6 Flash Server</span>
                <span className="text-[11px] text-slate-400">Tactical AI Match Report Generation</span>
              </div>
              <span className="text-slate-500">➔</span>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center flex-1">
                <span className="text-emerald-400 font-bold block mb-1">6. React + Tailwind SPA</span>
                <span className="text-[11px] text-slate-400">Live Interactive Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive REST API Explorer */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-600" />
          <span>Interactive REST API Explorer</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {[
              { path: '/api/health', method: 'GET', desc: 'System health & Gemini configuration status' },
              { path: '/api/leagues', method: 'GET', desc: 'Retrieve Top 5 leagues list' },
              { path: '/api/fixtures?leagueId=epl&weekend=1', method: 'GET', desc: 'Retrieve filtered fixtures & ML probabilities' },
              { path: '/api/compare?team1=ars&team2=rma', method: 'GET', desc: 'Simulate cross-league team comparison' },
              { path: '/api/analyze/fix_epl_w1_1', method: 'POST', desc: 'Trigger Gemini server-side AI match report' },
              { path: '/api/model/metrics', method: 'GET', desc: 'Retrieve ML model backtesting & calibration metrics' }
            ].map((endpoint, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${endpoint.method === 'GET' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'}`}>
                      {endpoint.method}
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{endpoint.path}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{endpoint.desc}</p>
                </div>

                <button
                  onClick={() => handleTestEndpoint(endpoint.path)}
                  disabled={testingEndpoint === endpoint.path}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center gap-1 shrink-0"
                >
                  <Play className="w-3 h-3" />
                  <span>Try</span>
                </button>
              </div>
            ))}
          </div>

          {/* Response Inspector */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs flex flex-col h-80 overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1">
              API Response Inspector Output
            </span>
            <div className="flex-1 overflow-y-auto">
              {apiResponse ? (
                <pre className="text-[11px] text-emerald-400 whitespace-pre-wrap">{apiResponse}</pre>
              ) : (
                <span className="text-slate-600 italic">Click "Try" on any endpoint to execute a live REST query.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Ingestion Pipeline Status */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Scheduled Celery & Redis Background Job Monitors</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Job Name</th>
                <th className="p-3">Last Run</th>
                <th className="p-3">Status</th>
                <th className="p-3">Records Processed</th>
                <th className="p-3">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {jobLogs.map((j) => (
                <tr key={j.jobId}>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{j.name}</td>
                  <td className="p-3 text-slate-500">{j.lastRun}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                      {j.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold">{j.recordsProcessed}</td>
                  <td className="p-3 text-slate-500">{j.executionTimeMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment & Docker Configuration Documentation */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-600" />
          <span>Docker Compose & CI/CD Deployment Blueprint</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 overflow-x-auto">
            <span className="text-emerald-400 font-bold block mb-2"># docker-compose.yml</span>
            <pre className="text-[11px] leading-relaxed text-slate-300">{`version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    depends_on:
      - redis
      - db
  redis:
    image: redis:7-alpine
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: soccermatrix
      POSTGRES_PASSWORD: secretpassword`}</pre>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 overflow-x-auto">
            <span className="text-blue-400 font-bold block mb-2"># .github/workflows/deploy.yml</span>
            <pre className="text-[11px] leading-relaxed text-slate-300">{`name: SoccerMatrix AI CI/CD
on:
  push:
    branches: [ main ]
jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install & Run Tests
        run: |
          npm ci
          npm run lint
          npm run build
      - name: Deploy to Cloud Run
        run: gcloud run deploy soccermatrix-ai`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
