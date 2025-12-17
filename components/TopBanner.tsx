import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export const TopBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-[#FFF8E1] text-brand-brown text-xs py-2 px-4 relative z-[60] border-b border-brand-gold/20 animate-slide-down">
            <div className="container mx-auto flex items-center justify-between gap-4">

                {/* Content - Clickable */}
                <div
                    className="flex-1 flex items-center justify-center md:justify-center gap-3 cursor-pointer group"
                    onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <div className="flex items-center gap-2">
                        <span className="bg-green-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Promo
                        </span>
                        <p className="font-medium truncate group-hover:underline">
                            <Sparkles size={12} className="inline mr-1 text-brand-gold fill-brand-gold" />
                            Gratis Ongkir se-Semarang! <span className="hidden md:inline text-gray-500 font-normal">| Order via WA</span>
                        </p>
                    </div>
                    <button className="hidden md:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider border-b border-brand-brown hover:text-brand-orange hover:border-brand-orange transition-colors">
                        Pesan Sekarang <ArrowRight size={10} />
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsVisible(false);
                    }}
                    className="hover:bg-brand-brown/10 p-1 rounded-full transition-colors flex-shrink-0"
                    aria-label="Tutup banner"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
};
