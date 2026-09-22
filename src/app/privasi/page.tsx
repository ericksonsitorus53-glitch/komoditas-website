import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | KomoditasSumut',
  description: 'Kebijakan privasi KomoditasSumut: bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pengguna platform.',
  alternates: { canonical: 'https://komoditas-sumut.vercel.app/privasi' },
};

const sections = [
  {
    title: '1. Data yang Kami Kumpulkan',
    content: 'Kami mengumpulkan data yang Anda berikan saat registrasi (nama, email, nomor WhatsApp, foto profil), data aktivitas di platform (produk yang dilihat, transaksi), serta data teknis seperti alamat IP dan jenis perangkat untuk keamanan.',
  },
  {
    title: '2. Penggunaan Data',
    content: 'Data digunakan untuk: menjalankan layanan marketplace (menghubungkan pembeli dan penjual), verifikasi akun penjual, komunikasi terkait transaksi, peningkatan fitur, dan kepatuhan hukum. Kami tidak menjual data pribadi Anda kepada pihak ketiga.',
  },
  {
    title: '3. Login melalui Pihak Ketiga',
    content: 'Bila Anda login menggunakan Google atau GitHub, kami hanya menerima informasi dasar (nama, email, foto profil) sesuai izin yang Anda setujui pada layar otorisasi mereka.',
  },
  {
    title: '4. Penyimpanan & Keamanan',
    content: 'Data disimpan pada infrastruktur cloud yang terenkripsi (Vercel & Neon Postgres). Kami menerapkan kontrol akses ketat dan mengenkripsi kredensial sensitif. Meski demikian, tidak ada sistem yang 100% aman — gunakan password yang kuat dan unik.',
  },
  {
    title: '5. Berbagi Data',
    content: 'Data kontak penjual hanya dibagikan kepada pembeli yang bertransaksi dengan Anda, dan sebaliknya. Data dapat diungkap bila diwajibkan oleh hukum yang berlaku di Indonesia.',
  },
  {
    title: '6. Hak Anda',
    content: 'Anda berhak mengakses, memperbaiki, atau menghapus data pribadi Anda melalui halaman Profil, atau dengan menghubungi kami. Menghapus akun akan menghapus data profil, meski catatan transaksi tetap disimpan sesuai kewajiban hukum.',
  },
  {
    title: '7. Perubahan Kebijakan',
    content: 'Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan material akan diumumkan melalui platform atau email. Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan.',
  },
];

export default function PrivasiPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Kebijakan Privasi</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Bagaimana kami melindungi data dan privasi Anda
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-sm text-gray-500">Terakhir diperbarui: 22 September 2026</p>
          {sections.map((s) => (
            <div key={s.title} className="card p-6">
              <h2 className="font-display font-bold text-gray-900 mb-2">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
