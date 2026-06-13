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

        <p style={{ marginTop: 20 }}>
          <Link to="/" style={{ color: "var(--accent)" }}>← Back home</Link>
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
