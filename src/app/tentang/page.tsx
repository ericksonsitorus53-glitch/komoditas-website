import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, MapPin, Shield, Truck, Award, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami - KomoditasSumut',
  description: 'Kenali KomoditasSumut, platform jual beli komoditas terpercaya dari Sumatera Utara. Menghubungkan petani, penjual, dan pembeli langsung.',
  keywords: ['tentang komoditas sumut', 'komoditas sumatera utara', 'marketplace pertanian', 'petani sumut', 'jual beli komoditas'],
  openGraph: {
    title: 'Tentang Kami - KomoditasSumut',
    description: 'Kenali KomoditasSumut, platform jual beli komoditas terpercaya dari Sumatera Utara.',
    url: 'https://komoditas-sumut.vercel.app/tentang',
  },
  alternates: {
    canonical: 'https://komoditas-sumut.vercel.app/tentang',
  },
};


export default function TentangPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Tentang Kami</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Menghubungkan kekayaan alam Sumatera Utara dengan pasar nasional dan internasional
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16" id="cara-kerja">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Misi Kami</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Memberdayakan Petani Sumatera Utara</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                KomoditasSumut hadir sebagai jembatan digital antara petani, penjual, dan pembeli. 
                Kami percaya bahwa kekayaan alam Sumatera Utara — dari kopi Mandheling yang terkenal 
                hingga rempah-rempah khas Danau Toba — layak menjangkau pasar yang lebih luas.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan teknologi modern, kami memudahkan proses jual beli komoditas, 
                memastikan kualitas terjaga, dan memberikan harga yang adil bagi semua pihak.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-earth-500" />
                <span className="text-sm font-semibold text-earth-600 uppercase tracking-wide">Visi Kami</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Platform #1 Komoditas Indonesia</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Menjadi platform terdepan untuk jual beli komoditas Indonesia, 
                mulai dari hulu (petani) hingga hilir (konsumen). 
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { icon: MapPin, value: '8+', label: 'Asal Daerah' },
                  { icon: Award, value: '21+', label: 'Produk' },
                  { icon: Shield, value: '100%', label: 'Kualitas Terjamin' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="p-4 bg-gray-50 rounded-xl text-center">
                    <Icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Cara Kerja</h2>
            <p className="section-subtitle">Tiga langkah sederhana untuk mulai bertransaksi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Daftar & Verifikasi', desc: 'Buat akun gratis dan lengkapi profil Anda. Tim kami akan memverifikasi dalam 1×24 jam.', color: 'from-primary-500 to-primary-600' },
              { step: '02', title: 'Jelajahi & Pilih', desc: 'Telusuri katalog produk dari berbagai daerah di Sumatera Utara. Filter berdasarkan kategori, harga, atau lokasi.', color: 'from-earth-500 to-earth-600' },
              { step: '03', title: 'Transaksi Aman', desc: 'Beli langsung dari petani atau penjual. Pembayaran aman melalui escrow hingga barang sampai.', color: 'from-forest-500 to-forest-600' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="relative">
                <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg`}>
                  {step}
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Nilai-Nilai Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🤝', title: 'Kepercayaan', desc: 'Setiap transaksi dibangun atas dasar kepercayaan dan transparansi.' },
              { icon: '🌱', title: 'Keberlanjutan', desc: 'Mendukung praktik pertanian berkelanjutan dan ramah lingkungan.' },
              { icon: '⭐', title: 'Kualitas', desc: 'Hanya produk berkualitas tinggi yang masuk ke platform kami.' },
              { icon: '💡', title: 'Inovasi', desc: 'Teknologi modern untuk pengalaman jual beli terbaik.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{icon}</span>
                <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Kantor Kami</h2>
            <p className="section-subtitle">Kunjungi atau hubungi kami langsung</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Alamat</h3>
              <p className="text-gray-600">Jl. Pelita 1 No. 26<br />Medan Perjuangan, Sumatera Utara</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">WhatsApp</h3>
              <a href="https://wa.me/6285377018574" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:text-green-700 transition-colors">+62 853-7701-8574</a>
              <p className="text-sm text-gray-500 mt-1">Klik untuk chat langsung</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-forest-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-4">Siap Bergabung?</h2>
          <p className="text-primary-100 mb-8">Bergabung dengan komunitas petani dan penjual terpercaya di Sumatera Utara.</p>
          <Link href="/register" className="btn-earth text-base px-8 py-4">
            Daftar Sekarang <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
