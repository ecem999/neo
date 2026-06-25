import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Testimonial() {
  const t = useTranslations("Home");

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Quote Icon */}
          <div className="flex-shrink-0">
            <Image 
              src="/neoekibi.png" 
              alt={t("testimonialTitle")} 
              width={200} 
              height={200}
              className="object-contain"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-2xl md:text-3xl text-gray-500 italic mb-8 font-light leading-relaxed">
              {t("testimonialDesc")}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 text-2xl mb-3">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="text-primary font-bold text-xl">{t("testimonialAuthor")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
