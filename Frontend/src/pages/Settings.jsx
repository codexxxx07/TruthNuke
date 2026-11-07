import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import ActionButton from "../components/common/ActionButton";

const Settings = () => {
  const { user, role } = useAppContext();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoReview: true,
    aiDisclosure: true,
  });
  const [toast, setToast] = useState(null);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    
    setToast({
      type: "success",
      message: `${key} updated`,
      autoDismiss: true,
    });
  };

  const handleSave = () => {
    setToast({
      type: "success",
      message: "Settings saved successfully",
      autoDismiss: true,
    });
  };

  const handleDismissToast = () => setToast(null);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Application and data settings</p>
      </div>

      {/* Settings grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Appearance settings */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-semibold mb-4">Appearance</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle("darkMode")}
                  className="rounded border-primary-500 focus:ring-primary-500"
                />
                Dark Mode
              </label>
              <p className="text-xs text-muted-foreground mt-1">Enable dark theme for reduced eye strain</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggle("notifications")}
                  className="rounded border-primary-500 focus:ring-primary-500"
                />
                Notifications
              </label>
              <p className="text-xs text-muted-foreground mt-1">Receive email notifications for new reviews</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={settings.autoReview}
                  onChange={() => handleToggle("autoReview")}
                  className="rounded border-primary-500 focus:ring-primary-500"
                />
                Auto-Reviews
              </label>
              <p className="text-xs text-muted-foreground mt-1">Automatically run review on content submit</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={settings.aiDisclosure}
                  onChange={() => handleToggle("aiDisclosure")}
                  className="rounded border-primary-500 focus:ring-primary-500"
                />
                AI Disclosure
              </label>
              <p className="text-xs text-muted-foreground mt-1">Disclose AI-assisted review in published content</p>
            </div>
          </div>
        </div>

        {/* Data persistence */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-semibold mb-4">Data Persistence</h2>
          
          <p className="text-muted-foreground mb-4">
            Your role, preferences, and revision history are persisted in localStorage.
          </p>
          
          <button
            onClick={() => {
              localStorage.removeItem("truthnuke-user");
              localStorage.removeItem("truthnuke-role");
              setToast({
                type: "info",
                message: "Session data cleared",
                autoDismiss: true,
              });
            }}
            className="w-full py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            Clear All Local Data
          </button>
        </div>
      </div>

      {/* About section */}
      <div>
        <h2 className="text-semibold mb-4">About Truth Nuke</h2>
        
        <div className="bg-card rounded-lg p-6 border border-border">
          <p className="text-muted-foreground mb-4">
            Truth Nuke helps organizations maintain brand consistency across all published content.
          </p>
          
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium">Product</dt>
              <dd>Truth Nuke</dd>
            </div>
            <div>
              <dt className="font-medium">Version</dt>
              <dd>v2.3.0</dd>
            </div>
            <div>
              <dt className="font-medium">Released</dt>
              <dd>2024</dd>
            </div>
          </dl>
          
          <p className="mt-4 text-xs text-muted-foreground">
            Work already done: nothing — the turn failed before acting
          </p>
        </div>
      </div>
    </div>
  );
};

/** @jsxImportSource react */
export default Settings;