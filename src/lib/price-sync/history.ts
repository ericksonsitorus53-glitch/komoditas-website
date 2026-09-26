// ============================================================
// LOG SINKRONISASI HARGA (ring buffer in-memory)
// Catatan jujur: Vercel serverless itu ephemeral — log ini hidup
// selama instance-nya hangat (maks 100 entri terakhir). Untuk arsip
// permanen, hubungkan ke KV/DB (upgrade path).
// Disimpan di globalThis agar konsisten lintas module-instance dalam
// satu function instance.
// ============================================================

export type SyncTrigger = 'cron' | 'manual' | 'cold-start' | 'api';

export interface SyncLogEntry {
  at: string;
  trigger: SyncTrigger;
  source: string;
  anchorCount: number;
  productsUpdated: number;
  errors: string[];
  durationMs: number;
}

const MAX_LOGS = 100;

function store(): { logs: SyncLogEntry[] } {
  const g = globalThis as unknown as { __priceSyncLogs?: SyncLogEntry[] };
  if (!g.__priceSyncLogs) g.__priceSyncLogs = [];
  return { logs: g.__priceSyncLogs };
}

export function recordSyncLog(entry: SyncLogEntry): void {
  const { logs } = store();
  logs.unshift(entry);
  if (logs.length > MAX_LOGS) logs.length = MAX_LOGS;
}

export function getSyncLogs(): SyncLogEntry[] {
  return [...store().logs];
}
