import { Link, useLocation } from "@tanstack/react-router";
import { Home, Code2, Info, Shield, FileText } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/app", label: "App", Icon: Code2 },
  { to: "/about", label: "About", Icon: Info },
  { to: "/privacy", label: "Privacy", Icon: Shield },
  { to: "/info", label: "Info", Icon: FileText },
] as const;

export function BottomNav() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <nav
      aria-label="Primary"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -2px 8px rgba(15,23,42,0.08)",
        height: 56,
        paddingBottom: "env(safe-area-inset-bottom, 0)",
      }}
    >
      {tabs.map(({ to, label, Icon }) => {
        const active = current === to;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? "page" : undefined}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 10,
              fontWeight: active ? 700 : 500,
              color: active ? "var(--accent)" : "var(--text-faint)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              height: "100%",
              borderTop: active ? "2px solid var(--accent)" : "2px solid transparent",
              paddingTop: 2,
            }}
          >
            <Icon size={18} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
