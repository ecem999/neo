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

export default function FeaturedBlogs({ blogs }: { blogs?: BlogProps[] }) {
  const t = useTranslations("BlogDetail");
  const locale = useLocale();

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-20 relative z-10 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a202c]">{t("featuredBlogsTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div key={post.id} className="flex flex-col group text-center md:text-left">
              <Link href={`/blog/${locale === 'en' ? (post.slugEn || post.slug) : post.slug}`} className="w-full aspect-[4/3] bg-gray-300 rounded-2xl mb-6 group-hover:opacity-80 transition-opacity shadow-sm block relative overflow-hidden">
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
              <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-primary transition-colors leading-snug">
                <Link href={`/blog/${locale === 'en' ? (post.slugEn || post.slug) : post.slug}`}>
                  {locale === 'en' ? (post.titleEn || post.title) : post.title}
                </Link>
              </h3>
              <Link href={`/blog/${locale === 'en' ? (post.slugEn || post.slug) : post.slug}`} className="text-blue-500 font-medium text-sm hover:underline mt-auto inline-block">
                {t("readMoreBtn")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
