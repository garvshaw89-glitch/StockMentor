import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Award, 
  Sparkles, 
  BarChart2, 
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight
} from "lucide-react";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ChartReplayModeProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export const REPLAY_DATASETS = [
  {
    id: "reliance-2023",
    title: "Reliance Bullish Base Breakout (2023)",
    description: "Watch the price form a double bottom base on the daily chart before breaking above its 200 EMA with 3x volume.",
    initialCandles: 15,
    fullData: [
      { date: "Day 1", price: 2350, volume: 4.2, sma20: 2380, rsi: 42 },
      { date: "Day 2", price: 2340, volume: 3.8, sma20: 2375, rsi: 40 },
      { date: "Day 3", price: 2320, volume: 5.1, sma20: 2370, rsi: 35 },
      { date: "Day 4", price: 2310, volume: 6.2, sma20: 2365, rsi: 32 },
      { date: "Day 5", price: 2330, volume: 4.0, sma20: 2360, rsi: 38 },
      { date: "Day 6", price: 2360, volume: 5.8, sma20: 2358, rsi: 45 },
      { date: "Day 7", price: 2380, volume: 6.0, sma20: 2355, rsi: 50 },
      { date: "Day 8", price: 2370, volume: 3.9, sma20: 2354, rsi: 48 },
      { date: "Day 9", price: 2365, volume: 3.5, sma20: 2353, rsi: 47 },
      { date: "Day 10", price: 2385, volume: 4.8, sma20: 2355, rsi: 52 },
      { date: "Day 11", price: 2410, volume: 7.2, sma20: 2360, rsi: 58 },
      { date: "Day 12", price: 2435, volume: 8.5, sma20: 2368, rsi: 63 },
      { date: "Day 13", price: 2420, volume: 4.1, sma20: 2375, rsi: 60 },
      { date: "Day 14", price: 2450, volume: 9.8, sma20: 2385, rsi: 66 },
      { date: "Day 15", price: 2480, volume: 12.5, sma20: 2398, rsi: 71 }, // Breakout day
      { date: "Day 16", price: 2510, volume: 14.2, sma20: 2412, rsi: 74 },
      { date: "Day 17", price: 2500, volume: 6.5, sma20: 2425, rsi: 70 },
      { date: "Day 18", price: 2540, volume: 11.0, sma20: 2440, rsi: 75 },
      { date: "Day 19", price: 2580, volume: 13.8, sma20: 2458, rsi: 79 },
      { date: "Day 20", price: 2620, volume: 15.1, sma20: 2478, rsi: 82 },
      { date: "Day 21", price: 2600, volume: 8.0, sma20: 2495, rsi: 76 },
      { date: "Day 22", price: 2650, volume: 12.4, sma20: 2515, rsi: 80 }
    ]
  }
];

export const ChartReplayMode: React.FC<ChartReplayModeProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const activeDataset = REPLAY_DATASETS[0];

  const [currentIndex, setCurrentIndex] = useState<number>(activeDataset.initialCandles - 1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Position state
  const [position, setPosition] = useState<"NONE" | "LONG" | "SHORT">("NONE");
  const [entryPrice, setEntryPrice] = useState<number | null>(null);
  const [stopLoss, setStopLoss] = useState<number | null>(null);
  const [targetPrice, setTargetPrice] = useState<number | null>(null);

  // Evaluation state
  const [entryScore, setEntryScore] = useState<number | null>(null);
  const [tradeLogs, setTradeLogs] = useState<string[]>([]);
  const [totalRealizedPnl, setTotalRealizedPnl] = useState<number>(0);

  const visibleData = activeDataset.fullData.slice(0, currentIndex + 1);
  const currentCandle = activeDataset.fullData[currentIndex];

  const handleNextCandle = () => {
    if (currentIndex < activeDataset.fullData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleBuyLong = () => {
    if (position !== "NONE") return;

    setPosition("LONG");
    setEntryPrice(currentCandle.price);
    setStopLoss(Math.round(currentCandle.price * 0.96)); // 4% SL
    setTargetPrice(Math.round(currentCandle.price * 1.08)); // 8% Target

    // Calculate Entry Quality Score based on SMA & Volume & RSI
    const isAboveSMA = currentCandle.price > currentCandle.sma20;
    const isVolumeSurge = currentCandle.volume > 8.0;
    const isGoodRsi = currentCandle.rsi >= 50 && currentCandle.rsi <= 75;

    let score = 60;
    if (isAboveSMA) score += 15;
    if (isVolumeSurge) score += 15;
    if (isGoodRsi) score += 10;

    setEntryScore(score);
    setTradeLogs(prev => [
      `LONG Entry at ₹${currentCandle.price} on ${currentCandle.date}. Entry Quality: ${score}/100.`,
      ...prev
    ]);
  };

  const handleClosePosition = () => {
    if (position === "NONE" || !entryPrice) return;

    const pnl = currentCandle.price - entryPrice;
    const pnlPct = Number(((pnl / entryPrice) * 100).toFixed(2));
    setTotalRealizedPnl(prev => prev + pnl);

    setTradeLogs(prev => [
      `Closed LONG at ₹${currentCandle.price} on ${currentCandle.date}. Realized P&L: ${pnlPct >= 0 ? "+" : ""}${pnlPct}%.`,
      ...prev
    ]);

    setPosition("NONE");
    setEntryPrice(null);
  };

  const handleResetReplay = () => {
    setCurrentIndex(activeDataset.initialCandles - 1);
    setPosition("NONE");
    setEntryPrice(null);
    setEntryScore(null);
    setTradeLogs([]);
    setTotalRealizedPnl(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider mb-2">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Candle-by-Candle Historical Replay</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Market Replay Decision Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Experience real historical charts candle-by-candle without knowing the future. Test entry timing, stop-loss management, and exit discipline.
          </p>
        </div>

        {/* Replay Controls */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={handleNextCandle}
            disabled={currentIndex >= activeDataset.fullData.length - 1}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <SkipForward className="w-4 h-4" />
            <span>Next Candle</span>
          </button>

          <button
            onClick={handleResetReplay}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Chart Display Container */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">{activeDataset.title}</h4>
            <p className="text-xs text-slate-400">{activeDataset.description}</p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-bold">Current Candle: <strong className="text-white">{currentCandle.date}</strong></span>
            <span className="text-slate-400 font-bold">Price: <strong className="text-emerald-400">₹{currentCandle.price}</strong></span>
            <span className="text-slate-400 font-bold">RSI: <strong className="text-indigo-400">{currentCandle.rsi}</strong></span>
          </div>
        </div>

        {/* Recharts Chart */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={visibleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
              <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="sma20" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Position & Order Controls */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {position === "NONE" ? (
              <button
                onClick={handleBuyLong}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <TrendingUp className="w-4 h-4" />
                <span>BUY / LONG Position</span>
              </button>
            ) : (
              <button
                onClick={handleClosePosition}
                className="px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-extrabold rounded-xl text-xs transition-all shadow-md shadow-rose-500/20 flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>CLOSE Position at ₹{currentCandle.price}</span>
              </button>
            )}
          </div>

          {position === "LONG" && entryPrice && (
            <div className="flex items-center gap-4 text-xs bg-slate-900 p-2.5 rounded-xl border border-emerald-500/30">
              <span className="text-slate-300 font-bold">Entry: ₹{entryPrice}</span>
              <span className="text-rose-400 font-bold">Stop Loss: ₹{stopLoss}</span>
              <span className="text-emerald-400 font-bold">Target: ₹{targetPrice}</span>
              <span className={`font-black ${currentCandle.price >= entryPrice ? "text-emerald-400" : "text-rose-400"}`}>
                Unrealized: {currentCandle.price >= entryPrice ? "+" : ""}₹{currentCandle.price - entryPrice} ({(((currentCandle.price - entryPrice)/entryPrice)*100).toFixed(1)}%)
              </span>
            </div>
          )}

          {entryScore !== null && (
            <div className="bg-slate-900 px-3 py-2 rounded-xl border border-indigo-500/30 text-xs">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Entry Quality Score: </span>
              <span className="text-indigo-400 font-black">{entryScore}/100</span>
            </div>
          )}
        </div>
      </div>

      {/* Replay Execution Logs */}
      {tradeLogs.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <p className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Replay Trade Activity Log</p>
          <div className="space-y-1 text-slate-300 font-mono">
            {tradeLogs.map((log, idx) => (
              <p key={idx} className="flex items-center gap-2">
                <span className="text-emerald-400">►</span>
                <span>{log}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
