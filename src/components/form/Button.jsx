const Button = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
  disabled = false,
}) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700",
    secondary:
      "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
