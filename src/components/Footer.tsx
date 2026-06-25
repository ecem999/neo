import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations, getLocale } from "next-intl/server";
import prisma from "@/lib/prisma";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();

  const recentBlogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      titleEn: true,
      slug: true,
      slugEn: true,
    }
  });

  return (
    <footer className="mt-auto relative bg-white">
      {/* Orange Blur Background on the left */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Col & Navigation */}
          <div className="col-span-1 lg:col-span-1 flex flex-col items-start">
            <Link href="/" className="inline-block mb-8">
              <Image src="/neologo.png" alt="Neo Brand Digital" width={160} height={50} className="object-contain" />
            </Link>
            <ul className="space-y-4">
              <li><Link href="/hizmetler" className="text-gray-800 hover:text-primary transition-colors text-sm font-medium">{t("services")}</Link></li>
              <li><Link href="/hakkimizda" className="text-gray-800 hover:text-primary transition-colors text-sm font-medium">{t("about")}</Link></li>
              <li><Link href="/referanslar" className="text-gray-800 hover:text-primary transition-colors text-sm font-medium">{t("references")}</Link></li>
              <li><Link href="/blog" className="text-gray-800 hover:text-primary transition-colors text-sm font-medium">{t("blog")}</Link></li>
            </ul>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-lg">{t("services")}</h4>
            <ul className="space-y-4">
              <li><Link href="/dijital-strateji-yonetimi" className="text-gray-600 hover:text-primary transition-colors text-sm">Dijital Strateji Yönetimi</Link></li>
              <li><Link href="/sosyal-medya-yonetimi" className="text-gray-600 hover:text-primary transition-colors text-sm">Sosyal Medya Yönetimi</Link></li>
              <li><Link href="/arama-motoru-optimizasyonu" className="text-gray-600 hover:text-primary transition-colors text-sm">Arama Motoru Optimizasyonu</Link></li>
              <li><Link href="/reklam-ve-medya-yonetimi" className="text-gray-600 hover:text-primary transition-colors text-sm">Google Ads Reklamcılığı</Link></li>
              <li><Link href="/reklam-ve-medya-yonetimi" className="text-gray-600 hover:text-primary transition-colors text-sm">Sosyal Medya Reklamcılığı</Link></li>
            </ul>
          </div>

          {/* Son Makaleler */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-lg">{t("recentArticles")}</h4>
            <ul className="space-y-4">
              {recentBlogs.map((blog) => (
                <li key={blog.id}>
                  <Link href={`/blog/${locale === 'en' ? (blog.slugEn || blog.slug) : blog.slug}`} className="text-gray-600 hover:text-primary transition-colors text-sm line-clamp-2">
                    {locale === 'en' ? (blog.titleEn || blog.title) : blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-lg">{t("contact")}</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><span className="font-bold text-gray-800">{t("phone")}</span> (+90) 530 471 90 67</li>
              <li><span className="font-bold text-gray-800">{t("email")}</span> info@digitalneobrand.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#e5e5e5] py-8 border-t border-gray-300 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-[#2d2d2d] text-[13px] md:text-[14px] font-bold leading-tight md:leading-normal text-center md:text-left order-2 md:order-1">
            © Neo Brand Digital Agency. / Neo Brand Digital TEKNOLOJİ LİMİTED ŞİRKETİ Sitede yer alan eserlerin bütünü veya bir kısmı değiştirilerek veya<br className="hidden md:block" />
            başka bir suretle diğer bir internet sitesinde izinsiz olarak kullanılamaz.
          </div>
          <div className="flex items-center gap-3 order-1 md:order-2">
            <a href="https://www.facebook.com/profile.php?id=100089821567447&sk=following" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black flex items-center justify-center rounded-[4px] hover:opacity-80 transition-opacity">
              <svg fill="white" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/neobranddigital/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black flex items-center justify-center rounded-[4px] hover:opacity-80 transition-opacity">
              <svg fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-[18px] h-[18px] text-white">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/neobranddigital/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black flex items-center justify-center rounded-[4px] hover:opacity-80 transition-opacity">
              <svg fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
