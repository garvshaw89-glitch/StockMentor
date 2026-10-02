import React from "react";
import { UserProfile } from "../types";
import { PerformanceStageUpgradeCenter } from "./PerformanceStageUpgradeCenter";
import { PERFORMANCE_STEPS, evaluatePerformanceStage } from "../utils/performanceEngine";
import { LuxuryPanel, MetricDisplay } from "./ui/LuxuryPrimitives";
import { 
  Compass, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Brain,
  ShieldAlert,
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
    <div className="space-y-4">
      {/* Journey Path Panel */}
      <LuxuryPanel elevated className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-blue-600 dark:text-[#6F9BFF] mb-2 font-medium">
              <Compass className="w-3.5 h-3.5" />
              <span>DYNAMIC INSTITUTIONAL ACCREDITATION PATH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-[#F5F5F0] flex items-center gap-2.5">
              <span>Stage {currentStepNumber}: {currentStep.name}</span>
              <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-[#F5F5F0] border border-slate-200 dark:border-white/[0.1]">
                {profile.levelTitle || currentStep.title}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-[#A5A8AE] text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Algorithmic progression engine calibrating your financial acumen, thesis defense, and risk-adjusted simulator alpha.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-50 dark:bg-[#080A0D] p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
            <MetricDisplay
              label="Mastery Score"
              value={`${overallMastery}%`}
              change="Top 10%"
              changeType="positive"
              size="sm"
            />
            <div className="h-8 w-px bg-slate-200 dark:bg-white/[0.08]" />
            <MetricDisplay
              label="Modules Cleared"
              value={totalTopicsCompleted}
              suffix={` / ${totalTopics}`}
              size="sm"
            />
          </div>
        </div>

        {/* 10-Step Progress Matrix */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.05]">
          <div className="flex items-center justify-between text-xs font-mono mb-2 text-slate-500 dark:text-[#686C73]">
            <span>PROFESSIONAL ACCREDITATION CURRICULUM</span>
            <span>{currentStepNumber} of 10 STAGES</span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
            {PERFORMANCE_STEPS.map((step, idx) => {
              const isDone = idx + 1 < currentStepNumber;
              const isCurrent = idx + 1 === currentStepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setInspectStep(step)}
                  className={`py-2 px-1 text-center rounded-lg border transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-blue-600 dark:bg-[#6F9BFF] text-white dark:text-slate-950 border-blue-500 font-bold shadow-xs"
                      : isDone
                      ? "bg-emerald-500/10 dark:bg-[#6EE7B7]/10 text-emerald-700 dark:text-[#6EE7B7] border-emerald-500/20"
                      : "bg-slate-50 dark:bg-[#0C0F13] text-slate-400 dark:text-[#686C73] border-slate-200 dark:border-white/[0.05]"
                  }`}
                  title={`Stage ${step.stepNumber}: ${step.name}`}
                >
                  <span className="block text-[10px] font-mono leading-none">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </LuxuryPanel>

      {/* Behavioral Psychology Warning Banner */}
      {behavioralPattern && (
        <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/[0.08] border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-[#F5C76B] shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono uppercase font-bold text-amber-700 dark:text-[#F5C76B]">
                  Behavioral Alert: {behavioralPattern.patternName}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200">
                  {behavioralPattern.severity} RISK
                </span>
              </div>
              <p className="text-slate-600 dark:text-[#A5A8AE] mt-0.5 leading-relaxed">
                {behavioralPattern.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenSocraticWithQuestion(`How can I eliminate ${behavioralPattern.patternName} from my trading execution?`)}
            className="shrink-0 px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-[#F5C76B] rounded-lg font-mono text-[11px] font-semibold transition-colors cursor-pointer"
          >
            Review Psychology Prescription →
          </button>
        </div>
      )}

      {/* Modal Inspector for Accreditation Steps */}
      {inspectStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <LuxuryPanel elevated className="max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-[#6F9BFF]">
                  STAGE {inspectStep.stepNumber} INSPECTION
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F5F5F0]">
                  {inspectStep.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectStep(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-slate-600 dark:text-[#A5A8AE]">
              <p className="leading-relaxed">{inspectStep.description}</p>
              <div className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-lg border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="font-mono text-slate-900 dark:text-[#F5F5F0] font-semibold block">
                  Mandatory Competencies:
                </span>
                <p>{inspectStep.skillFocus}</p>
              </div>
            </div>
            <button
              onClick={() => setInspectStep(null)}
              className="mt-5 w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold rounded-lg text-xs"
            >
              Close
            </button>
          </LuxuryPanel>
        </div>
      )}
    </div>
  );
};
