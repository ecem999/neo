import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FeaturesBanner() {
  const t = useTranslations("Home");

  const features = [
    {
      title: t("feature1Title"),
      desc: t("feature1Desc"),
      icon: "/neodijitalpazarlamaajansı1.png"
    },
    {
      title: t("feature2Title"),
      desc: t("feature2Desc"),
      icon: "/neodijitalpazarlamaajansı2.png"
    },
    {
      title: t("feature3Title"),
      desc: t("feature3Desc"),
      icon: "/neodijitalpazarlamaajansı3.png"
    }
  ];

  return (
    <section className="py-12 bg-transparent relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Title Outside the Box */}
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          <span className="text-primary font-script text-4xl md:text-5xl mr-2 tracking-wider">Neo Brand Digital</span> {t("featuresTitle")}
        </h3>

        {/* Box */}
        <div className="w-full flex justify-center">
          <div className="bg-white shadow-lg border border-gray-100 p-6 lg:px-12 w-full max-w-5xl text-center md:h-[200px] flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-2 relative w-16 h-16">
                    <Image src={feature.icon} alt={feature.title} fill className="object-contain" />
                  </div>
                  <h4 className="text-md font-extrabold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-800 text-sm max-w-[240px] leading-tight">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
