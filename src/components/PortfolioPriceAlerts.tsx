import React, { useState, useEffect, useRef } from "react";
import { STOCKS_DATA } from "../data/stocks";
import { StockData } from "../types";
import { 
  LuxuryPanel, 
  IntelligenceCard, 
  MetricDisplay, 
  PrecisionButton 
} from "./ui/LuxuryPrimitives";
import { 
  Bell, 
  BellRing, 
  BellOff, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Sparkles, 
  Brain, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ExternalLink, 
  X, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  RefreshCw,
  Clock
} from "lucide-react";

export type AlertCondition = "ABOVE" | "BELOW";

export interface PriceAlert {
  id: string;
  symbol: string;
  stockName: string;
  currentPriceAtCreation: number;
  targetPrice: number;
  condition: AlertCondition;
  note?: string;
  createdAt: string;
  triggeredAt?: string;
  status: "ACTIVE" | "TRIGGERED" | "MUTED";
}

interface PortfolioPriceAlertsProps {
  onOpenSocraticWithQuestion: (q: string) => void;
  savedWatchlist?: string[];
  className?: string;
}

const STORAGE_KEY = "stockmentor_price_alerts_v1";

// Curated default alerts for initial rich experience
const DEFAULT_ALERTS: PriceAlert[] = [
  {
    id: "alert-1",
    symbol: "RELIANCE",
    stockName: "Reliance Industries Ltd",
    currentPriceAtCreation: 2984.50,
    targetPrice: 3020.00,
    condition: "ABOVE",
    note: "Key resistance breakout into all-time high value area",
    createdAt: "Today, 09:30 AM",
    status: "ACTIVE"
  },
  {
    id: "alert-2",
    symbol: "HDFCBANK",
    stockName: "HDFC Bank Ltd",
    currentPriceAtCreation: 1642.30,
    targetPrice: 1620.00,
    condition: "BELOW",
    note: "Institutional 200 EMA demand zone test - look for absorption",
    createdAt: "Today, 10:15 AM",
    status: "ACTIVE"
  },
  {
    id: "alert-3",
    symbol: "TATAMOTORS",
    stockName: "Tata Motors Ltd",
    currentPriceAtCreation: 1045.00,
    targetPrice: 1060.00,
    condition: "ABOVE",
    note: "Target 1 take-profit on momentum continuation",
    createdAt: "Yesterday, 02:40 PM",
    triggeredAt: "Today, 11:24 AM",
    status: "TRIGGERED"
  }
];

export const PortfolioPriceAlerts: React.FC<PortfolioPriceAlertsProps> = ({
  onOpenSocraticWithQuestion,
  savedWatchlist = [],
  className = ""
}) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to load alerts from localStorage:", e);
    }
    return DEFAULT_ALERTS;
  });

  const [livePrices, setLivePrices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    STOCKS_DATA.forEach(s => {
      initial[s.symbol] = s.price;
    });
    return initial;
  });

  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeToast, setActiveToast] = useState<{ alert: PriceAlert; currentPrice: number } | null>(null);
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "TRIGGERED">("ACTIVE");

  // Form State
  const [selectedSymbol, setSelectedSymbol] = useState<string>("RELIANCE");
  const [targetPriceInput, setTargetPriceInput] = useState<string>("3000");
  const [alertCondition, setAlertCondition] = useState<AlertCondition>("ABOVE");
  const [alertNote, setAlertNote] = useState<string>("");

  // Save alerts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.warn("Failed to persist alerts:", e);
    }
  }, [alerts]);

  // Request browser desktop notification permission
  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const res = await Notification.requestPermission();
        setNotificationPermission(res);
      } catch (err) {
        console.warn("Notification request failed:", err);
      }
    }
  };

  // Play luxury audio chime via Web Audio API
  const playAudioChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Play a pleasant dual-tone harmonic chime (880Hz then 1320Hz)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, now); // A5
      osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.15); // E6

      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.6);
    } catch (e) {
      // AudioContext may be restricted by autoplay policy
    }
  };

  // Trigger notification for an alert
  const dispatchAlertNotification = (alert: PriceAlert, currentPrice: number) => {
    // 1. Play audio chime
    playAudioChime();

    // 2. Set active in-app luxury HUD toast
    setActiveToast({ alert, currentPrice });

    // 3. Trigger native desktop notification if permitted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        const conditionText = alert.condition === "ABOVE" ? "crossed above target" : "dropped below threshold";
        new Notification(`🎯 StockMentor Price Alert: ${alert.symbol}`, {
          body: `${alert.symbol} ${conditionText} ₹${alert.targetPrice.toFixed(2)} (Current: ₹${currentPrice.toFixed(2)})${alert.note ? ` — "${alert.note}"` : ""}`,
          icon: "/favicon.svg",
          badge: "/favicon.svg",
          tag: alert.id,
          requireInteraction: false
        });
      } catch (e) {
        console.warn("Native notification dispatch failed:", e);
      }
    }
  };

  // Real-time market tick simulator (drifts prices slightly every 3.5 seconds)
  useEffect(() => {
    if (!isSimulationActive) return;

    const interval = setInterval(() => {
      setLivePrices(prev => {
        const updated = { ...prev };
        STOCKS_DATA.forEach(stock => {
          // Micro drift between -0.15% and +0.15%
          const pct = (Math.random() - 0.49) * 0.003;
          const current = updated[stock.symbol] || stock.price;
          const newPrice = Math.round((current * (1 + pct)) * 100) / 100;
          updated[stock.symbol] = newPrice;
        });
        return updated;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulationActive]);

  // Monitor prices against active alerts
  useEffect(() => {
    alerts.forEach(alert => {
      if (alert.status !== "ACTIVE") return;

      const currentPrice = livePrices[alert.symbol];
      if (!currentPrice) return;

      const isHit = 
        (alert.condition === "ABOVE" && currentPrice >= alert.targetPrice) ||
        (alert.condition === "BELOW" && currentPrice <= alert.targetPrice);

      if (isHit) {
        // Trigger alert!
        const triggeredTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        
        setAlerts(prev => prev.map(a => 
          a.id === alert.id 
            ? { ...a, status: "TRIGGERED", triggeredAt: `Today, ${triggeredTime}` } 
            : a
        ));

        dispatchAlertNotification(alert, currentPrice);
      }
    });
  }, [livePrices, alerts]);

  // Open modal prefilled with a stock
  const openCreateModal = (symbol?: string) => {
    const sym = symbol || selectedSymbol || STOCKS_DATA[0].symbol;
    setSelectedSymbol(sym);
    const stock = STOCKS_DATA.find(s => s.symbol === sym) || STOCKS_DATA[0];
    const current = livePrices[sym] || stock.price;
    // Default target: +2% for above
    setTargetPriceInput((Math.round(current * 1.02 * 10) / 10).toString());
    setAlertCondition("ABOVE");
    setAlertNote("");
    setIsModalOpen(true);
  };

  // Create alert handler
  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const stock = STOCKS_DATA.find(s => s.symbol === selectedSymbol) || STOCKS_DATA[0];
    const targetPrice = parseFloat(targetPriceInput);

    if (isNaN(targetPrice) || targetPrice <= 0) return;

    const currentPrice = livePrices[selectedSymbol] || stock.price;

    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      symbol: selectedSymbol,
      stockName: stock.name,
      currentPriceAtCreation: currentPrice,
      targetPrice: targetPrice,
      condition: alertCondition,
      note: alertNote.trim() || undefined,
      createdAt: `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      status: "ACTIVE"
    };

    setAlerts(prev => [newAlert, ...prev]);
    setIsModalOpen(false);

    // If notification permission not yet decided, prompt now
    if (notificationPermission === "default") {
      requestPermission();
    }
  };

  // Delete alert
  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Re-arm triggered alert
  const handleRearmAlert = (alert: PriceAlert) => {
    setAlerts(prev => prev.map(a => 
      a.id === alert.id 
        ? { 
            ...a, 
            status: "ACTIVE", 
            triggeredAt: undefined,
            createdAt: `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
          } 
        : a
    ));
  };

  // Force-simulate alert hit for testing
  const handleSimulateHit = (alert: PriceAlert) => {
    const simulatedPrice = alert.condition === "ABOVE" 
      ? alert.targetPrice + 2.50 
      : alert.targetPrice - 2.50;

    // Update live price
    setLivePrices(prev => ({
      ...prev,
      [alert.symbol]: simulatedPrice
    }));
  };

  const activeAlertsList = alerts.filter(a => a.status === "ACTIVE");
  const triggeredAlertsList = alerts.filter(a => a.status === "TRIGGERED");

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* ================================================================ */}
      {/* 1. Header with Controls & Desktop Notification Status */}
      {/* ================================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-blue-600 dark:text-[#6F9BFF] font-semibold flex items-center gap-1.5">
              <BellRing className="w-3.5 h-3.5 animate-pulse" />
              REAL-TIME TARGET THRESHOLDS
            </span>
            <span className="text-slate-300 dark:text-white/20">·</span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-[#6EE7B7] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TICK STREAM
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
              Price Alerting & Execution Triggers
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-[#A5A8AE]">
              {activeAlertsList.length} Active Targets
            </span>
          </div>
        </div>

        {/* Action Suite */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Notification Permission Pill */}
          {notificationPermission !== "granted" ? (
            <button
              onClick={requestPermission}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-[#F5C76B] text-xs font-mono font-semibold transition-all cursor-pointer shadow-xs"
              title="Enable native desktop notifications when target thresholds are hit"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Enable Desktop Alerts</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-[#6EE7B7] text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Desktop Alerts Active</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? "bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-white border-slate-300 dark:border-white/[0.12]"
                : "bg-transparent text-slate-400 border-slate-200 dark:border-white/[0.06]"
            }`}
            title={soundEnabled ? "Audio Chime Enabled" : "Audio Muted"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Live Feed Pause/Play */}
          <button
            onClick={() => setIsSimulationActive(!isSimulationActive)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
              isSimulationActive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-[#6EE7B7] border-emerald-500/30"
                : "bg-slate-100 dark:bg-white/[0.04] text-slate-400 border-slate-200 dark:border-white/[0.06]"
            }`}
            title={isSimulationActive ? "Live tick feed is running" : "Live tick feed paused"}
          >
            {isSimulationActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{isSimulationActive ? "Live Ticks" : "Paused"}</span>
          </button>

          {/* Create Alert Button */}
          <PrecisionButton
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => openCreateModal()}
          >
            Set Alert
          </PrecisionButton>

        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. Key Telemetry & Alert Summary Metrics */}
      {/* ================================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <LuxuryPanel className="p-4">
          <MetricDisplay
            label="ACTIVE ALERTS"
            value={activeAlertsList.length.toString()}
            size="sm"
          />
        </LuxuryPanel>
        <LuxuryPanel className="p-4">
          <MetricDisplay
            label="TRIGGERED TODAY"
            value={triggeredAlertsList.length.toString()}
            change={triggeredAlertsList.length > 0 ? "Thresholds Breached" : "None Today"}
            changeType={triggeredAlertsList.length > 0 ? "positive" : "neutral"}
            size="sm"
          />
        </LuxuryPanel>
        <LuxuryPanel className="p-4">
          <MetricDisplay
            label="TICK FREQUENCY"
            value="3.5s"
            change="Real-Time Feed"
            changeType="neutral"
            size="sm"
          />
        </LuxuryPanel>
        <LuxuryPanel className="p-4">
          <MetricDisplay
            label="DISPATCH SYSTEM"
            value={notificationPermission === "granted" ? "NATIVE + HUD" : "HUD ONLY"}
            change="Zero-Delay"
            changeType="positive"
            size="sm"
          />
        </LuxuryPanel>
      </div>

      {/* ================================================================ */}
      {/* 3. Section Tabs: Active Targets vs Triggered History */}
      {/* ================================================================ */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-2 font-mono text-xs">
        <button
          onClick={() => setActiveTab("ACTIVE")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === "ACTIVE"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs"
              : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Active Targets ({activeAlertsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("TRIGGERED")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === "TRIGGERED"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs"
              : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Triggered History ({triggeredAlertsList.length})</span>
        </button>
      </div>

      {/* ================================================================ */}
      {/* 4. Alert Cards Stream */}
      {/* ================================================================ */}
      <div className="space-y-3">
        {activeTab === "ACTIVE" && (
          activeAlertsList.length === 0 ? (
            <LuxuryPanel className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-[#6F9BFF] flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                No Active Price Thresholds Set
              </h4>
              <p className="text-xs text-slate-500 dark:text-[#727680] max-w-sm mx-auto font-sans">
                Set custom price alerts to receive desktop and HUD notifications when key resistance breakouts, take-profit points, or stop-loss zones are hit.
              </p>
              <PrecisionButton
                variant="primary"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => openCreateModal()}
              >
                Create Target Alert
              </PrecisionButton>
            </LuxuryPanel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeAlertsList.map(alert => {
                const currentPrice = livePrices[alert.symbol] || alert.currentPriceAtCreation;
                const distanceVal = alert.targetPrice - currentPrice;
                const distancePct = ((distanceVal / currentPrice) * 100).toFixed(2);
                const isNearing = Math.abs(parseFloat(distancePct)) <= 1.0;

                return (
                  <LuxuryPanel
                    key={alert.id}
                    className={`p-4 space-y-3 relative overflow-hidden transition-all border ${
                      isNearing
                        ? "border-amber-500/50 dark:border-amber-400/40 shadow-[0_0_20px_rgba(245,199,107,0.1)]"
                        : "border-slate-200 dark:border-white/[0.08]"
                    }`}
                  >
                    {/* Top Header: Symbol, Condition Tag, Delete */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-base text-slate-900 dark:text-white">
                            {alert.symbol}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                            alert.condition === "ABOVE"
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-[#6EE7B7] border border-emerald-500/25"
                              : "bg-rose-500/10 text-rose-700 dark:text-[#FF7B86] border border-rose-500/25"
                          }`}>
                            {alert.condition === "ABOVE" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {alert.condition === "ABOVE" ? "CROSS ABOVE" : "DROP BELOW"}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-[#727680] truncate block mt-0.5 font-sans">
                          {alert.stockName}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSimulateHit(alert)}
                          className="px-2 py-1 rounded-lg text-[10px] font-mono bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-[#6F9BFF] border border-blue-500/20 transition-colors cursor-pointer"
                          title="Simulate price crossing threshold right now to test notification"
                        >
                          Test Hit
                        </button>
                        <button
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Remove alert"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Price Comparison Matrix */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200/60 dark:border-white/[0.06] font-mono text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Target Level</span>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          ₹{alert.targetPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Live Price</span>
                        <span className="font-bold text-sm text-blue-600 dark:text-[#6F9BFF]">
                          ₹{currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Distance Metric & Proximity Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-500">Distance to Target:</span>
                        <span className={`font-bold ${
                          alert.condition === "ABOVE"
                            ? distanceVal > 0 ? "text-slate-700 dark:text-slate-300" : "text-emerald-500"
                            : distanceVal < 0 ? "text-slate-700 dark:text-slate-300" : "text-rose-500"
                        }`}>
                          {distanceVal > 0 ? "+" : ""}{distanceVal.toFixed(2)} ({distancePct}%)
                        </span>
                      </div>

                      {/* Progress bar toward target */}
                      <div className="w-full bg-slate-200 dark:bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isNearing ? "bg-amber-400 animate-pulse" : "bg-blue-500"
                          }`}
                          style={{
                            width: `${Math.min(100, Math.max(10, 100 - Math.abs(parseFloat(distancePct)) * 10))}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Note if provided */}
                    {alert.note && (
                      <div className="text-[11px] text-slate-600 dark:text-[#A5A8AE] italic bg-slate-100/60 dark:bg-white/[0.03] p-2 rounded-lg border border-slate-200/50 dark:border-white/5 font-sans">
                        &ldquo;{alert.note}&rdquo;
                      </div>
                    )}

                    {/* Footer Socratic Trigger */}
                    <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Set {alert.createdAt}</span>
                      <button
                        onClick={() => onOpenSocraticWithQuestion(
                          `Analyze ${alert.symbol}: current price is ₹${currentPrice.toFixed(2)}, approaching target of ₹${alert.targetPrice.toFixed(2)}. What technical resistance or liquidity characteristics apply here?`
                        )}
                        className="text-blue-600 dark:text-[#6F9BFF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Brain className="w-3 h-3" />
                        <span>Socratic Thesis</span>
                      </button>
                    </div>
                  </LuxuryPanel>
                );
              })}
            </div>
          )
        )}

        {activeTab === "TRIGGERED" && (
          triggeredAlertsList.length === 0 ? (
            <LuxuryPanel className="p-8 text-center text-xs font-mono text-slate-400">
              No historical triggered alerts yet.
            </LuxuryPanel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {triggeredAlertsList.map(alert => (
                <LuxuryPanel
                  key={alert.id}
                  className="p-4 space-y-3 border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/[0.02]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-base text-slate-900 dark:text-white">
                          {alert.symbol}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-[#6EE7B7] border border-emerald-500/25 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          TRIGGERED
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 truncate block mt-0.5">
                        {alert.stockName}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Clear from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200/60 dark:border-white/[0.06] font-mono text-xs flex justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block">Target Threshold</span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{alert.targetPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase block">Breached At</span>
                      <span className="font-bold text-emerald-600 dark:text-[#6EE7B7]">{alert.triggeredAt || "Today"}</span>
                    </div>
                  </div>

                  {alert.note && (
                    <div className="text-[11px] text-slate-600 dark:text-[#A5A8AE] italic p-2 bg-slate-100/60 dark:bg-white/[0.03] rounded-lg border border-slate-200/50 dark:border-white/5 font-sans">
                      &ldquo;{alert.note}&rdquo;
                    </div>
                  )}

                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={() => handleRearmAlert(alert)}
                      className="flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-600 dark:text-[#6F9BFF] hover:underline cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-arm Alert</span>
                    </button>

                    <button
                      onClick={() => onOpenSocraticWithQuestion(
                        `${alert.symbol} just triggered its target alert at ₹${alert.targetPrice.toFixed(2)}. How should an institutional trader manage risk or lock in gains now?`
                      )}
                      className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                    >
                      Analyze Impact →
                    </button>
                  </div>
                </LuxuryPanel>
              ))}
            </div>
          )
        )}
      </div>

      {/* ================================================================ */}
      {/* 5. Floating Active Alert HUD Notification Toast */}
      {/* ================================================================ */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full rounded-2xl bg-[#090C10] border-2 border-[#10B981] p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)] animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-[#6EE7B7] border border-emerald-500/30">
                <BellRing className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-mono text-base font-black text-white">
                    🎯 PRICE TARGET HIT: {activeToast.alert.symbol}
                  </h4>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500 text-black font-bold">
                    BREACHED
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 font-sans">
                  {activeToast.alert.symbol} crossed {activeToast.alert.condition === "ABOVE" ? "above" : "below"} your target of{" "}
                  <strong className="text-white">₹{activeToast.alert.targetPrice.toFixed(2)}</strong> (Now: ₹{activeToast.currentPrice.toFixed(2)}).
                </p>
                {activeToast.alert.note && (
                  <p className="text-[11px] text-[#A5A8AE] italic mt-1 font-sans">
                    Note: &ldquo;{activeToast.alert.note}&rdquo;
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveToast(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-white/[0.08]">
            <button
              onClick={() => {
                const q = `🎯 Real-time Alert Triggered: ${activeToast.alert.symbol} just hit ₹${activeToast.currentPrice.toFixed(2)} (target ₹${activeToast.alert.targetPrice.toFixed(2)}). What are the institutional trade management considerations right now?`;
                setActiveToast(null);
                onOpenSocraticWithQuestion(q);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono text-xs font-bold hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Socratic Trade Assessment</span>
            </button>
            <button
              onClick={() => setActiveToast(null)}
              className="py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 font-mono text-xs transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 6. Create Price Alert Modal */}
      {/* ================================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0C1017] border border-white/[0.14] p-5 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.95)] space-y-5 text-white">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-500 dark:text-[#6F9BFF]" />
                  <span>Configure Price Target Alert</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-sans">
                  Receive immediate native desktop and HUD notifications when price triggers.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAlert} className="space-y-4">
              
              {/* Stock Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                  Select Stock / Equity
                </label>
                <select
                  value={selectedSymbol}
                  onChange={(e) => {
                    const sym = e.target.value;
                    setSelectedSymbol(sym);
                    const st = STOCKS_DATA.find(s => s.symbol === sym) || STOCKS_DATA[0];
                    const curr = livePrices[sym] || st.price;
                    setTargetPriceInput((Math.round(curr * 1.02 * 10) / 10).toString());
                  }}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/[0.1] focus:border-[#6F9BFF] text-white text-xs font-mono outline-none"
                >
                  {STOCKS_DATA.map(st => (
                    <option key={st.symbol} value={st.symbol} className="bg-[#0C1017] text-white">
                      {st.symbol} — {st.name} (Live: ₹{(livePrices[st.symbol] || st.price).toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Toggle: Cross Above vs Drop Below */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                  Alert Trigger Rule
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setAlertCondition("ABOVE")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      alertCondition === "ABOVE"
                        ? "bg-emerald-500/20 border-emerald-500/50 text-[#6EE7B7] font-bold shadow-xs"
                        : "bg-black/40 border-white/[0.08] text-slate-400 hover:text-white"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Price Rises Above (≥)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAlertCondition("BELOW")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      alertCondition === "BELOW"
                        ? "bg-rose-500/20 border-rose-500/50 text-[#FF7B86] font-bold shadow-xs"
                        : "bg-black/40 border-white/[0.08] text-slate-400 hover:text-white"
                    }`}
                  >
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Price Drops Below (≤)</span>
                  </button>
                </div>
              </div>

              {/* Target Price Input with Presets */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                    Target Threshold Price (₹)
                  </label>
                  <span className="text-[11px] font-mono text-blue-400">
                    Live: ₹{(livePrices[selectedSymbol] || STOCKS_DATA[0].price).toFixed(2)}
                  </span>
                </div>

                <input
                  type="number"
                  step="0.05"
                  value={targetPriceInput}
                  onChange={e => setTargetPriceInput(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/[0.12] focus:border-[#6F9BFF] text-white text-base font-mono font-bold outline-none"
                  placeholder="Enter target price..."
                />

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 mr-1">QUICK:</span>
                  {[1, 2, 5].map(pct => {
                    const curr = livePrices[selectedSymbol] || 1000;
                    const mult = alertCondition === "ABOVE" ? 1 + pct / 100 : 1 - pct / 100;
                    const calculated = Math.round(curr * mult * 10) / 10;
                    return (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTargetPriceInput(calculated.toString())}
                        className="px-2 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-[10px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {alertCondition === "ABOVE" ? `+${pct}%` : `-${pct}%`} (₹{calculated})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Socratic Thesis Note */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                  Thesis / Plan of Action (Optional)
                </label>
                <input
                  type="text"
                  value={alertNote}
                  onChange={e => setAlertNote(e.target.value)}
                  placeholder="e.g. 'Take profit on resistance', 'Cut loss if 20 EMA fails'..."
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/[0.1] focus:border-[#6F9BFF] text-white text-xs font-sans outline-none placeholder:text-slate-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
                >
                  Confirm Target Alert
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
