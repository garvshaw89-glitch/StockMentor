import React, { useState } from "react";
import { ExplanationMode, Lesson, Topic, UserProfile } from "../types";
import { ALL_500_TOPICS, MASTER_LEVELS, CAPITAL_MARKETS_CATEGORIES, getCategoryTopics, generate500Topic } from "../data/curriculum500";
import { AIVisualDiagram, DiagramType } from "./AIVisualDiagram";
import { RichMediaGallery } from "./RichMediaGallery";
import { StockMentorUniversity } from "./StockMentorUniversity";
import { 
  isTopicUnlocked, 
  isLessonUnlocked, 
  calculateUserLevel, 
  MIN_PASSING_SCORE 
} from "../utils/curriculumUtils";
import { 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Brain, 
  HelpCircle, 
  ArrowRight,
  Clock,
  Award,
  CheckSquare,
  RotateCcw,
  XCircle,
  AlertCircle,
  Unlock,
  ShieldAlert,
  Search,
  Layers,
  Zap,
  TrendingUp,
  PieChart,
  Activity,
  BarChart2,
  Cpu,
  Target,
  Globe,
  FileText
} from "lucide-react";

interface LearnModuleProps {
  mode: ExplanationMode;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const LearnModule: React.FC<LearnModuleProps> = ({
  mode,
  profile,
  onUpdateProfile,
  onOpenSocraticWithQuestion
}) => {
  // Curriculum Tab: "stockmentor_uni" (12 Schools) vs "university" (21 Categories) vs "mastery" (Levels 1-10)
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<"stockmentor_uni" | "university" | "mastery">("stockmentor_uni");
  
  // Category selection for Capital Markets University
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("equities");

  // Level & Segment filters for 500 Mastery
  const [activeLevelFilter, setActiveLevelFilter] = useState<number>(profile.level || 1);
  const [segmentFilter, setSegmentFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const initialCatTopics = getCategoryTopics("equities");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(initialCatTopics[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(initialCatTopics[0].lessons[0]);
  
  // Tab within active topic reader: "lesson" | "test" | "casestudy"
  const [activeViewMode, setActiveViewMode] = useState<"lesson" | "test" | "casestudy">("lesson");

  // In-lesson socratic state
  const [lessonAnswers, setLessonAnswers] = useState<Record<string, number>>({});
  const [showAnswerResults, setShowAnswerResults] = useState<Record<string, boolean>>({});

  // Topic Test Runner State
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [lastScorePercent, setLastScorePercent] = useState<number | null>(null);

  // Case Study State
  const [caseStudyChoice, setCaseStudyChoice] = useState<"BUY" | "HOLD" | "SELL" | null>(null);
  const [caseStudySubmitted, setCaseStudySubmitted] = useState<boolean>(false);

  const segments = [
    { id: "ALL", name: "All 500 Topics", icon: Layers },
    { id: "BASICS", name: "Basics (1-100)", icon: BookOpen },
    { id: "FUNDAMENTALS", name: "Fundamentals (101-250)", icon: PieChart },
    { id: "PRICE_ACTION", name: "Candlesticks & PA (251-300)", icon: Activity },
    { id: "TECHNICAL", name: "Technical Analysis (301-400)", icon: BarChart2 },
    { id: "STRATEGIES", name: "Strategies (401-450)", icon: Zap },
    { id: "RISK", name: "Risk & Psychology (451-500)", icon: ShieldAlert }
  ];

  // Active category metadata for Capital Markets University
  const activeCategoryMeta = CAPITAL_MARKETS_CATEGORIES.find(c => c.id === selectedCategoryId) || CAPITAL_MARKETS_CATEGORIES[0];
  const categoryTopics = getCategoryTopics(selectedCategoryId);

  // Filter topics based on active tab and query
  const displayedTopics = activeCurriculumTab === "university"
    ? categoryTopics.filter(t => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query);
      })
    : ALL_500_TOPICS.filter(t => {
        const query = searchQuery.trim().toLowerCase();
        const hasSearch = query !== "";
        const matchesLevel = activeLevelFilter === 0 || hasSearch || t.level === activeLevelFilter;
        
        const matchesSearch = !hasSearch || 
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          `topic ${t.topicNumber}`.includes(query) ||
          `${t.topicNumber}` === query;
        
        let matchesSegment = true;
        const num = t.topicNumber || 0;
        if (segmentFilter === "BASICS") matchesSegment = num >= 1 && num <= 100;
        if (segmentFilter === "FUNDAMENTALS") matchesSegment = num >= 101 && num <= 250;
        if (segmentFilter === "PRICE_ACTION") matchesSegment = num >= 251 && num <= 300;
        if (segmentFilter === "TECHNICAL") matchesSegment = num >= 301 && num <= 400;
        if (segmentFilter === "STRATEGIES") matchesSegment = num >= 401 && num <= 450;
        if (segmentFilter === "RISK") matchesSegment = num >= 451 && num <= 500;

        return matchesLevel && matchesSearch && matchesSegment;
      });

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    const newTopics = getCategoryTopics(catId);
    if (newTopics.length > 0) {
      setSelectedTopic(newTopics[0]);
      setSelectedLesson(newTopics[0].lessons[0]);
    }
    setActiveViewMode("lesson");
    setTestAnswers({});
    setTestSubmitted(false);
    setLastScorePercent(null);
    setCaseStudyChoice(null);
    setCaseStudySubmitted(false);
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedLesson(topic.lessons[0]);
    setActiveViewMode("lesson");
    setTestAnswers({});
    setTestSubmitted(false);
    setLastScorePercent(null);
    setCaseStudyChoice(null);
    setCaseStudySubmitted(false);
  };

  const handleSelectAnswer = (qId: string, idx: number) => {
    setLessonAnswers(prev => ({ ...prev, [qId]: idx }));
    setShowAnswerResults(prev => ({ ...prev, [qId]: true }));
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!profile.completedLessons.includes(lessonId)) {
      const updatedLessons = [...profile.completedLessons, lessonId];
      onUpdateProfile({
        ...profile,
        completedLessons: updatedLessons,
        score: Math.min(100, profile.score + 2)
      });
    }
  };

  // Topic Test Handlers
  const handleSelectTestOption = (questionId: string, optionIndex: number) => {
    if (testSubmitted) return;
    setTestAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitTopicTest = () => {
    if (!selectedTopic || !selectedTopic.topicTest) return;
    setTestSubmitted(true);

    let correctCount = 0;
    selectedTopic.topicTest.forEach(q => {
      if (testAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / selectedTopic.topicTest.length) * 100);
    setLastScorePercent(scorePercent);

    const updatedScores = { ...profile.testScores, [selectedTopic.id]: scorePercent };
    const isPassed = scorePercent >= MIN_PASSING_SCORE;

    const updatedCompletedTests = (isPassed && !profile.completedTests.includes(selectedTopic.id))
      ? [...profile.completedTests, selectedTopic.id]
      : profile.completedTests;

    const levelInfo = calculateUserLevel(updatedScores);

    // Grant certification if level completed
    const levelTopics = ALL_500_TOPICS.filter(t => t.level === selectedTopic.level);
    const passedInLevel = levelTopics.filter(t => (updatedScores[t.id] || 0) >= MIN_PASSING_SCORE).length;
    const certTitle = MASTER_LEVELS.find(m => m.level === selectedTopic.level)?.certificationTitle;
    
    let updatedCerts = profile.certifications || [];
    if (passedInLevel >= 5 && certTitle && !updatedCerts.includes(certTitle)) {
      updatedCerts = [...updatedCerts, certTitle];
    }

    onUpdateProfile({
      ...profile,
      testScores: updatedScores,
      completedTests: updatedCompletedTests,
      level: Math.max(profile.level, levelInfo.level),
      levelTitle: levelInfo.levelTitle,
      certifications: updatedCerts,
      score: Math.min(100, profile.score + (isPassed ? 10 : 2))
    });
  };

  const handleJumpToNextTopic = () => {
    if (!selectedTopic) return;
    const currentIndex = ALL_500_TOPICS.findIndex(t => t.id === selectedTopic.id);
    if (currentIndex >= 0 && currentIndex < ALL_500_TOPICS.length - 1) {
      const nextTopic = ALL_500_TOPICS[currentIndex + 1];
      if (isTopicUnlocked(nextTopic.id, profile.testScores)) {
        setActiveLevelFilter(nextTopic.level);
        setSelectedTopic(nextTopic);
        setSelectedLesson(nextTopic.lessons[0]);
        setActiveViewMode("lesson");
        setTestAnswers({});
        setTestSubmitted(false);
        setLastScorePercent(null);
        setCaseStudyChoice(null);
        setCaseStudySubmitted(false);
      }
    }
  };

  const currentLevelInfo = MASTER_LEVELS.find(m => m.level === activeLevelFilter) || MASTER_LEVELS[0];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-500" />
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                StockMentor — Capital Markets University & 500 Topic Mastery
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Explore <strong>21 Capital Market Categories</strong> (Equities, Bonds, ETFs, Mutual Funds, Derivatives, Commodities, Forex, Money Market, REITs, InvITs, Securitization, Macro & Portfolio Mgmt) or master 500 levels with ≥90% pass requirements.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl shrink-0">
            <Award className="w-5 h-5 text-emerald-500" />
            <div className="text-xs">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">
                Level {profile.level}: {profile.levelTitle}
              </span>
              <span className="text-[10px] text-slate-500">
                {profile.certifications?.length || 0} Certifications Earned
              </span>
            </div>
          </div>
        </div>

        {/* Top Curriculum Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 w-full">
          <button
            onClick={() => setActiveCurriculumTab("stockmentor_uni")}
            className={`flex-1 w-full py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeCurriculumTab === "stockmentor_uni"
                ? "bg-emerald-500 text-black shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>🎓 StockMentor University (12 Core Schools)</span>
          </button>

          <button
            onClick={() => {
              setActiveCurriculumTab("university");
              const catTopics = getCategoryTopics(selectedCategoryId);
              if (catTopics.length > 0) {
                setSelectedTopic(catTopics[0]);
                setSelectedLesson(catTopics[0].lessons[0]);
              }
            }}
            className={`flex-1 w-full py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeCurriculumTab === "university"
                ? "bg-emerald-500 text-black shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>🏛️ Capital Markets (21 Categories)</span>
          </button>

          <button
            onClick={() => {
              setActiveCurriculumTab("mastery");
              setSelectedTopic(ALL_500_TOPICS[0]);
              setSelectedLesson(ALL_500_TOPICS[0].lessons[0]);
            }}
            className={`flex-1 w-full py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeCurriculumTab === "mastery"
                ? "bg-emerald-500 text-black shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>📈 500 Topics Mastery</span>
          </button>
        </div>

        {activeCurriculumTab === "stockmentor_uni" && (
          <StockMentorUniversity 
            profile={profile}
            onUpdateProfile={onUpdateProfile}
            onOpenSocraticWithQuestion={onOpenSocraticWithQuestion}
          />
        )}

        {/* Level Selector Tabs if in Mastery Mode */}
        {activeCurriculumTab === "mastery" && (
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-x-auto w-full">
            <button
              onClick={() => setActiveLevelFilter(0)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeLevelFilter === 0
                  ? "bg-emerald-500 text-black font-extrabold shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All (500 Topics)</span>
            </button>

            {MASTER_LEVELS.map(lvl => {
              const isLvlUnlocked = lvl.level <= profile.level;
              const levelTopics = ALL_500_TOPICS.filter(t => t.level === lvl.level);
              const passedCount = levelTopics.filter(t => (profile.testScores[t.id] || 0) >= MIN_PASSING_SCORE).length;

              return (
                <button
                  key={lvl.level}
                  onClick={() => setActiveLevelFilter(lvl.level)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeLevelFilter === lvl.level
                      ? "bg-emerald-500 text-black font-extrabold shadow-sm"
                      : isLvlUnlocked
                      ? "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      : "text-slate-400 dark:text-slate-600 opacity-60"
                  }`}
                >
                  {!isLvlUnlocked && <Lock className="w-3 h-3 text-slate-400" />}
                  <span>L{lvl.level}</span>
                  <span className="text-[10px] opacity-75 font-mono">({passedCount}/50)</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 21 Capital Market Category Selector Cards if in University Mode */}
      {activeCurriculumTab === "university" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>21 Capital Market Modules — Select an Asset Class or Domain:</span>
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Active: {activeCategoryMeta.shortName}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CAPITAL_MARKETS_CATEGORIES.map(cat => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? "bg-emerald-500 border-emerald-400 text-black font-black shadow-md scale-[1.02]"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-80">{cat.number}.</span>
                  <span>{cat.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Meta Hero Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-5 rounded-2xl border border-slate-700/80 text-white space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Category {activeCategoryMeta.number}: {activeCategoryMeta.badge}</span>
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {activeCategoryMeta.title}
                </h3>
              </div>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
                {categoryTopics.length} Comprehensive Topics
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {activeCategoryMeta.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Key Topics:</span>
              {activeCategoryMeta.keyTopics.map((kt, i) => (
                <span key={i} className="text-[10px] font-bold bg-slate-800/90 text-slate-200 border border-slate-700 px-2.5 py-0.5 rounded-md">
                  {kt}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Segment Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Segment Chips if in Mastery Mode */}
          {activeCurriculumTab === "mastery" ? (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
              {segments.map(seg => {
                const IconComp = seg.icon;
                return (
                  <button
                    key={seg.id}
                    onClick={() => setSegmentFilter(seg.id)}
                    className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      segmentFilter === seg.id
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{seg.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Lessons in {activeCategoryMeta.shortName}</span>
            </div>
          )}

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Search ${displayedTopics.length} topics...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topics Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {activeCurriculumTab === "university" ? activeCategoryMeta.shortName : currentLevelInfo.title}
            </h2>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Min. 90% Pass
            </span>
          </div>

          {displayedTopics.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-xl border">
              No topics found matching your query.
            </div>
          ) : (
            <div className="max-h-[750px] overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
              {displayedTopics.map((topic) => {
                const isSelected = selectedTopic?.id === topic.id;
                const unlocked = activeCurriculumTab === "university" ? true : isTopicUnlocked(topic.id, profile.testScores);
                const topicTestScore = profile.testScores[topic.id];
                const isPassed = topicTestScore !== undefined && topicTestScore >= MIN_PASSING_SCORE;

                return (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      unlocked ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                    } ${
                      isSelected
                        ? "bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 shadow-sm"
                        : unlocked
                        ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        : "bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {topic.title}
                          </span>
                          {isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : !unlocked ? (
                            <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                          ) : null}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {topic.moduleName}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1 font-medium text-slate-400">
                        <Clock className="w-3 h-3" />
                        8 mins
                      </span>

                      {topicTestScore !== undefined ? (
                        <span className={`px-2 py-0.5 rounded-full font-extrabold border ${
                          isPassed 
                            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}>
                          Score: {topicTestScore}% {isPassed ? "✓ Passed" : "(<90% Fail)"}
                        </span>
                      ) : unlocked ? (
                        <span className="font-bold text-indigo-400">
                          Ready to Learn
                        </span>
                      ) : (
                        <span className="font-bold text-amber-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Requires Topic {topic.topicNumber - 1} Pass
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Active Topic Reader & Test Suite (8 cols) */}
        <div className="lg:col-span-8">
          {selectedTopic && selectedLesson ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              {/* Header Topic Title & 3-Way Tab Switcher */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    {selectedTopic.levelTitle} • {selectedTopic.moduleName}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedTopic.title}
                  </h2>
                </div>

                {/* View Switcher: Lesson vs Test vs Case Study */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs font-bold">
                  <button
                    onClick={() => setActiveViewMode("lesson")}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeViewMode === "lesson"
                        ? "bg-emerald-500 text-black font-extrabold shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>📚 Learn</span>
                  </button>

                  <button
                    onClick={() => setActiveViewMode("test")}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeViewMode === "test"
                        ? "bg-emerald-500 text-black font-extrabold shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>📝 Test (90%)</span>
                  </button>

                  <button
                    onClick={() => setActiveViewMode("casestudy")}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeViewMode === "casestudy"
                        ? "bg-emerald-500 text-black font-extrabold shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>📊 Case Study</span>
                  </button>
                </div>
              </div>

              {activeViewMode === "lesson" ? (
                /* LESSON VIEW MODE */
                <div className="space-y-6">
                  {/* Explanation Mode Box */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Explanation Mode: {mode}</span>
                      </span>
                      <button
                        onClick={() => onOpenSocraticWithQuestion(`Explain Topic ${selectedTopic.topicNumber}: '${selectedTopic.title}' with practical stock market application.`)}
                        className="text-[11px] font-bold text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>Ask AI Tutor</span>
                      </button>
                    </div>

                    <div className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line font-medium">
                      {mode === "ELI5" && selectedLesson.contentELI5}
                      {mode === "Simple" && selectedLesson.contentSimple}
                      {mode === "Professional" && selectedLesson.contentProfessional}
                    </div>

                    {selectedLesson.realMarketExample && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 text-xs text-indigo-600 dark:text-indigo-300 font-medium">
                        <span className="font-bold block text-indigo-500 mb-1">💡 Real Market Example:</span>
                        {selectedLesson.realMarketExample}
                      </div>
                    )}
                  </div>

                  {/* Rich Media Thumbnail Gallery & Infographic Viewer */}
                  <RichMediaGallery
                    topic={selectedTopic}
                    lesson={selectedLesson}
                    explanationText={mode === "ELI5" ? selectedLesson.contentELI5 : mode === "Simple" ? selectedLesson.contentSimple : selectedLesson.contentProfessional}
                    onOpenSocraticWithQuestion={onOpenSocraticWithQuestion}
                  />

                  {/* Key Takeaways */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Key Takeaways:</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedLesson.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="p-3 bg-emerald-500/10 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/20 dark:border-emerald-900/30 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* In-Lesson Socratic Question Check */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-amber-500" />
                      <span>Interactive Mini Quiz</span>
                    </h3>

                    {selectedLesson.socraticQuestions.map((sq, qIdx) => {
                      const qKey = `${selectedLesson.id}-${qIdx}`;
                      const selectedIdx = lessonAnswers[qKey];
                      const isRevealed = showAnswerResults[qKey];

                      return (
                        <div key={qIdx} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {sq.question}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sq.options.map((opt, oIdx) => {
                              const isOptionSelected = selectedIdx === oIdx;
                              const isCorrect = oIdx === sq.correctIndex;

                              let btnClass = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800";
                              if (isRevealed) {
                                if (isCorrect) {
                                  btnClass = "bg-emerald-500/20 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                                } else if (isOptionSelected && !isCorrect) {
                                  btnClass = "bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-300";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectAnswer(qKey, oIdx)}
                                  className={`p-2.5 rounded-lg text-xs text-left border transition-all ${btnClass}`}
                                >
                                  <span className="font-mono font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {isRevealed && (
                            <div className="p-3 bg-emerald-500/10 dark:bg-emerald-950/60 rounded-lg text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                              <span className="font-bold">Explanation: </span>
                              {sq.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => handleCompleteLesson(selectedLesson.id)}
                      className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        profile.completedLessons.includes(selectedLesson.id)
                          ? "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          : "bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-md shadow-emerald-500/10"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{profile.completedLessons.includes(selectedLesson.id) ? "Lesson Completed ✓" : "Mark Lesson Read (+2 XP)"}</span>
                    </button>

                    <button
                      onClick={() => setActiveViewMode("test")}
                      className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                    >
                      <span>Take Topic Test (Min. 90% Pass)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : activeViewMode === "test" ? (
                /* TOPIC TEST MODE */
                <div className="space-y-6">
                  <div className="bg-amber-500/10 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-500/30 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-sm block">90% Minimum Passing Score Required</span>
                      <p className="mt-0.5 text-amber-800 dark:text-amber-300">
                        To unlock Topic {selectedTopic.topicNumber + 1} and advance through the 500-topic curriculum, you must score at least <strong>90%</strong> on this test!
                      </p>
                    </div>
                  </div>

                  {/* Result Announcement Banner */}
                  {testSubmitted && lastScorePercent !== null && (
                    <div className={`p-5 rounded-2xl border space-y-3 ${
                      lastScorePercent >= MIN_PASSING_SCORE
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200"
                        : "bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-200"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-black text-base">
                          {lastScorePercent >= MIN_PASSING_SCORE ? (
                            <>
                              <Unlock className="w-5 h-5 text-emerald-500" />
                              <span>PASSED ({lastScorePercent}%) — Topic {selectedTopic.topicNumber + 1} Unlocked!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-5 h-5 text-rose-500" />
                              <span>DID NOT PASS ({lastScorePercent}%) — Minimum 90% Required</span>
                            </>
                          )}
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900/40 text-white">
                          Target: 90%+
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed">
                        {lastScorePercent >= MIN_PASSING_SCORE
                          ? "Mastery confirmed! You have unlocked the next topic in the 500-topic StockMentor curriculum."
                          : "You scored below the 90% passing threshold. Review the explanations below and retake the test!"}
                      </p>

                      {lastScorePercent >= MIN_PASSING_SCORE && (
                        <button
                          onClick={handleJumpToNextTopic}
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-colors shadow-md shadow-emerald-500/20 flex items-center gap-2"
                        >
                          <span>Proceed to Next Unlocked Topic</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Test Questions List */}
                  <div className="space-y-6">
                    {selectedTopic.topicTest?.map((q, qIdx) => {
                      const selectedOpt = testAnswers[q.id];

                      return (
                        <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">
                              Question {qIdx + 1} of {selectedTopic.topicTest?.length}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                              {q.type}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {q.question}
                          </h4>

                          <div className="space-y-2 pt-1">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;
                              const isCorrect = oIdx === q.correctIndex;

                              let optionStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800";

                              if (testSubmitted) {
                                if (isCorrect) {
                                  optionStyle = "bg-emerald-500/20 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                                } else if (isSelected && !isCorrect) {
                                  optionStyle = "bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-300";
                                }
                              } else if (isSelected) {
                                optionStyle = "bg-emerald-500/10 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold shadow-sm";
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectTestOption(q.id, oIdx)}
                                  disabled={testSubmitted}
                                  className={`w-full text-left p-3 rounded-xl text-xs border transition-all flex items-center justify-between ${optionStyle}`}
                                >
                                  <span>
                                    <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                                    {opt}
                                  </span>
                                  {isSelected && !testSubmitted && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          {testSubmitted && (
                            <div className="p-3 bg-slate-100 dark:bg-slate-900/90 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 space-y-1">
                              <span className="font-bold text-emerald-500">Explanation: </span>
                              <span>{q.explanation}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit / Retake Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    {testSubmitted ? (
                      <button
                        onClick={() => {
                          setTestSubmitted(false);
                          setTestAnswers({});
                          setLastScorePercent(null);
                        }}
                        className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake Topic Test</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitTopicTest}
                        disabled={Object.keys(testAnswers).length < (selectedTopic.topicTest?.length || 0)}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-colors shadow-md shadow-emerald-500/10 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>Submit Topic Test (90% Passing Threshold)</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* CASE STUDY MODE */
                <div className="space-y-6">
                  {selectedTopic.caseStudy ? (
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-500" />
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {selectedTopic.caseStudy.companyOrChart}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {selectedTopic.caseStudy.scenario}
                      </p>

                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-bold text-slate-400 block">Make Your Decision:</span>
                        <div className="grid grid-cols-3 gap-3">
                          {(["BUY", "HOLD", "SELL"] as const).map(opt => (
                            <button
                              key={opt}
                              disabled={caseStudySubmitted}
                              onClick={() => setCaseStudyChoice(opt)}
                              className={`py-3 font-black rounded-xl text-xs border transition-all ${
                                caseStudyChoice === opt
                                  ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {!caseStudySubmitted && (
                        <button
                          disabled={!caseStudyChoice}
                          onClick={() => setCaseStudySubmitted(true)}
                          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-colors shadow-md disabled:opacity-50"
                        >
                          Submit Decision & Get AI Feedback
                        </button>
                      )}

                      {caseStudySubmitted && caseStudyChoice && (
                        <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                          caseStudyChoice === selectedTopic.caseStudy.correctOption
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200"
                            : "bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-200"
                        }`}>
                          <span className="font-extrabold text-sm block">
                            {caseStudyChoice === selectedTopic.caseStudy.correctOption ? "✓ Optimal Decision!" : "× Suboptimal Decision"}
                          </span>
                          <p>{selectedTopic.caseStudy.explanation}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400">
                      No case study available for this topic yet.
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Select an unlocked topic from the left sidebar to start learning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
