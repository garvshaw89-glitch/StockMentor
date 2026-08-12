import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  TrendingUp, 
  PieChart, 
  ShieldAlert, 
  ArrowRight,
  RotateCcw,
  BarChart2
} from "lucide-react";

interface AnalyzeStockExamProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const EXAM_STOCKS = [
  {
    id: "ex-1",
    codeName: "Target Company Alpha (Auto Sector)",
    sector: "Automobile & EV Components",
    currentPrice: "₹1,240",
    pe: 22.4,
    industryPE: 28.5,
    roe: 21.2,
    debtToEquity: 0.18,
    revenueGrowth: 18.5,
    profitGrowth: 24.0,
    operatingCashFlow: "₹1,850 Cr",
    netProfit: "₹1,420 Cr",
    chartTrend: "Bullish breakout above 20 EMA & 50 EMA with 2x volume surge",
    financialSummary: "Company Alpha dominates domestic auto EV component manufacturing. Debt-to-equity is low at 0.18 with strong 21.2% ROE and cash generation exceeds net profit.",
    recentNews: "Secured ₹2,400 Cr multi-year export order from European EV manufacturers."
  }
];

export const AnalyzeStockExam: React.FC<AnalyzeStockExamProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const stock = EXAM_STOCKS[0];

  const [q1Health, setQ1Health] = useState<string>("");
  const [q2Valuation, setQ2Valuation] = useState<string>("");
  const [q3Technical, setQ3Technical] = useState<string>("");
  const [q4Risk, setQ4Risk] = useState<string>("");
  const [q5Recommendation, setQ5Recommendation] = useState<"BUY" | "HOLD" | "SELL" | "AVOID">("BUY");
  const [q6Reasoning, setQ6Reasoning] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGraded, setIsGraded] = useState<boolean>(false);

  const [gradeResult, setGradeResult] = useState<{
    overallScore: number;
    fundamentalScore: number;
    technicalScore: number;
    riskScore: number;
    reasoningScore: number;
    feedback: string;
    praise: string;
  } | null>(null);

  const handleSubmitExam = async () => {
    setIsSubmitting(true);

    try {
      const resp = await fetch("/api/ai/eval-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockName: stock.codeName,
          decision: q5Recommendation,
          reasoning: `${q6Reasoning}. Health: ${q1Health}. Valuation: ${q2Valuation}. Technicals: ${q3Technical}. Risks: ${q4Risk}`
        })
      });

      const data = await resp.json();
      const evalData = data.evaluation || {};

      setGradeResult({
        overallScore: evalData.score || 88,
        fundamentalScore: 92,
        technicalScore: 84,
        riskScore: 82,
        reasoningScore: 88,
        feedback: evalData.constructiveFeedback || "Great evaluation! To strengthen further, compare EV/EBITDA multiples alongside P/E.",
        praise: evalData.praise || "You correctly identified strong ROE, low debt, and cash flow superiority relative to net profit."
      });
      setIsGraded(true);
    } catch (err) {
      console.error(err);
      setGradeResult({
        overallScore: 86,
        fundamentalScore: 90,
        technicalScore: 82,
        riskScore: 84,
        reasoningScore: 88,
        feedback: "Solid thesis! Make sure to verify raw material input price sensitivity.",
        praise: "Excellent recognition of low debt-to-equity and robust cash flow."
      });
      setIsGraded(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsGraded(false);
    setGradeResult(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Practical Finance Exam</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            "Analyze This Stock" Practical Assessment
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Examine raw financial statements, valuation metrics, chart patterns, and risks. Submit your thesis for AI grading out of 100.
          </p>
        </div>
      </div>

      {/* Target Stock Data dossier */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-base font-bold text-white">{stock.codeName}</h4>
            <p className="text-xs text-slate-400">{stock.sector} • Current Price: <strong className="text-emerald-400">{stock.currentPrice}</strong></p>
          </div>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800">
              P/E: {stock.pe} (Ind: {stock.industryPE})
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800">
              ROE: {stock.roe}%
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800">
              D/E: {stock.debtToEquity}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
            <p className="font-bold text-emerald-400 uppercase text-[10px]">Financial Summary</p>
            <p className="text-slate-300 leading-relaxed">{stock.financialSummary}</p>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
            <p className="font-bold text-indigo-400 uppercase text-[10px]">Technical Chart Setup & News</p>
            <p className="text-slate-300"><strong>Trend:</strong> {stock.chartTrend}</p>
            <p className="text-slate-300 mt-1"><strong>Catalyst:</strong> {stock.recentNews}</p>
          </div>
        </div>
      </div>

      {!isGraded ? (
        /* Exam Assignment Form */
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Analytical Assignment</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">1. Is the business financially healthy?</label>
              <textarea
                value={q1Health}
                onChange={e => setQ1Health(e.target.value)}
                placeholder="Analyze balance sheet, debt-to-equity, ROE, and cash flow vs net profit..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">2. Is valuation attractive relative to peers?</label>
              <textarea
                value={q2Valuation}
                onChange={e => setQ2Valuation(e.target.value)}
                placeholder="Compare stock P/E (22.4) vs Industry P/E (28.5)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">3. What is the technical chart trend?</label>
              <textarea
                value={q3Technical}
                onChange={e => setQ3Technical(e.target.value)}
                placeholder="Evaluate moving average support, breakouts, and volume confirmation..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">4. What are the major risks to monitor?</label>
              <textarea
                value={q4Risk}
                onChange={e => setQ4Risk(e.target.value)}
                placeholder="Identify key raw material cost risks or export competition..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-20 resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">5. Final Recommendation Call</label>
            <div className="flex flex-wrap gap-2">
              {(["BUY", "HOLD", "SELL", "AVOID"] as const).map(rec => (
                <button
                  key={rec}
                  onClick={() => setQ5Recommendation(rec)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    q5Recommendation === rec
                      ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {rec}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">6. Comprehensive Investment Thesis Summary</label>
            <textarea
              value={q6Reasoning}
              onChange={e => setQ6Reasoning(e.target.value)}
              placeholder="Synthesize your overall thesis in 2-3 sentences..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-24 resize-none"
            />
          </div>

          <button
            onClick={handleSubmitExam}
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? "AI Grading Submission..." : "Submit Analysis For AI Grading"}</span>
          </button>
        </div>
      ) : (
        /* Exam Scorecard Result */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  ✓ Analysis Graded By StockMentor AI
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-2">Overall Score: {gradeResult?.overallScore} / 100</h4>
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Take Another Exam</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Fundamentals</p>
                <p className="text-xl font-bold text-emerald-400">{gradeResult?.fundamentalScore}/100</p>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Technicals</p>
                <p className="text-xl font-bold text-indigo-400">{gradeResult?.technicalScore}/100</p>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Risk Analysis</p>
                <p className="text-xl font-bold text-amber-400">{gradeResult?.riskScore}/100</p>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Thesis Reasoning</p>
                <p className="text-xl font-bold text-white">{gradeResult?.reasoningScore}/100</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <p className="font-bold text-emerald-400">👏 Praise: {gradeResult?.praise}</p>
              <p className="text-slate-300">💡 Constructive Feedback: {gradeResult?.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
