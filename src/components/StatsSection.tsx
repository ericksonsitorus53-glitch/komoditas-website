'use client';

import { Package, Leaf, MapPin, Shield } from 'lucide-react';

const stats = [
  { icon: Package, label: 'Produk Tersedia', value: '21+', color: 'text-primary-500', bg: 'bg-primary-50' },
  { icon: MapPin, label: 'Asal Daerah', value: '8+', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Leaf, label: 'Produk Organik', value: '8+', color: 'text-earth-500', bg: 'bg-earth-50' },
  { icon: Shield, label: 'Kualitas Terjamin', value: '100%', color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
