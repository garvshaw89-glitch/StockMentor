import React, { useState } from "react";
import { UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { NEWS_ARTICLES, SCENARIO_SIMULATIONS } from "../data/challenges";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  SectionHeader, 
  PrecisionButton, 
  MarketIndicator 
} from "./ui/LuxuryPrimitives";
import { 
  Newspaper, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Search,
  PieChart as PieChartIcon,
  ShieldAlert,
  ArrowRight,
  Activity,
  BarChart3
} from "lucide-react";

interface PortfolioModuleProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

type PortfolioSection = "OVERVIEW" | "ALLOCATION" | "WATCHLIST" | "SCENARIOS" | "NEWS_ANALYZER";

export const PortfolioModule: React.FC<PortfolioModuleProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [activeSection, setActiveSection] = useState<PortfolioSection>("OVERVIEW");
  const [newsInput, setNewsInput] = useState("");
  const [newsAnalysis, setNewsAnalysis] = useState<any | null>(null);
  const [loadingNews, setLoadingNews] = useState(false);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);

  const handleAnalyzeNews = async (textToAnalyze?: string) => {
    const query = textToAnalyze || newsInput;
    if (!query.trim()) return;

    setLoadingNews(true);
    setNewsAnalysis(null);

    try {
      const response = await fetch("/api/ai/analyze-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsText: query })
      });

      const data = await response.json();
      if (data.analysis) {
        setNewsAnalysis(data.analysis);
      }
    } catch (err) {
      console.error("Error analyzing news:", err);
    } finally {
      setLoadingNews(false);
    }
  };

  const sections: { id: PortfolioSection; label: string }[] = [
    { id: "OVERVIEW", label: "PORTFOLIO OVERVIEW" },
    { id: "ALLOCATION", label: "ALLOCATION & RISK" },
    { id: "WATCHLIST", label: `WATCHLIST (${profile.savedWatchlist.length})` },
    { id: "SCENARIOS", label: "MACRO SCENARIOS" },
    { id: "NEWS_ANALYZER", label: "FINANCIAL NEWS AI" }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      
      {/* ================================================================ */}
      {/* 1. Header & Section Switcher */}
      {/* ================================================================ */}
      <SectionHeader
        kicker="PORTFOLIO DIAGNOSTICS & RISK EXPOSURE"
        title="PORTFOLIO INTELLIGENCE"
        description="Comprehensive asset allocation analysis, portfolio beta, historical scenario stress-testing, and real-time news impact modeling."
        action={
          <div className="flex items-center gap-2">
            <PrecisionButton
              variant="secondary"
              size="sm"
              icon={<Brain className="w-3.5 h-3.5 text-blue-500 dark:text-[#6F9BFF]" />}
              onClick={() => onOpenSocraticWithQuestion("Conduct an institutional risk audit on my portfolio asset weighting and beta exposure.")}
            >
              Consult Risk Doctor
            </PrecisionButton>
          </div>
        }
      />

      {/* Top Section Nav Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
        {sections.map(s => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-3 py-2 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white shadow-xs"
                  : "bg-white dark:bg-[#0C0F13] border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/* 2. Section: Overview */}
      {/* ================================================================ */}
      {activeSection === "OVERVIEW" && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <LuxuryPanel className="p-4">
              <MetricDisplay
                label="TOTAL ASSET NAV"
                value={`₹${profile.paperBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                size="sm"
              />
            </LuxuryPanel>
            <LuxuryPanel className="p-4">
              <MetricDisplay
                label="PORTFOLIO BETA"
                value="0.92"
                change="Market Defensive"
                changeType="neutral"
                size="sm"
              />
            </LuxuryPanel>
            <LuxuryPanel className="p-4">
              <MetricDisplay
                label="SHARPE RATIO (SIM)"
                value="1.84"
                change="+0.12 vs Index"
                changeType="positive"
                size="sm"
              />
            </LuxuryPanel>
            <LuxuryPanel className="p-4">
              <MetricDisplay
                label="MAX HISTORICAL DRAWDOWN"
                value="-4.2%"
                change="Resilient"
                changeType="positive"
                size="sm"
              />
            </LuxuryPanel>
          </div>

          {/* Asset Weighting & Risk Health */}
          <LuxuryPanel elevated className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.05] mb-4">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
                Capital Allocation Profile
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-[#6EE7B7] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                SYSTEM CALIBRATED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Cash Liquidity Buffer</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white block">
                  ₹{profile.paperBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
                <p className="text-[11px] text-slate-500 font-sans">
                  Available margin for opportunistic volatility dips.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Value at Risk (95% 1-Day)</span>
                <span className="text-lg font-bold text-rose-600 dark:text-[#FF7B86] block">
                  ₹18,400 (1.84%)
                </span>
                <p className="text-[11px] text-slate-500 font-sans">
                  Conservative exposure within institutional risk parameters.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Diversification Index</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-[#6EE7B7] block">
                  88 / 100
                </span>
                <p className="text-[11px] text-slate-500 font-sans">
                  Healthy cross-sector dispersion preventing single-stock idiosyncratic ruin.
                </p>
              </div>
            </div>
          </LuxuryPanel>
        </div>
      )}

      {/* ================================================================ */}
      {/* 3. Section: Allocation */}
      {/* ================================================================ */}
      {activeSection === "ALLOCATION" && (
        <LuxuryPanel elevated className="p-6 space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
            Target Sector Weighting Matrix
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Institutional asset allocation weighted by volatility-parity principles.
          </p>

          <div className="space-y-3 pt-2 font-mono text-xs">
            {[
              { sector: "Financial Services & Private Banking", weight: 32, color: "bg-blue-500" },
              { sector: "Enterprise Technology & AI SaaS", weight: 26, color: "bg-violet-500" },
              { sector: "Energy & Infrastructure Transición", weight: 18, color: "bg-emerald-500" },
              { sector: "Consumer Discretionary & Retail", weight: 14, color: "bg-amber-500" },
              { sector: "Pharma, Biotech & Healthcare", weight: 10, color: "bg-rose-500" }
            ].map(item => (
              <div key={item.sector} className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{item.sector}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.weight}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.weight}%` }} />
                </div>
              </div>
            ))}
          </div>
        </LuxuryPanel>
      )}

      {/* ================================================================ */}
      {/* 4. Section: Watchlist */}
      {/* ================================================================ */}
      {activeSection === "WATCHLIST" && (
        <LuxuryPanel elevated className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.05]">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
              Active Institutional Watchlist
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {profile.savedWatchlist.length} EQUITIES MONITORED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {profile.savedWatchlist.map(sym => {
              const stock = STOCKS_DATA.find(s => s.symbol === sym) || STOCKS_DATA[0];

              return (
                <div key={sym} className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] flex items-center justify-between font-mono">
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block font-sans">
                      {stock.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {stock.symbol} · {stock.sector}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`text-[11px] font-semibold ${
                      stock.change >= 0 ? "text-emerald-600 dark:text-[#6EE7B7]" : "text-rose-600 dark:text-[#FF7B86]"
                    }`}>
                      {stock.change >= 0 ? "+" : ""}{stock.change} ({stock.changePercent}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </LuxuryPanel>
      )}

      {/* ================================================================ */}
      {/* 5. Section: Macro Scenarios */}
      {/* ================================================================ */}
      {activeSection === "SCENARIOS" && (
        <div className="space-y-6">
          <LuxuryPanel elevated className="p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
              Macroeconomic Stress Simulator
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Select an institutional stress scenario to inspect historical correlation ripples across asset classes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {SCENARIO_SIMULATIONS.map((scen, idx) => {
                const isSelected = activeScenarioIdx === idx;
                return (
                  <button
                    key={scen.id}
                    onClick={() => setActiveScenarioIdx(idx)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white shadow-xs"
                        : "bg-slate-50 dark:bg-[#080A0D] text-slate-700 dark:text-[#A5A8AE] border-slate-200 dark:border-white/[0.06] hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <h4 className="text-xs font-semibold">{scen.title}</h4>
                    <p className={`text-[11px] mt-1 font-sans ${isSelected ? "opacity-80" : "text-slate-500"}`}>
                      {scen.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Scenario Impact */}
            {(() => {
              const scen = SCENARIO_SIMULATIONS[activeScenarioIdx];

              return (
                <div className="mt-5 p-5 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-3 text-xs">
                  <span className="font-mono uppercase font-bold text-slate-900 dark:text-white block">
                    Historical Impact Matrix // {scen.title}
                  </span>

                  <div className="space-y-2">
                    {scen.historicalImpact.map((item, i) => (
                      <div key={i} className="p-3 bg-white dark:bg-[#11151A] rounded-lg border border-slate-200/80 dark:border-white/[0.06] flex items-start justify-between gap-3 font-mono">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {item.sector}
                          </span>
                          <p className="text-slate-500 font-sans text-[11px] mt-0.5">
                            {item.explanation}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          item.effect === "Positive"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-[#6EE7B7]"
                            : "bg-rose-500/10 text-rose-600 dark:text-[#FF7B86]"
                        }`}>
                          {item.effect}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </LuxuryPanel>
        </div>
      )}

      {/* ================================================================ */}
      {/* 6. Section: News Analyzer */}
      {/* ================================================================ */}
      {activeSection === "NEWS_ANALYZER" && (
        <div className="space-y-6">
          <LuxuryPanel elevated className="p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
              Financial News & RBI Policy Analyzer
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Paste any central bank announcement, earnings headline, or geopolitical event for real-time Socratic impact analysis.
            </p>

            <textarea
              rows={3}
              value={newsInput}
              onChange={e => setNewsInput(e.target.value)}
              placeholder="e.g. 'RBI keeps repo rate unchanged at 6.50%' or 'US Fed cuts interest rate by 25 basis points'..."
              className="w-full p-3 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F0] focus:outline-none focus:border-blue-500 font-sans"
            />

            <PrecisionButton
              variant="primary"
              size="md"
              className="w-full"
              icon={<Sparkles className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />}
              onClick={() => handleAnalyzeNews()}
              disabled={!newsInput.trim() || loadingNews}
            >
              {loadingNews ? "Analyzing Headline with Gemini 3.7 Flash..." : "Run Socratic News Breakdown"}
            </PrecisionButton>

            {/* Headline Presets */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 font-bold">
                OR SELECT PRESET HEADLINE:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {NEWS_ARTICLES.map(art => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setNewsInput(art.headline);
                      handleAnalyzeNews(art.headline);
                    }}
                    className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] text-left hover:border-blue-500/40 transition-colors cursor-pointer space-y-1"
                  >
                    <span className="text-[10px] font-mono text-blue-500 dark:text-[#6F9BFF] block">
                      {art.category} · {art.timeAgo}
                    </span>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {art.headline}
                    </h4>
                  </button>
                ))}
              </div>
            </div>

            {/* News Analysis Output */}
            {newsAnalysis && (
              <div className="mt-5 p-5 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.08] space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase">
                      Analysis: {newsAnalysis.headlineSummary}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500">GEMINI VERIFIED</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-3 bg-white dark:bg-[#11151A] rounded-lg border border-slate-200 dark:border-white/[0.06] space-y-1">
                    <span className="font-mono font-bold text-slate-900 dark:text-white block text-[11px]">
                      01. Fundamental Reality
                    </span>
                    <p className="text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                      {newsAnalysis.simpleExplanation}
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#11151A] rounded-lg border border-slate-200 dark:border-white/[0.06] space-y-1">
                    <span className="font-mono font-bold text-slate-900 dark:text-white block text-[11px]">
                      02. Market Implications
                    </span>
                    <p className="text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                      {newsAnalysis.whyItMatters}
                    </p>
                  </div>
                </div>

                {/* Socratic Questions */}
                {newsAnalysis.socraticQuestions && (
                  <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/20 space-y-2 text-xs">
                    <span className="font-mono font-bold text-amber-700 dark:text-[#F5C76B] flex items-center gap-1.5 text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Socratic Verification Inquiries:
                    </span>
                    <ul className="space-y-1.5 font-mono text-[11px]">
                      {newsAnalysis.socraticQuestions.map((sq: string, i: number) => (
                        <li key={i} className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-[#11151A] rounded border border-slate-200 dark:border-white/[0.06]">
                          <span className="text-slate-800 dark:text-slate-200">{sq}</span>
                          <button
                            onClick={() => onOpenSocraticWithQuestion(sq)}
                            className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-[#F5C76B] font-bold text-[10px] shrink-0"
                          >
                            Explore →
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </LuxuryPanel>
        </div>
      )}

    </div>
  );
};
