import { ALL_500_TOPICS, MASTER_LEVELS } from "../data/curriculum500";
import { UserProfile, Topic, Lesson } from "../types";

export const MIN_PASSING_SCORE = 90;

/**
 * Checks if a topic is unlocked for the user.
 * Topic 1 (topic-500-1) is unlocked by default.
 * Topic N (N > 1) is unlocked ONLY if Topic N-1 test score >= 90%.
 */
export function isTopicUnlocked(topicId: string, testScores: Record<string, number>): boolean {
  const index = ALL_500_TOPICS.findIndex(t => t.id === topicId);
  if (index <= 0) return true; // Topic 1 is always unlocked by default

  const prevTopic = ALL_500_TOPICS[index - 1];
  const prevScore = testScores[prevTopic.id];
  return prevScore !== undefined && prevScore >= MIN_PASSING_SCORE;
}

/**
 * Checks if a lesson within an unlocked topic is unlocked.
 * Lesson 0 in an unlocked topic is unlocked.
 * Lesson M (M > 0) is unlocked if Lesson M-1 is completed.
 */
export function isLessonUnlocked(
  lesson: Lesson,
  topic: Topic,
  completedLessons: string[],
  testScores: Record<string, number>
): boolean {
  if (!isTopicUnlocked(topic.id, testScores)) return false;

  const lessonIndex = topic.lessons.findIndex(l => l.id === lesson.id);
  if (lessonIndex <= 0) return true;

  const prevLesson = topic.lessons[lessonIndex - 1];
  return completedLessons.includes(prevLesson.id);
}

/**
 * Calculates the user's level based on test scores (minimum 90% passing threshold).
 */
export function calculateUserLevel(testScores: Record<string, number>): { level: number; levelTitle: string } {
  let highestLevel = 1;

  MASTER_LEVELS.forEach(lvl => {
    // Check topics in this level
    const levelTopics = ALL_500_TOPICS.filter(t => t.level === lvl.level);
    const passedCount = levelTopics.filter(t => (testScores[t.id] || 0) >= MIN_PASSING_SCORE).length;
    // If passed at least 50% of level topics or Topic 50/100/150 etc., grant level
    if (passedCount >= 10 || (testScores[`topic-500-${lvl.level * 50}`] || 0) >= MIN_PASSING_SCORE) {
      highestLevel = Math.max(highestLevel, Math.min(10, lvl.level + 1));
    }
  });

  const levelInfo = MASTER_LEVELS.find(m => m.level === highestLevel) || MASTER_LEVELS[0];
  return { level: levelInfo.level, levelTitle: levelInfo.title };
}

/**
 * Finds the current recommended topic/lesson for the user.
 */
export function getRecommendedLesson(
  testScores: Record<string, number>,
  completedLessons: string[]
): { topic: Topic; lesson: Lesson } {
  for (const topic of ALL_500_TOPICS) {
    const isPassed = (testScores[topic.id] || 0) >= MIN_PASSING_SCORE;
    if (!isPassed) {
      const uncompleted = topic.lessons.find(l => !completedLessons.includes(l.id));
      return {
        topic,
        lesson: uncompleted || topic.lessons[0]
      };
    }
  }
  const lastTopic = ALL_500_TOPICS[ALL_500_TOPICS.length - 1];
  return {
    topic: lastTopic,
    lesson: lastTopic.lessons[0]
  };
}
