import Link from 'next/link';
import { Star, MapPin, ShoppingCart, Leaf, TrendingUp } from 'lucide-react';
import type { Product } from '@/lib/data';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.slug}`} className="card group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.isFeatured && (
            <span className="badge bg-primary-500 text-white shadow-lg">
              <TrendingUp className="w-3 h-3 mr-1" /> Populer
            </span>
          )}
          {product.isOrganic && (
            <span className="badge bg-green-500 text-white shadow-lg">
              <Leaf className="w-3 h-3 mr-1" /> Organik
            </span>
          )}
        </div>
        {/* Quick Add */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge-earth text-[10px]">{product.category}</span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin className="w-3 h-3" />
            {product.origin}
          </div>
        </div>
        <h3 className="font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
            <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="w-4 h-4 text-earth-400 fill-earth-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-300">|</span>
            <span>{product.sold} terjual</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
