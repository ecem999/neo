import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("GET Contact Messages Error:", error);
    return NextResponse.json({ error: 'Mesajlar getirilirken bir hata oluştu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Ad Soyad, E-posta ve Mesaj alanları zorunludur.' }, { status: 400 });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
      }
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error("POST Contact Message Error:", error);
    return NextResponse.json({ error: 'Mesaj gönderilirken bir hata oluştu.' }, { status: 500 });
  }
}
