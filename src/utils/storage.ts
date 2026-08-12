import { PaperPosition, PaperTrade, UserProfile } from "../types";

const PROFILE_KEY = "stockmentor_user_profile";
const POSITIONS_KEY = "stockmentor_paper_positions";
const TRADES_KEY = "stockmentor_paper_trades";

export const FRESH_START_PROFILE: UserProfile = {
  name: "Investor",
  avatar: "🧑‍💼",
  score: 0,
  streak: 0,
  level: 1,
  levelTitle: "Novice Trader — Level 1",
  completedLessons: [],
  completedTests: [],
  testScores: {},
  weakTopics: ["Stock Market Basics", "Order Types", "Chart Reading"],
  strongTopics: [],
  paperBalance: 1000000, // ₹10,00,000 starting cash
  savedWatchlist: ["RELIANCE", "TCS", "TATAMOTORS", "NVDA"],
  recentSearchHistory: ["RELIANCE", "TCS"],
  stockMentorScore: {
    overallScore: 50,
    knowledgeScore: 50,
    riskManagementScore: 50,
    decisionQualityScore: 50,
    researchQualityScore: 50,
    diversificationScore: 50,
    consistencyScore: 50,
    disciplineScore: 50,
    returnScore: 50
  },
  behavioralPatterns: [],
  schoolCertifications: [],
  journalEntries: [],
  strategyDNA: {
    bestStyle: "Not Yet Determined",
    bestTimeframe: "Daily",
    strongestSkill: "Beginner Explorer",
    weakestSkill: "Position Sizing",
    commonMistake: "None Observed Yet",
    avgRiskPerTrade: "2.0% of Portfolio",
    preferredSectors: ["Technology", "Banking"]
  }
};

export const DEFAULT_PROFILE: UserProfile = FRESH_START_PROFILE;


export const resetAllStorage = () => {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(POSITIONS_KEY);
    localStorage.removeItem(TRADES_KEY);
  } catch (err) {
    console.error("Failed to reset storage:", err);
  }
};


export const loadUserProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error("Failed to load user profile:", err);
  }
  return DEFAULT_PROFILE;
};

export const saveUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error("Failed to save user profile:", err);
  }
};

export const loadPaperPositions = (): PaperPosition[] => {
  try {
    const data = localStorage.getItem(POSITIONS_KEY);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load positions:", err);
  }
  return [
    {
      id: "pos-1",
      symbol: "RELIANCE",
      stockName: "Reliance Industries Ltd",
      shares: 50,
      buyPrice: 2920.00,
      currentPrice: 2984.50,
      totalCost: 146000,
      stopLoss: 2850,
      takeProfit: 3100,
      timestamp: "2026-08-10 10:30"
    },
    {
      id: "pos-2",
      symbol: "TATAMOTORS",
      stockName: "Tata Motors Limited",
      shares: 100,
      buyPrice: 995.00,
      currentPrice: 1045.00,
      totalCost: 99500,
      stopLoss: 960,
      takeProfit: 1120,
      timestamp: "2026-08-11 11:15"
    }
  ];
};

export const savePaperPositions = (positions: PaperPosition[]): void => {
  try {
    localStorage.setItem(POSITIONS_KEY, JSON.stringify(positions));
  } catch (err) {
    console.error("Failed to save positions:", err);
  }
};

export const loadPaperTrades = (): PaperTrade[] => {
  try {
    const data = localStorage.getItem(TRADES_KEY);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load paper trades:", err);
  }
  return [
    {
      id: "tr-1",
      symbol: "RELIANCE",
      stockName: "Reliance Industries Ltd",
      type: "BUY",
      shares: 50,
      price: 2920.00,
      total: 146000,
      timestamp: "2026-08-10 10:30"
    },
    {
      id: "tr-2",
      symbol: "TATAMOTORS",
      stockName: "Tata Motors Limited",
      type: "BUY",
      shares: 100,
      price: 995.00,
      total: 99500,
      timestamp: "2026-08-11 11:15"
    }
  ];
};

export const savePaperTrades = (trades: PaperTrade[]): void => {
  try {
    localStorage.setItem(TRADES_KEY, JSON.stringify(trades));
  } catch (err) {
    console.error("Failed to save paper trades:", err);
  }
};

export const loadPositions = loadPaperPositions;
export const savePositions = savePaperPositions;
export const loadTrades = loadPaperTrades;
export const saveTrades = savePaperTrades;

