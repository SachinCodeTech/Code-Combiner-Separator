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
    <div style={{ minHeight: "100vh", background: "#fdfdfd", color: "#111", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ margin: 0, padding: 10, background: "#e0e0e0", color: "#222" }}>Privacy Policy</h2>
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
