/**
 * ActionButton - Customizable action button with various types
 * Supports: primary, secondary, success, danger, ghost, outline styles
 * Includes: loading state, disabled state, icon support, children support
 */
const ActionButton = ({
  text,
  children,
  onClick = () => {},
  type = "primary",
  size = "md",
  htmlType = "button",
  disabled = false,
  loading = false,
  leftIcon: LeftIcon = null,
  rightIcon: RightIcon = null,
  className = "",
  minWidth = "auto",
}) => {
  const typeStyles = {
    primary: "bg-primary-600 text-primary-foreground hover:bg-primary-500",
    secondary: "bg-secondary-600 text-secondary-foreground hover:bg-secondary-500",
    success: "bg-success-600 text-success-foreground hover:bg-success-500",
    danger: "bg-danger-600 text-danger-foreground hover:bg-danger-500",
    ghost: "hover:bg-primary-50 text-primary-600",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2",
  };

  const handleClick = (event) => {
    if (!disabled && !loading) {
      onClick(event);
    }
  };

  return (
    <button
      type={htmlType}
      onClick={handleClick}
      disabled={disabled || loading}
      style={{ minWidth }}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${
        typeStyles[type] || typeStyles.primary
      } ${sizeStyles[size] || sizeStyles.md} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {LeftIcon ? <LeftIcon className="h-4 w-4" /> : null}
      {loading ? (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
      ) : null}
      {text || children ? <span>{text || children}</span> : null}
      {RightIcon ? <RightIcon className="h-4 w-4" /> : null}
    </button>
  );
};

/** @jsxImportSource react */
export default ActionButton;
