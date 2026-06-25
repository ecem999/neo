import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Lobster_Two } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neo Brand Digital",
  description: "Dijital Pazarlama ve Web Çözümleri",
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${lobsterTwo.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans relative overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
