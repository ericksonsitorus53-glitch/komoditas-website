import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Truck, Leaf } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import StatsSection from '@/components/StatsSection';

const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-earth-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-40 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">🌱 Platform Komoditas Sumatera Utara</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Jual Beli Komoditas
                <span className="text-earth-300"> Bumi Sumatera Utara</span>
              </h1>
              <p className="text-lg text-primary-100 mt-6 max-w-lg leading-relaxed">
                Marketplace terpercaya yang menghubungkan petani, penjual, dan pembeli. 
                Dari ladang langsung ke meja Anda — kopi Mandheling, rempah Toba, dan komoditas unggulan lainnya.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/produk" className="btn-earth text-base px-8 py-4">
                  Jelajahi Produk <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/register" className="inline-flex items-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all border border-white/20">
                  Daftar Sebagai Penjual
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-5 h-5 text-earth-300" />
                  <span className="text-primary-100">Transaksi Aman & Terpercaya</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-5 h-5 text-earth-300" />
                  <span className="text-primary-100">Pengiriman Seluruh Indonesia</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  {categories.slice(0, 4).map((cat) => (
                    <div key={cat.id} className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all cursor-pointer">
                      <span className="text-3xl mb-2 block">{cat.icon}</span>
                      <span className="text-sm font-semibold text-white">{cat.name}</span>
                      <span className="text-xs text-primary-200 block">{cat.productCount} produk</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-200">Total Produk</span>
                    <span className="text-sm font-bold text-earth-300">{products.length} produk</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-earth-400 to-primary-400 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="text-xs text-primary-200 mt-1">Tersedia untuk dipesan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Kategori Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">Jelajahi Kategori</h2>
              <p className="section-subtitle">Komoditas unggulan dari berbagai daerah di Sumatera Utara</p>
            </div>
            <Link href="/produk" className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/produk?kategori=${cat.slug}`}
                className="card p-6 text-center group hover:border-primary-200"
              >
                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                <h3 className="font-display font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.productCount} produk</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Terpopuler</span>
              </div>
              <h2 className="section-title">Produk Unggulan</h2>
              <p className="section-subtitle">Komoditas terlaris dari petani dan penjual terpercaya</p>
            </div>
            <Link href="/produk" className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Mengapa Memilih Kami?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">Platform terpercaya yang mengutamakan kualitas dan kepuasan pelanggan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Terpercaya & Aman',
                description: 'Setiap transaksi dijamin aman dengan sistem escrow dan verifikasi penjual yang ketat.',
                color: 'bg-blue-50 text-blue-500',
              },
              {
                icon: Truck,
                title: 'Pengiriman Seluruh Indonesia',
                description: 'Dari Sumatera Utara ke seluruh Indonesia. Kemitraan dengan ekspedisi terpercaya.',
                color: 'bg-primary-50 text-primary-500',
              },
              {
                icon: Leaf,
                title: 'Kualitas Terjamin',
                description: 'Produk langsung dari petani dengan standar kualitas yang ketat dan sertifikasi organik.',
                color: 'bg-earth-50 text-earth-500',
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-forest-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Mulai Jual Komoditas Anda Sekarang
          </h2>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Daftar sebagai penjual dan jangkau pembeli dari seluruh Indonesia. 
            Gratis tanpa biaya admin!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/register" className="btn-earth text-base px-8 py-4">
              Daftar Sebagai Penjual <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/tentang" className="inline-flex items-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all border border-white/20">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
