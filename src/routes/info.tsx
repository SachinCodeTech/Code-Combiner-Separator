import { createFileRoute, Link } from "@tanstack/react-router";

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
    ["Version", "1.0.0"],
    ["Category", "Developer Tools / Utilities"],
    ["Company", "CodeTech"],
    ["Lead Developer", "Sachin Sheth"],
    ["Platform", "Web (Progressive Web App ready)"],
    ["Minimum Requirements", "Any modern browser (Chrome, Safari, Firefox, Edge)"],
    ["Permissions", "Clipboard write (for Share)"],
    ["Offline Support", "Works fully client-side after first load"],
    ["License", "© CodeTech. All rights reserved."],
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fb", color: "#0f172a", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 10, padding: "14px 16px", background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "white", boxShadow: "0 2px 10px rgba(15,23,42,0.12)" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 0.3 }}>App Info</h2>
      </header>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #eee" }}>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee", fontWeight: "bold", width: "40%", background: "#fafafa" }}>{k}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: 24 }}>
          <Link to="/">← Back home</Link>
        </p>
      </div>
    </div>
  );
}
