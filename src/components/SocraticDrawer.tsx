import React, { useState, useEffect, useRef } from "react";
import { ChatMessage, ExplanationMode } from "../types";
import { AIVisualDiagram, DiagramType } from "./AIVisualDiagram";
import { 
  X, 
  Send, 
  Brain, 
  RotateCcw, 
  Sparkles, 
  Activity,
  History,
  BookOpen,
  Search,
  Star,
  Trash2,
  Share2,
  Copy,
  Check,
  ChevronRight,
  Download,
  Filter,
  ArrowRight,
  MessageSquare,
  Award,
  Zap,
  CheckCircle2,
  HelpCircle,
  Lightbulb
} from "lucide-react";

export interface SocraticJourneyItem {
  id: string;
  timestamp: string;
  date: string;
  topicTitle: string;
  topicCategory: "Price Action & Technics" | "Valuation & Fundamentals" | "Derivatives & Options" | "Risk & Sizing" | "Market Psychology";
  mentorQuestion: string; // The Socratic question/challenge posed by the AI mentor
  userAnswer: string; // The user's deduction or hypothesis
  mentorSynthesis: string; // The AI mentor's feedback, insight, and first-principles takeaway
  keyTakeaway: string; // Core institutional rule learned
  mode: ExplanationMode;
  diagramType?: DiagramType | null;
  bookmarked?: boolean;
}

const STORAGE_KEY = "stockmentor_socratic_journey_v2";

const INITIAL_JOURNEY_MILESTONES: SocraticJourneyItem[] = [
  {
    id: "journey-1",
    timestamp: "10:42 AM",
    date: "Oct 2, 2026",
    topicTitle: "Spotting Institutional Liquidity Absorption vs Bull Trap",
    topicCategory: "Price Action & Technics",
    mentorQuestion: "Notice the long upper wick on the 4-hour candle at ₹2,850 with declining volume. Why might institutions be selling into retail market buy orders rather than confirming the breakout?",
    userAnswer: "Retail buyers are aggressively market-buying the psychological round number breakout. Institutions use that surge in counter-party liquidity to offload massive blocks without creating negative price slippage against themselves.",
    mentorSynthesis: "Exact deduction. That is textbook liquidity harvesting. Smart money seeks out aggressive retail market orders to exit or initiate short positions without pushing price down prematurely.",
    keyTakeaway: "Never market-buy an unconfirmed breakout into a round number without an established value-area retest and volumetric absorption.",
    mode: "Professional",
    diagramType: "breakout",
    bookmarked: true
  },
  {
    id: "journey-2",
    timestamp: "02:15 PM",
    date: "Sep 28, 2026",
    topicTitle: "Cyclical Low P/E Multiple Traps vs Genuine Margin of Safety",
    topicCategory: "Valuation & Fundamentals",
    mentorQuestion: "A cyclical metal producer is currently trading at a 5-year historical low P/E multiple of 6x while commodity prices are at cycle peaks. Is this stock an obvious value bargain?",
    userAnswer: "No, cyclical companies frequently appear cheapest at the peak of the economic cycle because net earnings (the denominator) are abnormally high. When commodity prices normalize, earnings will collapse and the multiple will expand dramatically.",
    mentorSynthesis: "Brilliant first-principles logic. You navigated the quintessential low P/E value trap. In cyclical commodity sectors, peak earnings yield misleadingly depressed multiples.",
    keyTakeaway: "Always normalize through-cycle EBITDA rather than relying on trailing 12-month P/E when evaluating cyclical industries.",
    mode: "Simple",
    diagramType: "valuation_pe",
    bookmarked: true
  },
  {
    id: "journey-3",
    timestamp: "11:30 AM",
    date: "Sep 24, 2026",
    topicTitle: "Implied Volatility Collapse (Vega Crush) During Earnings",
    topicCategory: "Derivatives & Options",
    mentorQuestion: "If you buy an At-The-Money Call Option right before earnings and the underlying stock rallies 2.5% in your direction the next morning, why might your position still record a net loss?",
    userAnswer: "Vega crush. The earnings event resolved the binary outcome, causing Implied Volatility (IV) to collapse immediately. The destruction of extrinsic option premium exceeded the intrinsic delta gain.",
    mentorSynthesis: "Spot on. Option pricing reflects probability distributions. Once the event occurs, volatility collapses instantly. Institutional traders deploy defined-risk spreads to isolate directional delta from vega decay.",
    keyTakeaway: "Single-leg long options into binary catalysts require massive multi-standard-deviation moves to overcome overnight volatility crush.",
    mode: "Professional",
    diagramType: "option_chain",
    bookmarked: false
  },
  {
    id: "journey-4",
    timestamp: "04:10 PM",
    date: "Sep 19, 2026",
    topicTitle: "Asymmetric Risk-to-Reward Ratio & Mathematical Expectancy",
    topicCategory: "Risk & Sizing",
    mentorQuestion: "If an algorithmic quantitative trader only wins 35% of their total trades, can they consistently outperform the benchmark index? How?",
    userAnswer: "Yes, by maintaining a strict Risk-to-Reward ratio of 1:3 or greater. With 35 wins at +3R (+105R) and 65 losses at -1R (-65R), net return is +40R. Even with a sub-40% win rate, payout asymmetry creates positive expectancy.",
    mentorSynthesis: "Flawlessly calculated. Trading is a game of probability and expectancy, not accuracy percentage. Asymmetric payoffs protect portfolio survivability even during extended drawdowns.",
    keyTakeaway: "Expectancy = (Win% × Avg Win) - (Loss% × Avg Loss). Prioritize risk-to-reward asymmetry over batting average.",
    mode: "ELI5",
    diagramType: "risk_reward",
    bookmarked: true
  },
  {
    id: "journey-5",
    timestamp: "03:45 PM",
    date: "Sep 14, 2026",
    topicTitle: "The Disposition Effect & Cognitive Loss Aversion",
    topicCategory: "Market Psychology",
    mentorQuestion: "Why do retail investors tend to cut winning positions quickly for tiny profits while holding losing stocks for months or years hoping to break even?",
    userAnswer: "Prospect Theory and loss aversion bias. The psychological pain of realizing a loss is felt twice as intensely as the pleasure of an equivalent gain, so traders gamble on recovery rather than taking small paper losses.",
    mentorSynthesis: "Profound psychological insight. The emotional refusal to accept an invalidation turns manageable tactical mistakes into catastrophic permanent capital destruction.",
    keyTakeaway: "Define your invalidation point before entering. A disciplined stop-loss is simply the cost of doing business in financial markets.",
    mode: "Simple",
    diagramType: "candlestick",
    bookmarked: false
  }
];

interface SocraticDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ExplanationMode;
  onSetMode: (m: ExplanationMode) => void;
  initialQuestion?: string | null;
}

export const SocraticDrawer: React.FC<SocraticDrawerProps> = ({
  isOpen,
  onClose,
  mode,
  onSetMode,
  initialQuestion
}) => {
  // Drawer Tab: 'live' chat or 'history' learning journey
  const [activeDrawerTab, setActiveDrawerTab] = useState<"live" | "history">("live");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: `AI MARKET MENTOR // SYSTEM ONLINE\n\nI am your Socratic investment intelligence guide powered by Gemini 3.7 Flash. Rather than giving rote stock tips, I guide you to uncover market mechanics, technical chart structures, order book dynamics, and valuation formulas through first-principles reasoning.\n\nWhat would you like to analyze or understand today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string>("Gemini 3.7 Flash");

  // Learning Journey History State
  const [journeyItems, setJourneyItems] = useState<SocraticJourneyItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Error loading Socratic journey from localStorage:", e);
    }
    return INITIAL_JOURNEY_MILESTONES;
  });

  // History filtering and search state
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [modeFilter, setModeFilter] = useState<string>("All");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedJourneyId, setExpandedJourneyId] = useState<string | null>(null);

  // Sync journey items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journeyItems));
    } catch (e) {
      console.warn("Error persisting Socratic journey:", e);
    }
  }, [journeyItems]);

  // Helper to infer diagram type from message text or tag
  const detectDiagramType = (text: string): DiagramType | null => {
    const lower = text.toLowerCase();
    if (text.includes("[DIAGRAM:candlestick]") || lower.includes("candlestick") || lower.includes("engulfing") || lower.includes("doji") || lower.includes("hammer")) {
      return "candlestick";
    }
    if (text.includes("[DIAGRAM:breakout]") || lower.includes("breakout") || lower.includes("resistance") || lower.includes("support")) {
      return "breakout";
    }
    if (text.includes("[DIAGRAM:valuation_pe]") || lower.includes("p/e") || lower.includes("pe ratio") || lower.includes("valuation scale")) {
      return "valuation_pe";
    }
    if (text.includes("[DIAGRAM:cashflow_flow]") || lower.includes("cash flow") || lower.includes("ebitda") || lower.includes("income statement")) {
      return "cashflow_flow";
    }
    if (text.includes("[DIAGRAM:risk_reward]") || lower.includes("stop loss") || lower.includes("risk reward") || lower.includes("target")) {
      return "risk_reward";
    }
    if (text.includes("[DIAGRAM:order_book]") || lower.includes("order book") || lower.includes("bid") || lower.includes("ask") || lower.includes("slippage")) {
      return "order_book";
    }
    if (text.includes("[DIAGRAM:option_chain]") || lower.includes("option chain") || lower.includes("call oi") || lower.includes("put oi")) {
      return "option_chain";
    }
    return null;
  };

  // Clean text by removing tag if present
  const cleanMessageText = (text: string) => {
    return text.replace(/\[DIAGRAM:[a-z_]+\]/gi, "").trim();
  };

  // If opened with initial question
  useEffect(() => {
    if (initialQuestion && isOpen) {
      setActiveDrawerTab("live");
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion, isOpen]);

  const presetQuestions = [
    "Why did this stock move today?",
    "Explain this chart",
    "Challenge my thesis",
    "Analyze this company",
    "Show Candlestick Reversal diagram",
    "Explain P/E Margin of Safety"
  ];

  // Helper to extract a category from query/answer
  const inferCategory = (text: string): SocraticJourneyItem["topicCategory"] => {
    const lower = text.toLowerCase();
    if (lower.includes("option") || lower.includes("call") || lower.includes("put") || lower.includes("greek") || lower.includes("vega") || lower.includes("gamma")) {
      return "Derivatives & Options";
    }
    if (lower.includes("p/e") || lower.includes("valuation") || lower.includes("dcf") || lower.includes("ebitda") || lower.includes("balance sheet") || lower.includes("margin of safety")) {
      return "Valuation & Fundamentals";
    }
    if (lower.includes("risk") || lower.includes("reward") || lower.includes("stop loss") || lower.includes("expectancy") || lower.includes("position size")) {
      return "Risk & Sizing";
    }
    if (lower.includes("psychology") || lower.includes("bias") || lower.includes("fear") || lower.includes("greed") || lower.includes("fomo") || lower.includes("loss aversion")) {
      return "Market Psychology";
    }
    return "Price Action & Technics";
  };

  // Helper to extract clean title
  const inferTitle = (text: string): string => {
    const cleaned = text.replace(/^[#\s\-*]+/g, "").trim();
    const firstSentence = cleaned.split(/[.?!\n]/)[0];
    if (firstSentence && firstSentence.length <= 60) {
      return firstSentence;
    }
    return cleaned.slice(0, 50) + "...";
  };

  // Helper to extract key takeaway from mentor response
  const inferKeyTakeaway = (aiResponse: string): string => {
    const lines = aiResponse.split("\n").filter(l => l.trim().length > 0);
    // Look for lines containing "remember", "key", "principle", "takeaway", "rule"
    const takeawayLine = lines.find(l => 
      /key|takeaway|principle|rule|remember|first-principles|crucial/i.test(l)
    );
    if (takeawayLine) {
      return takeawayLine.replace(/^[#\-*:\s]+/g, "").trim();
    }
    return lines[lines.length - 1]?.replace(/^[#\-*:\s]+/g, "").trim() || "Think in probabilistic distributions, not binary outcomes.";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/socratic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          mode: mode,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      if (data.provider) {
        setActiveProvider(
          data.provider.startsWith("gemini")
            ? "Gemini 3.7 Flash"
            : "Gemini AI"
        );
      }

      const aiText = data.text || "Let's inspect this from first principles. What do you observe about the relationship between price momentum and trading volume?";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);

      // Automatically log into Socratic Learning Journey
      // If previous message was from AI, it's an answer to an AI Socratic question
      const lastAiMsg = [...messages].reverse().find(m => m.sender === "ai");
      const hasPriorAiQuestion = lastAiMsg && lastAiMsg.id !== "init";

      const newJourneyEntry: SocraticJourneyItem = {
        id: `journey-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        topicTitle: inferTitle(hasPriorAiQuestion ? lastAiMsg.text : query),
        topicCategory: inferCategory(query + " " + aiText),
        mentorQuestion: hasPriorAiQuestion ? cleanMessageText(lastAiMsg.text) : "How does this market mechanic function under real-world liquidity conditions?",
        userAnswer: query,
        mentorSynthesis: cleanMessageText(aiText),
        keyTakeaway: inferKeyTakeaway(aiText),
        mode: mode,
        diagramType: detectDiagramType(aiText),
        bookmarked: false
      };

      setJourneyItems(prev => [newJourneyEntry, ...prev]);

    } catch (err) {
      const fallbackAiText = "Let's analyze this hypothesis step by step. What is your primary fundamental or technical thesis for this trade?";
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: fallbackAiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle bookmark on history item
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJourneyItems(prev =>
      prev.map(item => item.id === id ? { ...item, bookmarked: !item.bookmarked } : item)
    );
  };

  // Delete history item
  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJourneyItems(prev => prev.filter(item => item.id !== id));
  };

  // Copy transcript to clipboard
  const handleCopyTranscript = (item: SocraticJourneyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const transcript = `[STOCKMENTOR AI // SOCRATIC LEARNING JOURNEY]
Topic: ${item.topicTitle}
Category: ${item.topicCategory} | Mode: ${item.mode} | Date: ${item.date}

[AI MENTOR QUESTION]
${item.mentorQuestion}

[INVESTOR ANSWER]
${item.userAnswer}

[MENTOR SYNTHESIS & EVALUATION]
${item.mentorSynthesis}

[KEY TAKEAWAY]
${item.keyTakeaway}
`;
    navigator.clipboard.writeText(transcript);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Continue dialogue from an existing history item
  const handleContinueInLiveChat = (item: SocraticJourneyItem) => {
    setActiveDrawerTab("live");
    const resumeText = `Regarding our previous discussion on "${item.topicTitle}": can you deepen this inquiry or give me a follow-up Socratic challenge?`;
    setInputQuery(resumeText);
  };

  // Export full learning journey as Markdown
  const handleExportJourney = () => {
    const header = `# 📈 StockMentor AI — My Socratic Learning Journey\n*Generated on ${new Date().toLocaleDateString()}*\n\n---\n\n`;
    const body = journeyItems.map((item, idx) => `
### ${idx + 1}. ${item.topicTitle}
- **Category:** ${item.topicCategory}
- **Pedagogy Mode:** ${item.mode}
- **Date:** ${item.date} (${item.timestamp})

> 🧠 **AI Mentor Question:**  
> ${item.mentorQuestion}

**👤 My Deduction / Answer:**  
${item.userAnswer}

**💡 Socratic Feedback & Synthesis:**  
${item.mentorSynthesis}

⭐ **Key Takeaway:** \`${item.keyTakeaway}\`

---
`).join("\n");

    const fullDoc = header + body;
    const blob = new Blob([fullDoc], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stockmentor_learning_journey_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to default exemplar milestones
  const handleResetExemplars = () => {
    if (window.confirm("Restore default institutional learning milestones?")) {
      setJourneyItems(INITIAL_JOURNEY_MILESTONES);
    }
  };

  // Filtered journey items
  const filteredJourneyItems = journeyItems.filter(item => {
    if (bookmarkedOnly && !item.bookmarked) return false;
    if (categoryFilter !== "All" && item.topicCategory !== categoryFilter) return false;
    if (modeFilter !== "All" && item.mode !== modeFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const match = 
        item.topicTitle.toLowerCase().includes(q) ||
        item.mentorQuestion.toLowerCase().includes(q) ||
        item.userAnswer.toLowerCase().includes(q) ||
        item.keyTakeaway.toLowerCase().includes(q) ||
        item.topicCategory.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const categories = [
    "All",
    "Price Action & Technics",
    "Valuation & Fundamentals",
    "Derivatives & Options",
    "Risk & Sizing",
    "Market Psychology"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-2xl bg-[#090C10] text-[#F5F5F0] h-full shadow-[0_0_90px_rgba(0,0,0,0.9)] flex flex-col justify-between border-l border-white/[0.1] animate-in slide-in-from-right duration-250">
        
        {/* ================================================================ */}
        {/* 1. Futuristic Luxury Console Header */}
        {/* ================================================================ */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0E1218]/90 backdrop-blur-xl">
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-b from-[#181D26] to-[#0A0D12] border border-white/[0.18] flex items-center justify-center text-[#6F9BFF] shadow-[0_0_20px_rgba(111,155,255,0.25)]">
                <Brain className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-sm sm:text-base tracking-wider bg-gradient-to-r from-white via-[#F5F5F0] to-[#C8CCD4] bg-clip-text text-transparent">
                    AI MARKET MENTOR
                  </h2>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8.5px] font-mono text-[#6EE7B7] bg-[#6EE7B7]/10 border border-[#6EE7B7]/25 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-ping" />
                    SOCRATIC ENGINE
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[10.5px] font-mono text-[#727680]">
                  <span className="text-[#6F9BFF]">{activeProvider}</span>
                  <span>·</span>
                  <span>MODE: <strong className="text-white font-semibold">{mode.toUpperCase()}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mode Selector Pill in Header */}
              <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-black/60 border border-white/[0.08] text-[9.5px] font-mono">
                {(["ELI5", "Simple", "Professional"] as ExplanationMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => onSetMode(m)}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      mode === m
                        ? "bg-white text-black font-bold shadow-xs"
                        : "text-[#727680] hover:text-white"
                    }`}
                  >
                    {m === "Professional" ? "PRO" : m.toUpperCase()}
                  </button>
                ))}
              </div>

              {activeDrawerTab === "live" && (
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: `init-${Date.now()}`,
                        sender: "ai",
                        text: `AI MARKET MENTOR // CONSOLE RESET\n\nReady for new inquiry. Ask about order flows, technical setups, balance sheets, or market theories.`,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                      }
                    ]);
                  }}
                  title="Reset conversation state"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] transition-colors cursor-pointer"
                title="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================================================================ */}
          {/* Main Navigation Tabs: Live Dialogue vs Learning Journey History */}
          {/* ================================================================ */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
            <button
              onClick={() => setActiveDrawerTab("live")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer ${
                activeDrawerTab === "live"
                  ? "bg-gradient-to-r from-[#6F9BFF]/20 to-[#8B7CFF]/20 text-white border border-[#6F9BFF]/40 shadow-[0_0_20px_rgba(111,155,255,0.2)]"
                  : "bg-black/40 text-[#727680] hover:text-[#F5F5F0] hover:bg-white/[0.04] border border-white/[0.06]"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#6F9BFF]" />
              <span>LIVE MENTOR</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            </button>

            <button
              onClick={() => setActiveDrawerTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer ${
                activeDrawerTab === "history"
                  ? "bg-gradient-to-r from-[#D4AF37]/20 via-[#6EE7B7]/20 to-[#6F9BFF]/20 text-white border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  : "bg-black/40 text-[#727680] hover:text-[#F5F5F0] hover:bg-white/[0.04] border border-white/[0.06]"
              }`}
            >
              <History className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>LEARNING JOURNEY</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#D4AF37]/20 text-[#F5C76B] border border-[#D4AF37]/30">
                {journeyItems.length}
              </span>
            </button>
          </div>

        </div>

        {/* ================================================================ */}
        {/* VIEW A: LIVE MENTOR DIALOGUE */}
        {/* ================================================================ */}
        {activeDrawerTab === "live" && (
          <>
            {/* Quick Socratic Journey Notification Pill */}
            {journeyItems.length > 0 && (
              <div 
                onClick={() => setActiveDrawerTab("history")}
                className="mx-4 sm:mx-5 mt-3 px-3 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/10 via-[#6F9BFF]/10 to-transparent border border-white/[0.08] hover:border-[#D4AF37]/40 flex items-center justify-between text-xs font-mono text-slate-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    Learning Journey Active · <strong className="text-white">{journeyItems.length} Socratic Inquiries</strong> logged
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#6F9BFF] group-hover:translate-x-0.5 transition-transform font-semibold">
                  <span>Review Journey</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
              {messages.map((m) => {
                const diagramType = m.sender === "ai" ? detectDiagramType(m.text) : null;
                const cleanedText = m.sender === "ai" ? cleanMessageText(m.text) : m.text;

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"} w-full`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1 text-[10px] font-mono text-[#727680]">
                      <span className={m.sender === "user" ? "text-[#6F9BFF] font-semibold" : "text-[#6EE7B7] font-semibold"}>
                        {m.sender === "user" ? "INVESTOR DEDUCTION" : "AI SOCRATIC MENTOR"}
                      </span>
                      <span>·</span>
                      <span>{m.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[94%] p-4 text-xs sm:text-sm leading-relaxed rounded-2xl ${
                        m.sender === "user"
                          ? "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-medium shadow-[0_4px_20px_rgba(37,99,235,0.3)] border border-blue-400/30"
                          : "bg-[#0E131A] text-[#F5F5F0] border border-white/[0.1] shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-pre-line"
                      }`}
                    >
                      <p>{cleanedText}</p>

                      {diagramType && (
                        <div className="mt-4 pt-3 border-t border-white/[0.08]">
                          <AIVisualDiagram
                            type={diagramType}
                            title={`VISUAL ANALYSIS: ${diagramType.replace('_', ' ').toUpperCase()}`}
                            subtitle="Institutional diagram generated to illustrate technical and fundamental mechanics."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-3 text-xs font-mono text-[#6F9BFF] p-3.5 rounded-xl bg-[#6F9BFF]/10 border border-[#6F9BFF]/25 animate-pulse shadow-sm">
                  <Sparkles className="w-4 h-4 animate-spin text-[#6F9BFF]" />
                  <span>SYNTHESIZING SOCRATIC HYPOTHESIS WITH GEMINI 3.7 FLASH...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompts & Terminal Input */}
            <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0A0D12]/95 space-y-3">
              
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#727680] mb-1.5 flex items-center justify-between">
                  <span>FIRST-PRINCIPLES INQUIRY PROMPTS</span>
                  <span className="text-[9px] text-slate-500">ONE-CLICK PROBES</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {presetQuestions.map((pq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(pq)}
                      className="px-2.5 py-1 bg-black/60 border border-white/[0.08] hover:border-[#6F9BFF]/50 rounded-lg text-[10.5px] font-mono text-[#A5A8AE] hover:text-white whitespace-nowrap transition-colors cursor-pointer shrink-0"
                    >
                      [ {pq} ]
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={e => setInputQuery(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask mentor a market question or submit your reasoning..."
                    className="w-full pl-4 pr-10 py-3 bg-[#06080C] border border-white/[0.12] focus:border-[#6F9BFF] rounded-xl text-xs sm:text-sm text-white placeholder:text-[#686C73] focus:outline-none font-sans shadow-inner"
                  />
                </div>

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputQuery.trim() || loading}
                  className="p-3 bg-gradient-to-r from-[#6F9BFF] to-[#3B82F6] hover:from-[#5B8EFF] hover:to-[#2563EB] text-slate-950 font-black rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-[0_0_15px_rgba(111,155,255,0.3)] shrink-0"
                  title="Transmit query"
                >
                  <Send className="w-4 h-4 text-black font-bold" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* ================================================================ */}
        {/* VIEW B: SOCRATIC LEARNING JOURNEY (PREVIOUS QUESTIONS & ANSWERS) */}
        {/* ================================================================ */}
        {activeDrawerTab === "history" && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#07090D]">
            
            {/* 1. Learning Journey Analytics Summary */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0A0D12] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>SOCRATIC LEARNING JOURNEY VAULT</span>
                  </h3>
                  <p className="text-[11px] text-[#727680] mt-0.5">
                    Review your previous deductions, AI mentor questions, and first-principles breakthroughs.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJourney}
                    title="Export full learning journey to Markdown"
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] font-mono text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-[#6F9BFF]" />
                    <span className="hidden sm:inline">EXPORT MD</span>
                  </button>
                  <button
                    onClick={handleResetExemplars}
                    title="Restore curated exemplar milestones"
                    className="p-1.5 text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Four Key Performance Metrics */}
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2 rounded-xl bg-black/50 border border-white/[0.06]">
                  <div className="text-sm sm:text-base font-black text-white">{journeyItems.length}</div>
                  <div className="text-[9px] text-[#727680] uppercase tracking-wider">Inquiries</div>
                </div>
                <div className="p-2 rounded-xl bg-black/50 border border-white/[0.06]">
                  <div className="text-sm sm:text-base font-black text-[#6EE7B7]">
                    {journeyItems.filter(i => i.bookmarked).length}
                  </div>
                  <div className="text-[9px] text-[#727680] uppercase tracking-wider">Bookmarked</div>
                </div>
                <div className="p-2 rounded-xl bg-black/50 border border-white/[0.06]">
                  <div className="text-sm sm:text-base font-black text-[#F5C76B]">96%</div>
                  <div className="text-[9px] text-[#727680] uppercase tracking-wider">Logic Score</div>
                </div>
                <div className="p-2 rounded-xl bg-black/50 border border-white/[0.06]">
                  <div className="text-sm sm:text-base font-black text-[#6F9BFF]">{mode.toUpperCase()}</div>
                  <div className="text-[9px] text-[#727680] uppercase tracking-wider">Pedagogy</div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search questions, user answers, or key concepts..."
                      className="w-full pl-8 pr-3 py-1.5 bg-black/60 border border-white/[0.1] focus:border-[#6F9BFF] rounded-lg text-xs text-white placeholder:text-slate-500 font-sans focus:outline-none"
                    />
                    {searchFilter && (
                      <button 
                        onClick={() => setSearchFilter("")} 
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                      bookmarkedOnly
                        ? "bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#F5C76B]"
                        : "bg-black/60 border-white/[0.08] text-slate-400 hover:text-white"
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${bookmarkedOnly ? "fill-[#F5C76B] text-[#F5C76B]" : ""}`} />
                    <span className="hidden sm:inline">Starred</span>
                  </button>
                </div>

                {/* Category Horizontal Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                        categoryFilter === cat
                          ? "bg-white/[0.14] text-white border border-white/[0.2] font-semibold"
                          : "bg-black/40 text-slate-400 hover:text-white border border-white/[0.06]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Interactive Journey Cards Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {filteredJourneyItems.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-500">
                    <History className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-mono font-semibold text-white">No learning records found</h4>
                  <p className="text-xs text-[#727680] max-w-sm mx-auto">
                    {searchFilter || categoryFilter !== "All" || bookmarkedOnly
                      ? "No inquiries match your current filters. Try resetting the search or category."
                      : "Start a conversation in the Live Mentor tab to record your first Socratic exchange."}
                  </p>
                  {(searchFilter || categoryFilter !== "All" || bookmarkedOnly) && (
                    <button
                      onClick={() => {
                        setSearchFilter("");
                        setCategoryFilter("All");
                        setBookmarkedOnly(false);
                      }}
                      className="px-3 py-1.5 text-xs font-mono text-[#6F9BFF] bg-[#6F9BFF]/10 border border-[#6F9BFF]/30 rounded-lg hover:bg-[#6F9BFF]/20 cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                filteredJourneyItems.map((item, index) => {
                  const isExpanded = expandedJourneyId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="group rounded-2xl bg-[#0C1017] border border-white/[0.1] hover:border-white/[0.2] transition-all p-4 sm:p-5 space-y-3.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
                    >
                      {/* Card Header: Category, Title, Mode, Date, Actions */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-[#6EE7B7] border border-[#6EE7B7]/25">
                              {item.topicCategory}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {item.date} · {item.timestamp}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[8.5px] font-mono bg-[#6F9BFF]/10 text-[#6F9BFF] border border-[#6F9BFF]/20">
                              {item.mode.toUpperCase()}
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                            {item.topicTitle}
                          </h4>
                        </div>

                        {/* Top-Right Card Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => handleToggleBookmark(item.id, e)}
                            title={item.bookmarked ? "Remove Star" : "Star Milestone"}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#F5C76B] hover:bg-white/[0.06] transition-colors cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${item.bookmarked ? "fill-[#F5C76B] text-[#F5C76B]" : ""}`} />
                          </button>
                          <button
                            onClick={(e) => handleCopyTranscript(item, e)}
                            title="Copy Socratic Transcript"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-4 h-4 text-[#6EE7B7]" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={(e) => handleDeleteItem(item.id, e)}
                            title="Delete this milestone"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* SECTION 1: AI MENTOR SOCRATIC QUESTION / CHALLENGE */}
                      <div className="p-3.5 rounded-xl bg-[#121721] border border-[#6F9BFF]/20 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6F9BFF] font-semibold uppercase tracking-wider">
                          <Brain className="w-3.5 h-3.5" />
                          <span>AI Mentor Socratic Question</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-[#6F9BFF] pl-3 py-0.5">
                          "{item.mentorQuestion}"
                        </p>
                      </div>

                      {/* SECTION 2: USER'S FIRST-PRINCIPLES DEDUCTION */}
                      <div className="p-3.5 rounded-xl bg-[#0F1D1B] border border-[#10B981]/25 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6EE7B7] font-semibold uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Your Investor Deduction & Hypothesis</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#F5F5F0] leading-relaxed font-sans border-l-2 border-[#10B981] pl-3 py-0.5">
                          {item.userAnswer}
                        </p>
                      </div>

                      {/* SECTION 3: MENTOR'S SYNTHESIS & MECHANICAL BREAKDOWN */}
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#D4AF37] font-semibold uppercase tracking-wider">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Socratic Synthesis & Mechanical Evaluation</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                          {item.mentorSynthesis}
                        </p>

                        {/* Visual Technical Diagram if associated */}
                        {item.diagramType && (
                          <div className="pt-2">
                            <AIVisualDiagram
                              type={item.diagramType}
                              title={`MECHANICAL BLUEPRINT: ${item.diagramType.replace('_', ' ').toUpperCase()}`}
                              subtitle="Synthesized concept visual representation"
                            />
                          </div>
                        )}
                      </div>

                      {/* KEY TAKEAWAY PILL */}
                      <div className="flex items-start sm:items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 text-xs">
                        <Award className="w-4 h-4 text-[#F5C76B] shrink-0 mt-0.5 sm:mt-0" />
                        <div className="text-[11.5px] font-mono text-slate-200">
                          <strong className="text-[#F5C76B] font-bold">KEY TAKEAWAY: </strong>
                          {item.keyTakeaway}
                        </div>
                      </div>

                      {/* CARD FOOTER: CONTINUE DIALOGUE TRIGGER */}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">
                          ID: {item.id.slice(-8)}
                        </span>
                        <button
                          onClick={() => handleContinueInLiveChat(item)}
                          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#6F9BFF] hover:text-white hover:underline transition-colors cursor-pointer group"
                        >
                          <span>Deepen Inquiry in Live Mentor</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Socratic Journey Quick Info Bar */}
            <div className="p-3 border-t border-white/[0.08] bg-[#0A0D12] text-center text-[10.5px] font-mono text-slate-400 flex items-center justify-between px-4 sm:px-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                PERSISTENT LOCAL VAULT ACTIVE
              </span>
              <button
                onClick={() => {
                  if (window.confirm("Clear all learning journey records?")) {
                    setJourneyItems([]);
                  }
                }}
                className="text-rose-400/80 hover:text-rose-400 hover:underline cursor-pointer"
              >
                Clear History
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
