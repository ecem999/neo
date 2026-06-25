import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Reference } from "@prisma/client";
import { useTranslations } from "next-intl";

interface PortfolioProps {
  references?: Reference[];
}

export default function Portfolio({ references = [] }: PortfolioProps) {
  const t = useTranslations("Home");

  // In Turkish "Son Dönem" is script, "Çalışmalarımız" is bold. Let's split it roughly
  // For english "Our Recent" / "Works"
  const titleParts = t("portfolioTitle").split(" ");
  const firstPart = titleParts.slice(0, titleParts.length > 2 ? 2 : 1).join(" ");
  const secondPart = titleParts.slice(titleParts.length > 2 ? 2 : 1).join(" ");

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-primary font-script text-3xl mb-2 tracking-wide">{firstPart}</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{secondPart}</h3>
        <p className="text-gray-600 max-w-xl mb-12 text-lg">
          {t("portfolioDesc")}
        </p>

        {references.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {references.map((ref) => (
              <div key={ref.id} className="group relative w-full bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center p-6 border border-gray-100">
                <div className="relative w-full h-32 mb-4">
                  <Image 
                    src={ref.logoPath} 
                    alt={ref.companyName} 
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{ref.companyName}</h4>
                {ref.websiteUrl && (
                  <a href={ref.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-medium text-sm hover:underline mt-1 inline-flex items-center">
                    {t("portfolioVisitBtn")} <span className="ml-1">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(null).map((_, index) => (
              <div key={index} className="flex flex-col group cursor-pointer text-center">
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl mb-4 group-hover:opacity-80 transition-opacity shadow-sm animate-pulse"></div>
                <h4 className="text-2xl font-bold text-gray-400 mb-2 bg-gray-200 h-6 w-3/4 mx-auto rounded animate-pulse"></h4>
                <p className="text-gray-500 text-sm bg-gray-200 h-4 w-full mx-auto rounded animate-pulse"></p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <Link href="/referanslar" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 inline-block shadow-lg hover:shadow-xl">
            {t("portfolioAllBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
