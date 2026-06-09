import { Link } from "react-router-dom";

type GetStartedButtonProps = {
  variant?: "white" | "dark" | "nav" | "team";
  fullWidth?: boolean;
  shadow?: boolean;
  className?: string;
  label?: string;
  to?: string;
  onClick?: () => void;
};

const variantClasses: Record<NonNullable<GetStartedButtonProps["variant"]>, string> = {
  white: "bg-white text-foreground hover:bg-white/95 px-10 py-4 text-base",
  dark: "bg-foreground text-background hover:bg-foreground/90 px-10 py-4 text-base",
  nav: "inline-flex h-10 shrink-0 items-center justify-center border-[1.25px] border-solid border-[#1a182b] bg-[#1a182b] px-6 text-sm text-white tracking-[-0.14px] transition-transform hover:translate-y-px",
  team: "bg-primitive-main-dark text-white hover:bg-primitive-main-dark/90",
};

const defaultSizeClasses: Partial<Record<NonNullable<GetStartedButtonProps["variant"]>, string>> = {
  team: "px-6 py-3.5 text-base",
};

export function GetStartedButton({
  variant = "white",
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
    defaultSizeClasses[variant] ?? "",
    fullWidth ? "flex w-full justify-center text-center" : "",
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
