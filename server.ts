import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ============================================================================
// Google Gemini API Client Initialization (Lazy Singleton)
// Model: gemini-3.7-flash
// ============================================================================
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ============================================================================
// Socratic & Educational Fallback Engine (when API key is pending)
// ============================================================================
function generateFallbackSocratic(question: string, mode: string) {
  const qLower = (question || "").toLowerCase();

  let diagramTag = "";
  if (
    qLower.includes("candlestick") ||
    qLower.includes("reversal") ||
    qLower.includes("doji") ||
    qLower.includes("hammer")
  ) {
    diagramTag = "\n\n[DIAGRAM:candlestick]";
  } else if (
    qLower.includes("breakout") ||
    qLower.includes("support") ||
    qLower.includes("resistance")
  ) {
    diagramTag = "\n\n[DIAGRAM:breakout]";
  } else if (
    qLower.includes("p/e") ||
    qLower.includes("pe ratio") ||
    qLower.includes("valuation") ||
    qLower.includes("ratio")
  ) {
    diagramTag = "\n\n[DIAGRAM:valuation_pe]";
  } else if (
    qLower.includes("cash flow") ||
    qLower.includes("cashflow") ||
    qLower.includes("income") ||
    qLower.includes("statement")
  ) {
    diagramTag = "\n\n[DIAGRAM:cashflow_flow]";
  } else if (
    qLower.includes("stop loss") ||
    qLower.includes("risk") ||
    qLower.includes("reward") ||
    qLower.includes("target")
  ) {
    diagramTag = "\n\n[DIAGRAM:risk_reward]";
  } else if (
    qLower.includes("order book") ||
    qLower.includes("bid") ||
    qLower.includes("ask")
  ) {
    diagramTag = "\n\n[DIAGRAM:order_book]";
  } else if (
    qLower.includes("option") ||
    qLower.includes("call") ||
    qLower.includes("put")
  ) {
    diagramTag = "\n\n[DIAGRAM:option_chain]";
  }

  if (mode === "ELI5") {
    return (
      `Think of a company like a popular bakery that bakes 100 pies every single morning. When you buy one share of stock, you own a tiny piece of the entire bakery! 🥧\n\n` +
      `When the price of that share moves up or down on your chart, it's just buyers and sellers agreeing on what that slice is worth today based on how many people want fresh pies.` +
      diagramTag +
      `\n\n🤔 **Quick Socratic Question**: If the bakery invents an amazing new recipe and doubles its customer orders, do you think more people will want to buy shares or sell them?`
    );
  }

  if (mode === "Professional") {
    return (
      `Analyzing financial markets requires synthesizing dynamic price action, volume weighted indicators, and institutional liquidity structures.\n\n` +
      `Using technical confluence (20 EMA, 50 SMA, RSI momentum, and volume profile), institutional traders identify high-probability breakout channels and support/resistance zones while preserving strict 1:3 risk-to-reward parameters.` +
      diagramTag +
      `\n\n🎯 **Socratic Institutional Check**: When evaluating an RSI divergence where price registers a higher high but RSI forms a lower high, what does that indicate regarding institutional accumulation velocity?`
    );
  }

  return (
    `Great question about financial markets and trading mechanics! Let's break this down systematically step by step.\n\n` +
    `Every stock price represents the continuous auction between buyers (bids) and sellers (asks). When accumulation overwhelms distribution, price breaks out above resistance levels with volume expansion.` +
    diagramTag +
    `\n\n💡 **Socratic Check for Understanding**: What do you think typically happens to price momentum when a stock pulls back directly to a rising 20-period Exponential Moving Average (EMA)?`
  );
}

// ============================================================================
// REST API Endpoints Powered by Gemini API
// ============================================================================

// 1. Health check endpoint
app.get("/api/health", (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: "ok",
    app: "StockMentor",
    aiEngine: "Google Gemini AI",
    model: "gemini-3.7-flash",
    geminiConfigured: hasKey,
  });
});

// 2. Socratic AI Tutor Route (Powered by Gemini 3.7 Flash)
app.post("/api/ai/socratic", async (req, res) => {
  try {
    const { question = "", mode = "Simple", currentTopic = "General Market Concepts", history = [] } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      const fallbackText = generateFallbackSocratic(question, mode);
      return res.json({
        text: fallbackText,
        provider: "gemini-fallback",
        model: "gemini-3.7-flash",
      });
    }

    const systemInstruction = `You are StockMentor Socratic AI, an expert, patient, and pedagogical stock market educator and quantitative analyst.
Your goal is to guide students to understand financial markets, fundamental analysis, technical charting, macroeconomics, options, and risk management through active Socratic questioning.

Guidelines:
- Adapt explanation style to the requested mode:
  * ELI5: Use vivid, accessible everyday analogies (e.g., lemonade stands, bakeries, school clubs). Keep sentences clear, friendly, and engaging.
  * Simple/Standard: Clear, professional educational walkthrough with intuitive definitions and practical market examples.
  * Professional: Rigorous financial terminology (e.g., discounted cash flows, Sharpe ratio, implied volatility, VWAP, liquidity sweeps, beta).
- Always end your response with an insightful, thought-provoking Socratic question to test and reinforce the user's conceptual grasp.
- When explaining visual concepts, include ONE appropriate diagram tag on its own line:
  * Candlestick & price patterns: [DIAGRAM:candlestick]
  * Support, resistance & breakouts: [DIAGRAM:breakout]
  * P/E ratio & valuation multiples: [DIAGRAM:valuation_pe]
  * Financial statements & cash flows: [DIAGRAM:cashflow_flow]
  * Stop-loss & risk/reward sizing: [DIAGRAM:risk_reward]
  * Bids, asks & order book depth: [DIAGRAM:order_book]
  * Call & Put options dynamics: [DIAGRAM:option_chain]
- Current topic context: ${currentTopic}.`;

    // Construct conversation contents with history
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: question }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || generateFallbackSocratic(question, mode);
    res.json({
      text,
      provider: "gemini-3.7-flash",
      model: "gemini-3.7-flash",
    });
  } catch (err: any) {
    console.warn("Gemini Socratic API Error:", err?.message || err);
    res.json({
      text: generateFallbackSocratic(req.body?.question || "", req.body?.mode || "Simple"),
      provider: "gemini-fallback",
      error: err?.message,
    });
  }
});

// 3. Stock Research Report AI Route (Structured JSON via Gemini 3.7 Flash)
app.post("/api/ai/research", async (req, res) => {
  try {
    const { symbol = "AAPL", stockName = "Apple Inc." } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        report: {
          businessOverview: `${stockName} (${symbol}) operates as a leading global enterprise with diverse revenue streams and durable competitive moats.`,
          fundamentalAnalysis: `Fundamental analysis indicates robust return on invested capital (ROIC), strong operating cash flow generation, and healthy balance sheet liquidity.`,
          technicalAnalysis: `Price action consolidates above key moving averages (20 EMA and 50 SMA) with constructive accumulation volume and healthy momentum oscillators.`,
          riskAnalysis: `Primary risk vectors include macroeconomic headwinds, regulatory scrutiny, supply chain complexities, and broader equity multiple compression.`,
          bullCase: `Accelerated product ecosystem adoption, margin expansion via high-margin software services, and disciplined shareholder capital return programs.`,
          bearCase: `Potential demand cyclicality, rising competitive pressures in core segments, or valuation multiple contraction during rising rate regimes.`,
          investorChecklist: [
            `Analyze quarterly free cash flow margin trajectory`,
            `Assess price alignment relative to 50-day and 200-day moving averages`,
            `Verify revenue diversification across product lines`,
            `Pre-define position sizing and downside stop-loss parameters`,
          ],
        },
        provider: "gemini-fallback",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Generate a comprehensive, institutional-grade equity research report for stock ticker ${symbol} (${stockName}). Provide in-depth, rigorous financial and technical analysis suitable for investors.`,
      config: {
        systemInstruction:
          "You are a Senior Equity Research Analyst and Portfolio Strategist. Produce a thorough, objective, 7-part investment breakdown for the given stock ticker.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessOverview: {
              type: Type.STRING,
              description: "Executive summary of business model, economic moat, and revenue engines.",
            },
            fundamentalAnalysis: {
              type: Type.STRING,
              description: "Valuation multiples, profitability margins, balance sheet health, and ROIC.",
            },
            technicalAnalysis: {
              type: Type.STRING,
              description: "Trend structure, key support/resistance levels, moving averages, and momentum.",
            },
            riskAnalysis: {
              type: Type.STRING,
              description: "Key operational, macroeconomic, regulatory, and market risks.",
            },
            bullCase: {
              type: Type.STRING,
              description: "Primary catalyst scenarios driving upside valuation expansion.",
            },
            bearCase: {
              type: Type.STRING,
              description: "Potential downside catalysts and valuation contraction risks.",
            },
            investorChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4-5 actionable criteria for evaluating entries on this stock.",
            },
          },
          required: [
            "businessOverview",
            "fundamentalAnalysis",
            "technicalAnalysis",
            "riskAnalysis",
            "bullCase",
            "bearCase",
            "investorChecklist",
          ],
        },
      },
    });

    const parsedReport = JSON.parse(response.text || "{}");
    res.json({
      report: parsedReport,
      provider: "gemini-3.7-flash",
    });
  } catch (err: any) {
    console.warn("Gemini Research Report Error:", err?.message || err);
    res.status(500).json({ error: err?.message });
  }
});

// 4. Trade Reasoning & Analyst Evaluation Route (Gemini 3.7 Flash)
app.post("/api/ai/eval-analyst", async (req, res) => {
  try {
    const { stockName = "Target Stock", decision = "BUY", userReasoning = "" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      const feedback = {
        score: userReasoning.length > 50 ? 92 : 78,
        praise: `You articulated a structured ${decision} thesis for ${stockName}, demonstrating solid foundational logic.`,
        constructiveFeedback:
          "To elevate your analysis to an institutional standard, incorporate quantitative risk-reward ratios, reference key moving average support, and verify volume confluence.",
        keyTakeaways: [
          "Always quantify the upside target vs. downside stop-loss (minimum 1:2 ratio).",
          "Cross-reference fundamental catalysts with price action confirmation.",
          "Maintain strict position sizing rules to preserve portfolio capital.",
        ],
        idealAnalysis: `An institutional thesis on ${stockName} balances revenue growth consistency with clear technical support levels and predefined risk boundaries.`,
      };
      return res.json({ evaluation: feedback, provider: "gemini-fallback" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Evaluate this student trader's investment thesis:
- Target Stock: ${stockName}
- Decision: ${decision}
- User Reasoning: "${userReasoning}"

Provide a detailed pedagogical critique with an analytical score (0-100), praise, constructive feedback, key takeaways, and an ideal model thesis.`,
      config: {
        systemInstruction:
          "You are the Head of Trading Education evaluating an analyst trainee. Provide constructive, precise feedback on their trade thesis.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Numerical score from 0 to 100 based on analytical rigor." },
            praise: { type: Type.STRING, description: "What the user did well in their thesis." },
            constructiveFeedback: { type: Type.STRING, description: "Actionable areas for improving the thesis." },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 key investment rules or trading lessons.",
            },
            idealAnalysis: { type: Type.STRING, description: "How a senior institutional analyst would structure this thesis." },
          },
          required: ["score", "praise", "constructiveFeedback", "keyTakeaways", "idealAnalysis"],
        },
      },
    });

    const evaluation = JSON.parse(response.text || "{}");
    res.json({ evaluation, provider: "gemini-3.7-flash" });
  } catch (err: any) {
    console.warn("Gemini Analyst Evaluation Error:", err?.message || err);
    res.status(500).json({ error: err?.message });
  }
});

// 5. Financial News Sentiment & Macro Analyzer Route (Gemini 3.7 Flash)
app.post("/api/ai/analyze-news", async (req, res) => {
  try {
    const { newsText = "" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        analysis: {
          headlineSummary: newsText
            ? `Market Briefing: ${newsText.slice(0, 90)}...`
            : "Market & Macroeconomic Policy Analysis",
          simpleExplanation:
            "Central bank interest rate decisions, inflation data, and macroeconomic policy shifts fundamentally alter capital borrowing costs and corporate valuation multiples.",
          whyItMatters:
            "Shifts in liquidity directly affect corporate discounted cash flows and institutional sector allocations.",
          potentialImpact: {
            positiveSectors: ["Banking & Financial Services", "Infrastructure & Capital Goods"],
            negativeSectors: ["High-Multiple Unprofitable Tech", "Leveraged Real Estate"],
            neutralSectors: ["Consumer Staples", "Healthcare & Utilities"],
          },
          socraticQuestions: [
            "How do rising bond yields influence equity price-to-earnings multiples?",
            "Why do defensive sectors typically outperform cyclical sectors during economic slowdowns?",
          ],
        },
        provider: "gemini-fallback",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Analyze this financial news article / market event for educational investors:
"${newsText}"`,
      config: {
        systemInstruction:
          "You are a Chief Financial Economist. Deconstruct market news into clear, accessible, and structured educational takeaways for investors.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headlineSummary: { type: Type.STRING, description: "Concise 1-sentence executive summary." },
            simpleExplanation: { type: Type.STRING, description: "ELI5 explanation of the mechanics behind the news." },
            whyItMatters: { type: Type.STRING, description: "Why investors and financial markets care about this event." },
            potentialImpact: {
              type: Type.OBJECT,
              properties: {
                positiveSectors: { type: Type.ARRAY, items: { type: Type.STRING } },
                negativeSectors: { type: Type.ARRAY, items: { type: Type.STRING } },
                neutralSectors: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["positiveSectors", "negativeSectors", "neutralSectors"],
            },
            socraticQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 thought-provoking questions to test the student's economic deduction.",
            },
          },
          required: [
            "headlineSummary",
            "simpleExplanation",
            "whyItMatters",
            "potentialImpact",
            "socraticQuestions",
          ],
        },
      },
    });

    const analysis = JSON.parse(response.text || "{}");
    res.json({ analysis, provider: "gemini-3.7-flash" });
  } catch (err: any) {
    console.warn("Gemini News Analysis Error:", err?.message || err);
    res.status(500).json({ error: err?.message });
  }
});

// 6. Technical Chart Breakdown Route (Gemini 3.7 Flash)
app.post("/api/ai/explain-chart", async (req, res) => {
  try {
    const {
      symbol = "AAPL",
      timeFrame = "1D",
      indicators = ["SMA-20", "RSI-14", "Volume"],
      currentPrice = "180.00",
      trend = "Bullish",
      rsiValue = "58",
      macdSignal = "Positive Momentum",
    } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      const explanation =
        `Technical Chart Breakdown for ${symbol} (${timeFrame} timeframe):\n\n` +
        `• **Price Structure & Trend**: Trading around ₹${currentPrice} in a defined ${trend} channel above key exponential moving averages (20 EMA / 50 SMA).\n` +
        `• **Momentum Indicator (RSI ${rsiValue})**: Positioned in the healthy expansion zone (45–65), indicating accumulation without overbought exhaustion (>70).\n` +
        `• **MACD Signal**: Showing a ${macdSignal} configuration with expanding histogram bars, suggesting continued upward velocity.\n` +
        `• **Actionable Takeaway**: Look for pullbacks toward 20 EMA support for low-risk entries, placing stop-losses just below swing lows.`;
      return res.json({ explanation, provider: "gemini-fallback" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Provide a concise, educational technical chart breakdown:
- Symbol: ${symbol}
- Timeframe: ${timeFrame}
- Current Price: ₹${currentPrice}
- Trend: ${trend}
- RSI (14): ${rsiValue}
- MACD Signal: ${macdSignal}
- Active Indicators: ${indicators.join(", ")}`,
      config: {
        systemInstruction:
          "You are a Chartered Market Technician (CMT) instructor. Provide bulleted, high-clarity technical chart analysis explaining price action, momentum, and risk boundaries.",
        temperature: 0.6,
      },
    });

    res.json({
      explanation: response.text,
      provider: "gemini-3.7-flash",
    });
  } catch (err: any) {
    console.warn("Gemini Chart Explain Error:", err?.message || err);
    res.status(500).json({ error: err?.message });
  }
});

// ============================================================================
// Vite Dev & Production Static Middleware
// ============================================================================
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
    console.log(`StockMentor Server powered by Google Gemini AI running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
