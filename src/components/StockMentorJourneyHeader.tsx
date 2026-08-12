import React from "react";
import { UserProfile } from "../types";
import { PerformanceStageUpgradeCenter } from "./PerformanceStageUpgradeCenter";
import { PERFORMANCE_STEPS, evaluatePerformanceStage } from "../utils/performanceEngine";
import { 
  Compass, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Brain,
  ShieldAlert,
  Zap,
  Target,
  Trophy,
  X
} from "lucide-react";

interface StockMentorJourneyHeaderProps {
  profile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  onSelectTopic?: (topicId: string) => void;
  onOpenSocraticWithQuestion: (q: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const StockMentorJourneyHeader: React.FC<StockMentorJourneyHeaderProps> = ({
  profile,
  onUpdateProfile,
  onOpenSocraticWithQuestion,
  onNavigateTab
}) => {
  const [inspectStep, setInspectStep] = React.useState<typeof PERFORMANCE_STEPS[0] | null>(null);

  const evalResult = evaluatePerformanceStage(profile);
  const currentStepNumber = evalResult.currentStepNumber;
  const currentStageIndex = currentStepNumber - 1;
  const currentStep = evalResult.currentStep;

  const totalTopicsCompleted = profile.completedLessons?.length || 0;
  const totalTopics = 500;
  const overallMastery = evalResult.completedCountSummary.avgTestScore;

  const behavioralPattern = profile.behavioralPatterns?.[0] || {
    id: "bp-1",
    patternName: "Post-Breakout FOMO Entries",
    severity: "High",
    description: "You tend to enter trades after 5+ consecutive green candles and frequently underestimate pullback risks.",
    recommendedLessons: ["FOMO → Risk/Reward Ratios", "Position Sizing Mastery", "Pullback Entries"]
  };

  return (
    <div className="space-y-6">
      {/* 1. Journey Path Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Personalized StockMentor Journey</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span>Stage {currentStepNumber}: {currentStep.name} Path</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                {profile.levelTitle || currentStep.title}
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              AI-guided progression reacting dynamically to your exam scores, lesson completions, and decision quality.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Mastery Score</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-emerald-400">{overallMastery}%</span>
                <span className="text-xs text-emerald-500 font-medium">Top 10%</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Lessons Mastered</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-white">{totalTopicsCompleted}</span>
                <span className="text-xs text-slate-400">/ {totalTopics}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Milestones Path */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dynamic Performance Stage Roadmap (Click step to inspect privileges)</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PERFORMANCE_STEPS.map((item, idx) => {
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <button
                  key={item.stepNumber}
                  onClick={() => setInspectStep(item)}
                  className={`p-3 rounded-xl border text-left transition-all relative group cursor-pointer hover:border-emerald-500/80 ${
                    isCurrent 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30" 
                      : isPassed
                      ? "bg-slate-800/50 border-slate-700/60 text-slate-300"
                      : "bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Step {item.stepNumber}</span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : null}
                  </div>
                  <p className="text-xs font-bold truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next AI Recommendation Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mt-0.5 sm:mt-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">AI Next Learning Recommendation</p>
              <h4 className="text-sm font-bold text-white mt-0.5">
                Understanding Enterprise Value (EV) vs Market Cap
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                <span className="text-emerald-400 font-semibold">Why AI selected this:</span> Your recent analysis ignored debt on balance sheets. EV incorporates debt to prevent overpaying for levered companies.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onOpenSocraticWithQuestion("Explain Enterprise Value (EV) vs Market Cap with real examples")}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <span>Ask AI Tutor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Performance Reaction & Stage Upgrade Hub */}
      <PerformanceStageUpgradeCenter
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onNavigateTab={onNavigateTab}
      />

      {/* 3. AI Behavioral Thinking & Decision Pattern Detector */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                  ⚠️ AI Behavioral Pattern Detected
                </span>
                <span className="text-xs text-amber-400/80 font-semibold">Frequency: 3x this month</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {behavioralPattern.patternName}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {behavioralPattern.description}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col gap-2 min-w-[240px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Targeted Remedial Path</p>
            <div className="flex flex-wrap gap-1.5">
              {behavioralPattern.recommendedLessons.map((rec, i) => (
                <button
                  key={i}
                  onClick={() => onOpenSocraticWithQuestion(`How do I overcome ${rec}?`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-medium border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{rec}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STEP INSPECTION MODAL */}
      {inspectStep && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setInspectStep(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">
                  Step {inspectStep.stepNumber} Milestone
                </span>
                <h3 className="text-xl font-black text-white">{inspectStep.name}</h3>
                <p className="text-xs text-emerald-400 font-bold">{inspectStep.title}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              {inspectStep.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Unlocked Tools & Capabilities:
              </span>
              <div className="flex flex-wrap gap-2">
                {inspectStep.unlockedTools.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setInspectStep(null)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

