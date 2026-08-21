'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Headphones, FileText } from 'lucide-react';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="section-title">Hubungi Kami</h1>
          <p className="section-subtitle">Ada pertanyaan? Kami siap membantu Anda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: MapPin, title: 'Alamat', value: 'Jl. Pemuda No. 123\nMedan, Sumatera Utara 20231', color: 'bg-primary-50 text-primary-500' },
              { icon: Phone, title: 'Telepon', value: '+62 61-1234-5678\n+62 812-3456-7890', color: 'bg-earth-50 text-earth-500' },
              { icon: Mail, title: 'Email', value: 'info@komoditassumut.id\nsupport@komoditassumut.id', color: 'bg-blue-50 text-blue-500' },
              { icon: Clock, title: 'Jam Operasional', value: 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 12:00', color: 'bg-purple-50 text-purple-500' },
            ].map(({ icon: Icon, title, value, color }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 whitespace-pre-line mt-1">{value}</p>
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: MessageSquare, label: 'Live Chat', color: 'bg-primary-50 text-primary-500' },
                { icon: Headphones, label: 'WhatsApp', color: 'bg-green-50 text-green-500' },
                { icon: FileText, label: 'FAQ', color: 'bg-earth-50 text-earth-500' },
              ].map(({ icon: Icon, label, color }) => (
                <button key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
                  <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                  <span className="text-xs font-medium text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-6">Kirim Pesan</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input type="text" placeholder="John Doe" className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" placeholder="nama@email.com" className="input-field" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">No. WhatsApp</label>
                    <input type="tel" placeholder="0812-xxxx-xxxx" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjek *</label>
                    <select className="input-field cursor-pointer" required>
                      <option value="">Pilih subjek</option>
                      <option>Pertanyaan Umum</option>
                      <option>Daftar Menjadi Penjual</option>
                      <option>Masalah Transaksi</option>
                      <option>Pengiriman & Logistik</option>
                      <option>Kerjasama Bisnis</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pesan *</label>
                  <textarea rows={5} placeholder="Tulis pesan Anda di sini..." className="input-field resize-none" required></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  <Send className="w-5 h-5 mr-2" /> Kirim Pesan
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-gray-100 h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Peta Lokasi Kantor Pusat</p>
                  <p className="text-xs">Jl. Pemuda No. 123, Medan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
