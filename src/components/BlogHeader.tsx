import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BlogHeaderProps {
  title: string;
  author: string;
  date: string;
}

export default function BlogHeader({ title, author, date }: BlogHeaderProps) {
  const t = useTranslations("BlogDetail");

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-5xl pt-32 pb-8 relative z-10 text-center">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a202c] leading-tight">
          {title}
        </h1>
      </div>
      <div className="text-gray-500 text-sm font-medium">
        {date} | {t("author")}: {author}
      </div>
    </div>
  );
}
