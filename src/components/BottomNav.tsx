import { Link, useLocation } from "@tanstack/react-router";

const tabs = [
  { to: "/", label: "Home" },
  { to: "/app", label: "App" },
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
  { to: "/info", label: "Info" },
];

export function BottomNav() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        boxShadow: "0 -2px 8px rgba(15,23,42,0.06)",
        height: 52,
      }}
    >
      {tabs.map((t) => {
        const active = current === t.to;
        return (
          <Link
            key={t.to}
            to={t.to}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 11,
              fontWeight: active ? 700 : 400,
              color: active ? "#6366f1" : "#64748b",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderTop: active ? "2px solid #6366f1" : "2px solid transparent",
              paddingTop: 2,
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
