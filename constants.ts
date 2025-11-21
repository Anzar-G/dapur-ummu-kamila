import { Product, ProductCategory, Testimonial, FaqItem } from './types';
import { Heart, ShieldCheck, Truck, MousePointerClick } from 'lucide-react';

export const WHATSAPP_NUMBER = "628996853721"; // +62 899-6853-721

export const TRUST_BADGES = [
  {
    id: 1,
    icon: Heart,
    title: "100% Homemade",
    desc: "Dibuat dengan cinta"
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Tanpa Pengawet",
    desc: "Bahan alami berkualitas"
  },
  {
    id: 3,
    icon: Truck,
    title: "Kirim Luar Kota",
    desc: "Aman & terpercaya"
  },
  {
    id: 4,
    icon: MousePointerClick,
    title: "Order Mudah",
    desc: "Pesan via WhatsApp"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Marmer Cake Premium',
    description: 'Bolu jadul dengan motif marmer klasik, tekstur lembut dan aroma butter yang wangi.',
    price: 125000,
    category: ProductCategory.CAKE,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop',
    isShippable: true,
    isBestSeller: true
  },
  {
    id: 'p2',
    name: 'Brownies Lumer',
    description: 'Brownies coklat dengan tekstur sangat lembut dan saus coklat lumer. Khusus area Semarang.',
    price: 65000,
    category: ProductCategory.CAKE,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=400&auto=format&fit=crop',
    isShippable: false, // Local only as requested
    isBestSeller: true
  },
  {
    id: 'p3',
    name: 'Roti Sisir Manis',
    description: 'Roti sobek lembut dengan olesan butter cream gurih manis di setiap lapisnya.',
    price: 45000,
    category: ProductCategory.BREAD,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop',
    isShippable: true
  },
  {
    id: 'p4',
    name: 'Nastar Wisman',
    description: 'Kue kering klasik dengan selai nanas homemade dan butter wisman asli.',
    price: 145000,
    category: ProductCategory.COOKIES,
    image: 'https://images.unsplash.com/photo-1569955831340-35c59646572f?q=80&w=400&auto=format&fit=crop',
    isShippable: true
  },
  {
    id: 'p5',
    name: 'Korean Garlic Bread',
    description: 'Roti bun dengan cream cheese garlic yang gurih dan creamy.',
    price: 25000,
    category: ProductCategory.BREAD,
    image: 'https://images.unsplash.com/photo-1620508926235-5b3d7520f67d?q=80&w=400&auto=format&fit=crop',
    isShippable: false
  },
  {
    id: 'p6',
    name: 'Risoles Mayo',
    description: 'Kulit risol lembut berisi smoked beef, telur rebus, dan mayones spesial.',
    price: 35000,
    category: ProductCategory.SNACK,
    image: 'https://images.unsplash.com/photo-1628804706162-55a885e68d12?q=80&w=400&auto=format&fit=crop',
    isShippable: false
  },
  {
    id: 'p7',
    name: 'Pizza Homemade',
    description: 'Pizza roti empuk dengan topping sosis, paprika, mozzarella melimpah.',
    price: 55000,
    category: ProductCategory.SNACK,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop',
    isShippable: false
  },
  {
    id: 'p8',
    name: 'Donat Kentang Gula',
    description: 'Donat kentang kampung yang empuk dengan taburan gula halus dingin.',
    price: 25000,
    category: ProductCategory.BREAD,
    image: 'https://images.unsplash.com/photo-1551024601-bec0273e8a9e?q=80&w=400&auto=format&fit=crop',
    isShippable: false
  },
  {
    id: 'p9',
    name: 'Putri Salju',
    description: 'Kue kering lumer dimulut dengan balutan gula halus, menggunakan kacang mete pilihan.',
    price: 135000,
    category: ProductCategory.COOKIES,
    image: 'https://images.unsplash.com/photo-1598346762291-aee885091327?q=80&w=400&auto=format&fit=crop',
    isShippable: true
  },
   {
    id: 'p10',
    name: 'Lapis Surabaya',
    description: 'Kue lapis legit premium 3 lapis dengan selai strawberry di tengahnya.',
    price: 110000,
    category: ProductCategory.CAKE,
    image: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?q=80&w=400&auto=format&fit=crop',
    isShippable: true
  },
  {
    id: 'p11',
    name: 'Sagu Keju Lumer',
    description: 'Kue kering sagu dengan keju edam pilihan, tekstur lumer di mulut.',
    price: 85000,
    category: ProductCategory.COOKIES,
    image: 'https://images.unsplash.com/photo-1567155237767-4f2544073c95?q=80&w=400&auto=format&fit=crop',
    isShippable: true
  },
  {
    id: 'p12',
    name: 'Kastengel Premium',
    description: 'Stik keju renyah dengan taburan keju cheddar melimpah.',
    price: 140000,
    category: ProductCategory.COOKIES,
    image: 'https://images.unsplash.com/photo-1612386273994-e4a4d059df2b?q=80&w=400&auto=format&fit=crop',
    isShippable: true
  },
  {
    id: 'p13',
    name: 'Lidah Kucing',
    description: 'Kue tipis renyah dan manis dengan aroma butter yang kuat.',
    price: 90000,
    category: ProductCategory.COOKIES,
    image: 'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=400&auto=format&fit=crop',
    isShippable: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ibu Sari',
    role: 'Pelanggan Setia',
    content: 'Marmer cake-nya juara! Lembut banget dan nggak seret. Cocok buat hantaran acara keluarga.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Mbak Dinda',
    role: 'Mahasiswa',
    content: 'Suka banget sama Browniesnya, nyoklat banget. Packing aman sampai Jakarta.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Pak Budi',
    role: 'Wiraswasta',
    content: 'Langganan Roti Sisir buat sarapan anak-anak. Rasanya otentik seperti resep nenek.',
    rating: 5
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Berapa lama kue tahan di suhu ruang?",
    answer: "Untuk cake dan brownies tahan 3-4 hari di suhu ruang, dan hingga 1 minggu di kulkas. Untuk kue kering bisa tahan 1-2 bulan dalam wadah tertutup rapat."
  },
  {
    question: "Apakah pengiriman ke luar kota aman?",
    answer: "Sangat aman. Kami menggunakan bubble wrap tebal, box kokoh, dan stiker 'Fragile' untuk memastikan kue sampai dengan utuh. Khusus produk bertanda 'Luar Kota'."
  },
  {
    question: "Apakah harus Pre-Order (PO)?",
    answer: "Sebagian besar produk kami 'Made by Order' untuk menjamin kesegaran. Sebaiknya pesan H-1 atau H-2 sebelum hari pengiriman."
  },
  {
    question: "Bisa request ucapan untuk kirim kado?",
    answer: "Bisa banget! Kami menyediakan kartu ucapan gratis untuk setiap pemesanan hampers atau kado ulang tahun."
  }
];