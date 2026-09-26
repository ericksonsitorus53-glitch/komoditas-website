import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, Share2, ChevronRight, Store, Shield, Truck, RotateCcw, Leaf, Minus, Plus } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import ProductImage from '@/components/ProductImage';
import MarkAsSoldButton from '@/components/MarkAsSoldButton';
import { getProductBlurData } from '@/lib/blur-images';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { LiveProductPrice, WaOrderButtons } from '@/components/ProductPrice';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return { title: 'Produk Tidak Ditemukan' };
  }

  return {
    title: product.name,
    description: `${product.description} | Harga ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}/${product.unit}. Stok ${product.stock} ${product.unit}.`,
    keywords: [product.name, product.category, product.origin, ...product.tags],
    openGraph: {
      title: `${product.name} | KomoditasSumut`,
      description: product.description,
      images: [{ url: product.image, width: 600, height: 400, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  const blurData = await getProductBlurData();
  const blurDataURL = blurData.find(b => b.slug === slug)?.blurDataURL;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">😕</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h1>
          <Link href="/produk" className="btn-primary mt-4">Kembali ke Katalog</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);

  const getRelatedBlur = (productSlug: string) =>
    blurData.find(b => b.slug === productSlug)?.blurDataURL;

  const siteUrl = 'https://komoditas-sumut.vercel.app';

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: siteUrl },
          { name: 'Produk', url: `${siteUrl}/produk` },
          { name: product.category, url: `${siteUrl}/produk?kategori=${product.categorySlug}` },
          { name: product.name, url: `${siteUrl}/produk/${product.slug}` },
        ]}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Beranda</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/produk" className="hover:text-primary-600">Produk</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/produk?kategori=${product.categorySlug}`} className="hover:text-primary-600">{product.category}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Image */}
          <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative">
              <ProductImage
                src={product.image}
                alt={product.name}
                blurDataURL={blurDataURL}
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {product.isFeatured && <span className="badge bg-primary-500 text-white shadow-lg">🔥 Populer</span>}
                {product.isOrganic && <span className="badge bg-green-500 text-white shadow-lg">🌱 Organik</span>}
              </div>
            </div>
          </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Deskripsi Produk</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map(tag => (
                  <span key={tag} className="badge bg-gray-100 text-gray-600">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              {/* Category & Origin */}
              <div className="flex items-center gap-3 mb-3">
                <span className="badge-earth">{product.category}</span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {product.origin}
                </div>
              </div>

              <h1 className="font-display font-bold text-2xl text-gray-900">{product.name}</h1>

              {/* Price (live via sumber resmi, fallback katalog) */}
              <LiveProductPrice product={product} />

              {/* Stock */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Stok tersedia</span>
                <span className={`text-sm font-semibold ${product.stock > 50 ? 'text-green-600' : product.stock > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {product.stock} {product.unit}
                </span>
              </div>

              {/* Quantity */}
              <div className="mt-4">
                <label className="text-sm text-gray-500 block mb-2">Jumlah</label>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input type="number" defaultValue={1} min={1} className="w-20 text-center input-field py-2" />
                  <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <WaOrderButtons product={product} />

              {/* Mark as Sold - Only visible to logged-in sellers */}
              <MarkAsSoldButton
                productId={product.id}
                productName={product.name}
                productSlug={product.slug}
                category={product.category}
                price={product.price}
                sellerName={product.seller}
              />

              <div className="flex gap-3 mt-3">
                <button className="btn-secondary flex-1 text-sm">
                  <Heart className="w-4 h-4 mr-1" /> Favorit
                </button>
                <button className="btn-secondary flex-1 text-sm">
                  <Share2 className="w-4 h-4 mr-1" /> Bagikan
                </button>
              </div>

              {/* WhatsApp Contact */}
              <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800 mb-3">
                  Pesan langsung via WhatsApp untuk info stok & harga terbaru
                </p>
                <a
                  href={`https://wa.me/6285377018574?text=${encodeURIComponent(`Halo, saya ingin membeli ${product.name}\nHarga: ${formatPrice(product.price)}/${product.unit}\n\nMohon info stok dan cara pemesanan. Terima kasih.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
                <p className="text-xs text-green-600 text-center mt-2">0853 7701 8574</p>
              </div>

              {/* Seller Info */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{product.seller}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      Penjual Terverifikasi
                    </div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/6285377018574?text=${encodeURIComponent(`Halo, saya ingin membeli ${product.name}\nHarga: ${formatPrice(product.price)}/${product.unit}\n\nMohon info stok dan cara pemesanan. Terima kasih.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-sm mt-3 justify-center"
                >
                  Hubungi Penjual
                </a>
              </div>

              {/* Guarantees */}
              <div className="mt-6 border-t border-gray-100 pt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, label: 'Aman' },
                  { icon: Truck, label: 'Pengiriman' },
                  { icon: RotateCcw, label: 'Retur' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                    <span className="text-[10px] text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="section-title text-xl mb-6">Produk Sejenis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  blurDataURL={getRelatedBlur(p.slug)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
