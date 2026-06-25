import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import OtherServicesTags from "@/components/OtherServicesTags";
import Portfolio from "@/components/Portfolio";
import { getLocale, getTranslations } from "next-intl/server";

export default async function DynamicServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = await getLocale();
  const t = await getTranslations("Services");
  
  const service = await prisma.service.findFirst({
    where: { 
      OR: [
        { slug: slug },
        { slugEn: slug }
      ]
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

  if (!service) {
    notFound();
  }

  const currentTitle = locale === 'en' ? (service.titleEn || service.title) : service.title;
  const currentMiniDescription = locale === 'en' ? (service.miniDescriptionEn || service.miniDescription) : service.miniDescription;
  const currentDetailMainTitle = locale === 'en' ? (service.detailMainTitleEn || service.detailMainTitle) : service.detailMainTitle;
  const currentDetailSmallDescription = locale === 'en' ? (service.detailSmallDescriptionEn || service.detailSmallDescription) : service.detailSmallDescription;
  const currentSubTitle1 = locale === 'en' ? (service.subTitle1En || service.subTitle1) : service.subTitle1;
  const currentText1 = locale === 'en' ? (service.text1En || service.text1) : service.text1;
  const currentSubTitle2 = locale === 'en' ? (service.subTitle2En || service.subTitle2) : service.subTitle2;
  const currentText2 = locale === 'en' ? (service.text2En || service.text2) : service.text2;
  const currentSubTitle3 = locale === 'en' ? (service.subTitle3En || service.subTitle3) : service.subTitle3;
  const currentText3 = locale === 'en' ? (service.text3En || service.text3) : service.text3;

  return (
    <div className="relative min-h-screen">
      {/* Background Blobs */}
      <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[40%] -right-[15%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[80%] -left-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />

      <ServiceDetailHero 
        title={currentTitle} 
        description={currentDetailSmallDescription || currentMiniDescription}
        imageSrc={service.image1 || service.iconPath}
      />
      
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
          
          {currentDetailMainTitle && (
            <div className="space-y-6 text-lg leading-relaxed">
              <h3 className="text-xl font-bold text-gray-900">{currentDetailMainTitle}</h3>
              {currentText1 && <p>{currentText1}</p>}
            </div>
          )}

          {/* Banner 1 */}
          {service.image2 && (
            <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
              <Image 
                src={service.image2} 
                alt={currentSubTitle2 || currentTitle} 
                fill
                className="object-cover z-0"
              />
              <div className="absolute inset-0 bg-black/30 z-0"></div>
              {currentSubTitle2 && (
                <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
                  {currentSubTitle2}
                </h3>
              )}
            </div>
          )}

          {currentSubTitle1 && currentText2 && (
            <div className="space-y-6 text-lg leading-relaxed">
              <h3 className="text-xl font-bold text-gray-900">{currentSubTitle1}</h3>
              <p>{currentText2}</p>
            </div>
          )}

          {/* Banner 2 */}
          {service.image3 && (
            <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
              <Image 
                src={service.image3} 
                alt={currentSubTitle3 || currentTitle} 
                fill
                className="object-cover z-0"
              />
              <div className="absolute inset-0 bg-black/20 z-0"></div>
              {currentSubTitle3 && (
                <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
                  {currentSubTitle3}
                </h3>
              )}
            </div>
          )}

          {currentText3 && (
            <div className="space-y-6 text-lg leading-relaxed">
              {currentSubTitle3 && <h3 className="text-xl font-bold text-gray-900">{currentSubTitle3}</h3>}
              <p>{currentText3}</p>
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-12 flex justify-center">
            <Link href="/contact" className="bg-primary text-white w-full max-w-md py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg uppercase tracking-wide text-center block">
              {t("getQuoteBtn")}
            </Link>
          </div>
        </div>
      </section>

      <OtherServicesTags activeTag={currentTitle} />
      <Portfolio references={featuredReferences} />
    </div>
  );
}
