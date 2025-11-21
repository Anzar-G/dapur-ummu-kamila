import React from 'react';
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
import { WHATSAPP_NUMBER } from './constants';
import { Button } from './components/Button';
import { MessageCircle, Package, Zap } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
        <Menu />
        
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
      <Footer />
      <FloatingWA />
    </div>
  );
};

export default App;