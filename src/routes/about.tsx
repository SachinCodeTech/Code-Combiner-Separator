import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CCnCS — CodeTech" },
      { name: "description", content: "About CCnCS, built by CodeTech. Lead Developer: Sachin Sheth." },
      { property: "og:title", content: "About CCnCS — CodeTech" },
      { property: "og:description", content: "About CCnCS, built by CodeTech. Lead Developer: Sachin Sheth." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdfdfd", color: "#111", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ margin: 0, padding: 10, background: "#e0e0e0", color: "#222" }}>About CCnCS</h2>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 20, lineHeight: 1.7 }}>
        <p>
          <strong>CCnCS</strong> (Code Combiner & Separator) is a lightweight web utility for
          developers, students and tinkerers. Paste any combined HTML file and instantly split it
          into HTML, CSS and JavaScript — or write each part and combine them into a runnable
          preview.
        </p>

        <h3>Company</h3>
        <p><strong>CodeTech</strong></p>

        <h3>Lead Developer</h3>
        <p>Sachin Sheth</p>

        <h3>Contact</h3>
        <p>For support and feedback, reach out to the CodeTech team.</p>

        <p style={{ marginTop: 24 }}>
          <Link to="/">← Back home</Link>
        </p>
      </div>
    </div>
  );
}
