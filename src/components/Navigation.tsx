import React, { useState } from "react";
import { TabType } from "../types";
import { 
  Home, 
  BookOpen, 
  Search, 
  LineChart, 
  TrendingUp, 
  Briefcase, 
  User,
  PieChart, 
  History, 
  FileText, 
  Sliders, 
  Trophy, 
  Dna, 
  Award, 
  Play, 
  Users, 
  ShieldAlert, 
  Activity, 
  Grid, 
  X,
  Swords
} from "lucide-react";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allModules: { id: TabType; label: string; icon: React.ReactNode; category: "Core" | "Intelligence" | "Simulations" | "Diagnostics" }[] = [
    { id: "home", label: "Market Intelligence", icon: <Home className="w-4 h-4" />, category: "Core" },
    { id: "learn", label: "Market University", icon: <BookOpen className="w-4 h-4" />, category: "Core" },
    { id: "research", label: "Equity Research", icon: <Search className="w-4 h-4" />, category: "Intelligence" },
    { id: "charts", label: "Market Visual Lab", icon: <LineChart className="w-4 h-4" />, category: "Intelligence" },
    { id: "simulator", label: "Simulation Desk", icon: <TrendingUp className="w-4 h-4" />, category: "Simulations" },
    { id: "portfolio", label: "Portfolio Intelligence", icon: <PieChart className="w-4 h-4" />, category: "Core" },
    { id: "profile", label: "User DNA & Profile", icon: <User className="w-4 h-4" />, category: "Core" },
    
    // Simulations & Labs
    { id: "become-analyst", label: "30-Min Analyst Exam", icon: <Award className="w-4 h-4 text-amber-400" />, category: "Simulations" },
    { id: "candle-replay", label: "Chart Replay Mode", icon: <Play className="w-4 h-4 text-emerald-400" />, category: "Simulations" },
    { id: "survival", label: "Market Survival Simulator", icon: <ShieldAlert className="w-4 h-4 text-rose-400" />, category: "Simulations" },
    { id: "historical-sim", label: "Historical Crash Lab", icon: <History className="w-4 h-4 text-amber-400" />, category: "Simulations" },
    { id: "fund-manager", label: "Virtual Fund Manager", icon: <Briefcase className="w-4 h-4 text-sky-400" />, category: "Simulations" },
    
    // Intelligence & Diagnostics
    { id: "committee", label: "AI Investment Committee", icon: <Users className="w-4 h-4 text-violet-400" />, category: "Intelligence" },
    { id: "portfolio-doctor", label: "AI Portfolio Doctor", icon: <Activity className="w-4 h-4 text-rose-400" />, category: "Diagnostics" },
    { id: "translator", label: "10-K Filing Translator", icon: <FileText className="w-4 h-4 text-teal-400" />, category: "Diagnostics" },
    { id: "adversary", label: "Bull vs Bear Adversary", icon: <Swords className="w-4 h-4 text-amber-400" />, category: "Intelligence" },
    { id: "backtest", label: "Backtesting & Quant Lab", icon: <Sliders className="w-4 h-4 text-indigo-400" />, category: "Diagnostics" },
    { id: "labs", label: "Decision Labs Suite", icon: <Sliders className="w-4 h-4 text-blue-400" />, category: "Diagnostics" },
    { id: "journal-dna", label: "Behavioral DNA Journal", icon: <Dna className="w-4 h-4 text-purple-400" />, category: "Diagnostics" },
    { id: "leaderboard", label: "Global Skill Ranking", icon: <Trophy className="w-4 h-4 text-yellow-400" />, category: "Core" }
  ];

  const primaryMobileTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Market", icon: <Home className="w-4 h-4" /> },
    { id: "learn", label: "University", icon: <BookOpen className="w-4 h-4" /> },
    { id: "simulator", label: "Simulator", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "portfolio", label: "Portfolio", icon: <PieChart className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0C0F13]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/[0.08] lg:hidden pb-safe">
        <div className="grid grid-cols-5 h-14 items-center px-1">
          {primaryMobileTabs.map((tab) => {
            const isActive = activeTab === tab.id && !isMobileMenuOpen;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
                  isActive
                    ? "text-blue-600 dark:text-[#6F9BFF] font-semibold"
                    : "text-slate-500 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.icon}
                <span className="text-[10px] font-mono tracking-tight mt-0.5">{tab.label}</span>
              </button>
            );
          })}

          {/* More Drawer Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
              isMobileMenuOpen
                ? "text-blue-600 dark:text-[#6F9BFF] font-semibold"
                : "text-slate-500 dark:text-[#A5A8AE]"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            <span className="text-[10px] font-mono tracking-tight mt-0.5">
              {isMobileMenuOpen ? "Close" : "All Labs"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Up Navigation Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0C0F13] border-t border-slate-200 dark:border-white/[0.1] rounded-t-2xl max-h-[75vh] overflow-y-auto p-4 pb-20 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-[#686C73]">
                All StockMentor Intelligence Labs
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allModules.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition-colors min-h-[48px] ${
                      isActive
                        ? "bg-slate-100 dark:bg-white/[0.1] text-blue-600 dark:text-[#6F9BFF] font-semibold"
                        : "text-slate-700 dark:text-[#A5A8AE] hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-900 dark:text-[#F5F5F0] truncate">
                        {item.label}
                      </p>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-[#686C73]">
                        {item.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
