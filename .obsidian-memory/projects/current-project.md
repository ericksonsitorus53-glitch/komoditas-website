# 📋 Current Project - KomoditasSumut

## Project Name
**KomoditasSumut** - Marketplace Komoditas Bumi Sumatera Utara

## Status
- **Created**: 2026-08-22
- **Last Updated**: 2026-09-22
- **Status**: ✅ Active — live di production
- **URL**: https://komoditas-sumut.vercel.app
- **Version**: 1.0.1 (tag `v1.0.1`)

## 📌 Overview

Platform marketplace komoditas pertanian, perkebunan, perikanan, dan biomassa Sumatera Utara. Menghubungkan petani, penjual, distributor, dan pembeli. Dilengkapi keranjang belanja, multi-bahasa (6 bahasa), dashboard penjual, analitik penjualan, dan peta komoditas WebGIS.

## 🎯 Features

### Pages (sesuai build output Next.js)
| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, kategori (10), produk unggulan, stats 24 komoditas |
| Produk | `/produk` | Listing semua produk + filter kategori |
| Detail Produk | `/produk/[slug]` | SSG — 24 halaman statis (46 build output), JSON-LD, WhatsApp buy |
| Keranjang | `/keranjang` | Shopping cart (cart-context) |
| Dashboard | `/dashboard` | Dashboard penjual: stats, penjualan, pencapaian |
| Analytics | `/analytics` | Grafik penjualan (recharts) |
| WebGIS | `/webgis` | Peta komoditas 20 kabupaten/kota Sumut |
| Login | `/login` | Google OAuth + Email (NextAuth) |
| Register | `/register` | Pendaftaran |
| Lupa Password | `/lupa-password` | + API forgot/reset password |
| Profil | `/profil` | Profil user + pengaturan |
| Tentang | `/tentang` | Company profile |
| Kontak | `/kontak` | Form kontak |
| Preview Gambar | `/preview-gambar` | Tool dev cek gambar produk |

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/auth/[...nextauth]` | NextAuth (Google OAuth, credentials) |
| `/api/auth/forgot-password` | Kirim permintaan reset password |
| `/api/auth/reset-password` | Reset password |
| `/api/register` | Registrasi user |

*(Route `/api/sales` sudah dihapus — data penjualan kini di localStorage, lihat Lib)*

### Components (utama)
| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Navigasi + LanguageSelector + badge keranjang |
| `LanguageSelector.tsx` | Ganti bahasa (6 bahasa) |
| `ProductCard.tsx` | Card produk + add-to-cart + blur placeholder |
| `MarkAsSoldButton.tsx` | Tandai produk terjual → catat ke API sales |
| `StatsSection.tsx` | Statistik homepage (22+ produk) |
| `Providers.tsx` | NextAuth + CartProvider + I18nProvider |
| `JsonLd.tsx` | Structured data SEO |
| `ProductCardSkeleton.tsx`, `ProductImage.tsx` | Loading & gambar |

### Lib
| File | Purpose |
|------|---------|
| `data.ts` | 22 produk, 10 kategori, siteStats |
| `cart-context.tsx` | State keranjang belanja |
| `i18n-context.tsx` + `languages.ts` + `translations.ts` | Sistem i18n 6 bahasa (828 baris) |
| `achievements.ts` | **Storage penjualan & pencapaian via localStorage** — API sama dulu (recordSale, getSellerStats, getPlatformAnalytics), tanpa backend. Cross-tab sync via event `komoditasumut:sales-changed` |
| `blur-images.ts` | Blur placeholder per produk (warna dominan) |

### Data Snapshot (2026-09-22)
- **Produk**: 24 (terbaru: Arang Kayu Keras id 23, Briket Arang Tempurung Kelapa id 24)
- **Kategori**: 10 — 🪵 Kayu & Biomassa kini berisi 3 produk: Wood Pellet Sawit (22), Arang Kayu Keras (23, Padang Lawas, Rp 9.500/kg), Briket Arang Tempurung Kelapa (24, Langkat, Rp 12.000/kg)
- **Foto biomassa lokal** (`public/images/products/`, semua Wikimedia Commons CC): wood-pellet.jpg, arang-kayu.jpg, briket-arang.jpg — pilih foto **landscape** untuk card 4:3

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.0+ | Framework (SSG + API routes) |
| TypeScript | 5.x | Language |
| React | 18.3.0 | UI Library |
| Tailwind CSS | 3.4.x | Styling |
| NextAuth.js | 4.24.x | Authentication |
| recharts | 2.12.x | Grafik analytics |
| sharp + plaiceholder | - | Optimasi gambar |
| lucide-react | 0.400.x | Icons |

## 🚀 Deployment & Infrastructure (setup 2026-09-22)

### Production
- **URL**: https://komoditas-sumut.vercel.app (Vercel, project `komoditas-sumut`)
- **Team/akun Vercel**: `ericksonsitorus53-9681` (CLI login aktif)
- **Project linked**: `.vercel/project.json` (jangan di-commit)

### GitHub
- **Repo**: `ericksonsitorus53-glitch/komoditas-website` (public)
- **Branch**: `main` — history lengkap 13+ commit, force-pushed dari lokal 2026-09-22
- **Remote origin**: `git@github.com:ericksonsitorus53-glitch/komoditas-website.git` (SSH)

### SSH Key (dipasang via GitHub device flow, scope admin:public_key)
- **File**: `~/.ssh/id_ed25519` (ed25519, komentar `erickson@komoditas-sumut`)
- **Terdaftar di GitHub sebagai**: "komoditas-sumut-server (freebuff)" — key ID `164030919`, tipe Authentication Key
- **Fingerprint**: `SHA256:NpH0b3ioUMTqVk/5S7chmzFeXe18v6ScbDuQPzuaHww`
- ⚠️ Kalau push dari mesin ini gagal `Permission denied`: cek key terdaftar dengan fingerprint PERSIS di atas di github.com/settings/keys

### Vercel Git Integration ✅ AKTIF
- `vercel git connect` sudah dijalankan → repo GitHub terhubung
- **Pipeline terverifikasi**: push `6050326` (v1.0.1) → deploy `7av405zdc` auto-trigger → Ready 45s → alias production
- **Workflow**: `git push origin main` = live ±1 menit. Tanpa CLI.

### Data Penjualan (localStorage — sejak 2026-09-22)
- **Tidak ada database** — penjualan & pencapaian tersimpan di `localStorage` browser (keys: `komoditasumut:sales`, `komoditasumut:achievements`)
- API `achievements.ts` tetap sama seperti versi Postgres → ganti storage balik ke DB cukup ubah 1 file
- ⚠️ Data per browser/device; clear site data = data hilang; tidak untuk multi-penjual lintas perangkat

## ⚠️ Operational Notes

- **Revoke token classic** `ghp_X2dc...` (note: komoditas-push) di github.com/settings/tokens — sudah tidak dipakai, SSH sudah aktif
- Device-flow token (GitHub CLI, scope admin:public_key) tidak pernah lewat chat — aman dibiarkan
- Jangan commit `.freebuff/` dan `.vercel/`
- Count produk di-hardcode di beberapa tempat (StatsSection, page.tsx, tentang, translations.ts ×6 bahasa) — kalau tambah produk, update semuanya

## 📋 Active Tasks

- [x] Wood Pellet Sawit + kategori Kayu & Biomassa — DONE (2026-09-22)
- [x] Keranjang belanja (cart-context + /keranjang) — DONE
- [x] i18n 6 bahasa + LanguageSelector — DONE
- [x] WebGIS peta komoditas — DONE
- [x] Analytics + dashboard penjual + achievements — DONE
- [x] Neon Postgres (sales & achievements) — DIBATALKAN, diganti localStorage (2026-09-22)
- [x] GitHub ↔ Vercel auto-deploy + SSH push — DONE (2026-09-22)
- [ ] Review all pages functionality
- [ ] Optimize performance
- [x] Perluas katalog biomassa (arang kayu, briket tempurung) — DONE (2026-09-22)

---
*Last Updated: 2026-09-22*
*Memory System: Obsidian-compatible Markdown*
