import { createFileRoute, Link } from "@tanstack/react-router";

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
    <div style={{ minHeight: "100vh", background: "#f5f7fb", color: "#0f172a", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 10, padding: "14px 16px", background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "white", boxShadow: "0 2px 10px rgba(15,23,42,0.12)" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 0.3 }}>Privacy Policy</h2>
      </header>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: 20, lineHeight: 1.7 }}>
        <p><em>Last updated: June 9, 2026</em></p>

        <p>
          CCnCS ("the App"), provided by <strong>CodeTech</strong>, respects your privacy. This
          policy explains what data the App handles.
        </p>

        <h3>1. Data We Collect</h3>
        <p>
          The App does <strong>not</strong> collect, store, or transmit any personal information.
          All code you paste, edit, preview, download or share is processed locally in your browser.
        </p>

        <h3>2. Local Storage</h3>
        <p>
          The App may use your browser's local memory to keep your session usable. Nothing is sent
          to our servers.
        </p>

        <h3>3. Clipboard</h3>
        <p>
          The "Share" feature copies your code to your device clipboard using your browser's native
          API. CodeTech does not receive a copy.
        </p>

        <h3>4. Third Parties</h3>
        <p>
          The App does not integrate third-party analytics, advertising or tracking SDKs.
        </p>

        <h3>5. Children's Privacy</h3>
        <p>
          The App is suitable for general audiences and does not knowingly collect data from anyone,
          including children under 13.
        </p>

        <h3>6. Changes</h3>
        <p>
          We may update this policy. Continued use of the App after changes constitutes acceptance.
        </p>

        <h3>7. Contact</h3>
        <p>For privacy questions, contact CodeTech.</p>

        <p style={{ marginTop: 24 }}>
          <Link to="/">← Back home</Link>
        </p>
      </div>
    </div>
  );
}
