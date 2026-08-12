import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Briefcase, 
  DollarSign, 
  ShieldAlert, 
  RotateCcw, 
  Sparkles, 
  PieChart, 
  TrendingUp, 
  CheckCircle2, 
  BookOpen, 
  FileText
} from "lucide-react";

interface VirtualFundManagerProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const VirtualFundManager: React.FC<VirtualFundManagerProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [largeCapPct, setLargeCapPct] = useState<number>(50);
  const [midCapPct, setMidCapPct] = useState<number>(25);
  const [debtPct, setDebtPct] = useState<number>(15);
  const [cashPct, setCashPct] = useState<number>(10);

  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [eventImpact, setEventImpact] = useState<{ returnPct: number; drawdownPct: number; advice: string } | null>(null);

  const totalCapital = 10000000; // ₹1 Crore (100 Lakhs)

  const handleRunStressTest = (eventName: string) => {
    setActiveEvent(eventName);

    if (eventName === "Inflation & Rate Hike") {
      // Debt and Cash hold up well, Midcaps hit hardest
      const ret = (largeCapPct * -0.05 + midCapPct * -0.14 + debtPct * 0.02 + cashPct * 0.0) / 100 * 100;
      setEventImpact({
        returnPct: Number(ret.toFixed(1)),
        drawdownPct: 12.4,
        advice: "Higher interest rates increase corporate cost of capital. Mid-caps suffer margin contraction. Increasing allocation to Cash & Short-Term Debt buffers overall drawdown."
      });
    } else if (eventName === "Global Recession & Oil Shock") {
      const ret = (largeCapPct * -0.12 + midCapPct * -0.22 + debtPct * 0.04 + cashPct * 0.0) / 100 * 100;
      setEventImpact({
        returnPct: Number(ret.toFixed(1)),
        drawdownPct: 18.2,
        advice: "Oil shocks compress operating margins across autos, paints, and chemicals. High cash holdings allowed buying quality bluechips at 20%+ discounts."
      });
    } else if (eventName === "Corporate Earnings Boom") {
      const ret = (largeCapPct * 0.15 + midCapPct * 0.28 + debtPct * 0.03 + cashPct * 0.0) / 100 * 100;
      setEventImpact({
        returnPct: Number(ret.toFixed(1)),
        drawdownPct: 2.1,
        advice: "Mid-cap earnings expansion outperformed large caps. Maintaining a 25% mid-cap exposure captured high operating leverage growth."
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Virtual Institutional Fund Manager</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            ₹1 Crore Virtual Capital Portfolio Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Construct an asset allocation strategy across Large-Cap, Mid-Cap, Debt, and Cash. Stress test against real macro shock events.
          </p>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Total Managed Capital</p>
          <p className="text-xl font-black text-emerald-400">₹1,00,00,000 (₹1 Cr)</p>
        </div>
      </div>

      {/* Asset Allocation Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Construct Asset Allocation</h4>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Large-Cap Bluechips</span>
              <span className="text-emerald-400">{largeCapPct}% (₹{((totalCapital * largeCapPct)/100/100000).toFixed(1)} L)</span>
            </div>
            <input type="range" min="0" max="100" value={largeCapPct} onChange={e => setLargeCapPct(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Mid-Cap High Growth</span>
              <span className="text-emerald-400">{midCapPct}% (₹{((totalCapital * midCapPct)/100/100000).toFixed(1)} L)</span>
            </div>
            <input type="range" min="0" max="100" value={midCapPct} onChange={e => setMidCapPct(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Fixed Income & Bonds</span>
              <span className="text-emerald-400">{debtPct}% (₹{((totalCapital * debtPct)/100/100000).toFixed(1)} L)</span>
            </div>
            <input type="range" min="0" max="100" value={debtPct} onChange={e => setDebtPct(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Liquid Cash Reserve</span>
              <span className="text-emerald-400">{cashPct}% (₹{((totalCapital * cashPct)/100/100000).toFixed(1)} L)</span>
            </div>
            <input type="range" min="0" max="100" value={cashPct} onChange={e => setCashPct(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
        </div>

        {/* Stress Test Events Launcher */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Trigger Macro Stress Test Events</h4>
            <p className="text-xs text-slate-400 mt-1">Simulate how your portfolio survives major economic shocks:</p>
          </div>

          <div className="space-y-2">
            {[
              "Inflation & Rate Hike",
              "Global Recession & Oil Shock",
              "Corporate Earnings Boom"
            ].map(ev => (
              <button
                key={ev}
                onClick={() => handleRunStressTest(ev)}
                className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  activeEvent === ev ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                ⚡ Trigger Event: {ev}
              </button>
            ))}
          </div>

          {eventImpact && (
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">Impact Summary: {activeEvent}</span>
                <span className={`font-black ${eventImpact.returnPct >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {eventImpact.returnPct >= 0 ? "+" : ""}{eventImpact.returnPct}% Impact
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{eventImpact.advice}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
