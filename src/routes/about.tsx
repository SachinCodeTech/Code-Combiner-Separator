import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CCnCS — CodeTech" },
      { name: "description", content: "About CCnCS by CodeTech — features, changelog, and roadmap. Lead Developer: Sachin Sheth." },
      { property: "og:title", content: "About CCnCS — CodeTech" },
      { property: "og:description", content: "Features, changelog and roadmap for CCnCS by CodeTech." },
    ],
  }),
  component: About,
});

const card: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: 16,
  boxShadow: "var(--shadow)",
  marginBottom: 14,
};

function About() {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)", color: "var(--text)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      paddingBottom: 70,
    }}>
      <AppHeader />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 18, lineHeight: 1.65 }}>
        <h1 style={{ fontSize: 22, margin: "4px 0 12px" }}>About CCnCS</h1>

        <div style={card}>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text)" }}>CCnCS</strong> (Code Combiner &amp; Separator) is a lightweight, installable web utility
            for developers, students and tinkerers. Split a combined HTML file into HTML, CSS and JS — or write each
            part and combine into a runnable preview. Everything runs locally in your browser.
          </p>
        </div>

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Company</h3>
          <p style={{ margin: "0 0 8px" }}><strong>CodeTech</strong></p>
          <h3>Lead Developer</h3>
          <p style={{ margin: 0 }}>Sachin Sheth</p>
        </div>

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Version 1.1.0 — What's new</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-muted)" }}>
            <li>Syntax-highlighted CodeMirror editors</li>
            <li>Auto-detect HTML / CSS / JS on paste</li>
            <li>Beautify code (HTML, CSS, JS)</li>
            <li>Per-section Copy buttons + toast feedback</li>
            <li>Live stats: lines &amp; size</li>
            <li>Export as ZIP or individual files</li>
            <li>Drag-and-drop .html import</li>
            <li>Light / Dark / Auto theme</li>
            <li>Installable PWA + offline support</li>
          </ul>
        </div>

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Changelog</h3>
          <p style={{ margin: "0 0 4px" }}><strong>1.1.0</strong> — Pro editor, themes, PWA, beautify, ZIP export.</p>
          <p style={{ margin: 0 }}><strong>1.0.0</strong> — Initial release: split, combine, preview, download, share.</p>
        </div>

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Roadmap</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-muted)" }}>
            <li>AI-assisted code suggestions &amp; error hints</li>
            <li>Code minify</li>
            <li>Project templates (landing, portfolio, dashboard)</li>
            <li>Code validator (missing tags, broken CSS, JS syntax)</li>
            <li>Snippet library &amp; save-to-cloud</li>
          </ul>
        </div>

        <p style={{ marginTop: 18 }}>
          <Link to="/" style={{ color: "var(--accent)" }}>← Back home</Link>
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
