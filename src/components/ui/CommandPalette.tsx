import React, { useState, useEffect, useRef } from "react";
import { TabType } from "../../types";
import { 
  Search, 
  BookOpen, 
  LineChart, 
  TrendingUp, 
  PieChart, 
  Sliders, 
  Brain, 
  Sparkles, 
  X, 
  ArrowRight,
  ShieldAlert,
  Award,
  Users,
  History,
  FileText,
  Dna,
  Briefcase,
  Trophy
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType) => void;
  onAskAI: (query: string) => void;
}

interface CommandItem {
  id: string;
  tabId?: TabType;
  title: string;
  category: "Navigation" | "Advanced Labs" | "AI Intelligence";
  description: string;
  icon: React.ReactNode;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onAskAI
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    {
      id: "home",
      tabId: "home",
      title: "Market Intelligence Overview",
      category: "Navigation",
      description: "Live market dashboard, telemetry, tickers, and active signals",
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      shortcut: "1"
    },
    {
      id: "learn",
      tabId: "learn",
      title: "Market University",
      category: "Navigation",
      description: "Interactive Socratic courses, financial fundamentals, and exams",
      icon: <BookOpen className="w-4 h-4 text-blue-400" />,
      shortcut: "2"
    },
    {
      id: "research",
      tabId: "research",
      title: "Equity Research Terminal",
      category: "Navigation",
      description: "Fundamental analysis, filings, DCF metrics, and competitive moat",
      icon: <Search className="w-4 h-4 text-violet-400" />,
      shortcut: "3"
    },
    {
      id: "charts",
      tabId: "charts",
      title: "Market Visual Lab",
      category: "Navigation",
      description: "High-precision technical charting, RSI, SMA, EMA, and overlays",
      icon: <LineChart className="w-4 h-4 text-cyan-400" />,
      shortcut: "4"
    },
    {
      id: "simulator",
      tabId: "simulator",
      title: "Simulation Desk",
      category: "Navigation",
      description: "₹10,00,000 virtual capital execution desk with live mark-to-market",
      icon: <TrendingUp className="w-4 h-4 text-amber-400" />,
      shortcut: "5"
    },
    {
      id: "portfolio",
      tabId: "portfolio",
      title: "Portfolio Intelligence",
      category: "Navigation",
      description: "Risk allocation, position beta, sector weights, and diagnostics",
      icon: <PieChart className="w-4 h-4 text-emerald-400" />,
      shortcut: "6"
    },
    // Advanced Labs
    {
      id: "become-analyst",
      tabId: "become-analyst",
      title: "30-Min Wall Street Analyst Exam",
      category: "Advanced Labs",
      description: "Prove institutional competency under timed financial pressure",
      icon: <Award className="w-4 h-4 text-amber-400" />
    },
    {
      id: "candle-replay",
      tabId: "candle-replay",
      title: "Historical Chart Replay Lab",
      category: "Advanced Labs",
      description: "Bar-by-bar historical price action simulation with execution checks",
      icon: <LineChart className="w-4 h-4 text-emerald-400" />
    },
    {
      id: "survival",
      tabId: "survival",
      title: "Market Survival & Crash Simulator",
      category: "Advanced Labs",
      description: "Navigate 2008 Lehman, 2020 COVID, and 2000 Dot-com collapses",
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />
    },
    {
      id: "backtest",
      tabId: "backtest",
      title: "Backtesting & Quant Strategy Lab",
      category: "Advanced Labs",
      description: "Test moving average crossovers and mean reversion algorithms",
      icon: <Sliders className="w-4 h-4 text-indigo-400" />
    },
    {
      id: "portfolio-doctor",
      tabId: "portfolio-doctor",
      title: "AI Portfolio Doctor",
      category: "Advanced Labs",
      description: "Algorithmic stress-testing and institutional risk prescriptions",
      icon: <Brain className="w-4 h-4 text-rose-400" />
    },
    {
      id: "committee",
      tabId: "committee",
      title: "AI Investment Committee",
      category: "Advanced Labs",
      description: "Assemble multi-perspective AI directors to vote on your trade ideas",
      icon: <Users className="w-4 h-4 text-indigo-400" />
    },
    {
      id: "translator",
      tabId: "translator",
      title: "10-K & Filing Financial Translator",
      category: "Advanced Labs",
      description: "Translate complex SEC legalese and conference calls into simple insights",
      icon: <FileText className="w-4 h-4 text-emerald-400" />
    },
    {
      id: "journal-dna",
      tabId: "journal-dna",
      title: "Behavioral Intelligence & Trading DNA",
      category: "Advanced Labs",
      description: "Identify psychological biases, revenge trading, and edge metrics",
      icon: <Dna className="w-4 h-4 text-violet-400" />
    },
    {
      id: "fund-manager",
      tabId: "fund-manager",
      title: "Virtual Fund Manager Arena",
      category: "Advanced Labs",
      description: "Allocate virtual institutional AUM across rotating macroeconomic regimes",
      icon: <Briefcase className="w-4 h-4 text-sky-400" />
    },
    {
      id: "leaderboard",
      tabId: "leaderboard",
      title: "Global Skill Ranking",
      category: "Advanced Labs",
      description: "Mastery ladder based on verified test performance and simulation alpha",
      icon: <Trophy className="w-4 h-4 text-amber-400" />
    }
  ];

  // Filter commands by search query
  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Keydown Handler (Cmd+K / Ctrl+K and Navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          const item = filtered[selectedIndex];
          if (item.tabId) onNavigate(item.tabId);
          onClose();
        } else if (query.trim()) {
          onAskAI(query);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, query, onClose, onNavigate, onAskAI]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#0C0F13] border border-slate-200 dark:border-white/[0.12] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 scale-100 animate-in zoom-in-95"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#11151A]/80">
          <Search className="w-5 h-5 text-slate-400 dark:text-[#6F9BFF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, stock symbol, or ask AI a financial question..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#686C73] focus:outline-none font-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:text-[#A5A8AE] bg-slate-200 dark:bg-white/[0.08] rounded border border-slate-300 dark:border-white/[0.08]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-white/[0.04]">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.tabId) onNavigate(item.tabId);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-[#A5A8AE] hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? "bg-white dark:bg-white/[0.1] shadow-xs" : "bg-slate-100 dark:bg-white/[0.05]"
                    }`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-slate-900 dark:text-[#F5F5F0] truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-[#686C73]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#A5A8AE] truncate mt-0.5 font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.shortcut && (
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-200 dark:bg-white/[0.06] rounded text-slate-500 dark:text-[#686C73]">
                        {item.shortcut}
                      </kbd>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-blue-500 dark:text-[#6F9BFF]" : "text-transparent"}`} />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-8 px-4 text-center">
              <Sparkles className="w-8 h-8 text-blue-500 dark:text-[#6F9BFF] mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-800 dark:text-[#F5F5F0]">
                No direct command match for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-[#A5A8AE] mt-1 max-w-sm mx-auto">
                Press <span className="font-semibold text-slate-700 dark:text-slate-300">Enter</span> to consult the Socratic AI Mentor with this prompt.
              </p>
              <button
                onClick={() => {
                  onAskAI(query);
                  onClose();
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 dark:bg-[#6F9BFF] dark:hover:bg-blue-400 text-white dark:text-slate-950 rounded-xl transition-all shadow-sm"
              >
                <Brain className="w-4 h-4" />
                <span>Ask Socratic AI Mentor: &ldquo;{query}&rdquo;</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Quick Keys */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-[#11151A] border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-[#686C73]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#6EE7B7]" />
            <span>AI MENTOR ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
