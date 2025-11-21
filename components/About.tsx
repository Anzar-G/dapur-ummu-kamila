import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop" 
                alt="Ummu Kamila Baking" 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-orange/10 rounded-full filter blur-3xl -z-10"></div>
            
            {/* Quote Badge */}
            <div className="absolute -bottom-6 -right-4 md:right-10 bg-white p-6 rounded-xl shadow-xl max-w-xs border-l-4 border-brand-gold z-20">
              <p className="font-playfair italic text-brand-brown text-lg">
                "Memasak adalah cara saya mengungkapkan cinta kepada keluarga dan pelanggan."
              </p>
              <p className="mt-2 text-sm font-bold text-gray-600">— Ummu Kamila</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">Tentang Kami</h4>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-brown mb-6">
              Dari Dapur Kecil, <br /> Sepenuh Hati.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Assalamu’alaikum! Saya Ummu Kamila. Berawal dari hobi membuat camilan sehat untuk anak-anak di rumah, kini <strong>Dapur Ummu Kamila</strong> hadir untuk menyajikan kehangatan yang sama ke meja makan Anda.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kami percaya bahwa makanan enak tidak harus rumit, tapi harus jujur. Itu sebabnya kami hanya menggunakan bahan-bahan halal, segar, dan tanpa pengawet buatan. Setiap adonan diuleni dengan doa dan ketelitian, menghasilkan rasa otentik yang membuat rindu rumah.
            </p>
            
            <div className="flex gap-8">
              <div>
                <span className="block text-4xl font-playfair font-bold text-brand-gold mb-1">5+</span>
                <span className="text-sm text-gray-500">Tahun Berkarya</span>
              </div>
              <div>
                <span className="block text-4xl font-playfair font-bold text-brand-gold mb-1">50+</span>
                <span className="text-sm text-gray-500">Varian Menu</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
