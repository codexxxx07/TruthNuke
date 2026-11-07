import { useState } from "react";
import { MOCK_GUIDELINES, MOCK_SOURCE_GUIDELINES } from "../data/seedData";
import { StatusBadge } from "../components/common/StatusBadge";
import ActionButton from "../components/common/ActionButton";

const CATEGORY_LABELS = {
  bannedTerms: "Banned Terms",
  preferredTerminology: "Preferred Terminology",
  unsupportedClaims: "Unsupported Claims",
  toneDetection: "Tone Detection",
  accessibility: "Accessibility",
};

/**
 * Normalizes the guideline seed data into one list of rules per category.
 */
const getRules = (category) => {
  const sections = MOCK_GUIDELINES.sections;

  if (category === "bannedTerms") {
    return sections.bannedTerms.map((rule) => ({
      id: rule.id,
      title: rule.term,
      detail: rule.explanation,
      severity: rule.severity,
    }));
  }

  if (category === "preferredTerminology") {
    return sections.preferredTerminology.map((rule) => ({
      id: rule.id,
      title: `${rule.nonPreferred.trim()} -> ${rule.preferred}`,
      detail: rule.explanation,
      severity: rule.severity,
    }));
  }

  if (category === "unsupportedClaims") {
    return sections.approvedFacts.map((fact) => ({
      id: fact.id,
      title: fact.claim,
      detail: `Approved fact - Source: ${fact.source}`,
      severity: "information",
    }));
  }

  return MOCK_SOURCE_GUIDELINES.filter((guide) => guide.category === category).map((guide) => ({
    id: guide.id,
    title: guide.title,
    detail: guide.content,
    severity: "information",
  }));
};

const Guidelines = () => {
  const [selectedCategory, setSelectedCategory] = useState("bannedTerms");
  const [form, setForm] = useState({ title: "", content: "" });
  const [toast, setToast] = useState(null);

  const handleDismissToast = () => setToast(null);

  const getButtonClass = (key) => {
    return selectedCategory === key
      ? "rounded-md px-3 py-1.5 text-sm font-medium bg-primary-600 text-primary-foreground"
      : "rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary-50";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGuideline = (event) => {
    event.preventDefault();
    setToast({
      type: "success",
      message: "Guideline added successfully",
      autoDismiss: true,
    });
    setForm({ title: "", content: "" });
  };

  const rules = getRules(selectedCategory);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Guideline Library</h1>
        <p className="text-muted-foreground">Manage brand governance guidelines</p>
      </div>

      {/* Category tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={getButtonClass(key)}
            aria-pressed={selectedCategory === key}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Guidelines grid by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-card rounded-lg p-4 border border-border hover:border-primary-200 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm font-semibold">{rule.title}</h3>
              <StatusBadge severity={rule.severity} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {rule.detail}
            </p>
            <small className="text-xs text-primary-600">
              Rule ID: {rule.id}
            </small>
          </div>
        ))}

        {rules.length === 0 && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground">No guidelines in this category yet.</p>
          </div>
        )}
      </div>

      {/* Add new guideline form */}
      <form onSubmit={handleAddGuideline} className="mt-6 p-4 bg-card rounded-lg border border-border">
        <h3 className="text-sm font-semibold mb-3">Add New Guideline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Guideline title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              rows={2}
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="Guideline content"
              required
            ></textarea>
          </div>
        </div>
        <div className="mt-4">
          <ActionButton
            text="Save Guideline"
            type="primary"
            htmlType="submit"
          />
        </div>
      </form>

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
export default Guidelines;
