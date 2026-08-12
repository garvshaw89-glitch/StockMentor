import { UserProfile } from "../types";

export interface StepRequirement {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  isMet: boolean;
}

export interface PerformanceStep {
  stepNumber: number; // 1 to 6
  name: string;
  title: string;
  description: string;
  unlockedTools: string[];
  color: string;
}

export const PERFORMANCE_STEPS: PerformanceStep[] = [
  {
    stepNumber: 1,
    name: "Beginner",
    title: "Market Novice",
    description: "Build foundational knowledge of stock market architecture, order types, and basic equity mechanics.",
    unlockedTools: ["University Lessons", "Basic Paper Trading", "Socratic AI Tutor"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    stepNumber: 2,
    name: "Investor",
    title: "Fundamental Learner",
    description: "Analyze income statements, balance sheets, financial ratios, valuation multiples, and economic moats.",
    unlockedTools: ["Financial Translator", "DCF Valuation Builder", "Institutional Stock Screener"],
    color: "from-emerald-500 to-teal-500"
  },
  {
    stepNumber: 3,
    name: "Trader",
    title: "Technical Practitioner",
    description: "Master candlestick price action, chart patterns, VWAP strategies, order book momentum, and risk/reward execution.",
    unlockedTools: ["Candlestick Chart Replay", "Technical Pattern AI", "Strategy Backtesting Lab"],
    color: "from-indigo-500 to-purple-500"
  },
  {
    stepNumber: 4,
    name: "Analyst",
    title: "Valuation Specialist",
    description: "Write equity research notes, detect red flags in financial reports, and build bull/bear valuation models.",
    unlockedTools: ["Become the Analyst Workspace", "Bull/Bear Debate Studio", "Portfolio Doctor"],
    color: "from-amber-500 to-orange-500"
  },
  {
    stepNumber: 5,
    name: "Advanced",
    title: "Quantitative Trader",
    description: "Deploy options Greeks, statistical arbitrage, mean reversion pairs trading, and risk survival scenarios.",
    unlockedTools: ["Options Strategy Lab", "Market Survival Crash Simulator", "Thesis Adversary AI"],
    color: "from-rose-500 to-pink-500"
  },
  {
    stepNumber: 6,
    name: "Professional",
    title: "Portfolio Strategist",
    description: "Manage institutional funds, optimize Sharpe ratios, rebalance portfolios, and lead investment committee debates.",
    unlockedTools: ["Virtual Fund Manager", "Institutional Investment Committee", "Wall Street Research Suite"],
    color: "from-amber-400 to-yellow-500"
  }
];

export interface PerformanceEvaluationResult {
  currentStepNumber: number;
  currentStep: PerformanceStep;
  nextStep: PerformanceStep | null;
  qualifiedStepNumber: number;
  canUpgradeNow: boolean;
  nextStepProgressPercent: number;
  requirements: StepRequirement[];
  completedCountSummary: {
    passedExamsCount: number;
    completedTopicsCount: number;
    avgTestScore: number;
    certificationsCount: number;
    tradesCount: number;
  };
}

/**
 * Evaluates the user's real performance metrics across University, Quizzes, Portfolio, and Certifications
 * to determine their current qualified Step/Stage in the StockMentor Journey.
 */
export function evaluatePerformanceStage(
  profile: UserProfile,
  passedSchoolIdsParam?: number[]
): PerformanceEvaluationResult {
  // 1. Calculate user metrics from real profile data
  const schoolIds = profile.passedSchoolIds || passedSchoolIdsParam || [1];
  const passedExamsCount = schoolIds.length;
  const completedTopicsCount = profile.completedLessons?.length || 0;
  
  const testScoresList = Object.values(profile.testScores || {});
  const avgTestScore = testScoresList.length > 0
    ? Math.round(testScoresList.reduce((a, b) => a + b, 0) / testScoresList.length)
    : (completedTopicsCount > 0 || passedExamsCount > 0 ? 80 : 75);

  const certificationsCount = (profile.certifications?.length || 0) + (passedExamsCount);
  const tradesCount = (profile.journalEntries?.length || 0) + (profile.completedTests?.length || 0);

  // Derive active step number from user profile level (1-6 range)
  let activeStepNum = Math.min(6, Math.max(1, profile.level || 1));

  // Determine qualified step based on strict performance criteria
  let qualifiedStep = 1;

  // Qualification benchmarks:
  // Step 2: 1 Exam OR 3 Topics completed, avg score >= 60%
  if ((passedExamsCount >= 1 || completedTopicsCount >= 3) && avgTestScore >= 60) {
    qualifiedStep = 2;
  }
  // Step 3: 2 Exams OR 8 Topics completed, avg score >= 70%, 1 trade/action
  if ((passedExamsCount >= 2 || completedTopicsCount >= 8) && avgTestScore >= 70 && tradesCount >= 1) {
    qualifiedStep = 3;
  }
  // Step 4: 4 Exams OR 15 Topics completed, avg score >= 75%, 2 certs
  if ((passedExamsCount >= 4 || completedTopicsCount >= 15) && avgTestScore >= 75 && certificationsCount >= 2) {
    qualifiedStep = 4;
  }
  // Step 5: 7 Exams OR 30 Topics completed, avg score >= 80%, 4 certs
  if ((passedExamsCount >= 7 || completedTopicsCount >= 30) && avgTestScore >= 80 && certificationsCount >= 4) {
    qualifiedStep = 5;
  }
  // Step 6: 10 Exams OR 50 Topics completed, avg score >= 85%, 6 certs
  if ((passedExamsCount >= 10 || completedTopicsCount >= 50) && avgTestScore >= 85 && certificationsCount >= 6) {
    qualifiedStep = 6;
  }

  // Can upgrade if qualified step is higher than user's active profile level
  const canUpgradeNow = qualifiedStep > activeStepNum;

  // Calculate requirements for NEXT step upgrade
  const targetStepNumber = Math.min(6, activeStepNum + 1);
  const isMaxStep = activeStepNum >= 6;

  let reqSchoolExams = 1;
  let reqTopics = 3;
  let reqAvgScore = 60;
  let reqCerts = 1;

  if (targetStepNumber === 2) {
    reqSchoolExams = 1;
    reqTopics = 3;
    reqAvgScore = 60;
    reqCerts = 1;
  } else if (targetStepNumber === 3) {
    reqSchoolExams = 2;
    reqTopics = 8;
    reqAvgScore = 70;
    reqCerts = 2;
  } else if (targetStepNumber === 4) {
    reqSchoolExams = 4;
    reqTopics = 15;
    reqAvgScore = 75;
    reqCerts = 3;
  } else if (targetStepNumber === 5) {
    reqSchoolExams = 7;
    reqTopics = 30;
    reqAvgScore = 80;
    reqCerts = 5;
  } else if (targetStepNumber === 6) {
    reqSchoolExams = 10;
    reqTopics = 50;
    reqAvgScore = 85;
    reqCerts = 7;
  }

  const requirements: StepRequirement[] = [
    {
      id: "exams",
      label: "School Graduation Exams Passed",
      current: passedExamsCount,
      target: reqSchoolExams,
      unit: "Exams",
      isMet: passedExamsCount >= reqSchoolExams
    },
    {
      id: "topics",
      label: "University Lessons Completed",
      current: completedTopicsCount,
      target: reqTopics,
      unit: "Lessons",
      isMet: completedTopicsCount >= reqTopics
    },
    {
      id: "score",
      label: "Average Knowledge Score",
      current: avgTestScore,
      target: reqAvgScore,
      unit: "%",
      isMet: avgTestScore >= reqAvgScore
    },
    {
      id: "certs",
      label: "Earned Certifications",
      current: certificationsCount,
      target: reqCerts,
      unit: "Badges",
      isMet: certificationsCount >= reqCerts
    }
  ];

  // Calculate percentage of requirements met for next step
  const metCount = requirements.filter(r => r.isMet).length;
  const nextStepProgressPercent = isMaxStep ? 100 : Math.round((metCount / requirements.length) * 100);

  const currentStep = PERFORMANCE_STEPS.find(s => s.stepNumber === activeStepNum) || PERFORMANCE_STEPS[0];
  const nextStep = isMaxStep ? null : PERFORMANCE_STEPS.find(s => s.stepNumber === targetStepNumber) || PERFORMANCE_STEPS[1];

  return {
    currentStepNumber: activeStepNum,
    currentStep,
    nextStep,
    qualifiedStepNumber: qualifiedStep,
    canUpgradeNow,
    nextStepProgressPercent,
    requirements,
    completedCountSummary: {
      passedExamsCount,
      completedTopicsCount,
      avgTestScore,
      certificationsCount,
      tradesCount
    }
  };
}
