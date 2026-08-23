# 🏗️ Project Overview

## Current Project

### Project Type
**Web Application** - Indonesian Language Website

### Main Features

1. **Homepage** (`/`)
   - Hero section
   - Features overview
   - Call to action

2. **Navigation**
   - Home
   - Produk (Products)
   - Blog
   - FAQ
   - Tentang (About)
   - Kontak (Contact)

3. **Pages Available**
   - `/` - Homepage
   - `/produk` - Products listing
   - `/produk/[slug]` - Product detail
   - `/blog` - Blog listing
   - `/blog/[slug]` - Blog post
   - `/faq` - Frequently Asked Questions
   - `/tentang` - About page
   - `/kontak` - Contact page

### Data Layer

**File**: `src/lib/data.ts`
- Contains product data
- Contains blog posts
- Centralized data management

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Navbar | `src/components/Navbar.tsx` | Navigation menu |
| Footer | `src/components/Footer.tsx` | Site footer |
| ProductCard | `src/components/ProductCard.tsx` | Product display |
| StatsSection | `src/components/StatsSection.tsx` | Statistics display |

---

## Project Conventions

- **Language**: Indonesian
- **Styling**: Tailwind CSS utility classes
- **State**: Server components (Next.js 14)
- **Data**: Static/mock data in `src/lib/data.ts`

---

*Last Updated: 2026-08-22*
