import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          Portfolio
        </a>

        <div className="flex items-center space-x-6">
          <a
            href="#about"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            {t("nav_about")}
          </a>
          <a
            href="#skills"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            {t("nav_skills")}
          </a>
          <a
            href="#projects"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            {t("nav_projects")}
          </a>
          <a
            href="#contact"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            {t("nav_contact")}
          </a>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Selector */}
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-1 text-sm text-gray-900 dark:text-gray-100"
          >
            <option value="uz">UZ</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
