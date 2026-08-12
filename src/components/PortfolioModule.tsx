import React, { useState } from "react";
import { UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { NEWS_ARTICLES, SCENARIO_SIMULATIONS } from "../data/challenges";
import { 
  Newspaper, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Search,
  BookOpen
} from "lucide-react";

interface PortfolioModuleProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const PortfolioModule: React.FC<PortfolioModuleProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"news" | "scenarios" | "watchlist">("news");
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

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Sub-Header Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Financial News Analyzer & Macro Scenario Simulator
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Interpret news headlines, evaluate macro event ripples across sectors, and track saved watchlists.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveSubTab("news")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === "news" ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            News Analyzer
          </button>
          <button
            onClick={() => setActiveSubTab("scenarios")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === "scenarios" ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Scenario Simulator
          </button>
          <button
            onClick={() => setActiveSubTab("watchlist")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === "watchlist" ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Watchlist ({profile.savedWatchlist.length})
          </button>
        </div>
      </div>

      {activeSubTab === "news" && (
        <div className="space-y-6">
          {/* Custom News Input Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-600" />
              <span>Paste Any Financial Headline or Article:</span>
            </h2>

            <textarea
              rows={3}
              value={newsInput}
              onChange={e => setNewsInput(e.target.value)}
              placeholder="e.g., 'RBI keeps repo rate unchanged at 6.50%' or 'US Federal Reserve cuts interest rates by 25 basis points'..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              onClick={() => handleAnalyzeNews()}
              disabled={!newsInput.trim() || loadingNews}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingNews ? "Analyzing News with AI Socratic Model..." : "Analyze News Headline"}</span>
            </button>
          </div>

          {/* Preset News Articles */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Or Select a Recent Headline to Analyze:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NEWS_ARTICLES.map(art => (
                <div
                  key={art.id}
                  onClick={() => {
                    setNewsInput(art.headline);
                    handleAnalyzeNews(art.headline);
                  }}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-emerald-500 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-600">
                    <span>{art.category}</span>
                    <span>{art.timeAgo}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    {art.headline}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{art.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI News Analysis Result Display */}
          {newsAnalysis && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/50 shadow-md space-y-5 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Educational News Breakdown — {newsAnalysis.headlineSummary}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">1. What Happened?</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{newsAnalysis.simpleExplanation}</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">2. Why Investors Care?</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{newsAnalysis.whyItMatters}</p>
                </div>
              </div>

              {/* Potential Impact Sectors */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-2 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">3. Potential Sector Impact:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Positively Affected:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                      {newsAnalysis.potentialImpact?.positiveSectors?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900">
                    <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">Negatively Affected:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                      {newsAnalysis.potentialImpact?.negativeSectors?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Neutral / Mixed:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
                      {newsAnalysis.potentialImpact?.neutralSectors?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Socratic Challenge Questions */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 space-y-2 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-sm">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>Socratic Questions to Test Your Thinking:</span>
                </span>
                <ul className="space-y-2">
                  {newsAnalysis.socraticQuestions?.map((sq: string, i: number) => (
                    <li key={i} className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{sq}</span>
                      <button
                        onClick={() => onOpenSocraticWithQuestion(sq)}
                        className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded text-[11px] shrink-0"
                      >
                        Ask AI
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === "scenarios" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>Interactive Macro Event Simulator</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIO_SIMULATIONS.map((scen, idx) => (
              <div
                key={scen.id}
                onClick={() => setActiveScenarioIdx(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeScenarioIdx === idx
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                }`}
              >
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{scen.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{scen.description}</p>
              </div>
            ))}
          </div>

          {/* Scenario Impact Display */}
          {(() => {
            const scen = SCENARIO_SIMULATIONS[activeScenarioIdx];

            return (
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border space-y-3 text-xs">
                <span className="font-bold text-sm text-slate-900 dark:text-white block">
                  Educational Historical Relationships — {scen.title}
                </span>

                <div className="space-y-2">
                  {scen.historicalImpact.map((item, i) => (
                    <div key={i} className="p-3 bg-white dark:bg-slate-900 rounded-xl border flex items-start justify-between gap-3">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{item.sector}</span>
                        <p className="text-slate-500 mt-0.5">{item.explanation}</p>
                      </div>

                      <span className={`px-2 py-0.5 font-bold rounded text-[10px] shrink-0 ${
                        item.effect === "Positive" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      }`}>
                        {item.effect}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {activeSubTab === "watchlist" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Saved Watchlist ({profile.savedWatchlist.length} Stocks)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.savedWatchlist.map(sym => {
              const stock = STOCKS_DATA.find(s => s.symbol === sym) || STOCKS_DATA[0];

              return (
                <div key={sym} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{stock.name}</span>
                    <p className="text-xs text-slate-500">{stock.sector} • P/E: {stock.pe}x</p>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">₹{stock.price}</span>
                    <p className={`text-xs font-bold ${stock.change >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {stock.change >= 0 ? "+" : ""}{stock.change} ({stock.changePercent}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
