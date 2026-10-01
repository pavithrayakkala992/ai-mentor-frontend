import { useNavigate } from "react-router"

import Sidebar from "../components/Sidebar"

import {
  getCompletedTopics,
  getPracticeScore,
  getCurrentLevel,
  getUnlockedLevel,
  isLevelUnlocked,
  type LearningLevel as LearningLevelType,
} from "../utils/progress"

function Settings() {
  const navigate = useNavigate()

  const userName =
    localStorage.getItem(
      "ai-mentor-user-name"
    ) || "Student"

  const userEmail =
    localStorage.getItem(
      "ai-mentor-user-email"
    ) || ""

  const learningLevel =
    getCurrentLevel()

  const unlockedLevel =
    getUnlockedLevel()

  const practiceScore =
    getPracticeScore()

  const completedTopics =
    getCompletedTopics().length

  const levels: {
    level: LearningLevelType
    title: string
    description: string
    icon: string
  }[] = [
    {
      level: "Beginner",
      title: "Beginner",
      description:
        "Build strong AI fundamentals.",
      icon: "🌱",
    },
    {
      level: "Intermediate",
      title: "Intermediate",
      description:
        "Explore deeper AI concepts and applications.",
      icon: "📘",
    },
    {
      level: "Advanced",
      title: "Advanced",
      description:
        "Practice deeper reasoning and advanced AI concepts.",
      icon: "🚀",
    },
  ]

  const switchLevel = (
    level: LearningLevelType
  ) => {
    if (!isLevelUnlocked(level)) {
      return
    }

    localStorage.setItem(
      "ai-mentor-learning-level",
      level
    )

    navigate("/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-5xl">

          <div>
            <p className="text-sm font-semibold text-blue-600">
              Account Settings
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Settings
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your profile and learning
              preferences.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Profile
              </h2>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Name
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {userName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {userEmail || "Not available"}
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Learning Statistics
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-gray-500">
                    Current Level
                  </p>

                  <p className="mt-1 text-xl font-bold text-blue-600">
                    {learningLevel}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-sm text-gray-500">
                    Highest Unlocked
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-600">
                    {unlockedLevel}
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-sm text-gray-500">
                    Practice Score
                  </p>

                  <p className="mt-1 text-xl font-bold text-purple-600">
                    {practiceScore}%
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-4">
                  <p className="text-sm text-gray-500">
                    Topics Completed
                  </p>

                  <p className="mt-1 text-xl font-bold text-orange-600">
                    {completedTopics}
                  </p>
                </div>

              </div>
            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Learning Level
            </h2>

            <p className="mt-2 text-gray-600">
              You can switch between your unlocked
              learning levels. Locked levels become
              available after completing the required
              progression.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">

              {levels.map((item) => {
                const available =
                  isLevelUnlocked(item.level)

                const current =
                  learningLevel === item.level

                return (
                  <button
                    key={item.level}
                    onClick={() =>
                      switchLevel(item.level)
                    }
                    disabled={!available}
                    className={`rounded-2xl border p-6 text-left transition ${
                      available
                        ? "cursor-pointer border-gray-200 bg-white hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
                        : "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60"
                    } ${
                      current
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                        : ""
                    }`}
                  >

                    <div className="text-3xl">
                      {item.icon}
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>

                    <div className="mt-4">

                      {current ? (
                        <span className="font-semibold text-blue-600">
                          ✓ Current Level
                        </span>
                      ) : available ? (
                        <span className="font-semibold text-green-600">
                          ✓ Unlocked
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-500">
                          🔒 Locked
                        </span>
                      )}

                    </div>

                  </button>
                )
              })}

            </div>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

              <p className="font-semibold text-blue-900">
                Level Progression
              </p>

              <p className="mt-2 text-sm leading-6 text-blue-800">
                Complete a Topic Challenge with at
                least 80% to unlock the next level.
                Your previously unlocked levels remain
                available for review.
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </button>

        </div>
      </main>
    </div>
  )
}

export default Settings
