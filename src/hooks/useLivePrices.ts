'use client';

import { useEffect, useState } from 'react';
import type { LivePrice, PriceSnapshot } from '@/lib/price-sync/cache';

export interface LivePricesState {
  prices: Record<string, LivePrice>;
  fetchedAt: string | null;
  source: string | null;
  loading: boolean;
}

// Ambil snapshot harga live sekali per sesi halaman.
// Fallback: jika API gagal, harga SSR (baseline) tetap tampil.
export function useLivePrices(): LivePricesState {
  const [state, setState] = useState<LivePricesState>({
    prices: {},
    fetchedAt: null,
    source: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/prices')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: PriceSnapshot & { status: string }) => {
        if (cancelled || data.status !== 'ok') return;
        setState({
          prices: data.prices ?? {},
          fetchedAt: data.fetchedAt ?? null,
          source: data.source ?? null,
          loading: false,
        });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
