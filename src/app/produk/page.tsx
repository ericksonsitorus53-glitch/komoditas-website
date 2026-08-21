'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

const sortOptions = [
  { value: 'popular', label: 'Terpopuler' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'rating', label: 'Rating Tertinggi' },
];

export default function ProdukPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showOrganic, setShowOrganic] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }

    // Organic filter
    if (showOrganic) {
      result = result.filter(p => p.isOrganic);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.reverse();
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.sold - a.sold);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, showOrganic]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="section-title">Katalog Produk</h1>
          <p className="section-subtitle">Temukan komoditas terbaik dari Sumatera Utara</p>

          {/* Search */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk, kategori, atau asal daerah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto min-w-[180px] cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Kategori</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCategory === 'all' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                        selectedCategory === cat.slug ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                      <span className="ml-auto text-xs text-gray-400">{cat.productCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Organic Filter */}
              <div className="border-t border-gray-100 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOrganic}
                    onChange={(e) => setShowOrganic(e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">🌱 Produk Organik Saja</span>
                </label>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== 'all' || showOrganic || searchQuery) && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'all' && (
                      <span className="badge bg-primary-100 text-primary-700 flex items-center gap-1">
                        {categories.find(c => c.slug === selectedCategory)?.name}
                        <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    {showOrganic && (
                      <span className="badge bg-green-100 text-green-700 flex items-center gap-1">
                        Organik
                        <button onClick={() => setShowOrganic(false)}><X className="w-3 h-3" /></button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => { setSelectedCategory('all'); setShowOrganic(false); setSearchQuery(''); }}
                    className="text-xs text-red-500 hover:text-red-600 mt-2"
                  >
                    Hapus Semua Filter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Menampilkan <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produk
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Produk tidak ditemukan</h3>
                <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci pencarian Anda</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setShowOrganic(false); setSearchQuery(''); }}
                  className="btn-secondary text-sm mt-4"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
