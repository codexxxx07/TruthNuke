import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { MOCK_GUIDELINES } from "../data/seedData";
import { StatusBadge } from "../components/common/StatusBadge";

const Guidelines = () => {
  const { user, role } = useAppContext();
  const [guidelines, setGuidelines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("bannedTerms");
  const [toast, setToast] = useState(null);

  // Load guidelines on mount
  useEffect(() => {
    setGuidelines(MOCK_GUIDELINES.sections);
  }, []);

  const handleDismissToast = () => setToast(null);

  const getButtonClass = (key) => {
    return selectedCategory === key
      ? "bg-primary-600 text-primary-foreground"
      : "text-foreground hover:bg-primary-50";
  };

  const categoryLabels = {
    bannedTerms: "Banned Terms",
    preferredTerminology: "Preferred Terminology",
    unsupportedClaims: "Unsupported Claims",
    toneDetection: "Tone Detection",
    accessibility: "Accessibility",
  };

  const handleAddGuideline = () => {
    setToast({
      type: "success",
      message: "Guideline added successfully",
      autoDismiss: true,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Guideline Library</h1>
        <p className="text-muted-foreground">Manage brand governance guidelines</p>
      </div>

      {/* Category tabs */}
      <div className="mb-4 flex gap-2">
        <button
          key="bannedTerms"
          onClick={() => setSelectedCategory('bannedTerms')}
          className={cls('bannedTerms')}
        >
          Banned Terms
        </button>
        <button
          key="preferredTerminology"
          onClick={() => setSelectedCategory('preferredTerminology')}
          className={cls('preferredTerminology')}
        >
          Preferred Terminology
        </button>
        <button
          key="unsupportedClaims"
          onClick={() => setSelectedCategory('unsupportedClaims')}
          className={cls('unsupportedClaims')}
        >
          Unsupported Claims
        </button>
        <button
          key="toneDetection"
          onClick={() => setSelectedCategory('toneDetection')}
          className={cls('toneDetection')}
        >
          Tone Detection
        </button>
        <button
          key="accessibility"
          onClick={() => setSelectedCategory('accessibility')}
          className={cls('accessibility')}
        >
          Accessibility
        </button>
)        ))
      </div>

      {/* Guidelines grid by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guidelines.map((category) => (
          <div
            key={category.id}
            className="bg-card rounded-lg p-4 border border-border hover:border-primary-200 transition-colors"
          >
            <h3 className="text-semibold mb-2">{category.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.content}
            </p>
            
            {category.id && selectedCategory === category.id.split("-")[0] && (
              <small className="text-xs text-primary-600">
                Rule ID: {category.id}
              </small>
            )}
          </div>
        ))}
      </div>

      {/* Add new guideline form (conditional) */}
      {selectedCategory && (
        <div className="mt-6 p-4 bg-card rounded-lg">
          <h3 className="text-semibold mb-3">Add New Guideline</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Guideline title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                rows={2}
                className="w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Guideline content"
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <ActionButton
              text="Save Guideline"
              type="primary"
              onClick={handleAddGuideline}
            />
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
export default Guidelines;