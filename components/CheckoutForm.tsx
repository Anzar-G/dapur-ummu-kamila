import React, { useState } from 'react';
import { Button } from './Button';

import { Gift } from 'lucide-react';

interface CheckoutFormProps {
  onCancel: () => void;
  onSubmit: (name: string, area: string, paymentMethod: string, isGift: boolean, giftData?: { sender: string; recipient: string; message: string }) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onCancel, onSubmit }) => {
  const [name, setName] = useState(''); // Used as "Pemesan" if not gift, or just contact person
  const [area, setArea] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank - BSI');

  // Gift State
  const [isGift, setIsGift] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !area.trim()) return;

    if (isGift && (!senderName.trim() || !recipientName.trim())) {
      alert("Mohon lengkapi data pengirim dan penerima hadiah.");
      return;
    }

    onSubmit(name.trim(), area.trim(), paymentMethod, isGift, isGift ? {
      sender: senderName.trim(),
      recipient: recipientName.trim(),
      message: giftMessage.trim()
    } : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-sm md:text-base">

      {/* Gifting Toggle */}
      <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-brand-gold/20 transition-colors" onClick={() => setIsGift(!isGift)}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isGift ? 'bg-brand-gold text-brand-dark' : 'bg-white text-gray-400'}`}>
            <Gift size={20} />
          </div>
          <div>
            <p className="font-bold text-gray-800">Kirim sebagai Hadiah?</p>
            <p className="text-xs text-gray-500">Kami akan menyertakan kartu ucapan spesial.</p>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isGift ? 'border-brand-gold bg-brand-gold' : 'border-gray-300'}`}>
          {isGift && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
        </div>
      </div>

      <div className="space-y-4 animate-fade-in">
        {isGift ? (
          <>
            {/* Gift Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium text-xs uppercase tracking-wide">Nama Pengirim (Dari)</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-brand-cream/20 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                  placeholder="Nama Anda"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required={isGift}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium text-xs uppercase tracking-wide">Nama Penerima (Untuk)</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-brand-cream/20 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                  placeholder="Nama Teman/Saudara"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required={isGift}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium text-xs uppercase tracking-wide">Pesan Kartu Ucapan</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-brand-cream/20 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold min-h-[80px]"
                placeholder="Tulis ucapan selamat atau doa..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
              />
            </div>
            <div className="border-t border-dashed border-gray-200 my-4"></div>
          </>
        ) : null}

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium" htmlFor="name">
            {isGift ? 'Nama Kontak Pemesan (WhatsApp)' : 'Nama Lengkap Pemesan'}
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange/70 focus:border-brand-orange"
            placeholder="Contoh: Ummu Kamila"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium" htmlFor="area">
            Daerah / Alamat Singkat
          </label>
          <input
            id="area"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange/70 focus:border-brand-orange"
            placeholder="Contoh: Banyumanik, Semarang"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium" htmlFor="payment">
            Metode Pembayaran
          </label>
          <select
            id="payment"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/70 focus:border-brand-orange"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Transfer Bank - BSI">Transfer Bank - BSI</option>
            <option value="Transfer Bank - BCA">Transfer Bank - BCA</option>
            <option value="Transfer Bank - Mandiri">Transfer Bank - Mandiri</option>
            <option value="Transfer Bank - BNI">Transfer Bank - BNI</option>
            <option value="Transfer Bank - Bank Jago">Transfer Bank - Bank Jago</option>
            <option value="COD / Bayar di Tempat">COD / Bayar di Tempat</option>
            <option value="E-Wallet (Dana/OVO/Gopay)">E-Wallet (Dana/OVO/Gopay)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" size="sm" className={isGift ? "bg-brand-gold hover:bg-brand-brown text-brand-brown" : ""}>
          {isGift ? 'Kirim Hadiah Sekarang 🎁' : 'Lanjut ke WhatsApp'}
        </Button>
      </div>
    </form>
  );
};
