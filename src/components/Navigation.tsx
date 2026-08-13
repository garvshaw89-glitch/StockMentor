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
  Swords,
  Sliders,
  Trophy,
  Dna,
  Award,
  Play,
  Users,
  ShieldAlert,
  Activity,
  Grid,
  X
} from "lucide-react";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode; category: string }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" />, category: "Core" },
    { id: "home", label: "Home", icon: <Home className="w-4 h-4" />, category: "Core" },
    { id: "learn", label: "University & Learn", icon: <BookOpen className="w-4 h-4" />, category: "Core" },
    { id: "simulator", label: "Paper Trading", icon: <TrendingUp className="w-4 h-4" />, category: "Core" },
    { id: "portfolio", label: "Portfolio", icon: <PieChart className="w-4 h-4" />, category: "Core" },
    
    { id: "become-analyst", label: "30-Min Analyst Exam", icon: <Award className="w-4 h-4 text-amber-400" />, category: "Exams & Sims" },
    { id: "candle-replay", label: "Chart Replay", icon: <Play className="w-4 h-4 text-emerald-400" />, category: "Interactive Labs" },
    { id: "committee", label: "AI Committee", icon: <Users className="w-4 h-4 text-indigo-400" />, category: "Research & AI" },
    { id: "survival", label: "Market Survival", icon: <ShieldAlert className="w-4 h-4 text-rose-400" />, category: "Exams & Sims" },
    { id: "backtest", label: "Backtest Lab", icon: <Sliders className="w-4 h-4 text-indigo-400" />, category: "Interactive Labs" },
    { id: "portfolio-doctor", label: "Portfolio Doctor", icon: <Activity className="w-4 h-4 text-rose-400" />, category: "Research & AI" },
    { id: "translator", label: "Translator & Why", icon: <FileText className="w-4 h-4 text-emerald-400" />, category: "Research & AI" },
    { id: "historical-sim", label: "Crash Simulator", icon: <History className="w-4 h-4" />, category: "Exams & Sims" },
    { id: "exam", label: "Stock Exam", icon: <FileText className="w-4 h-4" />, category: "Exams & Sims" },
    { id: "adversary", label: "Bull vs Bear", icon: <Swords className="w-4 h-4" />, category: "Research & AI" },
    { id: "labs", label: "Decision Labs", icon: <Sliders className="w-4 h-4" />, category: "Interactive Labs" },
    { id: "leaderboard", label: "Skill Ranking", icon: <Trophy className="w-4 h-4" />, category: "Core" },
    { id: "fund-manager", label: "Fund Manager", icon: <Briefcase className="w-4 h-4" />, category: "Exams & Sims" },
    { id: "journal-dna", label: "Journal & DNA", icon: <Dna className="w-4 h-4" />, category: "Interactive Labs" },
    { id: "research", label: "Socratic Research", icon: <Search className="w-4 h-4" />, category: "Research & AI" },
    { id: "charts", label: "Charts Lab", icon: <LineChart className="w-4 h-4" />, category: "Interactive Labs" },
  ];

  const primaryMobileTabs: TabType[] = ["profile", "home", "learn", "simulator", "portfolio"];

  const handleMobileTabClick = (id: TabType) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation Sub-Header Bar */}
      <div className="bg-slate-100/90 dark:bg-[#0D1117] border-b border-slate-200 dark:border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1.5 overflow-x-auto py-2.5 scrollbar-none" aria-label="Tabs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-slate-800 text-emerald-400 border border-slate-700/80 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar with More Drawer Trigger */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0D1117] backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden pb-safe">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {primaryMobileTabs.map((tabId) => {
            const item = navItems.find(n => n.id === tabId)!;
            const isActive = activeTab === tabId && !isMobileMenuOpen;
            return (
              <button
                key={tabId}
                onClick={() => handleMobileTabClick(tabId)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "text-emerald-400 font-extrabold bg-slate-800 border border-slate-700/60"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <div className={`p-0.5 ${isActive ? "scale-110 text-emerald-400" : ""}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] truncate font-bold leading-tight mt-1">
                  {item.label.split(' ')[0]}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              isMobileMenuOpen || !primaryMobileTabs.includes(activeTab)
                ? "text-indigo-400 font-extrabold bg-indigo-950/60 border border-indigo-500/40"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Grid className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] truncate font-bold leading-tight mt-1">
              Modules
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Full Modules Navigation Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md md:hidden flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-indigo-400" />
                  <span>All StockMentor Modules</span>
                </h3>
                <p className="text-xs text-slate-400">Select any module to navigate directly</p>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileTabClick(item.id)}
                    className={`p-3 rounded-2xl text-left border flex items-center gap-2.5 transition-all ${
                      isActive
                        ? "bg-slate-800 text-emerald-400 border-emerald-500/50 shadow-md"
                        : "bg-slate-950/80 border-slate-800/80 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold leading-tight line-clamp-2">
                      {item.label}
                    </span>
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
