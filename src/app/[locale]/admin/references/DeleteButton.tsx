'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Bu referansı silmek istediğinize emin misiniz?')) {
      const res = await fetch(`/api/references/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Referans silinirken bir hata oluştu.');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded font-medium transition-colors ml-2"
    >
      Sil
    </button>
  );
}
