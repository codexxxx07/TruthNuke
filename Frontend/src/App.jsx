import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Guidelines from "./pages/Guidelines";
import NewContent from "./pages/NewContent";
import ContentReview from "./pages/ContentReview";
import Approval from "./pages/Approval";
import Settings from "./pages/Settings";
import { AppContextProvider, useAppContext } from "./context/AppContext";

function App() {
  const { user, role } = useAppContext();

  const routeGuard = (component) => {
    if (!user) {
      return <Navigate to="/" replace={true} />;
    }
    return component;
  };

  return (
    <AppContextProvider>
      <div className="min-h-screen bg-background text-foreground">
        {user ? (
          <Routes>
            <Route path="/" element={<Dashboard />} exact />
            <Route path="guidelines" element={<Guidelines />} />
            <Route path="new-content" element={<NewContent />} />
            <Route path="content-review" element={<ContentReview />} />
            <Route path="approval" element={<Approval />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </div>
    </AppContextProvider>
  );
}

export default App;