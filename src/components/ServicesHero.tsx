import { Link } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ServicesHero() {
  const t = await getTranslations("Services");
  const locale = await getLocale();
  
  const services = await prisma.service.findMany({
    select: { title: true, titleEn: true, slug: true, slugEn: true },
    orderBy: { order: 'asc' }
  });

  return (
    <section className="pt-32 pb-16 relative z-10 text-center">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">{t("heroTitle")}</h1>
        <h2 className="text-primary font-script text-3xl md:text-4xl mb-6">{t("heroSubtitle")}</h2>
        <p className="text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed mb-12">
          {t("heroDesc")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 max-w-5xl mx-auto text-left">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={`/hizmetler/${locale === 'en' ? (service.slugEn || service.slug) : service.slug}`}
              className="flex items-center gap-3 text-gray-900 font-extrabold text-sm md:text-base hover:text-primary transition-colors group"
            >
              <span className="text-primary text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
              {locale === 'en' ? (service.titleEn || service.title) : service.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
