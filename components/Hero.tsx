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
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand-gold/20 text-brand-brown font-medium text-sm backdrop-blur-sm border border-brand-gold/30">
            <Sparkles size={16} className="text-brand-brown" />
            <span>Cita Rasa Rumahan, Kualitas Istimewa</span>
          </div>
          
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-brand-brown mb-6 leading-tight">
            Kue & Roti <br />
            <span className="text-brand-orange">Homemade</span> Semarang
          </h1>
          
          <p className="font-poppins text-gray-700 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Fresh from oven, dibuat dengan bahan premium dan penuh cinta untuk menemani momen manis bersama keluarga Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              icon={<ArrowRight size={20} />}
            >
              Lihat Menu
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/50 backdrop-blur-sm"
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
              icon={<MessageCircle size={20} />}
            >
              Pesan Sekarang
            </Button>
          </div>

          {/* Mini Social Proof */}
          <div className="mt-12 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <img key={i} src={`https://picsum.photos/id/${100+i}/50/50`} alt="Customer" className="w-10 h-10 rounded-full border-2 border-white" />
               ))}
            </div>
            <div>
              <p className="font-bold text-brand-brown">1000+ Pelanggan Puas</p>
              <p className="text-xs">Di Semarang & Sekitarnya</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};