import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  products: Product[];
  bgClass?: string;
  icon?: React.ReactNode;
  onAddToCart?: (product: Product) => void;
  onCheckoutNow?: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, subtitle, products, bgClass = "", icon, onAddToCart, onCheckoutNow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsVisible(2);
      } else {
        setItemsVisible(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsVisible);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX);
      setTouchDeltaX(0);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    const threshold = 50; // px minimal untuk dianggap swipe
    if (touchDeltaX > threshold) {
      prevSlide();
    } else if (touchDeltaX < -threshold) {
      nextSlide();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <div className={`py-20 md:py-24 relative group ${bgClass}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              {icon && <div className="text-brand-orange bg-brand-orange/10 p-2 rounded-xl">{icon}</div>}
              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-brand-brown leading-tight">{title}</h3>
            </div>
            <p className="text-gray-600 text-base md:text-lg pl-1 max-w-xl leading-relaxed">{subtitle}</p>
          </div>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden -mx-4 py-8 px-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 px-4 ${itemsVisible === 2 ? 'w-1/2' : 'w-full'}`}
                >
                  <div className="h-full">
                    <ProductCard product={product} onAddToCart={onAddToCart} onCheckoutNow={onCheckoutNow} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Overlay Centered */}
          {products.length > itemsVisible && (
            <>
              {currentIndex > 0 && (
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 text-brand-brown hover:scale-110 hover:bg-brand-brown hover:text-white transition-all duration-300 flex items-center justify-center -ml-2 md:-ml-6"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {currentIndex < maxIndex && (
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 text-brand-brown hover:scale-110 hover:bg-brand-brown hover:text-white transition-all duration-300 flex items-center justify-center -mr-2 md:-mr-6"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </>
          )}

          {/* Dot Indicators */}
          {products.length > itemsVisible && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                      ? 'bg-brand-orange w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-brand-brown/10">
              <p className="text-gray-500 font-medium">Produk untuk kategori ini sedang restock.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};