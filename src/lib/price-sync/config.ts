// ============================================================
// KONFIGURASI AUTO-SYNC HARGA
// Sumber resmi:
//  1. Bappebti — Harga Komoditi di Tingkat Petani (server-rendered, update harian)
//     https://infoharga.bappebti.go.id/harga_komoditi_petani/
//  2. Badan Pangan Nasional — Panel Harga Pangan API v2 (opsional, butuh BAPANAS_API_KEY)
//     https://panelharga.badanpangan.go.id/
//
// Metode: anchor-index. Harga produk = harga baseline produk × (harga anchor
// terkini ÷ harga anchor baseline). Jadi kalau harga karet petani naik 10%,
// harga produk turunan ikut naik 10% — proporsional terhadap pasar resmi.
// ============================================================

export const BAPPEBTI_URL =
  'https://infoharga.bappebti.go.id/harga_komoditi_petani/?wilayah=&komoditi=';

// "Harga Saat Ini" resmi dari endpoint modal Bappebti (POST getDataTableKomoditiPetaniForModal),
// diambil 24 Sep 2026 sebagai baseline. validMin/validMax = penjaga anti data-stub.
export const BAPPEBTI_ANCHORS: Record<
  string,
  { label: string; baselinePrice: number; validMin: number; validMax: number }
> = {
  K0019_SBG: { label: 'Kopi Special (Arabika) - Subang', baselinePrice: 125000, validMin: 50000, validMax: 500000 },
  K0006_SBG: { label: 'Kopi Robusta - Subang', baselinePrice: 87000, validMin: 30000, validMax: 300000 },
  K0027_GPK: { label: 'Kelapa Sawit (TBS) - Sumsel', baselinePrice: 3851, validMin: 500, validMax: 20000 },
  K2021_KSG: { label: 'Karet Bokar - Kuantan Singingi', baselinePrice: 15295, validMin: 3000, validMax: 60000 },
  K023_BGK: { label: 'Lada Putih - Bangka', baselinePrice: 146000, validMin: 50000, validMax: 400000 },
};

// Mapping produk → anchor. `ratio` = konversi satuan produk terhadap harga anchor
// per kg (mis. produk 500g → 0.5). Produk tanpa anchor resmi = MANUAL (tidak
// disentuh otomatis; review manual berkala).
export const PRODUCT_ANCHORS: Record<
  string,
  { anchor: keyof typeof BAPPEBTI_ANCHORS; ratio: number; note?: string }
> = {
  'kopi-mandheling-grade1': { anchor: 'K0019_SBG', ratio: 0.5, note: 'proxy kopi arabika' },
  'kopi-lanang-gayo': { anchor: 'K0019_SBG', ratio: 0.5, note: 'proxy kopi arabika' },
  'lada-hitam-toba': { anchor: 'K023_BGK', ratio: 0.25, note: 'proxy lada putih Bangka' },
  'minyak-sawit-mentah': { anchor: 'K0027_GPK', ratio: 1, note: 'proxy TBS tingkat petani' },
  'karet-remah-sumbawa': { anchor: 'K2021_KSG', ratio: 1, note: 'karet bokar ≈ remah' },
};

// Mapping opsional via Bapanas (jika BAPANAS_API_KEY tersedia).
// Pencocokan berdasarkan nama komoditas pada respons API.
export const BAPANAS_MATCHERS: Record<string, RegExp> = {
  'cabe-merah-keriting': /cabai\s+merah\s+keriting/i,
};

// Baseline harga produk (per data.ts per 24 Sep 2026) — dipakai untuk hitung
// perubahan % dan fallback API saat sumber resmi tidak dapat dihubungi.
export const PRODUCT_BASELINE: Record<string, number> = {
  'kopi-mandheling-grade1': 130000,
  'lada-hitam-toba': 37500,
  'kopi-lanang-gayo': 145000,
  'minyak-sawit-mentah': 14500,
  'karet-remah-sumbawa': 21000,
  'cabe-merah-keriting': 55000,
};

export const MANUAL_ONLY_SLUGS = Object.keys(PRODUCT_BASELINE).filter(
  (slug) => !PRODUCT_ANCHORS[slug]
);

// Ambang drift untuk menulis ulang data.ts via `npm run sync:prices`.
export const DRIFT_THRESHOLD_PCT = 5;

export function computeOverride(
  productSlug: string,
  anchorPrices: Record<string, number>
): { price: number; source: string } | null {
  const mapping = PRODUCT_ANCHORS[productSlug];
  if (!mapping) return null;
  const cfg = BAPPEBTI_ANCHORS[mapping.anchor];
  const current = anchorPrices[mapping.anchor];
  if (!cfg || !current || cfg.baselinePrice <= 0) return null;
  const baseline = PRODUCT_BASELINE[productSlug];
  if (!baseline) return null;
  const price = Math.round((baseline * (current / cfg.baselinePrice)) / 500) * 500;
  return { price, source: 'bappebti' };
}
