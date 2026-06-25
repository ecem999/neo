import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reference = await prisma.reference.findUnique({
      where: { id },
      select: {
        id: true,
        companyName: true,
        logoPath: true,
        websiteUrl: true,
        isFeaturedHome: true,
        createdAt: true,
      },
    });

    if (!reference) {
      return NextResponse.json({ error: 'Reference not found' }, { status: 404 });
    }

    return NextResponse.json(reference);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: 'Failed to fetch reference' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const reference = await prisma.reference.update({
      where: { id },
      data,
      select: {
        id: true,
        companyName: true,
        logoPath: true,
        websiteUrl: true,
        isFeaturedHome: true,
        createdAt: true,
      },
    });

    return NextResponse.json(reference);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: 'Failed to update reference' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.reference.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Reference deleted successfully' });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: 'Failed to delete reference' }, { status: 500 });
  }
}
