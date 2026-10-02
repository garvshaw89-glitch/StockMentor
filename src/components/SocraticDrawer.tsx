import React, { useState } from "react";
import { ChatMessage, ExplanationMode } from "../types";
import { AIVisualDiagram, DiagramType } from "./AIVisualDiagram";
import { 
  X, 
  Send, 
  Brain, 
  RotateCcw, 
  Sparkles,
  Terminal,
  Activity
} from "lucide-react";

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
  React.useEffect(() => {
    if (initialQuestion && isOpen) {
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

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.text || "Let's inspect this from first principles. What do you observe about the relationship between price momentum and trading volume?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "Let's analyze this hypothesis step by step. What is your primary fundamental or technical thesis for this trade?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-xl bg-white dark:bg-[#0C0F13] h-full shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col justify-between border-l border-slate-200 dark:border-white/[0.08] animate-in slide-in-from-right duration-250">
        
        {/* ================================================================ */}
        {/* Console Header */}
        {/* ================================================================ */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-[#11151A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-[#6F9BFF]/15 border border-blue-500/20 dark:border-[#6F9BFF]/30 flex items-center justify-center text-blue-600 dark:text-[#6F9BFF]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-[#F5F5F0]">
                  AI MARKET MENTOR
                </h2>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono text-emerald-600 dark:text-[#6EE7B7] bg-emerald-500/10 border border-emerald-500/20 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEM ONLINE
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-slate-500 dark:text-[#A5A8AE]">
                <span>{activeProvider}</span>
                <span>·</span>
                <span>Mode: <strong className="text-slate-800 dark:text-slate-300 font-semibold">{mode}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Pedagogical Selector in Drawer */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-200/80 dark:bg-white/[0.05] text-[10px] font-mono">
              {(["ELI5", "Simple", "Professional"] as ExplanationMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => onSetMode(m)}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    mode === m
                      ? "bg-slate-900 dark:bg-white text-white dark:text-black font-bold"
                      : "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {m === "Professional" ? "Pro" : m}
                </button>
              ))}
            </div>

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
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* Chat Messages Log */}
        {/* ================================================================ */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
          {messages.map((m) => {
            const diagramType = m.sender === "ai" ? detectDiagramType(m.text) : null;
            const cleanedText = m.sender === "ai" ? cleanMessageText(m.text) : m.text;

            return (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"} w-full`}
              >
                <div className="flex items-center gap-2 mb-1 px-1 text-[10px] font-mono text-slate-400 dark:text-[#686C73]">
                  <span>{m.sender === "user" ? "INVESTOR" : "MENTOR"}</span>
                  <span>·</span>
                  <span>{m.timestamp}</span>
                </div>

                <div
                  className={`max-w-[94%] p-4 text-xs sm:text-sm leading-relaxed rounded-xl ${
                    m.sender === "user"
                      ? "bg-blue-600 dark:bg-[#6F9BFF] text-white dark:text-slate-950 font-medium shadow-sm"
                      : "bg-slate-100/90 dark:bg-[#11151A] text-slate-800 dark:text-[#F5F5F0] border border-slate-200/80 dark:border-white/[0.06] shadow-sm whitespace-pre-line"
                  }`}
                >
                  <p>{cleanedText}</p>

                  {diagramType && (
                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/[0.08]">
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
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-[#6F9BFF] p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <Sparkles className="w-4 h-4 animate-spin text-blue-500 dark:text-[#6F9BFF]" />
              <span>SYNTHESIZING SOCRATIC HYPOTHESIS WITH GEMINI 3.7 FLASH...</span>
            </div>
          )}
        </div>

        {/* ================================================================ */}
        {/* Suggested Prompts & Terminal Input */}
        {/* ================================================================ */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-[#11151A]/80 space-y-3">
          
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-[#686C73] mb-1.5">
              WHAT WOULD YOU LIKE TO UNDERSTAND?
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(pq)}
                  className="px-2.5 py-1 bg-white dark:bg-[#15191F] border border-slate-200 dark:border-white/[0.08] hover:border-blue-400 dark:hover:border-[#6F9BFF]/40 rounded-md text-[11px] font-mono text-slate-700 dark:text-[#A5A8AE] hover:text-blue-600 dark:hover:text-[#F5F5F0] whitespace-nowrap transition-colors cursor-pointer shrink-0"
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
                placeholder="Ask about a pattern, valuation, or thesis..."
                className="w-full pl-4 pr-10 py-3 bg-white dark:bg-[#0C0F13] border border-slate-200 dark:border-white/[0.1] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#686C73] focus:outline-none focus:border-blue-500 dark:focus:border-[#6F9BFF] font-sans shadow-inner"
              />
            </div>

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim() || loading}
              className="p-3 bg-blue-600 hover:bg-blue-500 dark:bg-[#6F9BFF] dark:hover:bg-blue-400 text-white dark:text-slate-950 font-bold rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-sm shrink-0"
              title="Transmit query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
