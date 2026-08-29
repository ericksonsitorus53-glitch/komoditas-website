import { NextRequest, NextResponse } from 'next/server';
import { generateResetToken, userExists } from '@/lib/users';

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

    // Always return success to prevent email enumeration
    if (!userExists(email)) {
      return NextResponse.json({
        message: 'Jika email terdaftar, tautan reset password sudah dikirim.',
      });
    }

    const token = generateResetToken(email);

    // In production you would send an email here.
    // For demo mode we return the token directly so the user can use it.
    return NextResponse.json({
      message: 'Jika email terdaftar, tautan reset password sudah dikirim.',
      // Demo: return token so the user can proceed without email
      ...(process.env.NODE_ENV !== 'production' && token ? { token } : {}),
    });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
