'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full text-left px-6 py-3 hover:bg-red-900/50 text-red-400 transition-colors font-medium flex items-center justify-between"
    >
      {isLoggingOut ? 'Çıkış yapılıyor...' : 'Çıkış Yap'}
    </button>
  );
}
