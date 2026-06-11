import { APP_VERSION } from "@/lib/sample";

export function AppFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "14px 12px 18px",
        fontSize: 11,
        color: "var(--text-faint)",
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div style={{ fontWeight: 600 }}>CodeTech © {year}</div>
      <div style={{ marginTop: 2, opacity: 0.8 }}>
        CCnCS v{APP_VERSION} · Works offline · Privacy-first
      </div>
    </footer>
  );
}
