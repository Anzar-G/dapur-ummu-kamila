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

  // State for Mood Filter
  const [activeFilter, setActiveFilter] = React.useState('Semua');

  const filters = [
    { id: 'Semua', label: 'Semua' },
    { id: 'Hampers', label: '🎁 Hampers' },
    { id: 'Teman Ngopi', label: '☕ Teman Ngopi' },
    { id: 'Camilan Anak', label: '👶 Camilan Anak' },
    { id: 'Best Seller', label: '🔥 Best Seller' }
  ];

  // Logic Filtering
  const filterProducts = (products: Product[]) => {
    if (activeFilter === 'Semua') return products;
    if (activeFilter === 'Hampers') return products.filter(p => p.category === ProductCategory.COOKIES && p.isShippable);
    if (activeFilter === 'Teman Ngopi') return products.filter(p => p.category === ProductCategory.BREAD || p.category === ProductCategory.CAKE);
    if (activeFilter === 'Camilan Anak') return products.filter(p => p.category === ProductCategory.SNACK || p.name.includes('Donat') || p.name.includes('Susu'));
    if (activeFilter === 'Best Seller') return products.filter(p => p.isBestSeller);
    return products;
  };

  // Base Catalogs (Pre-filtered by category logic, then applied mood filter)
  const cookiesProducts = filterProducts(PRODUCTS.filter(p => p.category === ProductCategory.COOKIES));
  const localProducts = filterProducts(PRODUCTS.filter(p => !p.isShippable && p.category !== ProductCategory.COOKIES));
  const shippableProducts = filterProducts(PRODUCTS.filter(p => p.isShippable && p.category !== ProductCategory.COOKIES));

  // Determine visibility based on content availability after filter
  const showCookies = cookiesProducts.length > 0;
  const showLocal = localProducts.length > 0;
  const showShippable = shippableProducts.length > 0;

  return (
    <section id="menu" className="py-24 bg-brand-cream relative scroll-mt-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-brown/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-widest uppercase border border-brand-orange/20">
            Menu Kami
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-brown mb-6">Pilihan Favorit Keluarga</h2>
          <p className="text-gray-600 text-lg">Temukan berbagai pilihan kue premium dan snack lezat sesuai kebutuhan acara Anda.</p>
        </div>

        {/* Mood Filter Scrollable Bar */}
        <div className="flex justify-center overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex bg-white/60 backdrop-blur-sm p-1.5 rounded-full border border-brand-brown/5 shadow-sm">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap ${activeFilter === filter.id
                    ? 'bg-brand-brown text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:bg-white hover:text-brand-orange'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Show message if no products found */}
      {!showCookies && !showLocal && !showShippable && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Tidak ada produk untuk kategori ini.</p>
          <button onClick={() => setActiveFilter('Semua')} className="mt-4 text-brand-orange hover:underline">Lihat Semua Menu</button>
        </div>
      )}

      {/* Katalog 1: Spesial Kue Kering */}
      {showCookies && (
        <ProductCarousel
          title="Spesial Kue Kering"
          subtitle="Kue kering premium dengan butter wisman, cocok untuk hampers atau stok camilan di rumah."
          products={cookiesProducts}
          bgClass=""
          icon={<Cookie size={32} strokeWidth={1.5} />}
          onAddToCart={onAddToCart}
          onCheckoutNow={onCheckoutNow}
        />
      )}

      {/* Katalog 2: Fresh Daily (Semarang Only) */}
      {showLocal && (
        <ProductCarousel
          title="Fresh Daily (Semarang Area)"
          subtitle="Menu fresh from oven yang siap menemani waktu santai Anda. Pizza, Donat, dan Snack gurih."
          products={localProducts}
          bgClass="bg-white/50 backdrop-blur-sm my-4"
          icon={<ChefHat size={32} strokeWidth={1.5} />}
          onAddToCart={onAddToCart}
          onCheckoutNow={onCheckoutNow}
        />
      )}

      {/* Katalog 3: Bisa Kirim Luar Kota */}
      {showShippable && (
        <ProductCarousel
          title="Oleh-oleh Tahan Lama"
          subtitle="Rindu cita rasa kami tapi di luar kota? Produk ini aman dikirim ke seluruh Indonesia."
          products={shippableProducts}
          bgClass=""
          icon={<Plane size={32} strokeWidth={1.5} />}
          onAddToCart={onAddToCart}
          onCheckoutNow={onCheckoutNow}
        />
      )}
    </section>
  );
};