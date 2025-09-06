// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const bgColor = theme === "dark" ? "bg-gray-700" : "bg-slate-300";
  const knobColor = theme === "dark" ? "bg-gray-600" : "bg-yellow-300";

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden flex items-center gap-3 p-2 rounded-full">
        <div
          onClick={toggleTheme}
          className={`relative w-14 h-8 rounded-full cursor-pointer transition-colors duration-500 ${bgColor}`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-500 ${knobColor} ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {theme === "dark" 
              ? <Moon size={14} className="" /> 
              : <Sun size={14} className="text-yellow-500" />}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div
        onClick={toggleTheme}
        className={`hidden sm:flex items-center justify-center w-14 h-8 rounded-full cursor-pointer transition-colors duration-500 ${bgColor}`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-500 ${knobColor} ${
            theme === "dark" ? "translate-x-3" : "-translate-x-3"
          }`}
        >
          {theme === "dark" 
            ? <Moon size={13} className="text-slate-300" /> 
            : <Sun size={13} className="text-yellow-500" />}
        </div>
      </div>
    </>
  );
}
