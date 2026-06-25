"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value as "tr" | "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={handleLanguageChange}
        className="appearance-none bg-transparent text-gray-800 font-medium py-1 pl-3 pr-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm hover:bg-gray-50 transition-colors"
      >
        <option value="tr">TR</option>
        <option value="en">EN</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
