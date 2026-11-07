import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { MOCK_GUIDELINES } from "../data/seedData";
import runReviewEngine from "../services/reviewEngine";
import { StatusBadge } from "../components/common/StatusBadge";
import ActionButton from "../components/common/ActionButton";

const ContentReview = () => {
  const { user, role } = useAppContext();
  const [contentItems, setContentItems] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [reviewResults, setReviewResults] = useState(null);
  const [activeFinding, setActiveFinding] = useState(null);
  const [toast, setToast] = useState(null);

  // Fetch content items
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
    setReviewResults(null);
    setActiveFinding(null);

    try {
      const findings = await runReviewEngine(content.content, MOCK_GUIDELINES.sections);
      setReviewResults(findings);
      // Set the first finding as active
      if (findings.length > 0) {
        setActiveFinding(findings[0]);
      }
    } catch (error) {
      setToast({
        type: "error",
        message: "Review failed. Please try again.",
        autoDismiss: true,
      });
      console.error("Review error:", error);
    }
  };

  const handleScrollToFinding = (finding) => {
    setActiveFinding(finding);
    // Scroll to the finding element - would need refs in a real implementation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAcceptFix = (finding) => {
    setToast({
      type: "success",
      message: `Fix accepted: ${finding.suggestedFix || "correction applied"}`,
      autoDismiss: true,
    });
    // In a real app, this would update the content and mark the finding as accepted
    setSelectedContent(null);
    setReviewResults(null);
    setActiveFinding(null);
  };

  const handleRejectFix = (finding) => {
    setToast({
      type: "info",
      message: "Fix rejected, original text preserved",
      autoDismiss: true,
    });
    setSelectedContent(null);
    setReviewResults(null);
    setActiveFinding(null);
  };

  const handleDismissToast = () => setToast(null);

  const handleAcceptAll = () => {
    setToast({
      type: "success",
      message: "All fixes accepted",
      autoDismiss: true,
    });
    setSelectedContent(null);
    setReviewResults(null);
    setActiveFinding(null);
  };

  const handleRejectAll = () => {
    setToast({
      type: "info",
      message: "All fixes rejected",
      autoDismiss: true,
    });
    setSelectedContent(null);
    setReviewResults(null);
    setActiveFinding(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Content Review</h1>
        <p className="text-muted-foreground">AI-assisted content quality assurance</p>
      </div>

      {/* Content selector */}
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
                }`}
              >
                <span className="flex-1 truncate">{item.title}</span>
                <span className="text-primary-500">{item.channel}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Review panel - shown when content is selected */}
      {selectedContent && (
        <div className="grid lg:grid-[2_1fr] gap-6">
          
          {/* Main Content Panel */}
          <div>
            {selectedContent.title && (
              <div className="mb-4">
                <h2 className="text-lg font-bold tracking-tight">{selectedContent.title}</h2>
                <p className="text-sm text-muted-foreground">{selectedContent.channel}</p>
              </div>
            )}
            
            <div className="bg-muted-foreground/10 rounded-lg p-4 mb-4">
              <p className="text-muted-foreground">{selectedContent.content || "No content available"}</p>
            </div>

            {/* Inline highlighted issues */}
            {reviewResults && activeFinding && reviewResults.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Active issue:</p>
                <div className={`p-3 rounded-lg ${activeFinding.severity === 'error' ? 'border-error/20 text-error' : activeFinding.severity === 'warning' ? 'border-warning/20 text-warning' : 'border-suggestion/20 text-suggestion'}`}>
                  <span 
                    onClick={() => handleScrollToFinding(activeFinding)}
                    className="cursor-pointer underline text-primary-600 hover:underline-offset-2"
                  >
                    {activeFinding.snippet || activeFinding.explanation}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Findings Panel */}
          <div className="space-y-4">
            {reviewResults && reviewResults.length > 0 ? (
              <div>
                {reviewResults.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-4 rounded-lg border {finding.severity === 'error' ? 'border-error/20' : finding.severity === 'warning' ? 'border-warning/20' : finding.severity === 'suggestion' ? 'border-suggestion/20' : 'border-info/20'} hover:transition-colors cursor-pointer"
                    onClick={() => setActiveFinding(finding)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">
                        {finding.type === 'bannedTerm' ? 'Banned Term' : 
                        finding.type === 'preferredTerminology' ? 'Preferred Terminology' : 
                        finding.type === 'unsupportedClaim' ? 'Unsupported Claim' : 
                        finding.type === 'tone' ? 'Tone Issue' : 
                        finding.type === 'accessibility' ? 'Accessibility' : 'Issue'}
                      </span>
                      <StatusBadge severity={finding.severity} />
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {finding.explanation}
                    </p>
                    
                    <div className="flex gap-3 pt-b border-t border-border pt-3">
                      <span className="text-xs text-muted-foreground">Line {finding.start + 1}-{finding.end}</span>
                      
                      <div>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        <span className="text-xs text-muted-foreground ml-1">AI-assisted</span>
                      </div>
                    </div>
                    
                    {/* Source guideline reference */}
                    <div className="mt-3 p-3 rounded-lg bg-primary-50">
                      <p className="text-xs font-medium text-primary-600">Source: <span className="underline text-primary-600 cursor-pointer">Banned Terms Policy</span></p>
                      <p className="text-xs text-muted-foreground">{finding.explanation}</p>
                    </div>
                    
                    {/* Suggested correction */}
                    <div className="mt-3 p-3 rounded-lg bg-primary-50/50">
                      <p className="text-xs font-medium mb-1">Suggested Correction:</p>
                      <p className="text-sm font-medium">{finding.suggestedFix || "No suggestion available"}</p>
                    </div>
                    
                    {/* Accept/Reject buttons */}
                    <div className="mt-3 flex gap-2">
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
            ) : (
              <div className="p-6 text-center">
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
                  <line x1="3" y9="15" x2="15" y9="15" />
                  <line x1="9" y3="21" x2="21" y21="21" />
                </svg>
                <p className="mt-4 text-muted-foreground">Run a review to see findings</p>
                <ActionButton
                  type="primary"
                  onClick={() => handleRunReview(selectedContent)}
                  disabled={!selectedContent}
                >
                  Run Review
                </ActionButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast area */}
      {toast && (
        <div className="fixed top-4 right-4 bg-card border rounded-lg p-4 shadow-lg max-w-sm transform transition-transform" style={{ transform: "translateY(0)" }}>
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
export default ContentReview;