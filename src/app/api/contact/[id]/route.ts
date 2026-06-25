import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.contactMessage.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Mesaj başarıyla silindi.' });
  } catch (error: any) {
    console.error("DELETE Contact Message Error:", error);
    return NextResponse.json({ error: 'Mesaj silinirken bir hata oluştu.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: {
        isRead: body.isRead
      }
    });

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.error("PUT Contact Message Error:", error);
    return NextResponse.json({ error: 'Mesaj güncellenirken bir hata oluştu.' }, { status: 500 });
  }
}
