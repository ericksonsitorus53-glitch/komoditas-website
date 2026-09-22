import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan | KomoditasSumut',
  description: 'Syarat dan ketentuan penggunaan platform KomoditasSumut untuk pembeli dan penjual komoditas Sumatera Utara.',
  alternates: { canonical: 'https://komoditas-sumut.vercel.app/syarat' },
};

const sections = [
  {
    title: '1. Penerimaan Syarat',
    content: 'Dengan mendaftar atau menggunakan KomoditasSumut, Anda menyetujui syarat & ketentuan ini. Bila tidak setuju dengan salah satu ketentuan, mohon hentikan penggunaan platform.',
  },
  {
    title: '2. Akun Pengguna',
    content: 'Anda wajib memberikan data yang benar saat registrasi dan menjaga kerahasiaan kredensial akun. Akun penjual wajib melalui verifikasi. Kami berhak menangguhkan akun yang melanggar aturan, memberikan informasi palsu, atau melakukan penipuan.',
  },
  {
    title: '3. Aturan Berjualan',
    content: 'Penjual wajib: menampilkan produk yang sesuai deskripsi dan foto asli, menjual produk yang legal dan tidak melanggar hak pihak ketiga, memenuhi pesanan sesuai kesepakatan, serta merespons pembeli dengan sopan dalam waktu wajar.',
  },
  {
    title: '4. Transaksi & Pembayaran',
    content: 'Transaksi dilakukan langsung antara pembeli dan penjual (termasuk via WhatsApp) dengan atau tanpa fitur escrow. KomoditasSumut bukan pihak dalam kontrak jual beli, namun memfasilitasi dan berupaya menengahi sengketa bila diperlukan.',
  },
  {
    title: '5. Klaim & Sengketa',
    content: 'Klaim ketidaksesuaian barang diajukan maksimal 2×24 jam setelah barang diterima beserta bukti foto/video. Kami memfasilitasi mediasi antara kedua belah pihak; keputusan akhir berdasarkan bukti yang diajukan.',
  },
  {
    title: '6. Konten Pengguna',
    content: 'Anda memegang hak atas konten yang Anda unggah dan memberi kami izin untuk menampilkannya di platform. Dilarang mengunggah konten melanggar hukum, menyesatkan, atau melanggar hak cipta pihak lain.',
  },
  {
    title: '7. Batasan Tanggung Jawab',
    content: 'Platform disediakan "sebagaimana adanya". KomoditasSumut tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan, termasuk keterlambatan pengiriman oleh pihak ekspedisi atau kualitas produk di luar deskripsi yang terverifikasi.',
  },
  {
    title: '8. Perubahan Ketentuan',
    content: 'Kami dapat memperbarui syarat & ketentuan ini dari waktu ke waktu. Versi terbaru selalu tersedia di halaman ini.',
  },
];

export default function SyaratPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Syarat &amp; Ketentuan</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Aturan penggunaan platform KomoditasSumut
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
