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

  return (
    <div className={`py-12 ${bgClass}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  {icon && <div className="text-brand-orange">{icon}</div>}
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-brand-brown">{title}</h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base pl-1">{subtitle}</p>
            </div>
            
            {/* Navigation Buttons - Top Right for easier access */}
            {products.length > itemsVisible && (
                <div className="flex gap-2">
                    <button 
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className="bg-white text-brand-brown p-2 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-brand-brown/10"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextSlide}
                        disabled={currentIndex === maxIndex}
                        className="bg-white text-brand-brown p-2 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-brand-brown/10"
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>

        <div className="relative">
          <div className="overflow-hidden -mx-4 py-4 px-1">
            <div 
              className="flex transition-transform duration-500 ease-out"
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
          
          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-8 bg-white/50 rounded-lg border border-dashed border-brand-brown/20">
              <p className="text-gray-500">Produk untuk kategori ini sedang restock.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};