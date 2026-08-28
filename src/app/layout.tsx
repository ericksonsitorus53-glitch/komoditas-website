import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import OrganizationJsonLd, { WebsiteJsonLd } from '@/components/JsonLd';

const siteUrl = 'https://komoditas-sumut.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'KomoditasSumut - Marketplace Komoditas Bumi Sumatera Utara',
    template: '%s | KomoditasSumut',
  },
  description: 'Platform jual beli komoditas hasil bumi Sumatera Utara. Kopi Mandheling, rempah, buah, sayuran, dan produk perkebunan terbaik langsung dari petani. Jual beli komoditas online terpercaya.',
  keywords: [
    'komoditas sumatera utara', 'kopi mandheling', 'rempah toba', 'jual beli komoditas',
    'marketplace pertanian', 'produk organik sumut', 'kopi arabika', 'lada hitam toba',
    'jeruk medan', 'buah sumatera utara', 'sayuran organik', 'perkebunan sumatera',
    'komoditas online', 'petani sumatera utara', 'medan', 'danau toba', 'bukit barisan',
  ],
  authors: [{ name: 'KomoditasSumut' }],
  creator: 'KomoditasSumut',
  publisher: 'KomoditasSumut',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'KomoditasSumut',
    title: 'KomoditasSumut - Marketplace Komoditas Bumi Sumatera Utara',
    description: 'Platform jual beli komoditas hasil bumi Sumatera Utara. Kopi Mandheling, rempah, buah, sayuran, dan produk perkebunan terbaik langsung dari petani.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KomoditasSumut - Marketplace Komoditas Bumi Sumatera Utara',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KomoditasSumut - Marketplace Komoditas Bumi Sumatera Utara',
    description: 'Platform jual beli komoditas hasil bumi Sumatera Utara. Kopi Mandheling, rempah, buah, sayuran terbaik langsung dari petani.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <meta name="theme-color" content="#166534" />
      </head>
      <body>
        <Providers>
          <OrganizationJsonLd />
          <WebsiteJsonLd />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
