import { NextResponse } from 'next/server';
import { getPriceSnapshot } from '@/lib/price-sync/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/prices → snapshot harga live semua produk ter-mapping.
// Dipakai client untuk hydration harga setelah render SSR.
export async function GET() {
  try {
    const snapshot = await getPriceSnapshot(false, 'api');
    return NextResponse.json(
      { status: 'ok', ...snapshot },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (e) {
    return NextResponse.json(
      { status: 'error', message: e instanceof Error ? e.message : 'gagal memuat harga' },
      { status: 500 }
    );
  }
}
