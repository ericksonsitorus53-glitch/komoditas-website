'use client';

import { BarChart3, Package, ShoppingCart, Users, TrendingUp, DollarSign, Star, Eye, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const recentOrders = [
  { id: 'ORD-001', buyer: 'Ahmad Fauzi', product: 'Kopi Mandheling Grade 1', amount: 'Rp 370.000', status: 'Selesai', date: '21 Ags 2026' },
  { id: 'ORD-002', buyer: 'Siti Rahayu', product: 'Lada Hitam Toba', amount: 'Rp 190.000', status: 'Dikirim', date: '20 Ags 2026' },
  { id: 'ORD-003', buyer: 'Budi Santoso', product: 'Madu Hutan Toba', amount: 'Rp 150.000', status: 'Diproses', date: '20 Ags 2026' },
  { id: 'ORD-004', buyer: 'Rina Wijaya', product: 'Jeruk Medan Premium', amount: 'Rp 90.000', status: 'Selesai', date: '19 Ags 2026' },
  { id: 'ORD-005', buyer: 'Dedi Kurniawan', product: 'Ikan Mas Bakar Toba', amount: 'Rp 130.000', status: 'Selesai', date: '19 Ags 2026' },
];

const statusColors: Record<string, string> = {
  'Selesai': 'bg-green-100 text-green-700',
  'Dikirim': 'bg-blue-100 text-blue-700',
  'Diproses': 'bg-yellow-100 text-yellow-700',
  'Dibatalkan': 'bg-red-100 text-red-700',
};

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Selamat datang kembali, Toko Kopi Toba! 👋</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge-green">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Online
              </span>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: DollarSign, label: 'Total Pendapatan', value: 'Rp 12.5 Juta', change: '+12.5%', up: true, color: 'bg-primary-50 text-primary-500' },
            { icon: ShoppingCart, label: 'Total Pesanan', value: '48', change: '+8.2%', up: true, color: 'bg-blue-50 text-blue-500' },
            { icon: Package, label: 'Total Produk', value: '12', change: '+2', up: true, color: 'bg-earth-50 text-earth-500' },
            { icon: Eye, label: 'Total Dilihat', value: '2.345', change: '+15.3%', up: true, color: 'bg-purple-50 text-purple-500' },
          ].map(({ icon: Icon, label, value, change, up, color }) => (
            <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${up ? 'text-green-600' : 'text-red-600'}`}>
                  {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-gray-900">Statistik Penjualan</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>7 Hari Terakhir</option>
                <option>30 Hari Terakhir</option>
                <option>3 Bulan Terakhir</option>
              </select>
            </div>
            {/* Simple Chart */}
            <div className="h-64 flex items-end gap-2 px-4">
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => {
                const heights = [40, 65, 50, 80, 70, 90, 60];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-500"
                      style={{ height: `${heights[i]}%` }}
                    ></div>
                    <span className="text-xs text-gray-500">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-gray-900 mb-6">Produk Terlaris</h3>
            <div className="space-y-4">
              {[
                { name: 'Kopi Mandheling', sold: 234, color: 'bg-primary-500' },
                { name: 'Lada Hitam Toba', sold: 189, color: 'bg-earth-500' },
                { name: 'Madu Hutan Toba', sold: 156, color: 'bg-forest-500' },
                { name: 'Jeruk Medan', sold: 134, color: 'bg-blue-500' },
              ].map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-5">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      <span className="text-xs text-gray-500">{product.sold} terjual</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${product.color} rounded-full`} style={{ width: `${(product.sold / 234) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-gray-900">Pesanan Terbaru</h3>
              <button className="text-sm text-primary-600 font-medium hover:text-primary-700">Lihat Semua</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 bg-gray-50">
                  <th className="px-6 py-3">ID Pesanan</th>
                  <th className="px-6 py-3">Pembeli</th>
                  <th className="px-6 py-3">Produk</th>
                  <th className="px-6 py-3">Jumlah</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-primary-600">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.buyer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`badge text-[10px] ${statusColors[order.status]}`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-4">
              {[
                { icon: ShoppingCart, text: 'Pesanan baru dari Ahmad Fauzi', time: '5 menit lalu', color: 'bg-green-100 text-green-600' },
                { icon: Star, text: 'Ulasan baru: ⭐⭐⭐⭐⭐ dari Siti Rahayu', time: '1 jam lalu', color: 'bg-yellow-100 text-yellow-600' },
                { icon: Package, text: 'Produk "Kopi Mandheling" hampir habis (stok: 15)', time: '2 jam lalu', color: 'bg-red-100 text-red-600' },
                { icon: Users, text: '5 pengunjung baru melihat toko Anda', time: '3 jam lalu', color: 'bg-blue-100 text-blue-600' },
              ].map(({ icon: Icon, text, time, color }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{text}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-gray-900 mb-4">Tips Hari Ini</h3>
            <div className="space-y-3">
              {[
                { tip: 'Tambah foto produk yang lebih profesional untuk meningkatkan penjualan.', icon: '📸' },
                { tip: 'Perbarui stok produk secara berkala agar pelanggan tidak kecewa.', icon: '📦' },
                { tip: 'Balas ulasan pelanggan untuk membangun kepercayaan.', icon: '💬' },
                { tip: 'Promosikan produk unggulan di media sosial.', icon: '📱' },
              ].map(({ tip, icon }, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-xl">{icon}</span>
                  <p className="text-sm text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
