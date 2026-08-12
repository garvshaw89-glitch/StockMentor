import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  FileText, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb,
  Building
} from "lucide-react";

interface FinancialTranslatorProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion?: (q: string) => void;
}

export const FinancialTranslator: React.FC<FinancialTranslatorProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [sourceText, setSourceText] = useState<string>(
    "The Company experienced margin compression of 180 bps YoY primarily driven by headwinds in raw material procurement prices, alongside an expansion in trade receivables to 110 days due to delayed milestone sign-offs by key defense public sector undertakings."
  );

  const [mode, setMode] = useState<"Simple" | "Intermediate" | "Professional">("Simple");
  const [translatedOutput, setTranslatedOutput] = useState<string>(
    "In simple terms: The company made slightly less profit on every sale because metal and raw materials got more expensive. Also, government defense clients are taking longer (110 days) to pay their bills, so money is stuck waiting."
  );

  const [activeWhy, setActiveWhy] = useState<string | null>(null);

  const handleTranslate = () => {
    if (mode === "Simple") {
      setTranslatedOutput(
        "In simple terms: The company made slightly less profit on every sale because metal and raw materials got more expensive. Also, government defense clients are taking longer (110 days) to pay their bills, so money is stuck waiting."
      );
    } else if (mode === "Intermediate") {
      setTranslatedOutput(
        "Investor Breakdown: Operating profit margins dropped 1.8% year-over-year. Rising titanium/alloy input costs squeezed gross margins. Furthermore, cash conversion slowed down because government contracts require milestone approvals before funds are released."
      );
    } else {
      setTranslatedOutput(
        "Institutional Analysis: Gross margin compression of 180 bps highlights limited immediate cost pass-through capability in fixed-price defense contracts. Days Sales Outstanding (DSO) increased to 110 days, degrading operating cash flow conversion efficiency."
      );
    }
  };

  const whyMetrics = [
    {
      metric: "ROE = 24%",
      q1: "Why does ROE matter?",
      a1: "ROE measures how efficiently a company turns ₹1 of shareholder equity into profit.",
      q2: "Can high ROE ever be misleading?",
      a2: "Yes! A company can artificially inflate ROE by taking on massive debt (leverage), which reduces equity."
    },
    {
      metric: "Days Sales Outstanding (DSO) = 110 Days",
      q1: "Why does DSO matter?",
      a1: "DSO shows how many days it takes for a company to collect cash after making a sale.",
      q2: "What happens if DSO increases too much?",
      a2: "Cash gets trapped in working capital, forcing the company to borrow money to pay daily expenses."
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>AI Financial Translator & Socratic "Ask WHY?" Hub</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Jargon-to-Clarity Financial Translator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Paste complex annual reports, earnings calls, or SEBI filings to convert jargon into crystal-clear insights across 3 difficulty levels.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Paste Complex Report / Filing / Transcript Snippet:</label>
          <textarea
            value={sourceText}
            onChange={e => setSourceText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-24 resize-none"
          />
        </div>

        {/* Level Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
            {(["Simple", "Intermediate", "Professional"] as const).map(m => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  handleTranslate();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === m ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20" : "text-slate-400 hover:text-white"
                }`}
              >
                {m} Level
              </button>
            ))}
          </div>

          <button
            onClick={handleTranslate}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Translate Financial Text</span>
          </button>
        </div>

        {/* Translated Output Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
          <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">AI Translation Output ({mode} Mode)</p>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {translatedOutput}
          </p>
        </div>
      </div>

      {/* Interactive "Ask WHY?" Section */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Interactive Socratic "Ask WHY?" Metric Explorer</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whyMetrics.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  {item.metric}
                </span>
                <button
                  onClick={() => setActiveWhy(activeWhy === item.metric ? null : item.metric)}
                  className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ask WHY?</span>
                </button>
              </div>

              {activeWhy === item.metric && (
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <p className="font-bold text-amber-400">❓ {item.q1}</p>
                    <p className="text-slate-300 mt-0.5">{item.a1}</p>
                  </div>
                  <div>
                    <p className="font-bold text-rose-400">⚠️ {item.q2}</p>
                    <p className="text-slate-300 mt-0.5">{item.a2}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
