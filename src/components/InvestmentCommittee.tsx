import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Users, 
  Sparkles, 
  BarChart2, 
  TrendingUp, 
  Globe, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle,
  Award,
  ArrowRight
} from "lucide-react";

interface InvestmentCommitteeProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export const COMMITTEE_STOCKS = [
  { symbol: "TATAMOTORS", name: "Tata Motors Limited", sector: "Auto & EV" },
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Conglomerate & Energy" },
  { symbol: "HDFCBANK", name: "HDFC Bank Limited", sector: "Banking & Financials" },
  { symbol: "INFY", name: "Infosys Limited", sector: "IT Software Exports" }
];

export const InvestmentCommittee: React.FC<InvestmentCommitteeProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [selectedStockIdx, setSelectedStockIdx] = useState<number>(0);
  const [isDebating, setIsDebating] = useState<boolean>(false);
  const [hasDebated, setHasDebated] = useState<boolean>(true);

  const activeStock = COMMITTEE_STOCKS[selectedStockIdx];

  const committeeMembers = [
    {
      role: "Fundamental Analyst AI",
      avatar: "📊",
      vote: "BUY",
      score: 88,
      color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-400",
      argument: "Operating cash flows exceed net profit by 1.2x. Free cash flow turning strongly positive following JLR debt reduction."
    },
    {
      role: "Technical Analyst AI",
      avatar: "📈",
      vote: "BUY",
      score: 84,
      color: "border-indigo-500/40 bg-indigo-950/20 text-indigo-400",
      argument: "Stock is forming a higher-high higher-low structure above 50-day EMA with 2x average daily volume expansion."
    },
    {
      role: "Macro & Industry AI",
      avatar: "🌐",
      vote: "HOLD",
      score: 72,
      color: "border-amber-500/40 bg-amber-950/20 text-amber-400",
      argument: "High interest rate environment in Western Europe may moderate luxury auto demand in Q3, though domestic EV market remains strong."
    },
    {
      role: "Chief Risk Manager AI",
      avatar: "🛡️",
      vote: "BUY",
      score: 82,
      color: "border-rose-500/40 bg-rose-950/20 text-rose-400",
      argument: "Risk-to-reward ratio is attractive at 1:3.2 provided stop loss is strictly enforced at ₹960."
    }
  ];

  const handleRunDebate = () => {
    setIsDebating(true);
    setTimeout(() => {
      setIsDebating(false);
      setHasDebated(true);
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Flagship Feature • Multi-Agent AI Debate</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            AI Investment Committee Deliberation
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Watch Fundamental, Technical, Macro, and Risk AI specialists debate a stock before reaching an institutional consensus report.
          </p>
        </div>

        {/* Stock Selector */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
          {COMMITTEE_STOCKS.map((st, i) => (
            <button
              key={st.symbol}
              onClick={() => {
                setSelectedStockIdx(i);
                handleRunDebate();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                i === selectedStockIdx ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-white"
              }`}
            >
              {st.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Committee Deliberation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {committeeMembers.map((member, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border space-y-3 transition-all ${member.color}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{member.avatar}</span>
                <span className="font-extrabold text-xs text-white">{member.role}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-white text-[10px] font-black border border-slate-800">
                Vote: {member.vote} ({member.score}/100)
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "{member.argument}"
            </p>
          </div>
        ))}
      </div>

      {/* Institutional Consensus Report */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Consensus Deliberation Outcome</span>
            <h4 className="text-xl font-extrabold text-white mt-1">Investment Committee Call: ACCUMULATE / BUY</h4>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            3-1 Majority Consensus
          </span>
        </div>

        <div className="text-xs text-slate-300 space-y-2">
          <p className="font-bold text-white">Unified Institutional Action Plan:</p>
          <p className="leading-relaxed">
            The committee approves adding {activeStock.name} ({activeStock.symbol}) up to a 5% portfolio allocation on dips near the 20-day EMA support, with a mandatory stop-loss at ₹960 to guard against macroeconomic headwinds.
          </p>
        </div>
      </div>
    </div>
  );
};
