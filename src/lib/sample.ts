export const APP_VERSION = "1.2.0";

export const TEMPLATES: { id: string; name: string; html: string }[] = [
  {
    id: "landing",
    name: "Landing Page",
    html: `<!DOCTYPE html>
<html><head><style>
body{margin:0;font-family:system-ui;background:#0f172a;color:#e2e8f0}
.hero{padding:80px 24px;text-align:center;background:linear-gradient(135deg,#6366f1,#0ea5e9)}
.hero h1{font-size:48px;margin:0 0 12px}
.hero p{opacity:.9;font-size:18px}
.cta{margin-top:24px;padding:12px 28px;background:#fff;color:#0f172a;border:0;border-radius:8px;font-weight:700;cursor:pointer}
</style></head><body>
<section class="hero">
  <h1>Build something great</h1>
  <p>A starter landing page from CCnCS templates.</p>
  <button class="cta" onclick="alert('Hi!')">Get started</button>
</section>
<script>console.log('Landing loaded');</script>
</body></html>`,
  },
  {
    id: "portfolio",
    name: "Portfolio",
    html: `<!DOCTYPE html>
<html><head><style>
body{font-family:system-ui;margin:0;padding:40px;background:#fafafa;color:#111}
h1{font-size:36px;margin:0 0 8px}
.muted{color:#666;margin-bottom:32px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.card{background:#fff;border-radius:12px;padding:18px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
</style></head><body>
<h1>Jane Developer</h1>
<p class="muted">Web · Mobile · Cloud</p>
<div class="grid">
  <div class="card"><b>Project One</b><p>Realtime chat app.</p></div>
  <div class="card"><b>Project Two</b><p>E-commerce dashboard.</p></div>
  <div class="card"><b>Project Three</b><p>AI image studio.</p></div>
</div>
<script>document.querySelectorAll('.card').forEach(c=>c.onclick=()=>c.style.background='#eef');</script>
</body></html>`,
  },
  {
    id: "login",
    name: "Login Page",
    html: `<!DOCTYPE html>
<html><head><style>
body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui;background:#f5f7fb}
.box{background:#fff;padding:32px;border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.08);width:320px}
h2{margin:0 0 16px}
input{width:100%;padding:10px;margin-bottom:12px;border:1px solid #cbd5e1;border-radius:8px;box-sizing:border-box}
button{width:100%;padding:10px;background:#6366f1;color:#fff;border:0;border-radius:8px;font-weight:700;cursor:pointer}
</style></head><body>
<form class="box" onsubmit="event.preventDefault();alert('Logging in...')">
  <h2>Sign in</h2>
  <input type="email" placeholder="Email" required />
  <input type="password" placeholder="Password" required />
  <button>Continue</button>
</form>
</body></html>`,
  },
  {
    id: "contact",
    name: "Contact Form",
    html: `<!DOCTYPE html>
<html><head><style>
body{font-family:system-ui;background:#fff;padding:40px;max-width:520px;margin:0 auto}
h1{margin:0 0 8px}
label{display:block;font-size:13px;margin:12px 0 4px;font-weight:600}
input,textarea{width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:8px;box-sizing:border-box;font:inherit}
button{margin-top:16px;padding:10px 20px;background:#0ea5e9;color:#fff;border:0;border-radius:8px;font-weight:700;cursor:pointer}
</style></head><body>
<h1>Contact us</h1>
<p>We'll reply within 24 hours.</p>
<form onsubmit="event.preventDefault();alert('Sent!')">
  <label>Name<input required></label>
  <label>Email<input type="email" required></label>
  <label>Message<textarea rows="5" required></textarea></label>
  <button>Send</button>
</form>
</body></html>`,
  },
];

export const SAMPLE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: -apple-system, sans-serif; padding: 24px; background: #f5f7fb; }
      h1 { color: #6366f1; }
      button { background: #0ea5e9; color: white; border: 0; padding: 8px 14px; border-radius: 6px; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Hello from CCnCS</h1>
    <p>Click the button — JavaScript is wired up.</p>
    <button onclick="greet()">Say hi</button>
    <script>
      function greet() {
        alert("Hello, world!");
        console.log("Greeted at", new Date().toISOString());
      }
    </script>
  </body>
</html>`;

export type DetectResult = {
  html: boolean;
  css: boolean;
  js: boolean;
};

export function detectParts(input: string): DetectResult {
  return {
    html: /<body[^>]*>[\s\S]*?<\/body>/i.test(input) || /<[a-z][\s\S]*?>/i.test(input),
    css: /<style[^>]*>[\s\S]*?<\/style>/i.test(input),
    js: /<script[^>]*>[\s\S]*?<\/script>/i.test(input),
  };
}

export function countLines(s: string) {
  if (!s) return 0;
  return s.split(/\r?\n/).length;
}

export function byteSize(s: string) {
  if (typeof TextEncoder === "undefined") return s.length;
  return new TextEncoder().encode(s).length;
}

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
