import { Briefcase, MapPin, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Karir | KomoditasSumut',
  description: 'Bergabunglah dengan tim KomoditasSumut. Lihat posisi terbuka di bidang teknologi, operasional, dan kemitraan petani.',
  keywords: ['lowongan kerja', 'karir komoditas sumut', 'loker medan'],
  alternates: { canonical: 'https://komoditas-sumut.vercel.app/karir' },
};

const positions = [
  {
    title: 'Full-Stack Developer (Next.js)',
    type: 'Full-time · Remote',
    location: 'Medan / Remote',
    desc: 'Membangun fitur marketplace: keranjang, pembayaran, dashboard penjual. Familiar dengan Next.js, TypeScript, dan PostgreSQL.',
  },
  {
    title: 'Partnership Officer (Kemitraan Petani)',
    type: 'Full-time · On-site',
    location: 'Sumatera Utara',
    desc: 'Menjalin kemitraan dengan petani dan kelompok tani di berbagai kabupaten/kota, membantu onboarding dan pendampingan produk.',
  },
  {
    title: 'Content & SEO Specialist',
    type: 'Part-time · Remote',
    location: 'Remote',
    desc: 'Menulis artikel edukasi & analisis pasar komoditas, mengoptimalkan SEO untuk menjangkau lebih banyak petani dan pembeli.',
  },
  {
    title: 'Operations & Logistics Staff',
    type: 'Full-time · On-site',
    location: 'Medan',
    desc: 'Mengoordinasikan pengiriman komoditas, quality control saat packing, dan koordinasi dengan mitra ekspedisi.',
  },
];

export default function KarirPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Karir di KomoditasSumut</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Bangun masa depan agribisnis digital Sumatera Utara bersama kami
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {positions.map((job) => (
            <div key={job.title} className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-primary-500" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-gray-900">{job.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed">{job.desc}</p>
              <a href="mailto:karir@komoditassumut.id" className="btn-primary inline-block mt-4 text-sm px-5 py-2">Lamar Sekarang</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
