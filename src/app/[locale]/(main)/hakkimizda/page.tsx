import AboutHero from "@/components/AboutHero";
import AboutDetails from "@/components/AboutDetails";
import AboutServicesMini from "@/components/AboutServicesMini";
import AboutStats from "@/components/AboutStats";
import Portfolio from "@/components/Portfolio";
import prisma from "@/lib/prisma";

export default async function HakkimizdaPage() {
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
      <div className="absolute top-[5%] -right-[15%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[50%] -left-[15%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />

      <AboutHero />
      <AboutDetails />
      <AboutServicesMini />
      <AboutStats />
      <Portfolio references={featuredReferences} />
    </div>
  );
}
