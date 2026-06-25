import { useTranslations } from "next-intl";

export default function StatsBar() {
  const t = useTranslations("Home");

  return (
    <div className="bg-white shadow-lg border border-gray-100 p-6 w-full max-w-5xl relative z-20 md:h-[200px] flex items-center justify-center">
      <div className="flex flex-col md:flex-row justify-around items-center gap-8 w-full">
        <div className="flex flex-row items-center justify-center gap-4">
          <span className="text-6xl lg:text-7xl font-extrabold text-primary">+11</span>
          <div className="flex flex-col text-left">
            <span className="text-gray-900 font-extrabold text-lg leading-tight">{t("statsYear1")}</span>
            <span className="text-gray-900 font-extrabold text-lg leading-tight">{t("statsYear2")}</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <span className="text-6xl lg:text-7xl font-extrabold text-primary">+350</span>
          <div className="flex flex-col text-left">
            <span className="text-gray-900 font-extrabold text-lg leading-tight">{t("statsBrand1")}</span>
            <span className="text-gray-900 font-extrabold text-lg leading-tight">{t("statsBrand2")}</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <span className="text-6xl lg:text-7xl font-extrabold text-primary">+900</span>
          <div className="flex flex-col text-left">
            <span className="text-gray-900 font-extrabold text-lg leading-tight">{t("statsProject1")}</span>
            <span className="text-gray-900 font-extrabold text-lg leading-tight">{t("statsProject2")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
