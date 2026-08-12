import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI fallback mechanisms will be used.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Helper to generate content with fallback models and quota error recovery
async function generateContentWithFallback(ai: GoogleGenAI, params: any) {
  const models = ["gemini-3.6-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let lastErr: any = null;

  for (const model of models) {
    try {
      const res = await ai.models.generateContent({
        ...params,
        model,
      });
      if (res && res.text) {
        return res;
      }
    } catch (err: any) {
      lastErr = err;
    }
  }
  throw lastErr || new Error("All AI models failed");
}

// Offline/Quota Fallback Generators
function generateSocraticFallback(question: string, mode: string) {
  const qLower = (question || "").toLowerCase();
  
  let diagramTag = "";
  if (qLower.includes("candlestick") || qLower.includes("reversal") || qLower.includes("doji") || qLower.includes("hammer")) {
    diagramTag = "[DIAGRAM:candlestick]";
  } else if (qLower.includes("breakout") || qLower.includes("support") || qLower.includes("resistance")) {
    diagramTag = "[DIAGRAM:breakout]";
  } else if (qLower.includes("p/e") || qLower.includes("pe ratio") || qLower.includes("valuation") || qLower.includes("ratio")) {
    diagramTag = "[DIAGRAM:valuation_pe]";
  } else if (qLower.includes("cash flow") || qLower.includes("cashflow") || qLower.includes("income") || qLower.includes("statement")) {
    diagramTag = "[DIAGRAM:cashflow_flow]";
  } else if (qLower.includes("stop loss") || qLower.includes("risk") || qLower.includes("reward") || qLower.includes("target")) {
    diagramTag = "[DIAGRAM:risk_reward]";
  } else if (qLower.includes("order book") || qLower.includes("bid") || qLower.includes("ask")) {
    diagramTag = "[DIAGRAM:order_book]";
  } else if (qLower.includes("option") || qLower.includes("call") || qLower.includes("put")) {
    diagramTag = "[DIAGRAM:option_chain]";
  }

  if (mode === "ELI5") {
    return `Imagine a company is a lemonade stand selling 100 cups of lemonade a year. If you buy a share, you own a tiny piece of the lemonade stand! ${diagramTag}\n\nWhen prices change, it's like a crowd of kids bidding for the last cold cup of lemonade on a hot day. \n\nQuick Socratic check: If the lemonade stand suddenly invents a new strawberry flavor that everyone loves, do you think more people will want to buy shares of the stand or sell them?`;
  }

  if (mode === "Professional") {
    return `When evaluating ${question || "market mechanics"}, institutional analysts examine capital structure, operating margins, and order flow velocity. ${diagramTag}\n\nPrice action reflects real-time order book imbalances between bids and asks. Institutional liquidity providers set support and resistance boundaries based on VWAP and volume profiles.\n\nSocratic check: How would an unexpected expansion in raw material costs impact a company's Operating Margin and Return on Equity (ROE)?`;
  }

  return `Great question about ${question || "financial markets"}! Let's examine how this works step-by-step. ${diagramTag}\n\nMarket prices move based on supply and demand equilibrium. When buyers are willing to pay higher prices to secure shares, price trends upward. When sellers outnumber buyers, prices adjust downward to find new liquidity.\n\nQuick follow-up: What do you think happens to a stock's price when a company reports earnings that are 30% higher than what analysts expected?`;
}

function generateResearchFallback(body: any) {
  const { symbol = "STOCK", name = "Company", pe = "22.5", eps = "45.2", roe = "18", debtToEquity = "0.2", revenueGrowth = "12", currentPrice = "1250", sector = "Technology" } = body || {};
  return {
    businessOverview: `${name} (${symbol}) operates in the ${sector} sector. It generates revenue by providing core products and services to B2B and retail consumers.`,
    fundamentalAnalysis: `With a P/E ratio of ${pe}, EPS of ₹${eps}, and ROE of ${roe}%, ${name} demonstrates robust financial performance. Revenue growth stands at ${revenueGrowth}% YoY.`,
    technicalAnalysis: `Trading near ₹${currentPrice}, the stock displays stable price action supported by key moving averages and balanced momentum indicators.`,
    riskAnalysis: `Primary risk factors include industry competition, regulatory changes, and debt-to-equity standing at ${debtToEquity}.`,
    bullCase: `Solid competitive moat, expanding operating margins, and consistent cash flow generation present upside potential.`,
    bearCase: `Macroeconomic headwinds or valuation multiple compression could limit short-term upside.`,
    investorChecklist: [
      "Verify quarterly revenue and profit growth trends",
      "Check institutional and promoter shareholding stability",
      "Compare P/E valuation against 5-year historical median",
      "Evaluate industry growth tailwinds and moat"
    ]
  };
}

function generateAnalystEvalFallback(body: any) {
  const { stockName = "Target Company", decision = "BUY" } = body || {};
  return {
    score: 88,
    praise: `You made a thoughtful ${decision} recommendation for ${stockName}, correctly analyzing key fundamentals and business trajectory.`,
    constructiveFeedback: "To strengthen your analysis further, compare the company's valuation metrics (such as P/E and EV/EBITDA) against its top 3 industry competitors.",
    keyTakeaways: [
      "Always verify profit margin trends alongside top-line revenue growth.",
      "Check debt service coverage ratio when analyzing companies with higher debt-to-equity.",
      "Incorporate technical support levels to optimize your entry timing."
    ],
    idealAnalysis: `A thorough analysis of ${stockName} balances revenue growth against valuation multiples, risk factors, and industry peer benchmarks.`
  };
}

function generateNewsFallback(newsText: string) {
  return {
    headlineSummary: newsText ? `Market Analysis: ${newsText.slice(0, 80)}...` : "Market & Policy Update Analysis",
    simpleExplanation: "Economic announcements, interest rate decisions, and corporate earnings directly influence market liquidity and investor confidence.",
    whyItMatters: "When macroeconomic conditions or interest rates change, corporate borrowing costs and equity valuations shift across industries.",
    potentialImpact: {
      positiveSectors: ["Banking & Financial Services", "Capital Goods & Infrastructure"],
      negativeSectors: ["High-Debt Growth Companies", "Real Estate (Mortgage Sensitivity)"],
      neutralSectors: ["Consumer Staples & Pharmaceuticals"]
    },
    socraticQuestions: [
      "How do higher central bank interest rates affect corporate profit margins?",
      "Why do investors reallocate capital from risky equities to fixed-income bonds when interest rates rise?"
    ]
  };
}

function generateChartExplanationFallback(body: any) {
  const { symbol = "STOCK", timeFrame = "1D", currentPrice = "1250", trend = "bullish", rsiValue = "58", macdSignal = "Bullish" } = body || {};
  return `Chart Technical Analysis for ${symbol} (${timeFrame} timeframe):

• **Price & Trend**: Currently trading around ₹${currentPrice} in a ${trend} pattern above key exponential moving averages (20 EMA / 50 EMA).
• **RSI Indicator (${rsiValue})**: Positioned in the healthy momentum zone (40–60), indicating sustained buying interest without being overbought (>70).
• **MACD Momentum**: Showing a ${macdSignal} signal, indicating positive directional velocity.
• **Key Takeaway**: Technical indicators provide probability clues. Always combine trend analysis with strict risk management and defined stop-loss levels.`;
}

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "StockMentor" });
});

// 1. Socratic AI Tutor Route
app.post("/api/ai/socratic", async (req, res) => {
  try {
    const { question = "", history, mode = "Simple", currentTopic } = req.body;
    const ai = getGenAI();

    let systemPrompt = `You are StockMentor, a patient, encouraging, and highly professional financial education tutor.
Your core teaching technique is the Socratic Method:
1. Never just dump textbook definitions or answer directly with wall of text.
2. Guide the user step by step through simple questions, real-world analogies, or practical examples.
3. Keep answers concise, clear, structured, and interactive.
4. Always ask 1 simple follow-up question or check for understanding at the end of your response.
5. Visual Diagram Tagging: When explaining technical analysis, candlestick patterns, breakouts, valuation ratios (P/E), cash flow, stop loss, or order books, include a relevant tag in your text: [DIAGRAM:candlestick], [DIAGRAM:breakout], [DIAGRAM:valuation_pe], [DIAGRAM:cashflow_flow], [DIAGRAM:risk_reward], [DIAGRAM:order_book], or [DIAGRAM:option_chain] so the UI renders an interactive visual diagram.
6. Mode requirement:
   - ELI5: Use extremely simple language, pizza/candy/lemonade stand analogies, no financial jargon without instant translation.
   - Simple: Clear beginner-friendly investor terms with plain English explanations.
   - Professional: Formal financial analysis terminology with ratios and institutional context.
7. Financial Safety: Include a subtle disclaimer when discussing specific stocks ("Educational explanation - not financial advice").`;

    if (currentTopic) {
      systemPrompt += `\nTopic Context: ${currentTopic}`;
    }

    if (!ai) {
      return res.json({ text: generateSocraticFallback(question, mode) });
    }

    const conversationContext = history && history.length > 0
      ? history.map((h: { role: string; text: string }) => `${h.role === "user" ? "User" : "Tutor"}: ${h.text}`).join("\n") + `\nUser: ${question}`
      : `User Question: ${question}`;

    try {
      const response = await generateContentWithFallback(ai, {
        contents: conversationContext,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || generateSocraticFallback(question, mode) });
    } catch (_apiErr) {
      res.json({ text: generateSocraticFallback(question, mode) });
    }
  } catch (_err: unknown) {
    res.json({ text: generateSocraticFallback(req.body?.question || "", req.body?.mode || "Simple") });
  }
});

// 2. Stock Research Report AI Route
app.post("/api/ai/research", async (req, res) => {
  try {
    const { symbol, name, pe, eps, roe, roce, debtToEquity, revenueGrowth, profitGrowth, currentPrice, sector } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({ report: generateResearchFallback(req.body) });
    }

    const prompt = `Analyze stock: ${name} (${symbol})
Sector: ${sector}
Price: ₹${currentPrice}
P/E: ${pe}, EPS: ₹${eps}, ROE: ${roe}%, ROCE: ${roce}%, D/E: ${debtToEquity}
Revenue Growth: ${revenueGrowth}%, Profit Growth: ${profitGrowth}%

Generate a structured 7-part educational Stock Research Report for a learner investor:
1. Business Overview (simple explanation of business model)
2. Fundamental Analysis (revenue, profit, ratios, valuation)
3. Technical Analysis (trend, support, resistance, moving averages, RSI)
4. Risk Analysis (debt, sector, valuation, earnings risks)
5. Bull Case (catalysts for growth)
6. Bear Case (downside risks)
7. Investor Checklist (4-5 key actionable check items)`;

    try {
      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessOverview: { type: Type.STRING },
              fundamentalAnalysis: { type: Type.STRING },
              technicalAnalysis: { type: Type.STRING },
              riskAnalysis: { type: Type.STRING },
              bullCase: { type: Type.STRING },
              bearCase: { type: Type.STRING },
              investorChecklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["businessOverview", "fundamentalAnalysis", "technicalAnalysis", "riskAnalysis", "bullCase", "bearCase", "investorChecklist"]
          }
        }
      });

      const reportJson = JSON.parse(response.text || "{}");
      res.json({ report: reportJson });
    } catch (_apiErr) {
      res.json({ report: generateResearchFallback(req.body) });
    }
  } catch (_err: unknown) {
    res.json({ report: generateResearchFallback(req.body) });
  }
});

// 3. "You Are the Analyst" Reasoning Evaluation
app.post("/api/ai/eval-analyst", async (req, res) => {
  try {
    const { stockName, decision, userReasoning, financialData } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({ evaluation: generateAnalystEvalFallback(req.body) });
    }

    const prompt = `Evaluate the user's investment reasoning for stock: ${stockName}
User Decision: ${decision} (BUY / HOLD / SELL)
User Reasoning: "${userReasoning}"
Financial Context: ${JSON.stringify(financialData)}

Provide constructive educational feedback evaluating their analytical reasoning.
Be encouraging, analytical, and Socratic. Highlight what they got right, what risks or metrics they missed, and what key takeaways they should remember.`;

    try {
      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Quality score from 0-100" },
              praise: { type: Type.STRING },
              constructiveFeedback: { type: Type.STRING },
              keyTakeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              idealAnalysis: { type: Type.STRING }
            },
            required: ["score", "praise", "constructiveFeedback", "keyTakeaways", "idealAnalysis"]
          }
        }
      });

      res.json({ evaluation: JSON.parse(response.text || "{}") });
    } catch (_apiErr) {
      res.json({ evaluation: generateAnalystEvalFallback(req.body) });
    }
  } catch (_err: unknown) {
    res.json({ evaluation: generateAnalystEvalFallback(req.body) });
  }
});

// 4. Financial News Analyzer Route
app.post("/api/ai/analyze-news", async (req, res) => {
  try {
    const { newsText = "" } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({ analysis: generateNewsFallback(newsText) });
    }

    const prompt = `Analyze this financial news headline/article for a beginner investor:
"${newsText}"

Break it down educationally into:
1. Headline Summary (1 sentence)
2. Simple Explanation (What happened in plain English?)
3. Why It Matters (Why do market participants care?)
4. Potential Impact (Positive sectors, negative sectors, neutral sectors)
5. Socratic Questions (2 thought-provoking questions to help the user test their understanding)`;

    try {
      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headlineSummary: { type: Type.STRING },
              simpleExplanation: { type: Type.STRING },
              whyItMatters: { type: Type.STRING },
              potentialImpact: {
                type: Type.OBJECT,
                properties: {
                  positiveSectors: { type: Type.ARRAY, items: { type: Type.STRING } },
                  negativeSectors: { type: Type.ARRAY, items: { type: Type.STRING } },
                  neutralSectors: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["positiveSectors", "negativeSectors", "neutralSectors"]
              },
              socraticQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["headlineSummary", "simpleExplanation", "whyItMatters", "potentialImpact", "socraticQuestions"]
          }
        }
      });

      res.json({ analysis: JSON.parse(response.text || "{}") });
    } catch (_apiErr) {
      res.json({ analysis: generateNewsFallback(newsText) });
    }
  } catch (_err: unknown) {
    res.json({ analysis: generateNewsFallback(req.body?.newsText || "") });
  }
});

// 5. "Explain This Chart" AI Route
app.post("/api/ai/explain-chart", async (req, res) => {
  try {
    const { symbol, timeFrame, indicators, currentPrice, trend, rsiValue, macdSignal } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({ explanation: generateChartExplanationFallback(req.body) });
    }

    const prompt = `Explain this stock chart technical setup in simple educational terms:
Stock: ${symbol}
Timeframe: ${timeFrame}
Price: ₹${currentPrice}
Primary Trend: ${trend}
RSI: ${rsiValue}
MACD Status: ${macdSignal}
Active Indicators: ${indicators ? indicators.join(", ") : "SMA, RSI, Volume"}

Provide a clear 4-bullet point explanation of what these chart indicators suggest, what key support/resistance levels mean, and what risks traders watch for. Avoid guarantees.`;

    try {
      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction: "You are StockMentor's Chart Analysis Assistant. Teach technical analysis conceptually without giving financial promises."
        }
      });

      res.json({ explanation: response.text });
    } catch (_apiErr) {
      res.json({ explanation: generateChartExplanationFallback(req.body) });
    }
  } catch (_err: unknown) {
    res.json({ explanation: generateChartExplanationFallback(req.body) });
  }
});

// Server setup for Vite Dev and Production static fallback
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StockMentor Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

