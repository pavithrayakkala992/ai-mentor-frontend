import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"

import Sidebar from "../components/Sidebar"

import {
  getCurrentLevel,
  getCompletedTopics,
  getCompletedLessons,
  getPracticeScore,
  getTopicChallengeScore,
} from "../utils/progress"

import {
  getPersonalizedLearningTopics,
  getLessonsForCurrentLevel,
} from "../data/learningData"

type Message = {
  role: "user" | "assistant"
  content: string
}

type QuestionHelp = {
  question: string
  options: string[]
  topic: string
  lesson: string
  learningLevel: string
  questionNumber: number
}

function AITutor() {
  const location = useLocation()

  const learningLevel = getCurrentLevel()

  const userName =
    localStorage.getItem(
      "ai-mentor-user-name"
    ) || "Student"

  const practiceScore =
    getPracticeScore()

  const completedTopics =
    getCompletedTopics()

  const [messages, setMessages] =
    useState<Message[]>([])

  const [input, setInput] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const [selectedTopicId, setSelectedTopicId] =
    useState<number | null>(null)

  const autoQuestionHandled =
    useRef(false)

  const topics =
    getPersonalizedLearningTopics()

  const selectedTopic =
    selectedTopicId !== null
      ? topics.find(
          (topic) =>
            topic.id === selectedTopicId
        )
      : null

  const selectedLessons =
    selectedTopic
      ? getLessonsForCurrentLevel(
          selectedTopic.id
        )
      : []

  const completedLessons =
    selectedTopic
      ? getCompletedLessons(
          selectedTopic.id
        )
      : []

  const currentLesson =
    selectedTopic
      ? selectedLessons.find(
          (lesson) =>
            !completedLessons.includes(
              lesson.id
            )
        )
      : null

  const challengeScore =
    selectedTopic
      ? getTopicChallengeScore(
          selectedTopic.id
        )
      : null

  const getLevelInstruction = () => {
    if (learningLevel === "Beginner") {
      return `
The student is at Beginner level.

Use simple English.
Explain concepts step by step.
Avoid unnecessary advanced mathematics.
Use everyday examples and small AI examples.
Do not assume prior AI knowledge.
When solving questions, teach the reasoning before giving the answer.
`
    }

    if (learningLevel === "Intermediate") {
      return `
The student is at Intermediate level.

Assume the student understands basic AI concepts.
Give moderately detailed technical explanations.
Use practical examples and some mathematical reasoning where useful.
Connect concepts together.
For problem-solving questions, explain the reasoning process clearly.
Do not oversimplify the explanation.
`
    }

    return `
The student is at Advanced level.

Use technically detailed explanations.
Assume strong understanding of basic AI and machine learning concepts.
Discuss deeper reasoning, trade-offs, mathematical intuition, algorithms, and practical applications when relevant.
Challenge the student with deeper questions instead of giving only basic definitions.
Still explain the reasoning clearly.
`
  }

  useEffect(() => {
    const state =
      location.state as {
        questionHelp?: QuestionHelp
      } | null

    if (
      !state?.questionHelp ||
      autoQuestionHandled.current
    ) {
      return
    }

    autoQuestionHandled.current = true

    const questionHelp =
      state.questionHelp

    const matchingTopic =
      topics.find(
        (topic) =>
          topic.title ===
          questionHelp.topic
      )

    setSelectedTopicId(
      matchingTopic?.id || null
    )

    const questionText = `
I need help with this Topic Challenge question.

Topic:
${questionHelp.topic}

Lesson:
${questionHelp.lesson}

Learning Level:
${questionHelp.learningLevel}

Question ${questionHelp.questionNumber}:
${questionHelp.question}

Options:
${questionHelp.options
  .map(
    (option, index) =>
      `${String.fromCharCode(
        65 + index
      )}. ${option}`
  )
  .join("\n")}

Please don't just give me the answer.

Explain:
1. What the question is asking
2. The concept needed to solve it
3. How I should think about it
4. How to eliminate wrong options
5. How to arrive at the correct answer

Explain it at my ${questionHelp.learningLevel} level.
`

   sendMessage(questionText)

    window.history.replaceState(
      {},
      document.title
    )
  }, [location.state])

 const sendMessage = async (
  messageOverride?: string
) => {
    const message =
      messageOverride ??
      input.trim()

    if (!message || loading) {
      return
    }

    setError("")

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: message,
      },
    ])

    setInput("")
    setLoading(true)

    try {
      const completedLessonTitles =
        selectedTopic
          ? completedLessons
              .map((lessonId) =>
                selectedLessons.find(
                  (lesson) =>
                    lesson.id ===
                    lessonId
                )
              )
              .filter(Boolean)
              .map(
                (lesson) =>
                  lesson!.title
              )
          : []

      const completedTopicTitles =
        completedTopics
          .map((topicId) => {
            const topic =
              topics.find(
                (item) =>
                  item.id === topicId
              )

            return topic
              ? topic.title
              : null
          })
          .filter(Boolean)

      const learningProgress = selectedTopic
        ? `${completedLessons.length}/${selectedLessons.length} lessons completed`
        : "No topic selected"

      const performanceContext =
        practiceScore >= 80
          ? "Strong practice performance"
          : practiceScore >= 50
            ? "Moderate practice performance"
            : "Needs more practice"

      const response = await fetch(
        "https://ai-mentor-backend-zhfh.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message,
            userName,
            learningLevel,

            currentTopic:
              selectedTopic?.title ||
              "Not currently selected",

            currentLesson:
              currentLesson?.title ||
              "Not currently selected",

            practiceScore,

            performanceContext,

            learningProgress,

            completedTopics:
              completedTopicTitles
                .join(", ") ||
              "None",

            completedLessons:
              completedLessonTitles
                .join(", ") ||
              "None",

            topicChallengeScore:
              challengeScore,

            levelInstruction:
              getLevelInstruction(),
          }),
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to generate AI response"
        )
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            data.response,
        },
      ])
    } catch (error) {
      console.error(error)

      setError(
        "Could not connect to AI Mentor. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault()
    sendMessage()
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  AI Learning Assistant
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  AI Mentor
                </h1>

                <p className="mt-2 text-gray-600">
                  Your personalized AI tutor
                  for learning Artificial
                  Intelligence.
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 px-4 py-3">
                <p className="text-xs text-blue-600">
                  Learning Level
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {learningLevel}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="font-bold text-gray-900">
                Learning Context
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                AI Mentor uses your learning
                progress to personalize
                explanations.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-blue-600">
                    Student
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {userName}
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-xs text-purple-600">
                    Level
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {learningLevel}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs text-green-600">
                    Practice Score
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {practiceScore}%
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-900">
                  Current Topic
                </p>

                <select
                  value={
                    selectedTopicId ??
                    ""
                  }
                  onChange={(event) =>
                    setSelectedTopicId(
                      event.target.value
                        ? Number(
                            event.target
                              .value
                          )
                        : null
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select a topic
                  </option>

                  {topics.map(
                    (topic) => (
                      <option
                        key={topic.id}
                        value={
                          topic.id
                        }
                      >
                        {topic.title}
                      </option>
                    )
                  )}
                </select>
              </div>

              {selectedTopic && (
                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Selected Topic
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedTopic.title}
                  </p>

                  <p className="mt-3 text-xs text-gray-500">
                    Current Lesson
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {currentLesson
                      ? currentLesson.title
                      : "All lessons completed"}
                  </p>

                  <p className="mt-3 text-xs text-gray-500">
                    Completed Lessons
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {
                      completedLessons.length
                    }{" "}
                    /{" "}
                    {
                      selectedLessons.length
                    }
                  </p>

                  {challengeScore !==
                    null && (
                    <>
                      <p className="mt-3 text-xs text-gray-500">
                        Topic Challenge
                      </p>

                      <p className="mt-1 text-sm font-semibold text-purple-700">
                        {challengeScore}%
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="mt-5 rounded-xl bg-yellow-50 p-4">
                <p className="text-xs font-semibold text-yellow-700">
                  Adaptive Mentor
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  The mentor adjusts explanations
                  and problem difficulty to your
                  current learning level.
                </p>
              </div>
            </aside>

            <section className="flex min-h-[650px] flex-col rounded-2xl bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="font-bold text-gray-900">
                  Ask AI Mentor
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Ask about AI, Machine Learning,
                  Neural Networks, or Generative
                  AI.
                </p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {messages.length ===
                  0 && (
                  <div className="flex min-h-[420px] items-center justify-center">
                    <div className="max-w-md text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                        🤖
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-gray-900">
                        Hi {userName}!
                      </h3>

                      <p className="mt-2 leading-6 text-gray-600">
                        I know your learning
                        level, progress,
                        completed lessons,
                        and practice
                        performance.
                      </p>

                      <div className="mt-5 grid gap-2 text-left">
                        <button
                          onClick={() =>
                            sendMessage(
                              "Explain my current AI learning topic in a simple way."
                            )
                          }
                          className="rounded-xl border border-gray-200 p-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Explain my current
                          topic
                        </button>

                        <button
                          onClick={() =>
                            sendMessage(
                              "What should I focus on next in my AI learning journey?"
                            )
                          }
                          className="rounded-xl border border-gray-200 p-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          What should I
                          learn next?
                        </button>

                        <button
                          onClick={() =>
                            sendMessage(
                              "Give me a practice problem based on my current learning level."
                            )
                          }
                          className="rounded-xl border border-gray-200 p-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Give me a practice
                          problem
                        </button>

                        <button
                          onClick={() =>
                            sendMessage(
                              "Analyze my current learning progress and tell me what I should improve."
                            )
                          }
                          className="rounded-xl border border-gray-200 p-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Analyze my progress
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map(
                  (message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role ===
                        "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role ===
                          "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-7">
                          {
                            message.content
                          }
                        </p>
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-gray-100 px-5 py-4">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{
                            animationDelay:
                              "150ms",
                          }}
                        />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{
                            animationDelay:
                              "300ms",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mx-5 mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="border-t border-gray-100 p-4"
              >
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={(event) =>
                      setInput(
                        event.target.value
                      )
                    }
                    placeholder="Ask AI Mentor anything about AI..."
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    disabled={loading}
                  />

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !input.trim()
                    }
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AITutor
