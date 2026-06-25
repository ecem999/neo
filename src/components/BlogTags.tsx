import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BlogTagsProps {
  tags: string[];
}

export default function BlogTags({ tags }: BlogTagsProps) {
  const t = useTranslations("BlogDetail");

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl relative z-10 pb-16 pt-8 border-t border-gray-100">
      <div className="flex flex-wrap gap-3 justify-start md:justify-center mb-16">
        {tags.map((tag, i) => (
          <Link key={i} href={`/blog?tag=${tag.replace('#', '')}`} className="bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary px-4 py-2 rounded-full text-sm font-medium transition-colors">
            {tag}
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Link href="/blog" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg inline-block uppercase tracking-wide">
          {t("viewAllBlogsBtn")}
        </Link>
      </div>
    </div>
  );
}
