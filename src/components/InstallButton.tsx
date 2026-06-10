import { useEffect, useState } from "react";
import { Download } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallButton() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBIP = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setEvt(null);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || !evt) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        await evt.prompt();
        await evt.userChoice;
        setEvt(null);
      }}
      aria-label="Install CCnCS as an app"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "10px 16px",
        background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
        color: "white",
        border: 0,
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
      }}
    >
      <Download size={16} /> Install App
    </button>
  );
}
