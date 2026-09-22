import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan Umum | KomoditasSumut',
  description: 'Pertanyaan yang sering diajukan tentang jual beli komoditas Sumatera Utara: cara membeli, keamanan transaksi, pengiriman, dan cara menjadi penjual.',
  keywords: ['faq komoditas sumut', 'cara beli komoditas', 'jual di komoditasumut'],
  alternates: { canonical: 'https://komoditas-sumut.vercel.app/faq' },
};

const faqs = [
  {
    q: 'Bagaimana cara membeli produk di KomoditasSumut?',
    a: 'Pilih produk yang Anda inginkan, atur jumlah, lalu klik "Tambah ke Keranjang" atau "Beli Sekarang". Anda akan diarahkan ke halaman keranjang untuk mereview pesanan, kemudian dapat melanjutkan pembelian melalui WhatsApp penjual untuk konfirmasi stok, harga terbaru, dan pembayaran.',
  },
  {
    q: 'Apakah transaksi di KomoditasSumut aman?',
    a: 'Ya. Semua penjual melalui proses verifikasi identitas. Untuk transaksi bernilai besar, kami menganjurkan penggunaan sistem escrow — dana pembeli ditahan pihak ketiga dan baru diteruskan ke penjual setelah barang diterima dengan baik.',
  },
  {
    q: 'Bagaimana sistem pengirimannya?',
    a: 'Kami melayani pengiriman ke seluruh Indonesia melalui kemitraan dengan ekspedisi terpercaya. Produk perkebunan seperti kopi dan rempah dikirim via kurir reguler, sementara komoditas volume besar (sawit, karet, biomassa) menggunakan ekspedisi kargo. Detail ongkir dikonfirmasi penjual saat checkout.',
  },
  {
    q: 'Bagaimana cara menjadi penjual di KomoditasSumut?',
    a: 'Klik "Daftar" di menu, lengkapi data diri dan nomor WhatsApp, lalu unggah produk Anda beserta foto asli dan spesifikasi. Tim kami memverifikasi dalam 1-2 hari kerja. Panduan lengkap tersedia di halaman Panduan Penjual.',
  },
  {
    q: 'Apakah ada biaya admin atau komisi?',
    a: 'Pendaftaran sebagai penjual gratis tanpa biaya admin. Untuk transaksi yang menggunakan fitur escrow, berlaku biaya layanan kecil yang transparan dan ditampilkan sebelum transaksi dikonfirmasi.',
  },
  {
    q: 'Bagaimana kualitas produk dijamin?',
    a: 'Produk dikirim langsung dari petani dan penjual terverifikasi dengan standar kualitas yang jelas pada deskripsi (grade, kadar air, ukuran). Pembeli dapat melakukan pemeriksaan saat barang tiba, dan mengajukan klaim bila barang tidak sesuai.',
  },
  {
    q: 'Bisakah saya negosiasi harga atau tanya stok dulu?',
    a: 'Tentu. Setiap halaman produk memiliki tombol "Hubungi via WhatsApp" — Anda bisa langsung bertanya soal stok terbaru, harga untuk pembelian volume besar (MOQ), atau sample produk sebelum membeli.',
  },
  {
    q: 'Bagaimana kebijakan pengembalian barang?',
    a: 'Klaim dapat diajukan maksimal 2×24 jam setelah barang diterima bila produk rusak, tidak sesuai deskripsi, atau jumlah kurang. Bukti foto/video wajib dilampirkan. Setelah diverifikasi, pengembalian dana atau pengiriman ulang akan diproses.',
  },
];

export default function FaqPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Pertanyaan Umum</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Semua yang perlu Anda ketahui tentang jual beli komoditas di KomoditasSumut
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((item, i) => (
            <details key={i} className="card group p-0 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer list-none p-5 font-semibold text-gray-900">
                <span>{item.q}</span>
                <span className="text-primary-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}

          <div className="card mt-8 text-center">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Masih ada pertanyaan?</h2>
            <p className="text-gray-600 mb-4">Tim kami siap membantu Anda setiap hari kerja.</p>
            <a href="/kontak" className="btn-primary inline-block">Hubungi Kami</a>
          </div>
        </div>
      </section>
    </div>
  );
}
