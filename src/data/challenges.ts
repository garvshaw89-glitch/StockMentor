import { AnalystChallenge, ChartChallenge, NewsArticle, ScenarioItem } from "../types";

export const ANALYST_CHALLENGES: AnalystChallenge[] = [
  {
    id: "analyst-1",
    stockName: "TechVista Solutions",
    sector: "IT Services",
    price: 1450,
    pe: 22,
    industryPE: 30,
    revenueGrowth: 18.5,
    profitGrowth: 22.1,
    debtToEquity: 0.12,
    roe: 28.4,
    chartTrend: "Consolidating near 50-day SMA support",
    financialSummary: "Consistently expanding EBIT margins, zero major pledged shares, strong order pipeline in Cloud AI contracts.",
    suggestedAnswer: "BUY"
  },
  {
    id: "analyst-2",
    stockName: "Apex Infra & Realty",
    sector: "Infrastructure & Construction",
    price: 340,
    pe: 55,
    industryPE: 24,
    revenueGrowth: 4.2,
    profitGrowth: -12.5,
    debtToEquity: 2.85,
    roe: 6.1,
    chartTrend: "Downtrend below 200-day SMA, forming lower lows",
    financialSummary: "High interest expense consuming 70% of operating profits, rising working capital delays, high promoter share pledge.",
    suggestedAnswer: "SELL"
  },
  {
    id: "analyst-3",
    stockName: "GreenPulse Energy",
    sector: "Renewable Power",
    price: 890,
    pe: 68,
    industryPE: 45,
    revenueGrowth: 35.0,
    profitGrowth: 40.0,
    debtToEquity: 1.45,
    roe: 19.2,
    chartTrend: "Rangebound between ₹820 (Support) and ₹940 (Resistance)",
    financialSummary: "Rapid top-line expansion in solar projects, but premium valuation reflects aggressive growth expectations already.",
    suggestedAnswer: "HOLD"
  }
];

export const CHART_CHALLENGES: ChartChallenge[] = [
  {
    id: "chart-c1",
    stockName: "Alpha Motors (Historical 2023)",
    chartData: [
      { time: "Day 1", price: 420, volume: 15000, rsi: 42 },
      { time: "Day 2", price: 418, volume: 12000, rsi: 40 },
      { time: "Day 3", price: 422, volume: 18000, rsi: 45 },
      { time: "Day 4", price: 425, volume: 22000, rsi: 49 },
      { time: "Day 5", price: 430, volume: 38000, rsi: 56 },
      { time: "Day 6", price: 448, volume: 95000, rsi: 68 }, // Breakout!
      { time: "Day 7", price: 465, volume: 110000, rsi: 74 }
    ],
    question: "Price was rangebound at ₹420-₹425 for 2 weeks. On Day 6, price surges to ₹448 with 3x normal volume. What pattern is this?",
    options: ["Bullish Breakout", "Bearish Breakdown", "Sideways Consolidation", "Not Enough Information"],
    correctOptionIndex: 0,
    historicalOutcome: "The stock rallied another 22% over the next month as institutional volume confirmed the resistance breakout above ₹430.",
    signalsExplanation: "Key takeaway: Volume surge + closing above range resistance = high probability breakout signal.",
    usefulSignals: ["Surge in volume (95k vs 20k avg)", "Clean candle close above ₹430 resistance"],
    misleadingSignals: ["Short-term RSI hitting 68 was not a reason to short immediately during a fresh breakout."]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    headline: "RBI keeps Repo Rate unchanged at 6.50%, maintains focused stance on inflation control",
    source: "Financial Express",
    timeAgo: "2 hours ago",
    category: "RBI & Interest Rates",
    content: "The Reserve Bank of India Monetary Policy Committee voted to keep key lending rates steady, citing stable GDP growth projections and monsoon monitoring."
  },
  {
    id: "news-2",
    headline: "Tata Motors posts 118% jump in Net Profit driven by JLR margin expansion and EV sales",
    source: "Economic Times",
    timeAgo: "4 hours ago",
    category: "Earnings Beat",
    content: "Strong demand for premium Jaguar Land Rover SUVs in North America and Europe boosted consolidated EBITDA margins to 14.2%."
  },
  {
    id: "news-3",
    headline: "Global Crude Oil prices climb to $88/barrel amid Middle East supply disruption fears",
    source: "Bloomberg",
    timeAgo: "6 hours ago",
    category: "Global Markets",
    content: "Brent crude futures gained 3.2% as shipping traffic along key maritime routes experienced delays, raising input cost concerns for paint and tire manufacturers."
  }
];

export const SCENARIO_SIMULATIONS: ScenarioItem[] = [
  {
    id: "scen-1",
    title: "Central Bank Hikes Repo Rate by 50 bps",
    description: "When interest rates rise, borrowing becomes more expensive for businesses and consumers.",
    iconName: "TrendingUp",
    historicalImpact: [
      {
        sector: "Banking & Financials",
        effect: "Positive",
        explanation: "Banks reprice loans faster than deposits, temporarily expanding Net Interest Margins (NIM)."
      },
      {
        sector: "Real Estate & Housing",
        effect: "Negative",
        explanation: "Higher home loan interest rates cool down retail buyer demand for residential properties."
      },
      {
        sector: "High-Debt Growth Stocks",
        effect: "Negative",
        explanation: "Future cash flows are discounted at higher interest rates, compressing P/E valuation multiples."
      }
    ]
  },
  {
    id: "scen-2",
    title: "Company Announces 1:5 Stock Split",
    description: "The company divides each existing share into 5 smaller sub-shares.",
    iconName: "Layers",
    historicalImpact: [
      {
        sector: "Retail Trading Liquidity",
        effect: "Positive",
        explanation: "Lower nominal share price makes the stock feel more affordable to small retail investors, boosting liquidity."
      },
      {
        sector: "Company Total Market Cap",
        effect: "Mixed",
        explanation: "Fundamental valuation remains unchanged mathematically; price changes depend on sentiment."
      }
    ]
  }
];
