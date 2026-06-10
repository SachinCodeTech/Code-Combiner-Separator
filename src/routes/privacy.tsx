import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CCnCS" },
      { name: "description", content: "Privacy policy for CCnCS by CodeTech." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)", color: "var(--text)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      paddingBottom: 70,
    }}>
      <AppHeader />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: 20, lineHeight: 1.7, color: "var(--text-muted)" }}>
        <h1 style={{ fontSize: 22, margin: "4px 0 12px", color: "var(--text)" }}>Privacy Policy</h1>
        <p><em>Last updated: June 10, 2026</em></p>

        <p>
          CCnCS ("the App"), provided by <strong style={{ color: "var(--text)" }}>CodeTech</strong>, respects your privacy. This
          policy explains what data the App handles.
        </p>

        <h3 style={{ color: "var(--text)" }}>1. Data We Collect</h3>
        <p>
          The App does <strong>not</strong> collect, store, or transmit any personal information.
          All code you paste, edit, preview, download or share is processed locally in your browser.
        </p>

        <h3 style={{ color: "var(--text)" }}>2. Local Storage</h3>
        <p>
          The App uses your browser's local storage only to remember your theme preference (Light /
          Dark / Auto). Nothing is sent to our servers.
        </p>

        <h3 style={{ color: "var(--text)" }}>3. Clipboard</h3>
        <p>
          The "Copy" and "Share" features write your code to your device clipboard using your
          browser's native API. CodeTech does not receive a copy.
        </p>

        <h3 style={{ color: "var(--text)" }}>4. Offline &amp; Service Worker</h3>
        <p>
          When installed or used in a supported browser, the App caches its own assets so it can
          work offline. Cached data lives on your device only.
        </p>

        <h3 style={{ color: "var(--text)" }}>5. Third Parties</h3>
        <p>
          The App does not integrate third-party analytics, advertising or tracking SDKs.
        </p>

        <h3 style={{ color: "var(--text)" }}>6. Children's Privacy</h3>
        <p>
          The App is suitable for general audiences and does not knowingly collect data from anyone,
          including children under 13.
        </p>

        <h3 style={{ color: "var(--text)" }}>7. Changes</h3>
        <p>
          We may update this policy. Continued use of the App after changes constitutes acceptance.
        </p>

        <h3 style={{ color: "var(--text)" }}>8. Contact</h3>
        <p>For privacy questions, contact CodeTech.</p>

        <p style={{ marginTop: 24 }}>
          <Link to="/" style={{ color: "var(--accent)" }}>← Back home</Link>
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
