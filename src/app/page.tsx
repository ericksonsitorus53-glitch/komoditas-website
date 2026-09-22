import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Shield, Truck, Leaf, MapPin, Star, Package, Users, Globe } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import StatsSection from '@/components/StatsSection';

const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Elegant Sumatera Utara Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-primary-900 to-forest-800 min-h-[90vh] flex items-center">
        {/* Background Pattern - Ulos/Batak Pattern Inspired */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
          }}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-earth-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3 border border-white/20">
                <span className="w-2.5 h-2.5 bg-earth-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">🏔️ Marketplace Komoditas Sumatera Utara</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                Jual Beli
                <span className="block text-earth-300">Komoditas Bumi</span>
                <span className="block text-primary-300">Sumatera Utara</span>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-primary-100/90 max-w-lg leading-relaxed">
                Dari ladang langsung ke meja Anda. Temukan kopi Mandheling premium, rempah Toba autentik, 
                dan komoditas unggulan lainnya langsung dari petani terpercaya.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/produk" className="group inline-flex items-center px-8 py-4 rounded-2xl bg-earth-500 text-white font-bold text-lg hover:bg-earth-600 transition-all duration-300 shadow-xl shadow-earth-500/30 hover:shadow-2xl hover:shadow-earth-500/40 hover:-translate-y-1">
                  Jelajahi Produk
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/register" className="inline-flex items-center px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all border border-white/30">
                  Daftar Sebagai Penjual
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-earth-300" />
                  <span className="text-sm text-primary-100">Transaksi Aman</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-earth-300" />
                  <span className="text-sm text-primary-100">Pengiriman Seluruh Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-earth-300" />
                  <span className="text-sm text-primary-100">Produk Organik</span>
                </div>
              </div>
            </div>

            {/* Right Content - Featured Categories Grid */}
            <div className="hidden lg:block relative">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Decorative corner */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-earth-400/30 rounded-full blur-xl"></div>
                
                <h3 className="text-white font-display font-bold text-lg mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-earth-300" />
                  Kategori Populer
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {categories.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/produk?kategori=${cat.slug}`}
                      className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30"
                    >
                      <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                      <span className="text-sm font-bold text-white block">{cat.name}</span>
                      <span className="text-xs text-primary-200 block mt-1">{cat.productCount} produk</span>
                    </Link>
                  ))}
                </div>
                
                {/* Stats Bar */}
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary-200 font-medium">Total Produk Tersedia</span>
                    <span className="text-lg font-bold text-earth-300">{products.length}+</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-earth-400 via-primary-400 to-earth-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-primary-200">Siap dikirim ke seluruh Indonesia</span>
                    <span className="text-xs text-earth-300 font-semibold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Kategori Section - Elegant */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-earth-600 font-semibold text-sm uppercase tracking-widest mb-3">Jelajahi</span>
            <h2 className="section-title">Kategori Komoditas</h2>
            <p className="section-subtitle max-w-2xl mx-auto">Temukan komoditas unggulan dari berbagai daerah di Sumatera Utara</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/produk?kategori=${cat.slug}`}
                className="group relative bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-earth-200 transition-all duration-300 hover:shadow-xl hover:shadow-earth-100/50 hover:-translate-y-1 overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-earth-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative">
                  <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                  <h3 className="font-display font-bold text-gray-900 group-hover:text-earth-600 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{cat.productCount} produk</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Elegant */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <span className="inline-block text-earth-600 font-semibold text-sm uppercase tracking-widest mb-3">Terpopuler</span>
              <h2 className="section-title">Produk Unggulan</h2>
              <p className="section-subtitle">Komoditas terlaris dari petani dan penjual terpercaya</p>
            </div>
            <Link href="/produk" className="mt-4 sm:mt-0 group inline-flex items-center gap-2 text-earth-600 font-semibold hover:text-earth-700 transition-colors">
              Lihat Semua Produk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section - Elegant */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-earth-600 font-semibold text-sm uppercase tracking-widest mb-3">Keunggulan</span>
            <h2 className="section-title">Mengapa Memilih Kami?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">Platform terpercaya yang mengutamakan kualitas dan kepuasan pelanggan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Transaksi Aman & Terpercaya',
                description: 'Sistem escrow dan verifikasi penjual yang ketat menjamin keamanan setiap transaksi Anda.',
                color: 'bg-blue-50',
                iconColor: 'text-blue-500',
              },
              {
                icon: Globe,
                title: 'Pengiriman Seluruh Indonesia',
                description: 'Dari Sumatera Utara ke Sabang sampai Merauke. Kemitraan dengan ekspedisi terpercaya.',
                color: 'bg-primary-50',
                iconColor: 'text-primary-500',
              },
              {
                icon: Leaf,
                title: 'Kualitas Terjamin',
                description: 'Produk langsung dari petani dengan standar kualitas yang ketat dan sertifikasi organik.',
                color: 'bg-earth-50',
                iconColor: 'text-earth-500',
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-earth-200 transition-all duration-300 hover:shadow-xl hover:shadow-earth-100/50 hover:-translate-y-1">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial/Social Proof Section */}
      <section className="py-20 bg-gradient-to-br from-forest-900 via-primary-900 to-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-earth-300 font-semibold text-sm uppercase tracking-widest mb-3">Dipercaya Oleh</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Ribuan Petani & Pembeli
          </h2>
          <p className="text-lg text-primary-100/80 max-w-2xl mx-auto mb-12">
            Bergabunglah dengan komunitas petani dan pembeli yang telah merasakan manfaat platform kami
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Petani Aktif', icon: Users },
              { number: '24', label: 'Jenis Komoditas', icon: Package },
              { number: '34', label: 'Kabupaten/Kota', icon: MapPin },
              { number: '4.8', label: 'Rating Platform', icon: Star },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <Icon className="w-7 h-7 text-earth-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-primary-200">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-72 h-72 bg-earth-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-earth-600 font-semibold text-sm uppercase tracking-widest mb-4">Mulai Sekarang</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Mulai Jual Komoditas
            <span className="text-earth-600"> Anda Sekarang</span>
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Daftar sebagai penjual dan jangkau pembeli dari seluruh Indonesia. 
            Gratis tanpa biaya admin!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="group inline-flex items-center px-10 py-5 rounded-2xl bg-earth-500 text-white font-bold text-lg hover:bg-earth-600 transition-all duration-300 shadow-xl shadow-earth-500/30 hover:shadow-2xl hover:-translate-y-1">
              Daftar Gratis Sekarang
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/tentang" className="inline-flex items-center px-10 py-5 rounded-2xl bg-white text-gray-700 font-semibold text-lg border-2 border-gray-200 hover:border-earth-300 hover:bg-earth-50 transition-all duration-300">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
