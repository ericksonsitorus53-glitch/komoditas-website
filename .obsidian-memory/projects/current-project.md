# 📋 Current Project - KomoditasSumut

## Project Name
**KomoditasSumut** - Platform Komoditas Sumatera Utara

## Status
- **Created**: 2026-08-22
- **Last Updated**: 2026-08-22
- **Status**: ✅ Active

## 📌 Overview

Platform marketplace komoditas pertanian dan perkebunan Sumatera Utara. Menghubungkan petani, penjual, distributor, dan pembeli dalam satu ekosistem digital.

## 🎯 Features

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Landing page dengan hero, kategori, produk unggulan, leaderboard |
| Produk | `/produk` | Listing semua produk dengan filter |
| Detail Produk | `/produk/[slug]` | Halaman detail produk |
| Blog | `/blog` | Artikel dan berita |
| Detail Blog | `/blog/[slug]` | Halaman artikel |
| FAQ | `/faq` | Pertanyaan umum |
| Tentang | `/tentang` | Tentang platform |
| Kontak | `/kontak` | Form kontak |
| Register | `/register` | Pendaftaran dengan Google/Otomatic |
| Login | `/login` | Login dengan Google/Email |
| Profil | `/profil` | Halaman profil user |
| Leaderboard | `/leaderboard` | Ranking penjual terbaik |
| **CRM** | `/crm` | **Kelola pelanggan & leads** |
| **Auto Blog** | `/autoblog` | **Generate artikel otomatis** |

### Components
| Component | File | Purpose |
|-----------|------|---------|
| Navbar | `src/components/Navbar.tsx` | Navigasi responsif |
| Footer | `src/components/Footer.tsx` | Footer website |
| ProductCard | `src/components/ProductCard.tsx` | Card produk |
| StatsSection | `src/components/StatsSection.tsx` | Statistik platform |
| **Chatbot** | `src/components/Chatbot.tsx` | **Customer support AI** |
| **SEOHead** | `src/components/SEOHead.tsx` | **SEO optimization** |
| **Providers** | `src/components/Providers.tsx` | **NextAuth session provider** |

### New Features (2026-08-22)

#### 🤖 Chatbot Widget
- Auto-response untuk pertanyaan umum
- Quick actions (Bantuan, Produk, FAQ)
- Typing indicator
- Responsive design

#### 📊 CRM Dashboard
- Manage pelanggan (buyer, seller, farmer)
- Filter & search
- Stats cards
- Customer detail modal
- Email blast, export, campaign

#### 📝 Auto Blog Generator
- AI-powered content generation
- Topic suggestions
- Keyword optimization
- Status management (draft, published, scheduled)

#### 🔍 SEO Optimization
- Enhanced meta tags (25+ keywords)
- Open Graph & Twitter cards
- JSON-LD structured data
- Dynamic sitemap
- robots.txt

#### 🔐 Authentication System
- Google OAuth Login/Register
- Email/Password Login
- Session management with NextAuth.js
- User profile page
- Navbar shows user info when logged in
- Dropdown menu with logout

## 📊 Data Structure

### Interfaces Defined
```typescript
interface Product {
  id, name, slug, description, price, unit, category, categorySlug,
  origin, seller, sellerId, image, rating, reviews, sold, stock,
  isFeatured, isOrganic, tags, moq?
}

interface Member {
  id, name, slug, role, avatar, location, phone, email, description,
  totalProducts, totalSales, rating, joinDate, verified, specialties
}

interface LeaderboardEntry {
  rank, memberId, memberName, memberAvatar, memberRole, score,
  totalSales, totalProducts, rating, trend, badge
}

interface Category {
  id, name, slug, icon, description, productCount, image
}

interface BlogPost {
  id, title, slug, excerpt, content, author, date, category, image, readTime
}

interface FAQ {
  question, answer, category
}
```

### Data Files
- **Products**: 30 produk (kopi, rempah, buah, sayuran, ikan, sawit, herbal)
- **Members**: 10 member (petani, penjual, distributor)
- **Leaderboard**: 10 entry ranking
- **Categories**: 9 kategori
- **Blog Posts**: 5 artikel
- **FAQs**: 8 pertanyaan

### Kategori Produk
1. 🌶️ Rempah & Bumbu (45 produk)
2. ☕ Kopi & Teh (32 produk)
3. 🍊 Buah-buahan (58 produk)
4. 🥬 Sayuran (41 produk)
5. 🫚 Lada & Merica (23 produk)
6. 🌴 Kelapa Sawit (19 produk)
7. 🌿 Karet & Perkebunan (15 produk)
8. 🐟 Ikan & Perikanan (27 produk)
9. 🪴 Obat Herbal & Tradisional (20 produk)

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.0+ | Framework |
| TypeScript | 5.x | Language |
| React | 18.3.0 | UI Library |
| Tailwind CSS | 3.x | Styling |
| Lucide React | 0.400.0 | Icons |
| NextAuth.js | 4.x | Authentication |
| Vercel | - | Deployment |

## 📁 File Structure

```
src/
├── app/
│   ├── page.tsx              ← Homepage
│   ├── layout.tsx            ← Root layout
│   ├── globals.css           ← Global styles
│   ├── sitemap.ts            ← Dynamic sitemap
│   ├── robots.ts             ← robots.txt
│   ├── produk/
│   │   ├── page.tsx          ← Products listing
│   │   └── [slug]/page.tsx   ← Product detail
│   ├── blog/
│   │   ├── page.tsx          ← Blog listing
│   │   └── [slug]/page.tsx   ← Blog post
│   ├── faq/page.tsx          ← FAQ page
│   ├── leaderboard/page.tsx  ← Leaderboard page
│   ├── crm/page.tsx          ← CRM dashboard
│   ├── autoblog/page.tsx     ← Auto blog generator
│   ├── tentang/page.tsx      ← About page
│   ├── kontak/page.tsx       ← Contact page
│   ├── login/page.tsx        ← Login page (Google + Email)
│   ├── register/page.tsx     ← Register page (Google + Manual)
│   ├── profil/page.tsx       ← User profile page
│   └── api/
│       └── auth/
│           └── [...nextauth]/route.ts ← NextAuth API
├── components/
│   ├── Navbar.tsx            ← Navigation (with user menu)
│   ├── Footer.tsx            ← Footer
│   ├── ProductCard.tsx       ← Product card
│   ├── StatsSection.tsx      ← Stats section
│   ├── Chatbot.tsx           ← Chatbot widget
│   ├── SEOHead.tsx           ← SEO component
│   └── Providers.tsx         ← NextAuth session provider
└── lib/
    └── data.ts               ← All data & interfaces
```

## 🔐 Authentication Setup

### Google OAuth Setup
1. Buka https://console.cloud.google.com/apis/credentials
2. Create Credentials → OAuth 2.0 Client ID
3. Application type: Web application
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID & Client Secret ke `.env.local`

### Environment Variables (.env.local)
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

## 🔧 Configuration Files

- `package.json` - Dependencies
- `tailwind.config.ts` - Tailwind config
- `tsconfig.json` - TypeScript config
- `vercel.json` - Vercel deployment config

## 📝 Key Implementation Details

### Homepage Features
- Hero section dengan gradient & decorative elements
- Stats section (total produk, member, transaksi)
- Kategori grid (9 kategori)
- Produk unggulan (6 produk featured)
- Leaderboard preview (top 3)
- Blog posts preview

### Leaderboard Features
- Top 3 podium display dengan crown
- Full ranking table dengan sorting
- Score breakdown visualization
- Role badges (Penjual, Petani, Distributor)
- Trend indicators (Naik, Turun, Stabil)
- Member profile links
- Score calculation explanation (40% Penjualan, 35% Rating, 25% Produk)

### Chatbot Features
- Auto-response untuk pertanyaan umum
- Quick actions (Bantuan, Produk, FAQ)
- Typing indicator
- Responsive design

### CRM Features
- Manage pelanggan (buyer, seller, farmer)
- Filter & search
- Stats cards
- Customer detail modal
- Email blast, export, campaign

### Auto Blog Features
- AI-powered content generation
- Topic suggestions
- Keyword optimization
- Status management (draft, published, scheduled)

### SEO Features
- Enhanced meta tags (25+ keywords)
- Open Graph & Twitter cards
- JSON-LD structured data
- Dynamic sitemap
- robots.txt

### Styling
- Custom color palette: primary, earth, forest
- Utility classes: `.btn-primary`, `.btn-earth`, `.card`, `.section-title`
- Responsive design (mobile-first)
- Dark gradient backgrounds

## 🔍 SEO Keywords

### Primary Keywords
- komoditas sumatera utara
- kopi mandheling
- rempah toba
- andaliman

### Secondary Keywords
- buah segar medan
- durian montong medan
- jeruk medan
- pisang barangan
- sayuran organik karo
- ikan mas danau toba
- madu hutan toba

### Long-tail Keywords
- jual kopi mandheling online
- marketplace komoditas sumatera utara
- beli rempah toba original
- oleh-oleh medan terbaik
- komoditas unggulan sumatera utara
- petani sumatera utara

## 📋 Active Tasks

- [x] Halaman Leaderboard - DONE
- [x] Chatbot Widget - DONE
- [x] CRM Dashboard - DONE
- [x] Auto Blog Generator - DONE
- [x] SEO Optimization - DONE
- [x] Sitemap & robots.txt - DONE
- [x] Authentication System - DONE (Google OAuth + Email/Password)
- [ ] Review all pages functionality
- [ ] Add more interactive features
- [ ] Optimize performance
- [ ] Implement real database

---

*Last Updated: 2026-08-22*
*Memory System: Obsidian-compatible Markdown*
