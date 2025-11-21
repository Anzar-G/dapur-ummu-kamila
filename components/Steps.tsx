import React from 'react';
import { MessageCircle, CreditCard, ChefHat, Truck } from 'lucide-react';

export const Steps: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: MessageCircle,
      title: "Chat Admin",
      desc: "Hubungi kami via WhatsApp untuk cek stok atau pre-order."
    },
    {
      id: 2,
      icon: CreditCard,
      title: "Pembayaran",
      desc: "Transfer pembayaran sesuai total pesanan Anda."
    },
    {
      id: 3,
      icon: ChefHat,
      title: "Produksi",
      desc: "Pesanan Anda dibuat fresh from the oven."
    },
    {
      id: 4,
      icon: Truck,
      title: "Pengiriman",
      desc: "Kue dikirim ke alamat Anda dengan aman."
    }
  ];

  return (
    <section id="how-to-order" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-brand-brown">Cara Pemesanan</h2>
          <p className="text-gray-600 mt-2">4 langkah mudah menikmati kelezatan Dapur Ummu Kamila</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-brand-cream border-4 border-white shadow-lg flex items-center justify-center text-brand-brown mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-brown group-hover:text-brand-gold">
                  <step.icon size={32} />
                </div>
                <h3 className="font-playfair font-bold text-xl text-gray-800 mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-500 text-sm px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
