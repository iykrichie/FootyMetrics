import React from 'react';
import { Activity, BookOpen, Code, Terminal, Server, ShieldCheck, Layers, Cpu, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenDocs: (tab?: 'architecture' | 'local' | 'deployment' | 'model') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                ⚽
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
                FootyMetrics <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">PRO ML</span>
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Enterprise Probabilistic Football Analytics Engine utilizing Dixon-Coles Poisson distributions, Monte Carlo simulations, and Google Gemini 3.6 Flash AI.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Production v2.4 Active
              </span>
            </div>
          </div>

          {/* Quick Technical Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase text-[10px] tracking-wider text-slate-900 dark:text-white">
              System Documentation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenDocs('architecture')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Server className="w-3.5 h-3.5 text-emerald-500" />
                  <span>System Architecture & REST API</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocs('local')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span>Local Setup Guide (Win/Mac/Linux)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocs('deployment')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Docker & Self-Hosting Blueprint</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocs('model')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Code className="w-3.5 h-3.5 text-purple-500" />
                  <span>Dixon-Coles Model Math Specs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Infrastructure Specs */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase text-[10px] tracking-wider text-slate-900 dark:text-white">
              Core Stack & Runtime
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Frontend:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">React 18 + Vite</span>
              </div>
              <div className="flex justify-between">
                <span>Backend API:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Express + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span>AI Engine:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Gemini 3.6 Flash</span>
              </div>
              <div className="flex justify-between">
                <span>Monte Carlo:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">10,000 Iterations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 FootyMetrics PRO ML • Top 5 European Football Intelligence Platform
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenDocs('architecture')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition"
            >
              System API Docs
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenDocs('local')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition"
            >
              Developer Setup
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
