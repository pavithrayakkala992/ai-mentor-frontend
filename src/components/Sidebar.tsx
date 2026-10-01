import {
  LayoutDashboard,
  BookOpen,
  Brain,
  MessageCircle,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router"

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex w-full items-center gap-3 rounded-lg px-4 py-3 ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:bg-gray-50"
    }`

  const learningPathActive =
    location.pathname === "/learning-path" ||
    location.pathname.startsWith("/lesson/")

  const handleLogout = () => {
    localStorage.removeItem("ai-mentor-logged-in")
    navigate("/login")
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">
          AI Mentor
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Learn AI your way
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink to="/dashboard" end className={navClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/learning-path"
          className={() =>
            `flex w-full items-center gap-3 rounded-lg px-4 py-3 ${
              learningPathActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BookOpen size={20} />
          Learning Path
        </NavLink>

        <NavLink to="/practice" className={navClass}>
          <Brain size={20} />
          Practice & Quizzes
        </NavLink>

        <NavLink to="/ai-tutor" className={navClass}>
          <MessageCircle size={20} />
          AI Tutor
        </NavLink>

        <NavLink to="/progress" className={navClass}>
          <BarChart3 size={20} />
          Progress
        </NavLink>
      </nav>

      <div className="space-y-2 border-t border-gray-200 pt-4">
        <NavLink to="/settings" className={navClass}>
          <Settings size={20} />
          Settings
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
