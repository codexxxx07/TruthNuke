import { Moon, Sun } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

/**
 * ThemeToggle - Compact light/dark switch used on the Sign In page and every dashboard header.
 * Icon swap is a pure CSS cross-fade, so it respects reduced-motion settings.
 */
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useAppContext();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foreground hover:bg-primary-50 transition-colors cursor-pointer ${className}`}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          strokeWidth={2}
          aria-hidden="true"
          className={`absolute h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
            isDark ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          strokeWidth={2}
          aria-hidden="true"
          className={`absolute h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

/** @jsxImportSource react */
export default ThemeToggle;
