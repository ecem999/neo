import ServicesHero from "@/components/ServicesHero";
import ServicesDetailGrid from "@/components/ServicesDetailGrid";
import Portfolio from "@/components/Portfolio";
import prisma from "@/lib/prisma";

export default async function HizmetlerPage() {
  const allServices = await prisma.service.findMany({
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

  return (
    <div className="relative min-h-screen">
      {/* Page Specific Background Blobs */}
      <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[50%] -right-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />

      <ServicesHero />
      <div className="max-w-7xl mx-auto border-t border-gray-200 mt-8 mb-16 opacity-50" />
      <ServicesDetailGrid services={allServices} />
      <Portfolio references={featuredReferences} />
    </div>
  );
}
