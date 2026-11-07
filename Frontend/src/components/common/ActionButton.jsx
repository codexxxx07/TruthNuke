import { Check, X, RefreshCw, Trash } from "lucide-react";

/**
 * ActionButton - Customizable action button with various types
 * Supports: primary, secondary, success, danger, ghost styles
 * Includes: loading state, disabled state, icon support
 */
const ActionButton = ({
  text,
  onClick,
  type = "primary",
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
  minWidth = "auto",
}) => {
  const typeStyles = {
    primary: "bg-primary-600 text-primary-foreground hover:bg-primary-500 disabled:bg-primary-400",
    secondary: "bg-secondary-600 text-secondary-foreground hover:bg-secondary-500 disabled:bg-secondary-400",
    success: "bg-success-600 text-success-foreground hover:bg-success-500 disabled:bg-success-400",
    danger: "bg-danger-600 text-danger-foreground hover:bg-danger-500 disabled:bg-danger-400",
    ghost: "hover:bg-primary-50 text-primary-600",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 disabled:border-primary-300",
  };

  const handleClick = (e) => {
    if (!disabled && !loading) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${typeStyles[type] || typeStyles.primary} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {leftIcon && <leftIcon className="h-4 w-4 mr-2" />}
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin text-current"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      ) : null}
      {rightIcon && <rightIcon className="h-4 w-4 ml-2" />}
      <span>{text}</span>
    </button>
  );
};

/** @jsxImportSource react */
export default ActionButton;