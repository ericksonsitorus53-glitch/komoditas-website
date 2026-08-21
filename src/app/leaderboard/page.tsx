'use client';

import { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Star, Crown, Award, Medal, ArrowUp, ChevronDown } from 'lucide-react';
import { leaderboard } from '@/lib/data';

const filterOptions = [
  { value: 'all', label: 'Semua' },
  { value: 'petani', label: 'Petani' },
  { value: 'penjual', label: 'Penjual' },
  { value: 'distributor', label: 'Distributor' },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState('all');

  const filteredLeaderboard = filter === 'all'
    ? leaderboard
    : leaderboard.filter(e => e.memberRole.toLowerCase() === filter);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-earth-500 via-earth-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Leaderboard</h1>
          <p className="text-lg text-earth-100 mt-2 max-w-xl mx-auto">
            Peringkat penjual dan petani terbaik berdasarkan performa, penjualan, dan kepuasan pelanggan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 3 Podium */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-center font-display font-bold text-lg text-gray-900 mb-8">🏆 Top 3 Penjual Terbaik</h2>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto items-end">
            {/* 2nd Place */}
            <div className="text-center order-1">
              <div className="bg-gray-100 rounded-2xl pt-10 pb-6 px-4 relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <Medal className="w-12 h-12 text-gray-400" />
                </div>
                <img
                  src={filteredLeaderboard[1]?.memberAvatar}
                  alt={filteredLeaderboard[1]?.memberName}
                  className="w-16 h-16 rounded-full mx-auto border-4 border-gray-300 object-cover"
                />
                <h4 className="font-display font-semibold text-gray-900 mt-3 text-sm">{filteredLeaderboard[1]?.memberName}</h4>
                <p className="text-xs text-gray-500">{filteredLeaderboard[1]?.memberRole}</p>
                <div className="mt-2 text-base font-bold text-primary-600">
                  {filteredLeaderboard[1]?.score.toLocaleString('id-ID')} poin
                </div>
                <div className="mt-2 h-24 bg-gray-200 rounded-t-xl"></div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center order-2">
              <div className="bg-yellow-50 rounded-2xl pt-14 pb-6 px-4 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <Crown className="w-16 h-16 text-yellow-500" />
                </div>
                <img
                  src={filteredLeaderboard[0]?.memberAvatar}
                  alt={filteredLeaderboard[0]?.memberName}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-400 object-cover"
                />
                <h4 className="font-display font-bold text-gray-900 mt-3">{filteredLeaderboard[0]?.memberName}</h4>
                <p className="text-xs text-gray-500">{filteredLeaderboard[0]?.memberRole}</p>
                <div className="mt-2 text-lg font-bold text-yellow-600">
                  {filteredLeaderboard[0]?.score.toLocaleString('id-ID')} poin
                </div>
                <div className="mt-2 h-32 bg-yellow-200 rounded-t-xl"></div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center order-3">
              <div className="bg-orange-50 rounded-2xl pt-8 pb-6 px-4 relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <Award className="w-10 h-10 text-orange-400" />
                </div>
                <img
                  src={filteredLeaderboard[2]?.memberAvatar}
                  alt={filteredLeaderboard[2]?.memberName}
                  className="w-14 h-14 rounded-full mx-auto border-4 border-orange-300 object-cover"
                />
                <h4 className="font-display font-semibold text-gray-900 mt-3 text-sm">{filteredLeaderboard[2]?.memberName}</h4>
                <p className="text-xs text-gray-500">{filteredLeaderboard[2]?.memberRole}</p>
                <div className="mt-2 text-base font-bold text-primary-600">
                  {filteredLeaderboard[2]?.score.toLocaleString('id-ID')} poin
                </div>
                <div className="mt-2 h-16 bg-orange-200 rounded-t-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-gray-500">Filter:</span>
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === opt.value
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Full Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Penjual</div>
            <div className="col-span-2 text-center">Poin</div>
            <div className="col-span-2 text-center">Penjualan</div>
            <div className="col-span-2 text-center">Rating</div>
            <div className="col-span-1 text-center">Trend</div>
          </div>

          {/* Rows */}
          {filteredLeaderboard.map((entry) => (
            <div
              key={entry.memberId}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-50 hover:bg-primary-50/50 transition-colors ${
                entry.rank <= 3 ? 'bg-earth-50/30' : ''
              }`}
            >
              {/* Rank */}
              <div className="col-span-2 md:col-span-1">
                <span className={`text-lg font-bold ${entry.rank <= 3 ? 'text-earth-500' : 'text-gray-400'}`}>
                  {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                </span>
              </div>

              {/* Member */}
              <div className="col-span-10 md:col-span-4 flex items-center gap-3">
                <img src={entry.memberAvatar} alt={entry.memberName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{entry.memberName}</h4>
                  <p className="text-xs text-gray-500">{entry.memberRole}</p>
                </div>
              </div>

              {/* Score */}
              <div className="col-span-4 md:col-span-2 text-center">
                <span className="font-bold text-primary-600">{entry.score.toLocaleString('id-ID')}</span>
                <span className="text-xs text-gray-400 block">poin</span>
              </div>

              {/* Sales */}
              <div className="col-span-4 md:col-span-2 text-center">
                <span className="font-semibold text-gray-700">{entry.totalSales.toLocaleString('id-ID')}</span>
                <span className="text-xs text-gray-400 block">transaksi</span>
              </div>

              {/* Rating */}
              <div className="col-span-4 md:col-span-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-earth-400 fill-earth-400" />
                  <span className="font-semibold text-gray-700">{entry.rating}</span>
                </div>
              </div>

              {/* Trend */}
              <div className="col-span-2 md:col-span-1 text-center">
                {entry.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500 mx-auto" />}
                {entry.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500 mx-auto" />}
                {entry.trend === 'stable' && <Minus className="w-5 h-5 text-gray-400 mx-auto" />}
              </div>
            </div>
          ))}
        </div>

        {/* How Scoring Works */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-display font-bold text-lg text-gray-900 mb-4">📊 Cara Perhitungan Poin</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Total Penjualan', weight: '40%', desc: 'Jumlah transaksi yang berhasil' },
              { label: 'Rating Pelanggan', weight: '35%', desc: 'Rating rata-rata dari pembeli' },
              { label: 'Jumlah Produk', weight: '25%', desc: 'Variasi produk yang dijual' },
            ].map(item => (
              <div key={item.label} className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-bold text-primary-600">{item.weight}</div>
                <div className="font-semibold text-gray-900 mt-1">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
