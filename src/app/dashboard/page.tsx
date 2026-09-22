'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getSellerStats } from '@/lib/achievements';
import {
  Package, TrendingUp, Award, ShoppingBag, DollarSign,
  ChevronRight, Plus, Trophy, Star, ExternalLink
} from 'lucide-react';

interface SellerStats {
  totalSales: number;
  totalRevenue: number;
  totalProductsSold: number;
  uniqueCategories: number;
  totalAchievements: number;
  achievements: {
    id: string;
    type: string;
    title: string;
    description: string;
    icon: string;
    earnedAt: string;
  }[];
  recentSales: {
    id: string;
    productName: string;
    productSlug: string;
    category: string;
    price: number;
    quantity: number;
    totalRevenue: number;
    buyerName: string;
    buyerLocation: string;
    soldAt: string;
  }[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    const email = session.user.email;

    const refresh = () => {
      setStats(getSellerStats(email));
      setLoading(false);
    };
    refresh();

    // Other tabs/components may record sales — stay in sync.
    window.addEventListener('komoditasumut:sales-changed', refresh);
    return () => window.removeEventListener('komoditasumut:sales-changed', refresh);
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🔒</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Silakan Masuk</h1>
          <p className="text-gray-500 mb-6">Anda perlu masuk untuk mengakses dashboard</p>
          <Link href="/login" className="btn-primary">Masuk</Link>
        </div>
      </div>
    );
  }

  const isSeller = (session.user as any)?.role === 'penjual' || (session.user as any)?.role === 'petani';
  const statsData = stats || { totalSales: 0, totalRevenue: 0, totalProductsSold: 0, uniqueCategories: 0, totalAchievements: 0, achievements: [], recentSales: [] };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Selamat datang, {session.user?.name}!
                {isSeller && ' Kelola toko dan pantau pencapaian Anda.'}
              </p>
            </div>
            {isSeller && (
              <a
                href="https://wa.me/6285377018574?text=Halo%2C%20saya%20ingin%20menambahkan%20produk%20baru%20di%20KomoditasSumut"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-4 py-2 text-sm"
              >
                <Plus className="w-4 h-4 mr-1 inline" /> Tambah Produk
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSeller ? (
          /* Non-seller view */
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-primary-400" />
            </div>
            <h2 className="text-xl font-display font-bold text-gray-900 mb-3">
              Mulai Berjualan
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Daftar sebagai penjual atau petani untuk mulai menjual produk komoditas Sumatera Utara.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/produk" className="btn-primary px-6 py-3">
                <Package className="w-5 h-5 mr-2" /> Lihat Katalog
              </Link>
              <a
                href="https://wa.me/6285377018574?text=Halo%2C%20saya%20ingin%20menjual%20produk%20di%20KomoditasSumut"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3"
              >
                <Plus className="w-5 h-5 mr-2" /> Hubungi Admin
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Penjualan', value: statsData.totalSales, icon: ShoppingBag, color: 'primary' },
                { label: 'Total Pendapatan', value: formatPrice(statsData.totalRevenue), icon: DollarSign, color: 'green' },
                { label: 'Produk Terjual', value: statsData.totalProductsSold, icon: Package, color: 'blue' },
                { label: 'Pencapaian', value: statsData.totalAchievements, icon: Award, color: 'amber' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-${color}-50`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                  </div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Achievements - Main Column */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-bold text-lg text-gray-900 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      Pencapaian Penjual
                    </h2>
                    <span className="text-sm text-gray-500">{statsData.totalAchievements} dari 12</span>
                  </div>

                  {statsData.achievements.length > 0 ? (
                    <div className="space-y-3">
                      {statsData.achievements.map((ach) => (
                        <div
                          key={ach.id}
                          className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl"
                        >
                          <span className="text-3xl">{ach.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{ach.title}</h3>
                            <p className="text-sm text-gray-600">{ach.description}</p>
                          </div>
                          <span className="text-xs text-amber-600 font-medium whitespace-nowrap">
                            {formatRelativeDate(ach.earnedAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <span className="text-5xl mb-4 block">🏆</span>
                      <p className="text-gray-500 mb-2">Belum ada pencapaian</p>
                      <p className="text-sm text-gray-400">Mulai berjualan untuk mendapatkan pencapaian pertama!</p>
                    </div>
                  )}

                  {/* All possible achievements (locked) */}
                  {statsData.achievements.length > 0 && statsData.achievements.length < 12 && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-3 font-medium">Pencapaian Terkunci:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { icon: '🎉', title: 'Penjual Pertama', needed: '1 penjualan' },
                          { icon: '⭐', title: 'Penjual Aktif', needed: '5 penjualan' },
                          { icon: '🏆', title: 'Penjual Andal', needed: '10 penjualan' },
                          { icon: '👑', title: 'Top Seller', needed: '25 penjualan' },
                          { icon: '💰', title: 'Pengusaha Muda', needed: 'Pendapatan Rp500rb' },
                          { icon: '💎', title: 'Pengusaha Sukses', needed: 'Pendapatan Rp1jt' },
                          { icon: '🏢', title: 'Pengusaha Ulung', needed: 'Pendapatan Rp5jt' },
                          { icon: '🎯', title: 'Pionir Kategori', needed: '2 kategori' },
                          { icon: '🌈', title: 'Multikategori', needed: '3 kategori' },
                          { icon: '🔥', title: 'Jagoo Semua', needed: '5 kategori' },
                          { icon: '🏅', title: 'Master Penjual', needed: '50 penjualan' },
                          { icon: '🌟', title: 'Legenda Komoditas', needed: '100 penjualan' },
                        ]
                          .filter(a => !statsData.achievements.some(ea => ea.title === a.title))
                          .slice(0, 6)
                          .map((a) => (
                            <div key={a.title} className="p-3 bg-gray-50 border border-gray-200 rounded-xl opacity-60">
                              <span className="text-2xl block mb-1 grayscale">{a.icon}</span>
                              <p className="text-xs font-semibold text-gray-700">{a.title}</p>
                              <p className="text-[10px] text-gray-400">{a.needed}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Sales */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
                  <h2 className="font-display font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    Riwayat Penjualan
                  </h2>

                  {statsData.recentSales.length > 0 ? (
                    <div className="space-y-3">
                      {statsData.recentSales.map((sale) => (
                        <div key={sale.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 text-sm truncate">{sale.productName}</h4>
                              <span className="badge bg-primary-50 text-primary-600 text-[10px]">{sale.category}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Pembeli: {sale.buyerName}
                              {sale.buyerLocation && ` • ${sale.buyerLocation}`}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-green-600 text-sm">{formatPrice(sale.totalRevenue)}</p>
                            <p className="text-[10px] text-gray-400">{sale.quantity} item • {formatRelativeDate(sale.soldAt)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <span className="text-4xl mb-3 block">📦</span>
                      <p className="text-gray-500">Belum ada riwayat penjualan</p>
                      <Link href="/produk" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block">
                        Lihat produk →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-display font-bold text-gray-900 mb-4">Aksi Cepat</h3>
                  <div className="space-y-3">
                    <Link
                      href="/produk"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                    >
                      <Package className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Lihat Katalog</span>
                      <ExternalLink className="w-4 h-4 text-gray-300 ml-auto" />
                    </Link>
                    <a
                      href="https://wa.me/6285377018574?text=Halo%2C%20saya%20ingin%20menambahkan%20produk%20baru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors group"
                    >
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Tambah Produk</span>
                      <ExternalLink className="w-4 h-4 text-gray-300 ml-auto" />
                    </a>
                    <Link
                      href="/profil"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                    >
                      <Star className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Edit Profil</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                    </Link>
                  </div>
                </div>

                {/* Achievement Progress */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                  <div className="text-center">
                    <span className="text-4xl block mb-3">🏆</span>
                    <h3 className="font-display font-bold text-gray-900 mb-2">
                      {statsData.totalAchievements === 0
                        ? 'Mulai Raih Pencapaian!'
                        : statsData.totalAchievements < 3
                        ? 'Terus Semangat!'
                        : statsData.totalAchievements < 6
                        ? 'Kerja Bagus!'
                        : 'Luar Biasa!'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {statsData.totalAchievements === 0
                        ? 'Jual produk pertama Anda untuk membuka pencapaian pertama.'
                        : `Anda sudah mengumpulkan ${statsData.totalAchievements} pencapaian. ${12 - statsData.totalAchievements} lagi untuk menjadi Legenda Komoditas!`}
                    </p>
                    <div className="w-full bg-amber-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((statsData.totalAchievements / 12) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-amber-600 mt-2">{statsData.totalAchievements}/12 pencapaian</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
