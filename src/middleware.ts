import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sadece /admin ile başlayan (ama /admin/login HARİÇ) tüm rotaları yakala
  // (Örn: /tr/admin, /en/admin, /tr/admin/settings, vs. yakalar)
  const isAdminRoute = /^\/(tr|en)\/admin(?!\/login).*/.test(pathname) || /^\/admin(?!\/login).*/.test(pathname);

  if (isAdminRoute) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      // Token yok, login sayfasına yönlendir
      // Dil prefixi varsa onu koruyarak yönlendir
      const localeMatch = pathname.match(/^\/(tr|en)/);
      const locale = localeMatch ? localeMatch[1] : 'tr';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_neo_key_123');
      await jwtVerify(token, secret);
    } catch (err) {
      // Token geçersiz, login sayfasına yönlendir
      const localeMatch = pathname.match(/^\/(tr|en)/);
      const locale = localeMatch ? localeMatch[1] : 'tr';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  // Admin veya auth rotası değilse (ya da auth başarılıysa) intl middleware'ine devret
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
