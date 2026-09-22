import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, generateResetToken } from '@/lib/users';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email wajib diisi.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Email tidak terdaftar. Silakan daftar terlebih dahulu.' },
        { status: 404 }
      );
    }

    // Generate token and return it for direct use (no email needed)
    const token = generateResetToken(email);

    return NextResponse.json({
      message: 'Email ditemukan. Silakan masukkan password baru.',
      token,
    });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
