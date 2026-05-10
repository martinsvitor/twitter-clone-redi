"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function Header() {
  const { theme, setTheme, effectiveTheme, mounted } = useTheme();

  const toggleTheme = () => {
    const newTheme = effectiveTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const getIcon = () => {
    return effectiveTheme === "light" ? <Sun size={20} /> : <Moon size={20} />;
  };

  return (
    <header className="border-b border-border">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Home</h1>
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-card transition-colors"
            aria-label="Toggle theme"
            title={`Current theme: ${theme}`}
          >
            {getIcon()}
          </button>
        )}
      </div>
    </header>
  );
}
