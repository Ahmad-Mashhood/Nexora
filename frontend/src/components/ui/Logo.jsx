import { Link } from "react-router-dom";

const Logo = ({ compact = false }) => (
  <Link to="/" className={`logo ${compact ? "logo--compact" : ""}`}>
    <span className="logo__icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
        <path
          d="M8 12h16l-1.5 12H9.5L8 12z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.12)"
        />
        <path
          d="M11 12V10a5 5 0 0 1 10 0v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#818cf8" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
    </span>
    {!compact && (
      <span className="logo__text">
        Nex<span>ora</span>
      </span>
    )}
  </Link>
);

export default Logo;
