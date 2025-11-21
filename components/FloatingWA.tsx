import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export const FloatingWA: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group"
      aria-label="Chat WhatsApp"
    >
      <span className="bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
        Butuh bantuan? Chat kami!
      </span>
      <div className="w-14 h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 animate-pulse-slow relative">
          <MessageCircle size={32} fill="white" className="relative z-10" />
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      </div>
    </a>
  );
};
