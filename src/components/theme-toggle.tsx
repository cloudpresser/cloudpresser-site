"use client";

import "theme-toggles/css/expand.css";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

const cycle: Record<ThemeOption, ThemeOption> = {
  light: "dark",
  dark: "system",
  system: "light",
};

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visualTheme, setVisualTheme] = useState<ThemeOption>("system");
  const [visualDark, setVisualDark] = useState(false);
  const clipPathId = `theme-toggle-expand-${useId().replace(/[:]/g, "")}`;
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setVisualTheme((theme ?? "system") as ThemeOption);
    setVisualDark(resolvedTheme === "dark");
  }, [resolvedTheme, theme]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!mounted) {
    return <div className="h-5 w-5 shrink-0" />;
  }

  const currentTheme = (theme ?? "system") as ThemeOption;
  const isSystem = visualTheme === "system";

  function getResolvedDark(nextTheme: ThemeOption) {
    if (nextTheme === "dark") return true;
    if (nextTheme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function handleClick() {
    const nextTheme = cycle[currentTheme];
    const nextVisualDark = getResolvedDark(nextTheme);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setVisualTheme(nextTheme);
    setVisualDark(nextVisualDark);

    timeoutRef.current = window.setTimeout(() => {
      setTheme(nextTheme);
      timeoutRef.current = null;
    }, 280);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "theme-toggle flex h-5 w-5 items-center justify-center text-muted-foreground transition-colors duration-200",
        visualDark && "theme-toggle--toggled",
        isSystem
          ? "opacity-35 hover:opacity-55 hover:text-muted-foreground"
          : "opacity-100 hover:text-foreground"
      )}
      title={
        isSystem
          ? `Theme: system (${resolvedTheme ?? "light"})`
          : `Theme: ${visualTheme}`
      }
      aria-label={`Theme: ${visualTheme}${isSystem ? ` (${resolvedTheme ?? "light"})` : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="1em"
        height="1em"
        fill="currentColor"
        className="theme-toggle__expand h-4 w-4"
        viewBox="0 0 32 32"
      >
        <clipPath id={clipPathId}>
          <path d="M0-11h25a1 1 0 0017 13v30H0Z" />
        </clipPath>
        <g clipPath={`url(#${clipPathId})`}>
          <circle cx="16" cy="16" r="8.4" />
          <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
        </g>
      </svg>
    </button>
  );
}
