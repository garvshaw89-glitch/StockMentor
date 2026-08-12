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
import { Brain } from "lucide-react";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [mode, setMode] = useState<ExplanationMode>("Simple");
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile);
  const [positions, setPositions] = useState<PaperPosition[]>(loadPositions);
  const [trades, setTrades] = useState<PaperTrade[]>(loadTrades);

  // Socratic Drawer State
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

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

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
    <div className="min-h-screen bg-slate-100 dark:bg-[#0A0C10] text-slate-900 dark:text-slate-200 transition-colors font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mode={mode}
        setMode={setMode}
        isDarkMode={theme === "dark"}
        setIsDarkMode={(val) => setTheme(val ? "dark" : "light")}
        profile={profile}
        onOpenSearch={() => handleOpenSocraticWithQuestion("What stock or lesson should I explore today?")}
      />

      {/* Navigation Bar */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

      {/* Floating AI Tutor Button (Mobile & Desktop) */}
      <button
        onClick={() => {
          setSocraticQuestion(null);
          setIsSocraticOpen(true);
        }}
        className="fixed bottom-20 md:bottom-6 right-5 z-40 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105 flex items-center gap-2 text-xs"
        aria-label="Open AI Socratic Tutor"
      >
        <Brain className="w-5 h-5 text-black" />
        <span className="hidden sm:inline">Socratic Tutor</span>
      </button>

      {/* Interactive Socratic AI Drawer */}
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
