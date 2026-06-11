const KEY = "ccncs-recent";
const MAX = 8;

export type RecentProject = {
  id: string;
  name: string;
  ts: number;
  html: string;
  css: string;
  js: string;
};

function read(): RecentProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(list: RecentProject[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {
    /* quota */
  }
}

export function listRecent(): RecentProject[] {
  return read().sort((a, b) => b.ts - a.ts);
}

export function saveRecent(p: Omit<RecentProject, "id" | "ts">): RecentProject {
  const entry: RecentProject = {
    ...p,
    id: Math.random().toString(36).slice(2, 10),
    ts: Date.now(),
  };
  const list = read();
  list.unshift(entry);
  write(list.slice(0, MAX));
  return entry;
}

export function deleteRecent(id: string) {
  write(read().filter((r) => r.id !== id));
}

export function clearRecent() {
  write([]);
}
