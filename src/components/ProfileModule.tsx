import React, { useState } from "react";
import { ExplanationMode, UserProfile } from "../types";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  SectionHeader, 
  PrecisionButton, 
  MarketIndicator 
} from "./ui/LuxuryPrimitives";
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
  Trash2,
  Check,
  Dna
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveName = () => {
    onUpdateProfile({ ...profile, name: userName });
    showNotification("Profile display name saved successfully.");
  };

  const handleConfirmFullReset = () => {
    onResetAllData();
    setShowResetModal(false);
    showNotification("All learning progress, virtual capital, and logs have been reset.");
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 dark:bg-[#11151A] text-white px-4 py-3 rounded-xl shadow-2xl border border-blue-500/40 font-mono text-xs flex items-center gap-2 animate-in slide-in-from-top">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <SectionHeader
        kicker="TRADER ACCREDITATION & IDENTITY"
        title="USER IDENTITY & CREDENTIALS"
        description="Personal investment profile, academic certifications, behavioral DNA telemetry, and data persistence controls."
      />

      {/* Profile Overview Card */}
      <LuxuryPanel elevated className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-display font-bold text-2xl shadow-sm border border-slate-700/50 dark:border-white">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                  {profile.name}
                </h2>
                <span className="px-2 py-0.5 text-xs font-mono font-medium rounded bg-blue-500/10 text-blue-600 dark:text-[#6F9BFF] border border-blue-500/20">
                  Level {profile.level} · {profile.levelTitle}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 mt-1">
                Virtual Balance: ₹{profile.paperBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })} · Streak: {profile.streak} Days
              </p>
            </div>
          </div>

          <PrecisionButton
            variant="danger"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => setShowResetModal(true)}
          >
            Reset Progress
          </PrecisionButton>
        </div>
      </LuxuryPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preference Settings */}
        <LuxuryPanel className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.05]">
            <Settings className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
              Identity & Pedagogy Settings
            </h3>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-slate-400 block mb-1 uppercase text-[10px]">Display Name</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <PrecisionButton variant="primary" size="sm" onClick={handleSaveName}>
                  Update
                </PrecisionButton>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 uppercase text-[10px]">Active Pedagogy Depth</label>
              <div className="grid grid-cols-3 gap-2">
                {(["ELI5", "Simple", "Professional"] as ExplanationMode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => onSetMode(m)}
                    className={`py-2 rounded-lg border text-center transition-all cursor-pointer ${
                      mode === m
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white"
                        : "bg-slate-50 dark:bg-[#080A0D] text-slate-600 dark:text-[#A5A8AE] border-slate-200 dark:border-white/[0.06]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </LuxuryPanel>

        {/* Certifications Card */}
        <LuxuryPanel className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.05]">
            <Award className="w-4 h-4 text-emerald-500 dark:text-[#6EE7B7]" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
              Verified Institutional Accreditations
            </h3>
          </div>

          <div className="space-y-2">
            {profile.certifications && profile.certifications.length > 0 ? (
              profile.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium text-slate-900 dark:text-white">{cert}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-[#6EE7B7]">ISSUED</span>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#080A0D] text-slate-400 text-xs font-mono text-center">
                Pass school graduation exams in Market University to earn verifiable accreditations.
              </div>
            )}
          </div>
        </LuxuryPanel>
      </div>

      {/* Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <LuxuryPanel elevated className="max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-600 dark:text-[#FF7B86]">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                Reset All Progress & Capital?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
              This action will reset your paper trading balance back to ₹10,00,000, clear trade history, reset lesson progress, and zero test scores. This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <PrecisionButton variant="secondary" size="sm" onClick={() => setShowResetModal(false)}>
                Cancel
              </PrecisionButton>
              <PrecisionButton variant="danger" size="sm" onClick={handleConfirmFullReset}>
                Confirm Full Reset
              </PrecisionButton>
            </div>
          </LuxuryPanel>
        </div>
      )}

    </div>
  );
};
