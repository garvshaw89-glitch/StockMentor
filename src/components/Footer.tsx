import React, { useState, useEffect } from "react";
import { TabType } from "../types";
import { 
  ArrowUp, 
  Brain, 
  ShieldCheck, 
  Terminal, 
  Globe, 
  Cpu, 
  Clock, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  Award
} from "lucide-react";

interface FooterProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSocraticWithQuestion?: (question: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeTab,
  setActiveTab,
  onOpenSocraticWithQuestion
}) => {
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const coreModules: { id: TabType; label: string; tag: string }[] = [
    { id: "home", label: "Market Intelligence", tag: "MACRO" },
    { id: "learn", label: "Market University", tag: "ACADEMY" },
    { id: "research", label: "Equity Research", tag: "INSTITUTIONAL" },
    { id: "charts", label: "Market Visual Lab", tag: "TECHNICALS" },
    { id: "simulator", label: "Simulation Desk", tag: "EXECUTION" },
    { id: "portfolio", label: "Portfolio Intelligence", tag: "ALLOCATION" },
    { id: "profile", label: "User DNA & Level", tag: "PERFORMANCE" }
  ];

  const simulationLabs: { id: TabType; label: string; tag: string }[] = [
    { id: "survival", label: "Market Survival Simulator", tag: "CRASH LAB" },
    { id: "candle-replay", label: "Chart Replay Simulator", tag: "PRICE ACTION" },
    { id: "become-analyst", label: "30-Min Analyst Exam", tag: "EVALUATION" },
    { id: "committee", label: "AI Investment Committee", tag: "MULTI-AGENT" },
    { id: "portfolio-doctor", label: "AI Portfolio Doctor", tag: "DIAGNOSTICS" },
    { id: "backtest", label: "Backtesting & Quant Lab", tag: "ALGORITHMIC" },
    { id: "translator", label: "10-K Filing Translator", tag: "DISCLOSURES" },
    { id: "leaderboard", label: "Global Skill Ranking", tag: "TIERS" }
  ];

  const marketCenters = [
    { name: "NSE / BSE", city: "Mumbai", hours: "09:15 - 15:30 IST", status: "LIVE", positive: true },
    { name: "NYSE", city: "New York", hours: "09:30 - 16:00 EST", status: "STANDBY", positive: false },
    { name: "LSE", city: "London", hours: "08:00 - 16:30 GMT", status: "STANDBY", positive: false },
    { name: "TSE", city: "Tokyo", hours: "09:00 - 15:00 JST", status: "CLOSED", positive: false }
  ];

  return (
    <footer className="relative z-20 mt-16 bg-[#040507] dark:bg-[#040507] text-[#A5A8AE] border-t border-white/[0.08] overflow-hidden select-none transition-colors">
      
      {/* Laser Gradient Accent Hairline */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#6F9BFF]/50 via-[#8B7CFF]/40 to-transparent" />

      {/* ================================================================ */}
      {/* 1. Global Financial Telemetry Ribbon */}
      {/* ================================================================ */}
      <div className="border-b border-white/[0.06] bg-[#07090D]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          
          {/* Global Market Status Bourses */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-[10px] uppercase tracking-widest text-[#686C73] font-bold">
              MARKET BOURSES:
            </span>
            {marketCenters.map((b) => (
              <div key={b.name} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${b.status === "LIVE" ? "bg-[#10B981] shadow-[0_0_8px_#10B981]" : "bg-slate-600"}`} />
                <span className="font-semibold text-slate-300 dark:text-[#F5F5F0]">{b.name}</span>
                <span className="text-[10px] text-slate-500">({b.city})</span>
                <span className={`text-[9px] px-1 py-0.2 rounded ${b.status === "LIVE" ? "bg-[#6EE7B7]/10 text-[#6EE7B7] border border-[#6EE7B7]/20" : "bg-white/[0.04] text-slate-500"}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>

          {/* AI Protocol Engine & UTC Clock */}
          <div className="flex items-center gap-4 ml-auto text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-[#6F9BFF]">
              <Cpu className="w-3.5 h-3.5" />
              <span>GEMINI 3.7 FLASH</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-[#6F9BFF]/10 border border-[#6F9BFF]/25 font-bold">
                LATENCY 18ms
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-500 border-l border-white/[0.08] pl-4">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] tabular-nums">{utcTime || "UTC 00:00:00"}</span>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. Main Executive Architecture Grid */}
      {/* ================================================================ */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1 & 2: Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#151921] to-[#0A0D12] border border-white/[0.14] flex items-center justify-center shadow-[0_0_15px_rgba(111,155,255,0.2)]">
                <span className="font-mono text-xs font-black text-white">SM</span>
              </div>
              <div>
                <h3 className="font-display font-black text-lg tracking-wider text-[#F5F5F0]">
                  STOCKMENTOR AI
                </h3>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#6F9BFF]">
                  SOCRATIC MARKET INTELLIGENCE TERMINAL
                </p>
              </div>
            </div>

            <p className="text-xs text-[#A5A8AE] leading-relaxed max-w-md font-sans">
              Engineered as an institutional financial instrument rather than a conventional dashboard. 
              StockMentor bridges real-time quantitative market structures, algorithmic technical replay, 
              and Google Gemini Socratic AI dialogue to build authentic trader intuition.
            </p>

            {/* Architecture Protocol Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
                <ShieldCheck className="w-3 h-3 text-[#6EE7B7]" />
                AES-256 SIMULATION
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
                <Terminal className="w-3 h-3 text-[#6F9BFF]" />
                WEBGL 3D ENVIRONMENT
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
                <Globe className="w-3 h-3 text-[#8B7CFF]" />
                NSE / BSE REALTIME TELEMETRY
              </span>
            </div>

            <div className="pt-2 text-[11px] font-mono text-[#686C73]">
              Developed by <span className="text-[#F5F5F0] font-semibold">Garv Shaw</span> • Repository:{" "}
              <a 
                href="https://github.com/garvshaw89-glitch/stock-mentor.git" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#6F9BFF] hover:underline"
              >
                stock-mentor.git
              </a>
            </div>
          </div>

          {/* Col 3: Core Intelligence Modules */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#F5F5F0] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6F9BFF]" />
              Core Modules
            </h4>
            <ul className="space-y-1.5">
              {coreModules.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      scrollToTop();
                    }}
                    className={`group w-full flex items-center justify-between text-xs py-1 transition-colors text-left cursor-pointer ${
                      activeTab === item.id ? "text-[#6F9BFF] font-semibold" : "text-[#A5A8AE] hover:text-[#F5F5F0]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#6F9BFF]" />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-400">
                      {item.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Institutional Simulation Labs */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#F5F5F0] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
              Simulation Suites
            </h4>
            <ul className="space-y-1.5">
              {simulationLabs.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      scrollToTop();
                    }}
                    className={`group w-full flex items-center justify-between text-xs py-1 transition-colors text-left cursor-pointer ${
                      activeTab === item.id ? "text-[#8B7CFF] font-semibold" : "text-[#A5A8AE] hover:text-[#F5F5F0]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B7CFF]" />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-400">
                      {item.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Socratic Prompt Inquiries */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#F5F5F0] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]" />
              Socratic Guidance
            </h4>
            <p className="text-[11px] text-[#686C73]">
              Direct inquiry triggers for the Gemini 3.7 Flash AI Market Mentor:
            </p>
            <div className="space-y-2">
              <button
                onClick={() => onOpenSocraticWithQuestion?.("Explain the core mechanics of order books, bid-ask spread, and market impact cost.")}
                className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#6EE7B7]/40 text-[11px] text-slate-300 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span>Order Books & Spread</span>
                <Brain className="w-3 h-3 text-[#6EE7B7] opacity-60 group-hover:opacity-100" />
              </button>

              <button
                onClick={() => onOpenSocraticWithQuestion?.("How do institutional analysts calculate enterprise value (EV/EBITDA) vs traditional P/E ratios?")}
                className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#6EE7B7]/40 text-[11px] text-slate-300 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span>Institutional Valuation</span>
                <Brain className="w-3 h-3 text-[#6EE7B7] opacity-60 group-hover:opacity-100" />
              </button>

              <button
                onClick={() => onOpenSocraticWithQuestion?.("What are the leading indicators of macroeconomic liquidity contraction during rate hike cycles?")}
                className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#6EE7B7]/40 text-[11px] text-slate-300 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span>Macro Liquidity Cycles</span>
                <Brain className="w-3 h-3 text-[#6EE7B7] opacity-60 group-hover:opacity-100" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================ */}
      {/* 3. Bottom Legal, Security & Return to Top Bar */}
      {/* ================================================================ */}
      <div className="border-t border-white/[0.06] bg-[#020305] px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[#686C73] text-[11px] text-center sm:text-left">
            <span>© 2026 STOCKMENTOR AI TERMINAL</span>
            <span className="hidden sm:inline">•</span>
            <span>FOR EDUCATIONAL & RESEARCH SIMULATION ONLY</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-500">NO FINANCIAL ADVISORY SOLICITATION</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono">
              BUILD: 2026.10-FUTURISTIC-LUXURY
            </span>

            {/* Back to Top Precision Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-[#F5F5F0] hover:text-[#6F9BFF] transition-all cursor-pointer"
              title="Return to Top of Terminal"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
