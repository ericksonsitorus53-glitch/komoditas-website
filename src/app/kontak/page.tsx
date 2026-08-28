import type { Metadata } from 'next';
import KontakContent from './KontakContent';

export const metadata: Metadata = {
  title: 'Hubungi Kami - KomoditasSumut',
  description: 'Hubungi KomoditasSumut untuk pertanyaan, kerjasama, atau bantuan. Alamat: Jl. Pelita 1 No. 26, Medan Perjuangan. WhatsApp: +62 853-7701-8574.',
  keywords: ['kontak komoditas sumut', 'hubungi kami', 'komoditas sumatera utara', 'whatsapp komoditas'],
  openGraph: {
    title: 'Hubungi Kami - KomoditasSumut',
    description: 'Hubungi KomoditasSumut untuk pertanyaan, kerjasama, atau bantuan.',
    url: 'https://komoditas-sumut.vercel.app/kontak',
  },
  alternates: {
    canonical: 'https://komoditas-sumut.vercel.app/kontak',
  },
};

export default function KontakPage() {
  return <KontakContent />;
}
