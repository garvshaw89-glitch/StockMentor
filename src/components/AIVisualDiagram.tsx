import React from "react";
import { Activity, PieChart, TrendingUp, ShieldAlert, BarChart2, Layers, Cpu, Globe } from "lucide-react";

export type DiagramType = 
  | "candlestick"
  | "breakout"
  | "valuation_pe"
  | "cashflow_flow"
  | "risk_reward"
  | "order_book"
  | "option_chain"
  | "du_pont"
  | "bonds_yield_curve"
  | "etf_creation_redemption"
  | "mutual_fund_nav"
  | "option_payoff_call"
  | "option_payoff_spread"
  | "option_greeks"
  | "volatility_smile"
  | "futures_contango"
  | "commodities_futures"
  | "forex_carry_trade"
  | "money_market_repo"
  | "reit_cashflow"
  | "invit_structure"
  | "alt_investments_jcurve"
  | "structured_products"
  | "securitization_tranches"
  | "market_infrastructure"
  | "settlement_t1"
  | "investment_banking_ipo"
  | "credit_market_spreads"
  | "central_bank_repo_transmission"
  | "portfolio_efficient_frontier"
  | "global_market_risk";

interface AIVisualDiagramProps {
  type?: DiagramType;
  topicTitle?: string;
  topicCategory?: string;
  title?: string;
  subtitle?: string;
}

export const AIVisualDiagram: React.FC<AIVisualDiagramProps> = ({ 
  type, 
  topicTitle = "", 
  topicCategory = "", 
  title, 
  subtitle 
}) => {
  // Infer the best diagram type based on explicit type or title/category keywords
  const getInferredType = (): DiagramType => {
    if (type) return type;
    const t = topicTitle.toLowerCase();
    const c = topicCategory.toLowerCase();

    if (t.includes("yield") || t.includes("bond") || t.includes("ytm") || t.includes("duration") || t.includes("g-sec") || c.includes("bond")) {
      return "bonds_yield_curve";
    }
    if (t.includes("etf") || c.includes("etf")) {
      return "etf_creation_redemption";
    }
    if (t.includes("mutual fund") || t.includes("sip") || t.includes("nav") || t.includes("elss") || c.includes("mutual")) {
      return "mutual_fund_nav";
    }
    if (t.includes("option chain") || t.includes("open interest")) {
      return "option_chain";
    }
    if (t.includes("greek") || t.includes("delta") || t.includes("theta") || t.includes("gamma") || t.includes("vega")) {
      return "option_greeks";
    }
    if (t.includes("straddle") || t.includes("condor") || t.includes("spread") || t.includes("collar")) {
      return "option_payoff_spread";
    }
    if (t.includes("call") || t.includes("put") || t.includes("strike") || t.includes("premium")) {
      return "option_payoff_call";
    }
    if (t.includes("smile") || t.includes("skew") || t.includes("implied volatility") || t.includes("iv crush")) {
      return "volatility_smile";
    }
    if (t.includes("futures") || t.includes("contango") || t.includes("backwardation") || c.includes("derivatives")) {
      return "futures_contango";
    }
    if (t.includes("gold") || t.includes("silver") || t.includes("crude") || t.includes("oil") || t.includes("commodity") || c.includes("commodity")) {
      return "commodities_futures";
    }
    if (t.includes("forex") || t.includes("currency") || t.includes("usd/inr") || t.includes("exchange rate") || c.includes("forex") || c.includes("currency")) {
      return "forex_carry_trade";
    }
    if (t.includes("repo") || t.includes("t-bill") || t.includes("commercial paper") || t.includes("money market") || t.includes("call money") || c.includes("money market")) {
      return "money_market_repo";
    }
    if (t.includes("reit") || t.includes("rental") || c.includes("reit")) {
      return "reit_cashflow";
    }
    if (t.includes("invit") || t.includes("infrastructure") || c.includes("invit")) {
      return "invit_structure";
    }
    if (t.includes("private equity") || t.includes("venture capital") || t.includes("hedge fund") || t.includes("alternative") || c.includes("alternative")) {
      return "alt_investments_jcurve";
    }
    if (t.includes("structured") || t.includes("debenture") || t.includes("market-linked") || c.includes("structured")) {
      return "structured_products";
    }
    if (t.includes("securit") || t.includes("mbs") || t.includes("abs") || t.includes("cdo") || t.includes("tranche")) {
      return "securitization_tranches";
    }
    if (t.includes("participant") || t.includes("fii") || t.includes("dii") || t.includes("institutional") || c.includes("participant")) {
      return "market_infrastructure";
    }
    if (t.includes("nse") || t.includes("bse") || t.includes("sebi") || t.includes("nsdl") || t.includes("cdsl") || t.includes("depository") || c.includes("infrastructure")) {
      return "market_infrastructure";
    }
    if (t.includes("settlement") || t.includes("t+1") || t.includes("clearing") || t.includes("short selling") || c.includes("settlement")) {
      return "settlement_t1";
    }
    if (t.includes("ipo") || t.includes("book building") || t.includes("underwriting") || t.includes("investment bank") || c.includes("investment bank")) {
      return "investment_banking_ipo";
    }
    if (t.includes("credit") || t.includes("rating") || t.includes("default") || t.includes("cds") || c.includes("credit")) {
      return "credit_market_spreads";
    }
    if (t.includes("interest rate") || t.includes("inflation") || t.includes("monetary policy") || t.includes("rbi") || c.includes("economics")) {
      return "central_bank_repo_transmission";
    }
    if (t.includes("portfolio") || t.includes("asset allocation") || t.includes("sharpe") || t.includes("sortino") || t.includes("beta") || t.includes("alpha") || c.includes("portfolio")) {
      return "portfolio_efficient_frontier";
    }
    if (t.includes("global") || t.includes("us market") || t.includes("emerging") || c.includes("global")) {
      return "global_market_risk";
    }
    if (t.includes("candle") || t.includes("doji") || t.includes("engulfing") || t.includes("hammer") || t.includes("pattern")) {
      return "candlestick";
    }
    if (t.includes("breakout") || t.includes("trendline") || t.includes("resistance") || t.includes("support")) {
      return "breakout";
    }
    if (t.includes("p/e") || t.includes("valuation") || t.includes("p/b") || t.includes("ev/ebitda") || t.includes("peg")) {
      return "valuation_pe";
    }
    if (t.includes("cash flow") || t.includes("income") || t.includes("ebitda") || t.includes("profit")) {
      return "cashflow_flow";
    }
    if (t.includes("risk") || t.includes("stop loss") || t.includes("target")) {
      return "risk_reward";
    }
    if (t.includes("order book") || t.includes("bid") || t.includes("ask") || t.includes("spread")) {
      return "order_book";
    }

    return "candlestick";
  };

  const activeType = getInferredType();
  const displayTitle = title || (topicTitle ? `Visual Concept: ${topicTitle}` : "Interactive Concept Diagram");

  return (
    <div className="my-3 p-4 bg-slate-900 border border-slate-700/80 rounded-xl text-white space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 truncate max-w-[280px]">
            {displayTitle}
          </span>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
          Visual Chart
        </span>
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-300 font-medium">{subtitle}</p>
      )}

      {/* Diagram SVG Content */}
      <div className="w-full overflow-hidden bg-slate-950/90 rounded-lg p-3 border border-slate-800 flex items-center justify-center">
        
        {/* 1. Candlestick Reversal Diagram */}
        {activeType === "candlestick" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <line x1="0" y1="40" x2="400" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="400" y2="120" stroke="#1E293B" strokeDasharray="3 3" />
            <rect x="10" y="125" width="380" height="25" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeDasharray="2 2" />
            <text x="20" y="142" fill="#10B981" fontSize="10" fontWeight="bold">Key Support Zone (Demand Floor)</text>
            <line x1="60" y1="30" x2="60" y2="110" stroke="#EF4444" strokeWidth="2" />
            <rect x="50" y="45" width="20" height="55" fill="#EF4444" rx="2" />
            <line x1="130" y1="80" x2="130" y2="135" stroke="#F59E0B" strokeWidth="2" />
            <rect x="122" y="100" width="16" height="10" fill="#F59E0B" rx="1" />
            <text x="105" y="70" fill="#F59E0B" fontSize="9" fontWeight="bold">Doji Reversal</text>
            <line x1="200" y1="20" x2="200" y2="130" stroke="#10B981" strokeWidth="2" />
            <rect x="188" y="35" width="24" height="90" fill="#10B981" rx="2" />
            <text x="175" y="15" fill="#10B981" fontSize="10" fontWeight="extrabold">Bullish Engulfing Signal</text>
            <path d="M 280 40 Q 330 20 370 15" stroke="#38BDF8" strokeWidth="3" fill="none" strokeDasharray="4 2" />
            <polygon points="370,10 380,15 370,20" fill="#38BDF8" />
            <text x="310" y="30" fill="#38BDF8" fontSize="10" fontWeight="bold">Upward Breakout</text>
          </svg>
        )}

        {/* 2. Breakout & Resistance Diagram */}
        {activeType === "breakout" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <line x1="30" y1="50" x2="350" y2="50" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 2" />
            <text x="35" y="42" fill="#F43F5E" fontSize="10" fontWeight="bold">Major Resistance Line (₹2,650)</text>
            <line x1="30" y1="130" x2="350" y2="130" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
            <text x="35" y="145" fill="#10B981" fontSize="10" fontWeight="bold">Ascending Support (₹2,480)</text>
            <path d="M 40 120 L 90 55 L 140 110 L 190 52 L 240 100 L 290 48 L 360 20" stroke="#38BDF8" strokeWidth="3" fill="none" />
            <circle cx="290" cy="48" r="10" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
            <text x="250" y="32" fill="#10B981" fontSize="10" fontWeight="extrabold">★ Volume Surge Breakout</text>
            <rect x="280" y="115" width="20" height="30" fill="#10B981" />
            <text x="305" y="125" fill="#10B981" fontSize="9" fontWeight="bold">High Vol</text>
          </svg>
        )}

        {/* 3. Valuation P/E Band */}
        {activeType === "valuation_pe" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="25" fill="#94A3B8" fontSize="10" fontWeight="bold">P/E Valuation Band vs Historical Median</text>
            <rect x="20" y="45" width="360" height="24" fill="#1E293B" rx="12" />
            <rect x="20" y="45" width="110" height="24" fill="#10B981" fillOpacity="0.6" rx="12" />
            <text x="35" y="61" fill="#FFFFFF" fontSize="9" fontWeight="extrabold">Undervalued (&lt;15x)</text>
            <rect x="130" y="45" width="130" height="24" fill="#3B82F6" fillOpacity="0.6" />
            <text x="155" y="61" fill="#FFFFFF" fontSize="9" fontWeight="extrabold">Fair Value (15x - 25x)</text>
            <rect x="260" y="45" width="120" height="24" fill="#EF4444" fillOpacity="0.6" rx="12" />
            <text x="280" y="61" fill="#FFFFFF" fontSize="9" fontWeight="extrabold">Overvalued (&gt;25x)</text>
            <polygon points="185,80 175,95 195,95" fill="#F59E0B" />
            <rect x="135" y="95" width="100" height="40" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" rx="6" />
            <text x="145" y="112" fill="#F59E0B" fontSize="10" fontWeight="extrabold">Current Stock P/E: 18.5x</text>
            <text x="145" y="126" fill="#CBD5E1" fontSize="9">Median 5-Yr P/E: 22.0x</text>
          </svg>
        )}

        {/* 4. Bonds & Yield Curve */}
        {activeType === "bonds_yield_curve" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="22" fill="#38BDF8" fontSize="11" fontWeight="bold">Yield Curve Dynamics & Price-Yield Inverse Relationship</text>
            <line x1="40" y1="130" x2="360" y2="130" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="40" x2="40" y2="130" stroke="#475569" strokeWidth="1.5" />
            <text x="50" y="145" fill="#94A3B8" fontSize="9">1Y</text>
            <text x="150" y="145" fill="#94A3B8" fontSize="9">5Y</text>
            <text x="250" y="145" fill="#94A3B8" fontSize="9">10Y G-Sec</text>
            <text x="340" y="145" fill="#94A3B8" fontSize="9">30Y</text>
            {/* Normal Yield Curve */}
            <path d="M 40 110 Q 180 75 360 50" stroke="#10B981" strokeWidth="2.5" fill="none" />
            <text x="240" y="45" fill="#10B981" fontSize="9" fontWeight="bold">Normal Yield Curve (7.1%)</text>
            {/* Inverted Yield Curve */}
            <path d="M 40 60 Q 180 85 360 115" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" fill="none" />
            <text x="80" y="55" fill="#EF4444" fontSize="9" fontWeight="bold">Inverted Curve (Recession Signal)</text>
            <rect x="230" y="80" width="130" height="35" fill="#0F172A" stroke="#38BDF8" rx="6" />
            <text x="238" y="94" fill="#38BDF8" fontSize="9" fontWeight="bold">Bond Price 🡱 = Yield 🡳</text>
            <text x="238" y="107" fill="#CBD5E1" fontSize="8">YTM = Coupon / Price</text>
          </svg>
        )}

        {/* 5. ETF Creation & Redemption Mechanism */}
        {activeType === "etf_creation_redemption" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <rect x="15" y="30" width="100" height="45" fill="#1E293B" stroke="#38BDF8" rx="6" />
            <text x="25" y="48" fill="#38BDF8" fontSize="10" fontWeight="bold">Authorized Part.</text>
            <text x="25" y="62" fill="#CBD5E1" fontSize="8">(Institutional AP)</text>
            {/* Arrow Right */}
            <path d="M 120 40 L 170 40" stroke="#10B981" strokeWidth="2" />
            <polygon points="170,36 180,40 170,44" fill="#10B981" />
            <text x="122" y="34" fill="#10B981" fontSize="8">Stocks Basket</text>
            <rect x="185" y="30" width="100" height="45" fill="#065F46" stroke="#10B981" rx="6" />
            <text x="195" y="48" fill="#A7F3D0" fontSize="10" fontWeight="bold">ETF Issuer</text>
            <text x="195" y="62" fill="#D1FAE5" fontSize="8">(Creation at NAV)</text>
            {/* Arrow Left Return */}
            <path d="M 180 60 L 120 60" stroke="#F59E0B" strokeWidth="2" />
            <polygon points="120,56 110,60 120,64" fill="#F59E0B" />
            <text x="125" y="72" fill="#F59E0B" fontSize="8">ETF Shares</text>

            <rect x="25" y="105" width="350" height="40" fill="#0F172A" stroke="#38BDF8" rx="6" />
            <text x="35" y="122" fill="#38BDF8" fontSize="10" fontWeight="bold">Arbitrage Mechanism keeps ETF Market Price ≈ NAV</text>
            <text x="35" y="137" fill="#CBD5E1" fontSize="9">Price &gt; NAV = AP creates shares | Price &lt; NAV = AP redeems shares</text>
          </svg>
        )}

        {/* 6. Mutual Funds & SIP Mechanics */}
        {activeType === "mutual_fund_nav" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="22" fill="#10B981" fontSize="11" fontWeight="bold">Mutual Fund SIP Rupee Cost Averaging & Compounding Growth</text>
            <line x1="40" y1="130" x2="360" y2="130" stroke="#475569" strokeWidth="1.5" />
            <path d="M 40 120 Q 200 100 360 30" stroke="#10B981" strokeWidth="3" fill="none" />
            <text x="250" y="25" fill="#10B981" fontSize="10" fontWeight="bold">SIP Wealth Curve (15% CAGR)</text>
            <path d="M 40 120 L 360 90" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" fill="none" />
            <text x="260" y="105" fill="#94A3B8" fontSize="8">Total Capital Invested</text>
            <rect x="40" y="45" width="120" height="40" fill="#0F172A" stroke="#38BDF8" rx="6" />
            <text x="48" y="60" fill="#38BDF8" fontSize="9" fontWeight="bold">NAV = Total AUM / Units</text>
            <text x="48" y="74" fill="#CBD5E1" fontSize="8">Expense Ratio Fee: 0.5% - 1.5%</text>
          </svg>
        )}

        {/* 7. Options Payoff Call / Put */}
        {activeType === "option_payoff_call" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <line x1="40" y1="90" x2="360" y2="90" stroke="#475569" strokeWidth="1.5" />
            <text x="365" y="94" fill="#94A3B8" fontSize="9">Stock Price</text>
            <text x="15" y="40" fill="#10B981" fontSize="9">Profit</text>
            <text x="15" y="140" fill="#EF4444" fontSize="9">Loss</text>
            {/* Strike & Premium */}
            <line x1="160" y1="20" x2="160" y2="150" stroke="#F59E0B" strokeDasharray="2 2" />
            <text x="165" y="30" fill="#F59E0B" fontSize="9" fontWeight="bold">Strike Price (₹2,500)</text>
            {/* Call Payoff Line */}
            <path d="M 50 120 L 160 120 L 320 20" stroke="#10B981" strokeWidth="3" fill="none" />
            <rect x="220" y="110" width="130" height="35" fill="#0F172A" stroke="#10B981" rx="6" />
            <text x="228" y="125" fill="#10B981" fontSize="9" fontWeight="bold">Long Call Option Payoff</text>
            <text x="228" y="138" fill="#CBD5E1" fontSize="8">Max Loss = Premium Paid (₹40)</text>
          </svg>
        )}

        {/* 8. Option Greeks Matrix */}
        {activeType === "option_greeks" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="22" fill="#38BDF8" fontSize="11" fontWeight="bold">Option Greeks Sensitivity Profile</text>
            <rect x="20" y="35" width="80" height="100" fill="#1E293B" rx="6" />
            <text x="30" y="52" fill="#38BDF8" fontSize="10" fontWeight="bold">Δ DELTA</text>
            <text x="30" y="68" fill="#CBD5E1" fontSize="8">Price sensitivity</text>
            <text x="30" y="85" fill="#10B981" fontSize="11" fontWeight="black">0.52</text>

            <rect x="110" y="35" width="80" height="100" fill="#1E293B" rx="6" />
            <text x="120" y="52" fill="#F59E0B" fontSize="10" fontWeight="bold">Γ GAMMA</text>
            <text x="120" y="68" fill="#CBD5E1" fontSize="8">Delta accel.</text>
            <text x="120" y="85" fill="#F59E0B" fontSize="11" fontWeight="black">0.08</text>

            <rect x="200" y="35" width="80" height="100" fill="#1E293B" rx="6" />
            <text x="210" y="52" fill="#EF4444" fontSize="10" fontWeight="bold">Θ THETA</text>
            <text x="210" y="68" fill="#CBD5E1" fontSize="8">Time decay/day</text>
            <text x="210" y="85" fill="#EF4444" fontSize="11" fontWeight="black">-₹12.50</text>

            <rect x="290" y="35" width="90" height="100" fill="#1E293B" rx="6" />
            <text x="300" y="52" fill="#A855F7" fontSize="10" fontWeight="bold">ν VEGA</text>
            <text x="300" y="68" fill="#CBD5E1" fontSize="8">Volatility sensitivity</text>
            <text x="300" y="85" fill="#A855F7" fontSize="11" fontWeight="black">+₹18.20</text>
          </svg>
        )}

        {/* 9. Futures Contango vs Backwardation */}
        {activeType === "futures_contango" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="22" fill="#F59E0B" fontSize="11" fontWeight="bold">Futures Term Structure: Contango vs Backwardation</text>
            <line x1="40" y1="130" x2="360" y2="130" stroke="#475569" strokeWidth="1.5" />
            <text x="40" y="145" fill="#94A3B8" fontSize="9">Spot</text>
            <text x="150" y="145" fill="#94A3B8" fontSize="9">1-Month Fut</text>
            <text x="260" y="145" fill="#94A3B8" fontSize="9">2-Month Fut</text>
            <text x="340" y="145" fill="#94A3B8" fontSize="9">Expiry</text>

            {/* Contango Line */}
            <path d="M 40 100 L 340 40" stroke="#38BDF8" strokeWidth="2.5" />
            <text x="180" y="55" fill="#38BDF8" fontSize="9" fontWeight="bold">Contango Curve (Futures &gt; Spot)</text>

            {/* Backwardation Line */}
            <path d="M 40 40 L 340 100" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="180" y="105" fill="#EF4444" fontSize="9" fontWeight="bold">Backwardation (Spot &gt; Futures)</text>
          </svg>
        )}

        {/* 10. REITs & InvITs Cash Flow Waterfall */}
        {(activeType === "reit_cashflow" || activeType === "invit_structure") && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="20" fill="#10B981" fontSize="11" fontWeight="bold">REIT / InvIT Cash Flow Distribution Waterfall</text>
            
            <rect x="20" y="35" width="80" height="40" fill="#1E293B" stroke="#38BDF8" rx="6" />
            <text x="25" y="52" fill="#38BDF8" fontSize="9" fontWeight="bold">Commercial Rental</text>
            <text x="25" y="65" fill="#CBD5E1" fontSize="8">₹500 Cr Income</text>

            <path d="M 105 55 L 125 55" stroke="#64748B" strokeWidth="2" />

            <rect x="130" y="35" width="80" height="40" fill="#1E293B" stroke="#F59E0B" rx="6" />
            <text x="135" y="52" fill="#F59E0B" fontSize="9" fontWeight="bold">Operating & Debt</text>
            <text x="135" y="65" fill="#CBD5E1" fontSize="8">-₹150 Cr Expenses</text>

            <path d="M 215 55 L 235 55" stroke="#64748B" strokeWidth="2" />

            <rect x="240" y="35" width="140" height="40" fill="#065F46" stroke="#10B981" rx="6" />
            <text x="248" y="52" fill="#A7F3D0" fontSize="10" fontWeight="bold">90%+ Mandated Payout</text>
            <text x="248" y="65" fill="#D1FAE5" fontSize="8">Distributed to Unitholders</text>

            <rect x="20" y="90" width="360" height="50" fill="#0F172A" stroke="#10B981" rx="6" />
            <text x="30" y="110" fill="#10B981" fontSize="10" fontWeight="bold">High Yield Profile (6.5% - 8.5% Dividend Distribution)</text>
            <text x="30" y="126" fill="#CBD5E1" fontSize="9">Regulated asset structure backed by operational physical real estate / power infrastructure.</text>
          </svg>
        )}

        {/* 11. Securitization Tranches */}
        {activeType === "securitization_tranches" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="20" fill="#38BDF8" fontSize="11" fontWeight="bold">Securitization Waterfall: Asset Pool to Risk Tranches</text>
            
            <rect x="20" y="35" width="90" height="105" fill="#1E293B" stroke="#38BDF8" rx="6" />
            <text x="25" y="55" fill="#38BDF8" fontSize="10" fontWeight="bold">Collateral Pool</text>
            <text x="25" y="72" fill="#CBD5E1" fontSize="8">Thousands of</text>
            <text x="25" y="85" fill="#CBD5E1" fontSize="8">Mortgages / Loans</text>
            <text x="25" y="120" fill="#38BDF8" fontSize="9">₹1,000 Cr Pool</text>

            <path d="M 115 85 L 140 85" stroke="#64748B" strokeWidth="2" />

            {/* Senior Tranche */}
            <rect x="145" y="35" width="235" height="30" fill="#065F46" stroke="#10B981" rx="4" />
            <text x="155" y="54" fill="#A7F3D0" fontSize="10" fontWeight="bold">Senior AAA Tranche (75%) — Lowest Risk, First Payout</text>

            {/* Mezzanine Tranche */}
            <rect x="145" y="72" width="235" height="30" fill="#1E293B" stroke="#F59E0B" rx="4" />
            <text x="155" y="91" fill="#F59E0B" fontSize="10" fontWeight="bold">Mezzanine BBB Tranche (15%) — Moderate Yield</text>

            {/* Equity Tranche */}
            <rect x="145" y="108" width="235" height="30" fill="#7F1D1D" stroke="#EF4444" rx="4" />
            <text x="155" y="127" fill="#FECDD3" fontSize="10" fontWeight="bold">Equity First-Loss Tranche (10%) — High Risk/Yield</text>
          </svg>
        )}

        {/* 12. Market Infrastructure & Settlement T+1 */}
        {(activeType === "market_infrastructure" || activeType === "settlement_t1") && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="20" fill="#10B981" fontSize="11" fontWeight="bold">Indian Capital Market Infrastructure & T+1 Settlement Flow</text>
            
            <rect x="15" y="35" width="70" height="40" fill="#1E293B" stroke="#38BDF8" rx="6" />
            <text x="20" y="52" fill="#38BDF8" fontSize="9" fontWeight="bold">Investor</text>
            <text x="20" y="65" fill="#CBD5E1" fontSize="8">Order Entry</text>

            <path d="M 90 55 L 110 55" stroke="#64748B" strokeWidth="2" />

            <rect x="115" y="35" width="70" height="40" fill="#1E293B" stroke="#38BDF8" rx="6" />
            <text x="120" y="52" fill="#38BDF8" fontSize="9" fontWeight="bold">Broker</text>
            <text x="120" y="65" fill="#CBD5E1" fontSize="8">(Zerodha, etc)</text>

            <path d="M 190 55 L 210 55" stroke="#64748B" strokeWidth="2" />

            <rect x="215" y="35" width="75" height="40" fill="#065F46" stroke="#10B981" rx="6" />
            <text x="220" y="52" fill="#A7F3D0" fontSize="9" fontWeight="bold">NSE / BSE</text>
            <text x="220" y="65" fill="#D1FAE5" fontSize="8">Matching Eng.</text>

            <path d="M 295 55 L 315 55" stroke="#64748B" strokeWidth="2" />

            <rect x="320" y="35" width="70" height="40" fill="#1E293B" stroke="#F59E0B" rx="6" />
            <text x="325" y="52" fill="#F59E0B" fontSize="9" fontWeight="bold">Depository</text>
            <text x="325" y="65" fill="#CBD5E1" fontSize="8">NSDL / CDSL</text>

            <rect x="15" y="90" width="375" height="50" fill="#0F172A" stroke="#38BDF8" rx="6" />
            <text x="25" y="110" fill="#38BDF8" fontSize="10" fontWeight="bold">T+1 Rolling Settlement Timeline</text>
            <text x="25" y="126" fill="#CBD5E1" fontSize="9">Day T0: Trade Executed ➔ Day T+1 (4:00 PM): Funds & Securities Payout Guaranteed</text>
          </svg>
        )}

        {/* 13. Portfolio Efficient Frontier */}
        {activeType === "portfolio_efficient_frontier" && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="20" fill="#10B981" fontSize="11" fontWeight="bold">Markowitz Efficient Frontier & Asset Allocation</text>
            <line x1="40" y1="130" x2="360" y2="130" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="40" y2="130" stroke="#475569" strokeWidth="1.5" />
            <text x="365" y="134" fill="#94A3B8" fontSize="9">Risk (σ)</text>
            <text x="15" y="30" fill="#10B981" fontSize="9">Return</text>

            {/* Frontier Curve */}
            <path d="M 40 120 Q 90 50 340 35" stroke="#10B981" strokeWidth="3" fill="none" />
            <circle cx="160" cy="58" r="7" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
            <text x="175" y="62" fill="#F59E0B" fontSize="10" fontWeight="extrabold">★ Max Sharpe Ratio Portfolio</text>

            <rect x="230" y="85" width="130" height="40" fill="#0F172A" stroke="#38BDF8" rx="6" />
            <text x="238" y="100" fill="#38BDF8" fontSize="9" fontWeight="bold">Optimal Asset Mix:</text>
            <text x="238" y="115" fill="#CBD5E1" fontSize="8">Equities 50% | Bonds 30% | Gold 10% | Cash 10%</text>
          </svg>
        )}

        {/* Default Fallback Diagram */}
        {![
          "candlestick", "breakout", "valuation_pe", "bonds_yield_curve", "etf_creation_redemption",
          "mutual_fund_nav", "option_payoff_call", "option_greeks", "futures_contango", "reit_cashflow",
          "invit_structure", "securitization_tranches", "market_infrastructure", "settlement_t1",
          "portfolio_efficient_frontier"
        ].includes(activeType) && (
          <svg viewBox="0 0 400 160" className="w-full max-h-44 text-xs font-sans">
            <text x="20" y="25" fill="#10B981" fontSize="11" fontWeight="bold">Capital Market Structure & Analytical Flow</text>
            <rect x="20" y="45" width="110" height="80" fill="#1E293B" stroke="#38BDF8" rx="8" />
            <text x="30" y="70" fill="#38BDF8" fontSize="10" fontWeight="bold">Asset Class</text>
            <text x="30" y="88" fill="#CBD5E1" fontSize="8">{topicCategory || "Equities / Debt"}</text>

            <path d="M 135 85 L 165 85" stroke="#64748B" strokeWidth="2" />

            <rect x="170" y="45" width="110" height="80" fill="#1E293B" stroke="#F59E0B" rx="8" />
            <text x="180" y="70" fill="#F59E0B" fontSize="10" fontWeight="bold">Valuation</text>
            <text x="180" y="88" fill="#CBD5E1" fontSize="8">Cash Flow / Yield</text>

            <path d="M 285 85 L 315 85" stroke="#64748B" strokeWidth="2" />

            <rect x="320" y="45" width="65" height="80" fill="#065F46" stroke="#10B981" rx="8" />
            <text x="328" y="70" fill="#A7F3D0" fontSize="10" fontWeight="bold">Execution</text>
            <text x="328" y="88" fill="#D1FAE5" fontSize="8">Risk Managed</text>
          </svg>
        )}

      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <span className="truncate max-w-[280px]">💡 Visual Diagram: Custom chart tailored specifically for {topicTitle || "this capital market topic"}.</span>
        <span className="text-emerald-400 font-mono shrink-0">StockMentor AI Engine</span>
      </div>
    </div>
  );
};
