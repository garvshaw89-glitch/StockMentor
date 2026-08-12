import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  evaluatePerformanceStage, 
  PERFORMANCE_STEPS, 
  PerformanceEvaluationResult 
} from "../utils/performanceEngine";
import { 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Lock, 
  Unlock, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  ArrowUpRight, 
  Trophy, 
  GraduationCap, 
  Activity, 
  X,
  Target
} from "lucide-react";

interface PerformanceStageUpgradeCenterProps {
  profile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  passedSchoolIds?: number[];
  onNavigateTab?: (tab: string) => void;
}

export const PerformanceStageUpgradeCenter: React.FC<PerformanceStageUpgradeCenterProps> = ({
  profile,
  onUpdateProfile,
  passedSchoolIds = [1],
  onNavigateTab
}) => {
  const [showEvalModal, setShowEvalModal] = useState<boolean>(false);
  const [upgradedSuccess, setUpgradedSuccess] = useState<boolean>(false);

  const evalResult: PerformanceEvaluationResult = evaluatePerformanceStage(profile, passedSchoolIds);
  const { currentStep, nextStep, nextStepProgressPercent, requirements, canUpgradeNow, qualifiedStepNumber } = evalResult;

  // Handle manual or triggered stage upgrade
  const handleTriggerUpgrade = () => {
    setShowEvalModal(true);

    if (canUpgradeNow || qualifiedStepNumber > profile.level) {
      const newLevel = Math.min(6, Math.max(profile.level + 1, qualifiedStepNumber));
      const newStep = PERFORMANCE_STEPS.find(s => s.stepNumber === newLevel) || PERFORMANCE_STEPS[0];

      if (onUpdateProfile) {
        onUpdateProfile({
          ...profile,
          level: newLevel,
          levelTitle: newStep.title,
          score: Math.min(100, profile.score + 15)
        });
      }
      setUpgradedSuccess(true);
    } else {
      setUpgradedSuccess(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-6">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header & Current Step Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold border border-indigo-500/30 uppercase tracking-wider">
                Performance Stage Engine
              </span>
              {canUpgradeNow && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30 animate-pulse">
                  ⚡ Upgrade Ready!
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Active Stage: Step {currentStep.stepNumber} — {currentStep.name} ({currentStep.title})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
              {currentStep.description}
            </p>
          </div>
        </div>

        <button
          onClick={handleTriggerUpgrade}
          className={`px-5 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg shrink-0 ${
            canUpgradeNow
              ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:scale-[1.02] shadow-emerald-500/25 ring-2 ring-emerald-400"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
          }`}
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>{canUpgradeNow ? "Upgrade Stage Now!" : "Evaluate Performance & Step Upgrade"}</span>
        </button>
      </div>

      {/* Progress towards Next Step Upgrade */}
      {nextStep ? (
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Next Stage Goal: Step {nextStep.stepNumber} — {nextStep.name} ({nextStep.title})
              </span>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Complete performance criteria below to upgrade your stage status and unlock advanced tools.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-2xl font-black text-emerald-400">{nextStepProgressPercent}%</span>
              <span className="text-xs text-slate-400 font-semibold">Completed</span>
            </div>
          </div>

          {/* Overall Step Progress Bar */}
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full transition-all duration-500" 
              style={{ width: `${nextStepProgressPercent}%` }}
            />
          </div>

          {/* 4 Performance Criteria Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {requirements.map((req) => {
              const targetTab = req.id === "exams" || req.id === "topics" ? "learn" : req.id === "score" ? "test" : "learn";
              return (
                <div 
                  key={req.id}
                  className={`p-3.5 rounded-xl border transition-all relative group flex flex-col justify-between ${
                    req.isMet 
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200" 
                      : "bg-slate-900/60 border-slate-800 text-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                        {req.isMet ? "✓ Requirement Met" : "In Progress"}
                      </span>
                      {req.isMet ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Target className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-white line-clamp-1">{req.label}</p>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className={`text-base font-black ${req.isMet ? "text-emerald-400" : "text-amber-300"}`}>
                        {req.current} / {req.target} {req.unit}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {Math.min(100, Math.round((req.current / (req.target || 1)) * 100))}%
                      </span>
                    </div>
                  </div>

                  {!req.isMet && onNavigateTab && (
                    <button
                      onClick={() => onNavigateTab(targetTab)}
                      className="mt-3 w-full py-1.5 px-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <span>Boost Progress</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-center space-y-1">
          <p className="font-bold text-sm">🎉 Peak Performance Stage Achieved!</p>
          <p className="text-xs opacity-90">You have reached Step 6: Professional Portfolio Strategist. All elite institutional market suites are unlocked!</p>
        </div>
      )}

      {/* Unlocked Privileges Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Unlock className="w-3.5 h-3.5" />
            <span>Currently Unlocked Step {currentStep.stepNumber} Tools</span>
          </h4>
          <div className="flex flex-wrap gap-2 pt-1">
            {currentStep.unlockedTools.map((tool, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {nextStep && (
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Step {nextStep.stepNumber} Locked Privileges</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {nextStep.unlockedTools.map((tool, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold opacity-80">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EVALUATION & STAGE UPGRADE MODAL */}
      {showEvalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowEvalModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {upgradedSuccess || canUpgradeNow ? (
              /* UPGRADE SUCCESS DISPLAY */
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 ring-8 ring-emerald-500/10">
                  <Sparkles className="w-10 h-10 animate-bounce" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 uppercase tracking-wider">
                    🎉 Stage Upgrade Confirmed!
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    Advanced to Step {Math.min(6, profile.level)}: {currentStep.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Your performance metrics satisfy all step criteria. Your trader profile level has been promoted to <strong className="text-emerald-400">{profile.levelTitle || currentStep.title}</strong>!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2 text-left">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Newly Unlocked Features:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentStep.unlockedTools.map((t, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowEvalModal(false)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                >
                  Awesome! Continue Journey
                </button>
              </div>
            ) : (
              /* PROGRESS NEEDED DISPLAY */
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30 uppercase tracking-wider">
                    Stage Upgrade Criteria Incomplete
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-2">
                    Step {currentStep.stepNumber + 1} Upgrade Requirements
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    You need to complete a few more requirements before advancing to Step {currentStep.stepNumber + 1} ({nextStep?.name}).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-left">
                  {requirements.map((req) => (
                    <div key={req.id} className="flex items-center justify-between text-xs">
                      <span className={req.isMet ? "text-emerald-400 font-bold" : "text-slate-300 font-medium"}>
                        {req.isMet ? "✓" : "•"} {req.label}
                      </span>
                      <span className={`font-mono font-bold ${req.isMet ? "text-emerald-400" : "text-amber-400"}`}>
                        {req.current}/{req.target} {req.unit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowEvalModal(false);
                      if (onNavigateTab) onNavigateTab("learn");
                    }}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Go to University Lessons
                  </button>
                  <button
                    onClick={() => setShowEvalModal(false)}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
