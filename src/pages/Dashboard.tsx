import Sidebar from "../components/Sidebar"
import {
  getPersonalizedLearningTopics,
  getLessonsForCurrentLevel,
} from "../data/learningData"
import {
  getCompletedLessons,
  getLessonProgress,
  getPracticeScore,
  getCurrentLevel,
  getTopicChallengeScore,
} from "../utils/progress"
import { Link } from "react-router"

function Dashboard() {
  const learningTopics =
    getPersonalizedLearningTopics()

  const practiceScore =
    getPracticeScore()

  const learningLevel =
    getCurrentLevel()

  const userName =
    localStorage.getItem(
      "ai-mentor-user-name"
    ) || "Student"

  const totalLessons =
    learningTopics.reduce(
      (total, topic) =>
        total +
        getLessonsForCurrentLevel(
          topic.id
        ).length,
      0
    )

  const completedLessons =
    learningTopics.reduce(
      (total, topic) =>
        total +
        getCompletedLessons(
          topic.id
        ).length,
      0
    )

  const overallProgress =
    totalLessons === 0
      ? 0
      : Math.round(
          (completedLessons /
            totalLessons) *
            100
        )

  const completedTopics =
    learningTopics.filter((topic) => {
      const lessons =
        getLessonsForCurrentLevel(
          topic.id
        )

      return (
        lessons.length > 0 &&
        getLessonProgress(
          topic.id,
          lessons.length
        ) === 100
      )
    }).length

  const nextTopic =
    learningTopics.find((topic) => {
      const lessons =
        getLessonsForCurrentLevel(
          topic.id
        )

      const progress =
        getLessonProgress(
          topic.id,
          lessons.length
        )

      return progress < 100
    }) || learningTopics[0]

  const nextTopicLessons =
    nextTopic
      ? getLessonsForCurrentLevel(
          nextTopic.id
        )
      : []

  const nextTopicProgress =
    nextTopic
      ? getLessonProgress(
          nextTopic.id,
          nextTopicLessons.length
        )
      : 0

  const challengeScore =
    nextTopic
      ? getTopicChallengeScore(
          nextTopic.id
        )
      : null

  const challengeReady =
    nextTopicProgress === 100

  let recommendation = ""

  if (overallProgress === 0) {
    recommendation =
      `Your learning path is personalized for the ${learningLevel} level. Start with your first lesson and complete the Quick Check to begin building your AI knowledge.`
  } else if (practiceScore < 60) {
    recommendation =
      "Your recent practice performance shows that some concepts need more review. Continue learning at your current level and strengthen your fundamentals."
  } else if (practiceScore < 80) {
    recommendation =
      "You are making steady progress. Continue with your current lessons and use AI Practice to strengthen your understanding."
  } else {
    recommendation =
      "Your strong practice performance shows good understanding. Continue completing your current level and work toward the Topic Challenge."
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">

          {/* Welcome */}

          <div>
            <p className="text-sm font-semibold text-blue-600">
              AI Mentor
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Welcome, {userName}!
            </h1>

            <p className="mt-2 text-gray-600">
              Your personalized AI learning companion
            </p>
          </div>

          {/* Summary Cards */}

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Learning Progress
              </h2>

              <p className="mt-3 text-3xl font-bold text-blue-600">
                {overallProgress}%
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {completedLessons} of {totalLessons} lessons
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Topics Completed
              </h2>

              <p className="mt-3 text-3xl font-bold text-green-600">
                {completedTopics}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                of {learningTopics.length} topics
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Practice Score
              </h2>

              <p className="mt-3 text-3xl font-bold text-purple-600">
                {practiceScore}%
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Recent AI practice
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Learning Level
              </h2>

              <p className="mt-3 text-3xl font-bold text-orange-500">
                {learningLevel}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Personalized for you
              </p>
            </div>

          </div>

          {/* AI Mentor Recommendation */}

          {nextTopic && (
            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-6">

              <h2 className="text-xl font-semibold text-gray-900">
                AI Mentor Recommendation
              </h2>

              <p className="mt-2 text-gray-600">
                {recommendation}
              </p>

              <div className="mt-5 rounded-xl bg-white p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      {challengeReady
                        ? "Topic Challenge Ready"
                        : "Recommended Next Topic"}
                    </p>

                    <h3 className="mt-1 text-xl font-semibold text-gray-900">
                      {nextTopic.title}
                    </h3>
                  </div>

                  {challengeScore !== null && (
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-600">
                      Challenge: {challengeScore}%
                    </span>
                  )}

                </div>

                <p className="mt-2 text-gray-600">
                  {nextTopic.description}
                </p>

                {/* Progress */}

                <div className="mt-4">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Topic Progress
                    </span>

                    <span className="font-semibold text-blue-600">
                      {nextTopicProgress}%
                    </span>

                  </div>

                  <div className="mt-2 h-2 rounded-full bg-gray-100">

                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${nextTopicProgress}%`,
                      }}
                    />

                  </div>

                </div>

                {challengeReady ? (
                  <Link
                    to={`/topic-challenge/${nextTopic.id}`}
                    className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700"
                  >
                    {challengeScore !== null
                      ? "Review Topic Challenge →"
                      : "Take Topic Challenge →"}
                  </Link>
                ) : (
                  <Link
                    to={`/lesson/${nextTopic.id}`}
                    className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                  >
                    Continue Learning →
                  </Link>
                )}

              </div>
            </div>
          )}

          {/* Learning Path */}

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Learning Path
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  AI topics personalized for your {learningLevel} level
                </p>
              </div>

              <Link
                to="/learning-path"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                View Full Path →
              </Link>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              {learningTopics.map((topic) => {
                const lessons =
                  getLessonsForCurrentLevel(
                    topic.id
                  )

                const progress =
                  getLessonProgress(
                    topic.id,
                    lessons.length
                  )

                const challenge =
                  getTopicChallengeScore(
                    topic.id
                  )

                return (
                  <div
                    key={topic.id}
                    className="rounded-xl border border-gray-100 p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {topic.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {lessons.length} lessons
                        </p>
                      </div>

                      <span className="text-sm font-semibold text-blue-600">
                        {progress}%
                      </span>

                    </div>

                    <div className="mt-3 h-2 rounded-full bg-gray-100">

                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                    {challenge !== null && (
                      <p className="mt-3 text-sm text-purple-600">
                        Topic Challenge: {challenge}%
                      </p>
                    )}

                  </div>
                )
              })}

            </div>

          </div>

          {/* Adaptive Learning */}

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-gray-900">
              Adaptive Learning
            </h2>

            <p className="mt-2 text-gray-600">
              AI Mentor adapts your learning experience based
              on your selected level, assessment, lesson progress,
              practice performance, and Topic Challenge results.
            </p>

            <div className="mt-5 h-3 rounded-full bg-gray-100">

              <div
                className="h-3 rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${overallProgress}%`,
                }}
              />

            </div>

            <div className="mt-5 flex items-center justify-between">

              <p className="text-sm text-gray-500">
                {completedLessons} of {totalLessons} lessons completed
              </p>

              <Link
                to="/progress"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                View Progress →
              </Link>

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard
