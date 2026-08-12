import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  ShieldAlert, 
  Sparkles, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  PieChart, 
  TrendingDown, 
  BarChart2, 
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface PortfolioDoctorProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export const PortfolioDoctor: React.FC<PortfolioDoctorProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [activeStressTest, setActiveStressTest] = useState<string | null>(null);

  const portfolioHealth = {
    score: 74,
    concentrationRisk: "HIGH (42% exposure in Banking Sector)",
    beta: 1.18,
    dividendYield: "1.4%",
    peMultiple: "28.4x",
    warnings: [
      "Concentration Alert: 42% of holdings concentrated in Banking & NBFCs.",
      "High Beta Warning: Portfolio is 18% more volatile than the NIFTY 50 benchmark.",
      "Valuation Caution: Average P/E of 28.4x sits in the 82nd historical percentile."
    ],
    strengths: [
      "Zero debt exposure among core holdings.",
      "High average ROE of 21.5% across holding companies."
    ]
  };

  const stressScenarios = [
    {
      id: "crash",
      name: "Global Market Crash (-25% Shock)",
      impact: -22.4,
      desc: "Simulates systemic liquidity freeze across equities."
    },
    {
      id: "rates",
      name: "Interest Rate Hike (+150 bps)",
      impact: -12.8,
      desc: "Impacts banking margins and high-P/E growth stocks."
    },
    {
      id: "oil",
      name: "Crude Oil Spike ($110 / barrel)",
      impact: -14.2,
      desc: "Squeezes manufacturing and auto input margins."
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20 uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Portfolio Diagnostics & Crash Stress Tester</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            StockMentor Portfolio Doctor
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Analyze portfolio concentration, volatility beta, and run macro crash stress tests.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Health Score</p>
          <p className="text-2xl font-black text-amber-400">{portfolioHealth.score} / 100</p>
        </div>
      </div>

      {/* Warnings & Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2">
          <p className="font-extrabold text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Diagnostic Risks & Warnings:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
            {portfolioHealth.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
          <p className="font-extrabold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Portfolio Quality Strengths:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
            {portfolioHealth.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Macro Stress Test Lab */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4" />
          <span>Simulate Macro Stress Scenarios</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stressScenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => setActiveStressTest(sc.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeStressTest === sc.id
                  ? "bg-rose-950/40 border-rose-500 shadow-md shadow-rose-500/10"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <p className="text-xs font-extrabold text-white">{sc.name}</p>
              <p className="text-[11px] text-slate-400 mt-1">{sc.desc}</p>
              <p className="text-sm font-black text-rose-400 mt-2">Expected Drawdown: {sc.impact}%</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
