export enum ProductCategory {
  ALL = 'Semua',
  CAKE = 'Bolu & Cake',
  BREAD = 'Roti',
  SNACK = 'Snack',
  COOKIES = 'Kue Kering'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  isShippable: boolean; // Can be shipped out of town
  isBestSeller?: boolean;
  pairing?: string;
  stockLabel?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Ibu Rumah Tangga", "Customer Setia"
  content: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}
