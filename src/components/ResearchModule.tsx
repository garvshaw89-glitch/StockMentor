import React, { useState } from "react";
import { StockData, UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { ANALYST_CHALLENGES } from "../data/challenges";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  SectionHeader, 
  PrecisionButton, 
  MarketIndicator 
} from "./ui/LuxuryPrimitives";
import { 
  Search, 
  Brain, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  BarChart3, 
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers,
  FileText
} from "lucide-react";

interface ResearchModuleProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

type ResearchTab = 
  | "OVERVIEW" 
  | "BUSINESS_MODEL" 
  | "FINANCIALS" 
  | "VALUATION" 
  | "RISKS" 
  | "CATALYSTS" 
  | "COMPETITIVE_LANDSCAPE" 
  | "INVESTMENT_THESIS";

export const ResearchModule: React.FC<ResearchModuleProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<StockData>(STOCKS_DATA[0]);
  const [activeResearchTab, setActiveResearchTab] = useState<ResearchTab>("OVERVIEW");
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

  const researchTabs: { id: ResearchTab; label: string }[] = [
    { id: "OVERVIEW", label: "COMPANY OVERVIEW" },
    { id: "BUSINESS_MODEL", label: "BUSINESS MODEL" },
    { id: "FINANCIALS", label: "FINANCIALS" },
    { id: "VALUATION", label: "VALUATION" },
    { id: "RISKS", label: "RISKS" },
    { id: "CATALYSTS", label: "CATALYSTS" },
    { id: "COMPETITIVE_LANDSCAPE", label: "COMPETITIVE LANDSCAPE" },
    { id: "INVESTMENT_THESIS", label: "INVESTMENT THESIS" }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      
      {/* ================================================================ */}
      {/* 1. Header & Quick Ticker Selector */}
      {/* ================================================================ */}
      <SectionHeader
        kicker="INSTITUTIONAL EQUITY DESK"
        title="EQUITY RESEARCH"
        description="Comprehensive fundamental due diligence, DCF metrics, moat durability, downside margin of safety, and AI thesis generation."
        action={
          <div className="flex items-center gap-2">
            <PrecisionButton
              variant="secondary"
              size="sm"
              icon={<Brain className="w-3.5 h-3.5 text-blue-500 dark:text-[#6F9BFF]" />}
              onClick={() => onOpenSocraticWithQuestion(`Provide a fundamental DCF and moat analysis of ${selectedStock.name} (${selectedStock.symbol}).`)}
            >
              Consult Socratic Analyst
            </PrecisionButton>
          </div>
        }
      />

      {/* Search Bar & Ticker Ribbon */}
      <LuxuryPanel className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-[#6F9BFF]" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search ticker or company name (e.g. RELIANCE, TCS, HDFCBANK, INFY)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#686C73] focus:outline-none focus:border-blue-500 dark:focus:border-[#6F9BFF] font-sans"
            />
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-[#686C73] shrink-0">
            TIMESTAMP: {selectedStock.timestamp}
          </span>
        </div>

        {/* Ticker Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-[#686C73] shrink-0 font-bold">
            TRACKED EQUITIES:
          </span>
          {filteredStocks.map(s => {
            const isSelected = selectedStock.symbol === s.symbol;
            return (
              <button
                key={s.symbol}
                onClick={() => {
                  setSelectedStock(s);
                  setReport(null);
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs border-slate-900 dark:border-white"
                    : "bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{s.symbol}</span>
                <span className="ml-1 text-[11px] opacity-75 font-normal">₹{s.price}</span>
              </button>
            );
          })}
        </div>
      </LuxuryPanel>

      {/* ================================================================ */}
      {/* 2. Stock Profile Hero & Fundamental Telemetry */}
      {/* ================================================================ */}
      <LuxuryPanel elevated className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/[0.05]">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-[#F5F5F0]">
                {selectedStock.name}
              </h2>
              <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-[#A5A8AE] rounded border border-slate-200 dark:border-white/[0.08]">
                NSE: {selectedStock.nseSymbol}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-[#A5A8AE] mt-1">
              Sector: {selectedStock.sector} · Industry: {selectedStock.industry} · Cap: {selectedStock.marketCap}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <MetricDisplay
              label="CURRENT MARKET PRICE"
              value={`₹${selectedStock.price.toLocaleString()}`}
              change={`${selectedStock.change >= 0 ? "+" : ""}${selectedStock.change} (${selectedStock.changePercent}%)`}
              changeType={selectedStock.change >= 0 ? "positive" : "negative"}
              size="lg"
            />
          </div>
        </div>

        {/* Fundamental Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-5">
          <MetricDisplay label="P/E RATIO" value={`${selectedStock.pe}x`} size="sm" />
          <MetricDisplay label="EPS (TTM)" value={`₹${selectedStock.eps}`} size="sm" />
          <MetricDisplay label="ROE" value={`${selectedStock.roe}%`} size="sm" />
          <MetricDisplay label="ROCE" value={`${selectedStock.roce}%`} size="sm" />
          <MetricDisplay label="DEBT / EQUITY" value={`${selectedStock.debtToEquity}`} size="sm" />
          <MetricDisplay label="REVENUE GROWTH" value={`+${selectedStock.revenueGrowth}%`} changeType="positive" size="sm" />
        </div>

        {/* Report Trigger */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-[#A5A8AE]">
            Generate institutional 7-point research breakdown powered by Gemini 3.7 Flash.
          </p>
          <PrecisionButton
            variant="primary"
            size="md"
            icon={<Sparkles className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />}
            onClick={() => handleGenerateResearchReport(selectedStock)}
            disabled={loadingReport}
          >
            {loadingReport ? "Synthesizing Institutional Research..." : "Generate AI Research Report"}
          </PrecisionButton>
        </div>
      </LuxuryPanel>

      {/* ================================================================ */}
      {/* 3. Editorial 8-Section Navigation & Content */}
      {/* ================================================================ */}
      <div className="space-y-4">
        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
          {researchTabs.map((tab) => {
            const isActive = activeResearchTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveResearchTab(tab.id)}
                className={`px-3 py-2 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white shadow-xs"
                    : "bg-white dark:bg-[#0C0F13] border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Section Detail Card */}
        <LuxuryPanel className="p-6">
          {activeResearchTab === "OVERVIEW" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                Company Overview — {selectedStock.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                {selectedStock.name} is a leading enterprise within the {selectedStock.sector} sector, commanding significant market capitalization of {selectedStock.marketCap}. With strong institutional sponsorship and comprehensive distribution reach, the company operates across key domestic and global value chains.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-lg border border-slate-200 dark:border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Sector Dominance</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-[#F5F5F0] mt-0.5">Top Tier Market Share</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-lg border border-slate-200 dark:border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Balance Sheet Profile</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-[#F5F5F0] mt-0.5">D/E {selectedStock.debtToEquity} · Well-capitalized</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-lg border border-slate-200 dark:border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Profit Margin Trend</span>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-[#6EE7B7] mt-0.5">Expanding (+{selectedStock.profitGrowth}%)</p>
                </div>
              </div>
            </div>
          )}

          {activeResearchTab === "BUSINESS_MODEL" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                Business Model & Revenue Streams
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                The enterprise generates recurring cash flows through core products, enterprise service contracts, and strategic asset monetization. High switching costs and brand equity provide strong pricing power over input inflation cycles.
              </p>
            </div>
          )}

          {activeResearchTab === "FINANCIALS" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                Financial Statement Diagnostics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <MetricDisplay label="EPS (TTM)" value={`₹${selectedStock.eps}`} size="sm" />
                <MetricDisplay label="ROE" value={`${selectedStock.roe}%`} size="sm" />
                <MetricDisplay label="ROCE" value={`${selectedStock.roce}%`} size="sm" />
                <MetricDisplay label="PROFIT GROWTH" value={`+${selectedStock.profitGrowth}%`} changeType="positive" size="sm" />
              </div>
            </div>
          )}

          {activeResearchTab === "VALUATION" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                Valuation Multiples & Margin of Safety
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                Trading at <strong>{selectedStock.pe}x Price-to-Earnings</strong> against historical 5-year median ranges. Socratic valuation analysis weighs discounted cash flows against prevailing terminal growth rates.
              </p>
            </div>
          )}

          {activeResearchTab === "RISKS" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-rose-600 dark:text-[#FF7B86]">
                Identified Key Risk Factors
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-[#A5A8AE]">
                <li className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Regulatory shifts in tariff frameworks or statutory compliance obligations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Raw material commodity price inflation compressing gross operating spreads.</span>
                </li>
              </ul>
            </div>
          )}

          {activeResearchTab === "CATALYSTS" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                Upcoming Value Catalysts
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                Quarterly earnings disclosures, capacity utilization ramp-ups, and international geographic expansion initiatives constitute primary medium-term drivers.
              </p>
            </div>
          )}

          {activeResearchTab === "COMPETITIVE_LANDSCAPE" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                Competitive Landscape & Moat Durability
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                Evaluated against direct peers across Indian capital markets. Low customer churn and economies of scale offer strong defense against emergent competitors.
              </p>
            </div>
          )}

          {activeResearchTab === "INVESTMENT_THESIS" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                Core Institutional Investment Thesis
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                Attractive compounding characteristics supported by clean return on equity ({selectedStock.roe}%), disciplined balance sheet leverage ({selectedStock.debtToEquity} D/E), and continuous double-digit top-line expansion (+{selectedStock.revenueGrowth}%).
              </p>
            </div>
          )}
        </LuxuryPanel>

        {/* AI Research Report Deep-Dive (If Generated) */}
        {report && (
          <LuxuryPanel elevated className="p-6 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
                  Institutional Research Report // {selectedStock.name}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-[#6EE7B7] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                GEMINI 3.7 FLASH VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-700 dark:text-[#A5A8AE]">
              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <h4 className="font-mono uppercase text-slate-900 dark:text-[#F5F5F0] font-bold text-xs">
                  01. Business Overview
                </h4>
                <p>{report.businessOverview}</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <h4 className="font-mono uppercase text-slate-900 dark:text-[#F5F5F0] font-bold text-xs">
                  02. Fundamental Analysis
                </h4>
                <p>{report.fundamentalAnalysis}</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <h4 className="font-mono uppercase text-slate-900 dark:text-[#F5F5F0] font-bold text-xs">
                  03. Technical Analysis
                </h4>
                <p>{report.technicalAnalysis}</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <h4 className="font-mono uppercase text-slate-900 dark:text-[#F5F5F0] font-bold text-xs">
                  04. Risk Analysis
                </h4>
                <p>{report.riskAnalysis}</p>
              </div>

              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 space-y-1">
                <h4 className="font-mono uppercase text-emerald-700 dark:text-[#6EE7B7] font-bold text-xs">
                  05. Institutional Bull Case
                </h4>
                <p>{report.bullCase}</p>
              </div>

              <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20 space-y-1">
                <h4 className="font-mono uppercase text-rose-700 dark:text-[#FF7B86] font-bold text-xs">
                  06. Institutional Bear Case
                </h4>
                <p>{report.bearCase}</p>
              </div>
            </div>

            {/* Verification Checklist */}
            {report.investorChecklist && (
              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-2">
                <h4 className="font-mono uppercase text-xs font-bold text-slate-900 dark:text-[#F5F5F0] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>07. Investor Verification Checklist</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {report.investorChecklist.map((item: string, i: number) => (
                    <li key={i} className="p-2.5 bg-white dark:bg-[#11151A] rounded-lg border border-slate-200/80 dark:border-white/[0.06] flex items-start gap-2">
                      <span className="font-bold text-emerald-500">✓</span>
                      <span className="text-slate-700 dark:text-[#A5A8AE]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </LuxuryPanel>
        )}
      </div>

      {/* ================================================================ */}
      {/* 4. "You Are the Analyst" Interactive Exercise */}
      {/* ================================================================ */}
      <IntelligenceCard
        kicker="SOCRATIC SIMULATION"
        title="Become The Equity Analyst Exercise"
        action={
          <div className="flex items-center gap-1 font-mono text-xs">
            {ANALYST_CHALLENGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveAnalystChallengeIdx(idx);
                  setUserDecision(null);
                  setUserReasoning("");
                  setEvalResult(null);
                }}
                className={`px-2.5 py-1 rounded-md border text-xs cursor-pointer ${
                  activeAnalystChallengeIdx === idx
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white"
                    : "bg-slate-50 dark:bg-[#080A0D] text-slate-600 dark:text-[#A5A8AE] border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                Case #{idx + 1}
              </button>
            ))}
          </div>
        }
      >
        {(() => {
          const c = ANALYST_CHALLENGES[activeAnalystChallengeIdx];

          return (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-slate-900 dark:text-[#F5F5F0]">
                    {c.stockName} ({c.sector})
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Industry Median P/E: {c.industryPE}x
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                  {c.financialSummary} · <em>{c.chartTrend}</em>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 bg-white dark:bg-[#11151A] rounded border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-slate-400 block text-[9px]">P/E</span>
                    <span className="font-bold text-slate-900 dark:text-white">{c.pe}x</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#11151A] rounded border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-slate-400 block text-[9px]">REV GROWTH</span>
                    <span className="font-bold text-slate-900 dark:text-white">+{c.revenueGrowth}%</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#11151A] rounded border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-slate-400 block text-[9px]">PROFIT GROWTH</span>
                    <span className="font-bold text-slate-900 dark:text-white">+{c.profitGrowth}%</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#11151A] rounded border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-slate-400 block text-[9px]">DEBT/EQUITY</span>
                    <span className="font-bold text-slate-900 dark:text-white">{c.debtToEquity}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#11151A] rounded border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-slate-400 block text-[9px]">ROE</span>
                    <span className="font-bold text-slate-900 dark:text-white">{c.roe}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {(["BUY", "HOLD", "SELL"] as ("BUY" | "HOLD" | "SELL")[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setUserDecision(d)}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      userDecision === d
                        ? d === "BUY"
                          ? "bg-emerald-500 text-slate-950 border-emerald-500"
                          : d === "HOLD"
                          ? "bg-amber-500 text-slate-950 border-amber-500"
                          : "bg-rose-500 text-slate-950 border-rose-500"
                        : "bg-slate-50 dark:bg-[#080A0D] text-slate-700 dark:text-[#A5A8AE] border-slate-200 dark:border-white/[0.08]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Reasoning Input */}
              <textarea
                value={userReasoning}
                onChange={e => setUserReasoning(e.target.value)}
                placeholder="State your investment thesis and defend why you selected this call..."
                rows={3}
                className="w-full p-3 bg-white dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F0] focus:outline-none focus:border-blue-500 dark:focus:border-[#6F9BFF] font-sans"
              />

              <PrecisionButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleEvaluateAnalystDecision}
                disabled={evaluating || !userDecision || !userReasoning.trim()}
              >
                {evaluating ? "Evaluating Reasoning with Gemini..." : "Submit Thesis For Institutional Review"}
              </PrecisionButton>

              {/* Evaluation Output */}
              {evalResult && (
                <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.08] space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">
                      EVALUATION SCORE: {evalResult.score}/100
                    </span>
                    <span className="text-blue-500 dark:text-[#6F9BFF] uppercase">
                      VERDICT: {evalResult.consensus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                    {evalResult.feedback}
                  </p>
                </div>
              )}
            </div>
          );
        })()}
      </IntelligenceCard>

    </div>
  );
};
