import React from 'react';
import { Button } from './Button';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden scroll-mt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background.jpeg"
          alt="Fresh Bakery Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/90 via-brand-cream/70 to-transparent md:via-brand-cream/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl relative">
          {/* Decorative floating element */}
          <div className="absolute -top-20 -right-20 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl animate-pulse-slow"></div>

          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/40 text-brand-dark font-medium text-sm backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md transition-shadow cursor-default animate-fade-in">
            <Sparkles size={16} className="text-brand-gold fill-brand-gold" />
            <span className="tracking-wide">Cita Rasa Rumahan, Kualitas Istimewa</span>
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-brand-dark mb-6 leading-tight drop-shadow-sm animate-slide-up">
            Kue & Roti <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-brown to-brand-orange relative">
              Homemade
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-gold/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 25 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Semarang
          </h1>

          <p className="font-poppins text-gray-800 text-lg md:text-xl mb-10 leading-relaxed max-w-lg animate-slide-up [animation-delay:200ms]">
            Fresh from oven, dibuat dengan bahan premium alami dan penuh cinta untuk menemani momen manis bersama keluarga Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:400ms]">
            <Button
              variant="primary"
              size="lg"
              className="shadow-xl shadow-brand-orange/20 hover:shadow-2xl hover:shadow-brand-orange/30 hover:-translate-y-1 transition-all"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              icon={<ArrowRight size={20} />}
            >
              Lihat Menu
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/60 backdrop-blur-md border-brand-brown/20 text-brand-brown hover:bg-brand-brown hover:text-white transition-all hover:border-brand-brown"
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
              icon={<MessageCircle size={20} />}
            >
              Pesan Sekarang
            </Button>
          </div>

          {/* Mini Social Proof */}
          <div className="mt-14 flex items-center gap-5 text-sm py-4 px-6 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 w-fit animate-slide-up [animation-delay:600ms]">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/id/${150 + i}/50/50`} alt="Customer" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              ))}
              <div className="w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">+1k</div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-brand-dark text-base tracking-tight">1,200+ Pelanggan Puas</span>
              <span className="text-xs text-gray-600 font-medium">Di Semarang & Sekitarnya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};