import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { InstallButton } from "@/components/InstallButton";
import { Rocket, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CCnCS — Split. Combine. Preview." },
      {
        name: "description",
        content:
          "CCnCS by CodeTech — a fast, installable web tool to split, combine, beautify, preview, download and share HTML, CSS and JavaScript. Works offline.",
      },
      { property: "og:title", content: "CCnCS — Split. Combine. Preview." },
      {
        property: "og:description",
        content: "Free developer utility by CodeTech. Installable PWA, works offline.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      paddingBottom: 70,
    }}>
      <AppHeader />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 18px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          padding: "6px 12px",
          background: "rgba(99,102,241,0.12)",
          color: "var(--accent)",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 0.5,
          marginBottom: 14,
        }}>BY CODETECH</div>

        <h1 style={{ fontSize: 32, margin: "8px 0 6px", lineHeight: 1.15, fontWeight: 800 }}>
          Code Combiner &amp; Separator
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 6px", fontWeight: 600, letterSpacing: 0.3 }}>
          Split. Combine. Preview.
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 22, lineHeight: 1.6 }}>
          Paste an HTML file to split into HTML / CSS / JS, or write each part and
          combine into a live preview. Beautify, copy, download, share, export as ZIP.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <Link
            to="/app"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "12px 22px",
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              color: "white", borderRadius: 10, fontWeight: 700,
              textDecoration: "none", boxShadow: "var(--shadow-lg)",
              minHeight: 44,
            }}
          >
            <Rocket size={16} /> Launch App
          </Link>
          <Link
            to="/app"
            search={{ sample: 1 } as never}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "12px 18px",
              background: "var(--surface)", color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: 10, fontWeight: 700, textDecoration: "none",
              minHeight: 44,
            }}
          >
            <Sparkles size={16} /> Try Example
          </Link>
          <Link
            to="/about"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "12px 18px",
              background: "transparent", color: "var(--text-muted)",
              border: "1px solid var(--border)",
              borderRadius: 10, fontWeight: 700, textDecoration: "none",
              minHeight: 44,
            }}
          >
            <BookOpen size={16} /> About
          </Link>
        </div>

        <div style={{ marginBottom: 28 }}>
          <InstallButton />
        </div>

        <div style={{
          textAlign: "left", background: "var(--surface)",
          border: "1px solid var(--border)", borderRadius: 12,
          padding: 18, boxShadow: "var(--shadow)",
        }}>
          <h2 style={{ marginTop: 0, fontSize: 16, color: "var(--text)" }}>What's inside</h2>
          <ul style={{ lineHeight: 1.8, color: "var(--text-muted)", paddingLeft: 18, margin: 0, fontSize: 14 }}>
            <li>Syntax-highlighted editors (HTML, CSS, JS)</li>
            <li>Auto-detect parts when you paste combined HTML</li>
            <li>One-click Beautify / Copy / Download / Share</li>
            <li>Export as ZIP or individual files</li>
            <li>Drag-and-drop a .html file to load it</li>
            <li>Live iframe preview</li>
            <li>Light, Dark and Auto themes</li>
            <li>Installable PWA — works offline</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
