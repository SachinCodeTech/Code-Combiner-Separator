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
