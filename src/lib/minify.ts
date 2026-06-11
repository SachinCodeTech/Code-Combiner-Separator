// Lightweight, dependency-free minifiers. Good enough for a client-side utility.

export function minifyCSS(src: string): string {
  if (!src) return "";
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")            // comments
    .replace(/\s+/g, " ")                         // collapse whitespace
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")        // around tokens
    .replace(/;}/g, "}")
    .trim();
}

export function minifyJS(src: string): string {
  if (!src) return "";
  // Conservative: strip comments + collapse whitespace at line boundaries.
  // Preserves strings/regexes by skipping common pitfalls.
  let out = "";
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const n1 = src[i + 1];
    // line comment
    if (c === "/" && n1 === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    // block comment
    if (c === "/" && n1 === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i += 2;
      continue;
    }
    // strings
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      out += c;
      i++;
      while (i < n) {
        const ch = src[i];
        out += ch;
        if (ch === "\\" && i + 1 < n) {
          out += src[i + 1];
          i += 2;
          continue;
        }
        i++;
        if (ch === quote) break;
      }
      continue;
    }
    out += c;
    i++;
  }
  return out
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s*([{};,:()=+\-*/<>!?&|])\s*/g, "$1")
    .trim();
}

export function minifyHTML(src: string): string {
  if (!src) return "";
  // Preserve <pre>, <script>, <style> contents
  const placeholders: string[] = [];
  const stash = (s: string) => {
    placeholders.push(s);
    return `___CCNCS_PH_${placeholders.length - 1}___`;
  };
  let work = src.replace(/<pre[\s\S]*?<\/pre>/gi, (m) => stash(m));
  work = work.replace(/<script([\s\S]*?)>([\s\S]*?)<\/script>/gi, (_m, attrs, body) =>
    stash(`<script${attrs}>${minifyJS(body)}</script>`),
  );
  work = work.replace(/<style([\s\S]*?)>([\s\S]*?)<\/style>/gi, (_m, attrs, body) =>
    stash(`<style${attrs}>${minifyCSS(body)}</style>`),
  );
  work = work
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .replace(/\n+/g, "")
    .trim();
  return work.replace(/___CCNCS_PH_(\d+)___/g, (_m, i) => placeholders[Number(i)]);
}
