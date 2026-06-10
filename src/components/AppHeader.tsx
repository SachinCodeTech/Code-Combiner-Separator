import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { OfflineBadge } from "./OfflineBadge";

export function AppHeader({ showNav = false }: { showNav?: boolean }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        padding: "10px 14px",
        background: "var(--header-grad)",
        color: "white",
        boxShadow: "0 2px 10px rgba(15,23,42,0.18)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="/icon-192.png"
          alt="CCnCS Logo"
          width={36}
          height={36}
          style={{ borderRadius: 8, flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.3, lineHeight: 1.2 }}>
            CCnCS
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 300,
              letterSpacing: 0.4,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.2,
              marginTop: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Split. Combine. Preview.
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          <OfflineBadge />
          <ThemeToggle />
        </div>
      </div>
      {showNav && (
        <nav style={{ marginTop: 8, fontSize: 13, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.95)" }}>Home</Link>
          <Link to="/about" style={{ color: "rgba(255,255,255,0.95)" }}>About</Link>
          <Link to="/privacy" style={{ color: "rgba(255,255,255,0.95)" }}>Privacy</Link>
          <Link to="/info" style={{ color: "rgba(255,255,255,0.95)" }}>App Info</Link>
        </nav>
      )}
    </header>
  );
}
