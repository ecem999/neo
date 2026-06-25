import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    // Token doğrulama
    let decoded;
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_neo_key_123');
      const { payload } = await jwtVerify(token, secret);
      decoded = payload;
    } catch (err) {
      return NextResponse.json({ error: 'Geçersiz token.' }, { status: 401 });
    }

    const { username, newPassword } = await request.json();

    if (!username || !newPassword) {
      return NextResponse.json(
        { error: 'Kullanıcı adı ve yeni şifre gereklidir.' },
        { status: 400 }
      );
    }

    const adminId = decoded.id as string;
    
    // Check if the username is taken by someone else
    const existingAdmin = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin && existingAdmin.id !== adminId) {
      return NextResponse.json(
        { error: 'Bu kullanıcı adı zaten kullanılıyor.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { success: true, username: updatedAdmin.username },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Profil güncellenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
