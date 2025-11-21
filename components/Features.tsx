import React from 'react';
import { TRUST_BADGES } from '../constants';

export const Features: React.FC = () => {
  return (
    <section className="py-12 bg-white relative z-10 -mt-8 mx-4 md:mx-12 rounded-2xl shadow-xl border border-brand-brown/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-dashed divide-brand-brown/20">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center text-center p-2 group">
              <div className="w-14 h-14 rounded-full bg-brand-cream flex items-center justify-center mb-4 text-brand-brown group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-brown group-hover:text-brand-gold">
                <badge.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-playfair font-bold text-lg text-gray-800 mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
