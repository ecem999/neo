import { Link } from "@/i18n/routing";
import { Service } from "@prisma/client";
import { useTranslations, useLocale } from "next-intl";

export default function Services({ services }: { services: Service[] }) {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="flex justify-center mb-4 text-yellow-400 text-3xl tracking-widest">
          ★★★★★
        </div>
        <h2 className="text-5xl font-extrabold text-primary mb-6">{t("servicesTitle")}</h2>
        <p className="text-gray-500 max-w-4xl mx-auto mb-16 text-lg leading-relaxed">
          {t("servicesDesc")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 text-left">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-start">
              <h3 className="text-3xl font-script text-primary mb-2 tracking-wide">
                {locale === 'en' ? (service.titleEn || service.title) : service.title}
              </h3>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {locale === 'en' ? (service.titleEn || service.title) : service.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                {locale === 'en' ? (service.miniDescriptionEn || service.miniDescription) : service.miniDescription}
              </p>
              <Link href={`/hizmetler/${locale === 'en' ? (service.slugEn || service.slug) : service.slug}`} className="bg-primary text-white px-6 py-2.5 rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300 inline-block shadow">
                {t("servicesMoreBtn")}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
            <Link href="/hizmetler" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 inline-block shadow-lg hover:shadow-xl">
                {t("portfolioSubTitle")}
            </Link>
        </div>
      </div>
    </section>
  );
}
