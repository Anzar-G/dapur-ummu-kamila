import React, { useState } from 'react';
import { Button } from './Button';

interface CheckoutFormProps {
  onCancel: () => void;
  onSubmit: (name: string, area: string, paymentMethod: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onCancel, onSubmit }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank - BSI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !area.trim()) return;
    onSubmit(name.trim(), area.trim(), paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm md:text-base">
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium" htmlFor="name">
          Nama Lengkap
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange/70 focus:border-brand-orange text-sm md:text-base"
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
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange/70 focus:border-brand-orange text-sm md:text-base"
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
          className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/70 focus:border-brand-orange text-sm md:text-base"
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

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" size="sm">
          Lanjut ke WhatsApp
        </Button>
      </div>
    </form>
  );
};
