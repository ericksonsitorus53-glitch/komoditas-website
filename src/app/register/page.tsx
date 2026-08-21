'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, UserPlus, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('pembeli');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-forest-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              SU
            </div>
          </Link>
          <h1 className="font-display font-bold text-2xl text-gray-900 mt-4">Buat Akun Baru</h1>
          <p className="text-gray-500 mt-1">Sudah punya akun? <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700">Masuk</Link></p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Saya ingin menjadi:</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'pembeli', label: 'Pembeli', icon: '🛒' },
                { value: 'penjual', label: 'Penjual', icon: '🏪' },
                { value: 'petani', label: 'Petani', icon: '👨‍🌾' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setRole(opt.value)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    role === opt.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl block mb-1">{opt.icon}</span>
                  <span className="text-xs font-semibold">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="John Doe" className="input-field pl-12" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No. HP</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" placeholder="0812-xxxx-xxxx" className="input-field pl-12" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" placeholder="nama@email.com" className="input-field pl-12" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
              <select className="input-field cursor-pointer">
                <option value="">Pilih Kabupaten/Kota</option>
                <option>Medan</option>
                <option>Deli Serdang</option>
                <option>Karo</option>
                <option>Toba Samosir</option>
                <option>Samosir</option>
                <option>Mandailing Natal</option>
                <option>Simalungun</option>
                <option>Labuhanbatu</option>
                <option>Humbang Hasundutan</option>
                <option>Lainnya</option>
              </select>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-0.5 text-primary-600 rounded focus:ring-primary-500" />
              <span className="text-sm text-gray-600">
                Saya menyetujui <Link href="/syarat" className="text-primary-600 hover:text-primary-700">Syarat & Ketentuan</Link> dan{' '}
                <Link href="/privasi" className="text-primary-600 hover:text-primary-700">Kebijakan Privasi</Link>
              </span>
            </label>

            <button type="submit" className="btn-primary w-full py-3">
              <UserPlus className="w-5 h-5 mr-2" /> Daftar Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
