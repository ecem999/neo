import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

type BlogProps = {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  slugEn?: string | null;
  imagePath: string;
  createdAt: Date;
};

export default function LatestPosts({ blogs }: { blogs?: BlogProps[] }) {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gray-500 text-sm tracking-widest uppercase mb-2 block font-medium">{t("blogSubTitle")}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary">{t("blogTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((post) => (
              <div key={post.id} className="flex flex-col group text-center md:text-left hover:-translate-y-2 transition-transform duration-300">
                <Link href={`/blog/${locale === 'en' ? (post.slugEn || post.slug) : post.slug}`} className="w-full aspect-[4/3] relative rounded-2xl mb-6 shadow-sm block overflow-hidden">
                  <Image 
                    src={post.imagePath || '/placeholder.png'} 
                    alt={locale === 'en' ? (post.titleEn || post.title) : post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <span className="text-gray-500 text-xs tracking-wider uppercase mb-3 font-medium">
                  {new Date(post.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-snug">
                  <Link href={`/blog/${locale === 'en' ? (post.slugEn || post.slug) : post.slug}`}>
                    {locale === 'en' ? (post.titleEn || post.title) : post.title}
                  </Link>
                </h3>
                <Link href={`/blog/${locale === 'en' ? (post.slugEn || post.slug) : post.slug}`} className="text-blue-500 font-medium text-sm hover:underline mt-auto inline-block">
                  {t("blogReadMoreBtn")}
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500"></p>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/blog" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 inline-block shadow-lg hover:shadow-xl">
            {t("blogAllBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
