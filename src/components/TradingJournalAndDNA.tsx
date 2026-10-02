import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  SectionHeader, 
  PrecisionButton, 
  MarketIndicator 
} from "./ui/LuxuryPrimitives";
import { 
  Dna, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Award,
  ArrowRight,
  Brain,
  AlertTriangle,
  History
} from "lucide-react";

interface TradingJournalAndDNAProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const TradingJournalAndDNA: React.FC<TradingJournalAndDNAProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [activeTab, setActiveTab] = useState<"dna" | "journal">("dna");

  const journalEntries = profile.journalEntries || [
    {
      id: "j-1",
      stockSymbol: "TATAMOTORS",
      action: "BUY" as const,
      entryPrice: 995,
      stopLoss: 960,
      targetPrice: 1120,
      shares: 100,
      reasoning: "Bullish breakout above 20 EMA with 2.5x volume expansion.",
      followedStrategy: true,
      pnl: 5000,
      pnlPercent: 5.02,
      aiFeedback: "Optimal entry timing aligned with volume profile. Your stop loss was properly set at 1:3 risk-to-reward ratio.",
      timestamp: "2026-08-11 11:15"
    },
    {
      id: "j-2",
      stockSymbol: "RELIANCE",
      action: "BUY" as const,
      entryPrice: 2980,
      stopLoss: 2920,
      targetPrice: 3100,
      shares: 50,
      reasoning: "Chased stock after 4 consecutive green daily candles.",
      followedStrategy: false,
      pnl: -1200,
      pnlPercent: -0.8,
      aiFeedback: "Strategy breach: Entered during overextended momentum without awaiting a pullback base or liquidity retest.",
      timestamp: "2026-08-12 10:00"
    }
  ];

  const strategyDNA = profile.strategyDNA || {
    bestStyle: "Swing Trading (3 - 10 Days)",
    bestTimeframe: "Daily & 4-Hour Charts",
    strongestSkill: "Trend Identification & Volume Confirmation",
    weakestSkill: "Risk-to-Reward Ratio Discipline",
    commonMistake: "Chasing Momentum After 5+ Green Candles",
    avgRiskPerTrade: "2.5% of Portfolio",
    preferredSectors: ["Technology", "Automotive", "Private Banking"]
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      
      {/* Header */}
      <SectionHeader
        kicker="COGNITIVE AUDIT & QUANTITATIVE DISCIPLINE"
        title="BEHAVIORAL INTELLIGENCE"
        description="Algorithmic behavioral profiling, emotional tendency detection, strategy adherence audits, and Socratic trading journal reviews."
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
              <button
                onClick={() => setActiveTab("dna")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "dna"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs"
                    : "text-slate-600 dark:text-[#A5A8AE]"
                }`}
              >
                Strategy DNA Matrix
              </button>
              <button
                onClick={() => setActiveTab("journal")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "journal"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs"
                    : "text-slate-600 dark:text-[#A5A8AE]"
                }`}
              >
                Journal Entries ({journalEntries.length})
              </button>
            </div>
          </div>
        }
      />

      {/* Main Content Area */}
      {activeTab === "dna" ? (
        <div className="space-y-6">
          <LuxuryPanel elevated className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-[#8B7CFF] border border-violet-500/20 flex items-center justify-center">
                  <Dna className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-violet-600 dark:text-[#8B7CFF] font-semibold">
                    BEHAVIORAL RISK SIGNATURE
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-[#F5F5F0]">
                    Personal Strategy DNA Blueprint
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-[#6EE7B7] bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                50+ VERIFIED SIMULATOR TRADES
              </span>
            </div>

            {/* Diagnostic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-[10px] text-slate-400 uppercase">Optimal Trading Style</span>
                <p className="text-base font-bold text-emerald-600 dark:text-[#6EE7B7]">{strategyDNA.bestStyle}</p>
                <p className="text-[11px] text-slate-500 font-sans mt-0.5">Timeframe: {strategyDNA.bestTimeframe}</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-[10px] text-slate-400 uppercase">Primary Statistical Edge</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">{strategyDNA.strongestSkill}</p>
                <p className="text-[11px] text-slate-500 font-sans mt-0.5">High win-rate on confirmed breakouts.</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-[10px] text-slate-400 uppercase">Primary Execution Vulnerability</span>
                <p className="text-base font-bold text-rose-600 dark:text-[#FF7B86]">{strategyDNA.commonMistake}</p>
                <p className="text-[11px] text-slate-500 font-sans mt-0.5">Risk of high-drawdown pullbacks.</p>
              </div>
            </div>

            {/* Strategy Adherence Ticker */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] block">Average Risk Allocation</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{strategyDNA.avgRiskPerTrade}</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:border-white/[0.08] hidden sm:block" />
              <div>
                <span className="text-slate-400 uppercase text-[10px] block">Preferred Sector Niches</span>
                <span className="text-slate-800 dark:text-slate-200">{strategyDNA.preferredSectors.join(" · ")}</span>
              </div>
              <PrecisionButton
                variant="primary"
                size="sm"
                icon={<Brain className="w-3.5 h-3.5" />}
                onClick={() => onOpenSocraticWithQuestion(`How can I mathematically counter ${strategyDNA.commonMistake} using automated bracket orders?`)}
              >
                Remediate Vulnerability
              </PrecisionButton>
            </div>
          </LuxuryPanel>
        </div>
      ) : (
        <div className="space-y-4">
          {journalEntries.map((entry) => (
            <LuxuryPanel key={entry.id} elevated className="p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    entry.action === "BUY" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                  }`}>
                    {entry.action}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white font-sans text-sm">
                    {entry.stockSymbol}
                  </span>
                  <span className="text-slate-400 text-[11px]">{entry.shares} Units @ ₹{entry.entryPrice}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`font-bold ${entry.pnl >= 0 ? "text-emerald-600 dark:text-[#6EE7B7]" : "text-rose-600 dark:text-[#FF7B86]"}`}>
                    {entry.pnl >= 0 ? "+" : ""}₹{entry.pnl} ({entry.pnlPercent}%)
                  </span>
                  <span className="text-[10px] text-slate-400">{entry.timestamp}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                <div className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-lg border border-slate-200 dark:border-white/[0.06]">
                  <span className="font-mono text-[10px] text-slate-400 uppercase block mb-1">
                    Trader Thesis & Execution Rationale:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-[#A5A8AE]">{entry.reasoning}</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-lg border border-slate-200 dark:border-white/[0.06]">
                  <span className="font-mono text-[10px] text-blue-500 dark:text-[#6F9BFF] uppercase block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Socratic Audit:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-[#A5A8AE]">{entry.aiFeedback}</p>
                </div>
              </div>
            </LuxuryPanel>
          ))}
        </div>
      )}

    </div>
  );
};
