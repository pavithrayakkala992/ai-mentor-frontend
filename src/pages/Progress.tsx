import Sidebar from "../components/Sidebar"
import {
  getPersonalizedLearningTopics,
  getLessonsForCurrentLevel,
} from "../data/learningData"
import {
  getCurrentLevel,
  getUnlockedLevel,
  getCompletedLessons,
  getLessonProgress,
  getPracticeScore,
  getTopicChallengeScore,
} from "../utils/progress"
import { Link } from "react-router"

function Progress() {
  const topics = getPersonalizedLearningTopics()

  const learningLevel = getCurrentLevel()
  const unlockedLevel = getUnlockedLevel()
  const practiceScore = getPracticeScore()

  const totalLessons = topics.reduce(
    (total, topic) =>
      total +
      getLessonsForCurrentLevel(topic.id).length,
    0
  )

  const completedLessons = topics.reduce(
    (total, topic) =>
      total +
      getCompletedLessons(topic.id).length,
    0
  )

  const overallProgress =
    totalLessons === 0
      ? 0
      : Math.round(
          (completedLessons / totalLessons) * 100
        )

  const completedTopics = topics.filter((topic) => {
    const lessons = getLessonsForCurrentLevel(topic.id)

    return (
      lessons.length > 0 &&
      getLessonProgress(topic.id, lessons.length) === 100
    )
  }).length

  const beginnerUnlocked =
    unlockedLevel === "Beginner" ||
    unlockedLevel === "Intermediate" ||
    unlockedLevel === "Advanced"

  const intermediateUnlocked =
    unlockedLevel === "Intermediate" ||
    unlockedLevel === "Advanced"

  const advancedUnlocked =
    unlockedLevel === "Advanced"

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">

          <div>
            <p className="text-sm font-semibold text-blue-600">
              Learning Analytics
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Your Progress
            </h1>

            <p className="mt-2 text-gray-600">
              Track your AI learning journey, lesson completion,
              practice performance, and Topic Challenge results.
            </p>
          </div>

          {/* Summary Cards */}

          <div className="mt-8 grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Overall Progress
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {overallProgress}%
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {completedLessons} of {totalLessons} lessons
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Topics Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {completedTopics}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                of {topics.length} topics
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Practice Score
              </p>

              <p className="mt-2 text-3xl font-bold text-purple-600">
                {practiceScore}%
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Latest AI practice
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Current Level
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-500">
                {learningLevel}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {unlockedLevel} level unlocked
              </p>
            </div>

          </div>

          {/* Level Journey */}

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Learning Level Journey
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Complete Topic Challenges with 80% or higher
                  to unlock the next level.
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                Current: {learningLevel}
              </span>

            </div>

            <div className="mt-8 flex items-center gap-2">

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  beginnerUnlocked
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>

              <div
                className={`h-1 flex-1 rounded-full ${
                  intermediateUnlocked
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              />

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  intermediateUnlocked
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>

              <div
                className={`h-1 flex-1 rounded-full ${
                  advancedUnlocked
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              />

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  advancedUnlocked
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>

            </div>

            <div className="mt-3 flex justify-between text-xs font-medium text-gray-500">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>

          </div>

          {/* Topic Progress */}

          <div className="mt-8">

            <h2 className="text-xl font-bold text-gray-900">
              Topic Progress
            </h2>

            <div className="mt-5 grid gap-6 md:grid-cols-2">

              {topics.map((topic) => {
                const lessons =
                  getLessonsForCurrentLevel(topic.id)

                const completed =
                  getCompletedLessons(topic.id).length

                const progress =
                  getLessonProgress(
                    topic.id,
                    lessons.length
                  )

                const challengeScore =
                  getTopicChallengeScore(topic.id)

                const challengeReady =
                  lessons.length > 0 &&
                  progress === 100

                return (
                  <div
                    key={topic.id}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {topic.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {learningLevel} Level
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        {progress}%
                      </span>

                    </div>

                    {/* Progress Bar */}

                    <div className="mt-5 h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    {/* Topic Stats */}

                    <div className="mt-5 grid grid-cols-3 gap-3">

                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <p className="text-lg font-bold text-gray-900">
                          {completed}
                        </p>

                        <p className="text-xs text-gray-500">
                          Lessons Done
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <p className="text-lg font-bold text-gray-900">
                          {lessons.length}
                        </p>

                        <p className="text-xs text-gray-500">
                          Total Lessons
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <p className="text-lg font-bold text-purple-600">
                          {challengeScore !== null
                            ? `${challengeScore}%`
                            : "—"}
                        </p>

                        <p className="text-xs text-gray-500">
                          Challenge
                        </p>
                      </div>

                    </div>

                    {/* Topic Action */}

                    <div className="mt-5">

                      {challengeReady ? (
                        <Link
                          to={`/topic-challenge/${topic.id}`}
                          className="block rounded-lg border border-purple-600 px-5 py-3 text-center font-semibold text-purple-600 hover:bg-purple-50"
                        >
                          {challengeScore !== null
                            ? "Review Topic Challenge"
                            : "Take Topic Challenge →"}
                        </Link>
                      ) : (
                        <Link
                          to={`/lesson/${topic.id}`}
                          className="block rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
                        >
                          Continue Learning →
                        </Link>
                      )}

                    </div>

                  </div>
                )
              })}

            </div>
          </div>

          {/* Learning Statistics */}

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Learning Statistics
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">
                  Lessons Completed
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {completedLessons}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  out of {totalLessons}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">
                  Topics Completed
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {completedTopics}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  out of {topics.length}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">
                  Current Learning Level
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {learningLevel}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {unlockedLevel} unlocked
                </p>
              </div>

            </div>

          </div>

          {/* Adaptive Learning */}

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <h2 className="text-xl font-bold text-gray-900">
              Adaptive Learning
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              Your learning experience uses your current level,
              lesson completion, practice performance, and Topic
              Challenge results to guide what you should learn next.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700">
                Level: {learningLevel}
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700">
                Lessons: {completedLessons}/{totalLessons}
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700">
                Practice: {practiceScore}%
              </span>

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}

export default Progress
