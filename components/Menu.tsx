import React from 'react';
import { PRODUCTS } from '../constants';
import { Product, ProductCategory } from '../types';
import { ProductCarousel } from './ProductCarousel';
import { Cookie, ChefHat, Plane } from 'lucide-react';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  onCheckoutNow: (product: Product) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart, onCheckoutNow }) => {
  
  // Katalog 1: Kue Kering (Cookies)
  const cookiesProducts = PRODUCTS.filter(p => p.category === ProductCategory.COOKIES);

  // Katalog 2: Dalam Kota / Fresh (Tidak bisa kirim luar kota + Bukan Cookies)
  // Termasuk Pizza, Donat, Brownies Lumer, Risol
  const localProducts = PRODUCTS.filter(p => !p.isShippable && p.category !== ProductCategory.COOKIES);

  // Katalog 3: Luar Kota / Tahan Lama (Bisa kirim luar kota + Bukan Cookies)
  // Termasuk Cake, Roti Sisir, dll. Cookies dipisah di katalog 1 agar tidak double.
  const shippableProducts = PRODUCTS.filter(p => p.isShippable && p.category !== ProductCategory.COOKIES);

  return (
    <section id="menu" className="py-20 bg-brand-cream relative scroll-mt-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-brown/5 rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-brown/5 rounded-tl-full"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-8">
        <div className="text-center max-w-2xl mx-auto">
          <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">Menu Kami</h4>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-brown mb-4">Pilihan Favorit Keluarga</h2>
          <p className="text-gray-600">Temukan berbagai pilihan kue dan snack sesuai kebutuhan Anda.</p>
        </div>
      </div>

      {/* Katalog 1: Spesial Kue Kering */}
      <ProductCarousel 
        title="Spesial Kue Kering"
        subtitle="Kue kering premium dengan butter wisman, cocok untuk hampers atau stok camilan di rumah."
        products={cookiesProducts}
        bgClass=""
        icon={<Cookie size={32} strokeWidth={1.5} />}
        onAddToCart={onAddToCart}
        onCheckoutNow={onCheckoutNow}
      />

      {/* Katalog 2: Fresh Daily (Semarang Only) */}
      <ProductCarousel 
        title="Fresh Daily (Semarang Area)"
        subtitle="Menu fresh from oven yang siap menemani waktu santai Anda. Pizza, Donat, dan Snack gurih."
        products={localProducts}
        bgClass="bg-white/50 backdrop-blur-sm my-4"
        icon={<ChefHat size={32} strokeWidth={1.5} />}
        onAddToCart={onAddToCart}
        onCheckoutNow={onCheckoutNow}
      />

      {/* Katalog 3: Bisa Kirim Luar Kota */}
      <ProductCarousel 
        title="Oleh-oleh Tahan Lama"
        subtitle="Rindu cita rasa kami tapi di luar kota? Produk ini aman dikirim ke seluruh Indonesia."
        products={shippableProducts}
        bgClass=""
        icon={<Plane size={32} strokeWidth={1.5} />}
        onAddToCart={onAddToCart}
        onCheckoutNow={onCheckoutNow}
      />
    </section>
  );
};