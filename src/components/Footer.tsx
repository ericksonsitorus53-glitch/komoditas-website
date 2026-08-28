import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';

const footerLinks = {
  produk: [
    { label: 'Semua Produk', href: '/produk' },
    { label: 'Kopi & Teh', href: '/produk?kategori=kopi-teh' },
    { label: 'Rempah & Bumbu', href: '/produk?kategori=rempah-bumbu' },
    { label: 'Buah-buahan', href: '/produk?kategori=buah-buahan' },
    { label: 'Sayuran', href: '/produk?kategori=sayuran' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Cara Kerja', href: '/tentang#cara-kerja' },
    { label: 'Blog', href: '/blog' },
    { label: 'Karir', href: '/karir' },
    { label: 'Kontak', href: '/kontak' },
  ],
  dukungan: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Panduan Penjual', href: '/panduan' },
    { label: 'Panduan Pembeli', href: '/panduan' },
    { label: 'Kebijakan Privasi', href: '/privasi' },
    { label: 'Syarat & Ketentuan', href: '/syarat' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">Dapatkan Info Harga Komoditas Terbaru</h3>
              <p className="text-gray-400 mt-1">Berlangganan newsletter kami untuk update harga dan stok terkini.</p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 lg:w-80 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
              />
              <button className="btn-earth text-sm whitespace-nowrap">
                Langganan <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-forest-700 via-primary-600 to-forest-800 rounded-xl flex items-center justify-center shadow-lg shadow-forest-600/20">
                <svg className="w-7 h-7 text-white" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4C10 4 6 10 6 16C6 22 10 28 16 28C16 28 16 18 16 16C16 14 18 8 16 4Z" fill="currentColor" opacity="0.9"/>
                  <path d="M16 4C22 4 26 10 26 16C26 22 22 28 16 28C16 28 16 18 16 16C16 14 14 8 16 4Z" fill="currentColor" opacity="0.6"/>
                  <path d="M16 16V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 10L12 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                  <path d="M16 10L20 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                  <path d="M16 15L13 18" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                  <path d="M16 15L19 18" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white">Komoditas </span>
                <span className="font-display font-bold text-lg text-earth-400">Sumut</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">
              Marketplace terpercaya untuk komoditas hasil bumi Sumatera Utara. 
              Menghubungkan petani, penjual, dan pembeli langsung dari sumbernya.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-earth-400 flex-shrink-0" />
                <span>Jl. Pelita 1 No. 26, Medan Perjuangan, Sumatera Utara</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-earth-400 flex-shrink-0" />
                <a href="https://wa.me/6285377018574" target="_blank" rel="noopener noreferrer" className="hover:text-earth-400 transition-colors">
                  +62 853-7701-8574 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-earth-400 flex-shrink-0" />
                <span>info@komoditassumut.id</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Produk</h4>
            <ul className="space-y-2">
              {footerLinks.produk.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4">Dukungan</h4>
            <ul className="space-y-2">
              {footerLinks.dukungan.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                © 2026 KomoditasSumut. Hak cipta dilindungi.
              </p>
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-500">Bumi Pertiwi Sumatera Utara 🌴</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/6285377018574" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300" title="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
