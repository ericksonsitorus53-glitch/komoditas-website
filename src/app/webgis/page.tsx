'use client';

import { useState, useEffect } from 'react';
import { MapPin, Filter, Search, Layers, BarChart3, TrendingUp, Package, ChevronDown, Info, Maximize2, Minimize2 } from 'lucide-react';

// Data distribusi komoditas per kabupaten/kota
const districtData = [
  { id: 1, name: 'Kab. Samosir', lat: 2.6167, lng: 98.8500, commodities: ['Ikan Mas', 'Madu Hutan', 'Padi'], totalProducts: 45, totalSellers: 12, avgPrice: 85000 },
  { id: 2, name: 'Kab. Toba', lat: 2.3500, lng: 99.1000, commodities: ['Kopi Mandheling', 'Lada Hitam', 'Kopi Lanang'], totalProducts: 62, totalSellers: 18, avgPrice: 165000 },
  { id: 3, name: 'Kab. Mandailing Natal', lat: 0.7833, lng: 99.2500, commodities: ['Kopi Mandheling', 'Cengkeh', 'Pinang'], totalProducts: 78, totalSellers: 22, avgPrice: 125000 },
  { id: 4, name: 'Kab. Karo', lat: 3.1000, lng: 98.3000, commodities: ['Cabe Merah', 'Jahe Merah', 'Kemiri'], totalProducts: 55, totalSellers: 15, avgPrice: 75000 },
  { id: 5, name: 'Kab. Deli Serdang', lat: 3.4500, lng: 98.7000, commodities: ['Jeruk Medan', 'Manggis', 'Kelapa Sawit'], totalProducts: 85, totalSellers: 28, avgPrice: 65000 },
  { id: 6, name: 'Kab. Langkat', lat: 3.7833, lng: 98.2500, commodities: ['Pisang Barangan', 'Gula Kelapa', 'Sarang Walet'], totalProducts: 42, totalSellers: 11, avgPrice: 285000 },
  { id: 7, name: 'Kab. Simalungun', lat: 2.9000, lng: 99.0000, commodities: ['Kopi Sumatera', 'Kayu Manis', 'Karet'], totalProducts: 38, totalSellers: 10, avgPrice: 95000 },
  { id: 8, name: 'Kab. Humbang Hasundutan', lat: 2.1500, lng: 98.9000, commodities: ['Teh Dolok Sanggul', 'Kopi'], totalProducts: 28, totalSellers: 8, avgPrice: 75000 },
  { id: 9, name: 'Kab. Labuhanbatu', lat: 2.3000, lng: 100.1000, commodities: ['Kelapa Sawit', 'Pinang', 'Karet'], totalProducts: 35, totalSellers: 9, avgPrice: 55000 },
  { id: 10, name: 'Kota Medan', lat: 3.5950, lng: 98.6722, commodities: ['Semua Komoditas'], totalProducts: 150, totalSellers: 45, avgPrice: 120000 },
  { id: 11, name: 'Kota Binjai', lat: 3.6000, lng: 98.4833, commodities: ['Jeruk', 'Pisang', 'Sayuran'], totalProducts: 25, totalSellers: 7, avgPrice: 45000 },
  { id: 12, name: 'Kota Tebing Tinggi', lat: 3.3333, lng: 99.1667, commodities: ['Kopi', 'Rempah'], totalProducts: 18, totalSellers: 5, avgPrice: 85000 },
  { id: 13, name: 'Kota Pematang Siantar', lat: 2.9667, lng: 99.0667, commodities: ['Kopi', 'Teh', 'Rempah'], totalProducts: 32, totalSellers: 10, avgPrice: 95000 },
  { id: 14, name: 'Kab. Asahan', lat: 2.7833, lng: 99.5500, commodities: ['Kelapa Sawit', 'Karet', 'Ikan'], totalProducts: 28, totalSellers: 8, avgPrice: 65000 },
  { id: 15, name: 'Kab. Batubara', lat: 3.0500, lng: 99.5500, commodities: ['Kepiting', 'Ikan', 'Kelapa Sawit'], totalProducts: 22, totalSellers: 6, avgPrice: 175000 },
  { id: 16, name: 'Kab. Padang Lawas', lat: 1.1000, lng: 99.8500, commodities: ['Karet', 'Kelapa Sawit', 'Kopi'], totalProducts: 20, totalSellers: 5, avgPrice: 75000 },
  { id: 17, name: 'Kab. Padang Lawas Utara', lat: 0.9000, lng: 99.9000, commodities: ['Karet', 'Kelapa Sawit'], totalProducts: 15, totalSellers: 4, avgPrice: 65000 },
  { id: 18, name: 'Kab. Labuhanbatu Selatan', lat: 1.9833, lng: 100.0833, commodities: ['Kelapa Sawit', 'Karet'], totalProducts: 18, totalSellers: 5, avgPrice: 55000 },
  { id: 19, name: 'Kab. Labuhanbatu Utara', lat: 2.2500, lng: 99.7500, commodities: ['Kelapa Sawit', 'Karet', 'Padi'], totalProducts: 22, totalSellers: 6, avgPrice: 60000 },
  { id: 20, name: 'Kab. Nias', lat: 1.0333, lng: 97.7833, commodities: ['Kelapa', 'Cengkeh', 'Pala'], totalProducts: 12, totalSellers: 3, avgPrice: 85000 },
  { id: 21, name: 'Kab. Nias Selatan', lat: 0.8833, lng: 97.8167, commodities: ['Kelapa', 'Pala', 'Cengkeh'], totalProducts: 15, totalSellers: 4, avgPrice: 75000 },
  { id: 22, name: 'Kab. Pakpak Bharat', lat: 2.5500, lng: 98.3000, commodities: ['Kopi', 'Sayuran', 'Rempah'], totalProducts: 18, totalSellers: 5, avgPrice: 85000 },
  { id: 23, name: 'Kab. Serdang Bedagai', lat: 3.3500, lng: 99.0500, commodities: ['Kelapa Sawit', 'Padi', 'Sayuran'], totalProducts: 28, totalSellers: 8, avgPrice: 55000 },
  { id: 24, name: 'Kab. Tanah Karo', lat: 3.1000, lng: 98.3000, commodities: ['Cabe', 'Jahe', 'Sayuran'], totalProducts: 42, totalSellers: 12, avgPrice: 75000 },
];

// Komoditas colors
const commodityColors: Record<string, string> = {
  'Kopi': '#8B4513',
  'Kopi Mandheling': '#8B4513',
  'Kopi Lanang': '#6B3410',
  'Kopi Sumatera': '#7B4211',
  'Rempah': '#D2691E',
  'Lada Hitam': '#2F2F2F',
  'Cengkeh': '#8B0000',
  'Kayu Manis': '#D2691E',
  'Buah': '#FF6347',
  'Jeruk Medan': '#FFA500',
  'Jeruk': '#FFA500',
  'Manggis': '#800080',
  'Pisang Barangan': '#FFD700',
  'Pisang': '#FFD700',
  'Sayuran': '#228B22',
  'Cabe Merah': '#FF0000',
  'Kelapa Sawit': '#FF8C00',
  'Ikan': '#4682B4',
  'Ikan Mas': '#4682B4',
  'Kepiting': '#FF6347',
  'Karet': '#808080',
  'Teh': '#006400',
  'Teh Dolok Sanggul': '#006400',
  'Madu Hutan': '#FFD700',
  'Sarang Walet': '#FFFACD',
  'Padi': '#DAA520',
  'Semua Komoditas': '#1E90FF',
  'Pinang': '#8B4513',
  'Gula Kelapa': '#DEB887',
  'Kemiri': '#F5DEB3',
  'Pala': '#D2691E',
  'Kelapa': '#8B4513',
};

// Komoditas icons
const commodityIcons: Record<string, string> = {
  'Kopi': '☕',
  'Kopi Mandheling': '☕',
  'Kopi Lanang': '☕',
  'Kopi Sumatera': '☕',
  'Rempah': '🌶️',
  'Lada Hitam': '🫚',
  'Cengkeh': '🌿',
  'Kayu Manis': '🫙',
  'Buah': '🍊',
  'Jeruk Medan': '🍊',
  'Jeruk': '🍊',
  'Manggis': '🍇',
  'Pisang Barangan': '🍌',
  'Pisang': '🍌',
  'Sayuran': '🥬',
  'Cabe Merah': '🌶️',
  'Kelapa Sawit': '🌴',
  'Ikan': '🐟',
  'Ikan Mas': '🐟',
  'Kepiting': '🦀',
  'Karet': '🌿',
  'Teh': '🍵',
  'Teh Dolok Sanggul': '🍵',
  'Madu Hutan': '🍯',
  'Sarang Walet': '🐦',
  'Padi': '🌾',
  'Semua Komoditas': '📦',
  'Pinang': '🌿',
  'Gula Kelapa': '🥥',
  'Kemiri': '🥜',
  'Pala': '🌿',
  'Kelapa': '🥥',
};

// Stats summary
const summaryStats = {
  totalDistricts: districtData.length,
  totalProducts: districtData.reduce((sum, d) => sum + d.totalProducts, 0),
  totalSellers: districtData.reduce((sum, d) => sum + d.totalSellers, 0),
  topCommodities: ['Kopi Mandheling', 'Kelapa Sawit', 'Rempah', 'Buah-buahan', 'Ikan & Perikanan'],
  avgPriceRange: { min: 45000, max: 285000 },
};

// Simple Map Component (using SVG)
function MapVisualization({ 
  selectedDistrict, 
  onDistrictSelect,
  highlightedCommodity 
}: { 
  selectedDistrict: typeof districtData[0] | null;
  onDistrictSelect: (d: typeof districtData[0]) => void;
  highlightedCommodity: string | null;
}) {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden border border-gray-200">
      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary-600" />
          Peta Komoditas Sumatera Utara
        </h3>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg max-h-[200px] overflow-y-auto">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Legenda</h4>
        <div className="space-y-1">
          {Object.entries(commodityColors).slice(0, 10).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Map of North Sumatra */}
      <svg viewBox="0 0 800 600" className="w-full h-full">
        {/* Background */}
        <defs>
          <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#bae6fd', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#dcfce7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#bbf7d0', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Sea background */}
        <rect x="0" y="0" width="800" height="600" fill="url(#seaGradient)" />
        
        {/* Simplified North Sumatra shape */}
        <path d="M150 100 L250 80 L350 90 L450 120 L550 180 L600 250 L620 350 L580 450 L500 520 L400 550 L300 530 L200 480 L150 400 L130 300 L140 200 Z" 
              fill="url(#landGradient)" stroke="#16a34a" strokeWidth="2" filter="url(#shadow)" />

        {/* District markers */}
        {districtData.map((district) => {
          // Convert lat/lng to SVG coordinates (simplified)
          const x = 150 + ((district.lng - 97.5) / 3) * 450;
          const y = 550 - ((district.lat - 0.5) / 3.5) * 450;
          
          const isSelected = selectedDistrict?.id === district.id;
          const mainCommodity = district.commodities[0];
          const color = commodityColors[mainCommodity] || '#3b82f6';
          const isHighlighted = highlightedCommodity && district.commodities.includes(highlightedCommodity);
          
          return (
            <g key={district.id} 
               onClick={() => onDistrictSelect(district)}
               className="cursor-pointer"
               style={{ opacity: highlightedCommodity ? (isHighlighted ? 1 : 0.3) : 1 }}>
              {/* Pulse effect for selected */}
              {isSelected && (
                <circle cx={x} cy={y} r="25" fill={color} opacity="0.3">
                  <animate attributeName="r" from="15" to="35" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              
              {/* Main marker */}
              <circle cx={x} cy={y} r={isSelected ? "18" : "14"} 
                      fill={color} stroke="white" strokeWidth="3"
                      className="transition-all duration-300 hover:r-20" />
              
              {/* District label */}
              <text x={x} y={y + 30} textAnchor="middle" 
                    className="text-[10px] font-medium fill-gray-700 pointer-events-none">
                {district.name.replace('Kab. ', '').replace('Kota ', '')}
              </text>
              
              {/* Product count */}
              <text x={x} y={y + 4} textAnchor="middle" 
                    className="text-[9px] font-bold fill-white pointer-events-none">
                {district.totalProducts}
              </text>
            </g>
          );
        })}

        {/* Danau Toba */}
        <ellipse cx="380" cy="280" rx="60" ry="40" fill="#3b82f6" opacity="0.6" />
        <text x="380" y="285" textAnchor="middle" className="text-[11px] font-bold fill-white">
          Danau Toba
        </text>
      </svg>

      {/* Selected District Info */}
      {selectedDistrict && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-gray-800">{selectedDistrict.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {selectedDistrict.totalProducts} produk • {selectedDistrict.totalSellers} penjual
              </p>
            </div>
            <button onClick={() => onDistrictSelect(selectedDistrict)} 
                    className="text-gray-400 hover:text-gray-600">
              <Info className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedDistrict.commodities.map((commodity) => (
              <span key={commodity} 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: commodityColors[commodity] || '#6b7280' }}>
                {commodityIcons[commodity] || '📦'} {commodity}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="text-gray-500">
              Rata-rata Harga: <span className="font-semibold text-gray-800">
                Rp {selectedDistrict.avgPrice.toLocaleString('id-ID')}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Commodity Detail Panel
function CommodityPanel({ 
  district, 
  onClose 
}: { 
  district: typeof districtData[0]; 
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'trends'>('overview');

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-forest-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{district.name}</h3>
            <p className="text-primary-100 mt-1">Detail Komoditas & Analitik</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {(['overview', 'products', 'trends'] as const).map((tab) => (
          <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}>
            {tab === 'overview' ? 'Ringkasan' : tab === 'products' ? 'Produk' : 'Tren'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-600">{district.totalProducts}</div>
                <div className="text-sm text-gray-600">Total Produk</div>
              </div>
              <div className="bg-forest-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-forest-600">{district.totalSellers}</div>
                <div className="text-sm text-gray-600">Penjual Aktif</div>
              </div>
              <div className="bg-earth-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-earth-600">
                  Rp {district.avgPrice.toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-gray-600">Harga Rata-rata</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{district.commodities.length}</div>
                <div className="text-sm text-gray-600">Jenis Komoditas</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Komoditas Unggulan</h4>
              <div className="space-y-2">
                {district.commodities.map((commodity) => (
                  <div key={commodity} 
                       className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{commodityIcons[commodity] || '📦'}</span>
                      <div>
                        <div className="font-medium text-gray-800">{commodity}</div>
                        <div className="text-xs text-gray-500">
                          {Math.floor(Math.random() * 20 + 5)} produk tersedia
                        </div>
                      </div>
                    </div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" 
                           style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-3">
            {[
              { name: 'Kopi Mandheling Premium', price: 185000, stock: 45 },
              { name: 'Lada Hitam Toba', price: 95000, stock: 120 },
              { name: 'Madu Hutan Toba', price: 150000, stock: 30 },
            ].map((product, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-forest-100 rounded-xl flex items-center justify-center text-2xl">
                  {commodityIcons[district.commodities[0]] || '📦'}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{product.name}</div>
                  <div className="text-sm text-gray-500">Stok: {product.stock} unit</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600">
                    Rp {product.price.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-gray-500">per unit</div>
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
              Lihat Semua Produk
            </button>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Tren Harga 6 Bulan Terakhir</h4>
              <div className="h-40 flex items-end gap-2">
                {[65, 72, 68, 85, 78, 92].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs text-gray-500">{value}%</div>
                    <div className="w-full bg-primary-500 rounded-t-lg transition-all duration-500"
                         style={{ height: `${value * 1.5}px` }}></div>
                    <div className="text-xs text-gray-400">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Volume Penjualan</h4>
              <div className="space-y-2">
                {district.commodities.map((commodity, i) => (
                  <div key={commodity} className="flex items-center gap-3">
                    <span className="text-lg">{commodityIcons[commodity]}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{commodity}</span>
                        <span className="text-sm font-medium text-gray-800">
                          {Math.floor(Math.random() * 500 + 100)} kg
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500"
                             style={{ 
                               width: `${Math.floor(Math.random() * 40 + 60)}%`,
                               backgroundColor: commodityColors[commodity] || '#3b82f6'
                             }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WebGISPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<typeof districtData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCommodity, setFilterCommodity] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter districts based on search
  const filteredDistricts = districtData.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.commodities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get unique commodities for filter
  const allCommodities = Array.from(new Set(districtData.flatMap(d => d.commodities))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary-600 via-forest-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">WebGIS Komoditas</h1>
              <p className="text-primary-100">Peta Interaktif Distribusi Komoditas Sumatera Utara</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Kabupaten/Kota', value: summaryStats.totalDistricts, icon: MapPin },
              { label: 'Total Produk', value: summaryStats.totalProducts, icon: Package },
              { label: 'Penjual Aktif', value: summaryStats.totalSellers, icon: TrendingUp },
              { label: 'Jenis Komoditas', value: allCommodities.length, icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <stat.icon className="w-5 h-5 text-earth-300 mb-2" />
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <div className="text-sm text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari kabupaten atau komoditas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Commodity Filter */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Komoditas
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                <button
                  onClick={() => setFilterCommodity(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !filterCommodity ? 'bg-primary-100 text-primary-700 font-medium' : 'hover:bg-gray-50 text-gray-600'
                  }`}>
                  Semua Komoditas
                </button>
                {allCommodities.map((commodity) => (
                  <button
                    key={commodity}
                    onClick={() => setFilterCommodity(commodity)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      filterCommodity === commodity ? 'bg-primary-100 text-primary-700 font-medium' : 'hover:bg-gray-50 text-gray-600'
                    }`}>
                    <span>{commodityIcons[commodity]}</span>
                    {commodity}
                  </button>
                ))}
              </div>
            </div>

            {/* District List */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Daerah Penghasil</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredDistricts.map((district) => (
                  <button
                    key={district.id}
                    onClick={() => setSelectedDistrict(district)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedDistrict?.id === district.id 
                        ? 'bg-primary-50 border border-primary-200' 
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}>
                    <div className="font-medium text-gray-800 text-sm">{district.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {district.totalProducts} produk • {district.commodities[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Map & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
              <MapVisualization 
                selectedDistrict={selectedDistrict}
                onDistrictSelect={setSelectedDistrict}
                highlightedCommodity={filterCommodity}
              />
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>

            {/* District Details */}
            {selectedDistrict && (
              <CommodityPanel 
                district={selectedDistrict}
                onClose={() => setSelectedDistrict(null)}
              />
            )}

            {/* Quick Stats */}
            {!selectedDistrict && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Ringkasan Distribusi</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { commodity: 'Kopi', count: 45, percentage: 25 },
                    { commodity: 'Kelapa Sawit', count: 38, percentage: 21 },
                    { commodity: 'Rempah', count: 32, percentage: 18 },
                    { commodity: 'Buah', count: 28, percentage: 16 },
                    { commodity: 'Ikan', count: 18, percentage: 10 },
                    { commodity: 'Sayuran', count: 18, percentage: 10 },
                  ].map((item) => (
                    <div key={item.commodity} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{commodityIcons[item.commodity]}</span>
                        <span className="font-medium text-gray-800 text-sm">{item.commodity}</span>
                      </div>
                      <div className="text-xl font-bold text-primary-600">{item.count}</div>
                      <div className="text-xs text-gray-500">daerah penghasil</div>
                      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" 
                             style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
