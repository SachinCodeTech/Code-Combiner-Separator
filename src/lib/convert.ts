// Lightweight formatters/converters for JSON, XML, YAML, Markdown.
// All client-side, dependency-free.

export type ConvertResult = { ok: true; out: string } | { ok: false; error: string };

/* ---------------- JSON ---------------- */
export function formatJSON(src: string, indent = 2): ConvertResult {
  if (!src.trim()) return { ok: false, error: "Empty input" };
  try {
    const parsed = JSON.parse(src);
    return { ok: true, out: JSON.stringify(parsed, null, indent) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
export function minifyJSON(src: string): ConvertResult {
  if (!src.trim()) return { ok: false, error: "Empty input" };
  try {
    return { ok: true, out: JSON.stringify(JSON.parse(src)) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/* ---------------- XML ---------------- */
export function formatXML(src: string, indent = 2): ConvertResult {
  if (!src.trim()) return { ok: false, error: "Empty input" };
  try {
    const pad = " ".repeat(indent);
    // Insert newlines between tags
    let xml = src.replace(/>\s*</g, "><").trim();
    xml = xml.replace(/></g, ">\n<");
    const lines = xml.split("\n");
    let depth = 0;
    const out: string[] = [];
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      const isClose = /^<\//.test(line);
      const isSelf = /\/>$/.test(line) || /^<\?/.test(line) || /^<!--/.test(line) || /^<!/.test(line);
      const isOpenClose = /^<[^!?\/][^>]*>.*<\/[^>]+>$/.test(line);
      if (isClose) depth = Math.max(0, depth - 1);
      out.push(pad.repeat(depth) + line);
      if (!isClose && !isSelf && !isOpenClose) depth++;
    }
    return { ok: true, out: out.join("\n") };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
export function minifyXML(src: string): ConvertResult {
  if (!src.trim()) return { ok: false, error: "Empty input" };
  return { ok: true, out: src.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim() };
}

/* ---------------- YAML ---------------- */
// Tiny YAML <-> JSON for common subset (objects, arrays of scalars/objects, scalars).
function yamlToObj(src: string): unknown {
  const lines = src.replace(/\r/g, "").split("\n").filter((l) => l.trim() && !/^\s*#/.test(l));
  let idx = 0;
  const parseValue = (v: string): unknown => {
    const t = v.trim();
    if (!t) return "";
    if (t === "null" || t === "~") return null;
    if (t === "true") return true;
    if (t === "false") return false;
    if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))
      return t.slice(1, -1);
    return t;
  };
  const indentOf = (l: string) => l.match(/^ */)![0].length;
  const parseBlock = (baseIndent: number): unknown => {
    // Detect list vs object via first line at baseIndent
    if (idx >= lines.length) return null;
    const first = lines[idx];
    if (indentOf(first) < baseIndent) return null;
    const isList = /^\s*-\s?/.test(first);
    if (isList) {
      const arr: unknown[] = [];
      while (idx < lines.length) {
        const l = lines[idx];
        const ind = indentOf(l);
        if (ind < baseIndent) break;
        if (ind > baseIndent || !/^\s*-\s?/.test(l)) break;
        const after = l.replace(/^\s*-\s?/, "");
        if (after.includes(":") && !/^["']/.test(after)) {
          // inline object on this list item
          const [k, ...rest] = after.split(":");
          const v = rest.join(":").trim();
          idx++;
          const obj: Record<string, unknown> = {};
          if (v) obj[k.trim()] = parseValue(v);
          else obj[k.trim()] = parseBlock(baseIndent + 2);
          // continue collecting nested keys at indent baseIndent+2
          while (idx < lines.length) {
            const nl = lines[idx];
            const ni = indentOf(nl);
            if (ni <= baseIndent) break;
            const [nk, ...nr] = nl.trim().split(":");
            const nv = nr.join(":").trim();
            idx++;
            obj[nk.trim()] = nv ? parseValue(nv) : parseBlock(ni + 2);
          }
          arr.push(obj);
        } else {
          idx++;
          arr.push(parseValue(after));
        }
      }
      return arr;
    }
    const obj: Record<string, unknown> = {};
    while (idx < lines.length) {
      const l = lines[idx];
      const ind = indentOf(l);
      if (ind < baseIndent) break;
      if (ind > baseIndent) break;
      const [k, ...rest] = l.trim().split(":");
      const v = rest.join(":").trim();
      idx++;
      obj[k.trim()] = v ? parseValue(v) : parseBlock(baseIndent + 2);
    }
    return obj;
  };
  return parseBlock(indentOf(lines[0] || ""));
}
function objToYaml(obj: unknown, indent = 0): string {
  const pad = " ".repeat(indent);
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") {
    if (typeof obj === "string" && /[:#\-?{}\[\],&*!|>'"%@`]/.test(obj))
      return JSON.stringify(obj);
    return String(obj);
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj
      .map((item) => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const inner = objToYaml(item, indent + 2);
          return `${pad}-\n${inner}`;
        }
        return `${pad}- ${objToYaml(item, indent + 2)}`;
      })
      .join("\n");
  }
  const entries = Object.entries(obj as Record<string, unknown>);
  if (entries.length === 0) return "{}";
  return entries
    .map(([k, v]) => {
      if (v && typeof v === "object") {
        return `${pad}${k}:\n${objToYaml(v, indent + 2)}`;
      }
      return `${pad}${k}: ${objToYaml(v, indent + 2)}`;
    })
    .join("\n");
}
export function yamlToJSON(src: string): ConvertResult {
  if (!src.trim()) return { ok: false, error: "Empty input" };
  try {
    return { ok: true, out: JSON.stringify(yamlToObj(src), null, 2) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
export function jsonToYAML(src: string): ConvertResult {
  if (!src.trim()) return { ok: false, error: "Empty input" };
  try {
    return { ok: true, out: objToYaml(JSON.parse(src)) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/* ---------------- Markdown ---------------- */
// Tiny safe-ish Markdown -> HTML for previewing.
export function markdownToHTML(src: string): ConvertResult {
  if (!src.trim()) return { ok: false, error: "Empty input" };
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = src.replace(/\r/g, "").split("\n");
  const out: string[] = [];
  let inCode = false;
  let inList = false;
  let para: string[] = [];
  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const inline = (s: string) =>
    escape(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  for (const raw of lines) {
    const line = raw;
    if (/^```/.test(line)) {
      flushPara();
      if (inList) { out.push("</ul>"); inList = false; }
      if (inCode) { out.push("</code></pre>"); inCode = false; }
      else { out.push("<pre><code>"); inCode = true; }
      continue;
    }
    if (inCode) { out.push(escape(line)); continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      if (inList) { out.push("</ul>"); inList = false; }
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara();
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
      continue;
    }
    if (!line.trim()) {
      flushPara();
      if (inList) { out.push("</ul>"); inList = false; }
      continue;
    }
    para.push(line);
  }
  flushPara();
  if (inList) out.push("</ul>");
  if (inCode) out.push("</code></pre>");
  return { ok: true, out: out.join("\n") };
}
