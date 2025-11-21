import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { Plane, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleOrder = () => {
    const text = `Halo Dapur Ummu Kamila, saya mau pesan *${product.name}* yang harganya Rp${product.price.toLocaleString('id-ID')}. Apakah masih tersedia?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      ref={cardRef}
      className={`h-full transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col h-full border border-brand-brown/5">
        {/* Changed from aspect-square to fixed height landscape for better space optimization */}
        <div className="relative overflow-hidden h-48 md:h-56 w-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {product.isShippable && (
            <div className="absolute top-3 right-3 bg-brand-gold/90 backdrop-blur-sm text-brand-brown text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Plane size={12} fill="currentColor" />
              Luar Kota
            </div>
          )}
          {product.isBestSeller && (
            <div className="absolute top-3 left-3 bg-brand-brown text-brand-gold text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Best Seller
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-playfair font-bold text-lg md:text-xl text-gray-800 leading-tight line-clamp-1">{product.name}</h3>
          </div>
          
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
               <span className="text-brand-orange font-bold text-lg">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>
            <Button 
              fullWidth 
              variant="secondary" 
              size="sm"
              onClick={handleOrder}
              icon={<MessageCircle size={16} />}
            >
              Pesan via WA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};