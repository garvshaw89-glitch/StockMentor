export type ExplanationMode = "ELI5" | "Simple" | "Professional";

export type TabType = 
  | "home" 
  | "learn" 
  | "become-analyst"
  | "candle-replay"
  | "committee"
  | "survival"
  | "backtest"
  | "portfolio-doctor"
  | "translator"
  | "visual-study"
  | "test" 
  | "research" 
  | "charts" 
  | "simulator" 
  | "historical-sim"
  | "exam"
  | "adversary"
  | "labs"
  | "leaderboard"
  | "fund-manager"
  | "journal-dna"
  | "portfolio" 
  | "profile";

export interface UserProfile {
  name: string;
  avatar: string;
  score: number; // 0 - 100
  streak: number; // days
  level: number; // 1 - 10
  levelTitle: string;
  completedLessons: string[]; // lesson ids
  completedTests: string[]; // test ids
  testScores: Record<string, number>; // testId -> score percentage
  weakTopics: string[];
  strongTopics: string[];
  paperBalance: number; // Virtual cash balance in ₹
  savedWatchlist: string[]; // stock symbols
  recentSearchHistory: string[];
  passedSchoolIds?: number[]; // ids of passed school graduation exams
  certifications?: string[]; // earned level certifications
  stockMentorScore?: StockMentorScoreBreakdown;
  behavioralPatterns?: BehavioralPattern[];
  schoolCertifications?: SchoolCertification[];
  journalEntries?: JournalTradeEntry[];
  strategyDNA?: {
    bestStyle: string;
    bestTimeframe: string;
    strongestSkill: string;
    weakestSkill: string;
    commonMistake: string;
    avgRiskPerTrade: string;
    preferredSectors: string[];
  };
}

export interface Topic {
  id: string;
  topicNumber?: number; // 1 to 500
  level: number; // 1 to 10
  levelTitle: string;
  moduleName?: string;
  title: string;
  description: string;
  estimatedTimeMinutes: number;
  unlocked: boolean;
  completed: boolean;
  lessons: Lesson[];
  testId?: string;
  topicTest?: QuizQuestion[];
  caseStudy?: {
    companyOrChart: string;
    scenario: string;
    options: ["BUY", "HOLD", "SELL"];
    correctOption: "BUY" | "HOLD" | "SELL";
    explanation: string;
  };
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  contentELI5: string;
  contentSimple: string;
  contentProfessional: string;
  realMarketExample?: string;
  keyTakeaways: string[];
  socraticQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  topicCategory: string;
  question: string;
  type: "mcq" | "true_false" | "scenario" | "calculation" | "chart";
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  chartData?: { time: string; price: number }[];
}

export interface MasteryTest {
  id: string;
  title: string;
  level: number;
  topicCategory: string;
  questions: QuizQuestion[];
  unlocked: boolean;
}

export interface StockData {
  symbol: string;
  name: string;
  nseSymbol: string;
  bseSymbol: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  industry: string;
  marketCap: string; // e.g., "₹14.2 Lakh Cr"
  pe: number;
  eps: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  revenueGrowth: number;
  profitGrowth: number;
  dividendYield: number;
  high52: number;
  low52: number;
  volume: string;
  timestamp: string;
  chartHistory: {
    "1D": { time: string; price: number; volume: number; ma20?: number; rsi?: number }[];
    "1W": { time: string; price: number; volume: number; ma20?: number; rsi?: number }[];
    "1M": { time: string; price: number; volume: number; ma20?: number; rsi?: number }[];
    "1Y": { time: string; price: number; volume: number; ma20?: number; rsi?: number }[];
  };
  summary: string;
}

export interface PaperPosition {
  id: string;
  symbol: string;
  stockName: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
  totalCost: number;
  stopLoss?: number;
  takeProfit?: number;
  timestamp: string;
}

export interface PaperTrade {
  id: string;
  symbol: string;
  stockName: string;
  type: "BUY" | "SELL";
  shares: number;
  price: number;
  total: number;
  timestamp: string;
  pnl?: number;
}

export interface ChartChallenge {
  id: string;
  stockName: string;
  chartData: { time: string; price: number; volume: number; rsi?: number }[];
  question: string;
  options: ["Bullish Breakout", "Bearish Breakdown", "Sideways Consolidation", "Not Enough Information"];
  correctOptionIndex: number;
  historicalOutcome: string;
  signalsExplanation: string;
  usefulSignals: string[];
  misleadingSignals: string[];
}

export interface AnalystChallenge {
  id: string;
  stockName: string;
  sector: string;
  price: number;
  pe: number;
  industryPE: number;
  revenueGrowth: number;
  profitGrowth: number;
  debtToEquity: number;
  roe: number;
  chartTrend: string;
  financialSummary: string;
  suggestedAnswer?: "BUY" | "HOLD" | "SELL";
}

export interface NewsArticle {
  id: string;
  headline: string;
  source: string;
  timeAgo: string;
  content: string;
  category: "RBI & Interest Rates" | "Earnings Beat" | "Corporate Action" | "Global Markets";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface StockMentorScoreBreakdown {
  overallScore: number; // 0 - 100
  knowledgeScore: number; // 20% weight
  riskManagementScore: number; // 15% weight
  decisionQualityScore: number; // 15% weight
  researchQualityScore: number; // 15% weight
  diversificationScore: number; // 10% weight
  consistencyScore: number; // 10% weight
  disciplineScore: number; // 10% weight
  returnScore: number; // 5% weight
}

export interface BehavioralPattern {
  id: string;
  patternName: string;
  severity: "High" | "Medium" | "Low";
  description: string;
  observedFrequency: number;
  recommendedLessons: string[];
}

export interface SchoolCertification {
  id: string;
  schoolId: number;
  schoolName: string;
  earnedDate?: string;
  completedLessons: number;
  totalLessons: number;
  examScore?: number;
}

export interface HistoricalEventScenario {
  id: string;
  title: string;
  year: string;
  marketContext: string;
  initialCapital: number;
  stages: {
    stageNumber: number;
    marketDropOrGainPercent: number;
    newsHeadline: string;
    description: string;
    options: {
      action: "BUY" | "HOLD" | "SELL";
      label: string;
      allocationPercent: number;
    }[];
  }[];
  benchmarkReturnPercent: number;
}

export interface BullBearDebateItem {
  id: string;
  stockSymbol: string;
  companyName: string;
  currentPrice: number;
  bullCase: {
    title: string;
    points: string[];
    targetPrice: number;
  };
  bearCase: {
    title: string;
    points: string[];
    targetPrice: number;
  };
}

export interface JournalTradeEntry {
  id: string;
  stockSymbol: string;
  action: "BUY" | "SELL";
  entryPrice: number;
  stopLoss: number;
  targetPrice: number;
  shares: number;
  reasoning: string;
  followedStrategy: boolean;
  pnl?: number;
  pnlPercent?: number;
  aiFeedback?: string;
  timestamp: string;
}

export interface RedFlagChallengeItem {
  id: string;
  companyName: string;
  sector: string;
  revenue: string;
  netProfit: string;
  operatingCashFlow: string;
  debtToEquity: number;
  auditorNotes: string;
  hiddenRedFlag: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface DontTrustAIChallengeItem {
  id: string;
  stockName: string;
  aiGeneratedThesis: string;
  flawCategory: string;
  subtleMistake: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface ScenarioItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  historicalImpact: {
    sector: string;
    effect: "Positive" | "Negative" | "Mixed";
    explanation: string;
  }[];
}
