// Achievement system for sellers
// Sales and achievements are persisted in a Neon (Postgres) database so the
// history survives restarts and redeploys. Achievement milestones are checked
// against the seller's real recorded sales.

import { ensureSchema, getSql } from './db';

export interface Sale {
  id: string;
  sellerEmail: string;
  sellerName: string;
  productId: string;
  productName: string;
  productSlug: string;
  category: string;
  price: number;
  quantity: number;
  totalRevenue: number;
  buyerName: string;
  buyerLocation: string;
  soldAt: string; // ISO date string
}

export interface Achievement {
  id: string;
  sellerEmail: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  relatedSaleId?: string;
}

// Achievement definitions - these are the milestones sellers can reach
export const ACHIEVEMENT_DEFINITIONS = [
  {
    type: 'first_sale',
    title: 'Penjual Pertama',
    description: 'Melakukan penjualan pertama kali',
    icon: '🎉',
    check: (totalSales: number) => totalSales === 1,
  },
  {
    type: 'sales_5',
    title: 'Penjual Aktif',
    description: 'Berhasil menjual 5 produk',
    icon: '⭐',
    check: (totalSales: number) => totalSales === 5,
  },
  {
    type: 'sales_10',
    title: 'Penjual Andal',
    description: 'Berhasil menjual 10 produk',
    icon: '🏆',
    check: (totalSales: number) => totalSales === 10,
  },
  {
    type: 'sales_25',
    title: 'Top Seller',
    description: 'Berhasil menjual 25 produk',
    icon: '👑',
    check: (totalSales: number) => totalSales === 25,
  },
  {
    type: 'sales_50',
    title: 'Master Penjual',
    description: 'Berhasil menjual 50 produk',
    icon: '🏅',
    check: (totalSales: number) => totalSales === 50,
  },
  {
    type: 'sales_100',
    title: 'Legenda Komoditas',
    description: 'Berhasil menjual 100 produk',
    icon: '🌟',
    check: (totalSales: number) => totalSales === 100,
  },
  {
    type: 'revenue_500k',
    title: 'Pengusaha Muda',
    description: 'Total pendapatan mencapai Rp500.000',
    icon: '💰',
    check: (_: number, totalRevenue: number) => totalRevenue >= 500000,
  },
  {
    type: 'revenue_1m',
    title: 'Pengusaha Sukses',
    description: 'Total pendapatan mencapai Rp1.000.000',
    icon: '💎',
    check: (_: number, totalRevenue: number) => totalRevenue >= 1000000,
  },
  {
    type: 'revenue_5m',
    title: 'Pengusaha Ulung',
    description: 'Total pendapatan mencapai Rp5.000.000',
    icon: '🏢',
    check: (_: number, totalRevenue: number) => totalRevenue >= 5000000,
  },
  {
    type: 'category_first',
    title: 'Pionir Kategori',
    description: 'Menjual produk dari kategori yang berbeda',
    icon: '🎯',
    check: (_: number, __: number, uniqueCategories: number) => uniqueCategories >= 2,
  },
  {
    type: 'category_3',
    title: 'Multikategori',
    description: 'Menjual produk dari 3 kategori berbeda',
    icon: '🌈',
    check: (_: number, __: number, uniqueCategories: number) => uniqueCategories >= 3,
  },
  {
    type: 'category_5',
    title: 'Jagoo Semua',
    description: 'Menjual produk dari 5 kategori berbeda',
    icon: '🔥',
    check: (_: number, __: number, uniqueCategories: number) => uniqueCategories >= 5,
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ============================================================
// Row <-> object mapping (columns are stored snake_case)
// ============================================================

function toDateString(value: unknown): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

function toSale(row: Record<string, any>): Sale {
  return {
    id: row.id,
    sellerEmail: row.seller_email,
    sellerName: row.seller_name,
    productId: row.product_id,
    productName: row.product_name,
    productSlug: row.product_slug,
    category: row.category,
    price: Number(row.price),
    quantity: Number(row.quantity),
    totalRevenue: Number(row.total_revenue),
    buyerName: row.buyer_name,
    buyerLocation: row.buyer_location,
    soldAt: toDateString(row.sold_at),
  };
}

function toAchievement(row: Record<string, any>): Achievement {
  return {
    id: row.id,
    sellerEmail: row.seller_email,
    type: row.type,
    title: row.title,
    description: row.description,
    icon: row.icon,
    earnedAt: toDateString(row.earned_at),
    relatedSaleId: row.related_sale_id ?? undefined,
  };
}

async function selectSalesBySeller(email: string): Promise<Sale[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM sales
    WHERE LOWER(seller_email) = LOWER(${email})
    ORDER BY sold_at ASC
  `;
  return rows.map(toSale);
}

async function selectAchievementsBySeller(email: string): Promise<Achievement[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM achievements
    WHERE LOWER(seller_email) = LOWER(${email})
  `;
  return rows.map(toAchievement);
}

// ============================================================
// Public API - all reads/writes hit Postgres
// ============================================================

/** Record a new sale and check for newly earned achievements (atomic). */
export async function recordSale(data: {
  sellerEmail: string;
  sellerName: string;
  productId: string;
  productName: string;
  productSlug: string;
  category: string;
  price: number;
  quantity: number;
  buyerName: string;
  buyerLocation: string;
}): Promise<{ sale: Sale; newAchievements: Achievement[] }> {
  await ensureSchema();
  const sql = getSql();

  const sale: Sale = {
    id: generateId(),
    ...data,
    totalRevenue: data.price * data.quantity,
    soldAt: new Date().toISOString(),
  };

  // Snapshot the seller's state BEFORE inserting so milestone checks (which
  // use exact counts, e.g. totalSales === 5) count this sale exactly once.
  const [existingSales, existingAchievements] = await Promise.all([
    selectSalesBySeller(data.sellerEmail),
    selectAchievementsBySeller(data.sellerEmail),
  ]);

  const sellerSales = [...existingSales, sale];
  const totalSales = sellerSales.length;
  const totalRevenue = sellerSales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const uniqueCategories = new Set(sellerSales.map(s => s.category)).size;

  // Check for new achievements
  const newAchievements: Achievement[] = [];
  const existingTypes = new Set(existingAchievements.map(a => a.type));

  for (const def of ACHIEVEMENT_DEFINITIONS) {
    if (!existingTypes.has(def.type) && def.check(totalSales, totalRevenue, uniqueCategories)) {
      newAchievements.push({
        id: generateId(),
        sellerEmail: data.sellerEmail,
        type: def.type,
        title: def.title,
        description: def.description,
        icon: def.icon,
        earnedAt: new Date().toISOString(),
        relatedSaleId: sale.id,
      });
    }
  }

  // Insert the sale and any new achievements in a single transaction so a
  // failure can never leave a sale recorded without its achievements.
  const insertQueries = [
    sql`
      INSERT INTO sales (
        id, seller_email, seller_name, product_id, product_name, product_slug,
        category, price, quantity, total_revenue, buyer_name, buyer_location, sold_at
      ) VALUES (
        ${sale.id}, ${sale.sellerEmail}, ${sale.sellerName}, ${sale.productId},
        ${sale.productName}, ${sale.productSlug}, ${sale.category}, ${sale.price},
        ${sale.quantity}, ${sale.totalRevenue}, ${sale.buyerName},
        ${sale.buyerLocation}, ${sale.soldAt}
      )
    `,
    ...newAchievements.map(a =>
      sql`
        INSERT INTO achievements (
          id, seller_email, type, title, description, icon, earned_at, related_sale_id
        ) VALUES (
          ${a.id}, ${a.sellerEmail}, ${a.type}, ${a.title}, ${a.description},
          ${a.icon}, ${a.earnedAt}, ${a.relatedSaleId ?? null}
        )
      `
    ),
  ];
  await sql.transaction(insertQueries);

  return { sale, newAchievements };
}

export async function getSalesBySeller(email: string): Promise<Sale[]> {
  await ensureSchema();
  return selectSalesBySeller(email);
}

export async function getAchievementsBySeller(email: string): Promise<Achievement[]> {
  await ensureSchema();
  const achievements = await selectAchievementsBySeller(email);
  return achievements.sort(
    (a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
  );
}

export async function getSellerStats(email: string) {
  await ensureSchema();
  const [sellerSales, sellerAchievements] = await Promise.all([
    selectSalesBySeller(email),
    selectAchievementsBySeller(email),
  ]);

  const totalSales = sellerSales.length;
  const totalRevenue = sellerSales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const uniqueCategories = new Set(sellerSales.map(s => s.category)).size;
  const uniqueProducts = new Set(sellerSales.map(s => s.productId)).size;

  return {
    totalSales,
    totalRevenue,
    totalProductsSold: uniqueProducts,
    uniqueCategories,
    totalAchievements: sellerAchievements.length,
    achievements: sellerAchievements.sort(
      (a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
    ),
    recentSales: sellerSales
      .sort((a, b) => new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime())
      .slice(0, 10),
  };
}

export async function getAllSales(): Promise<Sale[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM sales
    ORDER BY sold_at ASC
  `;
  return rows.map(toSale);
}

// ============================================================
// PLATFORM ANALYTICS - real aggregation over recorded sales
// History always starts from 0 and grows only from real sales.
// ============================================================

export type AnalyticsPeriod = '7days' | '30days' | '3months' | '6months' | '1year';

export const ANALYTICS_PERIODS: AnalyticsPeriod[] = ['7days', '30days', '3months', '6months', '1year'];

const INDONESIAN_MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const INDONESIAN_DAY_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

interface TimeBucket {
  key: string;
  label: string;
  start: number;
  end: number;
}

function buildTimeBuckets(period: AnalyticsPeriod): TimeBucket[] {
  const now = new Date();
  const buckets: TimeBucket[] = [];

  if (period === '7days' || period === '30days') {
    const count = period === '7days' ? 7 : 30;
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const end = new Date(d);
      end.setDate(d.getDate() + 1);
      buckets.push({
        key: d.toISOString().slice(0, 10),
        label: count === 7 ? INDONESIAN_DAY_SHORT[d.getDay()] : `${d.getDate()}/${d.getMonth() + 1}`,
        start: d.getTime(),
        end: end.getTime(),
      });
    }
  } else {
    const count = period === '3months' ? 3 : period === '1year' ? 12 : 6;
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const label =
        d.getFullYear() === now.getFullYear()
          ? INDONESIAN_MONTH_SHORT[d.getMonth()]
          : `${INDONESIAN_MONTH_SHORT[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
      buckets.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label,
        start: d.getTime(),
        end: end.getTime(),
      });
    }
  }

  return buckets;
}

function isInWindow(saleTime: number, start: number, end: number): boolean {
  return saleTime >= start && saleTime < end;
}

/** Pure aggregation over a list of sales. Kept sync so it is easy to test. */
function computePlatformAnalytics(all: Sale[], period: AnalyticsPeriod) {
  const buckets = buildTimeBuckets(period);
  const periodStart = buckets[0].start;
  const periodEnd = buckets[buckets.length - 1].end;
  const windowLength = periodEnd - periodStart;
  const prevStart = periodStart - windowLength;

  const periodSales = all.filter(s => isInWindow(new Date(s.soldAt).getTime(), periodStart, periodEnd));
  const prevSales = all.filter(s => isInWindow(new Date(s.soldAt).getTime(), prevStart, periodStart));

  // History buckets (zero-filled, so the chart starts from 0 until real sales land)
  const history = buckets.map(b => ({ label: b.label, transaksi: 0, produk: 0, revenue: 0 }));
  for (const s of periodSales) {
    const t = new Date(s.soldAt).getTime();
    const idx = buckets.findIndex(b => isInWindow(t, b.start, b.end));
    if (idx === -1) continue;
    history[idx].transaksi += 1;
    history[idx].produk += s.quantity;
    history[idx].revenue += s.totalRevenue;
  }

  // Last 7 calendar days, for the daily transactions chart
  const weekSales = all.filter(s => isInWindow(new Date(s.soldAt).getTime(), Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now()));
  const weekBuckets = buildTimeBuckets('7days');
  const weekTransactions = weekBuckets.map(b => ({ label: b.label, transaksi: 0 }));
  for (const s of weekSales) {
    const t = new Date(s.soldAt).getTime();
    const idx = weekBuckets.findIndex(b => isInWindow(t, b.start, b.end));
    if (idx === -1) continue;
    weekTransactions[idx].transaksi += 1;
  }

  // Category breakdown by volume sold
  const catMap = new Map<string, { value: number; revenue: number }>();
  const prodMap = new Map<string, { name: string; category: string; sold: number; revenue: number }>();
  const sellerMap = new Map<string, { name: string; sales: number; units: number; revenue: number }>();

  for (const s of periodSales) {
    const cat = s.category || 'Umum';
    const catEntry = catMap.get(cat) || { value: 0, revenue: 0 };
    catEntry.value += s.quantity;
    catEntry.revenue += s.totalRevenue;
    catMap.set(cat, catEntry);

    const prodEntry = prodMap.get(s.productName) || { name: s.productName, category: cat, sold: 0, revenue: 0 };
    prodEntry.sold += s.quantity;
    prodEntry.revenue += s.totalRevenue;
    prodMap.set(s.productName, prodEntry);

    const sellerKey = s.sellerEmail || s.sellerName || 'Penjual';
    const sellerEntry = sellerMap.get(sellerKey) || { name: s.sellerName || sellerKey, sales: 0, units: 0, revenue: 0 };
    sellerEntry.sales += 1;
    sellerEntry.units += s.quantity;
    sellerEntry.revenue += s.totalRevenue;
    sellerMap.set(sellerKey, sellerEntry);
  }

  const categoryBreakdown = Array.from(catMap.entries())
    .map(([name, v]) => ({ name, value: v.value, revenue: v.revenue }))
    .sort((a, b) => b.value - a.value);

  const topProducts = Array.from(prodMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const topSellers = Array.from(sellerMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);

  const summarize = (list: Sale[]) => ({
    revenue: list.reduce((sum, s) => sum + s.totalRevenue, 0),
    transactions: list.length,
    productsSold: list.reduce((sum, s) => sum + s.quantity, 0),
    activeSellers: new Set(list.map(s => s.sellerEmail.toLowerCase())).size,
  });

  return {
    period,
    totalSales: all.length,
    stats: summarize(periodSales),
    prevStats: summarize(prevSales),
    history,
    weekTransactions,
    categoryBreakdown,
    topProducts,
    topSellers,
  };
}

/** Real platform-wide analytics computed from every sale stored in Postgres. */
export async function getPlatformAnalytics(period: AnalyticsPeriod = '6months') {
  const all = await getAllSales();
  return computePlatformAnalytics(all, period);
}
