import React, { useState, useEffect } from "react";
import { PaperPosition, PaperTrade, UserProfile } from "../types";
import { STOCKS_DATA } from "../data/stocks";
import { LiveTradingLearningSimulator } from "./LiveTradingLearningSimulator";
import { PaperTradingInteractiveChart } from "./PaperTradingInteractiveChart";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  SectionHeader, 
  PrecisionButton, 
  MarketIndicator 
} from "./ui/LuxuryPrimitives";
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
  Activity,
  XCircle,
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
        showToast("Insufficient Virtual Cash Balance for this order.");
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
      showToast(`EXECUTED: BOUGHT ${totalQuantity} of ${tradingSymbol} @ ₹${activePrice.toFixed(2)}`);
    } else {
      // SELL Position
      const existingPos = positions.find(p => p.symbol === tradingSymbol);
      if (!existingPos || existingPos.shares < totalQuantity) {
        showToast(`You do not hold ${totalQuantity} units of ${tradingSymbol} to close.`);
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
    showToast(`EXECUTED: CLOSED ${qtyToSell} of ${pos.symbol} @ ₹${currentLiveP.toFixed(2)}. Realized: ${realizedPnL >= 0 ? "+" : ""}₹${realizedPnL.toFixed(2)}`);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 dark:bg-[#11151A] text-white px-4 py-3 rounded-xl shadow-2xl border border-blue-500/40 font-mono text-xs flex items-center gap-2.5 animate-in slide-in-from-top">
          <Activity className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================================================================ */}
      {/* 1. Header & Desk Mode Switcher */}
      {/* ================================================================ */}
      <div className="space-y-4">
        <SectionHeader
          kicker="INSTITUTIONAL RISK & EXECUTION DESK"
          title="SIMULATION DESK"
          description="High-fidelity market simulator with ₹10,00,000 institutional virtual allocation, live mark-to-market valuations, and execution scoring."
          action={
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
              <button
                onClick={() => setActiveMainSimTab("live-simulator")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMainSimTab === "live-simulator"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs"
                    : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Live Action Simulator</span>
              </button>
              <button
                onClick={() => setActiveMainSimTab("paper-terminal")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMainSimTab === "paper-terminal"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs"
                    : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Execution Terminal</span>
              </button>
            </div>
          }
        />

        {/* Executive Portfolio Telemetry Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <LuxuryPanel className="p-4">
            <MetricDisplay
              label="TOTAL PORTFOLIO NAV"
              value={`₹${portfolioTotalNav.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
              size="sm"
            />
          </LuxuryPanel>
          <LuxuryPanel className="p-4">
            <MetricDisplay
              label="AVAILABLE CASH"
              value={`₹${profile.paperBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
              size="sm"
            />
          </LuxuryPanel>
          <LuxuryPanel className="p-4">
            <MetricDisplay
              label="OPEN POSITIONS VALUE"
              value={`₹${currentTotalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
              size="sm"
            />
          </LuxuryPanel>
          <LuxuryPanel className="p-4">
            <MetricDisplay
              label="UNREALIZED P&L"
              value={`₹${totalUnrealizedPnL >= 0 ? "+" : ""}${totalUnrealizedPnL.toFixed(2)}`}
              change={`${totalPnLPercent >= 0 ? "+" : ""}${totalPnLPercent.toFixed(2)}%`}
              changeType={totalUnrealizedPnL >= 0 ? "positive" : "negative"}
              size="sm"
            />
          </LuxuryPanel>
          <LuxuryPanel className="p-4">
            <MetricDisplay
              label="PROCESS QUALITY SCORE"
              value={`${calculateProcessScore()}/100`}
              change="Optimal Risk"
              changeType="positive"
              size="sm"
            />
          </LuxuryPanel>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. Mode Content Switcher */}
      {/* ================================================================ */}
      {activeMainSimTab === "live-simulator" ? (
        <LiveTradingLearningSimulator
          profile={profile}
          positions={positions}
          trades={trades}
          onUpdatePositions={onUpdatePositions}
          onUpdateTrades={onUpdateTrades}
          onUpdateProfile={onUpdateProfile}
        />
      ) : (
        <div className="space-y-6">
          
          {/* Main Execution Terminal Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column (8/12): Interactive Chart & Asset Switcher */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Asset Segment & Contract Picker */}
              <LuxuryPanel className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-xs font-mono">
                  <button
                    onClick={() => setAssetSegment("EQUITY")}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      assetSegment === "EQUITY"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                        : "text-slate-600 dark:text-[#A5A8AE]"
                    }`}
                  >
                    Equities (Cash)
                  </button>
                  <button
                    onClick={() => setAssetSegment("FNO")}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      assetSegment === "FNO"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                        : "text-slate-600 dark:text-[#A5A8AE]"
                    }`}
                  >
                    F&O Derivatives
                  </button>
                </div>

                {/* Ticker Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
                  {assetSegment === "EQUITY" ? (
                    STOCKS_DATA.map(s => {
                      const isSel = selectedSymbol === s.symbol;
                      const tick = liveStockPrices[s.symbol];
                      return (
                        <button
                          key={s.symbol}
                          onClick={() => setSelectedSymbol(s.symbol)}
                          className={`px-2.5 py-1 rounded border transition-colors cursor-pointer shrink-0 ${
                            isSel
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white"
                              : "bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-[#A5A8AE] border-slate-200 dark:border-white/[0.06]"
                          }`}
                        >
                          <span>{s.symbol}</span>
                          <span className={`ml-1 text-[10px] ${
                            tick?.tickDir === "up" ? "text-emerald-500 font-bold" : tick?.tickDir === "down" ? "text-rose-500 font-bold" : ""
                          }`}>
                            ₹{tick?.price.toFixed(1) || s.price}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    FNO_CONTRACTS.map(f => {
                      const isSel = selectedFnoSymbol === f.symbol;
                      return (
                        <button
                          key={f.symbol}
                          onClick={() => setSelectedFnoSymbol(f.symbol)}
                          className={`px-2.5 py-1 rounded border transition-colors cursor-pointer shrink-0 ${
                            isSel
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold border-slate-900 dark:border-white"
                              : "bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-[#A5A8AE] border-slate-200 dark:border-white/[0.06]"
                          }`}
                        >
                          {f.symbol}
                        </button>
                      );
                    })
                  )}
                </div>
              </LuxuryPanel>

              {/* Interactive Execution Chart */}
              <LuxuryPanel elevated className="p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.05] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-slate-900 dark:text-[#F5F5F0]">
                      {assetSegment === "EQUITY" ? currentStock.name : currentFno.symbol}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      LIVE FEED · MARK-TO-MARKET
                    </span>
                  </div>
                  <MetricDisplay
                    label="CURRENT PRICE"
                    value={`₹${activePrice.toFixed(2)}`}
                    size="sm"
                  />
                </div>
                <div className="h-80 w-full">
                  <PaperTradingInteractiveChart
                    symbol={assetSegment === "EQUITY" ? currentStock.symbol : currentFno.symbol}
                    currentPrice={activePrice}
                    positions={positions.filter(p => p.symbol === (assetSegment === "EQUITY" ? currentStock.symbol : currentFno.symbol))}
                  />
                </div>
              </LuxuryPanel>

            </div>

            {/* Right Column (4/12): Order Ticket */}
            <div className="lg:col-span-4">
              <LuxuryPanel elevated className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.05]">
                  <span className="font-mono text-xs uppercase font-bold text-slate-900 dark:text-[#F5F5F0]">
                    ORDER TICKET
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-[#6EE7B7]">
                    REGIME: INSTANT FILL
                  </span>
                </div>

                {/* BUY / SELL Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.04]">
                  <button
                    onClick={() => setOrderType("BUY")}
                    className={`py-2 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                      orderType === "BUY"
                        ? "bg-emerald-500 text-slate-950 shadow-xs"
                        : "text-slate-600 dark:text-[#A5A8AE]"
                    }`}
                  >
                    LONG / BUY
                  </button>
                  <button
                    onClick={() => setOrderType("SELL")}
                    className={`py-2 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                      orderType === "SELL"
                        ? "bg-rose-500 text-slate-950 shadow-xs"
                        : "text-slate-600 dark:text-[#A5A8AE]"
                    }`}
                  >
                    CLOSE / SELL
                  </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 uppercase">
                      Quantity {assetSegment === "FNO" ? `(Lots of ${currentFno.lotSize})` : "(Shares)"}
                    </label>
                    <input
                      type="number"
                      value={sharesInput}
                      onChange={e => setSharesInput(e.target.value)}
                      min="1"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 uppercase">
                      Stop Loss Price (Optional)
                    </label>
                    <input
                      type="number"
                      value={stopLossInput}
                      onChange={e => setStopLossInput(e.target.value)}
                      placeholder="e.g. Stop price"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 uppercase">
                      Take Profit Target (Optional)
                    </label>
                    <input
                      type="number"
                      value={takeProfitInput}
                      onChange={e => setTakeProfitInput(e.target.value)}
                      placeholder="e.g. Target price"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#080A0D] border border-slate-200 dark:border-white/[0.08] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Order Summary Breakdown */}
                <div className="p-3 bg-slate-50 dark:bg-[#080A0D] rounded-xl border border-slate-200 dark:border-white/[0.06] space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Effective Quantity:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{totalQuantity} Units</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Margin/Cost:</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{totalOrderCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Available Cash:</span>
                    <span className="text-slate-700 dark:text-slate-300">₹{profile.paperBalance.toFixed(0)}</span>
                  </div>
                </div>

                {/* Submit Execution Button */}
                <button
                  onClick={handleExecuteOrder}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    orderType === "BUY"
                      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                      : "bg-rose-500 hover:bg-rose-400 text-slate-950"
                  }`}
                >
                  EXECUTE {orderType} ORDER (₹{totalOrderCost.toFixed(2)})
                </button>
              </LuxuryPanel>
            </div>

          </div>

          {/* Bottom Table: Open Positions vs Trade Execution History */}
          <LuxuryPanel className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.05] mb-4">
              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => setActiveTabSub("positions")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTabSub === "positions"
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Open Positions ({positions.length})
                </button>
                <button
                  onClick={() => setActiveTabSub("history")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTabSub === "history"
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Execution Log ({trades.length})
                </button>
              </div>
            </div>

            {activeTabSub === "positions" ? (
              positions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/[0.08] text-[10px] text-slate-400 uppercase">
                        <th className="py-2.5">Symbol</th>
                        <th className="py-2.5">Shares</th>
                        <th className="py-2.5">Avg Buy Price</th>
                        <th className="py-2.5">Live Price</th>
                        <th className="py-2.5">Unrealized P&L</th>
                        <th className="py-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                      {positions.map(pos => {
                        const currentP = liveStockPrices[pos.symbol]?.price || pos.currentPrice;
                        const pnl = (currentP - pos.buyPrice) * pos.shares;
                        const pnlPct = (pnl / pos.totalCost) * 100;
                        return (
                          <tr key={pos.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                            <td className="py-3 font-bold text-slate-900 dark:text-white">
                              {pos.symbol}
                            </td>
                            <td className="py-3 text-slate-700 dark:text-[#A5A8AE]">{pos.shares}</td>
                            <td className="py-3 text-slate-700 dark:text-[#A5A8AE]">₹{pos.buyPrice.toFixed(2)}</td>
                            <td className="py-3 text-slate-900 dark:text-white">₹{currentP.toFixed(2)}</td>
                            <td className={`py-3 font-bold ${pnl >= 0 ? "text-emerald-600 dark:text-[#6EE7B7]" : "text-rose-600 dark:text-[#FF7B86]"}`}>
                              {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)} ({pnlPct.toFixed(2)}%)
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => handleSellPosition(pos.id)}
                                className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-[#FF7B86] border border-rose-500/20 text-[11px] font-semibold cursor-pointer"
                              >
                                Close Position
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 font-mono text-xs">
                  No active open positions. Execute an order in the ticket above to enter the market.
                </div>
              )
            ) : (
              trades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/[0.08] text-[10px] text-slate-400 uppercase">
                        <th className="py-2.5">Timestamp</th>
                        <th className="py-2.5">Side</th>
                        <th className="py-2.5">Symbol</th>
                        <th className="py-2.5">Qty</th>
                        <th className="py-2.5">Price</th>
                        <th className="py-2.5 text-right">Realized P&L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                      {trades.map(tr => (
                        <tr key={tr.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="py-2.5 text-slate-500 text-[11px]">{tr.timestamp}</td>
                          <td className={`py-2.5 font-bold ${tr.type === "BUY" ? "text-emerald-500" : "text-rose-500"}`}>
                            {tr.type}
                          </td>
                          <td className="py-2.5 text-slate-900 dark:text-white font-medium">{tr.symbol}</td>
                          <td className="py-2.5 text-slate-700 dark:text-[#A5A8AE]">{tr.shares}</td>
                          <td className="py-2.5 text-slate-700 dark:text-[#A5A8AE]">₹{tr.price.toFixed(2)}</td>
                          <td className="py-2.5 text-right">
                            {tr.pnl !== undefined ? (
                              <span className={`font-bold ${tr.pnl >= 0 ? "text-emerald-600 dark:text-[#6EE7B7]" : "text-rose-600 dark:text-[#FF7B86]"}`}>
                                {tr.pnl >= 0 ? "+" : ""}₹{tr.pnl.toFixed(2)}
                              </span>
                            ) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 font-mono text-xs">
                  No historical trade executions recorded.
                </div>
              )
            )}
          </LuxuryPanel>

        </div>
      )}

    </div>
  );
};
