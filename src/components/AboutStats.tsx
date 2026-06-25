import { Link } from "@/i18n/routing";
import StatsBar from "@/components/StatsBar";
import { useTranslations } from "next-intl";

export default function AboutStats() {
  const t = useTranslations("About");

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center">
        <StatsBar />
        <div className="mt-12">
          <Link href="/hizmetler" className="bg-primary text-white px-12 py-4 rounded-full font-bold text-sm md:text-base hover:scale-105 transition-transform shadow-lg uppercase inline-block tracking-wide">
            {t("allServicesBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
