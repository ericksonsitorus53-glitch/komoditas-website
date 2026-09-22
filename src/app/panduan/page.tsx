import Link from 'next/link';
import { Store, Camera, PackageCheck, Rocket } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panduan Penjual & Pembeli | KomoditasSumut',
  description: 'Panduan lengkap berjualan dan membeli komoditas di KomoditasSumut: registrasi, upload produk, transaksi, hingga pengiriman.',
  keywords: ['panduan penjual', 'cara jual komoditas', 'panduan pembeli', 'cara beli komoditas'],
  alternates: { canonical: 'https://komoditas-sumut.vercel.app/panduan' },
};

const steps = [
  {
    icon: Store,
    title: '1. Daftar & Verifikasi',
    desc: 'Klik "Daftar" dan lengkapi data diri atau bisnis Anda. Tim kami memverifikasi identitas dalam 1-2 hari kerja agar pembeli percaya bertransaksi dengan Anda.',
  },
  {
    icon: Camera,
    title: '2. Unggah Produk',
    desc: 'Foto produk asli (bukan dari internet), tulis spesifikasi jelas: grade, kadar air/air content, ukuran, MOQ, dan satuan. Produk dengan spesifikasi lengkap 3× lebih cepat terjual.',
  },
  {
    icon: PackageCheck,
    title: '3. Terima & Proses Pesanan',
    desc: 'Pesanan masuk lewat WhatsApp langsung dari pembeli. Konfirmasi stok & harga terbaru, kesepakati pengiriman, lalu kemas produk dengan aman.',
  },
  {
    icon: Rocket,
    title: '4. Kirim & Dibayar',
    desc: 'Kirim via ekspedisi/kargo sesuai kesepakatan. Gunakan fitur "Tandai Terjual" di dashboard agar statistik penjualan dan pencapaian Anda tercatat otomatis.',
  },
];

const buyerTips = [
  'Periksa spesifikasi produk dan rating penjual sebelum membeli.',
  'Gunakan WhatsApp untuk negosiasi volume besar (MOQ) atau minta sample.',
  'Untuk transaksi bernilai besar, gunakan escrow agar dana aman sampai barang diterima.',
  'Ajukan klaim maksimal 2×24 jam setelah barang tiba bila ada ketidaksesuaian.',
];

export default function PanduanPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Panduan Penjual &amp; Pembeli</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Langkah demi langkah berjualan dan membeli komoditas di KomoditasSumut
          </p>
        </div>
      </section>

      <section className="py-16" id="penjual">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">Cara Berjualan</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div key={step.title} className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="pembeli">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">Tips untuk Pembeli</h2>
          <ul className="space-y-3">
            {buyerTips.map((tip, i) => (
              <li key={i} className="card p-4 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <p className="text-gray-700">{tip}</p>
              </li>
            ))}
          </ul>
          <div className="text-center mt-10">
            <Link href="/register" className="btn-primary inline-block">Mulai Berjualan Gratis</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
