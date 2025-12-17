import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { Plane, MessageCircle } from 'lucide-react';
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

          {(product.stockLabel || product.isBestSeller || !product.isShippable) && (
            <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
              {/* Scarcity Badge (New) */}
              {product.stockLabel && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-pulse">
                  {product.stockLabel}
                </span>
              )}
              {product.isShippable && (
                <span className="bg-white/95 backdrop-blur-md text-brand-brown text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-brand-brown/10">
                  <Plane size={11} className="text-brand-orange" />
                  Luar Kota
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-brand-gold text-brand-brown text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                  Best Seller
                </span>
              )}
              {!product.isShippable && (
                <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                  Semarang Only
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow relative">
          <div className="flex-grow">
            <h3 className="font-playfair font-bold text-xl md:text-2xl text-brand-dark mb-3 leading-snug group-hover:text-brand-brown transition-colors">
              {product.name}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 font-poppins leading-relaxed opacity-90">
              {product.description}
            </p>

            {product.pairing && (
              <div className="mb-6 flex items-start gap-2 text-xs bg-brand-orange/5 p-2 rounded-lg border border-brand-orange/10">
                <span role="img" aria-label="pairing" className="mt-0.5">☕</span>
                <p className="text-brand-brown">
                  <span className="font-bold">Perfect Pairing:</span> {product.pairing}
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="mb-5 bg-brand-cream/40 -mx-8 -mt-6 px-8 py-4 border-b border-brand-brown/5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-brand-brown/70 font-medium uppercase tracking-wider">Harga</span>
                <span className="text-3xl font-bold font-playfair text-brand-brown">
                  <span className="text-lg align-top mr-1">Rp</span>
                  {(product.price / 1000).toLocaleString('id-ID')}k
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Button
                fullWidth
                variant="outline"
                className="md:flex-1 border-brand-brown/30 text-brand-brown hover:bg-brand-brown/5"
                onClick={() => onAddToCart && onAddToCart(product)}
              >
                + Keranjang
              </Button>
              <Button
                fullWidth
                variant="primary"
                className="md:flex-[1.5] shadow-lg shadow-brand-orange/25 group-hover:shadow-brand-orange/40 transition-shadow"
                onClick={handleOrder}
                icon={<MessageCircle size={18} />}
              >
                Pesan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};