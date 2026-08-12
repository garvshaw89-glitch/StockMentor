import React, { useState } from "react";
import { ExplanationMode, TabType, UserProfile } from "../types";
import { ActivityChart } from "./ActivityChart";
import { StockMentorJourneyHeader } from "./StockMentorJourneyHeader";
import { getRecommendedLesson } from "../utils/curriculumUtils";
import { 
  Flame, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  Brain,
  Newspaper
} from "lucide-react";

interface HomeDashboardProps {
  profile: UserProfile;
  mode: ExplanationMode;
  setActiveTab: (tab: TabType) => void;
  onOpenSocraticWithQuestion: (q: string) => void;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  mode,
  setActiveTab,
  onOpenSocraticWithQuestion,
  onUpdateProfile
}) => {
  const [dailyAnswered, setDailyAnswered] = useState<number | null>(null);
  const [showDailyExplanation, setShowDailyExplanation] = useState(false);

  const recommended = getRecommendedLesson(profile.testScores || {}, profile.completedLessons || []);

  const dailyQuestionOptions = [
    "Market expectations were even higher than the reported profits",
    "Company profits automatically cap stock prices",
    "It is mathematically impossible for stocks to fall on record profits",
    "SEBI cancelled all stock trades for the day"
  ];

  const handleSelectDaily = (idx: number) => {
    setDailyAnswered(idx);
    setShowDailyExplanation(true);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* 1. StockMentor Personalized Journey Header & Behavioral Warning */}
      <StockMentorJourneyHeader 
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onOpenSocraticWithQuestion={onOpenSocraticWithQuestion}
        onNavigateTab={(tab) => setActiveTab(tab as TabType)}
      />

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Overall Mastery Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">78%</span>
            <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">+2.4%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[78%]" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Topics Mastered</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">14</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">/ 42 Topics</span>
          </div>
          <p className="text-[11px] text-emerald-500 dark:text-emerald-400 mt-2 font-medium">Level 2: Intermediate Investor</p>
        </div>

        <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Test Accuracy Avg.</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">84%</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Avg. Score</span>
          </div>
          <div className="flex gap-1.5 mt-3">
            <div className="w-full h-1 bg-emerald-500 rounded-full" />
            <div className="w-full h-1 bg-emerald-500 rounded-full" />
            <div className="w-full h-1 bg-emerald-500 rounded-full" />
            <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>

      {/* 7-Day Gamified Activity Chart */}
      <ActivityChart />

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Recommended Lesson Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900/20 to-slate-900 p-6 sm:p-8 rounded-3xl border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-full border border-indigo-500/30 uppercase">
                Current Target • {recommended.topic.levelTitle}
              </span>
              <span className="text-xs text-slate-400">{recommended.topic.estimatedTimeMinutes || 5} mins</span>
            </div>

            <h2 className="text-2xl font-bold text-white mt-2">
              {recommended.lesson.title}
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm sm:text-base leading-relaxed line-clamp-3">
              {mode === "ELI5"
                ? recommended.lesson.contentELI5
                : mode === "Simple"
                ? recommended.lesson.contentSimple
                : recommended.lesson.contentProfessional}
            </p>

            <div className="mt-4 p-3.5 bg-slate-800/40 rounded-xl text-xs space-y-1 text-slate-300 border border-slate-700/50">
              <p className="font-semibold text-white">Key Concepts You'll Master:</p>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                {recommended.lesson.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex items-center gap-4">
            <button
              onClick={() => setActiveTab("learn")}
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>Resume Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenSocraticWithQuestion(`Can you explain '${recommended.lesson.title}' in detail?`)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-colors border border-slate-700 flex items-center gap-1.5"
            >
              <Brain className="w-4 h-4 text-emerald-400" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>

        {/* Daily Challenge Card */}
        <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Daily Challenge</span>
              </h3>
              <span className="text-xs text-slate-500">Expires in 4h 12m</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/50 mb-4">
              <p className="text-slate-800 dark:text-slate-300 italic text-sm leading-relaxed">
                "A company reports record profits, but its stock falls 8% immediately after. Why could this happen?"
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {dailyQuestionOptions.map((opt, idx) => {
                const isSelected = dailyAnswered === idx;
                const isCorrect = idx === 0;

                let btnStyle = "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80";
                if (showDailyExplanation) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectDaily(idx)}
                    disabled={showDailyExplanation}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-medium transition-all ${btnStyle}`}
                  >
                    <span className="font-mono font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation Display */}
            {showDailyExplanation && (
              <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200 space-y-1 animate-fadeIn">
                <span className="font-bold block flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Socratic Insight:
                </span>
                <p>
                  Stock markets price in **future expectations**. If expectations were higher than actual record numbers, the stock drops despite profitability!
                </p>
              </div>
            )}
          </div>

          {showDailyExplanation && (
            <button
              onClick={() => onOpenSocraticWithQuestion("Can you give me another example where stock prices fell after good financial earnings?")}
              className="mt-4 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Brain className="w-4 h-4" />
              <span>Explore More Examples</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Quick Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setActiveTab("research")}
          className="p-5 bg-white dark:bg-[#0D1117] text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-500 transition-all shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base">You Are The Analyst</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Evaluate equities, make BUY/HOLD/SELL calls, defend reasoning, and receive Socratic AI feedback.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-500 dark:text-indigo-400">
            <span>Try Decision Exercise</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("charts")}
          className="p-5 bg-white dark:bg-[#0D1117] text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-emerald-500 transition-all shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h4 className="font-bold text-base">Historical Chart Challenge</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Analyze blind historical stock chart setups, set stop loss & targets, and reveal the real outcome.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-500 dark:text-emerald-400">
            <span>Play Chart Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("portfolio")}
          className="p-5 bg-white dark:bg-[#0D1117] text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-amber-500 transition-all shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
            <Newspaper className="w-5 h-5 text-amber-500" />
          </div>
          <h4 className="font-bold text-base">Financial News Analyzer</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Paste RBI updates or news headlines for instant AI breakdowns, sector ripple effects, and Socratic questions.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-500 dark:text-amber-400">
            <span>Analyze Headlines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
