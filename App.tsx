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
import { MessageCircle, Package, Zap, ShoppingBag, Minus, Plus, Trash2, X } from 'lucide-react';
import { CartItem, Product } from './types';
import { TopBanner } from './components/TopBanner';
import { MobileNav } from './components/MobileNav';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // modal checkout langsung
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]); // item untuk checkout langsung / helper
  const [isCartPageOpen, setIsCartPageOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Safe storage helper
  const safeStorage = {
    get: (key: string) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return localStorage.getItem(key);
        }
      } catch (e) {
        console.warn('LocalStorage access denied', e);
      }
      return null;
    },
    set: (key: string, value: string) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(key, value);
        }
      } catch (e) {
        console.warn('LocalStorage save failed', e);
      }
    }
  };

  // Load keranjang dari localStorage saat pertama kali render
  useEffect(() => {
    const stored = safeStorage.get('duk_cart');
    if (stored) {
      try {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch (err) {
        console.error('Data keranjang korup', err);
      }
    }
  }, []);

  // Simpan keranjang ke localStorage setiap kali berubah
  useEffect(() => {
    safeStorage.set('duk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Focus trap management for modals
  useEffect(() => {
    if (isCheckoutOpen || isCartPageOpen) {
      const activeModal = document.querySelector('[role="dialog"]');
      if (activeModal instanceof HTMLElement) {
        activeModal.focus();
        const firstInput = activeModal.querySelector('input, button');
        if (firstInput instanceof HTMLElement) firstInput.focus();
      }
    }
  }, [isCheckoutOpen, isCartPageOpen]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setToastMessage(`${product.name} ditambahkan ke keranjang`);
    window.setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Checkout langsung dari katalog
  const handleCheckoutNow = (product: Product) => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleChangeQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleSubmitCheckout = (name: string, area: string, paymentMethod: string, isGift: boolean, giftData?: { sender: string; recipient: string; message: string }) => {
    // Format pesan WhatsApp
    const itemsList = checkoutItems
      .map((item) => `- ${item.name} (${item.quantity}x)`)
      .join('\n');

    const totalPrice = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let message = `Halo Dapur Ummu Kamila, saya ingin memesan:\n\n${itemsList}\n\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}\n\n`;

    // Header Data Pemesan
    if (isGift && giftData) {
      message += `🎁 *PESANAN HADIAH* 🎁\n`;
      message += `Dari: ${giftData.sender}\n`;
      message += `Untuk: ${giftData.recipient}\n`;
      message += `Ucapan: "${giftData.message}"\n\n`;
      message += `----------------\n`;
      message += `Kontak Pemesan: ${name}\n`;
      message += `Alamat Kirim: ${area}\n`;
    } else {
      message += `Nama: ${name}\n`;
      message += `Daerah: ${area}\n`;
    }

    message += `Pembayaran: ${paymentMethod}\n\nMohon info total ongkirnya ya kak. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');

    // Reset state
    setCartItems([]);
    setCheckoutItems([]);
    setIsCheckoutOpen(false);
    setIsCartPageOpen(false);
    setToastMessage('Pesanan berhasil dibuat! Mengalihkan ke WhatsApp...');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setIsCartPageOpen(true)} />
      <main className="flex-grow pb-16 md:pb-0"> {/* Add padding bottom for mobile nav space */}
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
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4 py-8 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in" tabIndex={-1}>
              <div className="sticky top-0 right-0 z-10 flex justify-end p-4 absolute">
                <button
                  type="button"
                  className="bg-white/80 backdrop-blur rounded-full p-2 text-gray-500 hover:text-brand-brown hover:bg-white transition-all shadow-sm"
                  onClick={handleCloseCheckout}
                  aria-label="Tutup checkout"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid md:grid-cols-5 min-h-[500px]">
                {/* Left Column: Summary (Sticky-ish visuals) */}
                <div className="md:col-span-2 bg-brand-cream/30 p-6 md:p-8 border-r border-brand-brown/5">
                  <h2 id="checkout-title" className="font-playfair text-2xl font-bold text-brand-brown mb-6 flex items-center gap-2">
                    <ShoppingBag className="text-brand-orange" size={24} />
                    Ringkasan
                  </h2>

                  <div className="space-y-4 mb-6">
                    {checkoutItems.map(item => (
                      <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-brand-brown/5 shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 text-sm line-clamp-2">{item.name}</p>
                          <div className="flex justify-between items-end mt-1">
                            <p className="text-xs text-gray-500">x{item.quantity}</p>
                            <p className="text-sm font-semibold text-brand-brown">
                              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-brand-brown/10">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold text-gray-700">Total</span>
                      <span className="font-bold text-brand-brown font-playfair text-xl">
                        Rp {checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Form */}
                <div className="md:col-span-3 p-6 md:p-10 bg-white">
                  <div className="max-w-md">
                    <h3 className="font-playfair text-3xl font-bold text-gray-800 mb-2">Detail Pengiriman</h3>
                    <p className="text-gray-500 mb-8">Lengkapi data diri Anda untuk menyelesaikan pesanan.</p>

                    <CheckoutForm onCancel={handleCloseCheckout} onSubmit={handleSubmitCheckout} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isCartPageOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4 py-8 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative animate-fade-in overflow-hidden" tabIndex={-1}>

              {/* Header - Fixed */}
              <div className="bg-white px-6 py-5 border-b border-gray-100 flex items-center justify-between z-10">
                <div>
                  <h2 id="cart-title" className="font-playfair text-2xl font-bold text-brand-brown">Keranjang Belanja</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{cartItems.length} produk pilihan</p>
                </div>
                <button
                  type="button"
                  className="bg-gray-50 p-2 rounded-full text-gray-400 hover:text-brand-brown hover:bg-brand-brown/10 transition-all"
                  onClick={() => setIsCartPageOpen(false)}
                  aria-label="Tutup keranjang"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body - Scrollable */}
              <div className="overflow-y-auto p-6 flex-1 bg-gray-50/50">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 bg-brand-cream/50 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                      <ShoppingBag size={40} className="text-brand-orange/50" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">Keranjang Masih Kosong</h3>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">Yuk isi dengan kue-kue lezat dari dapur kami.</p>
                    <Button
                      variant="primary"
                      onClick={() => setIsCartPageOpen(false)}
                      className="shadow-lg shadow-brand-orange/20"
                    >
                      Mulai Belanja
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="bg-white border-2 border-transparent hover:border-brand-orange/10 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 group">
                        {/* Image */}
                        <div className="relative w-full md:w-32 md:h-32 h-48 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                          <img
                            src={item.image}
                            alt={`${item.name} - Dapur Ummu Kamila`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex-1 mb-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                              <p className="font-bold text-lg text-brand-brown">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-4">
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Jumlah</span>
                              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-2 py-1.5">
                                <button
                                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-brand-orange hover:border-brand-orange transition-all flex items-center justify-center shadow-sm"
                                  onClick={() => handleChangeQuantity(item.id, -1)}
                                  aria-label="Kurangi"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="font-bold text-gray-800 min-w-[1.5rem] text-center">{item.quantity}</span>
                                <button
                                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-brand-orange hover:border-brand-orange transition-all flex items-center justify-center shadow-sm"
                                  onClick={() => handleChangeQuantity(item.id, 1)}
                                  aria-label="Tambah"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                              <Trash2 size={16} />
                              <span className="hidden md:inline">Hapus</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer - Sticky Bottom */}
              {cartItems.length > 0 && (
                <div className="bg-white border-t border-brand-brown/10 p-6 md:px-8 md:py-6 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                    <div className="flex items-center justify-between w-full md:w-auto md:block">
                      <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
                      <p className="font-playfair text-2xl md:text-3xl font-bold text-brand-brown">Rp {cartTotal.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                      <Button
                        variant="outline"
                        onClick={handleClearCart}
                        className="flex-1 md:flex-none"
                      >
                        Kosongkan
                      </Button>
                      <Button
                        size="lg"
                        className="flex-[2] md:flex-none shadow-xl shadow-brand-orange/20"
                        onClick={() => {
                          setCheckoutItems(cartItems);
                          setIsCheckoutOpen(true); // Open the checkout modal
                          // setIsCartPageOpen(false); // Optional: close cart? Better keep it or replace it.
                          // UX Decision: Close cart to focus on checkout
                          setIsCartPageOpen(false);
                        }}
                      >
                        Checkout Sekarang ({cartItems.reduce((a, b) => a + b.quantity, 0)})
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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
      {!isCartPageOpen && !isCheckoutOpen && <FloatingWA className="bottom-20 md:bottom-8" />} {/* Adjust FloatingWA position */}

      <MobileNav
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartPageOpen(true)}
        onMenuClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
      />
    </div>
  );
};

export default App;