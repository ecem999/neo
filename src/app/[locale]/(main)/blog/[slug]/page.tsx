import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import BlogHeader from "@/components/BlogHeader";
import BlogContent from "@/components/BlogContent";
import BlogTags from "@/components/BlogTags";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import Portfolio from "@/components/Portfolio";
import prisma from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = await getLocale();
  const t = await getTranslations("BlogDetail");

  const blog = await prisma.blog.findFirst({
    where: { 
      OR: [
        { slug: slug },
        { slugEn: slug }
      ]
    }
  });

  if (!blog || !blog.isPublished) {
    notFound();
  }

  // Previous post: older than current (lt createdAt), ordered by newest first (desc) -> first result
  const prevBlog = await prisma.blog.findFirst({
    where: { 
      createdAt: { lt: blog.createdAt },
      isPublished: true 
    },
    orderBy: { createdAt: 'desc' },
    select: { slug: true, slugEn: true, title: true, titleEn: true }
  });

  // Next post: newer than current (gt createdAt), ordered by oldest first (asc) -> first result
  const nextBlog = await prisma.blog.findFirst({
    where: { 
      createdAt: { gt: blog.createdAt },
      isPublished: true 
    },
    orderBy: { createdAt: 'asc' },
    select: { slug: true, slugEn: true, title: true, titleEn: true }
  });

  const featuredBlogs = await prisma.blog.findMany({
    where: { 
      isFeaturedHome: true,
      isPublished: true,
      id: { not: blog.id }
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      titleEn: true,
      slug: true,
      slugEn: true,
      imagePath: true,
      createdAt: true,
    }
  });

  const featuredReferences = await prisma.reference.findMany({
    where: { isFeaturedHome: true },
    select: {
      id: true,
      companyName: true,
      logoPath: true,
      websiteUrl: true,
      isFeaturedHome: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  const formattedDate = new Date(blog.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const currentTitle = locale === 'en' ? (blog.titleEn || blog.title) : blog.title;
  const currentContent = locale === 'en' ? (blog.contentEn || blog.content) : blog.content;

  return (
    <div className="relative min-h-screen bg-transparent pb-20">
      {/* Background Blobs */}
      <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none z-0 aspect-square" />
      <div className="absolute top-[40%] -right-[15%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none z-0 aspect-square" />

      <BlogHeader title={currentTitle} author={blog.author || 'Neo Brand'} date={formattedDate} />
      <BlogContent imageSrc={blog.imagePath || '/placeholder.png'} content={currentContent} />
      
      {/* Blog Tags */}
      {blog.tags && (
        <BlogTags tags={blog.tags.split(',').map((tag: string) => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`).filter(Boolean)} />
      )}
      
      {/* Pagination Navigation */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl mb-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8 gap-6">
          <div className="w-full md:w-1/2 flex justify-start">
            {prevBlog ? (
              <Link href={`/blog/${locale === 'en' ? (prevBlog.slugEn || prevBlog.slug) : prevBlog.slug}`} className="group flex flex-col max-w-xs text-left">
                <span className="text-gray-500 text-sm font-semibold mb-1 flex items-center">
                  <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> {t("prevPost")}
                </span>
                <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {locale === 'en' ? (prevBlog.titleEn || prevBlog.title) : prevBlog.title}
                </span>
              </Link>
            ) : (
              <div className="max-w-xs text-left opacity-50 cursor-not-allowed">
                <span className="text-gray-400 text-sm font-semibold mb-1 flex items-center">{t("noPrevPost")}</span>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-1/2 flex justify-end">
            {nextBlog ? (
              <Link href={`/blog/${locale === 'en' ? (nextBlog.slugEn || nextBlog.slug) : nextBlog.slug}`} className="group flex flex-col max-w-xs text-right">
                <span className="text-gray-500 text-sm font-semibold mb-1 flex items-center justify-end">
                  {t("nextPost")} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {locale === 'en' ? (nextBlog.titleEn || nextBlog.title) : nextBlog.title}
                </span>
              </Link>
            ) : (
              <div className="max-w-xs text-right opacity-50 cursor-not-allowed">
                <span className="text-gray-400 text-sm font-semibold mb-1 flex items-center justify-end">{t("noNextPost")}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <FeaturedBlogs blogs={featuredBlogs} />
      <Portfolio references={featuredReferences} />
    </div>
  );
}
