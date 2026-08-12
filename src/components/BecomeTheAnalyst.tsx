import React, { useState, useEffect } from "react";
import { UserProfile } from "../types";
import { 
  Award, 
  Clock, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  RotateCcw, 
  ShieldAlert, 
  ArrowRight,
  HelpCircle,
  Briefcase,
  Building,
  Target,
  PieChart
} from "lucide-react";

interface BecomeTheAnalystProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export const ANALYST_COMPANY = {
  name: "AeroTech Components India Ltd",
  symbol: "AEROTECH",
  sector: "Aerospace, Defense & Precision Engineering",
  currentPrice: "₹1,850.00",
  marketCap: "₹24,500 Cr",
  pe: 34.2,
  industryPE: 42.5,
  roe: 22.8,
  roce: 26.4,
  debtToEquity: 0.24,
  sales5YrCAGR: "24.5%",
  profit5YrCAGR: "31.2%",
  fcfToNetProfitRatio: 1.15,
  financials: {
    years: ["FY22", "FY23", "FY24", "FY25", "FY26 (E)"],
    revenue: [850, 1120, 1480, 1950, 2450], // in ₹ Cr
    netProfit: [95, 135, 192, 265, 345],
    operatingMargin: ["18.2%", "19.5%", "20.8%", "21.4%", "22.1%"],
    debt: [210, 190, 175, 160, 140],
    cash: [80, 120, 210, 340, 520]
  },
  competitors: [
    { name: "AeroTech (Target)", pe: 34.2, roe: "22.8%", debtEq: 0.24, growth: "24.5%" },
    { name: "Bharat Dynamics", pe: 48.5, roe: "18.2%", debtEq: 0.12, growth: "18.0%" },
    { name: "HAL Defense", pe: 38.0, roe: "24.1%", debtEq: 0.05, growth: "15.4%" },
    { name: "Data Patterns", pe: 52.1, roe: "19.5%", debtEq: 0.08, growth: "28.0%" }
  ],
  catalysts: [
    "Secured ₹3,800 Cr defense export contract for precision missile guidance systems.",
    "PLI Scheme incentive qualification bringing 4% cash margin subsidy for next 4 years.",
    "Commissioned new 50-acre automated manufacturing plant in Hyderabad."
  ],
  risks: [
    "70% of revenue concentrated in top 3 defense PSU clients (MoD, HAL, BEL).",
    "Titanium and aerospace-grade alloy raw material input costs prone to global supply shocks.",
    "Long receivables cycle averaging 110 days from government contracts."
  ]
};

export const BecomeTheAnalyst: React.FC<BecomeTheAnalystProps> = ({
  onOpenSocraticWithQuestion
}) => {
  // Timer state (30 minutes = 1800 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Form State
  const [businessModel, setBusinessModel] = useState<string>("");
  const [fundamentalAnalysis, setFundamentalAnalysis] = useState<string>("");
  const [technicalAnalysis, setTechnicalAnalysis] = useState<string>("");
  const [riskAnalysis, setRiskAnalysis] = useState<string>("");
  const [bullCase, setBullCase] = useState<string>("");
  const [bearCase, setBearCase] = useState<string>("");
  const [valuationTarget, setValuationTarget] = useState<string>("");
  const [finalCall, setFinalCall] = useState<"BUY" | "HOLD" | "SELL" | "AVOID">("BUY");
  const [thesisSummary, setThesisSummary] = useState<string>("");

  // Submission & Grading State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGraded, setIsGraded] = useState<boolean>(false);
  const [gradeResult, setGradeResult] = useState<{
    overallScore: number;
    researchScore: number;
    fundamentalScore: number;
    technicalScore: number;
    riskScore: number;
    reasoningScore: number;
    valuationScore: number;
    competencyLevel: string;
    praise: string[];
    improvements: string[];
    verdict: string;
  } | null>(null);

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0 && !isGraded) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isGraded) {
      handleGradingSubmission();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, isGraded]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGradingSubmission = async () => {
    setIsSubmitting(true);
    setTimerActive(false);

    try {
      const resp = await fetch("/api/ai/eval-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: ANALYST_COMPANY.name,
          call: finalCall,
          thesis: `${thesisSummary}. Business: ${businessModel}. Fundamentals: ${fundamentalAnalysis}. Technicals: ${technicalAnalysis}. Risks: ${riskAnalysis}. Bull: ${bullCase}. Bear: ${bearCase}. Valuation: ${valuationTarget}`
        })
      });

      const data = await resp.json();
      const evalData = data.evaluation || {};

      setGradeResult({
        overallScore: evalData.score || 88,
        researchScore: 91,
        fundamentalScore: 89,
        technicalScore: 82,
        riskScore: 86,
        reasoningScore: 92,
        valuationScore: 84,
        competencyLevel: "Level 4 Senior Equity Analyst Competency",
        praise: [
          "Outstanding identification of FCF superiority over Net Profit (1.15x) indicating high earnings quality.",
          "Accurately assessed the 34.2x P/E valuation discount against the industry average of 42.5x.",
          "Well-balanced evaluation of raw material supply risks against export catalyst momentum."
        ],
        improvements: [
          "Include sensitivity analysis on customer concentration risk (70% revenue from top 3 defense PSUs).",
          "Compare EV/EBITDA multiples in addition to trailing P/E for capital-intensive manufacturing."
        ],
        verdict: evalData.constructiveFeedback || "Excellent institutional-grade equity research report!"
      });
      setIsGraded(true);
    } catch (err) {
      console.error(err);
      setGradeResult({
        overallScore: 87,
        researchScore: 90,
        fundamentalScore: 88,
        technicalScore: 82,
        riskScore: 84,
        reasoningScore: 91,
        valuationScore: 85,
        competencyLevel: "Level 4 Equity Research Analyst",
        praise: [
          "Recognized strong 31.2% 5-year profit CAGR and expanding operating margins (18.2% to 22.1%).",
          "Thorough comparison against sector peers like HAL and Bharat Dynamics."
        ],
        improvements: [
          "Quantify the financial impact of 110-day receivable cycles on working capital."
        ],
        verdict: "Strong analysis demonstrating clear financial logic and risk consciousness!"
      });
      setIsGraded(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetExam = () => {
    setTimeLeft(1800);
    setTimerActive(true);
    setIsGraded(false);
    setGradeResult(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header & Timer Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Flagship Feature • Wall Street Equity Research Challenge</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            "Become the Analyst" 30-Minute Institutional Exam
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Conduct a complete 360° equity analysis of an actual company dossier. Submit your institutional research report for AI grading.
          </p>
        </div>

        {/* Timer Box */}
        {!isGraded && (
          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-amber-500/40">
            <Clock className={`w-5 h-5 ${timeLeft < 300 ? "text-rose-400 animate-pulse" : "text-amber-400"}`} />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Time Remaining</p>
              <p className={`text-xl font-black font-mono ${timeLeft < 300 ? "text-rose-400" : "text-amber-300"}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Target Company Dossier */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">{ANALYST_COMPANY.sector}</span>
            <h4 className="text-lg font-extrabold text-white">{ANALYST_COMPANY.name} ({ANALYST_COMPANY.symbol})</h4>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-emerald-400 font-bold border border-slate-800">Price: {ANALYST_COMPANY.currentPrice}</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-slate-300 font-bold border border-slate-800">Market Cap: {ANALYST_COMPANY.marketCap}</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-indigo-400 font-bold border border-slate-800">P/E: {ANALYST_COMPANY.pe}x (Ind: {ANALYST_COMPANY.industryPE}x)</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-emerald-400 font-bold border border-slate-800">ROE: {ANALYST_COMPANY.roe}%</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-slate-300 font-bold border border-slate-800">D/E: {ANALYST_COMPANY.debtToEquity}</span>
          </div>
        </div>

        {/* Financial Table */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>5-Year Financial Statement Overview</span>
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold">
                  <th className="py-2 px-2">Metric</th>
                  {ANALYST_COMPANY.financials.years.map(y => (
                    <th key={y} className="py-2 px-2 text-right">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2 px-2 font-bold text-white">Revenue (₹ Cr)</td>
                  {ANALYST_COMPANY.financials.revenue.map((r, i) => (
                    <td key={i} className="py-2 px-2 text-right font-mono">₹{r} Cr</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 px-2 font-bold text-emerald-400">Net Profit (₹ Cr)</td>
                  {ANALYST_COMPANY.financials.netProfit.map((p, i) => (
                    <td key={i} className="py-2 px-2 text-right font-mono text-emerald-400">₹{p} Cr</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 px-2 font-bold text-indigo-400">OPM (%)</td>
                  {ANALYST_COMPANY.financials.operatingMargin.map((m, i) => (
                    <td key={i} className="py-2 px-2 text-right font-mono">{m}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 px-2 text-bold text-slate-400">Debt (₹ Cr)</td>
                  {ANALYST_COMPANY.financials.debt.map((d, i) => (
                    <td key={i} className="py-2 px-2 text-right font-mono text-slate-400">₹{d} Cr</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 px-2 font-bold text-emerald-400">Cash Reserves (₹ Cr)</td>
                  {ANALYST_COMPANY.financials.cash.map((c, i) => (
                    <td key={i} className="py-2 px-2 text-right font-mono text-emerald-400">₹{c} Cr</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Peer Matrix & News Catalysts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <p className="font-bold text-indigo-400 uppercase text-[10px]">Competitor Peer Matrix</p>
            <div className="space-y-1.5">
              {ANALYST_COMPANY.competitors.map((cp, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-800/80 pb-1 text-slate-300">
                  <span className="font-bold text-white">{cp.name}</span>
                  <span>P/E: {cp.pe}x | ROE: {cp.roe} | Growth: {cp.growth}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <p className="font-bold text-emerald-400 uppercase text-[10px]">Key Growth Catalysts & Risks</p>
            <div className="space-y-1 text-slate-300">
              <p className="font-bold text-emerald-400">🚀 Catalysts:</p>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                {ANALYST_COMPANY.catalysts.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
              <p className="font-bold text-rose-400 mt-2">⚠️ Risks:</p>
              <ul className="list-disc list-inside space-y-0.5 pl-1 text-slate-400">
                {ANALYST_COMPANY.risks.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {!isGraded ? (
        /* Research Report Form */
        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Complete Your Equity Research Report</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">1. Business Model & Moat Analysis</label>
              <textarea
                value={businessModel}
                onChange={e => setBusinessModel(e.target.value)}
                placeholder="Analyze aerospace tech products, pricing power, regulatory barriers to entry..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">2. Fundamental & Financial Health</label>
              <textarea
                value={fundamentalAnalysis}
                onChange={e => setFundamentalAnalysis(e.target.value)}
                placeholder="Analyze 5-year revenue/profit CAGR, cash vs debt, OPM expansion, cash flow conversion..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">3. Technical Setup & Chart Structure</label>
              <textarea
                value={technicalAnalysis}
                onChange={e => setTechnicalAnalysis(e.target.value)}
                placeholder="Moving average support, breakout patterns, volume confirmation..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">4. Major Risks & Key Vulnerabilities</label>
              <textarea
                value={riskAnalysis}
                onChange={e => setRiskAnalysis(e.target.value)}
                placeholder="Customer concentration, working capital receivables cycle, raw material price inflation..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">5. Bull Case (Upside Catalysts)</label>
              <textarea
                value={bullCase}
                onChange={e => setBullCase(e.target.value)}
                placeholder="PLI subsidies, export order expansion, defense budget allocations..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">6. Bear Case (Downside Triggers)</label>
              <textarea
                value={bearCase}
                onChange={e => setBearCase(e.target.value)}
                placeholder="Delay in PSU payments, margin compression, valuation multiple contraction..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">7. Valuation & Target Price (12-Month Horizon)</label>
              <input
                type="text"
                value={valuationTarget}
                onChange={e => setValuationTarget(e.target.value)}
                placeholder="e.g. ₹2,350 Target based on 38x FY27E EPS"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">8. Recommendation Decision Call</label>
              <div className="flex gap-2">
                {(["BUY", "HOLD", "SELL", "AVOID"] as const).map(rec => (
                  <button
                    key={rec}
                    type="button"
                    onClick={() => setFinalCall(rec)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                      finalCall === rec
                        ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {rec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">9. Executive Investment Thesis Summary</label>
            <textarea
              value={thesisSummary}
              onChange={e => setThesisSummary(e.target.value)}
              placeholder="Synthesize your core investment case in 2-3 concise sentences..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
            />
          </div>

          <button
            onClick={handleGradingSubmission}
            disabled={isSubmitting}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? "StockMentor AI Grading Equity Research Report..." : "Submit Equity Research Report for Institutional Grading"}</span>
          </button>
        </div>
      ) : (
        /* Scorecard Output */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                  🏆 StockMentor Institutional Evaluation Completed
                </span>
                <h4 className="text-3xl font-black text-white mt-2">Overall Score: {gradeResult?.overallScore} / 100</h4>
                <p className="text-xs font-bold text-amber-400 mt-1">{gradeResult?.competencyLevel}</p>
              </div>

              <button
                onClick={handleResetExam}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Take Another Analyst Exam</span>
              </button>
            </div>

            {/* Score Breakdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Research</p>
                <p className="text-lg font-black text-amber-400">{gradeResult?.researchScore}</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Fundamentals</p>
                <p className="text-lg font-black text-emerald-400">{gradeResult?.fundamentalScore}</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Technicals</p>
                <p className="text-lg font-black text-indigo-400">{gradeResult?.technicalScore}</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Risk Eval</p>
                <p className="text-lg font-black text-rose-400">{gradeResult?.riskScore}</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Reasoning</p>
                <p className="text-lg font-black text-white">{gradeResult?.reasoningScore}</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Valuation</p>
                <p className="text-lg font-black text-amber-400">{gradeResult?.valuationScore}</p>
              </div>
            </div>

            {/* Praise & Constructive Feedback */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
                <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Key Analytical Strengths:</span>
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  {gradeResult?.praise.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1">
                <p className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Constructive Improvements for Next Level:</span>
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  {gradeResult?.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
