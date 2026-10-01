export type LearningLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"

const levelOrder: LearningLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
]

export function getCurrentLevel(): LearningLevel {
  const level = localStorage.getItem(
    "ai-mentor-learning-level"
  )

  if (
    level === "Beginner" ||
    level === "Intermediate" ||
    level === "Advanced"
  ) {
    return level
  }

  return "Beginner"
}

/* --------------------------------
   Level Access
-------------------------------- */

export function getUnlockedLevel(): LearningLevel {
  const saved = localStorage.getItem(
    "ai-mentor-unlocked-level"
  )

  if (
    saved === "Beginner" ||
    saved === "Intermediate" ||
    saved === "Advanced"
  ) {
    return saved
  }

  return "Beginner"
}

export function saveUnlockedLevel(
  level: LearningLevel
) {
  const current = getUnlockedLevel()

  if (
    levelOrder.indexOf(level) >
    levelOrder.indexOf(current)
  ) {
    localStorage.setItem(
      "ai-mentor-unlocked-level",
      level
    )
  }
}

export function isLevelUnlocked(
  level: LearningLevel
): boolean {
  const unlockedLevel =
    getUnlockedLevel()

  return (
    levelOrder.indexOf(level) <=
    levelOrder.indexOf(unlockedLevel)
  )
}

export function canUnlockNextLevel(
  score: number
): boolean {
  return score >= 80
}

export function getNextLevel(
  level: LearningLevel
): LearningLevel | null {
  const currentIndex =
    levelOrder.indexOf(level)

  if (
    currentIndex === -1 ||
    currentIndex >= levelOrder.length - 1
  ) {
    return null
  }

  return levelOrder[currentIndex + 1]
}

/* --------------------------------
   Topics
-------------------------------- */

export function getCompletedTopics(): number[] {
  const level = getCurrentLevel()

  return JSON.parse(
    localStorage.getItem(
      `ai-mentor-completed-topics-${level}`
    ) || "[]"
  )
}

export function completeTopic(
  topicId: number
) {
  const level = getCurrentLevel()

  const key =
    `ai-mentor-completed-topics-${level}`

  const completed =
    getCompletedTopics()

  if (!completed.includes(topicId)) {
    completed.push(topicId)

    localStorage.setItem(
      key,
      JSON.stringify(completed)
    )
  }
}

/* --------------------------------
   Lessons
-------------------------------- */

export function getCompletedLessons(
  topicId: number
): number[] {
  const level = getCurrentLevel()

  return JSON.parse(
    localStorage.getItem(
      `ai-mentor-completed-lessons-${topicId}-${level}`
    ) || "[]"
  )
}

export function completeLesson(
  topicId: number,
  lessonId: number
) {
  const level = getCurrentLevel()

  const key =
    `ai-mentor-completed-lessons-${topicId}-${level}`

  const completed =
    getCompletedLessons(topicId)

  if (!completed.includes(lessonId)) {
    completed.push(lessonId)

    localStorage.setItem(
      key,
      JSON.stringify(completed)
    )
  }
}

export function getLessonProgress(
  topicId: number,
  totalLessons: number
): number {
  if (totalLessons <= 0) {
    return 0
  }

  const completed =
    getCompletedLessons(topicId).length

  return Math.min(
    100,
    Math.round(
      (completed / totalLessons) * 100
    )
  )
}

export function getTopicProgress(
  topicId: number,
  totalLessons?: number
): number {
  if (totalLessons !== undefined) {
    return getLessonProgress(
      topicId,
      totalLessons
    )
  }

  return getCompletedTopics().includes(topicId)
    ? 100
    : 0
}

export function getOverallProgress(
  totalTopics: number
): number {
  if (totalTopics <= 0) {
    return 0
  }

  const completed =
    getCompletedTopics().length

  return Math.min(
    100,
    Math.round(
      (completed / totalTopics) * 100
    )
  )
}

/* --------------------------------
   Practice Score
-------------------------------- */

export function getPracticeScore(): number {
  return Number(
    localStorage.getItem(
      "ai-mentor-practice-score"
    ) || "0"
  )
}

export function savePracticeScore(
  score: number
) {
  localStorage.setItem(
    "ai-mentor-practice-score",
    score.toString()
  )
}

/* --------------------------------
   Lesson Quick Check Scores
-------------------------------- */

export function saveLessonQuizScore(
  topicId: number,
  lessonId: number,
  score: number
) {
  const level = getCurrentLevel()

  localStorage.setItem(
    `ai-mentor-lesson-quiz-score-${topicId}-${lessonId}-${level}`,
    score.toString()
  )
}

export function getLessonQuizScore(
  topicId: number,
  lessonId: number
): number | null {
  const level = getCurrentLevel()

  const value = localStorage.getItem(
    `ai-mentor-lesson-quiz-score-${topicId}-${lessonId}-${level}`
  )

  return value === null
    ? null
    : Number(value)
}

/* --------------------------------
   Topic Challenge Scores
-------------------------------- */

export function saveTopicChallengeScore(
  topicId: number,
  score: number
) {
  const level = getCurrentLevel()

  localStorage.setItem(
    `ai-mentor-topic-challenge-score-${topicId}-${level}`,
    score.toString()
  )
}

export function getTopicChallengeScore(
  topicId: number
): number | null {
  const level = getCurrentLevel()

  const value = localStorage.getItem(
    `ai-mentor-topic-challenge-score-${topicId}-${level}`
  )

  return value === null
    ? null
    : Number(value)
}
