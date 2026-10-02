import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Terminal, Sparkles } from "lucide-react";

interface HeroInitializationProps {
  onComplete: () => void;
}

export const HeroInitialization: React.FC<HeroInitializationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"darkness" | "telemetry" | "awaken" | "ready" | "exiting">("darkness");
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);

  useEffect(() => {
    // Stage 1: Darkness & initial telemetry boot (0ms - 600ms)
    const t1 = setTimeout(() => {
      setPhase("telemetry");
      setTelemetryLogs([
        "CORE :: MOUNTING PERSISTENT TRADING ENGINE v5.2",
        "TELEMETRY :: CALIBRATING REAL-TIME LIQUIDITY VECTORS",
        "AI SUBSYSTEM :: GEMINI 3.7 FLASH READY"
      ]);
    }, 300);

    // Stage 2: Awakening of visual system (1000ms)
    const t2 = setTimeout(() => {
      setPhase("awaken");
    }, 1100);

    // Stage 3: Ready for entry (2000ms)
    const t3 = setTimeout(() => {
      setPhase("ready");
    }, 2100);

    // Stage 4: Auto-advance to application after 3.8s (or immediate on click/key)
    const t4 = setTimeout(() => {
      handleEnter();
    }, 4200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleEnter = () => {
    setPhase("exiting");
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  return (
    <div
      className={`fixed inset-0 z-70 flex flex-col items-center justify-between p-6 sm:p-12 transition-all duration-500 select-none ${
        phase === "exiting" ? "opacity-0 pointer-events-none scale-102" : "opacity-100"
      } bg-[#050607]/90 backdrop-blur-md`}
    >
      {/* Top System Telemetry Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-[#686C73]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-widest uppercase">INITIALIZING INTELLIGENCE KERNEL</span>
        </div>

        <button
          onClick={handleEnter}
          className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
          title="Skip initialization"
        >
          <span>Skip</span>
          <kbd className="px-1.5 py-0.5 bg-white/[0.08] rounded text-[10px]">ESC</kbd>
        </button>
      </div>

      {/* Center Awakening Brand Typography */}
      <div className="w-full max-w-2xl text-center space-y-6 my-auto">
        {/* Monogram Terminal Beacon */}
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] shadow-[0_0_50px_rgba(111,155,255,0.15)] mb-2 animate-in zoom-in-95 duration-500">
          <span className="font-mono text-xl font-bold tracking-tighter text-white">SM</span>
        </div>

        {/* Brand Reveal */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#F5F5F0]">
            STOCKMENTOR
          </h1>
          <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-blue-400 dark:text-[#6F9BFF] font-medium">
            AI MARKET INTELLIGENCE
          </p>
        </div>

        {/* System Thesis Reveal */}
        <div className="pt-2">
          <p className="font-serif italic text-base sm:text-xl text-slate-300 dark:text-[#A5A8AE] tracking-wide">
            &ldquo;Understand the market. Think beyond the chart.&rdquo;
          </p>
        </div>

        {/* Telemetry Stream Output */}
        <div className="h-14 flex flex-col items-center justify-center font-mono text-[11px] text-slate-500 space-y-1">
          {telemetryLogs.map((log, idx) => (
            <span key={idx} className="animate-in fade-in duration-300 tracking-wider">
              {log}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col items-center gap-2">
          <button
            onClick={handleEnter}
            className="group px-6 py-3 bg-white hover:bg-slate-100 text-[#050607] font-mono text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ENTER INTELLIGENCE TERMINAL</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <span className="text-[10px] font-mono text-slate-600">
            Press [SPACE] or [ENTER] to advance
          </span>
        </div>
      </div>

      {/* Bottom Security & Protocol Tag */}
      <div className="w-full max-w-5xl flex items-center justify-between font-mono text-[10px] text-slate-600 dark:text-[#686C73]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>ZERO-MOCK DATA INTEGRITY · FIRST-PRINCIPLES PEDAGOGY</span>
        </div>
        <span>INSTITUTIONAL GRADE ENVIRONMENT</span>
      </div>
    </div>
  );
};
