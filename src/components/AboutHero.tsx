import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("About");

  return (
    <section className="pt-32 pb-16 relative z-10 text-center">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6">{t("heroTitle")}</h1>
        <p className="text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed mb-20 font-medium">
          {t("heroDesc")}
        </p>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative lines */}
          <div className="absolute -top-8 -left-8 md:-top-12 md:-left-12 w-24 h-24 md:w-32 md:h-32 border-t-[6px] border-l-[6px] border-primary rounded-tl-3xl z-0 opacity-80 hidden sm:block"></div>
          <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-24 h-24 md:w-32 md:h-32 border-b-[6px] border-r-[6px] border-primary rounded-br-3xl z-0 opacity-80 hidden sm:block"></div>
          
          {/* Organic blob shaped image container */}
          <div 
            className="relative w-full aspect-[21/9] bg-gray-100 shadow-2xl z-10 overflow-hidden" 
            style={{ borderRadius: '48% 52% 68% 32% / 42% 28% 72% 58%' }}
          >
            <Image 
              src="/hakkimizdagörsel.png" 
              alt="NeoBrand Digital Office" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
