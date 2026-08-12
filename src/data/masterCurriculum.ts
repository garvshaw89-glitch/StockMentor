import { Topic, QuizQuestion } from "../types";

export interface MasterSegment {
  id: string;
  name: string;
  iconName: string;
  description: string;
  totalLessons: number;
  level: "Basic" | "Intermediate" | "Advanced" | "Mastery";
  topics: Topic[];
}

export const MASTER_TRADING_CURRICULUM: MasterSegment[] = [
  {
    id: "seg-equity-basics",
    name: "Equities & Market Foundations",
    iconName: "TrendingUp",
    description: "Master stock ownership, exchange order books (NSE/BSE), market cap classification, and settlement cycles.",
    totalLessons: 45,
    level: "Basic",
    topics: [
      {
        id: "topic-eb-1",
        level: 1,
        levelTitle: "Level 1 — Stock Market Basics",
        title: "Introduction to Stock Ownership & Exchanges",
        description: "Understand fractional ownership, corporate equity, and exchange order matching engines.",
        estimatedTimeMinutes: 10,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "eb-l1",
            topicId: "topic-eb-1",
            title: "What is Stock Equity & Shares Outstanding?",
            contentELI5: "When a company divides its ownership into millions of tiny pieces called shares, buying one share makes you a real co-owner of the company!",
            contentSimple: "Equity represents legal ownership in a company. Outstanding shares determine your percentage ownership and claim on net assets.",
            contentProfessional: "Common equity securities represent residual equity claims ranking behind debt and preferred equity in capital structure priority.",
            keyTakeaways: [
              "Shares represent fractional equity ownership in a business.",
              "Stockholders gain from stock price appreciation and dividend payouts.",
              "Market capitalization = Share Price × Total Outstanding Shares."
            ],
            socraticQuestions: [
              {
                question: "If a company has 10,000 shares and you buy 500 shares, what is your percentage ownership?",
                options: ["2%", "5%", "10%", "50%"],
                correctIndex: 1,
                explanation: "500 ÷ 10,000 = 0.05, which equals 5% equity ownership."
              }
            ]
          },
          {
            id: "eb-l2",
            topicId: "topic-eb-1",
            title: "Order Types: Market, Limit, Stop Loss & GTT",
            contentELI5: "A Market order buys immediately at whatever price is available. A Limit order says: 'Buy only if price drops to ₹100 or cheaper!'",
            contentSimple: "Order types control execution conditions. Market orders prioritize speed, Limit orders control execution price, and Stop Loss orders mitigate downside risk.",
            contentProfessional: "Limit orders enter the continuous order book as passive liquidity provider bids/asks, whereas Market orders act as liquidity takers executing against top-of-book depth.",
            keyTakeaways: [
              "Market orders execute instantly at current ask/bid price.",
              "Limit orders guarantee price but not execution.",
              "Stop loss orders auto-trigger when price breaches a defined threshold."
            ],
            socraticQuestions: [
              {
                question: "Which order type guarantees execution speed over exact execution price?",
                options: ["Limit Order", "Market Order", "GTT Order", "Stop-Limit Order"],
                correctIndex: 1,
                explanation: "Market orders execute immediately at best available market prices."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "seg-fno",
    name: "Futures & Options (FnO) Mastery",
    iconName: "Zap",
    description: "Complete derivatives guide: Futures contracts, Option Greeks (Delta, Theta, Gamma, Vega), Option Chains, Straddles, Spreads & Hedging.",
    totalLessons: 85,
    level: "Advanced",
    topics: [
      {
        id: "topic-fno-1",
        level: 3,
        levelTitle: "Level 3 — Derivatives & FnO",
        title: "Futures Contracts & Leverage Mechanics",
        description: "Learn how Futures work, lot sizes, mark-to-market settlement, and leverage risks.",
        estimatedTimeMinutes: 15,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "fno-l1",
            topicId: "topic-fno-1",
            title: "Understanding Futures Contracts & Lot Sizes",
            contentELI5: "A Futures contract is an agreement to buy or sell a large fixed bundle of stocks (a lot) on a future date at a price agreed today!",
            contentSimple: "Futures are standardized derivative contracts binding buyers and sellers to trade an underlying asset at a specified price on a future expiration date.",
            contentProfessional: "Futures contracts operate on standardized exchange terms with daily Mark-to-Market (MTM) margin settlement, providing linear payoff profiles.",
            keyTakeaways: [
              "Futures are traded in fixed lot sizes (e.g. Nifty lot size = 25/50).",
              "Traders pay a percentage margin (e.g., 20%) rather than full contract value.",
              "Daily MTM credits profit or debits loss directly to your margin account."
            ],
            socraticQuestions: [
              {
                question: "If Nifty Futures lot size is 50 and price rises by 40 points, what is your net profit on 1 lot?",
                options: ["₹400", "₹1,000", "₹2,000", "₹4,000"],
                correctIndex: 2,
                explanation: "Profit = 40 points × 50 lot size = ₹2,000."
              }
            ]
          },
          {
            id: "fno-l2",
            topicId: "topic-fno-1",
            title: "Call Options (CE) vs Put Options (PE)",
            contentELI5: "A Call Option gives you the right to BUY if you think price goes UP. A Put Option gives you the right to SELL if you think price goes DOWN!",
            contentSimple: "Call Options (CE) give buyers the right (not obligation) to buy an asset at strike price. Put Options (PE) give the right to sell at strike price.",
            contentProfessional: "Option buyers purchase asymmetric rights for a paid premium, capping loss to premium while option sellers take short volatility & directional exposure.",
            keyTakeaways: [
              "Call Option (CE): Profitable when underlying price rises above Strike + Premium.",
              "Put Option (PE): Profitable when underlying price falls below Strike - Premium.",
              "Option Buyer risk is limited to Premium paid; Option Seller risk is theoretically unlimited."
            ],
            socraticQuestions: [
              {
                question: "You expect Reliance stock price to drop significantly after earnings. Which option contract gives upside profit?",
                options: ["Buy Call Option (CE)", "Buy Put Option (PE)", "Sell Put Option", "Buy Futures"],
                correctIndex: 1,
                explanation: "Buying a Put Option (PE) increases in value when the underlying stock price declines."
              }
            ]
          }
        ]
      },
      {
        id: "topic-fno-2",
        level: 4,
        levelTitle: "Level 4 — Advanced Options & Greeks",
        title: "Option Greeks & Option Chain Analysis",
        description: "Master Delta, Gamma, Theta decay, Vega volatility, and reading the NSE Option Chain.",
        estimatedTimeMinutes: 20,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "fno-l3",
            topicId: "topic-fno-2",
            title: "Option Greeks: Delta & Theta Time Decay",
            contentELI5: "Delta tells you how much your option price moves when the stock moves ₹1. Theta is the daily clock melting your option's time value away!",
            contentSimple: "Delta measures price sensitivity to underlying asset movements. Theta measures the rate of option premium decay over time.",
            contentProfessional: "Delta represents ∂V/∂S first derivative sensitivity. Theta (∂V/∂t) accelerates non-linearly as expiration approaches, eroding extrinsic value.",
            keyTakeaways: [
              "ATM Call Delta is ~0.50, ITM Call Delta approaches 1.0, OTM Call Delta approaches 0.",
              "Theta decay speeds up exponentially during the final 7 days before expiry.",
              "Option sellers benefit from Theta decay; option buyers lose time value daily."
            ],
            socraticQuestions: [
              {
                question: "If a Call option has Delta = 0.60 and the underlying stock rises by ₹10, by how much does the option premium rise?",
                options: ["₹4", "₹6", "₹10", "₹60"],
                correctIndex: 1,
                explanation: "Expected Premium Change = Stock Change × Delta = ₹10 × 0.60 = ₹6."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "seg-mutual-funds",
    name: "Mutual Funds & Wealth Building",
    iconName: "PieChart",
    description: "Complete guide to SIP, NAV, Expense Ratios, Direct vs Regular plans, Equity Funds, Debt Funds, ELSS, and Asset Allocation.",
    totalLessons: 40,
    level: "Basic",
    topics: [
      {
        id: "topic-mf-1",
        level: 1,
        levelTitle: "Level 1 — Mutual Funds",
        title: "Mutual Funds, NAV & Rupee Cost Averaging",
        description: "Learn how professional fund managers pool money and build diversified portfolios.",
        estimatedTimeMinutes: 12,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "mf-l1",
            topicId: "topic-mf-1",
            title: "What is a Mutual Fund & Net Asset Value (NAV)?",
            contentELI5: "A Mutual Fund is like a group order at a restaurant where everyone pools money so a master chef can pick 50 great dishes for everyone!",
            contentSimple: "A Mutual Fund pools money from thousands of investors to invest in a diversified portfolio of stocks, bonds, or money market instruments.",
            contentProfessional: "Mutual funds are collective investment schemes issuing units representing pro-rata shares in underlying security portfolios, calculated daily as NAV.",
            keyTakeaways: [
              "NAV (Net Asset Value) = (Total Fund Assets - Liabilities) ÷ Total Fund Units.",
              "SIP (Systematic Investment Plan) enables regular, disciplined monthly investing.",
              "Direct plans have lower Expense Ratios than Regular plans because they eliminate distributor commission."
            ],
            socraticQuestions: [
              {
                question: "Why do Direct Mutual Fund plans offer higher returns over 10+ years compared to Regular plans?",
                options: ["Direct plans invest in better stocks", "Direct plans charge zero exit load", "Direct plans have lower expense ratios by skipping distributor commissions", "Direct plans receive government subsidies"],
                correctIndex: 2,
                explanation: "Lower expense ratios mean less annual fee deduction, allowing compounding returns to grow faster."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "seg-etfs",
    name: "Exchange Traded Funds (ETFs)",
    iconName: "Layers",
    description: "Index ETFs, Nifty 50 ETFs, Gold ETFs, Sectoral ETFs, Creation Baskets, Tracking Error, and Arbitrage strategies.",
    totalLessons: 35,
    level: "Intermediate",
    topics: [
      {
        id: "topic-etf-1",
        level: 2,
        levelTitle: "Level 2 — ETFs & Passive Investing",
        title: "ETFs vs Mutual Funds & Index Arbitrage",
        description: "Understand exchange liquidity, intraday trading, tracking error, and gold ETFs.",
        estimatedTimeMinutes: 10,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "etf-l1",
            topicId: "topic-etf-1",
            title: "What is an ETF & How does it trade?",
            contentELI5: "An ETF is a basket of stocks that tracks an index like Nifty 50, but you can buy and sell it on the stock exchange live like a single share!",
            contentSimple: "Exchange-Traded Funds (ETFs) track underlying benchmarks (e.g. Nifty 50, Gold, Bank Nifty) and trade continuously on exchanges throughout market hours.",
            contentProfessional: "ETFs combine open-end index fund diversification with real-time exchange liquidity, maintained via Authorized Participant (AP) arbitrage creation/redemption mechanisms.",
            keyTakeaways: [
              "ETFs trade real-time during exchange hours at market prices.",
              "Tracking Error measures how closely an ETF mirrors its benchmark index.",
              "Gold ETFs allow investing in physical gold without storage or purity worries."
            ],
            socraticQuestions: [
              {
                question: "What is the primary operational difference between buying an Index Mutual Fund vs an Index ETF?",
                options: ["ETFs trade live on the stock exchange during market hours; Mutual Fund NAV is priced once at market close", "ETFs don't invest in real stocks", "Mutual funds carry unlimited leverage", "ETFs are only available for foreign markets"],
                correctIndex: 0,
                explanation: "ETFs trade like stocks continuously on the stock exchange, whereas mutual funds process orders at the end-of-day NAV."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "seg-price-action",
    name: "Price Action & Technical Analysis",
    iconName: "BarChart",
    description: "Candlestick patterns, Head & Shoulders, Double Tops/Bottoms, Support/Resistance zones, Trendlines, and Volume Analysis.",
    totalLessons: 90,
    level: "Intermediate",
    topics: [
      {
        id: "topic-pa-1",
        level: 2,
        levelTitle: "Level 2 — Price Action Analysis",
        title: "Support, Resistance & Candlestick Anatomy",
        description: "Master buyer/seller battlegrounds, Pinbars, Engulfing patterns, and breakouts.",
        estimatedTimeMinutes: 15,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "pa-l1",
            topicId: "topic-pa-1",
            title: "Support & Resistance: The Core Floor and Ceiling",
            contentELI5: "Support is a floor where buyers step in to stop prices from falling further. Resistance is a ceiling where sellers jump in to take profit!",
            contentSimple: "Support is a price level where buying interest prevents price from dropping lower. Resistance is where selling pressure halts upward rallies.",
            contentProfessional: "Support and resistance zones represent institutional liquidity pools where supply and demand imbalances trigger order absorption and trend reversals.",
            keyTakeaways: [
              "When Resistance breaks with high volume, it often turns into new Support.",
              "The more times a level is tested, the weaker it becomes.",
              "Always wait for price confirmation before trading breakouts."
            ],
            socraticQuestions: [
              {
                question: "A stock breaks above a 6-month Resistance level of ₹500 on heavy volume. What does classical technical analysis predict?",
                options: ["₹500 will now act as new Support on pullbacks", "The stock will immediately crash to zero", "Resistance remains unbroken", "Volume is irrelevant"],
                correctIndex: 0,
                explanation: "Role reversal principle: Broken Resistance becomes new Support as old sellers convert into buyers on retests."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "seg-indicators",
    name: "Indicators & Oscillators",
    iconName: "Activity",
    description: "RSI momentum divergence, MACD crossovers, Moving Averages (EMA 20/50/200), Bollinger Bands, Supertrend, and VWAP.",
    totalLessons: 60,
    level: "Intermediate",
    topics: [
      {
        id: "topic-ind-1",
        level: 2,
        levelTitle: "Level 2 — Technical Indicators",
        title: "RSI Divergence & VWAP Intraday Trading",
        description: "Learn how institutional traders use VWAP and RSI momentum divergence.",
        estimatedTimeMinutes: 14,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "ind-l1",
            topicId: "topic-ind-1",
            title: "RSI (Relative Strength Index) & Bullish/Bearish Divergence",
            contentELI5: "RSI is a speedometer from 0 to 100. Above 70 means the car is speeding too fast (Overbought). Below 30 means it's super cheap (Oversold)!",
            contentSimple: "RSI measures the speed and magnitude of recent price changes to evaluate overbought (>70) or oversold (<30) market conditions.",
            contentProfessional: "RSI evaluates price velocity ratio. Bullish divergence occurs when price makes a lower low while RSI forms a higher low, signaling trend exhaustion.",
            keyTakeaways: [
              "RSI above 70 indicates Overbought territory; RSI below 30 indicates Oversold.",
              "RSI Divergence is one of the strongest reversal signals in technical analysis.",
              "Combine RSI signals with Support/Resistance for high probability trades."
            ],
            socraticQuestions: [
              {
                question: "Stock price makes a lower low, but the RSI indicator makes a higher low. What key trading setup is this?",
                options: ["Bullish RSI Divergence (Potential Reversal UP)", "Bearish Breakdown", "Dead Cat Bounce", "Overbought Signal"],
                correctIndex: 0,
                explanation: "Bullish divergence reveals selling momentum is fading despite lower prices, pointing to an impending bullish reversal."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "seg-algo",
    name: "Algo Trading & Quant Strategies",
    iconName: "Cpu",
    description: "Algorithmic backtesting, Python strategy code, execution APIs, Mean Reversion, Momentum models, and automated risk control.",
    totalLessons: 50,
    level: "Mastery",
    topics: [
      {
        id: "topic-algo-1",
        level: 4,
        levelTitle: "Level 4 — Quantitative & Algo Trading",
        title: "Backtesting Quantitative Trading Models",
        description: "Learn how quantitative hedge funds backtest trading algorithms before deploying live capital.",
        estimatedTimeMinutes: 20,
        unlocked: true,
        completed: false,
        lessons: [
          {
            id: "algo-l1",
            topicId: "topic-algo-1",
            title: "Backtesting Frameworks, Sharpe Ratio & Curve Fitting",
            contentELI5: "Backtesting is running a trading robot on 10 years of historical stock data to see if it would have made money before risking real cash!",
            contentSimple: "Backtesting evaluates a quantitative trading rule against historical market data to measure risk-adjusted performance, drawdown, and win rates.",
            contentProfessional: "Quantitative backtesting measures expected strategy alpha, Sharpe Ratio, Maximum Drawdown (MDD), and Profit Factor while avoiding lookahead bias.",
            keyTakeaways: [
              "Sharpe Ratio measures excess return per unit of total risk (volatility). A Sharpe > 1.5 is desirable.",
              "Overfitting / Curve fitting occurs when a strategy is overly tuned to past noise and fails in live trading.",
              "Always reserve out-of-sample data to validate algorithmic strategy robustness."
            ],
            socraticQuestions: [
              {
                question: "What is the danger of 'Overfitting' (Curve-fitting) in algorithmic strategy development?",
                options: ["The code runs too slowly", "The strategy performs amazingly on past historical data but fails disastrously in live trading", "The strategy loses internet connection", "The broker rejects algorithmic orders"],
                correctIndex: 1,
                explanation: "Overfitted strategies memorize past noise instead of capturing genuine statistical edge, leading to live trading losses."
              }
            ]
          }
        ]
      }
    ]
  }
];
