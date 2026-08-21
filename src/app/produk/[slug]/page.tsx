import Link from 'next/link';
import { Star, MapPin, ShoppingCart, Heart, Share2, ChevronRight, Store, Shield, Truck, RotateCcw, Leaf, Minus, Plus } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

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

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

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

  return (
    <div className="bg-gray-50 min-h-screen">
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
              <div className="relative aspect-[4/3]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
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

              {/* Rating & Sales */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'text-earth-400 fill-earth-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviews} ulasan)</span>
                </div>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-500">{product.sold} terjual</span>
              </div>

              {/* Price */}
              <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                <div className="text-sm text-primary-600 font-medium">Harga</div>
                <div className="text-3xl font-bold text-primary-700">{formatPrice(product.price)}</div>
                <div className="text-sm text-primary-600">per {product.unit}</div>
              </div>

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
              <div className="mt-6 flex gap-3">
                <button className="btn-primary flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Keranjang
                </button>
                <button className="btn-earth flex-1">
                  Beli Sekarang
                </button>
              </div>

              <div className="flex gap-3 mt-3">
                <button className="btn-secondary flex-1 text-sm">
                  <Heart className="w-4 h-4 mr-1" /> Favorit
                </button>
                <button className="btn-secondary flex-1 text-sm">
                  <Share2 className="w-4 h-4 mr-1" /> Bagikan
                </button>
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
                      <Star className="w-3 h-3 text-earth-400 fill-earth-400" />
                      {product.rating} · Penjual Terverifikasi
                    </div>
                  </div>
                </div>
                <Link href="/member" className="btn-secondary w-full text-sm mt-3 justify-center">
                  Lihat Profil Penjual
                </Link>
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
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
