import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { APP_VERSION, VERSION_HISTORY } from "@/lib/sample";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "App Info — CCnCS" },
      { name: "description", content: "App information for CCnCS by CodeTech." },
    ],
  }),
  component: Info,
});

function Info() {
  const rows: Array<[string, string]> = [
    ["App Name", "CCnCS"],
    ["Full Name", "Code Combiner & Separator"],
    ["Tagline", "Split. Combine. Preview."],
    ["Version", APP_VERSION],
    ["Category", "Developer Tools / Utilities"],
    ["Company", "CodeTech"],
    ["Lead Developer", "Sachin Sheth"],
    ["Platform", "Web (Progressive Web App, installable)"],
    ["Minimum Requirements", "Any modern browser (Chrome, Safari, Firefox, Edge)"],
    ["Permissions", "Clipboard write (for Copy/Share)"],
    ["Offline Support", "Yes — full offline use after first load"],
    ["Storage", "Local only (theme preference). No personal data."],
    ["License", "© CodeTech. All rights reserved."],
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)", color: "var(--text)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      paddingBottom: 70,
    }}>
      <AppHeader />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 18 }}>
        <h1 style={{ fontSize: 22, margin: "4px 0 12px" }}>App Info</h1>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {rows.map(([k, v], i) => (
                <tr key={k}>
                  <th scope="row" style={{
                    padding: "10px 12px",
                    borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border)",
                    fontWeight: 700, width: "42%", background: "var(--surface-2)",
                    textAlign: "left", color: "var(--text)", fontSize: 13,
                  }}>{k}</th>
                  <td style={{
                    padding: "10px 12px",
                    borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border)",
                    color: "var(--text-muted)", fontSize: 13,
                  }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 18, margin: "24px 0 10px" }}>Version History</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {VERSION_HISTORY.map((v) => (
            <div key={v.version} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: 12, boxShadow: "var(--shadow)",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <strong style={{ fontSize: 14 }}>v{v.version}</strong>
                <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{v.date}</span>
                {v.version === APP_VERSION && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 4,
                    background: "rgba(99,102,241,0.15)", color: "var(--accent)",
                  }}>CURRENT</span>
                )}
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                {v.notes.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 20 }}>
          <Link to="/" style={{ color: "var(--accent)" }}>← Back home</Link>
        </p>

      </div>
      <BottomNav />
    </div>
  );
}
