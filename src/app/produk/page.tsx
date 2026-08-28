import { getProductBlurData } from '@/lib/blur-images';
import ProdukGrid from '@/components/ProdukGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produk Komoditas Sumatera Utara',
  description: 'Jelajahi katalog komoditas Sumatera Utara. Kopi Mandheling, rempah, buah, sayuran, dan produk pertanian terbaik langsung dari petani.',
  keywords: ['produk komoditas', 'kopi mandheling', 'rempah toba', 'buah sumatera utara', 'sayuran organik', 'komoditas unggulan'],
  openGraph: {
    title: 'Produk Komoditas Sumatera Utara - KomoditasSumut',
    description: 'Jelajahi katalog komoditas Sumatera Utara. Kopi Mandheling, rempah, buah, sayuran terbaik.',
    url: 'https://komoditas-sumut.vercel.app/produk',
  },
  alternates: {
    canonical: 'https://komoditas-sumut.vercel.app/produk',
  },
};

export default async function ProdukPage() {
  const blurData = await getProductBlurData();

  return <ProdukGrid blurData={blurData} />;
}
