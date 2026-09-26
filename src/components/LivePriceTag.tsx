'use client';

import { useLivePrices } from '@/hooks/useLivePrices';
import type { Product } from '@/lib/data';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

// Menampilkan harga live (jika tersedia dari sumber resmi) di atas harga katalog.
// Jika API gagal / produk tidak ter-mapping, hanya baseline yang tampil.
export default function LivePriceTag({
  product,
  className = 'text-lg font-bold text-primary-600',
  showUnit = true,
}: {
  product: Pick<Product, 'slug' | 'price' | 'unit'>;
  className?: string;
  showUnit?: boolean;
}) {
  const { prices } = useLivePrices();
  const live = prices[product.slug];

  if (!live || live.livePrice === product.price) {
    return (
      <span className={className}>
        {formatPrice(product.price)}
        {showUnit && <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>}
      </span>
    );
  }

  const up = live.changePct > 0;
  const down = live.changePct < 0;

  return (
    <span className="inline-flex flex-col leading-tight">
      <span className={className}>
        {formatPrice(live.livePrice)}
        {showUnit && <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>}
      </span>
      <span
        className={`text-[10px] font-medium inline-flex items-center gap-1 ${
          up ? 'text-red-500' : down ? 'text-green-600' : 'text-gray-400'
        }`}
        title={`Harga katalog: ${formatPrice(product.price)} · Sumber: ${live.source}`}
      >
        {up ? '▲' : down ? '▼' : '•'} {up ? '+' : ''}
        {live.changePct.toFixed(1)}% harga pasar hari ini
      </span>
    </span>
  );
}
