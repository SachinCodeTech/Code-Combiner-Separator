import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { toast } from "sonner";
import JSZip from "jszip";
import { html_beautify, css_beautify, js_beautify } from "js-beautify";
import {
  Play, Download, Share2, Trash2, Copy, Sparkles, Wand2,
  FileArchive, FileDown, Scissors, Minimize2, ShieldCheck, Search,
  LayoutTemplate, History, Save, FileJson,
} from "lucide-react";
import {
  formatJSON, minifyJSON, formatXML, minifyXML,
  yamlToJSON, jsonToYAML, markdownToHTML,
} from "@/lib/convert";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { BottomNav } from "@/components/BottomNav";
import { CodeEditor } from "@/components/CodeEditor";
import {
  SAMPLE_HTML, TEMPLATES, detectParts, countLines, byteSize, formatSize, qualityScore,
  type DetectResult,
} from "@/lib/sample";
import { minifyHTML, minifyCSS, minifyJS } from "@/lib/minify";
import { validateHTML, validateCSS, validateJS, type ValidationIssue } from "@/lib/validate";
import { listRecent, saveRecent, deleteRecent, type RecentProject } from "@/lib/recent";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "CCnCS App — Code Separator and Combiner" },
      {
        name: "description",
        content:
          "Separate combined HTML into HTML, CSS and JS; beautify, minify, validate, find/replace, preview, export ZIP.",
      },
    ],
  }),
  component: AppPage,
});

type Panel = null | "find" | "templates" | "recent" | "validate" | "convert";
type ConvertMode = "json" | "xml" | "yaml" | "markdown";

function AppPage() {
  const [combined, setCombined] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [detected, setDetected] = useState<DetectResult>({ html: false, css: false, js: false, react: false, ts: false, vue: false });
  const [dragOver, setDragOver] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [recent, setRecent] = useState<RecentProject[]>([]);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [minifyStats, setMinifyStats] = useState<{ before: number; after: number } | null>(null);
  const [convertMode, setConvertMode] = useState<ConvertMode>("json");
  const [convertIn, setConvertIn] = useState("");
  const [convertOut, setConvertOut] = useState("");
  const [convertErr, setConvertErr] = useState<string | null>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get("sample") === "1") {
        setCombined(SAMPLE_HTML);
        doSeparate(SAMPLE_HTML);
      }
    }
    setRecent(listRecent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDetected(detectParts(combined));
  }, [combined]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      if (k === "s") { e.preventDefault(); downloadCombined(); }
      else if (k === "b") { e.preventDefault(); beautifyAll(); }
      else if (k === "enter") { e.preventDefault(); combineAndRun(); }
      else if (k === "f") { e.preventDefault(); setPanel((p) => (p === "find" ? null : "find")); }
      else if (k === "m" && e.shiftKey) { e.preventDefault(); minifyAll(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlCode, cssCode, jsCode, combined]);

  function doSeparate(input: string) {
    const src = input ?? combined;
    if (!src.trim()) {
      toast.error("Nothing to separate — paste some HTML first.");
      return;
    }
    const htmlMatch = src.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const cssMatch = src.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const jsMatch = src.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    setHtmlCode((htmlMatch ? htmlMatch[1] : src).trim());
    setCssCode(cssMatch ? cssMatch[1].trim() : "");
    setJsCode(jsMatch ? jsMatch[1].trim() : "");
    toast.success("Code separated");
  }

  function buildHTML() {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
    <script>${jsCode}<\/script>
  </body>
</html>`;
  }

  function combineAndRun() {
    if (previewRef.current) previewRef.current.srcdoc = buildHTML();
    toast.success("Preview updated");
  }

  function clearAll() {
    setCombined(""); setHtmlCode(""); setCssCode(""); setJsCode("");
    if (previewRef.current) previewRef.current.srcdoc = "";
    toast("Cleared");
  }

  function downloadCombined() {
    triggerDownload(buildHTML(), "combined_code.html", "text/html");
    toast.success("Downloaded combined_code.html");
  }

  async function shareCombined() {
    const text = `HTML:\n${htmlCode}\n\nCSS:\n${cssCode}\n\nJS:\n${jsCode}`;
    try {
      if (navigator.share) { await navigator.share({ title: "CCnCS code", text }); return; }
      await navigator.clipboard.writeText(text);
      toast.success("Code copied to clipboard");
    } catch (err) { toast.error("Share failed: " + (err as Error).message); }
  }

  async function copyText(label: string, text: string) {
    if (!text) { toast.error(`${label} is empty`); return; }
    try { await navigator.clipboard.writeText(text); toast.success(`${label} copied`); }
    catch { toast.error("Clipboard not available"); }
  }

  function loadSample() { setCombined(SAMPLE_HTML); doSeparate(SAMPLE_HTML); }

  function beautifyAll() {
    try {
      if (htmlCode) setHtmlCode(html_beautify(htmlCode, { indent_size: 2, wrap_line_length: 100 }));
      if (cssCode) setCssCode(css_beautify(cssCode, { indent_size: 2 }));
      if (jsCode) setJsCode(js_beautify(jsCode, { indent_size: 2 }));
      if (combined) setCombined(html_beautify(combined, { indent_size: 2, wrap_line_length: 100 }));
      toast.success("Code beautified");
    } catch (err) { toast.error("Beautify failed: " + (err as Error).message); }
  }

  function minifyAll() {
    try {
      const before = byteSize(htmlCode) + byteSize(cssCode) + byteSize(jsCode) + byteSize(combined);
      const nh = htmlCode ? minifyHTML(htmlCode) : htmlCode;
      const nc = cssCode ? minifyCSS(cssCode) : cssCode;
      const nj = jsCode ? minifyJS(jsCode) : jsCode;
      const nco = combined ? minifyHTML(combined) : combined;
      setHtmlCode(nh); setCssCode(nc); setJsCode(nj); setCombined(nco);
      const after = byteSize(nh) + byteSize(nc) + byteSize(nj) + byteSize(nco);
      setMinifyStats({ before, after });
      const saved = before > 0 ? Math.round((1 - after / before) * 100) : 0;
      toast.success(`Minified: ${formatSize(before)} → ${formatSize(after)} (saved ${saved}%)`);
    } catch (err) { toast.error("Minify failed: " + (err as Error).message); }
  }

  async function copyCombined() {
    const text = buildHTML();
    try { await navigator.clipboard.writeText(text); toast.success("Combined HTML copied"); }
    catch { toast.error("Clipboard not available"); }
  }
  async function copyAllParts() {
    const text = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}\n\n// JS\n${jsCode}`;
    try { await navigator.clipboard.writeText(text); toast.success("All parts copied"); }
    catch { toast.error("Clipboard not available"); }
  }

  const validation = useMemo(() => ({
    html: validateHTML(htmlCode || combined),
    css: validateCSS(cssCode),
    js: validateJS(jsCode),
  }), [htmlCode, cssCode, jsCode, combined]);

  const validationTotal = validation.html.length + validation.css.length + validation.js.length;
  const hasErrors = [...validation.html, ...validation.css, ...validation.js].some((i) => i.level === "error");

  async function downloadZip() {
    try {
      const zip = new JSZip();
      zip.file("index.html", htmlWrapper(htmlCode));
      if (cssCode) zip.file("style.css", cssCode);
      if (jsCode) zip.file("script.js", jsCode);
      zip.file("README.md", `# CCnCS Export\nGenerated by CCnCS (by CodeTech).\n`);
      const blob = await zip.generateAsync({ type: "blob" });
      triggerBlob(blob, "ccncs-export.zip");
      toast.success("ZIP downloaded");
    } catch (err) { toast.error("ZIP failed: " + (err as Error).message); }
  }

  function downloadPart(name: string, content: string, mime: string) {
    if (!content) { toast.error(`${name} is empty`); return; }
    triggerDownload(content, name, mime);
    toast.success(`Downloaded ${name}`);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  }
  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      setCombined(text); doSeparate(text);
    };
    reader.onerror = () => toast.error("Could not read file");
    reader.readAsText(file);
  }

  // Find & Replace
  function applyReplace(all: boolean) {
    if (!findText) { toast.error("Enter text to find"); return; }
    const flags = (matchCase ? "g" : "gi");
    const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, flags);
    let count = 0;
    const sub = (s: string) => s.replace(re, (m) => {
      if (!all && count > 0) return m;
      count++; return replaceText;
    });
    setHtmlCode(sub(htmlCode));
    setCssCode(sub(cssCode));
    setJsCode(sub(jsCode));
    setCombined(sub(combined));
    toast.success(`Replaced ${count} match${count === 1 ? "" : "es"}`);
  }
  function findCount() {
    if (!findText) return 0;
    const flags = (matchCase ? "g" : "gi");
    const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, flags);
    const all = [htmlCode, cssCode, jsCode, combined].join("\n");
    return (all.match(re) || []).length;
  }

  // Templates & Recent
  function loadTemplate(id: string) {
    const t = TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    setCombined(t.html); doSeparate(t.html);
    setPanel(null); toast.success(`Loaded: ${t.name}`);
  }
  function saveProject() {
    const name = window.prompt("Project name:", `Project ${new Date().toLocaleString()}`);
    if (!name) return;
    saveRecent({ name, html: htmlCode, css: cssCode, js: jsCode });
    setRecent(listRecent());
    toast.success("Saved to Recent");
  }
  function loadRecent(r: RecentProject) {
    setHtmlCode(r.html); setCssCode(r.css); setJsCode(r.js); setCombined("");
    setPanel(null); toast.success(`Loaded: ${r.name}`);
  }
  function removeRecent(id: string) {
    deleteRecent(id); setRecent(listRecent());
  }

  const totalSize = byteSize(htmlCode) + byteSize(cssCode) + byteSize(jsCode);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        background: "var(--bg)", color: "var(--text)",
        margin: 0, minHeight: "100vh", paddingBottom: 70,
      }}
    >
      <AppHeader logoIsToggle onLogoClick={() => setSidebarOpen(true)} />

      {/* Tools Sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "rgba(15,23,42,0.45)",
          }}
        />
      )}
      <aside
        aria-label="Tools"
        style={{
          position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 41,
          width: 260, maxWidth: "82vw",
          background: "var(--surface)", borderRight: "1px solid var(--border)",
          boxShadow: "2px 0 16px rgba(15,23,42,0.18)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-105%)",
          transition: "transform 220ms ease",
          display: "flex", flexDirection: "column",
          paddingTop: "env(safe-area-inset-top, 0)",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 14px 10px", borderBottom: "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/icon-192.png" width={28} height={28} style={{ borderRadius: 6 }} alt="" />
            <strong style={{ fontSize: 14 }}>Tools</strong>
          </div>
          <button
            onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"
            style={{ background: "transparent", border: 0, fontSize: 18, cursor: "pointer", color: "var(--text-muted)" }}
          >✕</button>
        </div>
        <nav style={{ padding: 10, display: "grid", gap: 6, overflowY: "auto" }}>
          {[
            { label: "Sample", icon: <Sparkles size={15} />, run: () => { loadSample(); setSidebarOpen(false); } },
            { label: "Templates", icon: <LayoutTemplate size={15} />, run: () => { setPanel("templates"); setSidebarOpen(false); } },
            { label: "Beautify", icon: <Wand2 size={15} />, run: () => { beautifyAll(); setSidebarOpen(false); } },
            { label: "Minify", icon: <Minimize2 size={15} />, run: () => { minifyAll(); setSidebarOpen(false); } },
            { label: `Validate${validationTotal ? ` (${validationTotal})` : ""}`, icon: <ShieldCheck size={15} />, run: () => { setPanel("validate"); setSidebarOpen(false); } },
            { label: "Find & Replace", icon: <Search size={15} />, run: () => { setPanel("find"); setSidebarOpen(false); } },
            { label: "Import HTML", icon: <FileDown size={15} />, run: () => { fileRef.current?.click(); setSidebarOpen(false); } },
            { label: "Export ZIP", icon: <FileArchive size={15} />, run: () => { downloadZip(); setSidebarOpen(false); } },
            { label: "Save Project", icon: <Save size={15} />, run: () => { saveProject(); setSidebarOpen(false); } },
            { label: `Recent${recent.length ? ` (${recent.length})` : ""}`, icon: <History size={15} />, run: () => { setPanel("recent"); setSidebarOpen(false); } },
            { label: "Converters", icon: <FileJson size={15} />, run: () => { setPanel("convert"); setSidebarOpen(false); } },
            { label: "Copy Combined", icon: <Copy size={15} />, run: () => { copyCombined(); setSidebarOpen(false); } },
            { label: "Copy All Parts", icon: <Copy size={15} />, run: () => { copyAllParts(); setSidebarOpen(false); } },
          ].map((it) => (
            <button key={it.label} onClick={it.run} style={sidebarItemBtn}>
              <span style={{ display: "inline-flex", width: 22, justifyContent: "center" }}>{it.icon}</span>
              <span>{it.label}</span>
            </button>
          ))}
        </nav>
        <input
          ref={fileRef} type="file" accept=".html,.htm,text/html"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile(f); e.target.value = ""; }}
        />
      </aside>

      {dragOver && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(99,102,241,0.15)",
          border: "3px dashed var(--accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, color: "var(--accent)", pointerEvents: "none",
        }}>
          Drop .html file to load
        </div>
      )}

      <div style={{ padding: 12, paddingBottom: 130, maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: "var(--text-faint)", margin: "0 0 10px", textAlign: "center" }}>
          Tap the <strong>CCnCS logo</strong> in the header to open all tools.
        </p>


        {/* Panels */}
        {panel === "find" && (
          <PanelBox title="Find & Replace" onClose={() => setPanel(null)}>
            <div style={{ display: "grid", gap: 8 }}>
              <input
                placeholder="Find"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Replace with"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                style={inputStyle}
              />
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
                <input type="checkbox" checked={matchCase} onChange={(e) => setMatchCase(e.target.checked)} />
                Match case
              </label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                <button onClick={() => applyReplace(false)} style={primaryBtn}>Replace</button>
                <button onClick={() => applyReplace(true)} style={primaryBtn}>Replace All</button>
                <span style={statText}>{findText ? `${findCount()} match(es)` : "Enter text to search"}</span>
              </div>
            </div>
          </PanelBox>
        )}

        {panel === "templates" && (
          <PanelBox title="Templates" onClose={() => setPanel(null)}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => loadTemplate(t.id)} style={tileBtn}>
                  {t.name}
                </button>
              ))}
            </div>
          </PanelBox>
        )}

        {panel === "recent" && (
          <PanelBox title="Recent Projects" onClose={() => setPanel(null)}>
            {recent.length === 0 ? (
              <p style={{ ...statText, margin: 0 }}>No saved projects yet. Use Save to store one.</p>
            ) : (
              <div style={{ display: "grid", gap: 6 }}>
                {recent.map((r) => (
                  <div key={r.id} style={recentRow}>
                    <button onClick={() => loadRecent(r)} style={{ ...recentLoadBtn }}>
                      <span style={{ fontWeight: 700 }}>{r.name}</span>
                      <span style={statText}>{new Date(r.ts).toLocaleString()}</span>
                    </button>
                    <button onClick={() => removeRecent(r.id)} aria-label="Delete" style={recentDelBtn}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </PanelBox>
        )}

        {panel === "validate" && (
          <PanelBox title="Validation" onClose={() => setPanel(null)}>
            <ValidationSummary label="HTML" items={validation.html} hasCode={!!(htmlCode || combined)} />
            <ValidationSummary label="CSS" items={validation.css} hasCode={!!cssCode} />
            <ValidationSummary label="JavaScript" items={validation.js} hasCode={!!jsCode} />
            {validationTotal === 0 && (htmlCode || cssCode || jsCode || combined) && (
              <p style={{ ...statText, margin: "6px 0 0", color: "#16a34a", fontSize: 12 }}>
                ✓ All checks passed.
              </p>
            )}
          </PanelBox>
        )}

        {panel === "convert" && (
          <PanelBox title="Converters" onClose={() => setPanel(null)}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              {(["json", "xml", "yaml", "markdown"] as ConvertMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setConvertMode(m); setConvertOut(""); setConvertErr(null); }}
                  style={{
                    ...tileBtn,
                    padding: "6px 10px",
                    background: convertMode === m ? "var(--accent)" : "var(--surface-2)",
                    color: convertMode === m ? "white" : "var(--text)",
                    borderColor: convertMode === m ? "var(--accent)" : "var(--border)",
                  }}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <textarea
                value={convertIn}
                onChange={(e) => setConvertIn(e.target.value)}
                placeholder={`Paste ${convertMode.toUpperCase()} here…`}
                spellCheck={false}
                style={{
                  width: "100%", minHeight: 120, padding: 10, boxSizing: "border-box",
                  border: "1px solid var(--border)", borderRadius: 8,
                  background: "var(--code-bg)", color: "var(--text)",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12,
                  resize: "vertical", outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button
                  style={primaryBtn}
                  onClick={() => {
                    const r =
                      convertMode === "json" ? formatJSON(convertIn) :
                      convertMode === "xml" ? formatXML(convertIn) :
                      convertMode === "yaml" ? yamlToJSON(convertIn) :
                      markdownToHTML(convertIn);
                    if (r.ok) { setConvertOut(r.out); setConvertErr(null); toast.success("Formatted"); }
                    else { setConvertErr(r.error); toast.error(r.error); }
                  }}
                >
                  {convertMode === "yaml" ? "YAML → JSON" :
                   convertMode === "markdown" ? "MD → HTML" : "Beautify"}
                </button>
                {(convertMode === "json" || convertMode === "xml") && (
                  <button
                    style={{ ...primaryBtn, background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)" }}
                    onClick={() => {
                      const r = convertMode === "json" ? minifyJSON(convertIn) : minifyXML(convertIn);
                      if (r.ok) { setConvertOut(r.out); setConvertErr(null); toast.success("Minified"); }
                      else { setConvertErr(r.error); toast.error(r.error); }
                    }}
                  >Minify</button>
                )}
                {convertMode === "yaml" && (
                  <button
                    style={{ ...primaryBtn, background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)" }}
                    onClick={() => {
                      const r = jsonToYAML(convertIn);
                      if (r.ok) { setConvertOut(r.out); setConvertErr(null); toast.success("Converted"); }
                      else { setConvertErr(r.error); toast.error(r.error); }
                    }}
                  >JSON → YAML</button>
                )}
                {convertOut && (
                  <button
                    style={{ ...primaryBtn, background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)" }}
                    onClick={async () => {
                      try { await navigator.clipboard.writeText(convertOut); toast.success("Copied"); }
                      catch { toast.error("Clipboard not available"); }
                    }}
                  >Copy Output</button>
                )}
              </div>
              {convertErr && (
                <div style={{ fontSize: 12, color: "var(--danger)" }}>⚠ {convertErr}</div>
              )}
              {convertOut && (
                <textarea
                  value={convertOut}
                  readOnly
                  spellCheck={false}
                  style={{
                    width: "100%", minHeight: 140, padding: 10, boxSizing: "border-box",
                    border: "1px solid var(--border)", borderRadius: 8,
                    background: "var(--code-bg)", color: "var(--text)",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12,
                    resize: "vertical", outline: "none",
                  }}
                />
              )}
              {convertMode === "markdown" && convertOut && (
                <div style={{
                  background: "white", color: "#111", padding: 12, borderRadius: 8,
                  border: "1px solid var(--border)", maxHeight: 260, overflow: "auto",
                }} dangerouslySetInnerHTML={{ __html: convertOut }} />
              )}
            </div>
          </PanelBox>
        )}



        {minifyStats && (
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "8px 12px", marginBottom: 10,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
          }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              <strong>Minify:</strong> {formatSize(minifyStats.before)} → {formatSize(minifyStats.after)}
              {" · "}
              <span style={{ color: "#16a34a", fontWeight: 700 }}>
                Saved {minifyStats.before > 0 ? Math.round((1 - minifyStats.after / minifyStats.before) * 100) : 0}%
              </span>
            </span>
            <button onClick={() => setMinifyStats(null)} style={{
              background: "transparent", border: 0, color: "var(--text-faint)", fontSize: 12, cursor: "pointer",
            }}>Dismiss</button>
          </div>
        )}

        {/* Combined input */}
        <Section title="Full Combined HTML">
          <CodeEditor
            value={combined} onChange={setCombined} language="html" height={160}
            placeholder="Paste full HTML code here, or drag & drop a .html file..."
          />
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
            <button onClick={() => doSeparate(combined)} style={primaryBtn} aria-label="Separate Code">
              <Scissors size={14} /> Separate Code
            </button>
            <button onClick={copyCombined} style={{ ...primaryBtn, background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)" }} aria-label="Copy Combined">
              <Copy size={14} /> Copy Combined
            </button>
            <DetectChips d={detected} />
            <span style={statText}>
              {countLines(combined)} lines · {formatSize(byteSize(combined))}
            </span>
          </div>
        </Section>


        <Section
          title="HTML"
          actions={
            <>
              <IconAction onClick={() => copyText("HTML", htmlCode)} icon={<Copy size={13} />} label="Copy" />
              <IconAction onClick={() => downloadPart("index.html", htmlWrapper(htmlCode), "text/html")} icon={<Download size={13} />} label="Save" />
            </>
          }
          stats={`${countLines(htmlCode)} lines · ${formatSize(byteSize(htmlCode))}`}
        >
          <CodeEditor value={htmlCode} onChange={setHtmlCode} language="html" height={150} />
        </Section>

        <Section
          title="CSS"
          actions={
            <>
              <IconAction onClick={() => copyText("CSS", cssCode)} icon={<Copy size={13} />} label="Copy" />
              <IconAction onClick={() => downloadPart("style.css", cssCode, "text/css")} icon={<Download size={13} />} label="Save" />
            </>
          }
          stats={`${countLines(cssCode)} lines · ${formatSize(byteSize(cssCode))}`}
        >
          <CodeEditor value={cssCode} onChange={setCssCode} language="css" height={140} />
        </Section>

        <Section
          title="JavaScript"
          actions={
            <>
              <IconAction onClick={() => copyText("JS", jsCode)} icon={<Copy size={13} />} label="Copy" />
              <IconAction onClick={() => downloadPart("script.js", jsCode, "text/javascript")} icon={<Download size={13} />} label="Save" />
            </>
          }
          stats={`${countLines(jsCode)} lines · ${formatSize(byteSize(jsCode))}`}
        >
          <CodeEditor value={jsCode} onChange={setJsCode} language="js" height={140} />
        </Section>

        <Section title="Live Preview" stats={`Total ${formatSize(totalSize)}`}>
          <iframe
            ref={previewRef}
            title="Live Preview"
            sandbox="allow-scripts"
            style={{
              width: "100%", height: 300, border: "1px solid var(--border)",
              borderRadius: 8, background: "white",
            }}
          />
        </Section>

        <p style={{ fontSize: 10, color: "var(--text-faint)", textAlign: "center", marginTop: 4 }}>
          Shortcuts: Ctrl/Cmd+S Save · Ctrl/Cmd+B Beautify · Ctrl/Cmd+Enter Run · Ctrl/Cmd+F Find · Ctrl/Cmd+Z Undo
        </p>
      </div>

      <AppFooter />

      <div
        style={{
          position: "fixed", bottom: 56, left: 0, right: 0, zIndex: 19,
          display: "flex", gap: 6, alignItems: "center",
          padding: "8px 10px", background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          boxShadow: "0 -2px 8px rgba(15,23,42,0.08)",
        }}
      >
        <ActionBtn bg="#2563eb" onClick={combineAndRun} icon={<Play size={14} />} label="Run" />
        <ActionBtn bg="#16a34a" onClick={downloadCombined} icon={<Download size={14} />} label="Save" />
        <ActionBtn bg="#f59e0b" color="#1f2937" onClick={shareCombined} icon={<Share2 size={14} />} label="Share" />
        <ActionBtn bg="#64748b" onClick={clearAll} icon={<Trash2 size={14} />} label="Clear" />
      </div>

      <BottomNav />
    </div>
  );
}

/* ---------- helpers / subcomponents ---------- */

function htmlWrapper(body: string) {
  return `<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    ${body}\n    <script src="script.js"><\/script>\n  </body>\n</html>\n`;
}

function triggerDownload(text: string, name: string, mime: string) {
  triggerBlob(new Blob([text], { type: mime }), name);
}
function triggerBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function Section({ title, children, actions, stats }: {
  title: string; children: React.ReactNode;
  actions?: React.ReactNode; stats?: string;
}) {
  return (
    <section style={{
      background: "var(--surface)", borderRadius: 12, padding: 12,
      boxShadow: "var(--shadow)", marginBottom: 12,
      border: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text)", letterSpacing: 0.3 }}>
          {title}
        </h2>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {stats && <span style={statText}>{stats}</span>}
          {actions}
        </div>
      </div>
      {children}
    </section>
  );
}

function PanelBox({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <section style={{
      background: "var(--surface)", borderRadius: 12, padding: 12,
      boxShadow: "var(--shadow)", marginBottom: 12,
      border: "1px solid var(--accent)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{
          background: "transparent", border: 0, cursor: "pointer", color: "var(--text-muted)",
          fontSize: 12, fontWeight: 700,
        }}>✕</button>
      </div>
      {children}
    </section>
  );
}

function ValidationSummary({ label, items, hasCode }: { label: string; items: ValidationIssue[]; hasCode: boolean }) {
  if (!hasCode) return null;
  if (items.length === 0) {
    return (
      <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, padding: "4px 0" }}>
        ✓ {label} Valid
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 4 }}>
        {label} — {items.length} issue{items.length === 1 ? "" : "s"}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12 }}>
        {items.map((it, i) => (
          <li key={i} style={{ color: it.level === "error" ? "var(--danger)" : "var(--warning)" }}>
            {it.line ? `Line ${it.line}: ` : ""}{it.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ValidationList({ label, items }: { label: string; items: ValidationIssue[] }) {
  if (items.length === 0) return null;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12 }}>
        {items.map((it, i) => (
          <li key={i} style={{ color: it.level === "error" ? "var(--danger)" : "var(--warning)" }}>
            {it.line ? `Line ${it.line}: ` : ""}{it.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetectChips({ d }: { d: DetectResult }) {
  const items: Array<[string, boolean]> = [
    ["HTML", d.html], ["CSS", d.css], ["JS", d.js],
    ["React", d.react], ["TS", d.ts], ["Vue", d.vue],
  ];
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {items.map(([k, on]) => (
        <span key={k} style={{
          fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 999,
          background: on ? "rgba(34,197,94,0.15)" : "rgba(148,163,184,0.10)",
          color: on ? "#16a34a" : "var(--text-faint)",
          border: `1px solid ${on ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
        }}>
          {on ? "✓" : "·"} {k}
        </span>
      ))}
    </div>
  );
}

const statText: React.CSSProperties = {
  fontSize: 10, color: "var(--text-faint)", fontWeight: 600, letterSpacing: 0.3,
};
const primaryBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "8px 12px", background: "var(--accent)",
  color: "white", border: 0, borderRadius: 8, fontSize: 12, fontWeight: 700,
  cursor: "pointer", minHeight: 36,
};
const inputStyle: React.CSSProperties = {
  padding: "8px 10px", border: "1px solid var(--border)", borderRadius: 8,
  background: "var(--code-bg)", color: "var(--text)", fontSize: 13, outline: "none",
};
const tileBtn: React.CSSProperties = {
  padding: "12px 10px", background: "var(--surface-2)",
  color: "var(--text)", border: "1px solid var(--border)",
  borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
};
const recentRow: React.CSSProperties = {
  display: "flex", gap: 6, alignItems: "stretch",
  border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden",
};
const recentLoadBtn: React.CSSProperties = {
  flex: 1, textAlign: "left", padding: "8px 10px", background: "var(--surface-2)",
  color: "var(--text)", border: 0, cursor: "pointer",
  display: "flex", flexDirection: "column", gap: 2, fontSize: 12,
};
const sidebarItemBtn: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 10,
  padding: "10px 12px", background: "var(--surface-2)",
  color: "var(--text)", border: "1px solid var(--border)",
  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
  textAlign: "left", minHeight: 42,
};
const recentDelBtn: React.CSSProperties = {
  padding: "8px 10px", background: "transparent", border: 0,
  color: "var(--danger)", cursor: "pointer",
};

function ToolbarButton({ onClick, icon, label, tone }: {
  onClick: () => void; icon: React.ReactNode; label: string;
  tone?: "warn" | "danger";
}) {
  const toneStyle: React.CSSProperties =
    tone === "danger"
      ? { borderColor: "var(--danger)", color: "var(--danger)" }
      : tone === "warn"
      ? { borderColor: "var(--warning)", color: "var(--warning)" }
      : {};
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "8px 10px", background: "var(--surface)",
        color: "var(--text)", border: "1px solid var(--border)",
        borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
        minHeight: 36, boxShadow: "var(--shadow)",
        ...toneStyle,
      }}
    >
      {icon} {label}
    </button>
  );
}

function IconAction({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick} aria-label={label}
      style={{
        display: "inline-flex", alignItems: "center", gap: 3,
        padding: "4px 8px", background: "transparent",
        color: "var(--text-muted)", border: "1px solid var(--border)",
        borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer",
      }}
    >
      {icon} {label}
    </button>
  );
}

function ActionBtn({ onClick, icon, label, bg, color = "white" }: {
  onClick: () => void; icon: React.ReactNode; label: string; bg: string; color?: string;
}) {
  return (
    <button
      onClick={onClick} aria-label={label}
      style={{
        flex: "1 1 0", minWidth: 0,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
        padding: "10px 4px", background: bg, color,
        border: 0, borderRadius: 8, fontSize: 12, fontWeight: 700,
        cursor: "pointer", minHeight: 40,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        boxShadow: "0 1px 2px rgba(15,23,42,0.15)",
      }}
    >
      {icon} {label}
    </button>
  );
}
