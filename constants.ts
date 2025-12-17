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
    name: 'Nastar Wisman Premium',
    description: 'Nastar lumer dengan butter wisman asli dan selai nanas homemade yang legit. Best seller setiap lebaran.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1598218175510-449a0ce645c3?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.COOKIES,
    isBestSeller: true,
    isShippable: true,
    pairing: 'Teh Hangat Tawar',
    stockLabel: '🔥 Terjual 50+ Hari Ini'
  },
  {
    id: 'p2',
    name: 'Kastengel Keju Edam',
    description: 'Kastengel super renyah dengan taburan keju edam melimpah. Gurihnya bikin ketagihan.',
    price: 165000,
    image: 'https://images.unsplash.com/photo-1630409351241-e90e7f5e47ac?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.COOKIES,
    isShippable: true,
    pairing: 'Es Kopi Susu',
    stockLabel: 'Sisa 5 Slot'
  },
  {
    id: 'p3',
    name: 'Putri Salju Mede',
    description: 'Kue putri salju lembut dengan campuran kacang mede cincang dan balutan gula halus dingin.',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.COOKIES,
    isShippable: true,
    pairing: 'Teh Earl Grey'
  },
  {
    id: 'p4',
    name: 'Thumbprint Strawberry',
    description: 'Cookies klasik dengan selai strawberry di tengahnya. Manis asam segar dalam setiap gigitan.',
    price: 135000,
    image: 'https://images.unsplash.com/photo-1605256488730-149fa869ce00?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.COOKIES,
    isShippable: true,
    pairing: 'Susu Hangat'
  },
  // New Products
  {
    id: 'p5',
    name: 'Nastar (800ml)',
    description: 'Nastar klasik dengan rasa autentik dalam kemasan toples 800ml.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1598218175510-449a0ce645c3?q=80&w=1000&auto=format&fit=crop', // Reusing nastar image
    category: ProductCategory.COOKIES,
    isShippable: true,
    pairing: 'Teh Melati',
    stockLabel: 'Best Value'
  },
  {
    id: 'p6',
    name: 'Kastengel (800ml)',
    description: 'Kastengel gurih dengan keju pilihan dalam kemasan toples 800ml.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1630409351241-e90e7f5e47ac?q=80&w=1000&auto=format&fit=crop', // Reusing kastengel image
    category: ProductCategory.COOKIES,
    isShippable: true,
    pairing: 'Kopi Hitam'
  },
  {
    id: 'p7',
    name: 'Kue Salju Mete (800ml)',
    description: 'Kue salju lembut dengan kacang mete dalam kemasan toples 800ml.',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?q=80&w=1000&auto=format&fit=crop', // Reusing putri salju image
    category: ProductCategory.COOKIES,
    isShippable: true,
    pairing: 'Coklat Panas'
  },
  {
    id: 'p8',
    name: 'Kue Semprit Klasik (800ml)',
    description: 'Kue semprit klasik yang renyah dan manis dalam kemasan toples 800ml.',
    price: 60000,
    image: 'https://images.unsplash.com/photo-1605256488730-149fa869ce00?q=80&w=1000&auto=format&fit=crop', // Reusing cookies
    category: ProductCategory.COOKIES,
    isShippable: true,
    pairing: 'Teh Tawar'
  },
  {
    id: 'p9',
    name: 'Donat Aneka Toping (12pcs)',
    description: 'Donat kentang lembut dengan aneka toping pilihan (Coklat, Keju, Kacang, dll).',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1551024601-5629436bb94f?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.BREAD,
    isShippable: false,
    pairing: 'Kopi Susu Gula Aren',
    stockLabel: '⏳ Pre-Order H-1'
  },
  {
    id: 'p10',
    name: 'Donat (6pcs)',
    description: 'Paket hemat donat kentang isi 6 pcs. Lembut dan fresh.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1551024601-5629436bb94f?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.BREAD,
    isShippable: false,
    pairing: 'Es Jeruk'
  },
  {
    id: 'p11',
    name: 'Fudgy Brownies Toping Full Almond',
    description: 'Brownies nyoklat banget dengan tekstur fudgy dan toping almond melimpah.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.CAKE,
    isShippable: true,
    pairing: 'Gelato Vanilla',
    stockLabel: 'Sisa 3 Loyang'
  },
  {
    id: 'p12',
    name: 'Fudgy Brownies Toping Choco Chip',
    description: 'Brownies fudgy klasik dengan taburan choco chip yang crunchy.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.CAKE,
    isShippable: true,
    pairing: 'Susu Dingin'
  },
  {
    id: 'p13',
    name: 'Fudgy Brownies Full Keju',
    description: 'Perpaduan manisnya coklat dan gurihnya parutan keju yang tebal.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.CAKE,
    isShippable: true,
    pairing: 'Teh Tarik'
  },
  {
    id: 'p14',
    name: 'Fudgy Brownies Toping Mix',
    description: 'Bimbang pilih toping? Pilih varian mix untuk mencoba semua rasa!',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.CAKE,
    isShippable: true,
    pairing: 'Kopi Pait'
  },
  {
    id: 'p15',
    name: 'Pizza Mozzarella Smoke Beef (22cm)',
    description: 'Pizza homemade empuk dengan toping smoke beef dan keju mozzarella mulur.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
    category: ProductCategory.SNACK,
    isShippable: false,
    pairing: 'Soda Gembira'
  },
  {
    id: 'p16',
    name: 'Pizza Mozzarella Sosis (22cm)',
    description: 'Pizza favorit anak-anak dengan irisan sosis sapi dan keju mozzarella.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop', // Reusing pizza
    category: ProductCategory.SNACK,
    isShippable: false,
    pairing: 'Lemon Tea'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ibu Sari',
    role: 'Pelanggan Setia',
    content: 'Nastar-nya juara! Lembut banget dan selai nanasnya kerasa fresh. Cocok buat hantaran.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Mbak Dinda',
    role: 'Mahasiswa',
    content: 'Suka banget sama Brownies Mix-nya. Bisa nyicip semua rasa, packing aman sampai Jakarta.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Pak Budi',
    role: 'Wiraswasta',
    content: 'Pizza-nya favorit anak-anak. Rotinya empuk, kejunya banyak. Mantap!',
    rating: 5
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Berapa lama kue tahan di suhu ruang?",
    answer: "Untuk brownies tahan 7 hari di suhu ruang, donat & pizza sebaiknya dikonsumsi hari ini. Kue kering tahan 1-2 bulan dalam toples tertutup rapat."
  },
  {
    question: "Apakah pengiriman ke luar kota aman?",
    answer: "Sangat aman untuk Brownies dan Kue Kering. Kami menggunakan bubble wrap tebal dan box kokoh. Donat & Pizza khusus pengiriman instan area Semarang."
  },
  {
    question: "Apakah harus Pre-Order (PO)?",
    answer: "Sebagian besar produk kami 'Made by Order' untuk menjamin kesegaran. Sebaiknya pesan H-1."
  },
  {
    question: "Bisa request ucapan untuk kirim kado?",
    answer: "Bisa banget! Kami menyediakan kartu ucapan gratis untuk setiap pemesanan hampers atau kado ulang tahun."
  }
];