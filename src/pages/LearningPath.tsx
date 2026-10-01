import Sidebar from "../components/Sidebar"
import {
  getPersonalizedLearningTopics,
  getLessonsForCurrentLevel,
} from "../data/learningData"
import {
  getCurrentLevel,
  getCompletedLessons,
  getLessonProgress,
  getTopicChallengeScore,
} from "../utils/progress"
import { Link } from "react-router"

function LearningPath() {
  const topics =
    getPersonalizedLearningTopics()

  const learningLevel =
    getCurrentLevel()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">

          {/* Header */}

          <div>
            <p className="text-sm font-semibold text-blue-600">
              Personalized Learning Path
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Learn AI Step by Step
            </h1>

            <p className="mt-2 text-gray-600">
              Follow your {learningLevel} level path,
              complete every lesson, pass the Quick Checks,
              and finish each Topic Challenge.
            </p>
          </div>

          {/* Current Level */}

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-blue-600">
                  Current Learning Level
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {learningLevel}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  All lessons below are designed specifically
                  for this level.
                </p>
              </div>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600">
                {topics.length} AI Topics
              </span>

            </div>

          </div>

          {/* Learning Flow */}

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Your Learning Journey
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-4">

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="font-bold text-gray-900">
                  1. Learn
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Study level-specific AI lessons,
                  examples, and key points.
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <p className="font-bold text-gray-900">
                  2. Quick Check
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Test your understanding after every
                  lesson with AI-generated questions.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-4">
                <p className="font-bold text-gray-900">
                  3. Challenge
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Complete the Topic Challenge after
                  finishing all lessons.
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-4">
                <p className="font-bold text-gray-900">
                  4. Progress
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Your results are reflected in your
                  learning progress and recommendations.
                </p>
              </div>

            </div>

          </div>

          {/* Topics */}

          <div className="mt-8">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  AI Topics
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Level-specific content for {learningLevel}
                </p>
              </div>

              <span className="text-sm font-medium text-gray-500">
                {topics.length} Topics
              </span>

            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-2">

              {topics.map((topic, index) => {

                const lessons =
                  getLessonsForCurrentLevel(
                    topic.id
                  )

                const completedLessons =
                  getCompletedLessons(
                    topic.id
                  )

                const progress =
                  getLessonProgress(
                    topic.id,
                    lessons.length
                  )

                const challengeScore =
                  getTopicChallengeScore(
                    topic.id
                  )

                const allLessonsCompleted =
                  lessons.length > 0 &&
                  progress === 100

                const topicStarted =
                  completedLessons.length > 0

                return (
                  <div
                    key={topic.id}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >

                    {/* Topic Header */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                          {index + 1}
                        </div>

                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {topic.title}
                          </h2>

                          <p className="mt-1 text-sm font-medium text-blue-600">
                            {learningLevel} Level
                          </p>
                        </div>

                      </div>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                        {progress}%
                      </span>

                    </div>

                    {/* Description */}

                    <p className="mt-5 leading-7 text-gray-600">
                      {topic.description}
                    </p>

                    {/* Progress */}

                    <div className="mt-5">

                      <div className="flex items-center justify-between text-sm">

                        <span className="text-gray-500">
                          Learning Progress
                        </span>

                        <span className="font-semibold text-blue-600">
                          {completedLessons.length}/{lessons.length} lessons
                        </span>

                      </div>

                      <div className="mt-2 h-2 rounded-full bg-gray-100">

                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all"
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Stats */}

                    <div className="mt-5 grid grid-cols-3 gap-3">

                      <div className="rounded-xl bg-gray-50 p-3 text-center">

                        <p className="text-lg font-bold text-gray-900">
                          {completedLessons.length}
                        </p>

                        <p className="text-xs text-gray-500">
                          Completed
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-50 p-3 text-center">

                        <p className="text-lg font-bold text-gray-900">
                          {lessons.length}
                        </p>

                        <p className="text-xs text-gray-500">
                          Lessons
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

                    {/* Status */}

                    <div className="mt-5">

                      {allLessonsCompleted ? (
                        <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">

                          <p className="font-semibold text-purple-700">
                            All lessons completed
                          </p>

                          <p className="mt-1 text-sm text-gray-600">
                            {challengeScore !== null
                              ? `Your latest Topic Challenge score is ${challengeScore}%.`
                              : "Your Topic Challenge is now ready."}
                          </p>

                        </div>
                      ) : (
                        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                          <p className="font-semibold text-blue-700">
                            {topicStarted
                              ? "Continue your learning"
                              : "Ready to start"}
                          </p>

                          <p className="mt-1 text-sm text-gray-600">
                            {topicStarted
                              ? `${completedLessons.length} of ${lessons.length} lessons completed.`
                              : "Start the first lesson and complete the Quick Check."}
                          </p>

                        </div>
                      )}

                    </div>

                    {/* Action */}

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                      {!allLessonsCompleted ? (
                        <Link
                          to={`/lesson/${topic.id}`}
                          className="flex-1 rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
                        >
                          {topicStarted
                            ? "Continue Learning →"
                            : "Start Learning →"}
                        </Link>
                      ) : (
                        <Link
                          to={`/topic-challenge/${topic.id}`}
                          className="flex-1 rounded-lg bg-purple-600 px-5 py-3 text-center font-semibold text-white hover:bg-purple-700"
                        >
                          {challengeScore !== null
                            ? "Retake Topic Challenge →"
                            : "Take Topic Challenge →"}
                        </Link>
                      )}

                    </div>

                    {/* Feature Badges */}

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        {lessons.length} Lessons
                      </span>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                        AI Quick Checks
                      </span>

                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
                        Topic Challenge
                      </span>

                    </div>

                  </div>
                )
              })}

            </div>

          </div>

          {/* How It Works */}

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              How Your Learning Works
            </h2>

            <p className="mt-2 text-gray-600">
              AI Mentor guides you through each topic using
              level-specific content and assessments.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <div className="rounded-xl bg-blue-50 p-5">

                <p className="font-bold text-gray-900">
                  Learn
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Learn concepts through explanations,
                  examples, key points, and takeaways.
                </p>

              </div>

              <div className="rounded-xl bg-green-50 p-5">

                <p className="font-bold text-gray-900">
                  Practice
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Complete AI-generated Quick Checks
                  after each lesson.
                </p>

              </div>

              <div className="rounded-xl bg-purple-50 p-5">

                <p className="font-bold text-gray-900">
                  Challenge
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Complete the Topic Challenge after
                  finishing the complete topic.
                </p>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}

export default LearningPath
