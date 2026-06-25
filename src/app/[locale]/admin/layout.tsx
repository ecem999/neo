'use client';

import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname?.includes('/admin/login');

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 relative">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col min-h-screen sticky top-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
        </div>
        <nav className="mt-6 flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="block px-6 py-3 hover:bg-gray-800 transition-colors font-medium">
                Admin Control
              </Link>
            </li>
            <li>
              <Link href="/admin/services" className="block px-6 py-3 hover:bg-gray-800 transition-colors font-medium">
                Hizmetler
              </Link>
            </li>
            <li>
              <Link href="/admin/references" className="block px-6 py-3 hover:bg-gray-800 transition-colors font-medium">
                Referanslar
              </Link>
            </li>
            <li>
              <Link href="/admin/blogs" className="block px-6 py-3 hover:bg-gray-800 transition-colors font-medium">
                Bloglar
              </Link>
            </li>
            <li>
              <Link href="/admin/messages" className="block px-6 py-3 hover:bg-gray-800 transition-colors font-medium">
                Gelen Mesajlar
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="block px-6 py-3 hover:bg-gray-800 transition-colors font-medium">
                Ayarlar
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border-t border-gray-800 w-full mt-auto">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
