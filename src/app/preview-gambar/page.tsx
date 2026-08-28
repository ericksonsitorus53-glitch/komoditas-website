'use client';

import { products } from '@/lib/data';

export default function PreviewGambarPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Preview Gambar Produk</h1>
      <p className="text-center text-gray-500 mb-8">Cek setiap gambar — kasih tau nomor produk yang fotonya salah</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative aspect-[4/3]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                #{index + 1}
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm text-gray-900">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{product.category} · {product.origin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
