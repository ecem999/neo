import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const blog = await prisma.blog.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        slugEn: true,
        summary: true,
        summaryEn: true,
        content: true,
        contentEn: true,
        imagePath: true,
        isPublished: true,
        isFeaturedHome: true,
        author: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET Blog Error:", error);
    return NextResponse.json({ error: 'Blog getirilirken bir hata oluştu.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    
    let finalSlug = body.slug;
    let finalSlugEn = body.slugEn || null;

    // Slug uniqueness check (excluding self) - TR
    const existing = await prisma.blog.findUnique({
      where: { slug: finalSlug }
    });

    if (existing && existing.id !== resolvedParams.id) {
      finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Slug uniqueness check (excluding self) - EN
    if (finalSlugEn) {
      const existingEn = await prisma.blog.findUnique({
        where: { slugEn: finalSlugEn }
      });
      if (existingEn && existingEn.id !== resolvedParams.id) {
        finalSlugEn = `${finalSlugEn}-${Math.random().toString(36).substring(2, 7)}`;
      }
    }

    const blog = await prisma.blog.update({
      where: { id: resolvedParams.id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        slug: finalSlug,
        slugEn: finalSlugEn,
        summary: body.summary,
        summaryEn: body.summaryEn,
        content: body.content,
        contentEn: body.contentEn,
        imagePath: body.imagePath,
        isPublished: body.isPublished,
        isFeaturedHome: body.isFeaturedHome,
        author: body.author || 'Yazar',
        tags: body.tags || '',
      },
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        slugEn: true,
        summary: true,
        summaryEn: true,
        content: true,
        contentEn: true,
        imagePath: true,
        isPublished: true,
        isFeaturedHome: true,
        author: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("PUT Blog Error:", error);
    return NextResponse.json({ error: 'Blog güncellenirken bir hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.blog.delete({
      where: { id: resolvedParams.id },
      select: { id: true }
    });
    return NextResponse.json({ message: 'Blog başarıyla silindi.' });
  } catch (error) {
    console.error("DELETE Blog Error:", error);
    return NextResponse.json({ error: 'Blog silinirken bir hata oluştu.' }, { status: 500 });
  }
}
