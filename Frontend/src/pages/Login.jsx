import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import ThemeToggle from "../components/common/ThemeToggle";

const Login = () => {
  const { login } = useAppContext();
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("creator");

  const handleLogin = () => {
    login(name, selectedRole);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="bg-card rounded-xl p-8 max-w-md w-full border border-border shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500 to-aqua-500 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="14" rx="2" ry="2" />
              <path d="M6 12l3 6l6-4 2 3l-7 2-5-5l5-3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight motion-safe:animate-title-in">Truth Nuke</h1>
          <ThemeToggle />
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground text-base">Select your role to begin:</p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setSelectedRole("creator")}
            className={`rounded-xl px-4 py-3 border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ease-out hover:shadow-soft-lg active:shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 ${
              selectedRole === "creator"
                ? "bg-primary-100 text-primary-800 border-primary-200 shadow-soft"
                : "border-transparent text-foreground hover:bg-primary-50 hover:border-primary-200"}
            `}
            aria-pressed={selectedRole === "creator"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4l10 8-10 8v-4" />
              <path d="M12 22v-4l-10-8 10-8v4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div className="mt-2">
              <span className="block font-medium">Creator</span>
              <span className="block text-xs text-muted-foreground sm:min-h-[3rem]">Create and review content</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole("manager")}
            className={`rounded-xl px-4 py-3 border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ease-out hover:shadow-soft-lg active:shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 ${
              selectedRole === "manager"
                ? "bg-primary-100 text-primary-800 border-primary-200 shadow-soft"
                : "border-transparent text-foreground hover:bg-primary-50 hover:border-primary-200"}
            `}
            aria-pressed={selectedRole === "manager"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div className="mt-2">
              <span className="block font-medium">Manager</span>
              <span className="block text-xs text-muted-foreground sm:min-h-[3rem]">Monitor team and approve content</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole("reviewer")}
            className={`rounded-xl px-4 py-3 border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ease-out hover:shadow-soft-lg active:shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 ${
              selectedRole === "reviewer"
                ? "bg-primary-100 text-primary-800 border-primary-200 shadow-soft"
                : "border-transparent text-foreground hover:bg-primary-50 hover:border-primary-200"}
            `}
            aria-pressed={selectedRole === "reviewer"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <div className="mt-2">
              <span className="block font-medium">Reviewer</span>
              <span className="block text-xs text-muted-foreground sm:min-h-[3rem]">Review and approve content</span>
            </div>
          </button>
        </div>

        {/* User name input */}
        {selectedRole && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your name"
              aria-label="User name"
            />
          </div>
        )}

        {/* Login button */}
        {selectedRole && (
          <button
            onClick={handleLogin}
            className="w-full rounded-md px-4 py-2.5 bg-primary-600 text-primary-foreground hover:bg-primary-500 font-medium transition-colors"
            aria-label="Login to Truth Nuke"
          >
            Sign In
          </button>
        )}

        <p className="text-xs text-muted-foreground mt-4 text-center">
          AI suggests. Humans decide.
        </p>
      </div>
    </div>
  );
};

export default Login;
