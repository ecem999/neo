import BlogList from "@/components/BlogList";
import Portfolio from "@/components/Portfolio";
import prisma from "@/lib/prisma";

export default async function BlogPage() {
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

  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      titleEn: true,
      slug: true,
      slugEn: true,
      summary: true,
      summaryEn: true,
      imagePath: true,
      author: true,
      tags: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="relative min-h-screen">
      {/* Page Specific Background Blobs */}
      <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[40%] -right-[15%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[80%] -left-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />

      <BlogList blogs={blogs} />
      <Portfolio references={featuredReferences} />
    </div>
  );
}
