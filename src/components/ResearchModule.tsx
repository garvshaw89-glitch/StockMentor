import React, { useState } from "react";
import { StockData, UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { ANALYST_CHALLENGES } from "../data/challenges";
import { 
  Search, 
  Brain, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Building2, 
  BarChart3, 
  Sparkles,
  Award,
  ArrowRight
} from "lucide-react";

interface ResearchModuleProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const ResearchModule: React.FC<ResearchModuleProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<StockData>(STOCKS_DATA[0]);
  const [report, setReport] = useState<any | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // "You Are the Analyst" State
  const [activeAnalystChallengeIdx, setActiveAnalystChallengeIdx] = useState(0);
  const [userDecision, setUserDecision] = useState<"BUY" | "HOLD" | "SELL" | null>(null);
  const [userReasoning, setUserReasoning] = useState("");
  const [evalResult, setEvalResult] = useState<any | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  const filteredStocks = STOCKS_DATA.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nseSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.bseSymbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateResearchReport = async (stock: StockData) => {
    setLoadingReport(true);
    setReport(null);

    try {
      const response = await fetch("/api/ai/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: stock.symbol,
          name: stock.name,
          pe: stock.pe,
          eps: stock.eps,
          roe: stock.roe,
          roce: stock.roce,
          debtToEquity: stock.debtToEquity,
          revenueGrowth: stock.revenueGrowth,
          profitGrowth: stock.profitGrowth,
          currentPrice: stock.price,
          sector: stock.sector
        })
      });

      const data = await response.json();
      if (data.report) {
        setReport(data.report);
      }
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleEvaluateAnalystDecision = async () => {
    if (!userDecision || !userReasoning.trim()) return;

    const challenge = ANALYST_CHALLENGES[activeAnalystChallengeIdx];
    setEvaluating(true);
    setEvalResult(null);

    try {
      const response = await fetch("/api/ai/eval-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockName: challenge.stockName,
          decision: userDecision,
          userReasoning,
          financialData: {
            pe: challenge.pe,
            industryPE: challenge.industryPE,
            revenueGrowth: challenge.revenueGrowth,
            profitGrowth: challenge.profitGrowth,
            debtToEquity: challenge.debtToEquity,
            roe: challenge.roe
          }
        })
      });

      const data = await response.json();
      if (data.evaluation) {
        setEvalResult(data.evaluation);
      }
    } catch (err) {
      console.error("Error evaluating reasoning:", err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Title & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Search className="w-6 h-6 text-emerald-600" />
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Stock Research & Fundamental Terminal
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Search equities by NSE, BSE or Company Name. Generates 7-part AI Stock Reports and interactive decision exercises.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Timestamp: {selectedStock.timestamp}</span>
            </span>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Reliance, TCS, Infosys, NVDA, HDFCBANK..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Quick Ticker Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0">Popular:</span>
          {filteredStocks.map(s => (
            <button
              key={s.symbol}
              onClick={() => {
                setSelectedStock(s);
                setReport(null);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all shrink-0 ${
                selectedStock.symbol === s.symbol
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              {s.symbol} (₹{s.price})
            </button>
          ))}
        </div>
      </div>

      {/* Stock Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {selectedStock.name}
              </h2>
              <span className="px-2 py-0.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                NSE: {selectedStock.nseSymbol}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {selectedStock.sector} • {selectedStock.industry} • Market Cap: {selectedStock.marketCap}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{selectedStock.price.toLocaleString()}
            </span>
            <div className={`text-xs font-bold flex items-center sm:justify-end gap-1 ${
              selectedStock.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}>
              <span>{selectedStock.change >= 0 ? "+" : ""}{selectedStock.change} ({selectedStock.changePercent}%)</span>
            </div>
          </div>
        </div>

        {/* Fundamental Ratios Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-slate-400 block font-medium">P/E Ratio</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedStock.pe}x</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-slate-400 block font-medium">EPS</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">₹{selectedStock.eps}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-slate-400 block font-medium">ROE</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedStock.roe}%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-slate-400 block font-medium">ROCE</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedStock.roce}%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-slate-400 block font-medium">Debt-to-Equity</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedStock.debtToEquity}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-slate-400 block font-medium">Revenue Growth</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">+{selectedStock.revenueGrowth}%</span>
          </div>
        </div>

        {/* Generate AI Research Report Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleGenerateResearchReport(selectedStock)}
            disabled={loadingReport}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <Brain className="w-4 h-4" />
            <span>{loadingReport ? "Generating 7-Part AI Research Report..." : "Generate AI Stock Research Report"}</span>
          </button>
        </div>

        {/* AI Stock Research Report Display */}
        {report && (
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-5 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                StockMentor AI Research Report — {selectedStock.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  1. Business Overview
                </h4>
                <p>{report.businessOverview}</p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  2. Fundamental Analysis
                </h4>
                <p>{report.fundamentalAnalysis}</p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  3. Technical Analysis
                </h4>
                <p>{report.technicalAnalysis}</p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  4. Risk Analysis
                </h4>
                <p>{report.riskAnalysis}</p>
              </div>

              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-1">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-sm">
                  5. Bull Case
                </h4>
                <p>{report.bullCase}</p>
              </div>

              <div className="p-4 bg-rose-50/60 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900 space-y-1">
                <h4 className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 text-sm">
                  6. Bear Case
                </h4>
                <p>{report.bearCase}</p>
              </div>
            </div>

            {/* Investor Checklist */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>7. Investor Verification Checklist:</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {report.investorChecklist?.map((item: string, i: number) => (
                  <li key={i} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-start gap-2">
                    <span className="font-bold text-emerald-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* "You Are the Analyst" Educational Exercise Module */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                "You Are the Analyst" Educational Exercise
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Analyze company data, choose BUY / HOLD / SELL, defend your reasoning, and get AI feedback.
            </p>
          </div>

          <div className="flex items-center gap-1">
            {ANALYST_CHALLENGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveAnalystChallengeIdx(idx);
                  setUserDecision(null);
                  setUserReasoning("");
                  setEvalResult(null);
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                  activeAnalystChallengeIdx === idx
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Case #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {(() => {
          const c = ANALYST_CHALLENGES[activeAnalystChallengeIdx];

          return (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    {c.stockName} ({c.sector})
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Stock Price: ₹{c.price}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border">
                    <span className="text-slate-400 block">P/E vs Industry</span>
                    <span className="font-bold text-slate-900 dark:text-white">{c.pe}x vs {c.industryPE}x</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border">
                    <span className="text-slate-400 block">Revenue / Profit Growth</span>
                    <span className="font-bold text-emerald-600">+{c.revenueGrowth}% / {c.profitGrowth}%</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border">
                    <span className="text-slate-400 block">Debt-to-Equity / ROE</span>
                    <span className="font-bold text-slate-900 dark:text-white">{c.debtToEquity} / {c.roe}%</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border">
                    <span className="text-slate-400 block">Chart Pattern</span>
                    <span className="font-bold text-slate-900 dark:text-white">{c.chartTrend}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "{c.financialSummary}"
                </p>
              </div>

              {/* Decision Buttons */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Step 1: Make your educational decision:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setUserDecision("BUY")}
                    className={`py-3 rounded-xl font-extrabold text-xs transition-all border ${
                      userDecision === "BUY"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => setUserDecision("HOLD")}
                    className={`py-3 rounded-xl font-extrabold text-xs transition-all border ${
                      userDecision === "HOLD"
                        ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    HOLD
                  </button>
                  <button
                    onClick={() => setUserDecision("SELL")}
                    className={`py-3 rounded-xl font-extrabold text-xs transition-all border ${
                      userDecision === "SELL"
                        ? "bg-rose-600 text-white border-rose-600 shadow-md"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    SELL
                  </button>
                </div>
              </div>

              {/* Reasoning Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Step 2: Defend your decision — Why did you choose {userDecision || "this"}?
                </label>
                <textarea
                  rows={3}
                  value={userReasoning}
                  onChange={e => setUserReasoning(e.target.value)}
                  placeholder="e.g., Revenue is growing 18%, debt is very low (0.12), and P/E is cheaper than industry median..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleEvaluateAnalystDecision}
                disabled={!userDecision || !userReasoning.trim() || evaluating}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>{evaluating ? "AI Evaluating Analytical Reasoning..." : "Submit Reasoning & Get AI Feedback"}</span>
              </button>

              {/* Evaluation Result Display */}
              {evalResult && (
                <div className="p-5 bg-indigo-50/80 dark:bg-indigo-950/50 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 space-y-3 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between border-b border-indigo-200 dark:border-indigo-900 pb-2">
                    <span className="font-bold text-sm text-indigo-950 dark:text-indigo-200">
                      AI Tutor Evaluation Feedback
                    </span>
                    <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-black rounded text-xs">
                      Score: {evalResult.score}/100
                    </span>
                  </div>

                  <p className="text-slate-800 dark:text-slate-200">
                    <strong className="text-emerald-600 dark:text-emerald-400">What You Got Right: </strong>
                    {evalResult.praise}
                  </p>

                  <p className="text-slate-800 dark:text-slate-200">
                    <strong className="text-amber-600 dark:text-amber-400">Constructive Feedback: </strong>
                    {evalResult.constructiveFeedback}
                  </p>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-900 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white">Ideal Institutional Analysis:</span>
                    <p className="text-slate-600 dark:text-slate-300">{evalResult.idealAnalysis}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};
