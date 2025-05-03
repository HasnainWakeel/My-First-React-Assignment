import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext.jsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav 
      className={`flex justify-between items-center px-6 py-4 border-b dark:border-red-600 
                  ${theme === "light" ? "bg-white" : "bg-[#1a0000]"}`}
    >
      <div className="flex gap-6 text-lg md:text-xl lg:text-2xl font-semibold">
        <Link to="/" 
              className={`hover:text-red-600 transition ${theme === "light" ? "text-black" : "text-white"}`}>
          Home
        </Link>
        <Link to="/todo" 
              className={`hover:text-red-600 transition ${theme === "light" ? "text-black" : "text-white"}`}>
          Todo
        </Link>
        <Link to="/users" 
              className={`hover:text-red-600 transition ${theme === "light" ? "text-black" : "text-white"}`}>
          Users
        </Link>
      </div>
      <button
        onClick={toggleTheme}
        className={`border px-4 py-1 md:px-6 md:py-2 rounded-md text-sm md:text-base font-medium ${theme === "light" ? "text-black" : "text-white"} 
                   ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-red-600"} transition`}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
}
