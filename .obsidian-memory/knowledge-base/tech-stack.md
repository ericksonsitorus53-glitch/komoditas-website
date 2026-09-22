# 💻 Technology Stack

## Core Framework

### Next.js 14 (App Router)
- **Version**: 14.2.0+
- **Purpose**: React framework for production
- **Key Features**: SSG (`generateStaticParams` untuk 22 halaman produk), API routes, file-based routing
- **Build output**: statis untuk halaman konten, dinamis (`ƒ`) untuk API routes

## Languages
- **TypeScript** 5.x — strict typecheck (`tsc --noEmit` clean per 2026-09-22)

## Styling
- **Tailwind CSS** 3.4.x — utility-first, config di `tailwind.config.ts`
- Palet custom: `primary`, `earth`, `forest`
- Utility classes: `.btn-primary`, `.btn-earth`, `.card`, `.section-title`, `.badge`

## Dependencies (package.json)

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^14.2.0 | Framework |
| react / react-dom | ^18.3.0 | UI Library |
| @neondatabase/serverless | ^0.10.4 | Neon serverless Postgres (sales & achievements) |
| next-auth | ^4.24.15 | Auth (Google OAuth + credentials) |
| recharts | ^2.12.0 | Grafik analytics dashboard |
| sharp | ^0.35.3 | Optimasi gambar (Vercel image optimization) |
| plaiceholder | ^3.0.0 | Blur placeholder |
| lucide-react | ^0.400.0 | Icons |
| clsx | ^2.1.0 | Class names utility |

## Data Layer
- **Statis**: `src/lib/data.ts` — 22 produk, 10 kategori (source of truth katalog)
- **Database**: `src/lib/db.ts` — Neon Postgres, lazy client, schema idempotent (`sales`, `achievements`)
- **Env**: `DATABASE_URL` (wajib untuk fitur sales; tanpa itu error jelas di request time)

## i18n
- Custom ringan: `i18n-context.tsx` + `languages.ts` + `translations.ts` (6 bahasa, interface `Translations`)

## Deployment — Vercel (aktif 2026-09-22)

| Item | Value |
|------|-------|
| Production | https://komoditas-sumut.vercel.app |
| Project | `komoditas-sumut` (team `ericksonsitorus53-9681`) |
| Git integration | ✅ GitHub `ericksonsitorus53-glitch/komoditas-website` (main) |
| Deploy trigger | **push ke main = auto-deploy** (±45–60 detik) |
| SSH push | `~/.ssh/id_ed25519` (fp `SHA256:NpH0b3ioUMTqVk/5S7chmzFeXe18v6ScbDuQPzuaHww`), terdaftar sebagai Authentication Key |
| Fallback | `npx vercel --prod` CLI (login aktif) |
| Config | `vercel.json` + `.vercel/project.json` (linked, jangan di-commit) |

---

*Last Updated: 2026-09-22*
