'use client';

import { useState } from 'react';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import Image from 'next/image';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    notes: '',
  });

  const shippingCost = totalPrice > 500000 ? 0 : 50000;
  const grandTotal = totalPrice + shippingCost;

  const handleCheckout = () => {
    // In a real app, this would process the order
    setCheckoutStep('success');
    clearCart();
  };

  if (items.length === 0 && checkoutStep !== 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h1>
          <p className="text-gray-500 mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
          <Link href="/produk" className="btn-primary inline-flex items-center gap-2">
            Mulai Belanja <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
          <p className="text-gray-500 mb-4">Terima kasih telah berbelanja di KomoditasSumut</p>
          <p className="text-sm text-gray-400 mb-6">Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi pesanan</p>
          <Link href="/produk" className="btn-primary inline-flex items-center gap-2">
            Lanjutkan Belanja <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="section-title">Keranjang Belanja</h1>
          <p className="section-subtitle">{totalItems} produk dalam keranjang</p>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8 gap-4">
            {[
              { key: 'cart', label: 'Keranjang', icon: ShoppingBag },
              { key: 'shipping', label: 'Pengiriman', icon: Truck },
              { key: 'payment', label: 'Pembayaran', icon: CreditCard },
            ].map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  checkoutStep === step.key 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    checkoutStep === step.key ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {checkoutStep === 'cart' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Produk dalam Keranjang</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-6 flex gap-4">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.origin}</p>
                        <p className="text-sm text-primary-600 font-medium mt-1">
                          {formatPrice(item.product.price)} / {item.product.unit}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-gray-50">
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    Lanjut ke Pengiriman <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 'shipping' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-6">Informasi Pengiriman</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      className="input-field"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="input-field"
                      placeholder="08xxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                    <textarea
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="input-field"
                      rows={3}
                      placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="input-field"
                        placeholder="Kota/Kabupaten"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                      <input
                        type="text"
                        value={shippingInfo.province}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, province: e.target.value })}
                        className="input-field"
                        placeholder="Provinsi"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
                    <textarea
                      value={shippingInfo.notes}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, notes: e.target.value })}
                      className="input-field"
                      rows={2}
                      placeholder="Catatan untuk penjual"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="btn-secondary flex-1"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setCheckoutStep('payment')}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    Lanjut ke Pembayaran <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-6">Konfirmasi Pesanan</h2>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Detail Pengiriman</h3>
                    <p className="text-sm text-gray-600">{shippingInfo.name}</p>
                    <p className="text-sm text-gray-600">{shippingInfo.phone}</p>
                    <p className="text-sm text-gray-600">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.province}</p>
                    {shippingInfo.notes && (
                      <p className="text-sm text-gray-500 mt-2">Catatan: {shippingInfo.notes}</p>
                    )}
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <h3 className="font-medium text-green-900 mb-2">Metode Pembayaran</h3>
                    <p className="text-sm text-green-700">Bayar via WhatsApp</p>
                    <p className="text-xs text-green-600 mt-1">Anda akan diarahkan ke WhatsApp untuk konfirmasi dan pembayaran</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="btn-secondary flex-1"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 1.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Pesan via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium text-gray-900">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkos Kirim</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                    {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
                  </span>
                </div>
                {shippingCost === 0 && (
                  <p className="text-xs text-green-600">🎉 Gratis ongkir untuk pembelian di atas Rp 500.000</p>
                )}
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-primary-600">{formatPrice(grandTotal)}</span>
                </div>
              </div>
              {checkoutStep === 'cart' && (
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="w-full btn-primary mt-6 flex items-center justify-center gap-2"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
