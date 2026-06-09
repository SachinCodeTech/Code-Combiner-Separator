import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

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
    <div style={{ minHeight: "100vh", background: "#f5f7fb", color: "#0f172a", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif", paddingBottom: 60 }}>
      <AppHeader />
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
      <BottomNav />
    </div>
  );
}
