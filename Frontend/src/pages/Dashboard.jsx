import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { runReviewEngine } from "../services/reviewEngine";
import { MOCK_CONTENT, MOCK_GUIDELINES } from "../data/seedData";
import { StatusBadge } from "../components/common/StatusBadge";
import ActionButton from "../components/common/ActionButton";

const severityBorderClass = (severity) => {
  switch (severity) {
    case "error":
      return "border border-error/30";
    case "warning":
      return "border border-warning/30";
    case "suggestion":
      return "border border-suggestion/30";
    default:
      return "border border-information/30";
  }
};

const Dashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [contentItems, setContentItems] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [reviewResults, setReviewResults] = useState(null);
  const [isRunningReview, setIsRunningReview] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch content on mount
  useEffect(() => {
    loadContent();
  }, [user]);

  const loadContent = async () => {
    try {
      const items = await new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_CONTENT.items), 300);
      });
      setContentItems(items);
    } catch (error) {
      console.error("Failed to load content:", error);
    }
  };

  const handleRunReview = async (content) => {
    setIsRunningReview(true);
    setSelectedContent(content);
    setReviewResults(null);

    try {
      const findings = await runReviewEngine(content.content, MOCK_GUIDELINES.sections);
      setReviewResults(findings);
      setToast({
        type: "success",
        message: `Review complete - ${findings.length} findings detected`,
        autoDismiss: true,
      });
    } catch (error) {
      setToast({
        type: "error",
        message: "Review failed. Please try again.",
        autoDismiss: true,
      });
      console.error("Review error:", error);
    } finally {
      setIsRunningReview(false);
    }
  };

  const handleAcceptFix = () => {
    setToast({
      type: "success",
      message: "Fix accepted and applied",
      autoDismiss: true,
    });
    // In a real app, this would update the content state
    setSelectedContent(null);
    setReviewResults(null);
  };

  const handleRejectFix = () => {
    setToast({
      type: "info",
      message: "Fix rejected, original text preserved",
      autoDismiss: true,
    });
    setSelectedContent(null);
    setReviewResults(null);
  };

  const handleDismissToast = () => setToast(null);

  return (
    <div className="p-6">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {user.name}</h1>
        <p className="text-muted-foreground">Content Quality Dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Total Content</p>
          <p className="text-2xl font-bold">{contentItems.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Under Review</p>
          <p className="text-2xl font-bold">{contentItems.filter((c) => c.status === "pending").length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Approved</p>
          <p className="text-2xl font-bold">{contentItems.filter((c) => c.status === "approved").length}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        <ActionButton
          text="Create New Content"
          type="primary"
          onClick={() => navigate("/new-content")}
        />
        <ActionButton
          text="View Guidelines"
          type="secondary"
          onClick={() => navigate("/guidelines")}
        />
      </div>

      {/* Content list */}
      {contentItems.length === 0 ? (
        <div className="bg-card rounded-lg p-8 text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="15" y2="9" />
            <line x1="9" y1="21" x2="21" y2="21" />
          </svg>
          <p className="mt-4 text-muted-foreground">No content items found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg overflow-hidden border border-border">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-xs font-medium text-foreground capitalize">Content</th>
                <th className="p-3 text-left text-xs font-medium text-foreground capitalize">Channel</th>
                <th className="p-3 text-left text-xs font-medium text-foreground capitalize">Status</th>
                <th className="p-3 text-right text-xs font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentItems.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-primary-50">
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 text-sm text-muted-foreground">{item.channel}</td>
                  <td className="p-3">
                    <StatusBadge severity={item.status} />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleRunReview(item)}
                      className="underline text-primary-600 underline-offset-2 hover:text-primary-800"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review results panel - shown when reviewing content */}
      {selectedContent && reviewResults && (
        <div className="mt-6 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">Review Results</h2>
          <p className="text-muted-foreground mb-4">
            Analyzed: "{selectedContent.title}" - {reviewResults.length} findings
          </p>

          <div className="space-y-3">
            {reviewResults.map((finding) => (
              <div
                key={finding.id}
                className={`p-3 rounded-lg ${severityBorderClass(finding.severity)}`}
              >
                <div className="flex justify-between items-start mb-2 gap-3">
                  <span className="font-medium">{finding.snippet || finding.explanation}</span>
                  <StatusBadge severity={finding.severity} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {finding.explanation}
                </p>
                <div className="mt-2 flex gap-2">
                  <ActionButton
                    text="Accept"
                    type="success"
                    size="sm"
                    onClick={() => handleAcceptFix(finding)}
                  />
                  <ActionButton
                    text="Reject"
                    type="danger"
                    size="sm"
                    onClick={() => handleRejectFix(finding)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast area */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-start gap-3 bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm transform transition-transform" style={{ transform: "translateY(0)" }}>
          <p className="font-medium">{toast.message}</p>
          <button
            onClick={handleDismissToast}
            className="ml-auto text-muted-foreground hover:opacity-80"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

/** @jsxImportSource react */
export default Dashboard;
