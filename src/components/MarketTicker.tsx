import React, { useState, useEffect, useRef } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  RefreshCw, 
  Pause, 
  Play, 
  Flame, 
  Brain,
  Globe2,
  Newspaper,
  ChevronRight,
  SlidersHorizontal
} from "lucide-react";

export interface TickerIndexItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  direction: "up" | "down" | "neutral";
  currency?: string;
  market?: string;
}

export interface TickerNewsItem {
  id: string;
  category: string;
  headline: string;
  source: string;
  timeAgo: string;
  impact?: "positive" | "negative" | "neutral";
  hot?: boolean;
}

interface MarketTickerProps {
  onOpenSocraticWithQuestion?: (question: string) => void;
  className?: string;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({
  onOpenSocraticWithQuestion,
  className = ""
}) => {
  const [indices, setIndices] = useState<TickerIndexItem[]>([
    { symbol: "NIFTY 50", name: "NSE Nifty 50", price: "24,852.40", change: "+142.60", changePercent: "+0.58%", direction: "up", market: "NSE" },
    { symbol: "SENSEX", name: "BSE Sensex 30", price: "81,385.10", change: "+420.25", changePercent: "+0.52%", direction: "up", market: "BSE" },
    { symbol: "BANK NIFTY", name: "Nifty Bank", price: "51,420.80", change: "+310.40", changePercent: "+0.61%", direction: "up", market: "NSE" },
    { symbol: "NIFTY IT", name: "Nifty IT", price: "36,920.15", change: "+580.30", changePercent: "+1.60%", direction: "up", market: "NSE" },
    { symbol: "S&P 500", name: "S&P 500", price: "5,868.40", change: "+24.10", changePercent: "+0.41%", direction: "up", market: "US" },
    { symbol: "NASDAQ 100", name: "Nasdaq Tech", price: "20,412.30", change: "+168.90", changePercent: "+0.83%", direction: "up", market: "US" },
    { symbol: "INDIA VIX", name: "Volatility", price: "12.65", change: "-0.45", changePercent: "-3.44%", direction: "down", market: "NSE" },
    { symbol: "BRENT CRUDE", name: "Crude Oil", price: "$74.20", change: "-0.85", changePercent: "-1.13%", direction: "down", market: "COMMODITY" },
    { symbol: "GOLD (10g)", name: "24K Gold MCX", price: "₹76,450", change: "+280", changePercent: "+0.37%", direction: "up", market: "MCX" },
    { symbol: "US 10Y", name: "Treasury Yield", price: "4.02%", change: "-0.03%", changePercent: "-0.74%", direction: "down", market: "BONDS" },
    { symbol: "USD/INR", name: "Dollar/Rupee", price: "₹83.92", change: "-0.05", changePercent: "-0.06%", direction: "down", market: "FOREX" }
  ]);

  const [headlines, setHeadlines] = useState<TickerNewsItem[]>([
    {
      id: "news-macro-1",
      category: "CENTRAL BANK",
      headline: "RBI keeps Repo Rate unchanged at 6.50%, maintains disinflationary policy stance amidst stable growth",
      source: "Financial Express",
      timeAgo: "12m ago",
      impact: "neutral",
      hot: true
    },
    {
      id: "news-earnings-1",
      category: "EARNINGS",
      headline: "Reliance Retail & Jio digital expansions lift conglomerate operating cash flows to record high",
      source: "Mint",
      timeAgo: "28m ago",
      impact: "positive",
      hot: false
    },
    {
      id: "news-macro-2",
      category: "FII FLOWS",
      headline: "Foreign Institutional Investors inject ₹3,420 Cr into domestic equities over consecutive net buy sessions",
      source: "Economic Times",
      timeAgo: "45m ago",
      impact: "positive",
      hot: true
    },
    {
      id: "news-energy-1",
      category: "ENERGY",
      headline: "Brent crude moderates toward $74/bbl as Middle East risk premia stabilise and OPEC+ monitors output caps",
      source: "Bloomberg",
      timeAgo: "1h ago",
      impact: "positive",
      hot: false
    },
    {
      id: "news-tech-1",
      category: "AI & TECH",
      headline: "Global cloud hyperscalers accelerate sovereign AI datacentre capex, boosting semiconductor supply chains",
      source: "Reuters",
      timeAgo: "1h ago",
      impact: "positive",
      hot: true
    }
  ]);

  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<"normal" | "fast" | "slow">("normal");
  const [filterMode, setFilterMode] = useState<"all" | "indices" | "news">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  const fetchTickerData = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/market/ticker");
      if (res.ok) {
        const data = await res.json();
        if (data.indices && Array.isArray(data.indices)) {
          setIndices(data.indices);
        }
        if (data.headlines && Array.isArray(data.headlines)) {
          setHeadlines(data.headlines);
        }
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (err) {
      console.warn("Market ticker fetch fallback in use:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickerData();
    const interval = setInterval(fetchTickerData, 45000);
    return () => clearInterval(interval);
  }, []);

  // Interleave items or filter based on user selection
  const streamItems: Array<{ type: "index"; data: TickerIndexItem } | { type: "news"; data: TickerNewsItem }> = [];

  if (filterMode === "all") {
    const maxLen = Math.max(indices.length, headlines.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < indices.length) streamItems.push({ type: "index", data: indices[i] });
      if (i < headlines.length) streamItems.push({ type: "news", data: headlines[i] });
    }
  } else if (filterMode === "indices") {
    indices.forEach(idx => streamItems.push({ type: "index", data: idx }));
  } else {
    headlines.forEach(news => streamItems.push({ type: "news", data: news }));
  }

  // Duplicate stream to create seamless infinite loop
  const seamlessStream = [...streamItems, ...streamItems];

  const handleIndexClick = (item: TickerIndexItem) => {
    if (onOpenSocraticWithQuestion) {
      onOpenSocraticWithQuestion(
        `What are the macroeconomic catalysts, technical support/resistance levels, and market regime drivers influencing ${item.symbol} (${item.price}) today?`
      );
    }
  };

  const handleNewsClick = (item: TickerNewsItem) => {
    if (onOpenSocraticWithQuestion) {
      onOpenSocraticWithQuestion(
        `Analyze the economic implications and sectoral winners/losers of this market news: "${item.headline}"`
      );
    }
  };

  const speedClass = 
    speed === "fast" ? "animation-fast" : speed === "slow" ? "animation-slow" : "";
  const pauseClass = isPaused ? "animation-paused" : "";

  return (
    <div 
      className={`w-full bg-[#080A0D]/90 dark:bg-[#080A0D]/95 backdrop-blur-md border-y border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-[#F5F5F0] overflow-hidden select-none transition-colors relative z-20 ${className}`}
      aria-label="Real-time Market Telemetry and Financial News Ticker"
    >
      <div className="max-w-[1720px] mx-auto flex items-stretch">
        
        {/* Left Sticky Terminal Header */}
        <div className="flex-shrink-0 z-30 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-[#0C0F13] to-[#0C0F13]/90 border-r border-slate-200 dark:border-white/10 shadow-[4px_0_12px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-900 dark:text-[#F5F5F0] whitespace-nowrap">
              LIVE TAPE
            </span>
          </div>

          {/* Filter Mode Selector */}
          <div className="hidden md:flex items-center gap-1 bg-black/40 p-0.5 rounded border border-white/5 text-[9px] font-mono">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                filterMode === "all" ? "bg-[#6F9BFF]/20 text-[#6F9BFF] font-semibold" : "text-slate-400 hover:text-white"
              }`}
              title="Show indices and news"
            >
              ALL
            </button>
            <button
              onClick={() => setFilterMode("indices")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                filterMode === "indices" ? "bg-[#6F9BFF]/20 text-[#6F9BFF] font-semibold" : "text-slate-400 hover:text-white"
              }`}
              title="Show major indices"
            >
              INDICES
            </button>
            <button
              onClick={() => setFilterMode("news")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                filterMode === "news" ? "bg-[#6F9BFF]/20 text-[#6F9BFF] font-semibold" : "text-slate-400 hover:text-white"
              }`}
              title="Show financial news headlines"
            >
              NEWS
            </button>
          </div>
        </div>

        {/* Marquee Viewport with Left and Right Fade Gradients */}
        <div className="relative flex-1 overflow-hidden flex items-center py-2">
          
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#080A0D] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#080A0D] to-transparent z-10 pointer-events-none" />

          {/* Smooth Continuous Marquee Tape */}
          <div 
            className={`animate-marquee-smooth ${speedClass} ${pauseClass}`}
          >
            {seamlessStream.map((item, index) => {
              if (item.type === "index") {
                const idx = item.data;
                const isPositive = idx.direction === "up";
                return (
                  <div
                    key={`index-${idx.symbol}-${index}`}
                    onClick={() => handleIndexClick(idx)}
                    className="group inline-flex items-center gap-2 px-4 py-1 mx-1.5 rounded bg-white/[0.02] hover:bg-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-transparent hover:border-[#6F9BFF]/40 cursor-pointer transition-all duration-150 flex-shrink-0"
                    title={`Click to analyze ${idx.symbol} with AI Socratic Mentor`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-slate-800 dark:text-[#F5F5F0]">
                        {idx.symbol}
                      </span>
                      {idx.market && (
                        <span className="text-[8px] font-mono uppercase px-1 py-0.2 rounded bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                          {idx.market}
                        </span>
                      )}
                    </div>

                    <span className="font-mono text-[11px] num-tabular font-medium text-slate-900 dark:text-slate-200">
                      {idx.price}
                    </span>

                    <div className={`flex items-center gap-0.5 text-[10.5px] font-mono font-medium ${
                      isPositive ? "text-emerald-500 dark:text-[#6EE7B7]" : "text-rose-500 dark:text-[#FF7B86]"
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3 text-emerald-500 dark:text-[#6EE7B7]" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-rose-500 dark:text-[#FF7B86]" />
                      )}
                      <span>{idx.changePercent}</span>
                    </div>

                    <Brain className="w-2.5 h-2.5 text-[#6F9BFF] opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" />
                  </div>
                );
              }

              // News Item Card in Tape
              const news = item.data;
              return (
                <div
                  key={`news-${news.id}-${index}`}
                  onClick={() => handleNewsClick(news)}
                  className="group inline-flex items-center gap-2 px-4 py-1 mx-1.5 rounded bg-blue-500/[0.03] hover:bg-blue-500/[0.08] dark:bg-blue-400/[0.04] dark:hover:bg-blue-400/[0.1] border border-transparent hover:border-blue-400/40 cursor-pointer transition-all duration-150 flex-shrink-0 max-w-[580px]"
                  title={`Click to analyze headline with Socratic AI Mentor: "${news.headline}"`}
                >
                  <div className="flex items-center gap-1">
                    {news.hot && (
                      <Flame className="w-3 h-3 text-amber-400 fill-amber-400/30 flex-shrink-0 animate-pulse" />
                    )}
                    <span className="text-[9px] font-mono tracking-wider font-semibold uppercase px-1.5 py-0.5 rounded bg-[#6F9BFF]/15 text-[#6F9BFF] border border-[#6F9BFF]/30 whitespace-nowrap">
                      {news.category}
                    </span>
                  </div>

                  <p className="text-[11px] font-sans font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-white transition-colors">
                    {news.headline}
                  </p>

                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap flex-shrink-0">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.timeAgo}</span>
                  </div>

                  <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-[#8B7CFF] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Ask AI</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sticky Playback & Controls Header */}
        <div className="flex-shrink-0 z-30 flex items-center gap-1.5 px-3 py-2 bg-gradient-to-l from-[#0C0F13] to-[#0C0F13]/90 border-l border-slate-200 dark:border-white/10 shadow-[-4px_0_12px_rgba(0,0,0,0.25)]">
          
          {/* Pause / Play Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isPaused ? "Resume Marquee (Click to play)" : "Pause Marquee (Hover also pauses)"}
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="w-3 h-3 text-[#6EE7B7]" /> : <Pause className="w-3 h-3" />}
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              setSpeed(s => s === "normal" ? "fast" : s === "fast" ? "slow" : "normal");
            }}
            className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Cycle scroll speed"
          >
            {speed === "fast" ? "1.5x" : speed === "slow" ? "0.7x" : "1.0x"}
          </button>

          {/* Refresh Button */}
          <button
            onClick={fetchTickerData}
            disabled={isRefreshing}
            className={`p-1 rounded text-slate-400 hover:text-[#6F9BFF] hover:bg-white/10 transition-colors ${
              isRefreshing ? "animate-spin text-[#6F9BFF]" : ""
            }`}
            title={`Refresh live telemetry (Updated: ${lastUpdated})`}
            aria-label="Refresh telemetry"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
