import React, { useState } from "react";
import { StockData, UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { CHART_CHALLENGES } from "../data/challenges";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Line,
  BarChart,
  Bar
} from "recharts";
import { 
  LineChart as LineChartIcon, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Zap,
  TrendingUp,
  Activity,
  Layers
} from "lucide-react";

interface ChartsModuleProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const ChartsModule: React.FC<ChartsModuleProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [selectedStock, setSelectedStock] = useState<StockData>(STOCKS_DATA[0]);
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "1Y">("1D");
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [chartExplanation, setChartExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  // Chart Challenge State
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [userPrediction, setUserPrediction] = useState<number | null>(null);
  const [userEntry, setUserEntry] = useState("");
  const [userStopLoss, setUserStopLoss] = useState("");
  const [userTarget, setUserTarget] = useState("");
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  const activeChartData = selectedStock.chartHistory[timeframe];

  const handleExplainChart = async () => {
    setLoadingExplanation(true);
    setChartExplanation(null);

    try {
      const activeIndicators = [];
      if (showSMA) activeIndicators.push("SMA-20");
      if (showEMA) activeIndicators.push("EMA-50");
      if (showRSI) activeIndicators.push("RSI-14");
      if (showVolume) activeIndicators.push("Volume Profile");

      const response = await fetch("/api/ai/explain-chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: selectedStock.symbol,
          timeFrame: timeframe,
          indicators: activeIndicators,
          currentPrice: selectedStock.price,
          trend: selectedStock.change >= 0 ? "Bullish" : "Consolidating",
          rsiValue: 58,
          macdSignal: "Positive Momentum"
        })
      });

      const data = await response.json();
      setChartExplanation(data.explanation);
    } catch (err) {
      console.error("Error explaining chart with Gemini AI:", err);
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Technical Chart & Pattern Analysis
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time interactive candlestick and indicator engine with AI-driven Socratic chart breakdowns powered by <strong className="text-emerald-500">Gemini 3.7 Flash</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Gemini 3.7 Flash AI
          </span>
        </div>
      </div>

      {/* Main Chart Terminal */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Stock Selector & Timeframe Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {STOCKS_DATA.map((s) => (
              <button
                key={s.symbol}
                onClick={() => {
                  setSelectedStock(s);
                  setChartExplanation(null);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  selectedStock.symbol === s.symbol
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {s.symbol}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe Toggles */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700 text-xs font-bold">
              {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeframe === tf
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Indicator Toggles */}
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <button
                onClick={() => setShowSMA(!showSMA)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showSMA
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                }`}
              >
                SMA (20)
              </button>
              <button
                onClick={() => setShowEMA(!showEMA)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showEMA
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                }`}
              >
                EMA (50)
              </button>
              <button
                onClick={() => setShowRSI(!showRSI)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showRSI
                    ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                }`}
              >
                RSI (14)
              </button>
              <button
                onClick={() => setShowVolume(!showVolume)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showVolume
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                }`}
              >
                Volume
              </button>
            </div>
          </div>
        </div>

        {/* Selected Stock Banner Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 dark:text-white">{selectedStock.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono font-bold">
                  {selectedStock.symbol}
                </span>
              </div>
              <span className="text-xs text-slate-500">{selectedStock.sector}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                ₹{selectedStock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-xs font-bold flex items-center justify-end gap-1 ${
                selectedStock.change >= 0 ? "text-emerald-500" : "text-rose-500"
              }`}>
                <TrendingUp className={`w-3.5 h-3.5 ${selectedStock.change < 0 ? "rotate-180" : ""}`} />
                <span>
                  {selectedStock.change >= 0 ? "+" : ""}{selectedStock.change}% (₹{selectedStock.changeAmount})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Price & Moving Averages Chart */}
        <div className="h-72 sm:h-96 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeChartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis domain={["auto", "auto"]} stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "12px",
                  borderColor: "#334155",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#priceGradient)"
                name="Price (₹)"
              />
              {showSMA && (
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  dot={false}
                  name="SMA 20"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sub-Panel: Volume Bars */}
        {showVolume && (
          <div className="h-28 w-full border-t border-slate-200 dark:border-slate-800 pt-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Volume Distribution</span>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={activeChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.05} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "8px",
                    borderColor: "#334155",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="volume" fill="#059669" opacity={0.6} name="Volume (Shares)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Action Controls & Gemini Breakdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExplainChart}
              disabled={loadingExplanation}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Brain className="w-4 h-4" />
              <span>{loadingExplanation ? "Gemini AI Analyzing Setup..." : `Explain ${selectedStock.symbol} Setup with Gemini`}</span>
            </button>

            <button
              onClick={() =>
                onOpenSocraticWithQuestion(
                  `Analyze the technical chart for ${selectedStock.symbol}. How do the 20 SMA and 50 EMA lines indicate trend direction and support?`
                )
              }
              className="px-3.5 py-2 bg-indigo-500/10 text-indigo-400 font-bold rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors text-xs flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ask Socratic Tutor</span>
            </button>
          </div>

          <span className="text-xs text-slate-500">
            Current Trend: <strong className={selectedStock.change >= 0 ? "text-emerald-500" : "text-rose-500"}>{selectedStock.change >= 0 ? "Bullish Accumulation" : "Consolidation"}</strong>
          </span>
        </div>

        {/* AI Explanation Banner */}
        {chartExplanation && (
          <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2 animate-fadeIn text-xs text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Gemini 3.7 Flash Technical Breakdown ({selectedStock.symbol}):</span>
            </div>
            <p className="whitespace-pre-line leading-relaxed">{chartExplanation}</p>
          </div>
        )}
      </div>

      {/* Historical Chart Challenge Lab */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Historical Pattern Challenge Lab
              </h2>
              <p className="text-xs text-slate-500">
                Test your technical intuition on real market breakout and reversal setups.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {CHART_CHALLENGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChallengeIdx(idx);
                  setChallengeSubmitted(false);
                  setUserPrediction(null);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                  challengeIdx === idx
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {(() => {
          const ch = CHART_CHALLENGES[challengeIdx];
          if (!ch) return null;

          return (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{ch.stockName}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{ch.question}</p>

                {/* Challenge Chart */}
                <div className="h-48 w-full mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ch.chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} />
                      <YAxis domain={["auto", "auto"]} stroke="#94a3b8" fontSize={10} />
                      <Area type="monotone" dataKey="price" stroke="#059669" fill="#059669" fillOpacity={0.1} strokeWidth={2.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* User Selection Options */}
              {!challengeSubmitted ? (
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    What happens next on this chart?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ch.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => setUserPrediction(oIdx)}
                        className={`p-3 rounded-xl text-xs text-left font-bold border transition-all ${
                          userPrediction === oIdx
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Entry / Stop Loss / Target inputs */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Entry Price (₹)</label>
                      <input
                        type="number"
                        value={userEntry}
                        onChange={(e) => setUserEntry(e.target.value)}
                        placeholder="e.g., 448"
                        className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Stop-Loss (₹)</label>
                      <input
                        type="number"
                        value={userStopLoss}
                        onChange={(e) => setUserStopLoss(e.target.value)}
                        placeholder="e.g., 428"
                        className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Target Price (₹)</label>
                      <input
                        type="number"
                        value={userTarget}
                        onChange={(e) => setUserTarget(e.target.value)}
                        placeholder="e.g., 488"
                        className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setChallengeSubmitted(true)}
                    disabled={userPrediction === null}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20 disabled:opacity-50"
                  >
                    Submit Analysis & Reveal Historical Outcome
                  </button>
                </div>
              ) : (
                /* Reveal Outcome Section */
                <div className="p-5 bg-emerald-50/80 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-4 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900 pb-2">
                    <span className="font-bold text-sm text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Historical Outcome Revealed:
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white font-bold rounded text-xs">
                      {userPrediction === ch.correctOptionIndex ? "Correct Prediction!" : "Educational Lesson"}
                    </span>
                  </div>

                  <p className="text-slate-800 dark:text-slate-200 font-medium">
                    {ch.historicalOutcome}
                  </p>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white">Technical Signal Analysis:</span>
                    <p className="text-slate-600 dark:text-slate-300">{ch.signalsExplanation}</p>
                  </div>

                  <button
                    onClick={() => {
                      setChallengeSubmitted(false);
                      setUserPrediction(null);
                      setUserEntry("");
                      setUserStopLoss("");
                      setUserTarget("");
                    }}
                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors"
                  >
                    Try Challenge Again
                  </button>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};
