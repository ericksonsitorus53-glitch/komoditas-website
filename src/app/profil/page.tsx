'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  User, Mail, Phone, MapPin, Lock, Eye, EyeOff, Save,
  Camera, LogOut, Shield, ChevronRight, AlertCircle, CheckCircle
} from 'lucide-react';

export default function ProfilPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  // Fill form with session data
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
    }
  }, [session]);

  // Redirect if not logged in
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileMsg('');
    // Simulate save (demo mode — no real backend persistence)
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setProfileMsg('Profil berhasil disimpan!');
    setTimeout(() => setProfileMsg(''), 3000);
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg('');
    if (!currentPassword || !newPassword) {
      setPwMsg('Semua field harus diisi.');
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg('Password baru minimal 6 karakter.');
      return;
    }
    setPwSaving(true);
    // Simulate save (demo mode)
    await new Promise(r => setTimeout(r, 1000));
    setPwSaving(false);
    setPwMsg('Password berhasil diubah!');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPwMsg(''), 3000);
  };

  const userInitial = session.user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600">Beranda</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Profil Saya</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Profil Saya</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola informasi akun dan keamanan Anda</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary-500 to-forest-600 h-24"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-10">
              <div className="relative">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Avatar"
                    className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-4 border-white bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {userInitial}
                  </div>
                )}
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center sm:text-left flex-1 pb-1">
                <h2 className="font-display font-bold text-xl text-gray-900">{session.user?.name}</h2>
                <p className="text-sm text-gray-500">{session.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'profile' as const, label: 'Profil', icon: User },
            { key: 'security' as const, label: 'Keamanan', icon: Shield },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setProfileMsg(''); setPwMsg(''); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-lg text-gray-900 mb-6">Informasi Profil</h3>

            {profileMsg && (
              <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm ${
                profileMsg.includes('berhasil')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {profileMsg.includes('berhasil') ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {profileMsg}
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={session.user?.email || ''}
                    disabled
                    className="input-field pl-12 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No. HP</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="input-field pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field pl-12 cursor-pointer"
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
              </div>

              <button
                type="submit"
                disabled={saving}
                className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Menyimpan...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> Simpan Perubahan
                  </span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-lg text-gray-900 mb-6">Ubah Password</h3>

            {pwMsg && (
              <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm ${
                pwMsg.includes('berhasil')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {pwMsg.includes('berhasil') ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {pwMsg}
              </div>
            )}

            <form onSubmit={handlePasswordSave} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini"
                    className="input-field pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="input-field pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={pwSaving}
                className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pwSaving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengubah...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Ubah Password
                  </span>
                )}
              </button>
            </form>

            {/* Danger Zone */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">Zona Berbahaya</h4>
              <p className="text-sm text-gray-500 mb-4">Hapus akun Anda secara permanen. Tindakan ini tidak dapat dibatalkan.</p>
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-all">
                Hapus Akun
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
