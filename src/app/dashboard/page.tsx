'use client';

import Link from 'next/link';
import { Package, ShoppingCart, BarChart3, Plus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Kelola toko dan produk Anda</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Empty State */}
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-primary-400" />
          </div>
          <h2 className="text-xl font-display font-bold text-gray-900 mb-3">
            Mulai Berjualan
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Belum ada produk atau pesanan. Tambahkan produk pertama Anda dan mulai jual komoditas Sumatera Utara!
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

        {/* Quick Tips */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="font-display font-bold text-gray-900 mb-6">Cara Memulai</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '1️⃣', title: 'Daftar & Verifikasi', desc: 'Buat akun dan hubungi admin untuk verifikasi toko Anda.' },
              { icon: '2️⃣', title: 'Tambah Produk', desc: 'Tulis nama produk, harga, deskripsi, dan foto.' },
              { icon: '3️⃣', title: 'Mulai Berjualan', desc: 'Pembeli bisa langsung memesan dan menghubungi Anda via WhatsApp.' },
            ].map((step) => (
              <div key={step.title} className="text-center p-6 bg-gray-50 rounded-xl">
                <span className="text-3xl mb-3 block">{step.icon}</span>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
