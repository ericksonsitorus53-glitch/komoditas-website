'use client';

import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Lock, Activity, Anchor as AnchorIcon, ListChecks, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface AnchorStatus {
  key: string;
  label: string;
  baselinePrice: number;
  currentPrice: number | null;
  driftPct: number | null;
  range: [number, number];
  ok: boolean;
}

interface ProductStatus {
  slug: string;
  baseline: number;
  livePrice: number | null;
  changePct: number | null;
  mapped: boolean;
  source: string | null;
}

interface LogEntry {
  at: string;
  trigger: string;
  source: string;
  anchorCount: number;
  productsUpdated: number;
  errors: string[];
  durationMs: number;
}

interface StatusResponse {
  status: string;
  cache: { warm: boolean; fetchedAt: string; source: string; errors: string[] };
  anchors: AnchorStatus[];
  products: ProductStatus[];
  logs: LogEntry[];
  bapanasConfigured: boolean;
}

const SECRET_STORAGE_KEY = 'komoditas_admin_key';

function fmt(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—';
  return 'Rp ' + n.toLocaleString('id-ID');
}
function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—';
  const s = n > 0 ? '+' : '';
  return `${s}${n.toFixed(1)}%`;
}
function fmtTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

export default function PriceAdminDashboard() {
  const [key, setKey] = useState('');
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(SECRET_STORAGE_KEY);
    if (saved) setKey(saved);
  }, []);

  const load = useCallback(async (secret: string) => {
    if (!secret) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/price-status?key=${encodeURIComponent(secret)}`);
      if (res.status === 401) throw new Error('Secret salah. Pakai CRON_SECRET yang sama dengan cron.');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: StatusResponse = await res.json();
      if (json.status !== 'ok') throw new Error('Respons tidak valid');
      setData(json);
      localStorage.setItem(SECRET_STORAGE_KEY, secret);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat status');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (key) load(key);
  }, [key, load]);

  const runManualSync = async () => {
    if (!key || syncing) return;
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await fetch(`/api/admin/price-status`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}` },
      });
      const json = await res.json();
      setSyncMsg(res.ok ? json.message : json.message || `HTTP ${res.status}`);
      await load(key);
    } catch {
      setSyncMsg('Gagal menjalankan sync');
    } finally {
      setSyncing(false);
    }
  };

  // ---- Gate: minta secret dulu ----
  if (!data && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">Admin Harga</h1>
              <p className="text-sm text-gray-500">Masukkan CRON_SECRET untuk melanjutkan</p>
            </div>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>
          )}
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && key && load(key)}
            placeholder="CRON_SECRET"
            className="input-field mb-3"
            autoFocus
          />
          <button onClick={() => load(key)} disabled={!key} className="btn-primary w-full disabled:opacity-50">
            Masuk
          </button>
        </div>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  const warm = data?.cache.warm;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="section-title text-2xl">Admin — Status Harga</h1>
              <p className="section-subtitle text-sm">
                Sinkronisasi harga dari Bappebti · cache {warm ? 'hangat' : 'dingin'} · sumber{' '}
                <span className="font-medium">{data?.cache.source ?? '—'}</span> · update{' '}
                {fmtTime(data?.cache.fetchedAt)}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => key && load(key)} disabled={loading} className="btn-secondary text-sm">
                <RefreshCw className={`w-4 h-4 mr-1 inline ${loading ? 'animate-spin' : ''}`} /> Muat Ulang
              </button>
              <button onClick={runManualSync} disabled={syncing} className="btn-primary text-sm">
                <Activity className="w-4 h-4 mr-1 inline" /> {syncing ? 'Menyinkronkan…' : 'Sync Sekarang'}
              </button>
            </div>
          </div>
          {syncMsg && (
            <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700">{syncMsg}</div>
          )}
          {data?.cache.errors && data.cache.errors.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-yellow-50 border border-yellow-100 text-sm text-yellow-700">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              {data.cache.errors.join(' · ')}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Anchor cards */}
        <section>
          <h2 className="font-display font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <AnchorIcon className="w-5 h-5 text-primary-600" /> Anchor Bappebti
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data?.anchors.map((a) => (
              <div key={a.key} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-gray-400">{a.key}</span>
                  {a.ok ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-900 leading-snug mb-2">{a.label}</p>
                <p className="text-lg font-bold text-primary-700">{fmt(a.currentPrice)}</p>
                <p className="text-xs text-gray-500">
                  baseline {fmt(a.baselinePrice)} ·{' '}
                  <span className={(a.driftPct ?? 0) >= 0 ? 'text-red-500' : 'text-green-600'}>
                    {fmtPct(a.driftPct)}
                  </span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  rentang wajar: {a.range[0].toLocaleString('id-ID')}–{a.range[1].toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Products table */}
        <section>
          <h2 className="font-display font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary-600" /> Produk Ter-mapping
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium">Produk</th>
                    <th className="text-right px-5 py-3 font-medium">Katalog</th>
                    <th className="text-right px-5 py-3 font-medium">Live</th>
                    <th className="text-right px-5 py-3 font-medium">Δ</th>
                    <th className="text-center px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data?.products.map((p) => (
                    <tr key={p.slug}>
                      <td className="px-5 py-3 font-medium text-gray-900">{p.slug}</td>
                      <td className="px-5 py-3 text-right text-gray-600">{fmt(p.baseline)}</td>
                      <td className="px-5 py-3 text-right font-semibold text-gray-900">{fmt(p.livePrice)}</td>
                      <td className={`px-5 py-3 text-right ${(p.changePct ?? 0) > 0 ? 'text-red-500' : (p.changePct ?? 0) < 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {fmtPct(p.changePct)}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {p.mapped ? (
                          <span className="badge bg-green-100 text-green-700">ter-mapping</span>
                        ) : (
                          <span className="badge bg-gray-100 text-gray-500">manual</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Logs */}
        <section>
          <h2 className="font-display font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-600" /> Log Sinkronisasi
          </h2>
          {data && data.logs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-sm text-gray-500">
              Belum ada log di instance ini — log akan terisi setiap kali cron jalan (07:00 WIB) atau sync manual.
              Catatan: log in-memory hilang saat instance cold start; arsip permanen butuh penyimpanan eksternal.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Waktu</th>
                      <th className="text-left px-5 py-3 font-medium">Pemicu</th>
                      <th className="text-left px-5 py-3 font-medium">Sumber</th>
                      <th className="text-right px-5 py-3 font-medium">Anchor</th>
                      <th className="text-right px-5 py-3 font-medium">Produk</th>
                      <th className="text-right px-5 py-3 font-medium">Durasi</th>
                      <th className="text-left px-5 py-3 font-medium">Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data?.logs.map((l, i) => (
                      <tr key={`${l.at}-${i}`}>
                        <td className="px-5 py-3 text-gray-900 whitespace-nowrap">{fmtTime(l.at)}</td>
                        <td className="px-5 py-3">
                          <span className="badge bg-primary-50 text-primary-700">{l.trigger}</span>
                        </td>
                        <td className="px-5 py-3 text-gray-600">{l.source}</td>
                        <td className="px-5 py-3 text-right">{l.anchorCount}</td>
                        <td className="px-5 py-3 text-right">{l.productsUpdated}</td>
                        <td className="px-5 py-3 text-right text-gray-500">{l.durationMs} ms</td>
                        <td className="px-5 py-3">
                          {l.errors.length === 0 ? (
                            <span className="text-green-600 text-xs">bersih</span>
                          ) : (
                            <span className="text-red-500 text-xs">{l.errors.join(', ')}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <p className="text-xs text-gray-400 pb-8">
          {data?.bapanasConfigured
            ? 'Bapanas aktif (BAPANAS_API_KEY terpasang).'
            : 'Bapanas belum dikonfigurasi — set env BAPANAS_API_KEY untuk sumber cabai dari Panel Harga Badan Pangan.'}
        </p>
      </div>
    </div>
  );
}
