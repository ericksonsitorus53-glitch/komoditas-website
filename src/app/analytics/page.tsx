'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart3, Activity, ArrowDownRight, ArrowUpRight, DollarSign,
  Package, RefreshCw, TrendingUp, Users
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

// ============================================================
// Semua angka di dashboard ini dihitung dari penjualan nyata
// (catatan "Tandai Sudah Terjual"). Tidak ada data hoax:
// semuanya mulai dari 0 dan bertambah otomatis setiap penjualan.
// ============================================================

const PERIOD_OPTIONS = [
  { value: '7days', label: '7 Hari Terakhir' },
  { value: '30days', label: '30 Hari Terakhir' },
  { value: '3months', label: '3 Bulan Terakhir' },
  { value: '6months', label: '6 Bulan Terakhir' },
  { value: '1year', label: '1 Tahun Terakhir' },
];

const PERIOD_LABELS: Record<string, string> = {
  '7days': '7 hari terakhir',
  '30days': '30 hari terakhir',
  '3months': '3 bulan terakhir',
  '6months': '6 bulan terakhir',
  '1year': '1 tahun terakhir',
};

const PIE_COLORS = ['#8B4513', '#FF8C00', '#D2691E', '#FF6347', '#4682B4', '#228B22', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

const SHORT_CATEGORY: Record<string, string> = {
  'Rempah & Bumbu': 'Rempah',
  'Kopi & Teh': 'Kopi & Teh',
  'Buah-buahan': 'Buah',
  'Ikan & Perikanan': 'Ikan',
  'Makanan Kesehatan': 'Herbal',
  'Lada & Merica': 'Lada',
  'Kelapa Sawit': 'Sawit',
  'Karet & Perkebunan': 'Karet',
};

interface StatsSummary {
  revenue: number;
  transactions: number;
  productsSold: number;
  activeSellers: number;
}

interface AnalyticsData {
  period: string;
  totalSales: number;
  stats: StatsSummary;
  prevStats: StatsSummary;
  history: { label: string; transaksi: number; produk: number; revenue: number }[];
  weekTransactions: { label: string; transaksi: number }[];
  categoryBreakdown: { name: string; value: number; revenue: number }[];
  topProducts: { name: string; category: string; sold: number; revenue: number }[];
  topSellers: { name: string; sales: number; units: number; revenue: number }[];
}

const EMPTY_DATA: AnalyticsData = {
  period: '6months',
  totalSales: 0,
  stats: { revenue: 0, transactions: 0, productsSold: 0, activeSellers: 0 },
  prevStats: { revenue: 0, transactions: 0, productsSold: 0, activeSellers: 0 },
  history: [],
  weekTransactions: [],
  categoryBreakdown: [],
  topProducts: [],
  topSellers: [],
};

function formatRupiahCompact(value: number): string {
  const trim = (s: string) => s.replace(/\.0$/, '').replace(',0$', '');
  if (value >= 1_000_000_000) return `Rp ${trim((value / 1_000_000_000).toFixed(1).replace('.', ',') )} M`;
  if (value >= 1_000_000) return `Rp ${trim((value / 1_000_000).toFixed(1).replace('.', ','))} Jt`;
  return `Rp ${value.toLocaleString('id-ID')}`;
}

function formatRupiahFull(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

function formatNumber(value: number): string {
  return value.toLocaleString('id-ID');
}

function shortCategory(name: string): string {
  if (SHORT_CATEGORY[name]) return SHORT_CATEGORY[name];
  return name.length > 12 ? name.slice(0, 12) : name;
}

const MONEY_KEYS = new Set(['revenue', 'harga']);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {MONEY_KEYS.has(entry.dataKey) ? formatRupiahCompact(entry.value) : formatNumber(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChangeBadge = ({ current, previous }: { current: number; previous: number }) => {
  if (current === 0 && previous === 0) {
    return (
      <div className="mt-2">
        <span className="text-xs text-gray-400">Belum ada penjualan — mulai dari 0</span>
      </div>
    );
  }
  if (previous <= 0) {
    return (
      <div className="flex items-center gap-1 mt-2 text-green-600">
        <ArrowUpRight className="w-4 h-4" />
        <span className="text-sm font-medium">Baru</span>
        <span className="text-xs text-gray-400">vs periode sebelumnya</span>
      </div>
    );
  }
  const pct = ((current - previous) / previous) * 100;
  const positive = pct >= 0;
  return (
    <div className={`flex items-center gap-1 mt-2 ${positive ? 'text-green-600' : 'text-red-600'}`}>
      {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      <span className="text-sm font-medium">{positive ? '+' : ''}{pct.toFixed(1)}%</span>
      <span className="text-xs text-gray-400">vs periode sebelumnya</span>
    </div>
  );
};

const ChartOverlay = ({ show, text }: { show: boolean; text: string }) => {
  if (!show) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl z-10">
      <p className="text-sm text-gray-400 text-center max-w-xs px-4 leading-relaxed">{text}</p>
    </div>
  );
};

const PRODUCT_EMOJIS = ['☕', '🐦', '☕', '🍯', '🍊', '🌶️'];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('6months');
  const [activeChart, setActiveChart] = useState<'sales' | 'revenue'>('sales');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (period: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sales?period=${period}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal memuat data');
      const json = await res.json();
      setData(json);
    } catch {
      setData(EMPTY_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(dateRange);
  }, [dateRange, loadData]);

  const periodLabel = PERIOD_LABELS[dateRange] || '6 bulan terakhir';
  const stats = data?.stats || EMPTY_DATA.stats;
  const prevStats = data?.prevStats || EMPTY_DATA.prevStats;
  const history = data?.history || [];
  const weekTransactions = data?.weekTransactions || [];
  const categoryBreakdown = data?.categoryBreakdown || [];
  const topProducts = data?.topProducts || [];
  const topSellers = data?.topSellers || [];

  const totalCategoryVolume = categoryBreakdown.reduce((sum, c) => sum + c.value, 0);
  const avgPrices = categoryBreakdown
    .slice(0, 8)
    .map(c => ({ name: shortCategory(c.name), harga: Math.round(c.revenue / c.value) }));

  const statCards = [
    {
      title: 'Total Pendapatan',
      value: formatRupiahCompact(stats.revenue),
      current: stats.revenue,
      previous: prevStats.revenue,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Total Transaksi',
      value: formatNumber(stats.transactions),
      current: stats.transactions,
      previous: prevStats.transactions,
      icon: Activity,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Produk Terjual',
      value: formatNumber(stats.productsSold),
      current: stats.productsSold,
      previous: prevStats.productsSold,
      icon: Package,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Penjual Aktif',
      value: formatNumber(stats.activeSellers),
      current: stats.activeSellers,
      previous: prevStats.activeSellers,
      icon: Users,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-forest-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Analitik</h1>
                <p className="text-sm text-gray-500">Data real dari penjualan tercatat — semuanya mulai dari Rp 0</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {PERIOD_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                onClick={() => loadData(dateRange)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm text-gray-600"
                title="Muat ulang data"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Muat Ulang</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!data ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat) => (
                <div key={stat.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <ChangeBadge current={stat.current} previous={stat.previous} />
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Sales / Revenue Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-800">Pendapatan & Penjualan</h3>
                    <p className="text-sm text-gray-500">{periodLabel}</p>
                  </div>
                  <div className="flex gap-2">
                    {(['sales', 'revenue'] as const).map((chart) => (
                      <button
                        key={chart}
                        onClick={() => setActiveChart(chart)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          activeChart === chart
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}>
                        {chart === 'sales' ? 'Penjualan' : 'Pendapatan'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-[300px] relative">
                  {activeChart === 'sales' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={history}>
                        <defs>
                          <linearGradient id="colorProduk" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="label" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="produk" name="Produk Terjual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProduk)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={history}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="label" stroke="#9ca3af" fontSize={12} />
                        <YAxis
                          stroke="#9ca3af"
                          fontSize={12}
                          tickFormatter={(v: number) =>
                            v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}jt` : v >= 1000 ? `${Math.round(v / 1000)}rb` : `${v}`
                          }
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="revenue" name="Pendapatan" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  <ChartOverlay
                    show={stats.transactions === 0}
                    text="Belum ada penjualan pada periode ini. Grafik mulai dari 0 dan otomatis terisi setiap penjualan tercatat."
                  />
                </div>
              </div>

              {/* Commodity Distribution Pie */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800">Distribusi Komoditas</h3>
                  <p className="text-sm text-gray-500">Berdasarkan volume penjualan real ({periodLabel})</p>
                </div>
                {categoryBreakdown.length === 0 ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-sm text-gray-400 text-center max-w-xs leading-relaxed">
                      Belum ada data komoditas terjual pada periode ini.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                          >
                            {categoryBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `${formatNumber(value)} unit`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                      {categoryBreakdown.map((item, index) => {
                        const pct = totalCategoryVolume > 0 ? (item.value / totalCategoryVolume) * 100 : 0;
                        return (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></div>
                              <span className="text-sm text-gray-600">{item.name}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-800">{pct.toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Average price per unit */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800">Harga Rata-rata Komoditas</h3>
                  <p className="text-sm text-gray-500">Rata-rata harga jual per unit ({periodLabel})</p>
                </div>
                <div className="h-[280px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={avgPrices} layout="vertical" margin={{ left: 8, right: 24 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                      <XAxis
                        type="number"
                        stroke="#9ca3af"
                        fontSize={11}
                        tickFormatter={(v: number) =>
                          v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}jt` : v >= 1000 ? `${Math.round(v / 1000)}rb` : `${v}`
                        }
                      />
                      <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={11} width={80} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                      <Bar dataKey="harga" name="Harga Rata-rata" fill="#D2691E" radius={[0, 4, 4, 0]} barSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                  <ChartOverlay
                    show={categoryBreakdown.length === 0}
                    text="Belum ada penjualan pada periode ini."
                  />
                </div>
              </div>

              {/* Daily Transactions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800">Transaksi Harian</h3>
                  <p className="text-sm text-gray-500">Jumlah transaksi 7 hari terakhir</p>
                </div>
                <div className="h-[280px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weekTransactions}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="label" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                      <Bar dataKey="transaksi" name="Transaksi" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <ChartOverlay
                    show={weekTransactions.every(d => d.transaksi === 0)}
                    text="Belum ada transaksi dalam 7 hari terakhir."
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Top Products */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-800">Produk Terlaris</h3>
                    <p className="text-sm text-gray-500">Berdasarkan penjualan real ({periodLabel})</p>
                  </div>
                </div>
                {topProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-3 block">📦</span>
                    <p className="text-sm text-gray-400">Belum ada produk terjual pada periode ini.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                          <th className="pb-3 font-medium">Produk</th>
                          <th className="pb-3 font-medium">Terjual</th>
                          <th className="pb-3 font-medium">Pendapatan</th>
                          <th className="pb-3 font-medium">Kategori</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {topProducts.map((product, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-forest-100 rounded-lg flex items-center justify-center text-lg">
                                  {PRODUCT_EMOJIS[i % PRODUCT_EMOJIS.length]}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-800">{product.name}</div>
                                  <div className="text-xs text-gray-500">#{i + 1} Terlaris</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <span className="font-medium text-gray-800">{formatNumber(product.sold)}</span>
                              <span className="text-gray-500 text-sm ml-1">unit</span>
                            </td>
                            <td className="py-4">
                              <span className="font-medium text-gray-800">{formatRupiahCompact(product.revenue)}</span>
                            </td>
                            <td className="py-4">
                              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                {product.category}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Top Sellers */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    Penjual Teraktif
                  </h3>
                  <p className="text-sm text-gray-500">Berdasarkan pendapatan real ({periodLabel})</p>
                </div>
                {topSellers.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-3 block">🏪</span>
                    <p className="text-sm text-gray-400">Belum ada penjualan pada periode ini.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topSellers.map((seller, i) => {
                      const maxRevenue = topSellers[0].revenue || 1;
                      const width = Math.max((seller.revenue / maxRevenue) * 100, 2);
                      return (
                        <div key={seller.name + i} className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-forest-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                                {seller.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-800 text-sm truncate">{seller.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-primary-600 whitespace-nowrap">
                              {formatRupiahCompact(seller.revenue)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-400 to-forest-500 rounded-full transition-all duration-500"
                              style={{ width: `${width}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                            <span>{formatNumber(seller.sales)} transaksi</span>
                            <span>{formatNumber(seller.units)} unit terjual</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
