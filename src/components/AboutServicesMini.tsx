import { useTranslations } from "next-intl";

export default function AboutServicesMini() {
  const t = useTranslations("About");

  const services = [
    {
      title: t("service1Title"),
      desc: t("service1Desc")
    },
    {
      title: t("service2Title"),
      desc: t("service2Desc")
    },
    {
      title: t("service3Title"),
      desc: t("service3Desc")
    }
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center">{t("servicesMiniTitle")}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {services.map((item, index) => (
            <div key={index} className="flex flex-col items-center pt-8 md:pt-0 px-4">
              <h4 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed text-base max-w-sm font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
