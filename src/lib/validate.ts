export type ValidationIssue = { level: "error" | "warn"; msg: string; line?: number };
export type ValidationReport = {
  html: ValidationIssue[];
  css: ValidationIssue[];
  js: ValidationIssue[];
};

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

export function validateHTML(src: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!src.trim()) return issues;
  const stack: { tag: string; line: number }[] = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const tag = m[1].toLowerCase();
    const selfClose = m[2] === "/" || VOID_TAGS.has(tag);
    const isClose = src[m.index + 1] === "/";
    const line = src.slice(0, m.index).split("\n").length;
    if (selfClose && !isClose) continue;
    if (isClose) {
      const top = stack.pop();
      if (!top) issues.push({ level: "warn", msg: `Stray </${tag}>`, line });
      else if (top.tag !== tag)
        issues.push({ level: "warn", msg: `Mismatch: <${top.tag}> closed by </${tag}>`, line });
    } else {
      stack.push({ tag, line });
    }
  }
  stack.forEach((s) =>
    issues.push({ level: "warn", msg: `Unclosed <${s.tag}>`, line: s.line }),
  );
  return issues;
}

export function validateCSS(src: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!src.trim()) return issues;
  let depth = 0;
  let line = 1;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === "\n") line++;
    else if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth < 0) {
        issues.push({ level: "warn", msg: "Extra '}' brace", line });
        depth = 0;
      }
    }
  }
  if (depth > 0) issues.push({ level: "warn", msg: `${depth} unclosed CSS block(s)` });
  return issues;
}

export function validateJS(src: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!src.trim()) return issues;
  try {
    // Use Function constructor as a syntax check (does not execute)
    // eslint-disable-next-line no-new-func
    new Function(src);
  } catch (e) {
    const err = e as Error;
    issues.push({ level: "error", msg: err.message });
  }
  return issues;
}

export function summarize(r: ValidationReport) {
  const total = r.html.length + r.css.length + r.js.length;
  const errs = [...r.html, ...r.css, ...r.js].filter((i) => i.level === "error").length;
  return { total, errs };
}
