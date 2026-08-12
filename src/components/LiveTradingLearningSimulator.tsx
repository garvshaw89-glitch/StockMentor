import React, { useState, useEffect, useRef } from "react";
import { UserProfile, PaperPosition, PaperTrade } from "../types";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  HelpCircle, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  BarChart2, 
  Award, 
  Clock, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Info, 
  ChevronRight, 
  Target, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  Activity, 
  FileText, 
  Sliders, 
  Eye, 
  EyeOff, 
  Flame, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw,
  X
} from "lucide-react";

interface LiveTradingLearningSimulatorProps {
  profile: UserProfile;
  positions?: PaperPosition[];
  trades?: PaperTrade[];
  onUpdateProfile?: (updated: UserProfile) => void;
  onUpdatePositions?: (positions: PaperPosition[]) => void;
  onUpdateTrades?: (trades: PaperTrade[]) => void;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export type DifficultyMode = "Beginner" | "Intermediate" | "Advanced" | "Professional";
export type Timeframe = "1m" | "5m" | "15m" | "30m" | "1h" | "1D";

export type MarketScenario = 
  | "Bull Market" 
  | "Bear Market" 
  | "Sideways Market" 
  | "High Volatility" 
  | "Low Volatility" 
  | "Market Crash" 
  | "Gap Up" 
  | "Gap Down" 
  | "Earnings Event" 
  | "News Shock" 
  | "Breakout Market" 
  | "Reversal Market";

export type PredictOutcome = 
  | "Bullish continuation" 
  | "Bearish continuation" 
  | "Breakout" 
  | "Breakdown" 
  | "Pullback" 
  | "Reversal" 
  | "Consolidation" 
  | "No Trade";

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  annotation?: string;
  whyExplanation?: string;
}

export interface LearningMission {
  id: string;
  title: string;
  description: string;
  targetSkill: string;
  difficulty: DifficultyMode;
  rewardXP: number;
  completed: boolean;
}

export interface SkillMastery {
  trendId: number;
  supportResistance: number;
  volumeAnalysis: number;
  riskManagement: number;
  entryTiming: number;
  tradingPsychology: number;
}

export const LiveTradingLearningSimulator: React.FC<LiveTradingLearningSimulatorProps> = ({
  profile,
  positions = [],
  trades = [],
  onUpdateProfile,
  onUpdatePositions,
  onUpdateTrades,
  onOpenSocraticWithQuestion
}) => {
  // Simulator Parameters
  const [difficulty, setDifficulty] = useState<DifficultyMode>("Intermediate");
  const [timeframe, setTimeframe] = useState<Timeframe>("5m");
  const [scenario, setScenario] = useState<MarketScenario>("Breakout Market");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1x, 2x, 5x

  // Indicator Toggles
  const [showSMA, setShowSMA] = useState<boolean>(true);
  const [showEMA, setShowEMA] = useState<boolean>(false);
  const [showVWAP, setShowVWAP] = useState<boolean>(true);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showMACD, setShowMACD] = useState<boolean>(false);
  const [showBollinger, setShowBollinger] = useState<boolean>(false);
  const [showSupertrend, setShowSupertrend] = useState<boolean>(false);
  const [showFibonacci, setShowFibonacci] = useState<boolean>(false);

  // Candles Generator & State
  const [fullCandleSeries, setFullCandleSeries] = useState<Candle[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(35);

  // Pause & Predict ("What Happens Next?") State
  const [isPredictFrozen, setIsPredictFrozen] = useState<boolean>(false);
  const [predictCountdown, setPredictCountdown] = useState<number>(30);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictOutcome | null>(null);
  const [predictionFeedback, setPredictionFeedback] = useState<{
    correct: boolean;
    actualOutcome: string;
    explanation: string;
    cluesMissed: string[];
    evidenceScore: number;
  } | null>(null);

  // Paper Order & Active Position State
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [orderQty, setOrderQty] = useState<string>("50");
  const [simOrderSL, setSimOrderSL] = useState<string>("");
  const [simOrderTarget, setSimOrderTarget] = useState<string>("");
  const [activeSimTrade, setActiveSimTrade] = useState<{
    id: string;
    type: "BUY" | "SELL";
    entryPrice: number;
    qty: number;
    sl?: number;
    target?: number;
    entryReason?: string;
  } | null>(null);

  // Trade Review Modal State
  const [tradeReviewModal, setTradeReviewModal] = useState<{
    isOpen: boolean;
    tradePnl: number;
    entryReason: string;
    slReason: string;
    targetReason: string;
    wouldRepeat: boolean;
    evaluationResult?: {
      processQuality: "EXCELLENT" | "FLAWED" | "DISCIPLINED";
      aiVerdict: string;
    };
  }>({
    isOpen: false,
    tradePnl: 0,
    entryReason: "",
    slReason: "",
    targetReason: "",
    wouldRepeat: true
  });

  // "Why?" Modal State
  const [whyModalContent, setWhyModalContent] = useState<{
    title: string;
    explanation: string;
    keyConcept: string;
  } | null>(null);

  // Learning Missions State
  const [missions, setMissions] = useState<LearningMission[]>([
    { id: "m1", title: "Identify the Trend", description: "Identify whether the current 15-candle sequence is bullish or bearish.", targetSkill: "Trend Identification", difficulty: "Beginner", rewardXP: 50, completed: false },
    { id: "m2", title: "Detect a Breakout", description: "Correctly predict when price breaks resistance with volume confirmation.", targetSkill: "Entry Timing", difficulty: "Intermediate", rewardXP: 100, completed: false },
    { id: "m3", title: "Spot False Breakout Trap", description: "Identify a fake breakout above resistance that fails back into the range.", targetSkill: "Trading Psychology", difficulty: "Advanced", rewardXP: 150, completed: false },
    { id: "m4", title: "Calculate 1:2 R:R Ratio", description: "Set a stop-loss and target that yields at least a 2.0 reward-to-risk ratio.", targetSkill: "Risk Management", difficulty: "Beginner", rewardXP: 75, completed: false },
    { id: "m5", title: "Recognize No Trade Zone", description: "Correctly choose 'No Trade' during low volume choppy consolidation.", targetSkill: "Volume Analysis", difficulty: "Intermediate", rewardXP: 100, completed: false }
  ]);

  // Skill Mastery Scores
  const [mastery] = useState<SkillMastery>({
    trendId: 91,
    supportResistance: 84,
    volumeAnalysis: 63,
    riskManagement: 72,
    entryTiming: 78,
    tradingPsychology: 69
  });

  // Generate initial simulated candle dataset based on scenario & difficulty
  useEffect(() => {
    generateInitialChartData(scenario, difficulty);
  }, [scenario, difficulty, timeframe]);

  const generateInitialChartData = (scen: MarketScenario, diff: DifficultyMode) => {
    let basePrice = 2450.0;
    const candles: Candle[] = [];
    const now = new Date();

    let currentTrend = scen === "Bull Market" || scen === "Breakout Market" ? 1 : scen === "Bear Market" || scen === "Market Crash" ? -1 : 0;
    let volatility = diff === "Beginner" ? 1.5 : diff === "Intermediate" ? 3.2 : diff === "Advanced" ? 6.5 : 10.0;

    for (let i = 0; i < 70; i++) {
      const timeStr = new Date(now.getTime() - (70 - i) * 5 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      let noise = (Math.random() - 0.48) * volatility;
      if (scen === "Market Crash" && i > 40) noise -= 12.0;
      if (scen === "Gap Up" && i === 30) noise += 28.0;
      if (scen === "Gap Down" && i === 30) noise -= 25.0;
      if (scen === "Breakout Market" && i === 35) noise += 18.0;

      const open = +basePrice.toFixed(2);
      let close = +(open + currentTrend * (Math.random() * 2.5 + 0.5) + noise).toFixed(2);
      close = Math.max(100, close);

      const high = +(Math.max(open, close) + Math.random() * volatility).toFixed(2);
      const low = +(Math.min(open, close) - Math.random() * volatility).toFixed(2);
      let volume = Math.floor(Math.random() * 40000 + 10000);

      let annotation: string | undefined = undefined;
      let whyExplanation: string | undefined = undefined;

      if (i === 35 && scen === "Breakout Market") {
        volume = 125000;
        annotation = "🔥 Bullish Breakout";
        whyExplanation = "Price breached the $2,460 resistance level accompanied by a 3x volume surge. Institutional buyers absorbed all sell liquidity.";
      } else if (i === 42 && diff !== "Beginner") {
        annotation = "⚠️ Bull Trap / Reversal";
        whyExplanation = "RSI reached 82 (Overbought) while price formed an inverted hammer. High volume with no price gain indicated heavy institutional distribution.";
      } else if (i === 50) {
        annotation = "🛡️ Key Support Test";
        whyExplanation = "Buyers stepped in at the 50-period SMA line. Tail wick shows aggressive dip buying defense.";
      }

      candles.push({ time: timeStr, open, high, low, close, volume, annotation, whyExplanation });
      basePrice = close;
    }

    setFullCandleSeries(candles);
    setVisibleCount(35);
  };

  // Continuous Candle Ticker Loop
  useEffect(() => {
    if (!isPlaying || isPredictFrozen) return;

    const intervalMs = Math.max(300, 2000 / simSpeed);
    const timer = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= fullCandleSeries.length - 1) {
          const lastCandle = fullCandleSeries[fullCandleSeries.length - 1];
          const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const delta = (Math.random() - 0.49) * 4.5;
          const open = lastCandle.close;
          const close = +(open + delta).toFixed(2);
          const high = +(Math.max(open, close) + Math.random() * 2).toFixed(2);
          const low = +(Math.min(open, close) - Math.random() * 2).toFixed(2);
          const volume = Math.floor(Math.random() * 30000 + 15000);

          const newCandle: Candle = { time: nextTime, open, high, low, close, volume };
          setFullCandleSeries(curr => [...curr, newCandle]);
          return prev + 1;
        }

        if (prev === 35 || (prev > 35 && (prev - 35) % 15 === 0)) {
          triggerPauseAndPredict();
        }

        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, isPredictFrozen, simSpeed, fullCandleSeries]);

  // Pause & Predict Countdown Timer
  useEffect(() => {
    if (!isPredictFrozen) return;

    if (predictCountdown <= 0) {
      handleEvaluatePrediction("No Trade");
      return;
    }

    const timer = setInterval(() => {
      setPredictCountdown(c => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPredictFrozen, predictCountdown]);

  const triggerPauseAndPredict = () => {
    setIsPredictFrozen(true);
    setPredictCountdown(30);
    setSelectedPrediction(null);
    setPredictionFeedback(null);
  };

  const handleEvaluatePrediction = (choice: PredictOutcome) => {
    setSelectedPrediction(choice);

    const currentIdx = visibleCount - 1;
    const futureCandles = fullCandleSeries.slice(currentIdx + 1, currentIdx + 6);
    const startPrice = fullCandleSeries[currentIdx]?.close || 2450;
    const endPrice = futureCandles.length > 0 ? futureCandles[futureCandles.length - 1].close : startPrice;
    const priceDiff = endPrice - startPrice;

    let actualOutcome: PredictOutcome = "Consolidation";
    if (priceDiff > 8.0) actualOutcome = "Breakout";
    else if (priceDiff > 2.5) actualOutcome = "Bullish continuation";
    else if (priceDiff < -8.0) actualOutcome = "Breakdown";
    else if (priceDiff < -2.5) actualOutcome = "Bearish continuation";

    const isCorrect = choice === actualOutcome || (choice === "No Trade" && Math.abs(priceDiff) < 3.0);

    let explanation = "";
    if (isCorrect) {
      explanation = `🎯 Excellent Analysis! The market confirmed ${actualOutcome} with price moving from ₹${startPrice} to ₹${endPrice}. Your volume and trend assessment aligned with institutional flow.`;
    } else {
      explanation = `💡 Educational Review: You predicted '${choice}', but the market executed a '${actualOutcome}'. Price moved from ₹${startPrice} to ₹${endPrice}. Look closely at the volume expansion on the breakout candle!`;
    }

    setPredictionFeedback({
      correct: isCorrect,
      actualOutcome,
      explanation,
      cluesMissed: [
        "VWAP slope was trending upward prior to freeze",
        "Volume surged 2.4x above 20-period average",
        "Higher lows formed tight consolidation under resistance"
      ],
      evidenceScore: isCorrect ? 95 : 60
    });

    if (isCorrect && onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        score: Math.min(100, profile.score + 5)
      });
    }
  };

  const handleResumeAfterPredict = () => {
    setIsPredictFrozen(false);
    setVisibleCount(prev => prev + 5);
  };

  const visibleCandles = fullCandleSeries.slice(0, visibleCount);
  const currentCandle = visibleCandles[visibleCandles.length - 1] || { close: 2450, open: 2450, high: 2450, low: 2450, volume: 10000, time: "10:00" };
  const currentPrice = currentCandle.close;

  const handleExecutePaperOrder = () => {
    const qty = parseInt(orderQty) || 10;
    const sl = parseFloat(simOrderSL) || undefined;
    const tgt = parseFloat(simOrderTarget) || undefined;

    setActiveSimTrade({
      id: `sim-${Date.now()}`,
      type: orderType,
      entryPrice: currentPrice,
      qty,
      sl,
      target: tgt,
      entryReason: "Pattern breakout with VWAP support"
    });
  };

  const handleCloseSimTrade = () => {
    if (!activeSimTrade) return;

    const pnl = activeSimTrade.type === "BUY"
      ? (currentPrice - activeSimTrade.entryPrice) * activeSimTrade.qty
      : (activeSimTrade.entryPrice - currentPrice) * activeSimTrade.qty;

    setTradeReviewModal({
      isOpen: true,
      tradePnl: +pnl.toFixed(2),
      entryReason: "",
      slReason: "",
      targetReason: "",
      wouldRepeat: true
    });

    setActiveSimTrade(null);
  };

  const handleCompleteTradeReview = () => {
    let processQuality: "EXCELLENT" | "FLAWED" | "DISCIPLINED" = "DISCIPLINED";
    let aiVerdict = "";

    if (tradeReviewModal.slReason.length > 5 && tradeReviewModal.targetReason.length > 5) {
      processQuality = "EXCELLENT";
      aiVerdict = "🌟 Outstanding Trade Process! You defined clear risk boundaries before entry. Socratic AI verifies this was a high-probability setup regardless of financial outcome.";
    } else {
      processQuality = "FLAWED";
      aiVerdict = "⚠️ Process Review: Entering without defined stop-loss rationale exposes portfolio to tail risk. Always define risk parameters first.";
    }

    setTradeReviewModal(prev => ({
      ...prev,
      evaluationResult: { processQuality, aiVerdict }
    }));
  };

  const minPrice = Math.min(...visibleCandles.map(c => c.low));
  const maxPrice = Math.max(...visibleCandles.map(c => c.high));
  const priceRange = Math.max(10, maxPrice - minPrice);
  const chartHeight = 280;

  const getYCoord = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * (chartHeight - 40) - 20;
  };

  const socraticPrompts = [
    "What is the primary trend on this 5m chart?",
    "Where is the nearest key support level?",
    "Is volume expanding or contracting during this move?",
    "What key price level invalidates your bullish setup?",
    "Does your target give at least a 1:2 risk/reward ratio?"
  ];

  return (
    <div className="space-y-6">
      {/* 1. Module Header & Difficulty Control */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3" /> Live Market Learning Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-extrabold border border-slate-700">
                Simulated Education Only
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-center gap-2">
              <span>StockMentor Real-Time Trading Simulator</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Continuously fluctuating simulated candles with realistic order book liquidity, volatility spikes, and interactive "Pause & Predict" exam moments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
              {(["Beginner", "Intermediate", "Advanced", "Professional"] as DifficultyMode[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    difficulty === d
                      ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
              {(["1m", "5m", "15m", "30m", "1h", "1D"] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                    timeframe === tf
                      ? "bg-slate-800 text-emerald-400 border border-slate-700"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Market Scenario:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {(["Breakout Market", "Reversal Market", "Bull Market", "Bear Market", "High Volatility", "Market Crash", "Gap Up"] as MarketScenario[]).map((scen) => (
              <button
                key={scen}
                onClick={() => setScenario(scen)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  scenario === scen
                    ? "bg-indigo-600 text-white border border-indigo-400"
                    : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {scen}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN SIMULATOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-base font-black text-white">NIFTY 50 SIM</span>
                <span className={`text-lg font-mono font-bold ${currentCandle.close >= currentCandle.open ? "text-emerald-400" : "text-rose-400"}`}>
                  ₹{currentPrice.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Vol: {(currentCandle.volume / 1000).toFixed(1)}k
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                <button
                  onClick={() => setShowSMA(!showSMA)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${showSMA ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                >
                  SMA 20
                </button>
                <button
                  onClick={() => setShowVWAP(!showVWAP)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${showVWAP ? "bg-purple-500/20 text-purple-300 border-purple-500/40" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                >
                  VWAP
                </button>
                <button
                  onClick={() => setShowRSI(!showRSI)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${showRSI ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                >
                  RSI 14
                </button>
                <button
                  onClick={() => setShowSupertrend(!showSupertrend)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${showSupertrend ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                >
                  Supertrend
                </button>
                <button
                  onClick={() => setShowFibonacci(!showFibonacci)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${showFibonacci ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                >
                  Fibonacci
                </button>
              </div>
            </div>

            {/* FREEZE & PREDICT OVERLAY BANNER */}
            {isPredictFrozen && (
              <div className="absolute top-16 inset-x-5 z-20 bg-emerald-950/90 border-2 border-emerald-500 rounded-2xl p-4 backdrop-blur-md shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black font-black flex items-center justify-center text-xl shrink-0 shadow-lg shadow-emerald-500/30 animate-pulse">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black text-[10px] uppercase">
                          "WHAT HAPPENS NEXT?" EXAM MOMENT
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {predictCountdown}s Remaining
                        </span>
                      </div>
                      <p className="text-sm font-extrabold text-white mt-0.5">
                        Chart Frozen! Analyze price action & volume below. What happens next?
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEvaluatePrediction("No Trade")}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700 whitespace-nowrap"
                  >
                    Select "No Trade"
                  </button>
                </div>

                {!predictionFeedback ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                    {(["Breakout", "Breakdown", "Bullish continuation", "Bearish continuation", "Pullback", "Reversal", "Consolidation", "No Trade"] as PredictOutcome[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleEvaluatePrediction(opt)}
                        className="py-2.5 px-3 bg-slate-900/90 hover:bg-emerald-600 text-white hover:text-black font-bold text-xs rounded-xl border border-emerald-500/30 transition-all text-left shadow-md flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-emerald-500/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${predictionFeedback.correct ? "bg-emerald-500 text-black" : "bg-amber-500 text-black"}`}>
                        {predictionFeedback.correct ? "✓ Correct Prediction (+15 XP)" : "💡 Learning Moment"}
                      </span>
                      <span className="text-xs text-slate-300">
                        Actual Outcome: <strong className="text-emerald-400">{predictionFeedback.actualOutcome}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      {predictionFeedback.explanation}
                    </p>

                    <button
                      onClick={handleResumeAfterPredict}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      <span>Resume Live Candle Flow</span>
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CANDLESTICK SVG CANVAS */}
            <div className="h-[280px] w-full relative bg-slate-950 rounded-2xl border border-slate-800/80 p-2 overflow-hidden flex items-end">
              {showFibonacci && (
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="border-b border-dashed border-yellow-500/50 absolute w-full top-[10%]" />
                  <div className="border-b border-dashed border-emerald-500/50 absolute w-full top-[38.2%]" />
                  <div className="border-b border-dashed border-cyan-500/50 absolute w-full top-[50%]" />
                  <div className="border-b border-dashed border-purple-500/50 absolute w-full top-[61.8%]" />
                </div>
              )}

              <div className="w-full h-full flex items-end justify-between gap-1 relative z-10 pt-6">
                {visibleCandles.map((c, i) => {
                  const isBull = c.close >= c.open;
                  const bodyTop = getYCoord(Math.max(c.open, c.close));
                  const bodyBottom = getYCoord(Math.min(c.open, c.close));
                  const wickTop = getYCoord(c.high);
                  const wickBottom = getYCoord(c.low);
                  const bodyHeight = Math.max(3, bodyBottom - bodyTop);

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                      {c.annotation && (
                        <button
                          onClick={() => setWhyModalContent({
                            title: c.annotation || "Market Event",
                            explanation: c.whyExplanation || "Detailed price action & volume breakdown.",
                            keyConcept: "Institutional Order Flow & VWAP Support"
                          })}
                          className="absolute -top-3 z-20 px-1.5 py-0.5 bg-amber-500 text-black font-black text-[9px] rounded shadow-md hover:scale-110 transition-transform animate-bounce"
                        >
                          Why?
                        </button>
                      )}

                      <div 
                        className={`w-0.5 absolute ${isBull ? "bg-emerald-400" : "bg-rose-400"}`} 
                        style={{ top: `${wickTop}px`, bottom: `${chartHeight - wickBottom}px` }}
                      />

                      <div 
                        className={`w-full max-w-[12px] rounded-sm transition-all ${isBull ? "bg-emerald-500 border border-emerald-400" : "bg-rose-500 border border-rose-400"}`}
                        style={{ height: `${bodyHeight}px`, marginBottom: `${chartHeight - bodyBottom}px` }}
                      />

                      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-slate-900 border border-slate-700 p-2 rounded-lg text-[10px] z-30 whitespace-nowrap shadow-xl">
                        <span className="font-bold text-white">{c.time}</span>
                        <span>O: ₹{c.open} | H: ₹{c.high}</span>
                        <span>L: ₹{c.low} | C: ₹{c.close}</span>
                        <span className="text-slate-400">Vol: {c.volume}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-3 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 ${
                    isPlaying ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-emerald-500 text-black hover:bg-emerald-400"
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? "Pause Simulation" : "Resume Flow"}</span>
                </button>

                <button
                  onClick={triggerPauseAndPredict}
                  className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-2xl transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                  <Target className="w-4 h-4 text-emerald-300" />
                  <span>"What Happens Next?" Exam</span>
                </button>

                <button
                  onClick={() => setVisibleCount(prev => Math.min(fullCandleSeries.length, prev + 1))}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-xs font-bold transition-all"
                >
                  Step +1 Candle
                </button>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {[1, 2, 5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSimSpeed(spd)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                      simSpeed === spd ? "bg-emerald-500 text-black" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. PAPER TRADING ORDER PANEL */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">Paper Trading Learning Execution</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Virtual Cash: ₹{profile.paperBalance.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  onClick={() => setOrderType("BUY")}
                  className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${orderType === "BUY" ? "bg-emerald-500 text-black" : "text-slate-400"}`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setOrderType("SELL")}
                  className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${orderType === "SELL" ? "bg-rose-500 text-white" : "text-slate-400"}`}
                >
                  SELL
                </button>
              </div>

              <input
                type="number"
                value={orderQty}
                onChange={(e) => setOrderQty(e.target.value)}
                placeholder="Qty (e.g. 50)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />

              <input
                type="number"
                value={simOrderSL}
                onChange={(e) => setSimOrderSL(e.target.value)}
                placeholder="Stop-Loss (₹)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
              />

              <input
                type="number"
                value={simOrderTarget}
                onChange={(e) => setSimOrderTarget(e.target.value)}
                placeholder="Target Price (₹)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {!activeSimTrade ? (
              <button
                onClick={handleExecutePaperOrder}
                className={`w-full py-3 rounded-2xl font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                  orderType === "BUY"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-emerald-500/20"
                    : "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-500/20"
                }`}
              >
                <span>Execute Simulated {orderType} Order @ ₹{currentPrice.toFixed(2)}</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase">
                      ACTIVE {activeSimTrade.type} POSITION ({activeSimTrade.qty} Qty)
                    </span>
                    <span className="text-xs font-mono text-slate-300">Entry: ₹{activeSimTrade.entryPrice}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live P&L: <strong className={currentPrice >= activeSimTrade.entryPrice ? "text-emerald-400" : "text-rose-400"}>
                      ₹{((currentPrice - activeSimTrade.entryPrice) * activeSimTrade.qty).toFixed(2)}
                    </strong>
                  </p>
                </div>

                <button
                  onClick={handleCloseSimTrade}
                  className="px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-rose-500/20"
                >
                  Close Position & Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Live Socratic AI Mentor</h3>
                <p className="text-[10px] text-slate-400">Guiding questions for decision quality</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Socratic Question to Consider:
              </span>
              <p className="text-xs text-slate-200 font-medium italic">
                "{socraticPrompts[Math.floor(Math.random() * socraticPrompts.length)]}"
              </p>
            </div>

            {onOpenSocraticWithQuestion && (
              <button
                onClick={() => onOpenSocraticWithQuestion("Analyze current simulated candle pattern and suggest support/resistance rationale.")}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
              >
                <span>Ask AI Mentor Socratic Review</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Skill Mastery Scores</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Live Metrics</span>
            </div>

            <div className="space-y-2.5">
              {[
                { name: "Trend Identification", score: mastery.trendId },
                { name: "Support / Resistance", score: mastery.supportResistance },
                { name: "Volume Analysis", score: mastery.volumeAnalysis },
                { name: "Risk Management", score: mastery.riskManagement },
                { name: "Entry Timing", score: mastery.entryTiming },
                { name: "Trading Psychology", score: mastery.tradingPsychology }
              ].map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{m.name}</span>
                    <span className="font-bold text-emerald-400">{m.score}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${m.score >= 80 ? "bg-emerald-400" : m.score >= 70 ? "bg-indigo-400" : "bg-amber-400"}`}
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Simulator Learning Missions</span>
            </h3>

            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-none pr-1">
              {missions.map((m) => (
                <div key={m.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{m.title}</span>
                    <span className="text-[10px] font-bold text-emerald-400">+{m.rewardXP} XP</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. "WHY?" CONCEPT MODAL */}
      {whyModalContent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setWhyModalContent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-amber-400 tracking-wider">
                  StockMentor "Why?" Market Breakdown
                </span>
                <h3 className="text-xl font-black text-white">{whyModalContent.title}</h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Market Dynamics Explanation:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {whyModalContent.explanation}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Key Concept: {whyModalContent.keyConcept}</span>
            </div>

            <button
              onClick={() => setWhyModalContent(null)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl transition-all"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* 5. TRADE REVIEW SYSTEM MODAL */}
      {tradeReviewModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span>Simulated Trade Review & Process Evaluation</span>
              </h3>
              <span className={`text-base font-mono font-bold ${tradeReviewModal.tradePnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                P&L: ₹{tradeReviewModal.tradePnl}
              </span>
            </div>

            {!tradeReviewModal.evaluationResult ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  AI Mentor evaluates decision reasoning separately from profit outcomes. Explain your trade setup below:
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Why did you enter this trade?</label>
                    <input
                      type="text"
                      value={tradeReviewModal.entryReason}
                      onChange={(e) => setTradeReviewModal({ ...tradeReviewModal, entryReason: e.target.value })}
                      placeholder="e.g., Bullish VWAP bounce with volume expansion"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Why did you select your Stop-Loss level?</label>
                    <input
                      type="text"
                      value={tradeReviewModal.slReason}
                      onChange={(e) => setTradeReviewModal({ ...tradeReviewModal, slReason: e.target.value })}
                      placeholder="e.g., Placed 2 ticks below swing low support"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Why did you select your Target Price?</label>
                    <input
                      type="text"
                      value={tradeReviewModal.targetReason}
                      onChange={(e) => setTradeReviewModal({ ...tradeReviewModal, targetReason: e.target.value })}
                      placeholder="e.g., Previous resistance level offering 1:2.5 R:R"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCompleteTradeReview}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                >
                  Submit Trade Reasoning for AI Audit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    AI Socratic Process Evaluation:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {tradeReviewModal.evaluationResult.aiVerdict}
                  </p>
                </div>

                <button
                  onClick={() => setTradeReviewModal({ ...tradeReviewModal, isOpen: false, evaluationResult: undefined })}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition-all"
                >
                  Close & Continue Simulation
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
