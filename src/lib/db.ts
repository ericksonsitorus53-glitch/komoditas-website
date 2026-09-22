// Neon (serverless Postgres) connection layer.
//
// The client is created lazily on first use so the app can still build and
// typecheck without DATABASE_URL set. At request time, a missing DATABASE_URL
// surfaces as a clear error instead of a silent in-memory fallback.

import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let client: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL is not set. Add your Neon Postgres connection string to the ' +
          'environment (Vercel project settings, and .env.local for local development).'
      );
    }
    client = neon(connectionString);
  }
  return client;
}

// Schema is created on first use. Each statement runs separately so it works
// on any Postgres connection; every statement is idempotent (IF NOT EXISTS).
const SCHEMA_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS sales (
    id TEXT PRIMARY KEY,
    seller_email TEXT NOT NULL,
    seller_name TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_slug TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Umum',
    price BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    total_revenue BIGINT NOT NULL,
    buyer_name TEXT NOT NULL DEFAULT 'Pembeli',
    buyer_location TEXT NOT NULL DEFAULT '',
    sold_at TIMESTAMPTZ NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS idx_sales_seller_email ON sales (seller_email)',
  'CREATE INDEX IF NOT EXISTS idx_sales_sold_at ON sales (sold_at)',
  `CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    seller_email TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    earned_at TIMESTAMPTZ NOT NULL,
    related_sale_id TEXT
  )`,
  'CREATE INDEX IF NOT EXISTS idx_achievements_seller_email ON achievements (seller_email)',
];

let schemaReady: Promise<void> | null = null;

/** Ensure the sales & achievements tables exist. Runs once per server instance. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await Promise.all(SCHEMA_STATEMENTS.map((statement) => sql(statement)));
    })().catch((error) => {
      schemaReady = null; // allow a retry after transient failures
      throw error;
    });
  }
  return schemaReady;
}
