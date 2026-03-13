"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-4 h-4" />;
  }

  const isDark = theme === "dark";
  const isSystem = theme === "system";

  return (
    <button
      onClick={() => {
        if (isSystem) setTheme("light");
        else if (!isDark) setTheme("dark");
        else setTheme("system");
      }}
      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
      title={`Theme: ${theme}`}
    >
      {isSystem ? "auto" : isDark ? "dark" : "light"}
    </button>
  );
}
