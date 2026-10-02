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
  ExternalLink,
  LineChart
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

  const primaryNavItems: { id: TabType; label: string }[] = [
    { id: "home", label: "MARKET" },
    { id: "learn", label: "LEARN" },
    { id: "research", label: "RESEARCH" },
    { id: "charts", label: "CHARTS" },
    { id: "simulator", label: "SIMULATOR" },
    { id: "portfolio", label: "PORTFOLIO" }
  ];

  const labItems: { id: TabType; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "labs", label: "Decision Labs Suite", icon: <Sliders className="w-4 h-4 text-blue-400" />, desc: "Order book & valuation models" },
    { id: "become-analyst", label: "30-Min Analyst Exam", icon: <Award className="w-4 h-4 text-amber-400" />, desc: "Timed institutional evaluation" },
    { id: "candle-replay", label: "Chart Replay Mode", icon: <LineChart className="w-4 h-4 text-emerald-400" />, desc: "Historical price action simulator" },
    { id: "survival", label: "Market Survival Simulator", icon: <ShieldAlert className="w-4 h-4 text-rose-400" />, desc: "Lehman, COVID, Dot-Com crashes" },
    { id: "backtest", label: "Backtesting & Quant Lab", icon: <Sliders className="w-4 h-4 text-indigo-400" />, desc: "Algorithm stress testing" },
    { id: "portfolio-doctor", label: "AI Portfolio Doctor", icon: <Activity className="w-4 h-4 text-rose-400" />, desc: "Risk diagnosis & rebalancing" },
    { id: "committee", label: "AI Investment Committee", icon: <Users className="w-4 h-4 text-violet-400" />, desc: "Multi-model committee review" },
    { id: "translator", label: "10-K Filing Translator", icon: <FileText className="w-4 h-4 text-teal-400" />, desc: "SEC reports & jargon converter" },
    { id: "historical-sim", label: "Historical Crash Lab", icon: <History className="w-4 h-4 text-amber-400" />, desc: "Deep macroeconomic crises" },
    { id: "journal-dna", label: "Behavioral DNA Journal", icon: <Dna className="w-4 h-4 text-purple-400" />, desc: "Psychology & bias tracking" },
    { id: "fund-manager", label: "Virtual Fund Manager", icon: <Briefcase className="w-4 h-4 text-sky-400" />, desc: "Multi-asset institutional mandate" },
    { id: "leaderboard", label: "Global Skill Ranking", icon: <Trophy className="w-4 h-4 text-yellow-400" />, desc: "Mastery ladder & achievements" }
  ];

  const isCurrentTabInLabs = labItems.some(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#080A0D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.07] transition-colors select-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* ================================================================ */}
          {/* Left: Brand Command Identity */}
          {/* ================================================================ */}
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            {/* Terminal Monogram Beacon */}
            <div 
              onClick={(e) => {
                if (onReinitialize) {
                  e.stopPropagation();
                  onReinitialize();
                }
              }}
              title="Replay System Initialization Awakening"
              className="relative w-8 h-8 rounded-lg bg-slate-900 dark:bg-white/[0.06] border border-slate-700/60 dark:border-white/[0.12] flex items-center justify-center transition-all group-hover:border-blue-500/50"
            >
              <span className="font-mono text-sm font-bold text-white dark:text-[#F5F5F0]">
                SM
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-beacon" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-[#F5F5F0]">
                  STOCKMENTOR
                </span>
                <span className="hidden xl:inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono font-medium tracking-widest text-emerald-600 dark:text-[#6EE7B7] bg-emerald-500/10 border border-emerald-500/20 rounded">
                  LIVE · 12ms
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-[#686C73]">
                AI MARKET INTELLIGENCE
              </p>
            </div>
          </div>

          {/* ================================================================ */}
          {/* Center: Editorial Navigation Dock */}
          {/* ================================================================ */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-150 rounded-lg cursor-pointer ${
                    isActive
                      ? "text-slate-950 dark:text-[#F5F5F0] bg-slate-200/80 dark:bg-white/[0.08] font-bold shadow-xs border border-slate-300/80 dark:border-white/[0.1]"
                      : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-950 dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* LABS Mega Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-150 rounded-lg cursor-pointer ${
                  isCurrentTabInLabs
                    ? "text-slate-950 dark:text-[#F5F5F0] bg-slate-200/80 dark:bg-white/[0.08] font-bold border border-slate-300/80 dark:border-white/[0.1]"
                    : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-950 dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                <span>LABS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${labsDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {labsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-96 bg-white dark:bg-[#0C0F13] border border-slate-200 dark:border-white/[0.12] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/[0.06] mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-[#686C73]">
                      Institutional Labs & Diagnostics
                    </span>
                  </div>
                  <div className="max-h-[380px] overflow-y-auto space-y-1">
                    {labItems.map((lab) => {
                      const isSelected = activeTab === lab.id;
                      return (
                        <button
                          key={lab.id}
                          onClick={() => {
                            setActiveTab(lab.id);
                            setLabsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white"
                              : "text-slate-700 dark:text-[#A5A8AE] hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="p-1.5 rounded-md bg-slate-100 dark:bg-white/[0.05] shrink-0">
                            {lab.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F0] truncate">
                              {lab.label}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-[#686C73] truncate">
                              {lab.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ================================================================ */}
          {/* Right: Search, AI Mentor, Pedagogy, Theme, Profile */}
          {/* ================================================================ */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Search Button (⌘K) */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-slate-100/90 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.09] text-slate-600 dark:text-[#A5A8AE] border border-slate-200 dark:border-white/[0.08] rounded-lg transition-colors cursor-pointer"
              title="Quick Command & Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-[#6F9BFF]" />
              <span className="hidden md:inline text-[11px]">SEARCH</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-slate-200 dark:bg-white/[0.08] text-slate-500 dark:text-[#A5A8AE] rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* AI Mentor Button */}
            <button
              onClick={onOpenAIMentor}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 dark:bg-[#6F9BFF]/15 hover:dark:bg-[#6F9BFF]/25 text-white dark:text-[#6F9BFF] border border-transparent dark:border-[#6F9BFF]/30 rounded-lg transition-all cursor-pointer shadow-xs"
              title="Open AI Market Mentor"
            >
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono tracking-tight text-[11px]">AI MENTOR</span>
            </button>

            {/* Pedagogy Mode Selector */}
            <div className="hidden xl:flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-[11px] font-mono">
              <button
                onClick={() => setMode("ELI5")}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  mode === "ELI5"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Explain Like I'm 5 (Intuitive analogies)"
              >
                ELI5
              </button>
              <button
                onClick={() => setMode("Simple")}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  mode === "Simple"
                    ? "bg-blue-600 dark:bg-[#6F9BFF] text-white dark:text-slate-950 font-bold"
                    : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Simple & clear terms"
              >
                Simple
              </button>
              <button
                onClick={() => setMode("Professional")}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  mode === "Professional"
                    ? "bg-emerald-500 dark:bg-[#6EE7B7] text-slate-950 font-bold"
                    : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Institutional quant & valuation metrics"
              >
                Pro
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] rounded-lg transition-colors cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>

            {/* Profile Avatar Trigger */}
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-slate-200/90 dark:bg-white/[0.1] border-slate-400 dark:border-white/[0.2]"
                  : "bg-slate-100/80 dark:bg-white/[0.04] border-slate-200 dark:border-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.08]"
              }`}
              title="Open Profile & Performance DNA"
            >
              <span className="text-sm">{profile.avatar || "👤"}</span>
              <span className="hidden sm:inline text-xs font-mono font-medium text-slate-900 dark:text-[#F5F5F0]">
                {profile.name}
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
