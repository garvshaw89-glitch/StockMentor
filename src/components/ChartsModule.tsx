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
  Bar,
  ReferenceLine
} from "recharts";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  SectionHeader, 
  PrecisionButton, 
  MarketIndicator 
} from "./ui/LuxuryPrimitives";
import { 
  LineChart as LineChartIcon, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  Maximize2
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
    <div className="space-y-6 pb-24 md:pb-12">
      
      {/* ================================================================ */}
      {/* 1. Header */}
      {/* ================================================================ */}
      <SectionHeader
        kicker="QUANTITATIVE PRICE ACTION & MULTI-TIMEFRAME ENGINE"
        title="MARKET VISUAL LAB"
        description="High-resolution technical charts, dynamic moving averages, RSI momentum oscillators, volume distribution, and AI Socratic pattern breakdowns."
        action={
          <div className="flex items-center gap-2">
            <PrecisionButton
              variant="secondary"
              size="sm"
              icon={<Brain className="w-3.5 h-3.5 text-blue-500 dark:text-[#6F9BFF]" />}
              onClick={() => onOpenSocraticWithQuestion(`Analyze the current ${timeframe} technical chart structure of ${selectedStock.name} (${selectedStock.symbol}).`)}
            >
              Consult AI Chartist
            </PrecisionButton>
          </div>
        }
      />

      {/* ================================================================ */}
      {/* 2. Main Chart Hero Terminal */}
      {/* ================================================================ */}
      <LuxuryPanel elevated className="p-6 space-y-5">
        
        {/* Top Controls: Ticker Bar + Timeframes + Indicator Switches */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.05]">
          
          {/* Ticker Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            {STOCKS_DATA.map((s) => {
              const isSelected = selectedStock.symbol === s.symbol;
              return (
                <button
                  key={s.symbol}
                  onClick={() => {
                    setSelectedStock(s);
                    setChartExplanation(null);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white shadow-xs"
                      : "bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {s.symbol}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Toggles */}
            <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
              {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    timeframe === tf
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                      : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Indicator Overlays */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => setShowSMA(!showSMA)}
                className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  showSMA
                    ? "bg-amber-500/15 text-amber-700 dark:text-[#F5C76B] border-amber-500/30 font-semibold"
                    : "bg-slate-100 dark:bg-white/[0.03] text-slate-500 border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                SMA 20
              </button>
              <button
                onClick={() => setShowEMA(!showEMA)}
                className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  showEMA
                    ? "bg-violet-500/15 text-violet-700 dark:text-[#8B7CFF] border-violet-500/30 font-semibold"
                    : "bg-slate-100 dark:bg-white/[0.03] text-slate-500 border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                EMA 50
              </button>
              <button
                onClick={() => setShowRSI(!showRSI)}
                className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  showRSI
                    ? "bg-blue-500/15 text-blue-700 dark:text-[#6F9BFF] border-blue-500/30 font-semibold"
                    : "bg-slate-100 dark:bg-white/[0.03] text-slate-500 border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                RSI 14
              </button>
              <button
                onClick={() => setShowVolume(!showVolume)}
                className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  showVolume
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-[#6EE7B7] border-emerald-500/30 font-semibold"
                    : "bg-slate-100 dark:bg-white/[0.03] text-slate-500 border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                Volume
              </button>
            </div>
          </div>

        </div>

        {/* Selected Equity Metrics Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
                {selectedStock.name}
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-200 dark:bg-white/[0.08] text-slate-700 dark:text-[#A5A8AE]">
                {selectedStock.symbol}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Sector: {selectedStock.sector} · Industry: {selectedStock.industry}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <MetricDisplay
              label="LAST TRADED PRICE"
              value={`₹${selectedStock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
              change={`${selectedStock.change >= 0 ? "+" : ""}${selectedStock.change}% (₹${selectedStock.changeAmount})`}
              changeType={selectedStock.change >= 0 ? "positive" : "negative"}
              size="md"
            />
          </div>
        </div>

        {/* Main Price Action & Moving Averages Area Chart */}
        <div className="h-80 sm:h-96 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeChartData}>
              <defs>
                <linearGradient id="luxuryChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6F9BFF" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#6F9BFF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
              <XAxis dataKey="time" stroke="#686C73" fontSize={10} tickLine={false} fontFamilly="monospace" />
              <YAxis domain={["auto", "auto"]} stroke="#686C73" fontSize={10} tickLine={false} fontFamily="monospace" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0C0F13",
                  borderRadius: "10px",
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "#F5F5F0",
                  fontSize: "11px",
                  fontFamily: "monospace"
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#6F9BFF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#luxuryChartGradient)"
                name="Price"
              />
              {showSMA && (
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke="#F5C76B"
                  strokeWidth={1.5}
                  dot={false}
                  name="SMA (20)"
                />
              )}
              {showEMA && (
                <Line
                  type="monotone"
                  dataKey="ema50"
                  stroke="#8B7CFF"
                  strokeWidth={1.5}
                  dot={false}
                  name="EMA (50)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sub-Chart: RSI (14) Momentum Oscillator */}
        {showRSI && (
          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.05]">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-[#686C73] mb-1">
              <span>RSI (14) MOMENTUM OSCILLATOR</span>
              <span className="text-blue-500 dark:text-[#6F9BFF] font-semibold">VAL: 58.4 (NEUTRAL-BULLISH)</span>
            </div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeChartData}>
                  <CartesianGrid strokeDasharray="2 2" opacity={0.05} />
                  <YAxis domain={[0, 100]} ticks={[30, 50, 70]} stroke="#686C73" fontSize={9} tickLine={false} fontFamily="monospace" />
                  <ReferenceLine y={70} stroke="#FF7B86" strokeDasharray="3 3" opacity={0.6} />
                  <ReferenceLine y={30} stroke="#6EE7B7" strokeDasharray="3 3" opacity={0.6} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0C0F13",
                      borderRadius: "8px",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "#F5F5F0",
                      fontSize: "10px",
                      fontFamily: "monospace"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rsi"
                    stroke="#6F9BFF"
                    strokeWidth={1.5}
                    dot={false}
                    name="RSI (14)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Sub-Chart: Volume Profile Distribution */}
        {showVolume && (
          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.05]">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-[#686C73] mb-1">
              <span>VOLUME PROFILE DISTRIBUTION</span>
              <span>MARKET LIQUIDITY</span>
            </div>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeChartData}>
                  <XAxis dataKey="time" stroke="#686C73" fontSize={9} tickLine={false} fontFamily="monospace" />
                  <YAxis stroke="#686C73" fontSize={9} tickLine={false} fontFamily="monospace" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0C0F13",
                      borderRadius: "8px",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "#F5F5F0",
                      fontSize: "10px",
                      fontFamily: "monospace"
                    }}
                  />
                  <Bar dataKey="volume" fill="#6EE7B7" opacity={0.35} radius={[2, 2, 0, 0]} name="Volume" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Socratic Chart Thesis Breakdown Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-[#A5A8AE] font-mono">
            Prompt Gemini 3.7 Flash to formulate a technical thesis, support/resistance levels, and candlestick analysis.
          </p>
          <PrecisionButton
            variant="primary"
            size="md"
            icon={<Sparkles className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />}
            onClick={handleExplainChart}
            disabled={loadingExplanation}
          >
            {loadingExplanation ? "Formulating Technical Thesis..." : "Generate AI Technical Thesis"}
          </PrecisionButton>
        </div>

        {/* AI Chart Breakdown Display */}
        {chartExplanation && (
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 dark:text-white">
              <Brain className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />
              <span>TECHNICAL THESIS & PATTERN MECHANICS</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-[#A5A8AE] leading-relaxed whitespace-pre-line font-sans">
              {chartExplanation}
            </p>
          </div>
        )}
      </LuxuryPanel>

      {/* ================================================================ */}
      {/* 3. Blind Historical Chart Challenge */}
      {/* ================================================================ */}
      <IntelligenceCard
        kicker="SOCRATIC SIMULATION"
        title="Blind Historical Price Action Challenge"
        action={
          <span className="text-xs font-mono text-slate-500">
            CASE #{challengeIdx + 1} OF {CHART_CHALLENGES.length}
          </span>
        }
      >
        {(() => {
          const ch = CHART_CHALLENGES[challengeIdx];

          return (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-2">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase block">
                  Scenario: {ch.stockName}
                </span>
                <p className="text-xs text-slate-600 dark:text-[#A5A8AE] leading-relaxed">
                  {ch.question}
                </p>
                <div className="p-2.5 bg-white dark:bg-[#11151A] rounded border border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-700 dark:text-[#A5A8AE]">
                  Technical Clues: <strong>{ch.usefulSignals?.join(" · ")}</strong>
                </div>
              </div>

              {/* Order Execution Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Entry Price</label>
                  <input
                    type="number"
                    value={userEntry}
                    onChange={e => setUserEntry(e.target.value)}
                    placeholder="e.g. 1420"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Stop Loss</label>
                  <input
                    type="number"
                    value={userStopLoss}
                    onChange={e => setUserStopLoss(e.target.value)}
                    placeholder="e.g. 1390"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Target Take Profit</label>
                  <input
                    type="number"
                    value={userTarget}
                    onChange={e => setUserTarget(e.target.value)}
                    placeholder="e.g. 1510"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <PrecisionButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setChallengeSubmitted(true)}
              >
                Reveal Historical Price Action Outcome
              </PrecisionButton>

              {challengeSubmitted && (
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs space-y-2 animate-in fade-in">
                  <span className="font-mono font-bold text-emerald-700 dark:text-[#6EE7B7] block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Historical Verification Outcome:
                  </span>
                  <p className="text-slate-700 dark:text-[#A5A8AE] leading-relaxed">
                    {ch.historicalOutcome}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 pt-1">
                    Lesson: {ch.signalsExplanation}
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
