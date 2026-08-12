import { QuizQuestion } from "../types";

export const TOPIC_TESTS: Record<string, QuizQuestion[]> = {
  "topic-1": [
    {
      id: "t1-q1",
      topicCategory: "Basics",
      question: "If Company A has 1,000,000 total shares and you purchase 25,000 shares on the stock exchange, what percentage of the company do you own?",
      type: "calculation",
      options: ["0.25%", "2.5%", "25%", "250%"],
      correctIndex: 1,
      explanation: "25,000 ÷ 1,000,000 = 0.025, which converts to 2.5% ownership.",
      difficulty: "Beginner"
    },
    {
      id: "t1-q2",
      topicCategory: "Basics",
      question: "Where do retail investors execute buy and sell orders for public equities?",
      type: "mcq",
      options: [
        "Directly on the floor of the stock exchange building",
        "Through registered stockbrokers or trading apps connected to NSE/BSE",
        "At company headquarters",
        "At the Reserve Bank of India"
      ],
      correctIndex: 1,
      explanation: "Individual retail investors place orders through licensed brokerage accounts which route orders to NSE/BSE.",
      difficulty: "Beginner"
    },
    {
      id: "t1-q3",
      topicCategory: "Basics",
      question: "True or False: Buying common stock shares guarantees that you will receive a fixed monthly income dividend.",
      type: "true_false",
      options: ["True", "False"],
      correctIndex: 1,
      explanation: "False! Common stocks do not guarantee fixed income. Dividends are discretionary and dependent on company profits and board approval.",
      difficulty: "Beginner"
    },
    {
      id: "t1-q4",
      topicCategory: "Basics",
      question: "How does an electronic limit order book match buyers and sellers on stock exchanges like NSE?",
      type: "scenario",
      options: [
        "Automatically based on Price and Time Priority in milliseconds",
        "Manually reviewed by bank tellers at the end of the day",
        "Based on whoever has the highest net worth",
        "Random lottery selection"
      ],
      correctIndex: 0,
      explanation: "Exchanges use automated limit order books matching orders based on best price and earliest timestamp priority.",
      difficulty: "Intermediate"
    }
  ],

  "topic-2": [
    {
      id: "t2-q1",
      topicCategory: "Basics",
      question: "Company X stock costs ₹1,500 with 10 Lakh shares. Company Y stock costs ₹150 with 200 Lakh shares. Which company is larger in market size?",
      type: "calculation",
      options: [
        "Company X is larger (Market Cap ₹150 Cr)",
        "Company Y is larger (Market Cap ₹300 Cr)",
        "Both are exactly equal size",
        "Cannot be calculated from share price and share count"
      ],
      correctIndex: 1,
      explanation: "Company X Market Cap = 1500 × 10 Lakh = ₹150 Cr. Company Y = 150 × 200 Lakh = ₹300 Cr. Company Y is 2x larger!",
      difficulty: "Intermediate"
    },
    {
      id: "t2-q2",
      topicCategory: "Basics",
      question: "When a company executes a 1-for-2 (1:2) Stock Split, what happens to your total holding value immediately?",
      type: "scenario",
      options: [
        "Your total investment value doubles",
        "Your total investment value drops by half",
        "Your holding value remains identical, but you own 2x shares at half the price per share",
        "You must pay capital gains tax immediately"
      ],
      correctIndex: 2,
      explanation: "A stock split increases share count proportionally while adjusting share price down — total market value remains identical.",
      difficulty: "Beginner"
    },
    {
      id: "t2-q3",
      topicCategory: "Basics",
      question: "Which category of stocks typically offers higher long-term growth potential but higher price volatility during market pullbacks?",
      type: "mcq",
      options: [
        "Large-Cap Blue Chips (e.g., Reliance, TCS)",
        "Small-Cap Companies",
        "Government Sovereign Gold Bonds",
        "Fixed Deposits"
      ],
      correctIndex: 1,
      explanation: "Small-caps have high growth headroom but lower liquidity and higher price swings compared to established large-caps.",
      difficulty: "Beginner"
    },
    {
      id: "t2-q4",
      topicCategory: "Basics",
      question: "If a company issues 20% new shares to raise capital (dilution), what happens to existing shareholders' ownership percentage if they don't buy new shares?",
      type: "scenario",
      options: [
        "Their percentage ownership increases",
        "Their percentage ownership gets diluted (decreases)",
        "Their ownership stays exactly the same",
        "Their shares are automatically sold"
      ],
      correctIndex: 1,
      explanation: "Issuing new shares increases total outstanding shares denominator, reducing existing shareholders' proportional ownership percentage.",
      difficulty: "Intermediate"
    }
  ],

  "topic-3": [
    {
      id: "t3-q1",
      topicCategory: "Fundamentals",
      question: "A company generates ₹100 Crore in net annual profit with 2 Crore shares outstanding. Stock price is ₹800. Calculate EPS and P/E ratio.",
      type: "calculation",
      options: [
        "EPS = ₹50, P/E = 16x",
        "EPS = ₹20, P/E = 40x",
        "EPS = ₹100, P/E = 8x",
        "EPS = ₹80, P/E = 10x"
      ],
      correctIndex: 0,
      explanation: "EPS = Profit ÷ Shares = 100 Cr ÷ 2 Cr = ₹50. P/E = Share Price ÷ EPS = 800 ÷ 50 = 16x.",
      difficulty: "Intermediate"
    },
    {
      id: "t3-q2",
      topicCategory: "Fundamentals",
      question: "Company A trades at 15x P/E and Company B trades at 45x P/E. Why might investors willingly pay 45x P/E for Company B?",
      type: "scenario",
      options: [
        "Company B is expected to grow revenue and profits much faster in future years",
        "45x P/E guarantees 45% dividend yield every quarter",
        "Company B has zero costs",
        "Low P/E stocks are illegal to purchase"
      ],
      correctIndex: 0,
      explanation: "High P/E ratios reflect high market growth expectations — investors pay premium multiples for fast earnings growth.",
      difficulty: "Intermediate"
    },
    {
      id: "t3-q3",
      topicCategory: "Fundamentals",
      question: "If a company's stock price stays flat at ₹400 while its EPS doubles from ₹10 to ₹20, what happens to its P/E ratio?",
      type: "calculation",
      options: [
        "P/E doubles from 20x to 40x",
        "P/E cuts in half from 40x to 20x (stock becomes cheaper relative to earnings)",
        "P/E stays unchanged",
        "P/E drops to 0x"
      ],
      correctIndex: 1,
      explanation: "P/E = Price ÷ EPS. Initially 400 ÷ 10 = 40x. With EPS = ₹20: 400 ÷ 20 = 20x. The stock becomes 50% cheaper on earnings multiple!",
      difficulty: "Intermediate"
    },
    {
      id: "t3-q4",
      topicCategory: "Fundamentals",
      question: "What is a 'Value Trap' in fundamental stock analysis?",
      type: "mcq",
      options: [
        "A stock that looks cheap with a low P/E ratio but has declining business fundamentals and falling profits",
        "A stock with high earnings growth",
        "A bank account with zero interest",
        "A stock split announcement"
      ],
      correctIndex: 0,
      explanation: "Value traps appear cheap on low P/E multiples, but suffer deteriorating core operations, leading to further price drops.",
      difficulty: "Advanced"
    }
  ],

  "topic-4": [
    {
      id: "t4-q1",
      topicCategory: "Fundamentals",
      question: "Company Alpha shows an impressive 30% ROE, but its Debt-to-Equity ratio is 4.5x. What critical risk should an investor investigate?",
      type: "scenario",
      options: [
        "High debt leverage is artificially inflating ROE while exposing the firm to severe solvency risk if interest rates rise",
        "High ROE eliminates all financial risk",
        "Debt-to-Equity has no relationship with net profit",
        "The company is forced to pay zero taxes"
      ],
      correctIndex: 0,
      explanation: "Excessive debt reduces equity denominator and inflates ROE, but heavy debt service creates fragility during revenue slowdowns.",
      difficulty: "Advanced"
    },
    {
      id: "t4-q2",
      topicCategory: "Fundamentals",
      question: "Why do fundamental investors prefer Return on Capital Employed (ROCE) over ROE when comparing capital-heavy industries (e.g. Infrastructure or Power)?",
      type: "mcq",
      options: [
        "ROCE measures return across total capital (both Equity AND Long-Term Debt), avoiding debt distortion",
        "ROCE ignores taxes completely",
        "ROCE is only calculated in US dollars",
        "ROCE is only updated once every 10 years"
      ],
      correctIndex: 0,
      explanation: "ROCE evaluates operating efficiency over total capital employed (Equity + Debt), providing a clear picture for leveraged sectors.",
      difficulty: "Intermediate"
    },
    {
      id: "t4-q3",
      topicCategory: "Fundamentals",
      question: "What Debt-to-Equity ratio is generally considered conservative and financially safe for most non-banking companies?",
      type: "mcq",
      options: [
        "Below 0.5x to 1.0x",
        "Above 10.0x",
        "Between 15.0x and 20.0x",
        "Exactly 100x"
      ],
      correctIndex: 0,
      explanation: "A Debt-to-Equity ratio below 0.5x–1.0x indicates low debt burden, providing a safe cushion during economic downturns.",
      difficulty: "Beginner"
    },
    {
      id: "t4-q4",
      topicCategory: "Fundamentals",
      question: "A company generates ₹15 Cr Operating Cash Flow but needs to spend ₹20 Cr on factory upgrades (CapEx). What is its Free Cash Flow (FCF)?",
      type: "calculation",
      options: ["-₹5 Cr (Negative FCF)", "+₹35 Cr", "+₹5 Cr", "0"],
      correctIndex: 0,
      explanation: "Free Cash Flow = Operating Cash Flow - CapEx = 15 - 20 = -₹5 Cr. Negative FCF means the company burned cash to fund expansions.",
      difficulty: "Intermediate"
    }
  ],

  "topic-5": [
    {
      id: "t5-q1",
      topicCategory: "Technical",
      question: "A stock price opens at ₹100, drops to ₹85 during intraday trading, but aggressive buyers step in to push the close up to ₹102, forming a long bottom wick. What candlestick pattern is this?",
      type: "scenario",
      options: [
        "Bullish Hammer / Pin Bar signaling strong demand at lower prices",
        "Bearish Marubozu",
        "Head & Shoulders top pattern",
        "Doji with zero volume"
      ],
      correctIndex: 0,
      explanation: "Long lower wicks (Hammer/Pin Bar) demonstrate rejection of lower prices and strong demand stepping in to absorb selling pressure.",
      difficulty: "Intermediate"
    },
    {
      id: "t5-q2",
      topicCategory: "Technical",
      question: "Over the last 6 months, Stock Z repeatedly falls to ₹250 and bounces up every time. What technical concept describes ₹250?",
      type: "mcq",
      options: [
        "Strong Support Level (Demand Floor)",
        "Resistance Ceiling",
        "Overbought RSI Zone",
        "Moving Average Convergence"
      ],
      correctIndex: 0,
      explanation: "Support levels represent price zones where demand consistently exceeds supply, halting further price declines.",
      difficulty: "Beginner"
    },
    {
      id: "t5-q3",
      topicCategory: "Technical",
      question: "A stock breaks above a key 1-year resistance level of ₹500. How can a technical trader confirm if the breakout is real or a false breakout?",
      type: "scenario",
      options: [
        "Check if daily trading volume surges significantly (e.g. 3x-5x average) on the breakout candle",
        "Ignore volume completely",
        "Wait for company management to post on social media",
        "Buy immediately without setting a stop loss"
      ],
      correctIndex: 0,
      explanation: "High volume on a breakout confirms institutional participation, reducing the probability of a bull trap / false breakout.",
      difficulty: "Intermediate"
    },
    {
      id: "t5-q4",
      topicCategory: "Technical",
      question: "When a strong Resistance ceiling is broken convincingly with high volume, what does it often become during future price pullbacks?",
      type: "mcq",
      options: [
        "New Support floor (Role Reversal)",
        "Permanent zero line",
        "Immediate bankruptcy level",
        "Fixed dividend rate"
      ],
      correctIndex: 0,
      explanation: "The Principle of Role Reversal states that once resistance is broken, it frequently turns into new support during retests.",
      difficulty: "Intermediate"
    }
  ],

  "topic-6": [
    {
      id: "t6-q1",
      topicCategory: "Technical",
      question: "A stock's Relative Strength Index (RSI 14) reaches a reading of 84. What does this technical indicator suggest?",
      type: "scenario",
      options: [
        "The stock has strong upside momentum, but is short-term Overbought and vulnerable to consolidation or pullbacks",
        "The stock is oversold and cheap to buy",
        "Moving average has crossed zero",
        "Trading volume is negative"
      ],
      correctIndex: 0,
      explanation: "RSI above 70-80 indicates overbought conditions where buying momentum may be stretched thin in the short term.",
      difficulty: "Intermediate"
    },
    {
      id: "t6-q2",
      topicCategory: "Technical",
      question: "What is a technical 'Golden Cross' signal on a price chart?",
      type: "mcq",
      options: [
        "When a short-term moving average (e.g. 50-day SMA) crosses ABOVE a long-term moving average (e.g. 200-day SMA)",
        "When stock price reaches zero",
        "When RSI drops below 10",
        "When company pays dividends in physical gold"
      ],
      correctIndex: 0,
      explanation: "A Golden Cross (50 SMA crossing above 200 SMA) signals a major long-term bullish trend transition.",
      difficulty: "Intermediate"
    },
    {
      id: "t6-q3",
      topicCategory: "Technical",
      question: "A stock makes a NEW HIGH price of ₹600, but its RSI indicator makes a LOWER HIGH peak. What technical pattern is this?",
      type: "chart",
      options: [
        "Bearish RSI Divergence (momentum weakening despite higher prices)",
        "Bullish Confirmation",
        "Support Breakout",
        "Golden Cross"
      ],
      correctIndex: 0,
      explanation: "Bearish divergence occurs when price makes higher highs while momentum indicators make lower highs, warning of trend exhaustion.",
      difficulty: "Advanced"
    },
    {
      id: "t6-q4",
      topicCategory: "Technical",
      question: "Why do traders avoid relying solely on RSI or Moving Averages in isolation?",
      type: "scenario",
      options: [
        "Indicators work best when combined with Price Action, Volume, and Market Structure confirmation",
        "Indicators are generated by competitors",
        "Indicators are illegal under SEBI guidelines",
        "Single indicators are always 100% accurate"
      ],
      correctIndex: 0,
      explanation: "Confluence — combining indicators with support/resistance and volume — increases win probability and avoids false signals.",
      difficulty: "Intermediate"
    }
  ],

  "topic-7": [
    {
      id: "t7-q1",
      topicCategory: "Risk Management",
      question: "You have a ₹1,00,000 trading portfolio and follow the strict 2% Risk Rule (max loss ₹2,000 per trade). You want to buy a stock at ₹500 with a Stop-Loss at ₹460 (Risk = ₹40/share). How many shares should you buy?",
      type: "calculation",
      options: ["50 shares", "200 shares", "500 shares", "100 shares"],
      correctIndex: 0,
      explanation: "Max allowed total loss = ₹2,000. Risk per share = ₹500 - ₹460 = ₹40. Shares = ₹2,000 ÷ ₹40 = 50 shares!",
      difficulty: "Advanced"
    },
    {
      id: "t7-q2",
      topicCategory: "Risk Management",
      question: "If you buy a stock at ₹200, set a Stop-Loss at ₹190 (Risk ₹10) and a Take-Profit target at ₹230 (Reward ₹30), what is your Risk-to-Reward ratio?",
      type: "calculation",
      options: ["1:3 Ratio", "1:1 Ratio", "1:2 Ratio", "3:1 Ratio"],
      correctIndex: 0,
      explanation: "Risk = ₹10, Reward = ₹30. Risk/Reward ratio = 10:30 = 1:3. A 1:3 ratio allows profitability even with a 40% win rate!",
      difficulty: "Intermediate"
    },
    {
      id: "t7-q3",
      topicCategory: "Market Psychology",
      question: "After losing ₹5,000 on a trade, a trader gets angry and immediately places a 4x bigger position on a volatile stock to 'get even'. What dangerous psychological trap is this?",
      type: "scenario",
      options: [
        "Revenge Trading / Loss Aversion spiral",
        "Disciplined Position Sizing",
        "Value Investing",
        "Dollar Cost Averaging"
      ],
      correctIndex: 0,
      explanation: "Revenge trading is driven by emotional pain from losses, abandoning trading rules and leading to catastrophic account drawdowns.",
      difficulty: "Intermediate"
    },
    {
      id: "t7-q4",
      topicCategory: "Risk Management",
      question: "Why is sector diversification crucial for protecting a long-term stock portfolio?",
      type: "mcq",
      options: [
        "It prevents a regulatory shock or crash in one specific industry (e.g. IT or Banking) from wiping out your entire capital",
        "It guarantees 100% daily positive returns",
        "It removes all brokerage fees",
        "It automatically doubles dividends"
      ],
      correctIndex: 0,
      explanation: "Spreading capital across uncorrelated sectors mitigates systematic sector drawdowns and reduces overall portfolio variance.",
      difficulty: "Beginner"
    }
  ]
};
