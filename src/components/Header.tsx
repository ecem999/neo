"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white py-4 shadow-sm z-50 relative">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/neologo.png" alt="Neo Brand Digital" width={150} height={50} className="object-contain" />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/hakkimizda" className={`hover:text-primary transition-colors ${pathname === "/hakkimizda" ? "text-primary" : ""}`}>{t("about")}</Link>
          <Link href="/hizmetler" className={`hover:text-primary transition-colors ${pathname === "/hizmetler" ? "text-primary" : ""}`}>{t("services")}</Link>
          <Link href="/referanslar" className={`hover:text-primary transition-colors ${pathname === "/referanslar" ? "text-primary" : ""}`}>{t("references")}</Link>
          <Link href="/blog" className={`hover:text-primary transition-colors ${pathname === "/blog" ? "text-primary" : ""}`}>{t("blog")}</Link>
        </nav>

        {/* CTA & Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/contact" className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:scale-105 transition-transform duration-300 inline-block shadow-md hover:shadow-lg uppercase">
            {t("meetUs")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700">
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-md py-4 px-4 flex flex-col gap-4">
          <Link href="/hakkimizda" onClick={() => setIsMenuOpen(false)} className={`hover:text-primary transition-colors ${pathname === "/hakkimizda" ? "text-primary" : "text-gray-700"}`}>{t("about")}</Link>
          <Link href="/hizmetler" onClick={() => setIsMenuOpen(false)} className={`hover:text-primary transition-colors ${pathname === "/hizmetler" ? "text-primary" : "text-gray-700"}`}>{t("services")}</Link>
          <Link href="/referanslar" onClick={() => setIsMenuOpen(false)} className={`hover:text-primary transition-colors ${pathname === "/referanslar" ? "text-primary" : "text-gray-700"}`}>{t("references")}</Link>
          <Link href="/blog" onClick={() => setIsMenuOpen(false)} className={`hover:text-primary transition-colors ${pathname === "/blog" ? "text-primary" : "text-gray-700"}`}>{t("blog")}</Link>
          <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
            <LanguageSwitcher />
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white px-6 py-2.5 rounded-full font-medium text-sm text-center w-full hover:scale-105 transition-transform duration-300 inline-block shadow-md uppercase">
              {t("meetUs")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
