import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { getStoredTheme, setTheme, type ThemeMode } from "@/lib/theme";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("auto");
  useEffect(() => setMode(getStoredTheme()), []);

  function cycle() {
    const next: ThemeMode = mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
    setMode(next);
    setTheme(next);
  }

  const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;
  const label = mode === "light" ? "Light" : mode === "dark" ? "Dark" : "Auto";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      title={`Theme: ${label}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "6px 8px",
        background: "rgba(255,255,255,0.18)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      <Icon size={14} />
      <span>{label}</span>
    </button>
  );
}
