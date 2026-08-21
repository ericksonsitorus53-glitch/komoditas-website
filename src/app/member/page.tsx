'use client';

import { useState } from 'react';
import { Search, MapPin, Star, Phone, Mail, Shield, Package, ShoppingCart, ChevronRight, Filter, X } from 'lucide-react';
import { members } from '@/lib/data';

const roleFilters = [
  { value: 'all', label: 'Semua', icon: '👥' },
  { value: 'petani', label: 'Petani', icon: '👨‍🌾' },
  { value: 'penjual', label: 'Penjual', icon: '🏪' },
  { value: 'distributor', label: 'Distributor', icon: '📦' },
];

const roleColors: Record<string, string> = {
  petani: 'bg-green-100 text-green-700',
  penjual: 'bg-blue-100 text-blue-700',
  distributor: 'bg-purple-100 text-purple-700',
  pembeli: 'bg-gray-100 text-gray-700',
};

export default function MemberPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const filteredMembers = members.filter(m => {
    const matchSearch = searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchRole = roleFilter === 'all' || m.role === roleFilter;
    return matchSearch && matchRole;
  });

  const activeMember = selectedMember ? members.find(m => m.id === selectedMember) : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="section-title">Daftar Member</h1>
          <p className="section-subtitle">Temukan petani, penjual, dan distributor terpercaya di Sumatera Utara</p>

          {/* Search & Filter */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, lokasi, atau spesialisasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Role Filters */}
          <div className="mt-4 flex flex-wrap gap-3">
            {roleFilters.map(role => (
              <button
                key={role.value}
                onClick={() => setRoleFilter(role.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  roleFilter === role.value
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                }`}
              >
                <span>{role.icon}</span>
                {role.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          Menampilkan <span className="font-semibold text-gray-900">{filteredMembers.length}</span> member
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Members Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMembers.map(member => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`card p-5 cursor-pointer transition-all ${
                    selectedMember === member.id ? 'ring-2 ring-primary-500 border-primary-200' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-gray-900 truncate">{member.name}</h3>
                        {member.verified && (
                          <Shield className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        )}
                      </div>
                      <span className={`badge text-[10px] ${roleColors[member.role]}`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-earth-400 fill-earth-400" />
                        <span className="font-semibold text-sm">{member.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg py-2">
                      <div className="font-bold text-gray-900">{member.totalProducts}</div>
                      <div className="text-[10px] text-gray-500">Produk</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg py-2">
                      <div className="font-bold text-gray-900">{member.totalSales.toLocaleString('id-ID')}</div>
                      <div className="text-[10px] text-gray-500">Terjual</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg py-2">
                      <div className="font-bold text-gray-900">{member.specialties.length}</div>
                      <div className="text-[10px] text-gray-500">Spesialis</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {member.specialties.slice(0, 3).map(s => (
                      <span key={s} className="badge bg-gray-100 text-gray-600 text-[10px]">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {activeMember ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <div className="text-center mb-6">
                  <img
                    src={activeMember.avatar}
                    alt={activeMember.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary-100"
                  />
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <h2 className="font-display font-bold text-xl text-gray-900">{activeMember.name}</h2>
                    {activeMember.verified && <Shield className="w-5 h-5 text-primary-500" />}
                  </div>
                  <span className={`badge mt-2 ${roleColors[activeMember.role]}`}>
                    {activeMember.role.charAt(0).toUpperCase() + activeMember.role.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 text-center mb-6">{activeMember.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{activeMember.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{activeMember.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{activeMember.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-4 h-4 text-earth-400 fill-earth-400" />
                    <span className="text-gray-700">Rating: {activeMember.rating}/5.0</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Spesialisasi</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.specialties.map(s => (
                      <span key={s} className="badge bg-primary-50 text-primary-700">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="btn-primary text-sm py-2.5">
                    <Phone className="w-4 h-4 mr-1" /> Hubungi
                  </button>
                  <button className="btn-secondary text-sm py-2.5">
                    Lihat Produk
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center sticky top-24">
                <span className="text-5xl mb-4 block">👈</span>
                <h3 className="font-display font-semibold text-gray-900 mb-2">Pilih Member</h3>
                <p className="text-sm text-gray-500">Klik pada kartu member untuk melihat detail lengkap</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
