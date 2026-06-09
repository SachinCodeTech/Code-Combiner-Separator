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
    <div style={{ minHeight: "100vh", background: "#fdfdfd", color: "#111", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ margin: 0, padding: 10, background: "#e0e0e0", color: "#222" }}>App Info</h2>
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
