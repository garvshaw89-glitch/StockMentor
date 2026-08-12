import React from "react";
import { ExplanationMode, TabType, UserProfile } from "../types";
import { Sparkles, Sun, Moon, Search, Flame, Award, Wallet, Info } from "lucide-react";

interface HeaderProps {
  mode: ExplanationMode;
  setMode: (mode: ExplanationMode) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  profile: UserProfile;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  isDarkMode,
  setIsDarkMode,
  profile,
  activeTab,
  setActiveTab,
  onOpenSearch
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0D1117] backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black font-extrabold shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  StockMentor
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md uppercase tracking-wider border border-emerald-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Socratic Market Intelligence
              </p>
            </div>
          </div>

          {/* Quick Search & Explanation Mode Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80"
              title="Search stocks or topics"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="hidden md:inline">Search equities or modules...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-900 rounded text-slate-500 dark:text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Explanation Mode Toggle */}
            <div className="bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700/80 text-xs font-medium">
              <button
                onClick={() => setMode("ELI5")}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  mode === "ELI5"
                    ? "bg-amber-500 text-black font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Explain Like I'm 5 (Simple analogies)"
              >
                <span>🧒</span>
                <span className="hidden sm:inline">ELI5</span>
              </button>

              <button
                onClick={() => setMode("Simple")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  mode === "Simple"
                    ? "bg-emerald-500 text-black font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Simple & clear terms"
              >
                <span>Simple</span>
              </button>

              <button
                onClick={() => setMode("Professional")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  mode === "Professional"
                    ? "bg-indigo-500 text-white font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Professional financial terms"
              >
                <span>Pro</span>
              </button>
            </div>

            {/* Streak & Virtual Cash Badges */}
            <div className="hidden lg:flex items-center gap-2">
              <div 
                onClick={() => setActiveTab("profile")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-orange-500 dark:text-orange-400 cursor-pointer hover:opacity-90 transition-opacity"
                title="Current Learning Streak"
              >
                <span className="text-orange-400 font-bold">{profile.streak} 🔥</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-normal">Day Streak</span>
              </div>

              <div 
                onClick={() => setActiveTab("simulator")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer hover:opacity-90 transition-opacity"
                title="Virtual Cash Balance"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                <span>₹{(profile.paperBalance / 100000).toFixed(2)}L</span>
              </div>
            </div>

            {/* User Avatar Circle */}
            <div 
              onClick={() => setActiveTab("profile")}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs shadow-md cursor-pointer hover:border-emerald-500 transition-colors"
              title="User Profile"
            >
              AS
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Global Safety Disclaimer Banner */}
        <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 px-3 py-1 rounded-lg flex items-center justify-between border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">
              Educational market simulator & Socratic AI — not financial investment advice.
            </span>
          </div>
          <span className="hidden sm:inline font-semibold text-emerald-600 dark:text-emerald-400 ml-2 shrink-0">
            Mode: {mode}
          </span>
        </div>
      </div>
    </header>
  );
};
