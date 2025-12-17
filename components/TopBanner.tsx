import React, { useState } from 'react';
import { X, Sparkles, Clock } from 'lucide-react';

export const TopBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-brand-brown to-brand-brown/90 text-white text-sm py-2 px-4 relative z-50 shadow-sm animate-slide-up">
            <div className="container mx-auto flex items-center justify-between md:justify-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="bg-brand-gold text-brand-dark font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse-slow">
                        Promo
                    </span>
                    <p className="font-medium truncate">
                        <Sparkles size={14} className="inline mr-1 text-brand-gold" />
                        Gratis Ongkir se-Semarang khusus hari ini! <span className="hidden md:inline text-brand-gold/80">| Slot terbatas</span>
                    </p>
                </div>

                {/* Countdown Visual (Static for now) */}
                <div className="hidden md:flex items-center gap-1.5 text-xs text-brand-cream/80 bg-white/10 px-2 py-0.5 rounded-md">
                    <Clock size={12} />
                    <span>Berakhir dalam 04:59:00</span>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="md:absolute md:right-4 hover:bg-white/20 p-1 rounded-full transition-colors"
                    aria-label="Tutup banner"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
};
