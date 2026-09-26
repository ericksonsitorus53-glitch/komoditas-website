// ============================================================
// AUTH ADMIN HARGA — memakai CRON_SECRET yang sama dengan cron.
// Perbandingan timing-safe biar gak bocor via timing attack.
// ============================================================

import { timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

export function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET || '';
  if (!secret) return false;

  // 1) Header Authorization: Bearer <secret>
  const auth = request.headers.get('authorization') || '';
  // 2) Atau query param ?key=<secret> (praktis untuk akses dari browser)
  const url = new URL(request.url);
  const keyParam = url.searchParams.get('key') || '';

  const candidate = auth.startsWith('Bearer ') ? auth.slice(7) : keyParam;
  if (!candidate) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
