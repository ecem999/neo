'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error("Silme Hatası:", error);
      alert('Bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-red-600 hover:text-red-900 font-semibold transition-colors disabled:opacity-50"
    >
      {deleting ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}
