import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Reference } from "@prisma/client";
import { useTranslations } from "next-intl";

interface ReferencesGridProps {
  references?: Reference[];
}

export default function ReferencesGrid({ references = [] }: ReferencesGridProps) {
  const t = useTranslations("References");

  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {references.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
            {references.map((ref) => (
              <div key={ref.id} className="flex flex-col text-left group">
                <div className="relative w-full aspect-[4/3] bg-white border border-gray-100 rounded-2xl mb-4 shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center p-8 overflow-hidden">
                  <Image 
                    src={ref.logoPath} 
                    alt={ref.companyName}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-2xl font-black text-[#1a202c] mb-2">{ref.companyName}</h4>
                {ref.websiteUrl && (
                  <a href={ref.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline inline-flex items-center">
                    {t("visitWebsiteBtn")} <span className="ml-1">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            {t("noReferences")}
          </div>
        )}
        
        {references.length > 0 && (
          <div className="mt-20 flex justify-center">
            <Link href="#" className="bg-primary text-white px-10 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg uppercase tracking-wide">
              {t("showMoreBtn")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
