import { Link } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";

interface OtherServicesTagsProps {
  activeTag?: string;
}

export default async function OtherServicesTags({ activeTag }: OtherServicesTagsProps) {
  const locale = await getLocale();
  const t = await getTranslations("Services");
  
  const services = await prisma.service.findMany({
    select: { title: true, titleEn: true, slug: true, slugEn: true },
    orderBy: { order: 'asc' }
  });

  return (
    <section className="py-20 relative z-10 text-center border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="flex justify-center mb-6 text-yellow-400 text-3xl tracking-widest">
          ★★★★★
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-12 tracking-tight">
          {t("otherServicesTitle")}
        </h3>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
          {services.map((service, index) => {
            const currentTitle = locale === 'en' ? (service.titleEn || service.title) : service.title;
            const currentSlug = locale === 'en' ? (service.slugEn || service.slug) : service.slug;
            return (
              <Link 
                key={index} 
                href={`/hizmetler/${currentSlug}`}
                className={`font-black text-sm md:text-base transition-colors ${
                  currentTitle === activeTag 
                    ? "text-primary" 
                    : "text-[#1a202c] hover:text-primary"
                }`}
              >
                {currentTitle}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
