export type ThemeMode = "light" | "dark" | "auto";
const KEY = "ccncs-theme";

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "auto";
  const v = window.localStorage.getItem(KEY);
  return v === "light" || v === "dark" || v === "auto" ? v : "auto";
}

export function resolveTheme(mode: ThemeMode): "light" | "dark" {
  if (mode === "auto") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode;
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(mode);
  document.documentElement.setAttribute("data-theme", resolved);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", resolved === "dark" ? "#0f172a" : "#6366f1");
}

export function setTheme(mode: ThemeMode) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, mode);
  applyTheme(mode);
}

export function initTheme() {
  if (typeof window === "undefined") return;
  const mode = getStoredTheme();
  applyTheme(mode);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", () => {
    if (getStoredTheme() === "auto") applyTheme("auto");
  });
}
