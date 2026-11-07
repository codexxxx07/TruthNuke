import { ChevronDown } from "lucide-react";

const SeverityColors = {
  error: "bg-error/10 text-error border-error",
  warning: "bg-warning/10 text-warning border-warning",
  suggestion: "bg-suggestion/10 text-suggestion border-suggestion",
  information: "bg-information/10 text-information border-information",
};

const SeverityLabels = {
  error: "Error",
  warning: "Warning",
  suggestion: "Suggestion",
  information: "Information",
};

const SeverityTitles = {
  error: "High severity issue",
  warning: "Moderate severity issue",
  suggestion: "Suggested improvement",
  information: "Informational note",
};

/**
 * StatusBadge - Display a finding's severity with color coding
 * @param {Object} props - The component props
 * @param {string} props.severity - The severity level (error, warning, suggestion, information)
 * @param {string} [props.className] - Additional CSS classes
 */
const StatusBadge = ({ severity, className }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const colorClass = SeverityColors[severity] || SeverityColors.information;
  const label = SeverityLabels[severity] || "Information";

  return (
    <span className={`${baseClasses} ${colorClass} hover:opacity-80 ${className}`}>
      <span className="align-middle" title={SeverityTitles[severity] || ""}>
        {label}
      </span>
    </span>
  );
};

/**
 * ClipboardButton - Copy text to clipboard
 * @param {Object} props - The component props
 * @param {string} props.text - The text to copy
 * @param {Function} props.onCopy - Callback when text is copied
 * @param {string} [props.label] - Custom button label
 */
const ClipboardButton = ({ text, onCopy, label = "Copy" }) => {
  const handleCopy = () => {
    if (typeof document !== "undefined") {
      navigator.clipboard.writeText(text).then(() => {
        onCopy && onCopy();
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border hover:bg-bg/20 transition-colors"
      title={label}
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
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15l7-7 7 7" />
      </svg>
      <span>{label}</span>
    </button>
  );
};

/** @jsxImportSource react */
export { StatusBadge, ClipboardButton };