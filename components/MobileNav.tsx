import React, { useState, useEffect } from 'react';
import { Home, ShoppingBag, ChefHat, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface MobileNavProps {
    cartCount: number;
    onCartClick: () => void;
    onMenuClick: () => void; // Scroll to menu
}

export const MobileNav: React.FC<MobileNavProps> = ({ cartCount, onCartClick, onMenuClick }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide on scroll down, show on scroll up (UX Best Practice)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navItems = [
        {
            icon: <Home size={20} />,
            label: 'Beranda',
            onClick: scrollToTop
        },
        {
            icon: <ChefHat size={20} />,
            label: 'Menu',
            active: true, // Visual cue only
            onClick: onMenuClick
        },
        {
            icon: <ShoppingBag size={20} />,
            label: 'Keranjang',
            onClick: onCartClick,
            badge: cartCount > 0 ? cartCount : null
        },
        {
            icon: <MessageCircle size={20} />,
            label: 'Chat',
            onClick: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')
        },
    ];

    return (
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            {/* Glassmorphism Background */}
            <div className="bg-white/90 backdrop-blur-lg border-t border-gray-200 pb-safe pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center relative">
                    {navItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.onClick}
                            className="flex flex-col items-center justify-center p-2 min-w-[64px] group relative"
                        >
                            <div className={`
                      transition-colors duration-200 mb-1 p-1 rounded-xl
                      ${item.label === 'Menu' ? 'text-brand-orange' : 'text-gray-400 group-hover:text-brand-brown'}
                   `}>
                                {item.icon}
                            </div>
                            <span className={`text-[10px] font-medium transition-colors ${item.label === 'Menu' ? 'text-brand-brown font-bold' : 'text-gray-500'}`}>
                                {item.label}
                            </span>

                            {/* Badge for Cart */}
                            {item.badge && (
                                <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white animate-bounce">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
