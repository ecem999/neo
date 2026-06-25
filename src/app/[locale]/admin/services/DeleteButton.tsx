'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Hizmet silinirken bir hata oluştu.');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900 font-medium"
    >
      Sil
    </button>
  );
}
