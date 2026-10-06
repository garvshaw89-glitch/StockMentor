import React, { useState } from "react";
import { ExplanationMode, TabType, UserProfile } from "../types";
import { ActivityChart } from "./ActivityChart";
import { StockMentorJourneyHeader } from "./StockMentorJourneyHeader";
import { MarketHeatmap } from "./MarketHeatmap";
import { getRecommendedLesson } from "../utils/curriculumUtils";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  MarketIndicator, 
  SectionHeader, 
  PrecisionButton 
} from "./ui/LuxuryPrimitives";
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  ArrowRight, 
  Brain, 
  Sliders, 
  Activity, 
  FileText, 
  LineChart,
  ShieldAlert
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

  // Macro ticker telemetry
  const macroTickers = [
    { symbol: "NIFTY 50", price: "24,842.15", change: "+0.68%", type: "positive" as const },
    { symbol: "S&P 500", price: "5,864.20", change: "+0.42%", type: "positive" as const },
    { symbol: "NASDAQ", price: "18,340.50", change: "+0.85%", type: "positive" as const },
    { symbol: "INDIA VIX", price: "12.84", change: "-3.12%", type: "positive" as const },
    { symbol: "US 10Y", price: "4.08%", change: "+0.02%", type: "neutral" as const },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      
      {/* ================================================================ */}
      {/* 1. Header: Section Title & Global Macro Telemetry Bar */}
      {/* ================================================================ */}
      <div className="space-y-4">
        <SectionHeader
          kicker="EXECUTIVE COMMAND CENTER"
          title="MARKET INTELLIGENCE"
          description="Global market telemetry, macro regime indicators, AI algorithmic insights, and active Socratic mastery."
          action={
            <div className="flex items-center gap-2">
              <PrecisionButton
                variant="secondary"
                size="sm"
                icon={<Brain className="w-3.5 h-3.5 text-blue-500 dark:text-[#6F9BFF]" />}
                onClick={() => onOpenSocraticWithQuestion("Provide a macro regime summary of global equity markets today.")}
              >
                Macro Briefing
              </PrecisionButton>
              <PrecisionButton
                variant="primary"
                size="sm"
                icon={<TrendingUp className="w-3.5 h-3.5" />}
                onClick={() => setActiveTab("simulator")}
              >
                Launch Simulation Desk
              </PrecisionButton>
            </div>
          }
        />

        {/* Global Macro Telemetry Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {macroTickers.map((ticker) => (
            <LuxuryPanel key={ticker.symbol} className="p-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-[#686C73]">
                <span>{ticker.symbol}</span>
                <MarketIndicator status="active" pulse={false} />
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-mono text-sm sm:text-base font-semibold text-slate-900 dark:text-[#F5F5F0]">
                  {ticker.price}
                </span>
                <span className={`text-[11px] font-mono font-medium ${
                  ticker.type === "positive" ? "text-emerald-600 dark:text-[#6EE7B7]" : "text-rose-600 dark:text-[#FF7B86]"
                }`}>
                  {ticker.change}
                </span>
              </div>
            </LuxuryPanel>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. StockMentor Personalized Journey Header & Path Matrix */}
      {/* ================================================================ */}
      <StockMentorJourneyHeader 
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onOpenSocraticWithQuestion={onOpenSocraticWithQuestion}
        onNavigateTab={(tab) => setActiveTab(tab as TabType)}
      />

      {/* ================================================================ */}
      {/* 3. Real-Time Market Sector Treemap Heatmap */}
      {/* ================================================================ */}
      <MarketHeatmap 
        onOpenSocraticWithQuestion={onOpenSocraticWithQuestion}
        setActiveTab={setActiveTab}
      />

      {/* ================================================================ */}
      {/* 4. Asymmetric Main Intelligence Layout */}
      {/* ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7/12): Primary Target Lesson + Activity Chart */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Target Curricula Lesson Panel */}
          <LuxuryPanel elevated className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.05] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-[#6F9BFF]">
                  CURRENT CURRICULUM TARGET
                </span>
                <span className="text-slate-300 dark:text-white/20">·</span>
                <span className="text-xs font-mono text-slate-500 dark:text-[#A5A8AE]">
                  {recommended.topic.levelTitle}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 dark:text-[#686C73]">
                ~{recommended.topic.estimatedTimeMinutes || 5} MIN READ
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
              {recommended.lesson.title}
            </h3>

            <p className="mt-2.5 text-sm text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
              {mode === "ELI5"
                ? recommended.lesson.contentELI5
                : mode === "Simple"
                ? recommended.lesson.contentSimple
                : recommended.lesson.contentProfessional}
            </p>

            <div className="mt-4 p-3.5 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] text-xs">
              <span className="font-mono text-[11px] font-semibold text-slate-900 dark:text-[#F5F5F0] uppercase tracking-wider block mb-1.5">
                Key Conceptual Competencies:
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-[#A5A8AE]">
                {recommended.lesson.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-[#6F9BFF] font-mono">0{idx + 1}.</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PrecisionButton
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => setActiveTab("learn")}
              >
                Resume Course Module
              </PrecisionButton>
              <PrecisionButton
                variant="secondary"
                size="md"
                icon={<Brain className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />}
                onClick={() => onOpenSocraticWithQuestion(`Can you explain '${recommended.lesson.title}' using first-principles reasoning?`)}
              >
                Consult AI Mentor
              </PrecisionButton>
            </div>
          </LuxuryPanel>

          {/* Gamified 7-Day Activity Chart */}
          <ActivityChart />

        </div>

        {/* Right Column (5/12): Daily Challenge & Quick Gateways */}
        <div className="lg:col-span-5 space-y-6">

          {/* Daily Socratic Challenge */}
          <IntelligenceCard
            kicker="SOCRATIC PROMPT EXAM"
            title="Daily Market Dilemma"
            action={
              <span className="text-[10px] font-mono text-slate-400 dark:text-[#686C73]">
                RESCHEDULES IN 4H
              </span>
            }
          >
            <div className="p-3.5 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] mb-4">
              <p className="text-xs sm:text-sm text-slate-800 dark:text-[#F5F5F0] italic font-serif leading-relaxed">
                &ldquo;A blue-chip equity reports historic all-time-high quarterly profits, yet the stock plunges 8% immediately at market open. What is the fundamental mechanic?&rdquo;
              </p>
            </div>

            <div className="space-y-2">
              {dailyQuestionOptions.map((opt, idx) => {
                const isSelected = dailyAnswered === idx;
                const isCorrect = idx === 0;

                let stateClasses = "bg-white dark:bg-[#11151A] border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-[#A5A8AE] hover:bg-slate-50 dark:hover:bg-white/[0.04]";
                if (showDailyExplanation) {
                  if (isCorrect) {
                    stateClasses = "bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-[#6EE7B7] font-semibold";
                  } else if (isSelected && !isCorrect) {
                    stateClasses = "bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-[#FF7B86]";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectDaily(idx)}
                    disabled={showDailyExplanation}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${stateClasses}`}
                  >
                    <span className="font-bold mr-2 text-slate-400 dark:text-[#686C73]">
                      [{String.fromCharCode(65 + idx)}]
                    </span>
                    <span className="font-sans">{opt}</span>
                  </button>
                );
              })}
            </div>

            {showDailyExplanation && (
              <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs space-y-1 animate-in fade-in">
                <span className="font-mono font-bold text-emerald-700 dark:text-[#6EE7B7] block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Socratic Principle:
                </span>
                <p className="text-slate-700 dark:text-[#A5A8AE] leading-relaxed">
                  Financial markets discount <strong>future forward expectations</strong>. When street expectations bake in a blowout quarter, merely meeting or reporting lower guidance causes immediate liquidation.
                </p>
                <button
                  onClick={() => onOpenSocraticWithQuestion("Give me 3 historical stock examples where record earnings triggered a severe selloff.")}
                  className="mt-2 text-[11px] font-mono text-blue-600 dark:text-[#6F9BFF] hover:underline block"
                >
                  Explore real historic cases with AI Mentor →
                </button>
              </div>
            )}
          </IntelligenceCard>

          {/* Institutional Lab Gateways */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-[#686C73] block">
              SPECIALIZED INTELLIGENCE LABS
            </span>

            <div 
              onClick={() => setActiveTab("become-analyst")}
              className="p-4 rounded-xl bg-white dark:bg-[#0C0F13] border border-slate-200 dark:border-white/[0.06] hover:border-blue-500/40 dark:hover:border-[#6F9BFF]/40 transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-[#6F9BFF] group-hover:scale-105 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F0] group-hover:text-blue-600 dark:group-hover:text-[#6F9BFF] transition-colors">
                    30-Minute Wall Street Analyst Exam
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-[#A5A8AE] truncate mt-0.5">
                    Timed institutional valuation under simulated stress.
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab("candle-replay")}
              className="p-4 rounded-xl bg-white dark:bg-[#0C0F13] border border-slate-200 dark:border-white/[0.06] hover:border-emerald-500/40 dark:hover:border-[#6EE7B7]/40 transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-[#6EE7B7] group-hover:scale-105 transition-transform">
                  <LineChart className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F0] group-hover:text-emerald-600 dark:group-hover:text-[#6EE7B7] transition-colors">
                    Chart Replay & Price Action Lab
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-[#A5A8AE] truncate mt-0.5">
                    Bar-by-bar candle simulations with execution testing.
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab("survival")}
              className="p-4 rounded-xl bg-white dark:bg-[#0C0F13] border border-slate-200 dark:border-white/[0.06] hover:border-rose-500/40 dark:hover:border-[#FF7B86]/40 transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-[#FF7B86] group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F0] group-hover:text-rose-600 dark:group-hover:text-[#FF7B86] transition-colors">
                    Market Survival Mode
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-[#A5A8AE] truncate mt-0.5">
                    Navigate historic 2008 & 2020 systemic crashes.
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
