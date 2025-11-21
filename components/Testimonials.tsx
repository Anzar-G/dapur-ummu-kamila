import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-brand-brown text-white relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
                <h2 className="font-playfair text-4xl font-bold text-brand-gold mb-4">Kata Mereka</h2>
                <p className="text-brand-cream/80">Apa kata pelanggan setia Dapur Ummu Kamila</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((item) => (
                    <div key={item.id} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative hover:bg-white/15 transition-colors">
                        <Quote className="absolute top-6 right-6 text-brand-gold/30 w-12 h-12" />
                        <div className="flex gap-1 mb-4 text-brand-gold">
                            {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-brand-cream/90 italic mb-6 leading-relaxed">"{item.content}"</p>
                        <div>
                            <h4 className="font-playfair font-bold text-lg text-white">{item.name}</h4>
                            <p className="text-xs text-brand-gold uppercase tracking-wider">{item.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
