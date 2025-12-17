import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-brand-cream relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#8B4513 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Testimoni</span>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-brown mb-4">Kata Mereka</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">Apa kata pelanggan setia tentang kelezatan kue Dapur Ummu Kamila</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-brown/5 group">
                            <Quote className="absolute top-8 right-8 text-brand-orange/10 w-12 h-12 transform group-hover:scale-110 transition-transform" />

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-cream shadow-sm"
                                    loading="lazy"
                                />
                                <div>
                                    <h4 className="font-playfair font-bold text-lg text-gray-900">{item.name}</h4>
                                    <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">{item.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4 relative z-10 text-brand-gold">
                                {[...Array(item.rating || 5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-600 italic leading-relaxed relative z-10">"{item.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
