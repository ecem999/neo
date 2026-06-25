import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Kullanıcı adı ve şifre gereklidir.' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı.' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı.' },
        { status: 401 }
      );
    }

    // JWT oluşturma (jose ile)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_neo_key_123');
    const token = await new SignJWT({ id: admin.id, username: admin.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // 1 gün geçerli
      .sign(secret);

    // Cookie'ye kaydetme
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 gün
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
