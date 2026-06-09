import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "CCnCS App — Code Separator and Combiner" },
      {
        name: "description",
        content: "Separate combined HTML into HTML, CSS and JS; combine, preview, download and share.",
      },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const combinedRef = useRef<HTMLTextAreaElement>(null);
  const htmlRef = useRef<HTMLTextAreaElement>(null);
  const cssRef = useRef<HTMLTextAreaElement>(null);
  const jsRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  function separateCode() {
    const input = combinedRef.current!.value;
    const htmlMatch = input.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const cssMatch = input.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const jsMatch = input.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    htmlRef.current!.value = htmlMatch ? htmlMatch[1].trim() : "";
    cssRef.current!.value = cssMatch ? cssMatch[1].trim() : "";
    jsRef.current!.value = jsMatch ? jsMatch[1].trim() : "";
  }

  function buildHTML() {
    const html = htmlRef.current!.value;
    const css = cssRef.current!.value;
    const js = jsRef.current!.value;
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}<\/script>
          </body>
        </html>`;
  }

  function combineAndRun() {
    previewRef.current!.srcdoc = buildHTML();
  }

  function clearAll() {
    combinedRef.current!.value = "";
    htmlRef.current!.value = "";
    cssRef.current!.value = "";
    jsRef.current!.value = "";
    previewRef.current!.srcdoc = "";
  }

  function downloadCombined() {
    const blob = new Blob([buildHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "combined_code.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  function shareCombined() {
    const html = htmlRef.current!.value;
    const css = cssRef.current!.value;
    const js = jsRef.current!.value;
    const shareText = `HTML:\n${html}\n\nCSS:\n${css}\n\nJS:\n${js}`;
    navigator.clipboard
      .writeText(shareText)
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => alert("Clipboard error: " + err));
  }

  useEffect(() => {}, []);

  const ta: React.CSSProperties = {
    width: "100%",
    height: 130,
    background: "#ffffff",
    color: "#0f172a",
    border: "1px solid #d8dee9",
    borderRadius: 8,
    padding: 12,
    resize: "vertical",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 13,
    marginBottom: 12,
    boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
    boxSizing: "border-box",
    outline: "none",
  };
  const btn: React.CSSProperties = {
    margin: "4px 6px 4px 0",
    padding: "10px 18px",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    color: "white",
    boxShadow: "0 1px 2px rgba(15,23,42,0.12)",
    transition: "transform .05s ease",
  };
  const label: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#334155",
    margin: "6px 2px 6px",
    letterSpacing: 0.2,
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif", background: "#f5f7fb", color: "#0f172a", margin: 0, minHeight: "100vh", paddingBottom: 60 }}>
      <AppHeader />

      <div style={{ padding: 14, maxWidth: 960, margin: "0 auto" }}>
        <section style={{ background: "white", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(15,23,42,0.06)", marginBottom: 14 }}>
          <label style={label}>Full Combined HTML Code</label>
          <textarea ref={combinedRef} style={ta} placeholder="Paste full HTML code here..." />
          <button style={{ ...btn, backgroundColor: "#0ea5e9" }} onClick={separateCode}>Separate Code</button>
        </section>

        <section style={{ background: "white", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(15,23,42,0.06)", marginBottom: 14 }}>
          <label style={label}>HTML</label>
          <textarea ref={htmlRef} style={ta} />

          <label style={label}>CSS</label>
          <textarea ref={cssRef} style={ta} />

          <label style={label}>JavaScript</label>
          <textarea ref={jsRef} style={ta} />

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 4 }}>
            <button style={{ ...btn, backgroundColor: "#2563eb" }} onClick={combineAndRun}>Combine & Run</button>
            <button style={{ ...btn, backgroundColor: "#64748b" }} onClick={clearAll}>Clear All</button>
            <button style={{ ...btn, backgroundColor: "#16a34a" }} onClick={downloadCombined}>Download</button>
            <button style={{ ...btn, backgroundColor: "#f59e0b", color: "#1f2937" }} onClick={shareCombined}>Share</button>
          </div>
        </section>

        <section style={{ background: "white", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 15, color: "#334155" }}>Live Preview</h3>
          <iframe
            ref={previewRef}
            title="Live Preview"
            sandbox="allow-scripts"
            style={{ width: "100%", height: 320, border: "1px solid #e2e8f0", borderRadius: 8, background: "white" }}
          />
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
