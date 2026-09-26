import { NextRequest, NextResponse } from 'next/server';
import { getPriceSnapshot, getCachedSnapshot } from '@/lib/price-sync/cache';
import { getSyncLogs } from '@/lib/price-sync/history';
import { isAuthorized } from '@/lib/price-sync/admin';
import { BAPPEBTI_ANCHORS, PRODUCT_BASELINE, PRODUCT_ANCHORS } from '@/lib/price-sync/config';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json(
    { status: 'error', message: 'Unauthorized — kirim header Authorization Bearer <ADMIN_DASHBOARD_SECRET>' },
    { status: 401 }
  );
}

// GET /api/admin/price-status (header Authorization: Bearer <ADMIN_DASHBOARD_SECRET>)
// → status anchor, harga live produk, log sinkronisasi terakhir.
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();

  const cached = getCachedSnapshot();
  const snapshot = cached ?? (await getPriceSnapshot(false, 'cold-start'));

  const anchors = Object.entries(BAPPEBTI_ANCHORS).map(([key, cfg]) => {
    const current = snapshot.anchors[key];
    const driftPct =
      current && cfg.baselinePrice > 0
        ? Math.round(((current - cfg.baselinePrice) / cfg.baselinePrice) * 1000) / 10
        : null;
    return {
      key,
      label: cfg.label,
      baselinePrice: cfg.baselinePrice,
      currentPrice: current ?? null,
      driftPct,
      range: [cfg.validMin, cfg.validMax],
      ok: current !== undefined,
    };
  });

  const products = Object.entries(PRODUCT_BASELINE).map(([slug, baseline]) => {
    const live = snapshot.prices[slug];
    return {
      slug,
      baseline,
      livePrice: live?.livePrice ?? null,
      changePct: live?.changePct ?? null,
      mapped: !!PRODUCT_ANCHORS[slug],
      source: live?.source ?? null,
    };
  });

  return NextResponse.json({
    status: 'ok',
    cache: {
      warm: !!cached,
      fetchedAt: snapshot.fetchedAt,
      source: snapshot.source,
      errors: snapshot.errors,
    },
    anchors,
    products,
    logs: getSyncLogs().slice(0, 25),
    bapanasConfigured: !!process.env.BAPANAS_API_KEY,
  });
}

// POST = jalankan sync manual (force refresh)
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();

  const snapshot = await getPriceSnapshot(true, 'manual');
  return NextResponse.json({
    status: 'ok',
    message: `Sync manual selesai: ${Object.keys(snapshot.prices).length} produk dari ${snapshot.source}`,
    fetchedAt: snapshot.fetchedAt,
    source: snapshot.source,
    anchors: snapshot.anchors,
    errors: snapshot.errors,
  });
}
