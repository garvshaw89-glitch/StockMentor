import React, { useState } from "react";
import { ExplanationMode, UserProfile } from "../types";
import { 
  User, 
  Award, 
  Settings, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  BookOpen,
  AlertTriangle,
  X,
  RefreshCw,
  Trash2,
  Check
} from "lucide-react";

interface ProfileModuleProps {
  profile: UserProfile;
  mode: ExplanationMode;
  onUpdateProfile: (prof: UserProfile) => void;
  onSetMode: (m: ExplanationMode) => void;
  onResetAllData: () => void;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({
  profile,
  mode,
  onUpdateProfile,
  onSetMode,
  onResetAllData
}) => {
  const [userName, setUserName] = useState(profile.name);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccessToast, setResetSuccessToast] = useState(false);

  const handleSaveName = () => {
    onUpdateProfile({ ...profile, name: userName });
    alert("Profile name updated!");
  };

  const handleConfirmFullReset = () => {
    onResetAllData();
    setShowResetModal(false);
    setResetSuccessToast(true);
    setTimeout(() => setResetSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 relative">
      {/* Toast Notification */}
      {resetSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-black px-5 py-3 rounded-2xl shadow-2xl font-black text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>All learning progress, investments, and test scores have been reset to the beginning!</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-600/30">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {profile.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.experienceLevel || "Novice"} Investor • Level {profile.level} Mastery • Streak: {profile.streak} Days
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-extrabold rounded-2xl text-xs border border-rose-500/20 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Progress</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preference Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600" />
            <span>Learning Preferences</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Display Name:</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                />
                <button
                  onClick={handleSaveName}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Preferred Explanation Mode:</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {(["ELI5", "Simple", "Professional"] as ExplanationMode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => onSetMode(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      mode === m
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weak & Strong Topics Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <span>Personalized Diagnostics</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900">
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">Topics Recommended for Revision:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                {profile.weakTopics && profile.weakTopics.length > 0 ? (
                  profile.weakTopics.map((t, i) => <li key={i}>{t}</li>)
                ) : (
                  <li>Stock Market Basics & Order Types</li>
                )}
              </ul>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Mastered Topics:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                {profile.strongTopics && profile.strongTopics.length > 0 ? (
                  profile.strongTopics.map((t, i) => <li key={i}>{t}</li>)
                ) : (
                  <li>None yet — Complete lessons to unlock mastered topics!</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED RESET EVERYTHING CARD */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Reset Account & Start From Beginning</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Wipe all learning progress, school certifications, test scores, paper trading positions, and investment logs to restart fresh.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowResetModal(true)}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset All Things</span>
          </button>
        </div>
      </div>

      {/* FULL RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-rose-400 tracking-wider">
                  Danger Zone Action
                </span>
                <h3 className="text-lg font-black text-white">Reset All Progress & Investments?</h3>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="font-bold text-rose-300">This will permanently reset your profile state to the beginning:</p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li><strong className="text-white">Learning & Progression:</strong> Resets all completed lessons, school certifications, exam scores, and reverts mastery to <span className="text-emerald-400">Level 1 Novice</span>.</li>
                <li><strong className="text-white">Paper Portfolio:</strong> Clears all open paper positions, execution trades, and restores starting cash balance to <span className="text-emerald-400">₹10,00,000</span>.</li>
                <li><strong className="text-white">Diagnostics & Journal:</strong> Wipes trading journal entries, behavioral weakness logs, and strategy DNA history.</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmFullReset}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yes, Reset Everything</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety & Educational Legal Disclaimer Card */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800 space-y-2 text-xs leading-relaxed">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <ShieldAlert className="w-5 h-5" />
          <span>Educational Platform & Safety Disclaimer</span>
        </div>
        <p>
          StockMentor is exclusively an educational and learning simulation platform. All financial definitions, AI tutoring answers, paper trading balance, simulated stock research reports, news interpretations, and quiz evaluations are created for teaching investment reasoning logic and market fundamentals.
        </p>
        <p className="text-slate-400">
          Nothing contained within StockMentor constitutes personalized financial, tax, legal, or investment advice, or a recommendation to buy, hold, or sell any security. Always conduct independent research or consult a licensed financial advisor before making real capital decisions.
        </p>
      </div>
    </div>
  );
};

