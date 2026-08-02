import React from 'react';
import { ShieldCheck, ExternalLink, Shield } from 'lucide-react';

interface FooterProps {
  onOpenDocs?: (tab?: 'architecture' | 'local' | 'deployment' | 'model') => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                ⚽
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
                SoccerMatrix <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 rounded border border-emerald-200 dark:border-emerald-800/50">AI ⚡</span>
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-xl">
              Advanced Football Intelligence & Predictive Analytics Platform covering Top 5 European Leagues.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            <a
              href="https://vantageark.com.ng/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 rounded-xl transition shadow-sm"
            >
              <span>Build Something like this</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Live Match Intelligence Active
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 SoccerMatrix AI • All rights reserved. 18+ Play Responsibly.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="/admin_setup"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin_setup');
                if (onOpenAdmin) onOpenAdmin();
              }}
              className="text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 font-bold flex items-center gap-1 transition"
              title="Site Owner Admin Setup Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Owner Admin Setup</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
