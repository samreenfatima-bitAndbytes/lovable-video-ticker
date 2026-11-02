import { Link } from "react-router-dom";

export default function Brand({ to = "/", size = "md" }) {
  return (
    <Link to={to} className={`brand brand-${size}`} aria-label="Lovable Video Ticker">
      <img src="/logo.svg" alt="" className="brand-mark-icon" />
      <span className="brand-text">
        <span className="brand-name">Lovable</span>
        <span className="brand-sub">Video Ticker</span>
      </span>
    </Link>
  );
}
