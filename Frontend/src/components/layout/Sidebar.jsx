import {
  LayoutDashboard,
  Folder,
  Plus,
  Eye,
  CheckSquare,
  Settings,
  LogOut as LogOutIcon
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const PATH_BY_KEY = {
  dashboard: "/",
  guidelines: "/guidelines",
  "new-content": "/new-content",
  "content-review": "/content-review",
  approval: "/approval",
  settings: "/settings",
};

/**
 * Sidebar - Navigation sidebar with active route highlighting
 * Supports role-based visibility
 */
const Sidebar = () => {
  const { role } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items with roles and permissions
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, role: "all" },
    { key: "guidelines", label: "Guideline Library", icon: Folder, role: "all" },
    { key: "new-content", label: "New Content", icon: Plus, role: ["creator", "manager"] },
    { key: "content-review", label: "Content Reviews", icon: Eye, role: ["creator", "manager", "reviewer"] },
    { key: "approval", label: "Approvals", icon: CheckSquare, role: ["manager", "reviewer"] },
    { key: "settings", label: "Settings", icon: Settings, role: "all" },
  ];

  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  const isActive = (key) => currentPath === PATH_BY_KEY[key];

  // Check if user has role to see this item
  const hasRole = (itemRole) => {
    if (itemRole === "all") return true;
    if (Array.isArray(itemRole)) return itemRole.includes(role);
    return itemRole === role;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-xl z-30 overflow-y-auto">
      <div className="p-4 pt-6">
        {/* Branding section at top of sidebar */}
        <div className="mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-600 to-aqua-600 flex items-center justify-center mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="14" rx="2" ry="2" />
              <path d="M6 12l3 6l6-4 2 3l-7 2-5-5l5-3z" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-medium capitalize">Truth Nuke</span>
            <span className="text-xs text-muted-foreground">v2.3</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => {
              // Skip items user doesn't have role for
              if (!hasRole(item.role)) return null;

              const Icon = item.icon;
              const active = isActive(item.key);

              return (
                <li key={item.key}>
                  <button
                    onClick={() => navigate(PATH_BY_KEY[item.key])}
                    className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer ${active
                      ? "bg-primary-100 text-primary-800 border border-primary-200"
                      : "text-foreground hover:bg-primary-50 hover:text-primary-600"}
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Divider and dashboard shortcut at bottom */}
        <div className="mt-6 pt-6 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Go to Dashboard"
          >
            <LogOutIcon className="h-5 w-5" /> Dashboard
          </button>
        </div>
      </div>
    </aside>
  );
};

/** @jsxImportSource react */
export default Sidebar;
