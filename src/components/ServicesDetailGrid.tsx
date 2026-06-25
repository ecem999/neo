import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Service } from "@prisma/client";
import { useTranslations, useLocale } from "next-intl";

export default function ServicesDetailGrid({ services }: { services: Service[] }) {
  const t = useTranslations("Services");
  const locale = useLocale();

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 max-w-6xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-start text-left">
              <div className="relative w-14 h-14 mb-6">
                <Image src={service.iconPath} alt={locale === 'en' ? (service.titleEn || service.title) : service.title} fill className="object-contain" unoptimized />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">{locale === 'en' ? (service.titleEn || service.title) : service.title}</h4>
              <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm md:text-base max-w-md">
                {locale === 'en' ? (service.miniDescriptionEn || service.miniDescription) : service.miniDescription}
              </p>
              <Link href={`/hizmetler/${locale === 'en' ? (service.slugEn || service.slug) : service.slug}`} className="bg-primary text-white px-8 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-md uppercase">
                {t("viewDetailsBtn")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
