import Hero from "@/components/Hero";
import FeaturesBanner from "@/components/FeaturesBanner";
import AboutServices from "@/components/AboutServices";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonial from "@/components/Testimonial";
import LatestPosts from "@/components/LatestPosts";
import prisma from "@/lib/prisma";

export default async function Home() {
  const featuredServices = await prisma.service.findMany({
    where: { isFeaturedHome: true },
    orderBy: { order: 'asc' }
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
    },
    orderBy: { createdAt: 'desc' }
  });

  const featuredBlogs = await prisma.blog.findMany({
    where: { isFeaturedHome: true, isPublished: true },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <Hero />
      <FeaturesBanner />
      <AboutServices />
      <Services services={featuredServices} />
      <Portfolio references={featuredReferences} />
      <Testimonial />
      <LatestPosts blogs={featuredBlogs} />
    </>
  );
}
