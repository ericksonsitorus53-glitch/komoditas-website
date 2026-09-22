'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { MapPin, ShoppingCart, Leaf, TrendingUp, Plus } from 'lucide-react';
import type { Product } from '@/lib/data';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useCart } from '@/lib/cart-context';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({
  product,
  blurDataURL,
}: {
  product: Product;
  blurDataURL?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();

  if (isLoading) {
    return (
      <div className="relative">
        <ProductCardSkeleton />
        <div className="absolute inset-0">
          <Link href={`/produk/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover opacity-0"
              onLoadingComplete={() => setIsLoading(false)}
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/produk/${product.slug}`} className="card group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
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
        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addItem(product);
            }}
            className="w-10 h-10 bg-primary-500 rounded-xl shadow-lg flex items-center justify-center text-white hover:bg-primary-600 transition-all"
            title="Tambah ke Keranjang"
          >
            <Plus className="w-5 h-5" />
          </button>
          <a
            href={`https://wa.me/6285377018574?text=${encodeURIComponent(`Halo, saya ingin membeli ${product.name}\nHarga: ${formatPrice(product.price)}/${product.unit}\n\nMohon info stok dan cara pemesanan. Terima kasih.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-green-500 rounded-xl shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 1.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
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
          <a
            href={`https://wa.me/6285377018574?text=${encodeURIComponent(`Halo, saya ingin membeli ${product.name}\nHarga: ${formatPrice(product.price)}/${product.unit}\n\nMohon info stok dan cara pemesanan. Terima kasih.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transition-all shadow-sm"
            onClick={(e) => e.stopPropagation()}
            title="Pesan via WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </Link>
  );
}
