import { Topic, QuizQuestion } from "../types";

export interface MasterLevelInfo {
  level: number;
  title: string;
  topicRange: string;
  badge: string;
  description: string;
  iconName: string;
  certificationTitle: string;
  totalTopics: number;
}

export interface CapitalMarketCategoryInfo {
  id: string;
  number: number;
  title: string;
  shortName: string;
  description: string;
  iconName: string;
  badge: string;
  keyTopics: string[];
}

export const MASTER_LEVELS: MasterLevelInfo[] = [
  {
    level: 1,
    title: "Level 1 — Absolute Market Basics",
    topicRange: "Topics 1 – 50",
    badge: "Market Novice",
    description: "Stock market fundamentals, equities, shares, IPOs, market capitalization, exchanges (NSE/BSE/NYSE), indices, bull & bear markets, and volume.",
    iconName: "TrendingUp",
    certificationTitle: "Certified Equity Foundations Specialist",
    totalTopics: 50
  },
  {
    level: 2,
    title: "Level 2 — How Trading Actually Works",
    topicRange: "Topics 51 – 100",
    badge: "Order Mechanics",
    description: "Demat accounts, brokers, depositories (NSDL/CDSL), market sessions, order types (Limit, Stop Loss, GTT), order book, spread, charges, and intraday vs delivery.",
    iconName: "Zap",
    certificationTitle: "Certified Order Execution & Market Mechanics Trader",
    totalTopics: 50
  },
  {
    level: 3,
    title: "Level 3 — Investing Fundamentals",
    topicRange: "Topics 101 – 150",
    badge: "Financial Analyst",
    description: "Income statements, balance sheets, cash flows, EBITDA, EPS, margins, working capital, debt ratios (D/E, ROCE, ROE), and asset quality.",
    iconName: "PieChart",
    certificationTitle: "Certified Financial Statement & Fundamental Analyst",
    totalTopics: 50
  },
  {
    level: 4,
    title: "Level 4 — Valuation & Fundamental Analysis",
    topicRange: "Topics 151 – 200",
    badge: "Valuation Master",
    description: "P/E, PEG, P/B, EV/EBITDA, intrinsic value, Margin of Safety, DCF models, WACC, Gordon Growth, DuPont ROE analysis, and economic moats.",
    iconName: "BarChart2",
    certificationTitle: "Certified Valuation & Intrinsic Growth Specialist",
    totalTopics: 50
  },
  {
    level: 5,
    title: "Level 5 — Company & Business Analysis",
    topicRange: "Topics 201 – 250",
    badge: "Business Strategist",
    description: "Business models, unit economics, TAM, pricing power, competitive advantages, promoter holdings, pledging, quarterly calls, corporate actions, and red flags.",
    iconName: "Layers",
    certificationTitle: "Certified Corporate Governance & Moat Analyst",
    totalTopics: 50
  },
  {
    level: 6,
    title: "Level 6 — Candlestick & Price Action",
    topicRange: "Topics 251 – 300",
    badge: "Price Action Practitioner",
    description: "Candlestick anatomy, Doji, Engulfing, Hammer, Shooting Star, market structure, market swings, trends, breakouts, breakdowns, and retests.",
    iconName: "Activity",
    certificationTitle: "Certified Price Action & Market Structure Specialist",
    totalTopics: 50
  },
  {
    level: 7,
    title: "Level 7 — Technical Analysis",
    topicRange: "Topics 301 – 350",
    badge: "Chartist",
    description: "Support & Resistance, channels, chart patterns (Head & Shoulders, Triangles, Wedges), Moving Averages (20/50/200 EMA), VWAP, RSI, MACD, and Bollinger Bands.",
    iconName: "TrendingUp",
    certificationTitle: "Certified Technical Chart Analyst",
    totalTopics: 50
  },
  {
    level: 8,
    title: "Level 8 — Volume & Advanced Indicators",
    topicRange: "Topics 351 – 400",
    badge: "Quant Chartist",
    description: "Volume profiles, Point of Control, OBV, Fibonacci retracements, Pivot points, Supertrend, Ichimoku Cloud, Donchian channels, and indicator confluence.",
    iconName: "Cpu",
    certificationTitle: "Certified Volume & Quantitative Indicator Strategist",
    totalTopics: 50
  },
  {
    level: 9,
    title: "Level 9 — Trading Strategies",
    topicRange: "Topics 401 – 450",
    badge: "Strategy Architect",
    description: "Trend following, mean reversion, swing trading, scalping, ORB breakouts, sector rotation, statistical arbitrage, factor investing, and position scaling.",
    iconName: "Zap",
    certificationTitle: "Certified Systematic Strategy Architect",
    totalTopics: 50
  },
  {
    level: 10,
    title: "Level 10 — Risk Management, Psychology & Systems",
    topicRange: "Topics 451 – 500",
    badge: "Professional Portfolio Manager",
    description: "Position sizing, risk per trade, Expected Value, Sharpe & Sortino ratios, Beta, Alpha, FOMO & emotional control, backtesting, and complete trading system design.",
    iconName: "Award",
    certificationTitle: "Certified Master Portfolio & Risk Management Trader",
    totalTopics: 50
  }
];

export const CAPITAL_MARKETS_CATEGORIES: CapitalMarketCategoryInfo[] = [
  {
    id: "equities",
    number: 1,
    title: "1. Equities / Stocks",
    shortName: "Equities",
    description: "Common & Preferred shares, Large/Mid/Small-caps, Growth vs Value, Dividend stocks, IPOs, FPOs, Rights issues, Bonus shares, Splits, Buybacks, ESOPs, ADRs & GDRs.",
    iconName: "TrendingUp",
    badge: "Equities Master",
    keyTopics: ["Common & Preferred Stocks", "IPOs & FPOs", "Bonus & Splits", "ADRs & GDRs", "Buybacks & ESOPs"]
  },
  {
    id: "bonds",
    number: 2,
    title: "2. Bonds & Fixed Income",
    shortName: "Bonds & Debt",
    description: "Government bonds, Corporate debt, T-Bills, G-Secs, Municipal bonds, Zero-coupon, Convertible bonds, YTM, Yield Curve, Duration, Convexity, Credit Ratings.",
    iconName: "BarChart2",
    badge: "Fixed Income Specialist",
    keyTopics: ["YTM & Yield Curve", "G-Secs & Corporate Debt", "Duration & Convexity", "Bond Pricing Math"]
  },
  {
    id: "etfs",
    number: 3,
    title: "3. ETFs (Exchange-Traded Funds)",
    shortName: "ETFs",
    description: "Equity, Index, Sector, Bond, Gold, Silver & International ETFs. Creation/Redemption mechanism, NAV vs Market Price, Tracking Error, Smart-Beta, Inverse & Leveraged ETFs.",
    iconName: "PieChart",
    badge: "ETF Specialist",
    keyTopics: ["Creation/Redemption Flow", "Tracking Error & NAV", "Smart Beta & Gold ETFs", "Arbitrage Mechanics"]
  },
  {
    id: "mutual_funds",
    number: 4,
    title: "4. Mutual Funds",
    shortName: "Mutual Funds",
    description: "Equity, Debt, Hybrid, Index & ELSS Funds. Fund NAV, Expense Ratio, Exit Load, AUM, SIP, SWP, STP, Direct vs Regular plans, Active vs Passive Managers.",
    iconName: "Layers",
    badge: "Mutual Fund Architect",
    keyTopics: ["Fund NAV & AUM", "SIP / SWP / STP Mechanics", "Expense Ratio Fee Drag", "Direct vs Regular"]
  },
  {
    id: "derivatives",
    number: 5,
    title: "5. Derivatives (Futures & Options)",
    shortName: "Derivatives",
    description: "Futures contracts, Margins, Mark-to-Market, Call/Put Options, Strike Price, Option Chain, Option Greeks (Delta, Gamma, Theta, Vega), IV Crush, Iron Condor, Spreads.",
    iconName: "Zap",
    badge: "Options & Futures Trader",
    keyTopics: ["Option Greeks (Delta/Theta)", "Iron Condor & Spreads", "Implied Volatility & Skew", "Futures Contango"]
  },
  {
    id: "commodities",
    number: 6,
    title: "6. Commodities Market",
    shortName: "Commodities",
    description: "Gold, Silver, Crude Oil, Natural Gas, Agri Commodities. Spot vs Futures, Contango, Backwardation, Seasonal Cycles & Commodity Hedging.",
    iconName: "Activity",
    badge: "Commodity Analyst",
    keyTopics: ["Gold & Crude Oil Futures", "Contango & Backwardation", "Spot vs Futures Curve", "Commodity Cycles"]
  },
  {
    id: "currency_forex",
    number: 7,
    title: "7. Currency / Forex Market",
    shortName: "Currency & Forex",
    description: "USD/INR, EUR/USD, GBP/USD, USD/JPY pairs. Base vs Quote currencies, Currency Futures & Options, Carry Trade, Central Bank Interventions & Hedging.",
    iconName: "Globe",
    badge: "Forex Specialist",
    keyTopics: ["USD/INR Currency Pair", "Carry Trade Mechanics", "Central Bank Intervention", "FX Options"]
  },
  {
    id: "money_market",
    number: 8,
    title: "8. Money Market",
    shortName: "Money Market",
    description: "Treasury Bills, Commercial Paper, Certificates of Deposit, Repos, Reverse Repo, Call Money, Notice Money, Short-term interest rates & Central Bank Liquidity.",
    iconName: "Cpu",
    badge: "Money Market Strategist",
    keyTopics: ["T-Bills & Commercial Paper", "Repos & Reverse Repos", "Call Money & Overnight Rates"]
  },
  {
    id: "reits",
    number: 9,
    title: "9. REITs (Real Estate Investment Trusts)",
    shortName: "REITs",
    description: "Real Estate Investment Trust structures, Unit distributions, Rental Income, Occupancy Rates, Net Operating Income (NOI), Yields & Commercial Real Estate.",
    iconName: "PieChart",
    badge: "REIT Specialist",
    keyTopics: ["Rental Cash Flows & NOI", "90%+ Mandatory Distribution", "REIT Yields & Valuation"]
  },
  {
    id: "invits",
    number: 10,
    title: "10. InvITs (Infrastructure Investment Trusts)",
    shortName: "InvITs",
    description: "Infrastructure assets, Toll-road & Power-grid InvITs, Cash flows, Yield, Distribution rules, Interest-rate sensitivity & Infrastructure debt.",
    iconName: "BarChart2",
    badge: "InvIT Specialist",
    keyTopics: ["Toll Road & Power Grid Assets", "Mandated Cash Distribution", "Infrastructure Debt"]
  },
  {
    id: "alt_investments",
    number: 11,
    title: "11. Alternative Investments",
    shortName: "Alternative Investments",
    description: "Private Equity, Venture Capital, Private Credit, Hedge Funds, Structured Products, Real Assets & Private Market Funds.",
    iconName: "Layers",
    badge: "Alternative Investments Master",
    keyTopics: ["Private Equity & Venture Capital", "Hedge Fund Strategies", "Private Credit & J-Curve"]
  },
  {
    id: "structured_products",
    number: 12,
    title: "12. Structured Products",
    shortName: "Structured Products",
    description: "Structured Notes, Principal-Protected Products, Market-Linked Debentures (MLDs), Credit-Linked Products & Embedded Derivatives.",
    iconName: "Cpu",
    badge: "Structured Products Engineer",
    keyTopics: ["Market-Linked Debentures", "Principal Protection Floor", "Barrier Derivatives"]
  },
  {
    id: "securitization",
    number: 13,
    title: "13. Securitization",
    shortName: "Securitization",
    description: "Asset-Backed Securities (ABS), Mortgage-Backed Securities (MBS), Collateralized Debt Obligations (CDOs), Senior/Mezzanine/Equity Tranches.",
    iconName: "Layers",
    badge: "Securitization Specialist",
    keyTopics: ["ABS & MBS Asset Pools", "Senior AAA to Equity Tranching", "Credit Enhancement"]
  },
  {
    id: "participants",
    number: 14,
    title: "14. Capital Market Participants",
    shortName: "Participants",
    description: "Retail Investors, HNIs, FIIs/FPIs, DIIs, Mutual Funds, Pension Funds, Insurance, Market Makers, Brokers & Investment Banks.",
    iconName: "TrendingUp",
    badge: "Market Participant Analyst",
    keyTopics: ["FII & DII Capital Flows", "Market Makers & Liquidity", "Pension & Insurance Funds"]
  },
  {
    id: "infrastructure",
    number: 15,
    title: "15. Market Infrastructure",
    shortName: "Market Infrastructure",
    description: "Stock Exchanges (NSE, BSE), Regulators (SEBI, RBI), Depositories (NSDL, CDSL), Clearing Corporations, Dematerialization & Margins.",
    iconName: "ShieldAlert",
    badge: "Infrastructure Architect",
    keyTopics: ["NSE & BSE Order Matching", "SEBI & RBI Regulatory Scope", "NSDL & CDSL Depositories"]
  },
  {
    id: "settlement",
    number: 16,
    title: "16. Settlement & Trading Mechanics",
    shortName: "Settlement & Mechanics",
    description: "T+1 Settlement Cycle, Short Selling, Securities Lending & Borrowing (SLB), Margin Requirements, Collateral & Auction Mechanics.",
    iconName: "Zap",
    badge: "Settlement Operations Master",
    keyTopics: ["T+1 Rolling Settlement", "SLB & Short Selling", "Auction Mechanism"]
  },
  {
    id: "investment_banking",
    number: 17,
    title: "17. Investment Banking",
    shortName: "Investment Banking",
    description: "IPO Underwriting, Book Building, Corporate Valuation, M&A Advisory, Rights Issues, Private Placements & Restructuring.",
    iconName: "BarChart2",
    badge: "Investment Banking Specialist",
    keyTopics: ["IPO Book Building Process", "M&A Valuation Models", "Underwriting Syndicate"]
  },
  {
    id: "credit_markets",
    number: 18,
    title: "18. Credit Markets",
    shortName: "Credit Markets",
    description: "Credit Spreads, Credit Rating Agencies (AAA to D), Default Risk, Recovery Rates, Credit Default Swaps (CDS) & High-Yield Debt.",
    iconName: "ShieldAlert",
    badge: "Credit Risk Specialist",
    keyTopics: ["Credit Rating Spectrum", "Credit Default Swaps (CDS)", "Yield Spreads"]
  },
  {
    id: "macro_interest_rates",
    number: 19,
    title: "19. Interest Rates & Macro Economics",
    shortName: "Interest Rates & Macro",
    description: "Repo Rate, Policy Rates, Inflation, Real vs Nominal Rates, Central Bank Monetary Policy, Yield Curve Inversion & Transmission.",
    iconName: "Activity",
    badge: "Macro Economist",
    keyTopics: ["RBI Repo Rate Policy", "Yield Curve Inversion", "Monetary Policy Transmission"]
  },
  {
    id: "portfolio_mgmt",
    number: 20,
    title: "20. Portfolio Management",
    shortName: "Portfolio Management",
    description: "Asset Allocation, Strategic vs Tactical, Diversification, Correlation, Sharpe / Sortino / Treynor Ratios, Beta, Alpha, Value at Risk (VaR), Rebalancing.",
    iconName: "PieChart",
    badge: "Portfolio Management Master",
    keyTopics: ["Asset Allocation Strategy", "Sharpe & Sortino Ratios", "Value at Risk (VaR)", "Beta & Alpha"]
  },
  {
    id: "global_markets",
    number: 21,
    title: "21. Global Capital Markets",
    shortName: "Global Markets",
    description: "US, Indian, European, Japanese & Chinese Markets. Global Benchmark Indices, Cross-Border Investing, Country Risk & Geopolitical Factors.",
    iconName: "Globe",
    badge: "Global Markets Analyst",
    keyTopics: ["S&P 500 & NIFTY 50", "Cross-Border Capital Flows", "Geopolitical Risk"]
  }
];

// Raw topic titles mapping (500 items)
const TOPIC_TITLES_500: { id: number; level: number; title: string; category: "Fundamentals" | "Technical" | "Risk Management" | "Market Psychology" | "Basics" }[] = [
  // LEVEL 1 (1-50)
  { id: 1, level: 1, title: "What is the stock market?", category: "Basics" },
  { id: 2, level: 1, title: "What is a stock?", category: "Basics" },
  { id: 3, level: 1, title: "What is a share?", category: "Basics" },
  { id: 4, level: 1, title: "What is equity?", category: "Basics" },
  { id: 5, level: 1, title: "Why do companies issue shares?", category: "Basics" },
  { id: 6, level: 1, title: "How companies raise capital", category: "Basics" },
  { id: 7, level: 1, title: "Public vs private companies", category: "Basics" },
  { id: 8, level: 1, title: "What is an IPO?", category: "Basics" },
  { id: 9, level: 1, title: "IPO process", category: "Basics" },
  { id: 10, level: 1, title: "What is an FPO?", category: "Basics" },
  { id: 11, level: 1, title: "What is a stock exchange?", category: "Basics" },
  { id: 12, level: 1, title: "NSE (National Stock Exchange)", category: "Basics" },
  { id: 13, level: 1, title: "BSE (Bombay Stock Exchange)", category: "Basics" },
  { id: 14, level: 1, title: "NYSE", category: "Basics" },
  { id: 15, level: 1, title: "NASDAQ", category: "Basics" },
  { id: 16, level: 1, title: "Primary market", category: "Basics" },
  { id: 17, level: 1, title: "Secondary market", category: "Basics" },
  { id: 18, level: 1, title: "Buyers and sellers", category: "Basics" },
  { id: 19, level: 1, title: "Supply and demand", category: "Basics" },
  { id: 20, level: 1, title: "Stock price", category: "Basics" },
  { id: 21, level: 1, title: "Market capitalization", category: "Basics" },
  { id: 22, level: 1, title: "Large-cap stocks", category: "Basics" },
  { id: 23, level: 1, title: "Mid-cap stocks", category: "Basics" },
  { id: 24, level: 1, title: "Small-cap stocks", category: "Basics" },
  { id: 25, level: 1, title: "Micro-cap stocks", category: "Basics" },
  { id: 26, level: 1, title: "Blue-chip stocks", category: "Basics" },
  { id: 27, level: 1, title: "Growth stocks", category: "Basics" },
  { id: 28, level: 1, title: "Value stocks", category: "Basics" },
  { id: 29, level: 1, title: "Dividend stocks", category: "Basics" },
  { id: 30, level: 1, title: "Penny stocks", category: "Basics" },
  { id: 31, level: 1, title: "Cyclical stocks", category: "Basics" },
  { id: 32, level: 1, title: "Defensive stocks", category: "Basics" },
  { id: 33, level: 1, title: "Sector classification", category: "Basics" },
  { id: 34, level: 1, title: "Industry classification", category: "Basics" },
  { id: 35, level: 1, title: "Benchmark indices", category: "Basics" },
  { id: 36, level: 1, title: "NIFTY 50", category: "Basics" },
  { id: 37, level: 1, title: "Sensex", category: "Basics" },
  { id: 38, level: 1, title: "Index weighting", category: "Basics" },
  { id: 39, level: 1, title: "Free-float market capitalization", category: "Basics" },
  { id: 40, level: 1, title: "Bull market", category: "Basics" },
  { id: 41, level: 1, title: "Bear market", category: "Basics" },
  { id: 42, level: 1, title: "Market correction", category: "Basics" },
  { id: 43, level: 1, title: "Market crash", category: "Basics" },
  { id: 44, level: 1, title: "Market rally", category: "Basics" },
  { id: 45, level: 1, title: "All-time high (ATH)", category: "Basics" },
  { id: 46, level: 1, title: "52-week high", category: "Basics" },
  { id: 47, level: 1, title: "52-week low", category: "Basics" },
  { id: 48, level: 1, title: "Trading volume", category: "Basics" },
  { id: 49, level: 1, title: "Liquidity", category: "Basics" },
  { id: 50, level: 1, title: "Volatility", category: "Basics" },

  // LEVEL 2 (51-100)
  { id: 51, level: 2, title: "Trading account", category: "Basics" },
  { id: 52, level: 2, title: "Demat account", category: "Basics" },
  { id: 53, level: 2, title: "Bank account link", category: "Basics" },
  { id: 54, level: 2, title: "Stock Broker", category: "Basics" },
  { id: 55, level: 2, title: "Depository", category: "Basics" },
  { id: 56, level: 2, title: "NSDL", category: "Basics" },
  { id: 57, level: 2, title: "CDSL", category: "Basics" },
  { id: 58, level: 2, title: "Trading platform", category: "Basics" },
  { id: 59, level: 2, title: "Market timings", category: "Basics" },
  { id: 60, level: 2, title: "Pre-open session", category: "Basics" },
  { id: 61, level: 2, title: "Opening auction", category: "Basics" },
  { id: 62, level: 2, title: "Continuous trading", category: "Basics" },
  { id: 63, level: 2, title: "Closing session", category: "Basics" },
  { id: 64, level: 2, title: "After-market orders (AMO)", category: "Basics" },
  { id: 65, level: 2, title: "Market order", category: "Basics" },
  { id: 66, level: 2, title: "Limit order", category: "Basics" },
  { id: 67, level: 2, title: "Stop-loss order", category: "Basics" },
  { id: 68, level: 2, title: "Stop-limit order", category: "Basics" },
  { id: 69, level: 2, title: "Stop-market order", category: "Basics" },
  { id: 70, level: 2, title: "IOC order (Immediate or Cancel)", category: "Basics" },
  { id: 71, level: 2, title: "GTT order (Good Till Triggered)", category: "Basics" },
  { id: 72, level: 2, title: "AMO order strategy", category: "Basics" },
  { id: 73, level: 2, title: "Bid price", category: "Basics" },
  { id: 74, level: 2, title: "Ask price", category: "Basics" },
  { id: 75, level: 2, title: "Bid-ask spread", category: "Basics" },
  { id: 76, level: 2, title: "Order book", category: "Basics" },
  { id: 77, level: 2, title: "Market depth", category: "Basics" },
  { id: 78, level: 2, title: "Tick size", category: "Basics" },
  { id: 79, level: 2, title: "Lot size", category: "Basics" },
  { id: 80, level: 2, title: "Order matching engine", category: "Basics" },
  { id: 81, level: 2, title: "Trade execution", category: "Basics" },
  { id: 82, level: 2, title: "Slippage", category: "Basics" },
  { id: 83, level: 2, title: "Brokerage charges", category: "Basics" },
  { id: 84, level: 2, title: "Securities Transaction Tax (STT)", category: "Basics" },
  { id: 85, level: 2, title: "Exchange transaction charges", category: "Basics" },
  { id: 86, level: 2, title: "GST on trading fees", category: "Basics" },
  { id: 87, level: 2, title: "SEBI regulatory charges", category: "Basics" },
  { id: 88, level: 2, title: "Stamp duty", category: "Basics" },
  { id: 89, level: 2, title: "Trading turnover", category: "Basics" },
  { id: 90, level: 2, title: "Delivery trading", category: "Basics" },
  { id: 91, level: 2, title: "Intraday trading", category: "Basics" },
  { id: 92, level: 2, title: "CNC product type", category: "Basics" },
  { id: 93, level: 2, title: "MIS product type", category: "Basics" },
  { id: 94, level: 2, title: "Trading Margin", category: "Basics" },
  { id: 95, level: 2, title: "Available margin", category: "Basics" },
  { id: 96, level: 2, title: "Used margin", category: "Basics" },
  { id: 97, level: 2, title: "Leverage mechanics", category: "Basics" },
  { id: 98, level: 2, title: "Position size calculation", category: "Basics" },
  { id: 99, level: 2, title: "Trade confirmation", category: "Basics" },
  { id: 100, level: 2, title: "Contract notes analysis", category: "Basics" },

  // LEVEL 3 (101-150)
  { id: 101, level: 3, title: "Revenue (Top Line)", category: "Fundamentals" },
  { id: 102, level: 3, title: "Sales growth metrics", category: "Fundamentals" },
  { id: 103, level: 3, title: "Gross profit", category: "Fundamentals" },
  { id: 104, level: 3, title: "Operating profit", category: "Fundamentals" },
  { id: 105, level: 3, title: "EBITDA", category: "Fundamentals" },
  { id: 106, level: 3, title: "EBIT", category: "Fundamentals" },
  { id: 107, level: 3, title: "Net profit (Bottom Line)", category: "Fundamentals" },
  { id: 108, level: 3, title: "EPS (Earnings Per Share)", category: "Fundamentals" },
  { id: 109, level: 3, title: "Diluted EPS", category: "Fundamentals" },
  { id: 110, level: 3, title: "Profit margin Analysis", category: "Fundamentals" },
  { id: 111, level: 3, title: "Gross margin", category: "Fundamentals" },
  { id: 112, level: 3, title: "Operating margin", category: "Fundamentals" },
  { id: 113, level: 3, title: "Net margin", category: "Fundamentals" },
  { id: 114, level: 3, title: "Cash flow statement", category: "Fundamentals" },
  { id: 115, level: 3, title: "Operating cash flow (CFO)", category: "Fundamentals" },
  { id: 116, level: 3, title: "Investing cash flow (CFI)", category: "Fundamentals" },
  { id: 117, level: 3, title: "Financing cash flow (CFF)", category: "Fundamentals" },
  { id: 118, level: 3, title: "Free cash flow (FCF)", category: "Fundamentals" },
  { id: 119, level: 3, title: "Balance sheet structure", category: "Fundamentals" },
  { id: 120, level: 3, title: "Assets classification", category: "Fundamentals" },
  { id: 121, level: 3, title: "Liabilities classification", category: "Fundamentals" },
  { id: 122, level: 3, title: "Shareholders' Equity", category: "Fundamentals" },
  { id: 123, level: 3, title: "Current assets", category: "Fundamentals" },
  { id: 124, level: 3, title: "Current liabilities", category: "Fundamentals" },
  { id: 125, level: 3, title: "Working capital", category: "Fundamentals" },
  { id: 126, level: 3, title: "Inventory turnover", category: "Fundamentals" },
  { id: 127, level: 3, title: "Receivables days", category: "Fundamentals" },
  { id: 128, level: 3, title: "Payables days", category: "Fundamentals" },
  { id: 129, level: 3, title: "Cash reserves", category: "Fundamentals" },
  { id: 130, level: 3, title: "Total Corporate Debt", category: "Fundamentals" },
  { id: 131, level: 3, title: "Short-term debt", category: "Fundamentals" },
  { id: 132, level: 3, title: "Long-term debt", category: "Fundamentals" },
  { id: 133, level: 3, title: "Net debt calculation", category: "Fundamentals" },
  { id: 134, level: 3, title: "Debt-to-equity ratio", category: "Fundamentals" },
  { id: 135, level: 3, title: "Interest coverage ratio", category: "Fundamentals" },
  { id: 136, level: 3, title: "Current ratio", category: "Fundamentals" },
  { id: 137, level: 3, title: "Quick ratio", category: "Fundamentals" },
  { id: 138, level: 3, title: "Asset turnover ratio", category: "Fundamentals" },
  { id: 139, level: 3, title: "Return on Equity (ROE)", category: "Fundamentals" },
  { id: 140, level: 3, title: "Return on Assets (ROA)", category: "Fundamentals" },
  { id: 141, level: 3, title: "ROCE (Return on Capital Employed)", category: "Fundamentals" },
  { id: 142, level: 3, title: "Capital employed", category: "Fundamentals" },
  { id: 143, level: 3, title: "Book value per share", category: "Fundamentals" },
  { id: 144, level: 3, title: "Tangible book value", category: "Fundamentals" },
  { id: 145, level: 3, title: "Retained earnings", category: "Fundamentals" },
  { id: 146, level: 3, title: "Goodwill accounting", category: "Fundamentals" },
  { id: 147, level: 3, title: "Intangible assets", category: "Fundamentals" },
  { id: 148, level: 3, title: "Depreciation methods", category: "Fundamentals" },
  { id: 149, level: 3, title: "Amortization", category: "Fundamentals" },
  { id: 150, level: 3, title: "Deferred tax assets & liabilities", category: "Fundamentals" },

  // LEVEL 4 (151-200)
  { id: 151, level: 4, title: "P/E ratio (Price-to-Earnings)", category: "Fundamentals" },
  { id: 152, level: 4, title: "Forward P/E ratio", category: "Fundamentals" },
  { id: 153, level: 4, title: "Trailing P/E ratio", category: "Fundamentals" },
  { id: 154, level: 4, title: "PEG ratio (Price/Earnings to Growth)", category: "Fundamentals" },
  { id: 155, level: 4, title: "P/B ratio (Price-to-Book)", category: "Fundamentals" },
  { id: 156, level: 4, title: "Price-to-sales ratio", category: "Fundamentals" },
  { id: 157, level: 4, title: "Enterprise Value (EV)", category: "Fundamentals" },
  { id: 158, level: 4, title: "EV vs Market Cap", category: "Fundamentals" },
  { id: 159, level: 4, title: "EV/EBITDA multiple", category: "Fundamentals" },
  { id: 160, level: 4, title: "EV/Sales multiple", category: "Fundamentals" },
  { id: 161, level: 4, title: "Dividend yield", category: "Fundamentals" },
  { id: 162, level: 4, title: "Dividend payout ratio", category: "Fundamentals" },
  { id: 163, level: 4, title: "Earnings yield", category: "Fundamentals" },
  { id: 164, level: 4, title: "Free cash flow yield", category: "Fundamentals" },
  { id: 165, level: 4, title: "Intrinsic value calculation", category: "Fundamentals" },
  { id: 166, level: 4, title: "Fair value estimate", category: "Fundamentals" },
  { id: 167, level: 4, title: "Margin of safety (Graham rule)", category: "Fundamentals" },
  { id: 168, level: 4, title: "DCF valuation model", category: "Fundamentals" },
  { id: 169, level: 4, title: "Discount rate selection", category: "Fundamentals" },
  { id: 170, level: 4, title: "WACC calculation", category: "Fundamentals" },
  { id: 171, level: 4, title: "Terminal value calculation", category: "Fundamentals" },
  { id: 172, level: 4, title: "Growth rate assumptions", category: "Fundamentals" },
  { id: 173, level: 4, title: "Present value (PV)", category: "Fundamentals" },
  { id: 174, level: 4, title: "Net present value (NPV)", category: "Fundamentals" },
  { id: 175, level: 4, title: "IRR (Internal Rate of Return)", category: "Fundamentals" },
  { id: 176, level: 4, title: "Comparable-company analysis", category: "Fundamentals" },
  { id: 177, level: 4, title: "Peer valuation benchmarking", category: "Fundamentals" },
  { id: 178, level: 4, title: "Industry valuation multiples", category: "Fundamentals" },
  { id: 179, level: 4, title: "Historical valuation bands", category: "Fundamentals" },
  { id: 180, level: 4, title: "Relative valuation models", category: "Fundamentals" },
  { id: 181, level: 4, title: "Absolute valuation models", category: "Fundamentals" },
  { id: 182, level: 4, title: "PEG-based valuation", category: "Fundamentals" },
  { id: 183, level: 4, title: "Sum-of-the-parts (SOTP) valuation", category: "Fundamentals" },
  { id: 184, level: 4, title: "Asset-based valuation", category: "Fundamentals" },
  { id: 185, level: 4, title: "Dividend discount model (DDM)", category: "Fundamentals" },
  { id: 186, level: 4, title: "Gordon growth model", category: "Fundamentals" },
  { id: 187, level: 4, title: "Earnings quality audit", category: "Fundamentals" },
  { id: 188, level: 4, title: "Revenue quality audit", category: "Fundamentals" },
  { id: 189, level: 4, title: "Cash-flow quality audit", category: "Fundamentals" },
  { id: 190, level: 4, title: "Margin expansion drivers", category: "Fundamentals" },
  { id: 191, level: 4, title: "Operating leverage", category: "Fundamentals" },
  { id: 192, level: 4, title: "Financial leverage", category: "Fundamentals" },
  { id: 193, level: 4, title: "Earnings growth sustainability", category: "Fundamentals" },
  { id: 194, level: 4, title: "EPS growth analysis", category: "Fundamentals" },
  { id: 195, level: 4, title: "Revenue CAGR calculation", category: "Fundamentals" },
  { id: 196, level: 4, title: "Profit CAGR calculation", category: "Fundamentals" },
  { id: 197, level: 4, title: "DuPont ROE analysis", category: "Fundamentals" },
  { id: 198, level: 4, title: "ROCE decomposition analysis", category: "Fundamentals" },
  { id: 199, level: 4, title: "Competitive advantage audit", category: "Fundamentals" },
  { id: 200, level: 4, title: "Economic moat identification", category: "Fundamentals" },

  // LEVEL 5 (201-250)
  { id: 201, level: 5, title: "Business model analysis", category: "Fundamentals" },
  { id: 202, level: 5, title: "Revenue model mechanics", category: "Fundamentals" },
  { id: 203, level: 5, title: "Unit economics", category: "Fundamentals" },
  { id: 204, level: 5, title: "Customer acquisition cost (CAC)", category: "Fundamentals" },
  { id: 205, level: 5, title: "Customer lifetime value (LTV)", category: "Fundamentals" },
  { id: 206, level: 5, title: "Pricing power evaluation", category: "Fundamentals" },
  { id: 207, level: 5, title: "Market share trends", category: "Fundamentals" },
  { id: 208, level: 5, title: "Total addressable market (TAM)", category: "Fundamentals" },
  { id: 209, level: 5, title: "Serviceable market (SAM)", category: "Fundamentals" },
  { id: 210, level: 5, title: "Competitive landscape mapping", category: "Fundamentals" },
  { id: 211, level: 5, title: "Competitor moat analysis", category: "Fundamentals" },
  { id: 212, level: 5, title: "Industry structure (Porter 5 Forces)", category: "Fundamentals" },
  { id: 213, level: 5, title: "Barriers to entry", category: "Fundamentals" },
  { id: 214, level: 5, title: "Network effects moat", category: "Fundamentals" },
  { id: 215, level: 5, title: "Switching costs moat", category: "Fundamentals" },
  { id: 216, level: 5, title: "Brand strength equity", category: "Fundamentals" },
  { id: 217, level: 5, title: "Distribution advantage", category: "Fundamentals" },
  { id: 218, level: 5, title: "Cost advantage moat", category: "Fundamentals" },
  { id: 219, level: 5, title: "Management quality evaluation", category: "Fundamentals" },
  { id: 220, level: 5, title: "Promoter holding percentage", category: "Fundamentals" },
  { id: 221, level: 5, title: "Promoter pledging risks", category: "Fundamentals" },
  { id: 222, level: 5, title: "Institutional ownership (FII/DII)", category: "Fundamentals" },
  { id: 223, level: 5, title: "Insider ownership", category: "Fundamentals" },
  { id: 224, level: 5, title: "Insider buying signals", category: "Fundamentals" },
  { id: 225, level: 5, title: "Insider selling signals", category: "Fundamentals" },
  { id: 226, level: 5, title: "Shareholding pattern analysis", category: "Fundamentals" },
  { id: 227, level: 5, title: "Corporate governance standards", category: "Fundamentals" },
  { id: 228, level: 5, title: "Related-party transactions audit", category: "Fundamentals" },
  { id: 229, level: 5, title: "Auditor reports & qualifications", category: "Fundamentals" },
  { id: 230, level: 5, title: "Reading annual reports (10-K)", category: "Fundamentals" },
  { id: 231, level: 5, title: "Quarterly results analysis", category: "Fundamentals" },
  { id: 232, level: 5, title: "Earnings calls transcripts audit", category: "Fundamentals" },
  { id: 233, level: 5, title: "Investor presentations decode", category: "Fundamentals" },
  { id: 234, level: 5, title: "Management guidance reliability", category: "Fundamentals" },
  { id: 235, level: 5, title: "Order book visibility", category: "Fundamentals" },
  { id: 236, level: 5, title: "Capacity utilization rate", category: "Fundamentals" },
  { id: 237, level: 5, title: "Capital expenditure (Capex)", category: "Fundamentals" },
  { id: 238, level: 5, title: "Expansion plans valuation", category: "Fundamentals" },
  { id: 239, level: 5, title: "Mergers analysis", category: "Fundamentals" },
  { id: 240, level: 5, title: "Acquisitions analysis", category: "Fundamentals" },
  { id: 241, level: 5, title: "Share buybacks signaling", category: "Fundamentals" },
  { id: 242, level: 5, title: "Dividend policy evaluation", category: "Fundamentals" },
  { id: 243, level: 5, title: "Bonus shares impact", category: "Fundamentals" },
  { id: 244, level: 5, title: "Stock splits mechanics", category: "Fundamentals" },
  { id: 245, level: 5, title: "Rights issues dilution", category: "Fundamentals" },
  { id: 246, level: 5, title: "Preferential allotment", category: "Fundamentals" },
  { id: 247, level: 5, title: "Equity dilution risk", category: "Fundamentals" },
  { id: 248, level: 5, title: "ESOPs accounting impact", category: "Fundamentals" },
  { id: 249, level: 5, title: "Corporate actions calendar", category: "Fundamentals" },
  { id: 250, level: 5, title: "Accounting red flags detection", category: "Fundamentals" },

  // LEVEL 6 (251-300)
  { id: 251, level: 6, title: "What is a candlestick?", category: "Technical" },
  { id: 252, level: 6, title: "Open price anatomy", category: "Technical" },
  { id: 253, level: 6, title: "High price anatomy", category: "Technical" },
  { id: 254, level: 6, title: "Low price anatomy", category: "Technical" },
  { id: 255, level: 6, title: "Close price significance", category: "Technical" },
  { id: 256, level: 6, title: "Candle body real range", category: "Technical" },
  { id: 257, level: 6, title: "Upper wick shadow", category: "Technical" },
  { id: 258, level: 6, title: "Lower wick rejection", category: "Technical" },
  { id: 259, level: 6, title: "Bullish candle mechanics", category: "Technical" },
  { id: 260, level: 6, title: "Bearish candle mechanics", category: "Technical" },
  { id: 261, level: 6, title: "Doji candlestick", category: "Technical" },
  { id: 262, level: 6, title: "Spinning top candlestick", category: "Technical" },
  { id: 263, level: 6, title: "Hammer pattern", category: "Technical" },
  { id: 264, level: 6, title: "Inverted hammer pattern", category: "Technical" },
  { id: 265, level: 6, title: "Hanging man pattern", category: "Technical" },
  { id: 266, level: 6, title: "Shooting star pattern", category: "Technical" },
  { id: 267, level: 6, title: "Marubozu candle", category: "Technical" },
  { id: 268, level: 6, title: "Bullish engulfing pattern", category: "Technical" },
  { id: 269, level: 6, title: "Bearish engulfing pattern", category: "Technical" },
  { id: 270, level: 6, title: "Morning star pattern", category: "Technical" },
  { id: 271, level: 6, title: "Evening star pattern", category: "Technical" },
  { id: 272, level: 6, title: "Piercing pattern", category: "Technical" },
  { id: 273, level: 6, title: "Dark cloud cover", category: "Technical" },
  { id: 274, level: 6, title: "Harami pattern (Inside candle)", category: "Technical" },
  { id: 275, level: 6, title: "Inside bar strategy", category: "Technical" },
  { id: 276, level: 6, title: "Outside bar strategy", category: "Technical" },
  { id: 277, level: 6, title: "Pin bar rejection strategy", category: "Technical" },
  { id: 278, level: 6, title: "Tweezer top pattern", category: "Technical" },
  { id: 279, level: 6, title: "Tweezer bottom pattern", category: "Technical" },
  { id: 280, level: 6, title: "Three white soldiers", category: "Technical" },
  { id: 281, level: 6, title: "Three black crows", category: "Technical" },
  { id: 282, level: 6, title: "Candlestick confirmation rules", category: "Technical" },
  { id: 283, level: 6, title: "Candle location context", category: "Technical" },
  { id: 284, level: 6, title: "Price action principles", category: "Technical" },
  { id: 285, level: 6, title: "Market structure basics", category: "Technical" },
  { id: 286, level: 6, title: "Higher highs (HH)", category: "Technical" },
  { id: 287, level: 6, title: "Higher lows (HL)", category: "Technical" },
  { id: 288, level: 6, title: "Lower highs (LH)", category: "Technical" },
  { id: 289, level: 6, title: "Lower lows (LL)", category: "Technical" },
  { id: 290, level: 6, title: "Swing high identification", category: "Technical" },
  { id: 291, level: 6, title: "Swing low identification", category: "Technical" },
  { id: 292, level: 6, title: "Trend identification framework", category: "Technical" },
  { id: 293, level: 6, title: "Uptrend mechanics", category: "Technical" },
  { id: 294, level: 6, title: "Downtrend mechanics", category: "Technical" },
  { id: 295, level: 6, title: "Sideways market dynamics", category: "Technical" },
  { id: 296, level: 6, title: "Consolidation zones", category: "Technical" },
  { id: 297, level: 6, title: "Breakout mechanics", category: "Technical" },
  { id: 298, level: 6, title: "Breakdown mechanics", category: "Technical" },
  { id: 299, level: 6, title: "False breakout identification", category: "Technical" },
  { id: 300, level: 6, title: "Retest & confirmation entry", category: "Technical" },

  // LEVEL 7 (301-350)
  { id: 301, level: 7, title: "Support level demand floor", category: "Technical" },
  { id: 302, level: 7, title: "Resistance level supply ceiling", category: "Technical" },
  { id: 303, level: 7, title: "Dynamic support (Moving averages)", category: "Technical" },
  { id: 304, level: 7, title: "Dynamic resistance", category: "Technical" },
  { id: 305, level: 7, title: "Trendline drawing rules", category: "Technical" },
  { id: 306, level: 7, title: "Channel trading rules", category: "Technical" },
  { id: 307, level: 7, title: "Ascending channel", category: "Technical" },
  { id: 308, level: 7, title: "Descending channel", category: "Technical" },
  { id: 309, level: 7, title: "Horizontal range channel", category: "Technical" },
  { id: 310, level: 7, title: "Chart patterns classification", category: "Technical" },
  { id: 311, level: 7, title: "Double top reversal", category: "Technical" },
  { id: 312, level: 7, title: "Double bottom reversal", category: "Technical" },
  { id: 313, level: 7, title: "Head and shoulders pattern", category: "Technical" },
  { id: 314, level: 7, title: "Inverse head and shoulders", category: "Technical" },
  { id: 315, level: 7, title: "Triple top pattern", category: "Technical" },
  { id: 316, level: 7, title: "Triple bottom pattern", category: "Technical" },
  { id: 317, level: 7, title: "Ascending triangle pattern", category: "Technical" },
  { id: 318, level: 7, title: "Descending triangle pattern", category: "Technical" },
  { id: 319, level: 7, title: "Symmetrical triangle pattern", category: "Technical" },
  { id: 320, level: 7, title: "Rising wedge pattern", category: "Technical" },
  { id: 321, level: 7, title: "Falling wedge pattern", category: "Technical" },
  { id: 322, level: 7, title: "Bullish & Bearish Flag patterns", category: "Technical" },
  { id: 323, level: 7, title: "Pennant continuation pattern", category: "Technical" },
  { id: 324, level: 7, title: "Rectangle pattern breakout", category: "Technical" },
  { id: 325, level: 7, title: "Cup and handle pattern", category: "Technical" },
  { id: 326, level: 7, title: "Rounding bottom accumulation", category: "Technical" },
  { id: 327, level: 7, title: "Gap analysis fundamentals", category: "Technical" },
  { id: 328, level: 7, title: "Breakaway gap", category: "Technical" },
  { id: 329, level: 7, title: "Runaway gap (Measuring gap)", category: "Technical" },
  { id: 330, level: 7, title: "Exhaustion gap", category: "Technical" },
  { id: 331, level: 7, title: "Moving Averages basics", category: "Technical" },
  { id: 332, level: 7, title: "SMA (Simple Moving Average)", category: "Technical" },
  { id: 333, level: 7, title: "EMA (Exponential Moving Average)", category: "Technical" },
  { id: 334, level: 7, title: "WMA (Weighted Moving Average)", category: "Technical" },
  { id: 335, level: 7, title: "20-day moving average (Short trend)", category: "Technical" },
  { id: 336, level: 7, title: "50-day moving average (Medium trend)", category: "Technical" },
  { id: 337, level: 7, title: "100-day moving average", category: "Technical" },
  { id: 338, level: 7, title: "200-day moving average (Long trend)", category: "Technical" },
  { id: 339, level: 7, title: "Moving-average crossover signals", category: "Technical" },
  { id: 340, level: 7, title: "Golden cross bullish signal", category: "Technical" },
  { id: 341, level: 7, title: "Death cross bearish signal", category: "Technical" },
  { id: 342, level: 7, title: "VWAP intraday trading", category: "Technical" },
  { id: 343, level: 7, title: "Anchored VWAP institutional level", category: "Technical" },
  { id: 344, level: 7, title: "RSI momentum oscillator", category: "Technical" },
  { id: 345, level: 7, title: "RSI divergence signals", category: "Technical" },
  { id: 346, level: 7, title: "MACD indicator crossover", category: "Technical" },
  { id: 347, level: 7, title: "MACD histogram momentum", category: "Technical" },
  { id: 348, level: 7, title: "Bollinger Bands volatility", category: "Technical" },
  { id: 349, level: 7, title: "ATR (Average True Range)", category: "Technical" },
  { id: 350, level: 7, title: "ADX trend strength index", category: "Technical" },

  // LEVEL 8 (351-400)
  { id: 351, level: 8, title: "Volume analysis rules", category: "Technical" },
  { id: 352, level: 352, title: "Volume spikes & climaxes", category: "Technical" },
  { id: 353, level: 8, title: "Volume confirmation for breakouts", category: "Technical" },
  { id: 354, level: 8, title: "Volume-price divergence", category: "Technical" },
  { id: 355, level: 8, title: "Volume-price relationship matrix", category: "Technical" },
  { id: 356, level: 8, title: "OBV (On-Balance Volume)", category: "Technical" },
  { id: 357, level: 8, title: "Accumulation / Distribution line", category: "Technical" },
  { id: 358, level: 8, title: "Money Flow Index (MFI)", category: "Technical" },
  { id: 359, level: 8, title: "Chaikin Money Flow (CMF)", category: "Technical" },
  { id: 360, level: 8, title: "Volume profile distribution", category: "Technical" },
  { id: 361, level: 8, title: "Point of Control (POC)", category: "Technical" },
  { id: 362, level: 8, title: "Value Area (VAH & VAL)", category: "Technical" },
  { id: 363, level: 8, title: "Market profile TPO charts", category: "Technical" },
  { id: 364, level: 8, title: "Fibonacci retracements (38.2%, 50%, 61.8%)", category: "Technical" },
  { id: 365, level: 8, title: "Fibonacci extensions (127.2%, 161.8%)", category: "Technical" },
  { id: 366, level: 8, title: "Fibonacci cluster zones", category: "Technical" },
  { id: 367, level: 8, title: "Fibonacci confluence trading", category: "Technical" },
  { id: 368, level: 8, title: "Pivot points trading", category: "Technical" },
  { id: 369, level: 8, title: "Classic floor pivots", category: "Technical" },
  { id: 370, level: 8, title: "Fibonacci pivot points", category: "Technical" },
  { id: 371, level: 8, title: "Camarilla pivots for intraday", category: "Technical" },
  { id: 372, level: 8, title: "Standard deviation bands", category: "Technical" },
  { id: 373, level: 8, title: "Bollinger Band squeeze setup", category: "Technical" },
  { id: 374, level: 8, title: "Volatility breakout strategy", category: "Technical" },
  { id: 375, level: 8, title: "Momentum indicators suite", category: "Technical" },
  { id: 376, level: 8, title: "Rate of Change (ROC)", category: "Technical" },
  { id: 377, level: 8, title: "Stochastic oscillator %K %D", category: "Technical" },
  { id: 378, level: 8, title: "Williams %R momentum", category: "Technical" },
  { id: 379, level: 8, title: "CCI (Commodity Channel Index)", category: "Technical" },
  { id: 380, level: 8, title: "Aroon indicator trend age", category: "Technical" },
  { id: 381, level: 8, title: "Ichimoku Cloud components", category: "Technical" },
  { id: 382, level: 8, title: "Tenkan-sen conversion line", category: "Technical" },
  { id: 383, level: 8, title: "Kijun-sen baseline", category: "Technical" },
  { id: 384, level: 8, title: "Senkou Span A & B Cloud boundary", category: "Technical" },
  { id: 385, level: 8, title: "Chikou Span lagging line", category: "Technical" },
  { id: 386, level: 8, title: "Parabolic SAR trailing stop", category: "Technical" },
  { id: 387, level: 8, title: "Supertrend indicator strategy", category: "Technical" },
  { id: 388, level: 8, title: "Donchian channels breakout", category: "Technical" },
  { id: 389, level: 8, title: "Keltner channels ATR band", category: "Technical" },
  { id: 390, level: 8, title: "DMI Directional Movement Index", category: "Technical" },
  { id: 391, level: 8, title: "+DI Directional Indicator", category: "Technical" },
  { id: 392, level: 8, title: "-DI Directional Indicator", category: "Technical" },
  { id: 393, level: 8, title: "ADX trend strength rating", category: "Technical" },
  { id: 394, level: 8, title: "Indicator confluence matrix", category: "Technical" },
  { id: 395, level: 8, title: "Leading indicators vs Lagging", category: "Technical" },
  { id: 396, level: 8, title: "Lagging indicator trend confirmation", category: "Technical" },
  { id: 397, level: 8, title: "Overbought zone strategies", category: "Technical" },
  { id: 398, level: 8, title: "Oversold zone strategies", category: "Technical" },
  { id: 399, level: 8, title: "Regular divergence trading", category: "Technical" },
  { id: 400, level: 8, title: "Hidden divergence trend continuation", category: "Technical" },

  // LEVEL 9 (401-450)
  { id: 401, level: 9, title: "Trend following system", category: "Risk Management" },
  { id: 402, level: 9, title: "Momentum trading model", category: "Risk Management" },
  { id: 403, level: 9, title: "Mean reversion system", category: "Risk Management" },
  { id: 404, level: 9, title: "Breakout trading model", category: "Risk Management" },
  { id: 405, level: 9, title: "Pullback & retest strategy", category: "Risk Management" },
  { id: 406, level: 9, title: "Swing trading playbook", category: "Risk Management" },
  { id: 407, level: 9, title: "Position trading playbook", category: "Risk Management" },
  { id: 408, level: 9, title: "Intraday trading playbook", category: "Risk Management" },
  { id: 409, level: 9, title: "Scalping mechanics", category: "Risk Management" },
  { id: 410, level: 9, title: "Gap trading playbook", category: "Risk Management" },
  { id: 411, level: 9, title: "Opening-range breakout (ORB)", category: "Risk Management" },
  { id: 412, level: 9, title: "VWAP institutional strategy", category: "Risk Management" },
  { id: 413, level: 9, title: "Moving-average crossover strategy", category: "Risk Management" },
  { id: 414, level: 9, title: "RSI momentum strategy", category: "Risk Management" },
  { id: 415, level: 9, title: "MACD zero-line strategy", category: "Risk Management" },
  { id: 416, level: 9, title: "Bollinger Band squeeze strategy", category: "Risk Management" },
  { id: 417, level: 9, title: "Support-resistance flip strategy", category: "Risk Management" },
  { id: 418, level: 9, title: "Trendline breakout strategy", category: "Risk Management" },
  { id: 419, level: 9, title: "Breakout-retest entry rules", category: "Risk Management" },
  { id: 420, level: 9, title: "Volume breakout confirmation", category: "Risk Management" },
  { id: 421, level: 9, title: "Relative-strength stock selection", category: "Risk Management" },
  { id: 422, level: 9, title: "Sector rotation strategy", category: "Risk Management" },
  { id: 423, level: 9, title: "Pairs trading market neutral", category: "Risk Management" },
  { id: 424, level: 9, title: "Statistical arbitrage model", category: "Risk Management" },
  { id: 425, level: 9, title: "Event-driven trading strategy", category: "Risk Management" },
  { id: 426, level: 9, title: "Earnings release strategy", category: "Risk Management" },
  { id: 427, level: 9, title: "News-based momentum trading", category: "Risk Management" },
  { id: 428, level: 9, title: "Dividend capture strategy", category: "Risk Management" },
  { id: 429, level: 9, title: "Value investing philosophy", category: "Risk Management" },
  { id: 430, level: 9, title: "Growth investing philosophy", category: "Risk Management" },
  { id: 431, level: 9, title: "GARP (Growth at Reasonable Price)", category: "Risk Management" },
  { id: 432, level: 9, title: "Quality factor investing", category: "Risk Management" },
  { id: 433, level: 9, title: "Momentum factor investing", category: "Risk Management" },
  { id: 434, level: 9, title: "Multi-factor quantitative investing", category: "Risk Management" },
  { id: 435, level: 9, title: "Contrarian investing strategy", category: "Risk Management" },
  { id: 436, level: 9, title: "Index fund investing strategy", category: "Risk Management" },
  { id: 437, level: 9, title: "ETF asset allocation model", category: "Risk Management" },
  { id: 438, level: 9, title: "Passive investing playbook", category: "Risk Management" },
  { id: 439, level: 9, title: "Active alpha investing playbook", category: "Risk Management" },
  { id: 440, level: 9, title: "Core-satellite portfolio structure", category: "Risk Management" },
  { id: 441, level: 9, title: "Dollar-cost averaging (DCA)", category: "Risk Management" },
  { id: 442, level: 9, title: "Value averaging strategy", category: "Risk Management" },
  { id: 443, level: 9, title: "Position pyramiding scaling up", category: "Risk Management" },
  { id: 444, level: 9, title: "Scaling into positions", category: "Risk Management" },
  { id: 445, level: 9, title: "Scaling out profit targets", category: "Risk Management" },
  { id: 446, level: 9, title: "Trailing stop-loss algorithms", category: "Risk Management" },
  { id: 447, level: 9, title: "Risk-reward asymmetry strategy", category: "Risk Management" },
  { id: 448, level: 9, title: "Multi-timeframe trend alignment", category: "Risk Management" },
  { id: 449, level: 9, title: "Strategy confluence scoring", category: "Risk Management" },
  { id: 450, level: 9, title: "Trading system design blueprint", category: "Risk Management" },

  // LEVEL 10 (451-500)
  { id: 451, level: 10, title: "Trading risk taxonomy", category: "Market Psychology" },
  { id: 452, level: 10, title: "Investment risk taxonomy", category: "Market Psychology" },
  { id: 453, level: 10, title: "Market risk quantification", category: "Market Psychology" },
  { id: 454, level: 10, title: "Systematic risk (Beta)", category: "Market Psychology" },
  { id: 455, level: 10, title: "Unsystematic risk (Alpha)", category: "Market Psychology" },
  { id: 456, level: 10, title: "Credit & default risk", category: "Market Psychology" },
  { id: 457, level: 10, title: "Liquidity risk & bid-ask drag", category: "Market Psychology" },
  { id: 458, level: 10, title: "Event risk & gap risk", category: "Market Psychology" },
  { id: 459, level: 10, title: "Execution risk & order routing", category: "Market Psychology" },
  { id: 460, level: 10, title: "Model risk & overfitting", category: "Market Psychology" },
  { id: 461, level: 10, title: "Position sizing mathematics", category: "Market Psychology" },
  { id: 462, level: 10, title: "Fixed percentage risk model (1% rule)", category: "Market Psychology" },
  { id: 463, level: 10, title: "Risk per trade allocation", category: "Market Psychology" },
  { id: 464, level: 10, title: "Stop-loss placement mathematics", category: "Market Psychology" },
  { id: 465, level: 10, title: "Target placement optimization", category: "Market Psychology" },
  { id: 466, level: 10, title: "Risk/Reward ratio minimums", category: "Market Psychology" },
  { id: 467, level: 10, title: "Expected Value (EV) per trade", category: "Market Psychology" },
  { id: 468, level: 10, title: "Probability of winning math", category: "Market Psychology" },
  { id: 469, level: 10, title: "Win rate vs Payoff ratio", category: "Market Psychology" },
  { id: 470, level: 10, title: "Average win calculation", category: "Market Psychology" },
  { id: 471, level: 10, title: "Average loss calculation", category: "Market Psychology" },
  { id: 472, level: 10, title: "Profit Factor metric (>1.5)", category: "Market Psychology" },
  { id: 473, level: 10, title: "Maximum drawdown (MDD) control", category: "Market Psychology" },
  { id: 474, level: 10, title: "Recovery factor calculation", category: "Market Psychology" },
  { id: 475, level: 10, title: "Sharpe ratio risk-adjusted return", category: "Market Psychology" },
  { id: 476, level: 10, title: "Sortino ratio downside risk", category: "Market Psychology" },
  { id: 477, level: 10, title: "Calmar ratio drawdown return", category: "Market Psychology" },
  { id: 478, level: 10, title: "Portfolio volatility standard deviation", category: "Market Psychology" },
  { id: 479, level: 10, title: "Asset correlation matrix", category: "Market Psychology" },
  { id: 480, level: 10, title: "Beta coefficient sensitivity", category: "Market Psychology" },
  { id: 481, level: 10, title: "Alpha generation measurement", category: "Market Psychology" },
  { id: 482, level: 10, title: "Portfolio diversification mathematics", category: "Market Psychology" },
  { id: 483, level: 10, title: "Asset allocation strategies", category: "Market Psychology" },
  { id: 484, level: 10, title: "Portfolio rebalancing protocols", category: "Market Psychology" },
  { id: 485, level: 10, title: "Concentration risk mitigation", category: "Market Psychology" },
  { id: 486, level: 10, title: "Leverage risk management", category: "Market Psychology" },
  { id: 487, level: 10, title: "Margin call protection", category: "Market Psychology" },
  { id: 488, level: 10, title: "Overtrading prevention rules", category: "Market Psychology" },
  { id: 489, level: 10, title: "Revenge trading psychological cure", category: "Market Psychology" },
  { id: 490, level: 10, title: "FOMO (Fear Of Missing Out) control", category: "Market Psychology" },
  { id: 491, level: 10, title: "Fear and Greed index application", category: "Market Psychology" },
  { id: 492, level: 10, title: "Confirmation bias elimination", category: "Market Psychology" },
  { id: 493, level: 10, title: "Loss aversion psychology", category: "Market Psychology" },
  { id: 494, level: 10, title: "Recency bias correction", category: "Market Psychology" },
  { id: 495, level: 10, title: "Overconfidence bias correction", category: "Market Psychology" },
  { id: 496, level: 10, title: "Trading journal audit system", category: "Market Psychology" },
  { id: 497, level: 10, title: "Quantitative backtesting framework", category: "Market Psychology" },
  { id: 498, level: 10, title: "Forward testing & paper trading", category: "Market Psychology" },
  { id: 499, level: 10, title: "Strategy parameter optimization", category: "Market Psychology" },
  { id: 500, level: 10, title: "Building a complete professional trading system", category: "Market Psychology" }
];

// Helper to generate full rich Topic object for any of the 500 topics
export function generate500Topic(idNumber: number): Topic {
  const meta = TOPIC_TITLES_500.find(t => t.id === idNumber) || TOPIC_TITLES_500[0];
  const lvlInfo = MASTER_LEVELS.find(m => m.level === meta.level) || MASTER_LEVELS[0];
  
  const moduleNum = Math.ceil(meta.id / 10);
  const moduleName = `Module ${moduleNum}: ${lvlInfo.badge}`;

  // Tailored multi-paragraph content generator for all 500 topics
  let eli5Content = "";
  let simpleContent = "";
  let professionalContent = "";
  let realMarketExample = "";

  if (meta.level === 1) {
    eli5Content = `Imagine a giant marketplace where people buy and sell small pieces of companies, like buying slices of a giant pizza! When you own a slice (a share), you become a tiny co-owner of the business.\n\nIn "${meta.title}", we explore how this marketplace works. If the company sells more pizza and grows bigger, your slice becomes worth more money! If fewer people like the pizza, the price of your slice drops. Learning "${meta.title}" helps you understand how stock prices move and how investors build wealth over time.`;
    simpleContent = `"${meta.title}" is a foundational concept in Level 1 (${lvlInfo.title}). In equity markets, stocks represent fractional ownership in public corporations listed on recognized stock exchanges such as the NSE, BSE, NYSE, and NASDAQ.\n\nWhen evaluating "${meta.title}", market participants analyze supply and demand dynamics, market capitalization tiers (Large-cap, Mid-cap, Small-cap), and benchmark index tracking (NIFTY 50, Sensex). Understanding this topic enables investors to navigate equity markets with confidence and clarity.`;
    professionalContent = `In institutional capital markets, "${meta.title}" serves as a primary variable within primary market capital formation, secondary market liquidity provisioning, and index construction methodologies.\n\nFrom a market microstructure perspective, "${meta.title}" governs the interaction between limit order books, market makers, matching engines, and clearing corporations. Institutional fund managers evaluate asset class risk premia, free-float market cap weighting, and systemic beta sensitivity when allocating capital across equities.`;
    realMarketExample = `Real Market Case: Consider blue-chip equities like Reliance Industries or TCS on the NSE. Understanding "${meta.title}" helps investors evaluate how quarterly earnings results, institutional buying (FII/DII), and macroeconomic indicators drive daily trading volumes and price valuation.`;
  } else if (meta.level === 2) {
    eli5Content = `Think of trading like placing an order at your favorite online store. When you buy something, you need an address (your Demat account) where items are stored safely, and a shopping cart (your Trading account) to pay for them!\n\n"${meta.title}" explains the exact buttons you press when trading. You can choose to buy immediately at whatever price the seller wants (Market Order) or set a secret target price where you'll only buy if the item gets cheaper (Limit Order).`;
    simpleContent = `"${meta.title}" details trade execution and order book mechanics in Level 2 (${lvlInfo.title}). To trade listed securities, retail investors connect bank accounts with Demat and Trading accounts maintained through brokers registered with depositories like NSDL and CDSL.\n\nKey execution features include Limit, Market, Stop-Loss (SL), and Good-Till-Triggered (GTT) orders. Traders must account for order depth, bid-ask spreads, tick sizes, slippage, and statutory charges including STT, SEBI turnover fees, GST, and stamp duty.`;
    professionalContent = `In quantitative trading and high-frequency execution, "${meta.title}" directly influences execution quality, transaction cost analysis (TCA), and order routing architecture.\n\nExecution algorithms (VWAP, TWAP, Implementation Shortfall) continuously optimize order placement against order book depth, queue priority, and market impact costs. Understanding statutory charge structures and margin requirements (Intraday MIS vs Delivery CNC) is essential for net risk-adjusted returns.`;
    realMarketExample = `Real Market Case: An intraday trader executing a Limit order on HDFC Bank during market open uses order book depth to minimize slippage. By attaching a Stop-Loss order (SL), the trader enforces pre-defined risk boundaries before market volatility triggers order sweeps.`;
  } else if (meta.level <= 5) {
    eli5Content = `Imagine you want to buy a lemonade stand from a friend. You wouldn't just guess a price—you'd look at their notebook to see how many cups of lemonade they sold, how much lemons cost, and if they owe money to anyone!\n\n"${meta.title}" is like checking a company's report card. It tells you whether the business is actually making real profit or just pretending to be rich, so you never pay ₹1,000 for a stand worth only ₹100!`;
    simpleContent = `"${meta.title}" is a cornerstone of Fundamental Analysis and Corporate Valuation (${lvlInfo.title}). Fundamental investors evaluate core financial statements: the Income Statement (Revenue, EBITDA, Net Profit, EPS), Balance Sheet (Assets, Liabilities, Debt ratios), and Cash Flow Statement (CFO, CFI, Free Cash Flow).\n\nValuation approaches utilize key metrics including P/E, PEG, P/B, EV/EBITDA, ROCE, and ROE. Advanced valuation frameworks apply Discounted Cash Flow (DCF), Margin of Safety, DuPont Analysis, and competitive moat evaluation.`;
    professionalContent = `In equity research and corporate governance analysis, "${meta.title}" represents a critical quantitative input within DCF valuation, peer benchmarking, capital allocation efficiency, and forensic accounting audits.\n\nFinancial analysts assess earnings quality by reconciling Net Income with Cash Flow from Operations (CFO/PAT ratio), monitoring promoter pledging levels, current ratios, and auditing related-party transactions to detect potential accounting red flags.`;
    realMarketExample = `Real Market Case: Analyzing quarterly earnings reports of Infosys or Bharti Airtel using "${meta.title}" allows analysts to evaluate revenue growth rates, operating margin trends, and ROCE before deciding long-term investment allocation.`;
  } else if (meta.level <= 8) {
    eli5Content = `Think of a stock chart like a tug-of-war game between two teams: Green (Buyers) and Red (Sellers)!\n\nEach candle on the chart tells the story of who won the tug-of-war over 5 minutes or 1 day. "${meta.title}" shows you special footprints on the chart—like when Sellers pushed hard, but Buyers suddenly charged in and dragged the rope all the way back up!`;
    simpleContent = `"${meta.title}" is a key Technical Analysis tool in Level ${meta.level} (${lvlInfo.title}). Technical traders study price action on Japanese candlestick charts, identifying individual patterns (Doji, Hammer, Engulfing) and structural formations (Head & Shoulders, Triangles, Channels).\n\nTechnical frameworks integrate Support & Resistance, Market Structure (Higher Highs, Higher Lows), Exponential Moving Averages (20/50/200 EMA), VWAP, RSI momentum, MACD divergence, Volume Profile (Point of Control), and Fibonacci levels.`;
    professionalContent = `In quantitative technical analysis, "${meta.title}" provides structural market context and statistical probability distribution for entry and exit execution.\n\nSystematic chartists evaluate volume-weighted price distribution, institutional order blocks, liquidity sweeps, fair value gaps (FVG), indicator confluence, and volatility bands (Bollinger Bands, ATR) to construct mechanical trading systems.`;
    realMarketExample = `Real Market Case: On a 15-minute NIFTY 50 chart, a Bullish Engulfing pattern forming at the 200-period EMA support with expanding volume at the Point of Control provides a high-probability technical entry setup.`;
  } else {
    eli5Content = `Imagine playing a video game where you start with 100 health points. If you charge into every battle without a shield, you'll lose all your points in 10 seconds!\n\n"${meta.title}" is your ultimate strategy shield. It teaches you to bet only 1 or 2 health points per round, so even if you lose 5 times in a row, you still have 90 health left to win the game!`;
    simpleContent = `"${meta.title}" focuses on trading strategy formulation, risk management, and market psychology (${lvlInfo.title}). Professional trading demands disciplined position sizing (1% risk per trade), predefined Risk-to-Reward ratios (minimum 1:2 or 1:3), Stop-Loss rules, and Expected Value (EV) calculation.\n\nKey metrics include Win Rate vs Payoff Ratio, Profit Factor (>1.5), Maximum Drawdown (MDD) limits, Sharpe Ratio, Portfolio Beta, and Alpha generation. Controlling psychological traps like FOMO, revenge trading, and loss aversion is essential for consistency.`;
    professionalContent = `In professional portfolio management and systematic trading, "${meta.title}" serves as a primary risk parameter for capital preservation and drawdown control.\n\nPortfolio managers apply Kelly Criterion sizing, Monte Carlo simulations, historical stress testing, downside deviation metrics (Sortino), asset correlation matrices, and automated execution algorithms to maintain positive mathematical expectancy.`;
    realMarketExample = `Real Market Case: A systematic swing trader targeting a 1:3 Risk-to-Reward on ICICI Bank risks ₹5,000 per trade with a strict Stop-Loss. By adhering to position sizing math for "${meta.title}", the trader maintains profitability even with a 45% win rate over 100 trades.`;
  }

  return {
    id: `topic-500-${meta.id}`,
    topicNumber: meta.id,
    level: meta.level,
    levelTitle: lvlInfo.title,
    moduleName,
    title: `Topic ${meta.id}: ${meta.title}`,
    description: `Complete guide to ${meta.title} with ELI5 breakdown, real-market case study, and 90% passing threshold test.`,
    estimatedTimeMinutes: 8,
    unlocked: meta.id === 1,
    completed: false,
    lessons: [
      {
        id: `les-500-${meta.id}-1`,
        topicId: `topic-500-${meta.id}`,
        title: `Core Principles of ${meta.title}`,
        contentELI5: eli5Content,
        contentSimple: simpleContent,
        contentProfessional: professionalContent,
        realMarketExample,
        keyTakeaways: [
          `Mastering ${meta.title} provides a statistical edge in trading and investing.`,
          `Always verify market context and volume confirmation before applying ${meta.title} rules.`,
          `Combine ${meta.title} with strict risk management (1% risk per trade rule).`
        ],
        socraticQuestions: [
          {
            question: `What is the primary objective of understanding '${meta.title}' in stock market analysis?`,
            options: [
              "To eliminate all market risk completely",
              `To make informed, data-driven decisions regarding ${meta.title}`,
              "To guarantee 100% daily returns",
              "To avoid using stop-loss orders"
            ],
            correctIndex: 1,
            explanation: `Understanding ${meta.title} enables structured, probability-based decision-making.`
          },
          {
            question: `How should '${meta.title}' be integrated into your overall market approach?`,
            options: [
              "As a standalone rule ignoring all other factors",
              "Combined with overall market trend, risk parameters, and volume confirmation",
              "Only during market crashes",
              "By taking maximum leverage on every trade"
            ],
            correctIndex: 1,
            explanation: "Confluence between multiple factors (trend, volume, risk control) creates high-probability trade setups."
          }
        ]
      }
    ],
    topicTest: [
      {
        id: `q-500-${meta.id}-1`,
        topicCategory: meta.category,
        question: `When applying '${meta.title}', which factor is most crucial for disciplined execution?`,
        type: "mcq",
        options: [
          "Ignoring risk management rules",
          "Setting a defined risk-to-reward ratio and adhering to systematic entry/exit criteria",
          "Trading based on rumors and unverified tips",
          "Using maximum leverage without stop-loss"
        ],
        correctIndex: 1,
        explanation: "Disciplined execution requires predefined risk parameters, clear targets, and stop-loss rules.",
        difficulty: meta.level <= 3 ? "Beginner" : meta.level <= 7 ? "Intermediate" : "Advanced"
      },
      {
        id: `q-500-${meta.id}-2`,
        topicCategory: meta.category,
        question: `True or False: '${meta.title}' should always be combined with overall market trend and volume confirmation.`,
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True. Combining individual signals with market context and volume confirmation dramatically increases trade accuracy.",
        difficulty: meta.level <= 3 ? "Beginner" : meta.level <= 7 ? "Intermediate" : "Advanced"
      },
      {
        id: `q-500-${meta.id}-3`,
        topicCategory: meta.category,
        question: `Scenario: Market volatility spikes while analyzing '${meta.title}'. What is the professional risk-management protocol?`,
        type: "scenario",
        options: [
          "Increase position size 5x to recover losses quickly",
          "Reduce position size and adjust stop-loss parameters to maintain fixed monetary risk",
          "Cancel all stop-losses",
          "Exit all trades randomly"
        ],
        correctIndex: 1,
        explanation: "In high volatility, position sizing must be scaled down to maintain constant monetary risk exposure.",
        difficulty: "Advanced"
      },
      {
        id: `q-500-${meta.id}-4`,
        topicCategory: meta.category,
        question: `Calculation: If a trader risks ₹1,000 using '${meta.title}' with a 1:3 Risk/Reward ratio, what is the profit target?`,
        type: "calculation",
        options: ["₹1,000", "₹2,000", "₹3,000", "₹5,000"],
        correctIndex: 2,
        explanation: "1:3 Risk/Reward means for ₹1,000 risk, the target profit is 3 × ₹1,000 = ₹3,000.",
        difficulty: meta.level <= 3 ? "Beginner" : meta.level <= 7 ? "Intermediate" : "Advanced"
      }
    ],
    caseStudy: {
      companyOrChart: `NSE Stock Case Study: ${meta.title}`,
      scenario: `The stock is currently consolidating near a key technical level while testing ${meta.title}. Volume is expanding and institutional accumulation is evident. What is your trade decision?`,
      options: ["BUY", "HOLD", "SELL"],
      correctOption: "BUY",
      explanation: "Expanding volume near a consolidation breakout with institutional accumulation favors a high-probability BUY entry."
    }
  };
}

// Full 500 Topics Array
export const ALL_500_TOPICS: Topic[] = TOPIC_TITLES_500.map(t => generate500Topic(t.id));

// Detailed category-by-category topic structure covering all 21 Capital Market categories
export const CAPITAL_MARKET_CATEGORY_TOPICS: Record<string, { title: string; difficulty: "Beginner" | "Intermediate" | "Advanced" | "Professional" }[]> = {
  equities: [
    { title: "Common stocks & Equity ownership", difficulty: "Beginner" },
    { title: "Preferred stocks & Cumulative dividends", difficulty: "Beginner" },
    { title: "Market Cap Tiers: Large-cap, Mid-cap & Small-cap", difficulty: "Beginner" },
    { title: "Growth stocks vs Value stocks philosophy", difficulty: "Intermediate" },
    { title: "Dividend yield & Dividend payout ratio", difficulty: "Beginner" },
    { title: "Blue-chip stocks & Market leadership", difficulty: "Beginner" },
    { title: "Penny stocks risk & Liquidity traps", difficulty: "Intermediate" },
    { title: "IPOs (Initial Public Offerings) & DRHP filings", difficulty: "Intermediate" },
    { title: "FPOs (Follow-on Public Offerings)", difficulty: "Intermediate" },
    { title: "Rights issues & Shareholder dilution", difficulty: "Intermediate" },
    { title: "Bonus shares & Reserve capitalization", difficulty: "Beginner" },
    { title: "Stock splits & Liquidity enhancement", difficulty: "Beginner" },
    { title: "Share buybacks & Earnings Per Share (EPS) boost", difficulty: "Advanced" },
    { title: "ESOPs (Employee Stock Option Plans)", difficulty: "Intermediate" },
    { title: "ADRs (American Depositary Receipts) & GDRs", difficulty: "Advanced" }
  ],
  bonds: [
    { title: "Government Bonds & G-Sec sovereign backing", difficulty: "Beginner" },
    { title: "Corporate Debt & Credit spread over benchmark", difficulty: "Intermediate" },
    { title: "Treasury Bills (T-Bills) & Discount pricing", difficulty: "Beginner" },
    { title: "Municipal Bonds & Infrastructure financing", difficulty: "Intermediate" },
    { title: "Zero-Coupon Bonds & Deep discount math", difficulty: "Intermediate" },
    { title: "Coupon Bonds & Fixed vs Floating rates", difficulty: "Beginner" },
    { title: "Convertible Bonds & Equity upside participation", difficulty: "Advanced" },
    { title: "Callable vs Puttable Bonds embedded options", difficulty: "Advanced" },
    { title: "Green Bonds & ESG Debt capital raising", difficulty: "Intermediate" },
    { title: "Inflation-Linked Bonds (ILBs) CPI adjustment", difficulty: "Advanced" },
    { title: "High-Yield Junk Bonds vs Investment Grade", difficulty: "Intermediate" },
    { title: "Perpetual Bonds & Tier-1 Capital instruments", difficulty: "Professional" },
    { title: "Bond Pricing Math: Face Value, Coupon & Yield", difficulty: "Intermediate" },
    { title: "Yield to Maturity (YTM) calculation formula", difficulty: "Advanced" },
    { title: "Macaulay Duration & Modified Duration sensitivity", difficulty: "Advanced" },
    { title: "Bond Convexity & Non-linear price changes", difficulty: "Professional" },
    { title: "Bond Price-Yield Inverse Relationship", difficulty: "Intermediate" },
    { title: "Yield Curve Shapes: Normal, Inverted & Flat", difficulty: "Advanced" }
  ],
  etfs: [
    { title: "What is an ETF? Structure vs Mutual Funds", difficulty: "Beginner" },
    { title: "Equity & Broad Index ETFs (NIFTY 50, S&P 500)", difficulty: "Beginner" },
    { title: "Sector & Thematic ETFs (IT, Banking, Pharma)", difficulty: "Intermediate" },
    { title: "Bond & Target-Maturity Debt ETFs", difficulty: "Intermediate" },
    { title: "Gold & Silver Commodity ETFs", difficulty: "Beginner" },
    { title: "International & Cross-Border ETFs", difficulty: "Intermediate" },
    { title: "Smart-Beta & Factor ETFs (Value, Momentum, Low-Vol)", difficulty: "Advanced" },
    { title: "Inverse & Leveraged ETFs decay risk", difficulty: "Professional" },
    { title: "ETF NAV vs Market Trading Price", difficulty: "Intermediate" },
    { title: "Tracking Error & Tracking Difference drag", difficulty: "Intermediate" },
    { title: "Expense Ratio & Low-Cost Index Advantage", difficulty: "Beginner" },
    { title: "ETF Creation/Redemption Mechanism via APs", difficulty: "Advanced" },
    { title: "ETF Arbitrage keeping Price near NAV", difficulty: "Advanced" },
    { title: "ETF Premium and Discount dynamics", difficulty: "Intermediate" }
  ],
  mutual_funds: [
    { title: "What is a Mutual Fund? AMC Structure & Trustee Role", difficulty: "Beginner" },
    { title: "Equity Funds: Large, Mid, Small, Flexi & Multi-Cap", difficulty: "Beginner" },
    { title: "Debt Funds: Liquid, Money-Market, Gilt & Short Duration", difficulty: "Intermediate" },
    { title: "Hybrid Funds: Balanced Advantage & Arbitrage", difficulty: "Intermediate" },
    { title: "Index Funds & Passive Investing Blueprint", difficulty: "Beginner" },
    { title: "ELSS (Tax Saving Mutual Funds under Sec 80C)", difficulty: "Beginner" },
    { title: "Mutual Fund NAV (Net Asset Value) calculation", difficulty: "Beginner" },
    { title: "Expense Ratio (TER) & Exit Load fee friction", difficulty: "Intermediate" },
    { title: "AUM (Assets Under Management) scale effects", difficulty: "Intermediate" },
    { title: "SIP (Systematic Investment Plan) compounding math", difficulty: "Beginner" },
    { title: "SWP (Systematic Withdrawal Plan) cash flow strategy", difficulty: "Intermediate" },
    { title: "STP (Systematic Transfer Plan) dollar-cost strategy", difficulty: "Intermediate" },
    { title: "Direct vs Regular Plans compounding returns gap", difficulty: "Beginner" },
    { title: "Growth Option vs IDCW (Income Distribution) Option", difficulty: "Beginner" },
    { title: "Active Fund Managers vs Passive Indexing performance", difficulty: "Intermediate" }
  ],
  derivatives: [
    { title: "Futures Contracts: Expiry, Lot Size & Underlyings", difficulty: "Intermediate" },
    { title: "Futures Pricing & Cost-of-Carry Model", difficulty: "Advanced" },
    { title: "Initial Margin, Maintenance Margin & MTM Mark-to-Market", difficulty: "Advanced" },
    { title: "Futures Contango vs Backwardation term structure", difficulty: "Advanced" },
    { title: "Futures Hedging for Portfolio Risk Protection", difficulty: "Advanced" },
    { title: "Call & Put Options fundamental payoff curves", difficulty: "Intermediate" },
    { title: "Strike Price, Premium, ITM, ATM & OTM moneyness", difficulty: "Intermediate" },
    { title: "Intrinsic Value vs Time Value Option decay", difficulty: "Intermediate" },
    { title: "Option Chain Matrix, Open Interest (OI) & PCR Ratio", difficulty: "Advanced" },
    { title: "Option Greek Delta: Price sensitivity & Hedge Ratio", difficulty: "Advanced" },
    { title: "Option Greek Gamma: Delta acceleration math", difficulty: "Professional" },
    { title: "Option Greek Theta: Time decay curve & Weekend effect", difficulty: "Advanced" },
    { title: "Option Greek Vega: Implied Volatility sensitivity", difficulty: "Advanced" },
    { title: "Option Greek Rho: Interest rate sensitivity", difficulty: "Professional" },
    { title: "Implied Volatility (IV), Volatility Smile & Skew", difficulty: "Professional" },
    { title: "IV Rank, IV Percentile & Earnings IV Crush", difficulty: "Advanced" },
    { title: "Covered Call & Protective Put strategies", difficulty: "Intermediate" },
    { title: "Bull Call Spread & Bear Put Spread vertical rules", difficulty: "Advanced" },
    { title: "Iron Condor & Iron Butterfly range-bound strategies", difficulty: "Professional" },
    { title: "Long Straddle & Strangle volatility breakout plays", difficulty: "Advanced" }
  ],
  commodities: [
    { title: "Commodity Spot vs Futures Markets Overview", difficulty: "Beginner" },
    { title: "Gold & Silver Safe-Haven Commodity Mechanics", difficulty: "Intermediate" },
    { title: "Crude Oil Brent/WTI & OPEC Supply Cartel Impact", difficulty: "Intermediate" },
    { title: "Natural Gas Volatility & Storage Inventory Reports", difficulty: "Advanced" },
    { title: "Industrial Metals: Copper, Aluminium, Zinc & Nickel", difficulty: "Intermediate" },
    { title: "Agricultural Commodities: Seasonality & Monsoon Cycles", difficulty: "Intermediate" },
    { title: "Commodity Futures Curve: Contango vs Backwardation", difficulty: "Advanced" },
    { title: "Commodity Hedging for Commercial Producers & Consumers", difficulty: "Advanced" }
  ],
  currency_forex: [
    { title: "FX Pairs Anatomy: USD/INR, EUR/USD, GBP/USD & USD/JPY", difficulty: "Beginner" },
    { title: "Base Currency vs Quote Currency pricing math", difficulty: "Beginner" },
    { title: "Spot FX vs Currency Futures on NSE/BSE", difficulty: "Intermediate" },
    { title: "Forex Appreciation & Depreciation Factors", difficulty: "Intermediate" },
    { title: "The FX Carry Trade: Interest Rate Differential math", difficulty: "Advanced" },
    { title: "Central Bank Intervention & Foreign Exchange Reserves", difficulty: "Advanced" },
    { title: "Currency Options for Importers and Exporters", difficulty: "Advanced" }
  ],
  money_market: [
    { title: "Treasury Bills (T-Bills) 91-Day, 182-Day & 364-Day", difficulty: "Beginner" },
    { title: "Commercial Paper (CP) Corporate Short-Term Financing", difficulty: "Intermediate" },
    { title: "Certificates of Deposit (CD) Banking Liquidity", difficulty: "Intermediate" },
    { title: "Repurchase Agreements (Repo) & Reverse Repo Rates", difficulty: "Intermediate" },
    { title: "Call Money & Notice Money Overnight Interbank Market", difficulty: "Advanced" },
    { title: "Money Market Mutual Funds (Liquid & Overnight Funds)", difficulty: "Beginner" },
    { title: "Short-Term Yield Rates & Central Bank Liquidity Injection", difficulty: "Advanced" }
  ],
  reits: [
    { title: "What is a REIT? Commercial Real Estate Tokenization", difficulty: "Beginner" },
    { title: "REIT Structure: Sponsor, Manager, Trustee & Unitholders", difficulty: "Intermediate" },
    { title: "Rental Cash Flow, Occupancy Rates & Net Operating Income (NOI)", difficulty: "Intermediate" },
    { title: "Mandatory 90% Cash Distribution Regulation", difficulty: "Intermediate" },
    { title: "REIT Dividend Yield vs Bond Yield Spread", difficulty: "Advanced" },
    { title: "Commercial Office REITs vs Retail & Logistics REITs", difficulty: "Intermediate" }
  ],
  invits: [
    { title: "What is an InvIT? Public Infrastructure Monetization", difficulty: "Beginner" },
    { title: "Toll-Road & Expressway InvIT Cash Flows", difficulty: "Intermediate" },
    { title: "Power Grid & Renewable Energy Transmission InvITs", difficulty: "Intermediate" },
    { title: "Mandated Cash Distribution Rules & Dividend Yields", difficulty: "Intermediate" },
    { title: "Infrastructure Debt Refinancing & Interest Rate Risk", difficulty: "Advanced" }
  ],
  alt_investments: [
    { title: "Private Equity (PE) LBOs & Buyout Strategies", difficulty: "Advanced" },
    { title: "Venture Capital (VC) Seed, Series A-Z & Valuation Math", difficulty: "Intermediate" },
    { title: "Private Credit & Direct Lending Yield Premiums", difficulty: "Advanced" },
    { title: "Hedge Funds Strategies: Long/Short, Global Macro, Event-Driven", difficulty: "Professional" },
    { title: "Alternative Investment Funds (AIF) Category I, II & III Rules", difficulty: "Advanced" },
    { title: "Private Market J-Curve & Illiquidity Premium", difficulty: "Professional" }
  ],
  structured_products: [
    { title: "Structured Notes & Capital-Protected Securities", difficulty: "Advanced" },
    { title: "Market-Linked Debentures (MLDs) Index Participation", difficulty: "Advanced" },
    { title: "Principal-Protection Floor & Embedded Call Options", difficulty: "Professional" },
    { title: "Credit-Linked Notes (CLN) & Barrier Derivatives", difficulty: "Professional" }
  ],
  securitization: [
    { title: "Securitization Process: Originator, SPV & Asset Pool", difficulty: "Advanced" },
    { title: "Asset-Backed Securities (ABS) Auto & Personal Loans", difficulty: "Advanced" },
    { title: "Mortgage-Backed Securities (MBS) Pass-Through Mechanics", difficulty: "Advanced" },
    { title: "Collateralized Debt Obligations (CDOs) & Credit Enhancement", difficulty: "Professional" },
    { title: "Tranching Structure: Senior AAA, Mezzanine & Equity First-Loss", difficulty: "Professional" }
  ],
  participants: [
    { title: "Retail Investors vs HNIs (High Net-Worth Individuals)", difficulty: "Beginner" },
    { title: "FIIs (Foreign Institutional Investors) & FPI Capital Inflows", difficulty: "Intermediate" },
    { title: "DIIs (Domestic Institutional Investors) Mutual Funds & LIC", difficulty: "Intermediate" },
    { title: "Pension Funds (NPS, EPF) & Sovereign Wealth Funds", difficulty: "Intermediate" },
    { title: "Market Makers & Designated Liquidity Providers", difficulty: "Advanced" },
    { title: "Investment Banks Syndicate & Book Running Lead Managers", difficulty: "Advanced" }
  ],
  infrastructure: [
    { title: "Stock Exchanges: NSE & BSE Order Matching Engines", difficulty: "Beginner" },
    { title: "Regulators: SEBI Regulatory Oversight & RBI Monetary Control", difficulty: "Beginner" },
    { title: "Depositories: NSDL & CDSL Demat Securities Storage", difficulty: "Beginner" },
    { title: "Clearing Corporations (NSE Clearing, Indian Clearing Corp)", difficulty: "Intermediate" },
    { title: "Dematerialization, Rematerialization & Pledging Shares", difficulty: "Intermediate" }
  ],
  settlement: [
    { title: "Trade Date (T0) vs Settlement Date (T+1 Rolling Cycle)", difficulty: "Beginner" },
    { title: "Short Selling Mechanics & Borrowing Stock via SLB", difficulty: "Advanced" },
    { title: "Margin Requirements: VaR Margin, ELM Margin & Peak Margin", difficulty: "Advanced" },
    { title: "Collateral Haircuts & Mark-to-Market (MTM) Settlement", difficulty: "Advanced" },
    { title: "Auction Mechanism for Short Delivery Default", difficulty: "Advanced" }
  ],
  investment_banking: [
    { title: "IPO Underwriting & Book Building Pricing Band", difficulty: "Intermediate" },
    { title: "Corporate Valuation Models: DCF, Comparable Companies, LBO", difficulty: "Advanced" },
    { title: "M&A Advisory, Mergers, Acquisitions & Synergies", difficulty: "Professional" },
    { title: "Private Placements & Qualified Institutional Placements (QIP)", difficulty: "Advanced" },
    { title: "Rights Issues, Bonus Issuance & Corporate Restructuring", difficulty: "Intermediate" }
  ],
  credit_markets: [
    { title: "Credit Risk Taxonomy & Default Probability Math", difficulty: "Intermediate" },
    { title: "Credit Rating Spectrum: AAA, AA, A, BBB to Junk D", difficulty: "Beginner" },
    { title: "Credit Spreads over Benchmark Sovereign Yields", difficulty: "Advanced" },
    { title: "Credit Default Swaps (CDS) Synthetic Protection", difficulty: "Professional" },
    { title: "Distressed Debt Investing & Recovery Rate Analysis", difficulty: "Professional" }
  ],
  macro_interest_rates: [
    { title: "RBI Repo Rate, Reverse Repo & Policy Corridor", difficulty: "Beginner" },
    { title: "Inflation (CPI vs WPI) & Real vs Nominal Interest Rates", difficulty: "Intermediate" },
    { title: "Monetary Policy Transmission to Commercial Lending Rates", difficulty: "Advanced" },
    { title: "Yield Curve Inversion & Macro Recession Forecasting", difficulty: "Advanced" },
    { title: "Term Premium & Federal Reserve / RBI Balance Sheet QT/QE", difficulty: "Professional" }
  ],
  portfolio_mgmt: [
    { title: "Strategic vs Tactical Asset Allocation Blueprint", difficulty: "Intermediate" },
    { title: "Portfolio Diversification & Covariance / Correlation Matrix", difficulty: "Intermediate" },
    { title: "Sharpe Ratio, Sortino Ratio & Treynor Ratio Risk Adjusted", difficulty: "Advanced" },
    { title: "Portfolio Beta (Systematic Risk) & Alpha (Excess Return)", difficulty: "Advanced" },
    { title: "Value at Risk (VaR) & Conditional VaR (CVaR) Stress Math", difficulty: "Professional" },
    { title: "Portfolio Rebalancing Protocols & Risk Budgeting", difficulty: "Advanced" }
  ],
  global_markets: [
    { title: "US Markets (S&P 500, NASDAQ) vs Indian Markets (NIFTY 50)", difficulty: "Beginner" },
    { title: "Global Benchmark Indices: Nikkei 225, FTSE 100, DAX", difficulty: "Intermediate" },
    { title: "Cross-Border Foreign Capital Flows & US Dollar Index (DXY)", difficulty: "Advanced" },
    { title: "Currency Risk, Country Risk & Geopolitical Factors in Investing", difficulty: "Advanced" }
  ]
};

export function getCategoryTopics(categoryId: string): Topic[] {
  const catMeta = CAPITAL_MARKETS_CATEGORIES.find(c => c.id === categoryId) || CAPITAL_MARKETS_CATEGORIES[0];
  const items = CAPITAL_MARKET_CATEGORY_TOPICS[categoryId] || CAPITAL_MARKET_CATEGORY_TOPICS["equities"];

  return items.map((item, index) => {
    const topicId = `cat-${categoryId}-${index + 1}`;
    const levelNum = item.difficulty === "Beginner" ? 1 : item.difficulty === "Intermediate" ? 4 : item.difficulty === "Advanced" ? 7 : 10;

    return {
      id: topicId,
      topicNumber: index + 1,
      level: levelNum,
      levelTitle: `${catMeta.shortName} — ${item.difficulty}`,
      moduleName: `${catMeta.title}`,
      title: item.title,
      description: `Comprehensive masterclass on ${item.title} with ELI5 breakdown, visual theory chart, and 90% pass test.`,
      estimatedTimeMinutes: 10,
      unlocked: index === 0,
      completed: false,
      lessons: [
        {
          id: `les-${topicId}-1`,
          topicId: topicId,
          title: `Core Theory & Mechanics of ${item.title}`,
          contentELI5: `Imagine learning about ${item.title} using simple everyday building blocks!\n\nIn ${catMeta.shortName}, "${item.title}" helps explain how money moves through capital markets. Just like putting money in a piggy bank or lending a toy to a friend, this concept ensures everyone knows who owes what, how profits are calculated, and how risks are kept safe!`,
          contentSimple: `"${item.title}" is an integral pillar of ${catMeta.title}.\n\nInvestors and market participants utilize "${item.title}" to manage cash flows, evaluate yields, control portfolio risk, or execute strategic trades across stock exchanges, debt desks, or OTC derivative networks. Understanding the structural mechanics, pricing formulas, and regulatory safeguards of this topic provides a clear edge in real-world financial decision making.`,
          contentProfessional: `In institutional capital markets and asset management, "${item.title}" represents a key variable within capital structure optimization, risk budgeting, and regulatory compliance frameworks.\n\nFrom a market microstructure standpoint, "${item.title}" governs pricing dynamics, yield curves, collateral haircuts, and order book execution. Quantitative research desks and portfolio managers evaluate systemic beta, default risk premia, and liquidity spreads when structuring exposures in ${catMeta.title}.`,
          realMarketExample: `Real Market Case Study: Analyzing ${item.title} in institutional markets (e.g. NSE, BSE, RBI G-Sec Auctions, or Wall Street derivative desks) demonstrates how macroeconomic interest rates, regulatory oversight, and liquidity flows determine daily valuation and risk parameters.`,
          keyTakeaways: [
            `Mastering ${item.title} is essential for navigating ${catMeta.shortName} effectively.`,
            `Always evaluate liquidity, credit risk, and interest rate sensitivity when analyzing ${item.title}.`,
            `Combine theoretical knowledge of ${item.title} with strict risk management rules.`
          ],
          socraticQuestions: [
            {
              question: `What is the core objective of understanding '${item.title}' in Capital Markets?`,
              options: [
                "To make uninformed speculative bets without stop loss",
                `To evaluate risk, yield, and structural mechanics accurately in ${catMeta.shortName}`,
                "To guarantee risk-free returns in all market conditions",
                "To bypass regulatory oversight"
              ],
              correctIndex: 1,
              explanation: `Understanding ${item.title} equips investors with structured, data-driven analytical skills.`
            },
            {
              question: `Which factor is most critical when evaluating '${item.title}' in real market scenarios?`,
              options: [
                "Ignoring interest rates and market liquidity",
                "Analyzing liquidity, regulatory framework, and underlying risk parameters",
                "Trading exclusively on unverified social media hype",
                "Using maximum leverage on every position"
              ],
              correctIndex: 1,
              explanation: "Institutional risk management relies on verifying market liquidity, counterparty credit quality, and macroeconomic trends."
            }
          ]
        }
      ],
      topicTest: [
        {
          id: `q-${topicId}-1`,
          topicCategory: catMeta.shortName,
          question: `When analyzing '${item.title}', which parameter provides the most reliable risk assessment?`,
          type: "mcq",
          options: [
            "Relying on rumors without data",
            "Evaluating credit quality, yield spreads, liquidity, and underlying asset valuation",
            "Disregarding market interest rates",
            "Executing trades without a risk management framework"
          ],
          correctIndex: 1,
          explanation: "Rigorous financial analysis requires evaluating fundamental credit quality, liquidity metrics, and macroeconomic interest rates.",
          difficulty: item.difficulty
        },
        {
          id: `q-${topicId}-2`,
          topicCategory: catMeta.shortName,
          question: `True or False: '${item.title}' plays a direct role in institutional risk management and capital allocation.`,
          type: "true_false",
          options: ["True", "False"],
          correctIndex: 0,
          explanation: "True. Institutional portfolio managers continuously monitor market variables to optimize risk-adjusted capital allocation.",
          difficulty: item.difficulty
        },
        {
          id: `q-${topicId}-3`,
          topicCategory: catMeta.shortName,
          question: `Scenario: Market volatility surges while managing positions involving '${item.title}'. What is the prudent risk management step?`,
          type: "scenario",
          options: [
            "Double position size to recover drawdown",
            "Reduce position exposure, verify collateral margins, and re-balance risk parameters",
            "Remove all stop-loss orders",
            "Ignore margin calls"
          ],
          correctIndex: 1,
          explanation: "During periods of high volatility, risk management protocol dictates scaling down position size and maintaining capital preservation.",
          difficulty: "Advanced"
        },
        {
          id: `q-${topicId}-4`,
          topicCategory: catMeta.shortName,
          question: `Calculation: If a capital market position in '${item.title}' has a 1:3 Risk/Reward setup risking ₹5,000, what is the target gain?`,
          type: "calculation",
          options: ["₹5,000", "₹10,000", "₹15,000", "₹20,000"],
          correctIndex: 2,
          explanation: "A 1:3 Risk/Reward ratio means a ₹5,000 risk targets a ₹15,000 gain (3 × ₹5,000 = ₹15,000).",
          difficulty: item.difficulty
        }
      ],
      caseStudy: {
        companyOrChart: `Capital Markets Case Study: ${item.title}`,
        scenario: `An institutional desk is evaluating exposure in ${catMeta.shortName} under shifting macroeconomic conditions and testing ${item.title}. Liquidity is stable and risk metrics favor allocation. What is the optimal decision?`,
        options: ["BUY", "HOLD", "SELL"],
        correctOption: "BUY",
        explanation: "Favorable liquidity parameters, solid risk-adjusted yields, and positive institutional sentiment favor strategic capital allocation."
      }
    };
  });
}

