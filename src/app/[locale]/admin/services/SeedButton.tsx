'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSeed = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services/seed', { method: 'POST' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Seed başarısız oldu.');
      }
    } catch (e) {
      alert('Hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Veritabanında Hiç Hizmet Bulunamadı</h2>
      <p className="text-gray-600 mb-6 text-center max-w-lg">
        Mevcut sitede yer alan statik hizmet verilerini veritabanına aktarmak için aşağıdaki butonu kullanabilirsiniz.
      </p>
      <button 
        onClick={handleSeed} 
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {loading ? 'Aktarılıyor...' : 'Mevcut Statik Hizmetleri Veritabanına Aktar'}
      </button>
    </div>
  );
}
