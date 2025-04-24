import React from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) => {
  const baseClasses =
    "h-12 px-3 py-4 border-2 border-Primary text-base font-medium transition-colors duration-200 flex items-center cursor-pointer";

  const variantClasses =
    variant === "secondary"
      ? "text-black bg-transparent  hover:bg-gray-200 border-transparent"
      : "text-white bg-Primary ";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className} `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
