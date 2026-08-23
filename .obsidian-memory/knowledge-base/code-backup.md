# 💾 Code Backup - KomoditasSumut

## 📋 Complete File List

### Configuration Files
```
package.json
package-lock.json
tsconfig.json
tailwind.config.ts
vercel.json
```

### Source Files
```
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
src/app/sitemap.ts             ← NEW
src/app/robots.ts              ← NEW
src/app/produk/page.tsx
src/app/produk/[slug]/page.tsx
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
src/app/faq/page.tsx
src/app/leaderboard/page.tsx  ← NEW
src/app/crm/page.tsx          ← NEW
src/app/autoblog/page.tsx     ← NEW
src/app/tentang/page.tsx
src/app/kontak/page.tsx
src/app/register/page.tsx
src/components/Navbar.tsx
src/components/Footer.tsx
src/components/ProductCard.tsx
src/components/StatsSection.tsx
src/components/Chatbot.tsx    ← NEW
src/components/SEOHead.tsx    ← NEW
src/lib/data.ts
```

---

## 🎨 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 📦 Package Dependencies

```json
{
  "dependencies": {
    "lucide-react": "^0.400.0",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.0"
  }
}
```

---

## 🎨 Global CSS Classes

```css
/* Utility Classes */
.btn-primary {
  @apply inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl;
}

.btn-earth {
  @apply inline-flex items-center justify-center px-6 py-3 bg-earth-500 text-white font-semibold rounded-xl hover:bg-earth-600 transition-all shadow-lg hover:shadow-xl;
}

.card {
  @apply bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all;
}

.section-title {
  @apply text-3xl font-display font-bold text-gray-900;
}

.section-subtitle {
  @apply text-gray-600 mt-2;
}
```

---

## 📊 Data Structure Reference

### Product Interface
```typescript
interface Product {
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
  moq?: number;
}
```

### Member Interface
```typescript
interface Member {
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
```

---

## 🏗️ Component Structure

### Navbar.tsx Structure
```tsx
- Mobile menu toggle
- Logo
- Navigation links (Home, Produk, Blog, FAQ, Tentang, Kontak)
- CTA button (Daftar)
- Responsive mobile menu
```

### Footer.tsx Structure
```tsx
- Logo & description
- Quick links
- Kategori links
- Kontak info
- Social media links
- Copyright
```

### ProductCard.tsx Structure
```tsx
- Product image
- Category badge
- Organic badge (if applicable)
- Product name
- Origin location
- Rating & reviews
- Price
- Seller info
- Add to cart button
```

### StatsSection.tsx Structure
```tsx
- Total products stat
- Total members stat
- Total transactions stat
- Total value stat
- Animated counters
```

---

## 🚀 Deployment

### Vercel Configuration
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Environment Variables
```
None required for current implementation
```

---

## 📝 Recreate Instructions

If project needs to be recreated:

1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest komoditas-sumut --typescript --tailwind --app
   ```

2. **Install dependencies**
   ```bash
   npm install lucide-react
   ```

3. **Copy files from memory**
   - Copy all source files from this backup
   - Copy configuration files
   - Copy global CSS

4. **Verify structure**
   ```bash
   npm run dev
   ```

---

*Backup created: 2026-08-22*
*Memory System: Active*
