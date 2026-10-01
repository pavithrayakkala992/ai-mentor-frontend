import { useState } from "react"
import { useNavigate } from "react-router"
import { saveUnlockedLevel } from "../utils/progress"

const questions = [
  {
    question: "What is Artificial Intelligence?",
    options: [
      "A technology that enables machines to perform intelligent tasks",
      "A programming language",
      "A type of computer hardware",
      "A database system",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is a Machine Learning technique?",
    options: [
      "Data storage",
      "Supervised Learning",
      "File compression",
      "Web hosting",
    ],
    answer: 1,
  },
  {
    question: "What is the main purpose of a neural network?",
    options: [
      "To store files",
      "To design websites",
      "To learn patterns from data",
      "To manage computer memory",
    ],
    answer: 2,
  },
  {
    question: "What is Generative AI?",
    options: [
      "AI that only stores data",
      "AI that creates new content",
      "AI that manages hardware",
      "AI that only sorts files",
    ],
    answer: 1,
  },
  {
    question: "Which technology is commonly used to build AI applications?",
    options: [
      "Machine Learning",
      "Keyboard",
      "Printer",
      "Monitor",
    ],
    answer: 0,
  },
]

function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState("Beginner")

  const navigate = useNavigate()

  const handleNext = () => {
    if (selectedAnswer === null) {
      return
    }

    const updatedAnswers = [...answers, selectedAnswer]

    setAnswers(updatedAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      finishAssessment(updatedAnswers)
    }
  }

  const finishAssessment = (finalAnswers: number[]) => {
    let correctAnswers = 0

    finalAnswers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        correctAnswers++
      }
    })

    const percentage = Math.round(
      (correctAnswers / questions.length) * 100
    )

    let determinedLevel = "Beginner"

    if (percentage >= 80) {
      determinedLevel = "Advanced"
    } else if (percentage >= 60) {
      determinedLevel = "Intermediate"
    }

    setScore(correctAnswers)
    setLevel(determinedLevel)
    setShowResult(true)

    localStorage.setItem(
      "ai-mentor-assessment-score",
      percentage.toString()
    )

    localStorage.setItem(
      "ai-mentor-learning-level",
      determinedLevel
    )

    localStorage.setItem(
      "ai-mentor-assessment-completed",
      "true"
    )

    saveUnlockedLevel(
      determinedLevel as
        | "Beginner"
        | "Intermediate"
        | "Advanced"
    )
  }

  const handleStartLearning = () => {
    navigate("/dashboard", { replace: true })
  }

  const question = questions[currentQuestion]

  if (showResult) {
    const percentage = Math.round(
      (score / questions.length) * 100
    )

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Assessment Completed!
          </h1>

          <p className="mt-3 text-gray-600">
            Your AI knowledge assessment has been completed successfully.
          </p>

          <div className="mt-8 rounded-xl bg-blue-50 p-6">
            <p className="text-sm font-medium text-gray-500">
              Your Score
            </p>

            <p className="mt-2 text-4xl font-bold text-blue-600">
              {score} / {questions.length}
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-800">
              {percentage}%
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-white p-6">
            <p className="text-sm text-gray-500">
              Recommended Starting Level
            </p>

            <h2 className="mt-2 text-2xl font-bold text-blue-600">
              {level}
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Based on your assessment performance, AI Mentor recommends
              starting your learning journey at the{" "}
              <span className="font-semibold">
                {level}
              </span>{" "}
              level.
            </p>

            <div className="mt-4 rounded-lg bg-green-50 p-3">
              <p className="text-sm font-medium text-green-700">
                {level} level has been unlocked for you.
              </p>
            </div>
          </div>

          <button
            onClick={handleStartLearning}
            className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Start Learning
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Initial Learning Assessment
          </h1>

          <p className="mt-2 text-gray-500">
            Answer these questions so AI Mentor can personalize your learning path.
          </p>
        </div>

        <div className="mt-8">

          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="text-sm font-medium text-blue-600">
              {Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{
                width: `${
                  ((currentQuestion + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">
              {question.question}
            </h2>

            <div className="mt-6 space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    selectedAnswer === index
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {currentQuestion === questions.length - 1
              ? "Finish Assessment"
              : "Next Question"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default Assessment
