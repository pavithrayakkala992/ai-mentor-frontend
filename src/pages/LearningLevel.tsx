import { useNavigate } from "react-router"

import {
  getUnlockedLevel,
  saveUnlockedLevel,
  isLevelUnlocked,
  type LearningLevel as LearningLevelType,
} from "../utils/progress"

function LearningLevel() {
  const navigate = useNavigate()

  const currentLevel =
    localStorage.getItem(
      "ai-mentor-learning-level"
    )

  const isFirstLevelSelection =
    !currentLevel

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

  const unlockedLevel =
    getUnlockedLevel()

  

  const isLevelAvailable = (
    level: LearningLevelType
  ) => {
    /*
      During the first selection after registration,
      the user can choose ANY starting level.

      Example:
      Beginner     → Beginner
      Intermediate → Intermediate
      Advanced     → Advanced

      After the first selection, normal unlocking rules apply.
    */

    if (isFirstLevelSelection) {
      return true
    }

    return isLevelUnlocked(level)
  }

  const handleLevelSelect = (
    level: LearningLevelType
  ) => {
    if (!isLevelAvailable(level)) {
      return
    }

    /*
      Save the level selected by the student.
    */
    localStorage.setItem(
      "ai-mentor-learning-level",
      level
    )

    /*
      The selected starting level becomes
      the highest unlocked level.

      Therefore:

      Beginner start
        → Beginner unlocked

      Intermediate start
        → Beginner + Intermediate unlocked

      Advanced start
        → Beginner + Intermediate + Advanced unlocked
    */
    saveUnlockedLevel(level)

    localStorage.setItem(
      "ai-mentor-assessment-completed",
      "true"
    )

    window.location.href = "/dashboard"
  }

  const handleAssessment = () => {
    navigate("/assessment")
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            AI Mentor
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Choose Your Learning Level
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Select the level that best matches your
            current AI knowledge. You can unlock
            higher levels as you progress.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {levels.map((item) => {
            const available =
              isLevelAvailable(item.level)

            const isCurrent =
              currentLevel === item.level

            const isUnlocked =
              isLevelUnlocked(item.level)

            return (
              <button
                key={item.level}
                onClick={() =>
                  handleLevelSelect(item.level)
                }
                disabled={!available}
                className={`rounded-2xl border p-7 text-left transition ${
                  available
                    ? "cursor-pointer border-gray-200 bg-white hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
                    : "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60"
                } ${
                  isCurrent
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : ""
                }`}
              >
                <div className="text-4xl">
                  {item.icon}
                </div>

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>

                <div className="mt-5">
                  {isCurrent ? (
                    <span className="font-semibold text-blue-600">
                      ✓ Current Level
                    </span>
                  ) : available ? (
                    <span className="font-semibold text-green-600">
                      ✓ Available
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-500">
                      🔒 Locked
                    </span>
                  )}
                </div>

                {!isFirstLevelSelection &&
                  isUnlocked && (
                    <p className="mt-2 text-xs text-green-600">
                      Unlocked
                    </p>
                  )}
              </button>
            )
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Not sure about your level?
          </h2>

          <p className="mt-2 text-gray-600">
            Take a short assessment and AI Mentor
            will recommend a suitable starting level
            for you.
          </p>

          <button
            onClick={handleAssessment}
            className="mt-5 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Take Assessment →
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="font-bold text-blue-900">
            Level Progression
          </h2>

          <p className="mt-2 leading-7 text-blue-800">
            Beginner students unlock Intermediate
            after achieving 80% or higher in a Topic
            Challenge. Intermediate students unlock
            Advanced in the same way.
          </p>

          <p className="mt-3 leading-7 text-blue-800">
            If you start directly at Intermediate,
            both Beginner and Intermediate are
            available. If you start at Advanced,
            Beginner, Intermediate, and Advanced are
            all available.
          </p>
        </div>

        {!isFirstLevelSelection && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Highest Unlocked Level:{" "}
            <span className="font-semibold text-gray-900">
              {unlockedLevel}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LearningLevel
