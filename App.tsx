import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { About } from './components/About';
import { Menu } from './components/Menu';
import { Steps } from './components/Steps';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingWA } from './components/FloatingWA';
import { CheckoutForm } from './components/CheckoutForm';
import { WHATSAPP_NUMBER } from './constants';
import { Button } from './components/Button';
import { MessageCircle, Package, Zap } from 'lucide-react';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // modal checkout langsung
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]); // item untuk checkout langsung / helper
  const [isCartPageOpen, setIsCartPageOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load keranjang dari localStorage saat pertama kali render
  useEffect(() => {
    try {
      const stored = localStorage.getItem('duk_cart');
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (err) {
      console.error('Gagal memuat keranjang dari localStorage', err);
    }
  }, []);

  // Simpan keranjang ke localStorage setiap kali berubah
  useEffect(() => {
    try {
      localStorage.setItem('duk_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Gagal menyimpan keranjang ke localStorage', err);
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        next = [...prev, { ...product, quantity: 1 }];
      }
      try {
        localStorage.setItem('duk_cart', JSON.stringify(next));
      } catch (err) {
        console.error('Gagal menyimpan keranjang ke localStorage dari handleAddToCart', err);
      }
      return next;
    });

    setToastMessage(`${product.name} ditambahkan ke keranjang`);
    window.setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Checkout langsung dari katalog: buka modal khusus dengan 1 produk
  const handleCheckoutNow = (product: Product) => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => {
      const next = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem('duk_cart', JSON.stringify(next));
      } catch (err) {
        console.error('Gagal menyimpan keranjang ke localStorage dari handleRemoveFromCart', err);
      }
      return next;
    });
  };

  const handleChangeQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      const next = prev
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter(item => item.quantity > 0);
      try {
        localStorage.setItem('duk_cart', JSON.stringify(next));
      } catch (err) {
        console.error('Gagal menyimpan keranjang ke localStorage dari handleChangeQuantity', err);
      }
      return next;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.setItem('duk_cart', JSON.stringify([]));
    } catch (err) {
      console.error('Gagal mengosongkan keranjang di localStorage', err);
    }
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleSubmitCheckout = (name: string, area: string, paymentMethod: string) => {
    if (checkoutItems.length === 0) return;

    const lines = checkoutItems.map(item => `- ${item.name} x${item.quantity} (Rp ${item.price.toLocaleString('id-ID')})`);
    const total = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const text = [
      'Halo Dapur Ummu Kamila, saya ingin melakukan pemesanan:',
      '',
      ...lines,
      '',
      `Total perkiraan: Rp ${total.toLocaleString('id-ID')}`,
      '',
      `Nama: ${name}`,
      `Daerah: ${area}`,
      `Metode Pembayaran: ${paymentMethod}`,
      '',
      'Mohon konfirmasinya ya.'
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setIsCheckoutOpen(false);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setIsCartPageOpen(true)} />
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
        <Menu onAddToCart={handleAddToCart} onCheckoutNow={handleCheckoutNow} />
        
        {/* Shipping Divider Section */}
        <section className="py-16 bg-brand-orange text-white text-center px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Pengiriman Aman ke Seluruh Jawa</h2>
            <p className="text-lg mb-8 opacity-90">Kami menjamin paket Anda dikemas dengan aman menggunakan bubble wrap tebal dan box kokoh. Garansi sampai tujuan dengan selamat.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-sm font-bold uppercase tracking-wider opacity-90">
              <span className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Package size={18} />
                Packing Kayu (Opsional)
              </span>
              <span className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Zap size={18} />
                Ekspedisi Next Day
              </span>
            </div>
          </div>
        </section>

        <Steps />
        <Testimonials />
        <FAQ />

        {/* Modal checkout langsung (dari tombol Checkout Sekarang) */}
        {isCheckoutOpen && checkoutItems.length > 0 && (
          <section className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-brown">Checkout Produk</h2>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-brand-brown"
                  onClick={handleCloseCheckout}
                >
                  Tutup
                </button>
              </div>

              <div className="mb-4 text-sm bg-brand-cream/60 border border-brand-brown/10 rounded-xl p-3 md:p-4">
                <p className="font-semibold text-brand-brown mb-2">Ringkasan Pesanan:</p>
                <ul className="space-y-1">
                  {checkoutItems.map(item => (
                    <li key={item.id} className="flex justify-between gap-3">
                      <span className="text-gray-700 line-clamp-1">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-gray-800 font-medium">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-gray-600 mb-4">Isi data di bawah ini, lalu Anda akan diarahkan ke WhatsApp untuk konfirmasi dengan admin.</p>
              <CheckoutForm onCancel={handleCloseCheckout} onSubmit={handleSubmitCheckout} />
            </div>
          </section>
        )}

        {isCartPageOpen && (
          <section className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-brown">Keranjang Belanja</h2>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-brand-brown"
                  onClick={() => setIsCartPageOpen(false)}
                >
                  Tutup
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-600">Keranjang Anda masih kosong. Silakan pilih produk dari menu.</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3 text-sm md:text-base border border-gray-100 rounded-xl p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Rp {item.price.toLocaleString('id-ID')} / pcs</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 text-gray-500">
                              <span className="text-xs md:text-sm">Qty:</span>
                              <div className="inline-flex items-center border border-gray-200 rounded-full overflow-hidden text-xs md:text-sm bg-white">
                                <button
                                  type="button"
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  onClick={() => handleChangeQuantity(item.id, -1)}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-gray-800 min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  onClick={() => handleChangeQuantity(item.id, 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-brand-brown font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                              <button
                                type="button"
                                className="text-[11px] text-red-500 hover:underline mt-1"
                                onClick={() => handleRemoveFromCart(item.id)}
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-brand-cream/70 rounded-xl p-4 border border-brand-brown/10 text-sm md:text-base">
                      <p className="font-semibold text-brand-brown mb-2">Ringkasan</p>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Total Item</span>
                        <span className="font-medium text-gray-800">{cartItems.reduce((sum, i) => sum + i.quantity, 0)}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600">Total Harga</span>
                        <span className="font-semibold text-brand-brown">Rp {cartTotal.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    <div className="border border-gray-100 rounded-xl p-4 text-sm md:text-base">
                      <p className="font-semibold text-brand-brown mb-2">Data Pemesan</p>
                      <CheckoutForm
                        onCancel={() => setIsCartPageOpen(false)}
                        onSubmit={(name, area, paymentMethod) => {
                          // Checkout lewat keranjang: gunakan seluruh isi keranjang
                          setCheckoutItems(cartItems);
                          handleSubmitCheckout(name, area, paymentMethod);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={handleClearCart}
                      >
                        Kosongkan Keranjang
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section id="final-cta" className="py-20 bg-brand-cream text-center px-4 scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-brown mb-6">Sudah Siap Mencicipi?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Jangan tunggu nanti. Pesan sekarang dan nikmati kehangatan kue homemade Dapur Ummu Kamila bersama keluarga tercinta.
            </p>
            <Button 
              size="lg" 
              className="animate-bounce"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
              icon={<MessageCircle size={20} />}
            >
              Order via WhatsApp Sekarang
            </Button>
          </div>
        </section>
      </main>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-40 bg-brand-brown text-white text-sm md:text-base px-4 py-3 rounded-full shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
      <Footer />
      {!isCartPageOpen && !isCheckoutOpen && <FloatingWA />}
    </div>
  );
};

export default App;