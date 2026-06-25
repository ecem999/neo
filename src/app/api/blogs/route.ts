import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    const where = publishedOnly ? { isPublished: true } : {};

    const blogs = await prisma.blog.findMany({
      where,
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET Blogs Error:", error);
    return NextResponse.json({ error: 'Bloglar getirilirken bir hata oluştu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    let finalSlug = body.slug;
    let finalSlugEn = body.slugEn || null;

    // Slug uniqueness check (tr)
    let existing = await prisma.blog.findUnique({
      where: { slug: finalSlug }
    });
    if (existing) {
      finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Slug uniqueness check (en)
    if (finalSlugEn) {
      let existingEn = await prisma.blog.findUnique({
        where: { slugEn: finalSlugEn }
      });
      if (existingEn) {
        finalSlugEn = `${finalSlugEn}-${Math.random().toString(36).substring(2, 7)}`;
      }
    }

    const blog = await prisma.blog.create({
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
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
        isFeaturedHome: body.isFeaturedHome !== undefined ? body.isFeaturedHome : false,
        author: body.author || "Yazar",
        tags: body.tags || "",
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

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error("PRISMA BLOG KAYIT HATASI DETAYI:", error);
    return NextResponse.json({ error: error?.message || 'Bilinmeyen Hata', detail: error }, { status: 500 });
  }
}
