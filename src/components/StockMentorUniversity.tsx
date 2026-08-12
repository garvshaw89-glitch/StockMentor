import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  SCHOOL_CURRICULUM_DATA, 
  SchoolCurriculum, 
  Lesson, 
  QuizQuestion 
} from "../data/schoolCurriculum";
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  BarChart2, 
  TrendingUp, 
  PieChart, 
  ShieldAlert, 
  Zap, 
  Cpu, 
  Layers, 
  Briefcase, 
  FileText, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  Check, 
  X, 
  ChevronLeft, 
  Lightbulb, 
  Clock 
} from "lucide-react";

interface StockMentorUniversityProps {
  profile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const StockMentorUniversity: React.FC<StockMentorUniversityProps> = ({
  profile,
  onUpdateProfile,
  onOpenSocraticWithQuestion
}) => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<"lessons" | "quizzes" | "exam" | "simulation" | "certification">("lessons");
  
  // Active reading lesson state
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonQuizAnswers, setLessonQuizAnswers] = useState<Record<string, number>>({});
  const [lessonQuizSubmitted, setLessonQuizSubmitted] = useState<boolean>(false);

  // School Exam state
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number | null>(null);

  // Completion tracking state
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(profile.completedLessons || ["s1-l1"]);
  const [passedSchoolIds, setPassedSchoolIds] = useState<number[]>(profile.passedSchoolIds || [1]);

  const currentSchool: SchoolCurriculum = SCHOOL_CURRICULUM_DATA.find(s => s.id === selectedSchoolId) || SCHOOL_CURRICULUM_DATA[0];

  // Helper icons map
  const getSchoolIcon = (id: number) => {
    switch(id) {
      case 1: return BookOpen;
      case 2: return PieChart;
      case 3: return BarChart2;
      case 4: return TrendingUp;
      case 5: return Briefcase;
      case 6: return Zap;
      case 7: return Layers;
      case 8: return ShieldAlert;
      case 9: return PieChart;
      case 10: return Briefcase;
      case 11: return Cpu;
      case 12: return FileText;
      default: return BookOpen;
    }
  };

  const IconComp = getSchoolIcon(currentSchool.id);

  // Handle lesson selection
  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setLessonQuizAnswers({});
    setLessonQuizSubmitted(false);
  };

  // Handle lesson quiz option pick
  const handleLessonQuizAnswer = (qId: string, optionIdx: number) => {
    if (lessonQuizSubmitted) return;
    setLessonQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  // Submit lesson quiz
  const handleSubmitLessonQuiz = () => {
    if (!activeLesson) return;
    setLessonQuizSubmitted(true);

    const updatedLessons = Array.from(new Set([...completedLessonIds, activeLesson.id]));
    setCompletedLessonIds(updatedLessons);

    if (onUpdateProfile) {
      const updatedProfile: UserProfile = {
        ...profile,
        completedLessons: updatedLessons,
        score: Math.min(100, profile.score + 3)
      };
      onUpdateProfile(updatedProfile);
    }
  };

  // Handle Exam option pick
  const handleExamAnswer = (qId: string, optionIdx: number) => {
    if (examSubmitted) return;
    setExamAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  // Submit School Exam
  const handleSubmitExam = () => {
    let correctCount = 0;
    currentSchool.schoolExam.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / currentSchool.schoolExam.length) * 100);
    setExamScore(scorePct);
    setExamSubmitted(true);

    if (scorePct >= 70) {
      const updatedPassedSchools = Array.from(new Set([...passedSchoolIds, currentSchool.id]));
      setPassedSchoolIds(updatedPassedSchools);

      if (onUpdateProfile) {
        const certName = `${currentSchool.name} Certification`;
        const existingCerts = profile.certifications || [];
        const updatedCerts = existingCerts.includes(certName) ? existingCerts : [...existingCerts, certName];

        const updatedProfile: UserProfile = {
          ...profile,
          passedSchoolIds: updatedPassedSchools,
          certifications: updatedCerts,
          score: Math.min(100, profile.score + 15)
        };
        onUpdateProfile(updatedProfile);
      }
    }
  };

  // Reset exam
  const handleResetExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setExamScore(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>StockMentor University — 12 Specialized Schools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Institutional Financial Education System
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              Structured academic pathways covering all 12 core domains of financial markets. Study structured lessons, pass topic quizzes, complete proctored school exams, and earn verified certifications.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-indigo-500/30 flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Earned Certifications</p>
              <div className="flex items-center gap-2 mt-1">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-2xl font-black text-white">{passedSchoolIds.length} / 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 12 Schools Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {SCHOOL_CURRICULUM_DATA.map((school) => {
          const isSelected = school.id === selectedSchoolId;
          const SIcon = getSchoolIcon(school.id);
          const totalLessons = school.lessons.length;
          const completedCount = school.lessons.filter(l => completedLessonIds.includes(l.id)).length;
          const pct = Math.round((completedCount / (totalLessons || 1)) * 100);
          const isPassed = passedSchoolIds.includes(school.id);

          return (
            <button
              key={school.id}
              onClick={() => {
                setSelectedSchoolId(school.id);
                setActiveLesson(null);
                handleResetExam();
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-indigo-950/80 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-500/50"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl ${isSelected ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-400"}`}>
                  <SIcon className="w-4 h-4" />
                </div>
                {isPassed && (
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" title="School Exam Passed">
                    <Award className="w-3 h-3" />
                  </span>
                )}
              </div>
              <p className="text-xs font-bold truncate text-slate-200">{school.name}</p>
              <div className="mt-2.5 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">{pct}% Done</span>
                <span className="font-semibold text-slate-300">{completedCount}/{totalLessons}</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                <div className="bg-indigo-500 h-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected School Header Details & Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <IconComp className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{currentSchool.category}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-semibold">{currentSchool.lessons.length} Core Lessons</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{currentSchool.name}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{currentSchool.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenSocraticWithQuestion(`Teach me key principles of ${currentSchool.name}`)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>

        {/* School Structure Navigation Tabs */}
        <div className="flex border-b border-slate-800 overflow-x-auto scrollbar-none gap-2">
          {[
            { id: "lessons", label: `Lessons (${currentSchool.lessons.length})`, icon: BookOpen },
            { id: "quizzes", label: "Topic Quizzes", icon: HelpCircle },
            { id: "exam", label: "School Exam", icon: FileText },
            { id: "simulation", label: "Interactive Tool", icon: Play },
            { id: "certification", label: "Certification", icon: Award }
          ].map((tab) => {
            const TIcon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  setActiveLesson(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "border-indigo-500 text-indigo-400 bg-indigo-500/10 rounded-t-xl"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <TIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SUBTAB 1: LESSONS & LESSON READER */}
        {activeSubTab === "lessons" && (
          <div>
            {activeLesson ? (
              /* LESSON READER VIEW */
              <div className="bg-slate-950/80 rounded-2xl border border-indigo-500/30 p-6 space-y-6">
                <button
                  onClick={() => setActiveLesson(null)}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-bold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to {currentSchool.name} Lessons</span>
                </button>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                      {currentSchool.category} Lesson
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activeLesson.duration}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{activeLesson.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                    {activeLesson.summary}
                  </p>
                </div>

                {/* Lesson Overview & Key Points */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>Lesson Core Content</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeLesson.content.overview}
                  </p>

                  {activeLesson.content.formulaOrConcept && (
                    <div className="p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/30 text-indigo-200 font-mono text-xs flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300 block mb-0.5">Core Formula / Framework:</span>
                        {activeLesson.content.formulaOrConcept}
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Key Takeaways</h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeLesson.content.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Real-World Case Study</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeLesson.content.realWorldExample}</p>
                  </div>
                </div>

                {/* LESSON QUIZ SECTION */}
                {activeLesson.quiz.length > 0 && (
                  <div className="pt-6 border-t border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>Lesson Knowledge Check Quiz</span>
                    </h4>

                    {activeLesson.quiz.map((q, qIdx) => {
                      const selectedOpt = lessonQuizAnswers[q.id];
                      const isCorrect = selectedOpt === q.correctAnswer;

                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          <p className="text-xs sm:text-sm font-bold text-slate-100">
                            Q{qIdx + 1}. {q.question}
                          </p>

                          <div className="space-y-2">
                            {q.options.map((opt, oIdx) => {
                              const isPicked = selectedOpt === oIdx;
                              let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800";

                              if (lessonQuizSubmitted) {
                                if (oIdx === q.correctAnswer) {
                                  btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                                } else if (isPicked && !isCorrect) {
                                  btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                                }
                              } else if (isPicked) {
                                btnStyle = "bg-indigo-950 border-indigo-500 text-white font-bold ring-1 ring-indigo-500";
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleLessonQuizAnswer(q.id, oIdx)}
                                  disabled={lessonQuizSubmitted}
                                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {lessonQuizSubmitted && oIdx === q.correctAnswer && (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  )}
                                  {lessonQuizSubmitted && isPicked && !isCorrect && (
                                    <X className="w-4 h-4 text-rose-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {lessonQuizSubmitted && (
                            <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800">
                              <span className="font-bold text-indigo-400">Explanation: </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {!lessonQuizSubmitted ? (
                      <button
                        onClick={handleSubmitLessonQuiz}
                        disabled={Object.keys(lessonQuizAnswers).length < activeLesson.quiz.length}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                      >
                        Submit Lesson Quiz & Complete
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Lesson Completed & Marked in Syllabus! (+50 XP)</span>
                        </div>
                        <button
                          onClick={() => setActiveLesson(null)}
                          className="px-4 py-2 bg-emerald-600 text-black font-bold text-xs rounded-xl hover:bg-emerald-500 transition-all"
                        >
                          Continue to Next Lesson
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* LESSONS LIST */
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {currentSchool.name} Core Syllabus
                </h4>
                {currentSchool.lessons.map((les, idx) => {
                  const isDone = completedLessonIds.includes(les.id);

                  return (
                    <div
                      key={les.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-white">{les.title}</h5>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{les.summary}</p>
                          <span className="text-[11px] text-indigo-400 font-medium flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {les.duration} study time
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isDone ? (
                          <button
                            onClick={() => handleSelectLesson(les)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Review Lesson</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSelectLesson(les)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                          >
                            <span>Start Lesson</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: TOPIC QUIZZES */}
        {activeSubTab === "quizzes" && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-indigo-400 mx-auto" />
              <h4 className="text-base font-bold text-white">{currentSchool.name} Practice Quiz Bank</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Select any lesson to attempt its specific knowledge check quiz or request a custom practice quiz generated by your AI Tutor.
              </p>
              <button
                onClick={() => onOpenSocraticWithQuestion(`Give me a practice quiz on ${currentSchool.name}`)}
                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-500/20"
              >
                Launch AI Generated Practice Quiz
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentSchool.lessons.map((les, idx) => (
                <div key={les.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase">Quiz #{idx + 1}</span>
                    <span className="text-[10px] text-slate-400">{les.quiz.length} Questions</span>
                  </div>
                  <h5 className="text-xs font-bold text-white">{les.title}</h5>
                  <button
                    onClick={() => {
                      setActiveSubTab("lessons");
                      handleSelectLesson(les);
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all"
                  >
                    Take Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: SCHOOL GRADUATION EXAM */}
        {activeSubTab === "exam" && (
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">Official Graduation Exam — {currentSchool.name}</h4>
                  <p className="text-xs text-slate-400">Pass with 70%+ to earn your official certification credential.</p>
                </div>
              </div>

              {examSubmitted && (
                <button
                  onClick={handleResetExam}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold rounded-xl flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Exam</span>
                </button>
              )}
            </div>

            {/* Exam Questions */}
            <div className="space-y-4">
              {currentSchool.schoolExam.map((q, qIdx) => {
                const selectedOpt = examAnswers[q.id];
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-slate-100">
                      Exam Q{qIdx + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isPicked = selectedOpt === oIdx;
                        let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800";

                        if (examSubmitted) {
                          if (oIdx === q.correctAnswer) {
                            btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                          } else if (isPicked && !isCorrect) {
                            btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                          }
                        } else if (isPicked) {
                          btnStyle = "bg-indigo-950 border-indigo-500 text-white font-bold ring-1 ring-indigo-500";
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleExamAnswer(q.id, oIdx)}
                            disabled={examSubmitted}
                            className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {examSubmitted && oIdx === q.correctAnswer && (
                              <Check className="w-4 h-4 text-emerald-400" />
                            )}
                            {examSubmitted && isPicked && !isCorrect && (
                              <X className="w-4 h-4 text-rose-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {examSubmitted && (
                      <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800">
                        <span className="font-bold text-indigo-400">Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Exam Action Bar */}
            {!examSubmitted ? (
              <button
                onClick={handleSubmitExam}
                disabled={Object.keys(examAnswers).length < currentSchool.schoolExam.length}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-wider"
              >
                Submit Official Graduation Exam
              </button>
            ) : (
              <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                (examScore || 0) >= 70
                  ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-200"
                  : "bg-rose-950/80 border-rose-500/50 text-rose-200"
              }`}>
                <h4 className="text-xl font-black">
                  {(examScore || 0) >= 70 ? "🎉 Congratulations! You Passed!" : "⚠️ Exam Not Passed"}
                </h4>
                <p className="text-2xl font-black">Score: {examScore}%</p>
                <p className="text-xs opacity-90 max-w-md mx-auto">
                  {(examScore || 0) >= 70
                    ? `You have satisfied all academic requirements for ${currentSchool.name}. Your verified certification credential "${currentSchool.certTitle}" is now unlocked!`
                    : "You need at least 70% to graduate. Review the syllabus lessons and retake the exam whenever you are ready."}
                </p>
                {(examScore || 0) >= 70 && (
                  <button
                    onClick={() => setActiveSubTab("certification")}
                    className="px-5 py-2.5 bg-amber-400 text-black font-extrabold text-xs rounded-xl hover:bg-amber-300 transition-all shadow-md"
                  >
                    View Official Certification Badge
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 4: INTERACTIVE SIMULATION */}
        {activeSubTab === "simulation" && (
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-4">
            <Play className="w-10 h-10 text-amber-400 mx-auto" />
            <h4 className="text-base font-bold text-white">{currentSchool.name} Interactive Lab</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Test your practical financial decision skills in real time. Launch market scenario simulations or ask the AI Tutor for custom case study drills.
            </p>
            <button
              onClick={() => onOpenSocraticWithQuestion(`Run a real-world decision case study for ${currentSchool.name}`)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-500/20"
            >
              Start Interactive Case Study
            </button>
          </div>
        )}

        {/* SUBTAB 5: CERTIFICATION */}
        {activeSubTab === "certification" && (
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-indigo-500/30 text-center space-y-4 max-w-md mx-auto">
            <div className={`w-20 h-20 rounded-full border flex items-center justify-center mx-auto transition-all ${
              passedSchoolIds.includes(currentSchool.id)
                ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-xl shadow-amber-500/10 ring-4 ring-amber-500/20"
                : "bg-slate-900 border-slate-800 text-slate-600"
            }`}>
              <Award className="w-10 h-10" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Verified Academic Credential</p>
              <h4 className="text-xl font-black text-white mt-1">{currentSchool.certTitle}</h4>
              <p className="text-xs text-slate-400 mt-1">StockMentor Financial University</p>
            </div>

            {passedSchoolIds.includes(currentSchool.id) ? (
              <div className="space-y-3">
                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  ✓ Verified & Awarded
                </span>
                <p className="text-[11px] text-slate-400">
                  Credential ID: SMU-{currentSchool.id}-2026-PASS
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 italic">
                  Complete lessons and score 70%+ on the School Exam to graduate and unlock this official certification.
                </p>
                <button
                  onClick={() => setActiveSubTab("exam")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Take Graduation Exam
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
