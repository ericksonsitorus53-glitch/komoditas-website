import { NextRequest, NextResponse } from 'next/server';
import { resetPassword } from '@/lib/users';

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token dan password baru wajib diisi.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter.' },
        { status: 400 }
      );
    }

    const success = resetPassword(token, newPassword);

    if (!success) {
      return NextResponse.json(
        { error: 'Token tidak valid atau sudah kedaluwarsa. Silakan minta tautan baru.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Password berhasil diubah! Silakan masuk dengan password baru.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
