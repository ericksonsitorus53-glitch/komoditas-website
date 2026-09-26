// ============================================================
// CACHE HARGA (in-memory, per instance serverless)
// Strategi: cron harian memanaskan cache; request /api/prices membaca cache;
// jika cache kosong (cold start), fetch dilakukan on-demand lalu di-cache.
// ============================================================

import { fetchBappebti, fetchBapanas } from './fetchers';
import { PRODUCT_BASELINE, computeOverride, BAPANAS_MATCHERS } from './config';
import { recordSyncLog, SyncTrigger } from './history';

export interface LivePrice {
  slug: string;
  basePrice: number;
  livePrice: number;
  changePct: number;
  source: string;
}

export interface PriceSnapshot {
  fetchedAt: string;
  source: string;
  anchors: Record<string, number>;
  prices: Record<string, LivePrice>;
  errors: string[];
}

const TTL_MS = 6 * 60 * 60 * 1000; // 6 jam

let cache: { snapshot: PriceSnapshot; expiresAt: number } | null = null;

function computeSnapshot(anchorPrices: Record<string, number>, source: string, errors: string[], fetchedAt: string): PriceSnapshot {
  const bapanasActive = anchorPrices.BAPANAS_CMRK !== undefined;
  const prices: Record<string, LivePrice> = {};
  for (const [slug, basePrice] of Object.entries(PRODUCT_BASELINE)) {
    let livePrice: number | null = null;
    let usedSource = '';
    if (slug === 'cabe-merah-keriting' && bapanasActive) {
      livePrice = Math.round((basePrice * (anchorPrices.BAPANAS_CMRK / 55000)) / 500) * 500;
      usedSource = 'bapanas';
    } else {
      const computed = computeOverride(slug, anchorPrices);
      if (computed) {
        livePrice = computed.price;
        usedSource = computed.source;
      }
    }
    if (livePrice && livePrice > 0) {
      prices[slug] = {
        slug,
        basePrice,
        livePrice,
        changePct: Math.round(((livePrice - basePrice) / basePrice) * 1000) / 10,
        source: usedSource,
      };
    }
  }
  return { fetchedAt, source, anchors: anchorPrices, prices, errors };
}

export async function getPriceSnapshot(
  force = false,
  trigger: SyncTrigger = 'api'
): Promise<PriceSnapshot> {
  if (!force && cache && Date.now() < cache.expiresAt) return cache.snapshot;

  const startedAt = Date.now();
  const errors: string[] = [];
  const bappebti = await fetchBappebti();
  errors.push(...bappebti.errors);

  let anchorPrices = { ...bappebti.prices };
  let source: string = bappebti.source;

  // Bapanas sebagai sumber tambahan (mis. cabai merah keriting)
  const bapanasKey = process.env.BAPANAS_API_KEY;
  if (bapanasKey) {
    const bapanas = await fetchBapanas(bapanasKey);
    errors.push(...bapanas.errors);
    if (Object.keys(bapanas.prices).length) {
      anchorPrices = { ...anchorPrices, ...bapanas.prices };
      source = source === 'bappebti' ? 'bappebti+bapanas' : 'bapanas';
    }
  }

  const fetchedAt = bappebti.fetchedAt;
  const snapshot = computeSnapshot(anchorPrices, source, errors, fetchedAt);
  cache = { snapshot, expiresAt: Date.now() + TTL_MS };

  recordSyncLog({
    at: new Date().toISOString(),
    trigger,
    source: snapshot.source,
    anchorCount: Object.keys(snapshot.anchors).length,
    productsUpdated: Object.keys(snapshot.prices).length,
    errors: snapshot.errors,
    durationMs: Date.now() - startedAt,
  });

  return snapshot;
}

export function getCachedSnapshot(): PriceSnapshot | null {
  if (cache && Date.now() < cache.expiresAt) return cache.snapshot;
  return null;
}

// Util untuk matcher bapanas (dipakai fetchers saat parsing respons API)
export const bapanasMatchers = BAPANAS_MATCHERS;
