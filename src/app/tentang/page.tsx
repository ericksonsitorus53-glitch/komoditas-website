import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Users, MapPin, Shield, Truck, Award, CheckCircle } from 'lucide-react';

const team = [
  { name: 'Dr. Budi Santoso', role: 'Founder & CEO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Siti Rahayu', role: 'Head of Operations', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Ahmad Fauzi', role: 'CTO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Rina Wijaya', role: 'Head of Marketing', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face' },
];

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
                  { icon: Users, value: '108+', label: 'Member Aktif' },
                  { icon: MapPin, value: '15+', label: 'Kabupaten' },
                  { icon: Award, value: '450+', label: 'Produk' },
                  { icon: Shield, value: '100%', label: 'Terverifikasi' },
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

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Tim Kami</h2>
            <p className="section-subtitle">Orang-orang di balik KomoditasSumut</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map(person => (
              <div key={person.name} className="text-center">
                <img src={person.avatar} alt={person.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg" />
                <h4 className="font-display font-semibold text-gray-900 mt-4">{person.name}</h4>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
            ))}
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
