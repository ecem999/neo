import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AboutServices() {
  const t = useTranslations("Home");

  const skills = [
    {
      title: t("skill1"),
      icon: (
        <span className="text-2xl font-black text-[#1a202c]">&lt;?&gt;</span>
      )
    },
    {
      title: t("skill2"),
      icon: (
        <svg className="w-6 h-6 text-[#1a202c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: t("skill3"),
      icon: (
        <span className="text-2xl font-black text-[#1a202c]">&lt;/&gt;</span>
      )
    },
    {
      title: t("skill4"),
      icon: (
        <svg className="w-7 h-7 text-[#1a202c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: t("skill5"),
      icon: (
        <svg className="w-6 h-6 text-[#1a202c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t("skill6"),
      icon: (
        <svg className="w-7 h-7 text-[#1a202c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: t("skill7"),
      icon: (
        <svg className="w-7 h-7 text-[#1a202c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
    {
      title: t("skill8"),
      icon: (
        <svg className="w-6 h-6 text-[#1a202c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text and Skills */}
          <div>
            <h2 className="text-primary font-script text-3xl md:text-4xl mb-4 tracking-wide">
              {t("aboutSubTitle")}
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#1a202c] mb-6">
              {t("aboutTitle")}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
              {t("aboutDesc")}
            </p>
            
            <h4 className="text-2xl font-bold text-[#1a202c] mb-8">
              {t("aboutSkillsTitle")}
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#1a202c] bg-transparent">
                    {skill.icon}
                  </div>
                  <span className="text-[#1a202c] font-bold text-sm tracking-tight leading-snug max-w-[120px]">
                    {skill.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link href="/contact" className="bg-primary text-white px-10 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg uppercase inline-block">
                {t("aboutContactBtn")}
              </Link>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex justify-center lg:justify-end">
            <div className="relative w-full h-full max-w-[600px]">
              <Image 
                src="/dijitalpazarlamavewebcozumleri.png" 
                alt="Web Çözümleri" 
                fill
                className="object-contain"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
