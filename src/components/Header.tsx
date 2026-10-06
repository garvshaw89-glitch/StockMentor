import React, { useState, useRef, useEffect } from "react";
import { ExplanationMode, TabType, UserProfile } from "../types";
import { 
  Sun, 
  Moon, 
  Search, 
  Brain, 
  ChevronDown, 
  Award, 
  Sliders, 
  ShieldAlert, 
  History, 
  Activity, 
  FileText, 
  Users, 
  Dna, 
  Briefcase, 
  Trophy, 
  LineChart,
  Sparkles,
  Command,
  Radio,
  Layers,
  Zap,
  Flame,
  Globe2
} from "lucide-react";

interface HeaderProps {
  mode: ExplanationMode;
  setMode: (mode: ExplanationMode) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  profile: UserProfile;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenAIMentor: () => void;
  onReinitialize?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  isDarkMode,
  setIsDarkMode,
  profile,
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAIMentor,
  onReinitialize
}) => {
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [telemetryTick, setTelemetryTick] = useState(0);

  // Micro-telemetry cycle simulation for futuristic live terminal feel
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Close labs dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLabsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const primaryNavItems: { id: TabType; label: string; code: string }[] = [
    { id: "home", label: "MARKET", code: "01" },
    { id: "learn", label: "ACADEMY", code: "02" },
    { id: "research", label: "RESEARCH", code: "03" },
    { id: "charts", label: "CHARTS", code: "04" },
    { id: "simulator", label: "SIMULATOR", code: "05" },
    { id: "portfolio", label: "PORTFOLIO", code: "06" }
  ];

  const labCategories = [
    {
      category: "Simulations & Market Crashes",
      items: [
        { id: "simulator" as TabType, label: "Live Trading Learning Desk", icon: <LineChart className="w-3.5 h-3.5 text-[#6EE7B7]" />, desc: "Paper trading equities & options" },
        { id: "candle-replay" as TabType, label: "Chart Replay Simulator", icon: <LineChart className="w-3.5 h-3.5 text-emerald-400" />, desc: "Candle-by-candle blind market replay" },
        { id: "survival" as TabType, label: "Market Survival Simulator", icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />, desc: "Survive Lehman, COVID & Dot-Com crises" },
        { id: "historical-sim" as TabType, label: "Historical Crash Laboratory", icon: <History className="w-3.5 h-3.5 text-amber-400" />, desc: "1929 to 2020 systemic crash scenarios" },
        { id: "fund-manager" as TabType, label: "Virtual Fund Manager", icon: <Briefcase className="w-3.5 h-3.5 text-sky-400" />, desc: "Allocate institutional ₹100 Cr mandate" },
        { id: "become-analyst" as TabType, label: "30-Min Analyst Evaluation", icon: <Award className="w-3.5 h-3.5 text-yellow-400" />, desc: "Wall Street equity research evaluation" }
      ]
    },
    {
      category: "AI Intelligence & Diagnostics",
      items: [
        { id: "committee" as TabType, label: "AI Investment Committee", icon: <Users className="w-3.5 h-3.5 text-violet-400" />, desc: "Multi-persona AI thesis debate" },
        { id: "portfolio-doctor" as TabType, label: "AI Portfolio Doctor", icon: <Activity className="w-3.5 h-3.5 text-rose-400" />, desc: "Stress test holdings & correlation risk" },
        { id: "translator" as TabType, label: "10-K & Filing Translator", icon: <FileText className="w-3.5 h-3.5 text-teal-400" />, desc: "Convert dense reports into plain English" },
        { id: "backtest" as TabType, label: "Backtesting & Quant Lab", icon: <Sliders className="w-3.5 h-3.5 text-indigo-400" />, desc: "SMA / RSI technical algorithmic models" },
        { id: "labs" as TabType, label: "Decision Labs Suite", icon: <Layers className="w-3.5 h-3.5 text-blue-400" />, desc: "Order books, DCF, and option Greeks" },
        { id: "journal-dna" as TabType, label: "Behavioral DNA Journal", icon: <Dna className="w-3.5 h-3.5 text-purple-400" />, desc: "Psychology & cognitive bias tracking" },
        { id: "leaderboard" as TabType, label: "Global Skill Ranking", icon: <Trophy className="w-3.5 h-3.5 text-yellow-400" />, desc: "Institutional ranking & trader badges" }
      ]
    }
  ];

  const allLabItems = labCategories.flatMap(c => c.items);
  const isCurrentTabInLabs = allLabItems.some(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-[#040609]/90 dark:bg-[#040609]/95 backdrop-blur-3xl border-b border-white/[0.08] transition-colors select-none shadow-[0_4px_35px_rgba(0,0,0,0.7)]">
      
      {/* Top Futuristic Multi-Spectrum Laser Hairline */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#6F9BFF]/80 via-[#D4AF37]/50 via-[#6EE7B7]/80 to-transparent opacity-90 shadow-[0_0_12px_rgba(111,155,255,0.4)]" />

      {/* Futuristic Nano Scanline Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-6">
          
          {/* ================================================================ */}
          {/* Left: Brand Command Identity & Holographic Monogram */}
          {/* ================================================================ */}
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            {/* Holographic Terminal Monogram Badge */}
            <div 
              onClick={(e) => {
                if (onReinitialize) {
                  e.stopPropagation();
                  onReinitialize();
                }
              }}
              title="System Awakening Status · Click to Replay Initialization"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-[#181D26] via-[#0F131A] to-[#07090D] border border-white/[0.18] group-hover:border-[#6F9BFF]/80 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(111,155,255,0.2)] group-hover:shadow-[0_0_30px_rgba(111,155,255,0.45)] ring-1 ring-white/5"
            >
              {/* Corner tech notches */}
              <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t-2 border-l-2 border-[#6F9BFF]" />
              <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b-2 border-r-2 border-[#6EE7B7]" />
              
              <span className="font-mono text-xs sm:text-sm font-black tracking-tighter bg-gradient-to-br from-white via-[#F5F5F0] to-[#8E929B] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                SM
              </span>

              {/* Pulsing Quantum Beacon */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6EE7B7] shadow-[0_0_10px_#10B981]"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base sm:text-lg tracking-wider bg-gradient-to-r from-white via-[#F5F5F0] to-[#B0B4BC] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#6F9BFF] transition-all">
                  STOCKMENTOR
                </span>
                
                {/* Live Rotating Terminal Telemetry Pill */}
                <div className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono font-semibold tracking-wider text-[#6EE7B7] bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 rounded-full shadow-[0_0_10px_rgba(110,231,183,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
                  {telemetryTick === 0 && <span>NSE LIVE · 24,852.15</span>}
                  {telemetryTick === 1 && <span>GEMINI 3.7 · 12ms</span>}
                  {telemetryTick === 2 && <span>REGIME: ACCUMULATION</span>}
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-mono tracking-widest text-[#727680]">
                <span className="text-[#6F9BFF] font-semibold flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#6F9BFF]" />
                  SOCRATIC INTELLIGENCE
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 dark:text-slate-500">TERMINAL v4.2 PRO</span>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* Center: Futuristic Capsule Navigation Dock */}
          {/* ================================================================ */}
          <nav className="hidden lg:flex items-center bg-[#090C10]/85 border border-white/[0.1] backdrop-blur-2xl p-1 rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.5)]">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 rounded-lg cursor-pointer ${
                    isActive
                      ? "text-white font-bold bg-white/[0.09] border border-white/[0.16] shadow-[0_0_20px_rgba(111,155,255,0.25)]"
                      : "text-[#A5A8AE] hover:text-[#F5F5F0] hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className={`text-[8.5px] font-mono transition-colors ${isActive ? "text-[#6F9BFF] font-bold" : "text-slate-600"}`}>
                      {item.code}
                    </span>
                    <span>{item.label}</span>
                  </span>

                  {/* Active bottom cyan ray */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#6F9BFF] via-[#6EE7B7] to-transparent shadow-[0_0_10px_#6F9BFF]" />
                  )}
                </button>
              );
            })}

            {/* Futuristic LABS Mega Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 rounded-lg cursor-pointer ${
                  isCurrentTabInLabs
                    ? "text-white font-bold bg-[#8B7CFF]/15 border border-[#8B7CFF]/35 shadow-[0_0_20px_rgba(139,124,255,0.25)]"
                    : "text-[#A5A8AE] hover:text-[#F5F5F0] hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isCurrentTabInLabs ? "text-[#8B7CFF]" : "text-slate-400"}`} />
                <span>LABS</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${labsDropdownOpen ? "rotate-180 text-[#8B7CFF]" : "text-slate-400"}`} />

                {isCurrentTabInLabs && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#8B7CFF] to-transparent shadow-[0_0_10px_#8B7CFF]" />
                )}
              </button>

              {/* Mega Dropdown Panel */}
              {labsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[480px] bg-[#07090D]/98 border border-white/[0.14] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5F5F0] font-bold">
                        Institutional Simulation Suites
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-[#8B7CFF] px-2 py-0.5 rounded-full bg-[#8B7CFF]/10 border border-[#8B7CFF]/25 font-semibold">
                      12 ENGINES ONLINE
                    </span>
                  </div>

                  <div className="max-h-[430px] overflow-y-auto space-y-3.5 pr-1 scrollbar-none">
                    {labCategories.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-1">
                        <div className="px-2.5 text-[9px] font-mono uppercase tracking-wider text-[#727680] font-semibold flex items-center justify-between">
                          <span>{group.category}</span>
                          <span className="text-[8px] text-slate-600 font-mono">EN-{gIdx + 1}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          {group.items.map((lab) => {
                            const isSelected = activeTab === lab.id;
                            return (
                              <button
                                key={lab.id}
                                onClick={() => {
                                  setActiveTab(lab.id);
                                  setLabsDropdownOpen(false);
                                }}
                                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                                  isSelected
                                    ? "bg-white/[0.1] border border-white/[0.18] text-white shadow-xs"
                                    : "hover:bg-white/[0.05] border border-transparent text-[#A5A8AE] hover:text-[#F5F5F0]"
                                }`}
                              >
                                <div className="p-1.5 rounded-lg bg-black/60 border border-white/[0.08] shrink-0">
                                  {lab.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold tracking-tight text-[#F5F5F0] truncate">
                                    {lab.label}
                                  </p>
                                  <p className="text-[10.5px] text-[#727680] truncate">
                                    {lab.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ================================================================ */}
          {/* Right: Quick Search, AI Mentor, Pedagogy, Theme, Profile */}
          {/* ================================================================ */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Quick Command & Search Key (⌘K) */}
            <button
              onClick={onOpenSearch}
              className="group flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-mono bg-[#090C10] hover:bg-[#131720] text-[#A5A8AE] hover:text-white border border-white/[0.1] hover:border-[#6F9BFF]/50 rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
              title="Global Terminal Command Search (⌘K)"
              aria-label="Open Command Search"
            >
              <Search className="w-3.5 h-3.5 text-[#6F9BFF] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-[11px] font-medium tracking-wide">COMMAND</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] bg-white/[0.06] text-[#A5A8AE] rounded border border-white/[0.08] font-mono shadow-inner">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* AI Market Mentor Console Trigger */}
            <button
              onClick={onOpenAIMentor}
              className="relative group flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#6F9BFF]/15 via-[#8B7CFF]/15 to-[#6EE7B7]/15 hover:from-[#6F9BFF]/25 hover:via-[#8B7CFF]/25 hover:to-[#6EE7B7]/25 text-[#F5F5F0] border border-[#6F9BFF]/40 hover:border-[#6F9BFF]/70 rounded-xl transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(111,155,255,0.2)] group-hover:shadow-[0_0_28px_rgba(111,155,255,0.4)]"
              title="Invoke Socratic AI Market Mentor"
            >
              <div className="relative">
                <Brain className="w-3.5 h-3.5 text-[#6F9BFF] group-hover:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-[#6EE7B7] animate-ping" />
              </div>
              <span className="hidden sm:inline font-mono tracking-wider text-[11px]">
                AI MENTOR
              </span>
            </button>

            {/* Tactile Luxury Pedagogy Mode Switcher (Horology Complication Bezel Style) */}
            <div className="hidden xl:flex items-center p-0.5 rounded-xl bg-black/60 border border-white/[0.1] text-[10px] font-mono shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
              <button
                onClick={() => setMode("ELI5")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  mode === "ELI5"
                    ? "bg-[#F5C76B] text-black font-bold shadow-[0_0_12px_rgba(245,199,107,0.4)] ring-1 ring-[#F5C76B]/40"
                    : "text-[#727680] hover:text-white"
                }`}
                title="Explain Like I'm 5 (Intuitive analogies)"
              >
                ELI5
              </button>
              <button
                onClick={() => setMode("Simple")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  mode === "Simple"
                    ? "bg-[#6F9BFF] text-black font-bold shadow-[0_0_12px_rgba(111,155,255,0.4)] ring-1 ring-[#6F9BFF]/40"
                    : "text-[#727680] hover:text-white"
                }`}
                title="Simple & clear investor language"
              >
                SIMPLE
              </button>
              <button
                onClick={() => setMode("Professional")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  mode === "Professional"
                    ? "bg-[#6EE7B7] text-black font-bold shadow-[0_0_12px_rgba(110,231,183,0.4)] ring-1 ring-[#6EE7B7]/40"
                    : "text-[#727680] hover:text-white"
                }`}
                title="Institutional quantitative metrics & financial vocabulary"
              >
                PRO
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-[#A5A8AE] hover:text-white bg-[#090C10] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] rounded-xl transition-all cursor-pointer shadow-xs"
              title={isDarkMode ? "Switch to Photopic Day Mode" : "Switch to Deep Obsidian Terminal Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 text-[#F5C76B] transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
              )}
            </button>

            {/* User Terminal Status & DNA Profile Badge */}
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-white/[0.12] border-white/[0.28] shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                  : "bg-[#090C10] border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
              }`}
              title="Terminal Profile & Performance DNA"
            >
              <span className="text-xs">{profile.avatar || "👤"}</span>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] font-mono font-semibold text-[#F5F5F0] leading-none">
                  {profile.name}
                </span>
                <span className="text-[8.5px] font-mono text-[#6EE7B7] leading-tight">
                  LVL {profile.level} · ₹{(profile.paperBalance / 100000).toFixed(1)}L
                </span>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
