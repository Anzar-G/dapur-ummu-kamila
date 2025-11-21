import React from 'react';
import { Instagram, Facebook, ShoppingBag, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-cream/80 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
             <div className="flex items-center gap-2 mb-4 text-brand-gold">
                <ShoppingBag size={24} />
                <h2 className="font-playfair font-bold text-2xl">Dapur Ummu Kamila</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed max-w-sm">
              Menyajikan kue dan roti homemade berkualitas premium, dibuat segar setiap hari dengan bahan halal dan tanpa pengawet.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-orange flex items-center justify-center transition-colors text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-orange flex items-center justify-center transition-colors text-white">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-playfair font-bold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-brand-gold transition-colors">Beranda</a></li>
              <li><a href="#menu" className="hover:text-brand-gold transition-colors">Menu Favorit</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">Tentang Kami</a></li>
              <li><a href="#how-to-order" className="hover:text-brand-gold transition-colors">Cara Pemesanan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-playfair font-bold text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                 <MapPin size={18} className="text-brand-gold mt-0.5 shrink-0" />
                 <span>Jl. Merpati No. 123, Banyumanik, Semarang, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone size={18} className="text-brand-gold shrink-0" />
                 <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                 <Mail size={18} className="text-brand-gold shrink-0" />
                 <span>order@dapurummukamila.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Dapur Ummu Kamila. All rights reserved.</p>
          <p className="flex items-center gap-1">Designed with <Heart size={12} fill="currentColor" className="text-brand-orange" /> for local business.</p>
        </div>
      </div>
    </footer>
  );
};