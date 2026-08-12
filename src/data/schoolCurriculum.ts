export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: {
    overview: string;
    keyPoints: string[];
    formulaOrConcept?: string;
    realWorldExample: string;
  };
  quiz: QuizQuestion[];
}

export interface SchoolCurriculum {
  id: number;
  name: string;
  category: string;
  description: string;
  certTitle: string;
  lessons: Lesson[];
  schoolExam: QuizQuestion[];
}

export const SCHOOL_CURRICULUM_DATA: SchoolCurriculum[] = [
  {
    id: 1,
    name: "School 1 — Market Basics",
    category: "Basics",
    description: "Master financial exchanges, market participants, order types, and basic equity mechanics.",
    certTitle: "Certified Market Associate",
    lessons: [
      {
        id: "s1-l1",
        title: "Stock Market Architecture & Primary vs Secondary Markets",
        duration: "10 min",
        summary: "Understand how equity markets function, how companies raise capital via IPOs, and how shares trade on secondary exchanges like NSE and BSE.",
        content: {
          overview: "The stock market is a regulated marketplace where buyers and sellers trade equity shares of publicly listed corporations. The primary market is where a company issues new shares to the public for the first time via an Initial Public Offering (IPO) to raise capital. The secondary market (e.g. NSE, BSE, NYSE) is where existing investors buy and sell shares among themselves without company involvement.",
          keyPoints: [
            "Primary Market: Capital goes directly to the issuing company to fund growth or pay off debt.",
            "Secondary Market: Shares are traded between investors; the company receives no proceeds from secondary trades.",
            "Market Regulators: Authorities like SEBI or SEC enforce transparency, insider trading rules, and financial disclosures."
          ],
          formulaOrConcept: "Market Capitalization = Total Outstanding Shares × Current Market Price",
          realWorldExample: "When Zomato launched its IPO in 2021, it raised ₹9,375 Crore in the primary market. Once listed, retail and institutional traders buy and sell Zomato shares daily on the NSE secondary market."
        },
        quiz: [
          {
            id: "s1-l1-q1",
            question: "Where does the capital go when an investor buys shares during an Initial Public Offering (IPO)?",
            options: [
              "To other stock traders in the market",
              "Directly to the issuing company to fund capital expenditure or debt reduction",
              "To the stock exchange regulatory body",
              "To commercial bank savings accounts"
            ],
            correctAnswer: 1,
            explanation: "In the primary market IPO, funds raised go directly to the company issuing the shares."
          },
          {
            id: "s1-l1-q2",
            question: "If Company A has 10 Crore outstanding shares and trades at ₹500 per share, what is its Market Capitalization?",
            options: ["₹50 Crore", "₹500 Crore", "₹5,000 Crore", "₹50,000 Crore"],
            correctAnswer: 2,
            explanation: "Market Cap = 10 Crore shares × ₹500 = ₹5,000 Crore."
          }
        ]
      },
      {
        id: "s1-l2",
        title: "Order Types: Market, Limit, Stop-Loss & Bracket Orders",
        duration: "12 min",
        summary: "Master order execution mechanics to control your entry prices, slippage, and downside risk.",
        content: {
          overview: "Order types dictate how your trade is routed to the exchange order book. A Market Order executes immediately at the best available current price but exposes you to price slippage. A Limit Order executes only at your specified price or better, ensuring price protection but risking non-execution.",
          keyPoints: [
            "Market Order: Guaranteed immediate execution, non-guaranteed price.",
            "Limit Order: Guaranteed price or better, non-guaranteed execution.",
            "Stop-Loss Order (SL-M / SL-L): Triggers an order only after price crosses a trigger threshold to limit downside losses."
          ],
          formulaOrConcept: "Slippage = Executed Fill Price - Expected Order Price",
          realWorldExample: "In a fast-moving market, placing a Market Buy for a volatile stock trading at ₹100 might execute at ₹103 due to slippage. Placing a Limit Buy at ₹100 guarantees you pay no more than ₹100."
        },
        quiz: [
          {
            id: "s1-l2-q1",
            question: "Which order type guarantees price cap protection but does not guarantee execution?",
            options: ["Market Order", "Limit Order", "Stop-Loss Market Order", "Immediate-or-Cancel Order"],
            correctAnswer: 1,
            explanation: "A Limit Order guarantees you will pay your target price or better, but if the market never reaches that price, the order remains unexecuted."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s1-ex-1",
        question: "What is the primary difference between the Primary Market and the Secondary Market?",
        options: [
          "Primary market is for bonds; secondary market is for stocks",
          "Primary market involves issuing new shares directly from the company; secondary market involves investors trading existing shares",
          "Primary market operates 24/7; secondary market operates only during banking hours",
          "There is no difference"
        ],
        correctAnswer: 1,
        explanation: "Primary markets create new securities via IPOs; secondary markets facilitate trading among investors."
      },
      {
        id: "s1-ex-2",
        question: "What risk do you take when using a Market Order during market open or high volatility?",
        options: ["Non-execution", "High slippage", "Regulatory fines", "Immediate order cancellation"],
        correctAnswer: 1,
        explanation: "Market orders fill at available ask prices, which can jump significantly during volatile openings, causing slippage."
      },
      {
        id: "s1-ex-3",
        question: "A company has 20 Crore shares and trades at ₹250. It announces a 1:1 Stock Split. What will the share price and share count become post-split?",
        options: [
          "40 Crore shares at ₹125 per share",
          "10 Crore shares at ₹500 per share",
          "20 Crore shares at ₹125 per share",
          "40 Crore shares at ₹250 per share"
        ],
        correctAnswer: 0,
        explanation: "A 1:1 split doubles the share count (40 Cr) and halves the share price (₹125), keeping market cap unchanged."
      }
    ]
  },

  {
    id: 2,
    name: "School 2 — Fundamental Analysis",
    category: "Fundamentals",
    description: "Read income statements, balance sheets, cash flows, valuation ratios, and financial moats.",
    certTitle: "Certified Fundamental Analyst",
    lessons: [
      {
        id: "s2-l1",
        title: "Reading Income Statements: Revenue, EBITDA & PAT Margin",
        duration: "15 min",
        summary: "Learn how top-line growth filters down through operating expenses to net bottom-line profit.",
        content: {
          overview: "The Income Statement (Profit & Loss Account) reports a company's financial performance over a specific period. Revenue (Top Line) represents total sales. Operating Profit (EBITDA) measures core operational profitability before interest, tax, depreciation, and amortization. Profit After Tax (PAT) represents the final bottom line belonging to equity shareholders.",
          keyPoints: [
            "Top-Line Growth: Revenue expansion indicates market demand for the company's products/services.",
            "EBITDA Margin = (EBITDA / Revenue) × 100: Reflects operational cost discipline.",
            "PAT Margin = (PAT / Revenue) × 100: Shows total net margin efficiency after all obligations."
          ],
          formulaOrConcept: "EBITDA = Revenue - Cost of Goods Sold (COGS) - Operating Expenses",
          realWorldExample: "Tata Motors increased revenue from ₹2.7 Lakh Cr to ₹4.3 Lakh Cr while expanding EBITDA margins from 8% to 14%, driving a multi-bagger turn in net profits."
        },
        quiz: [
          {
            id: "s2-l1-q1",
            question: "If a company reports Revenue of ₹1,000 Cr and Operating Expenses of ₹800 Cr, what is its EBITDA Margin?",
            options: ["10%", "20%", "30%", "80%"],
            correctAnswer: 1,
            explanation: "EBITDA = ₹1,000 Cr - ₹800 Cr = ₹200 Cr. EBITDA Margin = (200 / 1000) × 100 = 20%."
          }
        ]
      },
      {
        id: "s2-l2",
        title: "Valuation Multiples: P/E, P/B, EV/EBITDA & PEG Ratio",
        duration: "18 min",
        summary: "Evaluate whether a stock is overvalued, undervalued, or fairly priced relative to earnings and book value.",
        content: {
          overview: "Valuation metrics allow investors to compare companies of different sizes. Price-to-Earnings (P/E) shows how much investors pay per ₹1 of current earnings. Price-to-Book (P/B) compares market value to accounting net worth. The PEG Ratio adjusts P/E for earnings growth rate (P/E ÷ Annual EPS Growth %).",
          keyPoints: [
            "P/E Ratio: Best for stable, profitable consumer and IT businesses.",
            "P/B Ratio: Essential for capital-heavy banks, financial institutions, and real estate.",
            "PEG Ratio < 1.0: Indicates potential undervaluation relative to growth rate."
          ],
          formulaOrConcept: "PEG Ratio = Trailing P/E Ratio / Annual Earnings Growth Rate (%)",
          realWorldExample: "A stock with a P/E of 30x might seem expensive, but if its earnings are growing at 35% per year, its PEG ratio is 30/35 = 0.85, signaling value relative to growth."
        },
        quiz: [
          {
            id: "s2-l2-q1",
            question: "What does a PEG ratio below 1.0 generally suggest to value-growth investors?",
            options: [
              "The company is severely overleveraged",
              "The stock may be undervalued relative to its earnings growth rate",
              "The company pays too high a dividend",
              "The stock price will drop next week"
            ],
            correctAnswer: 1,
            explanation: "PEG < 1.0 implies the company's growth rate exceeds its P/E multiple, suggesting attractive relative valuation."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s2-ex-1",
        question: "Why do institutional investors prefer Free Cash Flow (FCF) over Net Profit (PAT)?",
        options: [
          "Net Profit can be influenced by non-cash accounting items and working capital delays, whereas FCF represents actual cash generated",
          "FCF is always double Net Profit",
          "Tax authorities do not inspect FCF",
          "Net profit does not include revenue"
        ],
        correctAnswer: 0,
        explanation: "FCF accounts for working capital changes and capital expenditures, proving true cash generation."
      },
      {
        id: "s2-ex-2",
        question: "A company has Debt of ₹500 Cr and Shareholders' Equity of ₹1,000 Cr. What is its Debt-to-Equity Ratio?",
        options: ["0.25", "0.50", "1.50", "2.00"],
        correctAnswer: 1,
        explanation: "Debt-to-Equity = Total Debt / Shareholders' Equity = 500 / 1000 = 0.50."
      }
    ]
  },

  {
    id: 3,
    name: "School 3 — Technical Analysis",
    category: "Technicals",
    description: "Analyze price action, Japanese candlesticks, chart patterns, indicators, and support/resistance.",
    certTitle: "Certified Technical Analyst",
    lessons: [
      {
        id: "s3-l1",
        title: "Japanese Candlesticks & Price Action Anatomy",
        duration: "12 min",
        summary: "Decode Open, High, Low, and Close (OHLC) candles to gauge buyer and seller dominance.",
        content: {
          overview: "A candlestick visually displays price movements over a specified timeframe. The real body represents the range between Open and Close. The upper and lower wicks (shadows) represent intra-session high and low extremes. Long lower wicks signal strong buying support, while long upper wicks signal selling pressure.",
          keyPoints: [
            "Bullish Candle (Green): Close > Open.",
            "Bearish Candle (Red): Close < Open.",
            "Reversal Patterns: Hammer, Bullish Engulfing, Morning Star, Shooting Star."
          ],
          formulaOrConcept: "Candle Body Range = |Close - Open|",
          realWorldExample: "A Hammer candle forming at a major 200-day EMA support level signals that sellers pushed price down intra-day, but aggressive buyers stepped in to close near the session high."
        },
        quiz: [
          {
            id: "s3-l1-q1",
            question: "What does a long lower wick on a daily candlestick indicate?",
            options: [
              "Sellers dominated the market throughout the close",
              "Price opened high and collapsed to the close",
              "Sellers pushed price down during the session, but buyers aggressively bought the dip to push price back up",
              "Trading volume was zero"
            ],
            correctAnswer: 2,
            explanation: "A long lower shadow demonstrates rejection of lower prices by active buyers."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s3-ex-1",
        question: "What happens during a 'Golden Cross' technical setup?",
        options: [
          "The 50-day EMA crosses above the 200-day EMA, signaling long-term bullish momentum",
          "RSI falls below 20",
          "Price breaks below 52-week low",
          "Volume drops to zero"
        ],
        correctAnswer: 0,
        explanation: "A Golden Cross occurs when a short-term moving average (50 EMA) breaks above a long-term average (200 EMA)."
      }
    ]
  },

  {
    id: 4,
    name: "School 4 — Active Trading",
    category: "Trading",
    description: "Learn intraday momentum, swing trading setups, VWAP strategies, order book depth, and risk/reward.",
    certTitle: "Certified Active Trader",
    lessons: [
      {
        id: "s4-l1",
        title: "Intraday Momentum & VWAP Trading Framework",
        duration: "15 min",
        summary: "Use Volume Weighted Average Price (VWAP) as an institutional benchmark for intraday trend direction.",
        content: {
          overview: "VWAP calculates the average price a stock traded at throughout the day, weighted by volume. Institutional algorithms use VWAP to evaluate execution efficiency. When price trades above VWAP with rising volume, buyers are in control.",
          keyPoints: [
            "Bullish Bias: Price > VWAP.",
            "Bearish Bias: Price < VWAP.",
            "VWAP Pullback Setup: Buying near VWAP support during an established uptrend."
          ],
          formulaOrConcept: "VWAP = ∑ (Price × Volume) / ∑ Total Volume",
          realWorldExample: "Day traders buy a breakout stock when it retests VWAP at ₹450 with low volume, setting a tight stop loss at ₹446."
        },
        quiz: [
          {
            id: "s4-l1-q1",
            question: "Why is VWAP superior to a standard moving average for intraday traders?",
            options: [
              "VWAP incorporates volume alongside price, reflecting where institutional capital traded",
              "VWAP works only on weekly charts",
              "VWAP guarantees 100% win rate",
              "VWAP ignores volume completely"
            ],
            correctAnswer: 0,
            explanation: "VWAP weights price levels by volume, giving true insight into institutional positioning."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s4-ex-1",
        question: "If a trade risks ₹2,000 to target ₹6,000 profit, what is the Risk-to-Reward Ratio?",
        options: ["1:1", "1:2", "1:3", "1:5"],
        correctAnswer: 2,
        explanation: "Risk = ₹2,000, Reward = ₹6,000. Ratio = 1:3."
      }
    ]
  },

  {
    id: 5,
    name: "School 5 — Long-Term Value Investing",
    category: "Investing",
    description: "Value investing principles, Warren Buffett framework, growth investing, dividend compounding, and moat evaluation.",
    certTitle: "Certified Value Investor",
    lessons: [
      {
        id: "s5-l1",
        title: "Economic Moats & Margin of Safety",
        duration: "15 min",
        summary: "Identify sustainable competitive advantages that protect corporate profits from industry rivals.",
        content: {
          overview: "An Economic Moat is a structural advantage that allows a company to maintain high returns on capital over decades. Types of moats include Brand Power (Asian Paints), Network Effects (NSE), High Switching Costs (TCS), and Cost Leadership (DMart).",
          keyPoints: [
            "Brand Moat: Pricing power without loss of market share.",
            "Switching Cost Moat: Customers face friction changing providers.",
            "Margin of Safety: Buying stock at a discount to intrinsic business value."
          ],
          formulaOrConcept: "Margin of Safety = Intrinsic Value - Current Market Price",
          realWorldExample: "Asian Paints commands an economic moat through its proprietary distribution supply network reaching 70,000+ dealers nationwide, making competitor displacement nearly impossible."
        },
        quiz: [
          {
            id: "s5-l1-q1",
            question: "What is a 'Margin of Safety' in value investing?",
            options: [
              "Setting a stop loss at 2%",
              "Buying a stock at a discount to its intrinsic value to protect against valuation errors or bad market events",
              "Investing only in government bonds",
              "Buying stocks with zero PE"
            ],
            correctAnswer: 1,
            explanation: "Margin of Safety buffers investors against analytical mistakes or market downturns."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s5-ex-1",
        question: "Which type of Economic Moat does a company like Apple possess when users remain locked into its ecosystem of hardware and services?",
        options: ["High Switching Costs & Network Effects", "Zero moat", "Government Monopoly", "Commodity arbitrage"],
        correctAnswer: 0,
        explanation: "Apple benefits from ecosystem switching costs and network effects."
      }
    ]
  },

  {
    id: 6,
    name: "School 6 — Options Trading",
    category: "Derivatives",
    description: "Calls, puts, Option Greeks (Delta, Gamma, Theta, Vega), covered calls, iron condors, and volatility trading.",
    certTitle: "Certified Options Specialist",
    lessons: [
      {
        id: "s6-l1",
        title: "Options Fundamentals: Calls, Puts & Strike Prices",
        duration: "18 min",
        summary: "Understand right vs obligation, call options (bullish), put options (bearish), and premium pricing.",
        content: {
          overview: "An Option is a derivative contract giving the buyer the right, but not the obligation, to buy (Call) or sell (Put) an underlying asset at a specified Strike Price before expiration.",
          keyPoints: [
            "Call Option: Right to BUY underlying asset.",
            "Put Option: Right to SELL underlying asset.",
            "Option Premium = Intrinsic Value + Time Value."
          ],
          formulaOrConcept: "Call Intrinsic Value = Max(0, Spot Price - Strike Price)",
          realWorldExample: "If NIFTY is trading at 24,000, buying a 24,000 Call Option allows you to profit if NIFTY surges to 24,500 while capping risk to the option premium paid."
        },
        quiz: [
          {
            id: "s6-l1-q1",
            question: "What happens to the Time Value component of an option premium as expiration approaches?",
            options: [
              "Time Value increases exponentially",
              "Time Value decays towards zero (Theta Decay)",
              "Time Value stays constant",
              "Time Value turns into stock shares"
            ],
            correctAnswer: 1,
            explanation: "Theta decay erodes the time value of an option every day leading up to expiry."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s6-ex-1",
        question: "Which Option Greek measures option price sensitivity to changes in the underlying asset price?",
        options: ["Theta", "Delta", "Vega", "Gamma"],
        correctAnswer: 1,
        explanation: "Delta measures price change per ₹1 movement in underlying asset."
      }
    ]
  },

  {
    id: 7,
    name: "School 7 — Futures & Commodities",
    category: "Derivatives",
    description: "Index futures, margin requirements, hedging strategies, leverage management, and commodity cycles.",
    certTitle: "Certified Futures Strategist",
    lessons: [
      {
        id: "s7-l1",
        title: "Futures Contracts, Mark-to-Market (MTM) & Margin Mechanics",
        duration: "15 min",
        summary: "Learn how linear derivative contracts function with initial and maintenance margins.",
        content: {
          overview: "A Futures contract is a binding agreement to buy or sell an asset at a predetermined price on a future date. Unlike options, futures have linear payoff profiles and require daily Mark-to-Market (MTM) margin settlement.",
          keyPoints: [
            "Linear Payoff: Gain ₹1 for every point rise; lose ₹1 for every point fall.",
            "Initial Margin: Required capital to open position.",
            "MTM Settlement: Profits/losses settled daily into trading accounts."
          ],
          formulaOrConcept: "Contract Value = Lot Size × Futures Price",
          realWorldExample: "Buying 1 lot of NIFTY Futures (lot size 25) at 24,000 requires ~₹1.2 Lakh margin for a total contract exposure of ₹6,00,000."
        },
        quiz: [
          {
            id: "s7-l1-q1",
            question: "What is Mark-to-Market (MTM) settlement in futures trading?",
            options: [
              "Settling profits and losses daily based on closing prices",
              "Paying interest on stock dividends",
              "Buying physical gold at market close",
              "Canceling orders automatically"
            ],
            correctAnswer: 0,
            explanation: "MTM adjusts trader account balances daily based on market movement."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s7-ex-1",
        question: "How do institutional portfolio managers use stock index futures to hedge a ₹10 Cr equity portfolio?",
        options: [
          "Buy Call Options",
          "Sell / Short Index Futures corresponding to portfolio beta",
          "Buy more speculative penny stocks",
          "Withdraw all cash"
        ],
        correctAnswer: 1,
        explanation: "Shorting index futures offsets equity portfolio losses during market corrections."
      }
    ]
  },

  {
    id: 8,
    name: "School 8 — Fixed Income & Bonds",
    category: "Bonds",
    description: "Government securities, corporate bonds, yield curves, interest rate sensitivity, duration, and credit ratings.",
    certTitle: "Certified Fixed Income Specialist",
    lessons: [
      {
        id: "s8-l1",
        title: "Bond Pricing, Yield to Maturity (YTM) & Interest Rate Inverse Law",
        duration: "15 min",
        summary: "Master the fundamental inverse relationship between bond prices and prevailing interest rates.",
        content: {
          overview: "Fixed Income securities pay regular interest (coupon) and return principal at maturity. Bond prices move in the opposite direction of interest rates: when central banks hike rates, existing bond prices fall.",
          keyPoints: [
            "Inverse Rule: Interest Rates Up ↑ → Bond Prices Down ↓.",
            "Yield to Maturity (YTM): Total annual return if held to maturity.",
            "Duration: Measures bond price sensitivity to 1% rate change."
          ],
          formulaOrConcept: "Bond Price Sensitivity ≈ - Modified Duration × Δ Interest Rate",
          realWorldExample: "When RBI hikes repo rate from 6.0% to 6.5%, 10-year Government Bonds drop in price so their yield rises to match new market rates."
        },
        quiz: [
          {
            id: "s8-l1-q1",
            question: "What happens to existing fixed-rate bond prices when central banks increase interest rates?",
            options: [
              "Bond prices rise",
              "Bond prices fall",
              "Bond prices remain completely unchanged",
              "Bonds turn into equities"
            ],
            correctAnswer: 1,
            explanation: "Bond prices and interest rates share an inverse mathematical relationship."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s8-ex-1",
        question: "Which bond duration carries higher price risk when interest rates fluctuate?",
        options: ["1-Year Short Term Bond", "10-Year Long Term Bond", "3-Month Treasury Bill", "Zero duration"],
        correctAnswer: 1,
        explanation: "Longer duration bonds suffer larger percentage price swings when rates change."
      }
    ]
  },

  {
    id: 9,
    name: "School 9 — ETFs & Mutual Funds",
    category: "Funds",
    description: "Passive index tracking, expense ratios, asset allocation, smart-beta ETFs, and portfolio diversification.",
    certTitle: "Certified Fund Strategist",
    lessons: [
      {
        id: "s9-l1",
        title: "Passive Index ETFs vs Active Mutual Funds & Expense Ratios",
        duration: "12 min",
        summary: "Compare passive index replication against active fund manager performance and fee drag.",
        content: {
          overview: "Exchange Traded Funds (ETFs) track underlying market indices (e.g. NIFTY 50) with ultra-low expense ratios (0.05%-0.20%). Active mutual funds hire portfolio managers aiming to beat benchmark returns, but charge higher fees (1.0%-2.0%).",
          keyPoints: [
            "Tracking Error: Difference between ETF returns and index returns.",
            "Expense Ratio Drag: 1.5% fee difference compounding over 20 years reduces final wealth significantly.",
            "Systematic Investment Plan (SIP): Dollar-cost averaging discipline."
          ],
          formulaOrConcept: "Compounded Drag = (1 + Return - Expense Ratio)^Years",
          realWorldExample: "Investing ₹10,000/month in a NIFTY 50 Index ETF charging 0.05% vs an active fund charging 1.8% can result in a ₹25+ Lakh wealth difference over 25 years due to fee compounding."
        },
        quiz: [
          {
            id: "s9-l1-q1",
            question: "Why do low expense ratios matter for long-term compound investors?",
            options: [
              "Fees are deducted annually from fund NAV, compounding into major wealth drag over decades",
              "High fees guarantee high returns",
              "ETFs do not trade on stock exchanges",
              "Expense ratios pay for stock dividends"
            ],
            correctAnswer: 0,
            explanation: "Lower expense ratios allow a higher percentage of investment capital to compound uninterrupted."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s9-ex-1",
        question: "What is 'Tracking Error' in an Exchange Traded Fund (ETF)?",
        options: [
          "The discrepancy between the ETF net asset value performance and its underlying benchmark index",
          "An error made by the investor's broker",
          "Tax deduction limit",
          "Dividend distribution error"
        ],
        correctAnswer: 0,
        explanation: "Tracking Error measures how closely an ETF replicates its target index."
      }
    ]
  },

  {
    id: 10,
    name: "School 10 — Portfolio Management",
    category: "Portfolio",
    description: "Modern Portfolio Theory, Sharpe Ratio, rebalancing frameworks, max drawdown limits, and capital preservation.",
    certTitle: "Certified Portfolio Manager",
    lessons: [
      {
        id: "s10-l1",
        title: "Modern Portfolio Theory (MPT) & Sharpe Ratio Optimization",
        duration: "15 min",
        summary: "Construct efficient portfolios that maximize expected return per unit of risk.",
        content: {
          overview: "Modern Portfolio Theory (Harry Markowitz) shows that combining uncorrelated asset classes (Equities, Bonds, Gold) reduces overall portfolio volatility without sacrificing long-term returns. The Sharpe Ratio measures risk-adjusted return above the risk-free rate.",
          keyPoints: [
            "Asset Correlation: Low/negative correlation protects against drawdowns.",
            "Sharpe Ratio > 1.0: Good risk-adjusted return.",
            "Sharpe Ratio > 2.0: Outstanding institutional efficiency."
          ],
          formulaOrConcept: "Sharpe Ratio = (Portfolio Return - Risk-Free Rate) / Portfolio Volatility (Std Dev)",
          realWorldExample: "A portfolio returning 18% with 15% volatility has a Sharpe Ratio of (18 - 6)/15 = 0.80. A portfolio returning 15% with only 8% volatility has a Sharpe Ratio of (15 - 6)/8 = 1.12, providing superior risk-adjusted return."
        },
        quiz: [
          {
            id: "s10-l1-q1",
            question: "If Portfolio A has a Sharpe Ratio of 0.70 and Portfolio B has a Sharpe Ratio of 1.40, which portfolio is more efficient?",
            options: [
              "Portfolio A",
              "Portfolio B",
              "Both are identical",
              "Sharpe ratio does not apply to portfolios"
            ],
            correctAnswer: 1,
            explanation: "Portfolio B generates double the excess return per unit of risk compared to Portfolio A."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s10-ex-1",
        question: "What is the primary objective of periodic portfolio rebalancing?",
        options: [
          "To force selling high-performing overweight assets and buying underperforming underweight assets to maintain target risk tolerance",
          "To pay maximum brokerage commissions",
          "To guess next week's stock prices",
          "To eliminate taxes"
        ],
        correctAnswer: 0,
        explanation: "Rebalancing restores target asset allocation, enforcing buy-low sell-high discipline."
      }
    ]
  },

  {
    id: 11,
    name: "School 11 — Quantitative Finance",
    category: "Quant",
    description: "Algorithmic backtesting, statistical arbitrage, mean reversion, momentum signals, and Monte Carlo simulation.",
    certTitle: "Certified Quant Analyst",
    lessons: [
      {
        id: "s11-l1",
        title: "Statistical Arbitrage, Mean Reversion & Pairs Trading",
        duration: "18 min",
        summary: "Exploit mathematical mispricings between highly correlated asset pairs.",
        content: {
          overview: "Quantitative finance replaces emotional intuition with mathematical rigor. Mean Reversion strategies assume asset prices eventually return to their historical average. Pairs Trading identifies two historically correlated stocks (e.g. HDFC Bank vs ICICI Bank) and trades the spread when it diverges beyond 2 standard deviations.",
          keyPoints: [
            "Z-Score = (Current Spread - Mean Spread) / Standard Deviation.",
            "Z-Score > +2.0: Short the spread (Sell Stock A, Buy Stock B).",
            "Z-Score < -2.0: Long the spread."
          ],
          formulaOrConcept: "Spread = Price(Stock A) - Hedge Ratio × Price(Stock B)",
          realWorldExample: "When the price ratio between HDFC Bank and ICICI Bank strays 2.5 standard deviations away from its 3-year mean, quant funds place a pairs trade expecting the spread to converge back to normal."
        },
        quiz: [
          {
            id: "s11-l1-q1",
            question: "What underlying statistical assumption drives Mean Reversion trading algorithms?",
            options: [
              "Asset prices will trend infinitely in one direction",
              "Prices that deviate significantly from historical averages will eventually revert back to the mean",
              "Volume is irrelevant",
              "Earnings reports do not matter"
            ],
            correctAnswer: 1,
            explanation: "Mean reversion relies on mathematical convergence back towards historical mean levels."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s11-ex-1",
        question: "What is a Monte Carlo simulation used for in quantitative portfolio risk management?",
        options: [
          "Running thousands of randomized market path simulations to calculate probability distributions of potential portfolio returns and drawdowns",
          "Predicting exact tomorrow stock prices",
          "Gambling on casino games",
          "Designing corporate logos"
        ],
        correctAnswer: 0,
        explanation: "Monte Carlo models simulate thousands of stochastic outcomes to quantify tail risk."
      }
    ]
  },

  {
    id: 12,
    name: "School 12 — Professional Institutional Research",
    category: "Research",
    description: "Writing Wall Street research notes, DCF valuation modeling, M&A analysis, and management transcript breakdown.",
    certTitle: "Certified Institutional Analyst",
    lessons: [
      {
        id: "s12-l1",
        title: "Discounted Cash Flow (DCF) Modeling & WACC Calculation",
        duration: "20 min",
        summary: "Calculate corporate intrinsic value by discounting future Free Cash Flows to present value.",
        content: {
          overview: "Discounted Cash Flow (DCF) is the gold standard institutional valuation methodology. It projects future Free Cash Flows (FCF) for 5-10 years and discounts them back to Present Value using the Weighted Average Cost of Capital (WACC).",
          keyPoints: [
            "Intrinsic Value = Sum of Discounted FCFs + Discounted Terminal Value.",
            "WACC: Cost of Equity + Cost of Debt after tax.",
            "Terminal Value: Value of cash flows beyond forecast period using perpetual growth rate."
          ],
          formulaOrConcept: "Present Value = FCF_t / (1 + WACC)^t",
          realWorldExample: "An equity research analyst projects TCS free cash flows to grow at 12% for 10 years, discounts them at a 10% WACC, and arrives at a target intrinsic value of ₹4,200 per share."
        },
        quiz: [
          {
            id: "s12-l1-q1",
            question: "What happens to the DCF Intrinsic Value estimate if an analyst increases the WACC discount rate assumption?",
            options: [
              "Intrinsic Value estimate decreases",
              "Intrinsic Value estimate increases",
              "Intrinsic Value remains identical",
              "DCF turns into a P/E ratio"
            ],
            correctAnswer: 0,
            explanation: "A higher discount rate reduces the present value of future cash flows, lowering estimated intrinsic value."
          }
        ]
      }
    ],
    schoolExam: [
      {
        id: "s12-ex-1",
        question: "When writing a professional Wall Street Equity Research report, why must analysts include both a Bull Case and a Bear Case alongside their Base Case?",
        options: [
          "To provide institutional investors with downside risk sensitivity and realistic scenario boundaries",
          "To confuse retail traders",
          "Because regulatory rules forbid single numbers",
          "To fill up empty page space"
        ],
        correctAnswer: 0,
        explanation: "Scenario analysis provides comprehensive risk-reward transparency for institutional decision-makers."
      }
    ]
  }
];
