'use client';

import { useEffect, useState } from 'react';
import { Package, Users, TrendingUp, DollarSign } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ end, duration = 2000, prefix = '', suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('id-ID')}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Package, label: 'Total Produk', value: 450, suffix: '+', color: 'text-primary-500', bg: 'bg-primary-50' },
  { icon: Users, label: 'Member Aktif', value: 108, suffix: '+', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: TrendingUp, label: 'Transaksi', value: 15670, suffix: '+', color: 'text-earth-500', bg: 'bg-earth-50' },
  { icon: DollarSign, label: 'Total Nilai', value: 12, prefix: 'Rp ', suffix: ' Miliar', color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900">
                  <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
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
