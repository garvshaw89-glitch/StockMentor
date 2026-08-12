import React, { useState } from "react";
import { ChatMessage, ExplanationMode } from "../types";
import { AIVisualDiagram, DiagramType } from "./AIVisualDiagram";
import { 
  X, 
  Send, 
  Brain, 
  Sparkles, 
  RotateCcw, 
  Zap, 
  HelpCircle,
  BookOpen,
  PieChart
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
      text: `Hello! I'm your StockMentor Socratic AI Tutor. I teach you how to analyze stock charts, valuation ratios, and market mechanics with visual diagrams and step-by-step guidance. What topic or stock chart would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);

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
    "Show me a Candlestick Reversal chart explanation",
    "Explain Technical Breakout & Resistance with visual chart",
    "Show P/E Valuation Scale diagram & explain Margin of Safety",
    "How do I set a 1:3 Risk-to-Reward Stop Loss?"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
          mode: mode
        })
      });

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.text || "Let's break this down together. What do you think happens when demand for a stock exceeds its available supply?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "I am ready to help you analyze that! Let's examine the fundamental cause together.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-white dark:bg-[#0D1117] h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0D1117]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">
              AI
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <span>Socratic Tutor</span>
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded-full border border-indigo-500/30 uppercase">
                  {mode} Mode
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Guiding you to analyze markets independently</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => {
            const diagramType = m.sender === "ai" ? detectDiagramType(m.text) : null;
            const cleanedText = m.sender === "ai" ? cleanMessageText(m.text) : m.text;

            return (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"} w-full`}
              >
                <div
                  className={`max-w-[92%] p-4 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-emerald-500 text-black font-semibold rounded-2xl rounded-tr-none shadow-md shadow-emerald-500/10"
                      : "bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700/60 font-medium whitespace-pre-line"
                  }`}
                >
                  <p>{cleanedText}</p>

                  {diagramType && (
                    <AIVisualDiagram
                      type={diagramType}
                      title={`Visual Chart: ${diagramType.replace('_', ' ').toUpperCase()}`}
                      subtitle="Interactive diagram generated to illustrate key technical or fundamental concepts."
                    />
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                  {m.timestamp}
                </span>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
              <span>Socratic AI is formulating a guiding prompt...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts & Input Area */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1117] space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 shrink-0">Try:</span>
            {presetQuestions.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pq)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap hover:bg-emerald-50 dark:hover:bg-slate-700 hover:border-emerald-500 transition-colors shrink-0"
              >
                {pq}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim() || loading}
              className="p-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
