import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

export function OfflineBadge() {
  const [online, setOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  if (!mounted) return null;
  const Icon = online ? Wifi : WifiOff;
  return (
    <span
      title={online ? "Online" : "Offline — app works fully"}
      aria-label={online ? "Online" : "Offline"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        background: online ? "rgba(34,197,94,0.18)" : "rgba(245,158,11,0.22)",
        color: "white",
        border: `1px solid ${online ? "rgba(134,239,172,0.5)" : "rgba(253,224,71,0.5)"}`,
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.3,
      }}
    >
      <Icon size={11} />
      {online ? "Online" : "Offline"}
    </span>
  );
}
