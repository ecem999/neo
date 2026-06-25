import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

type BlogProps = {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  slugEn?: string | null;
  summary: string;
  summaryEn?: string | null;
  imagePath: string;
  author: string | null;
  tags: string | null;
  createdAt: Date;
};

export default function BlogList({ blogs }: { blogs: BlogProps[] }) {
  const t = useTranslations("BlogList");
  const locale = useLocale();

  return (
    <section className="pt-32 pb-24 relative z-10 text-center">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <h2 className="text-primary font-script text-2xl md:text-3xl mb-4 tracking-wide">Blog</h2>
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a202c] mb-20">{t("mainTitle")}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {blogs.length === 0 ? (
            <p className="text-gray-500 col-span-full">{t("noBlogs")}</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col text-left group hover:-translate-y-2 transition-transform duration-300">
                <Link href={`/blog/${locale === 'en' ? (blog.slugEn || blog.slug) : blog.slug}`} className="w-full aspect-[4/3] relative rounded-2xl mb-4 shadow-sm block overflow-hidden">
                  <Image 
                    src={blog.imagePath || '/placeholder.png'} 
                    alt={locale === 'en' ? (blog.titleEn || blog.title) : blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-2 font-medium">
                  <span>{new Date(blog.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>{blog.author}</span>
                </div>
                <h4 className="text-2xl font-black text-[#1a202c] mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${locale === 'en' ? (blog.slugEn || blog.slug) : blog.slug}`}>
                    {locale === 'en' ? (blog.titleEn || blog.title) : blog.title}
                  </Link>
                </h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-[280px] mb-3">
                  {locale === 'en' ? (blog.summaryEn || blog.summary) : blog.summary}
                </p>
                {blog.tags && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] uppercase font-bold px-2 py-1 rounded">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                )}
                <Link href={`/blog/${locale === 'en' ? (blog.slugEn || blog.slug) : blog.slug}`} className="text-primary font-bold text-sm mt-auto hover:underline inline-block">
                  {t("readMore")}
                </Link>
              </div>
            ))
          )}
        </div>
        
        {blogs.length > 0 && (
          <div className="mt-20 flex justify-center">
            <Link href="#" className="bg-primary text-white px-10 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg uppercase tracking-wide">
              {t("loadMoreBtn")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
