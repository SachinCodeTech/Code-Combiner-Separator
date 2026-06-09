import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CCnCS — Code Combiner & Separator" },
      {
        name: "description",
        content:
          "Welcome to CCnCS by CodeTech — a fast, free tool to separate, combine, preview, download and share HTML, CSS and JavaScript.",
      },
      { property: "og:title", content: "CCnCS — Code Combiner & Separator" },
      {
        property: "og:description",
        content: "Separate, combine, preview and share HTML, CSS and JavaScript code.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdfdfd", color: "#111", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ margin: 0, padding: 10, background: "#e0e0e0", color: "#222" }}>CCnCS</h2>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ fontSize: 36, margin: "16px 0 8px" }}>Code Combiner & Separator</h1>
        <p style={{ fontSize: 16, color: "#444", marginBottom: 24 }}>
          A simple tool to split a full HTML file into HTML, CSS and JS — or combine them back,
          preview live, download, and share.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          <Link
            to="/app"
            style={{
              padding: "12px 22px",
              background: "#007bff",
              color: "white",
              borderRadius: 4,
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Launch App
          </Link>
          <Link
            to="/about"
            style={{
              padding: "12px 22px",
              background: "#6c757d",
              color: "white",
              borderRadius: 4,
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            About
          </Link>
        </div>

        <div style={{ textAlign: "left", background: "#fff", border: "1px solid #eee", borderRadius: 6, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Features</h3>
          <ul style={{ lineHeight: 1.7, color: "#333" }}>
            <li>Separate combined HTML into HTML / CSS / JS</li>
            <li>Combine and run code in a live iframe preview</li>
            <li>Download as a single HTML file</li>
            <li>Share code to your clipboard</li>
          </ul>
        </div>

        <nav style={{ marginTop: 28, fontSize: 14 }}>
          <Link to="/app" style={{ marginRight: 12 }}>App</Link>
          <Link to="/about" style={{ marginRight: 12 }}>About</Link>
          <Link to="/privacy" style={{ marginRight: 12 }}>Privacy</Link>
          <Link to="/info">App Info</Link>
        </nav>
      </div>
    </div>
  );
}
