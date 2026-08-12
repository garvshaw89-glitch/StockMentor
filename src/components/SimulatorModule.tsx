import React, { useState, useEffect } from "react";
import { PaperPosition, PaperTrade, UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { LiveTradingLearningSimulator } from "./LiveTradingLearningSimulator";
import { PaperTradingInteractiveChart } from "./PaperTradingInteractiveChart";
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldAlert, 
  Plus, 
  History, 
  Briefcase,
  CheckCircle2,
  BarChart2,
  Zap,
  DollarSign,
  Activity,
  XCircle,
  RefreshCw,
  Play,
  Award
} from "lucide-react";

interface SimulatorModuleProps {
  profile: UserProfile;
  positions: PaperPosition[];
  trades: PaperTrade[];
  onUpdatePositions: (pos: PaperPosition[]) => void;
  onUpdateTrades: (trades: PaperTrade[]) => void;
  onUpdateProfile: (prof: UserProfile) => void;
}

// Sample FnO Contracts for Derivatives Trading
const FNO_CONTRACTS = [
  { symbol: "NIFTY 24500 CE", type: "CALL", strike: 24500, price: 185.50, lotSize: 50, iv: "14.2%", delta: 0.52 },
  { symbol: "NIFTY 24200 PE", type: "PUT", strike: 24200, price: 120.25, lotSize: 50, iv: "15.1%", delta: -0.42 },
  { symbol: "BANKNIFTY 52000 CE", type: "CALL", strike: 52000, price: 340.00, lotSize: 15, iv: "16.8%", delta: 0.58 },
  { symbol: "BANKNIFTY 51500 PE", type: "PUT", strike: 51500, price: 210.75, lotSize: 15, iv: "17.2%", delta: -0.38 },
  { symbol: "RELIANCE FUT AUG", type: "FUTURES", strike: 0, price: 3015.00, lotSize: 250, iv: "—", delta: 1.0 },
  { symbol: "TATAMOTORS FUT AUG", type: "FUTURES", strike: 0, price: 1025.50, lotSize: 550, iv: "—", delta: 1.0 }
];

export const SimulatorModule: React.FC<SimulatorModuleProps> = ({
  profile,
  positions,
  trades,
  onUpdatePositions,
  onUpdateTrades,
  onUpdateProfile
}) => {
  // Live stock prices state for P&L fluctuations
  const [liveStockPrices, setLiveStockPrices] = useState<Record<string, { price: number; tickDir: "up" | "down" | "none" }>>(() => {
    const initial: Record<string, { price: number; tickDir: "up" | "down" | "none" }> = {};
    STOCKS_DATA.forEach(s => {
      initial[s.symbol] = { price: s.price, tickDir: "none" };
    });
    FNO_CONTRACTS.forEach(f => {
      initial[f.symbol] = { price: f.price, tickDir: "none" };
    });
    return initial;
  });

  const [activeMainSimTab, setActiveMainSimTab] = useState<"live-simulator" | "paper-terminal">("live-simulator");
  const [assetSegment, setAssetSegment] = useState<"EQUITY" | "FNO">("EQUITY");
  const [selectedSymbol, setSelectedSymbol] = useState(STOCKS_DATA[0].symbol);
  const [selectedFnoSymbol, setSelectedFnoSymbol] = useState(FNO_CONTRACTS[0].symbol);
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [sharesInput, setSharesInput] = useState("10");
  const [stopLossInput, setStopLossInput] = useState("");
  const [takeProfitInput, setTakeProfitInput] = useState("");
  const [activeTabSub, setActiveTabSub] = useState<"positions" | "history">("positions");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Price Ticker Simulation (Fluctuating every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStockPrices(prev => {
        const updated = { ...prev };
        
        // Randomly tick 2-3 stocks
        Object.keys(updated).forEach(sym => {
          if (Math.random() > 0.4) {
            const current = updated[sym].price;
            // random delta between -0.6% and +0.6%
            const pctChange = (Math.random() * 1.2 - 0.58) / 100;
            const newPrice = Math.max(1, +(current * (1 + pctChange)).toFixed(2));
            const tickDir = newPrice >= current ? "up" : "down";
            updated[sym] = { price: newPrice, tickDir };
          }
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentStock = STOCKS_DATA.find(s => s.symbol === selectedSymbol) || STOCKS_DATA[0];
  const currentFno = FNO_CONTRACTS.find(f => f.symbol === selectedFnoSymbol) || FNO_CONTRACTS[0];

  const activePrice = assetSegment === "EQUITY" 
    ? (liveStockPrices[currentStock.symbol]?.price || currentStock.price)
    : (liveStockPrices[currentFno.symbol]?.price || currentFno.price);

  const numShares = parseInt(sharesInput) || 0;
  const lotMultiplier = assetSegment === "FNO" ? currentFno.lotSize : 1;
  const totalQuantity = numShares * lotMultiplier;
  const totalOrderCost = totalQuantity * activePrice;

  // Calculate Portfolio P&L Metrics
  const investedAmount = positions.reduce((acc, pos) => acc + pos.totalCost, 0);
  const currentTotalValue = positions.reduce((acc, pos) => {
    const liveP = liveStockPrices[pos.symbol]?.price || pos.currentPrice;
    return acc + (pos.shares * liveP);
  }, 0);

  const totalUnrealizedPnL = currentTotalValue - investedAmount;
  const totalPnLPercent = investedAmount > 0 ? (totalUnrealizedPnL / investedAmount) * 100 : 0;
  const portfolioTotalNav = profile.paperBalance + currentTotalValue;

  const calculateProcessScore = () => {
    let score = 75;
    if (positions.every(p => p.stopLoss && p.stopLoss < p.buyPrice)) score += 15;
    if (investedAmount <= profile.paperBalance * 0.8) score += 10;
    return Math.min(100, score);
  };

  const handleExecuteOrder = () => {
    if (numShares <= 0) return;

    const tradingSymbol = assetSegment === "EQUITY" ? currentStock.symbol : currentFno.symbol;
    const tradingName = assetSegment === "EQUITY" ? currentStock.name : currentFno.symbol;

    if (orderType === "BUY") {
      if (totalOrderCost > profile.paperBalance) {
        showToast("❌ Insufficient Virtual Cash Balance for this order.");
        return;
      }

      const newBalance = profile.paperBalance - totalOrderCost;

      const newPos: PaperPosition = {
        id: `pos-${Date.now()}`,
        symbol: tradingSymbol,
        stockName: tradingName,
        shares: totalQuantity,
        buyPrice: activePrice,
        currentPrice: activePrice,
        totalCost: totalOrderCost,
        stopLoss: parseFloat(stopLossInput) || undefined,
        takeProfit: parseFloat(takeProfitInput) || undefined,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      const newTrade: PaperTrade = {
        id: `tr-${Date.now()}`,
        symbol: tradingSymbol,
        stockName: tradingName,
        type: "BUY",
        shares: totalQuantity,
        price: activePrice,
        total: totalOrderCost,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      onUpdatePositions([...positions, newPos]);
      onUpdateTrades([newTrade, ...trades]);
      onUpdateProfile({ ...profile, paperBalance: newBalance });
      showToast(`✓ BOUGHT ${totalQuantity} shares/qty of ${tradingSymbol} at ₹${activePrice}`);
    } else {
      // SELL Position
      const existingPos = positions.find(p => p.symbol === tradingSymbol);
      if (!existingPos || existingPos.shares < totalQuantity) {
        showToast(`❌ You don't own ${totalQuantity} shares/qty of ${tradingSymbol} to sell.`);
        return;
      }

      handleSellPosition(existingPos.id, totalQuantity);
    }
  };

  // Direct 1-Click Sell Position Handler
  const handleSellPosition = (posId: string, sellQty?: number) => {
    const pos = positions.find(p => p.id === posId);
    if (!pos) return;

    const currentLiveP = liveStockPrices[pos.symbol]?.price || pos.currentPrice;
    const qtyToSell = sellQty || pos.shares;

    const realizedPnL = (currentLiveP - pos.buyPrice) * qtyToSell;
    const returnCapital = qtyToSell * currentLiveP;

    const newBalance = profile.paperBalance + returnCapital;

    const updatedPositions = positions.map(p => {
      if (p.id === posId) {
        const remShares = p.shares - qtyToSell;
        if (remShares <= 0) return null;
        return { ...p, shares: remShares, totalCost: remShares * p.buyPrice };
      }
      return p;
    }).filter(Boolean) as PaperPosition[];

    const newTrade: PaperTrade = {
      id: `tr-${Date.now()}`,
      symbol: pos.symbol,
      stockName: pos.stockName,
      type: "SELL",
      shares: qtyToSell,
      price: currentLiveP,
      total: qtyToSell * currentLiveP,
      pnl: realizedPnL,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    onUpdatePositions(updatedPositions);
    onUpdateTrades([newTrade, ...trades]);
    onUpdateProfile({ ...profile, paperBalance: newBalance });
    showToast(`✓ SOLD ${qtyToSell} of ${pos.symbol} at ₹${currentLiveP}. Realized P&L: ${realizedPnL >= 0 ? "+" : ""}₹${realizedPnL.toFixed(2)}`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500 font-bold text-xs flex items-center gap-2 animate-bounce">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Module Sub-Navigation Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 flex items-center gap-2 max-w-2xl">
        <button
          onClick={() => setActiveMainSimTab("live-simulator")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeMainSimTab === "live-simulator"
              ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:text-white bg-slate-950/60"
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>🎓 Live Trading Learning Simulator ("What Happens Next?")</span>
        </button>

        <button
          onClick={() => setActiveMainSimTab("paper-terminal")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeMainSimTab === "paper-terminal"
              ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:text-white bg-slate-950/60"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>💼 Paper Execution Terminal</span>
        </button>
      </div>

      {/* LIVE SIMULATOR MODE */}
      {activeMainSimTab === "live-simulator" && (
        <LiveTradingLearningSimulator
          profile={profile}
          positions={positions}
          trades={trades}
          onUpdateProfile={onUpdateProfile}
          onUpdatePositions={onUpdatePositions}
          onUpdateTrades={onUpdateTrades}
        />
      )}

      {/* PAPER EXECUTION TERMINAL MODE */}
      {activeMainSimTab === "paper-terminal" && (
        <>
          {/* Header & Portfolio Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time P&L Fluctuation Active</span>
            </div>
            <h1 className="text-2xl font-black">
              Simulator Trading Terminal (Equities & FnO)
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Live market order simulation with continuous price ticks, FnO derivatives, and instant position exit.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex items-center gap-6">
            <div>
              <span className="text-xs font-medium text-slate-300 block">Total Portfolio NAV</span>
              <span className="text-2xl font-black text-white mt-0.5 block">
                ₹{portfolioTotalNav.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-300 block">Unrealized P&L</span>
              <span className={`text-base font-bold flex items-center gap-0.5 mt-0.5 ${
                totalUnrealizedPnL >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}>
                {totalUnrealizedPnL >= 0 ? "+" : ""}₹{totalUnrealizedPnL.toFixed(2)} ({totalPnLPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Process Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block">Available Cash</span>
            <span className="font-bold text-emerald-400 text-sm">₹{profile.paperBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Active Holdings</span>
            <span className="font-bold text-white text-sm">{positions.length} Positions</span>
          </div>
          <div>
            <span className="text-slate-400 block">Process Quality Score</span>
            <span className="font-bold text-amber-400 text-sm">{calculateProcessScore()}/100</span>
          </div>
          <div>
            <span className="text-slate-400 block">Margin Utilization</span>
            <span className="font-bold text-white text-sm">
              {investedAmount > 0 ? `${((investedAmount / (profile.paperBalance + investedAmount)) * 100).toFixed(1)}%` : "0%"}
            </span>
          </div>
        </div>
      </div>

      {/* REAL INTERACTIVE TRADING CHART FOR PAPER TRADING */}
      <PaperTradingInteractiveChart
        profile={profile}
        positions={positions}
        trades={trades}
        onUpdatePositions={onUpdatePositions}
        onUpdateTrades={onUpdateTrades}
        onUpdateProfile={onUpdateProfile}
        selectedStockSymbol={selectedSymbol}
        onSelectStockSymbol={(sym) => setSelectedSymbol(sym)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Order Execution Ticket (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>Trade Ticket</span>
            </h2>

            {/* Asset Segment Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setAssetSegment("EQUITY")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  assetSegment === "EQUITY" ? "bg-emerald-500 text-black font-extrabold" : "text-slate-500"
                }`}
              >
                Equities
              </button>
              <button
                onClick={() => setAssetSegment("FNO")}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  assetSegment === "FNO" ? "bg-emerald-500 text-black font-extrabold" : "text-slate-500"
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>FnO</span>
              </button>
            </div>
          </div>

          {/* Instrument Selector */}
          {assetSegment === "EQUITY" ? (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Select Equity Stock:</label>
              <select
                value={selectedSymbol}
                onChange={e => setSelectedSymbol(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                {STOCKS_DATA.map(s => {
                  const liveP = liveStockPrices[s.symbol]?.price || s.price;
                  return (
                    <option key={s.symbol} value={s.symbol}>
                      {s.name} ({s.symbol}) — ₹{liveP}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Select FnO Derivative Contract:</label>
              <select
                value={selectedFnoSymbol}
                onChange={e => setSelectedFnoSymbol(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                {FNO_CONTRACTS.map(f => {
                  const liveP = liveStockPrices[f.symbol]?.price || f.price;
                  return (
                    <option key={f.symbol} value={f.symbol}>
                      {f.symbol} ({f.type}) — Premium: ₹{liveP} [Lot: {f.lotSize}]
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* BUY / SELL Switch */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setOrderType("BUY")}
              className={`py-2 rounded-lg text-xs font-extrabold transition-all ${
                orderType === "BUY" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              BUY / LONG
            </button>
            <button
              onClick={() => setOrderType("SELL")}
              className={`py-2 rounded-lg text-xs font-extrabold transition-all ${
                orderType === "SELL" ? "bg-rose-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              SELL / SHORT
            </button>
          </div>

          {/* Order Input Details */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {assetSegment === "EQUITY" ? "Number of Shares:" : `Number of Lots (1 Lot = ${currentFno.lotSize} Qty):`}
              </label>
              <input
                type="number"
                min="1"
                value={sharesInput}
                onChange={e => setSharesInput(e.target.value)}
                className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Stop Loss (₹):</label>
                <input
                  type="number"
                  placeholder="Target SL"
                  value={stopLossInput}
                  onChange={e => setStopLossInput(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Take Profit (₹):</label>
                <input
                  type="number"
                  placeholder="Target TP"
                  value={takeProfitInput}
                  onChange={e => setTakeProfitInput(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-medium"
                />
              </div>
            </div>

            {/* Price Preview Card */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Live Price Tick:</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  ₹{activePrice}
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Total Quantity:</span>
                <span className="font-bold text-slate-900 dark:text-white">{totalQuantity} Qty</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Order Margin:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">₹{totalOrderCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleExecuteOrder}
            className={`w-full py-3.5 rounded-xl font-extrabold text-xs text-white shadow-md transition-all ${
              orderType === "BUY" ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20" : "bg-rose-600 hover:bg-rose-500 shadow-rose-600/20"
            }`}
          >
            Execute Virtual {orderType} Order
          </button>
        </div>

        {/* Positions & Trade History Tabs (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTabSub("positions")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  activeTabSub === "positions" ? "bg-emerald-600 text-white" : "text-slate-500"
                }`}
              >
                Active Positions ({positions.length})
              </button>
              <button
                onClick={() => setActiveTabSub("history")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  activeTabSub === "history" ? "bg-emerald-600 text-white" : "text-slate-500"
                }`}
              >
                Trade History ({trades.length})
              </button>
            </div>

            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Live Fluctuations
            </span>
          </div>

          {activeTabSub === "positions" ? (
            <div className="space-y-3 overflow-x-auto">
              {positions.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs font-semibold">No active paper positions yet. Place a virtual order to practice trading.</p>
                </div>
              ) : (
                positions.map(pos => {
                  const liveInfo = liveStockPrices[pos.symbol];
                  const livePrice = liveInfo?.price || pos.currentPrice;
                  const tickDir = liveInfo?.tickDir || "none";

                  const pnl = (livePrice - pos.buyPrice) * pos.shares;
                  const pnlPct = ((livePrice - pos.buyPrice) / pos.buyPrice) * 100;

                  return (
                    <div 
                      key={pos.id} 
                      className={`p-4 rounded-xl border transition-all space-y-3 text-xs ${
                        tickDir === "up" 
                          ? "bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/40" 
                          : tickDir === "down"
                          ? "bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/40"
                          : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">{pos.symbol}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              {pos.shares} Qty
                            </span>
                          </div>
                          <span className="text-slate-500 text-[11px]">Bought @ ₹{pos.buyPrice.toFixed(2)}</span>
                        </div>

                        {/* Live Fluctuation P&L */}
                        <div className="text-right">
                          <span className={`font-black text-base flex items-center justify-end gap-1 ${
                            pnl >= 0 ? "text-emerald-500" : "text-rose-500"
                          }`}>
                            {pnl >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)}
                          </span>
                          <span className={`text-[11px] font-bold block ${pnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                            ({pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(2)}%)
                          </span>
                        </div>
                      </div>

                      {/* Info & Direct SELL Action */}
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                        <div className="space-x-3 text-slate-400">
                          <span>Live: <strong className="text-slate-800 dark:text-slate-200">₹{livePrice.toFixed(2)}</strong></span>
                          <span>Value: <strong className="text-slate-800 dark:text-slate-200">₹{(pos.shares * livePrice).toLocaleString()}</strong></span>
                        </div>

                        <button
                          onClick={() => handleSellPosition(pos.id)}
                          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-lg text-xs transition-colors shadow-sm flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Sell Position</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              {trades.length === 0 ? (
                <p className="text-xs text-slate-400 p-8 text-center">No trades logged yet.</p>
              ) : (
                trades.map(tr => (
                  <div key={tr.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                    <div>
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] mr-2 ${
                        tr.type === "BUY" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {tr.type}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{tr.symbol}</span>
                      <span className="text-slate-500 ml-2">{tr.shares} Qty @ ₹{tr.price}</span>
                    </div>

                    <div className="text-right">
                      {tr.pnl !== undefined && (
                        <span className={`font-extrabold text-xs block ${tr.pnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          P&L: {tr.pnl >= 0 ? "+" : ""}₹{tr.pnl.toFixed(2)}
                        </span>
                      )}
                      <span className="text-slate-400 font-mono text-[10px] block">{tr.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};
