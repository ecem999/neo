import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AboutDetails() {
  const t = useTranslations("About");

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <h2 className="text-primary font-script text-3xl md:text-4xl mb-4 tracking-wide">{t("detailsSubTitle")}</h2>
        <h3 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-12">{t("detailsTitle")}</h3>
        
        <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-6 mb-16 font-medium">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
          <p>{t("p5")}</p>
          <p>{t("p6")}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/contact" className="bg-primary text-white px-10 py-3.5 rounded-full font-bold text-sm md:text-base hover:scale-105 transition-transform shadow-lg uppercase tracking-wide w-full sm:w-auto text-center">
            {t("contactBtn")}
          </Link>
          <Link href="/hizmetler" className="bg-transparent border-2 border-gray-900 text-gray-900 px-10 py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-gray-900 hover:text-white transition-colors shadow-lg uppercase tracking-wide w-full sm:w-auto text-center">
            {t("servicesBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
