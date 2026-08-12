import { MasteryTest, QuizQuestion } from "../types";

export const SAMPLE_QUIZZES: MasteryTest[] = [
  {
    id: "test-level-1",
    title: "Level 1 — Stock Market Basics Mastery Test",
    level: 1,
    topicCategory: "Basics",
    unlocked: true,
    questions: [
      {
        id: "q1-1",
        topicCategory: "Basics",
        question: "A company reports record quarterly net profits, but its stock price drops by 8% the next morning. Why could this happen?",
        type: "scenario",
        options: [
          "Market expectations were even higher than the reported profits",
          "It is mathematically impossible for stock price to drop after record profits",
          "The stock exchange automatically caps profit growth",
          "Because dividends were canceled by SEBI"
        ],
        correctIndex: 0,
        explanation: "Stock prices reflect future market expectations! If analysts expected a 20% profit jump and the company reported 10%, the result disappointed the market despite being 'record' profits.",
        difficulty: "Intermediate"
      },
      {
        id: "q1-2",
        topicCategory: "Basics",
        question: "Company X has 100 shares worth ₹500 each. Company Y has 1,000 shares worth ₹100 each. Which statement is true?",
        type: "calculation",
        options: [
          "Company X is twice as large as Company Y",
          "Company Y is twice as large as Company X (Market Cap ₹100,000 vs ₹50,000)",
          "Both companies are worth exactly ₹500,000",
          "Company X is bigger because its single share price is higher"
        ],
        correctIndex: 1,
        explanation: "Market Cap = Share Price × Shares. Company X = 100 × 500 = ₹50,000. Company Y = 1,000 × 100 = ₹100,000. Company Y is 2x larger!",
        difficulty: "Beginner"
      },
      {
        id: "q1-3",
        topicCategory: "Basics",
        question: "When a company announces a 1:2 Stock Split (1 share becomes 2 shares), what happens to your investment value immediately?",
        type: "mcq",
        options: [
          "Your total investment value doubles immediately",
          "Your total investment value stays the same, but you own 2x as many shares at 1/2 the price",
          "Your total investment drops by half",
          "You must pay cash tax immediately"
        ],
        correctIndex: 1,
        explanation: "A stock split is like cutting a pizza into 8 slices instead of 4 — the size of the whole pizza (your total holding value) remains unchanged!",
        difficulty: "Beginner"
      },
      {
        id: "q1-4",
        topicCategory: "Basics",
        question: "True or False: Buying a stock on NSE/BSE guarantees that you will receive a fixed interest payout every month.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Stocks do not guarantee fixed interest payouts. Returns come from price movement and discretionary dividends voted by company directors.",
        difficulty: "Beginner"
      }
    ]
  },
  {
    id: "test-level-2",
    title: "Level 2 — Fundamental Analysis Mastery Test",
    level: 2,
    topicCategory: "Fundamentals",
    unlocked: true,
    questions: [
      {
        id: "q2-1",
        topicCategory: "Fundamentals",
        question: "Company A has a P/E ratio of 12x and Company B has a P/E ratio of 40x. Can we automatically conclude Company A is a better buy?",
        type: "scenario",
        options: [
          "Yes, a lower P/E always means superior stock return",
          "No, valuation must be considered alongside revenue growth, ROE, debt, and industry prospects",
          "Yes, because 40x P/E is illegal",
          "No, because P/E is only used for real estate"
        ],
        correctIndex: 1,
        explanation: "A low P/E could indicate a value trap (struggling business), while a high P/E might reflect massive expected revenue growth!",
        difficulty: "Intermediate"
      },
      {
        id: "q2-2",
        topicCategory: "Fundamentals",
        question: "A company earns ₹50 Cr profit with 1 Cr shares outstanding. Stock trades at ₹1,000. Calculate EPS and P/E.",
        type: "calculation",
        options: [
          "EPS = ₹50, P/E = 20x",
          "EPS = ₹100, P/E = 10x",
          "EPS = ₹25, P/E = 40x",
          "EPS = ₹500, P/E = 2x"
        ],
        correctIndex: 0,
        explanation: "EPS = Profit ÷ Shares = 50 Cr ÷ 1 Cr = ₹50. P/E = Price ÷ EPS = 1000 ÷ 50 = 20x.",
        difficulty: "Intermediate"
      },
      {
        id: "q2-3",
        topicCategory: "Fundamentals",
        question: "Why do investors look closely at Debt-to-Equity ratio before buying during high interest rate cycles?",
        type: "scenario",
        options: [
          "High debt companies face soaring interest costs that squeeze net profit margins",
          "Debt-to-equity measures daily trading volume",
          "High debt forces stock exchanges to delist shares",
          "Debt reduces taxes to zero"
        ],
        correctIndex: 0,
        explanation: "When interest rates rise, borrowing expenses increase, significantly reducing profits for highly leveraged businesses.",
        difficulty: "Advanced"
      }
    ]
  },
  {
    id: "test-certification",
    title: "StockMentor Market Certification Exam",
    level: 4,
    topicCategory: "Risk Management",
    unlocked: true,
    questions: [
      {
        id: "cert-1",
        topicCategory: "Risk Management",
        question: "You have ₹1,00,000 capital. You set a strict rule never to risk more than 2% (₹2,000) per trade. You buy a stock at ₹200 with a stop-loss at ₹180 (Risk = ₹20 per share). How many shares should you buy?",
        type: "calculation",
        options: ["100 shares", "500 shares", "50 shares", "1,000 shares"],
        correctIndex: 0,
        explanation: "Max allowed total risk = ₹2,000. Risk per share = ₹200 - ₹180 = ₹20. Shares = ₹2,000 ÷ ₹20 = 100 shares! This is disciplined position sizing.",
        difficulty: "Advanced"
      },
      {
        id: "cert-2",
        topicCategory: "Technical",
        question: "A stock breaks above its 6-month resistance line at ₹500 with 4x its normal daily trading volume. What does this technical signal suggest?",
        type: "chart",
        options: [
          "Strong institutional buying demand driving a bullish breakout",
          "An immediate short-selling signal",
          "A guaranteed market crash",
          "Volume has no relationship with price breakouts"
        ],
        correctIndex: 0,
        explanation: "High volume during a resistance breakout confirms strong buyer conviction and reduces the probability of a false breakout.",
        difficulty: "Intermediate"
      },
      {
        id: "cert-3",
        topicCategory: "Market Psychology",
        question: "After losing ₹10,000 on a trade, an investor immediately doubles their position size on a risky stock to 'get even'. What psychological trap is this?",
        type: "scenario",
        options: [
          "Revenge trading / Gambler's Fallacy",
          "Disciplined risk management",
          "Dollar-cost averaging",
          "Value investing"
        ],
        correctIndex: 0,
        explanation: "Revenge trading stems from emotional loss aversion, replacing rational analysis with reckless gambling behavior.",
        difficulty: "Intermediate"
      }
    ]
  }
];
