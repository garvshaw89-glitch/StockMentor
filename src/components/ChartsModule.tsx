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
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import { 
  LineChart as LineChartIcon, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  HelpCircle
} from "lucide-react";

interface ChartsModuleProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const ChartsModule: React.FC<ChartsModuleProps> = ({
  profile,
  onOpenSocraticWithQuestion
}) => {
  const [selectedStock, setSelectedStock] = useState<StockData>(STOCKS_DATA[0]);
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "1Y">("1D");
  const [showSMA, setShowSMA] = useState(true);
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
      if (showRSI) activeIndicators.push("RSI-14");
      if (showVolume) activeIndicators.push("Volume");

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
      console.error("Error explaining chart:", err);
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Title Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Technical Analysis & Chart Terminal
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Analyze moving averages, RSI momentum, volume spikes, and test your skills with historical chart challenges.
          </p>
        </div>

        {/* Stock Selector */}
        <div className="flex items-center gap-2">
          {STOCKS_DATA.map(s => (
            <button
              key={s.symbol}
              onClick={() => {
                setSelectedStock(s);
                setChartExplanation(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                selectedStock.symbol === s.symbol
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {s.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Chart Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedStock.name} ({selectedStock.symbol})</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                ₹{selectedStock.price}
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe Toggles */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700 text-xs font-bold">
              {(["1D", "1W", "1M", "1Y"] as const).map(tf => (
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
                  showSMA ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300" : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                }`}
              >
                SMA (20)
              </button>
              <button
                onClick={() => setShowRSI(!showRSI)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showRSI ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-300" : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                }`}
              >
                RSI
              </button>
              <button
                onClick={() => setShowVolume(!showVolume)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showVolume ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300" : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                }`}
              >
                Volume
              </button>
            </div>
          </div>
        </div>

        {/* Primary Price & SMA Chart */}
        <div className="h-64 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeChartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis domain={["auto", "auto"]} stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", borderColor: "#334155", color: "#fff", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#priceGradient)" name="Price (₹)" />
              {showSMA && <Line type="monotone" dataKey="ma20" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="SMA 20" />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Indicator Level Selection Toolbar & Indicator Explainer Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Chart Complexity Tier:</span>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold rounded-lg border border-emerald-500/30">
              Professional Tier (Price + Volume + SMA + RSI)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenSocraticWithQuestion("Explain RSI (Relative Strength Index) = 72. Is overbought automatically a sell signal?")}
              className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 font-bold rounded-lg border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Explain RSI = 72</span>
            </button>

            <button
              onClick={() => onOpenSocraticWithQuestion("Explain 20-day Simple Moving Average (SMA) support and dynamic trendlines")}
              className="px-2.5 py-1 bg-amber-500/20 text-amber-400 font-bold rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Explain SMA 20</span>
            </button>
          </div>
        </div>

        {/* Explain This Chart Button */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={handleExplainChart}
            disabled={loadingExplanation}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <Brain className="w-4 h-4" />
            <span>{loadingExplanation ? "AI Analyzing Chart Setup..." : "Explain This Chart"}</span>
          </button>

          <span className="text-[11px] text-slate-500 text-center sm:text-right">
            Indicators help quantify velocity and trend direction. Never rely on a single indicator alone.
          </span>
        </div>

        {/* Chart Explanation AI Display */}
        {chartExplanation && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs text-slate-800 dark:text-slate-200 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>StockMentor AI Chart Breakdown:</span>
            </div>
            <div className="whitespace-pre-line leading-relaxed">
              {chartExplanation}
            </div>
          </div>
        )}
      </div>

      {/* Historical Trading Chart Challenge Game */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Historical Trading Chart Challenge Game
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Analyze a historical chart without knowing the outcome, place entry/stop-loss/target, then reveal what actually happened!
            </p>
          </div>
        </div>

        {(() => {
          const ch = CHART_CHALLENGES[challengeIdx];

          return (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  Scenario: {ch.stockName}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {ch.question}
                </p>

                {/* Challenge Chart */}
                <div className="h-44 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ch.chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} />
                      <YAxis domain={["auto", "auto"]} stroke="#94a3b8" fontSize={10} />
                      <Line type="monotone" dataKey="price" stroke="#059669" strokeWidth={2.5} />
                    </LineChart>
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
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
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
                        onChange={e => setUserEntry(e.target.value)}
                        placeholder="e.g., 448"
                        className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Stop-Loss (₹)</label>
                      <input
                        type="number"
                        value={userStopLoss}
                        onChange={e => setUserStopLoss(e.target.value)}
                        placeholder="e.g., 428"
                        className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Target Price (₹)</label>
                      <input
                        type="number"
                        value={userTarget}
                        onChange={e => setUserTarget(e.target.value)}
                        placeholder="e.g., 488"
                        className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
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
