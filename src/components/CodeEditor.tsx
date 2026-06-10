import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

type Lang = "html" | "css" | "js";

const exts = {
  html: () => [html()],
  css: () => [css()],
  js: () => [javascript()],
};

export function CodeEditor({
  value,
  onChange,
  language,
  height = 180,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  language: Lang;
  height?: number;
  placeholder?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR / first paint fallback – matches sizing so layout doesn't jump
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        style={{
          width: "100%",
          height,
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: 10,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 13,
          background: "var(--code-bg)",
          color: "var(--text)",
          resize: "vertical",
          boxSizing: "border-box",
          outline: "none",
        }}
      />
    );
  }

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <CodeMirror
      value={value}
      height={`${height}px`}
      theme={isDark ? "dark" : "light"}
      extensions={exts[language]()}
      onChange={onChange}
      placeholder={placeholder}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        foldGutter: false,
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
      }}
    />
  );
}
