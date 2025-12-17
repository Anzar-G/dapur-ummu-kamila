import React, { useState } from 'react';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-brand-cream scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-brand-brown mb-4">Pertanyaan Umum</h2>
          <p className="text-gray-600">Hal yang sering ditanyakan oleh pelanggan kami.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-brand-brown/5 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-brand-cream/20 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-brand-brown' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-orange' : 'text-gray-400'
                    }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
