import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"

import Sidebar from "../components/Sidebar"

import {
  getTopicById,
  getLessonsForCurrentLevel,
} from "../data/learningData"

import {
  getCurrentLevel,
  saveTopicChallengeScore,
  saveUnlockedLevel,
  canUnlockNextLevel,
  getNextLevel,
} from "../utils/progress"

type Question = {
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
}

function TopicChallenge() {
  const { id } = useParams()
  const navigate = useNavigate()

  const topicId = Number(id)

  const topic = getTopicById(topicId)

  const learningLevel = getCurrentLevel()

  const lessons = topic
    ? getLessonsForCurrentLevel(topic.id)
    : []

  const [questions, setQuestions] =
    useState<Question[]>([])

  const [answers, setAnswers] =
    useState<Record<number, string>>({})

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  const [submitted, setSubmitted] =
    useState(false)

  const [score, setScore] =
    useState(0)

  const [unlockedNextLevel, setUnlockedNextLevel] =
    useState(false)

  const [nextLevel, setNextLevel] =
    useState<string | null>(null)

  useEffect(() => {
    if (!topic) {
      setError("Topic not found.")
      setLoading(false)
      return
    }

    generateChallenge()
  }, [topicId])

  const generateChallenge = async () => {
    if (!topic) {
      return
    }

    setLoading(true)
    setError("")
    setSubmitted(false)
    setAnswers({})
    setScore(0)
    setUnlockedNextLevel(false)
    setNextLevel(null)

    try {
      const lessonContent = lessons
        .map(
          (lesson) => `
Lesson: ${lesson.title}

Content:
${lesson.content}

Key Points:
${lesson.keyPoints.join(", ")}

Example:
${lesson.example}

Takeaway:
${lesson.takeaway}
`
        )
        .join("\n\n")

      const response = await fetch(
        "https://ai-mentor-backend-zhfh.onrender.com/api/generate-topic-challenge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic.title,
            learningLevel,
            lessonContent,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to generate topic challenge"
        )
      }

      if (
        !data.questions ||
        !Array.isArray(data.questions)
      ) {
        throw new Error(
          "Invalid challenge received from AI"
        )
      }

      setQuestions(data.questions)
    } catch (error) {
      console.error(error)

      setError(
        "Could not generate the Topic Challenge. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const selectAnswer = (
    questionIndex: number,
    answer: string
  ) => {
    if (submitted) {
      return
    }

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: answer,
    }))
  }

  const askAIAboutQuestion = (
    question: Question,
    questionIndex: number
  ) => {
    navigate("/ai-tutor", {
      state: {
        questionHelp: {
          question: question.question,
          options: question.options,
          topic:
            topic?.title ||
            "Artificial Intelligence",
          lesson: "Topic Challenge",
          learningLevel,
          questionNumber:
            questionIndex + 1,
        },
      },
    })
  }

  const submitChallenge = () => {
    if (questions.length === 0) {
      return
    }

    const allAnswered = questions.every(
      (_, index) => answers[index]
    )

    if (!allAnswered) {
      return
    }

    let correct = 0

    questions.forEach(
      (question, index) => {
        if (
          answers[index] ===
          question.correctAnswer
        ) {
          correct++
        }
      }
    )

    const percentage = Math.round(
      (correct / questions.length) * 100
    )

    setScore(percentage)
    setSubmitted(true)

    saveTopicChallengeScore(
      topicId,
      percentage
    )

    /*
      Unlock the next learning level only
      when the Topic Challenge score is 80%+
    */
    if (canUnlockNextLevel(percentage)) {
      const unlockedLevel =
        getNextLevel(learningLevel)

      if (unlockedLevel) {
        saveUnlockedLevel(unlockedLevel)

        setUnlockedNextLevel(true)
        setNextLevel(unlockedLevel)
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!topic) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Topic not found
            </h1>

            <Link
              to="/learning-path"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Back to Learning Path
            </Link>
          </div>
        </main>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              AI is preparing your Topic Challenge
            </h1>

            <p className="mt-2 text-gray-600">
              Creating questions for your{" "}
              {learningLevel} level based on
              the lessons you completed.
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Topic Challenge
            </h1>

            <p className="mt-4 text-red-600">
              {error}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={generateChallenge}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Try Again
              </button>

              <Link
                to="/learning-path"
                className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700"
              >
                Back to Learning Path
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (submitted) {
    const passed = score >= 80

    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold text-purple-600">
                Topic Challenge Complete
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {topic.title}
              </h1>

              <p className="mt-8 text-6xl font-bold text-blue-600">
                {score}%
              </p>

              <p className="mt-3 text-gray-600">
                You answered{" "}
                {Math.round(
                  (score / 100) *
                    questions.length
                )}{" "}
                out of{" "}
                {questions.length}{" "}
                questions correctly.
              </p>

              <div
                className={`mt-8 rounded-xl p-5 ${
                  passed
                    ? "bg-green-50"
                    : "bg-yellow-50"
                }`}
              >
                <h2 className="font-bold text-gray-900">
                  {passed
                    ? "Challenge Passed"
                    : "Keep Practicing"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {passed
                    ? "Your performance shows strong understanding of this topic."
                    : "Review the lessons and try the Topic Challenge again to strengthen your understanding."}
                </p>
              </div>

              {unlockedNextLevel &&
                nextLevel && (
                  <div className="mt-5 rounded-xl bg-purple-50 p-5">
                    <p className="font-bold text-purple-700">
                      🎉 {nextLevel} Level Unlocked
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      Your {learningLevel} Topic
                      Challenge score of{" "}
                      {score}% unlocked the{" "}
                      {nextLevel} learning level.
                    </p>

                    <button
                      onClick={() => {
                        localStorage.setItem(
                          "ai-mentor-learning-level",
                          nextLevel
                        )

                        navigate(
                          "/dashboard"
                        )
                      }}
                      className="mt-4 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
                    >
                      Start {nextLevel} Learning
                    </button>
                  </div>
                )}
            </div>

            <div className="mt-6 space-y-5">
              {questions.map(
                (
                  question,
                  index
                ) => {
                  const userAnswer =
                    answers[index]

                  const correct =
                    userAnswer ===
                    question.correctAnswer

                  return (
                    <div
                      key={index}
                      className={`rounded-2xl bg-white p-6 shadow-sm ${
                        correct
                          ? "border border-green-200"
                          : "border border-red-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <h2 className="font-bold leading-7 text-gray-900">
                            {question.question}
                          </h2>

                          <p
                            className={`mt-3 text-sm font-semibold ${
                              correct
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {correct
                              ? "Correct"
                              : "Incorrect"}
                          </p>

                          {!correct && (
                            <p className="mt-2 text-sm text-gray-600">
                              Correct answer:{" "}
                              <span className="font-semibold text-gray-900">
                                {
                                  question.correctAnswer
                                }
                              </span>
                            </p>
                          )}

                          {question.explanation && (
                            <div className="mt-4 rounded-xl bg-blue-50 p-4">
                              <p className="text-sm font-semibold text-blue-700">
                                Explanation
                              </p>

                              <p className="mt-1 text-sm leading-6 text-gray-700">
                                {
                                  question.explanation
                                }
                              </p>
                            </div>
                          )}

                          <button
                            onClick={() =>
                              askAIAboutQuestion(
                                question,
                                index
                              )
                            }
                            className="mt-4 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                          >
                            🤖 Ask AI Mentor about this question
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/learning-path"
                className="flex-1 rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700"
              >
                Back to Learning Path
              </Link>

              <button
                onClick={generateChallenge}
                className="flex-1 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
              >
                Retake Challenge
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-600">
                  Final Topic Assessment
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {topic.title}
                </h1>

                <p className="mt-3 text-gray-600">
                  Test your understanding of all
                  the lessons you completed in
                  this topic.
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                {learningLevel}
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {questions.length}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Questions
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {lessons.length}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Lessons
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  80%
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Pass Score
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {questions.map(
              (
                question,
                index
              ) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
                      {index + 1}
                    </div>

                    <h2 className="flex-1 text-lg font-bold leading-7 text-gray-900">
                      {question.question}
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {question.options.map(
                      (option) => {
                        const selected =
                          answers[index] ===
                          option

                        return (
                          <button
                            key={option}
                            onClick={() =>
                              selectAnswer(
                                index,
                                option
                              )
                            }
                            className={`w-full rounded-xl border p-4 text-left transition ${
                              selected
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      }
                    )}
                  </div>

                  <button
                    onClick={() =>
                      askAIAboutQuestion(
                        question,
                        index
                      )
                    }
                    className="mt-5 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    🤖 Don't know how to solve? Ask AI Mentor
                  </button>
                </div>
              )
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Link
              to="/learning-path"
              className="rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700"
            >
              Back to Learning Path
            </Link>

            <button
              onClick={submitChallenge}
              disabled={
                !questions.every(
                  (_, index) =>
                    answers[index]
                )
              }
              className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Topic Challenge
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TopicChallenge
