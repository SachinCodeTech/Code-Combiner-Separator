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
    <div style={{ minHeight: "100vh", background: "#f5f7fb", color: "#0f172a", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: "14px 16px",
          background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
          color: "white",
          boxShadow: "0 2px 10px rgba(15,23,42,0.12)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 0.3 }}>CCnCS</h2>
      </header>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 18px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          padding: "6px 12px",
          background: "rgba(99,102,241,0.1)",
          color: "#4f46e5",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.5,
          marginBottom: 14,
        }}>BY CODETECH</div>
        <h1 style={{ fontSize: 34, margin: "8px 0 10px", lineHeight: 1.15, fontWeight: 800 }}>Code Combiner &amp; Separator</h1>
        <p style={{ fontSize: 15, color: "#475569", marginBottom: 24, lineHeight: 1.55 }}>
          A simple tool to split a full HTML file into HTML, CSS and JS — or combine them back,
          preview live, download, and share.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          <Link
            to="/app"
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              color: "white",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            }}
          >
            Launch App
          </Link>
          <Link
            to="/about"
            style={{
              padding: "12px 24px",
              background: "white",
              color: "#334155",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            About
          </Link>
        </div>

        <div style={{ textAlign: "left", background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 18, boxShadow: "0 1px 3px rgba(15,23,42,0.05)" }}>
          <h3 style={{ marginTop: 0, fontSize: 16, color: "#0f172a" }}>Features</h3>
          <ul style={{ lineHeight: 1.8, color: "#334155", paddingLeft: 18, margin: 0 }}>
            <li>Separate combined HTML into HTML / CSS / JS</li>
            <li>Combine and run code in a live iframe preview</li>
            <li>Download as a single HTML file</li>
            <li>Share code to your clipboard</li>
          </ul>
        </div>

        <nav style={{ marginTop: 28, fontSize: 14, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Link to="/app">App</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/info">App Info</Link>
        </nav>
      </div>
    </div>
  );
}
