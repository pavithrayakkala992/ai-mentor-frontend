import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import LearningLevel from "./pages/LearningLevel"
import Assessment from "./pages/Assessment"
import LearningPath from "./pages/LearningPath"
import Lesson from "./pages/Lesson"
import TopicChallenge from "./pages/TopicChallenge"
import Practice from "./pages/Practice"
import AITutor from "./pages/AITutor"
import Progress from "./pages/Progress"
import Settings from "./pages/Settings"

function App() {
  const isLoggedIn =
    localStorage.getItem("ai-mentor-logged-in") ===
    "true"

  const assessmentCompleted =
    localStorage.getItem(
      "ai-mentor-assessment-completed"
    ) === "true"

  return (
    <BrowserRouter>
      <Routes>

        {/* First page is always Login */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Registration */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Learning Level */}

        <Route
          path="/learning-level"
          element={
            isLoggedIn ? (
              <LearningLevel />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* Initial Assessment */}

        <Route
          path="/assessment"
          element={
            isLoggedIn ? (
              <Assessment />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <Dashboard />
            ) : (
              <Navigate
                to={
                  isLoggedIn
                    ? "/learning-level"
                    : "/login"
                }
                replace
              />
            )
          }
        />

        {/* Learning Path */}

        <Route
          path="/learning-path"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <LearningPath />
            ) : (
              <Navigate
                to={
                  isLoggedIn
                    ? "/learning-level"
                    : "/login"
                }
                replace
              />
            )
          }
        />

        {/* Lesson */}

        <Route
          path="/lesson/:id"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <Lesson />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* Topic Challenge */}

        <Route
          path="/topic-challenge/:id"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <TopicChallenge />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* Practice */}

        <Route
          path="/practice"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <Practice />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* AI Tutor */}

        <Route
          path="/ai-tutor"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <AITutor />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* Progress */}

        <Route
          path="/progress"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <Progress />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            isLoggedIn &&
            assessmentCompleted ? (
              <Settings />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
