import { useTranslations } from "next-intl";

export default function ReferencesHero() {
  const t = useTranslations("References");

  return (
    <section className="pt-32 pb-12 relative z-10 text-center">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#1a202c] mb-6">{t("heroTitle")}</h1>
        <h2 className="text-primary font-script text-2xl md:text-4xl mb-12 max-w-3xl mx-auto leading-relaxed">
          {t("heroSubtitle")}
        </h2>
        <div className="text-gray-500 text-lg md:text-xl font-semibold">
          <p>{t("heroDesc1")}</p>
          <p>{t("heroDesc2")}</p>
        </div>
      </div>
    </section>
  );
}
