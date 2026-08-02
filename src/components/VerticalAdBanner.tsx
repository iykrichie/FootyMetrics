import React from 'react';
import { AdBannerSlot } from '../types';
import { ExternalLink, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface VerticalAdBannerProps {
  leftSlot?: AdBannerSlot;
  rightSlot?: AdBannerSlot;
  onAdClick?: (position: 'left' | 'right') => void;
}

export const VerticalAdBanner: React.FC<VerticalAdBannerProps> = ({ leftSlot, rightSlot, onAdClick }) => {
  const activeSlots = [
    { slot: leftSlot, pos: 'left' as const },
    { slot: rightSlot, pos: 'right' as const }
  ].filter((item) => item.slot && item.slot.enabled);

  if (activeSlots.length === 0) return null;

  return (
    <aside className="w-56 xl:w-64 flex flex-col gap-4 hidden lg:flex shrink-0 select-none sticky top-20 self-start">
      {activeSlots.map(({ slot, pos }, idx) => {
        if (!slot) return null;
        return (
          <div
            key={idx}
            className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-950 border border-slate-800 dark:border-slate-800/80 rounded-2xl p-4 shadow-xl text-white font-sans overflow-hidden hover:border-emerald-500/40 transition-all duration-300 group"
          >
            {/* Top Glow & Badge */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400"></div>

            {/* Sponsor disclosure */}
            <div className="flex items-center justify-between mb-3 pt-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                SPONSORED AD
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Live
              </span>
            </div>

            {/* Offer Tag / Badge */}
            <div className="mb-3">
              <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black px-2.5 py-1 rounded-lg shadow-sm tracking-tight">
                {slot.badge || '🔥 SPECIAL OFFER'}
              </span>
            </div>

            {/* Sponsor Graphic / Visual Banner */}
            <div className="relative rounded-xl overflow-hidden bg-slate-800/90 mb-3 border border-slate-700/50 p-3 text-center">
              <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">
                {pos === 'left' ? '🎰' : '🏆'}
              </div>
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                {slot.sponsorName || 'Official Partner'}
              </p>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5 mb-4 text-left">
              <h4 className="font-extrabold text-sm text-white leading-tight group-hover:text-emerald-400 transition-colors">
                {slot.title}
              </h4>
              <p className="text-xs text-slate-300 leading-snug">
                {slot.subtitle}
              </p>
            </div>

            {/* Dynamic Feature Highlights */}
            <div className="space-y-1 mb-4 text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">100% Verified Partner</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">Instant Odds Boost Applied</span>
              </div>
            </div>

            {/* Action Button */}
            <a
              href={slot.ctaUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAdClick && onAdClick(pos)}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-emerald-900/40 flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{slot.ctaText || 'Claim Bonus Now'}</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            {/* Bottom Disclaimer */}
            <p className="text-[9px] text-slate-400 text-center mt-3">
              18+ T&Cs apply. Play responsibly.
            </p>
          </div>
        );
      })}
    </aside>
  );
};

