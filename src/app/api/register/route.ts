import { NextRequest, NextResponse } from 'next/server';
import { createUser, userExists } from '@/lib/users';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, location, role } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nama, email, dan password wajib diisi.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (userExists(email)) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar. Silakan masuk menggunakan email ini.' },
        { status: 409 }
      );
    }

    // Create user
    const user = createUser({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'pembeli',
      phone: phone || undefined,
      location: location || undefined,
    });

    return NextResponse.json(
      { message: 'Registrasi berhasil!', userId: user.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
