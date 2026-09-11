import { Link } from "react-router-dom";

export function ZundyLogo() {
  return (
    <Link to="/dashboard" className="block">
      <svg
        role="img"
        aria-label="Zundy"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 60"
        height={28}
        width={112}
        className="block text-foreground"
      >
        <text
          x="10"
          y="40"
          fontFamily="'Inter', 'Segoe UI', sans-serif"
          fontSize="30"
          fontWeight="600"
          letterSpacing="2px"
          fill="currentColor"
        >
          ZUNDY
        </text>
      </svg>
    </Link>
  );
}
