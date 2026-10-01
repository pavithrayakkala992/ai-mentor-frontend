import { useState } from "react"
import { Link, useNavigate } from "react-router"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = () => {
    const savedEmail =
      localStorage.getItem("ai-mentor-user-email")

    const savedName =
      localStorage.getItem("ai-mentor-user-name")

    const assessmentCompleted =
      localStorage.getItem("ai-mentor-assessment-completed") === "true"

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.")
      return
    }

    if (!savedEmail || !savedName) {
      setError("No account found. Please register first.")
      return
    }

    if (
      email.trim().toLowerCase() !==
      savedEmail.trim().toLowerCase()
    ) {
      setError("Incorrect email.")
      return
    }

    localStorage.setItem(
      "ai-mentor-logged-in",
      "true"
    )

    if (assessmentCompleted) {
      navigate("/dashboard", { replace: true })
    } else {
      navigate("/learning-level", { replace: true })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Mentor
          </h1>

          <p className="mt-2 text-gray-500">
            Your personalized AI learning companion
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
