import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MOCK_USERS } from "../data/seedData";

const AppContext = createContext({ user: null, role: null, theme: "light" });

const THEME_KEY = "truthnuke-theme";
const THEME_TRANSITION_MS = 320;

const readStoredUser = () => {
  try {
    const stored = localStorage.getItem("truthnuke-user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

/** Light is the default for first-time visitors; only an explicit "dark" opts in. */
const readStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [role, setRole] = useState(() => localStorage.getItem("truthnuke-role") || null);
  const [theme, setTheme] = useState(readStoredTheme);
  const transitionTimer = useRef(null);

  // Single source of truth: every route reads this state and <html> mirrors it.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage may be unavailable (private mode) - the theme still works in-session */
    }
  }, [theme]);

  useEffect(() => () => clearTimeout(transitionTimer.current), []);

  const toggleTheme = useCallback(() => {
    if (!prefersReducedMotion()) {
      const root = document.documentElement;
      root.classList.add("theme-transition");
      clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(
        () => root.classList.remove("theme-transition"),
        THEME_TRANSITION_MS + 40
      );
    }
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const login = (displayName, userRole) => {
    const profile = MOCK_USERS[userRole] || {
      id: `user-${userRole}`,
      name: "Guest",
      email: "",
    };

    const authenticatedUser = {
      id: profile.id,
      name: (displayName && displayName.trim()) || profile.name,
      email: profile.email,
      role: userRole,
    };

    setUser(authenticatedUser);
    setRole(userRole);
    localStorage.setItem("truthnuke-user", JSON.stringify(authenticatedUser));
    localStorage.setItem("truthnuke-role", userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("truthnuke-user");
    localStorage.removeItem("truthnuke-role");
  };

  return (
    <AppContext.Provider value={{ user, role, login, logout, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContext;
