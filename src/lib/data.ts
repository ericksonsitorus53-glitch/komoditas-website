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

export interface Member {
  id: string;
  name: string;
  slug: string;
  role: 'petani' | 'penjual' | 'distributor' | 'pembeli';
  avatar: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  totalProducts: number;
  totalSales: number;
  rating: number;
  joinDate: string;
  verified: boolean;
  specialties: string[];
}

export interface LeaderboardEntry {
  rank: number;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  memberRole: string;
  score: number;
  totalSales: number;
  totalProducts: number;
  rating: number;
  trend: 'up' | 'down' | 'stable';
  badge: string;
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
    productCount: 45, image: '/images/categories/rempah.jpg'
  },
  {
    id: '2', name: 'Kopi & Teh', slug: 'kopi-teh',
    icon: '☕', description: 'Kopi dan teh premium dari dataran tinggi Sumatera Utara',
    productCount: 32, image: '/images/categories/kopi.jpg'
  },
  {
    id: '3', name: 'Buah-buahan', slug: 'buah-buahan',
    icon: '🍊', description: 'Buah segar langsung dari kebun petani lokal',
    productCount: 59, image: '/images/categories/buah.jpg'
  },
  {
    id: '4', name: 'Sayuran', slug: 'sayuran',
    icon: '🥬', description: 'Sayuran organik segar dari lahan subur Sumatera Utara',
    productCount: 41, image: '/images/categories/sayur.jpg'
  },
  {
    id: '5', name: 'Lada & Merica', slug: 'lada-merica',
    icon: '🫚', description: 'Lada dan merica pilihan dengan cita rasa khas',
    productCount: 23, image: '/images/categories/lada.jpg'
  },
  {
    id: '6', name: 'Kelapa Sawit', slug: 'kelapa-sawit',
    icon: '🌴', description: 'Produk turunan kelapa sawit berkualitas ekspor',
    productCount: 19, image: '/images/categories/sawit.jpg'
  },
  {
    id: '7', name: 'Karet & Perkebunan', slug: 'karet-perkebunan',
    icon: '🌿', description: 'Karet dan produk perkebunan lainnya',
    productCount: 15, image: '/images/categories/karet.jpg'
  },
  {
    id: '8', name: 'Ikan & Perikanan', slug: 'ikan-perikanan',
    icon: '🐟', description: 'Ikan segar dan olahan dari Danau Toba serta laut',
    productCount: 28, image: '/images/categories/ikan.jpg'
  },
  {
    id: '9', name: 'Makanan Kesehatan', slug: 'makanan-kesehatan',
    icon: '🫙', description: 'Produk kesehatan dan superfood premium dari Sumatera Utara',
    productCount: 10, image: '/images/categories/kesehatan.jpg'
  },
];

// ---- PRODUK ----
export const products: Product[] = [
  {
    id: '1', name: 'Kopi Mandheling Grade 1', slug: 'kopi-mandheling-grade1',
    description: 'Kopi Arabika Mandheling premium grade 1 dari dataran tinggi Bukit Barisan. Memiliki cita rasa khas chocolatey dan full body dengan aroma floral yang harum. Dipanen secara selektif dari ketinggian 1.200-1.500 mdpl.',
    price: 185000, unit: '500g', category: 'Kopi & Teh', categorySlug: 'kopi-teh',
    origin: 'Mandailing Natal', seller: 'Toko Kopi Toba', sellerId: '1',
    image: '/images/products/kopi-mandheling.jpg',
    rating: 4.9, reviews: 234, sold: 1520, stock: 85, isFeatured: true, isOrganic: true,
    tags: ['kopi arabika', 'mandheling', 'premium', 'organik']
  },
  {
    id: '2', name: 'Lada Hitam Toba', slug: 'lada-hitam-toba',
    description: 'Lada hitam pilihan dari area Danau Toba. Dikeringkan secara alami di bawah sinar matahari, menghasilkan rasa pedas yang tajam dan aroma yang kuat. Cocok untuk masakan Indonesia dan internasional.',
    price: 95000, unit: '250g', category: 'Lada & Merica', categorySlug: 'lada-merica',
    origin: 'Toba Samosir', seller: 'Rempah Nusantara', sellerId: '2',
    image: '/images/products/lada-hitam-toba.jpg',
    rating: 4.8, reviews: 189, sold: 980, stock: 120, isFeatured: true, isOrganic: false,
    tags: ['lada hitam', 'toba', 'rempah']
  },
  {
    id: '3', name: 'Jeruk Medan Premium', slug: 'jeruk-medan-premium',
    description: 'Jeruk manis unggulan dari perkebunan Deli Serdang, Medan. Berukuran besar, kulit tipis, dan rasa manis yang segar. Kaya vitamin C dan cocok untuk dikonsumsi langsung atau dibuat jus.',
    price: 45000, unit: '3 kg', category: 'Buah-buahan', categorySlug: 'buah-buahan',
    origin: 'Deli Serdang', seller: 'Buah Segar Medan', sellerId: '3',
    image: '/images/products/jeruk-medan.jpg',
    rating: 4.7, reviews: 312, sold: 2100, stock: 200, isFeatured: true, isOrganic: false,
    tags: ['jeruk', 'medan', 'vitamin C']
  },
  {
    id: '4', name: 'Madu Hutan Toba', slug: 'madu-hutan-toba',
    description: 'Madu murni yang dikumpulkan dari hutan hutan sekitar Danau Toba. Tidak diproses secara industri sehingga mempertahankan semua nutrisi alami. Cocok untuk kesehatan dan kecantikan.',
    price: 150000, unit: '500ml', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Samosir', seller: 'Lebah Toba Farm', sellerId: '4',
    image: '/images/products/madu-hutan.jpg',
    rating: 4.9, reviews: 156, sold: 890, stock: 45, isFeatured: true, isOrganic: true,
    tags: ['madu', 'hutan', 'organik', 'murni']
  },
  {
    id: '5', name: 'Kopi Lanang Gayo', slug: 'kopi-lanang-gayo',
    description: 'Kopi Gayo varietas Lanang (biji tunggal) dari Aceh Tengah yang berbatasan dengan Sumatera Utara. Proses natural menjadikan rasa buah yang kaya dan body yang tebal.',
    price: 220000, unit: '500g', category: 'Kopi & Teh', categorySlug: 'kopi-teh',
    origin: 'Aceh Tengah', seller: 'Toko Kopi Toba', sellerId: '1',
    image: '/images/products/kopi-lanang.jpg',
    rating: 4.8, reviews: 98, sold: 450, stock: 30, isFeatured: false, isOrganic: true,
    tags: ['kopi', 'lanang', 'gayo', 'premium']
  },
  {
    id: '6', name: 'Pisang Barangan', slug: 'pisang-barangan',
    description: 'Pisang barangan khas Sumatera Utara yang manis dan legit. Pisang ini menjadi oleh-oleh wajib saat berkunjung ke Medan. Cocok untuk dimakan langsung atau dijadikan keripik.',
    price: 25000, unit: '1 sisir', category: 'Buah-buahan', categorySlug: 'buah-buahan',
    origin: 'Langkat', seller: 'Buah Segar Medan', sellerId: '3',
    image: '/images/products/pisang-barangan.jpg',
    rating: 4.6, reviews: 267, sold: 3200, stock: 300, isFeatured: true, isOrganic: true,
    tags: ['pisang', 'barangan', 'medan']
  },
  {
    id: '7', name: 'Cabe Merah Keriting', slug: 'cabe-merah-keriting',
    description: 'Cabe merah keriting segar dari dataran tinggi Karo. Pedas khas dan warna merah cerah. Cocok untuk bumbu masakan sehari-hari dan pengolahan sambal.',
    price: 35000, unit: '1 kg', category: 'Sayuran', categorySlug: 'sayuran',
    origin: 'Karo', seller: 'Sayur Segar Karo', sellerId: '5',
    image: '/images/products/cabe-merah.jpg',
    rating: 4.5, reviews: 178, sold: 4500, stock: 150, isFeatured: false, isOrganic: false,
    tags: ['cabe', 'merah', 'pedas']
  },
  {
    id: '8', name: 'Minyak Sawit Mentah (CPO)', slug: 'minyak-sawit-mentah',
    description: 'Minyak kelapa sawit mentah (CPO) kualitas ekspor dari perkebunan terbaik Sumatera Utara. Memenuhi standar ISPO dan RSPO.',
    price: 12500, unit: '1 liter', category: 'Kelapa Sawit', categorySlug: 'kelapa-sawit',
    origin: 'Labuhanbatu', seller: 'Sawit Nusantara', sellerId: '6',
    image: '/images/products/minyak-sawit.jpg',
    rating: 4.4, reviews: 67, sold: 1200, stock: 500, isFeatured: false, isOrganic: false,
    tags: ['sawit', 'CPO', 'minyak']
  },
  {
    id: '9', name: 'Teh Dolok Sanggul', slug: 'teh-dolok-sanggul',
    description: 'Teh hitam premium dari perkebunan Dolok Sanggul, Humbang Hasundutan. Proses fermentasi tradisional menghasilkan rasa yang kaya dan aroma yang khas.',
    price: 75000, unit: '250g', category: 'Kopi & Teh', categorySlug: 'kopi-teh',
    origin: 'Humbang Hasundutan', seller: 'Teh Toba', sellerId: '7',
    image: '/images/products/teh-dolok-sanggul.jpg',
    rating: 4.7, reviews: 123, sold: 670, stock: 80, isFeatured: false, isOrganic: true,
    tags: ['teh', 'hitam', 'dolok sanggul']
  },
  {
    id: '10', name: 'Karet Remah Sumbawa', slug: 'karet-remah-sumbawa',
    description: 'Karet remah SIR 20 dari perkebunan rakyat Sumatera Utara. Standar internasional untuk industri ban dan manufaktur.',
    price: 28000, unit: '1 kg', category: 'Karet & Perkebunan', categorySlug: 'karet-perkebunan',
    origin: 'Simalungun', seller: 'Agro Sumut', sellerId: '8',
    image: '/images/products/karet-remah.jpg',
    rating: 4.3, reviews: 45, sold: 2300, stock: 1000, isFeatured: false, isOrganic: false,
    tags: ['karet', 'SIR 20', 'industri']
  },
  {
    id: '11', name: 'Ikan Mas Bakar Toba', slug: 'ikan-mas-bakar-toba',
    description: 'Ikan mas segar dari Danau Toba, difermentasi dengan bumbu khas Batak (andaliman) lalu dikeringkan. Siap dibakar atau digoreng.',
    price: 65000, unit: '500g', category: 'Ikan & Perikanan', categorySlug: 'ikan-perikanan',
    origin: 'Samosir', seller: 'Ikan Segar Toba', sellerId: '9',
    image: '/images/products/ikan-mas.jpg',
    rating: 4.8, reviews: 201, sold: 1100, stock: 60, isFeatured: true, isOrganic: false,
    tags: ['ikan mas', 'toba', 'andaliman']
  },
  {
    id: '12', name: 'Jahe Merah Organik', slug: 'jahe-merah-organik',
    description: 'Jahe merah organik dari perkebunan di Tanah Karo. Kaya akan gingerol, cocok untuk herbal dan minuman hangat.',
    price: 55000, unit: '500g', category: 'Rempah & Bumbu', categorySlug: 'rempah-bumbu',
    origin: 'Karo', seller: 'Rempah Nusantara', sellerId: '2',
    image: '/images/products/jahe-merah.jpg',
    rating: 4.7, reviews: 134, sold: 780, stock: 90, isFeatured: false, isOrganic: true,
    tags: ['jahe', 'merah', 'organik', 'herbal']
  },
  {
    id: '13', name: 'Manggis Segar Deli', slug: 'manggis-segar-deli',
    description: 'Manggis segar unggulan dari kebun Deli Serdang, Sumatera Utara. Buah berdaging putih tebal dengan rasa manis asam yang segar. Kaya akan xanthone, antioksidan alami yang baik untuk kesehatan. Dipetik langsung dari pohon saat matang sempurna.',
    price: 38000, unit: '2 kg', category: 'Buah-buahan', categorySlug: 'buah-buahan',
    origin: 'Deli Serdang', seller: 'Buah Segar Medan', sellerId: '3',
    image: '/images/products/manggis.jpg',
    rating: 4.8, reviews: 187, sold: 1340, stock: 120, isFeatured: true, isOrganic: true,
    tags: ['manggis', 'xanthone', 'organik', 'deli']
  },
  {
    id: '14', name: 'Sarang Burung Walet Premium', slug: 'sarang-burung-walet-premium',
    description: 'Sarang burung walet premium grade A dari peternakan walet di pesisir pantai timur Sumatera Utara. Dipanen secara berkelanjutan tanpa merusak habitat. Kaya akan protein, kalsium, dan asam sialat yang bermanfaat untuk kesehatan kulit dan sistem imun. Sudah dibersihkan dan siap diolah.',
    price: 2500000, unit: '100g', category: 'Makanan Kesehatan', categorySlug: 'makanan-kesehatan',
    origin: 'Langkat', seller: 'Walet Sejahtera', sellerId: '10',
    image: '/images/products/sarang-walet.jpg',
    rating: 4.9, reviews: 89, sold: 320, stock: 25, isFeatured: true, isOrganic: false,
    tags: ['sarang walet', 'premium', 'kesehatan', 'superfood']
  },
  {
    id: '15', name: 'Kepiting Batu Hidup', slug: 'kepiting-batu-hidup',
    description: 'Kepiting batu hidup segar dari perairan laut Selat Malaka, Sumatera Utara. Kepiting berukuran besar dengan daging tebal dan manis. Dikemas khusus dalam kondisi hidup untuk menjaga kesegaran hingga sampai ke tangan Anda. Cocok untuk masakan seafood favorit.',
    price: 175000, unit: '1 kg', category: 'Ikan & Perikanan', categorySlug: 'ikan-perikanan',
    origin: 'Batubara', seller: 'Laut Segar Sumut', sellerId: '11',
    image: '/images/products/kepiting-batu.jpg',
    rating: 4.7, reviews: 156, sold: 890, stock: 40, isFeatured: true, isOrganic: false,
    tags: ['kepiting', 'batu', 'hidup', 'laut', 'seafood']
  },
];

// ---- MEMBER ----
export const members: Member[] = [
  {
    id: '1', name: 'Toko Kopi Toba', slug: 'toko-kopi-toba',
    role: 'penjual', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    location: 'Balige, Toba', phone: '+62 812-6789-0123', email: 'kopitoba@email.com',
    description: 'Toko kopi spesialis kopi Arabika Mandheling dan Gayo. Beroperasi sejak 2015.',
    totalProducts: 12, totalSales: 3450, rating: 4.9, joinDate: '2021-03-15', verified: true,
    specialties: ['Kopi Arabika', 'Kopi Gayo', 'Kopi Robusta']
  },
  {
    id: '2', name: 'Rempah Nusantara', slug: 'rempah-nusantara',
    role: 'penjual', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    location: 'Medan', phone: '+62 813-4567-8901', email: 'rempahnusantara@email.com',
    description: 'Supplier rempah-rempah premium untuk pasar lokal dan ekspor.',
    totalProducts: 18, totalSales: 2890, rating: 4.8, joinDate: '2020-07-22', verified: true,
    specialties: ['Lada Hitam', 'Jahe Merah', 'Kunyit', 'Kencur']
  },
  {
    id: '3', name: 'Buah Segar Medan', slug: 'buah-segar-medan',
    role: 'penjual', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    location: 'Deli Serdang', phone: '+62 821-2345-6789', email: 'buahsegar@email.com',
    description: 'Distributor buah segar dari kebun lokal Sumatera Utara. Kirim ke seluruh Indonesia.',
    totalProducts: 25, totalSales: 5670, rating: 4.7, joinDate: '2020-01-10', verified: true,
    specialties: ['Jeruk Medan', 'Pisang Barangan', 'Durian', 'Mangga']
  },
  {
    id: '4', name: 'Lebah Toba Farm', slug: 'lebah-toba-farm',
    role: 'petani', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    location: 'Samosir', phone: '+62 852-3456-7890', email: 'lebahtoba@email.com',
    description: 'Peternakan lebah madu organik di tepi Danau Toba. Madu murni tanpa pemrosesan.',
    totalProducts: 5, totalSales: 1230, rating: 4.9, joinDate: '2021-09-05', verified: true,
    specialties: ['Madu Hutan', 'Propolis', 'Royal Jelly']
  },
  {
    id: '5', name: 'Sayur Segar Karo', slug: 'sayur-segar-karo',
    role: 'petani', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    location: 'Karo', phone: '+62 853-4567-8901', email: 'sayurkaro@email.com',
    description: 'Petani sayuran organik di dataran tinggi Tanah Karo. Produk segar setiap hari.',
    totalProducts: 15, totalSales: 4320, rating: 4.6, joinDate: '2020-05-18', verified: true,
    specialties: ['Tomat', 'Cabe', 'Bayam', 'Selada']
  },
  {
    id: '6', name: 'Sawit Nusantara', slug: 'sawit-nusantara',
    role: 'distributor', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    location: 'Labuhanbatu', phone: '+62 811-5678-9012', email: 'sawitnusantara@email.com',
    description: 'Distributor CPO dan produk turunan sawit bersertifikat ISPO.',
    totalProducts: 8, totalSales: 8900, rating: 4.4, joinDate: '2019-11-20', verified: true,
    specialties: ['CPO', 'Kernel', 'Stearin']
  },
  {
    id: '7', name: 'Teh Toba', slug: 'teh-toba',
    role: 'penjual', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    location: 'Humbang Hasundutan', phone: '+62 821-6789-0123', email: 'tehtoba@email.com',
    description: 'Produsen teh hitam dan teh hijau dari perkebunan Dolok Sanggul.',
    totalProducts: 10, totalSales: 1560, rating: 4.7, joinDate: '2021-02-14', verified: true,
    specialties: ['Teh Hitam', 'Teh Hijau', 'Teh Herbal']
  },
  {
    id: '8', name: 'Agro Sumut', slug: 'agro-sumut',
    role: 'distributor', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    location: 'Simalungun', phone: '+62 812-7890-1234', email: 'agrosumut@email.com',
    description: 'Distributor komoditas perkebunan: karet, sawit, dan kelapa.',
    totalProducts: 12, totalSales: 6780, rating: 4.3, joinDate: '2019-08-30', verified: false,
    specialties: ['Karet', 'Kelapa', 'Pinang']
  },
  {
    id: '9', name: 'Ikan Segar Toba', slug: 'ikan-segar-toba',
    role: 'penjual', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    location: 'Samosir', phone: '+62 852-8901-2345', email: 'ikansegartoba@email.com',
    description: 'Penjual ikan segar dan olahan dari Danau Toba. Ikan mas, mujair, dan batak fish.',
    totalProducts: 8, totalSales: 2340, rating: 4.8, joinDate: '2021-06-01', verified: true,
    specialties: ['Ikan Mas', 'Ikan Mujair', 'Ikan Nila']
  },
  {
    id: '10', name: 'Walet Sejahtera', slug: 'walet-sejahtera',
    role: 'penjual', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    location: 'Langkat', phone: '+62 813-9012-3456', email: 'waletsejahtera@email.com',
    description: 'Peternakan dan penjual sarang burung walet premium. Beroperasi sejak 2018 dengan standar kebersihan tinggi.',
    totalProducts: 6, totalSales: 890, rating: 4.9, joinDate: '2018-11-10', verified: true,
    specialties: ['Sarang Walet', 'Walet Putih', 'Walet Kotor']
  },
  {
    id: '11', name: 'Laut Segar Sumut', slug: 'laut-segar-sumut',
    role: 'penjual', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    location: 'Batubara', phone: '+62 821-0123-4567', email: 'lautsegarsumut@email.com',
    description: 'Penjual hasil laut segar dari perairan Selat Malaka. Kepiting, udang, ikan, dan hasil laut lainnya.',
    totalProducts: 14, totalSales: 3560, rating: 4.7, joinDate: '2020-03-25', verified: true,
    specialties: ['Kepiting', 'Udang', 'Ikan Laut', 'Cumi']
  },
];

// ---- LEADERBOARD ----
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, memberId: '3', memberName: 'Buah Segar Medan', memberAvatar: members[2].avatar, memberRole: 'Penjual', score: 9850, totalSales: 5670, totalProducts: 25, rating: 4.7, trend: 'up', badge: '🥇' },
  { rank: 2, memberId: '6', memberName: 'Sawit Nusantara', memberAvatar: members[5].avatar, memberRole: 'Distributor', score: 9200, totalSales: 8900, totalProducts: 8, rating: 4.4, trend: 'up', badge: '🥈' },
  { rank: 3, memberId: '1', memberName: 'Toko Kopi Toba', memberAvatar: members[0].avatar, memberRole: 'Penjual', score: 8750, totalSales: 3450, totalProducts: 12, rating: 4.9, trend: 'stable', badge: '🥉' },
  { rank: 4, memberId: '5', memberName: 'Sayur Segar Karo', memberAvatar: members[4].avatar, memberRole: 'Petani', score: 7800, totalSales: 4320, totalProducts: 15, rating: 4.6, trend: 'up', badge: '⭐' },
  { rank: 5, memberId: '2', memberName: 'Rempah Nusantara', memberAvatar: members[1].avatar, memberRole: 'Penjual', score: 7200, totalSales: 2890, totalProducts: 18, rating: 4.8, trend: 'down', badge: '🔥' },
  { rank: 6, memberId: '8', memberName: 'Agro Sumut', memberAvatar: members[7].avatar, memberRole: 'Distributor', score: 6500, totalSales: 6780, totalProducts: 12, rating: 4.3, trend: 'stable', badge: '📦' },
  { rank: 7, memberId: '9', memberName: 'Ikan Segar Toba', memberAvatar: members[8].avatar, memberRole: 'Penjual', score: 5900, totalSales: 2340, totalProducts: 8, rating: 4.8, trend: 'up', badge: '🐟' },
  { rank: 8, memberId: '4', memberName: 'Lebah Toba Farm', memberAvatar: members[3].avatar, memberRole: 'Petani', score: 5200, totalSales: 1230, totalProducts: 5, rating: 4.9, trend: 'up', badge: '🍯' },
  { rank: 9, memberId: '7', memberName: 'Teh Toba', memberAvatar: members[6].avatar, memberRole: 'Penjual', score: 4800, totalSales: 1560, totalProducts: 10, rating: 4.7, trend: 'stable', badge: '🍵' },
];

// ---- STATS ----
export const siteStats = {
  totalProducts: products.length * 4, // scaled up
  totalMembers: members.length * 12,
  totalTransactions: 15670,
  totalValue: 'Rp 12.5 Miliar',
};
