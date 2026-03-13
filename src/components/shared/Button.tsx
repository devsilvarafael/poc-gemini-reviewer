interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  isLoading = false,
}: ButtonProps) => {
  const handleClick = (): void => {
    if (!disabled && !isLoading) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`btn btn-${variant}`}
    >
      {isLoading ? "Carregando..." : label}
    </button>
  );
};
