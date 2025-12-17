import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { Plane, MessageCircle, ShoppingBag } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onCheckoutNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onCheckoutNow }) => {
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
    if (onCheckoutNow) {
      onCheckoutNow(product);
      return;
    }
    const text = `Halo Dapur Ummu Kamila, saya mau pesan *${product.name}* yang harganya Rp${product.price.toLocaleString('id-ID')}. Apakah masih tersedia?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      ref={cardRef}
      className={`h-full transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
    >
      <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col h-full border border-gray-100 overflow-hidden hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden h-64 w-full bg-gray-50">
          <img
            src={product.image}
            alt={`${product.name} - kue homemade premium Dapur Ummu Kamila`}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow relative">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-playfair font-bold text-xl text-brand-brown leading-tight mb-1 group-hover:text-brand-orange transition-colors">
                  {product.name}
                </h3>
                {/* Compact Badges Line */}
                <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider mb-2">
                  {product.isBestSeller && <span className="text-brand-gold">★ Best Seller</span>}
                  {product.isShippable ? (
                    <span className="text-green-600">✓ Bisa Luar Kota</span>
                  ) : (
                    <span className="text-brand-orange">Depok Only</span>
                  )}
                </div>
              </div>
              {/* Scarcity Badge Top Right of Content */}
              {product.stockLabel && (
                <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-1 rounded-md border border-red-100 animate-pulse whitespace-nowrap">
                  {product.stockLabel}
                </span>
              )}
            </div>

            <p className="font-poppins font-bold text-2xl text-brand-dark mb-3">
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-poppins leading-relaxed opacity-90 h-10">
              {product.description}
            </p>

            {/* Subtle Pairing */}
            {product.pairing && (
              <div className="mb-4 flex items-center gap-1.5 text-xs text-gray-500 italic bg-gray-50 p-1.5 rounded w-fit">
                <span role="img" aria-label="pairing">☕</span>
                <span>Pas banget sama: <span className="font-medium text-gray-700">{product.pairing}</span></span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange text-xs"
              onClick={() => onAddToCart && onAddToCart(product)}
              icon={<ShoppingBag size={14} />}
            >
              Keranjang
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-[1.5] text-xs shadow-md shadow-brand-orange/10"
              onClick={handleOrder} // Changed to handleOrder
              icon={<MessageCircle size={14} />} // Added icon
            >
              Pesan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};