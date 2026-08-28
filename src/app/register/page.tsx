'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Eye, EyeOff, UserPlus, User, Phone, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('pembeli');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('Anda harus menyetujui Syarat & Ketentuan.');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Register the user via API
      const registerRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, location, role }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || 'Gagal mendaftar. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      // Step 2: Auto sign-in after successful registration
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Registration succeeded but auto-login failed - redirect to login page
        router.push('/login?registered=1');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-forest-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C10 4 6 10 6 16C6 22 10 28 16 28C16 28 16 18 16 16C16 14 18 8 16 4Z" fill="currentColor" opacity="0.9"/>
                <path d="M16 4C22 4 26 10 26 16C26 22 22 28 16 28C16 28 16 18 16 16C16 14 14 8 16 4Z" fill="currentColor" opacity="0.6"/>
                <path d="M16 16V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 10L12 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                <path d="M16 10L20 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                <path d="M16 15L13 18" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                <path d="M16 15L19 18" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </div>
          </Link>
          <h1 className="font-display font-bold text-2xl text-gray-900 mt-4">Buat Akun Baru</h1>
          <p className="text-gray-500 mt-1">Sudah punya akun? <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700">Masuk</Link></p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

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
                  type="button"
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field pl-12"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No. HP</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="0812-xxxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field pl-12"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field cursor-pointer"
              >
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
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-600">
                Saya menyetujui <Link href="/syarat" className="text-primary-600 hover:text-primary-700">Syarat & Ketentuan</Link> dan{' '}
                <Link href="/privasi" className="text-primary-600 hover:text-primary-700">Kebijakan Privasi</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Mendaftar...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" /> Daftar Sekarang
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
