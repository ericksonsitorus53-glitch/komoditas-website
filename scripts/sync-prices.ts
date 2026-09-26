// ============================================================
// SCRIPT SINKRONISASI HARGA LOKAL (npm run sync:prices)
// Tarik harga resmi → hitung override via anchor-index → tulis ulang price di
// data.ts bila |drift| ≥ DRIFT_THRESHOLD_PCT% terhadap nilai di file.
// Selalu membuat backup data.ts.bak sebelum menulis.
// ============================================================

import * as fs from 'fs';
import * as path from 'path';
import { fetchBappebti, fetchBapanas } from '../src/lib/price-sync/fetchers';
import {
  PRODUCT_BASELINE,
  computeOverride,
  BAPANAS_MATCHERS,
  DRIFT_THRESHOLD_PCT,
} from '../src/lib/price-sync/config';

const DATA_FILE = path.resolve(__dirname, '../src/lib/data.ts');

async function main() {
  console.log('⏳ Mengambil harga dari sumber resmi...');
  const bappebti = await fetchBappebti();
  const anchorPrices: Record<string, number> = { ...bappebti.prices };

  const bapanasKey = process.env.BAPANAS_API_KEY;
  if (bapanasKey) {
    const bapanas = await fetchBapanas(bapanasKey);
    Object.assign(anchorPrices, bapanas.prices);
  }

  const usedAnchors = Object.keys(anchorPrices);
  if (usedAnchors.length === 0) {
    console.error('❌ Tidak ada harga resmi yang berhasil diambil. Coba lagi nanti.');
    console.error(bappebti.errors.join('\n'));
    process.exit(1);
  }
  console.log(`✅ Anchor diperoleh: ${usedAnchors.join(', ')}`);

  const dataTs = fs.readFileSync(DATA_FILE, 'utf8');
  let updated = 0;
  let next = dataTs;

  for (const [slug, baseline] of Object.entries(PRODUCT_BASELINE)) {
    // Bapanas (cabai) dan anchor Bappebti — sama seperti logika cache.ts
    let live: number | null = null;
    if (slug === 'cabe-merah-keriting' && anchorPrices.BAPANAS_CMRK !== undefined) {
      live = Math.round((baseline * (anchorPrices.BAPANAS_CMRK as number) / 55000) / 500) * 500;
    } else {
      const computed = computeOverride(slug, anchorPrices);
      if (computed) live = computed.price;
    }
    if (!live) continue;

    const current = getCurrentPrice(next, slug);
    if (current === null) {
      console.warn(`⚠️  slug ${slug} tidak ditemukan di data.ts — lewati`);
      continue;
    }
    const drift = Math.abs((live - current) / current) * 100;
    if (drift < DRIFT_THRESHOLD_PCT) {
      console.log(`• ${slug}: Rp${current.toLocaleString('id-ID')} (drift ${drift.toFixed(1)}% < ${DRIFT_THRESHOLD_PCT}%) — tetap`);
      continue;
    }
    const re = new RegExp(
      `(slug: '${slug}'[\\s\\S]{0,400}?price: )(\\d+)`,
    );
    if (!re.test(next)) {
      console.warn(`⚠️  pola price untuk ${slug} tidak ditemukan — lewati`);
      continue;
    }
    next = next.replace(re, `$1${live}`);
    console.log(`✏️  ${slug}: Rp${current.toLocaleString('id-ID')} → Rp${live.toLocaleString('id-ID')} (drift ${drift.toFixed(1)}%)`);
    updated++;
  }

  if (updated === 0) {
    console.log('✔ Semua harga masih dalam ambang — data.ts tidak diubah.');
    return;
  }

  fs.copyFileSync(DATA_FILE, DATA_FILE + '.bak');
  fs.writeFileSync(DATA_FILE, next, 'utf8');
  console.log(`💾 ${updated} harga diperbarui di data.ts (backup: data.ts.bak).`);
  console.log('ℹ️  Jalankan ulang build + deploy agar perubahan tampil di produksi.');
}

function getCurrentPrice(source: string, slug: string): number | null {
  const re = new RegExp(`slug: '${slug}'[\\s\\S]{0,400}?price: (\\d+)`);
  const m = source.match(re);
  return m ? parseInt(m[1], 10) : null;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
