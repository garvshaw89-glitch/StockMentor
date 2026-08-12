import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Newspaper, 
  Sliders, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Eye,
  RotateCcw,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

interface InteractiveLabSuiteProps {
  profile: UserProfile;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const InteractiveLabSuite: React.FC<InteractiveLabSuiteProps> = ({
  onOpenSocraticWithQuestion
}) => {
  const [activeTab, setActiveTab] = useState<"news" | "whatif" | "redflag" | "mysterystock" | "donttrustai">("news");

  // News Impact Lab State
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [newsSubmitted, setNewsSubmitted] = useState<boolean>(false);

  // What-If Valuation Sliders State
  const [revGrowth, setRevGrowth] = useState<number>(15); // %
  const [peMultiple, setPeMultiple] = useState<number>(25);
  const [debtAmount, setDebtAmount] = useState<number>(400); // Cr
  const [opm, setOpm] = useState<number>(18); // %

  // Mystery Stock Game State
  const [mysteryRevealed, setMysteryRevealed] = useState<boolean>(false);
  const [mysteryDecision, setMysteryDecision] = useState<"INVESTIGATE" | "AVOID" | null>(null);

  // Red Flag Detective State
  const [redFlagChoice, setRedFlagChoice] = useState<number | null>(null);
  const [redFlagSubmitted, setRedFlagSubmitted] = useState<boolean>(false);

  // Don't Trust AI State
  const [aiFlawChoice, setAiFlawChoice] = useState<number | null>(null);
  const [aiFlawSubmitted, setAiFlawSubmitted] = useState<boolean>(false);

  // Dynamic Valuation calculation for What-If
  const baseRevenue = 1000; // Cr
  const projectedRev = Math.round(baseRevenue * (1 + revGrowth / 100));
  const projectedEbitda = Math.round(projectedRev * (opm / 100));
  const projectedPat = Math.round(projectedEbitda * 0.7 - debtAmount * 0.08);
  const impliedMarketCap = Math.round(projectedPat * peMultiple);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Navigation Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Financial Decision Labs</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Practical Market Decision Labs & Simulators
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Test macro mechanics, valuation sensitivity, red-flag accounting detection, and AI error analysis.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
          {[
            { id: "news", label: "News Impact", icon: Newspaper },
            { id: "whatif", label: "What-If Valuation", icon: Sliders },
            { id: "redflag", label: "Red Flag Detective", icon: ShieldAlert },
            { id: "mysterystock", label: "Mystery Stock", icon: Eye },
            { id: "donttrustai", label: "Don't Trust AI", icon: AlertTriangle }
          ].map(tab => {
            const TIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20" : "text-slate-400 hover:text-white"
                }`}
              >
                <TIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. News Impact Lab */}
      {activeTab === "news" && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Newspaper className="w-4 h-4" />
              <span>Breaking Macro News Event</span>
            </div>
            <h4 className="text-lg font-extrabold text-white">"RBI Raises Repo Rate by 50 basis points to curb inflation."</h4>
            <p className="text-xs text-slate-300">
              Question: Which sector faces the most immediate negative margin pressure from higher borrowing costs?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { id: "realestate", label: "🏠 Real Estate & Housing", correct: true },
                { id: "banks", label: "🏦 Banking & NBFCs", correct: false },
                { id: "auto", label: "🚗 Automobiles", correct: false },
                { id: "it", label: "💻 IT Software Exports", correct: false }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setSelectedSector(sec.id);
                    setNewsSubmitted(true);
                  }}
                  className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedSector === sec.id
                      ? "bg-emerald-500/20 border-emerald-500 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {newsSubmitted && (
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs space-y-2 mt-3">
                <p className="font-bold text-emerald-400">✓ Transmission Mechanism Explanation:</p>
                <p className="text-slate-300 leading-relaxed">
                  Real Estate developers carry high debt leverage for land acquisition. A 50 bps rate hike increases interest expenses on project debt while simultaneously making home loans more expensive for buyers, dampening demand.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. What-If Valuation Scenario Simulator */}
      {activeTab === "whatif" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sliders Column */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Manipulate Financial Variables</h4>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Revenue Growth Rate</span>
                  <span className="text-emerald-400">{revGrowth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={revGrowth}
                  onChange={e => setRevGrowth(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Target P/E Multiple</span>
                  <span className="text-emerald-400">{peMultiple}x</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={peMultiple}
                  onChange={e => setPeMultiple(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Operating Margin (OPM %)</span>
                  <span className="text-emerald-400">{opm}%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="35"
                  value={opm}
                  onChange={e => setOpm(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Total Corporate Debt (₹ Cr)</span>
                  <span className="text-emerald-400">₹{debtAmount} Cr</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={debtAmount}
                  onChange={e => setDebtAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Simulated Outcome Display */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 flex flex-col justify-between space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Real-Time Valuation Output
                </span>
                <h4 className="text-xl font-extrabold text-white mt-2">Implied Market Cap: ₹{impliedMarketCap.toLocaleString('en-IN')} Cr</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Based on projected net profit of ₹{projectedPat.toLocaleString('en-IN')} Cr.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-400 font-medium">Projected Revenue</p>
                  <p className="text-base font-bold text-white mt-0.5">₹{projectedRev} Cr</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-400 font-medium">EBITDA</p>
                  <p className="text-base font-bold text-white mt-0.5">₹{projectedEbitda} Cr</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                💡 Lesson: Notice how reducing debt directly expands Net Profit and valuation multiples without needing additional sales!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Red Flag Detective */}
      {activeTab === "redflag" && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                Detective Challenge #104
              </span>
              <h4 className="text-base font-bold text-white mt-1">Company Beta Financial Dossier</h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <div><p className="text-slate-400">Revenue Growth</p><p className="text-emerald-400 font-bold text-sm">+28% YoY</p></div>
              <div><p className="text-slate-400">Net Profit</p><p className="text-emerald-400 font-bold text-sm">+35% YoY</p></div>
              <div><p className="text-slate-400">Operating Cash Flow</p><p className="text-rose-400 font-bold text-sm">-42% YoY</p></div>
              <div><p className="text-slate-400">Trade Receivables</p><p className="text-amber-400 font-bold text-sm">+85% YoY</p></div>
            </div>

            <p className="text-xs font-bold text-slate-300">Question: What is the primary hidden red flag in Company Beta's financial statements?</p>

            <div className="space-y-2">
              {[
                { idx: 0, text: "Channel stuffing / Aggressive revenue recognition (Profits logged on paper but cash not collected)" },
                { idx: 1, text: "High interest expense on bank loans" },
                { idx: 2, text: "Excessive dividend payout to promoters" }
              ].map(opt => (
                <button
                  key={opt.idx}
                  onClick={() => {
                    setRedFlagChoice(opt.idx);
                    setRedFlagSubmitted(true);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all ${
                    redFlagChoice === opt.idx
                      ? "bg-rose-500/20 border-rose-500 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {redFlagSubmitted && (
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-emerald-400">✓ Excellent Detective Work!</p>
                <p>When Net Profit grows +35% while Operating Cash Flow falls -42% and Receivables surge +85%, the company is recognizing uncollected sales on paper that may become bad debts.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Mystery Stock Game */}
      {activeTab === "mysterystock" && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              Anonymized Company Data
            </span>
            <h4 className="text-base font-bold text-white mt-1">Mystery Stock #88</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div><p className="text-slate-400">Market Cap</p><p className="font-bold text-white text-sm">₹42,000 Cr</p></div>
            <div><p className="text-slate-400">ROCE</p><p className="font-bold text-emerald-400 text-sm">27.4%</p></div>
            <div><p className="text-slate-400">Debt/Equity</p><p className="font-bold text-emerald-400 text-sm">0.12</p></div>
            <div><p className="text-slate-400">P/E Ratio</p><p className="font-bold text-indigo-400 text-sm">22.8</p></div>
            <div><p className="text-slate-400">Sales Growth</p><p className="font-bold text-emerald-400 text-sm">19.2%</p></div>
          </div>

          {!mysteryRevealed ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 font-bold">Based on these fundamentals, would you investigate this company further for investment?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMysteryDecision("INVESTIGATE");
                    setMysteryRevealed(true);
                  }}
                  className="px-5 py-2.5 bg-emerald-500 text-black font-extrabold rounded-xl text-xs"
                >
                  Yes, Investigate Further
                </button>
                <button
                  onClick={() => {
                    setMysteryDecision("AVOID");
                    setMysteryRevealed(true);
                  }}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
                >
                  Pass / Avoid
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs space-y-2">
              <p className="text-xs font-bold text-emerald-400 uppercase">Mystery Stock Revealed!</p>
              <h5 className="text-lg font-extrabold text-white">Titan Company Limited (TATA Group)</h5>
              <p className="text-slate-300">
                You decided to <strong>{mysteryDecision}</strong>. Titan enjoys a strong brand moat in jewelry and watches with a 27%+ ROCE and low debt burden!
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. Don't Trust the AI Mode */}
      {activeTab === "donttrustai" && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
              <AlertTriangle className="w-3 h-3" />
              <span>"Don't Trust The AI" Mode</span>
            </span>
            <h4 className="text-base font-bold text-white mt-1">Spot the Flaw in AI Stock Thesis</h4>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <p className="font-bold text-indigo-400">🤖 AI Thesis Output:</p>
            <p className="text-slate-300 leading-relaxed italic">
              "Company Gamma is a screaming BUY because its Net Profit grew 40% and its Return on Equity (ROE) is 32%. Even though its Debt-to-Equity surged from 0.2 to 4.5, high leverage never affects shareholder value when ROE is above 30%."
            </p>
          </div>

          <p className="text-xs font-bold text-slate-300">What is the critical mistake in the AI's financial logic?</p>

          <div className="space-y-2">
            {[
              { idx: 0, text: "Extreme debt (D/E 4.5) artificially inflates ROE while introducing severe bankruptcy risk during high interest cycles." },
              { idx: 1, text: "ROE cannot be calculated if net profit is positive." },
              { idx: 2, text: "Net profit growth of 40% is too low for any company." }
            ].map(opt => (
              <button
                key={opt.idx}
                onClick={() => {
                  setAiFlawChoice(opt.idx);
                  setAiFlawSubmitted(true);
                }}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all ${
                  aiFlawChoice === opt.idx
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>

          {aiFlawSubmitted && (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-emerald-400">✓ Spot On!</p>
              <p>
                Financial leverage (borrowed money) boosts ROE in good times, but extreme leverage (D/E 4.5) exposes the company to severe insolvency risks. Never blindly trust AI financial claims without verifying debt structure!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
