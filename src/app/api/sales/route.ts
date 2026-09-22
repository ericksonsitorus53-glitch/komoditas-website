import { NextRequest, NextResponse } from 'next/server';
import {
  recordSale,
  getSalesBySeller,
  getAchievementsBySeller,
  getSellerStats,
  getPlatformAnalytics,
  ANALYTICS_PERIODS,
  type AnalyticsPeriod,
} from '@/lib/achievements';

// These handlers always read/write the database, so never statically optimize them.
export const dynamic = 'force-dynamic';

export const runtime = 'nodejs';

// POST /api/sales - Record a new sale
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sellerEmail,
      sellerName,
      productId,
      productName,
      productSlug,
      category,
      price,
      quantity,
      buyerName,
      buyerLocation,
    } = body;

    // Validate required fields
    if (!sellerEmail || !sellerName || !productId || !productName || !price || !quantity) {
      return NextResponse.json(
        { error: 'Data penjualan tidak lengkap.' },
        { status: 400 }
      );
    }

    if (price <= 0 || quantity <= 0) {
      return NextResponse.json(
        { error: 'Harga dan jumlah harus lebih dari 0.' },
        { status: 400 }
      );
    }

    const { sale, newAchievements } = await recordSale({
      sellerEmail,
      sellerName,
      productId,
      productName,
      productSlug: productSlug || '',
      category: category || 'Umum',
      price: Number(price),
      quantity: Number(quantity),
      buyerName: buyerName || 'Pembeli',
      buyerLocation: buyerLocation || '',
    });

    return NextResponse.json({
      message: 'Penjualan berhasil dicatat!',
      sale,
      newAchievements,
      stats: await getSellerStats(sellerEmail),
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

// GET /api/sales
//   ?email=xxx       -> seller sales & stats
//   ?period=6months  -> real platform analytics for the dashboard (defaults to 6months)
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  const periodParam = request.nextUrl.searchParams.get('period');

  const noStore = { 'Cache-Control': 'no-store' };

  if (!email) {
    const period: AnalyticsPeriod =
      periodParam && (ANALYTICS_PERIODS as string[]).includes(periodParam)
        ? (periodParam as AnalyticsPeriod)
        : '6months';

    const analytics = await getPlatformAnalytics(period);
    return NextResponse.json(analytics, { headers: noStore });
  }

  const stats = await getSellerStats(email);
  return NextResponse.json(stats, { headers: noStore });
}
