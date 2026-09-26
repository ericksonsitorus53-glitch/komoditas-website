import { NextRequest, NextResponse } from 'next/server';
import { getPriceSnapshot } from '@/lib/price-sync/cache';

export const dynamic = 'force-dynamic';

// Dipanggil Vercel Cron harian (07:00 WIB). Juga bisa dipanggil manual:
//   curl -H "Authorization: Bearer $CRON_SECRET" https://komoditas-sumut.vercel.app/api/cron/sync-prices
export async function GET(request: NextRequest) {
  // Vercel Cron mengirim header Authorization: Bearer <CRON_SECRET>
  const auth = request.headers.get('authorization') || '';
  const expected = process.env.CRON_SECRET || '';
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  const snapshot = await getPriceSnapshot(true, 'cron'); // force refresh
  const n = Object.keys(snapshot.prices).length;

  return NextResponse.json({
    status: 'ok',
    message: `Sync selesai: ${n} produk ter-update dari ${snapshot.source}`,
    fetchedAt: snapshot.fetchedAt,
    source: snapshot.source,
    anchors: snapshot.anchors,
    updatedProducts: Object.keys(snapshot.prices),
    errors: snapshot.errors,
  });
}
