import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "auto"
  );

  // APPLY THEME
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (mode) => {
      if (mode === "dark") {
        root.classList.add("dark");
      } else if (mode === "light") {
        root.classList.remove("dark");
      } else {
        // AUTO MODE
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        if (prefersDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme(theme);

    localStorage.setItem("theme", theme);

    // LISTEN FOR SYSTEM CHANGES
    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemTheme = () => {
      if (theme === "auto") {
        applyTheme("auto");
      }
    };

    media.addEventListener("change", handleSystemTheme);

    return () => {
      media.removeEventListener(
        "change",
        handleSystemTheme
      );
    };
  }, [theme]);

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-lg">

      {/* LIGHT */}
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-xl transition ${
          theme === "light"
            ? "bg-yellow-400 text-black"
            : "hover:bg-white/10"
        }`}
      >
        <Sun size={18} />
      </button>

      {/* DARK */}
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-xl transition ${
          theme === "dark"
            ? "bg-slate-800 text-white"
            : "hover:bg-white/10"
        }`}
      >
        <Moon size={18} />
      </button>

      {/* AUTO */}
      <button
        onClick={() => setTheme("auto")}
        className={`p-2 rounded-xl transition ${
          theme === "auto"
            ? "bg-blue-500 text-white"
            : "hover:bg-white/10"
        }`}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}