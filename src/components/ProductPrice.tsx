'use client';

import { ShoppingCart } from 'lucide-react';
import { useLivePrices } from '@/hooks/useLivePrices';
import type { Product } from '@/lib/data';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

// Kotak harga di halaman detail produk — menampilkan harga live bila tersedia.
export function LiveProductPrice({ product }: { product: Product }) {
  const { prices } = useLivePrices();
  const live = prices[product.slug];
  const shown = live?.livePrice ?? product.price;
  const changed = !!live && live.livePrice !== product.price;
  const up = (live?.changePct ?? 0) > 0;
  const down = (live?.changePct ?? 0) < 0;

  return (
    <div className="mt-6 p-4 bg-primary-50 rounded-xl">
      <div className="text-sm text-primary-600 font-medium">Harga</div>
      <div className="text-3xl font-bold text-primary-700">{formatPrice(shown)}</div>
      <div className="text-sm text-primary-600">per {product.unit}</div>
      {changed && (
        <div
          className={`mt-1 text-xs font-medium ${up ? 'text-red-500' : down ? 'text-green-600' : 'text-gray-500'}`}
          title={`Harga katalog: ${formatPrice(product.price)}`}
        >
          {up ? '▲' : down ? '▼' : '•'} {up ? '+' : ''}
          {live!.changePct.toFixed(1)}% vs katalog · mengikuti harga pasar resmi hari ini
        </div>
      )}
    </div>
  );
}

// Tombol aksi pesan — link WhatsApp memakai harga live.
export function WaOrderButtons({ product }: { product: Product }) {
  const { prices } = useLivePrices();
  const currentPrice = prices[product.slug]?.livePrice ?? product.price;
  const waHref = `https://wa.me/6285377018574?text=${encodeURIComponent(
    `Halo, saya ingin membeli ${product.name}\nHarga: ${formatPrice(currentPrice)}/${product.unit}\n\nMohon info stok dan cara pemesanan. Terima kasih.`
  )}`;

  return (
    <div className="mt-6 flex gap-3">
      <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center">
        <ShoppingCart className="w-5 h-5 mr-2 inline" /> Keranjang
      </a>
      <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-earth flex-1 text-center">
        Beli Sekarang
      </a>
    </div>
  );
}
