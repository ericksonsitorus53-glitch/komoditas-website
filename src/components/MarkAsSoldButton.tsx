'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CheckCircle, AlertCircle, ShoppingBag, X } from 'lucide-react';

interface MarkAsSoldButtonProps {
  productId: string;
  productName: string;
  productSlug: string;
  category: string;
  price: number;
  sellerName: string;
}

export default function MarkAsSoldButton({
  productId,
  productName,
  productSlug,
  category,
  price,
  sellerName,
}: MarkAsSoldButtonProps) {
  const { data: session } = useSession();
  const sellerEmail = session?.user?.email || '';
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerLocation, setBuyerLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: 'success' | 'error';
    message: string;
    newAchievements?: { title: string; icon: string; description: string }[];
  } | null>(null);

  // Show for any logged-in seller/petani user
  if (!session) return null;
  const userRole = (session.user as any)?.role;
  if (userRole !== 'penjual' && userRole !== 'petani') return null;

  const handleSubmit = async () => {
    if (!buyerName.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerEmail,
          sellerName,
          productId,
          productName,
          productSlug,
          category,
          price,
          quantity,
          buyerName: buyerName.trim(),
          buyerLocation: buyerLocation.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ type: 'error', message: data.error || 'Gagal mencatat penjualan.' });
        return;
      }

      setResult({
        type: 'success',
        message: `Penjualan ${productName} berhasil dicatat!`,
        newAchievements: data.newAchievements,
      });
    } catch {
      setResult({ type: 'error', message: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => { setShowModal(true); setResult(null); setQuantity(1); setBuyerName(''); setBuyerLocation(''); }}
        className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <CheckCircle className="w-5 h-5" /> Tandai Sudah Terjual
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {!result ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-900">Catat Penjualan</h3>
                    <p className="text-sm text-gray-500 truncate max-w-[250px]">{productName}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga per item</label>
                    <p className="text-lg font-bold text-primary-600">
                      Rp{price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Terjual</label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pembeli *</label>
                    <input
                      type="text"
                      placeholder="Contoh: Budi Santoso"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Pembeli</label>
                    <input
                      type="text"
                      placeholder="Contoh: Jakarta Selatan"
                      value={buyerLocation}
                      onChange={(e) => setBuyerLocation(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Total Pendapatan</p>
                    <p className="text-xl font-bold text-green-600">
                      Rp{(price * quantity).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !buyerName.trim()}
                  className="w-full mt-6 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Mencatat...
                    </span>
                  ) : (
                    'Catat Penjualan'
                  )}
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                {result.type === 'success' ? (
                  <>
                    <span className="text-5xl block mb-4">🎉</span>
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Berhasil!</h3>
                    <p className="text-gray-500 mb-4">{result.message}</p>

                    {result.newAchievements && result.newAchievements.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                        <p className="text-sm font-semibold text-amber-800 mb-3">🏆 Pencapaian Baru!</p>
                        <div className="space-y-2">
                          {result.newAchievements.map((ach, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3">
                              <span className="text-2xl">{ach.icon}</span>
                              <div className="text-left">
                                <p className="font-semibold text-gray-900 text-sm">{ach.title}</p>
                                <p className="text-xs text-gray-500">{ach.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setShowModal(false)}
                      className="btn-primary w-full"
                    >
                      Tutup
                    </button>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Gagal</h3>
                    <p className="text-gray-500 mb-4">{result.message}</p>
                    <button
                      onClick={() => setResult(null)}
                      className="btn-primary w-full"
                    >
                      Coba Lagi
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
