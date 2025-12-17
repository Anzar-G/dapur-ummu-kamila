import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'menu', 'how-to-order', 'faq', 'final-cta'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        const mostVisible = visibleEntries.reduce((prev, curr) =>
          prev.intersectionRatio > curr.intersectionRatio ? prev : curr
        );

        if (mostVisible.target.id) {
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: [0.3, 0.6],
        rootMargin: '-80px 0px -40% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Cara Pesan', href: '#how-to-order' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-brand-cream/80 backdrop-blur-md shadow-sm py-3 border-b border-white/20'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isScrolled ? 'bg-brand-brown text-brand-gold' : 'bg-white text-brand-brown shadow-lg'
              }`}>
              <ShoppingBag size={24} />
            </div>
            <div>
              <h1 className={`font-playfair font-bold text-xl md:text-2xl leading-none group-hover:text-brand-orange transition-colors ${isScrolled ? 'text-brand-brown' : 'text-brand-dark'
                }`}>
                Dapur Ummu Kamila
              </h1>
              <p className="text-[10px] text-gray-500 font-poppins tracking-wider uppercase pl-0.5">Homemade Bakery</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-all duration-300 text-sm tracking-wide relative hover:-translate-y-0.5 ${activeSection === link.href.replace('#', '')
                    ? 'text-brand-orange font-semibold'
                    : 'text-gray-700 hover:text-brand-brown'
                  }`}
              >
                {link.name}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                )}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <button
              type="button"
              onClick={onCartClick}
              className="relative group p-2 rounded-full hover:bg-brand-cream transition-colors"
            >
              <ShoppingCart size={22} className="text-brand-brown group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center px-1 shadow-sm border border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <Button
              size="sm"
              variant="primary"
              className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Pesan Sekarang
            </Button>
          </nav>

          {/* Mobile Actions: Keranjang + Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onCartClick}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-brand-brown shadow-sm border border-brand-brown/10 active:scale-95 transition-transform"
              aria-label="Buka Keranjang"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center px-1 border-2 border-brand-cream">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-brand-brown p-2 bg-white/50 backdrop-blur-sm rounded-lg active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-cream/95 backdrop-blur-xl shadow-xl border-t border-brand-brown/10 flex flex-col p-6 animate-fade-in origin-top">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`py-4 px-6 text-lg font-medium rounded-xl transition-all ${activeSection === link.href.replace('#', '')
                    ? 'bg-brand-brown/10 text-brand-brown translate-x-2'
                    : 'text-gray-600 hover:bg-white/50'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <Button
              fullWidth
              variant="primary"
              size="lg"
              className="shadow-md"
              onClick={() => {
                document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
