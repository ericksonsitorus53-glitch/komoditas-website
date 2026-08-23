import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'KomoditasSumut - Marketplace Komoditas Bumi Sumatera Utara',
  description: 'Platform jual beli komoditas hasil bumi Sumatera Utara. Kopi Mandheling, rempah, buah, sayuran, dan produk perkebunan terbaik langsung dari petani.',
  keywords: ['komoditas', 'sumatera utara', 'kopi mandheling', 'rempah', 'medan', 'toba', 'pertanian', 'perkebunan'],
  openGraph: {
    title: 'KomoditasSumut',
    description: 'Marketplace Komoditas Bumi Sumatera Utara',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
