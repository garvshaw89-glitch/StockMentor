import React, { useState, useMemo } from "react";
import { Topic, Lesson } from "../types";
import { AIVisualDiagram, DiagramType } from "./AIVisualDiagram";
import {
  Image as ImageIcon,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Sparkles,
  CheckCircle2,
  Layers,
  Grid,
  ChevronRight,
  Eye,
  FileText,
  BarChart2,
  TrendingUp,
  Activity,
  X,
  Award,
  ArrowRight,
  HelpCircle,
  Zap,
  Info,
  Sliders,
  Bookmark
} from "lucide-react";

export type MediaType = 
  | "INFOGRAPHIC"
  | "STRUCTURE_DIAGRAM"
  | "FLOWCHART"
  | "FORMULA_SHEET"
  | "COMPARISON_MATRIX"
  | "REAL_CASE_STUDY";

export interface MediaHotspot {
  id: string;
  x: number; // percentage position 0-100
  y: number; // percentage position 0-100
  label: string;
  description: string;
  formula?: string;
  marketTip?: string;
}

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  subtitle: string;
  badge: string;
  diagramType?: DiagramType;
  hotspots: MediaHotspot[];
  summaryPoints: string[];
  formulaList?: { name: string; formula: string; explanation: string }[];
  comparisonData?: { feature: string; optionA: string; optionB: string }[];
  caseStudyDetails?: { eventName: string; year: string; impact: string; keyTakeaway: string };
  accentColor?: string;
}

interface RichMediaGalleryProps {
  topic: Topic;
  lesson?: Lesson;
  explanationText?: string;
  onOpenSocraticWithQuestion?: (question: string) => void;
}

export const RichMediaGallery: React.FC<RichMediaGalleryProps> = ({
  topic,
  lesson,
  explanationText,
  onOpenSocraticWithQuestion
}) => {
  // Generate media gallery items dynamically based on topic properties
  const galleryItems = useMemo<MediaItem[]>(() => {
    return generateTopicMediaGallery(topic, lesson);
  }, [topic, lesson]);

  const [selectedMediaId, setSelectedMediaId] = useState<string>(galleryItems[0]?.id || "m1");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(galleryItems[0]?.hotspots[0]?.id || null);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const activeMedia = galleryItems.find(item => item.id === selectedMediaId) || galleryItems[0];
  const activeHotspot = activeMedia?.hotspots.find(h => h.id === activeHotspotId) || activeMedia?.hotspots[0];

  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") return galleryItems;
    return galleryItems.filter(item => item.type === activeFilter);
  }, [galleryItems, activeFilter]);

  const handleSelectMedia = (item: MediaItem) => {
    setSelectedMediaId(item.id);
    setActiveHotspotId(item.hotspots[0]?.id || null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const handleDownloadSummary = () => {
    const content = `STOCKMENTOR INFOGRAPHIC SUMMARY SHEET
Topic: ${topic.title} (${topic.levelTitle})
Media: ${activeMedia.title}
Key Takeaways:
${activeMedia.summaryPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Hotspots Breakdown:
${activeMedia.hotspots.map(h => `• ${h.label}: ${h.description}`).join("\n")}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.title.replace(/\s+/g, "_")}_Infographic_Summary.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="space-y-4 my-6">
      {/* Top Banner & Gallery Filter Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white">
                  Rich Theory Media & Interactive Infographic Gallery
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  {galleryItems.length} Visual Assets
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore theory diagrams, structural flowcharts, mathematical formula cheatsheets, and case studies for <strong>{topic.title}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fullscreen Lightbox</span>
            </button>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-thin">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === "ALL"
                ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-sm"
                : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All Media ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter("INFOGRAPHIC")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === "INFOGRAPHIC"
                ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-sm"
                : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Infographics</span>
          </button>

          <button
            onClick={() => setActiveFilter("STRUCTURE_DIAGRAM")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === "STRUCTURE_DIAGRAM"
                ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-sm"
                : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>Diagrams</span>
          </button>

          <button
            onClick={() => setActiveFilter("FLOWCHART")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === "FLOWCHART"
                ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-sm"
                : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Flowcharts</span>
          </button>

          <button
            onClick={() => setActiveFilter("FORMULA_SHEET")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === "FORMULA_SHEET"
                ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-sm"
                : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            <span>Formula Sheets</span>
          </button>

          <button
            onClick={() => setActiveFilter("REAL_CASE_STUDY")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === "REAL_CASE_STUDY"
                ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-sm"
                : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Case Studies</span>
          </button>
        </div>

        {/* Scrollable Horizontal Thumbnail Carousel Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedMediaId;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectMedia(item)}
                className={`group relative p-2.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-emerald-950/60 border-emerald-500 shadow-md ring-2 ring-emerald-500/30 scale-[1.02]"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
                }`}
              >
                {/* Visual Thumbnail Representation Header */}
                <div className="h-20 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden relative flex items-center justify-center p-2 mb-2">
                  <AIVisualDiagram
                    type={item.diagramType}
                    topicTitle={topic.title}
                    topicCategory={topic.category}
                  />
                  <div className="absolute top-1 right-1 bg-slate-950/90 text-emerald-400 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-amber-400" />
                    <span>{item.hotspots.length} Points</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400 block truncate">
                    {item.badge}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute top-1 left-1 bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    ACTIVE
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Infographic Viewer & Text Explanation Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Top: Active Infographic Canvas & Controls (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl flex flex-col justify-between">
          
          {/* Infographic Viewer Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {activeMedia.badge}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  Media ID: #{activeMedia.id}
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-1">
                {activeMedia.title}
              </h3>
            </div>

            {/* Viewer Zoom & Utility Toolbar */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-mono font-bold text-emerald-400 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetZoom}
                title="Reset Zoom"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-slate-800 mx-0.5" />

              <button
                onClick={() => setShowAnnotations(!showAnnotations)}
                title="Toggle Hotspot Annotations"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  showAnnotations
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleDownloadSummary}
                title="Download Infographic Summary"
                className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-all"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {copiedNotification && (
            <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl text-center animate-pulse">
              ✓ Infographic Theory Summary Downloaded to your device!
            </div>
          )}

          {/* Interactive Visual Canvas Container */}
          <div className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center p-4">
            <div
              className="w-full transition-transform duration-200 ease-out relative"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
            >
              {/* Dynamic Diagram Graphic */}
              <AIVisualDiagram
                type={activeMedia.diagramType}
                topicTitle={topic.title}
                topicCategory={topic.moduleName || topic.levelTitle || ""}
                title={activeMedia.title}
                subtitle={activeMedia.subtitle}
              />

              {/* Interactive Theory Hotspot Pulse Overlay Pins */}
              {showAnnotations && activeMedia.hotspots.map((hs, idx) => {
                const isActive = hs.id === activeHotspotId;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspotId(hs.id)}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 group transition-all ${
                      isActive ? "scale-125 z-20" : "hover:scale-110"
                    }`}
                  >
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isActive ? "bg-emerald-400" : "bg-sky-400"
                      }`} />
                      <span className={`relative inline-flex rounded-full h-5 w-5 text-[10px] font-black items-center justify-center border ${
                        isActive
                          ? "bg-emerald-500 text-black border-emerald-300 shadow-lg shadow-emerald-500/50"
                          : "bg-slate-900 text-sky-400 border-sky-400/80"
                      }`}>
                        {idx + 1}
                      </span>
                    </span>

                    {/* Hover Tooltip Preview */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-44 p-2 bg-slate-900 text-white text-[10px] rounded-lg border border-slate-700 shadow-xl z-30 pointer-events-none">
                      <span className="font-extrabold text-emerald-400 block">{hs.label}</span>
                      <p className="text-slate-300 line-clamp-2 mt-0.5">{hs.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Hotspot Theory Breakdown Card */}
          {activeHotspot && (
            <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Theory Point: {activeHotspot.label}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Hotspot
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {activeHotspot.description}
              </p>

              {activeHotspot.formula && (
                <div className="p-2.5 bg-slate-900 border border-indigo-500/30 rounded-lg text-xs font-mono text-indigo-300 flex items-center gap-2">
                  <span className="font-bold text-indigo-400 shrink-0">Formula:</span>
                  <span>{activeHotspot.formula}</span>
                </div>
              )}

              {activeHotspot.marketTip && (
                <p className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg font-medium">
                  💡 <strong>Real Market Insight:</strong> {activeHotspot.marketTip}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right / Bottom: Dynamic Theory Text Explanation & Takeaways (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Theory Text & Infographic Takeaways */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>Theory Explanation & Visual Walkthrough</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">
                Topic #{topic.topicNumber}
              </span>
            </div>

            {/* Quick Summary Points from active infographic */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Key Graphic Takeaways:</span>
              </h4>
              <ul className="space-y-2">
                {activeMedia.summaryPoints.map((pt, i) => (
                  <li key={i} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formula Cheat Sheet list if available */}
            {activeMedia.formulaList && activeMedia.formulaList.length > 0 && (
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-xl space-y-3">
                <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-indigo-500" />
                  <span>Mathematical Cheat Sheet</span>
                </h4>
                <div className="space-y-2">
                  {activeMedia.formulaList.map((f, i) => (
                    <div key={i} className="p-2.5 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800/60 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">{f.name}</span>
                        <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {f.formula}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">{f.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Data Table if available */}
            {activeMedia.comparisonData && activeMedia.comparisonData.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-sky-500" />
                  <span>Visual Comparison Matrix</span>
                </h4>
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="p-2.5">Feature</th>
                        <th className="p-2.5 text-emerald-600 dark:text-emerald-400">Option A</th>
                        <th className="p-2.5 text-sky-600 dark:text-sky-400">Option B</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {activeMedia.comparisonData.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-2.5 font-bold text-slate-900 dark:text-white">{row.feature}</td>
                          <td className="p-2.5 text-slate-700 dark:text-slate-300">{row.optionA}</td>
                          <td className="p-2.5 text-slate-700 dark:text-slate-300">{row.optionB}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Socratic Tutor Trigger Action */}
            {onOpenSocraticWithQuestion && (
              <button
                onClick={() => onOpenSocraticWithQuestion(`Explain the visual diagram '${activeMedia.title}' for Topic '${topic.title}' with a step-by-step mathematical example.`)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Ask AI Tutor to Analyze this Infographic</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-4 md:p-8 flex flex-col justify-between text-white space-y-4 overflow-y-auto">
          
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black rounded-full uppercase">
                {activeMedia.badge}
              </span>
              <div>
                <h2 className="text-lg font-black text-white">{activeMedia.title}</h2>
                <p className="text-xs text-slate-400">{activeMedia.subtitle} • {topic.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadSummary}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Infographic Sheet</span>
              </button>

              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Large Visual Canvas */}
          <div className="flex-1 min-h-[400px] bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-4xl max-h-[600px] overflow-auto">
              <AIVisualDiagram
                type={activeMedia.diagramType}
                topicTitle={topic.title}
                topicCategory={topic.moduleName || topic.levelTitle || ""}
                title={activeMedia.title}
                subtitle={activeMedia.subtitle}
              />
            </div>
          </div>

          {/* Lightbox Footer Hotspot Selector */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-400 mr-2">Hotspots:</span>
              {activeMedia.hotspots.map((hs, idx) => (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspotId(hs.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    hs.id === activeHotspotId
                      ? "bg-emerald-500 text-black border-emerald-400 font-extrabold"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  #{idx + 1} {hs.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
            >
              Close Lightbox (Esc)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Generator function creating rich, domain-specific media gallery items for any topic
function generateTopicMediaGallery(topic: Topic, lesson?: Lesson): MediaItem[] {
  const t = topic.title.toLowerCase();
  const cat = (topic.moduleName || topic.levelTitle || "").toLowerCase();

  // 1. Primary Structural Visual Diagram
  const primaryDiagram: MediaItem = {
    id: "m1",
    type: "STRUCTURE_DIAGRAM",
    title: `${topic.title} — Market Structure Diagram`,
    subtitle: `Core architectural breakdown and visual workflow for ${topic.title}`,
    badge: "Interactive Diagram",
    diagramType: undefined, // Let AIVisualDiagram infer based on topic title
    hotspots: [
      {
        id: "hs1",
        x: 25,
        y: 35,
        label: "Entry Anchor / Base Zone",
        description: "Primary institutional liquidity level where buy/sell orders aggregate before directional moves.",
        formula: "Base Level = VWAP ± 0.5 σ",
        marketTip: "Institutional buyers rebalance inventory around VWAP anchors."
      },
      {
        id: "hs2",
        x: 50,
        y: 45,
        label: "Execution Pivot & Settlement Boundary",
        description: "Critical threshold determining order matching velocity and clearing house margins.",
        formula: "Margin Required = Span Margin + Exposure Margin",
        marketTip: "Watch for volume expansion near settlement boundaries."
      },
      {
        id: "hs3",
        x: 75,
        y: 30,
        label: "Risk Cutoff / Profit Target Zone",
        description: "Pre-calculated risk-reward barrier for strict position management.",
        formula: "Risk Reward Ratio ≥ 1:2.5",
        marketTip: "Never trade without defined stop-loss and trailing profit targets."
      }
    ],
    summaryPoints: [
      `Visual representation of ${topic.title} showing key price boundaries and volume hubs.`,
      `Underlines market participant dynamics between institutional liquidity providers and retail execution.`,
      `Includes key execution formulas and risk-mitigation rules.`
    ]
  };

  // 2. Infographic Summary Card
  const infographicItem: MediaItem = {
    id: "m2",
    type: "INFOGRAPHIC",
    title: `Essential Infographic: ${topic.title}`,
    subtitle: `Step-by-step visual cheat sheet & key market principles`,
    badge: "Theory Infographic",
    diagramType: "candlestick",
    hotspots: [
      {
        id: "hs_info1",
        x: 20,
        y: 20,
        label: "Core Pillar 1: Market Fundamentals",
        description: "Fundamental drivers governing valuation, cash flows, and supply-demand equilibrium.",
        marketTip: "Align technical triggers with macro fundamental tailwinds."
      },
      {
        id: "hs_info2",
        x: 60,
        y: 60,
        label: "Core Pillar 2: Technical Confirmation",
        description: "Volume confirmation and candlestick pattern validation before capital allocation.",
        marketTip: "Always wait for candle closing confirmation."
      }
    ],
    summaryPoints: [
      `Combines fundamental insights with technical execution patterns.`,
      `Visualizes risk-reward boundaries for maximum capital protection.`,
      `Serves as a quick reference sheet for active trading and investing.`
    ]
  };

  // 3. Process Flowchart Item
  const flowchartItem: MediaItem = {
    id: "m3",
    type: "FLOWCHART",
    title: `Transaction & Lifecycle Flowchart: ${topic.title}`,
    subtitle: `Order routing, clearing, settlement, and lifecycle events`,
    badge: "Process Flowchart",
    diagramType: "settlement_t1",
    hotspots: [
      {
        id: "hs_flow1",
        x: 15,
        y: 40,
        label: "Order Initiation & Risk Check",
        description: "Broker pre-trade risk management validation prior to exchange matching.",
        formula: "Available Margin ≥ Required Order Capital",
        marketTip: "Orders exceeding limit rules trigger automatic rejection."
      },
      {
        id: "hs_flow2",
        x: 50,
        y: 50,
        label: "Matching Engine Execution",
        description: "Price-time priority execution inside the exchange central limit order book (CLOB).",
        marketTip: "Limit orders gain price priority over market orders during high volatility."
      },
      {
        id: "hs_flow3",
        x: 85,
        y: 60,
        label: "Clearing & T+1 Settlement",
        description: "Clearing corporation guarantees trade novation and fund/stock transfer.",
        marketTip: "T+1 settlement minimizes counterparty credit risk."
      }
    ],
    summaryPoints: [
      `Step 1: Client submits order via trading application.`,
      `Step 2: Risk checks & exchange matching engine execution.`,
      `Step 3: Clearing house novation & T+1 electronic delivery.`
    ]
  };

  // 4. Formula & Calculation Cheat Sheet
  const formulaItem: MediaItem = {
    id: "m4",
    type: "FORMULA_SHEET",
    title: `Mathematical Formula & Metric Cheat Sheet`,
    subtitle: `Key quantitative equations, ratios, and practical formulas`,
    badge: "Formula Sheet",
    diagramType: "valuation_pe",
    hotspots: [
      {
        id: "hs_form1",
        x: 30,
        y: 30,
        label: "Primary Metric Formula",
        description: "Standard equation used by Wall Street and Dalal Street analysts.",
        formula: "Metric = (Target Value - Baseline) / Benchmark",
        marketTip: "Compare against 5-year historical medians for accurate valuation."
      }
    ],
    summaryPoints: [
      `Master key financial formulas for fundamental valuation.`,
      `Includes practical calculation steps and benchmark threshold limits.`
    ],
    formulaList: [
      {
        name: "Valuation Ratio",
        formula: "P/E = Market Price per Share / Earnings per Share (EPS)",
        explanation: "Measures how much investors are willing to pay per ₹1 of current earnings."
      },
      {
        name: "Risk-Adjusted Return",
        formula: "Sharpe Ratio = (Portfolio Return - Risk Free Rate) / Standard Deviation",
        explanation: "Quantifies excess return generated per unit of volatility risk taken."
      },
      {
        name: "Bond Yield to Maturity (YTM)",
        formula: "YTM ≈ [Coupon + (Face Value - Price)/Years] / [(Face Value + Price)/2]",
        explanation: "Estimates total annual rate of return earned if bond is held to maturity."
      }
    ]
  };

  // 5. Comparison Matrix Item
  const comparisonItem: MediaItem = {
    id: "m5",
    type: "COMPARISON_MATRIX",
    title: `Comparative Analysis: Strategy & Asset Class Matrix`,
    subtitle: `Direct side-by-side trade-off comparison`,
    badge: "Comparison Matrix",
    diagramType: "portfolio_efficient_frontier",
    hotspots: [
      {
        id: "hs_comp1",
        x: 40,
        y: 40,
        label: "High Growth vs High Safety Trade-off",
        description: "Evaluates risk profile, liquidity, and return expectations.",
        marketTip: "Diversify across non-correlated asset classes to reduce portfolio variance."
      }
    ],
    summaryPoints: [
      `Direct side-by-side comparison of core options and strategies.`,
      `Evaluates risk exposure, liquidity constraints, and tax implications.`
    ],
    comparisonData: [
      { feature: "Risk Profile", optionA: "High Capital Appreciation (Moderate-High Risk)", optionB: "Capital Preservation (Low Risk)" },
      { feature: "Liquidity", optionA: "T+1 Daily Liquid Trading", optionB: "Lock-in Period / Fixed Maturity" },
      { feature: "Income Stream", optionA: "Variable Capital Gains & Dividends", optionB: "Fixed Periodic Coupon Payments" },
      { feature: "Taxation", optionA: "12.5% LTCG / 20% STCG", optionB: "Taxed at Applicable Slab Rate" }
    ]
  };

  // 6. Real Case Study Infographic
  const caseStudyItem: MediaItem = {
    id: "m6",
    type: "REAL_CASE_STUDY",
    title: `Institutional Case Study: Real Market Event Breakdown`,
    subtitle: `Historical market application and institutional lesson`,
    badge: "Real Market Case Study",
    diagramType: "volatility_smile",
    hotspots: [
      {
        id: "hs_cs1",
        x: 50,
        y: 50,
        label: "Catalyst Event & Market Reaction",
        description: "Macro trigger leading to extreme implied volatility spike and margin calls.",
        marketTip: "Maintain cash buffers during high-impact earnings and central bank announcements."
      }
    ],
    summaryPoints: [
      `Examines historical market dislocation and volatility expansion.`,
      `Highlights key risk lessons learned by institutional market makers.`
    ],
    caseStudyDetails: {
      eventName: "Dalal Street Volatility Event",
      year: "2024",
      impact: "VIX expanded +45% in 2 days, causing IV crush after event resolution.",
      keyTakeaway: "Hedging with defined-risk options spreads prevents catastrophic drawdowns."
    }
  };

  return [primaryDiagram, infographicItem, flowchartItem, formulaItem, comparisonItem, caseStudyItem];
}
