import React, { useState, useEffect } from "react";
import { ExplanationMode, PaperPosition, PaperTrade, TabType, UserProfile } from "./types";
import { loadUserProfile, saveUserProfile, loadPositions, savePositions, loadTrades, saveTrades, FRESH_START_PROFILE, resetAllStorage } from "./utils/storage";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { HomeDashboard } from "./components/HomeDashboard";
import { LearnModule } from "./components/LearnModule";
import { StockVisualStudy } from "./components/StockVisualStudy";
import { TestModule } from "./components/TestModule";
import { ResearchModule } from "./components/ResearchModule";
import { ChartsModule } from "./components/ChartsModule";
import { SimulatorModule } from "./components/SimulatorModule";
import { PortfolioModule } from "./components/PortfolioModule";
import { ProfileModule } from "./components/ProfileModule";
import { HistoricalSimulator } from "./components/HistoricalSimulator";
import { AnalyzeStockExam } from "./components/AnalyzeStockExam";
import { ThesisChallengeAdversary } from "./components/ThesisChallengeAdversary";
import { InteractiveLabSuite } from "./components/InteractiveLabSuite";
import { SkillLeaderboard } from "./components/SkillLeaderboard";
import { VirtualFundManager } from "./components/VirtualFundManager";
import { TradingJournalAndDNA } from "./components/TradingJournalAndDNA";
import { BecomeTheAnalyst } from "./components/BecomeTheAnalyst";
import { ChartReplayMode } from "./components/ChartReplayMode";
import { InvestmentCommittee } from "./components/InvestmentCommittee";
import { MarketSurvivalMode } from "./components/MarketSurvivalMode";
import { BacktestingLab } from "./components/BacktestingLab";
import { PortfolioDoctor } from "./components/PortfolioDoctor";
import { FinancialTranslator } from "./components/FinancialTranslator";
import { SocraticDrawer } from "./components/SocraticDrawer";
import { MarketTicker } from "./components/MarketTicker";
import { ThreeBackground } from "./components/ui/ThreeBackground";
import { AmbientField } from "./components/ui/AmbientField";
import { CustomCursor } from "./components/ui/CustomCursor";
import { CommandPalette } from "./components/ui/CommandPalette";
import { Brain } from "lucide-react";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [mode, setMode] = useState<ExplanationMode>("Simple");
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile);
  const [positions, setPositions] = useState<PaperPosition[]>(loadPositions);
  const [trades, setTrades] = useState<PaperTrade[]>(loadTrades);

  // Command Palette & Socratic Drawer State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSocraticOpen, setIsSocraticOpen] = useState(false);
  const [socraticQuestion, setSocraticQuestion] = useState<string | null>(null);

  // Sync theme class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Sync state to local storage
  useEffect(() => {
    saveUserProfile(profile);
  }, [profile]);

  useEffect(() => {
    savePositions(positions);
  }, [positions]);

  useEffect(() => {
    saveTrades(trades);
  }, [trades]);

  const handleResetAllData = () => {
    resetAllStorage();
    setProfile(FRESH_START_PROFILE);
    setPositions([]);
    setTrades([]);
    saveUserProfile(FRESH_START_PROFILE);
    savePositions([]);
    saveTrades([]);
  };

  const handleOpenSocraticWithQuestion = (q: string) => {
    setSocraticQuestion(q);
    setIsSocraticOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050607] text-slate-900 dark:text-[#F5F5F0] transition-colors font-sans antialiased selection:bg-blue-500 selection:text-white relative">
      
      {/* 1. Cinematic 3D Three.js Financial Market Environment */}
      <ThreeBackground activeTab={activeTab} />

      {/* 2. Global Ambient Lighting & Vignette Field */}
      <AmbientField />

      {/* 3. Custom Desktop Cursor */}
      <CustomCursor />

      {/* 3. Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onAskAI={(query) => handleOpenSocraticWithQuestion(query)}
      />

      {/* 4. Luxury Command Center Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mode={mode}
        setMode={setMode}
        isDarkMode={theme === "dark"}
        setIsDarkMode={(val) => setTheme(val ? "dark" : "light")}
        profile={profile}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenAIMentor={() => {
          setSocraticQuestion(null);
          setIsSocraticOpen(true);
        }}
      />

      {/* 5. Navigation System (Desktop Sub-dock & Mobile Bottom Dock) */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 6. Real-Time Market Ticker (Major Indices & Financial News Headlines Marquee) */}
      <MarketTicker onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion} />

      {/* 7. Main Viewport Container */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 animate-in fade-in duration-200">
        {activeTab === "home" && (
          <HomeDashboard
            profile={profile}
            mode={mode}
            setActiveTab={setActiveTab}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
            onUpdateProfile={setProfile}
          />
        )}

        {activeTab === "learn" && (
          <LearnModule
            mode={mode}
            profile={profile}
            onUpdateProfile={setProfile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "visual-study" && (
          <StockVisualStudy />
        )}

        {activeTab === "test" && (
          <TestModule
            profile={profile}
            onUpdateProfile={setProfile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "become-analyst" && (
          <BecomeTheAnalyst
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "candle-replay" && (
          <ChartReplayMode
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "committee" && (
          <InvestmentCommittee
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "survival" && (
          <MarketSurvivalMode
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "backtest" && (
          <BacktestingLab
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "portfolio-doctor" && (
          <PortfolioDoctor
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "translator" && (
          <FinancialTranslator
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "historical-sim" && (
          <HistoricalSimulator
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "exam" && (
          <AnalyzeStockExam
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "adversary" && (
          <ThesisChallengeAdversary
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "labs" && (
          <InteractiveLabSuite
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "leaderboard" && (
          <SkillLeaderboard
            profile={profile}
          />
        )}

        {activeTab === "fund-manager" && (
          <VirtualFundManager
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "journal-dna" && (
          <TradingJournalAndDNA
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "research" && (
          <ResearchModule
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "charts" && (
          <ChartsModule
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "simulator" && (
          <SimulatorModule
            profile={profile}
            positions={positions}
            trades={trades}
            onUpdatePositions={setPositions}
            onUpdateTrades={setTrades}
            onUpdateProfile={setProfile}
          />
        )}

        {activeTab === "portfolio" && (
          <PortfolioModule
            profile={profile}
            onOpenSocraticWithQuestion={handleOpenSocraticWithQuestion}
          />
        )}

        {activeTab === "profile" && (
          <ProfileModule
            profile={profile}
            mode={mode}
            onUpdateProfile={setProfile}
            onSetMode={setMode}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* 7. Floating AI Market Mentor Trigger */}
      <button
        onClick={() => {
          setSocraticQuestion(null);
          setIsSocraticOpen(true);
        }}
        className="fixed bottom-20 lg:bottom-6 right-5 z-40 px-3.5 py-2.5 bg-slate-900/90 dark:bg-[#11151A]/90 hover:bg-slate-800 dark:hover:bg-[#15191F] text-slate-100 dark:text-[#F5F5F0] border border-slate-700/60 dark:border-white/[0.12] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-200 flex items-center gap-2.5 text-xs font-mono cursor-pointer group"
        aria-label="Open AI Market Mentor Console"
      >
        <div className="relative">
          <Brain className="w-4 h-4 text-blue-500 dark:text-[#6F9BFF]" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-beacon" />
        </div>
        <span className="hidden sm:inline font-semibold tracking-wider text-[11px]">
          AI MARKET MENTOR
        </span>
      </button>

      {/* 8. Socratic AI Console Drawer */}
      <SocraticDrawer
        isOpen={isSocraticOpen}
        onClose={() => setIsSocraticOpen(false)}
        mode={mode}
        onSetMode={setMode}
        initialQuestion={socraticQuestion}
      />
    </div>
  );
}

export default App;
