import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  BookOpen, 
  Dna, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Award,
  ArrowRight
} from "lucide-react";

interface TradingJournalAndDNAProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const TradingJournalAndDNA: React.FC<TradingJournalAndDNAProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [activeTab, setActiveTab] = useState<"journal" | "dna">("dna");

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
      aiFeedback: "Excellent entry timing aligned with volume profile. Your stop loss was properly set at 1:3 risk-to-reward.",
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
      aiFeedback: "⚠️ Strategy violation: Entered during extended momentum without awaiting a pullback or consolidation base.",
      timestamp: "2026-08-12 10:00"
    }
  ];

  const strategyDNA = profile.strategyDNA || {
    bestStyle: "Swing Trading (3 - 10 Days)",
    bestTimeframe: "Daily & 4-Hour Charts",
    strongestSkill: "Trend Identification & Volume Breakdown",
    weakestSkill: "Risk-to-Reward Ratio Execution",
    commonMistake: "Chasing Momentum After 5+ Green Candles",
    avgRiskPerTrade: "2.5% of Portfolio",
    preferredSectors: ["Technology", "Automotive", "Banking"]
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 uppercase tracking-wider mb-2">
            <Dna className="w-3.5 h-3.5" />
            <span>AI Trading Journal & Personal Strategy DNA</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Personal Trading DNA & AI Journal Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Automated trade recording, strategy adherence evaluation, and personalized trading behavioral DNA card.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("dna")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "dna" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-white"
            }`}
          >
            🧬 Strategy DNA Card
          </button>
          <button
            onClick={() => setActiveTab("journal")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "journal" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-white"
            }`}
          >
            📓 AI Trading Journal
          </button>
        </div>
      </div>

      {activeTab === "dna" && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Dna className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">AI Behavioral Profiler</span>
                <h4 className="text-lg font-extrabold text-white">Your Personal Strategy DNA Profile</h4>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              Verified 50+ Trades Analyzed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Optimal Trading Style</p>
              <p className="text-base font-bold text-emerald-400 mt-1">{strategyDNA.bestStyle}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Best Timeframe: {strategyDNA.bestTimeframe}</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Strongest Edge Skill</p>
              <p className="text-base font-bold text-white mt-1">{strategyDNA.strongestSkill}</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Primary Execution Vulnerability</p>
              <p className="text-base font-bold text-rose-400 mt-1">{strategyDNA.commonMistake}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">Targeted AI Prescription:</p>
              <p className="text-xs text-slate-300 mt-0.5">
                Your breakout strategy achieves an 82% win rate when volume exceeds the 20-day average. Enforce a mandatory pullback rule before entering 5+ green candle setups.
              </p>
            </div>
            <button
              onClick={() => onOpenSocraticWithQuestion("How do I avoid chasing momentum and enter on pullbacks?")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Remedial Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === "journal" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Automated Trade Logs & Strategy Adherence</span>
            <span>Total Logged Trades: {journalEntries.length}</span>
          </div>

          <div className="space-y-3">
            {journalEntries.map((j) => (
              <div
                key={j.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-extrabold ${j.action === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                      {j.action} {j.stockSymbol}
                    </span>
                    <span className="text-slate-400">Entry: ₹{j.entryPrice} | SL: ₹{j.stopLoss} | Target: ₹{j.targetPrice}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {j.followedStrategy ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        ✓ Followed Strategy
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/30">
                        ⚠️ Strategy Violation
                      </span>
                    )}

                    {j.pnl !== undefined && (
                      <span className={`font-black ${j.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {j.pnl >= 0 ? "+" : ""}₹{j.pnl.toLocaleString('en-IN')} ({j.pnlPercent}%)
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300"><strong>Trade Thesis:</strong> {j.reasoning}</p>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span>{j.aiFeedback}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
