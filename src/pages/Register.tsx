import { useState } from "react"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("Please fill in all the fields.")
      return
    }

    /* Clear previous user's learning data */
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("ai-mentor-")) {
        localStorage.removeItem(key)
      }
    })

    /* Save new user's account details */
    localStorage.setItem(
      "ai-mentor-user-name",
      name.trim()
    )

    localStorage.setItem(
      "ai-mentor-user-email",
      email.trim()
    )

    localStorage.setItem(
      "ai-mentor-user-password",
      password
    )

    localStorage.setItem(
      "ai-mentor-logged-in",
      "true"
    )

    /*
      Reload the app so App.tsx reads the new
      logged-in state from localStorage.
    */
    window.location.href = "/learning-level"
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Start your personalized AI learning journey
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

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
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
