import { Topic } from "../types";
import { TOPIC_TESTS } from "./topicTests";

export const CURRICULUM: Topic[] = [
  // LEVEL 1: Stock Market Basics & Mutual Funds
  {
    id: "topic-1",
    level: 1,
    levelTitle: "Level 1 — Stock Market & Equity Basics",
    title: "What is a Stock & Stock Exchange?",
    description: "Understand equity ownership, stock exchanges (NSE/BSE), and order execution matching engines.",
    estimatedTimeMinutes: 6,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-1"],
    lessons: [
      {
        id: "l1-1",
        topicId: "topic-1",
        title: "Understanding Stock Ownership",
        contentELI5: "Imagine your friend opens a lemonade stand for ₹100. You give them ₹10 to help buy lemons, so you now own 10% of the stand. If the stand makes ₹50 profit, you get ₹5! A stock is just a tiny piece of a real company like Reliance or Apple.",
        contentSimple: "A stock (or share) represents partial ownership in a corporation. When you buy a share of a company, you become a shareholder. You share in the company's profits (through price growth or dividends) and accept the risk of price drops.",
        contentProfessional: "Equity securities denote residual ownership claims on a corporation's net assets and cash flows. Share issuance enables capital formation, where common stock offers voting rights and pro-rata equity participation.",
        keyTakeaways: [
          "A stock is fractional ownership of a business.",
          "Stockholders profit through capital appreciation and dividends.",
          "Stock prices change based on market supply and demand."
        ],
        socraticQuestions: [
          {
            question: "If Company X has 1,000 shares and you buy 50 shares, what percentage of the company do you own?",
            options: ["0.5%", "5%", "50%", "500%"],
            correctIndex: 1,
            explanation: "50 shares out of 1,000 total shares equals 50 ÷ 1000 = 0.05, which is 5% ownership."
          }
        ]
      },
      {
        id: "l1-2",
        topicId: "topic-1",
        title: "Stock Exchanges (NSE & BSE) & Order Types",
        contentELI5: "A stock exchange is like a giant online supermarket, but instead of buying groceries, people buy and sell company shares! In India, the two big markets are NSE and BSE. Limit orders let you pick your own price!",
        contentSimple: "Stock exchanges facilitate secondary market trading by matching buyers and sellers. Market orders execute immediately, while Limit orders execute only at your chosen price or better.",
        contentProfessional: "Exchanges serve as centralized electronic limit order book (ELOB) trading venues, ensuring price discovery, counterparty risk mitigation, liquidity clearance, and regulatory compliance.",
        keyTakeaways: [
          "Exchanges bring buyers and sellers together efficiently.",
          "NSE (Nifty 50) and BSE (Sensex) are India's primary stock exchanges.",
          "Limit orders give price control; Market orders prioritize immediate execution speed."
        ],
        socraticQuestions: [
          {
            question: "Where do individual investors place orders to trade stock shares?",
            options: ["Directly at the exchange building", "Through registered stockbrokers / apps", "At local retail banks", "At company headquarters"],
            correctIndex: 1,
            explanation: "Retail investors connect to exchanges like NSE/BSE through certified brokerage platforms and apps."
          }
        ]
      }
    ]
  },
  {
    id: "topic-2",
    level: 1,
    levelTitle: "Level 1 — Stock Market & Equity Basics",
    title: "Market Cap & Mutual Fund Basics",
    description: "Learn how market cap determines company size, and how SIPs and Mutual Funds pool wealth.",
    estimatedTimeMinutes: 8,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-2"],
    lessons: [
      {
        id: "l2-1",
        topicId: "topic-2",
        title: "Understanding Market Capitalization",
        contentELI5: "Imagine shop A has 10 shares worth ₹100 each (Total = ₹1,000). Shop B has 100 shares worth ₹20 each (Total = ₹2,000). Even though shop A's single share costs more, shop B is worth more overall! That total worth is Market Cap.",
        contentSimple: "Market Capitalization is the total rupee value of all outstanding shares of a company. It is calculated as: Current Share Price × Total Outstanding Shares.",
        contentProfessional: "Market Cap reflects equity valuation calculated as P × N. Companies are classified into Large-Cap (stable blue-chips), Mid-Cap (growth engine), and Small-Cap (higher volatility).",
        keyTakeaways: [
          "Share price alone does not tell you how big a company is.",
          "Market Cap = Share Price × Total Shares Outstanding.",
          "Large-caps are generally more stable, while small-caps carry higher growth potential and risk."
        ],
        socraticQuestions: [
          {
            question: "Company A's stock costs ₹2,000 with 1 lakh shares. Company B's stock costs ₹100 with 100 lakh shares. Which company is bigger in total market size?",
            options: ["Company A (₹20 Cr Market Cap)", "Company B (₹100 Cr Market Cap)", "They are identical size", "Not enough info"],
            correctIndex: 1,
            explanation: "Company A's Market Cap = ₹2,000 × 1 Lakh = ₹20 Cr. Company B's Market Cap = ₹100 × 100 Lakh = ₹100 Cr. Company B is 5x larger!"
          }
        ]
      },
      {
        id: "l2-2",
        topicId: "topic-2",
        title: "Mutual Funds, NAV & SIP Investing",
        contentELI5: "A Mutual Fund pools money from thousands of people so a master fund manager can buy 50 top stocks for everyone. An SIP is putting a fixed small amount every month automatically!",
        contentSimple: "Mutual Funds pool capital from investors to build diversified portfolios. NAV (Net Asset Value) measures unit price. Systematic Investment Plans (SIP) harness Rupee Cost Averaging.",
        contentProfessional: "Mutual funds offer collective portfolio diversification managed by AMCs. Direct plans eliminate intermediary commission, reducing Expense Ratio drag on long-term compound NAV growth.",
        keyTakeaways: [
          "Mutual funds lower individual stock picking risk via diversification.",
          "SIP encourages disciplined investing regardless of short-term market ups and downs.",
          "Direct plans deliver higher net returns than Regular plans due to lower expense ratios."
        ],
        socraticQuestions: [
          {
            question: "Why does Rupee Cost Averaging via SIP benefit long-term equity investors?",
            options: ["It guarantees zero market risk", "You buy more mutual fund units when prices drop and fewer units when prices rise", "It doubles interest rates", "It eliminates tax"],
            correctIndex: 1,
            explanation: "SIP automatically buys more units during market dips, lowering average unit purchase cost over time."
          }
        ]
      }
    ]
  },

  // LEVEL 2: Fundamental Analysis & ETFs
  {
    id: "topic-3",
    level: 2,
    levelTitle: "Level 2 — Fundamental Analysis & ETFs",
    title: "Financial Statements & Valuation Metrics",
    description: "Analyze Income Statements, Balance Sheets, P/E Ratio, P/B Ratio, ROE, and Debt-to-Equity.",
    estimatedTimeMinutes: 10,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-3"],
    lessons: [
      {
        id: "l3-1",
        topicId: "topic-3",
        title: "Understanding Price-to-Earnings (P/E) Ratio",
        contentELI5: "P/E ratio asks: 'How many rupees am I paying today to get ₹1 of the company's annual profit?' If P/E is 20, you pay ₹20 for ₹1 of annual profit.",
        contentSimple: "The P/E Ratio compares a stock's current share price to its Earnings Per Share (EPS). It measures whether a stock is priced high or low relative to its profitability.",
        contentProfessional: "P/E ratio (P/EPS) reflects market consensus expectations of future earnings growth and profitability. High P/E signals growth expectations or overvaluation, while low P/E can signal value or structural distress.",
        keyTakeaways: [
          "P/E = Market Price per Share ÷ Earnings per Share (EPS).",
          "Compare P/E ratios against industry peers rather than isolated absolute numbers.",
          "High P/E stocks expect fast profit growth; low P/E stocks may be undervalued or stagnant."
        ],
        socraticQuestions: [
          {
            question: "If Company X trades at ₹200 per share with EPS of ₹10, what is its P/E ratio?",
            options: ["10x", "20x", "200x", "0.05x"],
            correctIndex: 1,
            explanation: "P/E = Share Price ÷ EPS = ₹200 ÷ ₹10 = 20x."
          }
        ]
      }
    ]
  },
  {
    id: "topic-4",
    level: 2,
    levelTitle: "Level 2 — Fundamental Analysis & ETFs",
    title: "Exchange Traded Funds (ETFs) & Index Tracking",
    description: "Learn how Index ETFs, Gold ETFs, and Sectoral ETFs combine real-time exchange liquidity with passive diversification.",
    estimatedTimeMinutes: 10,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-4"],
    lessons: [
      {
        id: "l4-1",
        topicId: "topic-4",
        title: "Exchange Traded Funds (ETFs) vs Mutual Funds",
        contentELI5: "An ETF is a basket of stocks (like Nifty 50) that you can buy and sell instantly on the stock market live during market hours just like a single share!",
        contentSimple: "ETFs track underlying indices or commodities. Unlike mutual funds which price once at end-of-day NAV, ETFs trade continuously on stock exchanges with real-time price discovery.",
        contentProfessional: "ETFs combine open-end fund diversification with continuous intraday exchange liquidity. Authorized Participants (APs) perform creation/redemption arbitrage to align market price with NAV.",
        keyTakeaways: [
          "ETFs offer real-time intraday trading liquidity.",
          "Tracking Error measures how closely an ETF matches its benchmark index.",
          "Expense ratios on passive ETFs are generally significantly lower than active mutual funds."
        ],
        socraticQuestions: [
          {
            question: "What is the key advantage of an ETF over a standard Mutual Fund for active traders?",
            options: ["ETFs can be bought and sold live during market hours", "ETFs carry zero risk", "ETFs don't require demat accounts", "ETFs pay double dividends"],
            correctIndex: 0,
            explanation: "ETFs offer continuous intraday exchange trading flexibility, unlike mutual funds priced at end-of-day NAV."
          }
        ]
      }
    ]
  },

  // LEVEL 3: Technical Analysis & FnO Derivatives
  {
    id: "topic-5",
    level: 3,
    levelTitle: "Level 3 — Technical Analysis & FnO Derivatives",
    title: "Price Action & Candlestick Patterns",
    description: "Master candlestick charts, Support & Resistance floors/ceilings, breakouts, and volume confirmation.",
    estimatedTimeMinutes: 12,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-5"],
    lessons: [
      {
        id: "l5-1",
        topicId: "topic-5",
        title: "Reading Candlesticks & Key Levels",
        contentELI5: "A candlestick shows a tug-of-war between buyers (green) and sellers (red). Support is a floor where buyers step in to stop prices from falling further. Resistance is a ceiling where sellers step in.",
        contentSimple: "Green candles mean price closed higher than it opened; red candles mean price closed lower. Support is a price level where demand historically halts declines. Resistance is a level where selling pressure halts rallies.",
        contentProfessional: "Candlestick wicks depict intraday liquidity reaction. Support and resistance represent equilibrium price zones where institutional order flow clusters.",
        keyTakeaways: [
          "Green candle = Bullish close; Red candle = Bearish close.",
          "Support act as price floors; Resistance acts as price ceilings.",
          "Breakouts through resistance with high volume indicate strong trend continuation."
        ],
        socraticQuestions: [
          {
            question: "What usually happens when a stock repeatedly bounces off ₹500 five times over 6 months?",
            options: [
              "₹500 acts as a strong support demand floor",
              "₹500 is a resistance ceiling",
              "The stock will immediately go to zero",
              "Volume drops to zero"
            ],
            correctIndex: 0,
            explanation: "Multiple price bounces off the same lower price level confirm a strong support zone where buyers step in."
          }
        ]
      }
    ]
  },
  {
    id: "topic-6",
    level: 3,
    levelTitle: "Level 3 — Technical Analysis & FnO Derivatives",
    title: "Futures & Options (FnO) Mastery",
    description: "Learn Futures contracts, Call & Put options, Strike prices, Option Chain analysis, and Option Greeks (Delta, Theta, Gamma, Vega).",
    estimatedTimeMinutes: 15,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-6"],
    lessons: [
      {
        id: "l6-1",
        topicId: "topic-6",
        title: "Introduction to Futures & Call/Put Options",
        contentELI5: "A Futures contract is locking in a deal to buy a big bundle of stock later. A Call Option (CE) gives you profit if stock goes UP; a Put Option (PE) gives profit if stock goes DOWN!",
        contentSimple: "Futures are binding derivative contracts to trade an asset at a future date. Call options (CE) grant the right to buy; Put options (PE) grant the right to sell.",
        contentProfessional: "Derivatives derive value from underlying assets. Option buyers pay a premium for asymmetric payoff profiles, while option sellers assume obligations backed by margin.",
        keyTakeaways: [
          "Call Options (CE) = Bullish bet (price rise).",
          "Put Options (PE) = Bearish bet (price fall).",
          "Option buyer risk is capped at premium paid; option seller risk is theoretically unlimited."
        ],
        socraticQuestions: [
          {
            question: "If you expect Nifty Index to rise rapidly, which option contract gives leveraged upside profit?",
            options: ["Buy Nifty Call Option (CE)", "Buy Nifty Put Option (PE)", "Sell Nifty Futures", "Buy Gold ETF"],
            correctIndex: 0,
            explanation: "Buying a Call Option (CE) gains premium value rapidly when the underlying index or stock advances."
          }
        ]
      },
      {
        id: "l6-2",
        topicId: "topic-6",
        title: "Option Greeks: Delta & Theta Time Decay",
        contentELI5: "Delta tells you how much option premium moves when stock moves ₹1. Theta is time decay — every day that passes melts away a tiny bit of option price!",
        contentSimple: "Delta measures premium price sensitivity relative to stock movements. Theta measures the daily rate of option time decay.",
        contentProfessional: "Delta represents ∂V/∂S first derivative. Theta (∂V/∂t) accelerates non-linearly near expiration, eroding extrinsic option value.",
        keyTakeaways: [
          "ATM Call Delta is ~0.50.",
          "Theta decay accelerates rapidly during the final 7 days before option expiry.",
          "Option sellers benefit from Theta decay; option buyers lose time value daily."
        ],
        socraticQuestions: [
          {
            question: "If a Call option has Delta = 0.50 and the stock moves up by ₹10, by how much does the option price rise?",
            options: ["₹2", "₹5", "₹10", "₹50"],
            correctIndex: 1,
            explanation: "Expected Option Rise = Stock Rise × Delta = ₹10 × 0.50 = ₹5."
          }
        ]
      }
    ]
  },

  // LEVEL 4: Advanced Trading, Risk & Algo Systems
  {
    id: "topic-7",
    level: 4,
    levelTitle: "Level 4 — Advanced Trading, Risk & Algo Systems",
    title: "Risk Management & Position Sizing",
    description: "Protect your capital, calculate risk/reward ratios, set stop-losses, and manage max drawdowns.",
    estimatedTimeMinutes: 12,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-7"],
    lessons: [
      {
        id: "l7-1",
        topicId: "topic-7",
        title: "The Art of Capital Preservation & 1% Risk Rule",
        contentELI5: "Never risk all your money on a single trade! If you have ₹100, risking only ₹1 per trade means even 5 bad trades leave you with ₹95 to bounce back easily.",
        contentSimple: "Risk management limits drawdown. Never risk more than 1-2% of total capital on a single trade. Aim for a Risk-to-Reward ratio of at least 1:2.",
        contentProfessional: "Position sizing relies on fixed-fractional risk allocation or Kelly Criterion. Downside control via stop-loss orders mitigates fat-tail tail risk and preserves positive expected value.",
        keyTakeaways: [
          "Capital preservation is priority #1 for long-term survival in markets.",
          "Maintain at least a 1:2 Risk-to-Reward ratio.",
          "Use stop-loss orders on every single trade to prevent catastrophic losses."
        ],
        socraticQuestions: [
          {
            question: "If you buy a stock at ₹100, set a stop-loss at ₹95 (Risk ₹5) and a target at ₹115 (Gain ₹15), what is your Risk/Reward ratio?",
            options: ["1:1", "1:2", "1:3", "1:5"],
            correctIndex: 2,
            explanation: "Risk = ₹5, Reward = ₹15. Risk/Reward ratio = 5:15 = 1:3."
          }
        ]
      }
    ]
  },
  {
    id: "topic-8",
    level: 4,
    levelTitle: "Level 4 — Advanced Trading, Risk & Algo Systems",
    title: "Algorithmic Trading & Quantitative Systems",
    description: "Master automated trading strategies, quantitative backtesting, Python strategy logic, and Sharpe ratio optimization.",
    estimatedTimeMinutes: 15,
    unlocked: true,
    completed: false,
    topicTest: TOPIC_TESTS["topic-7"],
    lessons: [
      {
        id: "l8-1",
        topicId: "topic-8",
        title: "Quantitative Backtesting & Strategy Automation",
        contentELI5: "Algo trading is writing a computer program to automatically execute your trading rules at lighting speed whenever market conditions match!",
        contentSimple: "Algorithmic trading uses mathematical models and pre-defined rules to automate trade entry, exit, and risk management. Backtesting validates performance on historical data.",
        contentProfessional: "Quantitative systems compute Sharpe ratio, Max Drawdown, and Win/Loss ratios across multi-year historical data feeds while mitigating lookahead bias and curve fitting.",
        keyTakeaways: [
          "Algorithmic execution eliminates human emotional bias.",
          "Sharpe Ratio measures excess return per unit of volatility (>1.5 is desirable).",
          "Backtesting must account for slippage, brokerage commissions, and liquidity constraints."
        ],
        socraticQuestions: [
          {
            question: "What metric measures a quantitative trading strategy's excess risk-adjusted return relative to its volatility?",
            options: ["Sharpe Ratio", "P/E Ratio", "Dividend Yield", "Beta"],
            correctIndex: 0,
            explanation: "The Sharpe Ratio evaluates risk-adjusted return by dividing excess returns over the risk-free rate by portfolio volatility."
          }
        ]
      }
    ]
  }
];
