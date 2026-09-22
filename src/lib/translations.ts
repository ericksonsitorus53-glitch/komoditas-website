// Translation system for KomoditasSumut
// Each language has its own translations object

export interface Translations {
  // Navigation
  navHome: string;
  navProducts: string;
  navAbout: string;
  navContact: string;
  navLogin: string;
  navRegister: string;
  navDashboard: string;
  navSettings: string;
  navLogout: string;
  navSearch: string;
  
  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroDescription: string;
  heroCTA1: string;
  heroCTA2: string;
  heroTrust1: string;
  heroTrust2: string;
  heroTrust3: string;
  
  // Stats
  statsFarmers: string;
  statsFarmersCount: string;
  statsProducts: string;
  statsProductsCount: string;
  statsRegions: string;
  statsRegionsCount: string;
  statsRating: string;
  statsRatingCount: string;
  
  // Categories
  catExplore: string;
  catTitle: string;
  catSubtitle: string;
  
  // Products
  prodFeatured: string;
  prodTitle: string;
  prodSubtitle: string;
  prodViewAll: string;
  
  // Why Us
  whyUs: string;
  whyUsTitle: string;
  whyUsSubtitle: string;
  whyUs1Title: string;
  whyUs1Desc: string;
  whyUs2Title: string;
  whyUs2Desc: string;
  whyUs3Title: string;
  whyUs3Desc: string;
  
  // CTA
  ctaStart: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  ctaLearnMore: string;
  
  // Footer
  footerAbout: string;
  footerAboutDesc: string;
  footerProducts: string;
  footerServices: string;
  footerContact: string;
  footerAddress: string;
  footerRights: string;
  
  // Products Page
  productsTitle: string;
  productsSearch: string;
  productsFilter: string;
  productsSort: string;
  productsAll: string;
  
  // About Page
  aboutTitle: string;
  aboutSubtitle: string;
  
  // Contact Page
  contactTitle: string;
  contactSubtitle: string;
  contactForm: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSend: string;
  
  // Auth
  authLogin: string;
  authRegister: string;
  authEmail: string;
  authPassword: string;
  authConfirmPassword: string;
  authForgotPassword: string;
  authRememberMe: string;
  authDontHaveAccount: string;
  authAlreadyHaveAccount: string;
  authSignUp: string;
  authSignIn: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  back: string;
  next: string;
  previous: string;
  viewDetails: string;
  addToCart: string;
  buyNow: string;
  outOfStock: string;
  inStock: string;
  perKg: string;
  perTon: string;
  products2: string;
  sellers: string;
  buyNow2: string;
}

// Default Indonesian translations
export const idTranslations: Translations = {
  // Navigation
  navHome: 'Beranda',
  navProducts: 'Produk',
  navAbout: 'Tentang',
  navContact: 'Kontak',
  navLogin: 'Masuk',
  navRegister: 'Daftar',
  navDashboard: 'Dashboard',
  navSettings: 'Pengaturan',
  navLogout: 'Keluar',
  navSearch: 'Cari komoditas, produk, atau penjual...',
  
  // Hero Section
  heroBadge: '🏔️ Marketplace Komoditas Sumatera Utara',
  heroTitle1: 'Jual Beli',
  heroTitle2: 'Komoditas Bumi',
  heroTitle3: 'Sumatera Utara',
  heroDescription: 'Dari ladang langsung ke meja Anda. Temukan kopi Mandheling premium, rempah Toba autentik, dan komoditas unggulan lainnya langsung dari petani terpercaya.',
  heroCTA1: 'Jelajahi Produk',
  heroCTA2: 'Daftar Sebagai Penjual',
  heroTrust1: 'Transaksi Aman',
  heroTrust2: 'Pengiriman Seluruh Indonesia',
  heroTrust3: 'Produk Organik',
  
  // Stats
  statsFarmers: 'Petani Aktif',
  statsFarmersCount: '500+',
  statsProducts: 'Jenis Komoditas',
  statsProductsCount: '24',
  statsRegions: 'Kabupaten/Kota',
  statsRegionsCount: '34',
  statsRating: 'Rating Platform',
  statsRatingCount: '4.8',
  
  // Categories
  catExplore: 'Jelajahi',
  catTitle: 'Kategori Komoditas',
  catSubtitle: 'Temukan komoditas unggulan dari berbagai daerah di Sumatera Utara',
  
  // Products
  prodFeatured: 'Terpopuler',
  prodTitle: 'Produk Unggulan',
  prodSubtitle: 'Komoditas terlaris dari petani dan penjual terpercaya',
  prodViewAll: 'Lihat Semua Produk',
  
  // Why Us
  whyUs: 'Keunggulan',
  whyUsTitle: 'Mengapa Memilih Kami?',
  whyUsSubtitle: 'Platform terpercaya yang mengutamakan kualitas dan kepuasan pelanggan',
  whyUs1Title: 'Transaksi Aman & Terpercaya',
  whyUs1Desc: 'Sistem escrow dan verifikasi penjual yang ketat menjamin keamanan setiap transaksi Anda.',
  whyUs2Title: 'Pengiriman Seluruh Indonesia',
  whyUs2Desc: 'Dari Sumatera Utara ke Sabang sampai Merauke. Kemitraan dengan ekspedisi terpercaya.',
  whyUs3Title: 'Kualitas Terjamin',
  whyUs3Desc: 'Produk langsung dari petani dengan standar kualitas yang ketat dan sertifikasi organik.',
  
  // CTA
  ctaStart: 'Mulai Sekarang',
  ctaTitle: 'Mulai Jual Komoditas Anda Sekarang',
  ctaSubtitle: 'Daftar sebagai penjual dan jangkau pembeli dari seluruh Indonesia. Gratis tanpa biaya admin!',
  ctaButton: 'Daftar Gratis Sekarang',
  ctaLearnMore: 'Pelajari Lebih Lanjut',
  
  // Footer
  footerAbout: 'Tentang Kami',
  footerAboutDesc: 'Platform marketplace komoditas terpercaya dari Sumatera Utara, Indonesia.',
  footerProducts: 'Produk',
  footerServices: 'Layanan',
  footerContact: 'Kontak',
  footerAddress: 'Medan, Sumatera Utara, Indonesia',
  footerRights: 'Hak Cipta Dilindungi',
  
  // Products Page
  productsTitle: 'Semua Produk',
  productsSearch: 'Cari produk...',
  productsFilter: 'Filter',
  productsSort: 'Urutkan',
  productsAll: 'Semua',
  
  // About Page
  aboutTitle: 'Tentang KomoditasSumut',
  aboutSubtitle: 'Platform marketplace komoditas terpercaya dari Sumatera Utara',
  
  // Contact Page
  contactTitle: 'Hubungi Kami',
  contactSubtitle: 'Ada pertanyaan? Kami siap membantu Anda.',
  contactForm: 'Kirim Pesan',
  contactName: 'Nama Lengkap',
  contactEmail: 'Email',
  contactMessage: 'Pesan Anda',
  contactSend: 'Kirim Pesan',
  
  // Auth
  authLogin: 'Masuk',
  authRegister: 'Daftar',
  authEmail: 'Email',
  authPassword: 'Password',
  authConfirmPassword: 'Konfirmasi Password',
  authForgotPassword: 'Lupa Password?',
  authRememberMe: 'Ingat saya',
  authDontHaveAccount: 'Belum punya akun?',
  authAlreadyHaveAccount: 'Sudah punya akun?',
  authSignUp: 'Daftar',
  authSignIn: 'Masuk',
  
  // Common
  loading: 'Memuat...',
  error: 'Terjadi kesalahan',
  success: 'Berhasil',
  cancel: 'Batal',
  save: 'Simpan',
  delete: 'Hapus',
  edit: 'Edit',
  back: 'Kembali',
  next: 'Selanjutnya',
  previous: 'Sebelumnya',
  viewDetails: 'Lihat Detail',
  addToCart: 'Tambah ke Keranjang',
  buyNow: 'Beli Sekarang',
  outOfStock: 'Stok Habis',
  inStock: 'Tersedia',
  perKg: '/kg',
  perTon: '/ton',
  products2: 'Produk',
  sellers: 'Penjual',
  buyNow2: 'Beli Sekarang',
};

// English translations
export const enTranslations: Translations = {
  // Navigation
  navHome: 'Home',
  navProducts: 'Products',
  navAbout: 'About',
  navContact: 'Contact',
  navLogin: 'Login',
  navRegister: 'Register',
  navDashboard: 'Dashboard',
  navSettings: 'Settings',
  navLogout: 'Logout',
  navSearch: 'Search commodities, products, or sellers...',
  
  // Hero Section
  heroBadge: '🏔️ North Sumatra Commodity Marketplace',
  heroTitle1: 'Buy & Sell',
  heroTitle2: 'Earth Commodities',
  heroTitle3: 'North Sumatra',
  heroDescription: 'From the farm straight to your table. Find premium Mandheling coffee, authentic Toba spices, and other superior commodities directly from trusted farmers.',
  heroCTA1: 'Explore Products',
  heroCTA2: 'Register as Seller',
  heroTrust1: 'Secure Transactions',
  heroTrust2: 'Delivery Across Indonesia',
  heroTrust3: 'Organic Products',
  
  // Stats
  statsFarmers: 'Active Farmers',
  statsFarmersCount: '500+',
  statsProducts: 'Commodity Types',
  statsProductsCount: '24',
  statsRegions: 'Districts/Cities',
  statsRegionsCount: '34',
  statsRating: 'Platform Rating',
  statsRatingCount: '4.8',
  
  // Categories
  catExplore: 'Explore',
  catTitle: 'Commodity Categories',
  catSubtitle: 'Discover superior commodities from various regions in North Sumatra',
  
  // Products
  prodFeatured: 'Most Popular',
  prodTitle: 'Featured Products',
  prodSubtitle: 'Best-selling commodities from trusted farmers and sellers',
  prodViewAll: 'View All Products',
  
  // Why Us
  whyUs: 'Advantages',
  whyUsTitle: 'Why Choose Us?',
  whyUsSubtitle: 'A trusted platform that prioritizes quality and customer satisfaction',
  whyUs1Title: 'Secure & Trusted Transactions',
  whyUs1Desc: 'Escrow system and strict seller verification guarantee the security of every transaction.',
  whyUs2Title: 'Delivery Across Indonesia',
  whyUs2Desc: 'From North Sumatra to Sabang and Merauke. Partnership with trusted expeditions.',
  whyUs3Title: 'Guaranteed Quality',
  whyUs3Desc: 'Products directly from farmers with strict quality standards and organic certification.',
  
  // CTA
  ctaStart: 'Start Now',
  ctaTitle: 'Start Selling Commodities Now',
  ctaSubtitle: 'Register as a seller and reach buyers across Indonesia. Free with no admin fees!',
  ctaButton: 'Register Free Now',
  ctaLearnMore: 'Learn More',
  
  // Footer
  footerAbout: 'About Us',
  footerAboutDesc: 'Trusted commodity marketplace platform from North Sumatra, Indonesia.',
  footerProducts: 'Products',
  footerServices: 'Services',
  footerContact: 'Contact',
  footerAddress: 'Medan, North Sumatra, Indonesia',
  footerRights: 'All Rights Reserved',
  
  // Products Page
  productsTitle: 'All Products',
  productsSearch: 'Search products...',
  productsFilter: 'Filter',
  productsSort: 'Sort',
  productsAll: 'All',
  
  // About Page
  aboutTitle: 'About KomoditasSumut',
  aboutSubtitle: 'Trusted commodity marketplace platform from North Sumatra',
  
  // Contact Page
  contactTitle: 'Contact Us',
  contactSubtitle: 'Have questions? We are ready to help you.',
  contactForm: 'Send Message',
  contactName: 'Full Name',
  contactEmail: 'Email',
  contactMessage: 'Your Message',
  contactSend: 'Send Message',
  
  // Auth
  authLogin: 'Login',
  authRegister: 'Register',
  authEmail: 'Email',
  authPassword: 'Password',
  authConfirmPassword: 'Confirm Password',
  authForgotPassword: 'Forgot Password?',
  authRememberMe: 'Remember me',
  authDontHaveAccount: "Don't have an account?",
  authAlreadyHaveAccount: 'Already have an account?',
  authSignUp: 'Sign Up',
  authSignIn: 'Sign In',
  
  // Common
  loading: 'Loading...',
  error: 'An error occurred',
  success: 'Success',
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  back: 'Back',
  next: 'Next',
  previous: 'Previous',
  viewDetails: 'View Details',
  addToCart: 'Add to Cart',
  buyNow: 'Buy Now',
  outOfStock: 'Out of Stock',
  inStock: 'In Stock',
  perKg: '/kg',
  perTon: '/ton',
  products2: 'Products',
  sellers: 'Sellers',
  buyNow2: 'Buy Now',
};

// Japanese translations
export const jaTranslations: Translations = {
  navHome: 'ホーム',
  navProducts: '製品',
  navAbout: '会社概要',
  navContact: 'お問い合わせ',
  navLogin: 'ログイン',
  navRegister: '登録',
  navDashboard: 'ダッシュボード',
  navSettings: '設定',
  navLogout: 'ログアウト',
  navSearch: '農産物、製品、または販売者を検索...',
  heroBadge: '🏔️ 北スマトラ農産物マーケットプレイス',
  heroTitle1: '売買',
  heroTitle2: '地球の農産物',
  heroTitle3: '北スマトラ',
  heroDescription: '農場からお客様の食卓へ。プレミアムマンデリンコーヒー、本物のトバスパイス、信頼できる農家からのその他の優れた農産物をご覧ください。',
  heroCTA1: '製品を探す',
  heroCTA2: '販売者として登録',
  heroTrust1: '安全な取引',
  heroTrust2: 'インドネシア全土に配送',
  heroTrust3: 'オーガニック製品',
  statsFarmers: 'アクティブ農家',
  statsFarmersCount: '500+',
  statsProducts: '農産物タイプ',
  statsProductsCount: '24',
  statsRegions: '地区/都市',
  statsRegionsCount: '34',
  statsRating: 'プラットフォーム評価',
  statsRatingCount: '4.8',
  catExplore: '探検',
  catTitle: '農産物カテゴリー',
  catSubtitle: '北スマトラの様々な地域の優れた農産物を発見',
  prodFeatured: '人気',
  prodTitle: 'おすすめ製品',
  prodSubtitle: '信頼できる農家と販売者からの最売上農産物',
  prodViewAll: 'すべての製品を見る',
  whyUs: '強み',
  whyUsTitle: 'なぜ私たちを選ぶのか？',
  whyUsSubtitle: '品質と顧客満足を優先する信頼できるプラットフォーム',
  whyUs1Title: '安全で信頼できる取引',
  whyUs1Desc: 'エスクローシステムと厳格な販売者確認により、すべての取引の安全性を保証します。',
  whyUs2Title: 'インドネシア全土に配送',
  whyUs2Desc: '北スマトラからサバン、メラウケまで。信頼できる配送会社との提携。',
  whyUs3Title: '品質保証',
  whyUs3Desc: '厳格な品質基準とオーガニック認証を持つ農家からの直送製品。',
  ctaStart: '今すぐ始める',
  ctaTitle: '今すぐ農産物の販売を始めましょう',
  ctaSubtitle: '販売者として登録し、インドネシア全土の買い手にリーチ。管理費なしで無料！',
  ctaButton: '今すぐ無料登録',
  ctaLearnMore: '詳しく見る',
  footerAbout: '私たちについて',
  footerAboutDesc: 'インドネシア北スマトラの信頼できる農産物マーケットプレイスプラットフォーム。',
  footerProducts: '製品',
  footerServices: 'サービス',
  footerContact: 'お問い合わせ',
  footerAddress: 'メダン、北スマトラ、インドネシア',
  footerRights: '全著作権所有',
  productsTitle: '全製品',
  productsSearch: '製品を検索...',
  productsFilter: 'フィルター',
  productsSort: '並べ替え',
  productsAll: 'すべて',
  aboutTitle: 'KomoditasSumutについて',
  aboutSubtitle: '北スマトラの信頼できる農産物マーケットプレイスプラットフォーム',
  contactTitle: 'お問い合わせ',
  contactSubtitle: 'ご質問がありますか？お手伝いします。',
  contactForm: 'メッセージを送信',
  contactName: '氏名',
  contactEmail: 'メール',
  contactMessage: 'メッセージ',
  contactSend: '送信',
  authLogin: 'ログイン',
  authRegister: '登録',
  authEmail: 'メール',
  authPassword: 'パスワード',
  authConfirmPassword: 'パスワード確認',
  authForgotPassword: 'パスワードを忘れた？',
  authRememberMe: 'ログイン状態を保持',
  authDontHaveAccount: 'アカウントをお持ちでないですか？',
  authAlreadyHaveAccount: 'アカウントをお持ちですか？',
  authSignUp: '登録',
  authSignIn: 'ログイン',
  loading: '読み込み中...',
  error: 'エラーが発生しました',
  success: '成功',
  cancel: 'キャンセル',
  save: '保存',
  delete: '削除',
  edit: '編集',
  back: '戻る',
  next: '次へ',
  previous: '前へ',
  viewDetails: '詳細を見る',
  addToCart: 'カートに追加',
  buyNow: '今すぐ購入',
  outOfStock: '在庫切れ',
  inStock: '在庫あり',
  perKg: '/kg',
  perTon: '/ton',
  products2: '製品',
  sellers: '販売者',
  buyNow2: '今すぐ購入',
};

// Chinese translations
export const zhTranslations: Translations = {
  navHome: '首页',
  navProducts: '产品',
  navAbout: '关于我们',
  navContact: '联系我们',
  navLogin: '登录',
  navRegister: '注册',
  navDashboard: '控制面板',
  navSettings: '设置',
  navLogout: '退出',
  navSearch: '搜索农产品、产品或卖家...',
  heroBadge: '🏔️ 北苏门答腊农产品市场',
  heroTitle1: '买卖',
  heroTitle2: '地球农产品',
  heroTitle3: '北苏门答腊',
  heroDescription: '从农场直接到您的餐桌。发现来自可信农民的优质曼特宁咖啡、正宗多巴香料和其他优质农产品。',
  heroCTA1: '浏览产品',
  heroCTA2: '注册成为卖家',
  heroTrust1: '安全交易',
  heroTrust2: '全印度尼西亚配送',
  heroTrust3: '有机产品',
  statsFarmers: '活跃农民',
  statsFarmersCount: '500+',
  statsProducts: '农产品类型',
  statsProductsCount: '24',
  statsRegions: '地区/城市',
  statsRegionsCount: '34',
  statsRating: '平台评分',
  statsRatingCount: '4.8',
  catExplore: '探索',
  catTitle: '农产品类别',
  catSubtitle: '发现北苏门答腊各地的优质农产品',
  prodFeatured: '热门',
  prodTitle: '推荐产品',
  prodSubtitle: '来自可信农民和卖家的畅销农产品',
  prodViewAll: '查看所有产品',
  whyUs: '优势',
  whyUsTitle: '为什么选择我们？',
  whyUsSubtitle: '优先考虑质量和客户满意度的可信平台',
  whyUs1Title: '安全可信的交易',
  whyUs1Desc: '托管系统和严格的卖家验证保证每笔交易的安全性。',
  whyUs2Title: '全印度尼西亚配送',
  whyUs2Desc: '从北苏门答腊到沙璜和梅劳克。与可信快递合作。',
  whyUs3Title: '质量保证',
  whyUs3Desc: '直接来自农民，具有严格质量标准和有机认证的产品。',
  ctaStart: '立即开始',
  ctaTitle: '立即开始销售农产品',
  ctaSubtitle: '注册成为卖家，覆盖全印度尼西亚买家。免费无管理费！',
  ctaButton: '立即免费注册',
  ctaLearnMore: '了解更多',
  footerAbout: '关于我们',
  footerAboutDesc: '来自印度尼西亚北苏门答腊的可信农产品市场平台。',
  footerProducts: '产品',
  footerServices: '服务',
  footerContact: '联系我们',
  footerAddress: '棉兰，北苏门答腊，印度尼西亚',
  footerRights: '版权所有',
  productsTitle: '所有产品',
  productsSearch: '搜索产品...',
  productsFilter: '筛选',
  productsSort: '排序',
  productsAll: '全部',
  aboutTitle: '关于 KomoditasSumut',
  aboutSubtitle: '来自北苏门答腊的可信农产品市场平台',
  contactTitle: '联系我们',
  contactSubtitle: '有问题吗？我们随时为您服务。',
  contactForm: '发送消息',
  contactName: '姓名',
  contactEmail: '电子邮件',
  contactMessage: '您的消息',
  contactSend: '发送',
  authLogin: '登录',
  authRegister: '注册',
  authEmail: '电子邮件',
  authPassword: '密码',
  authConfirmPassword: '确认密码',
  authForgotPassword: '忘记密码？',
  authRememberMe: '记住我',
  authDontHaveAccount: '还没有账户？',
  authAlreadyHaveAccount: '已有账户？',
  authSignUp: '注册',
  authSignIn: '登录',
  loading: '加载中...',
  error: '发生错误',
  success: '成功',
  cancel: '取消',
  save: '保存',
  delete: '删除',
  edit: '编辑',
  back: '返回',
  next: '下一个',
  previous: '上一个',
  viewDetails: '查看详情',
  addToCart: '加入购物车',
  buyNow: '立即购买',
  outOfStock: '缺货',
  inStock: '有货',
  perKg: '/公斤',
  perTon: '/吨',
  products2: '产品',
  sellers: '卖家',
  buyNow2: '立即购买',
};

// Korean translations
export const koTranslations: Translations = {
  navHome: '홈',
  navProducts: '제품',
  navAbout: '회사 소개',
  navContact: '문의',
  navLogin: '로그인',
  navRegister: '회원가입',
  navDashboard: '대시보드',
  navSettings: '설정',
  navLogout: '로그아웃',
  navSearch: '농산물, 제품 또는 판매자 검색...',
  heroBadge: '🏔️ 북수마트라 농산물 마켓플레이스',
  heroTitle1: '매매',
  heroTitle2: '지구 농산물',
  heroTitle3: '북수마트라',
  heroDescription: '농장에서 식탁까지. 프리미엄 맨데링 커피, 정통 토바 향신료 및 신뢰할 수 있는 농부들의 다른 우수 농산물을 찾아보세요.',
  heroCTA1: '제품 둘러보기',
  heroCTA2: '판매자로 등록',
  heroTrust1: '안전한 거래',
  heroTrust2: '인도네시아 전역 배송',
  heroTrust3: '유기농 제품',
  statsFarmers: '활성 농부',
  statsFarmersCount: '500+',
  statsProducts: '농산물 유형',
  statsProductsCount: '24',
  statsRegions: '지역/도시',
  statsRegionsCount: '34',
  statsRating: '플랫폼 평점',
  statsRatingCount: '4.8',
  catExplore: '탐색',
  catTitle: '농산물 카테고리',
  catSubtitle: '북수마트라 전역의 우수 농산물을 발견하세요',
  prodFeatured: '인기',
  prodTitle: '추천 제품',
  prodSubtitle: '신뢰할 수 있는 농부와 판매자의 베스트셀러 농산물',
  prodViewAll: '전체 제품 보기',
  whyUs: '장점',
  whyUsTitle: '왜 우리를 선택하나요?',
  whyUsSubtitle: '품질과 고객 만족을 우선시하는 신뢰할 수 있는 플랫폼',
  whyUs1Title: '안전하고 신뢰할 수 있는 거래',
  whyUs1Desc: '에스크로 시스템과 엄격한 판매자 검증으로 모든 거래의 안전을 보장합니다.',
  whyUs2Title: '인도네시아 전역 배송',
  whyUs2Desc: '북수마트라에서 사방과 메라우케까지. 신뢰할 수 있는 배송사와의 파트너십.',
  whyUs3Title: '품질 보증',
  whyUs3Desc: '엄격한 품질 기준과 유기농 인증을 갖춘 농부의 직접 제품.',
  ctaStart: '지금 시작',
  ctaTitle: '지금 농산물 판매를 시작하세요',
  ctaSubtitle: '판매자로 등록하고 인도네시아 전역의 구매자에게 도달하세요. 관리비 없이 무료!',
  ctaButton: '지금 무료 등록',
  ctaLearnMore: '자세히 알아보기',
  footerAbout: '소개',
  footerAboutDesc: '인도네시아 북수마트라의 신뢰할 수 있는 농산물 마켓플레이스 플랫폼.',
  footerProducts: '제품',
  footerServices: '서비스',
  footerContact: '문의',
  footerAddress: '메단, 북수마트라, 인도네시아',
  footerRights: '저작권 보유',
  productsTitle: '전체 제품',
  productsSearch: '제품 검색...',
  productsFilter: '필터',
  productsSort: '정렬',
  productsAll: '전체',
  aboutTitle: 'KomoditasSumut 소개',
  aboutSubtitle: '북수마트라의 신뢰할 수 있는 농산물 마켓플레이스 플랫폼',
  contactTitle: '문의',
  contactSubtitle: '질문이 있으신가요? 도와드리겠습니다.',
  contactForm: '메시지 보내기',
  contactName: '이름',
  contactEmail: '이메일',
  contactMessage: '메시지',
  contactSend: '보내기',
  authLogin: '로그인',
  authRegister: '회원가입',
  authEmail: '이메일',
  authPassword: '비밀번호',
  authConfirmPassword: '비밀번호 확인',
  authForgotPassword: '비밀번호를 잊으셨나요?',
  authRememberMe: '로그인 유지',
  authDontHaveAccount: '계정이 없으신가요?',
  authAlreadyHaveAccount: '이미 계정이 있으신가요?',
  authSignUp: '회원가입',
  authSignIn: '로그인',
  loading: '로딩 중...',
  error: '오류 발생',
  success: '성공',
  cancel: '취소',
  save: '저장',
  delete: '삭제',
  edit: '편집',
  back: '뒤로',
  next: '다음',
  previous: '이전',
  viewDetails: '상세 보기',
  addToCart: '장바구니에 추가',
  buyNow: '바로 구매',
  outOfStock: '품절',
  inStock: '재고 있음',
  perKg: '/kg',
  perTon: '/ton',
  products2: '제품',
  sellers: '판매자',
  buyNow2: '바로 구매',
};

// Arabic translations
export const arTranslations: Translations = {
  navHome: 'الرئيسية',
  navProducts: 'المنتجات',
  navAbout: 'حول',
  navContact: 'اتصل بنا',
  navLogin: 'تسجيل الدخول',
  navRegister: 'التسجيل',
  navDashboard: 'لوحة التحكم',
  navSettings: 'الإعدادات',
  navLogout: 'تسجيل الخروج',
  navSearch: 'البحث عن المنتجات أو البائعين...',
  heroBadge: '🏔️ سوق المنتجات الزراعية في شمال سومطرة',
  heroTitle1: 'الشراء والبيع',
  heroTitle2: 'المنتجات الزراعية',
  heroTitle3: 'شمال سومطرة',
  heroDescription: 'من المزرعة مباشرة إلى طاولتك. اكتشف قهوة ماندلينغ الممتازة والتوابل الأصيلة من توبا والمنتجات الزراعية المميزة الأخرى من المزارعين الموثوقين.',
  heroCTA1: 'استكشف المنتجات',
  heroCTA2: 'سجّل كبائع',
  heroTrust1: 'المعاملات الآمنة',
  heroTrust2: 'التوصيل في جميع أنحاء إندونيسيا',
  heroTrust3: 'المنتجات العضوية',
  statsFarmers: 'المزارعون النشطون',
  statsFarmersCount: '+500',
  statsProducts: 'أنواع المنتجات',
  statsProductsCount: '24',
  statsRegions: 'المناطق/المدن',
  statsRegionsCount: '34',
  statsRating: 'تقييم المنصة',
  statsRatingCount: '4.8',
  catExplore: 'استكشف',
  catTitle: 'فئات المنتجات',
  catSubtitle: 'اكتشف المنتجات الزراعية المميزة من مناطق مختلفة في شمال سومطرة',
  prodFeatured: 'الأكثر شعبية',
  prodTitle: 'منتجات مميزة',
  prodSubtitle: 'المنتجات الزراعية الأكثر مبيعًا من المزارعين والبائعين الموثوقين',
  prodViewAll: 'عرض جميع المنتجات',
  whyUs: 'المزايا',
  whyUsTitle: 'لماذا تختارنا؟',
  whyUsSubtitle: 'منصة موثوقة تولّي الأولوية للجودة ورضا العملاء',
  whyUs1Title: 'معاملات آمنة وموثوقة',
  whyUs1Desc: 'نظام الضمان وتحقق صارم من البائعين يضمن أمان كل معاملة.',
  whyUs2Title: 'التوصيل في جميع أنحاء إندونيسيا',
  whyUs2Desc: 'من شمال سومطرة إلىسابانج وميراوكه. شراكة مع شركات شحن موثوقة.',
  whyUs3Title: 'جودة مضمونة',
  whyUs3Desc: 'منتجات مباشرة من المزارعين بمعايير جودة صارمة وشهادة عضوية.',
  ctaStart: 'ابدأ الآن',
  ctaTitle: 'ابدأ في بيع المنتجات الزراعية الآن',
  ctaSubtitle: 'سجّل كبائع واصل المشترين في جميع أنحاء إندونيسيا. مجاني بدون رسوم!',
  ctaButton: 'سجّل مجاناً الآن',
  ctaLearnMore: 'اعرف المزيد',
  footerAbout: 'من نحن',
  footerAboutDesc: 'منصة سوق موثوقة للمنتجات الزراعية من شمال سومطرة، إندونيسيا.',
  footerProducts: 'المنتجات',
  footerServices: 'الخدمات',
  footerContact: 'اتصل بنا',
  footerAddress: 'ميدان، شمال سومطرة، إندونيسيا',
  footerRights: 'جميع الحقوق محفوظة',
  productsTitle: 'جميع المنتجات',
  productsSearch: 'البحث عن منتجات...',
  productsFilter: 'تصفية',
  productsSort: 'ترتيب',
  productsAll: 'الكل',
  aboutTitle: 'حول KomoditasSumut',
  aboutSubtitle: 'منصة سوق موثوقة للمنتجات الزراعية من شمال سومطرة',
  contactTitle: 'اتصل بنا',
  contactSubtitle: 'هل لديك أسئلة؟ نحن هنا لمساعدتك.',
  contactForm: 'إرسال رسالة',
  contactName: 'الاسم الكامل',
  contactEmail: 'البريد الإلكتروني',
  contactMessage: 'رسالتك',
  contactSend: 'إرسال',
  authLogin: 'تسجيل الدخول',
  authRegister: 'التسجيل',
  authEmail: 'البريد الإلكتروني',
  authPassword: 'كلمة المرور',
  authConfirmPassword: 'تأكيد كلمة المرور',
  authForgotPassword: 'نسيت كلمة المرور؟',
  authRememberMe: 'تذكرني',
  authDontHaveAccount: 'ليس لديك حساب؟',
  authAlreadyHaveAccount: 'لديك حساب بالفعل؟',
  authSignUp: 'التسجيل',
  authSignIn: 'تسجيل الدخول',
  loading: 'جاري التحميل...',
  error: 'حدث خطأ',
  success: 'نجاح',
  cancel: 'إلغاء',
  save: 'حفظ',
  delete: 'حذف',
  edit: 'تعديل',
  back: 'رجوع',
  next: 'التالي',
  previous: 'السابق',
  viewDetails: 'عرض التفاصيل',
  addToCart: 'أضف إلى السلة',
  buyNow: 'اشترِ الآن',
  outOfStock: 'نفذ من المخزون',
  inStock: 'متوفر',
  perKg: '/كجم',
  perTon: '/طن',
  products2: 'المنتجات',
  sellers: 'البائعون',
  buyNow2: 'اشترِ الآن',
};

// Get translations for a language code
export function getTranslations(code: string): Translations {
  const translationMap: Record<string, Translations> = {
    'id': idTranslations,
    'en': enTranslations,
    'ja': jaTranslations,
    'zh': zhTranslations,
    'ko': koTranslations,
    'ar': arTranslations,
  };
  
  return translationMap[code] || enTranslations;
}

// Get all available translation language codes
export const availableTranslationCodes = ['id', 'en', 'ja', 'zh', 'ko', 'ar'];
