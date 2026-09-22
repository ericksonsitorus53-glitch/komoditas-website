'use client';

import { Package, Leaf, MapPin, Shield } from 'lucide-react';

const stats = [
  { icon: Package, label: 'Produk Tersedia', value: '22+', color: 'text-primary-500', bg: 'bg-primary-50', border: 'border-primary-100' },
  { icon: MapPin, label: 'Asal Daerah', value: '8+', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: Leaf, label: 'Produk Organik', value: '8+', color: 'text-earth-500', bg: 'bg-earth-50', border: 'border-earth-100' },
  { icon: Shield, label: 'Kualitas Terjamin', value: '100%', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="group text-center p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-earth-200 hover:shadow-xl hover:shadow-earth-100/30 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-display font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
