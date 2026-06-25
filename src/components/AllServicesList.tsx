import prisma from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";

export default async function AllServicesList() {
  const locale = await getLocale();
  const t = await getTranslations("References");

  const services = await prisma.service.findMany({
    select: { title: true, titleEn: true },
    orderBy: { order: 'asc' }
  });

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <h3 className="text-4xl md:text-6xl font-black text-[#1a202c] mb-16 text-center">
          {t("allServicesListTitle")}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-left">
          {services.map((service: any, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-900 font-extrabold text-sm md:text-base">
              <span className="text-[#1a202c] text-xl font-black">›</span>
              {locale === 'en' ? (service.titleEn || service.title) : service.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
