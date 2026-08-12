import React, { useState } from "react";
import { MasteryTest, QuizQuestion, UserProfile } from "../types";
import { SAMPLE_QUIZZES } from "../data/quizzes";
import { CURRICULUM } from "../data/curriculum";
import { 
  isTopicUnlocked, 
  calculateUserLevel, 
  MIN_PASSING_SCORE 
} from "../utils/curriculumUtils";
import { 
  CheckSquare, 
  Award, 
  HelpCircle, 
  Brain, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BookOpen,
  Lock,
  Unlock,
  ShieldAlert
} from "lucide-react";

interface TestModuleProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenSocraticWithQuestion: (q: string) => void;
}

export const TestModule: React.FC<TestModuleProps> = ({
  profile,
  onUpdateProfile,
  onOpenSocraticWithQuestion
}) => {
  const [activeTest, setActiveTest] = useState<MasteryTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [diagnosticFeedback, setDiagnosticFeedback] = useState<string | null>(null);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState<boolean>(false);

  const handleStartTest = (test: MasteryTest) => {
    // Check if test is unlocked
    if (!test.unlocked) return;
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTestSubmitted(false);
    setDiagnosticFeedback(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (testSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNextQuestion = () => {
    if (activeTest && currentQuestionIndex < activeTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    if (!activeTest) return { scorePercent: 0, correctCount: 0, wrongQuestions: [] };
    let correctCount = 0;
    const wrongQuestions: QuizQuestion[] = [];

    activeTest.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      } else {
        wrongQuestions.push(q);
      }
    });

    const scorePercent = Math.round((correctCount / activeTest.questions.length) * 100);
    return { scorePercent, correctCount, wrongQuestions };
  };

  const getMasteryBadge = (percent: number) => {
    if (percent < 40) return { label: "Needs Revision", color: "text-rose-600 bg-rose-100 dark:bg-rose-950/80" };
    if (percent < 60) return { label: "Beginner", color: "text-amber-600 bg-amber-100 dark:bg-amber-950/80" };
    if (percent < 75) return { label: "Developing", color: "text-blue-600 bg-blue-100 dark:bg-blue-950/80" };
    if (percent < 90) return { label: "Strong (<90% Fail)", color: "text-amber-600 bg-amber-100 dark:bg-amber-950/80" };
    return { label: "Mastered (Passed ✓)", color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80" };
  };

  const handleSubmitTest = async () => {
    setTestSubmitted(true);
    const { scorePercent, wrongQuestions } = calculateScore();

    if (activeTest) {
      const updatedScores = { ...profile.testScores, [activeTest.id]: scorePercent };
      const isPassed = scorePercent >= MIN_PASSING_SCORE;

      const updatedCompletedTests = (isPassed && !profile.completedTests.includes(activeTest.id))
        ? [...profile.completedTests, activeTest.id]
        : profile.completedTests;

      const levelInfo = calculateUserLevel(updatedScores);

      const updatedProfile = {
        ...profile,
        testScores: updatedScores,
        completedTests: updatedCompletedTests,
        level: Math.max(profile.level, levelInfo.level),
        levelTitle: levelInfo.levelTitle,
        score: Math.min(100, profile.score + (isPassed ? 10 : 2))
      };
      onUpdateProfile(updatedProfile);
    }

    // Call server AI diagnostic feedback
    if (wrongQuestions.length > 0) {
      setLoadingDiagnostic(true);
      try {
        const response = await fetch("/api/ai/socratic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: `Diagnostic analysis for quiz result ${scorePercent}%. Missed concepts: ${wrongQuestions.map(w => w.question).join("; ")}`,
            mode: "Simple"
          })
        });
        const data = await response.json();
        setDiagnosticFeedback(data.text);
      } catch (err) {
        setDiagnosticFeedback("Review missed questions above to strengthen your analytical foundation before re-attempting.");
      } finally {
        setLoadingDiagnostic(false);
      }
    }
  };

  const topicTests: MasteryTest[] = CURRICULUM.filter(t => t.topicTest && t.topicTest.length > 0).map(t => ({
    id: t.id,
    title: `Topic Test: ${t.title}`,
    level: t.level,
    topicCategory: t.levelTitle,
    questions: t.topicTest!,
    unlocked: isTopicUnlocked(t.id, profile.testScores)
  }));

  const allAvailableTests = [
    ...topicTests,
    ...SAMPLE_QUIZZES.map(sq => ({
      ...sq,
      unlocked: sq.level <= profile.level
    }))
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Title Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-emerald-500" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Stock Market Topic Tests & Certification
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Minimum <strong>90% passing score</strong> required on each topic test to unlock subsequent topics and advance levels.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold rounded-xl flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4" />
          <span>Pass Mark: 90%+</span>
        </div>
      </div>

      {!activeTest ? (
        /* Test Selection Screen */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Available Tests & Diagnostic Evaluations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allAvailableTests.map(test => {
              const pastScore = profile.testScores[test.id];
              const badge = pastScore !== undefined ? getMasteryBadge(pastScore) : null;
              const isPassed = pastScore !== undefined && pastScore >= MIN_PASSING_SCORE;

              return (
                <div 
                  key={test.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border shadow-sm flex flex-col justify-between space-y-4 transition-colors ${
                    test.unlocked 
                      ? "border-slate-200 dark:border-slate-800 hover:border-emerald-500/80" 
                      : "border-slate-200/60 dark:border-slate-800/60 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Level {test.level}
                      </span>
                      {badge ? (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badge.color}`}>
                          {pastScore}% {isPassed ? "✓ Passed" : "(Fail)"}
                        </span>
                      ) : !test.unlocked ? (
                        <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">
                          Not Taken
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between gap-2">
                      <span>{test.title}</span>
                      {!test.unlocked && <Lock className="w-4 h-4 text-amber-500 shrink-0" />}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {test.questions.length} Scenario & Calculation Questions
                    </p>
                  </div>

                  {test.unlocked ? (
                    <button
                      onClick={() => handleStartTest(test)}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-colors shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2"
                    >
                      <span>{pastScore !== undefined ? "Retake Test" : "Start Test (90% Pass)"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 text-center font-bold rounded-xl text-xs flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlock by Scoring 90%+ on Previous Topic</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Test Runner or Result Screen */
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {!testSubmitted ? (
            /* Active Test Interface */
            <div className="space-y-6">
              {/* Progress Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-500">
                    Question {currentQuestionIndex + 1} of {activeTest.questions.length} • Min. 90% Pass Score
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeTest.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTest(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
                >
                  Exit Test
                </button>
              </div>

              {/* Question Item */}
              {(() => {
                const q = activeTest.questions[currentQuestionIndex];
                const selectedOpt = userAnswers[q.id];

                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                        Type: {q.type}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded">
                        Difficulty: {q.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-2.5 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedOpt === oIdx;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-emerald-500/10 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold shadow-sm"
                                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <span>
                              <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Previous Question
                </button>

                {currentQuestionIndex < activeTest.questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    disabled={Object.keys(userAnswers).length < activeTest.questions.length}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs shadow-md shadow-emerald-500/10 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Submit & Grade (90% Required)</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Test Result & Diagnostic Feedback */
            <div className="space-y-6">
              {(() => {
                const { scorePercent, correctCount, wrongQuestions } = calculateScore();
                const isPassed = scorePercent >= MIN_PASSING_SCORE;

                return (
                  <>
                    <div className="text-center space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Topic Test Score Result
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <span className="text-5xl font-black text-slate-900 dark:text-white">
                          {scorePercent}%
                        </span>
                        <span className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase ${
                          isPassed 
                            ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" 
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        }`}>
                          {isPassed ? "✓ PASSED (90%+ Target)" : "❌ DID NOT PASS (<90%)"}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500">
                        Correct: {correctCount} of {activeTest.questions.length} questions • Minimum required to unlock next: 90%
                      </p>
                    </div>

                    {/* AI Diagnostic Summary */}
                    <div className={`p-5 rounded-2xl border space-y-2 ${
                      isPassed
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200"
                        : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-amber-500" />
                        <h3 className="font-bold text-sm">
                          {isPassed ? "Topic Passed! Next Topic & Level Unlocked" : "90% Score Required to Unlock Next Topic"}
                        </h3>
                      </div>

                      {loadingDiagnostic ? (
                        <p className="text-xs text-slate-500 animate-pulse">Generating personalized diagnostic feedback...</p>
                      ) : (
                        <p className="text-xs leading-relaxed font-medium">
                          {diagnosticFeedback || (isPassed 
                            ? "Outstanding performance! You achieved the required 90%+ passing threshold. You have unlocked the next topic and advanced your investor level!" 
                            : `You scored ${scorePercent}%. You need at least 90% to unlock the next topic and advance to the next level. Review the explanations below and try again!`)}
                        </p>
                      )}
                    </div>

                    {/* Detailed Question Review */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        Question Breakdown & Explanations:
                      </h3>

                      {activeTest.questions.map((q, idx) => {
                        const userAns = userAnswers[q.id];
                        const isCorrect = userAns === q.correctIndex;

                        return (
                          <div 
                            key={q.id}
                            className={`p-4 rounded-xl border text-xs space-y-2 ${
                              isCorrect 
                                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900" 
                                : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-bold text-slate-900 dark:text-white">
                                {idx + 1}. {q.question}
                              </span>
                              {isCorrect ? (
                                <span className="flex items-center gap-1 font-bold text-emerald-600 shrink-0">
                                  <CheckCircle2 className="w-4 h-4" /> Correct
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 font-bold text-rose-600 shrink-0">
                                  <XCircle className="w-4 h-4" /> Incorrect
                                </span>
                              )}
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 font-medium">
                              <span className="font-bold">Correct Answer: </span>
                              {q.options[q.correctIndex]}
                            </p>

                            <p className="text-slate-500 dark:text-slate-400">
                              <span className="font-bold">Why: </span>
                              {q.explanation}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        onClick={() => handleStartTest(activeTest)}
                        className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake Test</span>
                      </button>

                      <button
                        onClick={() => setActiveTest(null)}
                        className="flex-1 py-2.5 bg-emerald-500 text-black font-extrabold rounded-xl text-xs hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/10"
                      >
                        Return to Test Hub
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
