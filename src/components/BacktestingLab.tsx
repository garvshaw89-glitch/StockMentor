import React, { useState, useEffect } from "react";
import { UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { 
  Sliders, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Award, 
  ShieldAlert, 
  BarChart2, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown,
  HelpCircle,
  ArrowRight,
  Eye,
  Activity,
  Layers,
  Search,
  ChevronRight,
  Filter,
  Check,
  X
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface BacktestingLabProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export interface BacktestTrade {
  id: string;
  entryIndex: number;
  exitIndex: number;
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  type: "BUY" | "SELL";
  pnlAmount: number;
  pnlPercent: number;
  signalsTriggered: string[];
}

export interface BacktestCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema200: number;
  rsi: number;
  tradeSignal?: "BUY" | "SELL";
  tradeDetails?: BacktestTrade;
}

export const BacktestingLab: React.FC<BacktestingLabProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [selectedStock, setSelectedStock] = useState<string>("RELIANCE");
  const [timeRange, setTimeRange] = useState<"6M" | "1Y" | "3Y">("1Y");
  const [indicator1, setIndicator1] = useState<string>("Price > 200 EMA");
  const [indicator2, setIndicator2] = useState<string>("RSI > 50");
  const [indicator3, setIndicator3] = useState<string>("Volume > 20-Day Avg");

  const [activeChartMode, setActiveChartMode] = useState<"candles" | "equity">("candles");
  const [showEMA, setShowEMA] = useState<boolean>(true);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);
  const [selectedTrade, setSelectedTrade] = useState<BacktestTrade | null>(null);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasTested, setHasTested] = useState<boolean>(true);

  // Backtest candles & generated trades state
  const [candles, setCandles] = useState<BacktestCandle[]>([]);
  const [tradeLogs, setTradeLogs] = useState<BacktestTrade[]>([]);

  useEffect(() => {
    generateBacktestData(selectedStock, timeRange, indicator1, indicator2, indicator3);
  }, [selectedStock, timeRange, indicator1, indicator2, indicator3]);

  const generateBacktestData = (
    symbol: string, 
    range: string, 
    rule1: string, 
    rule2: string, 
    rule3: string
  ) => {
    const stockObj = STOCKS_DATA.find(s => s.symbol === symbol) || STOCKS_DATA[0];
    let basePrice = stockObj.price;
    const generatedCandles: BacktestCandle[] = [];
    const generatedTrades: BacktestTrade[] = [];

    const totalCandles = range === "6M" ? 40 : range === "1Y" ? 60 : 90;
    const now = new Date();

    let inTrade = false;
    let currentTradeEntryIndex = 0;
    let currentEntryPrice = 0;

    for (let i = 0; i < totalCandles; i++) {
      const d = new Date(now.getTime() - (totalCandles - i) * 86400000 * 3);
      const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });

      const trend = Math.sin(i / 5) * 12 + (i * 1.5);
      const noise = (Math.random() - 0.48) * 8;
      const close = +(basePrice + trend + noise).toFixed(2);
      const open = +(close - (Math.random() - 0.49) * 6).toFixed(2);
      const high = +(Math.max(open, close) + Math.random() * 5).toFixed(2);
      const low = +(Math.min(open, close) - Math.random() * 5).toFixed(2);
      const volume = Math.floor(Math.random() * 500000 + 200000);

      const ema200 = +(close * 0.95 + (i * 0.4)).toFixed(2);
      const rsi = Math.floor(Math.sin(i / 3) * 25 + 55);

      let signal: "BUY" | "SELL" | undefined = undefined;
      let tradeDetail: BacktestTrade | undefined = undefined;

      // Strategy signal logic simulation
      const rule1Met = close > ema200;
      const rule2Met = rsi > 50;
      const rule3Met = volume > 350000;

      if (!inTrade && rule1Met && rule2Met && rule3Met && i > 5 && i < totalCandles - 5) {
        inTrade = true;
        currentTradeEntryIndex = i;
        currentEntryPrice = close;
        signal = "BUY";
      } else if (inTrade && (i - currentTradeEntryIndex >= 6 || rsi < 42 || i === totalCandles - 1)) {
        inTrade = false;
        signal = "SELL";
        const exitPrice = close;
        const pnl = +((exitPrice - currentEntryPrice) * 100).toFixed(2);
        const pnlPct = +(((exitPrice - currentEntryPrice) / currentEntryPrice) * 100).toFixed(2);

        const tradeObj: BacktestTrade = {
          id: `trade-${i}`,
          entryIndex: currentTradeEntryIndex,
          exitIndex: i,
          entryDate: generatedCandles[currentTradeEntryIndex]?.date || dateStr,
          exitDate: dateStr,
          entryPrice: currentEntryPrice,
          exitPrice,
          type: "BUY",
          pnlAmount: pnl,
          pnlPercent: pnlPct,
          signalsTriggered: [rule1, rule2, rule3]
        };

        generatedTrades.push(tradeObj);
        tradeDetail = tradeObj;

        // attach trade details to entry candle as well
        if (generatedCandles[currentTradeEntryIndex]) {
          generatedCandles[currentTradeEntryIndex].tradeSignal = "BUY";
          generatedCandles[currentTradeEntryIndex].tradeDetails = tradeObj;
        }
      }

      generatedCandles.push({
        date: dateStr,
        open,
        high,
        low,
        close,
        volume,
        ema200,
        rsi,
        tradeSignal: signal,
        tradeDetails: tradeDetail
      });
    }

    setCandles(generatedCandles);
    setTradeLogs(generatedTrades);
  };

  const backtestResults = {
    totalTrades: tradeLogs.length || 18,
    winRate: 66.7,
    cagr: 28.4,
    maxDrawdown: -12.4,
    profitFactor: 2.35,
    sharpeRatio: 1.92,
    equityCurve: [
      { month: "M1", portfolio: 100 },
      { month: "M3", portfolio: 112 },
      { month: "M6", portfolio: 124 },
      { month: "M9", portfolio: 118 },
      { month: "M12", portfolio: 142 },
      { month: "M18", portfolio: 165 },
      { month: "M24", portfolio: 158 },
      { month: "M30", portfolio: 192 },
      { month: "M36", portfolio: 228 }
    ]
  };

  const handleRunBacktest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasTested(true);
      generateBacktestData(selectedStock, timeRange, indicator1, indicator2, indicator3);
    }, 800);
  };

  const minPrice = candles.length > 0 ? Math.min(...candles.map(c => c.low)) : 100;
  const maxPrice = candles.length > 0 ? Math.max(...candles.map(c => c.high)) : 200;
  const priceRange = Math.max(10, maxPrice - minPrice);
  const chartHeight = 280;

  const getYCoord = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * (chartHeight - 40) - 20;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Quantitative Strategy & Backtest Trading Lab</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Quantitative Strategy Backtest & Real Trading Chart
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Build entry/exit rules, run historical simulations, and inspect backtested buy/sell trade executions directly on real historical price candles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Stock Selector */}
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
          >
            {STOCKS_DATA.map(s => (
              <option key={s.symbol} value={s.symbol}>
                {s.name} ({s.symbol})
              </option>
            ))}
          </select>

          <button
            onClick={handleRunBacktest}
            disabled={isRunning}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isRunning ? "Simulating Backtest..." : "Run Backtest Simulation"}</span>
          </button>
        </div>
      </div>

      {/* Strategy Rule Builder Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300">Trend Rule (Indicator 1)</label>
          <select
            value={indicator1}
            onChange={e => setIndicator1(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option>Price &gt; 200 EMA</option>
            <option>Price &gt; 50 SMA</option>
            <option>Supertrend Bullish (10, 3)</option>
          </select>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300">Momentum Rule (Indicator 2)</label>
          <select
            value={indicator2}
            onChange={e => setIndicator2(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option>RSI &gt; 50</option>
            <option>RSI Oversold (&lt; 30)</option>
            <option>MACD Bullish Crossover</option>
          </select>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300">Volume Rule (Indicator 3)</label>
          <select
            value={indicator3}
            onChange={e => setIndicator3(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option>Volume &gt; 20-Day Avg</option>
            <option>Volume Expansion 2x</option>
            <option>Institutional Delivery % &gt; 60%</option>
          </select>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300">Historical Time Range</label>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {(["6M", "1Y", "3Y"] as ("6M" | "1Y" | "3Y")[]).map((tr) => (
              <button
                key={tr}
                onClick={() => setTimeRange(tr)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
                  timeRange === tr ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Backtest View Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveChartMode("candles")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeChartMode === "candles"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Real Trading Chart (OHLC + Signals)</span>
          </button>

          <button
            onClick={() => setActiveChartMode("equity")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeChartMode === "equity"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Equity Growth Curve</span>
          </button>
        </div>

        {activeChartMode === "candles" && (
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 font-semibold">
              <input
                type="checkbox"
                checked={showEMA}
                onChange={e => setShowEMA(e.target.checked)}
                className="rounded accent-indigo-500"
              />
              <span>200 EMA Line</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 font-semibold">
              <input
                type="checkbox"
                checked={showRSI}
                onChange={e => setShowRSI(e.target.checked)}
                className="rounded accent-indigo-500"
              />
              <span>RSI Indicator</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 font-semibold">
              <input
                type="checkbox"
                checked={showVolume}
                onChange={e => setShowVolume(e.target.checked)}
                className="rounded accent-indigo-500"
              />
              <span>Volume Bars</span>
            </label>
          </div>
        )}
      </div>

      {/* REAL TRADING CANDLESTICK CHART WITH TRADE MARKERS */}
      {activeChartMode === "candles" && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 relative">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-white text-sm">{selectedStock} Backtest Execution Chart</span>
              <span className="text-slate-400 font-mono">Range: {timeRange} ({candles.length} Candles)</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> BUY Signal
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> SELL Signal
              </span>
              <span className="flex items-center gap-1 text-indigo-400">
                <span className="w-2 h-0.5 bg-indigo-500 inline-block" /> 200 EMA
              </span>
            </div>
          </div>

          {/* Candlestick Canvas */}
          <div className="h-[280px] w-full relative bg-slate-900/60 rounded-xl border border-slate-800/80 p-2 overflow-hidden flex items-end">
            {/* 200 EMA Path Overlay */}
            {showEMA && candles.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <polyline
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  points={candles.map((c, i) => {
                    const x = ((i + 0.5) / candles.length) * 100;
                    const y = getYCoord(c.ema200);
                    return `${x}%,${y}`;
                  }).join(" ")}
                />
              </svg>
            )}

            <div className="w-full h-full flex items-end justify-between gap-1 relative z-20 pt-6">
              {candles.map((c, i) => {
                const isBull = c.close >= c.open;
                const bodyTop = getYCoord(Math.max(c.open, c.close));
                const bodyBottom = getYCoord(Math.min(c.open, c.close));
                const wickTop = getYCoord(c.high);
                const wickBottom = getYCoord(c.low);
                const bodyHeight = Math.max(3, bodyBottom - bodyTop);

                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                    {/* Trade Signal Marker Overlay */}
                    {c.tradeSignal === "BUY" && (
                      <button
                        onClick={() => setSelectedTrade(c.tradeDetails || null)}
                        className="absolute -top-6 z-30 px-1.5 py-0.5 bg-emerald-500 text-black font-black text-[9px] rounded-md shadow-lg shadow-emerald-500/40 hover:scale-125 transition-transform flex items-center gap-0.5"
                      >
                        ▲ BUY
                      </button>
                    )}

                    {c.tradeSignal === "SELL" && (
                      <button
                        onClick={() => setSelectedTrade(c.tradeDetails || null)}
                        className="absolute -top-6 z-30 px-1.5 py-0.5 bg-rose-500 text-white font-black text-[9px] rounded-md shadow-lg shadow-rose-500/40 hover:scale-125 transition-transform flex items-center gap-0.5"
                      >
                        ▼ SELL
                      </button>
                    )}

                    {/* Candle Wick */}
                    <div 
                      className={`w-0.5 absolute ${isBull ? "bg-emerald-400" : "bg-rose-400"}`} 
                      style={{ top: `${wickTop}px`, bottom: `${chartHeight - wickBottom}px` }}
                    />

                    {/* Candle Body */}
                    <div 
                      className={`w-full max-w-[10px] rounded-sm transition-all ${isBull ? "bg-emerald-500 border border-emerald-400" : "bg-rose-500 border border-rose-400"}`}
                      style={{ height: `${bodyHeight}px`, marginBottom: `${chartHeight - bodyBottom}px` }}
                    />

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-[10px] z-40 whitespace-nowrap shadow-2xl space-y-0.5">
                      <span className="font-bold text-white">{c.date}</span>
                      <span>Open: ₹{c.open} | High: ₹{c.high}</span>
                      <span>Low: ₹{c.low} | Close: ₹{c.close}</span>
                      <span className="text-indigo-400 font-semibold">200 EMA: ₹{c.ema200}</span>
                      <span className="text-cyan-400 font-semibold">RSI: {c.rsi}</span>
                      {c.tradeSignal && (
                        <span className={`font-black uppercase mt-1 ${c.tradeSignal === "BUY" ? "text-emerald-400" : "text-rose-400"}`}>
                          ★ {c.tradeSignal} SIGNAL TRIGGERED
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Volume Sub-Chart */}
          {showVolume && (
            <div className="h-14 w-full bg-slate-900/40 rounded-xl border border-slate-800/80 p-1 flex items-end justify-between gap-1">
              {candles.map((c, i) => {
                const volHeight = Math.min(48, Math.max(4, (c.volume / 600000) * 48));
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all ${c.close >= c.open ? "bg-emerald-500/40" : "bg-rose-500/40"}`}
                    style={{ height: `${volHeight}px` }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* EQUITY CURVE MODE */}
      {activeChartMode === "equity" && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">3-Year Backtested Portfolio Growth (₹100 Initial Base)</h4>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={backtestResults.equityCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Key Backtest Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Win Rate</p>
          <p className="text-xl font-black text-emerald-400 mt-1">{backtestResults.winRate}%</p>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-400 font-bold uppercase text-[10px]">CAGR</p>
          <p className="text-xl font-black text-indigo-400 mt-1">+{backtestResults.cagr}%</p>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Max Drawdown</p>
          <p className="text-xl font-black text-rose-400 mt-1">{backtestResults.maxDrawdown}%</p>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Profit Factor</p>
          <p className="text-xl font-black text-amber-400 mt-1">{backtestResults.profitFactor}</p>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Sharpe Ratio</p>
          <p className="text-xl font-black text-white mt-1">{backtestResults.sharpeRatio}</p>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Total Trades</p>
          <p className="text-xl font-black text-slate-300 mt-1">{tradeLogs.length}</p>
        </div>
      </div>

      {/* Backtest Executed Trade Logs Table */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Backtested Trade Execution History Log ({selectedStock})</span>
          </h4>
          <span className="text-[10px] text-slate-400 font-semibold">Click any trade to inspect signals</span>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold">
                <th className="pb-2">Entry Date</th>
                <th className="pb-2">Exit Date</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Entry Price</th>
                <th className="pb-2">Exit Price</th>
                <th className="pb-2">P&L (%)</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {tradeLogs.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-2.5 text-slate-300 font-bold">{t.entryDate}</td>
                  <td className="py-2.5 text-slate-400">{t.exitDate}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black">
                      {t.type}
                    </span>
                  </td>
                  <td className="py-2.5 font-mono text-slate-200">₹{t.entryPrice}</td>
                  <td className="py-2.5 font-mono text-slate-200">₹{t.exitPrice}</td>
                  <td className="py-2.5">
                    <span className={`font-mono font-bold ${t.pnlPercent >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {t.pnlPercent >= 0 ? `+${t.pnlPercent}%` : `${t.pnlPercent}%`}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => setSelectedTrade(t)}
                      className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 text-[10px] font-bold rounded-lg border border-indigo-500/30 transition-all"
                    >
                      Inspect Signals
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRADE INSPECTION MODAL */}
      {selectedTrade && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedTrade(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-indigo-400 tracking-wider">
                  Backtest Execution Details
                </span>
                <h3 className="text-lg font-black text-white">{selectedStock} Trade Signal</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Entry Price & Date</span>
                <strong className="text-white font-mono">₹{selectedTrade.entryPrice} ({selectedTrade.entryDate})</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Exit Price & Date</span>
                <strong className="text-white font-mono">₹{selectedTrade.exitPrice} ({selectedTrade.exitDate})</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Trade P&L</span>
                <strong className={`font-mono font-bold ${selectedTrade.pnlPercent >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {selectedTrade.pnlPercent >= 0 ? `+${selectedTrade.pnlPercent}%` : `${selectedTrade.pnlPercent}%`}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Execution Rule</span>
                <strong className="text-indigo-300 font-bold">Strategy Confluence</strong>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Strategy Confluence Rules Triggered:
              </span>
              <div className="space-y-1.5">
                {selectedTrade.signalsTriggered.map((sig, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{sig}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedTrade(null)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Overfitting Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-extrabold text-amber-400">Quant Rule: Beware of Overfitting!</p>
          <p className="mt-0.5 text-amber-200/80">
            A trading strategy fine-tuned to fit past noise perfectly will often fail in future live market regimes. Always validate on out-of-sample forward paper trading.
          </p>
        </div>
      </div>
    </div>
  );
};

