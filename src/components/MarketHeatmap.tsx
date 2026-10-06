import React, { useState, useMemo } from "react";
import { TabType } from "../types";
import { 
  LuxuryPanel, 
  SectionHeader, 
  PrecisionButton, 
  MarketIndicator 
} from "./ui/LuxuryPrimitives";
import { 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  BarChart3, 
  Brain, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  Maximize2, 
  Filter, 
  Info, 
  X,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export interface HeatmapStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCapCr: number; // In ₹ Crores
  pe: number;
  volume: string;
  rsi: number;
  high: number;
  low: number;
}

export interface HeatmapSector {
  id: string;
  name: string;
  shortName: string;
  weight: number; // Benchmark weight percentage
  changePercent: number;
  advances: number;
  declines: number;
  stocks: HeatmapStock[];
}

export const SECTOR_HEATMAP_DATA: HeatmapSector[] = [
  {
    id: "finance",
    name: "Banking & Financial Services",
    shortName: "Financials",
    weight: 31.5,
    changePercent: 0.88,
    advances: 4,
    declines: 2,
    stocks: [
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        price: 1642.30,
        change: 13.80,
        changePercent: 0.85,
        marketCapCr: 1251000,
        pe: 18.2,
        volume: "1.2 Cr",
        rsi: 58,
        high: 1650.00,
        low: 1632.00
      },
      {
        symbol: "ICICIBANK",
        name: "ICICI Bank Ltd",
        price: 1284.10,
        change: 20.50,
        changePercent: 1.62,
        marketCapCr: 902000,
        pe: 17.4,
        volume: "98.5 L",
        rsi: 64,
        high: 1290.00,
        low: 1268.00
      },
      {
        symbol: "SBIN",
        name: "State Bank of India",
        price: 815.20,
        change: -3.70,
        changePercent: -0.45,
        marketCapCr: 727000,
        pe: 10.8,
        volume: "1.4 Cr",
        rsi: 49,
        high: 824.00,
        low: 812.50
      },
      {
        symbol: "AXISBANK",
        name: "Axis Bank Ltd",
        price: 1190.50,
        change: 13.50,
        changePercent: 1.15,
        marketCapCr: 368000,
        pe: 14.1,
        volume: "52.0 L",
        rsi: 55,
        high: 1196.00,
        low: 1180.00
      },
      {
        symbol: "KOTAKBANK",
        name: "Kotak Mahindra Bank",
        price: 1780.00,
        change: 5.30,
        changePercent: 0.30,
        marketCapCr: 354000,
        pe: 19.8,
        volume: "31.2 L",
        rsi: 52,
        high: 1792.00,
        low: 1774.00
      },
      {
        symbol: "BAJFINANCE",
        name: "Bajaj Finance Ltd",
        price: 6920.00,
        change: -84.00,
        changePercent: -1.20,
        marketCapCr: 428000,
        pe: 28.5,
        volume: "18.4 L",
        rsi: 42,
        high: 7040.00,
        low: 6890.00
      }
    ]
  },
  {
    id: "it",
    name: "Information Technology",
    shortName: "Technology",
    weight: 16.8,
    changePercent: 0.74,
    advances: 4,
    declines: 2,
    stocks: [
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        price: 4210.80,
        change: -18.20,
        changePercent: -0.43,
        marketCapCr: 1522000,
        pe: 31.2,
        volume: "22.5 L",
        rsi: 44,
        high: 4240.00,
        low: 4205.00
      },
      {
        symbol: "INFY",
        name: "Infosys Ltd",
        price: 1865.00,
        change: 14.50,
        changePercent: 0.78,
        marketCapCr: 774000,
        pe: 28.5,
        volume: "48.1 L",
        rsi: 61,
        high: 1872.00,
        low: 1850.00
      },
      {
        symbol: "HCLTECH",
        name: "HCL Technologies Ltd",
        price: 1820.00,
        change: 26.00,
        changePercent: 1.45,
        marketCapCr: 494000,
        pe: 26.4,
        volume: "34.0 L",
        rsi: 66,
        high: 1828.00,
        low: 1802.00
      },
      {
        symbol: "WIPRO",
        name: "Wipro Ltd",
        price: 540.20,
        change: -4.60,
        changePercent: -0.85,
        marketCapCr: 282000,
        pe: 24.1,
        volume: "65.0 L",
        rsi: 46,
        high: 548.00,
        low: 538.00
      },
      {
        symbol: "TECHM",
        name: "Tech Mahindra Ltd",
        price: 1680.00,
        change: 18.20,
        changePercent: 1.10,
        marketCapCr: 164000,
        pe: 38.0,
        volume: "19.5 L",
        rsi: 59,
        high: 1690.00,
        low: 1665.00
      },
      {
        symbol: "LTIM",
        name: "LTIMindtree Ltd",
        price: 6120.00,
        change: 129.00,
        changePercent: 2.15,
        marketCapCr: 181000,
        pe: 34.6,
        volume: "12.0 L",
        rsi: 72,
        high: 6150.00,
        low: 5980.00
      }
    ]
  },
  {
    id: "energy",
    name: "Energy, Oil & Petrochemicals",
    shortName: "Energy",
    weight: 14.5,
    changePercent: 1.14,
    advances: 5,
    declines: 1,
    stocks: [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        price: 2984.50,
        change: 32.40,
        changePercent: 1.10,
        marketCapCr: 2018000,
        pe: 28.4,
        volume: "84.2 L",
        rsi: 64,
        high: 2995.00,
        low: 2955.00
      },
      {
        symbol: "ONGC",
        name: "Oil and Natural Gas Corp",
        price: 312.40,
        change: 7.50,
        changePercent: 2.45,
        marketCapCr: 393000,
        pe: 7.2,
        volume: "1.8 Cr",
        rsi: 68,
        high: 315.00,
        low: 306.00
      },
      {
        symbol: "NTPC",
        name: "NTPC Ltd",
        price: 415.00,
        change: 3.50,
        changePercent: 0.85,
        marketCapCr: 402000,
        pe: 16.5,
        volume: "1.1 Cr",
        rsi: 59,
        high: 418.00,
        low: 411.00
      },
      {
        symbol: "POWERGRID",
        name: "Power Grid Corp of India",
        price: 340.20,
        change: 1.35,
        changePercent: 0.40,
        marketCapCr: 316000,
        pe: 18.9,
        volume: "92.0 L",
        rsi: 53,
        high: 343.00,
        low: 338.50
      },
      {
        symbol: "COALINDIA",
        name: "Coal India Ltd",
        price: 495.00,
        change: -3.00,
        changePercent: -0.60,
        marketCapCr: 305000,
        pe: 8.8,
        volume: "76.0 L",
        rsi: 47,
        high: 502.00,
        low: 492.00
      },
      {
        symbol: "BPCL",
        name: "Bharat Petroleum Corp",
        price: 345.50,
        change: 6.10,
        changePercent: 1.80,
        marketCapCr: 150000,
        pe: 5.4,
        volume: "1.3 Cr",
        rsi: 63,
        high: 348.00,
        low: 339.00
      }
    ]
  },
  {
    id: "auto",
    name: "Automobiles & Mobility",
    shortName: "Automobile",
    weight: 8.8,
    changePercent: 1.28,
    advances: 4,
    declines: 1,
    stocks: [
      {
        symbol: "TATAMOTORS",
        name: "Tata Motors Ltd",
        price: 1045.00,
        change: 22.10,
        changePercent: 2.16,
        marketCapCr: 386000,
        pe: 11.8,
        volume: "1.8 Cr",
        rsi: 71,
        high: 1052.00,
        low: 1020.00
      },
      {
        symbol: "M&M",
        name: "Mahindra & Mahindra Ltd",
        price: 3080.00,
        change: 56.00,
        changePercent: 1.85,
        marketCapCr: 383000,
        pe: 29.5,
        volume: "42.0 L",
        rsi: 67,
        high: 3095.00,
        low: 3020.00
      },
      {
        symbol: "MARUTI",
        name: "Maruti Suzuki India",
        price: 12450.00,
        change: -68.00,
        changePercent: -0.55,
        marketCapCr: 391000,
        pe: 26.8,
        volume: "6.5 L",
        rsi: 48,
        high: 12580.00,
        low: 12410.00
      },
      {
        symbol: "BAJAJ-AUTO",
        name: "Bajaj Auto Ltd",
        price: 11200.00,
        change: 83.00,
        changePercent: 0.75,
        marketCapCr: 312000,
        pe: 36.2,
        volume: "4.8 L",
        rsi: 58,
        high: 11280.00,
        low: 11110.00
      },
      {
        symbol: "EICHERMOT",
        name: "Eicher Motors Ltd",
        price: 4850.00,
        change: 67.00,
        changePercent: 1.40,
        marketCapCr: 133000,
        pe: 31.0,
        volume: "8.2 L",
        rsi: 62,
        high: 4880.00,
        low: 4790.00
      }
    ]
  },
  {
    id: "fmcg",
    name: "Fast-Moving Consumer Goods",
    shortName: "FMCG",
    weight: 8.2,
    changePercent: -0.12,
    advances: 2,
    declines: 3,
    stocks: [
      {
        symbol: "ITC",
        name: "ITC Ltd",
        price: 512.00,
        change: 2.30,
        changePercent: 0.45,
        marketCapCr: 641000,
        pe: 30.2,
        volume: "1.1 Cr",
        rsi: 54,
        high: 515.00,
        low: 509.00
      },
      {
        symbol: "HINDUNILVR",
        name: "Hindustan Unilever Ltd",
        price: 2840.00,
        change: -27.00,
        changePercent: -0.95,
        marketCapCr: 667000,
        pe: 58.4,
        volume: "16.0 L",
        rsi: 41,
        high: 2875.00,
        low: 2832.00
      },
      {
        symbol: "NESTLEIND",
        name: "Nestle India Ltd",
        price: 2620.00,
        change: -10.50,
        changePercent: -0.40,
        marketCapCr: 252000,
        pe: 72.0,
        volume: "9.5 L",
        rsi: 45,
        high: 2640.00,
        low: 2612.00
      },
      {
        symbol: "BRITANNIA",
        name: "Britannia Industries Ltd",
        price: 6100.00,
        change: 39.00,
        changePercent: 0.65,
        marketCapCr: 147000,
        pe: 62.1,
        volume: "5.4 L",
        rsi: 56,
        high: 6140.00,
        low: 6050.00
      },
      {
        symbol: "TITAN",
        name: "Titan Company Ltd",
        price: 3750.00,
        change: 48.00,
        changePercent: 1.30,
        marketCapCr: 333000,
        pe: 82.5,
        volume: "11.0 L",
        rsi: 65,
        high: 3770.00,
        low: 3705.00
      }
    ]
  },
  {
    id: "pharma",
    name: "Pharmaceuticals & Healthcare",
    shortName: "Pharma",
    weight: 6.4,
    changePercent: 1.05,
    advances: 4,
    declines: 1,
    stocks: [
      {
        symbol: "SUNPHARMA",
        name: "Sun Pharmaceutical Ind",
        price: 1920.00,
        change: 27.50,
        changePercent: 1.45,
        marketCapCr: 461000,
        pe: 38.6,
        volume: "24.0 L",
        rsi: 68,
        high: 1932.00,
        low: 1895.00
      },
      {
        symbol: "CIPLA",
        name: "Cipla Ltd",
        price: 1620.00,
        change: 13.60,
        changePercent: 0.85,
        marketCapCr: 131000,
        pe: 27.5,
        volume: "18.0 L",
        rsi: 57,
        high: 1630.00,
        low: 1608.00
      },
      {
        symbol: "DRREDDY",
        name: "Dr. Reddy's Laboratories",
        price: 6750.00,
        change: -51.00,
        changePercent: -0.75,
        marketCapCr: 113000,
        pe: 18.4,
        volume: "6.2 L",
        rsi: 46,
        high: 6820.00,
        low: 6730.00
      },
      {
        symbol: "DIVISLAB",
        name: "Divi's Laboratories Ltd",
        price: 5450.00,
        change: 122.00,
        changePercent: 2.30,
        marketCapCr: 145000,
        pe: 74.2,
        volume: "8.5 L",
        rsi: 74,
        high: 5480.00,
        low: 5330.00
      },
      {
        symbol: "APOLLOHOSP",
        name: "Apollo Hospitals Enterprise",
        price: 7150.00,
        change: 78.00,
        changePercent: 1.10,
        marketCapCr: 103000,
        pe: 89.0,
        volume: "7.0 L",
        rsi: 61,
        high: 7190.00,
        low: 7070.00
      }
    ]
  },
  {
    id: "metals",
    name: "Metals & Mining",
    shortName: "Metals",
    weight: 5.4,
    changePercent: 2.24,
    advances: 3,
    declines: 1,
    stocks: [
      {
        symbol: "TATASTEEL",
        name: "Tata Steel Ltd",
        price: 168.40,
        change: 4.65,
        changePercent: 2.85,
        marketCapCr: 210000,
        pe: 32.0,
        volume: "5.4 Cr",
        rsi: 72,
        high: 170.00,
        low: 164.00
      },
      {
        symbol: "JSWSTEEL",
        name: "JSW Steel Ltd",
        price: 1015.00,
        change: 20.90,
        changePercent: 2.10,
        marketCapCr: 248000,
        pe: 25.4,
        volume: "38.0 L",
        rsi: 69,
        high: 1022.00,
        low: 996.00
      },
      {
        symbol: "HINDALCO",
        name: "Hindalco Industries Ltd",
        price: 745.00,
        change: 23.10,
        changePercent: 3.20,
        marketCapCr: 168000,
        pe: 14.8,
        volume: "82.0 L",
        rsi: 76,
        high: 752.00,
        low: 724.00
      },
      {
        symbol: "VEDL",
        name: "Vedanta Ltd",
        price: 490.00,
        change: -2.20,
        changePercent: -0.45,
        marketCapCr: 191000,
        pe: 16.5,
        volume: "1.9 Cr",
        rsi: 51,
        high: 498.00,
        low: 486.00
      }
    ]
  },
  {
    id: "infra",
    name: "Capital Goods & Infrastructure",
    shortName: "Capital Goods",
    weight: 8.4,
    changePercent: 1.55,
    advances: 5,
    declines: 0,
    stocks: [
      {
        symbol: "LT",
        name: "Larsen & Toubro Ltd",
        price: 3680.00,
        change: 63.00,
        changePercent: 1.75,
        marketCapCr: 506000,
        pe: 34.8,
        volume: "24.0 L",
        rsi: 66,
        high: 3705.00,
        low: 3620.00
      },
      {
        symbol: "ADANIENT",
        name: "Adani Enterprises Ltd",
        price: 3180.00,
        change: 30.00,
        changePercent: 0.95,
        marketCapCr: 363000,
        pe: 88.0,
        volume: "19.0 L",
        rsi: 58,
        high: 3210.00,
        low: 3150.00
      },
      {
        symbol: "ADANIPORTS",
        name: "Adani Ports and SEZ",
        price: 1450.00,
        change: 18.00,
        changePercent: 1.25,
        marketCapCr: 313000,
        pe: 31.5,
        volume: "35.0 L",
        rsi: 62,
        high: 1465.00,
        low: 1432.00
      },
      {
        symbol: "BEL",
        name: "Bharat Electronics Ltd",
        price: 305.00,
        change: 7.70,
        changePercent: 2.60,
        marketCapCr: 223000,
        pe: 45.2,
        volume: "1.6 Cr",
        rsi: 73,
        high: 308.00,
        low: 298.00
      },
      {
        symbol: "SIEMENS",
        name: "Siemens Ltd",
        price: 7450.00,
        change: 139.00,
        changePercent: 1.90,
        marketCapCr: 265000,
        pe: 85.0,
        volume: "4.5 L",
        rsi: 68,
        high: 7510.00,
        low: 7320.00
      }
    ]
  }
];

interface MarketHeatmapProps {
  onOpenSocraticWithQuestion?: (question: string) => void;
  setActiveTab?: (tab: TabType) => void;
  className?: string;
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({
  onOpenSocraticWithQuestion,
  setActiveTab,
  className = ""
}) => {
  // Mode: 'sectors' or 'constituents'
  const [viewMode, setViewMode] = useState<"sectors" | "constituents">("sectors");
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "YTD">("1D");
  const [filterDirection, setFilterDirection] = useState<"all" | "gainers" | "losers">("all");
  const [selectedStock, setSelectedStock] = useState<HeatmapStock | null>(null);
  const [selectedSector, setSelectedSector] = useState<HeatmapSector | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Total Market Statistics
  const stats = useMemo(() => {
    let totalAdv = 0;
    let totalDec = 0;
    let weightedChangeSum = 0;
    let totalWeight = 0;

    SECTOR_HEATMAP_DATA.forEach(s => {
      totalAdv += s.advances;
      totalDec += s.declines;
      weightedChangeSum += s.changePercent * s.weight;
      totalWeight += s.weight;
    });

    const avgMarketChange = weightedChangeSum / (totalWeight || 1);
    const breadthPercent = Math.round((totalAdv / (totalAdv + totalDec || 1)) * 100);

    // Sort sectors by performance
    const sortedSectors = [...SECTOR_HEATMAP_DATA].sort((a, b) => b.changePercent - a.changePercent);
    const topSector = sortedSectors[0];
    const lagSector = sortedSectors[sortedSectors.length - 1];

    return {
      advances: totalAdv,
      declines: totalDec,
      avgMarketChange,
      breadthPercent,
      topSector,
      lagSector
    };
  }, []);

  // Filtered Sectors
  const filteredSectors = useMemo(() => {
    return SECTOR_HEATMAP_DATA.filter(sec => {
      if (filterDirection === "gainers" && sec.changePercent <= 0) return false;
      if (filterDirection === "losers" && sec.changePercent >= 0) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSector = sec.name.toLowerCase().includes(q) || sec.shortName.toLowerCase().includes(q);
        const matchesStock = sec.stocks.some(st => 
          st.symbol.toLowerCase().includes(q) || st.name.toLowerCase().includes(q)
        );
        if (!matchesSector && !matchesStock) return false;
      }
      return true;
    });
  }, [filterDirection, searchQuery]);

  // Color generator for treemap nodes
  const getChangeColorStyles = (changePercent: number) => {
    if (changePercent >= 2.0) {
      return {
        bg: "bg-emerald-600/90 dark:bg-[#059669]",
        border: "border-emerald-400/40",
        text: "text-white",
        badge: "bg-emerald-700/80 text-emerald-100",
        accentGlow: "shadow-[0_0_15px_rgba(5,150,105,0.35)]"
      };
    }
    if (changePercent >= 0.75) {
      return {
        bg: "bg-emerald-600/60 dark:bg-[#10B981]/50",
        border: "border-emerald-500/30",
        text: "text-white",
        badge: "bg-emerald-800/60 text-emerald-100",
        accentGlow: "shadow-[0_0_10px_rgba(16,185,129,0.2)]"
      };
    }
    if (changePercent > 0) {
      return {
        bg: "bg-emerald-700/35 dark:bg-[#047857]/35",
        border: "border-emerald-500/20",
        text: "text-emerald-100",
        badge: "bg-emerald-900/60 text-emerald-200",
        accentGlow: ""
      };
    }
    if (changePercent === 0) {
      return {
        bg: "bg-slate-800/80 dark:bg-slate-800/60",
        border: "border-slate-700/40",
        text: "text-slate-300",
        badge: "bg-slate-700 text-slate-300",
        accentGlow: ""
      };
    }
    if (changePercent > -0.75) {
      return {
        bg: "bg-rose-700/35 dark:bg-[#9F1239]/35",
        border: "border-rose-500/20",
        text: "text-rose-100",
        badge: "bg-rose-900/60 text-rose-200",
        accentGlow: ""
      };
    }
    if (changePercent > -2.0) {
      return {
        bg: "bg-rose-600/60 dark:bg-[#E11D48]/50",
        border: "border-rose-500/30",
        text: "text-white",
        badge: "bg-rose-800/60 text-rose-100",
        accentGlow: "shadow-[0_0_10px_rgba(225,29,72,0.2)]"
      };
    }
    return {
      bg: "bg-rose-600/90 dark:bg-[#BE123C]",
      border: "border-rose-400/40",
      text: "text-white",
      badge: "bg-rose-700/80 text-rose-100",
      accentGlow: "shadow-[0_0_15px_rgba(190,18,60,0.35)]"
    };
  };

  return (
    <LuxuryPanel elevated className={`p-5 sm:p-6 space-y-5 ${className}`}>
      
      {/* ================================================================ */}
      {/* 1. Header with Live Telemetry Breadth & Controls */}
      {/* ================================================================ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-blue-600 dark:text-[#6F9BFF] font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              REAL-TIME SECTOR MAP
            </span>
            <span className="text-slate-300 dark:text-white/20">·</span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-[#6EE7B7] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              NSE ACTIVE TELEMETRY
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-[#F5F5F0]">
              Market Treemap Heatmap
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-[#A5A8AE]">
              Weighted by Market Capitalization
            </span>
          </div>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Mode Switcher: Sectors vs Constituents */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] text-[11px] font-mono">
            <button
              onClick={() => setViewMode("sectors")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                viewMode === "sectors"
                  ? "bg-white dark:bg-white/[0.12] text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-[#727680] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Sector Overview
            </button>
            <button
              onClick={() => setViewMode("constituents")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                viewMode === "constituents"
                  ? "bg-white dark:bg-white/[0.12] text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-[#727680] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Top Equities
            </button>
          </div>

          {/* Filter: All / Gainers / Losers */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] text-[11px] font-mono">
            <button
              onClick={() => setFilterDirection("all")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterDirection === "all"
                  ? "bg-white dark:bg-white/[0.12] text-slate-900 dark:text-white font-bold"
                  : "text-slate-500 dark:text-[#727680] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilterDirection("gainers")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterDirection === "gainers"
                  ? "bg-emerald-500 text-white font-bold"
                  : "text-emerald-600 dark:text-[#6EE7B7] hover:text-emerald-700"
              }`}
            >
              BULLS
            </button>
            <button
              onClick={() => setFilterDirection("losers")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterDirection === "losers"
                  ? "bg-rose-500 text-white font-bold"
                  : "text-rose-600 dark:text-[#FF7B86] hover:text-rose-700"
              }`}
            >
              BEARS
            </button>
          </div>

          {/* Quick AI Mentor Insight */}
          {onOpenSocraticWithQuestion && (
            <PrecisionButton
              variant="secondary"
              size="sm"
              icon={<Brain className="w-3.5 h-3.5 text-blue-500 dark:text-[#6F9BFF]" />}
              onClick={() => onOpenSocraticWithQuestion(
                `Explain the current sector rotation today: ${stats.topSector.name} is leading with +${stats.topSector.changePercent}% while ${stats.lagSector.name} is lagging with ${stats.lagSector.changePercent}%. What macro factors drive this disparity?`
              )}
            >
              Ask AI Rotation
            </PrecisionButton>
          )}

        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. Real-time Market Breadth Telemetry Bar */}
      {/* ================================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        
        {/* Advance / Decline Bar */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090D] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-[#727680] uppercase tracking-wider block">
              Market Breadth
            </span>
            <div className="flex items-center gap-2 mt-0.5 font-bold">
              <span className="text-emerald-600 dark:text-[#6EE7B7]">▲ {stats.advances} Adv</span>
              <span className="text-slate-400">/</span>
              <span className="text-rose-600 dark:text-[#FF7B86]">▼ {stats.declines} Dec</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-emerald-600 dark:text-[#6EE7B7]">
              {stats.breadthPercent}%
            </span>
            <span className="text-[9px] text-slate-400 block">Bullish</span>
          </div>
        </div>

        {/* Weighted Market Drift */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090D] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-[#727680] uppercase tracking-wider block">
              Weighted Index Drift
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              +{stats.avgMarketChange.toFixed(2)}%
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-[#6EE7B7] border border-emerald-500/20 font-bold">
            ACCUMULATION
          </span>
        </div>

        {/* Top Momentum Sector */}
        <div 
          onClick={() => setSelectedSector(stats.topSector)}
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090D] border border-slate-200/80 dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors cursor-pointer group"
        >
          <span className="text-[10px] text-slate-500 dark:text-[#727680] uppercase tracking-wider block">
            Leading Outperformer
          </span>
          <div className="flex items-center justify-between mt-0.5">
            <span className="font-semibold text-slate-900 dark:text-[#F5F5F0] truncate group-hover:text-emerald-500">
              {stats.topSector.shortName}
            </span>
            <span className="text-emerald-600 dark:text-[#6EE7B7] font-bold">
              +{stats.topSector.changePercent}%
            </span>
          </div>
        </div>

        {/* Lagging Sector */}
        <div 
          onClick={() => setSelectedSector(stats.lagSector)}
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090D] border border-slate-200/80 dark:border-white/[0.06] hover:border-rose-500/40 transition-colors cursor-pointer group"
        >
          <span className="text-[10px] text-slate-500 dark:text-[#727680] uppercase tracking-wider block">
            Underperformer
          </span>
          <div className="flex items-center justify-between mt-0.5">
            <span className="font-semibold text-slate-900 dark:text-[#F5F5F0] truncate group-hover:text-rose-500">
              {stats.lagSector.shortName}
            </span>
            <span className="text-rose-600 dark:text-[#FF7B86] font-bold">
              {stats.lagSector.changePercent}%
            </span>
          </div>
        </div>

      </div>

      {/* ================================================================ */}
      {/* 3. The Treemap Heatmap Canvas */}
      {/* ================================================================ */}
      <div className="min-h-[440px] rounded-2xl bg-slate-950 p-2 sm:p-2.5 border border-slate-800/80 dark:border-white/[0.08] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {viewMode === "sectors" ? (
          /* ============================================================== */
          /* MODE 1: SECTORS OVERVIEW TREEMAP LAYOUT */
          /* ============================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 h-full">
            {filteredSectors.map((sector) => {
              const colors = getChangeColorStyles(sector.changePercent);
              const isPositive = sector.changePercent >= 0;

              return (
                <div
                  key={sector.id}
                  onClick={() => setSelectedSector(sector)}
                  className={`relative p-3.5 rounded-xl border ${colors.bg} ${colors.border} ${colors.accentGlow} transition-all duration-200 cursor-pointer flex flex-col justify-between hover:scale-[1.01] hover:z-10 group`}
                  style={{
                    // Flex growth roughly proportional to market cap weight
                    minHeight: sector.weight > 15 ? "190px" : "150px"
                  }}
                >
                  {/* Top Bar: Sector Name, Weight, Change */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-sm tracking-tight text-white group-hover:underline">
                          {sector.shortName}
                        </span>
                        <span className="text-[10px] font-mono text-white/70">
                          ({sector.weight}%)
                        </span>
                      </div>
                      <span className="text-[10px] text-white/80 line-clamp-1">
                        {sector.name}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center justify-end gap-0.5 text-base font-black font-mono text-white">
                        {isPositive ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-200" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-rose-200" />
                        )}
                        <span>{isPositive ? `+${sector.changePercent}%` : `${sector.changePercent}%`}</span>
                      </div>
                      <span className="text-[9.5px] font-mono text-white/75">
                        {sector.advances}A / {sector.declines}D
                      </span>
                    </div>
                  </div>

                  {/* Constituents Mini-Tiles Inside Sector */}
                  <div className="mt-3 pt-2.5 border-t border-white/15">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/70 block mb-1.5">
                      Leading Constituents:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {sector.stocks.slice(0, 3).map((st) => (
                        <div
                          key={st.symbol}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStock(st);
                          }}
                          className="px-2 py-1 rounded bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 text-[10px] font-mono flex items-center justify-between transition-colors"
                        >
                          <span className="font-bold text-white truncate mr-1">
                            {st.symbol}
                          </span>
                          <span className={`text-[9.5px] font-semibold ${
                            st.changePercent >= 0 ? "text-emerald-300" : "text-rose-300"
                          }`}>
                            {st.changePercent >= 0 ? `+${st.changePercent}%` : `${st.changePercent}%`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-white/60 pt-1">
                    <span>{sector.stocks.length} Top Equities</span>
                    <span className="group-hover:text-white flex items-center gap-0.5">
                      Inspect Sector <ChevronRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ============================================================== */
          /* MODE 2: CONSTITUENT EQUITIES DIRECT TREEMAP */
          /* ============================================================== */
          <div className="space-y-3">
            {filteredSectors.map((sector) => (
              <div key={sector.id} className="space-y-1">
                {/* Sector Header Ribbon */}
                <div className="flex items-center justify-between px-2 text-[10.5px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="font-bold text-slate-200">{sector.name}</span>
                    <span className="text-slate-500">· {sector.weight}% of NIFTY</span>
                  </div>
                  <span className={`font-semibold ${
                    sector.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    Sector {sector.changePercent >= 0 ? `+${sector.changePercent}%` : `${sector.changePercent}%`}
                  </span>
                </div>

                {/* Stock Tiles Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                  {sector.stocks.map((stock) => {
                    const colors = getChangeColorStyles(stock.changePercent);
                    const isPositive = stock.changePercent >= 0;

                    return (
                      <div
                        key={stock.symbol}
                        onClick={() => setSelectedStock(stock)}
                        className={`p-2.5 rounded-xl border ${colors.bg} ${colors.border} transition-all duration-150 cursor-pointer flex flex-col justify-between hover:scale-[1.03] hover:z-10 shadow-xs group`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-mono text-xs font-black text-white group-hover:underline">
                            {stock.symbol}
                          </span>
                          <span className={`text-[10px] font-mono font-bold ${
                            isPositive ? "text-emerald-100" : "text-rose-100"
                          }`}>
                            {isPositive ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                          </span>
                        </div>

                        <div className="mt-1.5 flex items-baseline justify-between text-[10px] font-mono text-white/90">
                          <span>₹{stock.price.toFixed(1)}</span>
                          <span className="text-[9px] text-white/60">
                            {isPositive ? `+${stock.change}` : `${stock.change}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ================================================================ */}
      {/* 4. Heatmap Color Legend Bar */}
      {/* ================================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[10px] font-mono text-slate-500 dark:text-[#727680]">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-semibold uppercase tracking-wider mr-1">
            Performance Scale:
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-rose-600 border border-rose-400" />
            <span>&lt; -2%</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-rose-700/60 border border-rose-500/30" />
            <span>-0.5%</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-slate-800 border border-slate-700" />
            <span>0.0%</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-emerald-700/60 border border-emerald-500/30" />
            <span>+0.5%</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-emerald-600 border border-emerald-400" />
            <span>&gt; +2%</span>
          </span>
        </div>

        <div className="text-slate-400">
          Click any sector or equity tile to inspect fundamental depth or consult AI mentor.
        </div>
      </div>

      {/* ================================================================ */}
      {/* 5. Detailed Stock Modal Dialog */}
      {/* ================================================================ */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0B0E14] border border-white/[0.12] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-5 text-white">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-mono text-xl font-black text-white">
                    {selectedStock.symbol}
                  </h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    selectedStock.changePercent >= 0 
                      ? "bg-emerald-500/20 text-[#6EE7B7] border border-emerald-500/30"
                      : "bg-rose-500/20 text-[#FF7B86] border border-rose-500/30"
                  }`}>
                    {selectedStock.changePercent >= 0 ? `+${selectedStock.changePercent}%` : `${selectedStock.changePercent}%`}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{selectedStock.name}</p>
              </div>

              <button
                onClick={() => setSelectedStock(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price & Technical Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.06]">
                <span className="text-[10px] text-slate-500 uppercase block">Last Price</span>
                <span className="text-base font-bold text-white">₹{selectedStock.price.toFixed(2)}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.06]">
                <span className="text-[10px] text-slate-500 uppercase block">Day Change</span>
                <span className={`text-base font-bold ${selectedStock.change >= 0 ? "text-[#6EE7B7]" : "text-[#FF7B86]"}`}>
                  {selectedStock.change >= 0 ? `+₹${selectedStock.change}` : `₹${selectedStock.change}`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.06]">
                <span className="text-[10px] text-slate-500 uppercase block">P/E Ratio</span>
                <span className="text-base font-bold text-slate-200">{selectedStock.pe}x</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.06]">
                <span className="text-[10px] text-slate-500 uppercase block">RSI (14D)</span>
                <span className={`text-base font-bold ${selectedStock.rsi > 70 ? "text-amber-400" : selectedStock.rsi < 30 ? "text-blue-400" : "text-slate-200"}`}>
                  {selectedStock.rsi}
                </span>
              </div>
            </div>

            {/* Trading Volume & Day Range */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Day Low: ₹{selectedStock.low.toFixed(2)}</span>
                <span>Day High: ₹{selectedStock.high.toFixed(2)}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((selectedStock.price - selectedStock.low) / (selectedStock.high - selectedStock.low || 1)) * 100))}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Volume: {selectedStock.volume}</span>
                <span>Market Cap: ₹{(selectedStock.marketCapCr / 1000).toFixed(1)}k Cr</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {onOpenSocraticWithQuestion && (
                <button
                  onClick={() => {
                    const q = `Analyze ${selectedStock.symbol} (${selectedStock.name})'s price action today: current price ₹${selectedStock.price}, change ${selectedStock.changePercent}%, P/E ${selectedStock.pe}, and RSI ${selectedStock.rsi}. What are the primary bullish and bearish factors from first principles?`;
                    setSelectedStock(null);
                    onOpenSocraticWithQuestion(q);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  <Brain className="w-4 h-4" />
                  <span>Socratic Breakdown</span>
                </button>
              )}

              {setActiveTab && (
                <button
                  onClick={() => {
                    setSelectedStock(null);
                    setActiveTab("charts");
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-mono text-xs font-semibold border border-white/[0.1] transition-colors cursor-pointer"
                >
                  <span>Open Chart</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 6. Detailed Sector Modal Dialog */}
      {/* ================================================================ */}
      {selectedSector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl bg-[#0B0E14] border border-white/[0.12] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-5 text-white">
            
            <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                    {selectedSector.name}
                  </h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    selectedSector.changePercent >= 0 
                      ? "bg-emerald-500/20 text-[#6EE7B7] border border-emerald-500/30"
                      : "bg-rose-500/20 text-[#FF7B86] border border-rose-500/30"
                  }`}>
                    {selectedSector.changePercent >= 0 ? `+${selectedSector.changePercent}%` : `${selectedSector.changePercent}%`}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Benchmark Weight: {selectedSector.weight}% · {selectedSector.advances} Advancing / {selectedSector.declines} Declining
                </p>
              </div>

              <button
                onClick={() => setSelectedSector(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Constituents list inside sector */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                Constituent Stocks:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSector.stocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    onClick={() => {
                      setSelectedSector(null);
                      setSelectedStock(stock);
                    }}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-white block">
                        {stock.symbol}
                      </span>
                      <span className="text-[10.5px] text-slate-400">
                        ₹{stock.price.toFixed(1)}
                      </span>
                    </div>

                    <span className={`text-xs font-mono font-bold ${
                      stock.changePercent >= 0 ? "text-[#6EE7B7]" : "text-[#FF7B86]"
                    }`}>
                      {stock.changePercent >= 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector Socratic Action */}
            <div className="flex items-center gap-3 pt-2">
              {onOpenSocraticWithQuestion && (
                <button
                  onClick={() => {
                    const q = `Explain the macroeconomic dynamics driving the ${selectedSector.name} sector today (+${selectedSector.changePercent}%). What regulatory, interest rate, or global commodity factors are key?`;
                    setSelectedSector(null);
                    onOpenSocraticWithQuestion(q);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  <Brain className="w-4 h-4" />
                  <span>Ask AI Mentor on {selectedSector.shortName} Macro Dynamics</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </LuxuryPanel>
  );
};
