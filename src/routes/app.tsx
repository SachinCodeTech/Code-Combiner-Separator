import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    // no-op: ensures refs mount client-side
  }, []);

  const ta: React.CSSProperties = {
    width: "100%",
    height: 120,
    background: "#fff",
    color: "#111",
    border: "1px solid #ccc",
    padding: 10,
    resize: "vertical",
    fontFamily: "monospace",
    marginBottom: 10,
    boxShadow: "1px 1px 4px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
  };
  const btn: React.CSSProperties = {
    margin: "5px 5px 5px 0",
    padding: "10px 16px",
    border: "none",
    borderRadius: 4,
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fdfdfd", color: "#111", margin: 0, padding: 10, minHeight: "100vh" }}>
      <h2 style={{ margin: 0, padding: 10, background: "#e0e0e0", color: "#222" }}>
        CCnCS — Code Separator and Combiner
      </h2>

      <div style={{ padding: "8px 4px", fontSize: 14 }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/about" style={{ marginRight: 12 }}>About</Link>
        <Link to="/privacy" style={{ marginRight: 12 }}>Privacy</Link>
        <Link to="/info">App Info</Link>
      </div>

      <label>Full Combined HTML Code</label>
      <textarea ref={combinedRef} style={ta} placeholder="Paste full HTML code here..." />
      <button style={{ ...btn, backgroundColor: "#17a2b8" }} onClick={separateCode}>Separate Code</button>

      <hr />

      <label>HTML</label>
      <textarea ref={htmlRef} style={ta} />

      <label>CSS</label>
      <textarea ref={cssRef} style={ta} />

      <label>JavaScript</label>
      <textarea ref={jsRef} style={ta} />

      <button style={{ ...btn, backgroundColor: "#007bff" }} onClick={combineAndRun}>Combine & Run</button>
      <button style={{ ...btn, backgroundColor: "#6c757d" }} onClick={clearAll}>Clear All</button>
      <button style={{ ...btn, backgroundColor: "#28a745" }} onClick={downloadCombined}>Download</button>
      <button style={{ ...btn, backgroundColor: "#ffc107", color: "#333" }} onClick={shareCombined}>Share</button>

      <h3>Live Preview</h3>
      <iframe
        ref={previewRef}
        title="Live Preview"
        sandbox="allow-scripts"
        style={{ width: "100%", height: 300, border: "1px solid #ccc", background: "white" }}
      />
    </div>
  );
}
