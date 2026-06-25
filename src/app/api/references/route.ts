import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const references = await prisma.reference.findMany({
      select: {
        id: true,
        companyName: true,
        logoPath: true,
        websiteUrl: true,
        isFeaturedHome: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(references);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch references' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const reference = await prisma.reference.create({
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
    return NextResponse.json(reference, { status: 201 });
  } catch (error) {
    console.error("POST Reference Error:", error);
    return NextResponse.json({ error: 'Failed to create reference' }, { status: 500 });
  }
}
