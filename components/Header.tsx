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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center text-brand-gold">
                <ShoppingBag size={20} />
            </div>
            <div>
              <h1 className="font-playfair font-bold text-xl md:text-2xl text-brand-brown leading-none group-hover:text-brand-orange transition-colors">
                Dapur Ummu Kamila
              </h1>
              <p className="text-[10px] text-gray-500 font-poppins tracking-wider uppercase">Homemade Bakery</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`font-medium transition-colors text-sm tracking-wide relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:transition-all ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-brand-brown after:w-full after:bg-brand-brown'
                    : 'text-gray-700 hover:text-brand-brown after:w-0 after:bg-brand-brown hover:after:w-full'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={onCartClick}
              className="relative inline-flex items-center gap-2 text-sm text-brand-brown hover:text-brand-orange transition-colors"
            >
              <ShoppingCart size={18} />
              <span>Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] rounded-full bg-brand-orange text-white text-[10px] flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
            <Button 
              size="sm" 
              variant="primary"
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Pesan Sekarang
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-brand-brown p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-cream shadow-lg border-t border-brand-brown/10 flex flex-col p-4 animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="py-3 px-4 text-gray-700 hover:bg-brand-brown/5 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            className="flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-brand-brown/5 rounded-lg mt-1"
            onClick={() => {
              onCartClick();
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={18} className="text-brand-brown" />
              <span>Keranjang</span>
            </span>
            {cartCount > 0 && (
              <span className="min-w-[18px] h-[18px] rounded-full bg-brand-orange text-white text-[10px] flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </button>
          <div className="mt-4 px-4">
             <Button 
              fullWidth
              variant="primary"
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
