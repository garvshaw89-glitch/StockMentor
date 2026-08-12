import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Swords, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  Award,
  ArrowRight,
  Brain
} from "lucide-react";

interface ThesisChallengeAdversaryProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const DEBATE_STOCKS = [
  {
    symbol: "RELIANCE",
    companyName: "Reliance Industries Ltd",
    price: "₹2,984.50",
    bull: {
      title: "Consensus Bull Case",
      points: [
        "Retail & Jio digital ecosystem monetizing rapidly with 450M+ subscribers.",
        "Green Energy Giga-factories operationalization commencing in FY26.",
        "Free Cash Flow turning strongly positive following 5-year capex cycle."
      ]
    },
    bear: {
      title: "Consensus Bear Case",
      points: [
        "Traditional O2C (Oil-to-Chemical) refining margins compressing globally.",
        "Net Debt remains high with ongoing capital expenditures across retail and telecom.",
        "Valuation trades at a premium to historical 10-year EV/EBITDA multiples."
      ]
    }
  },
  {
    symbol: "TATAMOTORS",
    companyName: "Tata Motors Limited",
    price: "₹1,045.00",
    bull: {
      title: "Consensus Bull Case",
      points: [
        "JLR free cash flow generation hitting record highs with high-margin Range Rover order book.",
        "Market leader in Indian Passenger EV market with 70%+ market share.",
        "Net debt zero trajectory achieved at standalone level."
      ]
    },
    bear: {
      title: "Consensus Bear Case",
      points: [
        "EV growth rates moderating across US & European luxury markets.",
        "Increased price competition in domestic commercial vehicle market.",
        "High cyclical exposure to global macroeconomic slowdowns."
      ]
    }
  }
];

export const ThesisChallengeAdversary: React.FC<ThesisChallengeAdversaryProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [activeTab, setActiveTab] = useState<"challenge" | "debate">("challenge");

  // Challenge My Analysis state
  const [userThesis, setUserThesis] = useState<string>("I want to buy Reliance because revenue is growing 15% and price is trading above its 200-day EMA with low RSI.");
  const [isChallenging, setIsChallenging] = useState<boolean>(false);
  const [challengedOutput, setChallengedOutput] = useState<{
    bullCase: string;
    bearCase: string;
    missingInfo: string;
    keyRisks: string[];
    probeQuestions: string[];
  } | null>(null);

  // Bull vs Bear debate state
  const [selectedDebateStockIdx, setSelectedDebateStockIdx] = useState<number>(0);
  const [userRuling, setUserRuling] = useState<"BULL_WINS" | "BEAR_WINS" | "UNCLEAR" | null>(null);
  const [rulingReason, setRulingReason] = useState<string>("");
  const [rulingSubmitted, setRulingSubmitted] = useState<boolean>(false);

  const activeStock = DEBATE_STOCKS[selectedDebateStockIdx];

  const handleChallengeThesis = () => {
    setIsChallenging(true);
    setTimeout(() => {
      setChallengedOutput({
        bullCase: "Your thesis correctly identifies technical momentum above the 200-day EMA and steady top-line revenue expansion.",
        bearCase: "However, revenue growth without operating margin expansion can mask rising debt service costs.",
        missingInfo: "You haven't examined the EV/EBITDA valuation multiple relative to industry peers or debt-to-equity ratio.",
        keyRisks: [
          "Refining margin compression due to global crude volatility",
          "Rising capital expenditure slowing free cash flow generation",
          "Multiple compression if earnings miss analyst consensus"
        ],
        probeQuestions: [
          "Is the stock's price above its 200 EMA due to broad market index buying or company-specific profit growth?",
          "How would a 10% drop in refining margins impact the company's net profit?"
        ]
      });
      setIsChallenging(false);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 uppercase tracking-wider mb-2">
            <Swords className="w-3.5 h-3.5" />
            <span>Adversarial AI Thinking Arena</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Critical Thinking & Bull vs Bear Debate Arena
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Build unshakeable investment discipline by subjecting your trade theses to Wall Street short-seller challenges.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("challenge")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "challenge" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-white"
            }`}
          >
            Challenge My Analysis
          </button>
          <button
            onClick={() => setActiveTab("debate")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "debate" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-white"
            }`}
          >
            🐂 Bull vs 🐻 Bear AI Arena
          </button>
        </div>
      </div>

      {activeTab === "challenge" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              Submit Your Investment Thesis (Stock Name + Reason for BUY/SELL):
            </label>
            <textarea
              value={userThesis}
              onChange={e => setUserThesis(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-24 resize-none leading-relaxed"
              placeholder="e.g., I want to buy Stock X because revenue is growing and chart is breaking out..."
            />
            <button
              onClick={handleChallengeThesis}
              disabled={isChallenging || !userThesis.trim()}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
            >
              <Swords className="w-4 h-4" />
              <span>{isChallenging ? "AI Short Seller Analyzing..." : "I'll Challenge Your Thesis"}</span>
            </button>
          </div>

          {challengedOutput && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>AI Adversary Breakdown</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>🐂 Bull Case Validation</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">{challengedOutput.bullCase}</p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1">
                  <p className="font-bold text-rose-400 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    <span>🐻 Bear Case Counter-Argument</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">{challengedOutput.bearCase}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-2">
                <p className="font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>🔍 Missing Information & Key Risks</span>
                </p>
                <p className="text-slate-300">{challengedOutput.missingInfo}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pt-1">
                  {challengedOutput.keyRisks.map((rk, i) => (
                    <li key={i}>{rk}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <p className="font-bold text-indigo-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Socratic Probe Questions to Investigate Before Ordering</span>
                </p>
                <div className="space-y-2 pt-1">
                  {challengedOutput.probeQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => onOpenSocraticWithQuestion(q)}
                      className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center justify-between group transition-colors"
                    >
                      <span>{q}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "debate" && (
        <div className="space-y-6">
          {/* Stock Selector */}
          <div className="flex items-center gap-2">
            {DEBATE_STOCKS.map((st, i) => (
              <button
                key={st.symbol}
                onClick={() => {
                  setSelectedDebateStockIdx(i);
                  setRulingSubmitted(false);
                  setUserRuling(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  i === selectedDebateStockIdx ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "bg-slate-800 text-slate-400"
                }`}
              >
                {st.symbol} ({st.price})
              </button>
            ))}
          </div>

          {/* Faceoff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bull Analyst */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span>🐂 Bull Analyst AI</span>
                </span>
                <span className="text-xs text-slate-400 font-bold">{activeStock.symbol}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{activeStock.bull.title}</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeStock.bull.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bear Analyst */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30 flex items-center gap-1">
                  <span>🐻 Bear Analyst AI</span>
                </span>
                <span className="text-xs text-slate-400 font-bold">{activeStock.symbol}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{activeStock.bear.title}</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeStock.bear.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Judge Decision */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>👨‍⚖️ You Are The Judge — Deliver Your Ruling</span>
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { id: "BULL_WINS", label: "🐂 Bull Case Wins", cls: "bg-emerald-500 text-black font-extrabold" },
                { id: "BEAR_WINS", label: "🐻 Bear Case Wins", cls: "bg-rose-500 text-white font-extrabold" },
                { id: "UNCLEAR", label: "⚖️ Unclear / Needs More Margin of Safety", cls: "bg-amber-500 text-black font-extrabold" }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setUserRuling(opt.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs transition-all ${
                    userRuling === opt.id ? opt.cls + " shadow-lg" : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <textarea
              value={rulingReason}
              onChange={e => setRulingReason(e.target.value)}
              placeholder="Explain why you chose this ruling..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-20 resize-none"
            />

            <button
              onClick={() => setRulingSubmitted(true)}
              disabled={!userRuling || !rulingReason.trim()}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20"
            >
              Submit Judicial Ruling
            </button>

            {rulingSubmitted && (
              <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 text-xs text-slate-200 space-y-1">
                <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ruling Accepted!</span>
                </p>
                <p className="text-slate-300">
                  Your judgment demonstrates sound evaluation of risk-reward asymmetry. Balancing opposing bull and bear theses prevents confirmation bias.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
