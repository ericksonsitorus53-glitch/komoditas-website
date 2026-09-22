import Link from 'next/link';
import { Crown, Medal, TrendingUp, Star, Package, Store } from 'lucide-react';
import type { Metadata } from 'next';
import { products } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Leaderboard Penjual Terbaik | KomoditasSumut',
  description: 'Peringkat penjual, petani, dan distributor terbaik di KomoditasSumut berdasarkan jumlah produk, variasi komoditas, dan kepercayaan pembeli.',
  keywords: ['leaderboard penjual', 'penjual terbaik', 'petani terpercaya sumut'],
  alternates: { canonical: 'https://komoditas-sumut.vercel.app/leaderboard' },
};

interface SellerEntry {
  sellerId: string;
  seller: string;
  productCount: number;
  categories: string[];
  origins: string[];
  organicCount: number;
  avgStock: number;
}

function buildLeaderboard(): SellerEntry[] {
  const map = new Map<string, SellerEntry>();
  for (const p of products) {
    const entry = map.get(p.sellerId) ?? {
      sellerId: p.sellerId, seller: p.seller, productCount: 0,
      categories: [], origins: [], organicCount: 0, avgStock: 0,
    };
    entry.productCount += 1;
    if (!entry.categories.includes(p.category)) entry.categories.push(p.category);
    if (!entry.origins.includes(p.origin)) entry.origins.push(p.origin);
    if (p.isOrganic) entry.organicCount += 1;
    entry.avgStock += p.stock;
    map.set(p.sellerId, entry);
  }
  return Array.from(map.values())
    .map((e) => ({ ...e, avgStock: Math.round(e.avgStock / e.productCount) }))
    .sort((a, b) => b.productCount - a.productCount || b.organicCount - a.organicCount);
}

export default function LeaderboardPage() {
  const entries = buildLeaderboard();
  const rankIcon = (i: number) => {
    if (i === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (i === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (i === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center text-sm font-bold text-gray-500">{i + 1}</span>;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Leaderboard Penjual</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Penjual, petani, dan distributor paling aktif di KomoditasSumut
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {entries.map((entry, i) => (
            <div key={entry.sellerId} className="card flex items-center gap-4 p-5">
              <div className="flex-shrink-0 w-8 flex justify-center">{rankIcon(i)}</div>
              <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
                <Store className="w-6 h-6 text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display font-bold text-gray-900">{entry.seller}</h2>
                <p className="text-sm text-gray-500 truncate">{entry.categories.join(' · ')}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-gray-900 flex items-center gap-1"><Package className="w-4 h-4 text-primary-500" />{entry.productCount}</div>
                  <div className="text-xs text-gray-500">Produk</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900 flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{entry.organicCount}</div>
                  <div className="text-xs text-gray-500">Organik</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900 flex items-center gap-1"><TrendingUp className="w-4 h-4 text-green-500" />{entry.origins.length}</div>
                  <div className="text-xs text-gray-500">Wilayah</div>
                </div>
              </div>
              <Link href="/produk" className="btn-primary text-sm px-4 py-2 flex-shrink-0">Lihat Produk</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
