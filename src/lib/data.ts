// ============================================================
// DATA LAYER - Data dummy untuk website komoditas Sumatera Utara
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  categorySlug: string;
  origin: string;
  seller: string;
  sellerId: string;
  image: string;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  isFeatured: boolean;
  isOrganic: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  image: string;
}

// ---- KATEGORI ----
export const categories: Category[] = [
  {
    id: '1', name: 'Rempah & Bumbu', slug: 'rempah-bumbu',
    icon: '🌶️', description: 'Rempah-rempah dan bumbu berkualitas dari tanah Toba',
    productCount: 8, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop'
  },
  {
    id: '2', name: 'Kopi & Teh', slug: 'kopi-teh',
    icon: '☕', description: 'Kopi dan teh premium dari dataran tinggi Sumatera Utara',
    productCount: 3, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop'
  },
  {
    id: '3', name: 'Buah-buahan', slug: 'buah-buahan',
    icon: '🍊', description: 'Buah segar langsung dari kebun petani lokal',
    productCount: 3, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=400&fit=crop'
  },
  {
    id: '4', name: 'Sayuran', slug: 'sayuran',
    icon: '🥬', description: 'Sayuran organik segar dari lahan subur Sumatera Utara',
    productCount: 1, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop'
  },
  {
    id: '5', name: 'Lada & Merica', slug: 'lada-merica',
    icon: '🫚', description: 'Lada dan merica pilihan dengan cita rasa khas',
    productCount: 1, image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=400&fit=crop'
  },
  {
    id: '6', name: 'Kelapa Sawit', slug: 'kelapa-sawit',
    icon: '🌴', description: 'Produk turunan kelapa sawit berkualitas ekspor',
    productCount: 1, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop'
  },
  {
    id: '7', name: 'Karet & Perkebunan', slug: 'karet-perkebunan',
    icon: '🌿', description: 'Karet dan produk perkebunan lainnya',
    productCount: 1, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop'
  },
  {
    id: '8', name: 'Ikan & Perikanan', slug: 'ikan-perikanan',
    icon: '🐟', description: 'Ikan segar dan olahan dari Danau Toba serta laut',
    productCount: 2, image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&h=400&fit=crop'
  },
  {
    id: '9', name: 'Makanan Kesehatan', slug: 'makanan-kesehatan',
    icon: '🫙', description: 'Produk kesehatan dan superfood premium dari Sumatera Utara',
    productCount: 1, image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=400&fit=crop'
  },
  {
    id: '10', name: 'Kayu & Biomassa', slug: 'kayu-biomassa',
    icon: '🪵', description: 'Produk kayu dan biomassa energi terbarukan dari hutan tanaman Sumatera Utara',
    productCount: 1, image: '/images/products/wood-pellet.jpg'
  },
];

// ---- PRODUK ----
export const products: Product[] = [
  {
    id: '1', name: 'Kopi Mandheling Grade 1', slug: 'kopi-mandheling-grade1',
    description: 'Kopi Arabika Mandheling premium grade 1 dari dataran tinggi Bukit Barisan. Memiliki cita rasa khas chocolatey dan full body dengan aroma floral yang harum. Dipanen secara selektif dari ketinggian 1.200-1.500 mdpl.',
    price: 185000, unit: '500g', category: 'Kopi & Teh', categorySlug: 'kopi-teh',
    origin: 'Mandailing Natal', seller: 'Toko Kopi Toba', sellerId: '1',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 85, isFeatured: true, isOrganic: true,
    tags: ['kopi arabika', 'mandheling', 'premium', 'organik']
  },
  {
    id: '2', name: 'Lada Hitam Toba', slug: 'lada-hitam-toba',
    description: 'Lada hitam pilihan dari area Danau Toba. Dikeringkan secara alami di bawah sinar matahari, menghasilkan rasa pedas yang tajam dan aroma yang kuat. Cocok untuk masakan Indonesia dan internasional.',
    price: 95000, unit: '250g', category: 'Lada & Merica', categorySlug: 'lada-merica',
    origin: 'Toba Samosir', seller: 'Rempah Nusantara', sellerId: '2',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 120, isFeatured: true, isOrganic: false,
    tags: ['lada hitam', 'toba', 'rempah']
  },
  {
    id: '3', name: 'Jeruk Medan Premium', slug: 'jeruk-medan-premium',
    description: 'Jeruk manis unggulan dari perkebunan Deli Serdang, Medan. Berukuran besar, kulit tipis, dan rasa manis yang segar. Kaya vitamin C dan cocok untuk dikonsumsi langsung atau dibuat jus.',
    price: 45000, unit: '3 kg', category: 'Buah-buahan', categorySlug: 'buah-buahan',
    origin: 'Deli Serdang', seller: 'Buah Segar Medan', sellerId: '3',
    image: 'https://images.unsplash.com/photo-1622677973096-0b2700cc6ac5?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 200, isFeatured: true, isOrganic: false,
    tags: ['jeruk', 'medan', 'vitamin C']
  },
  {
    id: '4', name: 'Madu Hutan Toba', slug: 'madu-hutan-toba',
    description: 'Madu murni yang dikumpulkan dari hutan hutan sekitar Danau Toba. Tidak diproses secara industri sehingga mempertahankan semua nutrisi alami. Cocok untuk kesehatan dan kecantikan.',
    price: 150000, unit: '500ml', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Samosir', seller: 'Lebah Toba Farm', sellerId: '4',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 45, isFeatured: true, isOrganic: true,
    tags: ['madu', 'hutan', 'organik', 'murni']
  },
  {
    id: '5', name: 'Kopi Lanang Gayo', slug: 'kopi-lanang-gayo',
    description: 'Kopi Gayo varietas Lanang (biji tunggal) dari Aceh Tengah yang berbatasan dengan Sumatera Utara. Proses natural menjadikan rasa buah yang kaya dan body yang tebal.',
    price: 220000, unit: '500g', category: 'Kopi & Teh', categorySlug: 'kopi-teh',
    origin: 'Aceh Tengah', seller: 'Toko Kopi Toba', sellerId: '1',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 30, isFeatured: false, isOrganic: true,
    tags: ['kopi', 'lanang', 'gayo', 'premium']
  },
  {
    id: '6', name: 'Pisang Barangan', slug: 'pisang-barangan',
    description: 'Pisang barangan khas Sumatera Utara yang manis dan legit. Pisang ini menjadi oleh-oleh wajib saat berkunjung ke Medan. Cocok untuk dimakan langsung atau dijadikan keripik.',
    price: 25000, unit: '1 sisir', category: 'Buah-buahan', categorySlug: 'buah-buahan',
    origin: 'Langkat', seller: 'Buah Segar Medan', sellerId: '3',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 300, isFeatured: true, isOrganic: true,
    tags: ['pisang', 'barangan', 'medan']
  },
  {
    id: '7', name: 'Cabe Merah Keriting', slug: 'cabe-merah-keriting',
    description: 'Cabe merah keriting segar dari dataran tinggi Karo. Pedas khas dan warna merah cerah. Cocok untuk bumbu masakan sehari-hari dan pengolahan sambal.',
    price: 35000, unit: '1 kg', category: 'Sayuran', categorySlug: 'sayuran',
    origin: 'Karo', seller: 'Sayur Segar Karo', sellerId: '5',
    image: 'https://images.unsplash.com/photo-1760108273027-6b4c35f17bd5?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 150, isFeatured: false, isOrganic: false,
    tags: ['cabe', 'merah', 'pedas']
  },
  {
    id: '8', name: 'Minyak Sawit Mentah (CPO)', slug: 'minyak-sawit-mentah',
    description: 'Minyak kelapa sawit mentah (CPO) kualitas ekspor dari perkebunan terbaik Sumatera Utara. Memenuhi standar ISPO dan RSPO.',
    price: 12500, unit: '1 liter', category: 'Kelapa Sawit', categorySlug: 'kelapa-sawit',
    origin: 'Labuhanbatu', seller: 'Sawit Nusantara', sellerId: '6',
    image: 'https://images.unsplash.com/photo-1746080730541-2a700a0e55d4?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 500, isFeatured: false, isOrganic: false,
    tags: ['sawit', 'CPO', 'minyak']
  },
  {
    id: '9', name: 'Teh Dolok Sanggul', slug: 'teh-dolok-sanggul',
    description: 'Teh hitam premium dari perkebunan Dolok Sanggul, Humbang Hasundutan. Proses fermentasi tradisional menghasilkan rasa yang kaya dan aroma yang khas.',
    price: 75000, unit: '250g', category: 'Kopi & Teh', categorySlug: 'kopi-teh',
    origin: 'Humbang Hasundutan', seller: 'Teh Toba', sellerId: '7',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 80, isFeatured: false, isOrganic: true,
    tags: ['teh', 'hitam', 'dolok sanggul']
  },
  {
    id: '10', name: 'Karet Remah Sumbawa', slug: 'karet-remah-sumbawa',
    description: 'Karet remah SIR 20 dari perkebunan rakyat Sumatera Utara. Standar internasional untuk industri ban dan manufaktur.',
    price: 28000, unit: '1 kg', category: 'Karet & Perkebunan', categorySlug: 'karet-perkebunan',
    origin: 'Simalungun', seller: 'Agro Sumut', sellerId: '8',
    image: 'https://images.unsplash.com/photo-1679321750319-e83031ae01b9?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 1000, isFeatured: false, isOrganic: false,
    tags: ['karet', 'SIR 20', 'industri']
  },
  {
    id: '11', name: 'Ikan Mas Toba', slug: 'ikan-mas-toba',
    description: 'Ikan mas segar dari Danau Toba, difermentasi dengan bumbu khas Batak (andaliman) lalu dikeringkan. Siap dibakar atau digoreng.',
    price: 65000, unit: '500g', category: 'Ikan & Perikanan', categorySlug: 'ikan-perikanan',
    origin: 'Samosir', seller: 'Ikan Segar Toba', sellerId: '9',
    image: 'https://images.unsplash.com/photo-1636832966195-fd08d6822b68?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 60, isFeatured: true, isOrganic: false,
    tags: ['ikan mas', 'toba', 'andaliman']
  },
  {
    id: '12', name: 'Jahe Merah Organik', slug: 'jahe-merah-organik',
    description: 'Jahe merah organik dari perkebunan di Tanah Karo. Kaya akan gingerol, cocok untuk herbal dan minuman hangat.',
    price: 55000, unit: '500g', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Karo', seller: 'Rempah Nusantara', sellerId: '2',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 90, isFeatured: false, isOrganic: true,
    tags: ['jahe', 'merah', 'organik', 'herbal']
  },
  {
    id: '13', name: 'Manggis Segar Deli', slug: 'manggis-segar-deli',
    description: 'Manggis segar unggulan dari kebun Deli Serdang, Sumatera Utara. Buah berdaging putih tebal dengan rasa manis asam yang segar. Kaya akan xanthone, antioksidan alami yang baik untuk kesehatan. Dipetik langsung dari pohon saat matang sempurna.',
    price: 38000, unit: '2 kg', category: 'Buah-buahan', categorySlug: 'buah-buahan',
    origin: 'Deli Serdang', seller: 'Buah Segar Medan', sellerId: '3',
    image: 'https://images.unsplash.com/photo-1698512475081-44d9b979dcfa?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 120, isFeatured: true, isOrganic: true,
    tags: ['manggis', 'xanthone', 'organik', 'deli']
  },
  {
    id: '14', name: 'Sarang Burung Walet Premium', slug: 'sarang-burung-walet-premium',
    description: 'Sarang burung walet premium grade A dari peternakan walet di pesisir pantai timur Sumatera Utara. Dipanen secara berkelanjutan tanpa merusak habitat. Kaya akan protein, kalsium, dan asam sialat yang bermanfaat untuk kesehatan kulit dan sistem imun. Sudah dibersihkan dan siap diolah.',
    price: 2500000, unit: '100g', category: 'Makanan Kesehatan', categorySlug: 'makanan-kesehatan',
    origin: 'Langkat', seller: 'Walet Sejahtera', sellerId: '10',
    image: 'https://images.unsplash.com/photo-1771234843552-5ebb585f4163?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 25, isFeatured: true, isOrganic: false,
    tags: ['sarang walet', 'premium', 'kesehatan', 'superfood']
  },
  {
    id: '15', name: 'Kepiting Batu Hidup', slug: 'kepiting-batu-hidup',
    description: 'Kepiting batu hidup segar dari perairan laut Selat Malaka, Sumatera Utara. Kepiting berukuran besar dengan daging tebal dan manis. Dikemas khusus dalam kondisi hidup untuk menjaga kesegaran hingga sampai ke tangan Anda. Cocok untuk masakan seafood favorit.',
    price: 175000, unit: '1 kg', category: 'Ikan & Perikanan', categorySlug: 'ikan-perikanan',
    origin: 'Batubara', seller: 'Laut Segar Sumut', sellerId: '11',
    image: 'https://images.unsplash.com/photo-1746964245797-651bcfebc9bf?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 40, isFeatured: true, isOrganic: false,
    tags: ['kepiting', 'batu', 'hidup', 'laut', 'seafood']
  },
  {
    id: '16', name: 'Jahe Kering Premium', slug: 'jahe-kering-premium',
    description: 'Jahe kering pilihan dari Tanah Karo, Sumatera Utara. Dikeringkan secara alami menjaga cita rasa dan aroma khas jahe. Cocok untuk bumbu masakan, minuman hangat, dan herbal.',
    price: 45000, unit: '250g', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Karo', seller: 'Rempah Nusantara', sellerId: '2',
    image: 'https://images.unsplash.com/photo-1544195716-e656d7e28111?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 100, isFeatured: false, isOrganic: true,
    tags: ['jahe', 'kering', 'rempah', 'organik']
  },
  {
    id: '17', name: 'Cengkeh Aromatis', slug: 'cengkeh-aromatis',
    description: 'Cengkeh berkualitas ekspor dari perkebunan Sumatera Utara. Memiliki aroma yang kuat dan rasa pedas yang khas. Cocok untuk masakan, kue, rokok kretek, dan obat tradisional.',
    price: 120000, unit: '250g', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Mandailing Natal', seller: 'Rempah Nusantara', sellerId: '2',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 75, isFeatured: false, isOrganic: false,
    tags: ['cengkeh', 'rempah', 'aromatis', 'ekspor']
  },
  {
    id: '18', name: 'Kayu Manis Ceylon', slug: 'kayu-manis-ceylon',
    description: 'Kayu manis Ceylon premium dari perkebunan Sumatera Utara. Batang kayu manis utuh dengan aroma manis yang hangat. Cocok untuk kopi, teh, kue, dan masakan.',
    price: 85000, unit: '100g', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Simalungun', seller: 'Rempah Nusantara', sellerId: '2',
    image: 'https://images.unsplash.com/photo-1622798337764-259682f03741?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 90, isFeatured: false, isOrganic: false,
    tags: ['kayu manis', 'ceylon', 'rempah', 'aroma']
  },
  {
    id: '19', name: 'Gula Kelapa Bubuk', slug: 'gula-kelapa-bubuk',
    description: 'Gula kelapa bubuk organik dari perkebunan rakyat Sumatera Utara. Indeks glikemik rendah, cocok untuk penderita diabetes dan gaya hidup sehat. Rasa manis alami dengan aroma kelapa yang khas.',
    price: 65000, unit: '500g', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Langkat', seller: 'Agro Sumut', sellerId: '8',
    image: 'https://images.unsplash.com/photo-1614961234488-3c1ac5c28ef1?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 120, isFeatured: false, isOrganic: true,
    tags: ['gula kelapa', 'organik', 'sehat', 'bubuk']
  },
  {
    id: '20', name: 'Kemiri Mentah', slug: 'kemiri-mentah',
    description: 'Kemiri mentah pilihan dari perkebunan Tanah Karo. Biji kemiri besar dan berminyak, cocok untuk bumbu masakan, bumbu kacang, dan industri makanan.',
    price: 55000, unit: '250g', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Karo', seller: 'Sayur Segar Karo', sellerId: '5',
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 150, isFeatured: false, isOrganic: false,
    tags: ['kemiri', 'bumbu', 'masakan', 'karo']
  },
  {
    id: '21', name: 'Pinang Kering', slug: 'pinang-kering',
    description: 'Pinang kering kualitas ekspor dari perkebunan rakyat Sumatera Utara. Digunakan untuk industri tembakau, obat tradisional, dan bahan baku kimia. Kualitas terbaik untuk pasar domestik dan ekspor.',
    price: 35000, unit: '1 kg', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Labuhanbatu', seller: 'Agro Sumut', sellerId: '8',
    image: 'https://images.unsplash.com/photo-1763741220758-f88c62a7ed6e?w=600&h=400&fit=crop',
    rating: 0, reviews: 0, sold: 0, stock: 200, isFeatured: false, isOrganic: false,
    tags: ['pinang', 'kering', 'ekspor', 'industri']
  },
  {
    id: '22', name: 'Wood Pellet Sawit', slug: 'wood-pellet-sawit',
    description: 'Wood pellet biomassa premium dari limbah kayu dan serbuk gergaji hutan tanaman Sumatera Utara. Silinder padat 6-8 mm dengan nilai kalor tinggi (±4.000 kcal/kg), kadar air rendah di bawah 10%, dan abu sedikit. Bahan bakar ramah lingkungan untuk industri, boiler, dan pembangkit listrik energi terbarukan.',
    price: 6500, unit: '1 kg', category: 'Kayu & Biomassa', categorySlug: 'kayu-biomassa',
    origin: 'Simalungun', seller: 'Agro Sumut', sellerId: '8',
    image: '/images/products/wood-pellet.jpg',
    rating: 0, reviews: 0, sold: 0, stock: 5000, isFeatured: true, isOrganic: true,
    tags: ['wood pellet', 'biomassa', 'energi', 'ramah lingkungan']
  },
];

// ---- STATS (realistic) ----
export const siteStats = {
  totalProducts: products.length,
  totalCategories: categories.length,
};
