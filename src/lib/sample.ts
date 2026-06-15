export const APP_VERSION = "2.0.0";
export const APP_NAME = "CCnCS Studio";

export const VERSION_HISTORY: { version: string; date: string; notes: string[] }[] = [
  {
    version: "2.0.0",
    date: "2026-06-15",
    notes: [
      "Rebranded as CCnCS Studio",
      "Framework auto-detection (React JSX, TypeScript, Vue SFC)",
      "Framework detection badges (HTML/CSS/JS/React/TS/Vue)",
      "Dedicated Validation Results panel with quality score",
      "Code intelligence: lines, characters, file size, savings %",
      "Tools grouped into Editing / File / Utilities / Clipboard sections",
      "Dashboard template added",
      "Modular architecture ready for JSON Studio, API Tester, Vox DevBook, AI review",
    ],
  },
  {
    version: "1.4.0",
    date: "2026-06-14",
    notes: [
      "Converters: JSON / XML / YAML / Markdown",
      "JSON ↔ YAML conversion",
      "Markdown → HTML preview",
      "Format and minify for each converter",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-06-13",
    notes: [
      "Tools sidebar (open via logo)",
      "Minify stats (before/after, % saved)",
      "Validation positive confirmation",
      "Copy Combined / Copy All",
      "Framework starter templates (React, Vue, TypeScript)",
      "Version History page",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-06-12",
    notes: ["Minify", "Validate", "Find & Replace", "Templates", "Recent Projects", "Beautify shortcut"],
  },
  {
    version: "1.1.0",
    date: "2026-06-11",
    notes: ["Dark/Light/Auto theme", "PWA install + offline", "ZIP export", "Drag & drop", "CodeMirror editor"],
  },
  { version: "1.0.0", date: "2026-06-10", notes: ["Initial release: Separate, Combine, Preview"] },
];

export const TEMPLATES: { id: string; name: string; html: string }[] = [
  {
    id: "html-starter",
    name: "HTML Starter",
    html: `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>HTML Starter</title>
<style>body{font-family:system-ui;margin:40px;color:#111}</style></head>
<body><h1>Hello, world</h1><p>Edit and preview.</p>
<script>console.log('ready');</script></body></html>`,
  },
  {
    id: "react-starter",
    name: "React Starter",
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>React Starter</title>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>body{font-family:system-ui;margin:40px}button{padding:8px 14px}</style></head>
<body><div id="root"></div>
<script type="text/babel">
function App(){const[n,setN]=React.useState(0);
return <div><h1>React {React.version}</h1>
<button onClick={()=>setN(n+1)}>Count: {n}</button></div>;}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script></body></html>`,
  },
  {
    id: "vue-starter",
    name: "Vue Starter",
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Vue Starter</title>
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<style>body{font-family:system-ui;margin:40px}button{padding:8px 14px}</style></head>
<body><div id="app"><h1>Vue {{ version }}</h1>
<button @click="n++">Count: {{ n }}</button></div>
<script>
const{createApp,ref}=Vue;
createApp({setup(){return{n:ref(0),version:Vue.version}}}).mount('#app');
</script></body></html>`,
  },
  {
    id: "ts-starter",
    name: "TypeScript Starter",
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>TypeScript Starter</title>
<script src="https://unpkg.com/typescript@5/lib/typescript.js"></script>
<style>body{font-family:system-ui;margin:40px}</style></head>
<body><h1>TypeScript Starter</h1><pre id="out"></pre>
<script type="text/typescript" id="src">
interface User { name: string; age: number }
const u: User = { name: 'Ada', age: 30 };
document.getElementById('out')!.textContent = JSON.stringify(u, null, 2);
</script>
<script>
const src=document.getElementById('src').textContent;
const js=ts.transpile(src,{target:ts.ScriptTarget.ES2020});
new Function(js)();
</script></body></html>`,
  },
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
