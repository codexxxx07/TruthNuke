import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { MOCK_CONTENT, MOCK_GUIDELINES } from "../data/seedData";
import { runReviewEngine } from "../services/reviewEngine";
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

const Approval = () => {
  const { user, role } = useAppContext();
  const [contentItems, setContentItems] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("draft");
  const [reviewComments, setReviewComments] = useState("");
  const [reviewResults, setReviewResults] = useState(null);
  const [revisionHistory, setRevisionHistory] = useState([]);
  const [toast, setToast] = useState(null);

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
    setSelectedContent(content);
    setApprovalStatus("in-review");
    setReviewComments("");

    try {
      const findings = await runReviewEngine(content.content, MOCK_GUIDELINES.sections);
      setReviewResults(findings);

      setRevisionHistory((prev) => [
        ...prev,
        {
          id: `rh-${Date.now()}`,
          contentId: content.id,
          user: user?.name || "unknown",
          role: "reviewer",
          action: "review executed",
          timestamp: new Date().toISOString(),
          description: `Review completed with ${findings.length} findings`,
        },
      ]);
    } catch (error) {
      setToast({
        type: "error",
        message: "Review failed. Please try again.",
        autoDismiss: true,
      });
      console.error("Review error:", error);
    }
  };

  const handleApprove = () => {
    setApprovalStatus("approved");

    setRevisionHistory((prev) => [
      ...prev,
      {
        id: `rh-${Date.now()}`,
        contentId: selectedContent?.id,
        user: user?.name || "unknown",
        role: "reviewer",
        action: "approved",
        timestamp: new Date().toISOString(),
        description: "Content approved for publication",
      },
    ]);

    setToast({
      type: "success",
      message: "Content approved successfully",
      autoDismiss: true,
    });

    setSelectedContent(null);
    setReviewResults(null);
    setApprovalStatus("draft");
  };

  const handleRequestChanges = () => {
    if (!reviewComments.trim()) {
      setToast({
        type: "error",
        message: "Please add a comment before requesting changes",
        autoDismiss: true,
      });
      return;
    }

    setApprovalStatus("changes-requested");

    setRevisionHistory((prev) => [
      ...prev,
      {
        id: `rh-${Date.now()}`,
        contentId: selectedContent?.id,
        user: user?.name || "unknown",
        role: role === "reviewer" ? "reviewer" : "manager",
        action: "change requested",
        timestamp: new Date().toISOString(),
        description: `Changes requested: ${reviewComments}`,
      },
    ]);

    setToast({
      type: "success",
      message: "Changes requested successfully",
      autoDismiss: true,
    });

    setSelectedContent(null);
    setReviewResults(null);
    setReviewComments("");
  };

  const handleSubmitForApproval = () => {
    setApprovalStatus("in-review");

    setToast({
      type: "info",
      message: "Content submitted for approval",
      autoDismiss: true,
    });
  };

  const handleDismissToast = () => setToast(null);

  // Build status stepper items outside JSX
  const statuses = ["draft", "in-review", "changes-requested", "approved"];

  // Build status stepper classes outside JSX
  const statusClassMap = {
    draft: "bg-primary-600 text-primary-foreground",
    "in-review": "bg-primary-600 text-primary-foreground",
    "changes-requested": "bg-primary-600 text-primary-foreground",
    approved: "bg-primary-600 text-primary-foreground",
  };

  // Build button classes outside JSX
  const buttonClassMap = {
    draft: "px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-primary-50",
    "in-review": "px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-primary-50",
    "changes-requested": "px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-primary-50",
    approved: "px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-primary-50",
  };

  // Build revision history content outside JSX
  const revisionHistoryContent = () => {
    if (revisionHistory.length === 0) {
      return <p className="text-xs text-muted-foreground">No revision history</p>;
    }
    return (
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {revisionHistory.map((entry) => (
          <div key={entry.id} className="p-3 rounded-lg border border-border flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              {entry.user.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{entry.user}</p>
              <p className="text-xs text-muted-foreground">{entry.action}</p>
            </div>
            <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
          </div>
        ))}
      </div>
    );
  };

  // Build status stepper outside JSX
  const statusStepper = () => (
    <div className="flex space-x-2">
      {statuses.map((s) => (
        <div
          key={s}
          className={`flex-1 h-8 flex items-center justify-center rounded-full ${
            approvalStatus === s ? statusClassMap[s] : "bg-border"
          }`}
        >
          <span className="text-xs font-semibold capitalize">{s}</span>
        </div>
      ))}
    </div>
  );

  // Build status buttons outside JSX
  const statusButtons = () => (
    <div className="space-y-2">
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => setApprovalStatus(s)}
          className={approvalStatus === s ? statusClassMap[s] : buttonClassMap[s]}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );

  // Build comment form outside JSX
  const commentForm = () => (
    <div className="mt-4 p-3 rounded-lg border border-border">
      <h3 className="text-sm font-medium mb-3">Request Changes Comment</h3>
      <textarea
        rows={3}
        value={reviewComments}
        onChange={(e) => setReviewComments(e.target.value)}
        className="w-full rounded-md border border-border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Add a comment explaining the changes requested..."
        aria-label="Changes requested comment"
      ></textarea>
    </div>
  );

  // Build action buttons outside JSX
  const actionButtons = () => {
    if (role === "reviewer") {
      return (
        <div className="mt-6 pt-6 border-t border-border">
          <ActionButton
            text={approvalStatus === "changes-requested" ? "Submit" : "Request Changes"}
            type={approvalStatus === "changes-requested" ? "primary" : "danger"}
            onClick={handleRequestChanges}
            disabled={!reviewComments.trim()}
          />
        </div>
      );
    }
    if (role === "manager") {
      return (
        <div className="mt-6 pt-6 border-t border-border">
          <ActionButton text="Approve" type="success" onClick={handleApprove} />
        </div>
      );
    }
    if (role === "creator") {
      return (
        <div className="mt-6 pt-6 border-t border-border">
          <ActionButton text="Submit for Approval" type="secondary" onClick={handleSubmitForApproval} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Approval Workflow</h1>
        <p className="text-muted-foreground">Manage content approval process</p>
      </div>

      {/* Status stepper */}
      <div className="mb-6 bg-card rounded-lg p-4 border border-border">
        {statusStepper()}
      </div>

      {contentItems.length > 0 && (
        <div className="bg-card rounded-lg p-4 mb-6 border border-border">
          <h2 className="text-semibold mb-3">Select Content</h2>
          <div className="space-y-2">
            {contentItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedContent(item)}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                  selectedContent?.id === item.id
                    ? "bg-primary-600 text-primary-foreground"
                    : "text-foreground hover:bg-primary-50"}
                `}
              >
                <span className="flex-1 truncate">{item.title}</span>
                <span className="text-primary-500">{item.channel}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedContent && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold tracking-tight">{selectedContent.title}</h2>
              <p className="text-sm text-muted-foreground">{selectedContent.channel}</p>
            </div>

            <div className="bg-muted-foreground/10 rounded-lg p-3 mb-4">
              <p className="text-muted-foreground">{selectedContent.content || "No content available"}</p>
            </div>

            {reviewResults && reviewResults.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Review Findings:</p>
                <div className="space-y-2">
                  {reviewResults.map((finding) => (
                    <div
                      key={finding.id}
                      className={`rounded-lg p-2 ${severityBorderClass(finding.severity)}`}
                    >
                      <span className="text-xs font-medium">
                        {finding.type}: {finding.snippet || finding.explanation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 p-3 rounded-lg border border-border">
              <h3 className="text-sm font-medium mb-3">Status</h3>
              {statusButtons()}
            </div>

            {commentForm()}

            <div className="mt-6 pt-6 border-t border-border">
              {actionButtons()}
            </div>
          </div>

          {role === "reviewer" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-semibold mb-3">Comment Thread</h3>

                {reviewResults && reviewResults.length > 0 && (
                  <div className="bg-card rounded-lg p-4 h-64 overflow-y-auto">
                    <p className="text-xs text-muted-foreground mb-3">No comments yet</p>
                    <textarea
                      rows={3}
                      className="w-full rounded-md border border-border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Add a comment..."
                      aria-label="Comment"
                    ></textarea>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium mb-2">Revision History</h4>
                  {revisionHistoryContent()}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-start gap-3 bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm" style={{ transform: "translateY(0)" }}>
          <p className="font-medium">{toast.message}</p>
          <button
            onClick={handleDismissToast}
            className="ml-auto text-muted-foreground hover opacity-80"
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
export default Approval;