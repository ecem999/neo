import Image from "next/image";
import { Link } from "@/i18n/routing";
import StatsBar from "@/components/StatsBar";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="relative bg-transparent pt-16 pb-20 lg:pt-24 lg:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-script text-primary leading-tight mb-6 tracking-wide">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("heroDesc")}
            </p>
            <div>
              <Link href="/contact" className="bg-primary text-white px-8 py-3.5 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300 inline-block shadow-lg hover:shadow-xl">
                {t("heroBtn")}
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end lg:-mr-8 xl:-mr-16">
            <div className="relative w-full max-w-xl xl:max-w-2xl h-[450px] lg:h-[650px]">
              <Image 
                src="/homepagegirl_v2.png" 
                alt="Neo Brand Digital Expert" 
                fill
                className="object-contain relative z-10"
                priority
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="pt-10 w-full flex justify-end lg:pr-16">
          <StatsBar />
        </div>
      </div>
    </section>
  );
}
