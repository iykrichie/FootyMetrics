import React, { useState } from 'react';
import { X, Crown, ShieldCheck, Sparkles, Check, Lock, User, Mail, Zap } from 'lucide-react';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRegisteredUser: boolean;
  userEmail: string | null;
  onRegisterSuccess: (email: string) => void;
  onLogout: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  isRegisteredUser,
  userEmail,
  onRegisterSuccess,
  onLogout
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onRegisterSuccess(email);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Crown className="w-6 h-6 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/60">
              VIP Membership Portal
            </span>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight text-white">
            {isRegisteredUser ? 'VIP Member Account' : 'Register for VIP Access'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {isRegisteredUser
              ? 'Your account is active with full access to Gemini 3.6 Explainable AI Reports & Deep Match Intelligence.'
              : 'Register your account to unlock full Explainable AI match analysis reports, tactical pitch zone breakdowns, and upset indicators.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {isRegisteredUser ? (
            <div className="space-y-6">
              {/* Active VIP Status Card */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                      Active Registered VIP
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {userEmail || 'vip@soccermatrix.ai'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits unlocked */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Unlocked VIP Benefits:
                </div>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Gemini 3.6 Flash Explainable AI Match Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Upset Watch Alerts & Probability Reasonings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Key Pitch Zone Player vs Player Tactical Breakdown</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition"
                >
                  Sign Out VIP Account
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-600 dark:text-rose-300 text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vip.user@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  VIP Access Passcode / Promo (Optional)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="e.g. VIP2026 or leave blank for Instant Register"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* VIP Benefits Box */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-[11px] text-amber-900 dark:text-amber-300 space-y-1">
                <div className="font-extrabold flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant VIP Registration Benefit</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-snug">
                  By registering, you immediately gain access to Explainable AI Match Reports, Gemini 3.6 Flash tactical insights, and Upset Watch indicators across all Top 5 European leagues.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registering Account...</span>
                ) : (
                  <>
                    <Crown className="w-4 h-4 fill-slate-950" />
                    <span>Complete VIP Registration & Unlock Reports</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
