// ============================================================
// SCRAPER SUMBER HARGA RESMI
// Sumber utama: Bappebti — Harga Komoditi di Tingkat Petani
// Endpoint resmi: POST /harga_komoditi_petani/getDataTableKomoditiPetaniForModal
//   body: k=<kode komoditi>&w=<kode wilayah>  → JSON { data_table_petani: { value_percentage } }
//   berisi "Harga Saat Ini : Rp. 125.000,00,-"
// (data chart di halaman utama adalah series historis lama — tidak dipakai)
// Bapanas (Panel Harga) opsional via BAPANAS_API_KEY — API-nya menolak akses
// dari luar Indonesia tanpa key resmi.
// ============================================================

import { BAPPEBTI_URL, BAPPEBTI_ANCHORS } from './config';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const MODAL_ENDPOINT =
  'https://infoharga.bappebti.go.id/harga_komoditi_petani/getDataTableKomoditiPetaniForModal';

export interface FetchResult {
  prices: Record<string, number>;
  fetchedAt: string;
  source: 'bappebti' | 'bapanas' | 'none';
  errors: string[];
}

// Parse "Harga Saat Ini : Rp. 125.000,00,-" → 125000
function parseHargaSaatIni(valuePercentage: string): number | null {
  const m = valuePercentage.match(/Harga Saat Ini[^<]*<span[^>]*>\s*Rp\.?\s*([\d.,]+)/i);
  if (!m) return null;
  const cleaned = m[1].replace(/\./g, '').replace(',', '.');
  const val = parseFloat(cleaned);
  return Number.isFinite(val) ? val : null;
}

async function fetchAnchor(key: string): Promise<{ price: number | null; error?: string }> {
  const [kode, wilayah] = key.split('_');
  try {
    const res = await fetch(MODAL_ENDPOINT, {
      method: 'POST',
      headers: {
        'User-Agent': UA,
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        Referer: BAPPEBTI_URL,
      },
      body: new URLSearchParams({ k: kode, w: wilayah }).toString(),
      signal: AbortSignal.timeout(20000),
      cache: 'no-store',
    });
    if (!res.ok) return { price: null, error: `HTTP ${res.status}` };
    const json = (await res.json()) as {
      data_table_petani?: { value_percentage?: string };
    };
    const html = json?.data_table_petani?.value_percentage ?? '';
    const price = parseHargaSaatIni(html);
    if (!price) return { price: null, error: 'format respons tidak dikenali' };

    // Validasi range anti data-stub (mis. [[1,5]] atau harga nol)
    const cfg = BAPPEBTI_ANCHORS[key];
    if (cfg && (price < cfg.validMin || price > cfg.validMax)) {
      return { price: null, error: `di luar range wajar (${price})` };
    }
    return { price };
  } catch (e) {
    return { price: null, error: e instanceof Error ? e.message : 'gagal fetch' };
  }
}

export async function fetchBappebti(): Promise<FetchResult> {
  const errors: string[] = [];
  const keys = Object.keys(BAPPEBTI_ANCHORS);
  const results = await Promise.all(keys.map((k) => fetchAnchor(k)));

  const prices: Record<string, number> = {};
  keys.forEach((k, i) => {
    const { price, error } = results[i];
    if (price) prices[k] = price;
    else if (error) errors.push(`${k}: ${error}`);
  });

  return {
    prices,
    fetchedAt: new Date().toISOString(),
    source: Object.keys(prices).length ? 'bappebti' : 'none',
    errors,
  };
}

// Opsional: Bapanas Panel Harga API v2 — hanya aktif jika BAPANAS_API_KEY di-set.
export async function fetchBapanas(apiKey: string): Promise<FetchResult> {
  const errors: string[] = [];
  try {
    const res = await fetch('https://api-panelhargav2.badanpangan.go.id/api/front/harga-pangan-informasi', {
      headers: { Accept: 'application/json', 'x-api-key': apiKey },
      signal: AbortSignal.timeout(20000),
      cache: 'no-store',
    });
    if (!res.ok) {
      return { prices: {}, fetchedAt: new Date().toISOString(), source: 'none', errors: [`bapanas HTTP ${res.status}`] };
    }
    const json = (await res.json()) as { data?: Array<{ nama?: string; harga?: number | string }> };
    const prices: Record<string, number> = {};
    for (const item of json.data ?? []) {
      if (!item?.nama) continue;
      if (/cabai\s+merah\s+keriting/i.test(item.nama)) {
        const h = typeof item.harga === 'string' ? parseFloat(item.harga) : item.harga;
        if (h && h > 0) prices.BAPANAS_CMRK = h; // harga per kg (rata-rata nasional)
      }
    }
    return {
      prices,
      fetchedAt: new Date().toISOString(),
      source: Object.keys(prices).length ? 'bapanas' : 'none',
      errors,
    };
  } catch (e) {
    return {
      prices: {},
      fetchedAt: new Date().toISOString(),
      source: 'none',
      errors: [`bapanas: ${e instanceof Error ? e.message : 'gagal fetch'}`],
    };
  }
}
