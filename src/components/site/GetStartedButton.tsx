import { Link } from "react-router-dom";

type GetStartedButtonProps = {
  variant?: "white" | "dark" | "nav" | "team";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  shadow?: boolean;
  className?: string;
  label?: string;
  to?: string;
  onClick?: () => void;
};

const variantClasses: Record<NonNullable<GetStartedButtonProps["variant"]>, string> = {
  white: "bg-white text-foreground hover:bg-white/95",
  dark: "bg-foreground text-background hover:bg-foreground/90",
  nav: "bg-[#1A1829] text-white hover:bg-[#1A1829]/90 font-medium",
  team: "bg-primitive-main-dark text-white hover:bg-primitive-main-dark/90",
};

const sizeClasses: Record<NonNullable<GetStartedButtonProps["size"]>, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function GetStartedButton({
  variant = "white",
  size = "md",
  fullWidth = false,
  shadow = false,
  className = "",
  label = "Get Started for Free",
  to = "/get-started",
  onClick,
}: GetStartedButtonProps) {
  const classes = [
    "cursor-pointer rounded-full font-medium transition",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "block w-full text-center" : "inline-block text-center",
    shadow && "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={to} onClick={onClick} className={classes}>
      {label}
    </Link>
  );
}
