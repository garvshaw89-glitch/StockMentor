import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  ShieldAlert, 
  Sparkles, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Briefcase, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface MarketSurvivalModeProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export const SURVIVAL_EVENTS = [
  { week: 4, name: "Central Bank Surprise 75bps Rate Hike", impact: -0.08, advice: "High growth midcaps hit hardest. Capital preservation is key." },
  { week: 12, name: "Global Supply Chain Shock & Crude Oil Spike", impact: -0.12, advice: "Margin compression across manufacturing. Cash reserves protect portfolio." },
  { week: 24, name: "Domestic Tax & Defense PLI Policy Surge", impact: 0.15, advice: "Defense and capital goods stocks rally 15%." },
  { week: 36, name: "Global Tech Liquidation & Currency Depreciation", impact: -0.10, advice: "IT exporters benefit from weak currency while high-beta tech falls." },
  { week: 48, name: "Year-End Institutional Earnings Boom", impact: 0.18, advice: "Strong corporate balance sheets drive market rally." }
];

export const MarketSurvivalMode: React.FC<MarketSurvivalModeProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [capital, setCapital] = useState<number>(1000000); // ₹10 Lakhs
  const [equityAllocationPct, setEquityAllocationPct] = useState<number>(70); // 70% Equity, 30% Cash
  const [peakCapital, setPeakCapital] = useState<number>(1000000);
  const [maxDrawdown, setMaxDrawdown] = useState<number>(0);

  const [activeLog, setActiveLog] = useState<string[]>([
    "Week 1: Market Survival Challenge initialized with ₹10,00,000 capital."
  ]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleAdvanceWeek = () => {
    if (currentWeek >= 52 || isGameOver) return;

    const nextWeek = currentWeek + 1;
    let weekReturn = (Math.random() * 0.04) - 0.015; // Random fluctuation -1.5% to +2.5%

    // Check if a major survival event hits this week
    const event = SURVIVAL_EVENTS.find(e => e.week === nextWeek);
    if (event) {
      weekReturn = event.impact;
    }

    // Capital change depends on equity allocation %
    const portfolioChange = capital * (equityAllocationPct / 100) * weekReturn;
    const newCapital = Math.round(capital + portfolioChange);

    // Calculate peak & max drawdown
    const newPeak = Math.max(peakCapital, newCapital);
    const currentDrawdown = ((newPeak - newCapital) / newPeak) * 100;
    const newMaxDrawdown = Math.max(maxDrawdown, currentDrawdown);

    setCapital(newCapital);
    setPeakCapital(newPeak);
    setMaxDrawdown(Number(newMaxDrawdown.toFixed(1)));
    setCurrentWeek(nextWeek);

    let logMsg = `Week ${nextWeek}: Portfolio ${portfolioChange >= 0 ? "+" : ""}₹${Math.round(portfolioChange).toLocaleString('en-IN')} (${(weekReturn * (equityAllocationPct / 100) * 100).toFixed(1)}%). Balance: ₹${newCapital.toLocaleString('en-IN')}`;
    if (event) {
      logMsg = `🚨 Week ${nextWeek} EVENT: "${event.name}"! Impact: ${(event.impact * 100).toFixed(0)}%. ${logMsg}`;
    }

    setActiveLog(prev => [logMsg, ...prev.slice(0, 15)]);

    if (newCapital <= 400000) {
      setIsGameOver(true);
      setActiveLog(prev => ["❌ GAME OVER: Capital fell below ₹4,00,000 (60% loss). You were wiped out by excessive drawdown!", ...prev]);
    }
  };

  const handleResetSurvival = () => {
    setCurrentWeek(1);
    setCapital(1000000);
    setEquityAllocationPct(70);
    setPeakCapital(1000000);
    setMaxDrawdown(0);
    setIsGameOver(false);
    setActiveLog(["Week 1: Market Survival Challenge reset with ₹10,00,000 capital."]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20 uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Flagship Feature • 1-Year Capital Survival Challenge</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Market Survival Mode (52 Simulated Weeks)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Survive 52 weeks of unpredictable market crashes, interest rate spikes, and commodity shocks while managing risk.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Week</p>
            <p className="text-xl font-black text-amber-400">{currentWeek} / 52</p>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Current Capital</p>
            <p className="text-xl font-black text-emerald-400">₹{capital.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Allocation Control & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Manage Risk Exposure</h4>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Equity Risk Exposure</span>
              <span className="text-emerald-400">{equityAllocationPct}% Equity / {100 - equityAllocationPct}% Cash</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={equityAllocationPct}
              onChange={e => setEquityAllocationPct(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-400 font-bold">Peak Balance</p>
              <p className="text-sm font-black text-white mt-0.5">₹{peakCapital.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-400 font-bold">Max Drawdown</p>
              <p className={`text-sm font-black mt-0.5 ${maxDrawdown > 20 ? "text-rose-400" : "text-emerald-400"}`}>
                -{maxDrawdown}%
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdvanceWeek}
              disabled={currentWeek >= 52 || isGameOver}
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-all shadow-md shadow-emerald-500/20"
            >
              Advance 1 Week
            </button>
            <button
              onClick={handleResetSurvival}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Survival Logs */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Survival Activity Log</h4>
          <div className="space-y-1.5 text-xs text-slate-300 font-mono h-48 overflow-y-auto scrollbar-none">
            {activeLog.map((log, idx) => (
              <p key={idx} className="border-b border-slate-900 pb-1">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
