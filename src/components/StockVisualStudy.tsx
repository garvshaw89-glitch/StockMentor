import React, { useState } from "react";
import { AIVisualDiagram, DiagramType } from "./AIVisualDiagram";
import { 
  BarChart2, 
  TrendingUp, 
  ShieldAlert, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Brain, 
  ArrowRight,
  Layers,
  PieChart,
  Activity,
  Zap,
  Info,
  DollarSign,
  Award,
  ChevronRight,
  Send
} from "lucide-react";

export interface StockStudyItem {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  analysisType: "Technical Breakout" | "Fundamental Valuation" | "Candlestick Reversal" | "Peer Multiples" | "Risk Management" | "Options Chain";
  diagramType: DiagramType;
  currentPrice: string;
  peRatio: string;
  pbRatio: string;
  roe: string;
  rsi: string;
  trend: string;
  diagramTitle: string;
  diagramSubtitle: string;
  overview: string;
  theoryBreakdown: {
    sectionTitle: string;
    content: string;
  }[];
  keyMetrics: { label: string; value: string; assessment: "Positive" | "Neutral" | "Caution" }[];
  keyTakeaways: string[];
  risksToWatch: string[];
  correctDecision: "BUY" | "HOLD" | "SELL";
  idealReasoning: string;
}

export const FEATURED_STOCK_STUDIES: StockStudyItem[] = [
  {
    id: "study-reliance",
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    sector: "Oil, Gas & Retail & Telecom",
    analysisType: "Technical Breakout",
    diagramType: "breakout",
    currentPrice: "₹2,980.50",
    peRatio: "26.4x",
    pbRatio: "2.3x",
    roe: "11.2%",
    rsi: "64.5",
    trend: "Strong Bullish Breakout",
    diagramTitle: "Reliance Resistance Breakout & Volume Profile",
    diagramSubtitle: "Ascending triangle pattern breakout above major resistance level (₹2,920) supported by 2.5x average daily volume.",
    overview: "Reliance Industries exhibits a textbook technical breakout setup. After 3 months of consolidation between ₹2,750 and ₹2,920, the price breached ₹2,920 with high institutional volume, establishing a new support level.",
    theoryBreakdown: [
      {
        sectionTitle: "1. Ascending Triangle & Volume Confirmation",
        content: "An Ascending Triangle is a continuation chart pattern created by a horizontal resistance line and a rising support trendline. When price breaks above the horizontal resistance with elevated trading volume, it confirms buyer aggressiveness and signals a high-probability bullish trend continuation."
      },
      {
        sectionTitle: "2. Volume Profile & Point of Control (POC)",
        content: "The Volume Profile shows the distribution of traded volume across price levels. The Point of Control (POC) for Reliance sits at ₹2,850, acting as a structural floor. Buying above the POC ensures institutional order flow aligns with the trade."
      },
      {
        sectionTitle: "3. Stop Loss & Target Construction",
        content: "To maintain a favorable 1:3 Risk-to-Reward ratio, place the Stop Loss just below the breakout retest zone at ₹2,890 (Risk: ₹90/share) with a target of ₹3,250 (Reward: ₹270/share)."
      }
    ],
    keyMetrics: [
      { label: "Price / Earnings (P/E)", value: "26.4x", assessment: "Neutral" },
      { label: "Volume Surge", value: "2.5x Avg", assessment: "Positive" },
      { label: "RSI Momentum (14-period)", value: "64.5", assessment: "Positive" },
      { label: "Distance to 200 EMA", value: "+8.2%", assessment: "Positive" }
    ],
    keyTakeaways: [
      "Breakout setups require volume confirmation to avoid false breakout sweeps.",
      "Always wait for a candle close above resistance before initiating a position.",
      "In corporate conglomerates, sector tailwinds (e.g., telecom ARPU growth) provide underlying momentum."
    ],
    risksToWatch: [
      "Global crude oil price fluctuations affecting refining margins.",
      "Risk of a false breakout if price closes back below ₹2,920."
    ],
    correctDecision: "BUY",
    idealReasoning: "A clear technical breakout above ₹2,920 resistance backed by 2.5x volume expansion creates a high-probability long setup with a 1:3 Risk-to-Reward ratio."
  },
  {
    id: "study-infosys",
    symbol: "INFY",
    name: "Infosys Ltd",
    sector: "Information Technology",
    analysisType: "Fundamental Valuation",
    diagramType: "valuation_pe",
    currentPrice: "₹1,820.00",
    peRatio: "24.2x",
    pbRatio: "7.8x",
    roe: "31.5%",
    rsi: "52.0",
    trend: "Fair Value Consolidation",
    diagramTitle: "Infosys P/E Band & Free Cash Flow Yield Diagram",
    diagramSubtitle: "Evaluating current valuation (24.2x P/E) relative to 5-year median (25.5x) and industry peer benchmark.",
    overview: "Infosys is a Tier-1 IT services exporter with high Return on Equity (31.5%) and strong Free Cash Flow conversion. This study analyzes whether current valuation offers a sufficient Margin of Safety.",
    theoryBreakdown: [
      {
        sectionTitle: "1. P/E Valuation Band Analysis",
        content: "Comparing a company's current P/E ratio to its 5-year historical median indicates valuation compression or expansion. Infosys currently trades at 24.2x P/E vs its 5-year median of 25.5x, suggesting fair valuation without significant overpricing."
      },
      {
        sectionTitle: "2. Cash Flow Quality & Dividend Yield",
        content: "Infosys converts over 85% of its Net Operating Profit after Tax into Free Cash Flow. A steady Free Cash Flow yield of 3.8% provides downside protection and supports a strong dividend payout policy."
      },
      {
        sectionTitle: "3. Margin of Safety Principle",
        content: "Benjamin Graham's Margin of Safety requires buying securities at a discount to intrinsic value. At 24.2x P/E with 12% revenue growth, Infosys provides a moderate margin of safety for long-term compounders."
      }
    ],
    keyMetrics: [
      { label: "Return on Equity (ROE)", value: "31.5%", assessment: "Positive" },
      { label: "P/E Ratio vs Median", value: "24.2x / 25.5x", assessment: "Positive" },
      { label: "Debt to Equity Ratio", value: "0.08x", assessment: "Positive" },
      { label: "Dividend Yield", value: "2.4%", assessment: "Positive" }
    ],
    keyTakeaways: [
      "Tier-1 IT exporters generate pristine free cash flow with minimal debt.",
      "Valuation metrics must be assessed alongside industry growth forecasts.",
      "High ROE (>25%) indicates management efficiency in generating shareholder returns."
    ],
    risksToWatch: [
      "Slowing enterprise IT spending in US and European banking clients.",
      "Currency fluctuation risks between USD/INR."
    ],
    correctDecision: "BUY",
    idealReasoning: "Infosys offers a rare combination of high ROE (31.5%), pristine balance sheet with zero net debt, and a fair valuation slightly below its 5-year median P/E."
  },
  {
    id: "study-tatamotors",
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    sector: "Automobile & EV",
    analysisType: "Candlestick Reversal",
    diagramType: "candlestick",
    currentPrice: "₹1,010.25",
    peRatio: "16.8x",
    pbRatio: "3.4x",
    roe: "22.4%",
    rsi: "42.0",
    trend: "Bullish Reversal at 200 EMA",
    diagramTitle: "Tata Motors Bullish Engulfing Reversal Pattern",
    diagramSubtitle: "A strong Bullish Engulfing candle forming precisely at the 200-period Exponential Moving Average (EMA) support zone.",
    overview: "Tata Motors experienced a 12% pull-back from all-time highs to touch its 200-day EMA at ₹980. On the daily timeframe, a strong Bullish Engulfing candlestick emerged, signaling seller exhaustion and buyer entry.",
    theoryBreakdown: [
      {
        sectionTitle: "1. Candlestick Anatomy: Bullish Engulfing",
        content: "A Bullish Engulfing pattern consists of two candles: a smaller red candle followed by a large green candle whose body completely covers (engulfs) the previous candle. It reflects a decisive shift in market sentiment from sellers to buyers."
      },
      {
        sectionTitle: "2. Dynamic Support via 200-Day EMA",
        content: "The 200-day EMA represents the long-term institutional trend floor. When a reversal candlestick forms at the 200 EMA, institutional buyers often step in to defend the long-term trend."
      },
      {
        sectionTitle: "3. Divergence & Volume Confirmation",
        content: "In tandem with the Bullish Engulfing pattern, the 14-period RSI showed a bullish divergence (higher low on RSI while price made a lower low), strengthening the reversal thesis."
      }
    ],
    keyMetrics: [
      { label: "Key Reversal Candlestick", value: "Engulfing", assessment: "Positive" },
      { label: "Dynamic Support", value: "200 EMA (₹980)", assessment: "Positive" },
      { label: "RSI Divergence", value: "Bullish", assessment: "Positive" },
      { label: "P/E Ratio", value: "16.8x", assessment: "Positive" }
    ],
    keyTakeaways: [
      "Candlestick patterns are significantly more reliable when backed by key technical levels (200 EMA, Support lines).",
      "Bullish Engulfing candles signal swift momentum shift from bear control to bull dominance.",
      "RSI divergence adds confluence to technical entry setups."
    ],
    risksToWatch: [
      "A daily candle close below ₹975 would invalidate the reversal pattern.",
      "Global automotive supply chain dynamics and commodity input costs."
    ],
    correctDecision: "BUY",
    idealReasoning: "The confluence of a Bullish Engulfing candlestick, 200 EMA dynamic support, and bullish RSI divergence presents a high-probability reversal setup with minimal downside risk."
  },
  {
    id: "study-hdfcbank",
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    sector: "Banking & Financial Services",
    analysisType: "Peer Multiples",
    diagramType: "valuation_pe",
    currentPrice: "₹1,640.00",
    peRatio: "18.5x",
    pbRatio: "2.6x",
    roe: "16.8%",
    rsi: "48.5",
    trend: "Value Accumulation Zone",
    diagramTitle: "HDFC Bank Price-to-Book (P/B) Peer Comparison",
    diagramSubtitle: "Evaluating valuation multiples post-merger: P/B of 2.6x vs historical decade average of 3.8x.",
    overview: "HDFC Bank trades at historically compressed valuation multiples following its merger with HDFC Ltd. With asset quality intact (Gross NPA at 1.24%) and loan growth at 15% YoY, the stock presents an attractive value proposition.",
    theoryBreakdown: [
      {
        sectionTitle: "1. Price-to-Book (P/B) for Financial Institutions",
        content: "For banks, Price-to-Book (P/B) is the primary valuation metric because bank assets (loans) and liabilities (deposits) are liquid and mark-to-market. A P/B ratio of 2.6x for India's premier private lender is near 10-year valuation lows."
      },
      {
        sectionTitle: "2. Net Interest Margin (NIM) & Credit Cost",
        content: "Net Interest Margin measures the difference between interest earned on loans and interest paid on deposits. HDFC Bank maintains NIMs around 3.6% with industry-leading low credit costs (provision coverage > 70%)."
      },
      {
        sectionTitle: "3. Mean Reversion Thesis",
        content: "Financial theory suggests that high-quality assets trading at extreme statistical discounts tend to revert to their historical valuation mean over a 2-3 year horizon."
      }
    ],
    keyMetrics: [
      { label: "Price-to-Book Ratio", value: "2.6x", assessment: "Positive" },
      { label: "Gross NPA Ratio", value: "1.24%", assessment: "Positive" },
      { label: "Deposit Growth YoY", value: "16.5%", assessment: "Positive" },
      { label: "Capital Adequacy Ratio", value: "19.2%", assessment: "Positive" }
    ],
    keyTakeaways: [
      "Bank valuation relies heavily on P/B ratio and asset quality (NPA levels).",
      "Post-merger integration periods often create temporary valuation discounts.",
      "Low credit costs and strong capital adequacy provide long-term balance sheet stability."
    ],
    risksToWatch: [
      "Deposit mobilization pressure across the banking system.",
      "NIM compression if deposit rates remain elevated for longer."
    ],
    correctDecision: "BUY",
    idealReasoning: "HDFC Bank trading at a historical P/B discount of 2.6x with pristine NPA levels (1.24%) represents a classic value accumulation opportunity."
  },
  {
    id: "study-icicibank",
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    sector: "Banking & Financial Services",
    analysisType: "Risk Management",
    diagramType: "risk_reward",
    currentPrice: "₹1,210.00",
    peRatio: "17.2x",
    pbRatio: "3.1x",
    roe: "18.9%",
    rsi: "58.0",
    trend: "Uptrend Swing Trade",
    diagramTitle: "ICICI Bank Position Sizing & 1:3 Risk-Reward Box",
    diagramSubtitle: "Calculating position size for a ₹10,000 max risk parameter with Entry at ₹1,210, Stop Loss at ₹1,170, Target at ₹1,330.",
    overview: "This study demonstrates exact mathematical risk management for a swing trade on ICICI Bank. By defining Stop Loss and Target before entering, the trader guarantees positive mathematical expectancy.",
    theoryBreakdown: [
      {
        sectionTitle: "1. The 1% Portfolio Risk Rule",
        content: "A disciplined trader never risks more than 1% of total portfolio capital on a single trade setup. On a ₹1,000,000 portfolio, maximum risk per trade equals ₹10,000."
      },
      {
        sectionTitle: "2. Position Sizing Formula",
        content: "Position Size (Quantity) = Max Rupee Risk / (Entry Price - Stop Loss Price). For ICICI Bank: ₹10,000 / (₹1,210 - ₹1,170) = ₹10,000 / ₹40 = 250 Shares."
      },
      {
        sectionTitle: "3. Mathematical Expectancy",
        content: "With a 1:3 Risk-to-Reward ratio (Risk: ₹40, Target: ₹120), a trader can be wrong 60% of the time (40% win rate) and still remain consistently profitable over 50 trades."
      }
    ],
    keyMetrics: [
      { label: "Entry Price", value: "₹1,210", assessment: "Neutral" },
      { label: "Stop Loss Price", value: "₹1,170", assessment: "Caution" },
      { label: "Target Price", value: "₹1,330", assessment: "Positive" },
      { label: "Risk-to-Reward Ratio", value: "1 : 3", assessment: "Positive" }
    ],
    keyTakeaways: [
      "Always calculate position size based on Stop Loss distance, not arbitrary quantity.",
      "A 1:3 Risk-to-Reward ratio ensures profitability even with a sub-50% win rate.",
      "Stop Loss execution must be mechanical without emotional hesitation."
    ],
    risksToWatch: [
      "Over-leveraging beyond predefined risk limits.",
      "Unexpected overnight gap-down risks due to global macro news."
    ],
    correctDecision: "BUY",
    idealReasoning: "A swing trade setup with a clearly defined ₹40 Stop Loss and ₹120 Target delivers a 1:3 Risk-Reward ratio with exact mathematical position sizing."
  }
];

export const StockVisualStudy: React.FC = () => {
  const [activeStudy, setActiveStudy] = useState<StockStudyItem>(FEATURED_STOCK_STUDIES[0]);
  const [selectedDecision, setSelectedDecision] = useState<"BUY" | "HOLD" | "SELL" | null>(null);
  const [userReasoning, setUserReasoning] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [aiEvaluation, setAiEvaluation] = useState<{
    score: number;
    praise: string;
    constructiveFeedback: string;
    keyTakeaways: string[];
    idealAnalysis: string;
  } | null>(null);

  const handleEvaluateReasoning = async () => {
    if (!selectedDecision || !userReasoning.trim()) return;
    setIsEvaluating(true);

    try {
      const response = await fetch("/api/ai/eval-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockName: `${activeStudy.name} (${activeStudy.symbol})`,
          decision: selectedDecision,
          userReasoning,
          financialData: {
            price: activeStudy.currentPrice,
            pe: activeStudy.peRatio,
            roe: activeStudy.roe,
            rsi: activeStudy.rsi,
            trend: activeStudy.trend,
            analysisType: activeStudy.analysisType
          }
        })
      });

      const data = await response.json();
      setAiEvaluation(data.evaluation || {
        score: selectedDecision === activeStudy.correctDecision ? 90 : 60,
        praise: `Good attempt analyzing ${activeStudy.symbol}! You recognized key elements of the setup.`,
        constructiveFeedback: `Ideal decision for this setup is ${activeStudy.correctDecision}. ${activeStudy.idealReasoning}`,
        keyTakeaways: activeStudy.keyTakeaways,
        idealAnalysis: activeStudy.idealReasoning
      });
    } catch (err) {
      setAiEvaluation({
        score: selectedDecision === activeStudy.correctDecision ? 88 : 65,
        praise: `Strong analytical initiative on ${activeStudy.symbol}!`,
        constructiveFeedback: `Remember to align technical signals with predefined risk parameters. Ideal Decision: ${activeStudy.correctDecision}.`,
        keyTakeaways: activeStudy.keyTakeaways,
        idealAnalysis: activeStudy.idealReasoning
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSwitchStudy = (study: StockStudyItem) => {
    setActiveStudy(study);
    setSelectedDecision(null);
    setUserReasoning("");
    setAiEvaluation(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-500" />
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Visual Stock Analysis & AI Case Studies
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Interactive visual charts, fundamental financial flow diagrams, and Socratic decision training across major Indian stocks.
            </p>
          </div>

          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>AI Visual Analysis Engine Active</span>
          </div>
        </div>

        {/* Stock Switcher Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
          {FEATURED_STOCK_STUDIES.map(study => (
            <button
              key={study.id}
              onClick={() => handleSwitchStudy(study)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 border ${
                activeStudy.id === study.id
                  ? "bg-emerald-500 text-black border-emerald-500 shadow-md shadow-emerald-500/10"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{study.symbol}</span>
              <span className="text-[10px] font-mono opacity-80 border-l border-current/20 pl-2">
                {study.analysisType}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Stock Case Study View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Chart & Detailed Theory (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Stock Header Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-500">
                  {activeStudy.sector} • {activeStudy.analysisType}
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
                  <span>{activeStudy.name}</span>
                  <span className="text-sm font-mono text-slate-500">({activeStudy.symbol})</span>
                </h2>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono block">
                  {activeStudy.currentPrice}
                </span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
                  {activeStudy.trend}
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-semibold">P/E Ratio</span>
                <span className="font-extrabold font-mono text-slate-900 dark:text-white">{activeStudy.peRatio}</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-semibold">Return on Equity</span>
                <span className="font-extrabold font-mono text-slate-900 dark:text-white">{activeStudy.roe}</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-semibold">Price to Book</span>
                <span className="font-extrabold font-mono text-slate-900 dark:text-white">{activeStudy.pbRatio}</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-semibold">RSI Momentum</span>
                <span className="font-extrabold font-mono text-slate-900 dark:text-white">{activeStudy.rsi}</span>
              </div>
            </div>

            {/* Overview */}
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {activeStudy.overview}
            </p>
          </div>

          {/* Interactive Visual Chart Diagram */}
          <AIVisualDiagram
            type={activeStudy.diagramType}
            title={activeStudy.diagramTitle}
            subtitle={activeStudy.diagramSubtitle}
          />

          {/* Detailed Theory & Educational Breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Brain className="w-5 h-5 text-indigo-500" />
              <span>Theoretical & Analytical Breakdown</span>
            </h3>

            <div className="space-y-4">
              {activeStudy.theoryBreakdown.map((sec, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    {sec.sectionTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black text-emerald-500 uppercase tracking-wider block">
                Key Analytical Takeaways:
              </span>
              <ul className="space-y-2">
                {activeStudy.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Key Metrics & AI Analyst Sandbox (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Key Metrics Breakdown Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <BarChart2 className="w-4 h-4 text-emerald-500" />
              <span>Quantitative Financial Scorecard</span>
            </h3>

            <div className="space-y-2">
              {activeStudy.keyMetrics.map((km, kmIdx) => (
                <div key={kmIdx} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs border border-slate-200 dark:border-slate-700/80">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{km.label}</span>
                  <div className="flex items-center gap-2 font-bold font-mono">
                    <span className="text-slate-900 dark:text-white">{km.value}</span>
                    <span className={`px-2 py-0.5 text-[10px] rounded-full border ${
                      km.assessment === "Positive"
                        ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                        : km.assessment === "Neutral"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-amber-500/20 text-amber-500 border-amber-500/30"
                    }`}>
                      {km.assessment}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Warnings */}
            <div className="p-3.5 bg-amber-500/10 dark:bg-amber-950/30 rounded-xl border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Analyst Risks to Watch:</span>
              </span>
              <ul className="space-y-1 text-[11px] text-amber-900 dark:text-amber-200 list-disc list-inside">
                {activeStudy.risksToWatch.map((r, rIdx) => (
                  <li key={rIdx}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive AI Analyst Decision Sandbox */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Socratic Decision Sandbox</span>
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                You Are the Analyst: What's Your Call?
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Based on the visual chart diagram, financial metrics, and theoretical breakdown above, choose your recommendation for <strong>{activeStudy.symbol}</strong> and justify your reasoning.
            </p>

            {/* BUY / HOLD / SELL Decision Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {(["BUY", "HOLD", "SELL"] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setSelectedDecision(opt)}
                  className={`py-3 rounded-xl font-black text-xs border transition-all ${
                    selectedDecision === opt
                      ? opt === "BUY"
                        ? "bg-emerald-500 text-black border-emerald-500 shadow-md shadow-emerald-500/20"
                        : opt === "HOLD"
                        ? "bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20"
                        : "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Reasoning Input Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Explain your analytical reasoning:
              </label>
              <textarea
                rows={3}
                value={userReasoning}
                onChange={e => setUserReasoning(e.target.value)}
                placeholder={`e.g., I recommend ${selectedDecision || "BUY"} because the technical breakout on ${activeStudy.symbol} is supported by high volume and a favorable 1:3 Risk-Reward setup...`}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleEvaluateReasoning}
              disabled={!selectedDecision || !userReasoning.trim() || isEvaluating}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-xs transition-colors shadow-md shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isEvaluating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Evaluating Analytical Reasoning...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Reasoning for AI Evaluation</span>
                </>
              )}
            </button>

            {/* AI Evaluation Output Card */}
            {aiEvaluation && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-indigo-500/30 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-xs font-extrabold text-indigo-500 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>AI Scorecard</span>
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {aiEvaluation.score} / 100
                  </span>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                  {aiEvaluation.praise}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {aiEvaluation.constructiveFeedback}
                </p>

                <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <span className="font-extrabold block">Ideal Analytical Standard:</span>
                  <p className="italic">{aiEvaluation.idealAnalysis}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
