import { Menu, LogOut, User } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

/**
 * Header - Application header with user menu and role info
 */
const Header = () => {
  const { user, role, logout } = useAppContext();

  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-sm shadow-sm sticky top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-aqua-500 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="14" rx="2" ry="2" />
                <path d="M6 12l3 6l6-4 2 3l-7 2-5-5l5-3z" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">Truth Nuke</span>
          </div>
          <span className="text-sm text-muted-foreground capitalize">v2.3</span>
        </div>

        {/* Right: User menu */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-foreground" />
              <span className="font-medium capitalize">{user.name}</span>
            </div>
          )}

          <button
            onClick={logout}
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-md border border-border hover:bg-bg/20 transition-colors"
            title="Sign Out"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

/** @jsxImportSource react */
export default Header;