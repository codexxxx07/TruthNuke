import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Guidelines from "./pages/Guidelines";
import NewContent from "./pages/NewContent";
import ContentReview from "./pages/ContentReview";
import Approval from "./pages/Approval";
import Settings from "./pages/Settings";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import { useAppContext } from "./context/AppContext";

function App() {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {user ? (
        <div className="min-h-screen">
          <Sidebar />
          <div className="ml-64 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/new-content" element={<NewContent />} />
                <Route path="/content-review" element={<ContentReview />} />
                <Route path="/approval" element={<Approval />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
