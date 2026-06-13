import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { OfflineBadge } from "./OfflineBadge";
import { APP_VERSION } from "@/lib/sample";

export function AppHeader({
  showNav = false,
  onLogoClick,
  logoIsToggle = false,
}: {
  showNav?: boolean;
  onLogoClick?: () => void;
  logoIsToggle?: boolean;
}) {
  const LogoInner = (
    <>
      <img
        src="/icon-192.png"
        alt="CCnCS Logo"
        width={36}
        height={36}
        style={{ borderRadius: 8, flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, lineHeight: 1.2, flexWrap: "wrap" }}>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.3 }}>CCnCS</span>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4,
            background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.95)",
            letterSpacing: 0.3,
          }}>v{APP_VERSION}</span>
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: 0.4,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.25,
            marginTop: 1,
            whiteSpace: "normal",
          }}
        >
          Split. Combine. Preview.
        </div>
      </div>
    </>
  );

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
        {logoIsToggle ? (
          <button
            onClick={onLogoClick}
            aria-label="Open tools sidebar"
            title="Tools"
            style={{
              display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0,
              background: "transparent", border: 0, padding: 0, color: "inherit",
              cursor: "pointer", textAlign: "left",
            }}
          >
            {LogoInner}
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
            {LogoInner}
          </div>
        )}
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
