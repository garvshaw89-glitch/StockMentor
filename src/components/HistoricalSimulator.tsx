import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  RotateCcw, 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  BarChart2,
  Calendar
} from "lucide-react";

interface HistoricalSimulatorProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const HISTORICAL_SCENARIOS = [
  {
    id: "2008-crash",
    title: "The 2008 Global Financial Crisis",
    year: "2008 - 2009",
    marketContext: "Lehman Brothers collapses. Credit markets freeze and NIFTY drops 52% in 10 months.",
    initialCapital: 1000000, // ₹10,00,000
    stages: [
      {
        stageNumber: 1,
        marketDropOrGainPercent: -8,
        newsHeadline: "Global Investment Bank Collapses — Credit Freeze Begins",
        description: "Your portfolio of ₹10,00,000 drops 8% to ₹9,20,000 as volatility surges. Margin calls multiply across major institutions.",
        options: [
          { action: "BUY" as const, label: "Aggressive Buy the Dip (Deploy 50% Cash)", allocationPercent: 50 },
          { action: "HOLD" as const, label: "Hold Existing Portfolio (Stay Cash Neutral)", allocationPercent: 0 },
          { action: "SELL" as const, label: "Cut Risk & Move 40% to Cash", allocationPercent: -40 }
        ]
      },
      {
        stageNumber: 2,
        marketDropOrGainPercent: -12,
        newsHeadline: "Panic Selling Extends — NIFTY Breaches Key 200-Week Support",
        description: "The market plunges another 12%. Institutional liquidations intensify. Fear index (VIX) hits historic highs of 85.",
        options: [
          { action: "BUY" as const, label: "Systematic Rebalance (Buy Quality Bluechips)", allocationPercent: 25 },
          { action: "HOLD" as const, label: "Maintain Positions & Await Stabilization", allocationPercent: 0 },
          { action: "SELL" as const, label: "Cap Loss & Exit All Equities to Cash", allocationPercent: -100 }
        ]
      },
      {
        stageNumber: 3,
        marketDropOrGainPercent: +28,
        newsHeadline: "Central Banks Inject Massive Quantitative Easing & Rate Cuts",
        description: "Emergency stimulus sparks a sharp structural turnaround. Markets rally 28% from cycle lows.",
        options: [
          { action: "BUY" as const, label: "Ride Recovery Momentum (Full Equity Allocation)", allocationPercent: 100 },
          { action: "HOLD" as const, label: "Hold Balanced Strategy", allocationPercent: 50 },
          { action: "SELL" as const, label: "Take Early Profits", allocationPercent: 20 }
        ]
      }
    ],
    benchmarkReturnPercent: 9.0 // 9% return over cycle
  },
  {
    id: "2020-covid",
    title: "The March 2020 COVID Crash & V-Recovery",
    year: "2020",
    marketContext: "Global lockdowns halt supply chains. NIFTY drops 38% in 30 days before recording a historic V-shaped rally.",
    initialCapital: 1000000,
    stages: [
      {
        stageNumber: 1,
        marketDropOrGainPercent: -15,
        newsHeadline: "Global Lockdowns Declared — Circuit Breakers Hit",
        description: "Markets suffer fastest drop in history. Foreign institutions withdraw ₹60,000 Cr in 2 weeks.",
        options: [
          { action: "BUY" as const, label: "Accumulate Quality Tech & Pharma", allocationPercent: 40 },
          { action: "HOLD" as const, label: "Hold Current Asset Allocation", allocationPercent: 0 },
          { action: "SELL" as const, label: "Panic Sell Equities", allocationPercent: -50 }
        ]
      },
      {
        stageNumber: 2,
        marketDropOrGainPercent: +35,
        newsHeadline: "Stimulus Packages & Retail Surge Triggers Rapid Rally",
        description: "Massive liquidity injection fuels swift economic recovery. Tech and pharma stocks rally 35%.",
        options: [
          { action: "BUY" as const, label: "Full Risk-On Equity Deployment", allocationPercent: 100 },
          { action: "HOLD" as const, label: "Hold & Rebalance", allocationPercent: 60 },
          { action: "SELL" as const, label: "Trim Overbought Stocks", allocationPercent: 20 }
        ]
      }
    ],
    benchmarkReturnPercent: 18.5
  }
];

export const HistoricalSimulator: React.FC<HistoricalSimulatorProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("2008-crash");
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [userCapital, setUserCapital] = useState<number>(1000000);
  const [userDecisions, setUserDecisions] = useState<{ stage: number; action: string; label: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scenario = HISTORICAL_SCENARIOS.find(s => s.id === selectedScenarioId) || HISTORICAL_SCENARIOS[0];
  const stage = scenario.stages[currentStageIdx];

  const handleSelectOption = (opt: { action: "BUY" | "HOLD" | "SELL"; label: string; allocationPercent: number }) => {
    // Calculate new capital based on stage return + allocation decision
    let impactMultiplier = 1 + (stage.marketDropOrGainPercent / 100);
    
    // Defensive choices soften drawdowns, aggressive buy the dip amplifies recovery
    if (opt.action === "SELL") {
      impactMultiplier = 1 + (stage.marketDropOrGainPercent / 100) * 0.4; // Softened
    } else if (opt.action === "BUY" && stage.marketDropOrGainPercent < 0) {
      impactMultiplier = 1 + (stage.marketDropOrGainPercent / 100) * 0.8; // Buying early adds drawdown exposure
    }

    const nextCap = Math.round(userCapital * impactMultiplier);
    setUserCapital(nextCap);

    const newDecisions = [...userDecisions, { stage: currentStageIdx + 1, action: opt.action, label: opt.label }];
    setUserDecisions(newDecisions);

    if (currentStageIdx + 1 < scenario.stages.length) {
      setCurrentStageIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStageIdx(0);
    setUserCapital(scenario.initialCapital);
    setUserDecisions([]);
    setIsCompleted(false);
  };

  const returnPercent = Number((((userCapital - scenario.initialCapital) / scenario.initialCapital) * 100).toFixed(1));
  const benchmarkReturn = scenario.benchmarkReturnPercent;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Real Historical Market Event Simulator</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {scenario.title} ({scenario.year})
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {scenario.marketContext}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {HISTORICAL_SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setCurrentStageIdx(0);
                setUserCapital(sc.initialCapital);
                setUserDecisions([]);
                setIsCompleted(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sc.id === selectedScenarioId
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {sc.title.split(" ")[2] || sc.title}
            </button>
          ))}
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Stage Banner */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-400 uppercase tracking-wider">
                Stage {stage.stageNumber} of {scenario.stages.length}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                stage.marketDropOrGainPercent < 0 
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" 
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}>
                Market Impact: {stage.marketDropOrGainPercent > 0 ? "+" : ""}{stage.marketDropOrGainPercent}%
              </span>
            </div>

            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>{stage.newsHeadline}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {stage.description}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800 text-slate-400">
              <span>Current Portfolio Value: <strong className="text-white">₹{(userCapital).toLocaleString('en-IN')}</strong></span>
              <span>Starting Capital: ₹{(scenario.initialCapital).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Decision Options */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Choose Your Strategy Decision:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {stage.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-amber-500/10 hover:border-amber-500/50 border border-slate-700 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase mb-2 ${
                      opt.action === "BUY" ? "bg-emerald-500/20 text-emerald-400" : opt.action === "SELL" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {opt.action}
                    </span>
                    <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {opt.label}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/60">
                    <span>Execute Decision</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Completed Simulation Report */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  ✓ Simulation Completed
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-2">Historical Simulation Results</h4>
              </div>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 uppercase font-semibold">Your Final Portfolio</p>
                <p className="text-2xl font-black text-white mt-1">₹{userCapital.toLocaleString('en-IN')}</p>
                <p className={`text-xs font-bold mt-0.5 ${returnPercent >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {returnPercent >= 0 ? "+" : ""}{returnPercent}% Return
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 uppercase font-semibold">Benchmark Market Return</p>
                <p className="text-2xl font-black text-slate-300 mt-1">+{benchmarkReturn}%</p>
                <p className="text-xs text-slate-400 mt-0.5">Passive Buy & Hold</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 uppercase font-semibold">Alpha Generated</p>
                <p className={`text-2xl font-black mt-1 ${returnPercent >= benchmarkReturn ? "text-emerald-400" : "text-rose-400"}`}>
                  {(returnPercent - benchmarkReturn).toFixed(1)}%
                </p>
                <p className="text-xs text-slate-400 mt-0.5">vs Benchmark</p>
              </div>
            </div>

            {/* AI Post-Mortem Feedback */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Decision Post-Mortem Analysis</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {returnPercent >= benchmarkReturn
                  ? "Outstanding risk discipline! By maintaining disciplined capital allocation during severe drawdowns without panic selling, your strategy outperformed passive buy-and-hold."
                  : "During severe market shocks, panic selling locks in permanent capital losses. Historical market cycles demonstrate that quality businesses recover over 3-5 year horizons."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
